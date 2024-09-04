import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';


const ModernReactPlayer = ({store}) => {
    const [volume, setVolume] = useState(0.5);
    const [playing, setPlaying] = useState(true);
    const [myStore,setMyStore]=useState({});
    useEffect(()=>{
        console.log(store,"storeee")
        setMyStore(store);
    },[store])

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

        return myStore.audioUrl? (
            <div>
                <ReactPlayer
                    url={myStore?.audioUrl}
                    playing={playing}
                    controls
                    width="0px"
                    height="0px"
                    volume={volume}
                    loop={true}
                    
                />
                <div className="fixed bottom-4 left-4 flex items-center p-1 sm:p-2 hover:bg-gray-900 bg-opacity-0 rounded-full hover:shadow-lg hover:backdrop-blur-lg transition-all duration-300 hover:bg-opacity-75 hover:scale-105 group">
                    <FaMusic className="text-blue-700 text-lg sm:text-xl opacity-80 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={togglePlayPause}
                            className="text-white text-sm sm:text-base bg-blue-600 p-1 sm:p-2 rounded-full focus:outline-none shadow-md transition-transform transform hover:scale-110"
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
                            className="ml-1 sm:ml-2 w-16 sm:w-20 h-1 bg-gray-300 rounded-lg cursor-pointer focus:outline-none appearance-none"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #3b82f6, #3b82f6)',
                                backgroundSize: `${volume * 100}% 100%`,
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </div>
                </div>
            </div>
        ):'';
   
};

export default ModernReactPlayer;
