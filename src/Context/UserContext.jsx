import { createContext, useState } from "react";

export let UserContext=createContext()


function UserProvider(props){
    
    let [user, setuser]=useState(null)
    return (
        <UserContext.Provider value={{user, setuser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider