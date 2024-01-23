import { AutoSaveSetting } from "./autoSave"
import { InfoAcknowledgements } from "./info"
import { ChangelogLink } from "./changelogLink"
import { SaveButtons } from "./saveButtons"

export function SettingsPage({isActive, currentSave, saveHandler, deleteHandler, exportHandler, importHandler}){
    return(
        <div className={isActive ? "display-inline-block" : "display-none"} style={{textAlign: "center", width: "100%"}}>
            <br></br>
            <AutoSaveSetting />
            <InfoAcknowledgements />
            <ChangelogLink />
            <SaveButtons
                currentSave={currentSave}
                saveHandler={saveHandler}
                deleteHandler={deleteHandler}
                exportHandler={exportHandler}
                importHandler={importHandler}
            />
        </div>
    )
}