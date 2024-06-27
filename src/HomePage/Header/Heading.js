import React, { useEffect, useRef } from 'react'


const Heading = ({ setnavbarImage }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          console.log('Heading component is out of view');
          setnavbarImage(true);
        } else {
          setnavbarImage(false);
        }
      },
      { threshold: 0 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div ref={headingRef} className="relative">
      <img
        className="items-center fixed top-2 left-0 w-[98%] h-full object-cover -z-20 left-1/2 transform -translate-x-1/2 rounded-xl "
        src="https://s3-alpha-sig.figma.com/img/833c/2be1/8639d391de67ec6164fb417caca83280?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZXhi3C1L8GlNDE~yIkBb8QoUPW5sF1r6GEgvzlTM23MINSr0xdn3v1jeyAXlTENTzqDstUC0FPc0ogYh8SbNeklrTQn5WccmXmcWBKceCZZPOk5kS~lSNWHZ~etHTsJAaB8cmqJ3oucBGMO5fNrYWtO0aDV8kWUojBQJ86NmTtYPRJRPGr8NjFKQ9crFGugo~pn-saSPWqghEK~aUexX~jeEvffHd2rGlHEEmalNzTuqxhYp6yD22r6sVkg-5jkJpkoQKdQpSQnxX7jYyAo8X5HpHwGoPgzLuE8HujniYrjWWhs6o6RujvXYVig7KsxPJNY7muMOc6Ov-Zm6y34ryg__"
        alt="Background"
      />
      <div className=" fixed left-0 w-[98%] h-full bg-black opacity-70 -z-10 top-2 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
      <div className="relative z-0 h-[450px] text-white flex flex-col gap-5 items-center justify-center uppercase">
        <h3 className='text-3xl md:text-6xl font-semibold tracking-wide text-center'>Express Your <span className='font-Zen-Tokyo-Zoo font-normal'>Creativity</span></h3>
        <p className='text-sm md:text-base text-center'>Build Your Own Ecommerce Website</p>
      </div>

      
    </div>
  )
}

export default Heading
