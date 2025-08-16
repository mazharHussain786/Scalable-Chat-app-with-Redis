import { useRef } from "react";
import { useSocket } from "./Context/Socket";

export const Chat=()=>
{
    
    const message = useRef<HTMLInputElement>(null)
    const {sendMessage}=useSocket()
    const handleSubmit=()=>
    {
        if(message.current?.value)
        {
          sendMessage(message.current?.value || "")
        }
     
    }
    return (
        <div>
        <h1>Chat Component</h1>
        <input type="text" ref={message}/>
        <button onClick={handleSubmit}>Send</button>
        </div>
    );
}