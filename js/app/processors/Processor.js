class Processor {
    constructor(defs) {
        this.definitions = defs
    }

    getRandomDefinition(defs) {
        return defs[Math.floor(Math.random() * defs.length)]
    }
}