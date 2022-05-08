// Объявляем переменные
let x = ''
let y = ''
let sign = ''
let previousX = ''
let previousY = ''
let previousSign = ''

// Реагируем на нажатие кнопок, наполняем переменные
const mem = document.querySelector('.memory')
const selector = document.querySelector('.buttons')
const result = document.querySelector('.result')
selector.addEventListener("click", function (e) {
    let target = e.target;
    //Реагируем на кнопки ввода цифр, проверяем условия ввода
    if (target.classList.contains('number')) {
        //Наполняем переменную x
        if (x.length <= 8 && y == '' && sign == '') {
            //Ставим '.' в переменную x
            if (target.textContent == '.' && x.includes('.')) {
                x += ''
                result.innerHTML = x
            }
            else {
                x += target.textContent
                result.innerHTML = x
            }
        }
        //Ставим '.' в переменную y
        if (x !== '' && sign !== '' && y.length <= 8) {
            if (target.textContent == '.' && y.includes('.')) {
                y += ''
                result.innerHTML = y
            }
            else {
                y += target.textContent
                result.innerHTML = y
            }
        }
    }

    //Реагируем на специальные кнопки
    //Реагируем на кнопку  AC
    if (target.classList.contains('action') && target.textContent == 'AC') {
        clear()
    }
    //Реагируем на кнопку +/-
    if (target.classList.contains('action') && target.textContent == '+/-' && y !== '') {
        operatorY()
    }
    if (target.classList.contains('action') && target.textContent == '+/-' && x !== '' && y == '') {
        operatorX()
    }
    //Регарируем на кнопку %
    if (target.classList.contains('action') && target.textContent == '%' && x !== '' && y == '' && sign == '') {
        x = Number(x)
        x = 0.01 * x
        x = String(x)
        if (x.length > 9) {
            x = Number(x)
            x = x.toPrecision(4)
        }
        result.innerHTML = x
    }
    if (target.classList.contains('action') && target.textContent == '%' && x !== '' && y !== '' && sign !== '') {
        y = Number(y)
        x = Number(x)
        y = x / 100 * y
        y = String(y)
        if (y.length > 9) {
            y = Number(y)
            y = y.toPrecision(4)
        }
        result.innerHTML = y
    }

    //Если переменные пусты - повторяем предыдущую операцию
    if (x == '' && y == '' && target.textContent == '=' && sign == '') {
        x = previousX
        sign = previousSign
        y = previousY
    }

    // Регируем на кнопки ввода символа
    if (target.classList.contains('sign')) {
        if (target.textContent !== '=' && x !== '' && y == '') {
            sign = target.textContent
            result.innerHTML = sign
        }
        //После вычисления к полученному значению применяем новый sign и наполняем y
        if (x == '' && y == '' && previousX !== '' && sign == '' && target.textContent !== '=') {
            x = previousX
            sign = target.textContent
            result.innerHTML = sign
        }
        //Запускаем вычисление, если все 3 переменные заполнены
        if (target.textContent == '=' && x !== '' && y !== '' && sign !== '') {
            math()
        }
        //Реагируем на команды типа x (sign) =
        if (target.textContent == '=' && y == '' && sign !== '') {
            if (sign == 'x') {
                x = Number(x)
                x = x * x
                result.innerHTML = x
                previousX = x
                x = ''
                previousSign = sign
                sign = ''
            }
            else {
                y = x
                math()
            }
        }
        //Реагируем на команды типа x*x*x
        if (x !== '' && y !== '' && sign !== '') {
            math()
            x = previousX
        }

    }

})

//Фунция добавления унарного минуса
//Тут я хотел бы сделать одну функцию для x и y, но пока не понял, как запускать код в функции в зависимости от аргумента фунции :(
function operatorY() {
    if (y.includes('-')) {
        y = y.slice(1, 10)
        result.innerHTML = y
    }
    else {
        let operator = '-'
        y = operator + y
        result.innerHTML = y
    }
}
function operatorX() {
    if (x.includes('-')) {
        x = x.slice(1, 10)
        result.innerHTML = x
    }
    else {
        let operator = '-'
        x = operator + x
        result.innerHTML = x
    }
}

//Функция очистки
function clear() {
    result.innerHTML = '0'
    x = ''
    y = ''
    sign = ''
    mem.innerHTML = ''
    previousX = ''
    counter = ''
}

// Тело калькулятора
function math() {
    mem.innerHTML = (`${x} ${sign} ${y} =  `)
    x = Number(x)
    y = Number(y)
    switch (sign) {
        case '÷':
            if (y == 0) {
                result.innerHTML = 'Ошибка'
                x = ''
                y = ''
                sign = ''
                break
            }
            x = (x / y);
            break;
        case 'x': x = (x * y);
            break;
        case '-': x = (x - y);
            break;
        case '+': x = (x + y);
            break;
    }

    // Обработка данных и вывод на экран
    x = String(x)
    if (x.length > 9) {
        x = Number(x)
        x = x.toPrecision(4)
    }
    if (x !== '') {
        result.innerHTML = x
        previousX = x
        previousY = y
        previousSign = sign
        x = ''
        y = ''
        sign = ''
    }
}

