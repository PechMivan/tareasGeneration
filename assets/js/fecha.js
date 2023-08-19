const months = ["Enero", "Febrero", "Marzo", "Abril", 
                "Mayo", "Junio", "Julio", "Agosto",
                "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];


// Funciones para llenar los select tags
function fillSelectForMonth(){
    const selectForMonth = document.getElementById("month");
    let str = "";

    for (let i = 0; i < months.length; i++) {
        str+= `<option value="${i}">${months[i]}</option>`;     
    }

    selectForMonth.innerHTML = str;
}

function fillSelectForDay(){
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    let leapYear = false;

    // Años bisiestos: Todo año múltiplo de 4 o 400, otros múltiplos de 100 no son bisiestos.
    if( (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 )
        leapYear = true;
    switch(parseInt(month)){
        case 1:
            // Si es bisiesto son 29 días, si no pues 28
            leapYear ? generateDays(29) : generateDays(28);
            break;
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            generateDays(31);
            break;
        default:
        // Para los meses con 30 días.
            generateDays(30);
            break;
    }
}

function generateDays(daysInMonth){
    const selectForDay = document.getElementById("day");
    let str = "";

    for (let i = 1; i <= daysInMonth; i++) {
        str+= `<option value="${i}">${i}</option>`;   
    }

    selectForDay.innerHTML = str;
}

// Calcula día y determina si es laborable o no
function calculateLaborDay(){
    const result = document.getElementById("result");
    let year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    year = restrainToGregorianCalendar(year);
    console.log(year);

    const date = new Date(year, month, day);
    const dayOfTheWeek = days[date.getDay()]; //Busca el día en el array dependiendo del índice.
    const laborDay = isLaborDay(date.getDay()) ? `<span class="text-danger"> laborable </span>` 
                                                : `<span class="text-light"> no laborable </span>`;
    
    result.innerHTML = `Tu fecha es <span class="text-light">${dayOfTheWeek}</span> y es ${laborDay}`;
}

function restrainToGregorianCalendar(year){
    // Valor Mínimo: 1582 (Inicio del calendario gregoriano)
    // Valor Máximo: 9999
    return year = Math.min(9999, Math.max(1582, year));
}

function isLaborDay(dayIndex){
    //0 y 6 son Domingo y Sábado, respectivamente
    switch(dayIndex){
        case 0:
        case 6:
            return false;
            break;
        default:
            return true;
            break;
    }
}

function loadData(){
    //Carga las funciones al iniciar la página.
    fillSelectForMonth();
    fillSelectForDay();
}

// Esto no es de mi autoría, solo lo usé porque me pareció interesante
function filter()
{
var tecla = event.key;
if (['.','e'].includes(tecla))
   event.preventDefault()
}
// -------------------------------------------------------------------