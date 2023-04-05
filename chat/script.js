// Center the model selector horizontally
const modelSelector = document.getElementById("model-selector");
const sidebarWidth = document.getElementById("sidebar").offsetWidth;
modelSelector.style.left = (sidebarWidth + (window.innerWidth - sidebarWidth) / 2 - modelSelector.offsetWidth / 2) + "px";

// Update the model selector position on window resize
window.addEventListener("resize", function () {
  modelSelector.style.left = (sidebarWidth + (window.innerWidth - sidebarWidth) / 2 - modelSelector.offsetWidth / 2) + "px";
});

// Form submission handler
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  const model = document.getElementById("model-selector").value;
  const content = document.getElementById("search-bar").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/gpt", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const result = document.createElement("p");
      result.innerHTML = response.response;
      document.body.appendChild(result);
    }
  };
  xhr.send(JSON.stringify({ model: model, content: content }));
});