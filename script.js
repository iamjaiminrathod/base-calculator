const input = document.getElementById('inputValue');
const fromBase = document.getElementById('fromBase');
const toBase = document.getElementById('toBase');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const copyResultBtn = document.getElementById('copyResultBtn');
const resultDiv = document.getElementById('result');
const resultBox = document.getElementById('resultBox');

function validate(value, base) {
  const patterns = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^-?[0-9]+$/,
    16: /^[0-9A-Fa-f]+$/
  };
  return patterns[base].test(value);
}

function performConversion() {
  const value = input.value.trim();
  const from = parseInt(fromBase.value);
  const to = parseInt(toBase.value);
  if (!validate(value, from)) {
    alert('Number to daal bhai!😂');
    return;
  }
  const decimal = parseInt(value, from);
  const converted = decimal.toString(to).toUpperCase();
  const answer = `${value} (${from}) = ${converted} (${to})`;

  resultDiv.textContent = answer;
  resultBox.classList.remove('hidden');
}

convertBtn.addEventListener('click', performConversion);
input.addEventListener('keypress', e => { if (e.key === 'Enter') performConversion(); });

resetBtn.addEventListener('click', () => {
  input.value = '';
  resultBox.classList.add('hidden');
});

copyResultBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultDiv.textContent);
  alert('Answer copied!');
});

// ✅ Disable right click with funny message
// Disable right click with random funny messages
window.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  
  const funnyMessages = [
    "😎 Hacker banna hai kya? Right click se nahi hoga!",
    "😂 Oye! Right click mat kar, calculator jealous ho jayega!",
    "🚫 Right click band hai... left click hi zindagi hai!",
    "😜 Right click se coding nahi aati boss!",
    "🤓 Padhai karo, right click karne se number nahi milenge!",
    "🙅‍♂️ Right click allowed nahi... abhi nahi, kabhi nahi!"
  ];
  
  const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  alert(randomMsg);
  return false;
});
