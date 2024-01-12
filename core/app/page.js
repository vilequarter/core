/*
TODO:
    
*/

"use client";

import './styles.css'
import Head from 'next/head';

import { PlayerProvider } from './components/player/playerContext';
import { ResourcesProvider } from './components/resources/resourcesContext';

import { Game } from './game';



export default function Home() {
    return (
        <>
            <Head>
                <title>Core</title>
            </Head>
            <PlayerProvider>
                <ResourcesProvider>
                    <Game
                
                    />
                </ResourcesProvider>
            </PlayerProvider>

        </>
    );
    
}