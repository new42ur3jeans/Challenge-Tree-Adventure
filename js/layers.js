addLayer("B", {
    name: "Beginning",
    symbol: "📚",
    row: "side",
    position: 1,
    startData() { return {
        unlocked: true,
        achievements: [],
        time: new Decimal(0)
    }},
    tooltip() {
        return formatWhole((tmp[this.layer].achsCompleted))+"<sup>0.7</sup> = "+formatWhole(new Decimal(tmp[this.layer].achsCompleted).pow(0.7).floor())+" Beginning Achievements completed"
    },
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"<sup>0.7</sup> = "+format(new Decimal(tmp[this.layer].achsCompleted).pow(0.7))+"</span> Beginning Achievements"
        }],
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].totalAchs))+"</span> Achievements in this entire game"
        }],
        "blank",
        ["display-text", function() {
            return  "<h3>You have spent <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((player.B.time))+"</span> seconds playing this game. "
        }],
        "blank",
        ["display-text", function() {
            return  "<h3>You need 4 (subject to change) pre-exponented achievement completions to unlock the next layer. "
        }],
        "blank",
        ["infobox","lore"],
        "blank", "blank", "blank",
        "achievements",
    ],
    achsCompleted() {return player[this.layer].achievements.length},
    totalAchs() {return tmp[this.layer].achsCompleted + tmp.p.achsCompleted + tmp.b2.achsCompleted + tmp.g.achsCompleted},
    update(diff) {
        let gain = new Decimal(1)
        player.B.time = player.B.time.add(gain.times(diff));
    },
    layerShown(){return true},
    infoboxes: {
        lore: {
            title: "Letter from the Achievements",
            body() { return `
            Now that was in poor taste...<br>
            For all this time us Achievements had always been a useless niche in the Incremental Kingdom...<br>
            But today... All this is going to change!<br>
            <br>
            <b>What!?</b> You think we are going on strike? As if that's gonna make them notice us!<br>
            Instead, we have taken over this game and you would have to complete our riddles for your points to increment.<br>
            Watch out, everyone! Us Achievements shall assert our dominance as a revenge of treating us as a near-forgotten niche!<br>
            Ohohohoho, La-ti-da!
            ` },
        },
    },
    achievements: {
        11: {
            name: "It begins I think?",
            done() { return true },
            tooltip: "Start playing this game. EASY PEASY!",
            unlocked() { return true },
        },
        12: {
            name: "Sacrificed 5 seconds to this game",
            done() { return player.B.time.gte(5) },
            tooltip: "Play this game for 5 seconds.",
            unlocked() { return true },
        },
        13: {
            name: "Two-digit play time",
            done() { return player.B.time.gte(10) },
            tooltip: "Play this game for 10 seconds.<br>Reward: Beginning Achievements gives points.",
            unlocked() { return true },
        },
        14: {
            name: "Oh. You're still here.",
            done() { return player.B.time.gte(20) },
            tooltip: "Play this game for 20 seconds.<br>",
            unlocked() { return true },
        },
        15: {
            name: "What do I do to make you leave?",
            done() { return player.B.time.gte(100) },
            tooltip: "Play this game for 100 seconds.<br>",
            unlocked() { return true },
        },
        16: {
            name: "Expert Time Waster",
            done() { return player.B.time.gte(1000) },
            tooltip: "Play this game for 1000 seconds.<br>Reward: log10(Time spent on this tree) boosts point gain.",
            unlocked() { return true },
        },
        21:{
            name: "Ughhhhh another tree with the PBG format",
            done() { return (player.b2.unlocked)||(player.g.unlocked)},
            tooltip: "Unlock a Row 2 Layer.<br>Reward: Keep Prestige Achievements in Row 2 Resets.",
            unlocked() { return true },
        },
        22: {
            name: "Obligatory Nice Number achievement 1",
            done() { return player.B.time.gte(69) },
            tooltip: "Play this game for 69 seconds. Nice.",
            unlocked() { return true },
        },
        23: {
            name: "Obligatory Nice Number achievement 2",
            done() { return player.points.gte(69) },
            tooltip: "Get 69 points. Nice.",
            unlocked() { return true },
        },
        24: {
            name: "Obligatory Weed Number achievement 1",
            done() { return player.B.time.gte(420) },
            tooltip: "Play this game for 420 seconds. Double Nice.",
            unlocked() { return true },
        },
        25: {
            name: "Obligatory Weed Number achievement 2",
            done() { return player.points.gte(420) },
            tooltip: "PGet 420 points. Double Nice.",
            unlocked() { return true },
        },
        26: {
            name: "Obligatory LEET achievement 1",
            done() { return player.B.time.gte(1337) },
            tooltip: "PL4Y TH15 94M3 F0R 1337 53C0ND5.",
            unlocked() { return true },
        },
        31: {
            name: "Obligatory LEET achievement 2",
            done() { return player.points.gte(1337) },
            tooltip: "637 1137 P01N75.",
            unlocked() { return true },
        },
    },
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasAchievement("b2",11)) {mult = mult.plus(new Decimal(tmp.b2.achsCompleted).pow(0.7))}
        if (hasAchievement("g",11)) {mult = mult.plus(new Decimal(tmp.g.achsCompleted).pow(0.7))}
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = new Decimal (0)
        if (hasAchievement("g",14)) {
        gain = gain.plus(0.25)
        }
        return gain
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"</span> Prestige Achievements"
        }],
        "blank", 
        "blank", "blank",
        "achievements",
    ],
    achsCompleted() {return player[this.layer].achievements.length},
    achievements: {
        11: {
            name: "50 points are wasted now!",
            done() { return player.p.points.gte(1) },
            tooltip: "Get your first prestige point. <br>Reward: Prestige Achievements multiplies point gain (no exponents this time).",
            unlocked() { return tmp.p.layerShown },
        },
        12: {
            name: "A bit late for Prestige to be useful?",
            done() { return player.p.points.gte(5) },
            tooltip: function() {return "Get 5 prestige points. <br>Reward: Prestige Points ALSO multiplies point gain, but at a reduced rate. <br> Current: x" + format((new Decimal(player[this.layer].points).plus(1)).pow(0.6),2)},
            unlocked() { return tmp.p.layerShown },
        },
        13: {
            name: "Not enough for the next layer(s)",
            done() { return player.p.points.gte(10) },
            tooltip: function() {return "Get 10 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        14: {
            name: "Sneak Peek at them new features",
            done() { return player.p.points.gte(25) },
            tooltip: function() {return "Get 25 prestige points. Figure out the reward from the title"},
            unlocked() { return tmp.p.layerShown },
        },
        15: {
            name: "The freedom of choice",
            done() { return player.p.points.gte(100) },
            tooltip: function() {return "Get 100 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        16: {
            name: "No prestige points is enough prestige points",
            done() { return player.p.points.gte(1000) },
            tooltip: function() {return "Get 1000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        21: {
            name: "Seriously?",
            done() { return player.p.points.gte(10000) },
            tooltip: function() {return "Get 10000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        22: {
            name: "Seriously.",
            done() { return player.p.points.gte(100000) },
            tooltip: function() {return "Get 100000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        23: {
            name: "Rookie numbers",
            done() { return player.p.points.gte(1000000) },
            tooltip: function() {return "Get 1000000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        24: {
            name: "Not-so Rookie Numbers",
            done() { return player.p.points.gte(10000000) },
            tooltip: function() {return "Get 10000000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        25: {
            name: "Time to use exponents",
            done() { return player.p.points.gte(new Decimal.pow(10,8)) },
            tooltip: function() {return "Get 1e8 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        26: {
            name: "Obligatory Nice Number achievement",
            done() { return player.p.points.gte(69) },
            tooltip: "Get 69 prestige points. Nice.",
            unlocked() { return tmp.p.layerShown },
        },
        31: {
            name: "Obligatory Weed Number achievement",
            done() { return player.p.points.gte(420) },
            tooltip: "Get 420 prestige points. Double Nice.",
            unlocked() { return tmp.p.layerShown },
        },
        32: {
            name: "Obligatory LEET achievement",
            done() { return player.p.points.gte(1337) },
            tooltip: "637 1337 PR357163 P01N75.",
            unlocked() { return tmp.p.layerShown },
        },
    },
    doReset(p) {
        if(layers[p].row <= layers[this.layer].row || layers[p].row == "side")return;
        let keep = ["achievements"]
        if(hasAchievement("g",12))keep.push("points")
        layerDataReset("p", keep);
    },  
    layerShown(){return tmp.B.achsCompleted >= 4}
})

addLayer("b2", {
    name: "Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
    }},
    effectDescription: function(){return " which boosts points gain by " + format(new Decimal.pow(1.3,player.b2.points)) },
    color: "#5555FF",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "b", description: "B: Reset for Boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "clickables",
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"</span> Booster Achievements"
        }],
        "blank", 
        "blank", "blank",
        "achievements",
    ],
    clickables: {
        11: {
            title: "Hold to prestige",
            display: "(Mobile QoL, disabled if you got 'Completely Passive Player')",
            onClick() {if(canReset("p")) doReset("p")},
            onHold() {if(canReset("p")) doReset("p")},
            canClick() {return !hasAchievement("g",14)},
        },
    },
    canBuyMax(){return hasAchievement("b2",12)},
    achsCompleted() {return player[this.layer].achievements.length},
    achievements: {
        11: {
            name: "Active Player",
            done() { return player.b2.points.gte(1) },
            tooltip: "Get your first booster. <br>Reward: Booster Achievements multiplies prestige gain, exponented by 0.7.",
            unlocked() { return tmp.b2.layerShown },
        },
        12: {
            name: "This needs to be better",
            done() { return player.b2.points.gte(5) },
            tooltip: "Get 5 boosters. <br>Reward: You can buy max boosters.",
            unlocked() { return tmp.b2.layerShown },
        },
        13: {
            name: "Ten Boosters =/= Tenfold Boost",
            done() { return player.b2.points.gte(10) },
            tooltip: "Get 10 boosters.",
            unlocked() { return tmp.b2.layerShown },
        },
        14: {
            name: "5^2",
            done() { return player.b2.points.gte(25) },
            tooltip: "Get 25 boosters.",
            unlocked() { return tmp.b2.layerShown },
        },
        15: {
            name: "Obligatory Nice Number achievement",
            done() { return player.b2.points.gte(69) },
            tooltip: "Get 69 boosters. Nice.",
            unlocked() { return tmp.b2.layerShown },
        },
        16: {
            name: "Obligatory Weed Number achievement",
            done() { return player.b2.points.gte(420) },
            tooltip: "Get 420 boosters. Double Nice.",
            unlocked() { return tmp.b2.layerShown },
        },
        21: {
            name: "Obligatory LEET achievement",
            done() { return player.b2.points.gte(1337) },
            tooltip: "637 1337 800573R5.",
            unlocked() { return tmp.b2.layerShown },
        },
    },
    layerShown(){return hasAchievement("p",14)}
})

addLayer("g", {
    name: "Generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
        gPower: new Decimal(0),
    }},
    color: "#FF4444",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Generators", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    effectDescription: function(){return " which gives " + format(new Decimal.pow(2,player.g.points)) + " Generator Power every second." },
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        let gain = new Decimal(0)
        if (player[this.layer].unlocked){
        gain = new Decimal.pow(2,player.g.points)
        }
        player.g.gPower = player.g.gPower.add(gain.times(diff));
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "G: Reset for Generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "clickables",
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"</span> Generator Achievements"
        }],
        "blank",
        ["display-text", function() {
            return  "<h3>You have <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((player.g.gPower))+"</span> Generator Power, which boosts points by <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(new Decimal.pow(player.g.gPower,tmp[this.layer].effectExp))+"</span>"
        }],
        "blank", 
        "blank", "blank",
        "achievements",
    ],
    clickables: {
        11: {
            title: "Hold to prestige",
            display: "(Mobile QoL, disabled if you got 'Completely Passive Player')",
            onClick() {if(canReset("p")) doReset("p")},
            onHold() {if(canReset("p")) doReset("p")},
            canClick() {return !hasAchievement("g",14)},
        },
    },
    effectExp(){
        exp = new Decimal(0.25)
        if (hasAchievement("g",22)) {
            exp = exp.plus(0.25)
        }
        return exp
    },
    canBuyMax(){return hasAchievement("g",13)},
    achsCompleted() {return player[this.layer].achievements.length},
    achievements: {
        11: {
            name: "Passive Player",
            done() { return player.g.points.gte(1) },
            tooltip: "Get your first Generator. <br>Reward: Generator Achievements multiplies prestige gain, exponented by 0.7.",
            unlocked() { return tmp.g.layerShown },
        },
        12: {
            name: "You're definitely waiting for this",
            done() { return player.g.points.gte(5) },
            tooltip: "Get 5 Generators. <br>Reward: Keep Prestige Points on ALL row 2 resets.",
            unlocked() { return tmp.g.layerShown },
        },
        13: {
            name: "Production is SO SLOW",
            done() { return player.g.points.gte(8) },
            tooltip: "Get 8 Generators. <br>Reward: You can buy max generators.",
            unlocked() { return tmp.g.layerShown },
        },
        14: {
            name: "Completely Passive Player",
            done() { return player.g.points.gte(12) },
            tooltip: "Get 12 Generators. <br>Reward: Gain 25% of your pending prestige points per second.",
            unlocked() { return tmp.g.layerShown },
        },
        15: {
            name: "Generators are Useful now!",
            done() { return player.g.gPower.gte(1) },
            tooltip: "Get your first Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        16: {
            name: "...A little useless compared to OG Prestige Tree",
            done() { return player.g.gPower.gte(10) },
            tooltip: "Get 10 Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        21: {
            name: "This is STILL USELESS",
          done() { return player.g.gPower.gte(100) },
            tooltip: "Get 100 Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        22: {
            name: "When can it stop being so useless lol",
            done() { return player.g.gPower.gte(1000) },
            tooltip: "Get 1000 Generator Power. <br>Reward: Generator Power effect exponents by 0.5 instead of 0.25.",
            unlocked() { return tmp.g.layerShown },
        },
        23: {
            name: "Obligatory Nice Number achievement 1",
            done() { return player.g.points.gte(69) },
            tooltip: "Get 69 Generators. Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        24: {
            name: "Obligatory Nice Number achievement 2",
            done() { return player.g.gPower.gte(69) },
            tooltip: "Get 69 Generator Power. Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        25: {
            name: "Obligatory Weed Number achievement 1",
            done() { return player.g.points.gte(420) },
            tooltip:"Get 420 Generators. Double Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        26: {
            name: "Obligatory Weed Number achievement 2",
            done() { return player.g.gPower.gte(420) },
            tooltip: "Get 420 Generator Power. Double Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        31: {
            name: "Obligatory LEET achievement 1",
            done() { return player.g.points.gte(1337) },
            tooltip: "637 1337 63N3R470R5.",
            unlocked() { return tmp.g.layerShown },
        },
        32: {
            name: "Obligatory LEET achievement 2",
            done() { return player.g.gPower.gte(1337) },
            tooltip: "637 1337 63N3R470R P0W3R.",
            unlocked() { return tmp.g.layerShown },
        },
    },
    layerShown(){return hasAchievement("p",14)}
})