//Beginning Layer
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
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].totalAchs))+"</span> Achievements in this entire game. Unfortunately Achievements are based on the order 42UR3 put them in the game, not based on their ease of completion."
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
    totalAchs() {return tmp[this.layer].achsCompleted + tmp.p.achsCompleted + tmp.b2.achsCompleted + tmp.g.achsCompleted + tmp.d.achsCompleted + tmp.n.achsCompleted},
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
            image: "achImgs/b-11.png",
            tooltip: "Start playing this game. EASY PEASY!",
            unlocked() { return true },
        },
        12: {
            name: "Sacrificed 5 seconds to this game",
            done() { return player.B.time.gte(5) },
            image: "achImgs/b-12.png",
            tooltip: "Play this game for 5 seconds.",
            unlocked() { return true },
        },
        13: {
            name: "Two-digit play time",
            done() { return player.B.time.gte(10) },
            image: "achImgs/b-13.png",
            tooltip: "Play this game for 10 seconds.<br>Reward: Beginning Achievements gives points.",
            unlocked() { return true },
        },
        14: {
            name: "Oh. You're still here.",
            done() { return player.B.time.gte(20) },
            image: "achImgs/b-14.png",
            tooltip: "Play this game for 20 seconds.<br>",
            unlocked() { return true },
        },
        15: {
            name: "What do I do to make you leave?",
            done() { return player.B.time.gte(100) },
            image: "achImgs/b-15.png",
            tooltip: "Play this game for 100 seconds.<br>",
            unlocked() { return true },
        },
        16: {
            name: "Expert Time Waster",
            done() { return player.B.time.gte(1000) },
            image: "achImgs/b-16.png",
            tooltip: "Play this game for 1000 seconds.<br>Reward: log10(Time spent on this tree) boosts point gain.",
            unlocked() { return true },
        },
        21:{
            name: "The PBG Triangle",
            done() { return (player.b2.unlocked)||(player.g.unlocked)},
            image: "achImgs/b-21.png",
            tooltip: "Unlock a Row 2 Layer.<br>Reward: Keep Prestige Achievements in Row 2 Resets.",
            unlocked() { return true },
        },
        22: {
            name: "Obligatory Nice Number achievement 1",
            done() { return player.B.time.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Play this game for 69 seconds. Nice.",
            unlocked() { return true },
        },
        23: {
            name: "Obligatory Nice Number achievement 2",
            done() { return player.points.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 points. Nice.",
            unlocked() { return true },
        },
        24: {
            name: "Obligatory Weed Number achievement 1",
            done() { return player.B.time.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Play this game for 420 seconds. Double Nice.",
            unlocked() { return true },
        },
        25: {
            name: "Obligatory Weed Number achievement 2",
            done() { return player.points.gte(420) },
            image: "achImgs/420.png",
            tooltip: "PGet 420 points. Double Nice.",
            unlocked() { return true },
        },
        26: {
            name: "Obligatory LEET achievement 1",
            done() { return player.B.time.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "PL4Y TH15 94M3 F0R 1337 53C0ND5.",
            unlocked() { return true },
        },
        31: {
            name: "Obligatory LEET achievement 2",
            done() { return player.points.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1137 P01N75.",
            unlocked() { return true },
        },
        32: {
            name: "Only a few achievements are pleased",
            done() { return tmp[this.layer].totalAchs >= 10 },
            image: "achImgs/b-32.png",
            tooltip: "Complete 10 achievements in this game.",
            unlocked() { return true },
        },
        33: {
            name: "A little more than a few achievements are pleased",
            done() { return tmp[this.layer].totalAchs >= 50 },
            image: "achImgs/b-33.png",
            tooltip: "Complete 50 achievements in this game.",
            unlocked() { return true },
        },
        34: {
            name: "Considerably still a few achievements are pleased",
            done() { return tmp[this.layer].totalAchs >= 100},
            image: "achImgs/b-34.png",
            tooltip: "Complete 100 achievements in this game.",
            unlocked() { return true },
        },
        35:{
            name: "Finally, ORIGINAL LAYERS",
            done() { return (player.d.unlocked)||(player.n.unlocked)},
            image: "achImgs/b-35.png",
            tooltip: "Unlock a Row3 Layer.<br>Reward: Keep Row 2 achievements in Row 3 Resets.",
            unlocked() { return true },
        },
    },
})

//Prestige Layer
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
        mult = mult.plus(tmp.d.coinEff.sub(1))
        mult = mult.plus(new Decimal.pow(1.75,player.n.points))
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
            image: "achImgs/p-11.png",
            tooltip: "Get your first prestige point. <br>Reward: Prestige Achievements multiplies point gain (no exponents this time).",
            unlocked() { return tmp.p.layerShown },
        },
        12: {
            name: "A bit late for Prestige to be useful?",
            done() { return player.p.points.gte(5) },
            image: "achImgs/p-12.png",
            tooltip: function() {return "Get 5 prestige points. <br>Reward: Prestige Points ALSO multiplies point gain, but at a reduced rate. <br> Current: x" + format((new Decimal(player[this.layer].points).plus(1)).pow(0.6),2)},
            unlocked() { return tmp.p.layerShown },
        },
        13: {
            name: "Not enough for the next layer(s)",
            done() { return player.p.points.gte(10) },
            image: "achImgs/p-13.png",
            tooltip: function() {return "Get 10 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        14: {
            name: "Sneak Peek at them new features",
            done() { return player.p.points.gte(25) },
            image: "achImgs/p-14.png",
            tooltip: function() {return "Get 25 prestige points. Figure out the reward from the title"},
            unlocked() { return tmp.p.layerShown },
        },
        15: {
            name: "The freedom of choice",
            done() { return player.p.points.gte(100) },
            image: "achImgs/p-15.png",
            tooltip: function() {return "Get 100 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        16: {
            name: "Bowl of Peas",
            done() { return player.p.points.gte(1000) },
            image: "achImgs/p-16.png",
            tooltip: function() {return "Get 1000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        21: {
            name: "Seriously?",
            done() { return player.p.points.gte(10000) },
            image: "achImgs/p-21.png",
            tooltip: function() {return "Get 10000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        22: {
            name: "Seriously.",
            done() { return player.p.points.gte(100000) },
            image: "achImgs/p-22.png",
            tooltip: function() {return "Get 100000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        23: {
            name: "Rookie numbers",
            done() { return player.p.points.gte(1000000) },
            image: "achImgs/p-23.png",
            tooltip: function() {return "Get 1000000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        24: {
            name: "Not-so Rookie Numbers",
            done() { return player.p.points.gte(10000000) },
            image: "achImgs/p-24.png",
            tooltip: function() {return "Get 10000000 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        25: {
            name: "Time to use exponents",
            done() { return player.p.points.gte(new Decimal.pow(10,8)) },
            image: "achImgs/p-25.png",
            tooltip: function() {return "Get 1e8 prestige points."},
            unlocked() { return tmp.p.layerShown },
        },
        26: {
            name: "Obligatory Nice Number achievement",
            done() { return player.p.points.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 prestige points. Nice.",
            unlocked() { return tmp.p.layerShown },
        },
        31: {
            name: "Obligatory Weed Number achievement",
            done() { return player.p.points.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Get 420 prestige points. Double Nice.",
            unlocked() { return tmp.p.layerShown },
        },
        32: {
            name: "Obligatory LEET achievement",
            done() { return player.p.points.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1337 PR357163 P01N75.",
            unlocked() { return tmp.p.layerShown },
        },
        33: {
            name: "Alternative to a piece of cake",
            done() { return player.p.points.gte(new Decimal.times(3.14,new Decimal.pow(10,314))) },
            image: "achImgs/p-33.png",
            tooltip: "Get 3.14e314 prestige points.",
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

//Booster Layer
addLayer("b2", {
    name: "Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
    }},
    resetsNothing: function() {return hasAchievement("g",12)},
    effectDescription: function(){return " which boosts points gain by " + format(new Decimal.pow(1.3,player.b2.points)) },
    color: "#5555FF",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: function() {
        if (player[this.layer].points.gte(new Decimal.times(5, new Decimal.pow(10, 10)))) {
            return 1.1
        } else {
            return 1
        }
     }, // Prestige currency exponent
    directMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.add(new Decimal(tmp.d.starEff.sub(1)))
        if(hasAchievement("d",11)){
        mult = mult.add(new Decimal(tmp.d.achsCompleted).pow(0.1))
        }
        return mult
    },
    autoPrestige() {return hasAchievement('d',14)},
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
            image: "achImgs/b2-11.png",
            tooltip: "Get your first booster. <br>Reward: Booster Achievements multiplies prestige gain, exponented by 0.7.",
            unlocked() { return tmp.b2.layerShown },
        },
        12: {
            name: "This needs to be better",
            done() { return player.b2.points.gte(5) },
            image: "achImgs/b2-12.png",
            tooltip: "Get 5 boosters. <br>Reward: You can buy max boosters.",
            unlocked() { return tmp.b2.layerShown },
        },
        13: {
            name: "Ten Boosters =/= Tenfold Boost",
            done() { return player.b2.points.gte(10) },
            image: "achImgs/b2-13.png",
            tooltip: "Get 10 boosters. <br>Reward: Shows the next layer.",
            unlocked() { return tmp.b2.layerShown },
        },
        14: {
            name: "5^2",
            done() { return player.b2.points.gte(25) },
            image: "achImgs/b2-14.png",
            tooltip: "Get 25 boosters.",
            unlocked() { return tmp.b2.layerShown },
        },
        15: {
            name: "Obligatory Nice Number achievement",
            done() { return player.b2.points.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 boosters. Nice.",
            unlocked() { return tmp.b2.layerShown },
        },
        16: {
            name: "Obligatory Weed Number achievement",
            done() { return player.b2.points.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Get 420 boosters. Double Nice.",
            unlocked() { return tmp.b2.layerShown },
        },
        21: {
            name: "Obligatory LEET achievement",
            done() { return player.b2.points.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1337 800573R5.",
            unlocked() { return tmp.b2.layerShown },
        },
    },
    doReset(b2) {
        if(layers[b2].row <= layers[this.layer].row || layers[b2].row == "side")return;
        let keep = ["achievements"]
        if(hasAchievement('d',13)) {keep.push("points")}
        layerDataReset("b2", keep);
    },  
    layerShown(){return hasAchievement("p",14)}
})

//Generator Layer
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
    resetsNothing: function() {return hasAchievement("g",12)},
    color: "#FF4444",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Generators", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    effectDescription: function(){return " which gives " + format(new Decimal.pow(2,player.g.points)) + " Generator Power every second." },
    exponent: function() {
        if (player[this.layer].points.gte(new Decimal.times(5, new Decimal.pow(10, 10)))) {
            return 1.1
        } else {
            return 1
        }
    }, // Prestige currency exponent
    directMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.plus(player.n.points.div(10))
        if(hasAchievement("n",11)){
        mult = mult.add(new Decimal(tmp.n.achsCompleted).pow(0.1))
        }
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
    autoPrestige() {return hasAchievement('n',15)},
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
            image: "achImgs/g-11.png",
            tooltip: "Get your first Generator. <br>Reward: Generator Achievements multiplies prestige gain, exponented by 0.7.",
            unlocked() { return tmp.g.layerShown },
        },
        12: {
            name: "You're definitely waiting for this",
            done() { return player.g.points.gte(5) },
            image: "achImgs/g-12.png",
            tooltip: "Get 5 Generators. <br>Reward: ALL row 2 resets resets nothing AND keep Prestige Points in ALL resets.",
            unlocked() { return tmp.g.layerShown },
        },
        13: {
            name: "Production is SO SLOW",
            done() { return player.g.points.gte(8) },
            image: "achImgs/g-13.png",
            tooltip: "Get 8 Generators. <br>Reward: You can buy max generators.",
            unlocked() { return tmp.g.layerShown },
        },
        14: {
            name: "Completely Passive Player",
            done() { return player.g.points.gte(12) },
            image: "achImgs/g-14.png",
            tooltip: "Get 12 Generators. <br>Reward: Gain 25% of your pending prestige points per second, and show a next layer.",
            unlocked() { return tmp.g.layerShown },
        },
        15: {
            name: "Generators are Useful now!",
            done() { return player.g.gPower.gte(1) },
            image: "achImgs/g-15.png",
            tooltip: "Get your first Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        16: {
            name: "...A little useless compared to OG Prestige Tree",
            done() { return player.g.gPower.gte(10) },
            image: "achImgs/g-16.png",
            tooltip: "Get 10 Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        21: {
            name: "This is STILL USELESS",
            done() { return player.g.gPower.gte(100) },
            image: "achImgs/g-21.png",
            tooltip: "Get 100 Generator Power.",
            unlocked() { return tmp.g.layerShown },
        },
        22: {
            name: "When can it stop being so useless lol",
            done() { return player.g.gPower.gte(1000) },
            image: "achImgs/g-22.png",
            tooltip: "Get 1000 Generator Power. <br>Reward: Generator Power effect exponents by 0.5 instead of 0.25.",
            unlocked() { return tmp.g.layerShown },
        },
        23: {
            name: "Obligatory Nice Number achievement 1",
            done() { return player.g.points.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 Generators. Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        24: {
            name: "Obligatory Nice Number achievement 2",
            done() { return player.g.gPower.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 Generator Power. Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        25: {
            name: "Obligatory Weed Number achievement 1",
            done() { return player.g.points.gte(420) },
            image: "achImgs/420.png",
            tooltip:"Get 420 Generators. Double Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        26: {
            name: "Obligatory Weed Number achievement 2",
            done() { return player.g.gPower.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Get 420 Generator Power. Double Nice.",
            unlocked() { return tmp.g.layerShown },
        },
        31: {
            name: "Obligatory LEET achievement 1",
            done() { return player.g.points.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1337 63N3R470R5.",
            unlocked() { return tmp.g.layerShown },
        },
        32: {
            name: "Obligatory LEET achievement 2",
            done() { return player.g.gPower.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1337 63N3R470R P0W3R.",
            unlocked() { return tmp.g.layerShown },
        },
    },
    doReset(g) {
        if(layers[g].row <= layers[this.layer].row || layers[g].row == "side")return;
        let keep = ["achievements"]
        layerDataReset("g", keep);
    },  
    layerShown(){return hasAchievement("p",14)}
})

//Dice Layer
addLayer("d", {
    name: "Dice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🎲", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
        playerSpace: new Decimal(0),
        diceVal: new Decimal(1),
        coins: new Decimal(0),
        stars: new Decimal(0),
        redTotal: new Decimal(0),
        blueTotal: new Decimal(0),
        yellowTotal: new Decimal(0),
        goTotal: new Decimal(0),
        customNo: new Decimal(1),
        thrownDice: new Decimal(0),
        thrownCustom: new Decimal(0)
    }},
    color: "#FFFFFF",
    requires: function() {
        if (!player.n.unlocked||player.d.points.gte(1)) {
        return new Decimal(15)
        } else {
        return new Decimal(100)    
        }
    }, // Can be a function that takes requirement increases into account
    resource: "dice", // Name of prestige currency
    baseResource: "boosters", // Name of resource prestige is based on
    baseAmount() {return player.b2.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["b2","g"],
    hotkeys: [
        {key: "d", description: "D: Reset for Dice", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    canBuyMax(){return hasAchievement("d",12)},
    blueReward() {
        gain = new Decimal(3)
        gain = gain.plus(player[this.layer].goTotal)
        if(hasAchievement(this.layer,31)){
            gain = gain.times(2)
        }
        return gain
    },
    redReward() {
        gain = new Decimal(1)
        gain = gain.plus(player[this.layer].goTotal)
        if(hasAchievement(this.layer,32)){
            gain = gain.times(2)
        }
        return gain
    },
    yellowCost() {
        cost = new Decimal(20)
        if(hasAchievement(this.layer,23)){
            cost = cost.sub(5)
        }
        return cost
    },
    yellowReward() {
        gain = new Decimal(1)
        return gain
    },
    coinEff(){
        effect = (player[this.layer].coins.plus(1))
        if(hasAchievement(this.layer,31)){
            effect = effect.times(2)
        }
        if(hasAchievement(this.layer,32)){
            effect = effect.times(2)
        }
        return effect
    },
    starEff(){
            effect = new Decimal(player[this.layer].stars.div(100)).plus(1)
        return effect
    },
    tabFormat: [
        ["infobox","rules"],
        "main-display",
        "prestige-button",
        ["display-text", function() {
            return  "Remember, you have <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((player.b2.points))+"</span> boosters and <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>" + formatWhole((player.g.points)) + "</span> Generators!"
        }],
        "blank",
        ["row", [["clickable",11],["clickable",12]]],
        "blank",
        ["display-image",
        function() { return "otherImgs/DiceBoard.png" },
        {"width": "400px"}],
        "blank",
        ["buyable",11],
        "blank",
        ["display-text", function() {if(!hasAchievement(this.layer,15)){
            return "You haven't unlocked Custom Die yet!"
        } else {
            return  "You will roll a <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole(new Decimal(player[this.layer].customNo) )+"</span> if you roll the custom die."
        }}],
        "blank",
        ["row", [["clickable",22],["buyable",21],["clickable",21]]],
        "blank",
        ["display-text", function() {
            return  "You are currently in space <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole(new Decimal(player[this.layer].playerSpace % 64).plus(1) )+"</span>"
        }],
        ["display-text", function() {
            return  "You have travelled <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole((player[this.layer].playerSpace))+"</span> spaces in total"
        }],
        ["display-text", function() {
            return  "You have thrown <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole((player[this.layer].thrownDice))+"</span> dice"
        }],
        ["display-text", function() {
            return  "You have thrown <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole((player[this.layer].thrownCustom))+"</span> custom dice"
        }],
        ["display-text", function() {
            return  "You have <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole((player[this.layer].coins))+"</span> coins, which boosts prestige point gain by <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+format(tmp[this.layer].coinEff,2)+"</span>x"
        }],
        ["display-text", function() {
            return  "You have <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+formatWhole((player[this.layer].stars))+"</span> stars, which boosts boosters gain by <span style='color: "+tmp[this.layer].color+"; font-size: 20px;'>"+format(tmp[this.layer].starEff,2)+"</span>x"
        }],
        ["display-text", function() {
            return  "You have landed on <span style='color: #4444FF; font-size: 20px;'>"+formatWhole((player[this.layer].blueTotal))+"</span> blue spaces, <span style='color: #FF0000; font-size: 20px;'>"+formatWhole((player[this.layer].redTotal))+"</span> red spaces, <span style='color: #FFFF00; font-size: 20px;'>"+formatWhole((player[this.layer].yellowTotal))+"</span> yellow spaces and on GO! <span style='color: #FFFFFF; font-size: 20px;'>"+formatWhole((player[this.layer].goTotal))+"</span> times"
        }],
        ["display-text", function() {
            return  "You have passed GO! <span style='color: #FFFFFF; font-size: 20px;'>"+formatWhole(new Decimal.floor(player[this.layer].playerSpace.div(64)))+"</span> times"
        }],
        "blank",
        ["display-text", function() {
            return  "You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 40px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"</span> Dice Achievements"
        }],
        "blank", 
        "blank", "blank",
        "achievements",
    ],
    clickables: {
        11: {
            title: "Hold to get boosters",
            display: "(Mobile QoL)",
            onClick() {if(canReset("b2")) doReset("b2")},
            onHold() {if(canReset("b2")) doReset("b2")},
            canClick() {return true},
        },
        12: {
            title: "Hold to get generators",
            display: "(Mobile QoL)",
            onClick() {if(canReset("g")) doReset("g")},
            onHold() {if(canReset("g")) doReset("g")},
            canClick() {return true},
        },
        21:
        {
            title: "+",
            onClick() {player[this.layer].customNo = player[this.layer].customNo.add(1)},
            canClick() {return hasAchievement(this.layer,15)&&player[this.layer].customNo.lt(10)},
        },
        22:
        {
            title: "-",
            onClick() {player[this.layer].customNo = player[this.layer].customNo.sub(1)},
            canClick() {return hasAchievement(this.layer,15)&&player[this.layer].customNo.gt(1)},
        },
    },
    achsCompleted() {return player[this.layer].achievements.length},
    infoboxes: {
        rules: {
            title: "How to play the Dice layer",
            body() { return `
            The Dice Layer is a board game inspired by a certain Nintendo party game.<br>
            First, you prestige in this layer in order to obtain dice.<br>
            Then, you spend a die to roll it!<br>
            You move the same amount of spaces as how much you rolled.<br>
            Besides of GO!, there are also blue, red and yellow spaces. <br>
            Landing on blue or red will give you coins, which boosts prestige point gain. <br>
            Landing on yellow will deduct 20 coins (if you have that amount or more that is) in exchange for a star, which boosts boosters gain. <br>
            Landing on GO! will give you a star for free! <br>
            Have fun!
            ` },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1) },
            title: "Throw a die",
            display() { return "Use one of the dice (1-10) you got for this layer on the board game" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player[this.layer].diceVal = new Decimal.floor(Math.random() * 10)
                player[this.layer].playerSpace = player[this.layer].playerSpace.plus(player[this.layer].diceVal)
                if (player[this.layer].playerSpace % 64 == 31 || player[this.layer].playerSpace % 64 == 63) {
                    if (player[this.layer].coins.gte(tmp[this.layer].yellowCost)){
                        player[this.layer].coins = player[this.layer].coins.sub(tmp[this.layer].yellowCost)
                        player[this.layer].stars = player[this.layer].stars.plus(tmp[this.layer].yellowReward)
                    }
                    player[this.layer].yellowTotal = player[this.layer].yellowTotal.add(1)
                } else if (player[this.layer].playerSpace % 4 == 3 && player[this.layer].playerSpace % 64 != 31 && player[this.layer].playerSpace % 64 != 63){
                    player[this.layer].coins = player[this.layer].coins.plus(tmp[this.layer].redReward)
                    player[this.layer].redTotal = player[this.layer].redTotal.add(1)
                } else if (player[this.layer].playerSpace.eq(0)) {
                    player[this.layer].stars = player[this.layer].stars.plus(tmp[this.layer].yellowReward)
                    player[this.layer].goTotal = player[this.layer].goTotal.add(1)
                } else {
                    player[this.layer].coins = player[this.layer].coins.plus(tmp[this.layer].blueReward)
                    player[this.layer].blueTotal = player[this.layer].blueTotal.add(1)
                }
                player[this.layer].thrownDice = player[this.layer].thrownDice.add(1)
            },
        },
        21: {
            cost(x) { return new Decimal(10) },
            title: "Custom Die",
            display() { return "Spend 10 dice to roll the number you want on the board game." },
            canAfford() { return player[this.layer].points.gte(this.cost()) && hasAchievement(this.layer,15) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player[this.layer].playerSpace = player[this.layer].playerSpace.plus(player[this.layer].customNo)
                if (player[this.layer].playerSpace % 64 == 31 || player[this.layer].playerSpace % 64 == 63) {
                    if (player[this.layer].coins.gte(tmp[this.layer].yellowCost)){
                        player[this.layer].coins = player[this.layer].coins.sub(tmp[this.layer].yellowCost)
                        player[this.layer].stars = player[this.layer].stars.plus(tmp[this.layer].yellowReward)
                    }
                    player[this.layer].yellowTotal = player[this.layer].yellowTotal.add(1)
                } else if (player[this.layer].playerSpace % 4 == 3 && player[this.layer].playerSpace % 64 != 31 && player[this.layer].playerSpace % 64 != 63){
                    player[this.layer].coins = player[this.layer].coins.plus(tmp[this.layer].redReward)
                    player[this.layer].redTotal = player[this.layer].redTotal.add(1)
                } else if (player[this.layer].playerSpace % 64 == 0) {
                    player[this.layer].stars = player[this.layer].stars.plus(tmp[this.layer].yellowReward)
                    player[this.layer].goTotal = player[this.layer].goTotal.add(1)
                } else {
                    player[this.layer].coins = player[this.layer].coins.plus(tmp[this.layer].blueReward)
                    player[this.layer].blueTotal = player[this.layer].blueTotal.add(1)
                }
                player[this.layer].thrownCustom = player[this.layer].thrownCustom.add(1)
            },
        },
    },
    achievements: {
        11: {
            name: "A typical plumber's party",
            done() { return player[this.layer].unlocked },
            image: "achImgs/d-11.png",
            tooltip: "Unlock this layer. <br>Reward: Dice Achievements multiplies boosters gain, exponented by 0.1",
            unlocked() { return tmp.d.layerShown },
        },
        12: {
            name: "No, you can't roll multiple dice at once",
            done() { return player[this.layer].points.gte(2) },
            image: "achImgs/d-12.png",
            tooltip: "Get 2 dice. <br>Reward: You can buy max dice.",
            unlocked() { return tmp.d.layerShown },
        },
        13: {
            name: "We all know repetition sucks",
            done() { return player[this.layer].points.gte(4) },
            image: "achImgs/d-13.png",
            tooltip: "Get 4 dice. <br>Reward: Dice (and later the other layer of this row) no longer resets boosters amount.",
            unlocked() { return tmp.d.layerShown },
        },
        14: {
            name: "Look at that 6-pack",
            done() { return player[this.layer].points.gte(6) },
            image: "achImgs/d-14.png",
            tooltip: "Get 6 dice. <br>Reward: Automatically prestige for Boosters.",
            unlocked() { return tmp.d.layerShown },
        },
        15: {
            name: "Making this layer suck less",
            done() { return player[this.layer].points.gte(10) },
            image: "achImgs/d-15.png",
            tooltip: "Get 10 dice. <br>Reward: Unlock Custom Die.",
            unlocked() { return tmp.d.layerShown },
        },
        16: {
            name: "Try moving in real life",
            done() { return player[this.layer].playerSpace.gte(1) },
            image: "achImgs/d-16.png",
            tooltip: "Get yourself progress on the board game.",
            unlocked() { return tmp.d.layerShown },
        },
        21: {
            name: "10 spaces is a jog",
            done() { return player[this.layer].playerSpace.gte(10) },
            image: "achImgs/d-21.png",
            tooltip: "Move 10 spaces in the board game.",
            unlocked() { return tmp.d.layerShown },
        },
        22: {
            name: "100 spaces is a track",
            done() { return player[this.layer].playerSpace.gte(100) },
            image: "achImgs/d-22.png",
            tooltip: "Move 100 spaces in the board game.",
            unlocked() { return tmp.d.layerShown },
        },
        23: {
            name: "1000 spaces is a marathon",
            done() { return player[this.layer].playerSpace.gte(1000) },
            image: "achImgs/d-23.png",
            tooltip: "Move 1000 spaces in the board game. <br>Reward: Decrese star cost on yellow spaces by 5.",
            unlocked() { return tmp.d.layerShown },
        },        
        24: {
            name: "You got 3 more coins!",
            done() { return player[this.layer].blueTotal.gte(1) },
            image: "achImgs/d-24.png",
            tooltip: "Land on your first blue space.",
            unlocked() { return tmp.d.layerShown },
        },
        25: {
            name: "What, you think we'll just take your coins for nothing?",
            done() { return player[this.layer].redTotal.gte(1) },
            image: "achImgs/d-25.png",
            tooltip: "Land on your first red space.",
            unlocked() { return tmp.d.layerShown },
        },
        26: {
            name: "AKSHUALLY stars are not necessarily yellow",
            done() { return player[this.layer].stars.gte(1) },
            image: "achImgs/d-26.png",
            tooltip: "Get a star.",
            unlocked() { return tmp.d.layerShown },
        },
        31: {
            name: "You got 30 more coins!",
            done() { return player[this.layer].blueTotal.gte(10) },
            image: "achImgs/d-31.png",
            tooltip: "Land on 10 blue spaces. <br>Reward: Doubles coin gain from Blue Spaces AND coin effect.",
            unlocked() { return tmp.d.layerShown },
        },
        32: {
            name: "Like walking on a red carpet",
            done() { return player[this.layer].redTotal.gte(10) },
            image: "achImgs/d-32.png",
            tooltip: "Land on 10 red spaces. <br>Reward: Doubles coin gain from Red Spaces AND coin effect.",
            unlocked() { return tmp.d.layerShown },
        },
        33: {
            name: "Star Hoarder",
            done() { return player[this.layer].stars.gte(10) },
            image: "achImgs/d-33.png",
            tooltip: "Get 10 stars.",
            unlocked() { return tmp.d.layerShown },
        },
        34: {
            name: "I bet you stream Eiffel 65",
            done() { return player[this.layer].blueTotal.gte(100) },
            image: "achImgs/d-34.png",
            tooltip: "Land on 100 blue spaces. <br>Reward: Blue spaces gives more coins based on times you landed on it (at a reduced rate).",
            unlocked() { return tmp.d.layerShown },
        },
        35: {
            name: "Don't try this at THAT party game",
            done() { return player[this.layer].redTotal.gte(100) },
            image: "achImgs/d-35.png",
            tooltip: "Land on 100 Red spaces. <br>Reward: Red spaces gives more coins based on times you landed on it (at a reduced rate).",
            unlocked() { return tmp.d.layerShown },
        },
        36: {
            name: "Welcome Home!",
            done() { return new Decimal(player[this.layer].playerSpace.div(64)).gte(1) },
            image: "achImgs/d-36.png",
            tooltip: "Pass GO for the first time.",
            unlocked() { return tmp.d.layerShown },
        },
        41: {
            name: "Home Sweet Home",
            done() { return new Decimal(player[this.layer].playerSpace.div(64)).gte(10) },
            image: "achImgs/d-41.png",
            tooltip: "Pass GO 10 times.",
            unlocked() { return tmp.d.layerShown },
        },
        42: {
            name: "Home's 100 times the charm",
            done() { return new Decimal(player[this.layer].playerSpace.div(64)).gte(100) },
            image: "achImgs/d-42.png",
            tooltip: "Pass GO 100 times.",
            unlocked() { return tmp.d.layerShown },
        },
        43: {
            name: "More fun to throw than balls",
            done() { return player[this.layer].thrownDice.gte(1) },
            image: "achImgs/d-12.png",
            tooltip: "Roll your first die.",
            unlocked() { return tmp.d.layerShown },
        },
        44: {
            name: "Gambling Amatuer",
            done() { return player[this.layer].thrownDice.gte(10) },
            image: "achImgs/d-12.png",
            tooltip: "Roll 10 dice.",
            unlocked() { return tmp.d.layerShown },
        },
        45: {
            name: "Gambling Enthusiast",
            done() { return player[this.layer].thrownDice.gte(100) },
            image: "achImgs/d-12.png",
            tooltip: "Roll 100 dice.",
            unlocked() { return tmp.d.layerShown },
        },
        46: {
            name: "Where is the gambling?",
            done() { return player[this.layer].thrownCustom.gte(1) },
            image: "achImgs/d-46.png",
            tooltip: "Roll a custom die.",
            unlocked() { return tmp.d.layerShown },
        },
        51: {
            name: "You want more control I see",
            done() { return player[this.layer].thrownCustom.gte(10) },
            image: "achImgs/d-46.png",
            tooltip: "Roll 10 custom dice.",
            unlocked() { return tmp.d.layerShown },
        },
        52: {
            name: "You're BANNED from board game clubs!",
            done() { return player[this.layer].thrownCustom.gte(100) },
            image: "achImgs/d-46.png",
            tooltip: "Roll 100 custom dice.",
            unlocked() { return tmp.d.layerShown },
        },
        53: {
            name: "No double paycheck",
            done() { return player[this.layer].goTotal.gte(1) },
            image: "achImgs/d-53.png",
            tooltip: "Land on GO.<br>Reward: Number of times landed on GO adds to coin gain on BOTH blue and red spaces BEFORE the effects of achievements R3C4 and R3C5.",
            unlocked() { return tmp.d.layerShown },
        },
        54: {
            name: "You're one coin richer",
            done() { return player[this.layer].coins.gte(1) },
            image: "achImgs/d-54.png",
            tooltip: "Get 1 coin.",
            unlocked() { return tmp.d.layerShown },
        },
        55: {
            name: "Is 'Decare' a word?",
            done() { return player[this.layer].coins.gte(10) },
            image: "achImgs/d-55.png",
            tooltip: "Get 10 coins.",
            unlocked() { return tmp.d.layerShown },
        },
        56: {
            name: "Enough for 5 stars",
            done() { return player[this.layer].coins.gte(100) },
            image: "achImgs/d-56.png",
            tooltip: "Get 100 coins.",
            unlocked() { return tmp.d.layerShown },
        },
        61: {
            name: "IRS: 'You should BILL yourself NOW'",
            done() { return player[this.layer].coins.gte(1000) },
            image: "achImgs/d-61.png",
            tooltip: "Get 1000 coins.",
            unlocked() { return tmp.d.layerShown },
        },
        62: {
            name: "Obligatory Nice Number achievement 1",
            done() { return player.d.points.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 Dice. Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        63: {
            name: "Obligatory Nice Number achievement 2",
            done() { return player.d.thrownDice.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Throw 69 dice in this run. Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        64: {
            name: "Obligatory Nice Number achievement 3",
            done() { return player.d.thrownCustom.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Throw 69 CUSTOM dice in this run. Won't be nice for the other players.",
            unlocked() { return tmp.d.layerShown },
        },
        65: {
            name: "Obligatory Nice Number achievement 4",
            done() { return player.d.blueTotal.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Land on 69 blue spaces. Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        66: {
            name: "Obligatory Nice Number achievement 5",
            done() { return player.d.redTotal.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Land on 69 red spaces. If red spaces take 3 coins then it won't be as nice.",
            unlocked() { return tmp.d.layerShown },
        },
        71: {
            name: "Obligatory Nice Number achievement 6",
            done() { return player.d.coins.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 coins. Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        72: {
            name: "Obligatory Nice Number achievement 7",
            done() { return player.d.stars.gte(69) },
            image: "achImgs/69.png",
            tooltip: "Get 69 stars. Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        73: {
            name: "Obligatory Weed Number achievement 1",
            done() { return player.d.points.gte(420) },
            image: "achImgs/420.png",
            tooltip:"Get 420 Dice. Double Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        74: {
            name: "Obligatory Weed Number achievement 2",
            done() { return player.d.thrownDice.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Throw 420 Dice. Double Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        75: {
            name: "Obligatory Weed Number achievement 3",
            done() { return player.d.thrownCustom.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Throw 420 CUSTOM Dice. People will think you're on weed with this achievement.",
            unlocked() { return tmp.d.layerShown },
        },
        76: {
            name: "Obligatory Weed Number achievement 4",
            done() { return player.d.blueTotal.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Land on 420 blue spaces. Double Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        81: {
            name: "Obligatory Weed Number achievement 5",
            done() { return player.d.redTotal.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Land on 420 red spaces. Why is rose the only red plant I can think of?",
            unlocked() { return tmp.d.layerShown },
        },
        82: {
            name: "Obligatory Weed Number achievement 6",
            done() { return player.d.coins.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Get 420 coins. Double Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        83: {
            name: "Obligatory Weed Number achievement 7",
            done() { return player.d.stars.gte(420) },
            image: "achImgs/420.png",
            tooltip: "Get 420 stars. Double Nice.",
            unlocked() { return tmp.d.layerShown },
        },
        84: {
            name: "Obligatory LEET achievement 1",
            done() { return player.d.points.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "637 1337 D1C3.",
            unlocked() { return tmp.d.layerShown },
        },
        85: {
            name: "Obligatory LEET achievement 2",
            done() { return player.d.thrownDice.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "7HR0W 1337 D1C3.",
            unlocked() { return tmp.d.layerShown },
        },
        86: {
            name: "Obligatory LEET achievement 3",
            done() { return player.d.thrownCustom.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "7HR0W 1337 CU570M D1C3.",
            unlocked() { return tmp.d.layerShown },
        },
        91: {
            name: "Obligatory LEET achievement 4",
            done() { return player.d.blueTotal.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "L4ND 0N 1337 8LU3 5P4C35. (did I just said my old alias... WAIT WHY DID I ADMIT THAT-)",
            unlocked() { return tmp.d.layerShown },
        },
        92: {
            name: "Obligatory LEET achievement 5",
            done() { return player.d.redTotal.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "L4ND 0N 1337 R3D 5P4C35. (my doppelganger from an alternate universe)",
            unlocked() { return tmp.d.layerShown },
        },
        93: {
            name: "Obligatory LEET achievement 6",
            done() { return player.d.coins.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "G37 1337 C01N5. H4V3 Y0U 81LL3D 7H3 1R5 Y37?",
            unlocked() { return tmp.d.layerShown },
        },
        94: {
            name: "Obligatory LEET achievement 7",
            done() { return player.d.stars.gte(1337) },
            image: "achImgs/1337.png",
            tooltip: "G37 1337 574R5.",
            unlocked() { return tmp.d.layerShown },
        },
    },
    layerShown(){return hasAchievement("b2",13)}
})

//Number Layer
addLayer("n", {
    name: "Number", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "123", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        achievements: [],
		points: new Decimal(0),
        inputNumber: "",
        back1done: false,
        back2done: false,
        clear1done: false,
        clear2done: false
    }},
    color: "#30D5C8",
    requires: function() {
        if (!player.d.unlocked||player.n.points.gte(1)) {
        return new Decimal(15)
        } else {
        return new Decimal(100)    
        }
    }, // Can be a function that takes requirement increases into account
    resource: "digits", // Name of prestige currency
    baseResource: "generators", // Name of resource prestige is based on
    baseAmount() {return player.g.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    effectDescription: function(){return " which boosts generators gain by <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>" + format(player[this.layer].points.div(10)) +"</span>x and prestige point gain by <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>" + format(new Decimal.pow(1.75,player[this.layer].points)) +"</span>x" },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["b2","g"],
    hotkeys: [
        {key: "n", description: "N: Reset for digits", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["row", [["clickable",11],["clickable",12]]],
        "blank",
        ["display-text", function() {if(new Decimal(player[this.layer].inputNumber.length).gt(30)){
            return "<h3>Oh no, numbers cannot be displayed past 30 digits!</h3>"
        } else {
            return  "<h3><span style='color: #FFFFFF; font-size: 25px;'>"+player[this.layer].inputNumber+"</span>"
        }
        }],
        "blank",
        ["row", [["clickable",21],["clickable",22],["clickable",23],["clickable",24],["clickable",25]]],
        ["row", [["clickable",31],["clickable",32],["clickable",33],["clickable",34],["clickable",35]]],
        ["row", [["clickable",41],["clickable",42]]],
        "blank",
        ["display-text", function() {
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole((tmp[this.layer].achsCompleted))+"</span> Number Achievements"
        }],
        "blank", 
        "blank", "blank",
        "achievements",
    ],
    clickables: {
        11: {
            title: "Hold to get boosters",
            display: "(Mobile QoL)",
            onClick() {if(canReset("b2")) doReset("b2")},
            onHold() {if(canReset("b2")) doReset("b2")},
            canClick() {return true},
        },
        12: {
            title: "Hold to get generators",
            display: "(Mobile QoL)",
            onClick() {if(canReset("g")) doReset("g")},
            onHold() {if(canReset("g")) doReset("g")},
            canClick() {return true},
        },
        21: {
            title: "0",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(0)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        22: {
            title: "1",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(1)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        23: {
            title: "2",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(2)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        24: {
            title: "3",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(3)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        25: {
            title: "4",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(4)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        31: {
            title: "5",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(5)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        32: {
            title: "6",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(6)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        33: {
            title: "7",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(7)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        34: {
            title: "8",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(8)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        35: {
            title: "9",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).lt(player[this.layer].points)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.concat(9)
                }
            },
            style: {
                "width": "100px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        41: {
            title: "BACK",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).gt(0)) {
                    player[this.layer].inputNumber = player[this.layer].inputNumber.slice(0,-1)
                    player[this.layer].back1done = true
                } else {
                    player[this.layer].back2done = true
                }
            },
            style: {
                "width": "250px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
        42: {
            title: "CLEAR",
            onClick() {
                if(new Decimal(player[this.layer].inputNumber.length).gt(0)) {
                    player[this.layer].inputNumber = ""
                    player[this.layer].clear1done = true
                } else {
                    player[this.layer].clear2done = true
                }
            },
            style: {
                "width": "250px",
                "height": "40px",
                "min-height": "40px"
            },
            canClick() {return true},
        },
    },
    achsCompleted() {return player[this.layer].achievements.length},
    achievements: {
        11: {
            name: "Form wants to know your location",
            done() { return player[this.layer].unlocked },
            image: "achImgs/n-11.png",
            tooltip: "Unlock this layer. <br>Reward: Number Achievements multiplies generators gain, exponented by 0.1",
            unlocked() { return tmp.n.layerShown },
        },
        12: {
            name: "Clearly only 1 digit sucks",
            done() { return player[this.layer].points.gte(2) },
            image: "achImgs/n-12.png",
            tooltip: "Get 2 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        13: {
            name: "Hundreds",
            done() { return player[this.layer].points.gte(3) },
            image: "achImgs/n-13.png",
            tooltip: "Get 3 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        14: {
            name: "Thousands",
            done() { return player[this.layer].points.gte(4) },
            image: "achImgs/n-14.png",
            tooltip: "Get 4 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        15: {
            name: "Millions",
            done() { return player[this.layer].points.gte(7) },
            image: "achImgs/p-23.png",
            tooltip: "Get 7 digits.<br> Reward: Automatically prestige for generators.",
            unlocked() { return tmp.n.layerShown },
        },
        16: {
            name: "Billions",
            done() { return player[this.layer].points.gte(10) },
            image: "achImgs/n-16.png",
            tooltip: "Get 10 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        21: {
            name: "Are you even going to use this many digits?",
            done() { return player[this.layer].points.gte(30) },
            image: "achImgs/n-21.png",
            tooltip: "Get 30 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        22: {
            name: "Oh. You actually used this many of them.",
            done() { return new Decimal(player[this.layer].inputNumber.length).gte(30) },
            image: "achImgs/n-21.png",
            tooltip: "Input a number with 30 digits.",
            unlocked() { return tmp.n.layerShown },
        },
        23: {
            name: "The number about nothingness",
            done() { return player[this.layer].inputNumber.includes('0') },
            image: "achImgs/n-23.png",
            tooltip: "Input a 0 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        24: {
            name: "1x1 = 1/1 = 1^1",
            done() { return player[this.layer].inputNumber.includes('1') },
            image: "achImgs/n-24.png",
            tooltip: "Input a 1 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        25: {
            name: "2+2/2 = 2x2/2 = 2^2/2",
            done() { return player[this.layer].inputNumber.includes('2') },
            image: "achImgs/n-25.png",
            tooltip: "Input a 2 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        26: {
            name: "The narcissistic",
            done() { return player[this.layer].inputNumber.includes('3') },
            image: "achImgs/n-26.png",
            tooltip: "Input a 3 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        31: {
            name: "To care or not to care, depends on the question",
            done() { return player[this.layer].inputNumber.includes('4') },
            image: "achImgs/n-31.png",
            tooltip: "Input number 4, forevermore, I love you, my Number 4...",
            unlocked() { return tmp.n.layerShown },
        },
        32: {
            name: "<strike>Miners and Hoes</strike> Fingers and Toes",
            done() { return player[this.layer].inputNumber.includes('5') },
            image: "achImgs/n-32.png",
            tooltip: "Input a 5 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        33: {
            name: "1x2x3 = 1+2+3",
            done() { return player[this.layer].inputNumber.includes('6') },
            image: "achImgs/n-33.png",
            tooltip: "Input a 6 in your number. (This achievement IS in Goime 500)",
            unlocked() { return tmp.n.layerShown },
        },
        34: {
            name: "Ultimate Lucky Number",
            done() { return player[this.layer].inputNumber.includes('7') },
            image: "achImgs/n-34.png",
            tooltip: "Input a 7 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        35: {
            name: "Zero got a belt",
            done() { return player[this.layer].inputNumber.includes('8') },
            image: "achImgs/n-35.png",
            tooltip: "Input <strike>an infinity sign turned 90 degrees</strike> an 8 in your number. (This achievement IS ALSO in Goime 500)",
            unlocked() { return tmp.n.layerShown },
        },
        36: {
            name: "Flip 6 upside down",
            done() { return player[this.layer].inputNumber.includes('9') },
            image: "achImgs/n-36.png",
            tooltip: "Input a 9 in your number.",
            unlocked() { return tmp.n.layerShown },
        },
        41: {
            name: "Answer to life, the universe, and everything",
            done() { return player[this.layer].inputNumber == 42 },
            image: "achImgs/n-41.png",
            tooltip: "Input 42.",
            unlocked() { return tmp.n.layerShown },
        },
        42: {
            name: "3x3x3x3x3x3",
            done() { return player[this.layer].inputNumber == 729 },
            image: "achImgs/n-41.png",
            tooltip: "Answer the title.",
            unlocked() { return tmp.n.layerShown },
        },
        43: {
            name: "Obligatory Nice Number achievement",
            done() { return player[this.layer].inputNumber == 69 },
            image: "achImgs/69.png",
            tooltip: "Input 69. Nice.",
            unlocked() { return tmp.n.layerShown },
        },
        44: {
            name: "Obligatory Weed Number achievement",
            done() { return player[this.layer].inputNumber == 420 },
            image: "achImgs/420.png",
            tooltip: "Input 420. Double Nice.",
            unlocked() { return tmp.n.layerShown },
        },
        45: {
            name: "Obligatory LEET achievement",
            done() { return player[this.layer].inputNumber == 1337 },
            image: "achImgs/1337.png",
            tooltip: "1NPU7 1337.",
            unlocked() { return tmp.n.layerShown },
        },
        46: {
            name: "Nice Weed you got there",
            done() { return player[this.layer].inputNumber == 69420 },
            image: "achImgs/n-46.png",
            tooltip: "Input 69420.",
            unlocked() { return tmp.n.layerShown },
        },
        51: {
            name: "Another Pie reference",
            done() { return player[this.layer].inputNumber == 31415 },
            image: "achImgs/p-33.png",
            tooltip: "Input the first 5 digits of pi.",
            unlocked() { return tmp.n.layerShown },
        },
        52: {
            name: "This is better QoL than Goime 500",
            done() { return player[this.layer].back1done},
            image: "achImgs/n-52.png",
            tooltip: "Use the back buttton.",
            unlocked() { return tmp.n.layerShown },
        },
        53: {
            name: "There's no point in doing that 1",
            done() { return player[this.layer].back2done},
            image: "achImgs/n-53.png",
            tooltip: "Use the back buttton even when the number is empty.",
            unlocked() { return tmp.n.layerShown },
        },
        54: {
            name: "Clearer",
            done() { return player[this.layer].clear1done},
            image: "achImgs/n-54.png",
            tooltip: "Use the clear buttton.",
            unlocked() { return tmp.n.layerShown },
        },
        55: {
            name: "There's no point in doing that 2",
            done() { return player[this.layer].clear2done},
            image: "achImgs/n-53.png",
            tooltip: "Use the clear buttton even when the number is empty.",
            unlocked() { return tmp.n.layerShown },
        },
        56: {
            name: "How many achievements did you get in this layer?",
            done() { return player[this.layer].inputNumber == tmp[this.layer].achsCompleted},
            image: "achImgs/n-41.png",
            tooltip: "Answer the title",
            unlocked() { return tmp.n.layerShown },
        },
        61: {
            name: "How many digits do you have?",
            done() { return player[this.layer].inputNumber == player[this.layer].points},
            image: "achImgs/n-41.png",
            tooltip: "Answer the title",
            unlocked() { return tmp.n.layerShown },
        },
        62: {
            name: "Goime ___",
            done() { return player[this.layer].inputNumber == 500},
            image: "achImgs/n-41.png",
            tooltip: "Fill in the blank to complete the name of a Flash Platformer Game",
            unlocked() { return tmp.n.layerShown },
        },
        63: {
            name: "You wanna see this in a slot machine",
            done() { return player[this.layer].inputNumber == 777},
            image: "achImgs/n-41.png",
            tooltip: "Input 777",
            unlocked() { return tmp.n.layerShown },
        },
    },
    layerShown(){return hasAchievement("g",14)}
})