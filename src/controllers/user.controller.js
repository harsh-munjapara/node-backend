import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const userRegister = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;
    // console.log(req.body);

    if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required !!");
    }

    const isUserExist = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExist) throw new ApiError(409, "User With username or email already exist");

    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar && req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage && req.files?.coverimage[0]?.path;

    if (!avatarLocalPath) throw new ApiError(400, "Avatar is required !!");

    const avatar = await uploadFileOnCloudinary(avatarLocalPath);
    const coverimage = await uploadFileOnCloudinary(coverimageLocalPath);

    if (!avatar) throw new ApiError(400, "Avatar is not uploaded on cloud !!");

    const newCreatedUser = await User.create({
        username,
        email,
        fullName,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        password
    });

    const checkCreatedUser = await User.findById(newCreatedUser._id).select("-password -refreshToken");

    if (!checkCreatedUser) throw new ApiError(500, "Error While Register User..!!");

    res.status(201).json(
        new ApiResponse(200, checkCreatedUser, "User Registered Successfully :)")
    );
});

export {
    userRegister
}