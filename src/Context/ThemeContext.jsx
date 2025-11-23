import { createContext, useState } from "react";


export let ThemeContext = createContext()

function ThemeProvider(props){
    let[theme,setTheme]=useState('light')

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider