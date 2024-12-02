export class Race {
	modifiers;
	applyModifiers(character) {
		this.setModifiers(character);
		this.modifiers.forEach((e) => {
			e();
		});
	}
	propagateSkills(attribute, value) {
    Object.keys(attribute).forEach((key) => {
      attribute[key] += value;
    });
  }
}

export class Human extends Race {
	setModifiers(character, custom = "wit") {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.physique, 5)}, 
			() => {this.propagateSkills(character.attributes.soul, 5)},
			() => {this.propagateSkills(character.attributes[custom], 3)} // TODO: replace with user bonus
		];
	}
}

export class Elf extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.precision, 5)}, 
			() => {this.propagateSkills(character.attributes.smarts, 5)}
		];
	}
}

export class Dwarf extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.physique, 5)}, 
			() => {this.propagateSkills(character.attributes.precision, 5)}
		];
	}
}

export class Esborn extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.physique, 15)},
		];
	}
}

export class Orc extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.physique, 5)}, 
			() => {this.propagateSkills(character.attributes.wit, 5)}
		];
	}
}

export class Catfolk extends Race {
	setModifiers(character) {
		this.modifiers = [
			() => {this.propagateSkills(character.attributes.intuition, 5)}, 
			() => {this.propagateSkills(character.attributes.wit, 5)}
		];
	}
}