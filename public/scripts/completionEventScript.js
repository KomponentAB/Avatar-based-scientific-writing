/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // Dynamically load the external script
  const script = document.createElement("script");
  script.src = "../scripts/workadventure-iframe-fixed.js";
  script.onload = () => {
    console.log("External iframe API loaded.");
   
  };
  document.head.appendChild(script);

  function handleModuleCompletionEvents(
    completionMessage,
    messageNpc,
    moduleName,
    moduleMax,
    workbookName,
    chatTitle
  ) {
    console.log("🚩 Completion Event Script loaded");
    WA.onInit().then(() => {
      console.log(workbookName+" geladen", messageNpc);
      const checkState = () => {
          try {
              const stateValue = WA.player.state[workbookName];
              if (stateValue !== undefined) {
                  if (stateValue === "solved") {
                      WA.chat.sendChatMessage(`${chatTitle} ist gelöst.`, messageNpc);
                  }
              } else {
                  setTimeout(checkState, 200); // Retry after 200ms
              }
          } catch (error) {
          }
      };
      checkState();
  });

    // Validate H5P and externalDispatcher
    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or externalDispatcher is not available.");
      return;
    }

    let instance;

    // Wait for H5P to initialize and grab the instance
    H5P.externalDispatcher.on("initialized", () => {
      instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
    });

    // Listen to xAPI events
    H5P.externalDispatcher.on("xAPI", (event) => {
      if (!instance) return;

      // Trigger only on full completion
      if (instance.getScore() === instance.getMaxScore()) {
        console.log(
          `🚩 COMPLETED: ${instance.getScore()} / ${instance.getMaxScore()} for ${workbookName}`
        );
        if (WA.player.state[workbookName] !== "solved") {
          const currentState = Number(WA.player.state[moduleName]) || 0;
          const newState = Math.min(currentState + 1, moduleMax);
          WA.player.state[moduleName] = newState.toString();
        }
        // Send completion message if not already solved
        if (WA.player.state[workbookName] !== "solved") {
          WA.chat.sendChatMessage(completionMessage, messageNpc);
          WA.player.state[workbookName] = "solved";
          setTimeout(async () => {
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
              cowebsite.close();
            }
          }, 3000);
        }
      }
    });
  }
  window.handleModuleCompletionEvents = handleModuleCompletionEvents;
})();
