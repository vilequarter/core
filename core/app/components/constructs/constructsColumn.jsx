import { constructs } from "./constructs"
import { List } from "../list"

export function ConstructsColumn(){
    let items = [];

    constructs.forEach((construct) =>{
        if(construct.unlocked){
            items.push({
                title: construct.name + (construct.owned > 0 ? " (" + construct.owned + ")" : ""),
                text: construct.description,
                effect: construct.effectDescription,
                cost: "Cost: " + construct.cost + " essence",
                handler: () => construct.effect}
            )
        }
    })

    return(
        <div className="column">
            <div style={{position: "relative"}}>
                <h3>Constructs</h3>
                <List items={items}/>
            </div>
        </div>
    )
}