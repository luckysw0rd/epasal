import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
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
                <div className="fixed bottom-4 left-4 flex items-center p-1 sm:p-2 bg-gray-900 bg-opacity-10 rounded-full shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-opacity-75 hover:scale-105 group">
                    <FaMusic className="text-white text-lg sm:text-xl opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
                    <button
                        onClick={togglePlayPause}
                        className="text-white text-sm sm:text-base bg-blue-600 p-1 sm:p-2 rounded-full focus:outline-none shadow-md transition-transform transform hover:scale-110 opacity-0 group-hover:opacity-100"
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
                        className="ml-1 sm:ml-2 w-16 sm:w-20 h-1 bg-gray-300 rounded-lg cursor-pointer focus:outline-none appearance-none opacity-0 group-hover:opacity-100"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #3b82f6, #3b82f6)',
                            backgroundSize: `${volume * 100}% 100%`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ModernReactPlayer;
