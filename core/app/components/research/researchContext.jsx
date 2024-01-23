import { createContext, useContext, useReducer } from 'react';
import { initialResearch } from './research';

export const ResearchContext = createContext(null);
export const ResearchDispatchContext = createContext(null);

export function ResearchProvider({children}) {


    const [research, dispatch] = useReducer(
        researchReducer,
        initialResearch
    );

    return (
        <ResearchContext.Provider value={research}>
            <ResearchDispatchContext.Provider value={dispatch}>
                {children}
            </ResearchDispatchContext.Provider>
        </ResearchContext.Provider>
    );
}

export function useResearch(){
    return useContext(ResearchContext);
}

export function useResearchDispatch(){
    return useContext(ResearchDispatchContext);
}

function researchReducer(research, action){
    const nextResearch = research.map(r => {
        if(r.id != action.id){
            return r;
        } else {
            switch(action.type){
                case 'payEssence':{
                    return {
                        ...r,
                        essencePaid: r.essencePaid + action.value
                    }
                }
                case 'completeResearch':{
                    r.effect(action);
                    return {
                        ...r,
                        complete: true,
                        active: false
                    }
                }
                case 'unlockResearch':{
                    return{
                        ...r,
                        unlocked: true
                    }
                }
                case 'activateResearch':{
                    return{
                        ...r,
                        active: true
                    }
                }
                case 'deactivateResearch':{
                    return{
                        ...r,
                        active: false
                    }
                }
                default: {
                    throw Error("Unknown action: " + action.type);
                }
            }
        }
    })
    return nextResearch;
}