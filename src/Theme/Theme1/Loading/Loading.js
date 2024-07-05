import React from 'react';

const Loader = () => {
  const letters = [
    { char: 'S', delay: '0s' },
    { char: 'H', delay: '0.2s' },
    { char: 'O', delay: '0.4s' },
    { char: 'P', delay: '0.6s' },
    { char: ' ', delay: '0.8s', isSpacer: true },
    { char: 'A', delay: '1s' },
    { char: 'T', delay: '1.2s' },
    { char: ' ', delay: '1.4s', isSpacer: true },
    { char: 'B', delay: '1.6s' },
    { char: 'A', delay: '1.8s' },
    { char: 'N', delay: '2s' },
    { char: 'A', delay: '2.2s' },
    { char: 'U', delay: '2.4s' },
  ];

  return (
    <div className='bg-white h-screen w-screen fixed top-0 left-0 flex items-center justify-center z-50'>
      <div className='flex items-center justify-center text-4xl md:text-6xl tracking-wide font-Saira font-semibold text-orange-500'>
        {letters.map((letter, index) => (
          <h1
            key={index}
            className={`letter ${letter.isSpacer ? 'mx-2' : ''}`}
            style={{ animationDelay: letter.delay }}
          >
            {letter.char}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Loader;
