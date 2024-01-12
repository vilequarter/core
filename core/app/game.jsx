import { useState, useEffect } from "react";

import { TabSwitch } from "./components/tabs"
import { MainPage } from "./components/mainPage"
import { SettingsPage } from "./components/settings/settingsPage"
import { usePlayer, usePlayerDispatch } from "./components/player/playerContext";
import { useResources, useResourcesDispatch } from "./components/resources/resourcesContext";
import { updateAllResources } from "./components/resources/resourcesFunctions";
import { updateAllPlayer } from "./components/player/playerFunctions";

import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from "../libraries/lz-string-1.5.0/libs/lz-string";

export function Game(){
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();

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
        researchProgress: [],
        lastUpdate: Date.now()
    }

    const SAVE = 'save';

    const [currentSave, setCurrentSave] = useState(defaultSaveState);

    //load localStorage
    useEffect(() => {
        var loaded = JSON.parse(localStorage.getItem(SAVE));
        if(loaded == null) return;
        let offlineTime = Math.floor((Date.now() - loaded.lastUpdate)/1000);
        if(offlineTime >= 1) loaded.contemplation += offlineTime;
        setCurrentSave(loaded);
        updateWithLoadedData(loaded);
    }, [])

    function updateWithLoadedData(loaded){
        updateAllResources(loaded, resources, resourcesDispatch);
        updateAllPlayer(loaded, playerDispatch);
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
            //TODO: invalid save message
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
            />
            <SettingsPage 
                isActive={activeIndex === 1}
                currentSave={currentSave}
                saveHandler={save}
                deleteHandler={deleteSave}
                exportHandler={exportSave}
                importHandler={importSave}
                lastUpdate={lastUpdate}
            />
        </div>
    )
}