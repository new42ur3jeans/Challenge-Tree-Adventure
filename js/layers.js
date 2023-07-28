addLayer("p", {
    name: "Floor 1: Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        cooldown: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "floors", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let boost = player[this.layer].points.add(1)
        boost = boost.times(getBuyableAmount(this.layer, 21).add(1))
        return boost
    },
    effectDescription: function(){
        return " which boosts your elevator's speed by " + format(tmp[this.layer].effect) + "x"
    },
    update(diff){
        if(player[this.layer].cooldown.gt(0)){
            player[this.layer].cooldown = player[this.layer].cooldown.sub(diff)
        }
        if(player[this.layer].cooldown.lte(0)){
            player[this.layer].cooldown = new Decimal (0)
        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        "main-display",
        "blank",
        "blank",
        "buyables",
        "blank",
        "blank",
    ],
    buyables: {
        11: {
            title: 'Floor 1 Reset',
            display() { return "Get " + tmp[this.layer].buyables[this.id].pending + " Prestige Points. <br>Cooldown: " + format(player[this.layer].cooldown) + " secs"},
            canAfford() { return (player.points.gte(1) && player[this.layer].cooldown.lte(0))},
            pending() {return new Decimal.max(new Decimal.ceil(new Decimal.div(new Decimal.sub(player.points, 1),0.01)),0).times(getBuyableAmount(this.layer, 22).add(1))},
            buy() {
                player[this.layer].points = player[this.layer].points.add(tmp[this.layer].buyables[this.id].pending)
                player[this.layer].cooldown = new Decimal (1)
            },
        },
        21: {
            title: 'Labour',
            cost(x) { return new Decimal(2).pow(x) },
            display() { return "Use your prestige points to boost prestige point's boost to the elevator's speed.<br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).add(1) +"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title: 'Scandals',
            cost(x) { return new Decimal(10).times(x.add(1)).pow(Math.ceil(new Decimal.div(x.add(1),10))) },
            display() { return "Use your prestige points to boost prestige points gain. <br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).add(1) +"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    layerShown(){return player.points.gte(1)},
})

addLayer("b", {
    name: "Floor 2: Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        money: new Decimal(0),
        cooldown: new Decimal(0),
    }},
    color: "#7777BB",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Money Machines", // Name of prestige currency
    baseResource: "floors", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        let gain = player.b.points // put how much you gain per second here
        player[this.layer].money = player[this.layer].money.add(gain.times(diff));
        if(player[this.layer].cooldown.gt(0)){
            player[this.layer].cooldown = player[this.layer].cooldown.sub(diff)
        }
        if(player[this.layer].cooldown.lte(0)){
            player[this.layer].cooldown = new Decimal (0)
        }
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        "main-display",
        ["display-text", function() {
            return  "<h3>You have <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+format((player[this.layer].money))+"</span> Money."
        }],
        ["display-text", function() {
            return  "<h3>Your boosters, doublers and triplers are making the elevator <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+format(new Decimal.add(getBuyableAmount("b", 21),1).times(new Decimal.times(getBuyableAmount("b", 22),2).max(1)).times(new Decimal.times(getBuyableAmount("b", 31),3).max(1)))+"x</span> faster."
        }],
        "blank",
        "blank",
        "buyables",
        "blank",
        "blank",
    ],
    buyables: {
        11: {
            title: 'Floor 2 Reset',
            display() { return "Go to floor 2 to get " + tmp[this.layer].buyables[this.id].pending + " Money Machines.<br>Cooldown: " + format(player[this.layer].cooldown) + " secs"},
            canAfford() { return (player.points.gte(1) && player[this.layer].cooldown.lte(0))},
            pending() {return new Decimal.max(new Decimal.ceil(new Decimal.div(new Decimal.sub(player.points, 2),0.01)),0).times(getBuyableAmount(this.layer, 23).add(1))},
            buy() {
                player[this.layer].points = player[this.layer].points.add(tmp[this.layer].buyables[this.id].pending)
                player[this.layer].cooldown = new Decimal (1)
            }, 
        },
        21: {
            title: 'Booster',
            cost(x) { return new Decimal(5).pow(x) },
            display() { return "Use your money from Money Machines to buy boosters.<br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).add(1) +"x" },
            canAfford() { return player[this.layer].money.gte(this.cost()) },
            buy() {
                player[this.layer].money = player[this.layer].money.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title: 'Doubler',
            cost(x) { return new Decimal(100).times(new Decimal.times(x,2).add(1)) },
            display() { return "Use your money to double boosters effect. <br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).times(2) +"x" },
            canAfford() { return player[this.layer].money.gte(this.cost()) },
            buy() {
                player[this.layer].money = player[this.layer].money.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            title: 'Loop of Cash',
            cost(x) { return new Decimal(100).times(x.add(1)) },
            display() { return "Use your money to boost money machines gain. <br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).add(1) +"x" },
            canAfford() { return player[this.layer].money.gte(this.cost()) },
            buy() {
                player[this.layer].money = player[this.layer].money.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        31: {
            title: 'Tripler',
            cost(x) { return new Decimal(10000).times(new Decimal.times(x,2).add(1)) },
            display() { return "Use your money to TRIPLE boosters effect. <br>Cost: "+format(this.cost())+"<br>Bought: " + getBuyableAmount(this.layer, this.id)+"<br>Effect: " + getBuyableAmount(this.layer, this.id).times(3) +"x" },
            canAfford() { return player[this.layer].money.gte(this.cost()) },
            buy() {
                player[this.layer].money = player[this.layer].money.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    layerShown(){return player.points.gte(2)},
})

addLayer("m", {
    name: "Floor 3: Milestones", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        money: new Decimal(0),
        cooldown: new Decimal(0),
    }},
    color: "#BB55BB",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "Milestones", // Name of prestige currency
    baseResource: "floors", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        let gain = player.b.points // put how much you gain per second here
        player[this.layer].money = player[this.layer].money.add(gain.times(diff));
        if(player[this.layer].cooldown.gt(0)){
            player[this.layer].cooldown = player[this.layer].cooldown.sub(diff)
        }
        if(player[this.layer].cooldown.lte(0)){
            player[this.layer].cooldown = new Decimal (0)
        }
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        "main-display",
        "blank",
        "blank",
        "blank",
        "blank",
    ],
    buyables: {
        11: {
            title: 'Floor 3 Reset',
            display() { return "Go to floor 2 to get " + tmp[this.layer].buyables[this.id].pending + " Money Machines.<br>Cooldown: " + format(player[this.layer].cooldown) + " secs"},
            canAfford() { return (player.points.gte(1) && player[this.layer].cooldown.lte(0))},
            pending() {return new Decimal.max(new Decimal.ceil(new Decimal.div(new Decimal.sub(player.points, 2),0.01)),0)},
            buy() {
                player[this.layer].points = player[this.layer].points.add(tmp[this.layer].buyables[this.id].pending)
                player[this.layer].cooldown = new Decimal (1)
            }, 
        },
    },
    layerShown(){return player.points.gte(3)},
})