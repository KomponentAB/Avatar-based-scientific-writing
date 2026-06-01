/// <reference types="@workadventure/iframe-api-typings" />

const BOT_TRACKING_WEBHOOK_URL =
  "https://apps.taskmagic.com/api/v1/webhooks/yO6YInX1vkybonMgo73EC";

const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout = 5000,
): Promise<Response> =>
  Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout),
    ),
  ]);

async function sendBotTrackingEvent(
  eventType: "player_message" | "bot_message",
  message: string,
  authorName:  string,
) {
  const payload = {
    id: WA.player.uuid || "unknown_bot",
    name: WA.player.name || "bot",
    roomId: WA.room.id || "unknown_room",
    timestamp: Date.now(),
    eventType,
    message,
    authorName,
  };

  try {
    const response = await fetchWithTimeout(BOT_TRACKING_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Bot tracking sent:", payload);
  } catch (error) {
    console.error("Bot tracking failed:", error);
  }
}

async function setupBotInteractionTracking() {
  console.log("Setting up bot interaction tracking...");

  await WA.players.configureTracking({
    players: true,
    movement: false,
  });

  console.log("Player tracking for bot messages enabled.");

  WA.chat.onChatMessage(
    (message, event) => {
      console.log("Bubble chat message received:", {
        message,
        authorId: event.authorId,
        author: event.author,
      });

      if (event.authorId === undefined) {
        return;
      }
const authorName = WA.players.get(event.authorId)?.uuid || `player_${event.authorId}`;
      sendBotTrackingEvent("player_message", message, authorName);
    },
    {
      scope: "bubble",
    },
  );

  WA.chat.onChatMessage((message) => {
    console.log("Local bot message sent:", message);

    sendBotTrackingEvent("bot_message", message, WA.player.name || "bot");
  });
}

export { setupBotInteractionTracking };
