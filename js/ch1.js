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
        gain = gain.times(tmp.plus.buyables[11].effect.plus(1))
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
        "buyables",
        "blank",
        "blank",
        "upgrades"
    ],
    buyables: {
        11: {
            cost(x) { return new Decimal(50).times(x.plus(1)) },
            title: "Adder Adder",
            display() { return "Adds " + tmp[this.layer].buyables[this.id].effect + " to Adders' base effect.<br>Cost: " + tmp[this.layer].buyables[this.id].cost + " of your Number<br>You have " + getBuyableAmount(this.layer, this.id) + " of this buyable" },
            effect() {
                let gain = new Decimal(getBuyableAmount(this.layer, this.id))
                gain = gain.times(tmp[this.layer].buyables[12].effect.plus(1))
                return gain
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement("WCm", 14)
            }
        },
        12: {
            cost(x) { return new Decimal(500).times(x.plus(1)) },
            title: "Adder^3",
            display() { return "Adds " + tmp[this.layer].buyables[this.id].effect + " to Adder Adder's base effect.<br>Cost: " + tmp[this.layer].buyables[this.id].cost + " of your Number<br>You have " + getBuyableAmount(this.layer, this.id) + " of this buyable" },
            effect() {
                let gain = new Decimal(getBuyableAmount(this.layer, this.id))
                return gain
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement("WCm", 15)
            }
        },
    },
    update(diff){
        if (player.plus.bestPoints.lt(player.plus.points)){
            player.plus.bestPoints = player.plus.points
        }
    },    
    layerShown(){return player.WCm.chapterNo.equals(new Decimal(1))}
})