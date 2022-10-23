function mapDataToObject(data) {
	let result = [];
	data = data.split('\n');
	for (let i of data) {
		if (i !== '') {
			i = i.split(';');
            let date = new Date(i[0].split('/').reverse().join('/') + ' '+ i[1].replaceAll('.', ":"));
            if(isNaN(date)){
                continue;
            }
			result.push({
				date: date,
				CO: parseFloat(i[2]),
				NMHC: parseFloat(i[4]),
                NO: parseFloat(i[8]),
				temperature: parseFloat(i[12]),
				RH: parseFloat(i[13]),
				AH: parseFloat(i[14]),
			});
		}
	}
	return result;
}

function calculateAverageNMHCPerMonth(data){
    let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.NMHC
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateCOPerMonth(data) {
	let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.CO
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateNOPerMonth(data) {
	let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.NO
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateAverageTemperaturePerMonth(data) {
	let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.temperature
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateAverageRelativeHumidityPerMonth(data) {
	let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.RH
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateAverageAbsoluteHumidityPerMonth(data) {
	let kv = []
    for(let i of data){
        kv.push({
            date: i.date,
            value: i.AH
        })
    }
    return calculateAverageValuePerMonth(kv)
}

function calculateAverageCODependingOnHourAndMonth(data){
    let from22To6 = data.filter(obj => obj.date.getHours() >= 22 || obj.date.getHours() <= 6).map(obj => ({date: obj.date, value: obj.CO}));
    let from7To14 = data.filter(obj => obj.date.getHours() >= 7 && obj.date.getHours() <= 14).map(obj => ({date: obj.date, value: obj.CO}));
    let from15To21 = data.filter(obj => obj.date.getHours() >= 15 && obj.date.getHours() <= 21).map(obj => ({date: obj.date, value: obj.CO}));
    return [
        {'': 'from22To6', ...calculateAverageValuePerMonth(from22To6)},
        {'': 'from7To14', ...calculateAverageValuePerMonth(from7To14)},
        {'': 'from15To21', ...calculateAverageValuePerMonth(from15To21)}
    ]
}


function calculateAverageValuePerMonth(data){
    let currentMonth = '';
    let months = {}
	let monthData = [];
	for (let i of data) {
        let key = (i.date.getMonth() + 1) + '|' +  i.date.getFullYear()
        if(i.value === -200){
            continue;
        }
        if(currentMonth === ''){
			currentMonth = key;
        }
		if (currentMonth !== key) {
			months[currentMonth] = average(monthData);
			currentMonth = key;
			monthData = [];
		}
		monthData.push(i.value);
	}
    months[currentMonth] = average(monthData)
	return months;
}

function average(data){
    const sumData = data.reduce((sum, a) => sum + a, 0);
    return sumData / data.length;
}


exports.mapDataToObject = mapDataToObject;
exports.calculateCOPerMonth = calculateCOPerMonth;
exports.calculateAverageNMHCPerMonth = calculateAverageNMHCPerMonth;
exports.calculateAverageTemperaturePerMonth = calculateAverageTemperaturePerMonth;
exports.calculateAverageRelativeHumidityPerMonth = calculateAverageRelativeHumidityPerMonth;
exports.calculateAverageAbsoluteHumidityPerMonth = calculateAverageAbsoluteHumidityPerMonth;
exports.calculateNOPerMonth = calculateNOPerMonth;
exports.calculateAverageCODependingOnHourAndMonth = calculateAverageCODependingOnHourAndMonth;
