import { useRef } from "react"
import { client } from "./common/client";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const JoinRoom=()=>{
    const roomCode=useRef();
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [roomId,setRoomId]=useState(null);
    const [joinedRoomData,setJoinedRoomData]=useState(null)
    const navigate=useNavigate();


    async function JoinRoom(){
        const roomCodeInput=roomCode.current.value;

        await client.put("/pushNewUser" , {roomCode:roomCodeInput , userId:userId})
            .then(async(res)=>{
                // console.log(res.data);
                if(res.data!="Room doesnt exist"){
                    setJoinedRoomData(res.data)
                }
            }).catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        if(joinedRoomData!=null){
            client.put("/pushRoomId/"+userId , {roomId:joinedRoomData._id})
                .then(async(res)=>{
                    // console.log(res.data);
                    navigate("/home")
                }).catch((err)=>{
                    console.log(err)
                })
        }
    },[joinedRoomData])

    

    return(
        <div>
            <div>Enter Room code:</div>
            <input placeholder="Enter Room name..." ref={roomCode}/>
            <button onClick={JoinRoom}>Enter</button>
        </div>
    )
}