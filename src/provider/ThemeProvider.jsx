import { createContext, useState } from "react";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    const themes = {
        theme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={themes}>
            {children}
        </ThemeContext.Provider>
);
};

export default ThemeProvider;