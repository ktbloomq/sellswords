import Character from "./character.js"
import Boons from "./boons.js";
import CombatTraining from "./combatTraining.js"
import * as Races from "./races.js"
import * as Archetypes from "./archetypes.js"
import * as PastLife from "./pastLife.js"

let physiqueInput, precisionInput, intuitionInput, smartsInput, witInput, soulInput, pointsSpent, boonInputClickCount = 0;

function updateAttributePreview(event) {
  pointsSpent.textContent = Number(physiqueInput.value) + Number(precisionInput.value) +
    Number(intuitionInput.value) + Number(smartsInput.value) +
    Number(witInput.value) + Number(soulInput.value) + 24;
}

function updateRaceChoices(event, values) {
  const raceChoicesElement = document.getElementById("race-choices");
  raceChoicesElement.textContent = '';
  Object.entries(Races[event.target.value].raceChoices).forEach((e1, i) => {
    const select = document.createElement("select");
    select.name = "race-" + e1[0];
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
    if (values) {
      select.value = values[i][1];
    }
    raceChoicesElement.appendChild(select);
  });
}

function updateArchetypeChoices(event, values) {
  const archetypeChoicesElement = document.getElementById("archetype-choices");
  archetypeChoicesElement.textContent = '';
  Object.entries(Archetypes[event.target.value].archetypeLevelChoices).forEach((e1, i) => {
    const select = document.createElement("select");
    select.name = "archetype-" + e1[0];
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
    if (values) {
      select.value = values[i][1];
    }
    archetypeChoicesElement.appendChild(select);
  });
}

function updatePastChoices(event, values) {
  const pastChoicesElement = document.getElementById("past-choices");
  pastChoicesElement.textContent = '';
  Object.entries(PastLife[event.target.value]?.pastChoices).forEach((e1, i) => {
    let choice;
    if (e1[0].startsWith("boon") || e1[0].startsWith("weapon")) {
      choice = document.createElement("select");
      choice.name = "past-" + e1[0];
      choice.required = true;
      let option = document.createElement("option");
      option.value = "";
      option.selected = true;
      option.disabled = true;
      option.hidden = true;
      option.textContent = "choose";
      choice.appendChild(option);
      e1[1].forEach((e2) => {
        option = document.createElement("option");
        option.value = e2.id;
        option.textContent = e2.displayName;
        choice.appendChild(option);
      });
      if (values) {
        console.log(values);
        choice.value = values[i].value;
      }
    } else if (e1[0].startsWith("specialization")) {
      choice = document.createElement("div");
      const info = document.createElement("div");
      const name = document.createElement("input");
      const skill = document.createElement("select");
      const value = document.createElement("input");
      info.textContent = "Choose a specialization";
      name.name = "past-" + e1[0] + "-name";
      name.placeholder = "specialization name";
      skill.name = "past-" + e1[0] + "-skill";
      value.value = e1[1];
      skill.innerHTML = `
        <option value="intimidation">Intimidation</option>
        <option value="strength">Strength</option>
        <option value="pickpocket">Pickpocket</option>
        <option value="hide">Hide</option>
        <option value="blend">Blend</option>
        <option value="diplomacy">Diplomacy</option>
        <option value="focus">Focus</option>
        <option value="education">Education</option>
        <option value="business">Business</option>
        <option value="bluff">Bluff</option>
        <option value="readPerson">Read Person</option>
        <option value="alchemy">Alchemy</option>
      `;
      value.name = "past-" + e1[0] + "-value";
      value.type = "hidden";
      if (values) {
        name.value = values[i].name;
        skill.value = values[i].skill;
      }
      choice.append(info);
      choice.appendChild(name);
      choice.appendChild(skill);
      choice.appendChild(value);
    }
    pastChoicesElement.appendChild(choice);
  });
}

function addBoonInput(event, value) {
  boonInputClickCount ++;
  const BoonChoicesElement = document.getElementById("boons");
  const select = document.createElement("select");
  select.name = "boon-" + boonInputClickCount;
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
  select.value = value ?? "";
  BoonChoicesElement.appendChild(select);
}

function removeBoonInput() {
  const BoonChoicesElement = document.getElementById("boons");
  BoonChoicesElement.lastElementChild ? (BoonChoicesElement.lastElementChild.outerHTML = "") : null;
}

window.onload = async function () {
  physiqueInput = document.getElementById("physique");
  precisionInput = document.getElementById("precision");
  intuitionInput = document.getElementById("intuition");
  smartsInput = document.getElementById("smarts");
  witInput = document.getElementById("wit");
  soulInput = document.getElementById("soul");
  pointsSpent = document.getElementById("points-spent");
  document.getElementById("race").addEventListener("change", updateRaceChoices);
  document.getElementById("archetype").addEventListener("change", updateArchetypeChoices);
  document.getElementById("past").addEventListener("change", updatePastChoices);
  document.getElementById("add-boon").addEventListener("click", addBoonInput);
  document.getElementById("remove-boon").addEventListener("click", removeBoonInput);

  // preview spent attributes
  physiqueInput.addEventListener("change", updateAttributePreview);
  precisionInput.addEventListener("change", updateAttributePreview);
  intuitionInput.addEventListener("change", updateAttributePreview);
  smartsInput.addEventListener("change", updateAttributePreview);
  witInput.addEventListener("change", updateAttributePreview);
  soulInput.addEventListener("change", updateAttributePreview);

  // set inputs to existing character
  const queryParams = new URLSearchParams(window.location.search);
  const nameParam = queryParams.get("name");
  if (nameParam) {
    const response = await fetch(`getCharacter.php/?name=${nameParam}`);
    const inputCharacter = await response.json();
    const userInputs = inputCharacter.userInputs;
    console.log(userInputs);
    document.getElementById("name").value = userInputs.name;

    document.getElementById("race").value = userInputs.race;
    updateRaceChoices({ target: { value: userInputs.race } }, Object.entries(inputCharacter.race.choices));
    physiqueInput.value = userInputs.physique;
    precisionInput.value = userInputs.precision;
    intuitionInput.value = userInputs.intuition;
    smartsInput.value = userInputs.smarts;
    witInput.value = userInputs.wit;
    soulInput.value = userInputs.soul;
    document.getElementById("archetype").value = userInputs.archetype;
    updateArchetypeChoices({ target: { value: userInputs.archetype } }, Object.entries(inputCharacter.archetype.choices));
    document.getElementById("appearance").value = userInputs.appearance;
    document.getElementById("past").value = userInputs.past;
    updatePastChoices({ target: { value: userInputs.past } }, inputCharacter.pastLife.choices);
    document.getElementById("socialCircle").value = userInputs.socialCircle;
    document.getElementById("regionalKnowledge").value = userInputs.regionalKnowledge;
    document.getElementById("weapon1").value = userInputs.weapon1;
    document.getElementById("weapon2").value = userInputs.weapon2;
    document.getElementById("skill-interest1").value = userInputs["skill-interest1"];
    document.getElementById("skill-interest2").value = userInputs["skill-interest2"];
    document.getElementById("magic-school").value = userInputs["magic-school"];
    document.getElementById("path").value = userInputs.path;
    document.getElementById("call").value = userInputs.call;
    document.getElementById("trait-name").value = userInputs["trait-name"];
    document.getElementById("trait-skill").value = userInputs["trait-skill"];
    document.getElementById("flaw-name").value = userInputs["flaw-name"];
    document.getElementById("flaw-skill").value = userInputs["flaw-skill"];
    document.getElementById("quirks").value = userInputs.quirks;
    document.getElementById("religion").value = userInputs.religion;
    document.getElementById("oath").value = userInputs.oath;
    document.getElementById("politics").value = userInputs.politics;
    document.getElementById("organizations").value = userInputs.organizations;
    document.getElementById("backstory").value = userInputs.backstory;
    // TODO: set nested choices
    Object.entries(userInputs).forEach(([key, value]) => {
      if (key.startsWith("boon")) {
        addBoonInput(null, value);
      }
    });
  } else {
    updateRaceChoices({ target: { value: "Human" } });
    updateArchetypeChoices({ target: { value: "Warrior" } });
    updatePastChoices({ target: { value: "Bard" } });
  }

  // Start Proccessing the form
  const charForm = document.getElementById("char-form");
  charForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formdata = new FormData(charForm);
    const character = new Character();
    const race = new Races[formdata.get("race")]();
    const archetype = new Archetypes[formdata.get("archetype")]();
    const pastLife = new PastLife[formdata.get("past")]();

    character.userInputs = Object.fromEntries(formdata.entries());

    let moreBoons = [];
    for (const [key, value] of formdata.entries()) {
      if (key.startsWith("race-")) {
        race.choices[key.slice(5)] = value;
      } else if (key.startsWith("archetype-")) {
        archetype.choices.push(value);
      } else if (key.startsWith("past-")) {
        if (key.startsWith("past-specialization")) {
          if (key.endsWith("name")) {
            pastLife.choices.push({ type: "specialization", name: value });
          } else if (key.endsWith("skill")) {
            pastLife.choices[pastLife.choices.length - 1].skill = value;
          } else if (key.endsWith("value")) {
            pastLife.choices[pastLife.choices.length - 1].value = value;
          }
        } else if (key.startsWith("past-weapon")) {
          pastLife.choices.push({ type: "weapon", value: value });
        } else {
          pastLife.choices.push({ type: "boon", value: value });
        }
      } else if (key.startsWith("boon")) {
        moreBoons.push(value);
      }
    };

    // Name
    character.name = formdata.get("name") ?? "";

    // Race
    race.addBoons(character);
    race.applyAttributeModifiers(character);
    character.race = race;

    // Attributes
    character.attributes.physique.raw += Number(formdata.get("physique")) ?? -4
    character.attributes.precision.raw += Number(formdata.get("precision")) ?? -4
    character.attributes.intuition.raw += Number(formdata.get("intuition")) ?? -4
    character.attributes.smarts.raw += Number(formdata.get("smarts")) ?? -4
    character.attributes.wit.raw += Number(formdata.get("wit")) ?? -4
    character.attributes.soul.raw += Number(formdata.get("soul")) ?? -4

    // Weapons Training
    let weapon = formdata.get("weapon1");
    if (weapon !== "none") character.weaponsTraining.push(CombatTraining[weapon]);
    weapon = formdata.get("weapon2");
    if (weapon !== "none") character.weaponsTraining.push(CombatTraining[weapon]);

    // Archetype
    archetype.applyBonuses(character);
    character.archetype = archetype;

    // Lore
    character.lore.appearance = formdata.get("appearance") ?? "";
    character.lore.socialCircle = formdata.get("socialCircle") ?? "";
    character.lore.regionalKnowledge = formdata.get("regionalKnowledge") ?? "";
    character.lore.call = formdata.get("call") ?? "";
    character.lore.quirks = formdata.get("quirks") ?? "";
    character.lore.religion = formdata.get("religion") ?? "";
    character.lore.oath = formdata.get("oath") ?? "";
    character.lore.politics = formdata.get("politics") ?? "";
    character.lore.organizations = formdata.get("organizations") ?? "";
    character.lore.backstory = formdata.get("backstory") ?? "";

    // Traits
    const traitName = formdata.get("trait-name");
    const traitSkill = formdata.get("trait-skill");
    if (traitName !== "") character.specializations.push({ name: traitName, skill: traitSkill, value: 20 });
    const flawName = formdata.get("flaw-name");
    const flawSkill = formdata.get("flaw-skill");
    if (flawName !== "") character.specializations.push({ name: flawName, skill: flawSkill, value: 20 });

    let path = formdata.get("path");
    const pathBoon = Boons[path];
    character.boons[pathBoon.category].push(pathBoon);

    // Combat Pools
    let bonus = Math.max(character.attributes.physique.raw, character.attributes.precision.raw);
    character.health.max = character.health.current = 10 + Math.ceil(bonus / 2);
    bonus = Math.max(character.attributes.intuition.raw, character.attributes.smarts.raw);
    character.energy.max = character.energy.current = 10 + Math.ceil(bonus / 2);
    bonus = Math.max(character.attributes.wit.raw, character.attributes.soul.raw);
    character.mana.max = character.mana.current = 10 + Math.ceil(bonus / 2);

    // More Boons
    moreBoons.forEach((value) => {
      if (value !== "") {
        const boon = Boons[value];
        character.boons[boon.category].push(boon);
      }
    });

    // character.calcSkills();
    Object.keys(character.attributes).forEach((attrKey) => {
      // console.log(attrKey,attrVal);
      let skills = character.attributes[attrKey];
      Object.keys(skills).slice(1).forEach((sKey) => {
        skills[sKey] = skills.raw * 5;
        if (skills.raw > 0) {
          skills[sKey] = Math.ceil((skills[sKey] + 1) / 2)
        }
      });
    });
    race.applySkillModifiers(character);

    // Past Life: depends on calcSkills
    pastLife.applyChoices(character);
    pastLife.applyModifiers(character);
    Object.values(character.boons).forEach((category) => {
      category.forEach((boon) => {
        if (boon.apply) {
          boon.apply(character);
        }
      });
    });
    character.pastLife = pastLife;

    // Preferred Skills: depends on calcSkills
    let skillInterest = formdata.get("skill-interest1");
    if (skillInterest !== "none") {
      let split = skillInterest.split(".");
      character.attributes[split[0]][split[1]] = Math.ceil((character.attributes[split[0]][split[1]] + 1) / 5) * 5;
    }
    skillInterest = formdata.get("skill-interest2");
    if (skillInterest !== "none") {
      let split = skillInterest.split(".");
      character.attributes[split[0]][split[1]] = Math.ceil((character.attributes[split[0]][split[1]] + 1) / 5) * 5;
    }

    const characterString = JSON.stringify(character);
    console.log(character);
    const response = await fetch("saveCharacter.php?name=" + character.name, {
      method: "POST",
      body: characterString,
    });
    // const queryParams = new URLSearchParams();
    // queryParams.append("character", characterString);
    // const redirect = `/char-sheet.html?${queryParams.toString()}`
    if (response.ok) window.open(`/sheet.html?name=${character.name}`, '_blank');
  });
}