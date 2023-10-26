class SpeedProcessor extends FuzzySystemProcessor {
    constructor(defs) {
        super(defs)

        this.MARKS = new LinguisticVariable('Оцінки', [1, 12])
        this.ACTIVITY = new LinguisticVariable('Активність', [1, 100])
        this.PRODUCTIVITY = new LinguisticVariable('Продуктивність', [0, 11])
        this.SPEED = new LinguisticVariable('Швидкість засвоєння', [0, 100])

        this.MARKS.addTerm(new Term('Погано', 'trapeze', [0,1,5,7]))
        this.MARKS.addTerm(new Term('Добре', 'trapeze', [5,7,9,10]))
        this.MARKS.addTerm(new Term('Відмінно', 'trapeze', [9,10,12,12]))

        this.ACTIVITY.addTerm(new Term('Неактивний', 'trapeze', [0,0,40,60]));
        this.ACTIVITY.addTerm(new Term('Активний', 'trapeze', [40,60,100,100]));

        this.PRODUCTIVITY.addTerm(new Term('Погано', 'trapeze', [0,0,3,4]));
        this.PRODUCTIVITY.addTerm(new Term('Добре', 'trapeze', [3,4,7,8]));
        this.PRODUCTIVITY.addTerm(new Term('Відмінно', 'trapeze', [7,8,11,11]));

        this.SPEED.addTerm(new Term('Погано', 'trapeze', [0,0,30,40]));
        this.SPEED.addTerm(new Term('Добре', 'trapeze', [30,40,70,80]));
        this.SPEED.addTerm(new Term('Відмінно', 'trapeze', [70,80,100,100]));

        this.system.inputs = [this.MARKS, this.ACTIVITY, this.PRODUCTIVITY];
        this.system.outputs = [this.SPEED];

        this.system.rules = [
            /*----------Оцінка----Активність--Продуктивність--Швидкість--------*/
            new Rule(['Відмінно', 'Активний', 'Відмінно'], ['Відмінно'], 'and'),
            new Rule(['Відмінно', 'Неактивний', 'Відмінно'], ['Відмінно'], 'and'),
            new Rule(['Відмінно', 'Активний', 'Добре'], ['Відмінно'], 'and'),
            new Rule(['Відмінно', 'Неактивний', 'Добре'], ['Добре'], 'and'),
            new Rule(['Добре', 'Активний', 'Відмінно'], ['Відмінно'], 'and'),
            new Rule(['Добре', 'Неактивний', 'Відмінно'], ['Добре'], 'and'),
            new Rule(['Погано', 'Активний', 'Добре'], ['Добре'], 'and'),
            new Rule(['Погано', 'Неактивний', 'Добре'], ['Погано'], 'and'),
            new Rule(['Добре', 'Активний', 'Погано'], ['Добре'], 'and'),
            new Rule(['Добре', 'Неактивний', 'Погано'], ['Погано'], 'and'),
            new Rule(['Погано', 'Активний', 'Погано'], ['Погано'], 'and'),
            new Rule(['Погано', 'Неактивний', 'Погано'], ['Погано'], 'and'),
            // Additional rules
            new Rule(['Погано', 'Активний', 'Відмінно'], ['Добре'], 'and'),
            new Rule(['Відмінно', 'Неактивний', 'Погано'], ['Добре'], 'and'),
            new Rule(['Добре', 'Активний', 'Добре'], ['Добре'], 'and'),
        ];
    }

    estimate() {
        let definition = ''
        let value = 0

        if (this.properties['average_mark'].use
            && this.properties['activity'].use
            && this.properties['productivity'].use
        ) {
            value = this.system.getPreciseOutput([
                this.properties['average_mark'].value,
                this.properties['activity'].value,
                this.properties['productivity'].value,
            ])

            let highTerm = this.system.outputs[0].terms[2]
            let midTerm = this.system.outputs[0].terms[1]
            let lowTerm = this.system.outputs[0].terms[0]
            let highTermEdge = (midTerm.mfParams[3] + highTerm.mfParams[0]) / 2
            let lowTermEdge = (lowTerm.mfParams[3] + midTerm.mfParams[0]) / 2

            if (value > highTermEdge) {
                let highDefinitions = this.definitions[2]
                definition = this.getRandomDefinition(highDefinitions)
            } else if (value > lowTermEdge && value <= highTermEdge ) {
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