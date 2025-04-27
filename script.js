function calculate() {
    const model = document.getElementById("model").value;
    const f_kHz = parseFloat(document.getElementById("freq").value);
  
    if (isNaN(f_kHz) || f_kHz <= 0) {
      document.getElementById("result").innerText = "กรุณากรอกความถี่ให้ถูกต้อง";
      document.getElementById('result1').innerText = "-";
      return;
    }
  
    const f_Hz = f_kHz * 1000;
    const C = 1.5e-6;
    const L_H = 1 / (Math.pow(2 * Math.PI * f_Hz, 2) * C);
    const L_uH = L_H * 1e6;
  
    const L1 = L_uH * 0.85;
  
    let modelL = 0;
    let divider = 0;
  
    if (model === "1") {
      modelL = 27.720;
      divider = 0.411;
    } else if (model === "2") {
      modelL = 21.414;
      divider = 0.45;
    }
  
    const difference = L1 - modelL;
    const numPlates = difference / divider;

    const difference1 = L_uH - modelL;
    const numPlates1 = difference1 / divider;
  
    const finalResult = Math.round(numPlates);
    const finalResult1 = Math.round(numPlates1);
  
    if (finalResult < 0) {
      document.getElementById("result").innerText = 
      "ค่าที่ 85% : ค่าที่ได้ต่ำกว่าค่ามาตรฐาน " + finalResult + " mm (" + numPlates.toFixed(2) + " mm)" ;
      document.getElementById("result1").innerText = 
      "ค่าที่ 100% : " + finalResult1 + " mm (" + numPlates1.toFixed(2) + " mm)";
      document.getElementById("80perL").innerText = "ค่า L 85% : " + L1.toFixed(3) + " uH";
      document.getElementById("luH").innerText = "ค่า L 100% : " + L_uH.toFixed(3) + " uH";
      return;
    }
  
    document.getElementById("result").innerText =
      "ค่าที่ 85% : " + finalResult + " mm (" + numPlates.toFixed(2) + " mm)";
    document.getElementById("result1").innerText = 
      "ค่าที่ 100% : " + finalResult1 + " mm (" + numPlates1.toFixed(2) + " mm)";
    document.getElementById("80perL").innerText =
      "ค่า L 85% : " + L1.toFixed(3) + " uH";
    document.getElementById("luH").innerText =
      "ค่า L 100% : " + L_uH.toFixed(3) + " uH";
  }
  
