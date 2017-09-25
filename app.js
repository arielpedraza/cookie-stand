'use strict';

var pike = {
  openingHour: 6,
  closingHour: 20,
  storeHours: [],
  minCust: 23,
  maxCust: 65,
  cookiesPerCust: 6.3,
  cookiesPerHour: [],
  totalSoldToday: 0,
  getCustPerHour: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  },
  initialize: function() {
    for (var i = 0; i < (this.closingHour - this.openingHour); i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      if((this.openingHour + i) >= 10){
        this.storeHours[i] = (this.openingHour + i) + ':00';
      } else {
        this.storeHours[i] = '0' + (this.openingHour + i) + ':00';
      }
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  },
  render: function() {
    this.initialize();
    var newEl;
    var targetUl = document.getElementById('pike');
    for(var i in this.cookiesPerHour){
      newEl = document.createElement('li');
      newEl.appendChild(document.createTextNode(this.storeHours[i] + ' - ' + this.cookiesPerHour[i]));
      targetUl.appendChild(newEl);
    }
  }
};

var seaTac = {
  openingHour: 6,
  closingHour: 20,
  storeHours: [],
  minCust: 3,
  maxCust: 24,
  cookiesPerCust: 1.2,
  cookiesPerHour: [],
  totalSoldToday: 0,
  getCustPerHour: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  },
  initialize: function() {
    for (var i = 0; i < (this.closingHour - this.openingHour); i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      if((this.openingHour + i) >= 10){
        this.storeHours[i] = (this.openingHour + i) + ':00';
      } else {
        this.storeHours[i] = '0' + (this.openingHour + i) + ':00';
      }
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  },
  render: function() {
    this.initialize();
    var newEl;
    var targetUl = document.getElementById('seatac');
    for(var i in this.cookiesPerHour){
      newEl = document.createElement('li');
      newEl.appendChild(document.createTextNode(this.storeHours[i] + ' - ' + this.cookiesPerHour[i]));
      targetUl.appendChild(newEl);
    }
  }
};

var seattleCenter = {
  openingHour: 6,
  closingHour: 20,
  storeHours: [],
  minCust: 11,
  maxCust: 38,
  cookiesPerCust: 3.7,
  cookiesPerHour: [],
  totalSoldToday: 0,
  getCustPerHour: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  },
  initialize: function() {
    for (var i = 0; i < (this.closingHour - this.openingHour); i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      if((this.openingHour + i) >= 10){
        this.storeHours[i] = (this.openingHour + i) + ':00';
      } else {
        this.storeHours[i] = '0' + (this.openingHour + i) + ':00';
      }
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  },
  render: function() {
    this.initialize();
    var newEl;
    var targetUl = document.getElementById('seacen');
    for(var i in this.cookiesPerHour){
      newEl = document.createElement('li');
      newEl.appendChild(document.createTextNode(this.storeHours[i] + ' - ' + this.cookiesPerHour[i]));
      targetUl.appendChild(newEl);
    }
  }
};

var capHill = {
  openingHour: 6,
  closingHour: 20,
  storeHours: [],
  minCust: 20,
  maxCust: 38,
  cookiesPerCust: 2.3,
  cookiesPerHour: [],
  totalSoldToday: 0,
  getCustPerHour: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  },
  initialize: function() {
    for (var i = 0; i < (this.closingHour - this.openingHour); i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      if((this.openingHour + i) >= 10){
        this.storeHours[i] = (this.openingHour + i) + ':00';
      } else {
        this.storeHours[i] = '0' + (this.openingHour + i) + ':00';
      }
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  },
  render: function() {
    this.initialize();
    var newEl;
    var targetUl = document.getElementById('caphill');
    for(var i in this.cookiesPerHour){
      newEl = document.createElement('li');
      newEl.appendChild(document.createTextNode(this.storeHours[i] + ' - ' + this.cookiesPerHour[i]));
      targetUl.appendChild(newEl);
    }
  }
};

var alki = {
  openingHour: 6,
  closingHour: 20,
  storeHours: [],
  minCust: 2,
  maxCust: 16,
  cookiesPerCust: 4.6,
  cookiesPerHour: [],
  totalSoldToday: 0,
  getCustPerHour: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  },
  initialize: function() {
    for (var i = 0; i < (this.closingHour - this.openingHour); i++) {
      this.cookiesPerHour[i] = Math.ceil(this.cookiesPerCust * this.getCustPerHour());
      if((this.openingHour + i) >= 10){
        this.storeHours[i] = (this.openingHour + i) + ':00';
      } else {
        this.storeHours[i] = '0' + (this.openingHour + i) + ':00';
      }
      this.totalSoldToday += this.cookiesPerHour[i];
    }
  },
  render: function() {
    this.initialize();
    var newEl;
    var targetUl = document.getElementById('alki');
    for(var i in this.cookiesPerHour){
      newEl = document.createElement('li');
      newEl.appendChild(document.createTextNode(this.storeHours[i] + ' - ' + this.cookiesPerHour[i]));
      targetUl.appendChild(newEl);
    }
  }
};

pike.render();
seaTac.render();
seattleCenter.render();
capHill.render();
alki.render();
