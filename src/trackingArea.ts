import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

interface TrackingArea {
  name: string;
  trackEnter: boolean;
  trackLeave: boolean;
}

const AREA_TRACKING_WEBHOOK_URL =
  "https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg";

const COOLDOWN_MS = 10_000;

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

async function sendAreaTrackingEvent(
  playerId: string,
  areaName: string,
  eventType: "area_entered" | "area_left",
) {
  const payload = {
    id: playerId,
    h5pid: areaName,
    timestamp: Date.now(),
    eventType,
  };

  try {
    const response = await fetchWithTimeout(AREA_TRACKING_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Area tracking event logged:", payload);
  } catch (error) {
    console.error("Error logging area tracking event:", error);
  }
}

async function setupAreaTracking() {
  console.log("Setting up area tracking...");

  const trackingAreas = await getTrackingAreas();
  const playerId = WA.player.uuid || "unknown_player";

  const lastEnterByArea: Record<string, number> = {};
  const lastLeaveByArea: Record<string, number> = {};

  for (const area of trackingAreas) {
    if (area.trackEnter) {
      console.log(`Setting up enter tracking for area: ${area.name}`);

      WA.room.area.onEnter(area.name).subscribe(() => {
        const now = Date.now();
        const lastEnter = lastEnterByArea[area.name] || 0;

        if (now - lastEnter < COOLDOWN_MS) {
          console.log(`Enter cooldown active for area: ${area.name}`);
          return;
        }

        lastEnterByArea[area.name] = now;

        sendAreaTrackingEvent(playerId, area.name, "area_entered");
      });
    }

    if (area.trackLeave) {
      console.log(`Setting up leave tracking for area: ${area.name}`);

      WA.room.area.onLeave(area.name).subscribe(() => {
        const now = Date.now();
        const lastLeave = lastLeaveByArea[area.name] || 0;

        if (now - lastLeave < COOLDOWN_MS) {
          console.log(`Leave cooldown active for area: ${area.name}`);
          return;
        }

        lastLeaveByArea[area.name] = now;

        sendAreaTrackingEvent(playerId, area.name, "area_left");
      });
    }
  }
}

export { getTrackingAreas, setupAreaTracking };
