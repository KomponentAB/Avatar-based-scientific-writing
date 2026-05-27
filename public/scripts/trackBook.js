/// <reference types="@workadventure/iframe-api-typings" />
// trackBook.js

console.log("trackBook.js loaded");

const BOOK_TRACKING_WEBHOOK_URL =
  "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

async function trackBookOpen(workbookName = "noNameBook") {
  console.log("trackBookOpen called with:", { workbookName });

   {
   

    const playerId = wa?.player?.uuid || "1234";

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
  } 
}

window.trackBookOpen = trackBookOpen;

console.log("window.trackBookOpen is now available");
