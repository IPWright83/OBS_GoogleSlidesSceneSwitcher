const OBSWebSocket = require("obs-websocket-js");

/**
 * These 2 classes represent the previous slide/next slide button in Google slides presentation mode
 */

const prevClass = "punch-viewer-speakernotes-page-previous";    // Class for the previous slide button
const nextClass = "punch-viewer-speakernotes-page-next";        // Class for the next slide button
const notesClass = "punch-viewer-speakernotes-text-body";       // Class for the text field containing speaker notes

/**
 * Determine if the tab is a Google Slides presentation mode
 * @return {Boolean} True if the tab is Google Slides
 */
function isGoogleSlides() {
    try  {
        return document.getElementsByClassName(prevClass)[0] && document.getElementsByClassName(nextClass)[0];
    } catch(error) {
        console.error(error);
        return false;
    }
}

/**
 * Wire up navigation to the previous/next buttons
 * @param  {Object} obs     The obs instance
 */
function wireUpEvents(obs) {
    console.log("Wiring up Events");

    document.getElementsByClassName(prevClass)[0].addEventListener("click", function() {
        onNavigate(obs);
    });
    document.getElementsByClassName(nextClass)[0].addEventListener("click", function() {
        onNavigate(obs);
    });
}

/**
 * Handle a navigation between slides
 * @param  {Object} obs     The obs instance
 */
function onNavigate(obs) {
    // Pull out the content of the speaker notes and search for the name
    // of a scene in the form [OBS: SceneName]
    const text = document.getElementsByClassName(notesClass)[0].textContent || "";
    const match = text.match(/\[OBS: ([\w\d ]*)\]/);

    // If we found a match attempt to set the scene in OBS
    if (match) {
        const scene = match[1];
        if (scene) {
            try {
                console.log("Setting Scene: " + scene);
                obs.send("SetCurrentScene", { "scene-name": scene });
            } catch(error){ 
                console.log(error);
            }
        }
    }
}

// We only want to wire this extension up, if we're
// dealing with a Google Slides tab
if (isGoogleSlides()) {

    // Create a new websocket connection to OBS
    const obs = new OBSWebSocket();
    obs.connect({})
        .then(function() {
            console.log("Connected to OBS");
            wireUpEvents(obs);
        })
        .catch(function(err) {
            console.error(err);
        });
}
