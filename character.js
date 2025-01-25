import { Race } from "./races.js";

export default class Character {
	name = "";
	race = new Race;
	pastLife;
	archetype;
	weaponsTraining = [];
	attributes = {
		physique: {
			raw: 0,
			intimidation: -20,
			strength: -20
		},
		precision: {
			raw: 0,
			pickpocket: -20,
			hide: -20
		},
		intuition: {
			raw: 0,
			blend: -20,
			diplomacy: -20
		},
		smarts: {
			raw: 0,
			focus: -20,
			education: -20
		},
		wit: {
			raw: 0,
			business: -20,
			bluff: -20
		},
		soul: {
			raw: 0,
			readPerson: -20,
			alchemy: -20
		}
	};
	specializations = [];
	boons = {
		combat: [],
		social: [],
		exploration: [],
		hidden: []
	};
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
	lore = {
		appearance: "",
		socialCircle: "",
		regionalKnowledge: "",
		call: "",
		quirks: "",
		religion: "",
		oath: "",
		politics: "",
		organizations: "",
		backstory: "",
		notes: ""
	}
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