import Boons from "./boons.js"
import Character from "./character.js"

let character;
let characterElements = {
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
	tinkering: {},
	wit: {},
	business: {},
	bluff: {},
	soul: {},
	readPerson: {},
	alchemy: {},
	weaponsTraining: {},
	explorationBoons: {},
};
let editorModalElement, editorInputElement, editorFormElement, editorTarget;

function updateElements() {
	characterElements.physique.target.textContent = characterElements.physique.source;
	characterElements.intimidation.target.textContent = characterElements.intimidation.source;
	characterElements.strength.target.textContent = characterElements.strength.source;
	characterElements.precision.target.textContent = characterElements.precision.source
	characterElements.pickpocket.target.textContent = characterElements.pickpocket.source;
	characterElements.hide.target.textContent = characterElements.hide.source;
	characterElements.intuition.target.textContent = characterElements.intuition.source
	characterElements.blend.target.textContent = characterElements.blend.source;
	characterElements.diplomacy.target.textContent = characterElements.diplomacy.source;
	characterElements.smarts.target.textContent = characterElements.smarts.source
	characterElements.focus.target.textContent = characterElements.focus.source;
	characterElements.tinkering.target.textContent = characterElements.tinkering.source;
	characterElements.wit.target.textContent = characterElements.wit.source
	characterElements.business.target.textContent = characterElements.business.source;
	characterElements.bluff.target.textContent = characterElements.bluff.source;
	characterElements.soul.target.textContent = characterElements.soul.source
	characterElements.readPerson.target.textContent = characterElements.readPerson.source;
	characterElements.alchemy.target.textContent = characterElements.alchemy.source;

	characterElements.weaponsTraining.target.innerHTML = ""; 
	character.weaponsTraining.forEach(element => {
		const newElement = document.createElement("div");
		newElement.textContent = element;
		characterElements.weaponsTraining.target.appendChild(newElement); 

	});

	characterElements.explorationBoons.target.innerHTML = "";
	character.boons.exploration.forEach(element => {
		const boon = Boons[element]
		const newElement = document.createElement("div");
		newElement.textContent = boon.displayName;
		characterElements.explorationBoons.target.appendChild(newElement);
	});
}

function openModal(element) {
	// console.log(element);
	editorInputElement.innerHTML = "";
	if(Array.isArray(element.source)) {
		element.source.forEach((entry, i) => {
			const newInput = document.createElement("input");
			newInput.setAttribute("name", i);
			newInput.value = entry;
			editorInputElement.appendChild(newInput);
		})
	} else {
		const newInput = document.createElement("input");
		newInput.value = element.source;
		editorFormElement.insertBefore(newInput, editorFormElement.firstChild);
	}
	editorTarget = element;
	editorModalElement.showModal();
}

window.onload = function() {
	const queryParams = new URLSearchParams(window.location.search);
	character = JSON.parse(queryParams.get("character")) ?? new Character();
	console.log(character);

	characterElements.physique.target = document.getElementById("physique-bonus");
	characterElements.intimidation.target = document.getElementById("intimidation-bonus");
	characterElements.strength.target = document.getElementById("strength-bonus");
	characterElements.precision.target = document.getElementById("precision-bonus");
	characterElements.pickpocket.target = document.getElementById("pickpocket-bonus");
	characterElements.hide.target = document.getElementById("hide-bonus");
	characterElements.intuition.target = document.getElementById("intuition-bonus");
	characterElements.blend.target = document.getElementById("blend-bonus");
	characterElements.diplomacy.target = document.getElementById("diplomacy-bonus");
	characterElements.smarts.target = document.getElementById("smarts-bonus");
	characterElements.focus.target = document.getElementById("focus-bonus");
	characterElements.tinkering.target = document.getElementById("tinkering-bonus");
	characterElements.wit.target = document.getElementById("wit-bonus");
	characterElements.business.target = document.getElementById("business-bonus");
	characterElements.bluff.target = document.getElementById("bluff-bonus");
	characterElements.soul.target = document.getElementById("soul-bonus");
	characterElements.readPerson.target = document.getElementById("read-person-bonus");
	characterElements.alchemy.target = document.getElementById("alchemy-bonus");
	characterElements.weaponsTraining.target = document.getElementById("weapons-training");
	characterElements.explorationBoons.target = document.getElementById("exploration-boons");

	editorModalElement = document.getElementById("editor");
	editorFormElement = document.getElementById("editor-form");
	editorInputElement = document.getElementById("editor-inputs");

	Object.entries(characterElements).forEach(([key, value]) => {
		value.target.addEventListener("click", (event) => {openModal(value)});
	});

	characterElements.physique.source = character.attributes.physique.raw;
	characterElements.intimidation.source = character.attributes.physique.intimidation;
	characterElements.strength.source = character.attributes.physique.strength;
	characterElements.precision.source = character.attributes.precision.raw
	characterElements.pickpocket.source = character.attributes.precision.pickpocket;
	characterElements.hide.source = character.attributes.precision.hide;
	characterElements.intuition.source = character.attributes.intuition.raw
	characterElements.blend.source = character.attributes.intuition.blend;
	characterElements.diplomacy.source = character.attributes.intuition.diplomacy;
	characterElements.smarts.source = character.attributes.smarts.raw
	characterElements.focus.source = character.attributes.smarts.focus;
	characterElements.tinkering.source = character.attributes.smarts.tinkering;
	characterElements.wit.source = character.attributes.wit.raw
	characterElements.business.source = character.attributes.wit.business;
	characterElements.bluff.source = character.attributes.wit.bluff;
	characterElements.soul.source = character.attributes.soul.raw
	characterElements.readPerson.source = character.attributes.soul.readPerson;
	characterElements.alchemy.source = character.attributes.soul.alchemy;

	characterElements.weaponsTraining.source = character.weaponsTraining;
	characterElements.explorationBoons.source = character.boons.exploration;

	updateElements();

	editorFormElement.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(editorFormElement);
		console.log(formData);
		editorTarget.source = Array.from(formData.values());
		console.log(editorTarget.source)
		console.log(character);
		updateElements();
		editorModalElement.close();
	});
}