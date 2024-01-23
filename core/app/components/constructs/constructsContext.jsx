import { createContext, useContext, useReducer } from "react";
import { initialConstructs } from "./constructs";

export const ConstructsContext = createContext(null);
export const ConstructsDispatchContext = createContext(null);


export function ConstructsProvider({children}) {
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