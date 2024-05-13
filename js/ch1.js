addLayer("plus", {
    name: "Addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        bestPoints: new Decimal(0)
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Adders", // Name of prestige currency
    baseResource: "number", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: function()
    {
        if (player.plus.points.gte(5)){
            return 1.5
        } else {
            return 1
        }
    }, // Prestige currency exponent
    effect(){
        let gain = player.plus.bestPoints
        return gain
    },
    effectDescription: function(){
        return 'they add to your point gen, duh. <br> Your BEST (you will thank me later) adders are increasing your points per second by ' + tmp.plus.effect
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "0", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Adders", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",function() { return 'Your best number of adders is ' + player.plus.bestPoints + ""}],
        "blank",
        "milestones",
        "blank",
        "blank",
        "upgrades"
    ],
    update(diff){
        if (player.plus.bestPoints.lt(player.plus.points)){
            player.plus.bestPoints = player.plus.points
        }
    },    
    layerShown(){return player.WCm.chapterNo.equals(new Decimal(1))}
})