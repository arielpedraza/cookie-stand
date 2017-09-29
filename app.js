'use strict';
var elForm = document.getElementById('add-modify-form');
var elTable = document.getElementById('sales-table');
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allStores = [];
var allStoreNames = [];

function CookieStore(storeName, minCust, maxCust, cookiesPerCust){
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesPerCust = cookiesPerCust;
  this.cookiesPerHour = [];
  this.totalSoldToday = 0;
  allStores.push(this);
  allStoreNames.push(this.storeName.toLowerCase());
}

CookieStore.prototype.getCustPerHour = function(){
  return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
};

CookieStore.prototype.initialize = function(){
  for (var i = 0; i < storeHours.length; i++) {
    this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
    this.totalSoldToday += this.cookiesPerHour[i];
  }
};

CookieStore.prototype.render = function () {
  this.initialize();
  var newTrEl = document.createElement('tr');
  createCell(newTrEl, this.storeName, true);
  for(var i in this.cookiesPerHour){
    createCell(newTrEl, this.cookiesPerHour[i], false);
  }
  createCell(newTrEl, this.totalSoldToday, false);
  newTrEl.setAttribute('id', this.storeName.toLowerCase());
  elTable.appendChild(newTrEl);
};

CookieStore.prototype.editSales = function(a, b, c, childEl){
  this.minCust = a;
  this.maxCust = b;
  this.cookiesPerCust = c;
  this.totalSoldToday = 0;
  this.initialize();
  for(var i in this.cookiesPerHour){
    childEl = childEl.nextSibling;
    childEl.textContent = this.cookiesPerHour[i];
  }
  childEl = childEl.nextSibling;
  childEl.textContent = this.totalSoldToday;
};

function createCell(row, data, isHeader){
  if(isHeader){
    var newThEl = document.createElement('th');
    newThEl.textContent = data;
    row.appendChild(newThEl);
  }else{
    var newTdEl = document.createElement('td');
    newTdEl.textContent = data;
    row.appendChild(newTdEl);
  }
}

function makeHeaderRow(){
  var newTrEl = document.createElement('tr');
  createCell(newTrEl, 'Store Locations', true);
  for(var i in storeHours){
    createCell(newTrEl, storeHours[i], true);
  }
  createCell(newTrEl, 'Total', true);
  newTrEl.setAttribute('id', 'firstrow');
  elTable.appendChild(newTrEl);
};

function calculateHourTotals(){
  var dailyTotal = 0;
  var newTrEl = document.createElement('tr');
  createCell(newTrEl, 'Total: ', true);
  for(var i in storeHours){
    var hourTotal = 0;
    for(var j in allStores){
      hourTotal += allStores[j].cookiesPerHour[i];
    }
    dailyTotal += hourTotal;
    createCell(newTrEl, hourTotal, false);
  }
  createCell(newTrEl, dailyTotal, false);
  newTrEl.setAttribute('id', 'lastrow');
  elTable.appendChild(newTrEl);
};

function removeHourTotals(){
  var removeEl = document.getElementById('lastrow');
  var parentEl = removeEl.parentNode;
  parentEl.removeChild(removeEl);
}

function addModifyTable(event){
  event.preventDefault();
  var input1 = event.target.storename.value;
  var input2 = parseInt(event.target.mincust.value, 10);
  var input3 = parseInt(event.target.maxcust.value, 10);
  var input4 = parseInt(event.target.avgcookie.value, 10);
  if (!input1 || !input2 || !input3 || !input4){
    return alert('Fields cannot be empty!');
  }else if (input2 < 0 || input3 < 0 || input4 < 0){
    return alert('Fields cannot be less than zero!');
  }else if (input2 > input3){
    return alert('Min customer cannot be more than max customer!');
  }
  if (!allStoreNames.includes(input1.toLowerCase())){
    var newStore = new CookieStore(input1, input2, input3, input4);
    newStore.render();
  } else {
    var removeEl = document.getElementById(input1.toLowerCase());
    var childEl = removeEl.firstChild;
    var tempIndex = allStoreNames.indexOf(input1.toLowerCase());
    allStores[tempIndex].editSales(input2, input3, input4, childEl);
  }
  removeHourTotals();
  calculateHourTotals();
  event.target.storename.value = null;
  event.target.mincust.value = null;
  event.target.maxcust.value = null;
  event.target.avgcookie.value = null;
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
