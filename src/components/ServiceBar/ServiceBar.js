// ServiceBar.js
import { useNavigate } from "react-router-dom";

import { SectionContainer } from "../Containers";
import css from "./ServiceBar.module.css";

import {
    LanguageSwitcher,
    ThemeSwitcher,
    SearchBar, UserInfo
} from "../../components";

import { HomeButton } from "../Buttons";
import serviceBarLocales from "./serviceBarLocales.json";
import { LanguageContext } from "../../language/language-context";
import { useContext } from "react";


export const ServiceBar = () => {
    const navigate = useNavigate();
    const language = useContext(LanguageContext);


    return (
        <SectionContainer className={css.container}>
            <div>
                <div>
                    {serviceBarLocales.find(item => item.hasOwnProperty('startButton1'))?.startButton1[language.language] || ''}
                    <br />
                    {serviceBarLocales.find(item => item.hasOwnProperty('startButton2'))?.startButton2[language.language] || ''}
                </div>

            </div>
            <HomeButton onClick={() => navigate('/home')}/>

            <SearchBar />

            <div className={css.switcherContainer}>
                <div className={css.settingItem}>
                    <LanguageSwitcher />
                </div>
                <div className={css.settingItem}>
                    <ThemeSwitcher />
                </div>
            </div>
            <div>
                <UserInfo />
            </div>

        </SectionContainer>
    );
};


