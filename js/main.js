const FIS = fuzzyis.FIS;
const LinguisticVariable = fuzzyis.LinguisticVariable;
const Term = fuzzyis.Term;
const Rule = fuzzyis.Rule;
const form = document.querySelector('#test_form')

let characteristics = {
    'activity': new Characteristic('Активність', [0, 100], 0, true),
    'productivity': new Characteristic('Продуктивність', [0, 11], 0, true),
    'interest': new Characteristic('Інтерес до навчання', [0, 100], 0, true),
    'behavior': new Characteristic('Поведінка', [0, 100], 0, false),
    'homework': new Characteristic('Домашні завдання %', [0, 100], 0, true),
    'average_mark': new Characteristic('Середня оцінка', [0, 12], 0, true),
    'attendance': new Characteristic('Відвідуваність', [0, 100], 0, true),
}

for (let characteristic in characteristics) {
    form.innerHTML += `
        <div id="${characteristic}" class="form-group">
            <div>${characteristics[characteristic].title}:</div>
            <div class="row">
                <input type="range" 
                    id="${characteristic}_slider"  name="${characteristic}_slider" 
                    min="${characteristics[characteristic].range[0]}" 
                    max="${characteristics[characteristic].range[1]}" value="50">
                <input type="text">
                <input type="checkbox" ${characteristics[characteristic].enabled ? 'checked' : ''}>
            </div>
        </div>
    `
}
form.innerHTML += '<input type="submit" class="btn btn-primary" value="Отправить">'

addEventListener('input', function () {
    setInputValues()
});

form.onsubmit = function (e) {
    e.preventDefault()

    setInputValues()

    let paramProcessors = [
        new SpeedProcessor(speedDefinitions),
        new DiligenceProcessor(diligenceDefinitions),
        new RecommendationProcessor(recommendationDefinitions),
        new BehaviorProcessor(behaviorDefinitions),
        new HomeworkProcessor(homeworkDefinitions),
    ]
    let review = ''

    for (let processor of paramProcessors) {
        let estimation = processor.estimate()
        // console.log(processor)
        // console.log(estimation['value'])
        let definition = estimation['definition']
        review += definition
    }

    console.log(review)
}

function setInputValues() {
    for (let characteristic in characteristics) {
        let rangeElem = document.querySelector(`#${characteristic} input[type="range"]`)
        let textElem = document.querySelector(`#${characteristic} input[type="text"]`)
        characteristics[characteristic]['value'] = rangeElem.value
        textElem.value = rangeElem.value
    }
}
