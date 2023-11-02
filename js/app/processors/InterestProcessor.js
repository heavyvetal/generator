class InterestProcessor extends SimpleLogicProcessor {
    constructor(defs, input) {
        super(defs, input)
    }

    estimate() {
        let value = this.input.value
        let definition = ''

        if (this.input.use) {
            let range = this.input.range[1] - this.input.range[0]

            if (value > range * 0.65) {
                let highDefinitions = this.definitions[1]
                definition = this.getRandomDefinition(highDefinitions)
            } else {
                // This blocker is designed to soften the response
                if (!this.softMode) {
                    let highDefinitions = this.definitions[0]
                    definition = this.getRandomDefinition(highDefinitions)
                }
            }
        }
        return {
            'value': value,
            'definition': definition
        }
    }
}