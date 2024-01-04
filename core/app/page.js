/*
TODO:
    resources context?
    research context?

    active resources/influence/research state(context?) -> game loop

    fix message box
*/

"use client";

import './styles.css'

import { useState, useEffect } from 'react';
import Head from 'next/head';

import { PlayerProvider } from './components/player/playerContext';
import { ResourcesProvider } from './components/resources/resourcesContext';

import { TabSwitch } from './components/tabs';
import { MainPage } from './components/mainPage';
import { SettingsPage } from './components/settings/settingsPage';



export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0);

    function toMain(){
        setActiveIndex(0);
    }

    function toSettings(){
        setActiveIndex(1);
    }

    return (
        <PlayerProvider>
            <ResourcesProvider>
                <Head>
                    <title>Core</title>
                </Head>

                <div className="game">
                    <TabSwitch 
                        tabs={[
                            {id: 0, title: "Main", handler: () => toMain()}, 
                            {id: 1, title: "Settings", handler: () => toSettings()}]}
                        isActive={activeIndex}/>

                    <MainPage isActive={activeIndex === 0}/>
                    <SettingsPage isActive={activeIndex === 1}/>
                </div>
            </ResourcesProvider>
        </PlayerProvider>
    );
}