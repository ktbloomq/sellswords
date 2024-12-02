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
      () => {character.specializations.push({Performance: 15})},
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
      // TODO: Boon: Criminal Contacts
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
      () => {character.specializations.push({Animals: 10})},
      () => {character.specializations.push({Nature: 5})},
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
      () => {character.specializations.push({Religion: 20})},
      () => {character.attributes.soul.readPerson += 5},
    ];
  }
}

export class Monk extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({Magic: 10})},
      () => {character.specializations.push({Religion: 10})},
    ];
  }
}

export class Academic extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.attributes.soul.alchemy += 10},
      () => {character.specializations.push({History: 15})},
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
      () => {character.specializations.push({Nature: 10})},
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
      // TODO: Swimming
      // TODO: Climbing
    ];
  }
}

export class NoviceHealer extends PastLife {
  setModifiers(character) {
    this.modifiers = [
      () => {character.specializations.push({Medicine: 15})},
    ];
  }
}
