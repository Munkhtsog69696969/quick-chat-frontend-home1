import jwt_decode from "jwt-decode"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "./common/client";

export const Home=()=>{
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token).existingUser;
    const userId=decodedToken._id;
    const [rooms,setRooms]=useState([]);

    // console.log(decodedToken);

    useEffect(()=>{
        client.get("/showRoomId/"+userId)
            .then(async(res)=>{
                // console.log(res.data.rooms);
                setRooms(res.data.rooms)
            })
    },[]);

    console.log(rooms)

    return(
        <div>
            <div>
                <div>{decodedToken.email}</div>
                <div>{decodedToken.username}</div>
            </div>

            <div>
                <input placeholder="Enter room code..."/>
                <button>Join Room</button>
            </div>

            <div>
                <Link to="/createroom">Create new Room</Link>
            </div>

            <div>
                <div>Your rooms:</div>

                {
                    rooms && rooms.map((item,i)=>{
                        return(
                            <div key={i}>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}