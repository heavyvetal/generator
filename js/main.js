const FIS = fuzzyis.FIS;
const LinguisticVariable = fuzzyis.LinguisticVariable;
const Term = fuzzyis.Term;
const Rule = fuzzyis.Rule;
const form = document.querySelector('#main_form')
const reviewUI = document.querySelector('#review')

// Input properties
let properties = {
    'activity': new Characteristic('Активність', [0, 100], true),
    'productivity': new Characteristic('Продуктивність', [0, 11], true),
    'interest': new Characteristic('Інтерес до навчання', [0, 100], true),
    'behavior': new Characteristic('Поведінка', [0, 100], false),
    'homework': new Characteristic('Домашні завдання %', [0, 100], true),
    'average_mark': new Characteristic('Середня оцінка', [0, 12], true),
    'attendance': new Characteristic('Відвідуваність', [0, 100], true),
}

// Outputs processors
let fuzzyProcessors = [
    new SpeedProcessor(speedDefinitions),
    new DiligenceProcessor(diligenceDefinitions),
    new RecommendationProcessor(recommendationDefinitions),
]
let simpleProcessors = [
    new ActivityProcessor(activityDefinitions, properties['activity']),
    new InterestProcessor(interestDefinitions, properties['interest']),
    new ProductivityProcessor(productivityDefinitions, properties['productivity']),
    new BehaviorProcessor(behaviorDefinitions, properties['behavior']),
    new HomeworkProcessor(homeworkDefinitions, properties['homework']),
]

/* ---  UI object creation --- */
for (let property in properties) {
    form.innerHTML += `
        <div id="${property}" class="form-group">
            <div>${properties[property].title}:</div>
            <div class="row">
                <input type="range" 
                    id="${property}_slider"  name="${property}_slider" 
                    min="${properties[property].range[0]}" 
                    max="${properties[property].range[1]}" value="50">
                <input type="text">
                <input type="checkbox" name="${property}" ${properties[property].use ? 'checked' : ''}>
            </div>
        </div>
    `
}

form.innerHTML += '<input type="submit" class="btn btn-primary" value="Отправить">'

setInputValues()

/* --- Listeners --- */
addEventListener('input', function () {
    setInputValues()
});

let checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        Array.from(checkboxes).map(i => {
            properties[i.name].use = i.checked
        })
    })
});

form.onsubmit = function (e) {
    e.preventDefault()

    setInputValues()

    let review = ''

    // Fuzzy systems
    for (let processor of fuzzyProcessors) {
        let estimation = processor.estimate()
        let definition = estimation['definition']
        // if (processor instanceof DiligenceProcessor) review += estimation['value']
        review += definition
    }

    // Simple systems
    for (let processor of simpleProcessors) {
        if (processor) {
            let estimation = processor.estimate()
            let definition = estimation['definition']

            if (processor.input.use) {
                review += definition
            }
        }
    }

    //console.log(review)
    reviewUI.innerHTML = review
}

function setInputValues() {
    for (let property in properties) {
        let rangeElem = document.querySelector(`#${property} input[type="range"]`)
        let textElem = document.querySelector(`#${property} input[type="text"]`)
        properties[property].value = rangeElem.value
        textElem.value = rangeElem.value
    }
}
