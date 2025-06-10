import Rule from "postcss/lib/rule";
import { useEffect, useRef, useState } from "react";

export default function Promodoro(){
const[time, setTime] = useState(25*60);
const[isRunning, setIsRunning]= useState(false);
const intervalRef = useRef(null);

const formateTime = (seconds) => {
const m = ('00' +  Math.floor(seconds / 60)).slice(-2)
const s = ('00' + seconds % 60).slice(-2) ;
return `${m}:${s}`
}

useEffect(()=>{
    if(isRunning){
        intervalRef.current = setInterval(() =>{
            setTime((prev) => (prev > 0 ? prev -1 : 0));
        },1000)
    }
    return () => clearInterval(intervalRef.current);

}, [isRunning])




const handleStart = () => {setIsRunning(true);}

const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
}

const handleRestart = () => {
    handleStop();
    setTime(25*60);
}

    return(
        <div className="text-center">
            <div className="text-6xl font-mono mb-6 text-white">{formateTime(time)}</div>
            <div className="flex justify-center gap-5">
                <button onClick={handleStart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">Start</button>
                <button onClick={handleStop} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">Stop</button>
                <button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Restart</button>
            </div>
        </div>
    );
}