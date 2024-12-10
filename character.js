export default class Player {
	race;
	pastLife;
	archetype;
	weaponsTraining = [];
	attributes = {
		physique: {
			raw: -4,
			intimidation: -4,
			strength: -4
		},
		precision: {
			raw: -4,
			pickpocket: -4,
			hide: -4
		},
		intuition: {
			raw: -4,
			blend: -4,
			diplomacy: -4
		},
		smarts: {
			raw: -4,
			focus: -4,
			tinkering: -4
		},
		wit: {
			raw: -4,
			business: -4,
			bluff: -4
		},
		soul: {
			raw: -4,
			readPerson: -4,
			alchemy: -4
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