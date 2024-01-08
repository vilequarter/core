/*
TODO:
    resources context?
    research context?

    active resources/influence/research state(context?) -> game loop

    saving
*/

"use client";

import './styles.css'

import { useState } from 'react';
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

    const defaultSaveState = {
        influence: 65.45, //volume value
        essence: 0,
        contemplation: 0,
        consumed: [0,0,0,0,0,0,0,0,0,0],
        discreteProgress: [], //if discrete && progress > 0, store id & progress
        researchCompleted: [], //filled with ids where completed == true
        researchProgress: [], //if !completed && progress > 0, store id & progress
        lastUpdate: null
    }

    const [currentSave, setCurrentSave] = useState(defaultSaveState);

    const save = (state) => {
        setCurrentSave(state);
        //TODO: save state to localStorage
    }

    const deleteSave = () => {
        //TODO: prompt
        setCurrentSave(defaultSaveState);
        //TODO: delete localStorage
        //TODO: refresh
    }

    const exportSave = () => {
        //TODO: convert currentSave to text
        //TODO: prompt with text
    }

    const importSave = () => {
        //TODO: prompt with text box
        //TODO: verify text input
        //TODO: convert text to JSON
        //TODO: update currentSave
        //TODO: refresh
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

                    <MainPage
                        isActive={activeIndex === 0}
                        saveHandler={save}
                        currentSave={currentSave}
                    />
                    <SettingsPage 
                        isActive={activeIndex === 1}
                        currentSave={currentSave}
                        saveHandler={save}
                        deleteHandler={deleteSave}
                        exportHandler={exportSave}
                        importHandler={importSave}
                    />
                </div>
            </ResourcesProvider>
        </PlayerProvider>
    );
}