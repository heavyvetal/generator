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

let outputs = [
    {
        'processor': new SpeedProcessor(speedDefinitions),
        'order': 0,
    },
    {
        'processor': new DiligenceProcessor(diligenceDefinitions),
        'order': 1,
    },
    {
        'processor': new RecommendationProcessor(recommendationDefinitions),
        'order': 0,
    },
    {
        'processor': new ActivityProcessor(activityDefinitions, properties['activity']),
        'order': 0,
    },
    {
        'processor': new InterestProcessor(interestDefinitions, properties['interest']),
        'order': 0,
    },
    {
        'processor': new ProductivityProcessor(productivityDefinitions, properties['productivity']),
        'order': 0,
    },
    {
        'processor': new BehaviorProcessor(behaviorDefinitions, properties['behavior']),
        'order': 0,
    },
    {
        'processor': new HomeworkProcessor(homeworkDefinitions, properties['homework']),
        'order': 2,
    },
]

createForm()
setInputValues()

/* --- Listeners --- */
addEventListener('input', function () {
    setInputValues()
})

let checkboxes = document.querySelectorAll("input[type=checkbox]")
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        Array.from(checkboxes).map(i => {
            properties[i.name].use = i.checked
        })
    })
})

form.onsubmit = function (e) {
    e.preventDefault()
    setInputValues()

    let review = ''
    let studentName = document.querySelector('#student').value

    if (studentName) {
        for (output of outputs) {
            if (output.processor instanceof SpeedProcessor) {
                outputs[0].processor.definitions = speedDefinitionsNamePrepared
            }
        }
    }

    outputs.sort(function(a, b) {
        return a.order > b.order ? 1 : a.order < b.order ? -1 : 0
    })

    for (output of outputs) {
        let estimation = output.processor.estimate()
        let definition = estimation['definition']
        // if (processor instanceof DiligenceProcessor) review += estimation['value']

        if (studentName && output === outputs[0] && definition) {
            review += `${studentName} `
            definition = definition.toLowerCase()
        }

        review += definition + ' '
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

function createForm() {
    form.innerHTML += `
<div class="form-group">
    <div>Ім'я:</div>
    <input id="student" type="text">
</div>
`
    for (let property in properties) {
        form.innerHTML += `
<div id="${property}" class="form-group">
    <div>${properties[property].title}:</div>
    <div class="row">
        <input type="range" 
            id="${property}_slider"  name="${property}_slider" 
            min="${properties[property].range[0]}" 
            max="${properties[property].range[1]}" value="50">
        <input class="number-input" type="text">
        <input type="checkbox" name="${property}" ${properties[property].use ? 'checked' : ''}>
    </div>
</div>
    `
    }

    form.innerHTML += '<input type="submit" class="btn btn-primary" value="Генерувати">'
}