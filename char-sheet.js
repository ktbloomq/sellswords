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
let editorModalElement, editorInputElement, editorFormElement, editorAddElement, editorRemoveElement, editorTarget;

function updateElements() {
	characterElements.physique.target.textContent = characterElements.physique.source();
	characterElements.intimidation.target.textContent = characterElements.intimidation.source();
	characterElements.strength.target.textContent = characterElements.strength.source();
	characterElements.precision.target.textContent = characterElements.precision.source();
	characterElements.pickpocket.target.textContent = characterElements.pickpocket.source();
	characterElements.hide.target.textContent = characterElements.hide.source();
	characterElements.intuition.target.textContent = characterElements.intuition.source();
	characterElements.blend.target.textContent = characterElements.blend.source();
	characterElements.diplomacy.target.textContent = characterElements.diplomacy.source();
	characterElements.smarts.target.textContent = characterElements.smarts.source();
	characterElements.focus.target.textContent = characterElements.focus.source();
	characterElements.tinkering.target.textContent = characterElements.tinkering.source();
	characterElements.wit.target.textContent = characterElements.wit.source();
	characterElements.business.target.textContent = characterElements.business.source();
	characterElements.bluff.target.textContent = characterElements.bluff.source();
	characterElements.soul.target.textContent = characterElements.soul.source();
	characterElements.readPerson.target.textContent = characterElements.readPerson.source();
	characterElements.alchemy.target.textContent = characterElements.alchemy.source();

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
	const source = element.source();
	const isNumber = (typeof(source[0] ?? source) === "number");
	if(Array.isArray(source)) {
		source.forEach((entry, i) => {
			const newInput = document.createElement("input");
			newInput.setAttribute("name", i);
			if(isNumber) newInput.setAttribute("type", "number");
			newInput.value = entry;
			editorInputElement.appendChild(newInput);
		})
	} else {
			const newInput = document.createElement("input");
			newInput.setAttribute("name", 0);
			if(isNumber) newInput.setAttribute("type", "number");
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
	if(Array.isArray(source)) {
		if(typeof(source[0])==="number") {
			values = values.map((entry) => {return Number(entry)});
		}
	} else {
		if(typeof(source)=="number") {
			values = Number(values[0]);
		} else {
			values = values[0];
		}
	}
	// console.log(values, typeof(values));
	editorTarget.source(values);
	console.log(character);
	updateElements();
	editorModalElement.close();
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
	editorAddElement = document.getElementById("add-entry");
	editorRemoveElement = document.getElementById("remove-entry");

	Object.entries(characterElements).forEach(([key, value]) => {
		value.target.addEventListener("click", (event) => {openModal(value)});
	});

	characterElements.physique.source = (v) => {if(v!==undefined) character.attributes.physique.raw = v; return character.attributes.physique.raw};
	characterElements.intimidation.source = (v) => {if(v!==undefined) character.attributes.physique.intimidation=v; return character.attributes.physique.intimidation;};
	characterElements.strength.source = (v) => {if(v!==undefined) character.attributes.physique.strength=v; return character.attributes.physique.strength;};
	characterElements.precision.source = (v) => {if(v!==undefined) character.attributes.precision.raw=v; return character.attributes.precision.raw;};
	characterElements.pickpocket.source = (v) => {if(v!==undefined) character.attributes.precision.pickpocket=v; return character.attributes.precision.pickpocket;};
	characterElements.hide.source = (v) => {if(v!==undefined) character.attributes.precision.hide=v; return character.attributes.precision.hide;};
	characterElements.intuition.source = (v) => {if(v!==undefined) character.attributes.intuition.raw=v; return character.attributes.intuition.raw;};
	characterElements.blend.source = (v) => {if(v!==undefined) character.attributes.intuition.blend=v; return character.attributes.intuition.blend;};
	characterElements.diplomacy.source = (v) => {if(v!==undefined) character.attributes.intuition.diplomacy=v; return character.attributes.intuition.diplomacy;};
	characterElements.smarts.source = (v) => {if(v!==undefined) character.attributes.smarts.raw=v; return character.attributes.smarts.raw;};
	characterElements.focus.source = (v) => {if(v!==undefined) character.attributes.smarts.focus=v; return character.attributes.smarts.focus;};
	characterElements.tinkering.source = (v) => {if(v!==undefined) character.attributes.smarts.tinkering=v; return character.attributes.smarts.tinkering;};
	characterElements.wit.source = (v) => {if(v!==undefined) character.attributes.wit.raw=v; return character.attributes.wit.raw;};
	characterElements.business.source = (v) => {if(v!==undefined) character.attributes.wit.business=v; return character.attributes.wit.business;};
	characterElements.bluff.source = (v) => {if(v!==undefined) character.attributes.wit.bluff=v; return character.attributes.wit.bluff;};
	characterElements.soul.source = (v) => {if(v!==undefined) character.attributes.soul.raw=v; return character.attributes.soul.raw;};
	characterElements.readPerson.source = (v) => {if(v!==undefined) character.attributes.soul.readPerson=v; return character.attributes.soul.readPerson;};
	characterElements.alchemy.source = (v) => {if(v!==undefined) character.attributes.soul.alchemy=v; return character.attributes.soul.alchemy;};
	characterElements.weaponsTraining.source = (v) => {if(v!==undefined) character.weaponsTraining=v; return character.weaponsTraining;};
	characterElements.explorationBoons.source = (v) => {if(v!==undefined) character.boons.exploration=v; return character.boons.exploration;};

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
	})
}