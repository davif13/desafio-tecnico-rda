// Função para mostrar o resultado das funções de conversão
const loadResult = (result) => {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";

  const titleTextElement = document.createElement("h2");
  const titleTextNode = document.createTextNode("Resultado");

  const resultElement = document.createElement("h2");
  const resultText = document.createTextNode(result);

  titleTextElement.appendChild(titleTextNode);
  resultElement.appendChild(resultText);

  resultContainer.appendChild(titleTextElement);
  resultContainer.appendChild(resultElement);
};

// Função de conversão de número arábico para romano
const arabicToRoman = (number) => {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let romanNumber = "";

  romanNumerals.map((romanNumeral) => {
    while (number >= romanNumeral.value) {
      romanNumber += romanNumeral.symbol;
      number -= romanNumeral.value;
    }
  });
  loadResult(romanNumber);
};

// Função de conversão de número romano para arábico
const romanToArabic = (romanNumber) => {
  const romanNumerals = [
    { symbol: "M", value: 1000 },
    { symbol: "CM", value: 900 },
    { symbol: "D", value: 500 },
    { symbol: "CD", value: 400 },
    { symbol: "C", value: 100 },
    { symbol: "XC", value: 90 },
    { symbol: "L", value: 50 },
    { symbol: "XL", value: 40 },
    { symbol: "X", value: 10 },
    { symbol: "IX", value: 9 },
    { symbol: "V", value: 5 },
    { symbol: "IV", value: 4 },
    { symbol: "I", value: 1 },
  ];

  let arabicNumber = 0;
  let repeatCount = 0;

  for (let i = 0; i < romanNumber.length; i++) {
    const currentSymbol = romanNumber[i];
    const nextSymbol = romanNumber[i + 1];
    const currentSymbolValue = romanNumerals.find(
      (numeral) => numeral.symbol === currentSymbol
    ).value;
    const nextSymbolValue =
      nextSymbol !== undefined
        ? romanNumerals.find((numeral) => numeral.symbol === nextSymbol).value
        : 0;

    if (currentSymbol === nextSymbol) {
      repeatCount++;
    } else {
      repeatCount = 0;
    }

    if (repeatCount > 2) {
      alert("Erro: Algarismo repetido lado a lado por mais de três vezes!");
      arabicNumber = 0; // Zera o valor para indicar um erro
      break; // Interrompe o loop
    }

    if (currentSymbolValue < nextSymbolValue) {
      if (
        (currentSymbol === "I" && (nextSymbol === "V" || nextSymbol === "X")) ||
        (currentSymbol === "X" && (nextSymbol === "L" || nextSymbol === "C")) ||
        (currentSymbol === "C" && (nextSymbol === "D" || nextSymbol === "M"))
      ) {
        arabicNumber -= currentSymbolValue;
      } else {
        alert("Erro: Algarismo inválido!");
        arabicNumber = 0; // Zera o valor para indicar um erro
        break; // Interrompe o loop
      }
    } else {
      arabicNumber += currentSymbolValue;
    }
  }
  if (arabicNumber > 3999) {
    alert("Número supera 3999!");
    return;
  } else {
    loadResult(arabicNumber);
  }
};

// Validação dos Inputs antes de chamar as respectivas funções
const validateInput = () => {
  const arabicInput = document.getElementById("arabic-input").value;
  const romanInput = document.getElementById("roman-input").value;
  const romanUpperCase = romanInput.toUpperCase();

  const regex = /^[CDMLXVI]+$/;

  if (arabicInput !== "" && romanInput !== "") {
    alert("Preencha apenas uma das opções!");
    return;
  } else if (arabicInput !== "") {
    arabicInput >= 1 && arabicInput <= 3999
      ? arabicToRoman(Number(arabicInput))
      : alert("Número deve ser entre 1 e 3999");
  } else if (romanInput !== "") {
    regex.test(romanUpperCase)
      ? romanToArabic(romanUpperCase)
      : alert("Digite apenas I, V, X, C, D, M ou L!");
  } else {
    alert("Preencha alguma opção!");
  }
};

// Função do botão de Voltar
const onReturn = () => {
  window.open("../../index.html", "_self");
};
