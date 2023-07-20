let valutes = {};

const dates = {
   current: null,
   previous: null,
};

document.addEventListener("DOMContentLoaded", async () => {
   const selector = document.getElementById("select");

   try {
      const api = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = await api.json();

      const { Valute, Date, PreviousDate } = data;

      valutes = Valute;

      dates.current = Date;
      dates.previous = PreviousDate;

      Object.keys(Valute).map((key) => {
         const valute = Valute[key];
         selector.innerHTML += `<option value='${key}'>${valute.ID} ${valute.Name}</option>`;
      });

      setFirstElem();
   } catch (err) {
      document.getElementById(
         "error"
      ).innerHTML = `<span class="error">Fetch API error ${err.message}</span>`;
   }
});

function setFirstElem() {
   const key = Object.keys(valutes)[0];
   onChange(key);
}

function onChange(key) {
   const valute = valutes[key];

   document.getElementById(
      "activeData"
   ).innerHTML = `<span><b>${valute.ID} ${valute.Name} ${valute.CharCode}</b></span>`;

   document.getElementById("activeCurrent").innerHTML = `<span><b>${new Date(
      dates.current
   ).toLocaleString()}  ${valute.Value}</b></span>`;

   document.getElementById("activePrevios").innerHTML = `<span><b>${new Date(
      dates.previous
   ).toLocaleString()}  ${valute.Previous}</b></span>`;
}
