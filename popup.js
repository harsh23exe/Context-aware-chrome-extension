document.addEventListener("DOMContentLoaded", () => {
    const summaryElement = document.getElementById("summary");
  
    // Retrieve summary from storage
    chrome.storage.local.get("summary", ({ summary }) => {
      if (summary) {
        summaryElement.textContent = summary;
      } else {
        summaryElement.textContent = "No summary available.";
      }
    });
  });