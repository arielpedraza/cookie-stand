'use strict';
var allStores = [];
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function CookieStore(minCust, maxCust, cookiesPerCust, storeName) {
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
  document.getElementById('sales-table').appendChild(newTrEl);
};

var pike = new CookieStore(23, 65, 6.3, '1st and Pike');
var seaTac = new CookieStore(3, 24, 1.2, 'SeaTac Airport');
var seaCen = new CookieStore(11, 38, 3.7, 'Seattle Center');
var capHill = new CookieStore(20, 38, 2.3, 'Capitol Hill');
var alki = new CookieStore(2, 16, 4.6, 'Alki');

makeHeaderRow();
pike.render();
seaTac.render();
seaCen.render();
capHill.render();
alki.render();
calculateHourTotals();
//end of file
