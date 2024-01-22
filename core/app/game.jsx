import { useState, useEffect } from "react";

import { TabSwitch } from "./components/tabs"
import { MainPage } from "./components/mainPage"
import { SettingsPage } from "./components/settings/settingsPage"
import { usePlayer, usePlayerDispatch } from "./components/player/playerContext";
import { useResources, useResourcesDispatch } from "./components/resources/resourcesContext";
import { updateAllResources } from "./components/resources/resourcesFunctions";
import { updateAllPlayer } from "./components/player/playerFunctions";
import { updateAllResearch } from "./components/research/researchFunctions";
import { updateAllConstructs } from "./components/constructs/constructsFunctions";

import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from "../libraries/lz-string-1.5.0/libs/lz-string";
import { useResearch, useResearchDispatch } from "./components/research/researchContext";
import { useConstructs, useConstructsDispatch } from "./components/constructs/constructsContext";

export function Game(){
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();
    const research = useResearch();
    const researchDispatch = useResearchDispatch();
    const constructs = useConstructs();
    const constructsDispatch = useConstructsDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    function toMain(){
        setActiveIndex(0);
    }

    function toSettings(){
        setActiveIndex(1);
    }

    const defaultSaveState = {
        influence: 65.45,
        essence: 0,
        contemplation: 0,
        consumed: [0,0,0,0,0,0,0,0,0,0],
        discreteProgress: [0,0,0,0,0,0,0,0,0,0],
        researchCompleted: [],
        researchUnlocked: [],
        researchProgress: [],
        constructs: [],
        lastUpdate: Date.now()
    }

    const SAVE = 'save';

    const [currentSave, setCurrentSave] = useState(defaultSaveState);

    //load localStorage
    useEffect(() => {
        var loaded = JSON.parse(localStorage.getItem(SAVE));
        if(loaded == null) return;
        let offlineTime = Math.floor((Date.now() - loaded.lastUpdate)/1000);
        if(offlineTime >= 1) {
            loaded.contemplation += offlineTime;
            addMessage("Gained " + offlineTime + " Contemplation", "infoMessage");
        }
        setCurrentSave(loaded);
        updateWithLoadedData(loaded);
    }, [])

    function updateWithLoadedData(loaded){
        updateAllResources(loaded, resources, resourcesDispatch);
        updateAllPlayer(loaded, playerDispatch);
        updateAllResearch(loaded, researchDispatch, playerDispatch, resourcesDispatch, constructsDispatch);
        updateAllConstructs(loaded, constructs, constructsDispatch);
    }
    
    const save = (state) => {
        setCurrentSave(state);
        localStorage.setItem(SAVE, JSON.stringify(state));
    }

    const deleteSave = () => {
        if(confirm("Are you sure you want to delete your save and restart from the beginning?")){
            setCurrentSave(defaultSaveState);
            localStorage.removeItem(SAVE);
            location.reload();
        }
    }

    const exportSave = () => {
        var s = compressToEncodedURIComponent(JSON.stringify(currentSave));
        alert("Copy the following and save it elsewhere:\n\n" + s);
    }

    const importSave = () => {
        var s = prompt("Enter save string:".trim());
        var o = tryParseJSONObject(decompressFromEncodedURIComponent(s));
        if(o == false){
            alert("Invalid string!");
            return;
        } else {
            save(o);
            location.reload();
        }
    }

    const tryParseJSONObject = (jsonString) => {
        try {
            var o = JSON.parse(jsonString);
            if(o && typeof o === "object"){
                return o;
            }
        }
        catch (e) {}
        return false;
    }

    const [messageList, setMessageList] = useState([{text: "Welcome to Core", className: "loreMessage"}]);

    const addMessage = (text, className) => {
        var newMessageList = [...messageList];
        newMessageList.unshift({text: text, className: className});
        if(newMessageList.length > 15){
            newMessageList.pop();
        }
        //TODO:
        //  consider some indication of a new message, such as a brief brightening of the text when it appears
        //      this would allow for reduction of duplicate messages, as we could check if the new message
        //      matches the latest message and can just brighten it again as if it was new rather than adding it again
        setMessageList(newMessageList);
    }

    
    return(
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
                lastUpdate={lastUpdate}
                lastUpdateHandler={setLastUpdate}
                messageList={messageList}
                messageHandler={addMessage}
            />
            <SettingsPage 
                isActive={activeIndex === 1}
                currentSave={currentSave}
                saveHandler={save}
                deleteHandler={deleteSave}
                exportHandler={exportSave}
                importHandler={importSave}
                lastUpdate={lastUpdate}
                messageHandler={addMessage}
            />
        </div>
    )
}