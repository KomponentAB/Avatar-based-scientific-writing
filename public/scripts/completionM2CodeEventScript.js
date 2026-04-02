/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // =============================================
  // CONFIG – hier deine Web App URL eintragen
  // =============================================
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/DEINE_WEB_APP_ID/exec";
  // =============================================

  const script = document.createElement("script");
  script.onload = () => {
    console.log("External iframe API loaded.");
  };
  document.head.appendChild(script);

  /**
   * Ruft den nächsten freien Code aus Google Sheets ab (doGet).
   * Gibt den Code als String zurück, oder null bei Fehler.
   */
  async function fetchCodeFromSheet() {
    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "GET",
        redirect: "follow",
      });
      const json = await response.json();
      if (json.code) {
        console.log("✅ Code vom Sheet erhalten:", json.code);
        return json.code;
      } else {
        console.error("❌ Kein Code verfügbar:", json.error);
        return null;
      }
    } catch (err) {
      console.error("❌ Fehler beim Abrufen des Codes:", err);
      return null;
    }
  }

  /**
   * Schreibt die SpielerID und einen Timestamp in das Google Sheet (doPost).
   * @param {string} playerId  – WA.player.id
   * @param {string} code      – der zugewiesene Code
   */
  async function postPlayerIdToSheet(playerId, code) {
    try {
      const body = JSON.stringify({ playerId, code });
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, // text/plain wegen CORS in Apps Script
        body,
        redirect: "follow",
      });
      const json = await response.json();
      if (json.success) {
        console.log("✅ SpielerID im Sheet hinterlegt:", playerId, "für Code:", code);
      } else {
        console.error("❌ Fehler beim Speichern:", json.error);
      }
    } catch (err) {
      console.error("❌ Fehler beim POST zum Sheet:", err);
    }
  }

  function handleModuleCompletionEvents(
    completionMessage,
    messageNpc,
    workbookName,
    returnMessage
  ) {
    console.log("🚩 Completion Event Script loaded");

    WA.onInit().then(() => {
      console.log(workbookName + " geladen", messageNpc);

      const checkState = async () => {
        try {
          const stateValue = WA.player.state[workbookName];
          if (stateValue === "solved") {
            // Bereits gelöst: Code aus Sheet holen und erneut senden
            const code = await fetchCodeFromSheet();
            const msg = returnMessage + (code ? "\n🔑 Dein Code: " + code : "");
            WA.chat.sendChatMessage(msg, messageNpc);
          }
        } catch (error) {
          console.error("Fehler in checkState:", error);
        }
      };

      checkState();
    });

    // Validate H5P and externalDispatcher
    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or externalDispatcher is not available.");
      return;
    }

    let instance;

    H5P.externalDispatcher.on("initialized", () => {
      instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
    });

    H5P.externalDispatcher.on("xAPI", async (event) => {
      if (!instance) return;

      if (instance.getScore() === instance.getMaxScore()) {
        console.log(
          `🚩 COMPLETED: ${instance.getScore()} / ${instance.getMaxScore()} for ${workbookName}`
        );

        if (WA.player.state[workbookName] !== "solved") {
          // 1. State auf solved setzen
          WA.player.state[workbookName] = "solved";
          console.log(workbookName + " 🚩 State variable has been changed to solved");

          // 2. Abschluss-Nachricht senden
          WA.chat.sendChatMessage(completionMessage, messageNpc);

          // 3. Code aus Google Sheet holen
          const code = await fetchCodeFromSheet();

          if (code) {
            // 4. Code per Chat senden
            WA.chat.sendChatMessage("🔑 Dein Code: " + code, messageNpc);

            // 5. SpielerID + Code ins Sheet schreiben
            const playerId = WA.player.id;
            await postPlayerIdToSheet(playerId, code);
          } else {
            WA.chat.sendChatMessage(
              "⚠️ Leider ist kein Code mehr verfügbar. Bitte wende dich an den Support.",
              messageNpc
            );
          }

          // 6. Co-Website nach 2 Minuten schließen
          setTimeout(async () => {
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
              cowebsite.close();
            }
          }, 120000);
        }
      }
    });
  }

  window.handleModuleCompletionEvents = handleModuleCompletionEvents;
})();