class DiligenceProcessor extends FuzzySystemProcessor {
    constructor(defs) {
        super(defs)

        this.MARKS = new LinguisticVariable('Оцінки', [1, 12])
        this.HOMEWORK = new LinguisticVariable('Відсоток виконань ДЗ', [0, 100])
        this.DILIGENCE = new LinguisticVariable('Старанність', [0, 100])

        this.MARKS.addTerm(new Term('Погано', 'trapeze', [1,1,7,10]))
        this.MARKS.addTerm(new Term('Добре', 'trapeze', [7,10,12,12]))
        this.HOMEWORK.addTerm(new Term('Погано', 'trapeze', [0,0,60,70]));
        this.HOMEWORK.addTerm(new Term('Добре', 'trapeze', [60,70,100,100]));
        this.DILIGENCE.addTerm(new Term('Нестаранний', 'trapeze', [0,0,40,50]));
        this.DILIGENCE.addTerm(new Term('Старанний', 'trapeze', [50,60,100,100]));

        this.system.inputs = [this.MARKS, this.HOMEWORK];
        this.system.outputs = [this.DILIGENCE];

        this.system.rules = [
            new Rule(['Добре', 'Добре'], ['Старанний'], 'and'),
            new Rule(['Погано', 'Погано'], ['Нестаранний'], 'and'),
            new Rule(['Добре', 'Погано'], ['Нестаранний'], 'and'),
            new Rule(['Погано', 'Добре'], ['Нестаранний'], 'and'),
        ];
    }

    estimate() {
        let value = this.system.getPreciseOutput([
            characteristics['average_mark'].value,
            characteristics['homework'].value
        ])

        let definition = ''
        let highTermEdge = this.system.outputs[0].terms[1].mfParams[1]
        let lowTermEdge = this.system.outputs[0].terms[0].mfParams[3]

        if (value > highTermEdge) {
            let highDefinitions = this.definitions[1]
            definition = this.getRandomDefinition(highDefinitions)
        } else if (lowTermEdge) {
            let lowDefinitions = this.definitions[0]
            definition = this.getRandomDefinition(lowDefinitions)
        }

        return {
            'value': value,
            'definition': definition
        }
    }
}