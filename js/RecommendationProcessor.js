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
        this.RECOMMENDATION.addTerm(new Term('No', 'trapeze', [0,0,30,40]))
        this.RECOMMENDATION.addTerm(new Term('Yes', 'trapeze', [30,40,100,100]))

        this.system.inputs = [this.MARKS, this.ATTENDANCE]
        this.system.outputs = [this.RECOMMENDATION]

        this.system.rules = [
            new Rule(['Погано', 'Погано'], ['Yes'], 'and'),
            new Rule(['Добре', 'Добре'], ['No'], 'and'),
            new Rule(['Добре', 'Погано'], ['No'], 'and'),
            new Rule(['Погано', 'Добре'], ['Yes'], 'and'),
        ];
    }

    estimate() {
        let value = this.system.getPreciseOutput([
            characteristics['average_mark'].value,
            characteristics['homework'].value
        ])

        let definition = ''
        let highTermEdge = this.system.outputs[0].terms[1].mfParams[1]

        if (value > highTermEdge) {
            let highDefinitions = this.definitions[0]
            definition = this.getRandomDefinition(highDefinitions)
        }

        return {
            'value': value,
            'definition': definition
        }
    }
}