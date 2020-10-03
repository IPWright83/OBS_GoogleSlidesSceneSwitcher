/**
 * Load up the extension when a new tab is opened
 */
chrome.tabs.onUpdated.addListener(function (tab) {
    chrome.tabs.executeScript(tab.ib, {
        file: 'inject.js',
        matchAboutBlank: true,
    });
});
