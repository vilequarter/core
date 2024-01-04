// list of items that can be created with increasing essence costs
//  (int)id - unique map id
//  (string)name - name of the construct
//  (string)description - description of the construct
//  (int)baseCost - initial essence cost of the construct
//  (int)costGrowth - cost is multiplied by this number each purchase
//  (get)cost - formula to get current cost
//  (int)owned - number of this construct currently owned
//  (int)effectValue - value of the effect that this construct provides
//  (function)effect - this function is called when this construct is purchased
//  (get)effectDescription - displayed to the player to explain what the construct does
//  (bool)unlocked - indicates if the construct is unlocked or not
export let constructs = [
    {
        id: 0,
        name: "Essence Core",
        description: "An external, artificial essence storage core",
        baseCost: 100,
        costGrowth: 2,
        get cost(){
            return(this.baseCost * Math.pow(this.costGrowth, this.owned));
        },
        owned: 0,
        effectValue: 100,
        effect: function(){},
        get effectDescription(){
            return "Increases essence storage by " + this.effectValue;
        },
        unlocked: false
    }
]