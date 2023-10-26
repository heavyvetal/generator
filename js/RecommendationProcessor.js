class RecommendationProcessor extends FuzzySystemProcessor {
    constructor(defs) {
        super(defs)

        this.MARKS = new LinguisticVariable('Оцінки', [1, 12])
        this.ATTENDANCE = new LinguisticVariable('Відсоток відвідувань', [0, 100])
        this.RECOMMENDATION = new LinguisticVariable('Необхідність додаткового опрацювання навчального матеріалу', [0, 100])

        this.MARKS.addTerm(new Term('Погано', 'trapeze', [1,1,5,7]))
        this.MARKS.addTerm(new Term('Добре', 'trapeze', [5,7,12,12]))

        this.ATTENDANCE.addTerm(new Term('Погано', 'trapeze', [0,0,60,70]))
        this.ATTENDANCE.addTerm(new Term('Добре', 'trapeze', [60,70,100,100]))

        this.RECOMMENDATION.addTerm(new Term('Ні', 'trapeze', [0,0,30,40]))
        this.RECOMMENDATION.addTerm(new Term('Треба', 'trapeze', [30,40,100,100]))

        this.system.inputs = [this.MARKS, this.ATTENDANCE]
        this.system.outputs = [this.RECOMMENDATION]

        this.system.rules = [
            new Rule(['Погано', 'Погано'], ['Треба'], 'and'),
            new Rule(['Добре', 'Добре'], ['Ні'], 'and'),
            new Rule(['Добре', 'Погано'], ['Ні'], 'and'),
            new Rule(['Погано', 'Добре'], ['Треба'], 'and'),
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