document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const tempInput = document.getElementById('temperature');
    const unitSelect = document.getElementById('unit');
    const resultDiv = document.getElementById('result-conversion');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const temperature = parseFloat(tempInput.value);
        const unit = unitSelect.value;
        let result = '';

        if (isNaN(temperature)) {
            resultDiv.textContent = 'Por favor, ingresa un número válido.';
            resultDiv.style.color = '#D32F2F'; // Rojo
            return;
        }

        if (unit === 'celsius') {
            const fahrenheit = (temperature * 9/5) + 32;
            result = `${temperature}°C equivale a ${fahrenheit.toFixed(2)}°F.`;
        } else {
            const celsius = (temperature - 32) * 5/9;
            result = `${temperature}°F equivale a ${celsius.toFixed(2)}°C.`;
        }

        resultDiv.textContent = result;
        resultDiv.style.color = '#2E7D32'; // Verde oscuro
    });
});