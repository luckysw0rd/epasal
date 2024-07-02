import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import esewa from "../../Assets/esewa.png";
import fonepay from "../../Assets/fonepayfull.png";
import graph from '../../Assets/graph.png';
import productIcon from '../../Assets/shirt.webp';  // Assuming you have these icons
import staffIcon from '../../Assets/employee.png';     // Assuming you have these icons
import COD from '../../Assets/COD.png';

const Card = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.4 } }
    };

    return (
        <div className='bg-white p-8 md:p-10 lg:p-20'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={ref}>
                <motion.div
                    className="h-[200px] 2xl:h-[250px] bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 2xl:py-10 rounded-xl flex  justify-between items-center  shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div className='flex flex-col justify-between h-full'>
                        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold tracking-wide">
                            Payment Gateway Integration
                        </h2>
                        <div className="flex gap-5 mt-4">
                            <img src={esewa} alt="esewa" className='w-[120px] h-[50px] object-contain' />
                            <img src={fonepay} alt="fonepay" className='w-[120px] h-[50px] object-contain' />
                        </div>
                    </div>
                    <img src={COD} alt="product" className='w-[80px] md:w-[120px] object-contain mb-[90px] md:mb-0' />

                </motion.div>

                <motion.div
                    className="h-[200px] 2xl:h-[250px] bg-white text-gray-800 border-2 border-gray-300 p-6 rounded-xl 2xl:py-10 flex justify-between items-center shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold tracking-wide">Analytics</h2>
                        <p className="mt-2 text-sm md:text-base lg:text-lg 2xl:text-xl">Visualize your data with ease. Stay up to date with your product info.</p>
                    </div>
                    <img src={graph} alt="graph" className='w-[80px] md:w-[120px] object-contain' />
                </motion.div>

                <motion.div
                    className="h-[200px] 2xl:h-[250px] bg-white text-gray-800 border-2 border-gray-300 p-6 rounded-xl 2xl:py-10 flex justify-between items-center shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold tracking-wide">Manage Product and Inventory</h2>
                        <p className="mt-2 text-sm md:text-base lg:text-lg 2xl:text-xl">Keep track of your products and inventory levels effortlessly.</p>
                    </div>
                    <img src={productIcon} alt="product" className='w-[80px] md:w-[120px] object-contain' />
                </motion.div>

                <motion.div
                    className="h-[200px] 2xl:h-[250px] bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 2xl:py-10 rounded-xl flex justify-between items-center shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold tracking-wide">Manage Employee and Staff</h2>
                        <p className="mt-2 text-sm md:text-base lg:text-lg 2xl:text-xl">Effectively Organize and manage your team with role based access effectively.</p>
                    </div>
                    <img src={staffIcon} alt="staff" className='w-[80px] md:w-[120px] object-contain' />
                </motion.div>
            </div>
        </div>
    );
}

export default Card;
