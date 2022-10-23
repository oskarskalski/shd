let fs = require('fs');
const converter = require('json-2-csv')
let titanic = require('./titanic/titanic.js');
let density = require('./density/density.js');
let nursery = require('./categorical/nursery.js');
let airQuality = require('./real/air_quality.js');

function main() {
    var args = process.argv;
    fs.readFile(args[3], 'utf8', function (err, data) {
        proxy(data, args[2])
    });
}

main();


function proxy(data, state) {
    switch (state) {
        case "death_prediction": {
            let mappedData = titanic.mapDataToObjects(data)
            let calculateDeathsAndSurvived = titanic.calculateDeathsAndSurvived(mappedData)
            let calculatePercentOfSurvivedByGender = titanic.calculatePercentOfSurvivedByGender(mappedData);
            let c = titanic.calculatePercentOfSurvivedByNumberOfSiblingsOrSpouses(mappedData);
            let z = titanic.calculatePercentOfSurvivedByPClass(mappedData);
            saveDataToCvsFile(calculateDeathsAndSurvived, "1.csv")
            saveDataToCvsFile(calculatePercentOfSurvivedByGender, "2.csv")
            saveDataToCvsFile(c, "3.csv")
            saveDataToCvsFile(z, "4.csv")
        }
            break;
        case "state_count": {
            let mappedData = density.mapDataToObject2(data)
            let count = density.calculateNumberOfObjectsGroupedByStates(mappedData, 'CANADA')
            let count2 = density.calculateNumberOfPlantTypes(mappedData)
            console.log(count2)
        }
            break;
        case "nursery": {
            let mappedData = nursery.mapDataToObject(data)
            let social = nursery.sumAllSocialConditionPerTarget(mappedData)
            let finance = nursery.sumAllFinanceConditionPerTarget(mappedData)
            saveDataToCvsFile(social, "social_sum_nursery", false)
            saveDataToCvsFile(finance, "financial_sum_nursery", false)
        }
        break;
        case 'air_quality': {
			let mappedData = airQuality.mapDataToObject(data);
			let getAverageCOPerMonth = airQuality.calculateCOPerMonth(mappedData);
			let getAverageBenzenPerMonth = airQuality.calculateAverageNMHCPerMonth(mappedData);
			let getAverageTempearturePerMonth = airQuality.calculateAverageTemperaturePerMonth(mappedData);
            let getAverageNOPerMonth = airQuality.calculateNOPerMonth(mappedData);
            let calculateAverageCOByHoursAndMonth = airQuality.calculateAverageCODependingOnHourAndMonth(mappedData)
			saveDataToCvsFile(getAverageCOPerMonth, 'avg_co', false);
			saveDataToCvsFile(getAverageBenzenPerMonth, 'avg_benzen', false);
			saveDataToCvsFile(getAverageTempearturePerMonth, 'avg_temperature', false);
			saveDataToCvsFile(getAverageNOPerMonth, 'avg_no', false);
			saveDataToCvsFile(calculateAverageCOByHoursAndMonth, 'avg_hour_month_co', false);
		}
        break;
        default: console.log("Couldn't find a functionality for :" + state)
    }
}

function saveDataToCvsFile(data, fileName, createSeparateFileForEachTable) {
    if(createSeparateFileForEachTable){
        for(let i in data){
            saveData(data[i], fileName + '_' + i + '.csv');
        }
    }else{
        saveData(data, fileName + '.csv')
    }
    
}

function saveData(data, fileName){
    converter.json2csv(data, (err, csv) => {
        if (err) {
          throw err;
        }
        fs.writeFile(fileName, csv, function (fileError) {
            if(fileError){
                throw fileError
            }
        })  
      })

}