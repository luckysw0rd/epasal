import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import esewa from "../../Assets/esewa.png";
import fonepay from "../../Assets/fonepayfull.png";
import graph from '../../Assets/graph.png'

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
        <div className='bg-white p-8 md:p-10 lg:p-16'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:p-4" ref={ref}>
                <motion.div
                    className="h-[200px] bg-gradient-to-r bg-[#3C3C3C] text-white py-4 px-8 rounded-xl flex justify-between"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div className='flex flex-col justify-between'>
                        <h2 className="text-lg md:text-xl lg:text-2xl md:w-[61%] font-bold tracking-wider">
                            Payment Gateway Integration
                        </h2>
                        <div className="flex gap-5 mb-5">
                            <img src={esewa} alt="esewa" className=' w-[140px] h-[56px]' />
                            <img src={fonepay} alt="fonepay" className=' w-[140px] h-[56px]' />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="h-[200px] bg-gradient-to-r bg-[#FFFFFF] text-gray-800 border-2 border-gray-700 py-4 px-8 rounded-xl flex"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <div>
                        <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Analytics</h2>
                        <p className="mt-1">Visualize your data for the ease of use. Stay up to date with your product info.</p>
                  
                    </div>
                    <img className=' w-[80px] h-[160px] md:w-[200px]  relative top-0' src={graph}>
                    </img>
                </motion.div>

                <motion.div
                    className="h-[200px] bg-gradient-to-r bg-[#FFFFFF] text-black border-2 border-gray-700 py-4 px-8 rounded-xl flex"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Manage Product and Inventory</h2>
                </motion.div>

                <motion.div
                    className="h-[200px] bg-gradient-to-r bg-[#3C3C3C] text-white py-4 px-8 rounded-xl flex"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                >
                    <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Manage Employee and Staff</h2>
                </motion.div>
            </div>
        </div>
    );
}

export default Card;
