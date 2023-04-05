function openModal() {
    document.querySelector('.modal').style.display = 'block';
  }
  function closeModal() {
    document.querySelector('.modal').style.display = 'none';
  }
  function addNewLine(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.value += '\n';
    }
  }
  function updateURL() {
    const modelSelect = document.getElementById("modelSelect");
    const selectedModel = modelSelect.value;
    const baseURL = window.location.href.split("?")[0];
    window.history.pushState({}, "", `${baseURL}?model=${selectedModel}`);
  }
