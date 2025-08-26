document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tip-calculator-form');
    const billAmountInput = document.getElementById('bill-amount');
    const tipPercentageInput = document.getElementById('tip-percentage');
    const tipResultDiv = document.getElementById('tip-result');
    const totalResultDiv = document.getElementById('total-result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const billAmount = parseFloat(billAmountInput.value);
        const tipPercentage = parseFloat(tipPercentageInput.value);

        if (isNaN(billAmount) || isNaN(tipPercentage) || billAmount <= 0) {
            tipResultDiv.textContent = 'Por favor, ingresa montos válidos.';
            totalResultDiv.textContent = '';
            tipResultDiv.style.color = '#D32F2F'; // Rojo
            return;
        }

        const tipAmount = billAmount * (tipPercentage / 100);
        const totalAmount = billAmount + tipAmount;

        tipResultDiv.textContent = `Propina: $${tipAmount.toFixed(2)}`;
        totalResultDiv.textContent = `Total a pagar: $${totalAmount.toFixed(2)}`;
        
        tipResultDiv.style.color = '#2E7D32'; // Verde oscuro
        totalResultDiv.style.color = '#2E7D32'; // Verde oscuro
    });
});