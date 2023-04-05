// Model selector
const modelSelect = document.getElementById("modelSelect");
const params = new URLSearchParams(window.location.search);
const model = params.get("model");

if (model) {
  modelSelect.value = model;
}

function updateURL() {
  const newUrl = new URL(window.location);
  newUrl.searchParams.set("model", modelSelect.value);
  window.location.href = newUrl;
}

// Search bar
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");

function submitForm(event) {
  event.preventDefault();
  const query = searchInput.value;
  if (query.trim() === "") return;
  const model = modelSelect.value;
  const messages = [{ role: "user", content: query }];
  if (model) messages.push({ role: "system", content: `Using ${model} model` });
  searchInput.value = "";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      messages: messages,
    }),
  };
  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const answer = data.choices[0].text.trim();
      const result = `<p><strong>You:</strong> ${query}</p>
                      <p><strong>GPT:</strong> ${answer}</p>`;
      searchResults.innerHTML = result;
    })
    .catch((error) => {
      console.error("Error:", error);
      const result = `<p>Error: ${error.message}</p>`;
      searchResults.innerHTML = result;
    });
}

// Centered text
const centeredText = document.querySelector(".centered-text");
centeredText.style.opacity = "0.25";
centeredText.style.textAlign = "center";
centeredText.style.marginTop = "25%";

// Model dropdown
const modelDropdown = document.querySelector(".model-dropdown");
modelDropdown.style.textAlign = "center";
modelDropdown.style.marginBottom = "20px";

// Search bar and results
const searchWrapper = document.querySelector(".search-wrapper");
searchWrapper.style.textAlign = "center";
searchWrapper.style.marginBottom = "40px";

searchForm.addEventListener("submit", submitForm);