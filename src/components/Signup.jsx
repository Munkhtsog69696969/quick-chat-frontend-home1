import { useRef } from "react"
import { client } from "./common/client"
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const navigate=useNavigate();

    async function Signup(){
        const usernameValue=username.current.value;
        const emailValue=email.current.value;
        const passwordValue=password.current.value;

        await client.post("/signup",{username:usernameValue , email:emailValue , password:passwordValue})
            .then(async(res)=>{
                // console.log(res.data);
                if(res.data=="Created new user."){
                    navigate("/login")
                }
            }).catch((err)=>{
                console.log(err);
            })
    }

    return(
        <div>
            <input placeholder="Username" ref={username}/>
            <input placeholder="Email" ref={email}/>
            <input placeholder="Password" ref={password}/>
            <button onClick={()=>Signup()}>Create new user</button>
        </div>
    )
}