// Get elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const modelSelect = document.querySelector("#modelSelect");
const apiInput = document.querySelector("#api-key");

// Get API key from local storage or prompt user to enter it
let apiKey = localStorage.getItem("apiKey");
if (!apiKey) {
  apiKey = prompt("Please enter your OpenAI API key:");
  if (apiKey) {
    localStorage.setItem("apiKey", apiKey);
  }
}

// Function to submit search form
async function submitForm(event) {
  event.preventDefault();
  const query = searchInput.value;
  const model = modelSelect.value;
  const apiUrl = `https://api.openai.com/v1/${model}/completions`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };
  const data = {
    prompt: query,
    max_tokens: 60,
    n: 1,
    stop: "."
  };
  console.log("Submitting form...");
  console.log("Query:", query);
  console.log("Model:", model);
  console.log("API Key:", apiKey);
  console.log("API URL:", apiUrl);
  console.log("Headers:", headers);
  console.log("Data:", data);
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    console.log("API response:", jsonResponse);
    const answer = jsonResponse.choices[0].text;
    console.log("Answer:", answer);
    alert(answer);
  } catch (error) {
    console.error("API error:", error);
    alert("Sorry, there was an error processing your request. Please try again later.");
  }
}

// Add event listener to search form
searchForm.addEventListener("submit", submitForm);