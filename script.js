let valutes = {};

const dates = {
   current: null,
   previous: null,
};

document.addEventListener("DOMContentLoaded", async () => {
   const data = await fetchData();

   const { Valute, Date, PreviousDate } = data;

   valutes = Valute;

   dates.current = Date;
   dates.previous = PreviousDate;

   const selector = document.getElementById("select");

   Object.keys(Valute).map((key) => {
      const valute = Valute[key];
      selector.innerHTML += `<option value='${key}'>${valute.ID} ${valute.Name}</option>`;
   });

   setFirstElem();
});

async function fetchData() {
   try {
      const api = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      return api.json();
   } catch (e) {
      document.getElementById(
         "error"
      ).innerHTML = `<span class="error">Fetch API error ${e.message}</span>`;
   }
}

function setFirstElem() {
   const key = Object.keys(valutes)[0];
   onChange(key);
}

function onChange(key) {
   const valute = valutes[key];

   document.getElementById(
      "activeData"
   ).innerHTML = `<span><b>${valute.ID} ${valute.Name} ${valute.CharCode}</b></span>`;

   const innerDateHtml = (date) => `<span>${new Date(date).toLocaleString()}</span>`;

   const innerPriceHtml = (price, numCode) =>
      `<span><b>${price} <span class='valuteSymbol'>&#${numCode}</span></b></span>`;

   document.getElementById("activeCurrent").innerHTML = `
      <span>Тек. дата</span>
      ${innerDateHtml(dates.current)}
      ${innerPriceHtml(valute.Value, valute.NumCode)}
     `;

   document.getElementById("activePrevious").innerHTML = `
      <span>Пред. дата</span>
      ${innerDateHtml(dates.previous)}
      ${innerPriceHtml(valute.Previous, valute.NumCode)}
   `;
}
