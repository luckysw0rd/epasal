import { toast } from "react-toastify";

export const useImage = () => {
    // Helper function to check if a string is a Cloudinary URL
    const isCloudinaryUrl = (url) => {
        const cloudinaryUrlPattern = /^https:\/\/res\.cloudinary\.com\/dcrcc9b4h\/image\/upload\/v\d+\/.+/;
        return cloudinaryUrlPattern.test(url);
    };

    const uploadImage = async (image) => {
        try {
            if (!image || image === '') {
                return {
                    img: "",
                    id: "",
                };
            }

            let data;

            // If the image is a Cloudinary URL or ID, return it directly
            if (typeof image === 'string') {
                if (isCloudinaryUrl(image)) {
                    const urlParts = image.split('/');
                    const id = urlParts[urlParts.length - 1].split('.')[0];
                    return {
                        img: image,
                        id: id,
                    };
                } else if (image.startsWith('data:image/')) {
                    // If image is a base64 string
                    data = new FormData();
                    data.append("file", image);
                    data.append('upload_preset', "cgb0zdwq");
                    data.append("cloud_name", "dcrcc9b4h");
                } else {
                    // Invalid string format
                    return {
                        img: "",
                        id: "",
                    };
                }
            } else if (
                image instanceof File &&
                (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg' || image.type === 'image/gif')
            ) {
                // If image is a File object
                data = new FormData();
                data.append("file", image);
                data.append('upload_preset', "cgb0zdwq");
                data.append("cloud_name", "dcrcc9b4h");
            } else {
                // Invalid file type
                return {
                    img: "",
                    id: "",
                };
            }

            const res = await fetch("https://api.cloudinary.com/v1_1/dcrcc9b4h/image/upload", {
                method: 'POST',
                body: data
            });
            const result = await res.json();

            return {
                img: result.secure_url,
                id: result.public_id
            };
        } catch (error) {
            console.log(error.message);
            return {
                img: "",
                id: "",
            };
        }
    };

    return { uploadImage };
};
