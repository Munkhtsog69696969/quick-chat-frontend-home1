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


    function Logout(){
        localStorage.removeItem("token");
        navigate("/login")
    }

    return(
        <div className={styles.container}>  

            <div className={styles.header}> 
                <img className={styles.avatarImg} src={avatarImg}/>
                <div className={styles.name}>{decodedToken.email}</div>
                <div className={styles.name}>{decodedToken.username}</div>
                <button className={styles.Button} onClick={Logout}>Log out</button>
                <Link to="/addfriend" className={styles.text}>Add Friend</Link>
            </div>

            <div className={styles.body}>
                <div className={styles.chats}>

                </div>

                <div className={styles.currentChat}>

                </div>
            </div>

        </div>
    )
}