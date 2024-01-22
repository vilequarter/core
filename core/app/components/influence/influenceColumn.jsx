import { Button } from "../button"
import { usePlayer } from "../player/playerContext"
import { round } from "../functions";

export function InfluenceColumn({expanding, expandingHandler}){
    const player = usePlayer();

    return(
        <div className="column">
            <h3>Influence</h3>
            <b>Influence radius: </b>{round(player.getInfluenceRadius())} m
            <br></br>
            <b>Influence volume: </b>{round(player.influenceVolume)} m³
            <br></br>

            <Button
                content = {<>
                    <div className="buttonTitle">Expand Influence</div>
                    <div className="buttonFlavorText">Embrace your surroundings</div>
                    <div className="buttonText">Expand at {10 * player.getExpandRate()} m³ per second</div>
                    <span className="buttonCost">Costs {player.getExpandCostPerSecond()} essence per second</span>
                </>}
                handler = {() => expandingHandler()}
                className = {expanding ? "buttonActive" : ""}
                display = {player.influenceUnlocked}/>
            {/*<InfluenceVisual />*/}
        </div>
    )
}