'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRollback = document.querySelector('.rollback > .main-controls__range > input[type="range"]');
const spanRollback = document.querySelector('.rollback > .main-controls__range > .range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: '',
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  countScreens: 0,
  init: function () {
    this.addTitle();
    startBtn.addEventListener('click', () => {
      if (this.checkFields()) {
        this.start();
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
      }
      this.disabledInputs();
    });
    resetBtn.addEventListener('click', () => {
      this.reset();
    })
    buttonPlus.addEventListener('click', this.addScreenBlock);
    this.changeRollback();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    // this.logger();
  },
  reset: function () {
    this.resetScreens();
    this.resetTotal();
    this.changeBtns();
    this.resetCheckboxes();
  },
  resetScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.disabled = false;
      input.disabled = false;
      select.value = '';
      input.value = '';
    });

    this.screens.forEach((screen, index) => {
      if (screen.id !== 0) {
        screens[index].remove();
      }
    });
  },
  resetTotal: function () {
    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    totalCount.value = 0;
  },
  changeBtns: function () {
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
  },
  resetCheckboxes: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      if (check.checked) {
        check.checked = !check.checked
      }
    })

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      if (check.checked) {
        check.checked = !check.checked
      }
    })
  },
  disabledInputs: function () {
    if (this.checkFields()) {
      screens = document.querySelectorAll('.screen');
      screens.forEach((screen) => {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        select.disabled = true;
        input.disabled = true;
      });
    }
  },
  checkFields: function () {
    screens = document.querySelectorAll('.screen');
    let allFieldsFilled = true;
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectValue = select.options[select.selectedIndex].value;
      const inputValue = input.value;
      if (selectValue === '' || inputValue === '') {
        allFieldsFilled = false;
        return;
      }
    });
    return allFieldsFilled;
  },
  changeRollback: function () {
    inputRollback.addEventListener('input', (event) => {
      spanRollback.textContent = event.target.value + '%';
      this.rollback = event.target.value;
    })
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
    fullTotalCount.value = this.fullPrice
    totalCountRollback.value = this.servicePercentPrice
    totalCount.value = this.countScreens
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent
      const countScreens = input.value

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: countScreens
      })
    })
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value
      }
    })
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key]
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
    }
    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

    this.screens.forEach((item) => {
      this.countScreens += +item.count;
    });
  },
  logger: function () {
    for (let key in this) {
      console.log(key + ' ' + this[key]);
    }
    console.log(this.services)
  }
}

appData.init();