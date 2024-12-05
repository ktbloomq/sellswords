import Player from "./character.js"
import * as Races from "./races.js"
import * as PastLife from "./pastLife.js"

window.onload = function() {
  let charForm = document.getElementById("char-form");
  charForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formdata = new FormData(charForm);
    const character = new Player(); 
    const race = new Races[formdata.get("race")]();
    // console.log(formdata);
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