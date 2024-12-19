document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openPopupButton = document.getElementById("openPopup");
  const closePopupButton = document.getElementById("closePopup");
  const calculationType = document.getElementById("calculationType");
  const formContainer = document.getElementById("formContainer");

  // Open popup
  openPopupButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
  });

  // Close popup
  closePopupButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    formContainer.innerHTML = ""; // Clear previous forms
  });

  // Generate input form based on dropdown selection
  calculationType.addEventListener("change", () => {
    const selectedValue = calculationType.value;
    formContainer.innerHTML = ""; // Clear previous form

    if (selectedValue === "ooip") {
      formContainer.innerHTML = `
        <h3>OOIP Calculation</h3>
        <input type="number" id="area" placeholder="Luas Area (acre)">
        <input type="number" id="thickness" placeholder="Ketebalan Reservoir (ft)">
        <input type="number" id="porosity" placeholder="Porositas (%)">
        <input type="number" id="waterSaturation" placeholder="Saturasi Air (%)">
        <input type="number" id="Bo" placeholder="Faktor Volume Formasi Minyak">
        <button onclick="calculateOOIP()">Kalkulasi Sekarang</button>
      `;
    } else if (selectedValue === "ogip") {
      formContainer.innerHTML = `
        <h3>OGIP Calculation</h3>
        <input type="number" id="area" placeholder="Luas Area (acre)">
        <input type="number" id="thickness" placeholder="Ketebalan Reservoir (ft)">
        <input type="number" id="porosity" placeholder="Porositas (%)">
        <input type="number" id="gasSaturation" placeholder="Saturasi Gas (%)">
        <input type="number" id="Bg" placeholder="Faktor Volume Formasi Gas">
        <button onclick="calculateOGIP()">Kalkulasi Sekarang</button>
      `;
    }
  });
});

function calculateOOIP() {
  const area = parseFloat(document.getElementById("area").value);
  const thickness = parseFloat(document.getElementById("thickness").value);
  const porosity = parseFloat(document.getElementById("porosity").value) / 100;
  const waterSaturation = parseFloat(document.getElementById("waterSaturation").value) / 100;
  const Bo = parseFloat(document.getElementById("Bo").value);

  if (area && thickness && porosity && waterSaturation && Bo) {
    const ooip = 7758 * area * thickness * porosity * (1 - waterSaturation) / Bo;
    displayResult("Hasil Original Oil in Place (OOIP) adalah : ", ooip, "🛢️", "STB");
  }
// Validate inputs
  if (isNaN(area) || isNaN(thickness) || isNaN(porosity) || isNaN(waterSaturation) || isNaN(Bo)) {
    alert("Harap isi data yang lengkap");}
    return// Exit the function without clearing the form
}

function calculateOGIP() {
  const area = parseFloat(document.getElementById("area").value);
  const thickness = parseFloat(document.getElementById("thickness").value);
  const porosity = parseFloat(document.getElementById("porosity").value) / 100;
  const gasSaturation = parseFloat(document.getElementById("gasSaturation").value) / 100;
  const Bg = parseFloat(document.getElementById("Bg").value);

  if (area && thickness && porosity && gasSaturation && Bg) {
    const ogip = (43560 * area * thickness * porosity * (1 - gasSaturation)) / Bg;
    displayResult("Hasil Original Gas in Place (OGIP) adalah : ", ogip, "🔥", "mcf");}
  
  // Validate inputs
  if (isNaN(area) || isNaN(thickness) || isNaN(porosity) || isNaN(waterSaturation) || isNaN(Bg)) {
    alert("Harap isi data yang lengkap");}
    return; // Exit the function without clearing the form
}

function displayResult(title, value, icon, unit) {
  const formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = `
    <div class="result-container">
      <span class="icon">${icon}</span>
      <h3>${title}</h3>
      <p><span style="font-size: 24px; font-weight: bold;">${value.toFixed(2)} ${unit}</span></p>
      <button class="btn-close" onclick="closeResult()">Close</button>
    </div>
  `;
}

function closeResult() {
  document.getElementById("formContainer").innerHTML = "";
}
