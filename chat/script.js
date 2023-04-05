// Get DOM elements
const modelSelect = document.getElementById('modelSelect');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Update URL query parameters when model is changed
function updateURL() {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set('model', modelSelect.value);
  window.location.href = newURL;
}

// Handle form submission
function submitForm(event) {
  event.preventDefault();
  const query = searchInput.value;
  const model = modelSelect.value;
  if (!query) return;

  console.log('Submitting form...');
  console.log(`Query: ${query}`);
  console.log(`Model: ${model}`);

  // Make API call
  const apiEndpoint = `https://api.openai.com/v1/engine/${model}/completions`;
  const prompt = [{
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": query
    }
  ];
  const data = {
    "prompt": prompt,
    "max_tokens": 128,
    "n": 1,
    "stop": "\n",
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  fetch(apiEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const output = data.choices[0].text.trim();
      console.log(`Output: ${output}`);
      const responseContainer = document.getElementById('response-container');
      responseContainer.innerHTML = `<p>${output}</p>`;
    })
    .catch(error => console.error(error));
}

// Add event listeners
modelSelect.addEventListener('change', updateURL);
searchForm.addEventListener('submit', submitForm);