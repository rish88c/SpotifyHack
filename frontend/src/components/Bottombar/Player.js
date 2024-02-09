import React, { useEffect, useState } from "react";
import { Icon } from "../../Icons";
import songContext from "../../context/SongContext";
import { useContext} from "react";
import CustomRange from "../../CustomRange";
import {useVoiceModulation} from "@specular-aura/voice-modulation";

function Player({ audioElem }) {
  const context = useContext(songContext);
  const { songs, isplaying, setIsplaying, currentSong, setCurrentSong } =
    context;

  const [progress,setProgress]=useState(0);
  const currentTime=audioElem.current ? audioElem.current.currentTime : 0;
  const duration=audioElem.current ? audioElem.current.duration : 0;

  const updateProgress=()=>{
    const newProgress=(audioElem.current.currentTime/duration)*100
    setProgress(newProgress);
  }

  const handleTimeUpdate=()=>{
    requestAnimationFrame(updateProgress);
  }

  const changeVoice=useVoiceModulation(
    currentSong,
    setCurrentSong,
    "megaphone"
  )
  useEffect(()=>{
    audioElem.current.addEventListener("timeupdate",handleTimeUpdate);
    return()=>{
      audioElem.current.removeEventListener("timeupdate",handleTimeUpdate);
    }

  },[audioElem,duration]);

  function formatTime(timeInSeconds){
    const minutes=Math.floor(timeInSeconds/60);
    const seconds=Math.floor(timeInSeconds%60);
    const formattedMinutes=String(minutes).padStart(2,"0");
    const formattedSeconds=String(seconds).padStart(2,"0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }



  const PlayPause = () => {
    if (currentSong) {
      setIsplaying(!isplaying);
    } else {
      setIsplaying(false);
    }
  };

  const skipBack=()=>{
    const index = songs.findIndex((x)=>x.title==currentSong.title);
    if(index==0){
      setCurrentSong(songs[songs.length-1])
    }else{
      setCurrentSong(songs[index-1])
    }
  }

  const skipToNext=()=>{
    const index = songs.findIndex((x)=>x.title==currentSong.title);
    if(index==songs.length-1){
      setCurrentSong(songs[0])
    }else{
      setCurrentSong(songs[index+1])
    }
  }

  return (
    <>
      <div className="flex px-4 justify-between items-center h-full">
        {/* LEFT PART */}
        <div className="min-w-[11.25rem] w-[30%]">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <div className="w-14 h-14 mr-3 relative group flex-shrink-0">
                <img src={currentSong.image} alt="Song"></img>
              </div>

              <div>
                <h6 className="text-sm line-clamp-1">{currentSong.title}</h6>
                <p className="text-[0.688rem] text-white text-opacity-70">
                  {currentSong.artist}
                </p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="heart"></Icon>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="pictureInPicture"></Icon>
            </button>
          </div>
        </div>

        {/* CENTER PART */}
        <div className="max-w-[45.125rem] w-[40%] pt-2 flex flex-col px-4 items-center">
          <div className="flex items-center gap-x-2">
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="shuffle"></Icon>
            </button>

            <button onClick={skipBack} className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="playerPrev"></Icon>
            </button>

            <button
              onClick={PlayPause}
              className="w-8 h-8 bg-white flex items-center justify-center text-black rounded-full hover:scale-[1.06]"
            >
              {isplaying ? (
                <Icon size={16} name="pause"></Icon>
              ) : (
                <Icon size={16} name="play"></Icon>
              )}
            </button>

            <button onClick={skipToNext} className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="playerNext"></Icon>
            </button>

            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="repeat"></Icon>
            </button>
          </div>
          <div className="w-full flex items-center mt-1.5 gap-x-2">
        <div className="text-[0.688rem] text-white text-opacity-70">
          {formatTime(currentTime)}
        </div>


        <CustomRange
           
           value={progress}

            onChange={(value) => {
              const newTime = (value / 100) * audioElem.current.duration;
            //   setCt(newTime);
              audioElem.current.currentTime = newTime;
            }}
            onClick={() => {
                if(!isplaying && audioElem.current)
              audioElem.current.pause();
            }}
            onDragStart={() => {
                if(!isplaying && audioElem.current)
              audioElem.current.pause();
            }}
            onDragEnd={() => {
              if (isplaying  && audioElem.current) {
                audioElem.current.play();
              }
            }}
          />
        <div className="text-[0.688rem] text-white text-opacity-70">
        {formatTime(duration)}
        </div>
      </div>
        </div>

        {/* RIGHT PART */}
        <div className="min-w-[11.25rem] w-[30%] flex items-center justify-end">
          <div className="flex items-center">
            <button onClick={changeVoice}
            className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="plus"></Icon>
            </button>

            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="lyrics"></Icon>
            </button>

            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="queue"></Icon>
            </button>

            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="device"></Icon>
            </button>

            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="fullScreen"></Icon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
