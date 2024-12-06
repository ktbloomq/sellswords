import Player from "./character.js"
import * as Races from "./races.js"
import * as PastLife from "./pastLife.js"

function updateRaceChoices(e) {
  const raceChoicesElement = document.getElementById("race-choices");
  // console.log(Races[e.target.value]);
  raceChoicesElement.innerHTML = Object.entries(Races[e.target.value].raceChoices).reduce((a,e) => (
    `${a}<select name='race-${e[0]}'>${e[1].reduce((a2,e2) => (
      `${a2}<option name='${e2.index}'>${e2.name}</option>`
    ),"")}</select>`
  ),"");

}
window.onload = function() {
  const raceElement = document.getElementById("race");
  raceElement.addEventListener("change", updateRaceChoices);

  const charForm = document.getElementById("char-form");
  charForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formdata = new FormData(charForm);
    console.log(Array.from(formdata.entries()).filter((e) => (e[0].startsWith("race-"))).map((e) => [e[0].slice(5),e[1]]));
    const character = new Player();
    const race = new Races[formdata.get("race")]();
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

    character.calcSkills();
    console.log(character);

    const queryParams = new URLSearchParams();
    queryParams.append("character", JSON.stringify(character));
    const redirect = `/char-sheet.html?${queryParams.toString()}`
    window.location.href = redirect;
  })
}