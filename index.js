const input = document.querySelector('#dateTime');
const btn = document.querySelector('#showBtn');
const output = document.querySelector('#outputpara');


btn.addEventListener('click',show);

function show(){
    var dateList = input.value.split('-');
    var date = {
        day:Number(dateList[2]),
        month:Number(dateList[1]),
        year:Number(dateList[0])
    }
    if(input.value){
        if(checkPalAllDateFormat(date)){
            output.innerText = "Yay! its a Palindrome 😃";
        }
        else{
            var[count,Date] = getNextPrevPalindrome(date);
            output.innerText = `The palindrome date is ${Date.day} - ${Date.month} - ${Date.year}, you missed it by ${count} days!😓 `;
        }
    }
    else{
        output.innerText = "Please select the date";
    }
}

const reverseStr = str => {
    var reverseStr = str.split('').reverse().join('');
    return reverseStr;
}

const palindrome = str => {
    var reverse = reverseStr(str);

    return str === reverse;
}

//if day and month is less than 10 add 0
const convertDatetoString = (date) => {
 dateString = {day:'',month:'',year:''}
 if(date.day < 10){
    dateString.day = '0'+date.day;
 }
 else{
    dateString.day = date.day.toString();
 }

 if(date.month < 10){
    dateString.month = '0'+date.month;
 }
 else{
    dateString.month = date.month.toString();
 }

 dateString.year = date.year.toString();
 return dateString;
}

const getDateFormat = (date) => {
    var dateStr = convertDatetoString(date);
    var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy = dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd = dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyy, ddmmyyyy, mmddyy, mmddyyyy, yymmdd, yyyymmdd]
}

const checkPalAllDateFormat = (date) => {
    var dateArrayList = getDateFormat(date);
    var ispalindrome = false;
    dateArrayList.some(e => {
        if(palindrome(e))
        {
            ispalindrome = true;
            console.info(e);
            return ispalindrome; //used return instead of break
        }
    });
    return ispalindrome;
}

const leapYear = (year)=>{
    if((year % 400) || (year % 4 && year % 100)){
        return true
    }
    return false;
}

function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

        if(leapYear(year) && month == 2){
        daysInMonth[1] = 29;
        }

        if(day > daysInMonth[month-1]){
            day = 1;
            month = month+1;
        }

        if(month > 12){
            month = 1;
            year = year+1;
        }

        return {
            day:day,
            month:month,
            year:year
        };
}


function getPreviousDate(date){
    var day = date.day-1;
    var month = date.month;
    var year = date.year

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(leapYear(year) && month == 2){
        daysInMonth[1] = 29;
    }

    if(day < 1){
        day = daysInMonth[month];
        month--;
    }
    if(month < 1){
        month = 12
        year--;
    }

    return {
        day:day,
        month:month,
        year:year
    };

}

function getNextPrevPalindrome(date){
    var countnext = 0; var countprev = 0;
    var nextDate = getNextDate(date);
    var PrevDate = getPreviousDate(date);

    while(1){
        countnext++;
        if(checkPalAllDateFormat(nextDate)){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    while(1){
        countprev++;
        if(checkPalAllDateFormat(PrevDate)){
            break;
        }
        PrevDate = getPreviousDate(PrevDate);
    }
    

    //Find min previous or next date palindrome
    var minDays = Math.min(countprev,countnext);
    if(countnext == minDays){
        return [minDays,nextDate];
    }
    else if(countprev == minDays){
        return [minDays,PrevDate];
    }
}

