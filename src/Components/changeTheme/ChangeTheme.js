import React, { createContext, useState } from 'react'

export const ThemeContext = createContext();
export default function ChangeTheme({children}) {
    const [theme, setTheme] = useState(false);
    const toggleTheme = () => {
        setTheme(!theme)
        document.body.setAttribute('data-theme', theme ? 'light' : 'dark')
    }
  return (
    <>
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    </>
  )
}
