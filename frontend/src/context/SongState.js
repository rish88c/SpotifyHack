import React, { useEffect } from "react";
import songContext from "./SongContext";
import { useState } from "react";
import { songsdata } from "../components/Bottombar/audios";

function SongState(props) {
  const [songs, setSongs] = useState(songsdata);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [isplaying, setIsplaying] = useState(false);

  useEffect(()=>{
    if (currentSong){
      const index=songs.findIndex((x)=> x.id===currentSong.id)
      if(index === -1 && songs.length<5){
        setSongs((prevSongs)=>[...prevSongs,currentSong]);
      }
      else if(index===-1){
        setSongs((prevSongs)=>[...prevSongs.slice(1),currentSong]);
      }
      else{
        console.log(index);
        setSongs((prevSongs)=>[
          ...prevSongs.slice(0,index),
          ...prevSongs.slice(index+1),
          currentSong,
        ]);
      }
    }
  },[currentSong?.id]);


  return (
    <songContext.Provider value={{songs, setSongs, currentSong, setCurrentSong, isplaying, setIsplaying}}>{props.children}</songContext.Provider>
  );
}

export default SongState;
