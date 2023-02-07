import { useState } from "react";
import { useEffect, useRef } from "react";
import { client } from "./common/client";
import io from "socket.io-client"
import styles from "./css/Room.module.css"

const socket=io.connect("http://localhost:4000")

export const Room=()=>{
    // const roomId=localStorage.getItem("selectedRoomId");
    // const [roomName,setRoomName]=useState();
    // const text=useRef();
    // const [texts,setTexts]=useState();

    // useEffect(()=>{
    //     client.get("/getRoomData/"+roomId)
    //         .then(async(res)=>{
    //             // console.log(res.data);
    //             setRoomName(res.data.name);
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    // },[])
    const text=useRef();
    const roomNumber=localStorage.getItem("roomNumber")
    const [messageReceived,setMessageReceived]=useState();

    useEffect(()=>{
        socket.emit("join_room",{room:roomNumber});
    },[]);

    async function Send(){
        const textInput=text.current.value;

        // await client.put("/pushText/"+roomId , {text:textInput})
        //     .then(async(res)=>{
        //         console.log(res.data.texts);
        //         // setTexts(res.data.texts)
        //     }).catch((err)=>{
        //         console.log(err)
        //     })

        socket.emit("send_message",{message:textInput , room:roomNumber}) 
    } 

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
          console.log(data)
          setMessageReceived(data)
        })
    
    },[socket])

    console.log(messageReceived)

    return(
        <div className={styles.container}>
            <input placeholder="Write something..." ref={text}/>

            <button onClick={Send}>Send</button>

            <div>
                {
                    messageReceived && messageReceived.map((item,i)=>{
                        return(
                            <div>{item}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}