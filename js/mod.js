let modInfo = {
	name: "Yet another Challenge Tree: Adventure",
	id: "chalmod",
	author: "new42ur3jeans",
	pointsName: "Challenge Power",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Ecolofied_42UR3#4052",
	discordLink: "https://discord.gg/ACfnuRpVSC",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "The Beginning",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- Started Production.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasChallenge("I", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasChallenge("I",12)&&!inChallenge("II",12)&&!inChallenge("II",13)&&!inChallenge("II",14)&&!inChallenge("II",15))
	    gain = gain.times(player.I.points.times(0.1).plus(1)).times(new Decimal.pow(1000, challengeCompletions("II", 15)).plus(1))	
	if(inChallenge("I", 13)||inChallenge("II",15))
		gain = gain.times(0.1)
	if(hasChallenge("I",13))
		gain = gain.times(10)
	if(hasChallenge("I",14))
		gain = gain.pow(2)
	if(inChallenge("I",14)||inChallenge("II",15))
		gain = gain.pow(1/2)
	if(inChallenge("II", 13))
		gain = gain.pow(0.500 - challengeCompletions("II", 13) * 0.004)	
	gain = gain.times(player.II.points.times(tmp.II.effect).plus(1))
	if(inChallenge("II", 14))
		gain = gain.times(new Decimal.pow(0.001, challengeCompletions("II", 14) + 1))
	if(inChallenge("II",15)) {
		gain = gain.pow(0.500 - challengeCompletions("II", 15) * 0.004)	
		gain = gain.times(new Decimal.pow(0.001, challengeCompletions("II", 15) + 1))
	}
	gain = gain.times(new Decimal.pow(2,challengeCompletions("III",11))).times(player.III.formpts.add(1))	
	return gain
	
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Try to catch the NaN bug!"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
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