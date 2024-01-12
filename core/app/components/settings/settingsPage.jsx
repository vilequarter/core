import { AutoSaveSetting } from "./autoSave"
import { InfoAcknowledgements } from "./info"
import { ChangelogLink } from "./changelogLink"
import { SaveButtons } from "./saveButtons"
import { usePlayer } from "../player/playerContext"
import { useResources } from "../resources/resourcesContext"


export function SettingsPage({isActive, currentSave, saveHandler, deleteHandler, exportHandler, importHandler, lastUpdate}){
    const player = usePlayer();
    const resources = useResources();

    const save = () => {
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
    }

    return(
        <div className={isActive ? "display-inline-block" : "display-none"} style={{textAlign: "center", width: "100%"}}>
            <br></br>
            <AutoSaveSetting />
            <InfoAcknowledgements />
            <ChangelogLink />
            <SaveButtons
                currentSave={currentSave}
                saveHandler={save}
                deleteHandler={deleteHandler}
                exportHandler={exportHandler}
                importHandler={importHandler}
            />
        </div>
    )
}