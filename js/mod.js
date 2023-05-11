let modInfo = {
	name: "The Goime Tree: Revenge of the Achievements",
	id: "minigame",
	author: "new42ur3jeans",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "42UR3ified_Ecolo#4052",
	discordLink: "https://discord.gg/ACfnuRpVSC",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "New Lore and New Clumsy Mistakes",
}

let changelog = `<h1>Changelog:</h1><br>
	<br>
	<h3>v1.1: New Lore and New Clumsy Mistakes</h3><br>
	- Finally remembered to change the endgame.<br>
	- Achievement N-56 is modified to prevent new players from getting it as a freebie. A new Number Trivia Achievement is also added.<br>
	- A new lore infobox and an achievement to unlock said infobox (in the Beginning layer) is included.
	<br>
	<h3>v1.0: Dice and Numbers</h3><br>
	- INTRODUCED THE DICE AND NUMBER LAYERS, FINAL FREAKING LY.<br>
	- Game now has a total of 138 total achievements.<br>
	<br>
	<h3>v0.2.1: Image Hotfix</h3><br>
	- Fixed the image of Not-So-Rookie Numbers being wrong and Time to use Exponents' image not showing.<br>
	<br>
	<h3>v0.2: The achievements have images now!</h3><br>
	- No content updated. <strike>Sue my lazy butt lol</strike><br>
	- Renamed some of the achievements.<br>
	- All 48 achievements have hand-drawn images now.<br>
	<br>
	<h3>v0.1: Starting From the Basics</h3><br>
		- Added Beginning, Prestige, Boosters and Generators (I promise things will get more creative as this tree goes on).<br>
		- Game has 48 achievements in total for now (not all are expected to be clearable with the current balancing).<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but the achievements still want revenge...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasAchievement("B",13)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasAchievement("B",13)) {
		gain = gain.times(new Decimal(tmp.B.achsCompleted).pow(0.7))
	}
	if (hasAchievement("B",16)) {
		gain = gain.times(new Decimal.log10(player.B.time))
	}
	if (hasAchievement("p",11)) {
		gain = gain.times(new Decimal(tmp.p.achsCompleted).plus(1))
	}
	if (hasAchievement("p",12)) {
		gain = gain.times((new Decimal(player.p.points).plus(1)).pow(0.6))
	}
	gain = gain.times(new Decimal.pow(1.3,player.b2.points))
	gain = gain.times(new Decimal.pow(player.g.gPower.plus(1),tmp.g.effectExp))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Estimated Endgame: Get 'The second piece of lore' "
]

// Determines when the game "ends"
function isEndgame() {
	return (hasAchievement("B",36))
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