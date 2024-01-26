/* TODO
    messageContext?

    number library (number, breakinfinity, breaketernity, etc)

    option for turning off informational messages (running out of essence/resource, research complete, etc)
    
    period between unlocking essence cores and unlocking dirt eaters is slow and tedious, add more research
        probably along the lines of dirt consumption and influence expansion rates

    BUGS
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