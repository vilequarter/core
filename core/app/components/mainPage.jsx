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

export function MainPage({isActive, saveHandler, currentSave, lastUpdate, lastUpdateHandler, messageList, messageHandler}){
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();

    const [gameSpeed, setGameSpeed] = useState(1);
    function changeGameSpeed(value){
        setGameSpeed(value);
    }
    const ticksPerSecond = 10;
    const loopDelay = 1000 / (ticksPerSecond * gameSpeed);
    const loopRef = useRef(null);
    const realTimeLoopRef = useRef(null);
    const saveRef = useRef(null);
    const [saveInterval, setSaveInterval] = useState(Date.now())
    const [saveReady, setSaveReady] = useState(false);

    useEffect(() => {
        loopRef.current = setInterval(() => {
            doUpdates();
            if(gameSpeed > 1){
                if(!removeContemplation((gameSpeed + 1), player, playerDispatch)){
                    setGameSpeed(1);
                }
            }
            if(saveReady){
                save();
                setSaveReady(false);
                setSaveInterval(Date.now());
            }
            lastUpdateHandler(Date.now());
        }, loopDelay);
        
        return () => {
            clearInterval(loopRef.current);
        }
    })

    //offline time gain interval
    useEffect(() =>{
        realTimeLoopRef.current = setInterval(() => {
            let time = Math.floor((Date.now() - lastUpdate)/1000);
            if(time >= 1){
                addContemplation(time, playerDispatch);
            }
        }, 1000);
        return () => {
            clearInterval(realTimeLoopRef.current);
        }
    })

    //save interval
    useEffect(() => {
        var lastSave = saveInterval;
        saveRef.current = setInterval(() => {
            if((Date.now() - lastSave) / 1000 >= 300){
                setSaveReady(true);
            }
        }, 1000);
        return () => {
            clearInterval(saveRef.current);
        }
    }, [saveReady])

    const [expanding, setExpanding] = useState(false);
    function toggleExpansion(){
        if(!expanding){
            if(player.essence < player.getExpandCost()){
                messageHandler("Not enough essence, can't expand influence", "infoMessage");
                return;
            };
            if(!addAction(player, playerDispatch)) {
                messageHandler("Not enough available actions, cancel an activity first", "infoMessage");
                return;
            }
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
                consumeDiscrete(resource.id, resources, resourcesDispatch, player, playerDispatch, messageHandler);
            }
            else{
                var essenceToAdd = consumeVolume(resource.id, resources, resourcesDispatch, player, playerDispatch, messageHandler);
                if(!addEssence(essenceToAdd, player, playerDispatch)){
                    resourcesDispatch({
                        type: 'deactivateResource',
                        id: resource.id
                    });
                    removeAction(playerDispatch);
                    messageHandler("Your essence is full, turned off consumption of " + resource.name, "errorMessage");
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
            messageHandler("Not enough essence, can't expand influence", "infoMessage");
            toggleExpansion();
        }
    }
    
    function updateActiveResearch(){
        
    }

    function save(){
        var newState = {
            influence: player.influenceVolume,
            essence: player.essence,
            contemplation: player.contemplation,
            lastUpdate: lastUpdate,
            consumed: [0,0,0,0,0,0,0,0,0,0],
            discreteProgress: [0,0,0,0,0,0,0,0,0,0],
            researchCompleted: [],
            researchProgress: []
        };
        resources.forEach((r) => {
            newState.consumed[r.id] = r.consumed;
            if(r.type === "discrete") newState.discreteProgress[r.id] = r.progress;
        })
        //TODO: update research save
        saveHandler(newState);
        messageHandler("Game Saved", "infoMessage");
    }

    return(
        <div className={isActive ? "display-flex" : "display-none"}>
            <ResourcesColumn speed = {gameSpeed} speedHandler = {changeGameSpeed} messageHandler={messageHandler}/>
            <InfluenceColumn expanding = {expanding} expandingHandler = {toggleExpansion}/>
            <ConstructsColumn />
            <ResearchColumn />
            <MessageBox messageList={messageList}/>

            {/*<Debug handler={messageHandler}/>*/}
        </div>
    )
}