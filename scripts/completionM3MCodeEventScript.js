/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // =============================================
  // CONFIG – Modul 3: Code Pool (3xxx)
  // =============================================
  // 500 Codes pro Modul. Bei Bedarf erweitern.
  const CODE_POOL = [
"7184", "0512", "3349", "8805", "1237", "6920", "0451", "7619", "2098", "5713", "8462", "3307", "0156", "9198", "4073", "6405", "2891", "7034", "5320", "1579",
"9941", "2265", "8237", "4702", "6889", "1014", "3526", "9783", "4650", "5902", "0376", "8421", "7158", "2095", "3684", "9271", "5803", "6109", "1448", "0795",
"8627", "3912", "5446", "7280", "0039", "8564", "2196", "4709", "6352", "9875", "1520", "6901", "4783", "3051", "7310", "0048", "5692", "8225", "3179", "6401",
"9324", "1475", "5809", "2198", "3746", "8602", "0951", "2473", "6180", "7039", "5190", "3827", "8416", "0205", "6671", "9320", "1584", "4759", "3098", "5406",
"0792", "8263", "1479", "3945", "2218", "6975", "8501", "3136", "4628", "5894", "1057", "8429", "2703", "9362", "4105", "5739", "6980", "1249", "3507", "7612",
"0342", "5891", "9275", "6408", "1736", "0958", "5214", "7130", "8629", "3075", "9421", "1853", "0746", "3089", "6204", "8573", "1910", "4725", "6392", "2581",
"5063", "7904", "1240", "9387", "3159", "8420", "1702", "6495", "3718", "0985", "7641", "4392", "2106", "5873", "3245", "1792", "6814", "9530", "0627", "4185",
"5298", "3056", "1743", "8069", "4912", "3581", "9705", "6134", "0209", "8457", "1320", "7962", "4098", "2547", "6189", "0735", "8422", "5908", "3674", "9216",
"2583", "4708", "6931", "0145", "7312", "8567", "1924", "3709", "5401", "8231", "0673", "9518", "3024", "7165", "8390", "1458", "6295", "0842", "3701", "5589",
"4097", "2715", "9831", "1462", "7549", "0238", "6184", "7950", "3106", "4429", "5279", "0831", "1698", "3406", "7925", "5710", "1834", "6589", "0472", "8964",
"2301", "5149", "8703", "6590", "0214", "7398", "4521", "8609", "1037", "3256", "9423", "1805", "4972", "6310", "2079", "8579", "3142", "6905", "0598", "4791",
"7625", "1809", "5342", "9014", "6217", "4086", "1753", "3690", "8425", "2901", "5138", "7405", "0623", "8194", "2379", "5694", "1085", "9328", "4851", "6702",
"1940", "3587", "7216", "0459", "9092", "1305", "2674", "8423", "5701", "3986", "6503", "2841", "7190", "0315", "5928", "1074", "4859", "2618", "9036", "1749",
"7452", "0389", "5261", "8610", "4079", "6928", "1530", "8745", "3109", "4293", "1587", "9234", "6740", "0529", "3885", "7215", "4902", "6378", "1059", "8428",
"2910", "5069", "7135", "0824", "3749", "6598", "1382", "8217", "4976", "0531", "7610", "0402", "9541", "6187", "7963", "0256", "3459", "8720", "1308", "2415",
"5890", "1079", "3284", "7521", "0937", "4740", "5602", "8195", "2039", "6914", "8426", "0759", "3980", "5128", "7163", "2405", "9834", "1657", "4021", "5819",
"2309", "6172", "8395", "4701", "1548", "9203", "3786", "5904", "7241", "0684", "8931", "2574", "4609", "3752", "5143", "8026", "2189", "6490", "3705", "9416",
"1794", "5307", "8625", "0148", "6952", "2813", "7049", "6398", "5402", "4237", "0942", "7385", "1607", "3829", "5571", "8190", "2543", "6031", "4768", "9250",
"6425", "8913", "3092", "0753", "5179", "1408", "8367", "2539", "7901", "2048", "3784", "5982", "0461", "7139", "2075", "8649", "5312", "0983", "7420", "8596",
"2908", "4173", "6527", "1402", "8095", "2749", "3791", "5410", "8264", "3638", "5786", "0194", "8427", "5309", "6315", "7263", "2103", "0649", "5691", "2874",
"9145", "3420", "6018", "7582", "0437", "1906", "8392", "5275", "7180", "1049", "3765", "5328", "0592", "8603", "1490", "7150", "4083", "7914", "2367", "9532",
"0928", "6245", "3810", "5174", "0496", "8729", "1435", "7193", "2608", "5437", "6842", "0197", "3175", "8509", "4261", "7850", "0903", "3726", "5084", "6420",
"2513", "9706", "8341", "0265", "4795", "3518", "7092", "1640", "5987", "7429", "8157", "0659", "3298", "7401", "9316", "1742", "5924", "0483", "8139", "2601",
"9954", "3815", "7104", "2479", "5346", "8692", "1203", "7560", "4685", "2193", "0274", "6581", "3409", "7923", "5812", "4360", "1709", "8740", "2195", "6039",
"7148", "0915", "5876", "2409", "6395", "3750", "1482", "8704", "5629", "3117", "9028", "6132", "4587", "0798", "5341", "2712", "6509", "1035", "7843", "4269",
"3695", "1814", "8406", "0278", "4931", "7529", "6085", "1493", "3171", "7810", "0653", "2796", "4820", "9173", "3402", "5718", "4069", "2584", "7905", "1843",
"5207", "3416", "0694", "7589", "1905", "4732", "8412", "1258", "6390", "7046", "9321", "1745", "6873", "0407", "2958", "8196", "0135", "7265", "3529", "5804",
"2168", "7590", "4938", "6412", "8051", "3247", "9709", "6082", "3570", "2419", "5291", "0875", "6324", "9546", "1082", "3405", "7916", "2705", "4198", "8502",
"7043", "1506", "3869", "7219", "5042", "8615", "1796", "0487", "9238", "6327", "0549", "1847", "7598", "3120", "6709", "4892", "5310", "7205", "1953", "8629"
  ];

  // Eindeutige Schlüssel für diesen Raum (müssen in Tiled als Variablen existieren!)
  const STATE_KEY = "assignedCodesM3";              // Map: { playerId: { code, semester, assignedAt } }
  const SEMESTER_KEY = "currentSemesterM3";         // Aktuelles Semester (z.B. "WS2526")
  const PLAYER_STATE_KEY = "assignedCodeM3";        // Cache am Spieler
  const PLAYER_SEMESTER_KEY = "assignedSemesterM3"; // Semester des Cached Codes

  // Retry-Konfiguration für Race Conditions
  const MAX_RETRIES = 5;
  const VERIFY_DELAY_MS = 300;

  // Frühwarnsystem (Stufe 1)
  const WARN_THRESHOLD = 0.80;     // 80% → Konsolen-Warnung
  const CRITICAL_THRESHOLD = 0.95; // 95% → Spieler-Warnung im Chat

  // Recycling (Stufe 3)
  const RECYCLE_AFTER_DAYS = 180;  // Einträge älter als 180 Tage werden entfernt
  // =============================================

  const script = document.createElement("script");
  script.onload = () => {
    console.log("External iframe API loaded.");
  };
  document.head.appendChild(script);

  /**
   * Kurze Pause (Promise-basiert).
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Liest die aktuelle Map vergebener Codes aus WA.state.
   * Format: { "playerId": { code: "1001", semester: "WS2526", assignedAt: "2026-04-07T..." } }
   */
  function readAssignedCodes() {
    const raw = WA.state[STATE_KEY];
    if (!raw) return {};
    try {
      return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      console.warn("⚠️ Konnte assignedCodes nicht parsen, starte mit leerem Objekt:", e);
      return {};
    }
  }

  /**
   * Schreibt die Map vergebener Codes in WA.state.
   */
  async function writeAssignedCodes(codesMap) {
    await WA.state.saveVariable(STATE_KEY, JSON.stringify(codesMap));
  }

  /**
   * Liest das aktuelle Semester aus WA.state.
   * Default: "default" (falls Variable noch nicht in Tiled gesetzt).
   */
  function getCurrentSemester() {
    const sem = WA.state[SEMESTER_KEY];
    return sem && typeof sem === "string" ? sem : "default";
  }

  /**
   * Recycling: Entfernt Einträge älter als RECYCLE_AFTER_DAYS Tage
   * UND Einträge aus früheren Semestern.
   * Gibt die bereinigte Map zurück.
   */
  function recycleOldEntries(codesMap, currentSemester) {
    const now = Date.now();
    const cutoff = now - RECYCLE_AFTER_DAYS * 24 * 60 * 60 * 1000;
    const cleaned = {};
    let removedCount = 0;

    for (const [playerId, entry] of Object.entries(codesMap)) {
      // Falls altes Format (string statt object) → nicht behalten
      if (typeof entry !== "object" || entry === null) {
        removedCount++;
        continue;
      }

      const assignedAt = entry.assignedAt ? new Date(entry.assignedAt).getTime() : 0;
      const isOld = assignedAt < cutoff;
      const isWrongSemester = entry.semester && entry.semester !== currentSemester;

      if (isOld || isWrongSemester) {
        removedCount++;
        continue;
      }

      cleaned[playerId] = entry;
    }

    if (removedCount > 0) {
      console.log(`♻️ Recycling: ${removedCount} alte/abgelaufene Einträge entfernt`);
    }

    return cleaned;
  }

  /**
   * Frühwarnsystem: Prüft Auslastung und gibt Warnungen aus.
   * Gibt eine optionale Chat-Warnmeldung zurück (oder null).
   */
  function checkPoolUsage(codesMap) {
    const used = Object.keys(codesMap).length;
    const total = CODE_POOL.length;
    const usage = used / total;

    console.log(`📊 Pool-Auslastung Modul 3: ${used}/${total} (${(usage * 100).toFixed(1)}%)`);

    if (usage >= 1.0) {
      console.error(`🚨 KRITISCH: Code-Pool Modul 3 ist VOLL! Bitte Pool erweitern oder Semester-Reset durchführen.`);
      return "🚨 Alle Codes vergeben. Bitte wende dich an den Support – das System muss vom Admin zurückgesetzt werden.";
    }

    if (usage >= CRITICAL_THRESHOLD) {
      console.warn(`⚠️ KRITISCH: Pool Modul 3 zu ${(usage * 100).toFixed(1)}% gefüllt!`);
      return "⚠️ Hinweis: Die Code-Vergabe wird knapp. Bitte informiere bei Problemen den Support.";
    }

    if (usage >= WARN_THRESHOLD) {
      console.warn(`⚠️ WARNUNG: Pool Modul 3 zu ${(usage * 100).toFixed(1)}% gefüllt. Erweiterung sollte geplant werden.`);
    }

    return null;
  }

  /**
   * Vergibt einen Code mit Retry-Mechanismus gegen Race Conditions.
   * Berücksichtigt Recycling und Semester-Tag.
   */
  async function assignCodeWithRetry(playerId) {
    const currentSemester = getCurrentSemester();
    console.log(`📅 Aktuelles Semester: ${currentSemester}`);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      console.log(`🔄 Vergabe-Versuch ${attempt}/${MAX_RETRIES} für ${playerId}`);

      // 1. Aktuelle Liste lesen + recyclen
      let codesMap = readAssignedCodes();
      codesMap = recycleOldEntries(codesMap, currentSemester);

      // 2. Hat der Spieler schon einen Code im aktuellen Semester?
      const existingEntry = codesMap[playerId];
      if (existingEntry && existingEntry.semester === currentSemester) {
        console.log("ℹ️ Spieler bereits in zentraler Liste:", existingEntry.code);
        return {
          code: existingEntry.code,
          alreadyRegistered: true,
          warning: null,
        };
      }

      // 3. Welche Codes sind noch frei?
      const usedCodes = new Set(
        Object.values(codesMap).map((e) => (typeof e === "object" ? e.code : null)).filter(Boolean)
      );
      const freeCode = CODE_POOL.find((c) => !usedCodes.has(c));

      if (!freeCode) {
        console.error("❌ Kein freier Code im Pool mehr verfügbar!");
        const warning = checkPoolUsage(codesMap);
        return { code: null, alreadyRegistered: false, error: "no_codes_left", warning };
      }

      // 4. Code reservieren mit Metadaten
      codesMap[playerId] = {
        code: freeCode,
        semester: currentSemester,
        assignedAt: new Date().toISOString(),
      };
      await writeAssignedCodes(codesMap);

      // 5. Verifizieren
      await sleep(VERIFY_DELAY_MS);
      const verifyMap = readAssignedCodes();
      const verifyEntry = verifyMap[playerId];

      if (verifyEntry && typeof verifyEntry === "object" && verifyEntry.code === freeCode) {
        console.log(`✅ Code ${freeCode} erfolgreich für ${playerId} reserviert`);
        const warning = checkPoolUsage(verifyMap);
        return { code: freeCode, alreadyRegistered: false, warning };
      }

      // 6. Race Condition → retry
      const randomDelay = 100 + Math.floor(Math.random() * 400);
      console.warn(`⚠️ Race Condition erkannt, warte ${randomDelay}ms und versuche erneut`);
      await sleep(randomDelay);
    }

    console.error("❌ Max retries erreicht, Code-Vergabe fehlgeschlagen");
    return { code: null, alreadyRegistered: false, error: "max_retries", warning: null };
  }

  /**
   * Gibt den Code für einen Spieler zurück.
   * Prüft erst den lokalen Player-State (schnell, semester-aware), dann zentrale Liste.
   */
  async function getCodeForPlayer(playerId) {
    const currentSemester = getCurrentSemester();
    const cachedCode = WA.player.state[PLAYER_STATE_KEY];
    const cachedSemester = WA.player.state[PLAYER_SEMESTER_KEY];

    // Schneller Pfad: lokaler Cache aus aktuellem Semester
    if (cachedCode && cachedSemester === currentSemester) {
      // Zusätzlich verifizieren, dass der Code noch in der zentralen Liste steht
      const codesMap = readAssignedCodes();
      const entry = codesMap[playerId];
      if (entry && typeof entry === "object" && entry.code === cachedCode && entry.semester === currentSemester) {
        console.log("ℹ️ Spieler hat bereits einen Code (Player-State, verifiziert):", cachedCode);
        return { code: cachedCode, alreadyRegistered: true, warning: null };
      }
      console.log("⚠️ Cache veraltet/inkonsistent, vergebe neu");
    } else if (cachedCode && cachedSemester !== currentSemester) {
      console.log(`📅 Cached Code aus altem Semester (${cachedSemester} → ${currentSemester}), vergebe neu`);
    }

    // Zentrale Vergabe mit Retry
    const result = await assignCodeWithRetry(playerId);

    if (result.code) {
      // Cache am Spieler aktualisieren
      await WA.player.state.saveVariable(PLAYER_STATE_KEY, result.code, {
        public: false,
        persist: true,
        scope: "world",
      });
      await WA.player.state.saveVariable(PLAYER_SEMESTER_KEY, currentSemester, {
        public: false,
        persist: true,
        scope: "world",
      });
      await WA.player.state.saveVariable(PLAYER_STATE_KEY + "AssignedAt", new Date().toISOString(), {
        public: false,
        persist: true,
        scope: "world",
      });
    }

    return result;
  }

  function handleModuleCompletionEvents(
    completionMessage,
    messageNpc,
    workbookName,
    returnMessage
  ) {
    console.log("🚩 Completion Event Script (Modul 3) loaded");

    // ── WA.onInit als Promise speichern ──────────────────────────────
    let waReady = false;
    let waPlayerId = null;

    const initPromise = WA.onInit().then(() => {
      waPlayerId = WA.player.id;
      waReady = true;
      console.log("✅ WA.onInit abgeschlossen. playerId:", waPlayerId);
      console.log(`📅 Aktuelles Semester (Modul 3): ${getCurrentSemester()}`);
    });

    // ── checkState: beim Laden prüfen ob bereits gelöst ──────────────
    initPromise.then(async () => {
      try {
        const stateValue = WA.player.state[workbookName];
        console.log("🔍 checkState:", workbookName, "=", stateValue, "| playerId:", waPlayerId);

        if (stateValue === "solved") {
          const result = await getCodeForPlayer(waPlayerId);

          if (result.code) {
            WA.chat.sendChatMessage(returnMessage, messageNpc);
            WA.chat.sendChatMessage(
              "🔑 Falls du deinen *Moodle-Code* vergessen hast, er lautet: " + result.code,
              messageNpc
            );
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
          } else {
            WA.chat.sendChatMessage(
              "⚠️ Es gab ein Problem beim Abrufen deines Codes. Bitte wende dich an den Support.",
              messageNpc
            );
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
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

        if (!waReady) {
          console.log("⏳ Warte auf WA.onInit...");
          await initPromise;
        }

        console.log("👤 playerId beim Abschluss:", waPlayerId);

        if (WA.player.state[workbookName] !== "solved") {
          // 1. State auf solved setzen
          WA.player.state[workbookName] = "solved";
          console.log(workbookName + " 🚩 State auf solved gesetzt");

          // 2. Code holen / vergeben
          const result = await getCodeForPlayer(waPlayerId);

          if (!result.code) {
            WA.chat.sendChatMessage(
              "⚠️ Leider konnte kein Code vergeben werden. Bitte wende dich an den Support.",
              messageNpc
            );
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
          } else if (result.alreadyRegistered) {
            WA.chat.sendChatMessage(returnMessage, messageNpc);
            WA.chat.sendChatMessage("🔑 Falls vergessen hast deinen **Moodle-Code** zu notieren, er lautet: " + result.code, messageNpc);
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
          } else {
            WA.chat.sendChatMessage(completionMessage, messageNpc);
            WA.chat.sendChatMessage("🔑 Dein **Moodle-Code**, den du dir unbedingt notieren solltest, lautet: " + result.code, messageNpc);
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
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
