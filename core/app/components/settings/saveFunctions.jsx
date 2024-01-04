import { Button } from "../button"

export function SaveFunctions(){
    return(
        <div style={{position: "relative", textAlign: "center"}}>
            <Button
                content = {<span>Save</span>}
                handler = {() => null}/>
            <Button
                content = {<span>Load</span>}
                handler = {() => null}/>
            <Button
                content = {<span style={{color: "red"}}>Delete Save</span>}
                handler = {() => null}/>
            <br></br>
            <Button
                content = {<span>Export</span>}
                handler = {() => null}/>
            <Button
                content = {<span>Import</span>}
                handler = {() => null}/>
        </div>
    )
}