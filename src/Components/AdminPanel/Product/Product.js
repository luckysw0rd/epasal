import React, { useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { toast } from 'react-toastify';

const Product = ({ store }) => {
  const initialProducts = [
    // Initial product data
  ];

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

  const handleSaveClick = () => {
    const updatedProducts = [...products];
    updatedProducts[editProductIndex] = editProduct;
    console.log(updatedProducts);
    setProducts(updatedProducts);
    setEditProductIndex(null);
    setEditProduct(null);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  justify-center">
      {products.map((product, productIndex) => (
        <div key={productIndex} className=" w-full rounded overflow-hidden shadow-lg m-4">
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

              {/* Product Rating */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={editProduct.rating}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Product Image */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Image
                </label>
                <ProductImageDropzone
                  imageUrl={editProduct.image?.imageUrl}
                  setImageUrl={(url) => setEditProduct({ ...editProduct, image: { ...editProduct.image, imageUrl: url } })}
                />
              </div>

              {/* Variants */}
              {editProduct.variant.map((variant, variantIndex) => (
                <div key={variantIndex} className="mt-4">
                  {/* Variant Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variantName">
                      Variant Name
                    </label>
                    <button onClick={() => handleDeleteVariant(variantIndex)} className="bg-red-500 text-white py-2 px-4 rounded mt-2">
                      Delete Variant
                    </button>
                    <input
                      type="text"
                      name="variantName"
                      value={variant.name}
                      onChange={(e) => handleVariantNameChange(e, variantIndex)}
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Variant Options */}
                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mt-2">
                      {/* Option Image */}
                      <div className="mb-4">
                        {variantIndex === 0 && (
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Option Image
                          </label>
                        )}
                        {variantIndex === 0 && (
                          <ProductImageDropzone
                            imageUrl={option.image?.imageUrl}
                            setImageUrl={(url) => {
                              const updatedVariant = editProduct.variant.map((v, vIndex) => {
                                if (vIndex === variantIndex) {
                                  const updatedOptions = v.options.map((o, oIndex) => {
                                    if (oIndex === optionIndex) {
                                      return { ...o, image: { ...o.image, imageUrl: url } };
                                    }
                                    return o;
                                  });
                                  return { ...v, options: updatedOptions };
                                }
                                return v;
                              });
                              setEditProduct({
                                ...editProduct,
                                variant: updatedVariant
                              });
                            }}
                          />
                        )}
                      </div>

                      {/* Option Details */}
                      <div className="flex flex-col ml-4">
                        <button onClick={() => handleDeleteOption(variantIndex, optionIndex)} className="bg-red-500 text-white py-2 px-4 rounded mt-2">
                          Delete Option
                        </button>
                        {/* Option Name */}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Option Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={option.name}
                          onChange={(e) => handleVariantChange(e, variantIndex, optionIndex)}
                          className="border p-2 mb-2"
                        // Disable input for other variants
                        />

                        {variantIndex === 0 && (
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Option Price
                          </label>)}
                        {/* Option Price */}
                        {variantIndex === 0 && (
                          <input
                            type="number"
                            name="price"
                            value={option.price}
                            onChange={(e) => handleVariantChange(e, variantIndex, optionIndex)}
                            className="border p-2 mb-2"
                            disabled={variantIndex !== 0} // Disable input for other variants
                          />)}

                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Option Discount Amount
                        </label>
                        {/* Option Discount */}
                        <input
                          type="number"
                          name="discount"
                          value={option.discount}
                          onChange={(e) => handleVariantChange(e, variantIndex, optionIndex)}
                          className="border p-2 mb-2"
                          disabled={variantIndex !== 0} // Disable input for other variants
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Option Count
                        </label>
                        {/* Option Count */}
                        <input
                          type="number"
                          name="count"
                          value={option.count}
                          onChange={(e) => handleVariantChange(e, variantIndex, optionIndex)}
                          className="border p-2 mb-2"
                          disabled={variantIndex !== 0} // Disable input for other variants
                        />
                      </div>
                    </div>
                  ))}

                  <button onClick={() => handleAddOption(variantIndex)} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
                    Add Option
                  </button>
                </div>
              ))}

              {/* Add Variant Button */}
              <button onClick={handleAddVariant} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                Add Variant
              </button>

              {/* Save Button */}
              <div className="flex justify-between mt-4">
                <button onClick={handleSaveClick} className="bg-green-500 text-white py-2 px-4 rounded">
                  Save
                </button>
                <button onClick={() => setEditProductIndex(null)} className="bg-red-500 text-white py-2 px-4 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4">
              {/* Product Display */}
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-gray-900 text-xl">${product.price}</p>
              <p className="text-gray-600">{product.rating} Stars</p>
              <img src={product.image?.imageUrl} alt={product.name} className="w-full object-cover h-64 mb-4 rounded" />

              <button onClick={() => handleEditClick(productIndex)} className="bg-yellow-500 text-white py-2 px-4 rounded mt-4">
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
