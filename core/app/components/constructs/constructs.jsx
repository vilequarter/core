//TODO: edit how construct effects are handled to allow for retroactive upgrades

class Construct {
    constructor(id, name, description, baseCost, costGrowth, effectValue, effect, effectDescription, buildRate){
        this.id = id;
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.costGrowth = costGrowth;
        this.cost = baseCost;
        this.owned = 0;
        this.effectValue = effectValue;
        this.effect = effect;
        this.effectDescription = effectDescription;
        this.unlocked = false;
        this.paid = false;
        this.active = false;
        this.progress = 0;
        this.buildRate = buildRate;
    }
}

/* CONSTRUCT FUNCTIONS
    influence trickle
    dirt trickle
*/

/*
    new Construct(
        //id
        ,
        //name
        "",
        //description
        "",
        //baseCost
        ,
        //costGrowth
        ,
        //effectValue
        ,
        //effect
        () => {

        },
        //effectDescription
        () => {

        },
        //buildRate
        
    )
*/
export const initialConstructs = [
    new Construct(
        //id
        0,
        //name
        "Essence Core",
        //description
        "An external, artificial essence storage core",
        //baseCost
        100,
        //costGrowth
        2,
        //effectValue
        100,
        //effect
        (playerDispatch) => {
            playerDispatch({
                type: 'adjustMaxEssenceBase',
                value: this.effectValue
            })
        },
        //effectDescription
        () => {
            return "Increases essence storage by " + this.effectValue;
        },
        //buildRate
        1
    )
]