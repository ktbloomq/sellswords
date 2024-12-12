import Boons from "./boons.js"

let character;
let elements = {
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

function updateElements() {
	elements.physique.target.textContent = elements.physique.source;
	elements.intimidation.target.textContent = elements.intimidation.source;
	elements.strength.target.textContent = elements.strength.source;
	elements.precision.target.textContent = elements.precision.source
	elements.pickpocket.target.textContent = elements.pickpocket.source;
	elements.hide.target.textContent = elements.hide.source;
	elements.intuition.target.textContent = elements.intuition.source
	elements.blend.target.textContent = elements.blend.source;
	elements.diplomacy.target.textContent = elements.diplomacy.source;
	elements.smarts.target.textContent = elements.smarts.source
	elements.focus.target.textContent = elements.focus.source;
	elements.tinkering.target.textContent = elements.tinkering.source;
	elements.wit.target.textContent = elements.wit.source
	elements.business.target.textContent = elements.business.source;
	elements.bluff.target.textContent = elements.bluff.source;
	elements.soul.target.textContent = elements.soul.source
	elements.readPerson.target.textContent = elements.readPerson.source;
	elements.alchemy.target.textContent = elements.alchemy.source;

	character.weaponsTraining.forEach(element => {
		const newElement = document.createElement("div");
		newElement.textContent = element;
		elements.weaponsTraining.target.appendChild(newElement); 

	});
	character.boons.exploration.forEach(e => {
		const boon = Boons[e]
		const newElement = document.createElement("div");
		newElement.textContent = boon.displayName;
		elements.explorationBoons.target.appendChild(newElement);
	});
}

function editElement(element) {
	// console.log(element);
	element.source = "test";
	element.target.textContent = element.source;
	console.log(character);
}

window.onload = function() {
	elements.physique.target = document.getElementById("physique-bonus");
	elements.intimidation.target = document.getElementById("intimidation-bonus");
	elements.strength.target = document.getElementById("strength-bonus");
	elements.precision.target = document.getElementById("precision-bonus");
	elements.pickpocket.target = document.getElementById("pickpocket-bonus");
	elements.hide.target = document.getElementById("hide-bonus");
	elements.intuition.target = document.getElementById("intuition-bonus");
	elements.blend.target = document.getElementById("blend-bonus");
	elements.diplomacy.target = document.getElementById("diplomacy-bonus");
	elements.smarts.target = document.getElementById("smarts-bonus");
	elements.focus.target = document.getElementById("focus-bonus");
	elements.tinkering.target = document.getElementById("tinkering-bonus");
	elements.wit.target = document.getElementById("wit-bonus");
	elements.business.target = document.getElementById("business-bonus");
	elements.bluff.target = document.getElementById("bluff-bonus");
	elements.soul.target = document.getElementById("soul-bonus");
	elements.readPerson.target = document.getElementById("read-person-bonus");
	elements.alchemy.target = document.getElementById("alchemy-bonus");
	elements.weaponsTraining.target = document.getElementById("weapons-training");
	elements.explorationBoons.target = document.getElementById("exploration-boons");

	Object.entries(elements).forEach(([key, value]) => {
		value.target.addEventListener("click", (event) => {editElement(value)});
	});

	
	const queryParams = new URLSearchParams(window.location.search);
	character = JSON.parse(queryParams.get("character"));
	console.log(character);

	elements.physique.source = character.attributes.physique.raw;
	elements.intimidation.source = character.attributes.physique.intimidation;
	elements.strength.source = character.attributes.physique.strength;
	elements.precision.source = character.attributes.precision.raw
	elements.pickpocket.source = character.attributes.precision.pickpocket;
	elements.hide.source = character.attributes.precision.hide;
	elements.intuition.source = character.attributes.intuition.raw
	elements.blend.source = character.attributes.intuition.blend;
	elements.diplomacy.source = character.attributes.intuition.diplomacy;
	elements.smarts.source = character.attributes.smarts.raw
	elements.focus.source = character.attributes.smarts.focus;
	elements.tinkering.source = character.attributes.smarts.tinkering;
	elements.wit.source = character.attributes.wit.raw
	elements.business.source = character.attributes.wit.business;
	elements.bluff.source = character.attributes.wit.bluff;
	elements.soul.source = character.attributes.soul.raw
	elements.readPerson.source = character.attributes.soul.readPerson;
	elements.alchemy.source = character.attributes.soul.alchemy;

	updateElements();

}