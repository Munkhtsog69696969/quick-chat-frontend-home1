import { useRef } from "react"
import { client } from "./common/client";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Joinroom.module.css"
import io from "socket.io-client"

const socket=io.connect("http://localhost:4000");

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

        // await client.put("/pushNewUser" , {roomCode:roomCodeInput , userId:userId})
        //     .then(async(res)=>{
        //         // console.log(res.data);
        //         if(res.data!="Room doesnt exist"){
        //             setJoinedRoomData(res.data)
        //         }
        //     }).catch((err)=>{
        //         console.log(err)
        //     })

        if(roomCodeInput!=""){
            localStorage.setItem("roomNumber",roomCodeInput)

            navigate("/room")
        }
    }

    // useEffect(()=>{
    //     const roomCodeInput=roomCode.current.value;

    //     if(joinedRoomData!=null){
    //         client.put("/pushRoomId/"+userId , {roomId:joinedRoomData._id})
    //             .then(async(res)=>{
    //                 // console.log(res.data);

    //                 if(roomCodeInput!=""){
    //                     socket.emit("join_room",{room:roomCodeInput});
            
    //                     navigate("/room")
    //                 }

    //             }).catch((err)=>{
    //                 console.log(err)
    //             })
    //     }
    // },[joinedRoomData])

    

    return(
        <div className={styles.container}>
            <div className={styles.bigText}>Enter Room code:</div>

            <div>
                <input className={styles.Input} placeholder="Enter Room code..." ref={roomCode}/>
                <button className={styles.Button} onClick={JoinRoom}>Enter</button>
            </div>

        </div>
    )
}