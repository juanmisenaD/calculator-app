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
function myFuncRem(toStr, sch, rm) {
  let nameStr = toStr;
  for (let i = 0; i < sch.length; i++) {
    nameStr = nameStr.replace(sch[i], rm[i]);
  }
  return nameStr;
}
function equalDis() {
  let contentDis = display.value;
  let toSqrt = '';
  // let numSqrt = vNum(contentDis, /√\d+/g).map(x => x.replace('√', ''));
  // numSqrt = numSqrt.map(x => Math.sqrt(x));
  // console.log(numSqrt);
  // console.log(contentDis);
  contentDis = contentDis.replaceAll(/÷/g, '/');
  contentDis = contentDis.replaceAll(/x/g, '*');
  contentDis = contentDis.replaceAll(/²/g, '**2');
  toSqrt = myFuncReplDis(contentDis, /√/g, '**.5');
  contentDis = toSqrt;
  // console.log(contentDis);
  // console.log(toSqrt);
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
  element.addEventListener('click', (event) => {
    switch (element.id) {
      case "=":
        if (vNum(display.value, /\d+√/g) != null) {
          alert(Error('Error'));
          clearDis();
        } else {
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