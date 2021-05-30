import { createContext, ReactNode, useContext, useState } from 'react';
import { Player } from '../Components/Player';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (episode: Episode[], index: number) => void;
    togglePlay: () => void;
    setIsPlayingState: (state: boolean) => void;
    playNext: ()=>void,
    playPrevious: ()=> void,
    hasNext: boolean,
    hasPrevious: boolean,
    isLooping: boolean,
    toggleLoop: () => void, 
    isShuffling: boolean,
    toggleShuffle: ()=> void,
    clearPlayerState: ()=> void,
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffeling] = useState(false);

    function play(episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        console.log(isLooping);
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffeling(!isShuffling);
    }

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex+1)< episodeList.length;

    function playNext() {
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random()*episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }
        else if(hasNext)setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }

    function playPrevious() {
        if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider value={{
            episodeList: episodeList,
            currentEpisodeIndex: currentEpisodeIndex,
            play,
            playList,
            isPlaying,
            isLooping,
            togglePlay,
            toggleLoop,
            setIsPlayingState,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            isShuffling,
            toggleShuffle,
            clearPlayerState,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = ()=>{
    return useContext(PlayerContext);
}