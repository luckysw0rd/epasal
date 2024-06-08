export const useImage = () => {
    const uploadImage = async (image) => {
        try {
            if (!image) {
                return {
                    img: "",
                    id: "",
                };
            }

            let data;

            // Check if the input is a base64 string or a File object
            if (typeof image === 'string' && image.startsWith('data:image/')) {
                // If image is a base64 string
                data = new FormData();
                data.append("file", image);
                data.append('upload_preset', "cgb0zdwq");
                data.append("cloud_name", "dcrcc9b4h");
            } else if (image instanceof File && (image.type === 'image/jpeg' || image.type === 'image/png')) {
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
