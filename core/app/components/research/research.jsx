class Research {
    constructor(id, name, cost, flavorText, effectDescription, effect, unlock) {
        this.id = id;
        this.name = name;
        this.essenceCost = cost;
        this.essencePaid = 0;
        this.flavorText = flavorText;
        this.effectDescription = effectDescription;
        this.effect = effect;
        this.unlock = unlock;
        this.unlocked = false;
        this.complete = false;
        this.active = false;
    }
}

/* UNLOCK BREAKPOINTS
    essence == 300
*/

/* EFFECTS
    maxActions +1
    multiplier to max essence (essence spiral)
    dirt trickle (auto consume dirt at reduced rate)
    influence trickle (auto expand influence at reduced rate)
*/

/*
    new Research(
        //id
        ,
        //name
        "",
        //cost
        ,
        //flavorText
        "",
        //effectDescription
        "",
        //effect
        () => {},
        //unlock
        () => {}
    ),
*/
export const initialResearch = [
    new Research(
        //id
        0,
        //name
        "Influence Awareness",
        //cost
        15,
        //flavorText
        "There's so much dirt around you, but it seems like you can only reach a very small amount. You try to \"push\" a little further to get at some more...",
        //effectDescription
        "Unlocks Influence Expansion",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'unlockInfluence'
            })
        },
        //unlock
        (player, resources, research) => {
            return (player.essence >= 10 && research[4].complete);
        }
    ),
    new Research(
        //id
        1,
        //name
        "Tastes Pretty Good",
        //cost
        50,
        //flavorText
        "You've started to think of consuming dirt as \"eating\" it. This shift in perspective makes it more enjoyable!",
        //effectDescription
        "Dirt consumption rate +1 m³/second",
        //effect
        (action) => {
            action.resourcesDispatch({
                id: 0,
                type: 'editResourceRate',
                value: .1
            })
        },
        //unlock
        (player, resources, research) => {
            return(resources[0].consumed >= 50);
        }
    ),
    new Research(
        //id
        2,
        //name
        "But Why is the Dirt Gone?",
        //cost
        15,
        //flavorText
        "You've consumed every bit of dirt you can reach, but there's a whole lot more out there!",
        //effectDescription
        "Base Influence expansion rate +1m³ per second",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'adjustExpandRateBase',
                value: .1
            })
        },
        //unlock
        (player, resources, research) => {
            return(research[6].complete && resources[0].getAvailable(player) == 0);
        }
    ),
    new Research(
        //id
        3,
        //name
        "Meta-Research",
        //cost
        75,
        //flavorText
        "You're a rock that can think. That's weird to think about.",
        //effectDescription
        "Base Research rate +1/second",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'adjustResearchRateMultiplier',
                value: 1
        })},
        //unlock
        (player, resources, research) => {
            return(research[1].complete);
        }
    ),
    new Research(
        //id
        4,
        //name
        "Essence...?",
        //cost
        10,
        //flavorText
        "Most properties of essence are commonly known, but you doubt many could describe its \"taste\".",
        //effectDescription
        "Increase Dirt essence value by 1 per m³",
        //effect
        (action) => {
            action.resourcesDispatch({
                id: 0,
                type: 'editResourceValue',
                value: 1
            })
        },
        //unlock
        (player, resources, research) => {
            return(resources[0].consumed >= 5);
        }
    ),
    new Research(
        //id
        5,
        //name
        "Dirt's Nice and All...",
        //cost
        500,
        //flavorText
        "You've had to eat around these tiny hard things for a while, but now you feel like you should be able to break them down too.",
        //effectDescription
        "Unlock Pebbles",
        //effect
        (action) => {
            action.resourcesDispatch({
                id: 1,
                type: 'unlockResource'
            })
        },
        //unlock
        (player, resources, research) => {
            return(resources[0].consumed >= 1000);
        }
    ),
    new Research(
        //id
        6,
        //name
        "Controlled Expansion",
        //cost
        10,
        //flavorText
        "You got a little too excited to start expanding, so you were using more essence than you needed to. This should help you be more efficient!",
        //effectDescription
        "Influence expansion essence cost -50%",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'adjustExpandCostMultiplier',
                value: 1
            })
        },
        //unlock
        (player, resources, research) => {
            return (player.influenceVolume >= 70);
        }
    ),
    new Research(
        //id
        7,
        //name
        "Too Full",
        //cost
        100,
        //flavorText
        "Try as you might, you can't fit any more essence in your core. Maybe there's a way to store it elsewhere?",
        //effectDescription
        "Unlock Essence Cores",
        //effect
        (action) => {
            action.constructsDispatch({
                type: 'unlockConstruct',
                id: 0
            })
        },
        //unlock
        (player, resources, research) => {
            return(player.essence >= 100);
        }
    ),
    new Research(
        //id
        8,
        //name
        "Forced Expansion",
        //cost
        50,
        //flavorText
        "You're getting the hang of pushing out your will, and you think you can do it faster now.",
        //effectDescription
        "Influence expansion rate x2",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'adjustExpandRateMultiplier',
                value: 1
            })
        },
        //unlock
        (player, resources, research) => {
            return (player.influenceVolume >= 200)
        }
    ),
    new Research(
        //id
        9,
        //name
        "Expanded Mind",
        //cost
        150,
        //flavorText
        "It's hard to judge distance as a rock, but you think you're now able to reach 5 meters out in every direction now! You feel motivated by this milestone!",
        //effectDescription
        "Research rate x2",
        //effect
        (action) => {
            action.playerDispatch({
                type: 'adjustResearchRateMultiplier',
                value: 1
            })
        },
        //unlock
        (player, resources, research) => {
            return(player.getInfluenceRadius() >= 5)
        }
    ),
]