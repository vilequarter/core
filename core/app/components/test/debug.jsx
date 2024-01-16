import { Button } from "../button"

export function Debug({handler}){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug
            <Button 
                content = {<span>Add Info Message</span>}
                handler = {() => handler("Test", "infoMessage")}/>
        </div>
    )
}