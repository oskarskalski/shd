function mapDataToObject2(data) {
    let result = []
    data = data.split('\n')
    for (let i of data) {
        if (i !== '') {
            i = i.split(',')
            result.push({
                parents: i[0],
                has_nurs: i[1],
                form: i[2],
                children: i[3],
                housing: i[4],
                finance: i[5],
                social: i[6],
                health: i[7],
                target: i[8]
            })
        }
    }
    return result
}

function zxc(data){
    let states = ['recommend', 'priority', 'not_recom', 'very_recom', 'spec_prior']
    let temp = ''
    for(let state of states){
        let x = calculateNumberOfSpecificValues(data, state)
        if(temp === ''){
            temp = x
            continue
        }
        temp = mergeTwoLists(temp, x)
    }
    return temp
}

function calculateNumberOfSpecificValues(data, state){
    data = filterByTarget(data, state)
    let result = {
        parents: {
            usual: 0,
            pretentious: 0,
            great_pret: 0,
        },
        nursery: {
            proper: 0,
            less_proper: 0,
            improper: 0,
            critical: 0, 
            very_crit: 0
        },
        children: {
            '1': 0,
            '2': 0,
            '3': 0,
            'more': 0
        },
        form: {
            complete:0,
            completed:0,
            incomplete: 0,
            foster: 0
        },
        housing: {
            convenient: 0,
            less_conv: 0,
            critical: 0
        },
        finance: {
            convenient: 0,
            inconv: 0
        },
        social: {
            nonprob: 0,
            slightly_prob: 0,
            problematic: 0,
        },
        health: {
            recommended: 0,
            not_recom: 0,
            priority: 0
        }
    }
    for(let i of data){
        result.parents[i.parents] = result.parents[i.parents] + 1
        result.nursery[i.has_nurs] = result.nursery[i.has_nurs] + 1
        result.form[i.form] = result.form[i.form] + 1
        result.children[i.children] = result.children[i.children] + 1
        result.housing[i.housing] = result.housing[i.housing] + 1
        result.finance[i.finance] = result.finance[i.finance] + 1
        result.social[i.social] = result.social[i.social] + 1
        result.health[i.health] = result.health[i.health] + 1
    }
    return transformData(result, state)
}

function filterByTarget(data, target){
    return data.filter(obj => obj.target === target)
}

function transformData(data, state){
    let result = []
    for(let [key, value] of Object.entries(data)){
        result.push([{
            '': state,
            ...value
        }])
    }
    return result
}

function mergeTwoLists(list, list2){
    let result = []
    for(let i in list){
        result.push(
            [...list[i], ...list2[i]]
        )
    }
    return result
}

exports.calculateNumberOfSpecificValues = calculateNumberOfSpecificValues
exports.mapDataToObject2 = mapDataToObject2
exports.zxc = zxc
