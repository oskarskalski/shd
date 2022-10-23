function mapDataToObject(data) {
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


function sumAllSocialConditionPerTarget(data){
    let transformObject = data.map(obj => ({target: obj.target, value: obj.social}))
    return sumAllRowsByFinalEvaluationAndAttribute(transformObject)
}

function sumAllFinanceConditionPerTarget(data){
    let transformObject = data.map(obj => ({target: obj.target, value: obj.finance}))
    return sumAllRowsByFinalEvaluationAndAttribute(transformObject)
}

function sumAllRowsByFinalEvaluationAndAttribute(data){
    let result = {}
    for(let i of data){
        let obj = result[i.target]
        if(obj === undefined){
            let temp = {}
            temp[i.value] = 1
            result[i.target] = temp
        }
        else{
            let temp = obj[i.value]
            if( temp === undefined ){
                obj[i.value] = 1
            }else{
                obj[i.value] = temp + 1
            }
            result[i.target] = obj
        }
    }
    return trasnformObject(result);
}

function trasnformObject(data){
    let result = []
    for(let [key, value] of Object.entries(data)){
        result.push({
            '': key,
            ...value
        })
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

exports.mapDataToObject = mapDataToObject
exports.zxc = zxc
exports.sumAllSocialConditionPerTarget =sumAllSocialConditionPerTarget
exports.sumAllFinanceConditionPerTarget =sumAllFinanceConditionPerTarget
