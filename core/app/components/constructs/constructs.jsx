//TODO: edit how construct effects are handled to allow for retroactive upgrades

class Construct{
    constructor(id, name, description, baseCost, costGrowth, effectValue, buildRate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.costGrowth = costGrowth;
        this.effectValue = effectValue;
        this.buildRate = buildRate;
        this.cost = baseCost;
        this.owned = 0;
        this.unlocked = false;
        this.paid = false;
        this.active = false;
        this.progress = 0;
    }
}

class EssenceCore extends Construct{
    constructor(){
        super(
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
            //buildRate
            1
        )
    }

    effectDescription = () => {
        return "Increases essence storage by " + this.effectValue;
    }
}

class DirtEater extends Construct{
    constructor(){
        super(
        //id
        1,
        //name
        "Dirt Eater",
        //description
        "Slowly but automatically consumes Dirt, turning it into usable Essence",
        //baseCost
        10,
        //costGrowth
        2,
        //effectValue
        .01,
        //buildRate
        .1
        )
    }
    effectDescription = () => {
        return ("Consumes " + 10 * this.effectValue + "m³ of Dirt per second")
    }
}

export const initialConstructs = [
    new EssenceCore(),
    new DirtEater(),
]

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
        //buildRate
        
    ),
*/