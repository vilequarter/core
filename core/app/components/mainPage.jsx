import { useState, useEffect, useRef } from "react"

import { ResourcesColumn } from "./resources/resourcesColumn.jsx"
import { InfluenceColumn } from "./influence/influenceColumn.jsx"
import { ConstructsColumn } from "./constructs/constructsColumn.jsx"
import { ResearchColumn } from "./research/researchColumn.jsx"
import { MessageBox } from "./messages/messageBox.jsx"
import { Debug } from "./test/debug.jsx"

import { usePlayer, usePlayerDispatch } from "./player/playerContext.jsx"
import { useResources, useResourcesDispatch } from "./resources/resourcesContext.jsx"
import { addAction, removeAction } from "./player/playerFunctions.jsx"
import { consumeVolume, consumeDiscrete } from "./resources/resourcesFunctions.jsx"
import { addEssence, addContemplation, removeEssence, removeContemplation } from "./player/playerFunctions.jsx"
import { doResearch } from "./research/researchFunctions.jsx"
import { useResearch, useResearchDispatch } from "./research/researchContext.jsx"
import { useConstructs, useConstructsDispatch } from "./constructs/constructsContext.jsx"
import { doConstructs } from "./constructs/constructsFunctions.jsx"

export function MainPage({isActive, saveHandler, currentSave, lastUpdate, lastUpdateHandler, messageList, messageHandler}){
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();
    const research = useResearch();
    const researchDispatch = useResearchDispatch();
    const constructs = useConstructs();
    const constructsDispatch = useConstructsDispatch();

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

    //basic game loop
    useEffect(() => {
        loopRef.current = setInterval(() => {
            doUpdates();
            if(gameSpeed > 1){
                //if a speed button is on, remove required contemplation
                if(!removeContemplation((gameSpeed + 1), player, playerDispatch)){
                    //if no more contemplation, set game speed back to 1
                    setGameSpeed(1);
                }
            }
            //save and reset the save timer
            if(saveReady){
                save();
                setSaveReady(false);
                setSaveInterval(Date.now());
            }
            //set the last update to now
            lastUpdateHandler(Date.now());
        }, loopDelay);
        
        return () => {
            clearInterval(loopRef.current);
        }
    })

    //offline time gain interval
    //seems to only run when tab is inactive, which is fine as that's what this is for anyway
    useEffect(() =>{
        realTimeLoopRef.current = setInterval(() => {
            //check number of seconds since the last update
            let time = Math.floor((Date.now() - lastUpdate)/1000);
            if(time >= 1){
                //add ticks since last update to contemplation
                addContemplation(10 * time, playerDispatch);
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
            //if 10 minutes have passed since the last save, save on the next update loop
            if((Date.now() - lastSave) / 1000 >= 300){
                setSaveReady(true);
            }
        }, 1000);
        return () => {
            clearInterval(saveRef.current);
        }
    }, [saveReady]) //only run when saveReady changes

    const [expanding, setExpanding] = useState(false);
    function toggleExpansion(){
        if(!expanding){ //attempt to turn on expansion
            if(player.essence < player.getExpandCost()){
                messageHandler("Not enough essence, can't expand influence", "infoMessage");
                return;
            };
            if(!addAction(player, playerDispatch)) {
                messageHandler("Not enough available actions, cancel an activity first", "infoMessage");
                return;
            }
            setExpanding(true);
        } else { //turn off expansion
            removeAction(playerDispatch);
            setExpanding(false);
        }
    }

    function doUpdates(){
        consumeActiveResources();
    
        expandInfluence();
    
        updateActiveResearch();

        updateActiveConstructs();
    }

    //TODO: move this function to resourcesFunctions.jsx
    function consumeActiveResources(){
        resources.map(resource => {
            if(!resource.active){ //inactive resources have no change
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

        //if player has enough essence to cover the tick cost of expansion, expand influence
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
        doResearch(research, researchDispatch, player, playerDispatch, resources, resourcesDispatch, constructsDispatch, messageHandler);
    }

    function updateActiveConstructs(){
        doConstructs(playerDispatch, constructs, constructsDispatch, messageHandler)
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
            researchUnlocked: [],
            researchProgress: [],
            constructs: []
        };
        resources.forEach((r) => {
            newState.consumed[r.id] = r.consumed;
            if(r.type === "discrete") newState.discreteProgress[r.id] = r.progress;
        })
        research.map((r) => {
            if(r.complete) {
                newState.researchCompleted.push(r.id);
                return;
            }
            if(r.unlocked) {
                newState.researchUnlocked.push(r.id);
            }
            if(r.essencePaid > 0){
                newState.researchProgress.push({id: r.id, value: r.essencePaid});
                return;
            }
        })
        constructs.forEach((c) => {
            newState.constructs.push(c);
        })
        saveHandler(newState);
        messageHandler("Game Saved", "infoMessage");
    }

    return(
        <div className={isActive ? "display-flex" : "display-none"}>
            <ResourcesColumn speed = {gameSpeed} speedHandler = {changeGameSpeed} messageHandler={messageHandler}/>
            <InfluenceColumn expanding = {expanding} expandingHandler = {toggleExpansion}/>
            <ConstructsColumn messageHandler={messageHandler}/>
            <ResearchColumn messageHandler={messageHandler}/>
            <MessageBox messageList={messageList}/>

            {
                process.env.NODE_ENV == 'development' && <Debug handler={messageHandler} player={player} resources={resources} constructs={constructs}/>
            }
        </div>
    )
}