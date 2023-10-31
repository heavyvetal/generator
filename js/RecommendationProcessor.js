class RecommendationProcessor extends FuzzySystemProcessor {
    constructor(defs, properties, system, linguisticVariable, term, rule) {
        super(defs, properties, system)

        this.MARKS = new linguisticVariable('Оцінки', [1, 12])
        this.ATTENDANCE = new linguisticVariable('Відсоток відвідувань', [0, 100])
        this.RECOMMENDATION = new linguisticVariable('Необхідність додаткового опрацювання навчального матеріалу', [0, 100])

        this.MARKS.addTerm(new term('Погано', 'trapeze', [1,1,5,7]))
        this.MARKS.addTerm(new term('Добре', 'trapeze', [5,7,12,12]))

        this.ATTENDANCE.addTerm(new term('Погано', 'trapeze', [0,0,60,70]))
        this.ATTENDANCE.addTerm(new term('Добре', 'trapeze', [60,70,100,100]))

        this.RECOMMENDATION.addTerm(new term('Ні', 'trapeze', [0,0,30,40]))
        this.RECOMMENDATION.addTerm(new term('Треба', 'trapeze', [30,40,100,100]))

        this.system.inputs = [this.MARKS, this.ATTENDANCE]
        this.system.outputs = [this.RECOMMENDATION]

        this.system.rules = [
            new rule(['Погано', 'Погано'], ['Треба'], 'and'),
            new rule(['Добре', 'Добре'], ['Ні'], 'and'),
            new rule(['Добре', 'Погано'], ['Ні'], 'and'),
            new rule(['Погано', 'Добре'], ['Треба'], 'and'),
        ];
    }

    estimate() {
        let definition = ''
        let value = 0

        if (this.properties['average_mark'].use && this.properties['attendance'].use) {
            value = this.system.getPreciseOutput([
                this.properties['average_mark'].value,
                this.properties['attendance'].value
            ])

            let highTerm = this.system.outputs[0].terms[1]
            let lowTerm = this.system.outputs[0].terms[0]
            // Intersection of terms
            let highTermEdge = (lowTerm.mfParams[3] + highTerm.mfParams[0]) / 2

            if (value > highTermEdge) {
                let highDefinitions = this.definitions[0]
                definition = this.getRandomDefinition(highDefinitions)
            }
        }

        return {
            'value': value,
            'definition': definition
        }
    }
}