// import React from 'react'

// function T1ProductCard() {
//   return (
//     <div>T1ProductCard</div>
//   )
// }

// export default T1ProductCard

import React from 'react';
import { useStore } from './T1Context';

import AllProducts from '../../Components/Allproducts/Allproducts';

const T1ProductCard = () => {
    const { store, setStore } = useStore();
    const { color,products,subCategories } = store;
    
  
useEffect(()=>{
    const navbarProps = 
    {
     

        setStore,

        color,
        products,
        subCategories
      
   
    };
    
},[])
        
console.log(color)
    return (
        <AllProducts
            allProductsProps={navbarProps}
            productsType="Navbar1" // Change this to "Navbar2" or "Navbar3" to switch navbar types
        />
    );
};

export default  T1ProductCard;
