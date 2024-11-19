(() => {
    const content = document.body.innerText || "";
    chrome.runtime.sendMessage({ type: "extractContent", content }, (response) => {
      console.log("Content sent for summarization:", response);
    });
  })();