import React,{useState} from 'react'
import { useDropzone } from 'react-dropzone';

const ImageDrop = ({setStore,imageData,imageFile}) => {
    const [image, setImage] = useState();
    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            
            setStore(n=>({...n,[imageData]:reader.result,[imageFile]:file}))
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
      });
  return (
    <div {...getRootProps()} className=" border-2 w-10 h-10 bg-gray-700 flex justify-center items-center border-dashed rounded-md p-6 mb-2">
        <input {...getInputProps()}/>
        <p className="text-sm text-white">Upload</p>
    </div>
  )
}

export default ImageDrop