export const initialResources = [
    {
        id: 0, 
        name: "Dirt", 
        type: "volume",
        flavorText: "Bland but filling",
        ratio: .4,
        value: 1,
        rate: (1/10),
        unlocked: true,
        consumed: 0,
        active: false
    },
    {
        id: 1, 
        name: "Pebbles",
        type: "discrete",
        flavorText: "Look up \"Luna Crunching\". That's you now",
        ratio: 10000,
        value: .01,
        rate: (10/5),
        unlocked: false,
        consumed: 0
    },
    {
        id: 2, 
        name: "Rocks",
        type: "discrete",
        flavorText: "Large pebbles, or small boulders, take your pick",
        ratio: 5,
        value: 1,
        rate: (10/15),
        unlocked: false,
        consumed: 0
    },
    {
        id: 3, 
        name: "Boulders",
        type: "discrete",
        flavorText: "There's a lot of nice ones in swamps",
        ratio: (1/10000),
        value: 100,
        rate: (10/60),
        unlocked: false,
        consumed: 0
    },
    {
        id: 4, 
        name: "Stone",
        type: "volume",
        flavorText: "Like really, really hard dirt",
        ratio: (1/100),
        value: 10,
        rate: (1/100),
        unlocked: false,
        consumed: 0,
        active: false
    },
    {
        id: 5, 
        name: "Grass",
        type: "volume",
        flavorText: "Includes weird stuff like \"vitamins\" and \"nutrients\"",
        ratio: (1/1000),
        value: 1,
        rate: 1,
        unlocked: false,
        consumed: 0,
        active: false
    },
    {
        id: 6,
        name: "Shrubs",
        type: "discrete",
        flavorText: "Also called \"green, feathery boulders\"",
        ratio: (1/30),
        value: 10,
        rate: (10/10),
        unlocked: false,
        consumed: 0
    },
    {
        id: 7, 
        name: "Trees",
        type: "discrete",
        flavorText: "Giant's Broccoli",
        ratio: (1/50),
        value: 100,
        rate: (10/30),
        unlocked: false,
        consumed: 0
    },
    {
        id: 8, 
        name: "Insects",
        type: "discrete",
        flavorText: "Honestly, you prefer dirt",
        ratio: 100000,
        value: .00001,
        rate: (10/.01),
        unlocked: false,
        consumed: 0
    },
    {
        id: 9, 
        name: "Small Animals",
        type: "discrete",
        flavorText: "Apex predator",
        ratio: (1/25),
        value: 100,
        rate: (10/15),
        unlocked: false,
        consumed: 0
    }
]