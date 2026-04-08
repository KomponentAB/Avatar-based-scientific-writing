/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // =============================================
  // CONFIG – Modul 1: Code Pool (1xxx)
  // =============================================
  // 500 Codes pro Modul. Bei Bedarf erweitern.
  const CODE_POOL = [
"1739", "8250", "4621", "0907", "6318", "7543", "0215", "9832", "4476", "3591", "6084", "2709", "5173", "8420", "1395", "7612", "9045", "3058", "6880", "1207",
"2384", "5719", "4063", "7956", "0142", "6329", "8891", "1564", "4732", "0218", "9375", "4001", "6850", "5126", "1743", "0498", "7619", "3285", "9052", "2471",
"5200", "8143", "1637", "5908", "3714", "8429", "0586", "7193", "4372", "6295", "9816", "2075", "4630", "1549", "8924", "3401", "0753", "6187", "2519", "7365",
"9021", "1648", "3950", "5802", "7190", "2467", "9135", "0428", "5710", "8394", "3067", "1285", "4679", "7502", "0913", "6849", "3521", "9074", "6143", "2695",
"8230", "1542", "4708", "3957", "6019", "7821", "0493", "5386", "2104", "6749", "1305", "8452", "2980", "7614", "0531", "9178", "6427", "3706", "1809", "5394",
"4265", "8739", "0102", "3952", "6043", "2581", "7395", "1476", "8024", "5118", "9237", "0649", "7906", "3409", "1582", "8765", "2190", "4531", "6320", "0916",
"7483", "5209", "1785", "3642", "9041", "2790", "6158", "0437", "8216", "4905", "1627", "5380", "3074", "9812", "7249", "1568", "4302", "7951", "6130", "2504",
"0395", "8627", "1740", "5943", "7211", "0839", "6582", "3275", "4190", "5608", "1963", "8459", "3021", "7198", "5614", "0372", "9046", "1865", "4738", "6520",
"2107", "8392", "5718", "2856", "6429", "1043", "3785", "9167", "0538", "7240", "6089", "1904", "3372", "8521", "4902", "7610", "1249", "5801", "4539", "2078",
"9350", "1620", "7485", "3904", "5712", "8067", "1248", "4391", "6205", "1793", "9043", "2509", "3846", "7215", "5602", "0934", "8120", "4670", "5319", "2087",
"1459", "7462", "3810", "5094", "9625", "1735", "8450", "2301", "7108", "6479", "0398", "2764", "5913", "8423", "1057", "7239", "4601", "3895", "2070", "9546",
"1842", "6305", "7158", "9037", "5416", "2708", "4729", "1580", "8149", "2364", "6208", "3071", "8592", "5043", "1729", "9485", "3610", "7302", "2476", "8193",
"0562", "3420", "6814", "1975", "4598", "8301", "2746", "5172", "6038", "7904", "1359", "4827", "2093", "5715", "9384", "4261", "7102", "0539", "6491", "3820",
"1945", "7603", "8425", "3179", "0294", "6587", "4705", "8316", "2150", "5940", "7832", "1069", "6525", "3884", "2479", "0791", "9359", "2413", "5806", "3172",
"0651", "4502", "7289", "1914", "8396", "5438", "9125", "3648", "2701", "6057", "8422", "1083", "5769", "2395", "7617", "4930", "1802", "6574", "9208", "3520",
"0371", "9456", "6203", "2518", "8740", "1509", "7390", "4162", "8035", "5893", "2146", "9683", "3429", "0750", "6314", "2085", "4279", "5931", "7605", "4120",
"5390", "2847", "8615", "0196", "7503", "3982", "1265", "8749", "3106", "4537", "6918", "2054", "9321", "5780", "2149", "6408", "3958", "7426", "0534", "8195",
"8238", "1690", "4527", "3815", "7940", "2631", "9079", "5403", "1263", "8724", "3596", "0185", "6432", "7151", "9049", "2371", "6580", "2793", "5814", "3702",
"9042", "5117", "6985", "1309", "8324", "0645", "4195", "2761", "9830", "7542", "2187", "6098", "3528", "4719", "1650", "8391", "2903", "5274", "6035", "7120",
"1089", "9460", "2106", "5371", "6843", "4592", "3725", "8307", "1246", "5981", "7432", "0260", "8159", "3498", "5709", "1624", "9381", "4751", "2097", "6105",
"0537", "7810", "3425", "1695", "9048", "6174", "2309", "5836", "7943", "1269", "4509", "8190", "2613", "5379", "1048", "7256", "3985", "6523", "1407", "5896",
"0378", "9215", "2741", "8032", "1684", "4520", "7305", "6091", "2154", "8967", "4839", "1749", "5621", "1087", "7350", "4298", "2906", "6517", "3742", "8199",
"2090", "5431", "8705", "3269", "1482", "7154", "9023", "0583", "4612", "3708", "6293", "2840", "7961", "9407", "1539", "8214", "6052", "3781", "2196", "7509",
"0349", "6832", "4703", "1205", "5398", "8621", "2072", "3959", "7185", "1468", "9532", "6082", "2713", "8146", "3209", "5470", "9028", "1675", "4395", "2849",
"1268", "5714", "7392", "8950", "0635", "3182", "9427", "2019", "6498", "3841", "7206", "8573", "1594", "2305", "4832", "6095", "7218", "0847", "9372", "2510",
"4103", "5879", "1243", "3625", "7902", "9054", "2768", "5310", "6415", "1789", "8623", "4937", "0526", "7586", "3205", "6140", "1993", "8428", "5764", "2157",
"3689", "7210", "4065", "2394", "9581", "1478", "6704", "5032", "8152", "2945", "7316", "1084", "6599", "2745", "8421", "0375", "6927", "1503", "5297", "1401",
"4096", "7865", "2514", "0948", "6354", "1723", "9238", "5109", "3472", "8640", "0923", "7182", "4615", "2750", "6309", "8426", "1080", "5945", "3217", "7504",
"2539", "6192", "4381", "9750", "1046", "7524", "3890", "2160", "5413", "8674", "0328", "7149", "9201", "1653", "4835", "2079", "6391", "5740", "8912", "0367",
"7308", "1572", "5429", "8163", "2940", "6589", "1731", "4079", "9256", "1806", "3402", "7615", "0291", "5898", "4725", "6139", "8453", "1728", "9402", "3569",
"2694", "5830", "7126", "9040", "1547", "8239", "4610", "3756", "2082", "5971", "8423", "1301", "5800", "3176", "9753", "4608", "2748", "6394", "1589", "7214"
  ];

  // Eindeutige Schlüssel für diesen Raum (müssen in Tiled als Variablen existieren!)
  const STATE_KEY = "assignedCodesM1";              // Map: { playerId: { code, semester, assignedAt } }
  const SEMESTER_KEY = "currentSemesterM1";         // Aktuelles Semester (z.B. "WS2526")
  const PLAYER_STATE_KEY = "assignedCodeM1";        // Cache am Spieler
  const PLAYER_SEMESTER_KEY = "assignedSemesterM1"; // Semester des Cached Codes

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

    console.log(`📊 Pool-Auslastung Modul 1: ${used}/${total} (${(usage * 100).toFixed(1)}%)`);

    if (usage >= 1.0) {
      console.error(`🚨 KRITISCH: Code-Pool Modul 1 ist VOLL! Bitte Pool erweitern oder Semester-Reset durchführen.`);
      return "🚨 Alle Codes vergeben. Bitte wende dich an den Support – das System muss vom Admin zurückgesetzt werden.";
    }

    if (usage >= CRITICAL_THRESHOLD) {
      console.warn(`⚠️ KRITISCH: Pool Modul 1 zu ${(usage * 100).toFixed(1)}% gefüllt!`);
      return "⚠️ Hinweis: Die Code-Vergabe wird knapp. Bitte informiere bei Problemen den Support.";
    }

    if (usage >= WARN_THRESHOLD) {
      console.warn(`⚠️ WARNUNG: Pool Modul 1 zu ${(usage * 100).toFixed(1)}% gefüllt. Erweiterung sollte geplant werden.`);
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
    console.log("🚩 Completion Event Script (Modul 1) loaded");

    // ── WA.onInit als Promise speichern ──────────────────────────────
    let waReady = false;
    let waPlayerId = null;

    const initPromise = WA.onInit().then(() => {
      waPlayerId = WA.player.id;
      waReady = true;
      console.log("✅ WA.onInit abgeschlossen. playerId:", waPlayerId);
      console.log(`📅 Aktuelles Semester (Modul 1): ${getCurrentSemester()}`);
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
              "🔑 Falls du deinen **Moodle-Code** vergessen hast, er lautet: " + result.code,
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
            WA.chat.sendChatMessage("🔑 Damit hat du alle Inhalte abgeschlossen und dir deinene **finanlen Moodle-Code** retlich verdient. Er lautet: " + result.code, messageNpc);
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
