import jwt_decode from "jwt-decode"
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "./common/client";
import { useNavigate } from "react-router-dom";
import styles from "./css/Home.module.css"

export const Home=()=>{
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [avatarImg,setAvatarImg]=useState();
    const [rooms,setRooms]=useState([]);
    const navigate=useNavigate();
    // console.log(decodedToken);

    useEffect(()=>{
        setAvatarImg(decodedToken.avatarImageUrl);
    },[])

    useEffect(()=>{
        client.get("/showRoomId/"+userId)
            .then(async(res)=>{
                // console.log(res.data.rooms);
                setRooms(res.data.rooms);
            })
    },[]);


    

    // console.log(rooms)

    function GoToRooms(room){
        localStorage.setItem("selectedRoomId",room._id);
        navigate("/room")
    }

    return(
        <div className={styles.container}>  

            <div className={styles.header}> 
                <img className={styles.avatarImg} src={avatarImg}/>
                <div className={styles.name}>{decodedToken.email}</div>
                <div className={styles.name}>{decodedToken.username}</div>
                <button className={styles.Button}>Log out</button>
            </div>


            <div className={styles.divs}>
                <Link className={styles.jumpLink} to="/createroom">Create Room</Link>
                <Link className={styles.jumpLink} to="/joinroom">Join Room</Link>
            </div>

            <div className={styles.divs}>
                <div>Your rooms:</div>
                {
                    rooms && rooms.map((item,i)=>{
                        return(
                            <div key={i} onClick={()=>GoToRooms(item)}>{item.name}</div>
                        )
                    })
                }
            </div>

        </div>
    )
}