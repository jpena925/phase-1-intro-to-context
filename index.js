// Your code here
function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(recordObj, dateStamp){
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11,15)),
        date: dateStamp.slice(0,10)
    }
    
    recordObj.timeInEvents.push(timeInObj)
    return recordObj
}

function createTimeOutEvent(recordObj, dateStamp){
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11,15)),
        date: dateStamp.slice(0,10)
    }

    recordObj.timeOutEvents.push(timeOutObj)
    return recordObj
}

function hoursWorkedOnDate(recordObj, givenDate){

    let timeInRecord = recordObj.timeInEvents.filter(timeInCard => timeInCard.date === givenDate)
    let timeOutRecord = recordObj.timeOutEvents.filter(timeOutCard => timeOutCard.date === givenDate)

    return (timeOutRecord[0].hour - timeInRecord[0].hour) / 100
}

function wagesEarnedOnDate(recordObj, givenDate){
    return hoursWorkedOnDate(recordObj, givenDate) * recordObj.payPerHour
}

function allWagesFor(recordObj){
    let dates = recordObj.timeInEvents.map(timeCard => timeCard.date)

    return dates.reduce((total,date) => {
        total = total + wagesEarnedOnDate(recordObj, date)
        return total
    }, 0)
}

function calculatePayroll(array){
    return array.reduce((total, person) => {
        total = total + allWagesFor(person)
        return total;
    }, 0)
}


