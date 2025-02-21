import Character from "./character.js"

let character;
let characterElements = {
	name: { type: "string" },
	race: { type: "string" },
	level: { type: "number" },
	hp: { type: "number" },
	hpMax: { type: "number" },
	mp: { type: "number" },
	mpMax: { type: "number" },
	ep: { type: "number" },
	epMax: { type: "number" },
	physique: { type: "number" },
	intimidation: { type: "number" },
	strength: { type: "number" },
	precision: { type: "number" },
	pickpocket: { type: "number" },
	hide: { type: "number" },
	intuition: { type: "number" },
	blend: { type: "number" },
	diplomacy: { type: "number" },
	smarts: { type: "number" },
	focus: { type: "number" },
	education: { type: "number" },
	wit: { type: "number" },
	business: { type: "number" },
	bluff: { type: "number" },
	soul: { type: "number" },
	readPerson: { type: "number" },
	alchemy: { type: "number" },
	weaponsTraining: { type: "boon" },
	combatBoons: { type: "boon" },
	socialBoons: { type: "boon" },
	explorationBoons: { type: "boon" },
	specializations: { type: "specialization" },
	freeActions: { type: "number" },
	actionChain: { type: "number" },
	actionDice: { type: "number" },
	socialCircle: { type: "string" },
	regionalKnowledge: { type: "string" },
	appearance: { type: "textarea" },
	call: { type: "textarea" },
	quirks: { type: "textarea" },
	religion: { type: "textarea" },
	oath: { type: "textarea" },
	politics: { type: "textarea" },
	organizations: { type: "textarea" },
	backstory: { type: "textarea" },
	notes: { type: "textarea" },
};
let editorModalElement, editorInputElement, editorFormElement, editorTarget;

function updateElements() {
	Object.entries(characterElements).forEach(([key, entry]) => {
		const source = entry.source()
		if (entry.type === "number" || entry.type === "string" || entry.type === "textarea") {
			entry.target.textContent = source;
		} else if (Array.isArray(source)) {
			// Boons / Weapons
			if (entry.type === "boon") {
				entry.target.textContent = "";
				source.forEach(entry2 => {
					const newElement = document.createElement("div");
					newElement.textContent = entry2.displayName;
					newElement.title = entry2.description ?? "";
					entry.target.appendChild(newElement);
				});
			}
			else if (entry.type === "specialization") {
				Object.values(entry.target).forEach(entry2 => {
					entry2.textContent="";
				});
				source.forEach(entry2 => {
					const specialization = document.createElement("tr");
					const name = document.createElement("td");
					const value = document.createElement("td");
					name.textContent = entry2.name;
					value.textContent = entry2.value;
					specialization.appendChild(name);
					specialization.appendChild(value);
					entry.target[entry2.skill].appendChild(specialization);
				});
				Object.values(entry.target).forEach(entry2 => {
					if(entry2.textContent==="") {
						const blank = document.createElement("tr");
						const name = document.createElement("td");
						const value = document.createElement("td");
						blank.appendChild(name);
						blank.appendChild(value);
						entry2.appendChild(blank);
					}
				});
			}
		} else {
			console.error("invalid type", source);
		}
	});
}

function editorAppend(entry, type) {
	if (type === "boon") {
		const div = document.createElement("div");
		const displayNameInput = document.createElement("input");
		displayNameInput.name = Date.now();
		displayNameInput.value = entry.displayName ?? "";
		div.appendChild(displayNameInput);

		const descriptionInput = document.createElement("textarea");
		descriptionInput.name = Date.now();
		descriptionInput.textContent = entry.description ?? "";
		div.appendChild(descriptionInput);
		editorInputElement.appendChild(div);
	} else if (type === "specialization") {
		const div = document.createElement("div");
		const name = document.createElement("input");
		const skill = document.createElement("select");
		const value = document.createElement("input");
		name.name = Date.now();
		name.value = entry.name ?? "";
		skill.name = Date.now();
		skill.innerHTML = `
			<option value="intimidation">Intimidation</option>
			<option value="strength">Strength</option>
			<option value="pickpocket">Pickpocket</option>
			<option value="hide">Hide</option>
			<option value="blend">Blend</option>
			<option value="diplomacy">Diplomacy</option>
			<option value="focus">Focus</option>
			<option value="education">Education</option>
			<option value="business">Business</option>
			<option value="bluff">Bluff</option>
			<option value="readPerson">Read Person</option>
			<option value="alchemy">Alchemy</option>
		`;
		skill.value = entry.skill;
		value.type = "number";
		value.name = Date.now();
		value.value = entry.value ?? "";
		div.appendChild(name);
		div.appendChild(skill);
		div.appendChild(value);
		editorInputElement.appendChild(div);
	} else if (type === "textarea") {
		const newInput = document.createElement("textarea");
		newInput.name = Date.now();
		newInput.value = entry ?? "";
		editorInputElement.appendChild(newInput);
	} else {
		const newInput = document.createElement("input");
		newInput.name = Date.now();
		if (type === "number") newInput.type = "number";
		newInput.value = entry ?? "";
		editorInputElement.appendChild(newInput);
	}
}

function openModal(element) {
	editorInputElement.innerHTML = "";
	const source = element.source();
	if (Array.isArray(source)) {
		document.getElementById("editor-array-controls").style.display = "inline";
		source.forEach((entry) => {
			editorAppend(entry, element.type);
		});
	} else {
		document.getElementById("editor-array-controls").style.display = "none";
		editorAppend(source, element.type);
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
		if (editorTarget.type === "number") {
			values = values.map((entry) => { return Number(entry) });
		}
		// if boon
		else if (editorTarget.type === "boon") {
			let tmpOutput = [];
			for (let i = 0; i < values.length; i += 2) {
				let entry = {};
				entry.displayName = values[i];
				entry.description = values[i + 1];
				tmpOutput.push(entry);
			}
			values = tmpOutput;
		}
		else if (editorTarget.type === "specialization") {
			let tmpOutput = [];
			for (let i = 0; i < values.length; i += 3) {
				let entry = {};
				entry.name = values[i];
				entry.skill = values[i + 1];
				entry.value = values[i + 2];
				tmpOutput.push(entry);
			}
			values = tmpOutput;
		}
	} else {
		if (editorTarget.type == "number") {
			values = Number(values[0]);
		} else {
			values = values[0];
		}
	}
	editorTarget.source(values);
	console.log(character);
	updateElements();
	editorModalElement.close();
	document.activeElement.blur();
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
		characterElements[key].target = document.getElementById(key)?? undefined;
	});
	characterElements.specializations.target = {}
	characterElements.specializations.target.intimidation = document.getElementById("intimidationSpecialization");
	characterElements.specializations.target.strength = document.getElementById("strengthSpecialization");
	characterElements.specializations.target.pickpocket = document.getElementById("pickpocketSpecialization");
	characterElements.specializations.target.hide = document.getElementById("hideSpecialization");
	characterElements.specializations.target.blend = document.getElementById("blendSpecialization");
	characterElements.specializations.target.diplomacy = document.getElementById("diplomacySpecialization");
	characterElements.specializations.target.focus = document.getElementById("focusSpecialization");
	characterElements.specializations.target.education = document.getElementById("educationSpecialization");
	characterElements.specializations.target.business = document.getElementById("businessSpecialization");
	characterElements.specializations.target.bluff = document.getElementById("bluffSpecialization");
	characterElements.specializations.target.readPerson = document.getElementById("readPersonSpecialization");
	characterElements.specializations.target.alchemy = document.getElementById("alchemySpecialization");

	editorModalElement = document.getElementById("editor");
	editorFormElement = document.getElementById("editor-form");
	editorInputElement = document.getElementById("editor-inputs");

	Object.values(characterElements).forEach((value) => {
		value.target.addEventListener?.("click", (event) => { openModal(value) });
	});
	document.getElementById("specializations").addEventListener("click", (event) => {openModal(characterElements.specializations)});
	document.getElementById("save").addEventListener("click", saveCharacter);
	document.getElementById("manage").addEventListener("click", () => {window.location.href = "creator.html?name="+character.name});

	characterElements.name.source = (v) => { if (v !== undefined) character.name = v; return character.name };
	characterElements.race.source = (v) => { if (v !== undefined) character.race.name = v; return character.race.name };
	characterElements.level.source = (v) => { if (v !== undefined) character.level = v; return character.level };
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
	document.getElementById("add-entry").addEventListener("click", () => {
		let entry = "";
		if (editorTarget.type === "boon") {
			entry = { displayName: "", description: "" };
		}
		editorAppend(entry, editorTarget.type);
	});
	document.getElementById("remove-entry").addEventListener("click", () => {
		editorInputElement.lastElementChild ? (editorInputElement.lastElementChild.outerHTML = "") : null;
	});
	document.getElementById("editor-close").addEventListener("click", () => {
		editorModalElement.close();
	})
}