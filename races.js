import Boons from "./boons.js";

export class Race {
	modifiers;
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
}

export class Human extends Race {
	static raceChoices = {
		boon1: [
			Boons.adaptable,
			Boons.catsFootfall,
			Boons.dimsight,
			Boons.wellTraveled,
			Boons.unrelentingEndurance
		],
		boon2: [
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
	choices;
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.soul, 5) },
			() => { this.propagateSkills(character.attributes[this.choices.attributeBonus], 3) }
		];
	};
	applyBoons(character) {
		console.log(this.choices);
		Object.entries(this.choices).forEach(([key,value]) => {
			console.log(key,value);
			if(key.startsWith("boon")) {
				const boon = Boons[value];
				console.log(boon);
				character.boons[boon.target].push(value);
			}
		});
	}
}

export class Elf extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.precision, 5) },
			() => { this.propagateSkills(character.attributes.smarts, 5) }
		];
	}
}

export class Dwarf extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.precision, 5) }
		];
	}
}

export class Esborn extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 15) },
		];
	}
}

export class Orc extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.physique, 5) },
			() => { this.propagateSkills(character.attributes.wit, 5) }
		];
	}
}

export class Catfolk extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => { this.propagateSkills(character.attributes.intuition, 5) },
			() => { this.propagateSkills(character.attributes.wit, 5) }
		];
	}
}