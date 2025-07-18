function getSelectedModel() {
  const radios = document.getElementsByName('choice');
  for (let radio of radios) {
    if (radio.checked) {
      if (radio.value === 'other') {
        // อ่านค่าจาก input ช่องกรอกเลขเอง
        const otherVal = document.getElementById('otherInput').value;
        return parseFloat(otherVal);
      } else {
        return parseFloat(radio.value);
      }
    }
  }
  return null; // ไม่ได้เลือกอะไร
}

function calculate() {
  const model = getSelectedModel();
  const f_kHz = parseFloat(document.getElementById("freq").value);

  if (model === null || isNaN(model) || model <= 0) {
    document.getElementById("result").innerText = "กรุณาเลือกรุ่นเครื่องจักรหรือใส่ค่าที่ถูกต้อง";
    document.getElementById('result1').innerText = "-";
    return;
  }

  if (isNaN(f_kHz) || f_kHz <= 0) {
    document.getElementById("result").innerText = "กรุณากรอกความถี่ให้ถูกต้อง";
    document.getElementById('result1').innerText = "-";
    return;
  }

  //console.log("model", model)

  const f_Hz = f_kHz * 1000;
  const C = 1.5e-6;
  const L_H = 1 / (Math.pow(2 * Math.PI * f_Hz, 2) * C);
  const L_uH = L_H * 1e6;

  const L1 = L_uH * 0.85;

  //console.log("L_H =", L_H, "L_uH =", L_uH, "L1 =", L1);

  const modelL = model;  // ใช้ค่าที่เลือกหรือกรอกเข้ามา
  const divider = 0.411; // คุณสามารถปรับค่า divider ตามรุ่น ถ้ามีหลายรุ่น

  const difference = L1 - modelL;
  const numPlates = difference / divider;

  const difference1 = L_uH - modelL;
  const numPlates1 = difference1 / divider;

  const finalResult = Math.round(numPlates);
  const finalResult1 = Math.round(numPlates1);

  if (finalResult < 0) {
    document.getElementById("model").innerText =
      "ค่า L ที่ใช้ในการคำนวณ : " + modelL.toFixed(3) + " μH";
    document.getElementById("result").innerText =
      "ค่าที่ 85% : ค่าที่ได้ต่ำกว่าค่ามาตรฐาน " + finalResult + " mm (" + numPlates.toFixed(2) + " mm)";
    document.getElementById("result1").innerText =
      "ค่าที่ 100% : " + finalResult1 + " mm (" + numPlates1.toFixed(2) + " mm)";
    document.getElementById("80perL").innerText = "ค่า L 85% : " + L1.toFixed(3) + " uH";
    document.getElementById("luH").innerText = "ค่า L 100% : " + L_uH.toFixed(3) + " uH";
    return;
  }

  document.getElementById("model").innerText =
    "ค่า L ที่ใช้ในการคำนวณ : " + modelL.toFixed(3) + " μH";
  document.getElementById("result").innerText =
    "ค่าที่ 85% : " + finalResult + " mm (" + numPlates.toFixed(2) + " mm)";
  document.getElementById("result1").innerText =
    "ค่าที่ 100% : " + finalResult1 + " mm (" + numPlates1.toFixed(2) + " mm)";
  document.getElementById("80perL").innerText =
    "ค่า L 85% : " + L1.toFixed(3) + " μH";
  document.getElementById("luH").innerText =
    "ค่า L 100% : " + L_uH.toFixed(3) + " μH";
}

function showOther() {
  document.getElementById('otherInput').style.display = 'block';
}

function hideOther() {
  const input = document.getElementById('otherInput');
  input.style.display = 'none';
  input.value = '';
}
