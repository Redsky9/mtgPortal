let fs = require('fs');
let bP = require('body-parser');
let allCards = require('../assets/json/AllCards.json');
let allSets = require('../assets/json/AllSets.json');

let sets = [];

// app.use(bP.urlencoded({extended: true}));

function getAllSets(){
    
    allSets.forEach((element) => {
        sets.push(element)
    }, this);

    return sets;
};

function findCards(values){
    let finalVal = [];
    console.log(values);
    for(let val in values){
        if(val == 'name' && values[val] !== ''){
            finalVal = getCardByName(finalVal, values[val]);
        }else if(val == 'set' && values[val] !== ''){
            finalVal = getCardBySet(finalVal, values[val]);
        }else if(val == 'colors' && values[val] !== ''){
            finalVal = getCardByColor(finalVal, values[val]);
        }else if(val == 'rarity' && values[val] !== ''){
            finalVal = getCardByRarity(finalVal, values[val]);
        }else if(val == 'types' && values[val] !== ''){
            finalVal = getCardByType(finalVal, values[val]);
        }else if(val == 'power' && (values[val][0] !== '' || values[val][1] !== '')){
            finalVal = getCardByValue(finalVal, values[val], val);
        }else if(val == 'toughness' && (values[val][0] !== '' || values[val][1] !== '')){
            finalVal = getCardByValue(finalVal, values[val], val);
        }else if(val == 'cmc' && (values[val][0] !== '' || values[val][1] !== '')){
            finalVal = getCardByValue(finalVal, values[val], val);
        };
    }
    return finalVal;
}

function getCardById(val){

    let final = allCards.filter((item) => {
        return item.editions[0].multiverse_id == val
    });

    return final;
}

function getCardByName(arr, val){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return item.name.includes(val.charAt(0).toUpperCase() + val.slice(1))
    });
    
    return final;
}

function getCardBySingleParams(arr, val, param){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return item[param] === val; 
        // Refactor
    });
    
    return final;
}

function getCardMultipleParams(arr, val, param){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return (typeof(val) == 'object' ? (JSON.stringify(item.colors) === JSON.stringify(val)) : (item.colors == val));
        // Refactor
    });
    
    return final;
}

function getCardBySet(arr, val){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return item.editions[0].set_id === val;
    });
    
    return final;
}

function getCardByColor(arr, val){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return (typeof(val) == 'object' ? (JSON.stringify(item.colors) === JSON.stringify(val)) : (item.colors == val));
    });
    
    return final;
}

function getCardByRarity(arr, val){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return item.editions[0].rarity === val;
    });
    
    return final;
}


function getCardByType(arr, val){
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return (typeof(val) == 'object' ? (JSON.stringify(item.types) === JSON.stringify(val)) : (item.types == val));
    });
    
    return final;
}

function getCardByValue(arr, val, name){
    (val[0] == '' ? val[0] = 1 : val[0] = val[0]);
    (val[1] == '' ? val[1] = 15 : val[1] = val[1]);
    if(arr.length == 0){
        arr = allCards;
    }
    let final = arr.filter((item) => {
        return (item[name] >= val[0] && item[name] <= val[1]);
    });

    return final;
}

function getAllCardNames(){
    let temp = [];
    for(let i = 0; i < allCards.length; i++){ 
        temp.push(allCards[i].name);
    };
    console.log(temp);
    fs.writeFile('./assets/json/allCardNames.json', JSON.stringify(temp, null, 2), 'utf8', (err) => {
        if(err) throw err;
    });
}


module.exports = {
    getAllSets: getAllSets,
    findCards: findCards,
    getCardById: getCardById,
    getCardByName: getCardByName,
    getCardBySet: getCardBySet,
    getCardByColor: getCardByColor,
    getCardByRarity: getCardByRarity,
    getCardByType: getCardByType,
    getCardByValue: getCardByValue,
    getAllCardNames
}