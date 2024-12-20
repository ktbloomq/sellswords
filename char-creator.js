import Character from "./character.js"
import * as Races from "./races.js"
import * as Archetypes from "./archetypes.js"
import * as PastLife from "./pastLife.js"

function updateRaceChoices(e) {
  const raceChoicesElement = document.getElementById("race-choices");
  // console.log(Races[e.target.value]);
  raceChoicesElement.innerHTML = Object.entries(Races[e.target.value].raceChoices).reduce((a,e) => (
    `${a}<select name='race-${e[0]}'>${e[1].reduce((a2,e2) => (
      `${a2}<option value='${e2.id}'>${e2.displayName}</option>`
    ),"")}</select>`
  ),"");

}

function updateArchetypeChoices(e) {
  const archetypeChoicesElement = document.getElementById("archetype-choices");
  // console.log(Archetypes[e.target.value]);
  archetypeChoicesElement.innerHTML = Object.entries(Archetypes[e.target.value].archetypeLevelChoices).reduce((a,e) => (
    `${a}<select name='archetype-${e[0]}'>${e[1].reduce((a2,e2) => (
      `${a2}<option value='${e2.id}'>${e2.displayName}</option>`
    ),"")}</select>`
  ),"");

}

window.onload = async function() {
  const raceElement = document.getElementById("race");
  const archetypeElement = document.getElementById("archetype");
  raceElement.addEventListener("change", updateRaceChoices);
  archetypeElement.addEventListener("change", updateArchetypeChoices);

  const charForm = document.getElementById("char-form");
  charForm.addEventListener("submit", async (e) => {
    e.preventDefault();
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
    race.applyBoons(character);
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

    character.weaponsTraining.push(formdata.get("weapon1"));
    character.weaponsTraining.push(formdata.get("weapon2"));

    const archetype = new Archetypes[formdata.get("archetype")]();
    archetype.choices =  formdata.entries().reduce((a,e) => {
      if(e[0].startsWith("archetype-")) {
        a[e[0].slice(10)]=e[1];
      }
      return a;
    },{});
    archetype.applyBonuses(character);
    character.archetype = archetype;

    character.calcSkills();
    
    const characterString = JSON.stringify(character);
    console.log(characterString);
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