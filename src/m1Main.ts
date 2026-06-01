/// <reference types="@workadventure/iframe-api-typings" />
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {
  trackNpcInteraction, setupPlayerInteractionTracking,
  setupTracking,
  setupPingTracking,
} from "./worldTracking";
import { setupBotInteractionTracking } from "./botTracking";
import { playRandomNPCSound } from "./huh";

WA.onInit().then(async () => {
  try {
    // Initialize the Scripting API Extra
    await bootstrapExtra();
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    console.log("Scripting API Extra ready");
  } catch (e) {
    console.error(e);
  }


  
  // Get chat areas and set up event listeners for entering and leaving them

  WA.onInit().then(async () => {
    // Get chat areas and set up event listeners for entering and leaving them
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
      let triggerMessage: any;
      let playerName: string = WA.player.name;
      console.log("Player name:", playerName);
      // When player enters a chat area
      WA.room.area.onEnter(area.name).subscribe(() => {
        playRandomNPCSound(area.npcName);
        
        triggerMessage = WA.ui.displayActionMessage({
          message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
          callback: () => {
            trackNpcInteraction(area.name);
            WA.chat.sendChatMessage(
              area.chatText.replace("{NameOfPlayer}", playerName),
              area.npcName,
            );
            if (area.triggerQuest) {
              const currentQuest = WA.player.state.currentQuest;
              const requiredQuest = quests.find(
                (q: { questId: string }) => q.questId === area.triggerQuest,
              )?.requireQuest;
              if (currentQuest === requiredQuest) {
                WA.player.state.currentQuest = area.triggerQuest;
              }
            }
            
          },
        });
        WA.room.area.onLeave(area.name).subscribe(() => {
          WA.chat.close();
        });
      });

      // When player leaves a chat area
      WA.room.area.onLeave(area.name).subscribe(() => {
        if (triggerMessage) {
          triggerMessage.remove();
          WA.chat.close();
        }
      });
    }
  });

  // Event listener for player movement to play footstep sounds
  WA.player.onPlayerMove(async ({ x, y, moving }) => {
    const material = await checkPlayerMaterial({ x, y });
    if (!material) {
      mySound?.stop();
      return;
    }

    if (!moving && !material) {
      mySound?.stop();
      return;
    } else {
      mySound?.stop();
      playRandomSound(material);
    }
  });

  // Display the current quest banner if a quest is active
  const currentQuestId = WA.player.state.currentQuest;
  const currentQuest = quests.find(
    (q: { questId: string }) => q.questId === currentQuestId,
  );
  if (currentQuest) {
    createQuestBanner(currentQuest.questId);
  }

  // Event listener for changes in the current quest
  WA.player.state.onVariableChange("currentQuest").subscribe((newQuestId) => {
    const newQuest = quests.find(
      (q: { questId: string }) => q.questId === newQuestId,
    );
    if (newQuest) {
      createQuestBanner(newQuest.questId);
    }
  });

  // Function to create a quest banner
  function createQuestBanner(questId: string) {
    const quest = quests.find(
      (q: { questId: string }) => q.questId === questId,
    );
    if (quest) {
      WA.ui.banner.openBanner({
        id: quest.questId,
        text: quest.questDescription,
        bgColor: "#1B1B29",
        timeToClose: 0,
        textColor: "#FFFFFF",
        closable: false,
      });
    }
  }
});

// Hardcoded module configurations
interface ModuleTileConfig {
  moduleName: string;
  triggerValue: string | number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

function updateTiles(config: ModuleTileConfig) {
  const { moduleName, triggerValue, startX, endX, startY, endY } = config;
  if (WA.player.state[moduleName] !== triggerValue) return;
  const green: any[] = [];
  const red: any[] = [];
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      green.push({ x, y, tile: "green", layer: "green" });
      red.push({ x, y, tile: null, layer: "red" });
    }
  }
  WA.room.setTiles(green);
  WA.room.setTiles(red);
}

const hardcodedModules: {
  [key: string]: {
    triggerValue: string;
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  };
} = {
  module_1_1: {
    triggerValue: "1",
    startX: 4,
    endX: 15,
    startY: 71,
    endY: 89,
  },
  module_1_2: {
    triggerValue: "1",
    startX: 4,
    endX: 15,
    startY: 47,
    endY: 70,
  },
};

WA.onInit().then(() => {
  // Initial updates using hardcodedModules
  for (const moduleName in hardcodedModules) {
    const config = hardcodedModules[moduleName];
    updateTiles({
      moduleName,
      triggerValue: config.triggerValue,
      startX: config.startX,
      endX: config.endX,
      startY: config.startY,
      endY: config.endY,
    });
  }
});

// Subscribe to changes for each module tile configuration from hardcodedModules
for (const moduleName in hardcodedModules) {
  const config = hardcodedModules[moduleName];
  WA.player.state.onVariableChange(moduleName).subscribe((newValue) => {
    if (newValue === config.triggerValue) {
      updateTiles({
        moduleName,
        triggerValue: config.triggerValue,
        startX: config.startX,
        endX: config.endX,
        startY: config.startY,
        endY: config.endY,
      });
    }
  });
}
// List of variable keys that trigger events to do something (tbd)
const eventVariableKeys = [
  "Textarten",
  "3_1_2AllgemeineRegeln",
  "Sprache",
  "Zitiren",
  "ZitierenImText",
  "Literaturverzeichnis",
  "Literaturverwaltung",
  // The key used to track the current quest state
  // Add additional keys here when needed
];

// Subscribe to changes for each variable key

for (const key of eventVariableKeys) {
  WA.player.state.onVariableChange(key).subscribe((newValue) => {
    levelUp("modul_3", 10);
    console.log(`Variable "${key}" changed to:`, newValue, "Level up, +10XP");
  });
}

// Tracking script

WA.onInit().then(async () => {
 if (WA.player.name.toLowerCase() === "bot" || WA.player.tags.includes("bot")) {
   WA.player.setOutlineColor(147, 51, 234); // purple

   await setupBotInteractionTracking();

   return;
 };

await 
setupTracking();
setupPingTracking(); // default 3 minutes
setupPlayerInteractionTracking();
});
export {};
