class Race {
    applyAttributeBoosts(attributes) {
        return attributes;
    }
}
class Elf extends Race {
    applyAttributeBoosts(attributes) {
        attributes.precision.base += 5;
        attributes.smarts.base += 5;
        return attributes;
    }
}
export class Player {
    race;
    attributes = {
        "physical": {
            "physique": {
                "base": -4,
                "intimidation": -4,
                "strength": -4
            },
            "precision": {
                "base": -4,
                "pickpocket": -4,
                "hide": -4
            }
        },
        "mental": {
            "intuition": {
                "base": -4,
                "blend": -4,
                "diplomacy": -4
            },
            "smarts": {
                "base": -4,
                "focus": -4,
                "tinkering": -4
            }
        },
        "spiritual": {
            "wit": {
                "base": -4,
                "business": -4,
                "bluff": -4
            },
            "soul": {
                "base": -4,
                "readPerson": -4,
                "alchemy": -4
            }
        }
    }
    level;
    health = {
        "current": 0,
        "max": 0,
    };
    energy = {
        "current": 0,
        "max": 0
    };
    mana = {
        "current": 0,
        "max": 0
    };
    freeActions;
    actions;
    actionDice;
    actionDiceType;
    applyRace(r) {
        this.race = r;
        this.attributes = this.race.applyAttributeBoosts(this.attributes)
    }
}