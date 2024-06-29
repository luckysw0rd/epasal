import React, { useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { toast } from 'react-toastify';
import { useImage } from '../../../Hooks/useImage';
import { FaDollarSign, FaPercent, FaChartLine, FaBox, FaEdit } from 'react-icons/fa';
const Product = ({ store }) => {
  const initialProducts = [];

  const { uploadImage } = useImage();
  const { isLoading, error, sendRequest } = useFetch();
  const [products, setProducts] = useState(initialProducts);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [newVariant, setNewVariant] = useState({ name: '', options: [{ name: '', price: undefined, discount: undefined, count: undefined }] });
  const auth = useContext(AuthContext);

  const [page, setPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(''); // Added state for minPrice
  const [maxPrice, setMaxPrice] = useState(''); // Added state for maxPrice

  const fetchProducts = async (limit = 10, search = '', sortOrder = 'asc') => {
    try {
      const response = await sendRequest(
        `product/getAllProduct/${store._id}?page=${page}&limit=${limit}&search=${searchQuery}&sortOrder=${sortOrder}` +
        `${minPrice ? `&minPrice=${minPrice}` : ''}` +
        `${maxPrice ? `&maxPrice=${maxPrice}` : ''}`,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      console.log(response);
      setProducts(response.products);
      setTotalProducts(response.totalProducts);
      setTotalPages(response.totalPages);

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, totalPages, currentPage]);

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

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
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
      console.log(editProduct);
      let updatedEditProduct = { ...editProduct };
      console.log(updatedEditProduct);
      // Check if the product image URL is empty and retain the existing image
      if (updatedEditProduct.image.imageUrl) {
        const uploadedProductImage = await uploadImage(updatedEditProduct.image.imageUrl);
        updatedEditProduct.image.imageUrl = uploadedProductImage.img;
        updatedEditProduct.image.imageID = uploadedProductImage.id;
      }

      const updatedVariants = await Promise.all(
        updatedEditProduct.variant.map(async (variant) => {
          const updatedOptions = await Promise.all(
            variant.options.map(async (option) => {
              if (option.image && option.image.imageUrl) {
                if (option.image.imageUrl) {
                  const uploadedVariantImage = await uploadImage(option.image.imageUrl);
                  return {
                    ...option,
                    name: option.name || 'Default Option Name', // Set default option name
                    image: { imageUrl: uploadedVariantImage.img, imageID: uploadedVariantImage.id },
                  };
                }
              }
              return { ...option, name: option.name || 'default' }; // Set default option name
            })
          );
          return { ...variant, name: variant.name || 'default', options: updatedOptions }; // Set default variant name
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
        discount: updatedEditProduct.discount,
        inventory: updatedEditProduct.inventory,
        soldQuantity: updatedEditProduct.soldQuantity,
        revenueGenerated: updatedEditProduct.revenueGenerated,
      };

      const response = await sendRequest(
        `product/updateProduct`,
        'PUT',
        JSON.stringify({ id: updatedEditProduct._id, updates }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token,
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

            return { ...option, [name]: value };

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


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchButton = (e) => {
    fetchProducts(1, 10, searchQuery, sortOrder);
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("search query", searchQuery);
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
              onChange={(event) => handleSearchChange(event)}
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
        <div className="flex flex-wrap gap-8 p-4 justify-center">
          {products.map((product, productIndex) => (
            <div
              key={productIndex}
              className="bg-white max-w-[400px] shadow-lg p-5 rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="text-center border-b pb-4 mb-4">
                <img className="w-80 h-60 mx-auto mb-4 rounded-md" src={product.image.imageUrl} alt={product.name} />
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              </div>
              <p className="text-gray-700 mb-4">
                {truncateDescription(product.description, 15)}
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center border-b pb-2">
                  <FaDollarSign className="mr-2 text-blue-500" />
                  <span>Price: ${product.price}</span>
                </div>
                <div className="flex items-center border-b pb-2">
                  <FaPercent className="mr-2 text-blue-500" />
                  <span>Discount: {product.discount}</span>
                </div>
                <div className="flex items-center border-b pb-2">
                  <FaChartLine className="mr-2 text-blue-500" />
                  <span>Revenue: ${product.revenueGenerated}</span>
                </div>
                <div className="flex items-center border-b pb-2">
                  <FaBox className="mr-2 text-blue-500" />
                  <span>Inventory: {product.inventory}</span>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white flex items-center justify-center gap-2 px-4 py-2 rounded transition-colors hover:bg-blue-600"
                onClick={() => { console.log(productIndex, "product Index"); handleEditClick(productIndex); }}
              >
                <FaEdit />
                Edit
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)} disabled={page <= 1}
            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            //  disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
        {editProductIndex !== null && (
          <div className="  fixed top-0 left-0 w-full h-screen z-50 flex justify-center">
            <div className='absolute bg-black opacity-50 w-screen top-0 left-0 h-screen'></div>
            <div className='absolute w-[80%] mt-10 bg-white p-12 h-[80%] overflow-y-scroll'>
              <div className='absolute top-3 right-5 text-red-500 cursor-pointer' onClick={() => { handleEditClick(null) }}>X</div>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">Inventory</label>
                <input
                  type="number"
                  name="inventory"
                  value={editProduct.inventory}
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

