import WeaponTypes from "./weaponTypes.js"
import Character from "./character.js"

let character;
let characterElements = {
	name: {},
	race: {},
	hp: {},
	hpMax: {},
	mp: {},
	mpMax: {},
	ep: {},
	epMax: {},
	physique: {},
	intimidation: {},
	strength: {},
	precision: {},
	pickpocket: {},
	hide: {},
	intuition: {},
	blend: {},
	diplomacy: {},
	smarts: {},
	focus: {},
	education: {},
	wit: {},
	business: {},
	bluff: {},
	soul: {},
	readPerson: {},
	alchemy: {},
	weaponsTraining: {},
	combatBoons: {},
	socialBoons: {},
	explorationBoons: {},
	specializations: {},
	freeActions: {},
	actionChain: {},
	actionDice: {},
	appearance: {},
	socialCircle: {},
	regionalKnowledge: {},
	call: {},
	quirks: {},
	religion: {},
	oath: {},
	politics: {},
	organizations: {},
	backstory: {},
	notes: {},
};
let editorModalElement, editorInputElement, editorFormElement, editorAddElement, editorRemoveElement, editorTarget;

function updateElements() {
	Object.entries(characterElements).forEach(([key, value]) => {
		const source = value.source()
		const type = typeof (source);
		if (type === "number" || type === "string") {
			value.target.textContent = source;
		}
	});

	characterElements.weaponsTraining.target.innerHTML = "";
	character.weaponsTraining.forEach(element => {
		const weaponType = WeaponTypes[element] ?? { id: element, displayName: element };
		const newElement = document.createElement("div");
		newElement.textContent = weaponType.displayName;
		characterElements.weaponsTraining.target.appendChild(newElement);

	});

	characterElements.combatBoons.target.innerHTML = "";
	character.boons.combat.forEach(boon => {
		// const boon = Boons[element] ?? {id:element, displayName:element};
		const newElement = document.createElement("div");
		newElement.textContent = boon.displayName;
		characterElements.combatBoons.target.appendChild(newElement);
	});

	characterElements.socialBoons.target.innerHTML = "";
	character.boons.social.forEach(boon => {
		// const boon = Boons[element] ?? {id:element, displayName:element};
		const newElement = document.createElement("div");
		newElement.textContent = boon.displayName;
		characterElements.socialBoons.target.appendChild(newElement);
	});

	characterElements.explorationBoons.target.innerHTML = "";
	character.boons.exploration.forEach(boon => {
		// const boon = Boons[element] ?? {id:element, displayName:element};
		const newElement = document.createElement("div");
		newElement.textContent = boon.displayName;
		characterElements.explorationBoons.target.appendChild(newElement);
	});

	characterElements.specializations.target.innerHTML = "";
	character.specializations.forEach(element => {
		const newElement = document.createElement("div");
		newElement.textContent = element;
		characterElements.specializations.target.appendChild(newElement);
	});
}

function openModal(element) {
	editorInputElement.innerHTML = "";
	const source = element.source();
	const type = typeof (source[0] ?? source);
	if (Array.isArray(source)) {
		document.getElementById("editor-array-controls").style.display = "inline";
		if(type==="object"&&source[0].id) {
			source.forEach((entry, i) => {
				const idInput = document.createElement("input");
				const displayNameInput = document.createElement("input");
				const descriptionInput = document.createElement("textarea");
				idInput.name = i + "-id";
				idInput.value = entry.id;
				displayNameInput.name = i + "-displayName";
				displayNameInput.value = entry.displayName;
				descriptionInput.name = i + "-description";
				descriptionInput.textContent = entry.description;
				editorInputElement.appendChild(idInput);
				editorInputElement.appendChild(displayNameInput);
				editorInputElement.appendChild(descriptionInput);
			});
		}
		else {
			source.forEach((entry, i) => {
				const newInput = document.createElement("input");
				newInput.setAttribute("name", i);
				if (type === "number") newInput.setAttribute("type", "number");
				newInput.value = entry;
				editorInputElement.appendChild(newInput);
			});
		}
	} else {
		document.getElementById("editor-array-controls").style.display = "none";
		const newInput = document.createElement("input");
		newInput.setAttribute("name", 0);
		if (type === "number") newInput.setAttribute("type", "number");
		newInput.value = source;
		editorInputElement.appendChild(newInput);
	}
	editorTarget = element;
	editorModalElement.showModal();
}

function applyChange(event) {
	event.preventDefault();
	const formData = new FormData(editorFormElement);
	let values = Array.from(formData.values());
	const source = editorTarget.source();
	if (Array.isArray(source)) {
		if (typeof (source[0]) === "number") {
			values = values.map((entry) => { return Number(entry) });
		} 
		// if boon
		else if (typeof (source[0]) === "object" && source[0].id) {
			values = source.map((entry,i) => {
				entry.id = values[i*3];
				entry.displayName = values[i*3+1];
				entry.description = values[i*3+2];
				return entry;
			});
		}
	} else {
		if (typeof (source) == "number") {
			values = Number(values[0]);
		} else {
			values = values[0];
		}
	}
	editorTarget.source(values);
	console.log(character);
	updateElements();
	editorModalElement.close();
}

async function saveCharacter(event) {
	const characterString = JSON.stringify(character);
	const response = await fetch(`saveCharacter.php/?name=${character.name}`, {
		method: "POST",
		body: characterString,
	});
	if (response.status === 200) {
		alert("saved");
	} else {
		alert("error: could not save");
	}
}

window.onload = async function () {
	const queryParams = new URLSearchParams(window.location.search);
	const characterParam = queryParams.get("character");
	const nameParam = queryParams.get("name");
	if (characterParam !== null) {
		character = JSON.parse(characterParam);
	} else if (nameParam !== null) {
		const response = await fetch(`getCharacter.php/?name=${nameParam}`);
		character = await response.json();
	} else {
		character = new Character();
	}
	console.log(character);

	Object.keys(characterElements).forEach((key) => {
		characterElements[key].target = document.getElementById(key);
	});

	editorModalElement = document.getElementById("editor");
	editorFormElement = document.getElementById("editor-form");
	editorInputElement = document.getElementById("editor-inputs");
	editorAddElement = document.getElementById("add-entry");
	editorRemoveElement = document.getElementById("remove-entry");

	Object.values(characterElements).forEach((value) => {
		value.target.addEventListener("click", (event) => { openModal(value) });
	});
	document.getElementById("save").addEventListener("click", saveCharacter);

	characterElements.name.source = (v) => { if (v !== undefined) character.name = v; return character.name };
	characterElements.race.source = (v) => { if (v !== undefined) character.race.name = v; return character.race.name };
	characterElements.hp.source = (v) => { if (v !== undefined) character.health.current = v; return character.health.current };
	characterElements.hpMax.source = (v) => { if (v !== undefined) character.health.max = v; return character.health.max };
	characterElements.ep.source = (v) => { if (v !== undefined) character.energy.current = v; return character.energy.current };
	characterElements.epMax.source = (v) => { if (v !== undefined) character.energy.max = v; return character.energy.max };
	characterElements.mp.source = (v) => { if (v !== undefined) character.mana.current = v; return character.mana.current };
	characterElements.mpMax.source = (v) => { if (v !== undefined) character.mana.max = v; return character.mana.max };
	characterElements.physique.source = (v) => { if (v !== undefined) character.attributes.physique.raw = v; return character.attributes.physique.raw };
	characterElements.intimidation.source = (v) => { if (v !== undefined) character.attributes.physique.intimidation = v; return character.attributes.physique.intimidation; };
	characterElements.strength.source = (v) => { if (v !== undefined) character.attributes.physique.strength = v; return character.attributes.physique.strength; };
	characterElements.precision.source = (v) => { if (v !== undefined) character.attributes.precision.raw = v; return character.attributes.precision.raw; };
	characterElements.pickpocket.source = (v) => { if (v !== undefined) character.attributes.precision.pickpocket = v; return character.attributes.precision.pickpocket; };
	characterElements.hide.source = (v) => { if (v !== undefined) character.attributes.precision.hide = v; return character.attributes.precision.hide; };
	characterElements.intuition.source = (v) => { if (v !== undefined) character.attributes.intuition.raw = v; return character.attributes.intuition.raw; };
	characterElements.blend.source = (v) => { if (v !== undefined) character.attributes.intuition.blend = v; return character.attributes.intuition.blend; };
	characterElements.diplomacy.source = (v) => { if (v !== undefined) character.attributes.intuition.diplomacy = v; return character.attributes.intuition.diplomacy; };
	characterElements.smarts.source = (v) => { if (v !== undefined) character.attributes.smarts.raw = v; return character.attributes.smarts.raw; };
	characterElements.focus.source = (v) => { if (v !== undefined) character.attributes.smarts.focus = v; return character.attributes.smarts.focus; };
	characterElements.education.source = (v) => { if (v !== undefined) character.attributes.smarts.education = v; return character.attributes.smarts.education; };
	characterElements.wit.source = (v) => { if (v !== undefined) character.attributes.wit.raw = v; return character.attributes.wit.raw; };
	characterElements.business.source = (v) => { if (v !== undefined) character.attributes.wit.business = v; return character.attributes.wit.business; };
	characterElements.bluff.source = (v) => { if (v !== undefined) character.attributes.wit.bluff = v; return character.attributes.wit.bluff; };
	characterElements.soul.source = (v) => { if (v !== undefined) character.attributes.soul.raw = v; return character.attributes.soul.raw; };
	characterElements.readPerson.source = (v) => { if (v !== undefined) character.attributes.soul.readPerson = v; return character.attributes.soul.readPerson; };
	characterElements.alchemy.source = (v) => { if (v !== undefined) character.attributes.soul.alchemy = v; return character.attributes.soul.alchemy; };
	characterElements.weaponsTraining.source = (v) => { if (v !== undefined) character.weaponsTraining = v; return character.weaponsTraining; };
	characterElements.combatBoons.source = (v) => { if (v !== undefined) character.boons.combat = v; return character.boons.combat; };
	characterElements.socialBoons.source = (v) => { if (v !== undefined) character.boons.social = v; return character.boons.social; };
	characterElements.explorationBoons.source = (v) => { if (v !== undefined) character.boons.exploration = v; return character.boons.exploration; };
	characterElements.specializations.source = (v) => { if (v !== undefined) character.specializations = v; return character.specializations; };
	characterElements.freeActions.source = (v) => { if (v !== undefined) character.freeActions = v; return character.freeActions; };
	characterElements.actionChain.source = (v) => { if (v !== undefined) character.actionChain = v; return character.actionChain; };
	characterElements.actionDice.source = (v) => { if (v !== undefined) character.actionDice = v; return character.actionDice; };
	characterElements.appearance.source = (v) => { if (v !== undefined) character.lore.appearance = v; return character.lore.appearance; };
	characterElements.socialCircle.source = (v) => { if (v !== undefined) character.lore.socialCircle = v; return character.lore.socialCircle; };
	characterElements.regionalKnowledge.source = (v) => { if (v !== undefined) character.lore.regionalKnowledge = v; return character.lore.regionalKnowledge; };
	characterElements.call.source = (v) => { if (v !== undefined) character.lore.call = v; return character.lore.call; };
	characterElements.quirks.source = (v) => { if (v !== undefined) character.lore.quirks = v; return character.lore.quirks; };
	characterElements.religion.source = (v) => { if (v !== undefined) character.lore.religion = v; return character.lore.religion; };
	characterElements.oath.source = (v) => { if (v !== undefined) character.lore.oath = v; return character.lore.oath; };
	characterElements.politics.source = (v) => { if (v !== undefined) character.lore.politics = v; return character.lore.politics; };
	characterElements.organizations.source = (v) => { if (v !== undefined) character.lore.organizations = v; return character.lore.organizations; };
	characterElements.backstory.source = (v) => { if (v !== undefined) character.lore.backstory = v; return character.lore.backstory; };
	characterElements.notes.source = (v) => { if (v !== undefined) character.lore.notes = v; return character.lore.notes; };


	updateElements();

	editorFormElement.addEventListener("submit", applyChange);
	editorAddElement.addEventListener("click", (event) => {
		// const newInput = editorInputElement.lastElementChild.cloneNode(false);
		const newInput = document.createElement("input");
		newInput.name = Date.now();
		editorInputElement.appendChild(newInput);
	});
	editorRemoveElement.addEventListener("click", (event) => {
		editorInputElement.lastElementChild ? (editorInputElement.lastElementChild.outerHTML = "") : null;
	});
}