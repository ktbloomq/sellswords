import { Race } from "./races.js";

export default class Character {
	name = "";
	race = new Race;
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
			education: -20
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
	specializations = [];
	level = 1;
	health = {
		current: 10,
		max: 10,
	};
	energy = {
		current: 10,
		max: 10
	};
	mana = {
		current: 10,
		max: 10
	};
	luck = 0;
	freeActions = 1;
	actionChain = 1;
	actionDice = 0;
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
						skills[sKey] = Math.ceil((skills[sKey]+1)/2)
					}
				});
			});
		this.race.applySkillModifiers(this);
	}
}