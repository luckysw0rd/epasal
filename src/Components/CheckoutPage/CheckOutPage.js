import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useStore, StoreProvider } from '../../Theme/Theme1/T1Context';
import T1Navbar from '../../Theme/Theme1/T1Navbar';
import Loading from '../../Theme/Theme1/Loading/Loading';

const EStore = () => {
  const { store } = useStore();

  if (window.location.pathname.includes("/store/") && !store.fetchedFromBackend) {
    return (
      <div className="w-screen">
        <Loading />
      </div>
    );
  }

  return (
    store && (
      <div
        className="h-full overflow-auto"
        style={{ backgroundColor: store.color.backgroundThemeColor }}
      >
        <T1Navbar />
        <Checkout />
      </div>
    )
  );
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Item 1',
      variant: [{ options: [{ price: 10, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
    },
    {
      id: 2,
      name: 'Item 2',
      variant: [{ options: [{ price: 20, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
    }
  ]);

  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [itemPrices, setItemPrices] = useState(cartItems.map(item => item.variant[0].options[0].price));
  const [promoCode, setPromoCode] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(5); // Fixed delivery charge
  const [discount, setDiscount] = useState(0); // Discount amount





  const deleteFromCart = (item) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(newCartItems);

    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    const newQuantities = [...quantities];
    newQuantities.splice(itemIndex, 1);
    setQuantities(newQuantities);

    const newPrices = [...itemPrices];
    newPrices.splice(itemIndex, 1);
    setItemPrices(newPrices);
  };

  const handleApplyCode = () => {
    // Implement the logic to apply the promo code
    alert(`Promo code ${promoCode} applied!`);
  };

  const totalAmount = itemPrices.reduce((total, price) => total + price, 0) + deliveryCharge - discount;

  return (
    <div className="p-4 mt-24 flex flex-col lg:flex-row gap-4">
      <div className="flex-1 bg-white p-4 shadow-md rounded-md mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col h-full">
          <div className="overflow-auto">
            <h2 className="text-xl font-bold mb-2">Cart Items</h2>
            {cartItems.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
  <div className="flex items-center">
    <img src={item.variant[0].options[0].image.imageUrl} alt={item.name} className="h-12 w-12 mr-4" />
    <div>
      <p className="font-semibold">{item.name}</p>
    </div>
  </div>
  <div className="flex items-center text-xl flex-1 justify-between">
    
    <span className="mx-auto text-center">{quantities[index]}</span> {/* Quantity centered */}
    <span className='mr-4'>${itemPrices[index]}</span> {/* Item price on the left */}
    <IoCloseCircleOutline size={20} onClick={() => deleteFromCart(item)} /> {/* Delete icon on the right */}
  </div>
</div>

         
            ))}
          </div>
          <div className="flex mt-4">
  <input
    type="text"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
    placeholder="Enter Promo code"
    className="border border-gray-300 rounded-md px-4 py-1 mr-3 w-48" // Adjusted width and margin-right here
  />
  <button
    onClick={handleApplyCode}
    className="bg-gray-700 text-white rounded-md px-6 py-1 ml-auto" // Increased width of the button
  >
    Apply Promo Code
  </button>
</div>


          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Delivery Charge</p>
              <p className="text-sm">${deliveryCharge}</p>
            </div>
            <div className="flex justify-between mt-8">
              <p className="text-sm font-medium">Discount</p>
              <p className="text-sm">-${discount}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold">
              <p className="text-lg">Total Amount</p>
              <p className="text-lg">${totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white p-4 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <hr className="my-6 border-gray-400 border-t-2 w-full" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Nearby Landmark</label>
              <input type="text" id="landmark" name="landmark" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <hr className="my-6 border-gray-400 border-t-2 w-full" />

          <p className="text-lg font-semibold mb-2">Payment Options</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <img src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111" alt="eSewa" className="h-16 object-contain border border
             
            border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg" alt="Khalti" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-1851649-1569374.png?f=webp" alt="Cash on Delivery" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckoutPage = ({ passedStore }) => {
  return (
    <StoreProvider passedStore={passedStore}>
      <EStore />
    </StoreProvider>
  );
};

export default CheckoutPage;
