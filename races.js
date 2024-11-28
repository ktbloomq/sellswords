export class Race {
    modifiers;
    applyAttributeModifiers(attributes) {
        this.setModifiers(attributes);
        this.modifiers.forEach((e) => {
            Object.keys(e.attribute).forEach((key) => {
                e.attribute[key] += e.modifier;
            });
        });
        return attributes;
    }
}

export class Human extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.physical.physique, modifier: 5}, 
            {attribute: attributes.spiritual.soul, modifier: 5},
            {attribute: attributes.spiritual.wit, modifier: 3} // TODO: replace with user bonus
        ];
    }
}

export class Elf extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.physical.precision, modifier: 5}, 
            {attribute: attributes.mental.smarts, modifier: 5}
        ];
    }
}

export class Dwarf extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.physical.physique, modifier: 5}, 
            {attribute: attributes.physical.precision, modifier: 5}
        ];
    }
}

export class Esborn extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.physical.physique, modifier: 15},
        ];
    }
}

export class Orc extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.physical.physique, modifier: 5}, 
            {attribute: attributes.spiritual.wit, modifier: 5}
        ];
    }
}

export class Catfolk extends Race {
    setModifiers(attributes) {
        this.modifiers = [
            {attribute: attributes.mental.intuition, modifier: 5}, 
            {attribute: attributes.spiritual.wit, modifier: 5}
        ];
    }
}