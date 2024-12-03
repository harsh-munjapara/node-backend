import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
// import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadFileOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;
//         console.log('cloudinary 1 :', localFilePath);


//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         });

//         console.log('clouudinary response :', response);

//         console.log('Image Uploaded URL: ', response.url);

//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return null;
//     }
// }

const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath || !fs.existsSync(localFilePath)) {
            console.error('Invalid file path:', localFilePath);
            return null;
        }

        // const absolutePath = path.resolve(localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // console.log('Cloudinary Response:', response);
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error.message);

        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};


export {
    uploadFileOnCloudinary
}