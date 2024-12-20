export default class Character {
	name;
	race;
	pastLife;
	archetype;
	weaponsTraining = [];
	attributes = {
		physique: {
			raw: -4,
			intimidation: -20,
			strength: -20
		},
		precision: {
			raw: -4,
			pickpocket: -20,
			hide: -20
		},
		intuition: {
			raw: -4,
			blend: -20,
			diplomacy: -20
		},
		smarts: {
			raw: -4,
			focus: -20,
			tinkering: -20
		},
		wit: {
			raw: -4,
			business: -20,
			bluff: -20
		},
		soul: {
			raw: -4,
			readPerson: -20,
			alchemy: -20
		}
	};
	specializations = [];
	boons = {
		combat: [],
		social: [],
		exploration: []
	};
	level;
	health = {
		current: 0,
		max: 0,
	};
	energy = {
		current: 0,
		max: 0
	};
	mana = {
		current: 0,
		max: 0
	};
	freeActions;
	actions;
	actionDice;
	actionDiceType;
	applyAttributeBuy(selections) {
		Object.entries(selections).forEach(([key,val]) => {
			this.attributes[key].raw += val;
		});
	}
	calcSkills() {
			Object.keys(this.attributes).forEach((attrKey) => {
				// console.log(attrKey,attrVal);
				let skills = this.attributes[attrKey];
				Object.keys(skills).slice(1).forEach((sKey) => {
					skills[sKey] = skills.raw * 5;
					if (skills.raw > 0) {
						skills[sKey] = Math.floor(skills[sKey] / 2) + 3
					}
				});
			});
		this.race.applyModifiers(this);
		this.pastLife.applyModifiers(this);
		// TODO: apply boons
	}
}