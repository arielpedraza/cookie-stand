'use strict';
var elForm = document.getElementById('add-modify-form');
var allStores = [];
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allStoreNames = [];

function CookieStore(storeName, minCust, maxCust, cookiesPerCust) {
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesPerCust = cookiesPerCust;
  this.cookiesPerHour = [];
  this.totalSoldToday = 0;
  allStores.push(this);

  this.getCustPerHour = function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  };
  this.initialize = function() {
    for (var i = 0; i < storeHours.length; i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  };
  this.render = function() {
    this.initialize();
    var newTrEl = document.createElement('tr');
    var newTdEl = document.createElement('td');
    newTdEl.textContent = this.storeName;
    newTrEl.appendChild(newTdEl);
    for(var i in this.cookiesPerHour){
      newTdEl = document.createElement('td');
      newTdEl.textContent = this.cookiesPerHour[i];
      newTrEl.appendChild(newTdEl);
    }
    newTdEl = document.createElement('td');
    newTdEl.textContent = this.totalSoldToday;
    newTrEl.appendChild(newTdEl);
    newTrEl.setAttribute('id', this.storeName);
    document.getElementById('sales-table').appendChild(newTrEl);
  };
}

function makeHeaderRow(){
  var newTrEl = document.createElement('tr');
  var newThEl = document.createElement('th');
  newThEl.textContent = '';
  newTrEl.appendChild(newThEl);
  for(var i in storeHours){
    newThEl = document.createElement('th');
    newThEl.textContent = storeHours[i];
    newTrEl.appendChild(newThEl);
  }
  newThEl = document.createElement('th');
  newThEl.textContent = 'Total';
  newTrEl.appendChild(newThEl);
  newTrEl.setAttribute('id', 'firstrow');
  document.getElementById('sales-table').appendChild(newTrEl);
};

function calculateHourTotals(){
  var dailyTotal = 0;
  var newTrEl = document.createElement('tr');
  var newTdEl = document.createElement('td');
  newTdEl.textContent = 'Total:';
  newTrEl.appendChild(newTdEl);
  for(var i in storeHours){
    var hourTotal = 0;
    for(var j in allStores){
      hourTotal += allStores[j].cookiesPerHour[i];
    }
    dailyTotal += hourTotal;
    newTdEl = document.createElement('td');
    newTdEl.textContent = hourTotal;
    newTrEl.appendChild(newTdEl);
  }
  newTdEl = document.createElement('td');
  newTdEl.textContent = dailyTotal;
  newTrEl.appendChild(newTdEl);
  newTrEl.setAttribute('id', 'lastrow');
  document.getElementById('sales-table').appendChild(newTrEl);
};

function addModifyTable(event){
  var input1 = event.target.storename.value;
  var input2 = parseInt(event.target.mincust.value, 10);
  var input3 = parseInt(event.target.maxcust.value, 10);
  var input4 = parseInt(event.target.avgcookie.value, 10);
  var removeEl, parentEl, childEl;
  event.preventDefault();
  if (!input1 || !input2 || !input3 || !input4){
    return alert('Fields cannot be empty!');
  }
  for (var i in allStores){
    allStoreNames[i] = allStores[i].storeName;
  }
  if (allStoreNames.includes(input1)){
    //console.log('Store already exists');
    //Update existing store's values
    var tempIndex = allStoreNames.indexOf(input1);
    allStores[tempIndex].minCust = input2;
    allStores[tempIndex].maxCust = input3;
    allStores[tempIndex].cookiesPerCust = input4;
    allStores[tempIndex].totalSoldToday = 0;
    //remove and replace existing store
    removeEl = document.getElementById(input1);
    parentEl = removeEl.parentNode;
    childEl = removeEl.firstChild;
    allStores[tempIndex].initialize();
    for(i in allStores[tempIndex].cookiesPerHour){
      childEl = childEl.nextSibling;
      childEl.textContent = allStores[tempIndex].cookiesPerHour[i];
    }
    childEl = childEl.nextSibling;
    childEl.textContent = allStores[tempIndex].totalSoldToday;
    //remove and replace last row
    removeEl = document.getElementById('lastrow');
    parentEl = removeEl.parentNode;
    parentEl.removeChild(removeEl);
    calculateHourTotals();
  } else {
    var newStore = new CookieStore(input1, input2, input3, input4);
    removeEl = document.getElementById('lastrow');
    parentEl = removeEl.parentNode;
    parentEl.removeChild(removeEl);
    newStore.render();
    calculateHourTotals();
  }
  input1 = null;
  input2 = null;
  input3 = null;
  input4 = null;
};

function masterRender(){
  makeHeaderRow();
  for (var i in allStores){
    allStores[i].render();
  }
  calculateHourTotals();
};

new CookieStore('1st and Pike', 23, 65, 6.3);
new CookieStore('SeaTac Airport', 3, 24, 1.2);
new CookieStore('Seattle Center', 11, 38, 3.7);
new CookieStore('Capitol Hill', 20, 38, 2.3);
new CookieStore('Alki', 2, 16, 4.6);

masterRender();

elForm.addEventListener('submit', addModifyTable);

//end of file
