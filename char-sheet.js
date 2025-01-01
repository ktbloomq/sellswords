import Boons from "./boons.js"
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
	Object.entries(characterElements).forEach(([key,value]) => {
		const source = value.source()
		const type = typeof(source);
		if(type==="number") {
			value.target.textContent = source;
		}
	});

	characterElements.weaponsTraining.target.innerHTML = ""; 
	character.weaponsTraining.forEach(element => {
		const weaponType = WeaponTypes[element] ?? {id:element, displayName:element};
		const newElement = document.createElement("div");
		newElement.textContent = weaponType.displayName;
		characterElements.weaponsTraining.target.appendChild(newElement); 

	});

	characterElements.explorationBoons.target.innerHTML = "";
	character.boons.exploration.forEach(element => {
		const boon = Boons[element] ?? {id:element, displayName:element};
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

window.onload = async function() {
	const queryParams = new URLSearchParams(window.location.search);
	const characterParam = queryParams.get("character");
	const nameParam = queryParams.get("name");
	if(characterParam!==null) {
		character = JSON.parse(characterParam);
	} else if(nameParam!==null) {
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
		value.target.addEventListener("click", (event) => {openModal(value)});
	});

	characterElements.name.source = (v) => {if(v!==undefined) character.name = v; return character.name};
	characterElements.race.source = (v) => {if(v!==undefined) character.race.name = v; return character.race.name};
	characterElements.hp.source = (v) => {if(v!==undefined) character.health.current = v; return character.health.current};
	characterElements.hpMax.source = (v) => {if(v!==undefined) character.health.max = v; return character.health.max};
	characterElements.ep.source = (v) => {if(v!==undefined) character.energy.current = v; return character.energy.current};
	characterElements.epMax.source = (v) => {if(v!==undefined) character.energy.max = v; return character.energy.max};
	characterElements.mp.source = (v) => {if(v!==undefined) character.mana.current = v; return character.mana.current};
	characterElements.mpMax.source = (v) => {if(v!==undefined) character.mana.max = v; return character.mana.max};
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
	});
}