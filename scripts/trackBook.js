/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  console.log("trackBook.js loaded");

  const BOOK_TRACKING_WEBHOOK_URL =
    "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

  async function trackBookOpen(workbookName) {
    console.log("trackBookOpen called with:", { workbookName });

    try {
      if (window.WA && WA.onInit) {
        await WA.onInit();
        console.log("WorkAdventure initialized.");
      } else {
        console.warn("WorkAdventure not available. Using fallback values.");
      }

      const playerId =
        window.WA && WA.player && WA.player.uuid
          ? WA.player.uuid
          : "unknown_player";

      const payload = {
        id: playerId,
        h5pid: workbookName || "noNameBook",
        timestamp: Date.now(),
        eventType: "page_open",
      };

      const response = await fetch(BOOK_TRACKING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Tracking sent:", payload);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  }

  window.trackBookOpen = trackBookOpen;

  console.log("window.trackBookOpen is now available");
})();
