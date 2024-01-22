import { createContext, useContext, useReducer } from "react";

export const ConstructsContext = createContext(null);
export const ConstructsDispatchContext = createContext(null);

//TODO: edit how construct effects are handled to allow for retroactive upgrades
export function ConstructsProvider({children}) {
    const initialConstructs = [
        {
            id: 0,
            name: "Essence Core",
            description: "An external, artificial essence storage core",
            baseCost: 100,
            costGrowth: 2,
            /*
            cost: function() {
                return(this.baseCost * Math.pow(this.costGrowth, this.owned));
            },
            */
            cost: 100,
            owned: 0,
            effectValue: 100,
            effect: function(playerDispatch){
                playerDispatch({
                    type: 'adjustMaxEssenceBase',
                    value: this.effectValue
                })
            },
            get effectDescription(){
                return "Increases essence storage by " + this.effectValue;
            },
            unlocked: false,
            paid: false,
            active: false,
            progress: 0,
            buildRate: 1 // percent per tick
        }
    ]

    const [constructs, dispatch] = useReducer(
        constructsReducer,
        initialConstructs
    );

    return (
        <ConstructsContext.Provider value={constructs}>
            <ConstructsDispatchContext.Provider value={dispatch}>
                {children}
            </ConstructsDispatchContext.Provider>
        </ConstructsContext.Provider>
    );
}

export function useConstructs(){
    return useContext(ConstructsContext);
}

export function useConstructsDispatch(){
    return useContext(ConstructsDispatchContext);
}

function constructsReducer(constructs, action){
    if(action.type == 'updateAll'){
        return action.constructs;
    }
    const nextConstructs = constructs.map(construct => {
        if(construct.id != action.id){
            return construct;
        }
        switch(action.type){
            case 'unlockConstruct':{
                return {
                    ...construct,
                    unlocked: true
                }
            }
            case 'payConstruct':{
                return{
                    ...construct,
                    paid: true
                }
            }
            case 'startConstruct':{
                return {
                    ...construct,
                    active: true
                }
            }
            case 'stopConstruct':{
                return {
                    ...construct,
                    active: false
                }
            }
            case 'buildConstruct':{
                return {
                    ...construct,
                    progress: (construct.progress + construct.buildRate)
                }
            }
            case 'finishConstruct':{
                construct.effect(action.playerDispatch);
                return {
                    ...construct,
                    owned: construct.owned + 1,
                    paid: false,
                    active: false,
                    progress: 0,
                    cost: (construct.baseCost * Math.pow(construct.costGrowth, construct.owned + 1))
                }
            }
            default: {
                throw Error("Unknown action: " + action.type);
            }
        }
    })
    return nextConstructs;
}