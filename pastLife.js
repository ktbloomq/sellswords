import Boons from "./boons.js";
export class PastLife {
	modifiers;
	applyModifiers(character) {
		this.setModifiers(character);
		this.modifiers.forEach((e) => {
			e();
		});
	}
}

export class Bard extends PastLife {
	setModifiers(character) {
		this.modifiers = [
			() => {character.attributes.intuition.diplomacy += 5}, 
      () => {character.specializations.push({name: "Performance", skill: "bluff", value: 15})},
    ];
	}
}

export class Noble extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.intuition.diplomacy += 10},
      () => {character.attributes.physique.intimidation += 5},
    ];
  }
}

export class Burglar extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.precision.hide += 10},
      () => {character.boons.social.push(Boons.criminalContacts)}
    ];
  }
}

export class Highwayman extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.physique.intimidation += 15},
    ];
  }
}

export class Huntsman extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({name: "Animals", skill: "readPerson", value: 15})},
      () => {character.specializations.push({name: "Nature", skill: "alchemy", value: 15})},
    ];
  }
}

export class Brewer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.wit.business += 10},
      () => {character.attributes.soul.alchemy += 5},
    ];
  }
}

export class Priest extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({name: "Religion", skill: "focus", value: 20})},
      () => {character.attributes.soul.readPerson += 5},
    ];
  }
}

export class Monk extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({name: "Magic", skill: "readPerson", value: 10})},
      () => {character.specializations.push({name: "Religion", skill: "focus", value: 10})},
    ];
  }
}

export class Academic extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.soul.alchemy += 10},
      () => {character.specializations.push({name: "History", skill: "focus", value: 15})},
    ];
  }
}

export class Apprentice extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.wit.business += 5},
      // TODO: Specialization of your choice 10
    ];
  }
}

export class Steward extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.wit.business += 10},
    ];
  }
}

export class Farmer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.physique.strength += 10},
    ];
  }
}

export class Soldier extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.soul.readPerson += 5},
      // TODO: 1 Extra Weapon's Training
    ];
  }
}

export class StreetUrchin extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.precision.pickpocket += 10},
      () => {character.attributes.intuition.diplomacy += 5},
    ];
  }
}

export class Peasant extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.physique.strength += 5},
      () => {character.specializations.push({name: "Nature", skill: "alchemy", value: 10})},
    ];
  }
}

export class MagicInitiate extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.soul.readPerson += 5},
      () => {character.attributes.soul.alchemy += 10},
    ];
  }
}

export class Sailor extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.boons.exploration.push(Boons.swimming)},
      () => {character.boons.exploration.push(Boons.climbing)},
    ];
  }
}

export class NoviceHealer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({name: "Medicine", skill: "alchemy", value: 15})},
    ];
  }
}
