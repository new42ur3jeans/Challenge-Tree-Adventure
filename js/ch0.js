addLayer("WCm", {
    name: "Webcomic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: () => player.WCm.points, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        currentPage: new Decimal(1),
        chapterNo: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pages", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
    row: "side", // Row the layer is in on the tree (0 is the first row)
    clickables: {
        11: {
            display() {return "Get started on your journey!"},
            canClick() {return (player.WCm.chapterNo.equals(0))},
            unlocked() {return (player.WCm.chapterNo.equals(0))}, 
            onClick() {
                player.WCm.chapterNo = new Decimal(1);
            },
        },
        21: {
            display() {return "<<"},
            canClick() {return ((player.WCm.currentPage.gt(1)))},
            unlocked() {return (player.WCm.chapterNo.gt(0))}, 
            tooltip: "Head to page 1",
            onClick() {
                player.WCm.currentPage = new Decimal(1);
            },
        },
        22: {
            display() {return "<"},
            canClick() {return ((player.WCm.currentPage.gt(1)))},
            unlocked() {return (player.WCm.chapterNo.gt(0))}, 
            onClick() {
                player.WCm.currentPage = player.WCm.currentPage.sub(1);
            },
        },
        23: {
            display() {return ">"},
            canClick() {return ((player.WCm.currentPage.lt(player.WCm.points)))},
            unlocked() {return (player.WCm.chapterNo.gt(0))}, 
            tooltip: "Head to page 1",
            onClick() {
                player.WCm.currentPage = player.WCm.currentPage.add(1);
            },
        },
        24: {
            display() {return ">>"},
            canClick() {return ((player.WCm.currentPage.lt(player.WCm.points)))},
            unlocked() {return (player.WCm.chapterNo.gt(0))}, 
            onClick() {
                player.WCm.currentPage = player.WCm.points
            },
        },
    },
    achievements: {
        11: {
            name: "1",
            done() { return true },
            onComplete() { 
                player.WCm.points = player.WCm.points.add(1);
                player.WCm.currentPage = new Decimal(1)
            },
            doneTooltip: "The first one is always free.",
        },
        12: {
            name: "2",
            done() { return player.WCm.chapterNo.gt(0) },
            onComplete() { 
                player.WCm.points = player.WCm.points.add(1);
                player.WCm.currentPage = new Decimal(2)
            },
            goalTooltip: "Begin your journey.",
            doneTooltip: "A courage to take a step would seldom go unrewarded.",
        },
        13: {
            name: "3",
            done() { return player.plus.points.gte(1) },
            onComplete() { 
                player.WCm.points = player.WCm.points.add(1);
                player.WCm.currentPage = new Decimal(3)
            },
            goalTooltip: "Get your first adder.",
            doneTooltip: "Finally, the number started to go up!!!",
        },
        14: {
            name: "4",
            done() { return player.plus.points.gte(5) },
            onComplete() { 
                player.WCm.points = player.WCm.points.add(1);
                player.WCm.currentPage = new Decimal(4)
            },
            goalTooltip: "Get 5 adders.",
            doneTooltip: "Ok, this is getting too slow for other incremental games' standards.",
        },
        15: {
            name: "5",
            done() { return new Decimal(getBuyableAmount("plus",11)).gte(10) },
            onComplete() { 
                player.WCm.points = player.WCm.points.add(1);
                player.WCm.currentPage = new Decimal(5)
            },
            goalTooltip: "Buy 10 Adder Adder buyables.",
            doneTooltip: "That won't be enough for getting the 6th adder.",
        },
    },
    tabFormat: [
        "blank",
        ["display-text",function() { return '<b>You are reading page ' + player.WCm.currentPage + "</b>"}],
        "blank",
        ["display-image",function() {
                return 'webcomic/Page'+ Number(player.WCm.currentPage) + '.png'   
        },{ 'height': '1500px', 'width': '750px', position: 'relative'}],
        "blank",
        "clickables",
        "blank",
        ["display-text",function() { return '<b>Unlocked Pages</b>' },{"font-size": "32px"}],
        "blank",
        "achievements",
    ],
    layerShown(){return true}
})