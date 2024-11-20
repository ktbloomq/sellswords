class Race {
    abilities = {
        "physical": {
            "base":0,
            "physique":0,
            "precision":0
        },
        "mental": {
            "base":0,
            "intuition":0,
            "smarts":0
        },
        "spiritual": {
            "base":0,
            "wit":0,
            "soul":0,
        }
    }
}
class Player {
    race = new Race()
    level;
    freeActions;
    actions;
    actionDice;
    actionDiceType;
    attributes;
    constructor() {}
}