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
  if (match) return { value: match[1], base: parseInt(match[2]) };

  match = raw.match(/^(.+)\((2|8|10|16)\)$/);
  if (match) return { value: match[1], base: parseInt(match[2]) };

  return { value: raw, base: parseInt(fromBase.value) };
}

function toDecimal(value, base) {
  if (!patterns[base].test(value)) throw new Error("Invalid number for base " + base);
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

    // Show result in answer box
    resultDiv.textContent = answer;
    resultBox.classList.remove('hidden');

    // Scroll/focus for better UX
    resultBox.scrollIntoView({ behavior: 'smooth' });
    resultBox.focus();

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
    "🤣 Oye hacker ji, coding ka shortcut nahi milne wala!",
    "😜 Right click kar ke duniya nahi badlegi bhai!",
    "😂 Itna bhi kya pyaar hai source code se?",
    "🙃 Arre baba, yeh button sirf tension deta hai!",
    "😎 Chill maar... code Google pe bhi nahi milega!",
    "😏 Abey, keyboard use kar... mouse thak gaya hai!",
    "🔥 Hacker banna hai? Lekin free WiFi pe baith ke?",
    "🤣 Yeh code tujhe samajh aaya toh humko bhi bata dena!",
    "😅 Beta, coding karni hai ya shadi.com join karna hai?",
    "🤯 System bol raha hai: 'Abe ruk jaa, dimaag kharab ho gaya!'",
    "😂 Oye hoye! Code dekhna mana hai!",
    "😎 Chill bhai, yeh secret hai!",
    "🤨 Itna bhi kya pyaar hai mere code se?",
    "🕵️ Arre detective babu, kuch nahi milega!",
    "⚠️ Beta, coding ki duniya dangerous hai!",
    "😂 Oye! Right click se coding nahi sikhi jaati!",
    "😎 Arre bhai, code chahiye toh khud likhna seekh!",
    "🤨 Itna pyaar mere code se? Shaadi karega kya?",
    "🕵️ Detective mode band kar... yahan kuch secret nahi!",
    "⚠️ Warning: Yeh button daba ke kuch nahi milega!",
    "🤣 Hacker banna hai? Pahle padhai karle beta!",
    "🤖 Are yaar, code chaiye to is number par message kar! +916355938009",
    "😜 Mazak tha... code idhar nahi milega!",
    "🙈 Right click kar ke kya hi milega? Chai pi le ja..!",
    "🔥 Error 101: Teri curiosity zyada hai!"
  ];

  const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  alert(randomMsg);
  return false;
});
