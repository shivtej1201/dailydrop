import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import validator from "validator"; // ✅ Add for email validation
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    // Basic validation
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Please provide name, email, and password.",
        error: true,
        success: false,
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return response.status(400).json({
        message: "Invalid email format.",
        error: true,
        success: false,
      });
    }

    // Optional: validate password strength
    if (password.length < 6) {
      return response.status(400).json({
        message: "Password should be at least 6 characters long.",
        error: true,
        success: false,
      });
    }

    // Check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response.status(400).json({
        message: "Email is already registered.",
        error: true,
        success: false,
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Ensure FRONTEND_URL exists
    if (!process.env.FRONTEND_URL) {
      console.error("❌ FRONTEND_URL is not set in .env");
    }

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

    // Send verification email
    const emailResult = await sendEmail({
      sendTo: email,
      subject: "Verify your email - Dailydrop",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    if (!emailResult || emailResult.error) {
      return response.status(500).json({
        message: "User registered but failed to send verification email.",
        error: true,
        success: false,
        data: savedUser,
      });
    }

    return response.status(201).json({
      message: "User registered successfully. Please verify your email.",
      error: false,
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;

    const user = await UserModel.findOne({
      _id: code,
    });
    if (user) {
      return response.status(400).json({
        message: "Invalid Code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return response.json({
      message: "Verification of email is done",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

//Login Controller

export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Provide email, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(500).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    // const checkAccountStatus = await UserModel.findOne({email})

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      samesite: "None",
    };
    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//LogOut Controller

export async function logoutController(request, response) {
  try {
    const userid = request.userId; // middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      samesite: "None",
    };
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload useravtar

export async function uploadAvtar(request, response) {
  try {
    const userId = request.userId; //auth Middleware
    const image = request.file; //Multer Middleware

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload profile",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });

    // console.log("image", image);
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
