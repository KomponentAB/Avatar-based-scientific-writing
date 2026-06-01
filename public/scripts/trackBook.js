/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  console.log("trackBook.js 1.3.0 loaded");

  const BOOK_TRACKING_WEBHOOK_URL =
    "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

  let lastPayloadBase = null;
  let closeTrackingRegistered = false;

  function getRoomKey(roomId) {
    return roomId.split("/").filter(Boolean).pop() || "unknown_room";
  }

  async function getPayloadBase(workbookName) {
    if (window.WA && WA.onInit) {
      await WA.onInit();
    }

    const roomId =
      window.WA && WA.room && WA.room.id ? WA.room.id : "unknown_room";

    return {
      id:
        window.WA && WA.player && WA.player.uuid
          ? WA.player.uuid
          : "unknown_player",

      name:
        window.WA && WA.player && WA.player.name
          ? WA.player.name
          : "unknown_name",

      roomId,
      roomKey: getRoomKey(roomId),
      object: workbookName || "noNameBook",
    };
  }

  async function sendBookEvent(workbookName, eventType) {
    try {
      const payload = {
        ...(await getPayloadBase(workbookName)),
        timestamp: Date.now(),
        eventType,
      };

      lastPayloadBase = {
        id: payload.id,
        name: payload.name,
        roomId: payload.roomId,
        roomKey: payload.roomKey,
        object: payload.object,
      };

      const response = await fetch(BOOK_TRACKING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Book tracking sent:", payload);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
    } catch (error) {
      console.error("Book tracking failed:", error);
    }
  }

  function registerCloseTracking() {
    if (closeTrackingRegistered) return;

    closeTrackingRegistered = true;

    window.addEventListener("pagehide", () => {
      if (!lastPayloadBase) return;

      const payload = {
        ...lastPayloadBase,
        timestamp: Date.now(),
        eventType: "H5P_closed",
      };

      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });

      navigator.sendBeacon(BOOK_TRACKING_WEBHOOK_URL, blob);

      console.log("Book close tracking sent:", payload);
    });
  }

  async function trackBookOpen(workbookName) {
    console.log("trackBookOpen called with:", { workbookName });

    await sendBookEvent(workbookName, "H5P_open");
    registerCloseTracking();
  }

  window.trackBookOpen = trackBookOpen;

  console.log("window.trackBookOpen is now available");
})();
