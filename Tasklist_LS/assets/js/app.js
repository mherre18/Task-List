// Variables
const itemsList = document.getElementById('items-list');


//Events
eventListeners();

function eventListeners(){
    document.querySelector('#form').addEventListener('submit', addItem);

    itemsList.addEventListener('click', eraseItem);

    document.addEventListener('DOMContentLoaded', localStorageReady);
}

//Functions

function addItem(e) {
    e.preventDefault();
    //console.log('Enviado');
    const item = document.getElementById('item').value;

    const eraseButton = document.createElement('a');
    eraseButton.classList = 'erase-item';
    eraseButton.innerText = 'X';

    const li = document.createElement('li');
    li.innerText = item;
    li.appendChild(eraseButton);
    itemsList.appendChild(li);

    addItemLocalStorage(item);

   // console.log(item);

}

function eraseItem(e) {
    e.preventDefault();
    if (e.target.className === 'erase-item') {
            e.target.parentElement.remove();
            eraseItemLocalStorage(e.target.parentElement.innerText);
        
        //alert('Item Borrado');
    }
    //console.log('clicl');
}

function addItemLocalStorage(item) {
    let items;
    items = getItemsLocalStorage();

    items.push(item);

    localStorage.setItem('items', JSON.stringify(items) );

    //localStorage.setItem('items', item);
}

function getItemsLocalStorage() {
    let items;

    if(localStorage.getItem('items') === null) {
        items = [];

    } else {
        items = JSON.parse(localStorage.getItem('items') );
    }
    return items;

}

function localStorageReady() {
    let items;

    items = getItemsLocalStorage();

    items.forEach(function(item) {
        const eraseButton = document.createElement('a');
        eraseButton.classList = 'erase-item';
         eraseButton.innerText = 'X';

        const li = document.createElement('li');
        li.innerText = item;
        li.appendChild(eraseButton);
        itemsList.appendChild(li); 
        
    });

    //console.log(items);
}

function eraseItemLocalStorage(item) {

    let items, eraseItem;

    eraseItem = item.substring(0, item.length - 1);

    items = getItemsLocalStorage();

    items.forEach(function(item, index) {
        if(eraseItem === item) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items) );
}