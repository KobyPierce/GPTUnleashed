// get elements
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-input');
const modelSelect = document.querySelector('#modelSelect');

// update URL with selected model
function updateURL() {
  const selectedModel = modelSelect.value;
  const url = new URL(window.location.href);
  url.searchParams.set('model', selectedModel);
  window.history.replaceState({}, '', url);
}

// handle form submission
function submitForm(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  const selectedModel = modelSelect.value;
  if (!searchTerm) return;
  const message = [
    { role: 'user', content: searchTerm }
  ];
  if (selectedModel) {
    message.unshift({ role: 'system', content: `Using model: ${selectedModel}` })
  }
  openai.ChatCompletion.create({
    engine: selectedModel,
    prompt: message,
    max_tokens: 150,
    n: 1,
    stop: '\n',
    temperature: 0.7
  })
  .then(data => {
    const message = data.choices[0].text.trim();
    displayMessage(message, 'assistant');
  })
  .catch(error => console.error(error));
  searchInput.value = '';
}

// display message on the page
function displayMessage(message, role) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message', role);
  const messageContent = document.createElement('p');
  messageContent.textContent = message;
  messageContainer.appendChild(messageContent);
  const contentWrapper = document.querySelector('.content-wrapper');
  contentWrapper.appendChild(messageContainer);
  contentWrapper.scrollTop = contentWrapper.scrollHeight;
}

// set selected model from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const selectedModel = urlParams.get('model');
if (selectedModel) {
  modelSelect.value = selectedModel;
}

// focus on search input on page load
searchInput.focus();