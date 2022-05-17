import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const myHeaders = new Headers();
myHeaders.append("apikey", "wJoJG4dVvzNsdc8Z6C5ZF5FfY9kynPRo");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const toCAD = (from,amount) => {
    if (from != 'CAD') {
        fetch("https://api.apilayer.com/currency_data/convert?to=CAD&from={"+from+"}&amount={"+amount+"}", requestOptions)
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
    }
  return result
}

export async function pushObject(description,currency,price,type){

    let date = Date.getDate()
    let month = Date.getMonth()
    let tz = Date.getTimezoneOffset()

    let obj = {
        'date': date,
        'month': month,
        'timezone': tz,
        'description': description,
        'price': toCAD(currency,price),
        'type': type
    }

    let entry = toString(checkData())

    try {
        await AsyncStorage.setItem(entry,JSON.stringify(obj))
    } catch (error) {
        console.log(error)
    }

    return obj
}

async function getObjects() {
    let keysS = await AsyncStorage.getAllKeys()
    let objects = await AsyncStorage.multiGet(keysS.sort()) //will come out sorted
    return (objects.map(function(x) {
        return JSON.parse(x)
        })
    )
}

const dailyReport = (date,month,objects) => {
    let costs = [0,0,0,0,0,0,0]

    for (let i=0;i<objects.length;i++) {
        if ( objects[i].date == date && objects[i].month == month ) {
            if (objects[i].type=='transportation') {
                costs[0]+=objects[i].price
            }
            else if (objects[i].type=='food') {
                costs[1]+=objects[i].price
            }
            else if (objects[i].type=='accomadations') {
                costs[2]+=objects[i].price
            }
            else { //other
                costs[3]+=objects[i].price
            }
            costs[4]+=objects[i].price
        }
    }
    costs[5] = date
    costs[6] = month

    return costs
}

export const dailyReportWrapper = () => {
    let date = Date.getDate()
    let month = Date.getMonth()

    let objects = getObjects()

    let costs = dailyReport(date,month,objects)
    return costs
}

export const overallReport = () => {
    let costs = []
    let objects = getObjects()
    
    let date = objects[0].date
    let month = objects[0].month

    let enddate = objects[-1].date
    let endmonth = objects[-1].month

    let changemonth = endmonth - month
    let changeday = enddate - date

    let length = changemonth*31+changeday
    
    for(let i=0;i<length;i++) {
        costs.push(dailyReport(date,month,objects))
        if (date == 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10)) {
            date = 0
            month +=1
        }
        else if (date == 30 && (month == 4 || month == 6 || month == 9 || month == 11)) {
            date = 0
            month +=1
        }
        else if (date == 28 && month == 2) {
            date = 0
            month +=1
        }
    }

    seriesCosts = makeSeries(costs)
    seriesCosts.push(objects[0].date)
    seriesCosts.push(objects[0].month)
    seriesCosts.push(enddate)
    seriesCosts.push(endmonth)
    return seriesCosts
}

const makeSeries = (costsArrays) => {
    transportation = []
    food = []
    accomadations = []
    other = []
    date = []
    month = []
    
    for (let i=0;i<costsArrays.length;i++) {
        transportation.push(costsArrays[i][0])
        food.push(costsArrays[i][1])
        accomadations.push(costsArrays[i][2])
        other.push(costsArrays[i][3])
        date.push(costsArrays[i][4])
        month.push(costsArrays[i][5])
    }

    return [transportation,food,accomadations,other,date,month]
}

async function checkData() { //return number of entries
    let keysS = await AsyncStorage.getAllKeys()
    let keysN = keysS.map(function(x) {
        return parseInt(x,10)
    }) 
    let max = Math.max(keysN)+1
    return max
}