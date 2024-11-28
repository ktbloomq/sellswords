import { Player } from "./player.js";
import * as Races from "./races.js";

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
let player;

function updateElements() {
	physiqueElement.textContent = player.attributes.physical.physique.raw;
	intimidationElement.textContent = player.attributes.physical.physique.intimidation;
	strengthElement.textContent = player.attributes.physical.physique.strength;
	precisionElement.textContent = player.attributes.physical.precision.raw
	pickpocketElement.textContent = player.attributes.physical.precision.pickpocket;
	hideElement.textContent = player.attributes.physical.precision.hide;
	intuitionElement.textContent = player.attributes.mental.intuition.raw
	blendElement.textContent = player.attributes.mental.intuition.blend;
	diplomacyElement.textContent = player.attributes.mental.intuition.diplomacy;
	smartsElement.textContent = player.attributes.mental.smarts.raw
	focusElement.textContent = player.attributes.mental.smarts.focus;
	tinkeringElement.textContent = player.attributes.mental.smarts.tinkering;
	witElement.textContent = player.attributes.spiritual.wit.raw
	businessElement.textContent = player.attributes.spiritual.wit.business;
	bluffElement.textContent = player.attributes.spiritual.wit.bluff;
	soulElement.textContent = player.attributes.spiritual.soul.raw
	readPersonElement.textContent = player.attributes.spiritual.soul.readPerson;
	alchemyElement.textContent = player.attributes.spiritual.soul.alchemy;
}

window.onload = function() {
	console.log("test");
	
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
	
	player = new Player();
	let race = new Races.Elf();
	player.calcSkills(race);
	updateElements();

}