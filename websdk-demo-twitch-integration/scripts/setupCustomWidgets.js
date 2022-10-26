const setupCustomWidgets = () => {
  // Apply custom widget templates and classes to all livelike-widgets elements.
  // If different custom widgets are needed for different livelike-widget elements,
  // they can be split up and applied to each livelike-widget element separately.
  document.querySelectorAll("livelike-widgets").forEach((livelikeWidgets) => {
    livelikeWidgets.customTemplateRenderer = function ({ widgetPayload }) {
      if (widgetPayload.kind === "cheer-meter") {
        return document.querySelector("template#custom-cheer");
      }
    };
    livelikeWidgets.customWidgetRenderer = function ({ widgetPayload }) {
      switch (widgetPayload.kind) {
        case "emoji-slider":
          return document.createElement("custom-slider");
        case "alert":
          return document.createElement("custom-alert");
        case 'text-ask':
          return document.createElement('custom-text-ask');
        case 'video-alert':
          return document.createElement('custom-video-alert');
        case 'image-number-prediction':
        case 'text-number-prediction':
          return document.createElement('custom-number-prediction');
        case 'image-number-prediction-follow-up':
        case 'text-number-prediction-follow-up':
          return document.createElement('custom-number-prediction-follow-up');
        default:
          break;
      }
    };
  });
};
