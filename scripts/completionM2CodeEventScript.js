/// <reference types="@workadventure/iframe-api-typings" />
 
(function () {
  // =============================================
  // CONFIG – Code Pool (kein Google Sheets nötig)
  // =============================================
  const CODE_POOL = [
    "4523", "1689", "3751", "2410", "4387", "1592", "3065", "4238",
    "2876", "1914", "4620", "1405", "3297", "3891", "2178", "1765",
    "3954", "2589", "3142", "4475", "1563", "3804", "4289", "1452",
    "2671", "3325", "4112", "1987", "3748", "2456", "4582", "1703",
    "3220", "4396", "1919", "2543", "3128", "1467", "3990", "2679",
    "4123", "1815", "3702", "2475", "4241", "1528", "3367", "4189",
    "1992", "4531", "1448", "3845", "2332", "4769", "1587", "3104",
    "3680", "4230", "2775", "1634", "4502", "2196", "3598", "1419",
    "3987", "2461", "3284", "1911", "4653", "2108", "3321", "1865",
    "4479", "2582", "3810", "1459", "2690", "4156", "2023", "3741",
    "4119", "1569", "4294", "1793", "2867", "3085", "4408", "2240",
    "1642", "3932", "1720", "3475", "4299", "3980", "2549", "3120",
    "4325", "1402", "2199", "3711", "1852", "2673", "4421", "1506",
    "3789", "2101", "3069", "4167", "2480", "3345", "4605", "2298",
    "1423", "3935", "2741", "3548", "4193", "1884", "2359", "3499",
    "1725", "3882", "4470", "1649", "2998", "4214", "2447", "3765",
    "1580", "4127", "3229", "1487", "3814", "1409", "2678", "4495",
    "2980", "3572", "2156", "4338", "1895", "3421", "1574", "2684",
    "4099", "4135", "2387", "3660", "1842", "4488", "2712", "4263",
    "1521", "3827", "1456", "3997", "2143", "3615", "3089", "4611",
    "3902", "2735", "3290", "4247", "1718", "4456", "2029", "3328",
    "1407", "3734", "1603", "3175", "4380", "2512", "2851", "3999",
    "1490", "4132", "2689", "3658", "2164", "3429", "1498", "2585",
    "3840", "4176", "1943", "2314", "3502", "4385", "2079", "3762",
    "1492", "2627", "4243", "1515", "3123", "3467", "1808", "4600",
    "2405", "3718", "1454", "4051", "2763", "3116", "4269", "1583",
    "3938", "2325", "1672", "3820", "4205", "1442", "3349", "3889",
    "1760", "4235", "2540", "3726", "2371", "4170", "1625", "2956",
    "3992", "2558", "3623", "1784", "4308", "2665", "1907", "4476",
    "1695", "3322", "4160", "2402", "3853", "1546", "3011", "4389",
    "2152", "3594", "1476", "4068", "1769", "3610", "2813", "4292",
    "2348", "4675"
    // ... mindestens 10x so viele wie erwartete Spieler
  ];
  // =============================================
 
  const script = document.createElement("script");
  script.onload = () => {
    console.log("External iframe API loaded.");
  };
  document.head.appendChild(script);
 
  /**
   * Einfache deterministische Hash-Funktion.
   * Gleiche playerId → immer gleicher Index im CODE_POOL.
   */
  function hashPlayerIdToIndex(playerId, listLength) {
    let hash = 0;
    for (let i = 0; i < playerId.length; i++) {
      hash = ((hash << 5) - hash) + playerId.charCodeAt(i);
      hash |= 0; // 32-bit int
    }
    return Math.abs(hash) % listLength;
  }
 
  /**
   * Gibt den Code für einen Spieler zurück.
   * Prüft zuerst ob bereits ein Code im WA-State gespeichert ist.
   * Falls nicht, wird ein neuer Code aus dem Pool abgeleitet und dauerhaft gespeichert.
   */
  async function getCodeForPlayer(playerId) {
    // Hat der Spieler schon einen Code gespeichert?
    const existingCode = WA.player.state.assignedCode;
 
    if (existingCode) {
      console.log("ℹ️ Spieler hat bereits einen Code:", existingCode);
      return { code: existingCode, alreadyRegistered: true };
    }
 
    // Neuen Code deterministisch aus dem Pool ableiten
    const index = hashPlayerIdToIndex(playerId, CODE_POOL.length);
    const code = CODE_POOL[index];
    console.log("🎲 Neuer Code für Spieler", playerId, "→ Index", index, "→ Code:", code);
 
    // Code dauerhaft am Spieler-State speichern
    await WA.player.state.saveVariable("assignedCode", code, {
      public: false,
      persist: true,
      scope: "world",
    });
 
    // Timestamp dazu speichern
    await WA.player.state.saveVariable("codeAssignedAt", new Date().toISOString(), {
      public: false,
      persist: true,
      scope: "world",
    });
 
    return { code, alreadyRegistered: false };
  }
 
  function handleModuleCompletionEvents(
    completionMessage,
    messageNpc,
    workbookName,
    returnMessage
  ) {
    console.log("🚩 Completion Event Script loaded");
 
    // ── WA.onInit als Promise speichern ──────────────────────────────
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
          const result = await getCodeForPlayer(waPlayerId);
 
          if (result.alreadyRegistered) {
            // Code bereits vergeben → returnMessage senden
            WA.chat.sendChatMessage(returnMessage, messageNpc);
          } else {
            // Edge Case: solved aber noch kein Code gespeichert
            WA.chat.sendChatMessage(completionMessage, messageNpc);
            WA.chat.sendChatMessage("🔑 Dein Code: " + result.code, messageNpc);
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
 
          // 2. Code für Spieler holen (aus WA-State oder neu vergeben)
          const result = await getCodeForPlayer(waPlayerId);
 
          if (result.alreadyRegistered) {
            // Spieler hat bereits einen Code → returnMessage
            WA.chat.sendChatMessage(returnMessage, messageNpc);
          } else {
            // Neuer Code vergeben → completionMessage + Code
            WA.chat.sendChatMessage(completionMessage, messageNpc);
            WA.chat.sendChatMessage("🔑 Dein Code: " + result.code, messageNpc);
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
 