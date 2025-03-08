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
	luck: { type: "number" },
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
	inventory: { type: "boon" },
	notes: { type: "textarea" },
};
let editorModalElement, editorInputElement, editorFormElement, editorTarget;

function updateElements() {
	Object.entries(characterElements).forEach(([key, entry]) => {
		const source = entry.source.call(character);
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
					entry2.textContent = "";
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
					if (entry2.textContent === "") {
						const blank = document.createElement("tr");
						const name = document.createElement("td");
						const value = document.createElement("td");
						blank.appendChild(name);
						blank.appendChild(value);
						entry2.appendChild(blank);
					}
				});
			}
			else {
				console.error("invalid type", source, entry.type);
			}
		} else {
			console.error("invalid type", source, entry.type);
		}
	});
}

function editorAppend(entry, type) {
	if (type === "boon") {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.justifyContent = "space-between";
		const inputs = document.createElement("div");
		inputs.style.flexGrow = 1;

		const displayNameInput = document.createElement("input");
		displayNameInput.name = Date.now();
		displayNameInput.value = entry.displayName ?? "";
		displayNameInput.placeholder = "name";
		inputs.appendChild(displayNameInput);

		const descriptionInput = document.createElement("textarea");
		descriptionInput.name = Date.now();
		descriptionInput.textContent = entry.description ?? "";
		descriptionInput.placeholder = "description";
		inputs.appendChild(descriptionInput);
		div.appendChild(inputs);

		const remove = document.createElement("button");
		remove.type = "button";
		remove.textContent = "delete";
		remove.addEventListener("click", () => { editorInputElement.removeChild(div) });
		div.appendChild(remove);

		editorInputElement.appendChild(div);
	} else if (type === "specialization") {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.justifyContent = "space-between";
		const inputs = document.createElement("div");
		inputs.style.flexGrow = 1;

		const name = document.createElement("input");
		name.name = Date.now();
		name.value = entry.name ?? "";
		name.placeholder = "name";
		inputs.appendChild(name);

		const skill = document.createElement("select");
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
		skill.value = entry.skill ?? "intimidation";
		inputs.appendChild(skill);

		const value = document.createElement("input");
		value.type = "number";
		value.name = Date.now();
		value.value = entry.value ?? 0;
		inputs.appendChild(value);
		div.appendChild(inputs);

		const remove = document.createElement("button");
		remove.type = "button";
		remove.textContent = "delete";
		remove.addEventListener("click", () => { editorInputElement.removeChild(div) });
		div.appendChild(remove);

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
	const source = element.source.call(character);
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
	const source = editorTarget.source.call(character);
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
	editorTarget.source.call(character, values);
	// console.log(character);
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
		character = new Character(character)
	} else if (nameParam !== null) {
		const response = await fetch(`getCharacter.php/?name=${nameParam}`);
		character = await response.json();
		character = new Character(character);
	} else {
		character = new Character();
	}
	// console.log(character);

	Object.keys(characterElements).forEach((key) => {
		characterElements[key].target = document.getElementById(key) ?? undefined;
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
	document.getElementById("specializations").addEventListener("click", (event) => { openModal(characterElements.specializations) });
	document.getElementById("save").addEventListener("click", saveCharacter);
	document.getElementById("manage").addEventListener("click", () => { window.location.href = "creator.html?name=" + character.name });

	Object.entries(characterElements).forEach(([key,entry]) => {
		entry.source = character[key+"Handler"];
	});

	updateElements();

	editorFormElement.addEventListener("submit", applyChange);
	document.getElementById("add-entry").addEventListener("click", () => {
		let entry = "";
		if (editorTarget.type === "boon") {
			entry = { displayName: "", description: "" };
		}
		editorAppend(entry, editorTarget.type);
	});
	document.getElementById("editor-close").addEventListener("click", () => {
		editorModalElement.close();
		document.activeElement.blur();
	});
}