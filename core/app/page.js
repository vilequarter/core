/* TODO
    messageContext?
    research/resource/construct class?
        move initial research/resources/constructs to separate files

    option for turning off informational messages (running out of essence/resource, research complete, etc)    

    a rare bug where actions are getting removed twice
*/

"use client";

import './styles.css'
import Head from 'next/head';
import { Game } from './game';
import Providers from './components/providers';



export default function Home() {
    return (
        <>
            <Head>
                <title>Core</title>
            </Head>

            <Providers>
                <Game/>
            </Providers>
        </>
    );
}