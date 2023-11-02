setTimeout(() => {main()}, 1000)

function main() {
    const FIS = fuzzyis.FIS;
    const LinguisticVariable = fuzzyis.LinguisticVariable;
    const Term = fuzzyis.Term;
    const Rule = fuzzyis.Rule;

    document.querySelector('body').insertAdjacentHTML("beforeend", additionalHTML())

    const reviewUI = document.querySelector('#review')
    const form = document.querySelector('#main_form')

    let properties = {
        'activity': new Characteristic('Активність', [0, 100], true),
        'productivity': new Characteristic('Продуктивність', [0, 100], true),
        'interest': new Characteristic('Інтерес до навчання', [0, 100], false),
        'behavior': new Characteristic('Поведінка', [0, 100], false),
        'homework': new Characteristic('Домашні завдання %', [0, 100], true),
        'average_mark': new Characteristic('Середня оцінка', [0, 12], true),
        'attendance': new Characteristic('Відвідуваність', [0, 100], true),
    }

    let outputs = [
        {
            'processor': new SpeedProcessor(
                speedDefinitions,
                properties,
                FIS,
                LinguisticVariable,
                Term,
                Rule
            ),
            'order': 0,
        },
        {
            'processor': new DiligenceProcessor(
                diligenceDefinitions,
                properties,
                FIS,
                LinguisticVariable,
                Term,
                Rule
            ),
            'order': 1,
        },
        {
            'processor': new RecommendationProcessor(
                recommendationDefinitions,
                properties,
                FIS,
                LinguisticVariable,
                Term,
                Rule
            ),
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

    createForm(form, properties)
    setInputValues(properties)

    /* -----------------------------------
                  Listeners
    ------------------------------------ */
    /*
     * Renew input values after using range sliders
     */
    addEventListener('input', function () {
        setInputValues(properties)
    })

    /*
     * Linking checkboxes and input properties
     */
    let checkboxes = document.querySelectorAll("#main_form input[type=checkbox]")

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            Array.from(checkboxes).map(i => {
                properties[i.name].use = i.checked
            })
        })
    })

    /*
     * "Copy to clipboard" functionality
     */
    const copyRecUI = document.querySelector('#review_wrapper .copy_rec')

    reviewUI.addEventListener('click', function () {
        navigator.clipboard.writeText(reviewUI.innerText)

        copyRecUI.style.display = 'block'
        setTimeout(() => {
            copyRecUI.style.display = 'none'
        }, 1000)
    })

    const studentNameFormUI = document.querySelector('#student')
    let studentName = ''

    /*
     * Main generation logic starts on submitting the form
     */
    form.onsubmit = function (e) {
        e.preventDefault()
        setInputValues()

        let review = ''
        let studentName = studentNameFormUI.value

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

            if (studentName && output === outputs[0] && definition) {
                review += `${studentName} `
                definition = definition.toLowerCase()
            }

            review += definition + ' '
        }

        reviewUI.innerHTML = review

        const inputContainerUI = document.querySelector('md-input-container [ng-model="comment.comment"]')

        inputContainerUI.value = review
        inputContainerUI.classList.remove('ng-empty')
        inputContainerUI.classList.remove('ng-pristine')
        inputContainerUI.classList.add('ng-not-empty')
        inputContainerUI.classList.add('ng-dirty')
        inputContainerUI.classList.add('ng-valid-parse')
        inputContainerUI.focus()
    }

    const generator_btn = document.querySelector('#generator_btn')
    const form_wrapper = document.querySelector('#form_wrapper')
    const btn_close = document.querySelector('#btn_close')

    generator_btn.addEventListener('click', () => {
        form_wrapper.style.display = 'block'
        studentName = document.querySelector('.comm_students md-select').getAttribute('aria-label')

        if (studentName) {
            studentName = studentName.slice(studentName.indexOf(': ') + 2)
            studentName = studentName.slice(
                studentName.indexOf(' ') + 1,
                studentName.indexOf(' ', studentName.indexOf(' ') + 1)
            )
            studentNameFormUI.value = studentName
        }
    })

    btn_close.addEventListener('click', () => {
        form_wrapper.style.display = 'none'
    })
}

function setInputValues(properties) {
    for (let property in properties) {
        let rangeElem = document.querySelector(`#${property} input[type="range"]`)
        let textElem = document.querySelector(`#${property} input[type="text"]`)
        properties[property].value = rangeElem.value
        textElem.value = rangeElem.value
    }
}

function createForm(form, properties) {
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

    form.innerHTML += '<input type="submit" class="g_btn" value="Генерувати">'
}

function additionalHTML() {
    return `
<style>
#generator_btn, #form_wrapper {
    position: fixed; 
    z-index: 9999; 
    background: #fff; 
    border: 1px solid #b6b6b6; 
    border-radius: 10px;
}
#generator_btn {
    top: 132px; 
    left: 446px; 
    padding: 5px 10px; 
    cursor: pointer;
}
#form_wrapper {
    display: none;
    top: 90px; 
    left: calc(50vw - 250px); 
    width: 500px;
    padding: 20px 30px;
    box-shadow: 0px 0px 20px #514576;
    font-size: 20px;
    font-family: 'Arial', sans-serif;
    color: #000;
}
#form_wrapper #btn_close {
    position: absolute;
    top: 5px;
    right: 5px;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #b6b6b6;
    border-radius: 5px;
    padding: 3px 7px;
}
#main_form .row {
    display: flex;
    align-items: center;
    margin-bottom: 0px;
}
#main_form .form-group {
    margin-bottom: 5px;
}
#main_form .g_btn {
    background-color: #0d6efd;
    border: none;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    padding: 7px 10px;
}
#main_form .g_btn:hover {
    background-color: #0dcaf0;
    color: #000;
}
#main_form {
    width: 250px;
}
#main_form .number-input {
    width: 44px;
    margin: 0 5px;
    padding: 2px 5px;
    border: none;  
}
#review {
    margin-top: 15px;
}
#review_wrapper {
    position: relative;
}
#review_wrapper .copy_rec {
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    background-color: #fff;
    border-radius: 7px 7px 7px 0px;
    text-align: center;
    padding: 5px 9px;
    box-shadow: 0px 0px 4px #000000;
}
</style>
<div id="generator_btn">Generator</div>
<div id="form_wrapper">
    <div id="btn_close">x</div>
    <form id="main_form"></form>
    <div id="review_wrapper">
        <div id="review"></div>
        <div class="copy_rec">Скопійовано</div>
    </div>
    
</div>
`
}