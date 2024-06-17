import React from 'react';
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
    return (
      <div className="p-4 mt-24">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 lg:w-1/3 bg-white p-4 shadow-md rounded-md mr-4 lg:mr-0">
            {/* Adding mr-4 for margin-right on small screens and lg:mr-0 to remove margin-right on larger screens */}
            <h2 className="text-xl font-bold mb-2">Box 1</h2>
            <p>Content for Box 1</p>
          </div>
          <div className="flex-1 lg:w-2/3 bg-white p-4 shadow-md rounded-md mr-16">
            {/* Increasing the shadow depth using shadow-lg */}
            <h2 className="text-xl font-bold mb-2">Contact Information</h2>
            <form className="space-y-4">
              {/* First Segment: Name, Email, Phone Number */}
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
  
              {/* Divider Line */}
              <hr className="my-6 border-gray-400 border-t-2 w-full" />
  
              {/* Second Segment: Address, Nearby Landmark */}
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
  
              {/* Additional Divider Line */}
              <hr className="my-6 border-gray-400 border-t-2 w-full" />
  
              {/* Payment Options */}
              <p className="text-lg font-semibold mb-2">Payment Options</p>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Payment Option Logos */}
                <img src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111" alt="eSewa" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg" alt="Khalti" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-1851649-1569374.png?f=webp" alt="Cash on Delivery" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
              </div>
            </form>
          </div>
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
