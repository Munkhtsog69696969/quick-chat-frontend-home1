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
    const navigate=useNavigate();
    const [friends,setFriends]=useState([]);
    const [selectedFriend,setSelectedFriend]=useState();
    // console.log(decodedToken);

    useEffect(()=>{
        setAvatarImg(decodedToken.avatarImageUrl);
    },[])


    function Logout(){
        localStorage.removeItem("token");
        navigate("/login")
    }

    useEffect(()=>{
        client.get("/getUserData/"+userId)
            .then(async(res)=>{
                // console.log(res.data);
                setFriends(res.data)
            }).catch((err)=>{
                console.log(err);
            })
    },[])

    console.log(friends)

    async function currentChat(user){
        setSelectedFriend(user)
    }

    console.log("user:",selectedFriend)

    return(
        <div className={styles.container}>  

            <div className={styles.header}> 
                <img className={styles.avatarImg} src={avatarImg}/>
                <div className={styles.name}>{decodedToken.email}</div>
                <div className={styles.name}>{decodedToken.username}</div>
                <button className={styles.Button} onClick={Logout}>Log out</button>
                <Link to="/addfriend" className={styles.text}>Add Friend</Link>
                <Link to="/incomefriendrequest" className={styles.text}>Incoming friend request</Link>
            </div>

            <div className={styles.body}>
                <div className={styles.friends}>
                    {
                        friends && friends.map((item,i)=>{
                            return(
                                <div className={styles.friendContainer} onClick={()=>currentChat(item)}>
                                    <img className={styles.avatarImg} src={item.avatarImageUrl}/>

                                    <div>
                                        <div className={styles.text}>{item.username}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.currentChat}>
                    <div className={styles.currentChatHeader}>
                        <img className={styles.avatarImg} src={selectedFriend!=undefined && selectedFriend.avatarImageUrl}/>
                        <div className={styles.text}>{selectedFriend!=undefined && selectedFriend.username}</div>
                    </div>

                    <div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}