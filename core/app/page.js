/* TODO
    messageContext
*/

"use client";

import './styles.css'
import Head from 'next/head';

import { PlayerProvider } from './components/player/playerContext';
import { ResourcesProvider } from './components/resources/resourcesContext';

import { Game } from './game';
import { ResearchProvider } from './components/research/researchContext';



export default function Home() {
    return (
        <>
            <Head>
                <title>Core</title>
            </Head>
            <PlayerProvider>
                <ResourcesProvider>
                    <ResearchProvider>
                        <Game

                        />
                    </ResearchProvider>
                </ResourcesProvider>
            </PlayerProvider>

        </>
    );
    
}