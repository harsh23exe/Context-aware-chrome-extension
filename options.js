document.getElementById("save").addEventListener("click", () => {
    const groupTabs = document.getElementById("groupTabs").checked;
    chrome.storage.sync.set({ groupTabs }, () => {
      alert("Settings saved!");
    });
  });