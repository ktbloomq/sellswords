import Boons from "./boons.js";

export class Archetype {
	choices = [];
	applyBonuses(character) {
		// console.log(this.choices);
		this.choices.forEach((value) => {
			const boon = Boons[value];
			// console.log(key,value);
			character.boons[boon.category].push(boon);
		});
	};
}

export class Warrior extends Archetype {
	static archetypeLevelChoices = {
		level1: [
			Boons.healthBoost,
			Boons.advancedWeapon
		]
	}
}

export class Scholar extends Archetype {
	static archetypeLevelChoices = {
		level1: [
			Boons.intimidation,
			Boons.strength,
			Boons.pickpocket,
			Boons.hide,
			Boons.blend,
			Boons.diplomacy,
			Boons.focus,
			Boons.education,
			Boons.business,
			Boons.bluff,
			Boons.readPerson,
			Boons.alchemy,
			Boons.catsFootfall,
			Boons.dimsight,
			Boons.wellTraveled,
			Boons.unrelentingEndurance,
			Boons.hawksight,
			Boons.elvesNaturalEnemy,
			Boons.naturesSong,
			Boons.oneWithNature,
			Boons.sleepless,
			Boons.snowstep,
			Boons.mountainBorn,
			Boons.craftsmen,
			Boons.drunkenFist,
			Boons.fortitudeOfStone,
			Boons.dwarvesNaturalEnemy,
			Boons.eyeForDetail,
			Boons.cultured,
			Boons.livingStone,
			Boons.elderSight,
			Boons.giantsStrength,
			Boons.divineHeritage,
			Boons.ancestralMemory,
			Boons.inciteTerror,
			Boons.bredForWar,
			Boons.loyalCompanion,
			Boons.naturalLeader,
			Boons.nightvision,
			Boons.felineFootfall,
			Boons.justACat,
			Boons.lightningReflexes,
			Boons.skittish
		]
	}
}

export class Mage extends Archetype {
	static archetypeLevelChoices = {
		level1: [
			Boons.water,
			Boons.aether,
			Boons.fire,
			Boons.earth,
			Boons.air,
		]
	}
}