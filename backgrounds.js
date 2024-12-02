export class Background {
	modifiers;
	applyModifiers(attributes) {
		this.setModifiers(attributes);
		this.modifiers.forEach((e) => {
			Object.keys(e.attribute).forEach((key) => {
				e.attribute[key] += e.modifier;
			});
		});
		return attributes;
	}
}

export class Bard extends Background {
	setModifiers(attributes) {
		this.modifiers = [
			{attribute: attributes.intuition.diplaomacy, modifier: 5}, 
      // TODO: Performance 15
    ];
	}
}

export class Noble extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.intuition.diplomacy, modifier: 10 },
      { attribute: attributes.physique.intimidation, modifier: 5 },
    ];
  }
}

export class Burglar extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.precision.hide, modifier: 10 },
      // TODO: Boon: Criminal Contacts
    ];
  }
}

export class Highwayman extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.intimidation, modifier: 15 },
    ];
  }
}

export class Huntsman extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Animals 10
      // TODO: Nature 5
    ];
  }
}

export class Brewer extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 10 },
      { attribute: attributes.soul.alchemy, modifier: 5 },
    ];
  }
}

export class Priest extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Religion 20
      { attribute: attributes.soul.readPerson, modifier: 5 },
    ];
  }
}

export class Monk extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Magic 10
      // TODO: Religion 10
    ];
  }
}

export class Academic extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.alchemy, modifier: 10 },
      // TODO: History 15
    ];
  }
}

export class Apprentice extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 5 },
      // TODO: Specialization of your choice 10
    ];
  }
}

export class Steward extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 10 },
      // TODO: No secondary
    ];
  }
}

export class Farmer extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.strength, modifier: 10 },
      // TODO: No secondary
    ];
  }
}

export class Soldier extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.readPerson, modifier: 5 },
      // TODO: 1 Extra Weapon's Training
    ];
  }
}

export class StreetUrchin extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.precision.pickpocket, modifier: 10 },
      { attribute: attributes.intuition.diplomacy, modifier: 5 },
    ];
  }
}

export class Peasant extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.strength, modifier: 5 },
      // TODO: Nature 10
    ];
  }
}

export class MagicInitiate extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.readPerson, modifier: 5 },
      { attribute: attributes.soul.alchemy, modifier: 10 },
    ];
  }
}

export class Sailor extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Swimming
      // TODO: Climbing
    ];
  }
}

export class NoviceHealer extends Background {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Medicine 15
    ];
  }
}
