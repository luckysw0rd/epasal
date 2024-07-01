import React, { useState, useEffect } from 'react';
import slider from '../Assets/slider.png';

const steps = [
    {
        label: 'Build Your Store',
        gif: 'https://i.pinimg.com/originals/48/72/59/487259006ebb768d17f7ec4497969876.gif',
    },
    {
        label: 'Customize Your Store',
        gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6egYTkEYrSDay0X-WczNTOFdiRy-ysIugTg&s',
    },
    {
        label: 'Add Products',
        gif: 'https://64.media.tumblr.com/338f612ba38837ea2a324ec774876ab7/9fa1b3df5d51ee85-5e/s540x810/d092909b68d167b5aaa8613b8ac0859f56ef73a5.gifv',
    },
    {
        label: 'Launch your Store',
        gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfXf1GcKUt72Uc5JPq4j9MLHhixVm7WyBjcA&s',
    },
];

const ProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 2000); // Change step every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-white p-4'>
            <div className="flex flex-col md:flex-row items-center justify-between mx-auto p-4 space-y-8 md:space-y-0 md:space-x-8">
                <div className="hidden 2xl:block">
                    <div className="relative w-full max-w-sm h-96 p-4 mx-auto">
                        <img src={slider} alt="Decorative" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:items-start space-y-4 w-full md:w-auto">
                    <h2 className="font-bold text-2xl  mr-24 text-orange-500 mb-4 md:text-left 
                     sm:mr-0">Get Started</h2>
                    <div className="flex flex-col items-start space-y-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center space-x-2 text-xl text-[#262626]">
                                    <div className={`w-4 h-4 rounded-full ${index <= currentStep ? 'bg-[#1E1E1E]' : 'bg-gray-300'}`}></div>
                                    <span className={`ml-2 ${index === currentStep ? 'font-bold' : ''}`}>{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-[2px] h-8 ml-2 ${index < currentStep ? 'bg-[#1E1E1E]' : 'bg-gray-300'}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto md:mx-0">
                    <div className="border-8 border-[#2D2D2D] shadow-md flex items-center justify-center bg-[#1E1E1E] rounded-xl overflow-hidden">
                        <img src={steps[currentStep].gif} alt="GIF" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
