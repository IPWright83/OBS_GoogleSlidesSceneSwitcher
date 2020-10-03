chrome.tabs.onUpdated.addListener(function (tab) {
    chrome.tabs.executeScript(tab.ib, {
        file: 'main.js',
        matchAboutBlank: true,
    });
});
