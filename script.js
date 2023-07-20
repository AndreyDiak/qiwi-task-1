let valutes = {};

const dates = {
   current: null,
   previous: null,
};

async function onLoad() {
   const data = await fetchData();

   const { Valute, Date, PreviousDate } = data;

   valutes = Valute;

   dates.current = Date;
   dates.previous = PreviousDate;

   const selector = document.getElementById("select");

   // adds options to selector
   Object.keys(Valute).map((key) => {
      const valute = Valute[key];
      selector.innerHTML += `<option value='${key}'>${valute.ID} ${valute.Name}</option>`;
   });

   // setting first el as active
   setFirstElem();
}

async function fetchData() {
   try {
      const api = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

      document.getElementById("error").innerHTML = "";
      return api.json();
   } catch (e) {
      document.getElementById("error").innerHTML = `
         <span class="error">
            Fetch API error ${e.message}
            <button onclick="onLoad();">Refetch Data</button>
         </span>
      `;
   }
}

function setFirstElem() {
   const key = Object.keys(valutes)[0];
   onChange(key);
}

// on selector change handler
function onChange(key) {
   const valute = valutes[key];

   const innerDateHtml = (date) => `<span>${new Date(date).toLocaleString()}</span>`;

   const innerPriceHtml = (price, numCode) =>
      `<span><b>${price} <span class='valuteSymbol'>&#${numCode}</span></b></span>`;

   document.getElementById("activeData").innerHTML = `
      <b>${valute.ID}</b>
      <span>${valute.Name} <b>${valute.CharCode}</b></span>
   `;

   document.getElementById("activeCurrent").innerHTML = `
      <span>Тек.</span>
      ${innerDateHtml(dates.current)}
      ${innerPriceHtml(valute.Value, valute.NumCode)}
     `;

   document.getElementById("activePrevious").innerHTML = `
      <span>Пред.</span>
      ${innerDateHtml(dates.previous)}
      ${innerPriceHtml(valute.Previous, valute.NumCode)}
   `;
}

document.addEventListener("DOMContentLoaded", async () => onLoad());
