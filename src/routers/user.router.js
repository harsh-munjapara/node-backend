// import { Router } from "express";
import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { userRegister } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "coverimage",
        maxCount: 1,
    },
]), userRegister);

export default router;