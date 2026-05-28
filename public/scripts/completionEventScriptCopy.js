/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  const BOOK_TRACKING_WEBHOOK_URL =
    "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

  async function trackBookSolved(workbookName) {
    try {
      const playerId = WA.player.uuid || "unknown_player";

      const payload = {
        id: playerId,
        h5pid: workbookName || "noNameBook",
        timestamp: Date.now(),
        eventType: "solved",
      };

      const response = await fetch(BOOK_TRACKING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Solved tracking sent:", payload);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
    } catch (error) {
      console.error("Solved tracking failed:", error);
    }
  }

  function handleModuleCompletionEventsCopy(
    completionMessage,
    messageNpc,
    workbookName,
    returnMessage,
  ) {
    console.log("🚩 Completion Event Script loaded");

    WA.onInit().then(() => {
      console.log(workbookName + " geladen", messageNpc);

      try {
        const stateValue = WA.player.state[workbookName];

        if (stateValue === "solved") {
          WA.chat.sendChatMessage(returnMessage, messageNpc);
        }
      } catch (error) {
        console.warn("Could not check workbook state:", error);
      }
    });

    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or externalDispatcher is not available.");
      return;
    }

    let instance;

    H5P.externalDispatcher.on("initialized", () => {
      instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
    });

    H5P.externalDispatcher.on("xAPI", () => {
      if (!instance) return;

      if (instance.getScore() === instance.getMaxScore()) {
        console.log(
          `🚩 COMPLETED: ${instance.getScore()} / ${instance.getMaxScore()} for ${workbookName}`,
        );

        if (WA.player.state[workbookName] !== "solved") {
          WA.player.state[workbookName] = "solved";

          trackBookSolved(workbookName);

          console.log(
            workbookName + " 🚩 State variable has been changed to solved",
          );

          WA.chat.sendChatMessage(completionMessage, messageNpc);

          setTimeout(async () => {
            const cowebsites = await WA.nav.getCoWebSites();

            for (const cowebsite of cowebsites) {
              cowebsite.close();
            }
          }, 120000);
        }
      }
    });
  }

  window.handleModuleCompletionEventsCopy = handleModuleCompletionEventsCopy;
})();
