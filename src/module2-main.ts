/// <reference types="@workadventure/iframe-api-typings" />
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

WA.onInit().then(async () => {
  try {
    // Initialize the Scripting API Extra
    await bootstrapExtra();
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    WA.controls.disableRoomList();
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
        triggerMessage = WA.ui.displayActionMessage({
          message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
          callback: () => {
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

  WA.onInit().then(async () => {
    if (WA.player.state.Abschlussquiz2 === "solved") {
      WA.room.hideLayer("blockPortals");
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
        textColor: "#FFFFFF",
        timeToClose: 0,
        closable: false,
      });
    }
  }
});
WA.onInit().then(async () => {
  WA.room.area.onEnter("triggerM2Quests").subscribe(() => {
    if (WA.player.state.currentQuest === "quest8") {
      WA.player.state.currentQuest = "quest9";
    }
  });
  WA.room.area.onLeave("fromMatrix").subscribe(() => {
    if (WA.player.state.currentQuest === "quest8") {
      WA.player.state.currentQuest = "quest9";
    }
  });
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

(WA.onInit().then(async () => {
  // On start: if m2terminal1 is already "correct", update the room colors in the m2terminal1 region.
  if (WA.player.state.m2terminal1 === "correct") {
    const greenTiles: any[] = [];
    const redTiles: any[] = [];
    for (let x = 4; x <= 15; x++) {
      for (let y = 71; y <= 89; y++) {
        greenTiles.push({ x, y, tile: "green", layer: "green" });
        redTiles.push({ x, y, tile: null, layer: "red" });
      }
    }
    WA.room.setTiles(greenTiles);
    WA.room.setTiles(redTiles);
  }
}),
  WA.onInit().then(async () => {
    // On start: if m2terminal2 is already "correct", update the room colors in the m2terminal2 region.
    if (WA.player.state.m2terminal2 === "correct") {
      const greenTiles: any[] = [];
      const redTiles: any[] = [];
      for (let x = 4; x <= 15; x++) {
        for (let y = 47; y <= 70; y++) {
          greenTiles.push({ x, y, tile: "green", layer: "green" });
          redTiles.push({ x, y, tile: null, layer: "red" });
        }
      }
      WA.room.setTiles(greenTiles);
      WA.room.setTiles(redTiles);
    }
  }));

WA.onInit().then(async () => {
  // Listen for terminal-related state changes
  WA.player.state
    .onVariableChange("m2terminal1")
    .subscribe(async (newValue) => {
      // Set module2 to "1" for terminal1.
      WA.player.state.module2 = "1";
      if (newValue === "correct") {
        WA.chat.sendChatMessage(
          "##### 🔍 Wortschnipsel gefunden!   \n\n \n\n**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   \n\n \n\nDiese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   \n\n🔐 **Merk sie dir gut:**   \n\n \n\n📝 **ist / Wissenschaft / mehr**   \n\n \n\n📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    \n\n ",
          "Zirze",
        );
        WA.player.state.currentQuest = "quest12a";
        // Change tiles in the m2terminal1 region: from (4,71) to (15,89)
        const greenTiles: any[] = [];
        const redTiles: any[] = [];
        for (let x = 4; x <= 15; x++) {
          for (let y = 71; y <= 89; y++) {
            greenTiles.push({ x, y, tile: "green", layer: "green" });
            redTiles.push({ x, y, tile: null, layer: "red" });
          }
        }
        WA.room.setTiles(greenTiles);
        WA.room.setTiles(redTiles);
        levelUp("modul_2", 10);
        const cowebsites = await WA.nav.getCoWebSites();
        for (const cowebsite of cowebsites) {
          cowebsite.close();
        }
      }
    });

  WA.player.state
    .onVariableChange("m2terminal2")
    .subscribe(async (newValue) => {
      // Set m2terminal2 to "2" for terminal2.
      WA.player.state.module2 = "2";
      if (newValue === "correct") {
        WA.player.state.currentQuest = "quest15";
        // Change tiles in the m2terminal2 region: from (4,47) to (15,70)
        const greenTiles: any[] = [];
        const redTiles: any[] = [];
        for (let x = 4; x <= 15; x++) {
          for (let y = 47; y <= 70; y++) {
            greenTiles.push({ x, y, tile: "green", layer: "green" });
            redTiles.push({ x, y, tile: null, layer: "red" });
          }
        }
        WA.room.setTiles(greenTiles);
        WA.room.setTiles(redTiles);
        WA.chat.sendChatMessage(
          "##### 🔍 Weitere Wortschnipsel gefunden!   \n\n \n\n**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   \n\n \n\nDiese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   \n\n🔐 **Merk sie dir gut:**   \n\n \n\n📝 **eine / als / Wissenssammlung**   \n\n \n\n📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  \n\n  ",
          "Zirze",
        );

        levelUp("modul_2", 10);
        const cowebsites = await WA.nav.getCoWebSites();
        for (const cowebsite of cowebsites) {
          cowebsite.close();
        }
      }
    });
});
// Hardcoded step-by-step subscriptions for each variable key
WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({
  next: (newValue) => {
    if (newValue === "solved") {
      levelUp("modul_2", 10);
      console.log(`Variable "PlanungSelbstmanagement" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest10";
      setTimeout(() => {
        try {
          if (WA.chat && typeof WA.chat.close === "function") {
            WA.chat.close();
          }
        } catch (e) {
          console.error("Error closing chat:", e);
        }
      }, 60000);
    }
  },
});

WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({
  next: (newValue) => {
    if (newValue === "solved") {
      levelUp("modul_2", 10);
      console.log(`Variable "ThemenfindungGliederung" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest11";
      setTimeout(() => {
        try {
          if (WA.chat && typeof WA.chat.close === "function") {
            WA.chat.close();
          }
        } catch (e) {
          console.error("Error closing chat:", e);
        }
      }, 60000);
    }
  },
});

WA.player.state.onVariableChange("Lesen").subscribe({
  next: (newValue) => {
    if (newValue === "solved") {
      levelUp("modul_2", 10);
      console.log(`Variable "Lesen" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest14";
      setTimeout(() => {
        try {
          if (WA.chat && typeof WA.chat.close === "function") {
            WA.chat.close();
          }
        } catch (e) {
          console.error("Error closing chat:", e);
        }
      }, 60000);
    }
  },
});

WA.player.state.onVariableChange("Literaturrecherche").subscribe({
  next: (newValue) => {
    if (newValue === "solved") {
      levelUp("modul_2", 10);
      console.log(`Variable "Literaturrecherche" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest13";
      setTimeout(() => {
        try {
          if (WA.chat && typeof WA.chat.close === "function") {
            WA.chat.close();
          }
        } catch (e) {
          console.error("Error closing chat:", e);
        }
      }, 60000);
    }
  },
});

// Step 4: finalQuizTwo (only if previous step solved)
WA.player.state.onVariableChange("Abschlussquiz2").subscribe({
  next: (newValue) => {
    if (newValue === "solved") {
      WA.room.hideLayer("blockPortals");
      levelUp("modul_2", 10);
      console.log(`Variable "finalQuizTwo" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest16";
      setTimeout(() => {
        try {
          if (WA.chat && typeof WA.chat.close === "function") {
            WA.chat.close();
          }
        } catch (e) {
          console.error("Error closing chat:", e);
        }
      }, 60000);
    }
  },
});
/////// Tracking Ping Script

async function sendPlayerData(firstPing: boolean) {
  const WEBHOOK_URL =
    "https://apps.taskmagic.com/api/v1/webhooks/NpckzQWggzNKWa3Wqxmiq";
  const { uuid: id, name } = WA.player;
  if (!id || !name) {
    console.error("Invalid player data");
    return;
  }
  const roomId = WA.room.id;
  const timestamp = Date.now();
  const payload = { id, name, roomId, firstPing, timestamp };
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
  try {
    const response = await fetchWithTimeout(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
WA.onInit().then(() => {
  if (WA.player.tags.includes("bot")) return;
  let firstPing = true;
  sendPlayerData(firstPing);
  firstPing = false;
  setInterval(() => {
    sendPlayerData(firstPing);
  }, 300000);
});
//// End of Tracking Ping Script
export {};
