export const initialResources = [
    {
        id: 0, 
        name: "Dirt", 
        type: "volume",
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
        ratio: (1/25),
        value: 100,
        rate: (10/15),
        unlocked: false,
        consumed: 0
    }
]