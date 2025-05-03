import ApiError from "../utils/apiError.js";
import  User  from "../models/User.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessTokenAndRefreshToken = async(userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateUserToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validationBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Server Error: Something went wrong while creating the access token and refresh token.");
  }
};

export const registerUser = async (req, res) => {
  try {
    console.log("➡️ Hit register route");
    const { email, name, password, role, classCode } = req.body;
    console.log("📩 Incoming body:", req.body);

    if ([email, name, password, role].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "Name, email, password and role are required!" });
    }

    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Role must be either 'teacher' or 'student'!" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({ message: "Email is already registered!" });
    }

    console.log("✅ Creating user...");
    const user = await User.create({
      name,
      email,
      password,
      role,
      classCode: classCode || null,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong while creating the user!" });
    }

    console.log("🎉 User created:", createdUser);
    res.status(201).json({
      success: true,
      data: createdUser,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


export const getAllStudents = async (req, res) => {
    const { classCode } = req.body;
    const students = await User.find({ role: "student" , classCode}).select("-password -refreshToken");
    if (!students) {
        throw new ApiError(404, "No students found!");
    }
    return res.status(200).json(
        new ApiResponse(200, students.length, "Students fetched successfully")
    );
    }  
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist!");
  }
  
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials!");
  }
  
  const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000 // 1 day

  };
  
  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, 
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
};

export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id, 
    {
      $unset: {
        refreshToken: 1
      }
    },
    { new: true }
  );
  
  const options = {
    httpOnly: true,
        secure: process.env.NODE_ENV !== "development"

  };
  
  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
};

export const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  const user = await User.findById(req?.user._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  
  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect old password");
  }
  
  user.password = newPassword;
  await user.save({ validationBeforeSave: false });
  
  return res.status(200).json(
    new ApiResponse(200, {}, "Password changed successfully")
  );
};

export const currentUser = async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "Current user fetched successfully")
  );
};

export const updateAccountDetails = async (req, res) => {
  const { name, email } = req.body;
  
  if (!(name?.trim() || email?.trim())) {
    throw new ApiError(400, "Fields cannot be empty");
  }
  
  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateFields
    },
    { new: true }
  ).select("-password");
  
  return res.status(200).json(
    new ApiResponse(200, user, "User details updated successfully")
  );
};

export const updateClassCode = async (req, res) => {
  const { classCode } = req.body;
  
  if (!classCode?.trim()) {
    throw new ApiError(400, "Class code cannot be empty");
  }
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { classCode }
    },
    { new: true }
  ).select("-password");
  
  return res.status(200).json(
    new ApiResponse(200, user, "Class code updated successfully")
  );
};

export const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    
    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    
    const options = {
      httpOnly: true,
          secure: process.env.NODE_ENV !== "development"

    };
    
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    
    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200, 
          { accessToken, refreshToken: newRefreshToken }, 
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};