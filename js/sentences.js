let diligenceDefinitions = [
    // плохо
    [
        'Не демонструє особливої старанності. Треба докладати більше зусиль.',
        'Не демонструє особливої старанності. Потрібно лише трохи більше старання і результати не заставлять себе чекати.',
        'Не демонструє особливої старанності. Потрібно лише трохи більше наполегливості і результати не заставлять себе чекати.',
    ],
    // отлично
    [
        'Працює старанно та зосереджено на заняттях.',
        'Показує гарну старанність.',
    ]
]

let recommendationDefinitions = [
    [
        'Необхідно додатково самостійно опрацьовувати матеріали електронних уроків.',
        'Труднощі, що виникають з освоєнням нового матеріалу поточної дисципліни можна вирішити, додатково вивчаючи матеріал електронних уроків у майстаті та звертаючись за допомогою до викладача.',
        'Прогалини у опауванні нових знань можна заповнити за допомогою матеріалу електронних уроків та консультацій з викладачем.',
    ]
]

// продуктивність під час виконання практичних завдань
let productivityDefinitions = [
    // плохо
    [
        'Практичні завдання виконує не в повному обсязі, але це нескладно виправити.',
        'Практичні завдання виконує з деякими складнощами, але це можна виправити. '
    ],
    // хорошо
    [
        'Успішно виконує практичні завдання, але з деякими неточностями.',
        'Демонструє непогані навчальні результати на практичних заняттях, але може ще більше покращити свої досягнення. '
    ],
    // отлично
    [
        'Працює продуктивно.',
        'Продуктивно виконує практичні завдання.',
        'Швидко та якісно виконує практичні завдання на заняттях.',
        'Показує високу продуктивність під час виконання практичних завдань на заняттях. '
    ]
];

// активність на занятиях
let activityDefinitions = [
    [
        'Працює активно.',
        'Активно бере участь в заняттях та показує ентузіазм.',
        'З ентузіазмом бере участь в заняттях та виконує практичні завдання.',
    ]
];

// швидкість засвоєння матеріалу
let speedDefinitions = [
    // погано
    [
        'Виникають труднощі з освоєнням нового матеріалу поточної дисципліни.',
        'Є певні складнощі у засвоєнні нового матеріалу поточної дисципліни. '
    ],
    // середньо
    [
        "Засвоєння нового матеріалу є досить успішним, але є незначні прогалини.",
        "Новий матеріал вивчається з деякими труднощами, але їх можна легко вирішити.",
        "Опанування нових знань є непоганим в цілому, але є певні прогалини.",
        "Нові знання вивчаються добре в цілому, але є деякі прогалини.",
    ]
    ,
    // відмінно
    [
        "Новий матеріал засвоюється швидко та без проблем.",
        "Засвоєння нового матеріалу йде на льоту.",
        "Освоєння нового матеріалу не становить проблем.",
        "Освоєння матеріалу поточної теми проходить успішно.",
        "Демонструє високі навчальні досягнення.",
        "Показує відмінні навчальні результати. "
    ],
];

// швидкість засвоєння до імені
let speedDefinitionsNamePrepared = [
    // погано
    [
        'Стикається з труднощами у засвоєнні нового матеріалу поточної дисципліни.',
        'Має певні складнощі у засвоєнні нового матеріалу поточної дисципліни. '
    ],
    // середньо
    [
        "Засвоює новий матеріал досить успішно, але з незначними прогалинами.",
        "Новий матеріал вивчає з деякими труднощами, але їх можна легко вирішити.",
        "Опановує нові знання непогано, але з певними прогалинами.",
        "Нові знання вивчає загалом добре, але має деякі прогалини.",
    ]
    ,
    // відмінно
    [
        "Новий матеріал засвоює швидко та без проблем.",
        "Засвоює новий матеріал без проблем.",
        "Опановує матеріал поточної теми успішно.",
        "Демонструє високі навчальні досягнення.",
        "Показує відмінні навчальні результати. "
    ],
];

// інтерес
let interestDefinitions = [
    // відмінно
    ['Із цікавістю вивчає новий матеріал.', 'Виявляє інтерес до предмету. ']
];

// креативність
let creativityDefinitions = [
    ['Завдання виконує креативно.', 'Демонструє креативний підхід. ']
];

// дисциплина
let behaviorDefinitions = [
    // плохо
    ['Нерідко відволікається на сторонні речі та відволікає розмовами інших.', 'Є проблеми з дисципліною, над якими потрібно попрацювати.', 'Є проблеми з дисципліною. Нерідко відволікає інших.', 'Є проблеми з дисципліною, на які треба звернути увагу. '],
    // хорошо
    ['Поведінка непогана.', 'Поведінка хороша.', 'На заняттях поводиться добре. '],
    // отлично
    ['Поведінка відмінна.', 'Показує зразкову поведінку.', 'Не відволікається на сторонні речі і не відволікає інших. ']
];

// выполнение домашних заданий
let homeworkDefinitions = [
    // плохо
    ['Відсоток виконання ДЗ залишає бажати кращого. Можна змінити цей відсоток в ліпшу сторону.', 'Відсоток виконання ДЗ не найкращий. Можна змінити цей відсоток в ліпшу сторону.', 'Відсоток виконання ДЗ залишає бажати кращого. Можна змінити цей відсоток в ліпшу сторону. Також своєчасне виконання ДЗ покращить засвоєння нового матеріалу. '],
    // так себе
    ['Має низку невиконаних ДЗ. Потрібно не закидати домашню роботу, оскільки вона дуже важлива у навчанні. '],
    // хорошо
    ['ДЗ намагається виконувати вчасно.', 'ДЗ намагається виконувати вчасно.', 'Відсоток виконання ДЗ високий.', 'Відсоток виконання ДЗ високий, але може бути ще вищим.', 'Виконує більшу частину ДЗ. '],
    // отлично
    ['Виконує всі ДЗ. Потрібно продовжувати так само!.', 'Відсоток виконання ДЗ чудовий.', 'Відсоток виконання ДЗ відмінний. Так тримати! ']
];