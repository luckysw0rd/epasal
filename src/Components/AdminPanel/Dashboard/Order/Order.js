import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../../../../Hooks/useFetch';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import DeliveryCodeModal from './DeliveryCodeModal.js';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../Hooks/AuthContext.js';


const Order = ({ store }) => {
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [orders, setOrders] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editOrder, setEditOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showDeliveryCodeModal, setShowDeliveryCodeModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const auth = useContext(AuthContext);

    const statusOptions = ['Processing', 'Confirmed', 'Being delivered', 'Delivered', 'Cancelled', 'Returned'];

    const fetchOrders = async (page, searchQuery = '') => {
        try {
            const responseData = await sendRequest(
                `order/get/${store._id}?page=${page}&limit=10&search=${encodeURIComponent(searchQuery)}&storeId=${store._id}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(responseData);
            if (responseData.orders.length === 0) {
                setHasMore(false);
            } else {
                setOrders((prevOrders) => (page === 1 ? responseData.orders : [...prevOrders, ...responseData.orders]));
            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchOrders(page, searchQuery);
    }, [page, searchQuery]);

    const loadMoreOrders = () => {
        if (hasMore && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedId((prevId) => (prevId === orderId ? null : orderId));
    };

    const toggleEdit = (order) => {
        if (editId === order._id) {
            setEditId(null);
            setEditOrder(null);
        } else {
            setEditId(order._id);
            setEditOrder({ ...order });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchTerm);
        setPage(1);
        setOrders([]);
        setHasMore(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleEditSubmit = async (orderId, deliveryCode = null) => {
        try {
            const updateData = { ...editOrder };
            if (editOrder.status === 'Delivered' && !deliveryCode) {
                setShowDeliveryCodeModal(true);
                setCurrentOrderId(orderId);
                return;
            }

            if (deliveryCode) {
                updateData.deliveryCode = deliveryCode;
            }
            updateData.storeID = store._id;
            console.log(store._id);
            const response = await sendRequest(
                `order/update/${store._id}/${orderId}?storeId=${store._id}`,
                'PUT',
                JSON.stringify(updateData),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,

                }
            );
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === orderId ? { ...editOrder, deliveryCode } : order))
            );
            toast(response.message);
            setEditId(null);
            setEditOrder(null);
            setShowDeliveryCodeModal(false);
            setCurrentOrderId(null);
        } catch (error) {
            toast(error.message);

            // Handle error
        }
    };

    const handleModalClose = () => {
        setShowDeliveryCodeModal(false);
        setCurrentOrderId(null);
    };

    const handleModalSubmit = (code) => {
        handleEditSubmit(currentOrderId, code);
    };
    const getOrderStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'border-[#FFDBAA]'; // Example background color for Processing
            case 'Confirmed':
                return 'border-[#7AB2B2]'; // Example background color for Confirmed
            case 'Being delivered':
                return 'border-[#9376E0]'; // Example background color for Being delivered
            case 'Delivered':
                return 'border-[#7AA874]'; // Example background color for Delivered
            case 'Cancelled':
                return 'border-[#E78895]'; // Example background color for Cancelled
            case 'Returned':
                return 'border-[#939185]'; // Example background color for Returned
            default:
                return 'border-white'; // Default background color
        }
    };

    return (
        <div className="flex flex-col w-screen justify-start p-4 bg-gray-100">
            <div className="w-full max-w-md mb-4 flex">
                <input
                    type="text"
                    placeholder="Search by any field, separated by commas"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    className="w-full p-2 border rounded shadow"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </div>
            {orders.map((order) => (
                <div key={order._id} className={` bg-white xl:max-w-screen shadow-lg rounded-lg overflow-hidden 2xl:max-w-[1550px] mb-4 border-[4px] ${getOrderStatusColor(order.status)}`}>
                    <div className="p-4 w-full border-b flex justify-between items-center cursor-pointer">
                        <div>
                            {editId === order._id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={editOrder.fullName}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={editOrder.address}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={editOrder.landmark}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={editOrder.phoneNumber}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <select
                                        name="status"
                                        value={editOrder.status}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className=' w-full'>
                                    <div className=' flex flex-row w-full'>
                                        <h2 className="text-lg font-semibold">{order.fullName}</h2>
                                        {/* <div className="text-gray-600 absolute right-28 ml-20 font-semibold">
                                        
                                            <span className=" block">{new Date(order.updatedAt).toLocaleDateString(undefined, {
                                                day: 'numeric',
                                                month: 'short'
                                            })}</span>
                                            <span className="block">{new Date(order.updatedAt).toLocaleTimeString()}</span>
                                        </div> */}
                                    </div>
                                    <h2 className="text-md font-semibold">Order Number : {order._id}</h2>
                                    <div className="text-gray-600">{`Address: ${order.address}`}</div>
                                    <div className="text-gray-600">{`Landmark: ${order.landmark}`}</div>
                                    <div className="text-gray-600">{`Status: ${order.status}`}</div>
                                    <div className="text-gray-600 flex items-center">
                                        {`Phone Number: `}
                                        <a href={`tel:${order.phoneNumber}`} className="ml-2 text-blue-500 underline">{order.phoneNumber}</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className=' flex justify-end flex-col space-y-4'>
                            <div className="text-gray-600  font-semibold">

                                <span className=" block">{new Date(order.updatedAt).toLocaleDateString(undefined, {
                                    day: 'numeric',
                                    month: 'short'
                                })}</span>
                                <span className="block">{new Date(order.updatedAt).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-gray-500 flex justify-end mx-auto  mb-2 text-2xl" onClick={() => toggleExpand(order._id)}>
                                {expandedId === order._id ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            <button
                                onClick={() => toggleEdit(order)}
                                className="text-sm p-4 py-2 bg-gray-600 text-white rounded"
                            >
                                {editId === order._id ? 'Cancel' : 'Edit'}
                            </button>
                            {editId === order._id && (
                                <button
                                    onClick={() => handleEditSubmit(order._id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                    {expandedId === order._id && (
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-md font-semibold">Products Ordered</h3>
                                <h3 className="text-md font-semibold">Order Details</h3>
                            </div>
                            <div>
                                {order.cart.map((item, index) => (
                                    
                                    <div key={item.product._id} className="mb-4">
                                        <p className="font-medium">{`Product: ${item.productName || item.product.name}`}</p>
                                        <p className="text-gray-600">{`Product ID: ${item.product._id}`}</p>
                                        <p className="text-gray-600">{`Quantity: ${item.count}`}</p>
                                        {item.selectedVariant.map((variant, idx) => (
                                            <div key={idx} className="text-gray-600">
                                                <p>{`${variant.name}: ${variant.options.name}`}</p>
                                            </div>
                                        ))}
                                        <p className="text-gray-600">{`Price After Discount: Nrs ${item.price} per unit`}</p>
                                        <hr className="w-full border-gray-300 mt-2" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <div>
                                    <p className="text-gray-600">{`Payment Method: ${order.paymentMethod}`}</p>
                                    <p className="text-gray-600">Price : Nrs {order.price}</p>
                                    <p className="text-gray-600">{`Promo Discount: Nrs ${order.promoDiscount}`}</p>
                                    <p className="text-gray-600">{`Delivery Charge: Nrs ${order.deliveryCharge}`}</p>
                                    <p className="text-gray-600">{`Final Amount: Nrs ${order.totalPrice}`}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {hasMore && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={loadMoreOrders}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {isLoading ? 'Loading...' : 'Load More Orders'}
                    </button>
                </div>
            )}
            {error && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center">
                    {error.message || 'An error occurred'}
                    <button onClick={onCloseError} className="ml-4 px-2 py-1 bg-red-700 rounded">
                        Close
                    </button>
                </div>
            )}
            <DeliveryCodeModal
                isOpen={showDeliveryCodeModal}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
};

export default Order;
