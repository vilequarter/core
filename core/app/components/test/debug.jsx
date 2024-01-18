import { Button } from "../button"

export function Debug({handler, player, resources}){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug<br/>
            <span>Dirt consumed: {resources[0].consumed}</span>
        </div>
    )
}