import * as Races from "./races.js";
export class Player {
    race;
    attributes = {
        "physical": {
            "physique": {
                "raw": -4,
                "intimidation": -4,
                "strength": -4
            },
            "precision": {
                "raw": -4,
                "pickpocket": -4,
                "hide": -4
            }
        },
        "mental": {
            "intuition": {
                "raw": -4,
                "blend": -4,
                "diplomacy": -4
            },
            "smarts": {
                "raw": -4,
                "focus": -4,
                "tinkering": -4
            }
        },
        "spiritual": {
            "wit": {
                "raw": -4,
                "business": -4,
                "bluff": -4
            },
            "soul": {
                "raw": -4,
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
        this.attributes = this.race.applyAttributeModifiers(this.attributes);
    }
}