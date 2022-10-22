let fs = require('fs');
const converter = require('json-2-csv')
let titanic = require('./titanic/titanic.js');
let density = require('./density/density.js');
let nursery = require('./categorical/nursery.js');

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
            let mappedData = nursery.mapDataToObject2(data)
            // let count = nursery.calculateNumberOfSpecificValues(mappedData);
            let test = nursery.zxc(mappedData)
            saveDataToCvsFile(test, "nursery2", true)
        }
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