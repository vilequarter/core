import { Button } from "./button"
import { addMessage } from "./messages/messageBox"

export function Debug({currentSave}){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug
            <Button 
                content = {<span>Add Info Message</span>}
                handler = {() => console.log(currentSave)}/>
        </div>
    )
}