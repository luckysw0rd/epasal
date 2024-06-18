import React, { useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { toast } from 'react-toastify';
import { useImage } from '../../../Hooks/useImage';

const Product = ({ store }) => {
  const initialProducts = [
    // Initial product data
  ];

  const { uploadImage } = useImage();
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [products, setProducts] = useState(initialProducts);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [newVariant, setNewVariant] = useState({ name: '', options: [{ name: '', price: undefined, discount: undefined, count: undefined }] });
  const auth = useContext(AuthContext);

  const handleEditClick = (productIndex) => {
    setEditProductIndex(productIndex);
    setEditProduct({ ...products[productIndex] });
  };

  const handleDeleteOption = (variantIndex, optionIndex) => {
    const updatedVariant = editProduct.variant.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const updatedOptions = variant.options.filter((option, oIndex) => oIndex !== optionIndex);
        return { ...variant, options: updatedOptions };
      }
      return variant;
    });
    setEditProduct({
      ...editProduct,
      variant: updatedVariant
    });
  };

  const handleDeleteVariant = (variantIndex) => {
    const updatedVariants = editProduct.variant.filter((variant, vIndex) => vIndex !== variantIndex);
    setEditProduct({
      ...editProduct,
      variant: updatedVariants
    });
  };

  const fetchProducts = async () => {
    try {
      const responseData = await sendRequest(
        'product/getAllProduct/' + store._id,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      console.log(responseData.products);
      setProducts(responseData.products);
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveClick = async () => {
    try {
      // Upload product image
      const uploadedProductImage = await uploadImage(editProduct.image.imageUrl);
      const updatedEditProduct = { ...editProduct };
      updatedEditProduct.image.imageUrl = uploadedProductImage.img; // Update product image URL
      updatedEditProduct.image.imageId = uploadedProductImage.id; // Update product image ID

      // Upload variant images
      const updatedVariants = await Promise.all(
        updatedEditProduct.variant.map(async (variant) => {
          const updatedOptions = await Promise.all(
            variant.options.map(async (option) => {
              if (option.image && option.image.imageUrl) {
                const uploadedVariantImage = await uploadImage(option.image.imageUrl);
                return { ...option, image: { imageUrl: uploadedVariantImage.img, imageId: uploadedVariantImage.id } };
              }
              return option;
            })
          );
          return { ...variant, options: updatedOptions };
        })
      );

      updatedEditProduct.variant = updatedVariants;

      // Prepare the data for the backend
      const updates = {
        name: updatedEditProduct.name,
        description: updatedEditProduct.description,
        price: updatedEditProduct.price,
        rating: updatedEditProduct.rating,
        image: updatedEditProduct.image,
        variant: updatedEditProduct.variant,
        inventory: updatedEditProduct.inventory,
        soldQuantity: updatedEditProduct.soldQuantity,
        revenueGenerated: updatedEditProduct.revenueGenerated
      };

      const response = await sendRequest(
        `product/updateProduct`,
        'PUT',
        JSON.stringify({ id: updatedEditProduct._id, updates }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );

      // Handle success message or update UI
      console.log('Product updated successfully:', response);
      toast.success('Product updated successfully');

      // Update local state with updated products
      const updatedProducts = [...products];
      updatedProducts[editProductIndex] = updatedEditProduct;
      setProducts(updatedProducts);
      setEditProductIndex(null);
      setEditProduct(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
  };

  const handleVariantChange = (event, variantIndex, optionIndex) => {
    const { name, value } = event.target;
    const updatedVariant = editProduct.variant.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const updatedOptions = variant.options.map((option, oIndex) => {
          if (oIndex === optionIndex) {
            if (variantIndex === 0) {
              return { ...option, [name]: value };
            } else {
              return option; // Disable editing for other variants
            }
          }
          return option;
        });
        return { ...variant, options: updatedOptions };
      }
      return variant;
    });
    setEditProduct({
      ...editProduct,
      variant: updatedVariant
    });
  };

  const handleVariantNameChange = (event, variantIndex) => {
    const { value } = event.target;
    const updatedVariant = editProduct.variant.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return { ...variant, name: value };
      }
      return variant;
    });
    setEditProduct({
      ...editProduct,
      variant: updatedVariant
    });
  };

  const handleImageUpload = (files, setImageUrl) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddVariant = () => {
    setEditProduct({
      ...editProduct,
      variant: [...editProduct.variant, newVariant]
    });
    setNewVariant({ name: '', options: [{ name: '', price: undefined, discount: undefined, count: undefined }] });
  };

  const handleAddOption = (variantIndex) => {
    const updatedVariant = editProduct.variant.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return { ...variant, options: [...variant.options, { name: '', price: undefined, discount: undefined, count: undefined }] };
      }
      return variant;
    });
    setEditProduct({
      ...editProduct,
      variant: updatedVariant
    });
  };

  const ProductImageDropzone = ({ imageUrl, setImageUrl }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (files) => handleImageUpload(files, setImageUrl),
    });

    return (
      <div {...getRootProps()} className="border-dashed border-2 border-gray-500 p-4 cursor-pointer">
        <input {...getInputProps()} />
        {imageUrl ? (
          <img className="w-full" src={imageUrl} alt="Product" />
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  };

  return (
    store &&
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {products.map((product, productIndex) => (
        <div key={productIndex} className="w-full rounded overflow-hidden shadow-lg m-4">
          {editProductIndex === productIndex ? (
            <div className="px-6 py-4">
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Product Description */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Product Price */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Inventory */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inventory">
                  Inventory
                </label>
                <input
                  type="number"
                  name="inventory"
                  value={editProduct.inventory}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Sold Quantity */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soldQuantity">
                  Sold Quantity
                </label>
                <input
                  type="number"
                  name="soldQuantity"
                  value={editProduct.soldQuantity}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  disabled
                />
              </div>

              {/* Revenue Generated */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="revenueGenerated">
                  Revenue Generated
                </label>
                <input
                  type="number"
                  name="revenueGenerated"
                  value={editProduct.revenueGenerated}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  disabled
                />
              </div>

              {/* Product Image */}
              <div className="mb-4">
                <ProductImageDropzone
                  imageUrl={editProduct.image.imageUrl}
                  setImageUrl={(imageUrl) =>
                    setEditProduct({ ...editProduct, image: { ...editProduct.image, imageUrl } })
                  }
                />
              </div>

              {/* Variants */}
              {editProduct.variant.map((variant, variantIndex) => (
                <div key={variantIndex} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Variant Name
                  </label>
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(event) => handleVariantNameChange(event, variantIndex)}
                    className="border p-2 w-full"
                  />
                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="ml-4 mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={option.name}
                        onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                        className="border p-2 w-full"
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={option.price}
                        onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                        className="border p-2 w-full"
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={option.discount}
                        onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                        className="border p-2 w-full"
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Count
                      </label>
                      <input
                        type="number"
                        name="count"
                        value={option.count}
                        onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                        className="border p-2 w-full"
                      />
                      <ProductImageDropzone
                        imageUrl={option.image.imageUrl}
                        setImageUrl={(imageUrl) =>
                          handleVariantChange(
                            { target: { name: 'image', value: { ...option.image, imageUrl } } },
                            variantIndex,
                            optionIndex
                          )
                        }
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded mt-2"
                        onClick={() => handleDeleteOption(variantIndex, optionIndex)}
                      >
                        Delete Option
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded mt-2"
                    onClick={() => handleAddOption(variantIndex)}
                  >
                    Add Option
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded mt-2"
                    onClick={() => handleDeleteVariant(variantIndex)}
                  >
                    Delete Variant
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded mt-2"
                onClick={handleAddVariant}
              >
                Add Variant
              </button>

              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded mt-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-gray-700 text-base">Price: ${product.price}</p>
              <p className="text-gray-700 text-base">Inventory: {product.inventory}</p>
              <p className="text-gray-700 text-base">Sold Quantity: {product.soldQuantity}</p>
              <p className="text-gray-700 text-base">Revenue Generated: ${product.revenueGenerated}</p>
              {product.image && <img className="w-full" src={product.image.imageUrl} alt="Product" />}
              <button
                type="button"
                className="bg-yellow-500 text-white p-2 rounded mt-2"
                onClick={() => handleEditClick(productIndex)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Product;
