chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
  chrome.action.onClicked.addListener(async (tab) => {
    // Collect information from all tabs
    const tabs = await chrome.tabs.query({});
    const tabData = tabs.map(tab => ({
      title: tab.title,
      url: tab.url,
      groupId: tab.groupId || 'Ungrouped'
    }));
    chrome.runtime.onClicked.addListener(async (message, sender, sendResponse) => {
        if (message.type === "extractContent") {
          const content = message.content;
      
          // Limit content to 1024 tokens
          const truncatedContent = content.split(/\s+/).slice(0, 1024).join(" ");
      
          // Call Gemini API (mocked for this example)
          const summary = await generateSummary(truncatedContent);
      
          // Store summary in local storage for the popup
          chrome.storage.local.set({ summary }, () => {
            console.log("Summary saved.");
          });
      
          sendResponse({ success: true });
        }
      });
  
    // Group tabs if necessary
    const groups = tabData.reduce((acc, tab) => {
      const key = tab.groupId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(tab);
      return acc;
    }, {});
  
    // Send the data to content script or popup
    chrome.storage.local.set({ tabGroups: groups });

    async function generateSummary(content) {
        // Replace with actual Gemini API integration
        const session = await ai.languageModel.create({
            systemPrompt: "Pretend to be an summarizer."
          });
                 
        return `Summary of the content: ${session.prompt(content.slice(0, 100))}...`;
      }
  });