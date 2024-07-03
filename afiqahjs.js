function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    if (height === '' || weight === '') {
        alert('Please enter both height and weight.');
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let bmiCategory = '';
    let color = '';
    let imageUrl = '';
    const imageElement = document.getElementById('bmi-image');

    if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        color = 'red';
        imageUrl = 'https://i.redd.it/zxabzv691z251.jpg';
    } else if (bmi >= 18.5 && bmi <= 24.99) {
        bmiCategory = 'Normal weight';
        color = 'white';
        imageUrl = 'https://i.redd.it/ota64epnbscb1.jpg';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        bmiCategory = 'Overweight';
        color = 'yellow';
        imageUrl = 'https://preview.redd.it/eafpwkw25yb71.png?auto=webp&s=99bffa9022d6d92917962b79e6fb6a17a0f00706';
    } else {
        bmiCategory = 'Obesity';
        color = 'red';
        imageUrl = 'https://i.pinimg.com/474x/9e/d2/07/9ed207cf2b6f13d6a3f5bf41ee41aefb.jpg';
    }

    const resultElement = document.getElementById('bmi-result');
    resultElement.innerText = `Your BMI is ${bmi} (${bmiCategory}).`;
    resultElement.style.color = color;

    if (imageUrl) {
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
    }
}
