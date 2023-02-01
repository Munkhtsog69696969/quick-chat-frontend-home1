import { useEffect, useRef } from "react";
import { client } from "./common/client";


export const Room=()=>{
    const roomId=localStorage.getItem("selectedRoomId");
    const text=useRef();

    // useEffect(()=>{
    //     client.get("/getRoomData/"+roomId)
    //         .then(async(res)=>{
    //             console.log(res.data)
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    // },[])

    async function Send(){
        const textInput=text.current.value;

        await client.put("/pushText/"+roomId , {text:textInput})
            .then(async(res)=>{
                console.log(res.data.texts);
            }).catch((err)=>{
                console.log(err)
            })

    }

    return(
        <div>
            <input placeholder="Write something..." ref={text}/>
            <button onClick={Send}>Send</button>
        </div>
    )
}