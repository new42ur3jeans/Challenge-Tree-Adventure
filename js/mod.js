let modInfo = {
	name: "Incremental Kingdom: TMTxWebcomic",
	id: "ikwebcomic",
	author: "the42ur3genes",
	pointsName: "points",
	modFiles: ["ch0.js", "ch1.js", "tree.js"],

	discordName: "The42ur3Genes (His server DOES NOT talk about his incremental games)",
	discordLink: "https://discord.gg/mec46rhJ",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1",
	name: "Small Testflight",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h2>VERSION NUMBER EXPLANATION: v(Completed Chapters).(Completed Layers).(Update number relative to Completed Layers)</h2> <br>
	<br>
	<h3>v0.0.1 (Small Testflight)</h3><br>
	<br>
		- Added 1 Chapter.<br>
		- Added 3 webcomic pages.<br>
		- Added the Addition Layer and Adder.<br>
		- Why are you playing this`

let winText = `Congratulations! Contact 42UR3 telling him you reached the endgame and hopefully his ADHD ass would finally update this for more content lol`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.WCm.chapterNo >= 1
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()){
		return new Decimal(0)
	}
	else if (player.WCm.chapterNo.equals(new Decimal(1))){
	let gain = tmp.plus.effect
	return gain
	}
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
		if ((player.WCm.chapterNo.equals(new Decimal(0)))){
			return "Chapter 0: The Prologue"
		}
		if ((player.WCm.chapterNo.equals(new Decimal(1)))){
			return "Chapter 1: The Land of the Operators"
		}
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = function(){
	if (player.WCm.chapterNo.equals(0)) return {"background-image": "linear-gradient(rgb(0,100,100), rgb(0,80,170))"}
	if (player.WCm.chapterNo.equals(1)) return {"background-image": "linear-gradient(rgb(0,100,100), rgb(0,170,0))"}
}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}