export class Race {
	modifiers;
	boons = {
		combat: {},
		social: {},
		exploration: {}
	};
	static raceChoices = {};
	boonCount = 0;
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
	boonCount = 1;
	static raceChoices = {
		boon1: [
			{index:"exploration.adaptable",name:"Adaptable"},
			{index:"exploration.catsFootfall",name:"Cat's Footfall"},
			{index:"exploration.dimsight",name:"Dimsight"},
			{index:"exploration.wellTraveled",name:"Well Traveled"},
			{index:"exploration.unrelentingEndurance",name:"Unrelenting Endurance"},
		],
		boon2: [
			{index:"exploration.adaptable",name:"Adaptable"},
			{index:"exploration.catsFootfall",name:"Cat's Footfall"},
			{index:"exploration.dimsight",name:"Dimsight"},
			{index:"exploration.wellTraveled",name:"Well Traveled"},
			{index:"exploration.unrelentingEndurance",name:"Unrelenting Endurance"},
		],
		attributeBonus: [
			{index:"physique",name:"physique"},
			{index:"precision",name:"precision"},
			{index:"intuition",name:"intuition"},
			{index:"smarts",name:"smarts"},
			{index:"wit",name:"wit"},
			{index:"soul",name:"soul"},
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
		Object.entries(this.choices).reduce((a,[key,val]) => {
			if(key.startsWith("boon")) a.push(val);
			return a;
		},[]).forEach((e) => {
			const steps = e.split(".");
			character.boons[steps[0]].push(steps[1]);
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