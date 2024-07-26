function transformItem(item) {
    const addAgents = [];
    if (item.addSalmonella) addAgents.push(4);
    if (item.addBrainKuru) addAgents.push(8);

    return {
        "itemClassname": item.itemClassname,
        "setCount": [item.itemCount, -1, -1],
        "chanceToSpawn": 1.0,
        "haveQuantity": item.haveQuantity,
        "setQuantity": [item.countQuantity, item.QuantRandMin, item.QuantRandMax],
        "setHealth": [1, -1, -1],
        "toolHealthCoefEnable": 0,
        "coefHealthMinMaxValue": [0.5, 1.0],
        "toolQuantityCoefEnable": 0,
        "coefQuantityMinMaxValue": [0.5, 1.0],
        "toolDamageCoef": item.toolDamageCoef,
        "addAgents": addAgents,
        "perkCoefEnable": item.perkCoefEnable,
        "perkCoefList": (item.perkCoefList || []).map(perk => ({
            "enableCoef": perk.enableCoef,
            "perkID": perk.perkID,
            "chanceToSpawn": 1.0,
            "setCount": [perk.setCount, -1, -1],
            "haveQuantity": 1,
            "setQuantity": [perk.setQuantity, item.QuantRandMin, item.QuantRandMax],
            "setHealth": [1, -1, -1],
            "toolHealthCoefEnable": item.toolCoefEnable,
            "coefHealthMinMaxValue": [0.5, 1.0],
            "toolQuantityCoefEnable": item.toolCoefEnable,
            "coefQuantityMinMaxValue": [0.5, 1.0],
            "addAgents": addAgents
        }))
    };
}

function transformData(data) {
    return {
        "KillPoints": data.KillPoints,
        "SkinningPoints": data.SkinningPoints,
        "toolSkinDamageCoef": data.toolSkinDamageCoef,
        "typeOfSkillKill": data.typeOfSkill,
        "typeOfSkillSkinning": data.typeOfSkill,
        "showNotify": 1,
        "modeKnifesAllow": 0,
        "allowknifesListKindOf": 1,
        "knifesList": [],
        "knifesListID": [],
        "ItemSkin": (data.ItemSkin || []).map(transformItem)
    };
}

function convertFile() {
    const inputFile = document.getElementById('inputFile').files[0];
    if (!inputFile) {
        alert('Please select a file first');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const inputData = JSON.parse(event.target.result);
        const convertedData = convertData(inputData);
        const outputBlob = new Blob([JSON.stringify(convertedData, null, 2)], { type: 'application/json' });
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(outputBlob);
        downloadLink.download = 'converted_config.json';
        downloadLink.style.display = 'block';
    };
    reader.readAsText(inputFile);
}

function convertData(data) {
    // Здесь должна быть логика конвертации данных
    return data; // Для примера просто возвращаем исходные данные
}
