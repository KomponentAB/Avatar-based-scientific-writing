/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // =============================================
  // CONFIG – hier deine Web App URL eintragen
  // =============================================
  const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1JF6BCFIV4ZW5mR_a8PYyHt96uJkfY98zQHSEF8duYoo/edit?usp=sharing";
  // =============================================

  const script = document.createElement("script");
  script.onload = () => {
    console.log("External iframe API loaded.");
  };
  document.head.appendChild(script);

  /**
   * Ruft Code aus Google Sheets ab (doGet).
   * Übergibt die SpielerID als Query-Parameter.
   *
   * Antwort: {
   *   code: "1234",
   *   alreadyRegistered: true | false
   * }
   * oder { error: "..." }
   */
  async function fetchCodeFromSheet(playerId) {
    try {
      const url = GOOGLE_SHEET_URL + "?playerId=" + encodeURIComponent(playerId);
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });
      const data = await response.json();
      if (data.code) {
        console.log("✅ Code vom Sheet erhalten:", data.code, "| alreadyRegistered:", data.alreadyRegistered);
        return data; // { code, alreadyRegistered }
      } else {
        console.error("❌ Kein Code verfügbar:", data.error);
        return null;
      }
    } catch (err) {
      console.error("❌ Fehler beim Abrufen des Codes:", err);
      return null;
    }
  }

  /**
   * Schreibt SpielerID + Code ins Sheet (doPost).
   * Wird vom Sheet ignoriert wenn die ID bereits bekannt ist.
   */
  async function postPlayerIdToSheet(playerId, code) {
    try {
      const body = JSON.stringify({ playerId, code });
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body,
        redirect: "follow",
      });
      const data = await response.json();
      if (data.success) {
        console.log("✅ SpielerID im Sheet hinterlegt:", playerId, "für Code:", code);
      } else if (data.alreadyRegistered) {
        console.log("ℹ️ SpielerID war bereits registriert, keine Änderung.");
      } else {
        console.error("❌ Fehler beim Speichern:", data.error);
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
            const playerId = WA.player.id;
            const result = await fetchCodeFromSheet(playerId);

            if (result && result.alreadyRegistered) {
              // SpielerID bereits im Sheet → returnMessage senden
              WA.chat.sendChatMessage(returnMessage, messageNpc);
            } else if (result && result.code) {
              // Neu gelöst aber State schon gesetzt → completionMessage + Code
              WA.chat.sendChatMessage(completionMessage + "\n🔑 Dein Code: " + result.code, messageNpc);
            }
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

          const playerId = WA.player.id;

          // 2. Code vom Sheet holen (mit SpielerID-Prüfung)
          const result = await fetchCodeFromSheet(playerId);

          if (result && result.alreadyRegistered) {
            // SpielerID bereits im Sheet → returnMessage senden
            WA.chat.sendChatMessage(returnMessage, messageNpc);

          } else if (result && result.code) {
            // Neue Registrierung → completionMessage + Code senden
            WA.chat.sendChatMessage(completionMessage + "\n🔑 Dein Code: " + result.code, messageNpc);

            // SpielerID im Sheet hinterlegen
            await postPlayerIdToSheet(playerId, result.code);

          } else {
            WA.chat.sendChatMessage(
              "⚠️ Leider ist kein Code mehr verfügbar. Bitte wende dich an den Support.",
              messageNpc
            );
          }

          // 3. Co-Website nach 2 Minuten schließen
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