import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";


interface SocketContextType {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    sendMessage:(message:string)=>void
}



const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider=({children}:{children:ReactNode})=>
{
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>| null>(null);
    
    useEffect(()=>
    {
        if(socket) {
            return; // Prevent multiple connections
        }

        const socketConnection=io("http://localhost:3000")
        setSocket(socketConnection);
        return () => {
            socketConnection.disconnect();
        };
    },[])

    const sendMessage=(message:string)=>
    {
        socket?.emit("message",message)
    }


    return(
        <SocketContext.Provider value={{socket,sendMessage}} >
            {children}
        </SocketContext.Provider>
    )

}

export const useSocket=()=>
{
    const context=useContext(SocketContext)
    if(!context)
    {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}