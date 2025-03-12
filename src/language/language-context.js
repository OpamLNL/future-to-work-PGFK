import { createContext, useState } from 'react';

const LanguageContext = createContext("en-US");

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en-US");

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === "en-US" ? "uk-UA" : "en-US"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageProvider, LanguageContext };