import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useStore } from '../T1Context';
const ModernReactPlayer = () => {
    const [volume, setVolume] = useState(0.5);
    const [playing, setPlaying] = useState(false);
    const { store, setStore } = useStore();


    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    if (store?.audioUrl && store?.audioUrl !== '') {
        return (
            <div>
                <ReactPlayer
                    url={store?.audioUrl}
                    playing={playing}
                    controls
                    width="0px"
                    height="0px"
                    volume={volume}
                    loop={true}
                />
                <div className="fixed bottom-4 left-4 flex items-center p-2 sm:p-3 bg-gray-900 bg-opacity-50 rounded-full shadow-lg backdrop-blur-lg transition-colors duration-300 hover:bg-opacity-75">
                    <button
                        onClick={togglePlayPause}
                        className="text-white text-base sm:text-lg bg-blue-600 p-2 rounded-full hover:bg-blue-700 focus:outline-none shadow-md transition-transform transform hover:scale-105"
                    >
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="ml-2 sm:ml-3 w-20 sm:w-24 h-1 bg-gray-300 rounded-lg cursor-pointer focus:outline-none appearance-none"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #3b82f6, #3b82f6)',
                            backgroundSize: `${volume * 100}% 100%`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                </div>
            </div>
        );
    }
    else{
        return(
            null
        )
    }
};

export default ModernReactPlayer;
