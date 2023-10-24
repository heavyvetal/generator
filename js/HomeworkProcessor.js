class HomeworkProcessor extends Processor {
    constructor(defs) {
        super(defs)

        this.definitions = defs
    }

    estimate() {
        let value = characteristics['homework'].value

        let definition = ''

        if (value > 95) {
            let highDefinitions = this.definitions[3]
            definition = this.getRandomDefinition(highDefinitions)
        } else if (value > 75) {
            let preHighDefinitions = this.definitions[2]
            definition = this.getRandomDefinition(preHighDefinitions)
        } else if (value > 20) {
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