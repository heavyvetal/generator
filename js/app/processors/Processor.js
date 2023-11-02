class Processor {
    constructor(defs) {
        this.definitions = defs
        this.softMode = true
    }

    getRandomDefinition(defs) {
        return defs[Math.floor(Math.random() * defs.length)]
    }
}