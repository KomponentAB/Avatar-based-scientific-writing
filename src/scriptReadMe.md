# Avatar-based Scientific Writing
## Script Documentation v2.0

---

# Overview

This project extends a WorkAdventure learning environment with:

- Player tracking
- Area tracking
- NPC interactions
- H5P learning analytics
- Bot communication analytics
- Quest progression
- Audio feedback
- Google Sheets integration
- TaskMagic automation workflows

The overall goal is to collect meaningful learning analytics while creating an immersive educational experience.

---

# Architecture

The project consists of several independent modules.

| Module | Purpose |
|----------|----------|
| worldTracking.ts | Main tracking system |
| botTracking.ts | Tracks conversations with bots |
| trackBook.js | Tracks H5P workbook openings |
| CompletionEventScriptCopy.js | Tracks workbook completion |
| chatArea.ts | NPC area discovery and management |
| huh.ts | NPC sound playback system |
| main.ts | World-specific logic |

---

# Core Tracking Concepts

Every tracking event is sent to a webhook.

Most events contain:

```json
{
  "id": "player-uuid",
  "name": "Player Name",
  "roomId": "full-room-url",
  "roomKey": "module_1",
  "timestamp": 1780321002120,
  "eventType": "..."
}
```

---

# World Tracking

## File

```text
worldTracking.ts
```

Responsible for:

- world entry tracking
- world exit tracking
- ping tracking
- area tracking
- NPC interaction tracking
- player-player interaction tracking

---

# Event Types

## enter

Triggered when a player enters a world.

```json
{
  "eventType": "enter"
}
```

---

## tab_closed

Triggered when a browser tab closes.

```json
{
  "eventType": "tab_closed"
}
```

Uses:

```ts
window.addEventListener("pagehide", ...)
```

with:

```ts
keepalive: true
```

to maximize delivery success.

---

## ping

Regular activity heartbeat.

Default interval:

```text
180000 ms
3 minutes
```

Payload example:

```json
{
  "eventType": "ping",
  "firstPing": false,
  "sheetsId": 410008593
}
```

---

## action

Generic custom tracking event.

```json
{
  "eventType": "action"
}
```

---

## npc-interact

Triggered when a player actively talks to an NPC.

```json
{
  "eventType": "npc-interact",
  "object": "Zitierende Zirze"
}
```

---

## area_entered

Triggered when entering a tracked area.

```json
{
  "eventType": "area_entered",
  "object": "library_area"
}
```

---

## area_left

Triggered when leaving a tracked area.

```json
{
  "eventType": "area_left",
  "object": "library_area"
}
```

---

## start_player-player

Triggered when a proximity meeting starts.

```json
{
  "eventType": "start_player-player",
  "object": [
    "uuid-1",
    "uuid-2"
  ]
}
```

---

## stop_player-player

Triggered when a proximity meeting ends.

```json
{
  "eventType": "stop_player-player"
}
```

---

# Ping Tracking

## Webhook

All pings are sent to:

```text
https://apps.taskmagic.com/api/v1/webhooks/R8rhVbxKuQu61j69PLtKW
```

---

## Google Sheets Mapping

Room keys are mapped to Google Sheet IDs.

```ts
const ROOM_SHEET_IDS = {
  notlog: 1419742566,
  hub: 1527348245,
  module_1: 410008593,
  module_2: 366813808,
  module_3: 1800670407,
  "notlog-solved": 526346111,
};
```

Each ping automatically receives:

```json
{
  "sheetsId": 410008593
}
```

depending on the current room.

---

# Room Keys

Room keys are automatically extracted from:

```ts
WA.room.id
```

Example:

```text
module_1.tmj
```

becomes:

```text
module_1
```

using:

```ts
function getRoomKey(roomId: string): string {
  const key =
    roomId.split("/").filter(Boolean).pop() || "unknown_room";

  return key.replace(".tmj", "");
}
```

---

# Area Tracking

Tracked areas are discovered automatically.

## Supported TMJ Properties

### trackEnter

```json
{
  "trackEnter": true
}
```

### trackLeave

```json
{
  "trackLeave": true
}
```

Example:

```json
{
  "name": "library",
  "trackEnter": true,
  "trackLeave": true
}
```

---

# Cooldowns

Area tracking uses cooldown protection.

Current value:

```text
10000 ms
10 seconds
```

Purpose:

Prevent rapid duplicate events.

---

# Startup Protection

Current value:

```text
2000 ms
2 seconds
```

Purpose:

Prevent false enter/leave events during initialization.

---

# NPC System

## File

```text
chatArea.ts
```

NPCs are automatically discovered from TMJ object layers.

---

## Required Properties

### isNpc

```json
{
  "isNpc": true
}
```

### npcName

```json
{
  "npcName": "Zitierende Zirze"
}
```

### chatText

```json
{
  "chatText": "Hello adventurer!"
}
```

### triggerQuest

Optional.

```json
{
  "triggerQuest": "quest_001"
}
```

---

# NPC Audio System

## File

```text
huh.ts
```

Provides random voice lines when entering NPC areas.

---

## Example

```ts
playRandomNPCSound(area.npcName);
```

---

## NPC Sound Mapping

```ts
const npcSounds = {
  "Zitierende Zirze": [
    "Zirze_1.wav",
    "Zirze_2.wav",
    "Zirze_3.wav",
    "Zirze_4.wav",
    "Zirze_5.wav",
  ],
};
```

Whenever a player enters an NPC area:

1. NPC name is checked
2. Corresponding sound collection is selected
3. One random sound is played

---

# H5P Tracking

## File

```text
trackBook.js
```

Tracks workbook openings.

---

## Event

```json
{
  "eventType": "H5P_open",
  "object": "WorkbookName"
}
```

---

# Workbook Completion Tracking

## File

```text
CompletionEventScriptCopy.js
```

Tracks successful workbook completion.

---

## Event

```json
{
  "eventType": "solved",
  "object": "WorkbookName"
}
```

Triggered only once.

Uses:

```ts
WA.player.state[workbookName]
```

to prevent duplicates.

---

# Bot Tracking

## File

```text
botTracking.ts
```

Tracks all communication involving bots.

---

## Bot Detection

Bots are identified by:

### Player Tag

```ts
WA.player.tags.includes("bot")
```

or

### Player Name

```ts
WA.player.name.toLowerCase() === "bot"
```

---

## Visual Identification

Bots receive a purple outline:

```ts
WA.player.setOutline(147, 51, 234);
```

Internal outline color:

```text
9645034
```

---

# Bot Events

## player_message

Player sends a message to a bot.

```json
{
  "eventType": "player_message"
}
```

---

## bot_message

Bot sends a message.

```json
{
  "eventType": "bot_message"
}
```

---

# Design Goals

1. Track only real user actions.
2. Avoid initialization-triggered events.
3. Separate player-player and player-bot interactions.
4. Keep modules reusable.
5. Allow independent testing outside WorkAdventure whenever possible.
6. Use Google Sheets as analytics storage.
7. Use TaskMagic as automation and processing backend.

---

# Current Version

```text
Version: 2.0
```