import { round } from "./functions"

export const initialPlayer = {
    essence: 0,
    baseMaxEssence: 100,
    maxEssenceMultiplier: 1,
    maxEssenceBaseModifier: 0,
    getMaxEssence: function(){return (this.baseMaxEssence + this.maxEssenceBaseModifier) * this.maxEssenceMultiplier},

    influenceVolume: 65.45,
    getInfluenceRadius: function(){return round(Math.cbrt(.75 * this.influenceVolume / Math.PI))},
    baseExpandCost: .5,
    expandCostMultiplier: 1,
    expandCostBaseModifier: 0,
    getExpandCost: function(){return (this.baseExpandCost - this.expandCostBaseModifier) / this.expandCostMultiplier},
    baseExpandRate: (1/10),
    expandRateMultiplier: 1,
    expandRateBaseModifier: 0,
    getExpandRate: function(){return (this.baseExpandRate + this.expandRateBaseModifier) * this.expandRateMultiplier},

    activeActions: 0,
    maxActions: 1,

    baseResearchRate: (1/10),
    researchRateMultiplier: 1,
    researchRateBaseModifier: 0,
    getResearchRate: function(){return (this.baseResearchRate + this.researchRateBaseModifier) * this.researchRateMultiplier}
}