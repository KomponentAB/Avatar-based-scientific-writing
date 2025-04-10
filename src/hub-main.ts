/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";

WA.onInit().then(async () => {
    console.log('loading main.ts');
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    // Initialize the first quest if not already set
 
    try {
        // Initialize the Scripting API Extra
        await bootstrapExtra();
        console.log('Scripting API Extra ready');
    } catch (e) {
        console.error(e);
    }});
    WA.onInit().then(() => {
        WA.room.area.onLeave("toMatrix").subscribe(() => {
            if (WA.player.state.currentQuest === "quest6") {
                WA.player.state.currentQuest = "quest7";
            }
        });
    });



WA.onInit().then(async () => {
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
    if (WA.player.state.module2 === '2' && WA.player.state.module3 === '2') {
        // Only display the terminal layers
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
            WA.chat.sendChatMessage("Bitte gib das Lösungswort ein", "Zirze");
    

        WA.chat.onChatMessage(async (message, event) => {
            // Check if the message is coming from the local user
            if (event.authorId === undefined) {
                const lowerMsg = message.toLowerCase();
                if (
                    lowerMsg.includes("wissenschaft") &&
                    lowerMsg.includes("wissenssammlung") &&
                    lowerMsg.includes("art") &&
                    lowerMsg.includes("denken")
                ) {
                    WA.chat.sendChatMessage("Success: Das ist korrekt, ich teleportiere dich zurück zu Prof. Mumblecore!", "Zirze");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    WA.player.state.currentQuest = "quest27"
                    levelUp("notlog", 177);
                    WA.nav.goToRoom("./notlog-solved.tmj");
                } else {
                    WA.chat.sendChatMessage("Error: Das war nicht die korrekte Antwort. Erinnere dich daran was Wissenschaft ist und was nicht.", "Zirze");
                }
            }
        }, { scope: 'local' })});
    } else {
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
            WA.chat.sendChatMessage("## 🖥️ Reparatur des Computerterminals  \n\n Komme hierhin zurück, wenn du **Modul 2** und **3** gelöst hast. ✅   \n\n Um dieses **Computerterminal** zu reparieren, benötigst du die richtigen **Wortschnipsel**, die beim **Einbruch durch Lord Modrevolt** 💀 durcheinandergeraten sind.  \n\n Finde die Fragmente und setze sie korrekt zusammen, um das System wiederherzustellen! 🚀 ", "Zirze");
        });
    }
    WA.room.area.onLeave("finalCodeTerminal").subscribe(() => {
        WA.chat.close();
    });
});
WA.onInit().then(() => {
    function updateRoomForSolved() {
        const solvedModule2 = WA.player.state.module2 === '2';
        const solvedModule3 = WA.player.state.module3 === '2';

        // Both modules solved: recolor the entire map and send the full success message.
        if (solvedModule2 && solvedModule3) {
            const green: any[] = [];
            const red: any[] = [];
            for (let x = 0; x <= 47; x++) {
                for (let y = 0; y <= 36; y++) {
                    green.push({ x, y, tile: "green", layer: "green" });
                    red.push({ x, y, tile: "red", layer: "red" });
                }
            }
            // Combine the green and red tile changes in one call.
            WA.room.setTiles([...green, ...red]);
            WA.chat.sendChatMessage(
                "🌟 **Wow, das ging schnell!** 🌟   \n\nDu hast **beide Module gemeistert**. 💪   \n\nIch hoffe, du kannst dich noch an alle **Wortschnipsel**✂️ erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐   \n\nFalls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻   \n\nIch darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍   \n\nWenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀",
                "Zirze"
            );
        } 
        // Only module2 solved: send the message that encourages the user to continue.
        else if (solvedModule2) {
            WA.chat.sendChatMessage(
                "🎉 **Hervorragend, dich kann man gebrauchen!** 🎉   \n\nDu hast **Modul 2** gemeistert und schon einiges über die Techniken des wissenschaftlichen Arbeitens gelernt. 🧠📚   \n\nVergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡   \n\nDu bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖",
                "Zirze"
            );
        }
    }

    // Subscribe to changes on both module2 and module3.
    WA.player.state.onVariableChange("module2").subscribe(updateRoomForSolved);
    WA.player.state.onVariableChange("module3").subscribe(updateRoomForSolved);

    // Run once in case both variables are already set.
    updateRoomForSolved();
});
export {};

