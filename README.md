# OBS_GoogleSlidesSceneSwitcher

Chrome extension to allow switching scenes in OBS from a Google Slide

## How to

To use this extension you firstly need [OBS](https://obsproject.com/) installed, along with the [remote websocket extension](https://github.com/Palakis/obs-websocket).

One you have these, you need to present a Google slide in the "Presenter View". It's the controller in the presenter view that controls switching scenes in OBS. Whenever you click the previous/next buttons to navigate between slides, OBS will be asked to switch scene for you.

**NOTE**: Switching slides with keyboard navigation will not update OBS slides.

## Configure the Scene

To configure the scene, simply add at the top of your speaker notes the following text, replacing `SceneName` with the name of your scene. This can contain basic letter, numbers and spaces. Additional characters aren't supported at this time. If you're interested the regex is `[\w\d ]`.

[OBS: SceneName]
