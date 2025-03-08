export default class Character {
	name = "";
	race = { name: "" };
	pastLife;
	archetype;
	weaponsTraining = [];
	userInputs;
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
	magic = {
		level: 0,
		schoolPoints: 0,
		water: 0,
		aether: 0,
		fire: 0,
		earth: 0,
		air: 0,
		spells: {
			totalKnown: 0,
			totalPracticed: 0,
			known: [],
			practiced: []
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
	inventory = [];
	freeActions = 1;
	actionChain = 1;
	actionDice = 0;

	constructor(character) {
		Object.entries(this).forEach(([key,value]) => {
			// console.log(this[key],character[key]);
			this[key] = character[key];
		});
		// TODO set prototype of special types;
		// this.boons.combat[0] = Object.setPrototypeOf(this.boons.combat[0], Boon.prototype);
	}

	// handlers
	nameHandler(v) { if (v !== undefined) this.name = v; return this.name };
	raceHandler(v) { if (v !== undefined) this.race.name = v; return this.race.name };
	levelHandler(v) { if (v !== undefined) this.level = v; return this.level };
	hpHandler(v) { if (v !== undefined) this.health.current = v; return this.health.current };
	hpMaxHandler(v) { if (v !== undefined) this.health.max = v; return this.health.max };
	epHandler(v) { if (v !== undefined) this.energy.current = v; return this.energy.current };
	epMaxHandler(v) { if (v !== undefined) this.energy.max = v; return this.energy.max };
	mpHandler(v) { if (v !== undefined) this.mana.current = v; return this.mana.current };
	mpMaxHandler(v) { if (v !== undefined) this.mana.max = v; return this.mana.max };
	luckHandler(v) { if (v !== undefined) this.luck = v; return this.luck };
	physiqueHandler(v) { if (v !== undefined) this.attributes.physique.raw = v; return this.attributes.physique.raw };
	intimidationHandler(v) { if (v !== undefined) this.attributes.physique.intimidation = v; return this.attributes.physique.intimidation; };
	strengthHandler(v) { if (v !== undefined) this.attributes.physique.strength = v; return this.attributes.physique.strength; };
	precisionHandler(v) { if (v !== undefined) this.attributes.precision.raw = v; return this.attributes.precision.raw; };
	pickpocketHandler(v) { if (v !== undefined) this.attributes.precision.pickpocket = v; return this.attributes.precision.pickpocket; };
	hideHandler(v) { if (v !== undefined) this.attributes.precision.hide = v; return this.attributes.precision.hide; };
	intuitionHandler(v) { if (v !== undefined) this.attributes.intuition.raw = v; return this.attributes.intuition.raw; };
	blendHandler(v) { if (v !== undefined) this.attributes.intuition.blend = v; return this.attributes.intuition.blend; };
	diplomacyHandler(v) { if (v !== undefined) this.attributes.intuition.diplomacy = v; return this.attributes.intuition.diplomacy; };
	smartsHandler(v) { if (v !== undefined) this.attributes.smarts.raw = v; return this.attributes.smarts.raw; };
	focusHandler(v) { if (v !== undefined) this.attributes.smarts.focus = v; return this.attributes.smarts.focus; };
	educationHandler(v) { if (v !== undefined) this.attributes.smarts.education = v; return this.attributes.smarts.education; };
	witHandler(v) { if (v !== undefined) this.attributes.wit.raw = v; return this.attributes.wit.raw; };
	businessHandler(v) { if (v !== undefined) this.attributes.wit.business = v; return this.attributes.wit.business; };
	bluffHandler(v) { if (v !== undefined) this.attributes.wit.bluff = v; return this.attributes.wit.bluff; };
	soulHandler(v) { if (v !== undefined) this.attributes.soul.raw = v; return this.attributes.soul.raw; };
	readPersonHandler(v) { if (v !== undefined) this.attributes.soul.readPerson = v; return this.attributes.soul.readPerson; };
	alchemyHandler(v) { if (v !== undefined) this.attributes.soul.alchemy = v; return this.attributes.soul.alchemy; };
	weaponsTrainingHandler(v) { if (v !== undefined) this.weaponsTraining = v; return this.weaponsTraining; };
	combatBoonsHandler(v) { if (v !== undefined) this.boons.combat = v; return this.boons.combat; };
	socialBoonsHandler(v) { if (v !== undefined) this.boons.social = v; return this.boons.social; };
	explorationBoonsHandler(v) { if (v !== undefined) this.boons.exploration = v; return this.boons.exploration; };
	specializationsHandler(v) { if (v !== undefined) this.specializations = v; return this.specializations; };
	freeActionsHandler(v) { if (v !== undefined) this.freeActions = v; return this.freeActions; };
	actionChainHandler(v) { if (v !== undefined) this.actionChain = v; return this.actionChain; };
	actionDiceHandler(v) { if (v !== undefined) this.actionDice = v; return this.actionDice; };
	appearanceHandler(v) { if (v !== undefined) this.lore.appearance = v; return this.lore.appearance; };
	socialCircleHandler(v) { if (v !== undefined) this.lore.socialCircle = v; return this.lore.socialCircle; };
	regionalKnowledgeHandler(v) { if (v !== undefined) this.lore.regionalKnowledge = v; return this.lore.regionalKnowledge; };
	callHandler(v) { if (v !== undefined) this.lore.call = v; return this.lore.call; };
	quirksHandler(v) { if (v !== undefined) this.lore.quirks = v; return this.lore.quirks; };
	religionHandler(v) { if (v !== undefined) this.lore.religion = v; return this.lore.religion; };
	oathHandler(v) { if (v !== undefined) this.lore.oath = v; return this.lore.oath; };
	politicsHandler(v) { if (v !== undefined) this.lore.politics = v; return this.lore.politics; };
	organizationsHandler(v) { if (v !== undefined) this.lore.organizations = v; return this.lore.organizations; };
	backstoryHandler(v) { if (v !== undefined) this.lore.backstory = v; return this.lore.backstory; };
	inventoryHandler(v) { if (v !== undefined) this.inventory = v; return this.inventory; };
	notesHandler(v) { if (v !== undefined) this.lore.notes = v; return this.lore.notes; };
}