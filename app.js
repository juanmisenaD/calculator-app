const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const basicMath = ["+","-","*", "/"], btnOP = [".", "0", "00"];
let btnAdd = [];
/**
 * 
 * @param {string} dsp
 * @param {RegExp} rg
 * @return
 */
function vNum(dsp, rg) {
  // const rgx = /\d+!/g;
  // dsp = rgx.test(dsp);
  return dsp.match(rg);
}
function toRDis(sV, rV) {
  display.value = display.value.replace(sV, rV);
}
function factorial(n) {
  if (n == 1 || n == 0) {
    return 1;
  } else {
    return n * factorial(n -1);
  }
}
function rmSq(n) {
  return n ** .5;
}
function to_dis_porcent(dis, bse) {
  const v_dis_dec = Number(dis) / 100;
  const v_dis_real = Number(bse) * v_dis_dec;
  const v_dis_final = Number(bse) - v_dis_real;
  return v_dis_final;
}
function clearDis() {
  display.value = '';
}
function addDis(value) {
  display.value += value;
}
function myFuncReplDis(dis, str, str2) {
  // console.log(dis);
  // console.log(str);
  // console.log(str2);
  let mathStr = dis.replaceAll(str, '');
  let longStr = vNum(mathStr, /\d+/g);
  // console.log(mathStr);
  // console.log(longStr);
  let vRp = '';
  let arrRplV = [];
  for (let i = 0; i < longStr.length; i++) {
    vRp = longStr[i] + '**.5';
    // console.log(vRp);
    arrRplV.push(vRp);
  }
  // console.log(arrRplV);
  let txt = myFuncRem(mathStr, longStr, arrRplV);
  return txt;
}
function myFuncStrToSq(to_string) {
  let arrEle = vNum(to_string, /\√\d+/g);
  // console.log(arrEle);
  let cpyEle = vNum(to_string, /\√\d+/g);
  let _arr = myFuncRem(arrEle, /\√/g, 'rmSq(');
  // console.log(_arr);
  // myFuncRmDis(to_string, cpyEle, _arr);
  let _s = myFuncRmDis(to_string, cpyEle, _arr);
  return _s;
}
function myFuncRem(toStr, sch, rm) {
  for (let i = 0; i < toStr.length; i++) {
    toStr[i] = toStr[i].replace(sch, rm);
    toStr[i] = toStr[i].padEnd(toStr[i].length+1, ')');
  }
  return toStr;
}
function myFuncRmDis(toS, rgx, toS_N) {
  let nameStr = toS;
  // console.log(nameStr);
  // console.log(rgx);
  // console.log(toS_N);
  for (let i = 0; i < rgx.length; i++) {
    nameStr = nameStr.replace(rgx[i], toS_N[i]);
  }
  // console.log(nameStr);
  return nameStr;
}
function to_m_discont(content) {
  if (vNum(content, /\d+%of\d+/g) != null) {
    let _dig = vNum(content, /\d+/g);
    // console.log(_dig);
    let [discont, base] = _dig;
    content = to_dis_porcent(discont, base);
    // console.log(content);
  }
  // console.log(content);
  return content;
}
function myFuncRmPi(cont) {
  let _to_pi = Number(Math.PI.toFixed(9));
  if (vNum(cont, /\d+\π/g) != null) {
    // console.log("object1");
    cont = cont.replace(/\π/g, `*${_to_pi}`);
  } else if (vNum(cont, /\π\d+/g) != null) {
    // console.log("object2");
    cont = cont.replace(/\π/g, `${_to_pi}*`);
  } else {
    // console.log("object3");
    cont = cont.replace(/\π/g, _to_pi);
  }
  return cont;
}
function equalDis() {
  let contentDis = display.value, to_dis = 0, to_pi = '';
  // let numSqrt = vNum(contentDis, /√\d+/g).map(x => x.replace('√', ''));
  // numSqrt = numSqrt.map(x => Math.sqrt(x));
  // console.log(to_pi);
  to_dis = to_m_discont(contentDis);
  to_pi = myFuncRmPi(contentDis);
  // console.log(to_pi);
  // console.log(contentDis);
  contentDis = contentDis.replaceAll(/÷/g, '/');
  contentDis = contentDis.replaceAll(/x/g, '*');
  contentDis = contentDis.replaceAll(/²/g, '**2');
  contentDis = contentDis.replaceAll(/\d+%of\d+/g, to_dis);
  // contentDis = contentDis.replaceAll(/\π/g, to_pi);
  // contentDis = to_m_discont(contentDis);
  //toSqrt = myFuncReplDis(contentDis, /√/g, '**.5');
  //console.log(toSqrt);
  // console.log(vNum(contentDis, /\π/g));
  // console.log(contentDis);
  if (vNum(contentDis, /\√\d+/g) != null) {
    // console.log(true);
    contentDis = myFuncStrToSq(contentDis);
  }
  if (vNum(contentDis, /\π/g) != null) {
    // console.log(true);
    contentDis = to_pi;
  }
  // console.log(contentDis);
  // contentDis = contentDis.replaceAll(/√\d+/g, toSqrt);
  // console.log(contentDis.replaceAll(/√\d+/g, ));
  try {
    let result = eval(contentDis);
    if (result == 'Infinity') {
      alert('nt divide or 0');
      clearDis();
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = new Error(error);
  }
}
buttons.forEach((element) => {
  element.addEventListener('click', (ev) => {
    if (ev.target.classList.contains("opM")) {
      // console.log(display.value);
      if (vNum(display.value, /\√\d+/g) != null) {
        // let arrEle = vNum(display.value, /\√\d+/g);
        // console.log(arrEle);
        // let cpyEle = vNum(display.value, /\√\d+/g);
        // let _arr = myFuncRem(arrEle, /\√/g, 'rmSq(');
        // console.log(_arr);
        // myFuncRmDis(display.value, cpyEle, _arr);
        // let _s = myFuncRmDis(display.value, cpyEle, _arr);
        display.value = myFuncStrToSq(display.value);
      }
    }
    switch (element.id) {
      case "=":
        if (vNum(display.value, /\d+\√/g) != null) {
          alert(Error('Error'));
          clearDis();
        } else {
          //console.log(display.value);
          //console.log(vNum(display.value, /\√\d+(\+|\-|\x|\÷|\²)*/g));
          //let arrEle = vNum(display.value, /\√\d+/g);
          //console.log(arrEle);
          //let _s = arrEle.join("");
          //console.log(_s.length);
          //console.log(myFuncReplDis(display.value, /\√\d+(\+|\-|\x|\÷|\²)*/g, '**.5'));
          //console.log(myFuncRem(display.value, vNum(display.value, /\√\d+(\+|\-|\x|\÷|\²)*/g), ['**.5']));
          equalDis();
        }
        break;
      case "ac":
        clearDis();
        break;
      case "de":
        display.value = display.value.slice(0, -1);
        break;
      default:
        addDis(element.id);
        break;
    }
    if (element.id == '!') {
      if (vNum(display.value, /\d+!/g) != null) {
        btnAdd = vNum(display.value, /\d+!/g).map(x => x.replace('!', ''));
        let numArrBtn = btnAdd.map(Number);
        let totalFac = numArrBtn.map((v) => factorial(v));
        toRDis(/\d+!/, totalFac);
      } else {
        alert('Error');
        clearDis();
      }
    }
    if (element.id == '²') {
      if (vNum(display.value, /\d+²/g) == null) {
        alert('Error');
        clearDis();
      }
      /* if (vNum(display.value, /\d+²/g) != null) {
        btnAdd = vNum(display.value, /\d+²/g).map(x => x.replace('²', '**2'));
        let numArrBtn = btnAdd.map(Number);
        console.log(numArrBtn);
        console.log(btnAdd.join(''));
      } else {
        alert('Error');
        clearDis();
      } */
    }
  });
});