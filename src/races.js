import Boons from "./boons.js";

export class Race {
	name = "";
	modifiers;
	choices = {};
	static raceChoices = {};
	applyModifiers(character) {
		this.setModifiers(character);
		this.modifiers.forEach((e) => {
			e();
		});
	};
	applySkillModifiers(character) {
		this.setSkillModifiers(character);
		this.skillModifiers.forEach((e) => {
			e();
		});
	}
	propagateSkills(attribute, value) {
		Object.keys(attribute).slice(1).forEach((key) => {
			attribute[key] += value;
		});
	};
	addBoons(character) {
		Object.entries(this.choices).forEach(([key,value]) => {
			if (key.startsWith("boon")) {
				const boon = Boons[value];
				character.boons[boon.category].push(boon);
			}
		});
	};
}

export class Human extends Race {
	name = "Human";
	static raceChoices = {
		boon1: [
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
			Boons.unrelentingEndurance
		],
		attributeBonus: [
			{ id: "physique", displayName: "physique" },
			{ id: "precision", displayName: "precision" },
			{ id: "intuition", displayName: "intuition" },
			{ id: "smarts", displayName: "smarts" },
			{ id: "wit", displayName: "wit" },
			{ id: "soul", displayName: "soul" },
		]
	};
	setModifiers(character) {
		this.modifiers = [
			() => { character.attributes.physique.raw += 5 },
			() => { character.attributes.soul.raw += 5 },
			() => { character.attributes[this.choices.attributeBonus].raw += 3 },
		]
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
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
			() => { character.attributes.precision.raw += 5 },
			() => { character.attributes.smarts.raw += 5 }
		];
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
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
			Boons.dwarvenTeamwork,
			// Boons.fortitudeOfStone,
			Boons.dwarvesNaturalEnemy,
			Boons.eyeForDetail,
			Boons.cultured,
			Boons.livingStone
		],
		boon2: [
			Boons.mountainBorn,
			Boons.craftsmen,
			Boons.drunkenFist,
			Boons.dwarvenTeamwork,
			// Boons.fortitudeOfStone,
			Boons.dwarvesNaturalEnemy,
			Boons.eyeForDetail,
			Boons.cultured,
			Boons.livingStone
		]
	}
	setModifiers(character) {
		this.modifiers = [
			() => { character.attributes.physique.raw += 5 },
			() => { character.attributes.precision.raw += 5 }
		];
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
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
			() => { character.attributes.physique.raw += 15 },
		];
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
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
			() => { character.attributes.physique.raw += 5 },
			() => { character.attributes.wit.raw += 5 }
		];
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
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
			() => { character.attributes.intuition.raw += 5 },
			() => { character.attributes.wit.raw += 5 }
		];
	}
	setSkillModifiers(character) {
		this.skillModifiers = [
			() => { this.propagateSkills(character.attributes.intuition, 5) },
			() => { this.propagateSkills(character.attributes.wit, 5) }
		];
	}
}