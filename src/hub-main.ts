/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";

WA.onInit().then(async () => {
    console.log('loading main.ts');
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    WA.controls.disableRoomList();
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

                    
                    WA.chat.sendChatMessage(area.chatText.replace("{NameOfPlayer}", playerName),area.npcName);
                    if (area.triggerQuest) {
                        const currentQuest = WA.player.state.currentQuest;
                        const requiredQuest = quests.find((q: { questId: string }) => q.questId === area.triggerQuest)?.requireQuest;
                        if (currentQuest === requiredQuest) {
                            WA.player.state.currentQuest = area.triggerQuest;
                        }
                    }
                }
            });
            WA.room.area.onLeave(area.name).subscribe(() => {WA.chat.close();});
        
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
                timeToClose: 0,
                bgColor: '#1B1B29',
                textColor: '#FFFFFF',
                closable: false
            });
        }
    }
});

WA.onInit().then(async () => {
    if (WA.player.state.module2 === '2' && WA.player.state.module3 === '2') {
        // When both modules are solved, prompt the user and listen for their answer in chat.
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
            let actionMessage: any;

            actionMessage = WA.ui.displayActionMessage({
                message: `[LEERTASTE] drücken um mit dem Terminal zu interagieren.`,
                callback: () => {
                    WA.chat.sendChatMessage(
                        "Du kannst jetzt den Sicherheitscode eingeben. Schreibe die richtigen Begriffe in den Chat.",
                        "Zirze"
                    );

                    WA.chat.onChatMessage(
                        async (message, event) => {
                            // Check if the message is coming from the local user
                            if (event.authorId === undefined) {
                                const lowerMsg = message.toLowerCase();
                                if (
                                    lowerMsg.includes("wissenschaft") &&
                                    lowerMsg.includes("wissenssammlung") &&
                                    lowerMsg.includes("art") &&
                                    lowerMsg.includes("denken")
                                ) {
                                    WA.chat.sendChatMessage(
                                        " 🌟 **Alles korrekt** 🌟\n\nIch teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉",
                                        "Zirze"
                                    );
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 4000)
                                    );
                                    WA.player.state.currentQuest = "quest27";
                                    levelUp("notlog2", 42);
                                    WA.nav.goToRoom("./notlog-solved.tmj");
                                } else {
                                    WA.chat.sendChatMessage(
                                        "Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍",
                                        "Zirze"
                                    );
                                }
                            }
                        },
                        { scope: "local" }
                    );
                }
            });

            WA.room.area.onLeave("finalCodeTerminal").subscribe(() => {
                if (actionMessage) {
                    actionMessage.remove();
                }
                WA.chat.close();
            });
        });
    } else {
        WA.room.area.onEnter("finalCodeTerminal").subscribe(() => {
            WA.chat.sendChatMessage(
                "Die Module sind noch nicht vollständig gelöst. Kehre später zurück.",
                "Zirze"
            );
        });
    }
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
                "🌟 **Wow, das ging schnell!** 🌟 \n\n \n\nDu hast **beide Module gemeistert**. 💪 \n\n \n\nIch hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 \n\n \n\nFalls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 \n\n \n\nIch darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 \n\n \n\nWenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀",
                "Zirze"
            );
        } 
        // Only module2 solved: send the message that encourages the user to continue.
        else if (solvedModule2) {
            WA.chat.sendChatMessage(
                "🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 \n\n \n\nDu hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 \n\n \n\nVergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 \n\n \n\nDu bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 ",
                "Zirze"
            );
        }
    }

    // On Init, check if both module2 and module3 are solved.
    if (WA.player.state.module2 === '2' && WA.player.state.module3 === '2') {
        updateRoomForSolved();
    }

});
export {};

