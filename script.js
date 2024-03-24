function validDate() {
    const day = document.getElementById('day').value
    const month = document.getElementById('month').value
    const year = document.getElementById('year').value
    const resultYear = document.getElementById('result-year')
    const resultMonth = document.getElementById('result-month')
    const resultDay = document.getElementById('result-day')
    const dataInputs = document.getElementById('data-inputs')
    const errorMessage = document.getElementsByClassName('error-message')


    const inputDate = new Date(year, month - 1, day)
    const todaysDate = new Date()

    const difference = todaysDate - inputDate;

    // CONVERT MILISECOND IN YEAR BECAUSE THE DATE DIFFERENCE GIVES IN MILISECOND 
    const milisecondInYear = 1000 * 60 * 60 * 24 * 365.25
    const milisecondInMonth = milisecondInYear / 12

    const differenceInYear = Math.floor(difference / milisecondInYear)
    const differenceInMonth = Math.floor((difference % milisecondInYear) / milisecondInMonth)
    const differenceInDays = Math.floor(((difference % milisecondInYear) % milisecondInMonth) / (1000 * 60 * 60 * 24))
    
    resultYear.innerHTML = differenceInYear;
    resultMonth.innerHTML = differenceInMonth;
    resultDay.innerHTML = differenceInDays;

    // THIS FUNCTION FOR THE ERROR MESSAGE
    function errorHandler (){
        dataInputs.classList.add('error-state');
        for (let index = 0; index < errorMessage.length; index++) {
            errorMessage[index].style.display = 'block'
        }
        resultYear.innerHTML = '--';
        resultMonth.innerHTML = '--';
        resultDay.innerHTML = '--';
    }

    // CHECK, IS ALL THE INPUT ARE VaLID OR NOT?
    if(!day || !month || !year || day <= 0 || month <= 0 || year <= 0 ){
        errorHandler()              //CAN'T SUBMIT 0 OR NEGITIVE NUMBER
    }else if(inputDate > todaysDate){
        errorHandler()              //CAN'T SUBMIT FUTURE DATE
    }else if(day > 31 || month > 12 || year > 2100){
        errorHandler()              //CANT'T SUBMIT MORE DAYS MONTH OR YEAR
    }else if((month == 4 || month == 6 || month == 9 || month == 11) && day > 30){
        errorHandler()              //CANT'T SUBMIT 31 DAYS FOR APRIL, JUNE, SEPTEMBER, NOVEMBER
    }else if( month == 2 && (day > 29 || ( day == 29 && !isLeepYear(year)))){
        errorHandler()              //HANDLE THE FEBRUARY MONTH AND LEEPYEAR
    }else{
        dataInputs.classList.remove('error-state')
        for (let index = 0; index < errorMessage.length; index++) {
            errorMessage[index].style.display = 'none'
        }
    }

    function isLeepYear (year){
        return (year % 4 === 0 && year % 100 !== 0)  || (year % 400 === 0) ;
    }

}