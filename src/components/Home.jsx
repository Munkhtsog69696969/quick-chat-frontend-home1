import jwt_decode from "jwt-decode"
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "./common/client";
import { useNavigate } from "react-router-dom";
import styles from "./css/Home.module.css"

import io from "socket.io-client";
const socket=io.connect("http://localhost:3333");

export const Home=()=>{
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [avatarImg,setAvatarImg]=useState();
    const navigate=useNavigate();
    const [friends,setFriends]=useState([]);
    const [selectedFriend,setSelectedFriend]=useState();
    const messageInput=useRef();

    const [selectedRoom,setSelectedRoom]=useState();

    const [messageList,setMessageList]=useState([]);
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

        let roomId;

        if(decodedToken.usernumber <= user.usernumber){
            roomId=decodedToken.usercode+user.usercode;
        }else{
            roomId=user.usercode+decodedToken.usercode;
        }

        await client.post("/findByRoomId",{roomId:roomId})
            .then(async(res)=>{
                console.log("room:",res.data)
                setSelectedRoom(res.data)
                socket.emit("join-room",(res.data[0].roomId))
            })
    }

    console.log("selected room:",selectedRoom)
    
    async function SendMessage(){
        const message=messageInput.current.value;

        if(selectedRoom!=undefined){
            const _id=selectedRoom[0]._id

            await client.put("/pushTextToRoom/"+_id, {text:message})

            socket.emit("send-messages",({room:selectedRoom[0].roomId , message:message}))

            setMessageList((prev)=>[...prev , message])
        }
    }

    console.log("user:",selectedFriend)

    useEffect(()=>{
        if(selectedRoom!=undefined){
            const _id=selectedRoom[0]._id

            client.get("/getRoomTexts/"+_id)
                .then(async(res)=>{
                    console.log("prev chats:",res.data)
                    setMessageList(res.data)
                })
        }
    },[selectedRoom])

    useEffect(()=>{
        socket.on("receive-messages",(data)=>{
            setMessageList((list)=>[...list , data])
        })
    },[socket])

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
                                <div key={i} className={styles.friendContainer} onClick={()=>currentChat(item)}>
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

                    <div className={styles.currentChatBody}>
                        {
                            messageList && messageList.map((item,i)=>{
                                return(
                                    <div className={styles.messageContainer}>
                                        <div>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={styles.currentChatFooter}>
                        <input placeholder="Enter message..." className={styles.Input} ref={messageInput}/>

                        <button onClick={SendMessage} className={styles.Button1}>Send</button>
                    </div>
                </div>

            </div>

        </div>
    )
}