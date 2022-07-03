$("body").on("input", ".input-range", function () {
  this.value = this.value.replace(/[^0-9\.\,]/g, "");
  isright(this);
});

const isright = (obj) => {
  if (obj.value > Number(obj.max)) obj.value = obj.max;
  if (obj.value < Number(obj.min)) obj.value = obj.min;
}

let line = 1;

//функция замены id DOM элементов
const swap = (i, k) => {
  document.getElementById("line" + i).id = "line" + k;
  document.getElementById("add" + i).setAttribute("onclick", "AddItem(" + k + ")");
  document.getElementById("add" + i).id = "add" + k;
  document.getElementById("del" + i).setAttribute("onclick", "DelItem(" + k + ")");
  document.getElementById("del" + i).id = "del" + k;
  document.getElementById("h5line" + i).innerHTML = "Линия " + k;
  document.getElementById("h5line" + i).id = "h5line" + k;
  document.getElementById("Material" + i + "-Cu").name = "Material" + k;
  document.getElementById("Material" + i + "-Cu").id = "Material" + k + "-Cu";
  document.getElementById("labelMaterial" + i + "-Cu").setAttribute("for", "Material" + k + "-Cu");
  document.getElementById("labelMaterial" + i + "-Cu").id = "labelMaterial" + k + "-Cu";
  document.getElementById("Material" + i + "-Al").name = "Material" + k;
  document.getElementById("Material" + i + "-Al").id = "Material" + k + "-Al";
  document.getElementById("labelMaterial" + i + "-Al").setAttribute("for", "Material" + k + "-Al");
  document.getElementById("labelMaterial" + i + "-Al").id = "labelMaterial" + k + "-Al";
  document.getElementById("nCab" + i).id = "nCab" + k;
  document.getElementById("sec" + i).id = "sec" + k;
  document.getElementById("length" + i).id = "length" + k;
  document.getElementById("lineQsymbol" + i).id = "lineQsymbol" + k;
  document.getElementById("lineMat" + i).id = "lineMat" + k;
  document.getElementById("lineSec" + i).id = "lineSec" + k;
  document.getElementById("lineR" + i).id = "lineR" + k;
  document.getElementById("lineX" + i).id = "lineX" + k;
  document.getElementById("lineL" + i).id = "lineL" + k;
  document.getElementById("lineI1kz" + i).id = "lineI1kz" + k;
  document.getElementById("lineI3kz" + i).id = "lineI3kz" + k;
}

//функция добавления новой линии, принимает "куда"
const AddItem = (where) => {
  div = document.getElementById("items");
  if (where == "last") {
    target = document.getElementById("buttons");
    line++;
    paste = line;
  } else {
    paste = where;
    i = line;
    while (i > where - 1) {
      k = i + 1;
      swap(i, k);
      i--;
    }
    line++;
    target = document.getElementById("line" + (where + 1));
  }

  //формирование новой линии, запись напрямую в DOM дерево
  //слышал, что так делать плохо
  newitem = `
        <div id="line${paste}" class="block-group">
          <div class="block1">
            <div class="addButton">
              <button
                type="button"
                class="btn btn-plus"
                onClick="AddItem(${paste});"
                id="add${paste}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                  style="vertical-align: 0; color: rgb(153, 179, 255)"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
              </button>
            </div>
            <h5 id="h5line${paste}">Линия ${paste}</h5>
            <div class="delButton">
              <button
                type="button"
                class="btn btn-danger btn-plus"
                onClick="DelItem(${paste});"
                id="del${paste}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                  style="vertical-align: 0; color: rgba(255, 153, 153, 0.467)"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1
                    0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646
                    2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8
                    7.293 5.354 4.646z"
                  />
                </svg>
              </button>
            </div>
            <div class="row1 mb-1">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Material${paste}"
                  id="Material${paste}-Cu"
                  value="Cu"
                  checked
                />
                <label
                  id="labelMaterial${paste}-Cu"
                  class="form-check-label"
                  for="Material${paste}-Cu"
                  >Cu</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Material${paste}"
                  id="Material${paste}-Al"
                  value="Al"
                />
                <label
                  id="labelMaterial${paste}-Al"
                  class="form-check-label"
                  for="Material${paste}-Al"
                  >Al</label
                >
              </div>
            </div>
            <div class="row2 ac mb-1">
              <p>Кол-во ниток:</p>
              <input
                class="form-control form-control-sm input-range"
                type="number"
                id="nCab${paste}"
                min="1"
                max="100"
                value="1"
              />
              <p>шт</p>
            </div>
            <div class="row4 ac mb-1">
              <p>Сечение:</p>
              <select id="sec${paste}" class="form-select form-select-sm">
                <option value="0" selected>1,5</option>
                <option value="1">2,5</option>
                <option value="2">4</option>
                <option value="3">6</option>
                <option value="4">10</option>
                <option value="5">16</option>
                <option value="6">25</option>
                <option value="7">35</option>
                <option value="8">50</option>
                <option value="9">70</option>
                <option value="10">95</option>
                <option value="11">120</option>
                <option value="12">150</option>
                <option value="13">185</option>
                <option value="14">240</option>
              </select>
              <p>мм²</p>
            </div>
            <div class="row2 ac mb-1">
              <p>Длина:</p>
              <input
                class="form-control form-control-sm input-range"
                type="number"
                id="length${paste}"
                min="0.01"
                value="1"
              />
              <p>м</p>
            </div>
          </div>
          <div class="block2">
            <div
              id="lineQsymbol${paste}"
              style="
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img src="img/question.svg" alt="" />
            </div>
            <p id="lineMat${paste}"></p>
            <p id="lineSec${paste}"></p>
            <p id="lineR${paste}"></p>
            <p id="lineX${paste}"></p>
            <p id="lineL${paste}"></p>
            <p id="lineI1kz${paste}"></p>
            <p id="lineI3kz${paste}"></p>
          </div>
        </div>
`;

//создание div, внедрение нового элемента
  newnode = document.createElement("div");
  newnode.setAttribute("id", "line" + paste);
  newnode.setAttribute("class", "block-group");
  newnode.innerHTML = newitem;
  div.insertBefore(newnode, target);
}

//функция удаления элемента
const DelItem = (where) => {
  document.getElementById("line" + where).remove();
  i = where;
  console.log(i, line);
  while (i < line) {
    k = i + 1;
    swap(k, i);
    i++;
  }
  line--;
}

//табличные данные
const StTrans = new Object();
StTrans.Row     =    [0, 25, 40, 63, 100, 160, 250, 400, 630, 800, 1000, 1250, 1600, 2500];
StTrans.Zoil10TY04 = [0, 00, 00, 00, 000, 000, 0.028, 0.018, 0.014, 000, 0.0088, 0.0075, 0.006, 0.0038];
StTrans.Zoil25TY04 = [];
StTrans.Zoil10YY04 = [];
StTrans.Zoil25YY04 = [];
StTrans.Zdry10TY04 = [0, 00, 00, 00, 000, 0.055, 0.035, 0.022, 0.014, 000, 0.009, 0000, 0.0056, 000000];
StTrans.Zdry25TY04 = [];
StTrans.Zdry10YY04 = [];
StTrans.Zdry25YY04 = [];

//свободный ввод Z
// const FreeZ = () => {
//   calculateTrans();
//   document.getElementById("FreeZform").classList.toggle("hide");
// }

//обработка выбора параметров трансформатора
const SelZ = (Type, Wind, Uvn, Unn, Sel) => {
  let Z = 0;
  if (Type == "Oil") {
    if (Wind == "TY") {
      if (Uvn == "U10") {
        if (Unn == "U230") {
          Z = StTrans.Zoil10TY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zoil10TY04[Sel] / 3;
        }
      } else if (Uvn == "U25") {
        if (Unn == "U230") {
          Z = StTrans.Zoil25TY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zoil25TY04[Sel] / 3;
        }
      }
    } else if (Wind == "YY") {
      if (Uvn == "U10") {
        if (Unn == "U230") {
          Z = StTrans.Zoil10YY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zoil10YY04[Sel] / 3;
        }
      } else if (Uvn == "U25") {
        if (Unn == "U230") {
          Z = StTrans.Zoil25YY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zoil25YY04[Sel] / 3;
        }
      }
    }
  } else if (Type == "Dry") {
    if (Wind == "TY") {
      if (Uvn == "U10") {
        if (Unn == "U230") {
          Z = StTrans.Zdry10TY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zdry10TY04[Sel] / 3;
        }
      } else if (Uvn == "U25") {
        if (Unn == "U230") {
          Z = StTrans.Zdry25TY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zdry25TY04[Sel] / 3;
        }
      }
    } else if (Wind == "YY") {
      if (Uvn == "U10") {
        if (Unn == "U230") {
          Z = StTrans.Zdry10YY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zdry10YY04[Sel] / 3;
        }
      } else if (Uvn == "U25") {
        if (Unn == "U230") {
          Z = StTrans.Zdry25YY04[Sel];
        } else if (Unn == "U127") {
          Z = StTrans.Zdry25YY04[Sel] / 3;
        }
      }
    }
  }
  return Z;
}

//функция расчёта КЗ трансформатора
const calculateTrans = () => {
  let TransSel = document.getElementById("TransS").value;
  let Trans = new Object();
  Trans.Power = StTrans.Row[TransSel];
  Trans.Type = document.getElementsByName("TransType");
  Trans.Wind = document.getElementsByName("TransWind");
  Trans.Uvn = document.getElementsByName("TransUvn");
  Trans.Unn = document.getElementsByName("TransUnn");

  for (const T of Trans.Type) {
    if (T.checked) Trans.Type = T.value;
  }
  for (const W of Trans.Wind) {
    if (W.checked) Trans.Wind = W.value;
  }
  for (const Uvn of Trans.Uvn) {
    if (Uvn.checked) Trans.Uvn = Uvn.value;
  }
  for (const Unn of Trans.Unn) {
    if (Unn.checked) Trans.Unn = Unn.value;
  }

  if (Trans.Unn == "U230") {
    window.U1 = 230;
    window.U3 = 400;
  } else if (Trans.Unn == "U127") {
    window.U1 = 127;
    window.U3 = 230;
  }

  window.Ztr = SelZ(
    Trans.Type,
    Trans.Wind,
    Trans.Uvn,
    Trans.Unn,
    TransSel
  ).toFixed(3);

  let Ikz1 = ((U1 * 0.001) / Ztr).toFixed(3);
  let Ikz3 = ((U3 * 0.001) / Ztr).toFixed(3);

  document.getElementById("trQsymbol").style.display = "none";
  document.getElementById("outputTransType").textContent = `${Trans.Type == "Oil" ? "Масляный" : "Сухой"} трансформатор`;
  document.getElementById("outputTransS").textContent = `S = ${Trans.Power} кВА; (${Trans.Wind == "TY" ? "Δ/Y" : "Y/Y"})`;
  document.getElementById("outputTransZ").textContent = `Z = ${Ztr} Ом`;
  document.getElementById("outputTransUvn").textContent = `Uвн = 10 кВ`;
  document.getElementById("outputTransUnn").textContent = `Uнн = ${U1}/${U3} В`;
  document.getElementById("outputTransI1kz").textContent = `Iкз(1) = ${Ikz1} кА`;
  document.getElementById("outputTransI3kz").textContent = `Iкз(3) = ${Ikz3} кА`;
}

const CCS = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
const rCS = [0.0123, 0.0074, 0.00413, 0.00309, 0.00184, 0.00116, 0.00074, 0.00053, 0.00037, 0.000265, 0.000195, 0.000154, 0.000124, 0.0001, 0.000077];
const xCS = [0, 0.000104, 0.000095, 0.00009, 0.000073, 0.000068, 0.000066, 0.000064, 0.000063, 0.000061, 0.00006, 0.00006, 0.000059, 0.000059, 0.000058];

//функция расчёта КЗ линий
const calculate = () => {
  calculateTrans();
  let Mat = [];
  let p = [];
  let nCab = [];
  let Sec = [];
  let r0 = [];
  let x0 = [];
  let L = [];
  let Ilkz1 = [];
  let Ilkz3 = [];
  let R = [];
  let X = [];
  let Z = [];
  let Zful = Number(Ztr);

  let i = 1;
  while (i < line + 1) {
    M = document.getElementsByName("Material" + i);
    for (const a of M) {
      if (a.checked) Mat[i] = a.value;
    }
    Mat[i] == "Cu" ? (p[i] = 0.0189) : (p[i] = 0.0315);
    nCab[i] = Number(document.getElementById("nCab" + i).value);
    nCab[i] == 0 ? (nCab[i] = 1) : nCab[i];
    k = Number(document.getElementById("sec" + i).value);
    Sec[i] = CCS[k];
    L[i] = Number(document.getElementById("length" + i).value);
    r0[i] = rCS[k];
    x0[i] = xCS[k];
    R[i] = (r0[i] * L[i]) / nCab[i];
    X[i] = (x0[i] * L[i]) / nCab[i];
    Z[i] = Math.sqrt(Math.pow(R[i], 2) + Math.pow(X[i], 2));
    Zful += Z[i];
    Ilkz1[i] = U1 / Zful / 1000;
    Ilkz3[i] = U3 / Zful / 1000;
    i++;
  }

  i = 1;
  let Q = true;
  while (i < line + 1) {
    nCab[i] <= 0 || Sec[i] <= 0 || L[i] <= 0 ? (Q = false) : console.log("OK");
    i++;
  }

  if (Q == false) {
    document.getElementById("calculate").classList.remove("btn-primary", "btn-success");
    document.getElementById("calculate").classList.add("btn-danger");
    document.getElementById("calculate").innerHTML = "Данные введены некорректно. Попробуйте снова.";
  } else if (Q == true) {
    i = 1;
    while (i < line + 1) {
      document.getElementById("lineQsymbol" + i).style.display = "none";
      document.getElementById("lineMat" + i).textContent = `${Mat[i] == "Cu" ? "Медная" : "Алюминиевая"} линия`;
      document.getElementById("lineSec" + i).textContent = `N = ${nCab[i]} шт.; S = ${Sec[i]} мм²`;
      document.getElementById("lineL" + i).textContent = `L = ${L[i]} м`;
      document.getElementById("lineR" + i).textContent = `r0 = ${r0[i].toFixed(5)} Ом/м`;
      document.getElementById("lineX" + i).textContent = `x0 = ${x0[i].toFixed(5)} Ом/м`;
      document.getElementById("lineI1kz" + i).textContent = `I1кз = ${Ilkz1[i].toFixed(3)} кА`;
      document.getElementById("lineI3kz" + i).textContent = `I3кз = ${Ilkz3[i].toFixed(3)} кА`;
      i++;
    }
    document.getElementById("calculate").classList.remove("btn-danger");
    document.getElementById("calculate").classList.add("btn-primary", "btn-success");
    document.getElementById("calculate").innerHTML = "Пересчитать";
  }
}
