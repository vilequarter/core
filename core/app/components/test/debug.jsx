import { Button } from "../button"

export function Debug({handler, player, playerDispatch, resources, constructs}){
    return(
        <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
            Debug<br/>
            <span>Dirt consumed: {resources[0].consumed}</span><br/>
            <span>Max essence: {player.getMaxEssence(constructs)}</span><br/>
            <span>Expand rate multiplier: {player.expandRateMultiplier}</span><br/>
            <span>Expand rate base modifier: {player.expandRateBaseModifier}</span><br/>
            <button onClick={() => {
                playerDispatch({
                    type: 'addContemplation',
                    value: 250000
                })
            }}>Add 250000 contemplation</button>
        </div>
    )
}