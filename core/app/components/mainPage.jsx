import { useState, useEffect, useRef } from "react"

import { ResourcesColumn } from "./resources/resourcesColumn.jsx"
import { InfluenceColumn } from "./influence/influenceColumn.jsx"
import { ConstructsColumn } from "./constructs/constructsColumn.jsx"
import { ResearchColumn } from "./research/researchColumn.jsx"
import { MessageBox } from "./messages/messageBox.jsx"
import { Debug } from "./debug.jsx"

import { usePlayer, usePlayerDispatch } from "./player/playerContext.jsx"
import { useResources, useResourcesDispatch } from "./resources/resourcesContext.jsx"
import { addAction, removeAction } from "./player/playerFunctions.jsx"
import { consumeVolume, consumeDiscrete } from "./resources/resourcesFunctions.jsx"
import { addEssence, addContemplation, removeEssence, removeContemplation } from "./player/playerFunctions.jsx"

export function MainPage({isActive, saveHandler, currentSave}){
    //TODO: load currentSave on page load


    const [gameSpeed, setGameSpeed] = useState(1);
    function changeGameSpeed(value){
        setGameSpeed(value);
    }
    //default ticksPerSecond = 10, adjusted by gameSpeed
    const ticksPerSecond = 10;
    const loopDelay = 1000 / (ticksPerSecond * gameSpeed);
    const loopRef = useRef(null);
    const realTimeLoopRef = useRef(null);
    //TODO: save lastUpdate in localStorage to allow for offline progress
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    //10 minute auto save interval
    const [saveInterval, setSaveInterval] = useState(600)

    useEffect(() => {
        loopRef.current = setInterval(() => {
            doUpdates();
            if(gameSpeed > 1){
                if(!removeContemplation((gameSpeed + 1), player, playerDispatch)){
                    setGameSpeed(1);
                }
            }
            setLastUpdate(Date.now());
        }, loopDelay);
        
        return () => {
            clearInterval(loopRef.current);
        }
    })

    useEffect(() =>{
        realTimeLoopRef.current = setInterval(() => {
            let time = Math.floor((Date.now() - lastUpdate)/1000);
            if(time >= 1){
                console.log("Adding " + time + " contemplation");
                addContemplation(time, playerDispatch);
            }
            if(saveInterval <= 0){
                save();
                setSaveInterval(600);
            }
            setSaveInterval(saveInterval - 1);
        }, 1000);

        return () => {
            clearInterval(realTimeLoopRef.current);
        }
    })

    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();

    const [expanding, setExpanding] = useState(false);
    function toggleExpansion(){
        if(!expanding){
            if(player.essence < player.getExpandCost()) return;
            if(!addAction(player, playerDispatch)) return;
            setExpanding(true);
        } else {
            removeAction(playerDispatch);
            setExpanding(false);
        }
    }

    function doUpdates(){
        consumeActiveResources();
    
        expandInfluence();
    
        updateActiveResearch();

    }

    function consumeActiveResources(){
        resources.map(resource => {
            if(!resource.active){
                return;
            }
            if(resource.type == "discrete"){
                consumeDiscrete(resource.id, resources, resourcesDispatch, player, playerDispatch);
            }
            else{
                var essenceToAdd = consumeVolume(resource.id, resources, resourcesDispatch, player, playerDispatch);
                if(!addEssence(essenceToAdd, player, playerDispatch)){ //essence is max, deactivate
                    resourcesDispatch({
                        type: 'deactivateResource',
                        id: resource.id
                    });
                    removeAction(playerDispatch);
                }
            }
        })
    }    
    
    function expandInfluence(){
        if(!expanding) return;

        if(removeEssence(player.getExpandCost(), player, playerDispatch)){
            playerDispatch({
                type: 'addInfluence',
                value: player.getExpandRate()
            })
        }
        else {
            toggleExpansion();
        }
    }
    
    function updateActiveResearch(){
        
    }

    function save(){
        const newState = [...currentSave];
        //TODO: update newState
        saveHandler(newState);
    }

    return(
        <div className={isActive ? "display-flex" : "display-none"}>
            <ResourcesColumn speed = {gameSpeed} speedHandler = {changeGameSpeed}/>
            <InfluenceColumn expanding = {expanding} expandingHandler = {toggleExpansion}/>
            <ConstructsColumn />
            <ResearchColumn />
            <MessageBox />

            <Debug />
        </div>
    )
}