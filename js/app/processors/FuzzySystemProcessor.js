class FuzzySystemProcessor extends Processor {
    constructor(defs, properties, system) {
        super(defs)
        this.properties = properties
        this.system = new system
    }
}