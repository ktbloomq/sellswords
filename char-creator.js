import Character from "./character.js"
import Boons from "./boons.js";
import * as Races from "./races.js"
import * as Archetypes from "./archetypes.js"
import * as PastLife from "./pastLife.js"

function updateRaceChoices(event) {
  const raceChoicesElement = document.getElementById("race-choices");
  raceChoicesElement.textContent = '';
  Object.entries(Races[event.target.value].raceChoices).forEach((e1) => {
    const select = document.createElement("select");
    select.name = `race-${e1[0]}`
    select.required = true;
    let option = document.createElement("option");
    option.value = "";
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    option.textContent = "choose";
    select.appendChild(option);
    e1[1].forEach((e2) => {
      option = document.createElement("option");
      option.value = e2.id;
      option.textContent = e2.displayName;
      select.appendChild(option);
    });
    raceChoicesElement.appendChild(select);
  });
}

function updateArchetypeChoices(event) {
  const archetypeChoicesElement = document.getElementById("archetype-choices");
  archetypeChoicesElement.textContent = '';
  Object.entries(Archetypes[event.target.value].archetypeLevelChoices).forEach((e1) => {
    const select = document.createElement("select");
    select.name = `archetype-${e1[0]}`
    select.required = true;
    let option = document.createElement("option");
    option.value = "";
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    option.textContent = "choose";
    select.appendChild(option);
    e1[1].forEach((e2) => {
      option = document.createElement("option");
      option.value = e2.id;
      option.textContent = e2.displayName;
      select.appendChild(option);
    });
    archetypeChoicesElement.appendChild(select);
  });
  // archetypeChoicesElement.innerHTML = Object.entries(Archetypes[event.target.value].archetypeLevelChoices).reduce((a,e) => (
  //   `${a}<select name='archetype-${e[0]}' required>${e[1].reduce((a2,e2) => (
  //     `${a2}<option value='${e2.id}'>${e2.displayName}</option>`
  //   ),"")}</select>`
  // ),"");
}

function addBoonInput() {
  const BoonChoicesElement = document.getElementById("boons");
  const select = document.createElement("select");
  select.name = `boon${Date.now()}`
  let option = document.createElement("option");
  option.value = "";
  option.selected = true;
  option.disabled = true;
  option.hidden = true;
  option.textContent = "choose";
  select.appendChild(option);
  Object.values(Boons).forEach((boon) => {
    option = document.createElement("option");
    option.value = boon.id;
    option.textContent = boon.displayName;
    select.appendChild(option);
  });
  BoonChoicesElement.appendChild(select);
}

function removeBoonInput() {
  const BoonChoicesElement = document.getElementById("boons");
  BoonChoicesElement.lastElementChild ? (BoonChoicesElement.lastElementChild.outerHTML = "") : null;
}

window.onload = async function() {
  const raceElement = document.getElementById("race");
  const archetypeElement = document.getElementById("archetype");
  const addBoonElement = document.getElementById("add-boon");
  const removeBoonElement = document.getElementById("remove-boon");
  raceElement.addEventListener("change", updateRaceChoices);
  archetypeElement.addEventListener("change", updateArchetypeChoices);
  addBoonElement.addEventListener("click", addBoonInput);
  removeBoonElement.addEventListener("click", removeBoonInput);

  const charForm = document.getElementById("char-form");
  charForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formdata = new FormData(charForm);
    const character = new Character();
    character.name = formdata.get("name") ?? "";
    const race = new Races[formdata.get("race")]();
    race.choices = formdata.entries().reduce((a,e) => {
      if(e[0].startsWith("race-")) {
        a[e[0].slice(5)]=e[1];
      }
      return a;
    },{});
    race.addBoons(character);
    race.applyAttributeModifiers(character);
    character.race = race;

    let pointBuy = {
      physique: Number(formdata.get("physique")) ?? 0,
      precision: Number(formdata.get("precision")) ?? 0,
      intuition: Number(formdata.get("intuition")) ?? 0,
      smarts: Number(formdata.get("smarts")) ?? 0,
      wit: Number(formdata.get("wit")) ?? 0,
      soul: Number(formdata.get("soul")) ?? 0,
    };
    character.applyAttributeBuy(pointBuy);
    const pastLife = new PastLife[formdata.get("past")]();
    character.pastLife = pastLife;

    let weapon = formdata.get("weapon1");
    if (weapon!=="none") character.weaponsTraining.push(weapon);
    weapon = formdata.get("weapon2");
    if (weapon!=="none") character.weaponsTraining.push(formdata.get("weapon2"));

    
    const archetype = new Archetypes[formdata.get("archetype")]();
    archetype.choices =  formdata.entries().reduce((a,e) => {
      if(e[0].startsWith("archetype-")) {
        a[e[0].slice(10)]=e[1];
      }
      return a;
    },{});
    archetype.applyBonuses(character);
    character.archetype = archetype;

    // Combat Pools
    let bonus = Math.max(character.attributes.physique.raw, character.attributes.precision.raw);
    character.health.max = character.health.current = 10+Math.ceil(bonus/2);
    bonus = Math.max(character.attributes.intuition.raw, character.attributes.smarts.raw);
    character.energy.max = character.energy.current = 10+Math.ceil(bonus/2);
    bonus = Math.max(character.attributes.wit.raw, character.attributes.soul.raw);
    character.mana.max = character.mana.current = 10+Math.ceil(bonus/2);

    let moreBoons = formdata.entries().reduce((a,e) => {
      if(e[0].startsWith("boon")) {
        a[e[0].slice(4)]=e[1];
      }
      return a;
    },{});
    Object.entries(moreBoons).forEach(([key,value]) => {
      if(value !== "") {
        const boon = Boons[value];
        character.boons[boon.category].push(value);
      }
    });
    
    character.calcSkills();
		pastLife.applyModifiers(character);
    Object.values(character.boons).forEach((category) => {
      category.forEach((boonid) => {
        let boon = Boons[boonid];
        if(boon.apply) {
          boon.apply(character);
        }
      });
    });
    
    // depends on calcSkills
    let skillInterest = formdata.get("skill-interest1");
    if (skillInterest!=="none") {
      let split = skillInterest.split(".");
      character.attributes[split[0]][split[1]] = Math.ceil((character.attributes[split[0]][split[1]]+1)/5)*5;
    }
    skillInterest = formdata.get("skill-interest2");
    if (skillInterest!=="none") {
      let split = skillInterest.split(".");
      character.attributes[split[0]][split[1]] = Math.ceil((character.attributes[split[0]][split[1]]+1)/5)*5;
    }
    
    const characterString = JSON.stringify(character);
    console.log(character);
    const response = await fetch(`saveCharacter.php/?name=${character.name}`, {
      method: "POST",
      body: characterString,
    });
    // const queryParams = new URLSearchParams();
    // queryParams.append("character", characterString);
    // const redirect = `/char-sheet.html?${queryParams.toString()}`
    // window.open(redirect, '_blank');
  })
}