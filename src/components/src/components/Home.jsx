import jwt_decode from "jwt-decode"
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "./common/client";
import { useNavigate } from "react-router-dom";

export const Home=()=>{
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [rooms,setRooms]=useState([]);
    const navigate=useNavigate();
    // console.log(decodedToken);

    useEffect(()=>{
        client.get("/showRoomId/"+userId)
            .then(async(res)=>{
                // console.log(res.data.rooms);
                setRooms(res.data.rooms)
            })
    },[]);


    

    // console.log(rooms)

    function GoToRooms(room){
        localStorage.setItem("selectedRoomId",room._id);
        navigate("/room")
    }

    return(
        <div>
            <div>
                <div>{decodedToken.email}</div>
                <div>{decodedToken.username}</div>
            </div>


            <div>
                <Link to="/createroom">Create Room</Link>
            </div>

            <div>
                <Link to="/joinroom">Join Room</Link>
            </div>

            <div>
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