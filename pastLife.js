export class PastLife {
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

export class Bard extends PastLife {
	setModifiers(attributes) {
		this.modifiers = [
			{attribute: attributes.intuition.diplaomacy, modifier: 5}, 
      // TODO: Performance 15
    ];
	}
}

export class Noble extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.intuition.diplomacy, modifier: 10 },
      { attribute: attributes.physique.intimidation, modifier: 5 },
    ];
  }
}

export class Burglar extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.precision.hide, modifier: 10 },
      // TODO: Boon: Criminal Contacts
    ];
  }
}

export class Highwayman extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.intimidation, modifier: 15 },
    ];
  }
}

export class Huntsman extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Animals 10
      // TODO: Nature 5
    ];
  }
}

export class Brewer extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 10 },
      { attribute: attributes.soul.alchemy, modifier: 5 },
    ];
  }
}

export class Priest extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Religion 20
      { attribute: attributes.soul.readPerson, modifier: 5 },
    ];
  }
}

export class Monk extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Magic 10
      // TODO: Religion 10
    ];
  }
}

export class Academic extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.alchemy, modifier: 10 },
      // TODO: History 15
    ];
  }
}

export class Apprentice extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 5 },
      // TODO: Specialization of your choice 10
    ];
  }
}

export class Steward extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.wit.business, modifier: 10 },
      // TODO: No secondary
    ];
  }
}

export class Farmer extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.strength, modifier: 10 },
      // TODO: No secondary
    ];
  }
}

export class Soldier extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.readPerson, modifier: 5 },
      // TODO: 1 Extra Weapon's Training
    ];
  }
}

export class StreetUrchin extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.precision.pickpocket, modifier: 10 },
      { attribute: attributes.intuition.diplomacy, modifier: 5 },
    ];
  }
}

export class Peasant extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.physique.strength, modifier: 5 },
      // TODO: Nature 10
    ];
  }
}

export class MagicInitiate extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      { attribute: attributes.soul.readPerson, modifier: 5 },
      { attribute: attributes.soul.alchemy, modifier: 10 },
    ];
  }
}

export class Sailor extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Swimming
      // TODO: Climbing
    ];
  }
}

export class NoviceHealer extends PastLife {
  setModifiers(attributes) {
    this.modifiers = [
      // TODO: Medicine 15
    ];
  }
}
