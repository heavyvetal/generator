class SpeedProcessor extends FuzzySystemProcessor {
    constructor(defs, properties, system, linguisticVariable, term, rule) {
        super(defs, properties, system)

        this.MARKS = new linguisticVariable('Оцінки', [1, 12])
        this.ACTIVITY = new linguisticVariable('Активність', [1, 100])
        this.PRODUCTIVITY = new linguisticVariable('Продуктивність', [0, 11])
        this.SPEED = new linguisticVariable('Швидкість засвоєння', [0, 100])

        this.MARKS.addTerm(new term('Погано', 'trapeze', [0,1,5,7]))
        this.MARKS.addTerm(new term('Добре', 'trapeze', [5,7,9,10]))
        this.MARKS.addTerm(new term('Відмінно', 'trapeze', [9,10,12,12]))

        this.ACTIVITY.addTerm(new term('Неактивний', 'trapeze', [0,0,40,60]));
        this.ACTIVITY.addTerm(new term('Активний', 'trapeze', [40,60,100,100]));

        this.PRODUCTIVITY.addTerm(new term('Погано', 'trapeze', [0,0,3,4]));
        this.PRODUCTIVITY.addTerm(new term('Добре', 'trapeze', [3,4,7,8]));
        this.PRODUCTIVITY.addTerm(new term('Відмінно', 'trapeze', [7,8,11,11]));

        this.SPEED.addTerm(new term('Погано', 'trapeze', [0,0,30,40]));
        this.SPEED.addTerm(new term('Добре', 'trapeze', [30,40,70,80]));
        this.SPEED.addTerm(new term('Відмінно', 'trapeze', [70,80,100,100]));

        this.system.inputs = [this.MARKS, this.ACTIVITY, this.PRODUCTIVITY];
        this.system.outputs = [this.SPEED];

        this.system.rules = [
            /*----------Оцінка----Активність--Продуктивність--Швидкість--------*/
            new rule(['Відмінно', 'Активний', 'Відмінно'], ['Відмінно'], 'and'),
            new rule(['Відмінно', 'Неактивний', 'Відмінно'], ['Відмінно'], 'and'),
            new rule(['Відмінно', 'Активний', 'Добре'], ['Відмінно'], 'and'),
            new rule(['Відмінно', 'Неактивний', 'Добре'], ['Добре'], 'and'),
            new rule(['Добре', 'Активний', 'Відмінно'], ['Відмінно'], 'and'),
            new rule(['Добре', 'Неактивний', 'Відмінно'], ['Добре'], 'and'),
            new rule(['Погано', 'Активний', 'Добре'], ['Добре'], 'and'),
            new rule(['Погано', 'Неактивний', 'Добре'], ['Погано'], 'and'),
            new rule(['Добре', 'Активний', 'Погано'], ['Добре'], 'and'),
            new rule(['Добре', 'Неактивний', 'Погано'], ['Погано'], 'and'),
            new rule(['Погано', 'Активний', 'Погано'], ['Погано'], 'and'),
            new rule(['Погано', 'Неактивний', 'Погано'], ['Погано'], 'and'),
            // Additional rules
            new rule(['Погано', 'Активний', 'Відмінно'], ['Добре'], 'and'),
            new rule(['Відмінно', 'Неактивний', 'Погано'], ['Добре'], 'and'),
            new rule(['Добре', 'Активний', 'Добре'], ['Добре'], 'and'),
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