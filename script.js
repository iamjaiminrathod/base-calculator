const input = document.getElementById('inputValue');
const fromBase = document.getElementById('fromBase');
const toBase = document.getElementById('toBase');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const copyResultBtn = document.getElementById('copyResultBtn');
const resultDiv = document.getElementById('result');
const resultBox = document.getElementById('resultBox');

const patterns = {
  2: /^[01]+(\.[01]+)?$/,
  8: /^[0-7]+(\.[0-7]+)?$/,
  10: /^[0-9]+(\.[0-9]+)?$/,
  16: /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/
};

function parseInput(raw) {
  raw = raw.trim();
  let match = raw.match(/^\((.+)\)(2|8|10|16)$/);
  if (match) {
    return { value: match[1], base: parseInt(match[2]) };
  }
  match = raw.match(/^(.+)\((2|8|10|16)\)$/);
  if (match) {
    return { value: match[1], base: parseInt(match[2]) };
  }
  return { value: raw, base: parseInt(fromBase.value) };
}

function toDecimal(value, base) {
  if (!patterns[base].test(value)) {
    throw new Error("Invalid number for base " + base);
  }
  const parts = value.split(".");
  const intPart = parts[0];
  const fracPart = parts[1] || "";
  let decimal = parseInt(intPart, base);
  if (fracPart.length > 0) {
    let fracValue = 0;
    for (let i = 0; i < fracPart.length; i++) {
      fracValue += parseInt(fracPart[i], base) / Math.pow(base, i + 1);
    }
    decimal += fracValue;
  }
  return decimal;
}

function fromDecimal(decimal, base, precision = 10) {
  const intPart = Math.floor(decimal);
  let result = intPart.toString(base).toUpperCase();
  let frac = decimal - intPart;
  if (frac > 0) {
    result += ".";
    let count = 0;
    while (frac > 0 && count < precision) {
      frac *= base;
      const digit = Math.floor(frac);
      result += digit.toString(base).toUpperCase();
      frac -= digit;
      count++;
    }
  }
  return result;
}

function performConversion() {
  try {
    const parsed = parseInput(input.value);
    const from = parsed.base;
    const to = parseInt(toBase.value);
    const value = parsed.value;
    const decimal = toDecimal(value, from);
    const converted = fromDecimal(decimal, to);
    const answer = `${value} (${from}) = ${converted} (${to})`;
    resultDiv.textContent = answer;
    resultBox.classList.remove('hidden');
  } catch (err) {
    alert("⚠️ " + err.message);
  }
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
