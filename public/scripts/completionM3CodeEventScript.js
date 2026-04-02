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
   * Antwort: { code: "1234", alreadyRegistered: true | false }
   * oder     { error: "..." }
   */
  async function fetchCodeFromSheet(playerId) {
    if (!playerId) {
      console.error("❌ fetchCodeFromSheet: playerId ist leer oder undefined!");
      return null;
    }
    try {
      const url = GOOGLE_SHEET_URL + "?playerId=" + encodeURIComponent(playerId);
      console.log("📡 GET →", url);
      const response = await fetch(url, { method: "GET", redirect: "follow" });
      const data = await response.json();
      console.log("📥 Sheet-Antwort:", JSON.stringify(data));
      if (data.code) {
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
    if (!playerId) {
      console.error("❌ postPlayerIdToSheet: playerId ist leer oder undefined!");
      return;
    }
    try {
      const body = JSON.stringify({ playerId, code });
      console.log("📡 POST → body:", body);
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body,
        redirect: "follow",
      });
      const data = await response.json();
      console.log("📥 POST-Antwort:", JSON.stringify(data));
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

    // ── WA.onInit als Promise speichern ──────────────────────────────
    // Damit können wir aus dem xAPI-Handler darauf warten, bevor wir
    // WA.player.id lesen – verhindert "undefined" als SpielerID.
    let waReady = false;
    let waPlayerId = null;

    const initPromise = WA.onInit().then(() => {
      waPlayerId = WA.player.id;
      waReady = true;
      console.log("✅ WA.onInit abgeschlossen. playerId:", waPlayerId);
    });

    // ── checkState: beim Laden prüfen ob bereits gelöst ──────────────
    initPromise.then(async () => {
      try {
        const stateValue = WA.player.state[workbookName];
        console.log("🔍 checkState:", workbookName, "=", stateValue, "| playerId:", waPlayerId);

        if (stateValue === "solved") {
          const result = await fetchCodeFromSheet(waPlayerId);

          if (result && result.alreadyRegistered) {
            // SpielerID bekannt → returnMessage
            WA.chat.sendChatMessage(returnMessage, messageNpc);
          } else if (result && result.code) {
            // State gelöst, aber noch nicht im Sheet (Edge Case)
            WA.chat.sendChatMessage(completionMessage + "\n🔑 Dein Code: " + result.code, messageNpc);
          }
        }
      } catch (error) {
        console.error("Fehler in checkState:", error);
      }
    });

    // ── H5P Validation ───────────────────────────────────────────────
    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or externalDispatcher is not available.");
      return;
    }

    let instance;

    H5P.externalDispatcher.on("initialized", () => {
      instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
      console.log("🎯 H5P instance bereit:", instance ? "ja" : "nein");
    });

    // ── xAPI Event: Abschluss ─────────────────────────────────────────
    H5P.externalDispatcher.on("xAPI", async (event) => {
      if (!instance) return;

      if (instance.getScore() === instance.getMaxScore()) {
        console.log(`🚩 COMPLETED: ${instance.getScore()} / ${instance.getMaxScore()} for ${workbookName}`);

        // Warten bis WA bereit ist (falls H5P schneller feuert als WA.onInit)
        if (!waReady) {
          console.log("⏳ Warte auf WA.onInit...");
          await initPromise;
        }

        console.log("👤 playerId beim Abschluss:", waPlayerId);

        if (WA.player.state[workbookName] !== "solved") {
          // 1. State auf solved setzen
          WA.player.state[workbookName] = "solved";
          console.log(workbookName + " 🚩 State auf solved gesetzt");

          // 2. Code vom Sheet holen (mit SpielerID-Prüfung)
          const result = await fetchCodeFromSheet(waPlayerId);

          if (result && result.alreadyRegistered) {
            // SpielerID bereits im Sheet → returnMessage
            WA.chat.sendChatMessage(returnMessage, messageNpc);

          } else if (result && result.code) {
            // Neue Registrierung → completionMessage + Code
            WA.chat.sendChatMessage(completionMessage + "\n🔑 Dein Code: " + result.code, messageNpc);

            // SpielerID im Sheet hinterlegen
            await postPlayerIdToSheet(waPlayerId, result.code);

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