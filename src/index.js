// 1. WIP SL : "Le tableau devra avoir au moins 7 colonnes dont : Nom, Prénom, Âge, Couleur des yeux et email."

// 2. WIP SL : Le tableau devra pouvoir être filtré grâce à des paramètre en query `?` dans l'URL.
//    WIP SL : L'entrée `eyeColor` devra être filtrable suivant l'une des valeurs suivantes: `blue`, `brown`, `green`
//    WIP SL : L'entrée `age` devra être filtrable par tranche de 5 ans : de 20 à 25 ans, de 26 à 30 ans, de 31 à 35 ans et enfin de 36 à 41 ans

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const createTable = (table, data) => {
  // Table head
  const thead = table.createTHead();
  const row = thead.insertRow();
  const rowRef = data[0];
  Object.keys(rowRef).forEach((key) => {
    const th = document.createElement("th");
    row.appendChild(th);
    const text = document.createTextNode(key);
    th.appendChild(text);
    if (key === "name") {
      const nestedRowRef = rowRef[key];
      const tr = document.createElement("tr");
      th.appendChild(tr);
      Object.keys(nestedRowRef).forEach((key) => {
        const th = document.createElement("th");
        tr.appendChild(th);
        const text = document.createTextNode(key);
        th.appendChild(text);
      });
    }
  });

  // Table content
  data
    .filter((el) => {
      let flag = true;
      if (urlParams.get("eyeColor")) {
        flag = el.eyeColor === urlParams.get("eyeColor");
      }
      if (urlParams.get("ageRange")) {
        const ageRange = urlParams.get("ageRange").split("-");
        if (
          !(
            ageRange.length === 2 &&
            Number.isInteger(Number(ageRange[0])) &&
            Number.isInteger(Number(ageRange[1]))
          )
        ) {
          flag = false;
        } else {
          flag =
            Number(ageRange[0]) <= Number(el.age) &&
            Number(el.age) <= Number(ageRange[1])
              ? true
              : false;
        }
      }
      return flag;
    })
    .forEach((el) => {
      let row = table.insertRow();
      for (key in el) {
        let cell = row.insertCell();
        if (key === "name") {
          const nestedEls = el[key];
          const tr = document.createElement("tr");
          cell.appendChild(tr);
          Object.keys(nestedEls).forEach((key) => {
            const th = document.createElement("td");
            tr.appendChild(th);
            const text = document.createTextNode(nestedEls[key]);
            th.appendChild(text);
          });
        } else if (key === "friends") {
          const nestedEls = el[key];
          const tr = document.createElement("tr");
          cell.appendChild(tr);
          Object.keys(nestedEls).forEach((key) => {
            const th = document.createElement("td");
            tr.appendChild(th);
            const text = document.createTextNode(nestedEls[key].name);
            th.appendChild(text);
          });
        } else {
          let text = document.createTextNode(el[key]);
          cell.appendChild(text);
        }
      }
    });
};

// WIP SL !!!! bug avec async/await

let fetchAndCreate = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => createTable(document.querySelector("table"), data));
};

fetchAndCreate("./assets/datas.json");

module.exports = createTable;

// const englishCode = "en-US";
// const spanishCode = "es-ES";
// function getAboutUsLink(language) {
//   switch (language.toLowerCase()) {
//     case englishCode.toLowerCase():
//       return "/about-us";
//     case spanishCode.toLowerCase():
//       return "/acerca-de";
//   }
//   return "";
// }

// module.exports = getAboutUsLink;
