import { AutoSaveSetting } from "./autoSave"
import { InfoAcknowledgements } from "./info"
import { ChangelogLink } from "./changelogLink"
import { SaveButtons } from "./saveButtons"
import { usePlayer } from "../player/playerContext"
import { useResources } from "../resources/resourcesContext"
import { useResearch } from "../research/researchContext"


export function SettingsPage({isActive, currentSave, saveHandler, deleteHandler, exportHandler, importHandler, lastUpdate, messageHandler}){
    const player = usePlayer();
    const resources = useResources();
    const research = useResearch();

    const save = () => {
        var newState = {
            influence: player.influenceVolume,
            essence: player.essence,
            contemplation: player.contemplation,
            lastUpdate: lastUpdate,
            consumed: [0,0,0,0,0,0,0,0,0,0],
            discreteProgress: [0,0,0,0,0,0,0,0,0,0],
            researchCompleted: [],
            researchUnlocked: [],
            researchProgress: []
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
        saveHandler(newState);
        messageHandler("Game Saved", "infoMessage");
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