
const addButton = document.querySelector('.addButton');
const nameValueInput = document.querySelector('.name-value-input');
const tableBody = document.querySelector('tbody');
const table = document.querySelector('table');
const deleteButton = document.getElementById('delete-button');
const sortByNameBtn = document.querySelector('#sort-name-button');
const sortByValueBtn = document.querySelector('#sort-value-button');

addButton.addEventListener('click', () => {
  const inputValues = nameValueInput.value.split('=').map(value => value.trim());
  const [name, value] = inputValues;
  
  if (!name || !value) {
    alert('input a valid format, looks like <neme>=<value>');
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
});

// добавдение сортировки по имени


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
