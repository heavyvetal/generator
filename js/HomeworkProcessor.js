class HomeworkProcessor extends SimpleLogicProcessor {
    constructor(defs, input) {
        super(defs, input)
    }

    estimate() {
        let value = this.input.value
        let definition = ''

        if (this.input.use) {
            let range = this.input.range[1] - this.input.range[0]

            if (value > range * 0.95) {
                let highDefinitions = this.definitions[3]
                definition = this.getRandomDefinition(highDefinitions)
            } else if (value > range * 0.75) {
                let preHighDefinitions = this.definitions[2]
                definition = this.getRandomDefinition(preHighDefinitions)
            } else if (value > range * 0.2) {
                let midDefinitions = this.definitions[1]
                definition = this.getRandomDefinition(midDefinitions)
            } else {
                let lowDefinitions = this.definitions[0]
                definition = this.getRandomDefinition(lowDefinitions)
            }
        }

        return {
            'value': value,
            'definition': definition
        }
    }
}