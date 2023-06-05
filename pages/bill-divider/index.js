// Variáveis globais: Lista de Clientes e Lista de Produtos
let clientList = [];
let productList = [];

// Função que carrega a lista de clientes dentro do modal de adição de produto
const onLoadModalBuyerList = () => {
  const buyerList = document.getElementById("buyers-list");
  buyerList.innerHTML = "";

  clientList.map((client) => {
    const buyerContainer = document.createElement("div");
    buyerContainer.className = "buyer-checkbox-container";
    const buyerCheckbox = document.createElement("input");
    const buyerLabel = document.createElement("label");
    const buyerName = document.createTextNode(client.name);

    buyerCheckbox.type = "checkbox";
    buyerCheckbox.id = `${client.name}`;

    buyerLabel.for = `${client.name}`;

    buyerLabel.appendChild(buyerName);
    buyerContainer.appendChild(buyerCheckbox);
    buyerContainer.appendChild(buyerLabel);
    buyerList.appendChild(buyerContainer);
  });
};

// Função que carrega a lista de produtos em seu respectivo container na página
const onLoadProductList = () => {
  const table = document.getElementById("product-table");
  const totalDue = document.getElementById("total-due-container");
  const totalDueTextContainer = document.createElement("h3");
  const totalDueValueContainer = document.createElement("h3");
  const totalDueText = document.createTextNode("Total");
  const totalDueValue = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(
      productList.reduce((acc, product) => acc + Number(product.value), 0)
    )
  );

  table.innerHTML = "";
  totalDue.innerHTML = "";

  productList.map((product) => {
    const tableRow = document.createElement("tr");

    // render name of product
    const productTd = document.createElement("td");
    productTd.className = "left-align";
    const productText = document.createTextNode(product.name);
    const valueTd = document.createElement("td");
    valueTd.className = "right-align";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.value)
    );

    productTd.appendChild(productText);
    tableRow.appendChild(productTd);
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    table.appendChild(tableRow);
  });

  totalDueTextContainer.appendChild(totalDueText);
  totalDueValueContainer.appendChild(totalDueValue);
  totalDue.appendChild(totalDueTextContainer);
  totalDue.appendChild(totalDueValueContainer);
};

// Função que carrega a lista de clientes, junto ao valor devido e valor de gorjeta, em seu respectivo container
const onLoadClientList = () => {
  const table = document.getElementById("client-table");
  table.innerHTML = "";

  const clientTitleElement = document.createElement("th");
  const clientTitleText = document.createTextNode("Nome");
  const clientValueTitleElement = document.createElement("th");
  const clientValueTitleText = document.createTextNode("Valor");
  const clientTipTitleElement = document.createElement("th");
  const clientTipTitleText = document.createTextNode("Gorjeta");
  const titleRow = document.createElement("tr");

  clientTitleElement.appendChild(clientTitleText);
  clientValueTitleElement.appendChild(clientValueTitleText);
  clientTipTitleElement.appendChild(clientTipTitleText);

  titleRow.appendChild(clientTitleElement);
  titleRow.appendChild(clientValueTitleElement);
  titleRow.appendChild(clientTipTitleElement);

  table.appendChild(titleRow);

  clientList.map((client) => {
    const tableRow = document.createElement("tr");

    // render name of client, value and tip
    const clientTd = document.createElement("td");
    clientTd.className = "left-align";
    const clientText = document.createTextNode(client.name);
    const valueTd = document.createElement("td");
    valueTd.className = "center-align";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(client.value)
    );

    const valueTipElement = document.createElement("td");
    valueTipElement.classList = "center-align";
    const valueTipText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(client.value * 0.1)
    );

    clientTd.appendChild(clientText);
    tableRow.appendChild(clientTd);
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);
    valueTipElement.appendChild(valueTipText);
    tableRow.appendChild(valueTipElement);

    table.appendChild(tableRow);
  });
};

// Função para adicionar cliente
const onAddClient = () => {
  const clientName = document.getElementById("client-input").value;

  if (clientName === "") {
    alert("Digite o nome do cliente!");
    return;
  } else {
    const client = { name: clientName, value: 0.0 };
    clientList.push(client);
    clientName.value = "";
    onLoadClientList();
  }
};

// Função que reseta os inputs do modal de adição de produto
const resetModal = () => {
  const inputTitle = document.getElementById("input-title");
  const inputValue = document.getElementById("input-value");
  const checkboxes = document.querySelectorAll(
    '.buyer-checkbox-container input[type="checkbox"]'
  );

  inputTitle.value = "";
  inputValue.value = "";

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

// Função para adicionar produto
const onCallAddProduct = () => {
  const productValue = document.getElementById("input-value").value;
  const checkboxes = document.querySelectorAll(
    '.buyer-checkbox-container input[type="checkbox"]'
  );
  const checkedBuyers = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedBuyers.push(checkbox.id);
    }
  });

  const productValueDivided = productValue / checkedBuyers.length;

  checkedBuyers.forEach((buyer) => {
    const client = clientList.find((client) => client.name === buyer);
    if (client) {
      client.value += productValueDivided;
    }
  });

  const productName = document.getElementById("input-title").value;
  const product = { name: productName, value: productValue };
  productList.push(product);

  onCloseModal();
  resetModal();
  onLoadClientList();
  onLoadProductList();
};

// Função que abre o modal
const onOpenModal = () => {
  if (clientList.length === 0) {
    alert("Adicione algum cliente!");
    return;
  } else {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    onLoadModalBuyerList();
  }
};

// Função que fecha o modal
const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

// Função do botão Voltar
const onReturn = () => {
  window.open("../../index.html", "_self");
};
