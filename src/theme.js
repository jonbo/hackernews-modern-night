function setPrimaryColor(color) {
  document.documentElement.style.setProperty("--primary-color", color);
}
function savePrimaryColor(color) {
  localStorage.setItem("primary-color", color);
}
function getPrimaryColor() {
  return localStorage.getItem("primary-color");
}

let customPrimaryColor = getPrimaryColor();
if (customPrimaryColor) setPrimaryColor(customPrimaryColor);

function main() {
  // Add a button the navbar to toggle a custom color choose dialog
  const navbar = document.querySelector("#hnmain .pagetop");
  if (!navbar) return;

  navbar.innerHTML += `
    | <span id="customizeBtn">&diam;</span>
  `;

  // Create custom dialog for primary color choosing
  const customizeDialog = document.createElement("div");
  customizeDialog.id = "customizeDialog";
  customizeDialog.classList.add("hidden"); // hidden by default
  customizeDialog.innerHTML = `
    <div class="color-choose">
        <b>Set Primary Color</b>
        <div>
            <input type="radio" id="primary-color-orange" name="primary-color" value="#ffa500">
            <label for="primary-color-orange">Orange</label>
        </div>
        <div>
            <input type="radio" id="primary-color-blue" name="primary-color" value="#4ab8e4">
            <label for="primary-color-blue">Blue</label>
        </div>
        <div>
            <input type="radio" id="primary-color-custom" name="primary-color" value="custom">
            <label for="primary-color-custom">
                Custom <input type="color" id="primary-color-custom-color" value="${getPrimaryColor() ||
                  "#b0f892"}"  />
            </label>
        </div>
    </div>
  `;
  document.body.appendChild(customizeDialog);

  // Detect any color changes and set it as primary color
  customizeDialog.addEventListener("change", function colorChange(e) {
    let el = e.target;
    let color = el.value;

    // Fix setting a custom color not checking the custom radio
    if (el.id === "primary-color-custom-color") {
      document.querySelector("#primary-color-custom").checked = true;
    }
    // If the custom radio is checked, look at the custom color input value instead
    if (color === "custom") {
      color = document.querySelector("#primary-color-custom-color").value;
    }
    setPrimaryColor(color);
    savePrimaryColor(color);
  });
  // Clicking "outside" of the custom color dialog closes it
  customizeDialog.addEventListener("click", function closer(e) {
    let el = e.target;
    if (el.id === "customizeDialog") {
      customizeDialog.classList.toggle("hidden");
    }
  });

  // Button that will show custom color dialog
  const customizeBtn = document.querySelector("#customizeBtn");
  customizeBtn.addEventListener("click", function toggleCustomize() {
    customizeDialog.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", main);
