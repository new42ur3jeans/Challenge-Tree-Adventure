let modInfo = {
	name: "The Scaling Elevator",
	id: "scalevator",
	author: "new42ur3jeans",
	pointsName: "floors",
	modFiles: ["layers.js", "tree.js"],

	discordName: "the42ur3genes",
	discordLink: "https://discord.gg/ACfnuRpVSC",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "The Ride still feels a bit wrong",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>0.2: The Ride still feels a bit wrong </h3><br>
	- Floor 2 is now functional.<br>
	- Reformed the floor progression.<br>
	- v1.0 is when Floor 3 and lore of this game is released.<br>
	<br>
	<h3>0.1: Literally Cyberpunk 2077 </h3><br>
	- Got forced by some people to release a playable beta<br>
	- Added functioning floor 1 buyables.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.05)
	gain = gain.times(new Decimal.add(1,tmp.p.effect))
	gain = gain.times(new Decimal.add(getBuyableAmount("b", 21),1).times(new Decimal.times(getBuyableAmount("b", 22),2).max(1)).times(new Decimal.times(getBuyableAmount("b", 31),3).max(1)))
	//scaling
	gain = gain.div(new Decimal.pow(100000, player.points.floor()))
	gain = gain.min(1)
	return gain
	
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"For every floor the elevator's speed is divided by 100000!<br>Also the endgame is 3 floors for now"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("3"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}