import { useState } from "react";
import { useEffect, useRef } from "react";
import { client } from "./common/client";


export const Room=()=>{
    const roomId=localStorage.getItem("selectedRoomId");
    const [roomName,setRoomName]=useState();
    const text=useRef();
    const [texts,setTexts]=useState();

    useEffect(()=>{
        client.get("/getRoomData/"+roomId)
            .then(async(res)=>{
                // console.log(res.data);
                setRoomName(res.data.name);
            }).catch((err)=>{
                console.log(err)
            })
    },[])


    async function Send(){
        const textInput=text.current.value;

        await client.put("/pushText/"+roomId , {text:textInput})
            .then(async(res)=>{
                console.log(res.data.texts);
                // setTexts(res.data.texts)
            }).catch((err)=>{
                console.log(err)
            })
    }


    setInterval(()=>{
        client.get("/getRoomData/"+roomId)
            .then(async(res)=>{
                console.log(res.data.texts)
                setTexts(res.data.texts)
            }).catch((err)=>{
                console.log(err)
            })
    },1000)


    return(
        <div>
            <div>{roomName}</div>

            <input placeholder="Write something..." ref={text}/>

            <button onClick={Send}>Send</button>

            {
                texts && texts.map((item,i)=>{
                    return(
                        <div>{item}</div>
                    )
                })
            }
            
        </div>
    )
}