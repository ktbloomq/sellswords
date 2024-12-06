let character;
let physiqueElement;
let intimidationElement;
let strengthElement;
let precisionElement;
let pickpocketElement;
let hideElement;
let intuitionElement;
let blendElement;
let diplomacyElement;
let smartsElement;
let focusElement;
let tinkeringElement;
let witElement;
let businessElement;
let bluffElement;
let soulElement;
let readPersonElement;
let alchemyElement;
let weaponsTrainingElement;

function updateElements() {
	physiqueElement.textContent = character.attributes.physique.raw;
	intimidationElement.textContent = character.attributes.physique.intimidation;
	strengthElement.textContent = character.attributes.physique.strength;
	precisionElement.textContent = character.attributes.precision.raw
	pickpocketElement.textContent = character.attributes.precision.pickpocket;
	hideElement.textContent = character.attributes.precision.hide;
	intuitionElement.textContent = character.attributes.intuition.raw
	blendElement.textContent = character.attributes.intuition.blend;
	diplomacyElement.textContent = character.attributes.intuition.diplomacy;
	smartsElement.textContent = character.attributes.smarts.raw
	focusElement.textContent = character.attributes.smarts.focus;
	tinkeringElement.textContent = character.attributes.smarts.tinkering;
	witElement.textContent = character.attributes.wit.raw
	businessElement.textContent = character.attributes.wit.business;
	bluffElement.textContent = character.attributes.wit.bluff;
	soulElement.textContent = character.attributes.soul.raw
	readPersonElement.textContent = character.attributes.soul.readPerson;
	alchemyElement.textContent = character.attributes.soul.alchemy;

	weaponsTrainingElement.textContent = character.weaponsTraining.reduce((a,b) => a+" "+b);
	// TODO: Display Boons
}

window.onload = function() {
	physiqueElement = document.getElementById("physique-bonus");
	intimidationElement = document.getElementById("intimidation-bonus");
	strengthElement = document.getElementById("strength-bonus");
	precisionElement = document.getElementById("precision-bonus");
	pickpocketElement = document.getElementById("pickpocket-bonus");
	hideElement = document.getElementById("hide-bonus");
	intuitionElement = document.getElementById("intuition-bonus");
	blendElement = document.getElementById("blend-bonus");
	diplomacyElement = document.getElementById("diplomacy-bonus");
	smartsElement = document.getElementById("smarts-bonus");
	focusElement = document.getElementById("focus-bonus");
	tinkeringElement = document.getElementById("tinkering-bonus");
	witElement = document.getElementById("wit-bonus");
	businessElement = document.getElementById("business-bonus");
	bluffElement = document.getElementById("bluff-bonus");
	soulElement = document.getElementById("soul-bonus");
	readPersonElement = document.getElementById("read-person-bonus");
	alchemyElement = document.getElementById("alchemy-bonus");
	weaponsTrainingElement = document.getElementById("weapons-training");
	
	const queryParams = new URLSearchParams(window.location.search);
	character = JSON.parse(queryParams.get("character"));
	updateElements();

}