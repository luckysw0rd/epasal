// Function to transform cart items into subrows
const transformCartItemsToSubrows = (data) => {
    return data.map((item) => ({
        ...item,
        subRows: item.cart.map((cartItem) => ({
            cart: [cartItem], // Each cart item becomes a subrow
            selectedVariant :[cartItem.selectedVariant]
        })),
        cart: undefined, // Remove the original cart array from the main row
    }));
};

// Updated fakeData with transformed structure
export const fakeData = transformCartItemsToSubrows([
    {
        id: '1',
        fullName: 'Sahil Karn',
        phoneNumber: '7342916822',
        status: 'processing',
        city: 'East Daphne',
        cart: [
            {
                product: 'Product A',
                price: 100,
                discountAmount: 10,
                count: 2,
                selectedVariant: [
                    {
                        name: "Color",
                        options: {
                            name: "Red"
                        }
                    },
                    {
                        name: "Size",
                        options: {
                            name: "Small"
                        }
                    },
                    // Additional objects if there are multiple variants
                ]
            },
            {
                product: 'Product B',
                price: 50,
                discountAmount: 5,
                count: 1,
                selectedVariant: [
                    {
                        name: "Size",
                        options: {
                            name: "XL"
                        }
                    },
                    // Additional objects if there are multiple variants
                ]
            },
        ],
        totalPrice: 500,
        deliveryCharge: 10,
        promoCode: 'SAHIL100',
        promoDiscount: 20,
        address: 'Imadol Naya Basti , mahalaxmi tole',
        landmark: 'Imadol swimming pool',
        paymentMethod: 'CashOnDelivery',
        esewaTransactionID: '',
    },
]);


export const status = [
    'processing',
    'confirmed',
    'being delivered',
    'delivered',
    'cancelled',
    'refunded',
]