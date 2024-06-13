// // SortDropdown.js
// // import React from "react";

// // const SortDropdown = () => {
// //   return (
// //     <div className="flex justify-end  text-[#4F3100] bg-white h-[24px] sm:h-[36px] w-full text-[14px] ">
    
// //       <div
// //         id="sort"
// //         className=" flex   sm:gap-8 border-2 border-[#4F3100] w-auto  rounded  px-1 sm:px-2 sm:py-1 text-[#4F3100] bg-white "
// //       > Sort{"\t"}By:  <select className="px-2 outline-none border-none bg-white">
// //  <option value="default" className="bg-white ">Latest</option>
// //         <option value="price"className="bg-white">Price</option>
// //         <option value="rating"className="bg-white">Rating</option>
// //       </select>
       
// //       </div>
// //     </div>
// //   );
// // };

// // export default SortDropdown;
// // SortDropdown.js
// // import React from "react";

// // const SortDropdown = ({ handleSortChange }) => {
// //   return (
// //     <div className="flex justify-end text-[#4F3100] bg-white h-[24px] sm:h-[36px] w-full text-[14px]">
// //       <div
// //         id="sort"
// //         className="flex sm:gap-8 border-2 border-[#4F3100] w-auto rounded px-1 sm:px-2 sm:py-1 text-[#4F3100] bg-white"
// //       >
// //         Sort{"\t"}By:{" "}
// //         <select className="px-2 outline-none border-none bg-white" onChange={handleSortChange}>
// //           <option value="default" className="bg-white">
// //             Latest
// //           </option>
// //           <option value="price" className="bg-white">
// //             Price
// //           </option>
// //           <option value="rating" className="bg-white">
// //             Rating
// //           </option>
// //           <option value="az" className="bg-white">
// //             A-Z
// //           </option>
// //         </select>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SortDropdown;
// import React from "react";

// const SortDropdown = ({ handleSortChange }) => {
//   return (
//     <div className="flex justify-end text-[#4F3100] bg-white h-[24px] sm:h-[36px] w-full text-[14px]">
//       <div id="sort" className="flex sm:gap-8 border-2 border-[#4F3100] w-auto rounded px-1 sm:px-2 sm:py-1 text-[#4F3100] bg-white">
//         Sort By: 
//         <select className="px-2 outline-none border-none bg-white" onChange={handleSortChange}>
//           <option value="default" className="bg-white">Latest</option>
//           <option value="price" className="bg-white">Price</option>
//           <option value="rating" className="bg-white">Rating</option>
//           <option value="az" className="bg-white">A-Z</option>
//         </select>
//       </div>
//     </div>
//   );
// };

export default SortDropdown;
