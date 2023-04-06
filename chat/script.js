const modelSelect = document.getElementById("modelSelect");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const apiKeyInput = document.getElementById("api-key-input");

let apiKey = "";

// get the api key from local storage if it exists
if (localStorage.getItem("openai_api_key")) {
  apiKey = localStorage.getItem("openai_api_key");
  apiKeyInput.value = apiKey;
}

// update the api key when the input changes
apiKeyInput.addEventListener("input", () => {
  apiKey = apiKeyInput.value;
  localStorage.setItem("openai_api_key", apiKey);
  console.log("API key set:", apiKey);
});

// submit the form
const submitForm = async (event) => {
  event.preventDefault();
  console.log("Submitting form...");

  const query = searchInput.value.trim();
  const model = modelSelect.value;

  // validate the query and model
  if (query === "") {
    console.log("Error: Query cannot be empty");
    return;
  }
  if (model === "") {
    console.log("Error: Model must be selected");
    return;
  }

  // validate the api key
  if (!apiKey) {
    console.log("Error: No API key provided");
    return;
  }

  // make the api request
  const response = await fetch("https://api.openai.com/v1/engines/" + model + "/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
    body: JSON.stringify({
      prompt: query,
      max_tokens: 1024,
      n: 1,
      stop: "\n",
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("OpenAI response:", data);
  } else {
    console.log("OpenAI API error:", response.statusText);
  }
};

// update the url when the model changes
const updateURL = () => {
  const params = new URLSearchParams(window.location.search);
  params.set("model", modelSelect.value);
  window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
};

// set the initial model based on the url
const urlParams = new URLSearchParams(window.location.search);
const model = urlParams.get("model");
if (model) {
  modelSelect.value = model;
}

// handle form submission
searchForm.addEventListener("submit", submitForm);