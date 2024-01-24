/* TODO
    messageContext?

    number library (number, breakinfinity, breaketernity, etc)

    option for turning off informational messages (running out of essence/resource, research complete, etc)    

    a rare bug where actions are getting removed twice
*/

"use client";

import './styles.css'
import Head from 'next/head';
import { Game } from './game';
import Providers from './components/providers';
import { Top } from './components/test/top';



export default function Home() {
    /*
    return(
        <Top></Top>
    )
    */
    
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