import { AutoSaveSetting } from "./autoSave"
import { InfoAcknowledgements } from "./info"
import { ChangelogLink } from "./changelogLink"
import { SaveFunctions } from "./saveFunctions"


export function SettingsPage({isActive}){
    return(
        <div className={isActive ? "display-inline-block" : "display-none"} style={{textAlign: "center", width: "100%"}}>
            <br></br>
            <AutoSaveSetting />
            <InfoAcknowledgements />
            <ChangelogLink />
            <SaveFunctions />
        </div>
    )
}