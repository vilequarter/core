import { Button } from "../button"

export function Debug({handler, player, resources, constructs}){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug<br/>
            <span>Dirt consumed: {resources[0].consumed}</span>
            <span>Max essence: {player.getMaxEssence()}</span>
            <br/>
            <span>Core cost: {constructs[0].cost()}, owned: {constructs[0].owned}</span>
        </div>
    )
}