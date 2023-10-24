class BehaviorProcessor extends Processor {
    constructor(defs) {
        super(defs)

        this.definitions = defs
    }

    estimate() {
        let value = characteristics['behavior'].value

        let definition = ''

        if (value > 70) {
            let highDefinitions = this.definitions[2]
            definition = this.getRandomDefinition(highDefinitions)
        } else if (value > 30) {
            let midDefinitions = this.definitions[1]
            definition = this.getRandomDefinition(midDefinitions)
        } else {
            let lowDefinitions = this.definitions[0]
            definition = this.getRandomDefinition(lowDefinitions)
        }

        return {
            'value': value,
            'definition': definition
        }
    }
}