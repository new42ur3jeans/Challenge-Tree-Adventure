addLayer("I", {
    name: "Tier 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "tier 1 power", // Name of prestige currency
    baseResource: "Challenge Power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    softcap: function() {
        capstart = new Decimal (100)
        capstart = capstart.times(new Decimal.pow(10, challengeCompletions("II",11)))
        capstart = capstart.times(new Decimal.pow(2,challengeCompletions("III",12))).times(new Decimal(player.III.formpts).add(1))
        return capstart
    },
    softcapPower: function() {return new Decimal (0.25)},
    effectDescription: function() {return "also note that tier 1 power gain is softcapped by ^0.25 after " + new Decimal.pow(10, challengeCompletions("II",11)).times(100).times(new Decimal.pow(2,challengeCompletions("III",12))).times(player.III.formpts.add(1)) + " tier 1 power."},
    passiveGeneration() {
        if (!hasChallenge("II",13))
            return new Decimal(0)
        return new Decimal.pow(10, challengeCompletions("II", 13) - 1).times(0.01)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for Tier 1 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore: {
            title: "Tier 1 Lore",
            body: `<img src="SceneI.png" width="500"><br>
            You:<q>Huh? What is this place?</q><br>
            ???:<q>Oh great, you finally woke up. I thought I have to clean up another corpse again.</q><br>
            You:<q>What's all this corpse cleaning and me being teleported to another world about?</q><br>
            ???:<q>So you did not belong to this world?</q><br>
            You:<q>I was at my home having some sleep after grinding an incremental game and next thing I know, I am here.</q><br>
            ???:<q>I see... Having numbers go up is what we do here as well!</q><br>
            You:<q>Really?</q><br>
            ???:<q>Yes! My name is Chal, and I'm have to do basically every chore in this place...</q><br>
            You:<q>Oh, I'm sorry to hear.</q><br>
            Chal:<q>I can try helping you go back to your world, but before that you need to accumulate a lot of Challenge Power first. Try getting some by clearing these challenges first!`,
        },
    },
    challenges: {
        11: {
            name: "You Gotta Start Somewhere",
            challengeDescription: "This challenge is free to complete; complete it to start generating Challenge Power!",
            canComplete: function() {return true},
            goalDescription: "0 Challenge Power",
            rewardDescription: "Start Generating Challenge Power."
        },
        12: {
            name: "The Second One's Not So Free",
            challengeDescription: "You have to wait until 20 Challenge Power to complete this challenge. Go read the lore to kill some time while you wait!",
            canComplete: function() {return player.points.gte(20)},
            unlocked() {return hasMilestone(this.layer,1)},
            goalDescription: "20 Challenge Power",
            rewardDescription: "Tier 1 power boosts Challenge Power gain.",
            rewardDisplay() {return "x" + format(player.I.points.times(0.1).plus(1)) +" to Challenge Power gain."}
            
        },
        13: {
            name: "Things actually get challenging now",
            challengeDescription: "Production is divided by 10 in this challenge.",
            canComplete: function() {return player.points.gte(1)},
            unlocked() {return hasMilestone(this.layer,2)},
            goalDescription: "1 Challenge Power",
            rewardDescription: "Challenge Power Gain is Multiplied by 10.", 
        },
        14: {
            name: "Square Roots",
            challengeDescription: "Production is square rooted in this challenge.",
            canComplete: function() {return player.points.gte(50)},
            unlocked() {return hasMilestone(this.layer,3)},
            goalDescription: "50 Challenge Power",
            rewardDescription: "Challenge Power Gain is squared, and unlocks Tier 2."
        }
    },
    milestones: {
        1: {
            requirementDescription: "1 Tier 1 Power",
            effectDescription: "Unlock the second Tier 1 Challenge.",
            done() { return player.I.points.gte(1) }
        },
        2: {
            requirementDescription: "5 Tier 1 Power",
            effectDescription: "Unlock the third Tier 1 Challenge.",
            done() { return player.I.points.gte(5) }
        },
        3: {
            requirementDescription: "20 Tier 1 Power",
            effectDescription: "Unlock the fourth and final Tier 1 Challenge.",
            done() { return player.I.points.gte(20) }
        }
    },
    tabFormat: [
        "blank",
        ["infobox", "lore"],
        "main-display",
        "prestige-button",
        "blank",
        "challenges",
        "blank",
        "milestones",
    ],
    doReset(I) {
        if(layers[I].row <= layers[this.layer].row || layers[I].row == "side")return;
        let keep = []
        if(hasMilestone("II",1))keep.push("challenges")
        if(hasMilestone("II",1))keep.push("milestones")
        layerDataReset("I", keep);
      },
    layerShown(){return true}
})
addLayer("II", {
    name: "Tier 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "II", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF7F00",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "tier 2 power", // Name of prestige currency
    baseResource: "tier 1 Power", // Name of resource prestige is based on
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    effect() {
        cpmult = new Decimal (0.5)
        cpmult = cpmult.plus(new Decimal.pow(10, challengeCompletions("II", 14)))
        return cpmult
    },
    effectDescription: function() {return "which boosts Challenge Power Gain by " + player.II.points.times(this.effect()).plus(1) + "x"},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.plus(new Decimal.pow(challengeCompletions("II", 12),2))
        mult = mult.plus(new Decimal.pow(2,challengeCompletions("III",13)).sub(1)).times(new Decimal(player.III.formpts).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        return new Decimal(new Decimal(player.III.points).times(0.01).times(new Decimal.pow(2,challengeCompletions("III",14))).times(new Decimal(player.III.formpts).plus(1)))
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["I"],
    hotkeys: [
        {key: "2", description: "2: Reset for Tier 2 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore: {
            title: "Tier 2 Lore",
            body: `Chal: <q>Excellent Job! This is the only challenges I can give you, but you got a number of Challenge Power from them.</q><br>
            You: <q>Hey, this feels really like an incremental game! It's a little challenge heavy, but numbers still go up.</q><br>
            Chal: <q>OK, follow me to another challenge maker, and you might get enough power to go back home!</q><br>
            ...<br>
            <img src="SceneII.png" width="500"><br>
            Rep: <q>Oi Chal. Never saw that person next to you before.</q><br>
            Chal: <q>Well this person came from another dimension. That would explain...</q><br>
            Rep: <q>Dimensional warp? Are you just making up bullcrap again? The kingdom punishes you to do all the heavy work for a reason...</q><br>
            You: <q>...the first thing I think of when hearing the word 'dimensions' is this incremental game called Antimatter Dimensions...</q><br>
            Rep: <q>...Antimatter Dimensions? We don't have this game here! Now I believe you are from another world. My name's Rep. Been building my body ever since I got to utilize Challenge Power.</q><br>
            You: <q>Lemme guess. You have challenges that I can do to gain challenge power too, am I right?</q><br>
            Rep: <q>Unlike Chal's challenges, mine are repeatable. Think of it as lifting dumbbells! Exercising with these challenges should give you lots of Challenge Power.</q>`,
        },
    },
    challenges: {
        11: {
            name: "Warm Up!",
            completionLimit: 100,
            challengeDescription: function() {return "No nerfs, just finish the challenge! (Hint: make use of Tier 1 Power)<br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player.points.gte(new Decimal.pow(1000, challengeCompletions("II", 11) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return format(new Decimal.pow(1000, challengeCompletions("II", 11) + 1))+" Challenge Power"},
            rewardDescription: function() {return "Softcap to tier 1 power gain is delayed by " + format(new Decimal.pow(10, challengeCompletions("II",11))) +"x."},
            unlocked() {return hasMilestone(this.layer,1)}
        },
        12: {
            name: "The first exercise",
            completionLimit: 100,
            challengeDescription: function() {return "Reward of 'The Second One's Not So Free' is disabled.<br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player.points.gte(new Decimal.pow(1000, challengeCompletions("II", 12) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return format(new Decimal.pow(1000, challengeCompletions("II", 12) + 1))+" Challenge Power"},
            rewardDescription: function() {return "x" + format(new Decimal.pow(challengeCompletions("II", 12),2).plus(1)) +" to Tier 2 Power gain."},
            unlocked() {return hasMilestone(this.layer,2)}
        },
        13: {
            name: "Why are we still doing math tests...",
            completionLimit: 100,
            challengeDescription: function() {return "'The first exercise', and production is raised by ^" + format(0.500 - challengeCompletions("II", 13) * 0.004) + "<br>" +challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player.points.gte(new Decimal.pow(1000, challengeCompletions("II", 13) + 2)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return format(new Decimal.pow(1000, challengeCompletions("II", 13) + 2))+" Challenge Power"},
            rewardDescription: function() {return "Gain " + format(new Decimal.pow(10, challengeCompletions("II", 13) - 1)) +"% of Tier 1 power per second."},
            unlocked() {return hasMilestone(this.layer,3)}
        },
        14: {
            name: "Maybe Tier 2 Power isn't strong enough",
            completionLimit: 100,
            challengeDescription: function() {return "'The first exercise', and production is divided by " + format(new Decimal.pow(1000, challengeCompletions("II", 14) + 1)) + "<br>" +challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player.points.gte(new Decimal.pow(1000, challengeCompletions("II", 14) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return format(new Decimal.pow(1000, challengeCompletions("II", 14) + 1))+" Challenge Power"},
            rewardDescription: function() {return "Tier 2 power is boosted by " + format(new Decimal.pow(10, challengeCompletions("II", 14))) +"x."},
            unlocked() {return hasMilestone(this.layer,4)}
        },
        15: {
            name: "You're almost there",
            completionLimit: 100,
            challengeDescription: function() {return "You are stuck in T1C3-4 AND T2C2-4. (difficulty for Tier 2 challenges you are stuck in is based on this challenge's completions)<br>Complete this challenge 5 times for something cool..." + "<br>" +challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player.points.gte(new Decimal.pow(1000, challengeCompletions("II", 15) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return format(new Decimal.pow(1000, challengeCompletions("II", 15) + 1))+" Challenge Power"},
            rewardDescription: function() {return "Multiply  'The Second One's Not So Free''s effect by " + format(new Decimal.pow(challengeCompletions("II", 15), 2).plus(1)) +"x."},
            unlocked() {return hasMilestone(this.layer,5)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "5 Tier 2 Power",
            effectDescription: "Keep Tier 1 challenge completions and milestones, and unlock the first Tier 2 Challenge.",
            done() { return player.II.points.gte(5) }
        },
        2: {
            requirementDescription: "5 'Warm Up!' Completions",
            effectDescription: "Unlock the Second Tier 2 Challenge.",
            done() {return challengeCompletions("II", 11) >= 5}
        },
        3: {
            requirementDescription: "5 'The first exercise' Completions",
            effectDescription: "Unlock the Third Tier 2 Challenge.",
            done() {return challengeCompletions("II", 12) >= 5}
        },       
        4: {
            requirementDescription: "5 'Why are we still doing math tests...' Completions",
            effectDescription: "Unlock the Fourth Tier 2 Challenge.",
            done() {return challengeCompletions("II", 13) >= 5}
        },
        5: {
            requirementDescription: "5 'Maybe Tier 2 Power isn't strong enough' Completions",
            effectDescription: "Unlock the Fifth and final Tier 2 Challenge.",
            done() {return challengeCompletions("II", 14) >= 5}
        },
        
    },
    tabFormat: [
        "blank",
        ["infobox", "lore"],
        "main-display",
        "prestige-button",
        "blank",
        "challenges",
        "blank",
        "milestones",
    ],
    doReset(II) {
        if(layers[II].row <= layers[this.layer].row || layers[II].row == "side")return;
        layerDataReset("II", ["challenges","milestones"]);
      },
    layerShown(){return hasChallenge("I",14)}
})

addLayer("III", {
    name: "Tier 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "III", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        formpts: new Decimal(0),
        formA: 0,
        formB: 0,
        formC: 0,
    }},
    color: "#0099FF",
    requires: new Decimal.pow(10, 30), // Can be a function that takes requirement increases into account
    resource: "tier 3 power", // Name of prestige currency
    baseResource: "tier 2 power", // Name of resource prestige is based on
    baseAmount() {return player.II.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    effectDescription: function() {return "which increases the caps of your equation's variables by " + format(player.III.points) + " (hardcapped at 500) and gives " + format(player.III.points) + "% of tier 2 power on prestige per sec."},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        let gain = new Decimal(0)
        if (player[this.layer].formA >= 1 && player[this.layer].formB >= 1 &&player[this.layer].formC >= 1) {
            gain = new Decimal.pow(new Decimal(player[this.layer].formB).times(player[this.layer].formC), new Decimal(player[this.layer].formA).div(new Decimal (5))) // put how much you gain per second here
        }
        if (inChallenge("III",12)&&((new Decimal(player[this.layer].formA).sub(player[this.layer].formB).sub(player[this.layer].formC)).lt(0))) {
            gain = new Decimal(0)
        }
        if (inChallenge("III",13)&&((new Decimal(player[this.layer].formA).div(player[this.layer].formB).sub(player[this.layer].formC)).lt(0))) {
            gain = new Decimal(0)
        }
        if (inChallenge("III",14)&&((new Decimal.pow(player[this.layer].formB,2).sub(new Decimal(player[this.layer].formA).times(player[this.layer].formC).times(4)).lt(0)))) {
            gain = new Decimal(0)
        }
        player[this.layer].formpts = player[this.layer].formpts.add(gain.times(diff));
      },
    maxFormulaValue() {
        return [11, 12, 13, 14].map(id => challengeCompletions('III', id)).reduce((a,b) => a+b, player.III.points.min(500).toNumber());
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["II"],
    hotkeys: [
        {key: "3", description: "3: Reset for Tier 3 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore: {
            title: "Tier 3 Lore",
            body: `Rep: <q>This should be enough training. I think you can see the next challenge maker for more help! If you're stuck there, feel free to come back and train again!</q><br>
            ...<br>
            <img src="SceneIII.png" width="500"><br>
            You: <q>So... who are we seeing next?</q><br>
            Chal: <q>A mathematician!</q><br>
            You: <q>M-M-MATH!?</q><br>
            Chal: <q>Come on! Math is just a game! I thought people who watch numbers go up always feel this way.</q><br>
            ...<br>
            Form: <q>You're lucky you visited just after my last math tutorial for today... Anyways, what do you want me for?</q><br>
            Chal: <q>Well this person here would like some challenges. Can you give him some?</q><br>
            Form: <q>Hm... not a lot of people ask me for challenges recently. It would be fun to remember how that feels like again...</q><br>
            You: <q>I really, REALLY don't like where this is going.</q><br>
            Form: <q>Don't worry, I won't make this boring! Come on, let me show you the kind of challenges I do!</q><br>`,
        },
    },

    challenges: {
        11: {
            name: "The first one is the easiest again",
            completionLimit: 100,
            challengeDescription: function() {return "Only resets f(t) value, without affecting f(t) production. <br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player[this.layer].formpts.gte(new Decimal.pow(1000, challengeCompletions("III", 11) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return "f(t) >= " +  format(new Decimal.pow(1000, challengeCompletions("III", 11) + 1))},
            rewardDescription: function() {return "Adds 1 to the a, b and c limit per completion, AND f(t) boosts Challenge Power gain by " + format((new Decimal.pow(2,challengeCompletions("III",11)).sub(1)).times(player[this.layer].formpts.add(1))) +"x."},
            onEnter() {player[this.layer].formpts = new Decimal(0)},
            unlocked() {return true}
        },
        12: {
            name: "As simple as Subtraction",
            completionLimit: 100,
            challengeDescription: function() {return "Resets f(t) value, and f(t) only increases when (a-b-c)>=0. <br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player[this.layer].formpts.gte(new Decimal.pow(1000, challengeCompletions("III", 12) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return "f(t) >= " +  format(new Decimal.pow(1000, challengeCompletions("III", 12) + 1))},
            rewardDescription: function() {return "Adds 1 to the a, b and c limit per completion, AND f(t) delays Tier 1 Power softcap by " + format((new Decimal.pow(2,challengeCompletions("III",12)).sub(1)).times(player[this.layer].formpts.plus(1))) +"x."},
            onEnter() {player[this.layer].formpts = new Decimal(0)},
            unlocked() {return hasMilestone(this.layer,1)}
        },
        13: {
            name: "As medium as Division",
            completionLimit: 100,
            challengeDescription: function() {return "Resets f(t) value, and f(t) only increases when (a/b-c)>=0. <br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player[this.layer].formpts.gte(new Decimal.pow(1000, challengeCompletions("III", 13) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return "f(t) >= " +  format(new Decimal.pow(1000, challengeCompletions("III", 13) + 1))},
            rewardDescription: function() {return "Adds 1 to the a, b and c limit per completion, AND f(t) multiplies Tier 2 Power gain by " + format((new Decimal.pow(2,challengeCompletions("III",13)).sub(1)).times(player[this.layer].formpts.plus(1))) +"x."},
            onEnter() {
                player[this.layer].formpts = new Decimal(0)
                if (player[this.layer].formB == 0){
                    player[this.layer].formB = 1
                }
            },
            unlocked() {return hasMilestone(this.layer,2)}
        },
        14: {
            name: "The Awaited Quadratic Reference",
            completionLimit: 100,
            challengeDescription: function() {return "Resets f(t) value, and f(t) only increases when (b<sup>2</sup>-4ac)>=0. <br>"+challengeCompletions(this.layer, this.id)
            + "/" + this.completionLimit + " completions"},
            canComplete: function() {return player[this.layer].formpts.gte(new Decimal.pow(1000, challengeCompletions("III", 14) + 1)) },//always does 1 at a time, check if points > req},
            goalDescription: function() {return "f(t) >= " +  format(new Decimal.pow(1000, challengeCompletions("III", 14) + 1))},
            rewardDescription: function() {return "Adds 1 to the a, b and c limit per completion, AND f(t) gives an extra " + format((new Decimal.pow(2,challengeCompletions("III",14)).sub(1)).times(player[this.layer].formpts.plus(1))) +"% of tier 2 power gain per sec."},
            onEnter() {player[this.layer].formpts = new Decimal(0)},
            unlocked() {return hasMilestone(this.layer,3)}
        },
    },

    milestones: {
        1: {
            requirementDescription: "A 'The first one is the easiest again' Completion",
            effectDescription: "Unlock the Second Tier 3 Challenge.",
            done() {return challengeCompletions("III", 11) >= 1}
        },
        2: {
            requirementDescription: "An 'As simple as Subtraction' Completion",
            effectDescription: "Unlock the Third Tier 3 Challenge.",
            done() {return challengeCompletions("III", 12) >= 1}
        },       
        3: {
            requirementDescription: "An 'As medium as Division' Completion",
            effectDescription: "Unlock the Fourth and final(?) Tier 3 Challenge.",
            done() {return challengeCompletions("III", 13) >= 1}
        },      
    },

    bars: {
        a: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return new Decimal(player[this.layer].formA).div(tmp.III.maxFormulaValue)
            },
            display() {
                return "a: " +  format(new Decimal(player[this.layer].formA)) + "/" + format(tmp.III.maxFormulaValue);
            },
            baseStyle: {
                "background-color": "#777777"
            },
            fillStyle: {
                "background-color": "#FF0000"
            },
            textStyle: {
                "color": "#000000"
            }
        },
        b: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return new Decimal(player[this.layer].formB).div(tmp.III.maxFormulaValue)
            },
            display() {
                return "b: " + format(player[this.layer].formB) + "/" + format(tmp.III.maxFormulaValue)
            },
            baseStyle: {
                "background-color": "#777777"
            },
            fillStyle: {
                "background-color": "#00FF00"
            },
            textStyle: {
                "color": "#000000"
            }
        },
        c: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return new Decimal(player[this.layer].formC).div(tmp.III.maxFormulaValue)
            },
            display() {
                return "c: " + format(player[this.layer].formC) + "/" + format(tmp.III.maxFormulaValue)
            },
            baseStyle: {
                "background-color": "#777777"
            },
            fillStyle: {
                "background-color": "#00FFFF"
            },
            textStyle: {
                "color": "#000000"
            }
        }
    },
    clickables: {
        rows: 3,
        cols: 5,
        11: {
            display() {
                return "<h1><b>0</b></h1>"
            },
            canClick() {
                return player[this.layer].formA > 0
            },
            onClick(){
                player[this.layer].formA = 0
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        12: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            canClick() {
                return player[this.layer].formA > 0
            },
            onClick(){
                player[this.layer].formA = Math.ceil(player[this.layer].formA / 2)
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        13: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].formA > 0
            },
            onClick(){
                player[this.layer].formA = player[this.layer].formA - 1
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        14: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return player[this.layer].formA < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formA = player[this.layer].formA + 1
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        15: {
            display() {
                return "<h1><b>MAX</b></h1>"
            },
            canClick() {
                return player[this.layer].formA < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formA = tmp.III.maxFormulaValue
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        21: {
            display() {
                return "<h1><b>0</b></h1>"
            },
            canClick() {
                return (player[this.layer].formB > 0 && !inChallenge("III", 13))
            },
            onClick(){
                player[this.layer].formB = 0
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        22: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            canClick() {
                return player[this.layer].formB > 0
            },
            onClick(){
                player[this.layer].formB = Math.ceil(player[this.layer].formB / 2)
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        23: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].formB > 0
            },
            onClick(){
                if (inChallenge("III",13) &&(player[this.layer].formB == 1)) {
                    player[this.layer].formB = 1
                } else {
                    player[this.layer].formB = player[this.layer].formB - 1
                }
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        24: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return player[this.layer].formB < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formB = player[this.layer].formB + 1
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        25: {
            display() {
                return "<h1><b>MAX</b></h1>"
            },
            canClick() {
                return player[this.layer].formB < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formB = tmp.III.maxFormulaValue
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        31: {
            display() {
                return "<h1><b>0</b></h1>"
            },
            canClick() {
                return player[this.layer].formC > 0
            },
            onClick(){
                player[this.layer].formC = 0
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        32: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            canClick() {
                return player[this.layer].formC > 0
            },
            onClick(){
                player[this.layer].formC = Math.ceil(player[this.layer].formC / 2)
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        33: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].formC > 0
            },
            onClick(){
                player[this.layer].formC = player[this.layer].formC - 1
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        34: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return player[this.layer].formC < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formC = player[this.layer].formC + 1
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
        35: {
            display() {
                return "<h1><b>MAX</b></h1>"
            },
            canClick() {
                return player[this.layer].formC < tmp.III.maxFormulaValue
            },
            onClick(){
                player[this.layer].formC = tmp.III.maxFormulaValue
            },
            style: {
                "width": "50px",
                "height": "5px"
            }
        },
    },

    tabFormat: [
        "blank",
        ["infobox", "lore"],
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() { return 'This part is brought to you by Algebraic Progression by randomtuba <br> f(t+1) = f(t) + (bc)^(a/5) <br> NOTE: a, b and c must ALL be 1 or above for f(t) to increment. <br>Current variable cap: ' + tmp.III.maxFormulaValue},
            { "color": "white", "font-size": "16px" }],
        "blank",
        ["row", [["clickable", 11], "blank", ["clickable", 12], "blank", ["clickable", 13], "blank", ["bar", "a"], "blank", ["clickable", 14], "blank", ["clickable", 15]]],
        "blank",
        ["row", [["clickable", 21], "blank", ["clickable", 22], "blank", ["clickable", 23], "blank", ["bar", "b"], "blank",["clickable", 24], "blank", ["clickable", 25]]],
        "blank",
        ["row", [["clickable", 31], "blank", ["clickable", 32], "blank", ["clickable", 33], "blank", ["bar", "c"], "blank", ["clickable", 34], "blank", ["clickable", 35]]],
        "blank",
        ["display-text",
            function() { return 'Your current f(t) = ' + format(player.III.formpts) + "<br>f(t) gain per sec: " + format(new Decimal.pow(new Decimal(player[this.layer].formB).times(player[this.layer].formC), new Decimal(player[this.layer].formA).div(new Decimal (5))))},
            { "color": "white", "font-size": "16px" }],
        "blank",
        ["display-text",
        function() { 
        if(inChallenge("III",12)) {
            return "The challenge's formula sums to " + format(new Decimal(player[this.layer].formA).sub(player[this.layer].formB).sub(player[this.layer].formC))
        }
        if(inChallenge("III",13)) {
            return "The challenge's formula sums to " + format(new Decimal(player[this.layer].formA).div(player[this.layer].formB).sub(player[this.layer].formC))
        }
        if(inChallenge("III",14)) {
            return "The challenge's formula sums to " + format(new Decimal.pow(player[this.layer].formB,2).sub(new Decimal(player[this.layer].formA).times(player[this.layer].formC).times(4)))
        }
        },
        { "color": "white", "font-size": "16px" }],
        "blank",
        "challenges",
        "blank",
        "milestones",
    ],
    layerShown(){return challengeCompletions("II",15) >= 5}
})