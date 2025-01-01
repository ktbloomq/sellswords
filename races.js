import Boons from "./boons.js";

export class Race {
	name = "";
	modifiers;
	choices;
	static raceChoices = {};
	applyModifiers(character) {
		this.setModifiers(character);
		this.modifiers.forEach((e) => {
			e();
		});
	};
	propagateSkills(attribute, value) {
		Object.keys(attribute).forEach((key) => {
			attribute[key] += value;
		});
	};
	applyBoons(character) {
		// console.log(this.choices);
		Object.entries(this.choices).forEach(([key,value]) => {
			// console.log(key,value);
			if(key.startsWith("boon")) {
				const boon = Boons[value];
				// console.log(boon);
				character.boons[boon.target].push(value);
			}
		});
	};
}

export class Human extends Race {
	name = "Human";
	static raceChoices = {
		boon1: [
			Boons.adaptable,
			Boons.catsFootfall,
			Boons.dimsight,
			Boons.wellTraveled,
			Boons.unrelentingEndurance
		],
		attributeBonus: [
			{id:"physique",displayName:"physique"},
			{id:"precision",displayName:"precision"},
			{id:"intuition",displayName:"intuition"},
			{id:"smarts",displayName:"smarts"},
			{id:"wit",displayName:"wit"},
			{id:"soul",displayName:"soul"},
		]
	};
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.soul, 5) },
			() => { this.propagateSkills(character.attributes[this.choices.attributeBonus], 3) }
		];
	};
}

export class Elf extends Race {
	name = "Elf";
	static raceChoices = {
		boon1: [
			Boons.hawksight,
			Boons.elvesNaturalEnemy,
			Boons.naturesSong,
			Boons.oneWithNature,
			Boons.sleepless,
			Boons.snowstep,
		],
		boon2: [
			Boons.hawksight,
			Boons.elvesNaturalEnemy,
			Boons.naturesSong,
			Boons.oneWithNature,
			Boons.sleepless,
			Boons.snowstep,
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.precision, 5) },
			() => { this.propagateSkills(character.attributes.smarts, 5) }
		];
	}
}

export class Dwarf extends Race {
	name = "Dwarf";
	static raceChoices = {
		boon1: [
			Boons.mountainBorn,
			Boons.craftsmen,
			Boons.drunkenFist,
			Boons.fortitudeOfStone,
			Boons.dwarvesNaturalEnemy,
			Boons.eyeForDetail,
			Boons.cultured,
			Boons.livingStone
		],
		boon2: [
			Boons.mountainBorn,
			Boons.craftsmen,
			Boons.drunkenFist,
			Boons.fortitudeOfStone,
			Boons.dwarvesNaturalEnemy,
			Boons.eyeForDetail,
			Boons.cultured,
			Boons.livingStone
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.precision, 5) }
		];
	}
}

export class Esborn extends Race {
	name = "Esborn";
	static raceChoices = {
		boon1: [
			Boons.elderSight,
			Boons.giantsStrength,
			Boons.fortitudeOfStone,
			Boons.divineHeritage,
			Boons.ancestralMemory
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 15) },
		];
	}
}

export class Orc extends Race {
	name = "Orc";
	static raceChoices = {
		boon1: [
			Boons.mountainBorn,
			Boons.inciteTerror,
			Boons.bredForWar,
			Boons.loyalCompanion,
			Boons.naturalLeader
		],
		boon2: [
			Boons.mountainBorn,
			Boons.inciteTerror,
			Boons.bredForWar,
			Boons.loyalCompanion,
			Boons.naturalLeader
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.wit, 5) }
		];
	}
}

export class Catfolk extends Race {
	name = "Catfolk";
	static raceChoices = {
		boon1: [
			Boons.nightvision,
			Boons.felineFootfall,
			Boons.justACat,
			Boons.lightningReflexes,
			Boons.skittish
		],
		boon2: [
			Boons.nightvision,
			Boons.felineFootfall,
			Boons.justACat,
			Boons.lightningReflexes,
			Boons.skittish
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.intuition, 5) },
			() => { this.propagateSkills(character.attributes.wit, 5) }
		];
	}
}