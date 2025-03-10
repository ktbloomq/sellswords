import Boons from "./boons.js";
import CombatTraining from "./combatTraining.js";
export class PastLife {
  modifiers;
  static pastChoices = {};
  choices = [];
  applyModifiers(character) {
    this.setModifiers(character);
    this.modifiers.forEach((e) => {
      e();
    });
  }
  applyChoices(character) {
    this.choices.forEach((value) => {
      if (value.type === "specialization") {
        value.type = undefined;
        character.specializations.push(value);
      } else if (value.type === "weapon") {
        const weaponType = CombatTraining[value.value];
        character.weaponsTraining.push(weaponType);
      } else {
        const boon = Boons[value];
        character.boons[boon.category].push(boon);
      }
    });
  };
}

export class Bard extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.intuition.diplomacy += 5 },
      () => { character.specializations.push({ name: "Performance", skill: "bluff", value: 15 }) },
    ];
  }
}

export class Noble extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.intuition.diplomacy += 10 },
      () => { character.attributes.physique.intimidation += 5 },
    ];
  }
}

export class Burglar extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.precision.hide += 10 },
      () => { character.boons.social.push(Boons.criminalContacts) }
    ];
  }
}

export class Highwayman extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.physique.intimidation += 15 },
    ];
  }
}

export class Huntsman extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.specializations.push({ name: "Animals", skill: "readPerson", value: 15 }) },
      () => { character.specializations.push({ name: "Nature", skill: "alchemy", value: 15 }) },
    ];
  }
}

export class Brewer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.wit.business += 10 },
      () => { character.attributes.soul.alchemy += 5 },
    ];
  }
}

export class Priest extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.specializations.push({ name: "Religion", skill: "focus", value: 20 }) },
      () => { character.attributes.soul.readPerson += 5 },
    ];
  }
}

export class Monk extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.specializations.push({ name: "Magic", skill: "readPerson", value: 10 }) },
      () => { character.specializations.push({ name: "Religion", skill: "focus", value: 10 }) },
    ];
  }
}

export class Academic extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.soul.alchemy += 10 },
      () => { character.specializations.push({ name: "History", skill: "focus", value: 15 }) },
    ];
  }
}

export class Apprentice extends PastLife {
  static pastChoices = {
    specialization: 10
  }
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.wit.business += 5 },
    ];
  }
}

export class Steward extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.wit.business += 10 },
    ];
  }
}

export class Farmer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.physique.strength += 10 },
    ];
  }
}

export class Soldier extends PastLife {
  static pastChoices = {
    weapon1: [
      CombatTraining.smallWeapon,
      CombatTraining.dualSmallWeapon,
      CombatTraining.oneHandedBlunt,
      CombatTraining.dualOneHandedBlunt,
      CombatTraining.twoHandedBlunt,
      CombatTraining.oneHandedSharp,
      CombatTraining.dualOneHandedSharp,
      CombatTraining.twoHandedSharp,
      CombatTraining.shieldAndWeapon,
      CombatTraining.longbow,
      CombatTraining.warbow,
      CombatTraining.crossbow,
      CombatTraining.heavyCrossbow,
      CombatTraining.polearm,
      CombatTraining.oneHandedAxe,
      CombatTraining.twoHandedAxe,
      CombatTraining.thrownWeapon,
      CombatTraining.grenadier,
      CombatTraining.improvised
    ]
  }
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.soul.readPerson += 5 },
    ];
  }
}

export class StreetUrchin extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.precision.pickpocket += 10 },
      () => { character.attributes.intuition.diplomacy += 5 },
    ];
  }
}

export class Peasant extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.physique.strength += 5 },
      () => { character.specializations.push({ name: "Nature", skill: "alchemy", value: 10 }) },
    ];
  }
}

export class MagicInitiate extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.attributes.soul.readPerson += 5 },
      () => { character.attributes.soul.alchemy += 10 },
    ];
  }
}

export class Sailor extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.boons.exploration.push(Boons.swimming) },
      () => { character.boons.exploration.push(Boons.climbing) },
    ];
  }
}

export class NoviceHealer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => { character.specializations.push({ name: "Medicine", skill: "alchemy", value: 15 }) },
    ];
  }
}
