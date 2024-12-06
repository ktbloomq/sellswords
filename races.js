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
	boons = {
		combat: {},
		social: {},
		exploration: {
			adaptable: "+5 to a skill",
			catsFootfall: "Move at half speed without noise. This does not remove a stealth check if moving through treacherous ground or any obstacles.",
			dimsight: "15 feet of color vision in the dark, as if in low light.",
			wellTraveled: "Spend some time observing your social environment. You can identify if a social situation or environment appears abnormal. You may perform a skill check to identify a potential source of the unrest.",
			unrelentingEndurance: "you do not become exhausted from a full day of mundane labor (or equivalent)."
		}
	};
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
			() => { this.propagateSkills(character.attributes[this.choices.attributeBonus], 3) } // TODO: replace with user bonus
		];
	};
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