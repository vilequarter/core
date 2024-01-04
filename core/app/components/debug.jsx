import { Button } from "./button"
import { addMessage } from "./messages/messageBox"

export function Debug(){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug
            <Button 
                content = {<span>Add Info Message</span>}
                handler = {() => addMessage("Test", "infoMessage")}/>
            <Button 
                content = {<span>Add Lore Message</span>}
                handler = {() => addMessage("Test", "loreMessage")}/>
            <Button 
                content = {<span style={{color:"red"}}>Add Error Message</span>}
                handler = {() => addMessage("Test", "errorMessage")}/>
        </div>
    )
}