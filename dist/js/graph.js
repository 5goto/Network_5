

function makeDataSet() {
    const data = []
    
    let table = document.querySelector(".diff-table ");
    let rows = Array.from(table.rows).slice(1);
    for (let index = 0; index < rows.length; index++) {
        let cell = rows[index].cells
        let val = {}
        val.manufactor = cell[0].innerHTML;
        val.model = cell[1].innerHTML;
        val.formBody = cell[2].innerHTML;
        val.stringsNum = cell[3].innerHTML;
        val.freets = cell[4].innerHTML;
        val.menz = cell[5].innerHTML;
        val.yearCreated = cell[6].innerHTML;
        data.push(val)
      }
    return data;
}

function getArrGraph(arrObject, fieldX, fieldY) {

    // сформируем список меток по оси OX (различные элементы поля fieldX)
     // см. стр. 8-9 Теоретического материала к ЛР
     let tmp = d3.group(arrObject, d => d[fieldX])
     const groupObj = []
    // console.log(tmp);
    for (let key of tmp) {
        groupObj.push(key[0])
    }

     const arrGroup = []; // массив объектов для построения графика
     for(let entry of tmp) {

        let hiArr = []
        for(let hie of entry[1]) {
            hiArr.push(hie[fieldY])
        }
    
     //выделяем минимальное и максимальное значения поля fieldY
     //для очередной метки по оси ОХ
     let minMax = d3.extent(hiArr)
     let elementGroup = {};
     elementGroup.labelX = entry[0]
     elementGroup.valueMin = minMax[0]
     elementGroup.valueMax = minMax[1]

     arrGroup.push(elementGroup);
     }
     return arrGroup;
}

function drawGraphGisto(data_, onlyY) {
    let data = data_
    let width = 1000;
    let height = 400;
    let marginX = 50;
    let marginY = 40;

    let svg = d3.select("svg")
    .attr("height", height)
    .attr("width", width);


     // очищаем svg перед построением
     svg.selectAll("*").remove();


    let min = d3.min(data.map(d => d.valueMin)) * 0.95;
    let max = d3.max(data.map(d => d.valueMax)) * 1.05;


    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;
    // функции шкалирования
    let scaleX = d3.scaleBand()
    .domain(data.map(function(d) {
    return d['labelX'];
    }))
    .range([0, xAxisLen])
    .padding(0.2);
    let scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([yAxisLen, 0]);
    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная

    let axisY = d3.axisLeft(scaleY);// вертикальная

    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis").selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)";
    });
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .call(axisY);
    //цвета столбиков
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    //создание и отрисовка столбиков гистограммы
    g =svg.append("g")
    .attr("transform", `translate(${ marginX}, ${ marginY})`)
    .selectAll(".rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d) { return scaleX(d['labelX']) ; })
    .attr("width", scaleX.bandwidth())
    .attr("y", function(d) { return scaleY(d['valueMax']); })
    .attr("height", function(d) { return yAxisLen - scaleY(d['valueMax']); })
    .attr("fill", function(d) { return color(d['labelX']); });

}

document.querySelector('#makeGraph').addEventListener("click", () => {
    let radios = document.querySelectorAll('.oX')
    let checkboxes = document.querySelectorAll('.oY')

    let graphType = ''
    let oX = ''
    let oY = []
    for (let rad of radios) {
        if(rad.checked) {
            oX = rad.value
        }
    }
    for (let box of checkboxes) {
        if(box.checked) {
            oY.push(box.value)
        }
    }


    if(oY.length != 1) {
        alert('Не корректное значениe по оси OY')
    } else {
        drawGraphGisto(getArrGraph(makeDataSet(), oX, oY[0]))
    }
});
