//es5
//const toClassCheck = require('./toClassCheck');

//es6
import { toClassCheck } from './toClassCheck';
const $ = require('jquery');

const main = $('main');
const button = $('#button');
const input = $('#weather_Search');
const output = $('#output');
const buttonClear = $('.clear_button');
const buttonMyWeather = $('.my_weather');

function getWeather(val) {
  if (val != '') {
    fetch(`http://api.apixu.com/v1/current.json?key=c79c30965ca349f89b3181040193007&q=${val}`)
      .then(response => response.json())
      .then((data) => {
        const region = '.' + toClassCheck(data.location.region);
        if (!$('.table_weather').length) {
          createTable();
          createRow(data.location.name, data.location.country, data.current.temp_c, data.current.condition.icon, data.location.region);
        } else {
          if ($(region).length) {
            updateRow(data.location.region, data.current.temp_c, data.current.condition.icon);
          } else {
            createRow(data.location.name, data.location.country, data.current.temp_c, data.current.condition.icon, data.location.region);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

function clearDataTable() {
  $('.table_weather').remove();
}

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) => getWeather(`${coords.latitude}, ${coords.longitude}`));
}

function createTable() {

  const table = document.createElement('div');
  table.classList.add('table_weather');

  const tableHead = document.createElement('div');
  tableHead.classList.add('tableHead');
  table.append(tableHead);

  const headCity = document.createElement('div');
  headCity.classList.add('city');
  headCity.innerText = 'City';
  tableHead.append(headCity);

  const headCountry = document.createElement('div');
  headCountry.classList.add('country');
  headCountry.innerText = 'Country';
  tableHead.append(headCountry);

  const headTempC = document.createElement('div');
  headTempC.classList.add('temp_c');
  headTempC.innerText = 't, °C';
  tableHead.append(headTempC);

  const headCondition = document.createElement('div');
  headCondition.classList.add('condition');
  headCondition.innerText = 'Condition';
  tableHead.append(headCondition);

  main.append(table);
}

function createRow() {
  const tRow = `
    <div class='tRow ${toClassCheck(arguments[4])}'>
      <div class='city'>${arguments[0]}</div>
      <div class='country'>${arguments[1]}</div>
      <div class='temp_c'>${arguments[2]}</div>
      <div class='condition'><img src="${arguments[3]}" alt ="${arguments[0]}"></div>
    </div>
    `;
  $('.table_weather').append(tRow);
}

function updateRow() {
  const temp_c = $('.' + toClassCheck(arguments[0]) + ' .temp_c');
  const cond = $('.' + toClassCheck(arguments[0]) + ' .condition >img');
  temp_c.text(arguments[1]);
  cond.attr("src", "http://" + arguments[2]);
}


$("#button").click(() => {
  getWeather(input.val());
});

buttonMyWeather.click(() => {
  getLocation();
});


buttonClear.click(() => {
  clearDataTable();
})
