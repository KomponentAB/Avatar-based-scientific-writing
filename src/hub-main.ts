/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getChatAreas } from "./chatArea";
import { quests, levelUp } from "./quests";

WA.onInit().then(async () => {
    console.log('loading main.ts');
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    // Initialize the first quest if not already set
    if (!WA.player.state.currentQuest) {
        WA.player.state.currentQuest = 'quest6';
    }
    levelUp("notlog", 0);

    try {
        // Initialize the Scripting API Extra
        await bootstrapExtra();
        console.log('Scripting API Extra ready');
    } catch (e) {
        console.error(e);
    }
    // Get chat areas and set up event listeners for entering and leaving them
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
        let triggerMessage: any;

        // When player enters a chat area
        WA.room.area.onEnter(area.name).subscribe(() => {
            triggerMessage = WA.ui.displayActionMessage({
                message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
                callback: () => {
                    WA.chat.sendChatMessage(area.chatText, area.npcName);
                    if (area.triggerQuest) {
                        const currentQuest = WA.player.state.currentQuest;
                        const requiredQuest = quests.find((q: { questId: string }) => q.questId === area.triggerQuest)?.requireQuest;
                        if (currentQuest === requiredQuest) {
                            WA.player.state.currentQuest = area.triggerQuest;
                        }
                    }
                }
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

    // Display the current quest banner if a quest is active
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q: { questId: string }) => q.questId === currentQuestId);
    if (currentQuest) {
        createQuestBanner(currentQuest.questId);
    }

    // Event listener for changes in the current quest
    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        const newQuest = quests.find((q: { questId: string }) => q.questId === newQuestId);
        if (newQuest) {
            createQuestBanner(newQuest.questId);
        }
    });

    // Function to create a quest banner
    function createQuestBanner(questId: string) {
        const quest = quests.find((q: { questId: string }) => q.questId === questId);
        if (quest) {
            WA.ui.banner.openBanner({
                id: quest.questId,
                text: quest.questDescription,
                bgColor: '#1B1B29',
                textColor: '#FFFFFF',
                closable: false
            });
        }
    }
});
WA.onInit().then(async () => {
    if (WA.player.state.module2 === 'solved' && WA.player.state.module3 === 'solved') {
        // Only display the terminal layers
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
            WA.chat.sendChatMessage("enter code", "Terminal");
        });

        WA.chat.onChatMessage((message, event) => {
            // Check if the message is coming from the local user
            if (event.authorId === undefined) {
                if (message.includes("code")) {
                    WA.chat.sendChatMessage("Your message was correct!", "Zirze");
                } else {
                    WA.chat.sendChatMessage("Error: your message did not contain 'code'.", "Terminal");
                }
            }
        }, { scope: 'local' });
    } else {
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
        WA.chat.sendChatMessage("Solve module2 and module3 and come back here and enter the correct code to repair the matrix", "Terminal");
    })
}
WA.room.area.onLeave("finalCodeTerminal").subscribe(() => {
    WA.chat.close();
});});
WA.onInit().then(() => {
    function updateRoomForSolved() {
        if (WA.player.state.module2 === 'solved' && WA.player.state.module3 === 'solved') {
            const green: any[] = [];
            const red: any[] = [];
            for (let x = 0; x <= 47; x++) {
                for (let y = 0; y <= 36; y++) {
                    green.push({ x, y, tile: "green", layer: "green" });
                    red.push({ x, y, tile: null, layer: "red" });
                }
            }
            WA.room.setTiles(green);
            WA.room.setTiles(red);
        }
    }

    // Subscribe to changes on both module2 and module3
    WA.player.state.onVariableChange("module2").subscribe(updateRoomForSolved);
    WA.player.state.onVariableChange("module3").subscribe(updateRoomForSolved);

    // Run once in case both variables are already 'solved'
    updateRoomForSolved();
});
export {};

