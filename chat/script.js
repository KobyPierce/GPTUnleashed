const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modelSelect = document.getElementById("modelSelect");
const apiKeyInput = document.getElementById("api-key-input");
const modelEndpoint = "https://api.openai.com/v1/engines/";

function submitForm(event) {
  event.preventDefault();
  console.log("Submitting form...");

  const query = searchInput.value.trim();
  const model = modelSelect.value;
  const apiKey = apiKeyInput.value;

  if (!query) {
    alert("Please enter a search query.");
    return;
  }

  if (!model) {
    alert("Please select a model.");
    return;
  }

  if (!apiKey) {
    alert("Please enter your OpenAI API key.");
    return;
  }

  console.log(`Query: ${query}`);
  console.log(`Model: ${model}`);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${apiKey}`);

  fetch(`${modelEndpoint}${model}/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt: query,
      max_tokens: 64,
      n: 1,
      stop: ["\n"]
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to generate response from OpenAI API.");
      }
      return response.json();
    })
    .then(data => {
      console.log(data.choices[0].text);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateURL() {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set("model", modelSelect.value);
  window.history.pushState("", "", newURL.toString());
}

(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const model = urlParams.get("model");

  if (model) {
    modelSelect.value = model;
  }
})();