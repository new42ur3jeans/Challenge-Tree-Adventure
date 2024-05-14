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
        return 'they add to your point gen, duh. <br> Your BEST (you will thank me later) adders are increasing your points per second by ' + format(tmp.plus.effect)
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.div(tmp.mul.effect)
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
            display() { return "Adds " + format(tmp[this.layer].buyables[this.id].effect) + " to Adders' base effect.<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " of your Number<br>You have " + getBuyableAmount(this.layer, this.id) + " of this buyable" },
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
            display() { return "Adds " + format(tmp[this.layer].buyables[this.id].effect) + " to Adder Adder's base effect.<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " of your Number<br>You have " + getBuyableAmount(this.layer, this.id) + " of this buyable" },
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
        if(hasMilestone("mul",0)) {
            buyBuyable(this.layer,11)
            buyBuyable(this.layer,12)
        }
    },    
    layerShown(){return player.WCm.chapterNo == 1 }
})

addLayer("mul", {
    name: "Multiplication", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "*", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        bestPoints: new Decimal(0)
    }},
    color: "#00FF55",
    requires: new Decimal(6), // Can be a function that takes requirement increases into account
    resource: "Multipliers", // Name of prestige currency
    baseResource: "Adders", // Name of resource prestige is based on
    baseAmount() {return player.plus.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: function()
    {
        return 2
    }, // Prestige currency exponent
    effect(){
        let gain = new Decimal(2).pow(player.mul.bestPoints)
        return gain
    },
    effectDescription: function(){
        return 'they multiply point gen AND divide Adder cost by ' + format(tmp.mul.effect) + ' (based on best again)'
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "1", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Multipliers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    tabFormat: {
        "Multipliers": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function() { return 'Your best number of multiplier is ' + player.mul.bestPoints + ""}],
                "blank",
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "blank",
                ["display-text",function() { return 'Your best number of multiplier is ' + player.mul.bestPoints + ""}],
                "blank",
                "milestones",
                "blank",
                "blank",
            ],
        },
    },
    milestones: {
        0: {
            requirementDescription: "5 multipliers",
            effectDescription: "Automatically buys adder buyables by ones (but only if you can afford them ofc)",
            done() { return player.mul.points.gte(5) },
            unlocked() {
                return hasAchievement("WCm", 18)
            },
            style() {
                return {
               'height': '10px',
                }
           },
        },
    },
    update(diff){
        if (player.mul.bestPoints.lt(player.mul.points)){
            player.mul.bestPoints = player.mul.points
        }
    },    
    layerShown(){return (player.WCm.chapterNo == 1  && hasAchievement("WCm",16))}
})