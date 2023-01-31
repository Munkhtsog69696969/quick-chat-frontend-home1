import { useRef } from "react"
import { client } from "./common/client";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";


export const JoinRoom=()=>{
    const roomCode=useRef();
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [roomId,setRoomId]=useState(null);

    async function JoinRoom(){
        const roomCodeInput=roomCode.current.value;

        
    }

    

    return(
        <div>
            <div>Enter Room code:</div>
            <input placeholder="Enter Room name..." ref={roomCode}/>
            <button onClick={JoinRoom}>Enter</button>
        </div>
    )
}