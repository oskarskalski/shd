function mapDataToObjects(data) {
    let titanicObjects = [];
    data = data.split('\n');
    for (let i in data) {
        if (i == 0) {
            continue;
        }
        let arr = data[i].split(',');
        let lastName = arr[2].split(" ")
        lastName = lastName[lastName.length - 1]
        titanicObjects.push({
            survived: parseInt(arr[0]),
            pClass: parseInt(arr[1]),
            name: arr[2].replace(lastName, ""),
            sex: arr[3],
            age: parseInt(arr[4]),
            siblings: parseInt(arr[5]),
            parents: parseInt(arr[6]),
            fare: parseFloat(arr[7])
        });
    }
    return titanicObjects;
}

function calculateDeathsAndSurvived(data) {
    const survived = data.reduce((sum, a) => sum + a.survived, 0);
    return {
        survived: survived,
        dead: data.length - survived
    };
}


function calculatePercentOfSurvivedByGender(data) {
    const females = data.filter(object => object.sex === "female");
    const males = data.filter(object => object.sex === "male");
    let femaleCalculations = calculateDeathsAndSurvived(females)
    let maleCalculations = calculateDeathsAndSurvived(males)
    return {
        d_female: femaleCalculations.dead, 
        female: femaleCalculations.survived, 
        d_male: maleCalculations.dead,
        male: maleCalculations.survived
    };
}

function calculatePercentOfSurvivedByNumberOfSiblingsOrSpouses(data) {
    let result = {};
    data.forEach(object => {
        let x = result[object.siblings]
        if (x == null) {
            x = {
                male: 0,
                female: 0,
                d_male: 0,
                d_female: 0
            }
        }
        let gender = ""
        if (object.survived == 0) {
            gender = 'd_' + object.sex;
        } else {
            gender = object.sex;
        }
        x[gender] = x[gender] + 1
        result[object.siblings] = x
    })
    console.log(result)
    return transformObjectsToCsv(result, "siblings");

}

function calculatePercentOfSurvivedByPClass(data) {
    let classes = {
        1: {
            male: 0,
            female: 0,
            d_male: 0,
            d_female: 0
        },
        2: {
            male: 0,
            female: 0,
            d_male: 0,
            d_female: 0
        },
        3: {
            male: 0,
            female: 0,
            d_male: 0,
            d_female: 0
        }
    }
    for (let i of data) {
        var pClass = classes[i.pClass]
        if (i.survived == 0) {
            pClass['d_' + i.sex] = pClass['d_' + i.sex] + 1
        } else {
            pClass[i.sex] = pClass[i.sex] + 1
        }
        classes[i.pClass] = pClass
    }

    return transformObjectsToCsv(classes, "pClass");
}

function transformObjectsToCsv(data, keyValue) {
    let transformedObjects = []
    for (const key in data) {
        let row = data[key]
        row[keyValue] = key
        transformedObjects.push(row)
    }
    return transformedObjects;
}

exports.mapDataToObjects = mapDataToObjects;
exports.calculateDeathsAndSurvived = calculateDeathsAndSurvived
exports.calculatePercentOfSurvivedByGender = calculatePercentOfSurvivedByGender
exports.calculatePercentOfSurvivedByNumberOfSiblingsOrSpouses = calculatePercentOfSurvivedByNumberOfSiblingsOrSpouses
exports.calculatePercentOfSurvivedByPClass = calculatePercentOfSurvivedByPClass