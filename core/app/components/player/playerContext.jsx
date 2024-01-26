import { createContext, useContext, useReducer } from 'react';

import { round } from '../functions';

export const PlayerContext = createContext(null);
export const PlayerDispatchContext = createContext(null);

export function PlayerProvider({ children }) {
    const initialPlayer = {
        contemplation: 0, //offline ticks
    
        essence: 0,
        baseMaxEssence: 100,
        maxEssenceMultiplier: 1,
        maxEssenceBaseModifier: 0,
        getMaxEssence: function(constructs){return ((this.baseMaxEssence * this.maxEssenceMultiplier) + (constructs[0].owned * constructs[0].effectValue))},
    
        influenceUnlocked: false,
        influenceVolume: 65.45,
        getInfluenceRadius: function(){return round(Math.cbrt(.75 * this.influenceVolume / Math.PI), 1)},
        baseExpandCost: 1, //essence per m³
        expandCostMultiplier: 1,
        expandCostBaseModifier: 0,
        getExpandCost: function(){return (this.getExpandRate() * ((this.baseExpandCost - this.expandCostBaseModifier) / this.expandCostMultiplier))},
        baseExpandRate: .1, //volume per tick
        expandRateMultiplier: 1,
        expandRateBaseModifier: 0,
        getExpandRate: function(){return (this.baseExpandRate + this.expandRateBaseModifier) * this.expandRateMultiplier},
        getExpandCostPerSecond: function(){return (this.getExpandCost() * 10)},
    
        activeActions: 0,
        maxActions: 1,
    
        baseResearchRate: .1, //essence spent per tick
        researchRateMultiplier: 1,
        researchRateBaseModifier: 0,
        getResearchRate: function(){return (this.baseResearchRate + this.researchRateBaseModifier) * this.researchRateMultiplier},
    }

    const [player, dispatch] = useReducer(
        playerReducer,
        initialPlayer
    );

    return (
        <PlayerContext.Provider value={player}>
            <PlayerDispatchContext.Provider value={dispatch}>
                {children}
            </PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    );
}

export function usePlayer(){
    return useContext(PlayerContext);
}

export function usePlayerDispatch(){
    return useContext(PlayerDispatchContext);
}

// all data verification is done in external functions (playerFunctions.jsx) before playerReducer is called
//  (addEssence, removeEssence, addAction)
function playerReducer(player, action){
    switch (action.type) {
        case 'addEssence': {
            return({
                ...player,
                essence: (player.essence + action.value)
            })
        }
        case 'removeEssence': {
            return({
                ...player,
                essence: (player.essence - action.value)
            })
        }
        case 'addInfluence': {
            return({
                ...player,
                influenceVolume: (player.influenceVolume + action.value)
            })
        }
        case 'addAction': {
            return({
                ...player,
                activeActions: (player.activeActions + 1)
            })
        }
        case 'removeAction': {
            return({
                ...player,
                activeActions: (player.activeActions - 1)
            })
        }
        case 'addMaxAction': {
            return({
                ...player,
                maxActions: (player.maxActions + 1)
            })
        }
        case 'adjustMaxEssenceMultiplier': {
            return({
                ...player,
                maxEssenceMultiplier: (player.maxEssenceMultiplier + action.value)
            })
        }
        case 'adjustMaxEssenceBase': {
            return({
                ...player,
                maxEssenceBaseModifier: (player.maxEssenceBaseModifier + action.value)
            })
        }
        case 'adjustExpandRateMultiplier': {
            return({
                ...player,
                expandRateMultiplier: (player.expandRateMultiplier + action.value)
            })
        }
        case 'adjustExpandRateBase': {
            return({
                ...player,
                expandRateBaseModifier: (player.expandRateBaseModifier + action.value)
            })
        }
        case 'adjustExpandCostMultiplier': {
            return({
                ...player,
                expandCostMultiplier: (player.expandCostMultiplier + action.value)
            })
        }
        case 'adjustExpandCostBase': {
            return({
                ...player,
                expandCostBaseModifier: (player.expandCostBaseModifier + action.value)
            })
        }
        case 'adjustResearchRateMultiplier': {
            return({
                ...player,
                researchRateMultiplier: (player.researchRateMultiplier + action.value)
            })
        }
        case 'adjustResearchRateBase': {
            return({
                ...player,
                researchRateBaseModifier: (player.researchRateBaseModifier + action.value)
            })
        }
        case 'addContemplation': {
            return({
                ...player,
                contemplation: (player.contemplation + action.value)
            })
        }
        case 'removeContemplation':{
            return({
                ...player,
                contemplation: (player.contemplation - action.value)
            })
        }
        case 'unlockInfluence':{
            return({
                ...player,
                influenceUnlocked: true
            })
        }
        case 'updateAll': {
            return({
                ...player,
                contemplation: action.contemplation,
                essence: action.essence,
                influenceVolume: action.influence
            })
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}