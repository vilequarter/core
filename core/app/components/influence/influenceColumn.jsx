import { Button } from "../button"
import { usePlayer } from "../player/playerContext"
import { round } from "../functions";

export function InfluenceColumn({expanding, expandingHandler}){
    const player = usePlayer();

    return(
        <div className="column">
            <h3>Influence</h3>
            <b>Influence volume: </b>{round(player.influenceVolume, 1)} m³
            <br></br>

            <Button
                content = {<>
                    <div className="buttonTitle">Expand Influence</div>
                    <div className="buttonFlavorText">Embrace your surroundings</div>
                    <div className="buttonText">Expand at {round(10 * player.getExpandRate(), 1)} m³ per second</div>
                    <span className="buttonCost">Costs {round(player.getExpandCostPerSecond(), 1)} essence per second</span>
                </>}
                handler = {() => expandingHandler()}
                className = {expanding ? "buttonActive" : ""}
                display = {player.influenceUnlocked}/>
            {/*<InfluenceVisual />*/}
        </div>
    )
}