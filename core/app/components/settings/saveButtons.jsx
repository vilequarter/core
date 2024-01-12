import { Button } from "../button"

export function SaveButtons({saveHandler, deleteHandler, exportHandler, importHandler}){
    return(
        <div style={{position: "relative", textAlign: "center"}}>
            <Button
                content = {<span>Save</span>}
                handler = {saveHandler}/>
            <br/>
            <Button
                content = {<span>Export</span>}
                handler = {exportHandler}/>
            <Button
                content = {<span>Import</span>}
                handler = {importHandler}/>
            <br/>
            <Button
                content = {<span style={{color: "red"}}>Delete Save</span>}
                handler = {deleteHandler}/>
        </div>
    )
}