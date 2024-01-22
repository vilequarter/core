/* TODO
    messageContext?

    option for turning off informational messages (running out of essence/resource, research complete, etc)    

    a rare bug where actions are getting removed twice
*/

"use client";

import './styles.css'
import Head from 'next/head';

import { PlayerProvider } from './components/player/playerContext';
import { ResourcesProvider } from './components/resources/resourcesContext';

import { Game } from './game';
import { ResearchProvider } from './components/research/researchContext';
import { ConstructsProvider } from './components/constructs/constructsContext';



export default function Home() {
    return (
        <>
            <Head>
                <title>Core</title>
            </Head>
            <PlayerProvider>
                <ResourcesProvider>
                    <ResearchProvider>
                        <ConstructsProvider>
                            <Game/>
                        </ConstructsProvider>
                    </ResearchProvider>
                </ResourcesProvider>
            </PlayerProvider>
        </>
    );
}