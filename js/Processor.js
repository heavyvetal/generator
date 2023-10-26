class Processor {
    constructor(defs) {
        this.definitions = defs
        this.properties = properties
    }

    getRandomDefinition(defs) {
        return defs[Math.floor(Math.random() * defs.length)]
    }
}