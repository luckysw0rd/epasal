import React, { useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { toast } from 'react-toastify';
import { useImage } from '../../../Hooks/useImage';

const Product = ({ store }) => {
  const initialProducts = [];

  const { uploadImage } = useImage();
  const { isLoading, error, sendRequest } = useFetch();
  const [products, setProducts] = useState(initialProducts);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [newVariant, setNewVariant] = useState({ name: '', options: [{ name: '', price: undefined, discount: undefined, count: undefined }] });
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(''); // Added state for minPrice
  const [maxPrice, setMaxPrice] = useState(''); // Added state for maxPrice


  const fetchProducts = async (page = 1, limit = 10, search = '', sortOrder = 'asc') => {
    try {
      const response = await sendRequest(
        `product/getAllProduct/${store._id}?page=${page}&limit=${limit}&search=${search}&sortOrder=${sortOrder}` +
        `${minPrice ? `&minPrice=${minPrice}` : ''}` +
        `${maxPrice ? `&maxPrice=${maxPrice}` : ''}`,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      setProducts(response.products);
      setTotalProducts(response.totalProducts);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleSaveClick = async () => {
    try {
      const uploadedProductImage = await uploadImage(editProduct.image.imageUrl);
      const updatedEditProduct = { ...editProduct };
      updatedEditProduct.image.imageUrl = uploadedProductImage.img;
      updatedEditProduct.image.imageId = uploadedProductImage.id;

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

      const updates = {
        name: updatedEditProduct.name,
        description: updatedEditProduct.description,
        price: updatedEditProduct.price,
        rating: updatedEditProduct.rating,
        image: updatedEditProduct.image,
        variant: updatedEditProduct.variant,
        discount:updatedEditProduct.discount,
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

      toast.success('Product updated successfully');
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
              return option;
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, 10, searchQuery, sortOrder);
  };
  const handleSearchButton=(e)=>{
    fetchProducts(1, 10, searchQuery, sortOrder);
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    fetchProducts(1, 10, searchQuery, event.target.value);
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
    store && (
      <div>
        <div className="flex flex-col px-2 justify-between mb-4 gap-2">
          <div className='flex gap-2'>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 px-3 h-10 flex-grow"
            />
            <button onClick={handleSearchButton} className='bg-gray-400 text-white h-10 px-5'>Go</button>
          </div>
          <select value={sortOrder} onChange={handleSortChange} className="border p-2">
            <option value="asc">Sort by Revenue (Asc)</option>
            <option value="desc">Sort by Revenue (Desc)</option>
          </select>
          <div className="flex mt-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 px-3 mr-2"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 px-3 mr-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
              onClick={() => fetchProducts(currentPage, 10, searchQuery, sortOrder)}
            >
              Apply Filters
            </button>
            </div>
        </div>
        <div className="flex flex-wrap grow-0 gap-12 p-4">
          {products.map((product, productIndex) => (
            <div key={productIndex} className="bg-white shadow-lg pb-5 h-100 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              
                <div className=" capitalize">
                  <img className="flex justify-center mx-auto w-80 h-60" src={product.image.imageUrl} alt={product.name} />
                  <h2 className="text-xl font-bold my-2 pl-2">{product.name}</h2>
                  <div className='flex gap-2 '>
                  <p className="text-gray-700 mb-2 pl-2 flex-grow">{product.description}</p>
                    <div className='text-xs pr-2'>
                      <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                      <p className="text-gray-700 mb-2">Discount: {product.discount}</p>
                      <p className="text-gray-700 mb-2">Revenue: ${product.revenueGenerated}</p>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 text-white ml-2 px-4 py-2 rounded mt-3"
                    onClick={() => {console.log(productIndex,"product Index");handleEditClick(productIndex)}}
                  >
                    Edit
                  </button>
                </div>
              
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
        {editProductIndex!==null && (
                <div className="  fixed top-0 left-0 w-full h-screen z-50 flex justify-center">
                  <div className='absolute bg-black opacity-50 w-screen top-0 left-0 h-screen'></div>
                  <div className='absolute w-[80%] mt-10 bg-white p-12 h-[80%] overflow-y-scroll'>
                    <div className='absolute top-3 right-5 text-red-500 cursor-pointer' onClick={()=>{handleEditClick(null)}}>X</div>
                  <div className="mb-4">
                    <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={editProduct.description}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={editProduct.price}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Discount</label>
                    <input
                      type="number"
                      name="discount"
                      value={editProduct.discount}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <ProductImageDropzone
                      imageUrl={editProduct.image.imageUrl}
                      setImageUrl={(url) => setEditProduct({ ...editProduct, image: { ...editProduct.image, imageUrl: url } })}
                      className="w-10 h-10"
                    />
                  </div>

                  {editProduct.variant.map((variant, variantIndex) => (
                    <div key={variantIndex} className="mb-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Variant {variantIndex + 1}</label>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded mb-2"
                          onClick={() => handleDeleteVariant(variantIndex)}
                        >
                          Delete Variant
                        </button>
                      </div>
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(event) => handleVariantNameChange(event, variantIndex)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        placeholder="Variant Name"
                      />
                      {variant.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-4">
                          <div className="flex justify-between items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Option {optionIndex + 1}</label>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded mb-2"
                              onClick={() => handleDeleteOption(variantIndex, optionIndex)}
                            >
                              Delete Option
                            </button>
                          </div>

                          <input
                            type="text"
                            name="name"
                            value={option.name}
                            onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            placeholder="Option Name"
                          />
                          {variantIndex === 0 && (
                            <>
                              <input
                                type="number"
                                name="price"
                                value={option.price}
                                onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                placeholder="Option Price"
                              />
                              <input
                                type="number"
                                name="discount"
                                value={option.discount}
                                onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                placeholder="Option Discount"
                              />
                              <input
                                type="number"
                                name="count"
                                value={option.count}
                                onChange={(event) => handleVariantChange(event, variantIndex, optionIndex)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                placeholder="Option Count"
                              />
                            </>
                          )}
                          {variantIndex === 0 && (
                            <ProductImageDropzone
                              imageUrl={option.image?.imageUrl}
                              setImageUrl={(url) =>
                                setEditProduct((prev) => {
                                  const updatedVariants = [...prev.variant];
                                  updatedVariants[variantIndex].options[optionIndex].image = {
                                    ...updatedVariants[variantIndex].options[optionIndex].image,
                                    imageUrl: url
                                  };
                                  return { ...prev, variant: updatedVariants };
                                })
                              }
                            />
                          )}
                        </div>
                      ))}
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAddOption(variantIndex)}
                      >
                        Add Option
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleAddVariant}
                  >
                    Add Variant
                  </button>
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditProductIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                  </div>
                </div>
              )}
             
      </div>
    )
  );
};

export default Product;

