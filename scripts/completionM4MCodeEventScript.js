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
"2694", "5830", "7126", "9040", "1547", "8239", "4610", "3756", "2082", "5971", "8423", "1301", "5800", "3176", "9753", "4608", "2748", "6394", "1589", "7214",
"0949", "5321", "4093", "2715", "8034", "6198", "2470", "1659", "9425", "3185", "7260", "3741", "5087", "1495", "8612", "0306", "5935", "7204", "4159", "8471",
"6135", "2801", "9450", "1725", "8493", "3069", "7421", "0582", "5916", "4387", "8209", "2534", "6790", "1240", "5672", "6189", "7398", "3523", "9049", "1875",
"2460", "3718", "5089", "1304", "6420", "7953", "1780", "4398", "5627", "3015", "8934", "6179", "2753", "9045", "1389", "7201", "4591", "8620", "2036", "5479",
"3145", "7946", "1209", "6723", "5395", "8172", "2403", "4561", "3829", "5978", "1732", "8204", "6507", "3128", "9457", "2093", "6835", "5716", "3989", "7428",
"0589", "2163", "8456", "4302", "7915", "3840", "5624", "1092", "6737", "2180", "5392", "7041", "8608", "1275", "9429", "3501", "7913", "2684", "6031", "7143",
"9492", "1870", "5349", "8207", "3723", "6950", "4831", "1506", "7269", "2407", "8310", "5629", "1042", "7381", "3951", "8175", "2690", "4530", "6083", "1704",
"3125", "7849", "0259", "6312", "9506", "4285", "1736", "5601", "7493", "3108", "6428", "5817", "9043", "2378", "5142", "1697", "8939", "1203", "6925", "3584",
"8412", "0759", "6037", "2441", "9758", "3683", "5196", "7124", "1308", "8601", "4973", "2516", "3459", "7921", "6080", "1763", "5391", "8235", "9046", "2140",
"6585", "0374", "7821", "5912", "4706", "8232", "1579", "9245", "3084", "6752", "4390", "1864", "7522", "6104", "2975", "8519", "4203", "5697", "3129", "5083",
"0941", "7365", "8213", "1892", "4570", "6034", "2781", "9504", "7415", "6107", "3862", "2319", "8451", "7096", "1245", "9138", "2704", "6582", "3509", "7927",
"0507", "4298", "6879", "1405", "8321", "5634", "2102", "7985", "3452", "9214", "1836", "4596", "6725", "3082", "7546", "8913", "2472", "5317", "6099", "1683",
"7147", "3525", "1809", "6731", "9042", "1261", "5408", "7394", "2586", "4935", "0672", "8256", "9413", "3170", "6029", "1584", "4870", "2198", "8609", "3529",
"0953", "6412", "7391", "2742", "8205", "1587", "3261", "9542", "7836", "4109", "5609", "2074", "9318", "6423", "1897", "4071", "5730", "8197", "2369", "9410",
"3187", "7640", "1529", "6053", "2831", "4790", "6172", "8424", "0715", "3948", "5603", "9123", "2459", "7306", "5082", "1673", "3901", "7842", "6294", "8510",
"1025", "4736", "6184", "9541", "2193", "3871", "7407", "5304", "8126", "2452", "6795", "3987", "5173", "9026", "1409", "8231", "2947", "5650", "7618", "3174",
"0846", "9432", "1501", "6524", "2308", "5782", "3195", "8013", "4263", "9453", "1028", "7396", "5861", "1748", "2605", "8379", "5206", "3023", "7143", "6910",
"0379", "6528", "5490", "2185", "9048", "1273", "3819", "7420", "5607", "1830", "4951", "6102", "8734", "2357", "8194", "4060", "9705", "3210", "7082", "1596",
"4629", "8305", "1702", "5487", "7128", "2493", "9040", "1634", "5819", "7352", "1095", "4296", "2673", "8402", "5915", "3768", "1524", "7399", "8143", "6061",
"2513", "5789", "4962", "0483", "6301", "7895", "2156", "3428", "9503", "8716", "1072", "5942", "2638", "4189", "7304", "6570", "1045", "8236", "5711", "3925",
"0854", "9672", "1349", "2765", "8029", "4150", "6897", "3112", "7254", "9386", "2402", "5705", "8198", "3061", "4529", "7140", "1803", "6307", "9428", "3654",
"1928", "5717", "3408", "7569", "4830", "6319", "1086", "7451", "2740", "9621", "4235", "0175", "6584", "3906", "8263", "7495", "2218", "9049", "5362", "1471",
"8076", "5320", "1805", "9456", "3124", "6181", "4796", "2548", "6912", "8375", "1023", "5605", "7359", "2943", "6175", "4512", "8064", "1792", "3426", "9508",
"2189", "7643", "1206", "5383", "4090", "8721", "2699", "6051", "4168", "7355", "1029", "3479", "5813", "6938", "9401", "2876", "1561", "8427", "3107", "4594",
"6583", "9075", "2405", "7318", "5920", "4132", "1857", "6390", "7956", "3286", "1576", "9043", "5674", "2101", "4839", "7211", "2695", "8420", "6297", "9538",
"1081", "5743", "3814", "2569", "7409", "6125", "3875", "1925", "5300", "7912", "1456", "8302", "6178", "2437", "5948", "8725", "3105", "4599", "6290", "7628",
"2194", "3762", "8419", "0581", "4926", "7358", "6182", "9704", "2408", "3054", "5427", "1795", "8130", "6275", "9417", "3246", "5086", "1598", "7321", "4863",
"0756", "8193", "2632", "5406", "1075", "6923", "4519", "8274", "3909", "5713", "2400", "7301", "6586", "1278", "5829", "3502", "9170", "3647", "8094", "2691",
"4825", "7313", "1560", "9047", "6188", "2774", "3423", "1089", "5600", "7950", "6733", "2312", "4892", "6425", "1582", "3711", "9470", "3051", "8261", "4095",
"6170", "5289", "2946", "8350", "1241", "6739", "5622", "1406", "9412", "3076", "5897", "8137", "2505", "4722", "6914", "1082", "7351", "2698", "4136", "5402",
"8203", "1642", "5925", "7319", "4871", "3955", "1504", "8031", "2199", "6581", "3746", "5293", "7040", "1860", "9423", "2589", "6130", "3572", "4765", "8020",
"1310", "5943", "7208", "4597", "2861", "6710", "9509", "2747", "8429", "3173", "6086", "1093", "7560", "1825", "4392", "5294", "6989", "2501", "8600", "3178",
"0754", "5821", "9033", "2462", "7981", "3641", "5110", "7209", "1345", "8590", "6094", "2738", "4102", "5625", "7387", "1248", "6572", "8915", "3847", "5327"
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
