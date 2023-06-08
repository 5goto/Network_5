$(document).ready(function () {
  let currentGalImage = $(".gal-item");
  currentGalImage.click(function () {
    const imageSrc = $(this).attr("src");

    $(".gal-main").attr("src", imageSrc);
  });
});

document.querySelector("select[name='sortFirst']")
.addEventListener("change", function(){
  if(this.value !== '0') {
  document.querySelector("select[name='sortSecond']").removeAttribute('disabled');
  [...document.querySelectorAll(`.sSort option, .tSort option`)]
    .map(item => {item.removeAttribute('disabled')});
  [...document.querySelectorAll(`.sSort option[value=${this.value}], .tSort option[value=${this.value}]`)]
    .map(item => {item.setAttribute('disabled', 'disabled')})
  } else {
    document.querySelector("select[name='sortSecond']").setAttribute('disabled', 'disabled');
    document.querySelector("select[name='sortThird']").setAttribute('disabled', 'disabled');
  }
  document.querySelector("select[name='sortThird']").selectedIndex = 0;
  document.querySelector("select[name='sortSecond']").selectedIndex = 0;
});

document.querySelector("select[name='sortSecond']")
.addEventListener("change", function(){
  if(this.value !== '0') {
  // document.querySelector("select[name='sortThird']").removeAttribute('disabled');
  // [...document.querySelectorAll(`.tSort option`)]
  //   .map(item => {item.removeAttribute('disabled')});
  [...document.querySelectorAll(`.tSort option[value=${this.value}], .tSort option[value=${this.value}]`)]
    .map(item => {item.setAttribute('disabled', 'disabled')})
  } else {
    document.querySelector("select[name='sortThird']").setAttribute('disabled', 'disabled');
    document.querySelector("select[name='sortThird']").selectedIndex = 0;
  }
});

document.querySelector("select[name='sortSecond']")
.addEventListener("change", function(){
  if(this.value !== '0') {
  document.querySelector("select[name='sortThird']").removeAttribute('disabled');
  } else {
    document.querySelector("select[name='sortThird']").setAttribute('disabled', 'disabled');
  }

});

$("#first-level-sort").on("click", (event) => {
  event.preventDefault();
  let guitars = {
    manufactor : [],
    model: [],
    formBody: [],
    stringsNum: [],
    freets: [],
    menz: [],
    yearCreated: [],
    insert: function(manufactor, model, formBody, stringsNum, freets, menz, yearCreated) {
        this.manufactor.push(manufactor);
        this.model.push(model);
        this.formBody.push(formBody);
        this.stringsNum.push(+stringsNum);
        this.freets.push(+freets); 
        this.menz.push(+menz);
        this.yearCreated.push(+yearCreated);
    },

    getAllKey: function () {
        let arrKey = [];
        for(let key in this) {
            if (typeof(this[key]) !== 'function') {
                arrKey.push(key)
            }    
        }
        return arrKey;
    },
    print: function() {
      let html = '<table class="diff-table"><tr>';
      let arrKey = this.getAllKey();
      html += `<th>Производитель</th><th>Модель</th>
      <th>Форма корпуса</th><th>Количество струн</th>
      <th>Количество ладов</th><th>Длина мензуры</th><th>Год производства</th>`;

      html += '</tr>';
      for(let i = 0; i < this[arrKey[0]].length; i++) {
          html += '<tr>';
          for(let key in arrKey) {
              html += `<td>${ this[arrKey[key]][i] }</td>`;
          }
          html += '</tr>';
      }
     return html + '</table>';
  }
}



  let table = document.querySelector(".diff-table ");
  let rows = Array.from(table.rows).slice(1);
  for (let index = 0; index < rows.length; index++) {
    let cell = rows[index].cells
    guitars.insert(cell[0].innerHTML, cell[1].innerHTML, cell[2].innerHTML, cell[3].innerHTML, cell[4].innerHTML, cell[5].innerHTML, cell[6].innerHTML)
  }

  let newGuitats = {__proto__: guitars};

  newGuitats.change = function(k, p) {
    let allKey = this.getAllKey();
    for(let key in allKey) {
        let w = this[allKey[key]][k];
        this[allKey[key]][k] = this[allKey[key]][p];
        this[allKey[key]][p] = w;
    }
}

newGuitats.isCompareOrder = function(n, arrCompare) {
  for(let k = 0; k < arrCompare.length; k++) {
      if(this[arrCompare[k]][n] > this[arrCompare[k]][n + 1]) {
          return true;
      } else if(this[arrCompare[k]][n] === this[arrCompare[k]][n + 1]){
          continue; // переходим к сравнению следующего поля
      } else {
          return false;
      }			
  }
  return false
}

newGuitats.sorted = function() {
  let n = this[arguments[0]].length;
  for(let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (this.isCompareOrder(j, arguments)) {
            newGuitats.change(j, j + 1);
          }
      }
  }
  return true;
}

let option1 = $("select[name='sortFirst']").val();
let option2 = $("select[name='sortSecond']").val();
let option3 = $("select[name='sortThird']").val();
const args = []
if(option1 != '0') {
  args.push(option1)
}
if(option2 != '0') {
  args.push(option2)
}
if(option3 != '0') {
  args.push(option3)
}

const mount = document.querySelector('.mount-point')
mount.style.display = 'block'
if(option1 != '0') {
  newGuitats.sorted(...args);
  mount.innerHTML = newGuitats.print()
  table.style.display = "none";
} else {
  mount.style.display = 'none'
  table.style.display = "block";
}
})  

// let firstLevelOption = -1;
// let secondLevelOption = -1;
// let slicedArrayForThirdSort = [];

// const getSlicedTable = () => {
//   let table = document.querySelector(".diff-table ");
//   let rows = Array.from(table.rows).slice(1);

//   const forSlice = [0];
//   let currentVal = rows[0].cells[parseInt(firstLevelOption)].innerHTML;
//   for (let index = 0; index < rows.length; index++) {
//     if (rows[index].cells[parseInt(firstLevelOption)].innerHTML != currentVal) {
//       forSlice.push(index);
//       currentVal = rows[index].cells[parseInt(firstLevelOption)].innerHTML;
//     }
//   }
//   const arrayOfSlicedTableParts = [];
//   for (let index = 0; index < forSlice.length; index++) {
//     arrayOfSlicedTableParts.push(
//       rows.slice(forSlice[index], forSlice[index + 1])
//     );
//   }
//   return arrayOfSlicedTableParts;
// };

// const getSecondSlice = () => {
//   let table = document.querySelector(".diff-table ");
//   let rows = Array.from(table.rows).slice(1);

//   const forSlice = [0];
//   let currentVal1 = rows[0].cells[parseInt(secondLevelOption)].innerHTML;
//   let currentVal2 = rows[0].cells[parseInt(firstLevelOption)].innerHTML;
//   for (let index = 0; index < rows.length; index++) {
//     if (
//       rows[index].cells[parseInt(secondLevelOption)].innerHTML < currentVal1 ||
//       rows[index].cells[parseInt(firstLevelOption)].innerHTML != currentVal2
//     ) {
//       forSlice.push(index);
//       currentVal1 = rows[index].cells[parseInt(secondLevelOption)].innerHTML;
//       currentVal2 = rows[index].cells[parseInt(firstLevelOption)].innerHTML;
//     }
//   }
//   const arrayOfSlicedTableParts = [];
//   for (let index = 0; index < forSlice.length; index++) {
//     arrayOfSlicedTableParts.push(
//       rows.slice(forSlice[index], forSlice[index + 1])
//     );
//   }
//   return arrayOfSlicedTableParts;
// };

// $("#third-level-sort").on("click", (event) => {
//   event.preventDefault();
//   let option = $("select[name='sortSecond']").val();
//   const tableParts = getSecondSlice();

//   let table = document.querySelector(".diff-table ");

//   for (let part of tableParts) {
//     const toAppend = part.sort((rowA, rowB) =>
//       rowA.cells[parseInt(option)].innerHTML >
//       rowB.cells[parseInt(option)].innerHTML
//         ? 1
//         : -1
//     );
//     table.tBodies[0].append(...toAppend);
//   }
// });

// $("#second-level-sort").on("click", (event) => {
//   event.preventDefault();
//   let option = $("select[name='sortSecond']").val();
//   secondLevelOption = option;

//   let tableParts = getSlicedTable();
//   slicedArrayForThirdSort = tableParts;
//   let table = document.querySelector(".diff-table ");

//   for (let part of tableParts) {
//     const toAppend = part.sort((rowA, rowB) =>
//       rowA.cells[parseInt(option)].innerHTML >
//       rowB.cells[parseInt(option)].innerHTML
//         ? 1
//         : -1
//     );
//     table.tBodies[0].append(...toAppend);
//   }
// });

// $("#first-level-sort").on("click", (event) => {
//   event.preventDefault();
//   let option = $("select[name='sortFirst']").val();
//   firstLevelOption = option;

//   let table = document.querySelector(".diff-table ");
//   let sortedRows = Array.from(table.rows)
//     .slice(1)
//     .sort((rowA, rowB) =>
//       rowA.cells[parseInt(option)].innerHTML >
//       rowB.cells[parseInt(option)].innerHTML
//         ? 1
//         : -1
//     );
//   table.tBodies[0].append(...sortedRows);
// });

const refrechTable = () => {
  const table = $(".diff-table tr").slice(1);
  for (let item of table) {
    item.style.display = "table-row";
  }
};

$("#refrash-table").on("click", (event) => {
  refrechTable();
});

$("#main-search").on("click", (event) => {
  event.preventDefault();

  let brand = $("input[name='brand']")[0].value;
  let typeName = $("input[name='typeName']")[0].value;
  let yearMin = $("input[name='yearPre']")[0].value;
  let yearMax = $("input[name='yearTo']")[0].value;

  if (
    isNaN(parseFloat(yearMin)) ||
    !isFinite(yearMax) ||
    isNaN(parseFloat(yearMin)) ||
    !isFinite(yearMax)
  ) {
    console.log("wrong");
  } else {
    yearMin = parseFloat(yearMin);
    yearMax = parseFloat(yearMax);

    const table = $(".diff-table tr").slice(1);
    for (let item of table) {
      let cells = item.cells;
      if (
        parseFloat(cells[6].innerHTML) <= yearMin ||
        parseFloat(cells[6].innerHTML) >= yearMax ||
        cells[0].innerHTML != brand ||
        cells[2].innerHTML != typeName
      ) {
        item.style.display = "none";
      }
    }
  }
});

$("#menz-search").on("click", (event) => {
  event.preventDefault();

  let min = $("input[name='menPre']")[0].value;
  let max = $("input[name='menTo']")[0].value;

  if (
    isNaN(parseFloat(min)) ||
    !isFinite(max) ||
    isNaN(parseFloat(min)) ||
    !isFinite(max)
  ) {
    console.log("wrong");
  } else {
    min = parseFloat(min);
    max = parseFloat(max);

    const table = $(".diff-table tr").slice(1);
    for (let item of table) {
      let cells = item.cells;
      if (
        parseFloat(cells[5].innerHTML) <= min ||
        parseFloat(cells[5].innerHTML) >= max
      ) {
        item.style.display = "none";
      }
    }
  }
});

$("#string-button").on("click", (event) => {
  event.preventDefault();
  // refrechTable();
  const radio = $("input[name='stringsNum']");

  let radioValue = "";
  for (let item of radio) {
    if ($(item).is(":checked")) {
      radioValue = item.value;
    }
  }

  const table = $(".diff-table tr").slice(1);
  for (let item of table) {
    let cells = item.cells;
    if (cells[3].innerHTML !== radioValue) {
      item.style.display = "none";
    }
  }
});
