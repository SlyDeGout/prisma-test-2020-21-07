const fetch = require("node-fetch");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const checkAge = (age, ageRange) => {
  return ageRange.length === 2 &&
    Number.isInteger(Number(ageRange[0])) &&
    Number.isInteger(Number(ageRange[1])) &&
    Number(age) >= Number(ageRange[0]) &&
    Number(age) <= Number(ageRange[1])
    ? true
    : false;
};

const createTable = (data) => {
  const table = document.createElement("table");
  document.body.appendChild(table);
  // Table head
  const dataRef = data[0];
  // Create and populate table head
  const thead = table.createTHead();
  const row = thead.insertRow();
  Object.keys(dataRef).forEach((key) => {
    const th = document.createElement("th");
    row.appendChild(th);
    const text = document.createTextNode(key);
    th.appendChild(text);
    if (key === "name") {
      const nestedDataRef = dataRef[key];
      const nestedTable = document.createElement("table");
      th.appendChild(nestedTable);
      const nestedRow = nestedTable.insertRow();
      Object.keys(nestedDataRef).forEach((key) => {
        const th = document.createElement("th");
        nestedRow.appendChild(th);
        const text = document.createTextNode(key);
        th.appendChild(text);
      });
    }
  });

  // Table content
  data
    .filter((dat) => {
      let flagEye = true;
      let flagAge = true;
      if (urlParams.get("eyeColor")) {
        flagEye = dat.eyeColor === urlParams.get("eyeColor");
      }
      if (urlParams.get("ageRange")) {
        const ageRange = urlParams.get("ageRange").split("-");
        // Check if parameter is valid and age is inside range
        flagAge = checkAge(dat.age, ageRange);
      }
      return flagEye && flagAge;
    })
    .forEach((dat) => {
      // Create and populate table body
      let row = table.insertRow();
      for (key in dat) {
        let cell = row.insertCell();
        if (key === "name" || key === "friends") {
          const nestedDat = dat[key];
          const nestedTable = document.createElement("table");
          cell.appendChild(nestedTable);
          const tr = document.createElement("tr");
          nestedTable.appendChild(tr);

          Object.keys(nestedDat).forEach((nestedKey) => {
            const th = document.createElement("td");
            tr.appendChild(th);
            const text = document.createTextNode(
              key === "name" ? nestedDat[nestedKey] : nestedDat[nestedKey].name
            );
            th.appendChild(text);
          });
        } else {
          let text = document.createTextNode(dat[key]);
          cell.appendChild(text);
        }
      }
    });
};

const fetchAndCreate = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => createTable(data));
};

fetchAndCreate("assets/datas.json");

module.exports = checkAge;
