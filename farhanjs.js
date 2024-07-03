document.addEventListener('DOMContentLoaded', populateUnits);

const units = {
    length: [
        { name: 'Meters', value: 'meters' },
        { name: 'Kilometers', value: 'kilometers' },
        { name: 'Centimeters', value: 'centimeters' },
        { name: 'Inches', value: 'inches' },
        { name: 'Feet', value: 'feet' }
    ],
    temperature: [
        { name: 'Celsius', value: 'celsius' },
        { name: 'Fahrenheit', value: 'fahrenheit' },
        { name: 'Kelvin', value: 'kelvin' }
    ],
    weight: [
        { name: 'Kilograms', value: 'kilograms' },
        { name: 'Grams', value: 'grams' },
        { name: 'Pounds', value: 'pounds' },
        { name: 'Ounces', value: 'ounces' }
    ],
    volume: [
        { name: 'Liters', value: 'liters' },
        { name: 'Milliliters', value: 'milliliters' },
        { name: 'Gallons', value: 'gallons' }
    ],
    time: [
        { name: 'Seconds', value: 'seconds' },
        { name: 'Minutes', value: 'minutes' },
        { name: 'Hours', value: 'hours' },
        { name: 'Days', value: 'days' }
    ]
};

function populateUnits() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    units[unitType].forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit.value;
        option1.textContent = unit.name;

        const option2 = document.createElement('option');
        option2.value = unit.value;
        option2.textContent = unit.name;

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    });
}

function convert() {
    const unitType = document.getElementById('unitType').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    let result;

    if (isNaN(inputValue)) {
        document.getElementById('resultText').textContent = 'Please enter a valid number';
        return;
    }

    switch (unitType) {
        case 'length':
            result = convertLength(inputValue, fromUnit, toUnit);
            break;
        case 'temperature':
            result = convertTemperature(inputValue, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(inputValue, fromUnit, toUnit);
            break;
        case 'volume':
            result = convertVolume(inputValue, fromUnit, toUnit);
            break;
        case 'time':
            result = convertTime(inputValue, fromUnit, toUnit);
            break;
    }

    document.getElementById('resultText').textContent = `${inputValue} ${fromUnit} = ${result} ${toUnit}`;
}

function convertLength(value, from, to) {
    const conversions = {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        inches: 39.3701,
        feet: 3.28084
    };

    return (value * conversions[from]) / conversions[to];
}

function convertTemperature(value, from, to) {
    if (from === to) return value;

    let tempInCelsius;

    switch (from) {
        case 'celsius':
            tempInCelsius = value;
            break;
        case 'fahrenheit':
            tempInCelsius = (value - 32) * (5 / 9);
            break;
        case 'kelvin':
            tempInCelsius = value - 273.15;
            break;
        default:
            throw new Error('Invalid from unit');
    }

    switch (to) {
        case 'celsius':
            return tempInCelsius;
        case 'fahrenheit':
            return (tempInCelsius * 9 / 5) + 32;
        case 'kelvin':
            return tempInCelsius + 273.15;
        default:
            throw new Error('Invalid to unit');
    }
}

function convertWeight(value, from, to) {
    const conversions = {
        kilograms: 1,
        grams: 0.001,
        pounds: 0.453592,
        ounces: 0.0283495
    };

    return (value * conversions[from]) / conversions[to];
}

function convertVolume(value, from, to) {
    const conversions = {
        liters: 1,
        milliliters: 0.001,
        gallons: 3.78541
    };

    return (value * conversions[from]) / conversions[to];
}

function convertTime(value, from, to) {
    const conversions = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400
    };

    return (value * conversions[from]) / conversions[to];
}
