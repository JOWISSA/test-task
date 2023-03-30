
const addButton = document.querySelector('.addButton');
const nameValueInput = document.querySelector('.name-value-input');
const tableBody = document.querySelector('tbody');
const table = document.querySelector('table');
const deleteButton = document.getElementById('delete-button');
const sortByNameBtn = document.querySelector('#sort-name-button');
const sortByValueBtn = document.querySelector('#sort-value-button');
const xmlBtn = document.querySelector('#xml-button');
const saveBtn = document.querySelector('#save-button');


const addToInput = () => {
  const inputValues = nameValueInput.value.split('=').map(value => value.trim());
  const [name, value] = inputValues;
  
  const isValid = (inputValues) => {
    const [name, value] = inputValues.split('=').map(str => str.trim());
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(name) && regex.test(value);
  }
  
  if (!name || !value || !isValid(name + '=' + value)) {
    alert('entered must have only letters or numbers and look in the format <name>=<value>');
    return;
  }
  
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const valueCell = document.createElement('td');

  nameCell.textContent = name;
  valueCell.textContent = value;
  row.appendChild(nameCell);
  row.appendChild(valueCell);
  tableBody.appendChild(row);

  nameValueInput.value = '';
}

addButton.addEventListener('click', addToInput);

document.addEventListener( 'keyup', event => {
  if( event.code === 'Enter' ) {
    addToInput()
  };
});

sortByNameBtn.addEventListener('click', () => {
  const tbody = document.querySelector('tbody');
  const tBodyRows = [...tbody.rows];

  tBodyRows.sort((a, b) => {
    const aIn = a.cells[0].innerText;
    const bIn = b.cells[0].innerText;

    return aIn.localeCompare(bIn);
  });

  tbody.innerHTML = '';
  tbody.append(...tBodyRows);
} )

sortByValueBtn.addEventListener('click', () => {
  const tbody = document.querySelector('tbody');
  const tBodyRows = [...tbody.rows];

  function usdNum(str) {
    return Number(str.replace(/\D/g, ''));
  }

  tBodyRows.sort((a, b) => {
    const aIn = a.cells[1].innerText;
    const bIn = b.cells[1].innerText;

    return usdNum(aIn) - usdNum(bIn) || aIn.localeCompare(bIn);
  });

  tbody.innerHTML = '';
  tbody.append(...tBodyRows);
})
  
deleteButton.addEventListener('click', () => {
  const selectedRows = table.querySelectorAll('tr.selected');
  
  selectedRows.forEach(row => row.remove());
});

table.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  
  if (!row) {
    return;
  }
  
  row.classList.add('selected');
});

table.addEventListener('dblclick', (event) => {
  const row = event.target.closest('tr');
  
  if (!row) {
    return;
  }

  row.classList.remove('selected');
});

saveBtn.addEventListener('click', () => {
  const xmlDoc = document.implementation.createDocument(null, 'root', null);
  const rootElement = xmlDoc.documentElement;

  const tableRows = tableBody.querySelectorAll('tr');
  tableRows.forEach(function(row) {
    const itemElement = xmlDoc.createElement('item');

    const nameElement = xmlDoc.createElement('name');
    const nameValue = row.cells[0].textContent;
    const nameObj = {name: nameValue};
    nameElement.textContent = JSON.stringify(nameObj);

    const valueElement = xmlDoc.createElement('value');
    const valueText = row.cells[1].textContent;
    const valueObj = {value: valueText};
    valueElement.textContent = JSON.stringify(valueObj);

    itemElement.appendChild(nameElement);
    itemElement.appendChild(valueElement);

    rootElement.appendChild(itemElement);
  });

  const xmlSerializer = new XMLSerializer();
  const xmlDocument = xmlSerializer.serializeToString(xmlDoc);

  const parser = new DOMParser();
  const xmlNode = parser.parseFromString(xmlDocument, 'text/xml').documentElement;

  const xmlBlob = new Blob([xmlNode.outerHTML], { type: 'text/xml' });
  const xmlUrl = URL.createObjectURL(xmlBlob);

  const downloadLink = document.createElement('a');
  downloadLink.href = xmlUrl;
  downloadLink.download = 'data-of-input.xml';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(xmlUrl);
});



xmlBtn.addEventListener('click', () => {
  const xmlDoc = document.implementation.createDocument(null, 'root', null);
  const rootElement = xmlDoc.documentElement;

  const tableRows = tableBody.querySelectorAll('tr');
  tableRows.forEach(function(row) {
    const itemElement = xmlDoc.createElement('item');

    const nameElement = xmlDoc.createElement('name');
    const nameValue = row.cells[0].textContent;
    const nameObj = {name: nameValue};
    nameElement.textContent = JSON.stringify(nameObj);

    const valueElement = xmlDoc.createElement('value');
    const valueText = row.cells[1].textContent;
    const valueObj = {value: valueText};
    valueElement.textContent = JSON.stringify(valueObj);

    itemElement.appendChild(nameElement);
    itemElement.appendChild(valueElement);

    rootElement.appendChild(itemElement);
  });

  const xmlSerializer = new XMLSerializer();
  const xmlDocument = xmlSerializer.serializeToString(xmlDoc);

  const parser = new DOMParser();
  const xmlNode = parser.parseFromString(xmlDocument, 'text/xml').documentElement;

  const xmlBlob = new Blob([xmlNode.outerHTML], { type: 'text/xml' });
  const xmlUrl = URL.createObjectURL(xmlBlob);

  const xmlWindow = window.open();
  xmlWindow.document.write('<html><body><pre>');
  xmlWindow.document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
  xmlWindow.document.write(new XMLSerializer().serializeToString(xmlNode));
  xmlWindow.document.write('</pre></body></html>');
});
