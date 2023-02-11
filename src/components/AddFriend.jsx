
import styles from "./css/AddFriend.module.css"

import { useRef } from "react";

import { client } from "./common/client";

import jwt_decode from "jwt-decode"

export const AddFriend=()=>{
    const friendCode=useRef();
    const decodedToken=jwt_decode(localStorage.getItem("token")).existingUser;
    const userId=decodedToken._id;

    async function Find(){
        if(friendCode.current.value!=""){
            await client.post("/findFriends",{usercode:friendCode.current.value})
                .then(async(res)=>{
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err)
                })
        }
        
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <input ref={friendCode} placeholder="Enter friend's code..." className={styles.Input}/>
                <button className={styles.Button} onClick={Find}>Find</button>
            </div>
        </div>
    )
}