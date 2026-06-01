/// <reference types="@workadventure/iframe-api-typings" />

import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

console.warn("worldTracking.ts 1.0.2 loaded");

type TrackingEventType =
  | "enter"
  | "leave"
  | "ping"
  | "action"
  | "area_entered"
  | "area_left"
  | "start_player-player"
  | "npc-interact"
  | "stop_player-player";

interface TrackingOptions {
  pingIntervalMs?: number;
  enableEnter?: boolean;
  enableLeave?: boolean;
  enablePing?: boolean;
  enableAreaTracking?: boolean;
  enablePlayerInteractionTracking?: boolean;
}

interface TrackingArea {
  name: string;
  trackEnter: boolean;
  trackLeave: boolean;
}

const ACTION_WEBHOOK_URL =
  "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

const PING_WEBHOOK_URL =
  "https://apps.taskmagic.com/api/v1/webhooks/R8rhVbxKuQu61j69PLtKW";

const DEFAULT_PING_INTERVAL_MS = 180_000;
const AREA_COOLDOWN_MS = 10_000;
const AREA_STARTUP_IGNORE_MS = 2_000;
const BOT_OUTLINE_COLOR = 9645034;

let pingIntervalId: number | undefined;

function getRoomKey(roomId: string): string {
  return roomId.split("/").filter(Boolean).pop() || "unknown_room";
}

const ROOM_SHEET_IDS: Record<string, number> = {
  "notlog.tmj": 1419742566,
  "matrix-hub.tmj": 1527348245,
  "modul_1.tmj": 410008593,
  "modul_2.tmj": 366813808,
  "modul_3.tmj": 1800670407,
  "notlog-solved.tmj": 526346111,
};
function getSheetIdForRoom(roomKey: string): number | null {
  return ROOM_SHEET_IDS[roomKey] ?? null;
}

function getPingWebhookForRoom(roomKey: string): string {
  const webhook = PING_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      `No ping webhook configured for roomKey "${roomKey}". Using default ping webhook.`,
    );
    return PING_WEBHOOK_URL;
  }

  return webhook;
}

function getPlayerData() {
  const roomId = WA.room.id || "unknown_room";
  const roomKey = getRoomKey(roomId);

  return {
    id: WA.player.uuid || "unknown_player",
    name: WA.player.name || "unknown_name",
    roomId,
    roomKey,
  };
}

function getWebhookForEvent(eventType: TrackingEventType): string {
  if (eventType === "ping") {
    return PING_WEBHOOK_URL;
  }

  return ACTION_WEBHOOK_URL;
}

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

async function sendWebhook(url: string, payload: object) {
  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Tracking sent:", payload);
  } catch (error) {
    console.error("Tracking failed:", error);
  }
}

async function sendTrackingEvent(
  eventType: TrackingEventType,
  extraData: Record<string, unknown> = {},
) {
  const playerData = getPlayerData();

const payload = {
  ...playerData,

  timestamp: Date.now(),

  eventType,

  ...(eventType === "ping"
    ? { sheetsId: getSheetIdForRoom(playerData.roomKey) }
    : {}),

  ...extraData,
};

const webhookUrl = getWebhookForEvent(eventType);
  await sendWebhook(webhookUrl, payload);
}

function sendLeaveEventWithKeepAlive() {
  const playerData = getPlayerData();

  const payload = {
    ...playerData,
    timestamp: Date.now(),
    eventType: "tab_closed",
  };

  fetch(ACTION_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error("tab_closed tracking failed:", error);
  });
}

function setupPingTracking(intervalMs: number = DEFAULT_PING_INTERVAL_MS) {
  if (pingIntervalId !== undefined) {
    console.warn("Ping tracking is already running. Skipping duplicate setup.");
    return;
  }

  if (!intervalMs || intervalMs < 30_000) {
    console.warn(
      `Invalid ping interval "${intervalMs}". Falling back to default.`,
    );
    intervalMs = DEFAULT_PING_INTERVAL_MS;
  }

  const roomKey = getRoomKey(WA.room.id);
  const pingWebhook = getPingWebhookForRoom(roomKey);

  console.log("Setting up ping tracking...");
  console.log("Ping interval:", intervalMs);
  console.log("Room id:", WA.room.id);
  console.log("Room key:", roomKey);
  console.log("Ping webhook:", pingWebhook);

  let firstPing = true;

  sendTrackingEvent("ping", { firstPing });

  firstPing = false;

  pingIntervalId = window.setInterval(() => {
    sendTrackingEvent("ping", { firstPing });
  }, intervalMs);
}

function setupWorldTracking(options: TrackingOptions = {}) {
  const {
    pingIntervalMs = DEFAULT_PING_INTERVAL_MS,
    enableEnter = true,
    enableLeave = true,
    enablePing = true,
  } = options;

  if (WA.player.tags.includes("bot")) {
    console.log("Bot detected. Tracking disabled.");
    return;
  }

  console.log("Setting up world tracking...");
  console.log("Room id:", WA.room.id);
  console.log("Room key:", getRoomKey(WA.room.id));

  if (enableEnter) {
    sendTrackingEvent("enter");
  }

  if (enablePing) {
    setupPingTracking(pingIntervalMs);
  }

  if (enableLeave) {
    window.addEventListener("pagehide", sendLeaveEventWithKeepAlive);
  }
}

async function getTrackingAreas(): Promise<TrackingArea[]> {
  try {
    const layers = await getLayersMap();
    const areas: TrackingArea[] = [];

    for (const layer of layers.values()) {
      if (layer.type !== "objectgroup") continue;

      for (const object of layer.objects) {
        if (!object.name || !object.properties) continue;

        const trackEnter =
          object.properties.find((prop) => prop.name === "trackEnter")
            ?.value === true;

        const trackLeave =
          object.properties.find((prop) => prop.name === "trackLeave")
            ?.value === true;

        if (trackEnter || trackLeave) {
          areas.push({
            name: object.name,
            trackEnter,
            trackLeave,
          });
        }
      }
    }

    console.log("Found tracking areas:", areas);
    return areas;
  } catch (error) {
    console.error("Error while getting tracking areas:", error);
    return [];
  }
}

async function setupAreaTracking() {
  console.log("Setting up area tracking...");

  const trackingAreas = await getTrackingAreas();

  const lastEnterByArea: Record<string, number> = {};
  const lastLeaveByArea: Record<string, number> = {};

  const areaTrackingEnabledAt = Date.now() + AREA_STARTUP_IGNORE_MS;

  for (const area of trackingAreas) {
    if (area.trackEnter) {
      console.log(`Setting up enter tracking for area: ${area.name}`);

      WA.room.area.onEnter(area.name).subscribe(() => {
        const now = Date.now();

        if (now < areaTrackingEnabledAt) {
          console.log(`Ignoring startup enter event for area: ${area.name}`);
          return;
        }

        const lastEnter = lastEnterByArea[area.name] || 0;

        if (now - lastEnter < AREA_COOLDOWN_MS) {
          console.log(`Enter cooldown active for area: ${area.name}`);
          return;
        }

        lastEnterByArea[area.name] = now;

        sendTrackingEvent("area_entered", {
          object: area.name,
        });
      });
    }

    if (area.trackLeave) {
      console.log(`Setting up leave tracking for area: ${area.name}`);

      WA.room.area.onLeave(area.name).subscribe(() => {
        const now = Date.now();

        if (now < areaTrackingEnabledAt) {
          console.log(`Ignoring startup leave event for area: ${area.name}`);
          return;
        }

        const lastLeave = lastLeaveByArea[area.name] || 0;

        if (now - lastLeave < AREA_COOLDOWN_MS) {
          console.log(`Leave cooldown active for area: ${area.name}`);
          return;
        }

        lastLeaveByArea[area.name] = now;

        sendTrackingEvent("area_left", {
          object: area.name,
        });
      });
    }
  }
}

function trackWorldAction(
  actionName: string,
  details: Record<string, unknown> = {},
) {
  return sendTrackingEvent("action", {
    actionName,
    details,
  });
}

async function setupTracking(options: TrackingOptions = {}) {
  setupWorldTracking(options);

  if (options.enableAreaTracking !== false) {
    await setupAreaTracking();
  }
}

function isRemoteBot(player: { name: string; outlineColor?: number }) {
  console.log("Checking proximity player:", {
    name: player.name,
    outlineColor: player.outlineColor,
  });

  return player.outlineColor === BOT_OUTLINE_COLOR;
}

async function setupPlayerInteractionTracking() {
  console.log("Setting up player interaction tracking...");

  try {
    await WA.players.configureTracking({
      players: true,
      movement: false,
    });
  } catch (error) {
    console.warn("Could not configure player tracking:", error);
  }

  let playerPlayerMeetingActive = false;

  WA.player.proximityMeeting.onJoin().subscribe((players) => {
    console.log("Proximity meeting players:", players);

    const realPlayers = players.filter((player) => !isRemoteBot(player));
    const realPlayerUuids = realPlayers.map((player) => player.uuid);

    console.log("Real players after bot filter:", realPlayerUuids);

    if (realPlayerUuids.length === 0) {
      console.log(
        "Only bot interaction detected. Not tracking as player-player.",
      );
      playerPlayerMeetingActive = false;
      return;
    }

    playerPlayerMeetingActive = true;

    sendTrackingEvent("start_player-player", {
      object: realPlayerUuids,
    });
  });

  WA.player.proximityMeeting.onLeave().subscribe(() => {
    if (!playerPlayerMeetingActive) {
      console.log("Bot-only meeting ended. Not tracking as player-player.");
      return;
    }

    sendTrackingEvent("stop_player-player");
    playerPlayerMeetingActive = false;
  });
}

function trackNpcInteraction(npcName: string) {
  return sendTrackingEvent("npc-interact", {
    object: npcName,
  });
}

export {
  trackNpcInteraction,
  setupTracking,
  setupPingTracking,
  setupWorldTracking,
  setupAreaTracking,
  getTrackingAreas,
  setupPlayerInteractionTracking,
  trackWorldAction,
};
