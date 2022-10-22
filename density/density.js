function mapDataToObject2(data) {
    let result = []
    data = data.split('\n')
    for (let i of data) {
        i = i.split(',')
        result.push({
            name: i[0],
            states: i.slice(1, i.length)
        })
    }
    return result
}

//calculate number of plants per state
function calculateNumberOfObjectsGroupedByStates(data, country) {
    if(country === 'USA'){
        country = usStates    
    }else if(country === 'CANADA'){
        country = canadaStates
    }
    let states = getListOfObjectWhichWillBeAssignedByAbbreviation(country)
    data.forEach(object => {
        object.states.forEach(state => {
            if(states[state] !== undefined){
                let count = states[state].count + 1
                states[state].count = count
            }
        })
    })
    return states;
}

//calculate number of types of specific plant
function calculateNumberOfPlantTypes(data){
    let result = {}
    data.forEach(object => {
        const name = object.name.split(" ")[0]
        if(name === ''){
            return;
        }
        if(result[name] === undefined){
            result[name] = 1
        }else{
            result[name] = result[name] + 1
        }
    })
    return result;
}

//Copied from https://gist.github.com/marshallswain/88f377c71aa88aceaf660b157f6d8f46
const usStates = [
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    { name: 'AMERICAN SAMOA', abbreviation: 'AS' },
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    { name: 'GUAM', abbreviation: 'GU' },
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    { name: 'PALAU', abbreviation: 'PW' },
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    { name: 'PUERTO RICO', abbreviation: 'PR' },
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' }
]

//https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada
const canadaStates = [
    { name: 'ONTARIO', abbreviation: 'ON' },
    { name: 'QUEBEC', abbreviation: 'QC' },
    { name: 'NOVA SCOTIA', abbreviation: 'NS' },
    { name: 'New Brunswick', abbreviation: 'NB' },
    { name: 'Manitoba', abbreviation: 'MB' },
    { name: 'British Columbia', abbreviation: 'BC' },
    { name: 'Prince Edward Island', abbreviation: 'PE' },
    { name: 'Saskatchewan', abbreviation: 'SK' },
    { name: 'Alberta', abbreviation: 'AB' },
    { name: 'Newfoundland and Labrador', abbreviation: 'NL' },

]


function getListOfObjectWhichWillBeAssignedByAbbreviation(states) {
    let result = {}
    states.forEach(state => {
        result[state.abbreviation.toLowerCase()] = {
            count: 0
        }
    })
    return result
}

exports.mapDataToObject2 = mapDataToObject2;
exports.calculateNumberOfObjectsGroupedByStates = calculateNumberOfObjectsGroupedByStates
exports.calculateNumberOfPlantTypes = calculateNumberOfPlantTypes