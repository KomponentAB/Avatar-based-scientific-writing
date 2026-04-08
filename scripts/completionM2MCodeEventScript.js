/// <reference types="@workadventure/iframe-api-typings" />

(function () {
  // =============================================
  // CONFIG – Modul 2: Code Pool (2xxx)
  // =============================================
  // 500 Codes pro Modul. Bei Bedarf erweitern.
  const CODE_POOL = [
    "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008",
    "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016",
    "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024",
    "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032",
    "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040",
    "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048",
    "2049", "2050", "2051", "2052", "2053", "2054", "2055", "2056",
    "2057", "2058", "2059", "2060", "2061", "2062", "2063", "2064",
    "2065", "2066", "2067", "2068", "2069", "2070", "2071", "2072",
    "2073", "2074", "2075", "2076", "2077", "2078", "2079", "2080",
    "2081", "2082", "2083", "2084", "2085", "2086", "2087", "2088",
    "2089", "2090", "2091", "2092", "2093", "2094", "2095", "2096",
    "2097", "2098", "2099", "2100", "2101", "2102", "2103", "2104",
    "2105", "2106", "2107", "2108", "2109", "2110", "2111", "2112",
    "2113", "2114", "2115", "2116", "2117", "2118", "2119", "2120",
    "2121", "2122", "2123", "2124", "2125", "2126", "2127", "2128",
    "2129", "2130", "2131", "2132", "2133", "2134", "2135", "2136",
    "2137", "2138", "2139", "2140", "2141", "2142", "2143", "2144",
    "2145", "2146", "2147", "2148", "2149", "2150", "2151", "2152",
    "2153", "2154", "2155", "2156", "2157", "2158", "2159", "2160",
    "2161", "2162", "2163", "2164", "2165", "2166", "2167", "2168",
    "2169", "2170", "2171", "2172", "2173", "2174", "2175", "2176",
    "2177", "2178", "2179", "2180", "2181", "2182", "2183", "2184",
    "2185", "2186", "2187", "2188", "2189", "2190", "2191", "2192",
    "2193", "2194", "2195", "2196", "2197", "2198", "2199", "2200",
    "2201", "2202", "2203", "2204", "2205", "2206", "2207", "2208",
    "2209", "2210", "2211", "2212", "2213", "2214", "2215", "2216",
    "2217", "2218", "2219", "2220", "2221", "2222", "2223", "2224",
    "2225", "2226", "2227", "2228", "2229", "2230", "2231", "2232",
    "2233", "2234", "2235", "2236", "2237", "2238", "2239", "2240",
    "2241", "2242", "2243", "2244", "2245", "2246", "2247", "2248",
    "2249", "2250", "2251", "2252", "2253", "2254", "2255", "2256",
    "2257", "2258", "2259", "2260", "2261", "2262", "2263", "2264",
    "2265", "2266", "2267", "2268", "2269", "2270", "2271", "2272",
    "2273", "2274", "2275", "2276", "2277", "2278", "2279", "2280",
    "2281", "2282", "2283", "2284", "2285", "2286", "2287", "2288",
    "2289", "2290", "2291", "2292", "2293", "2294", "2295", "2296",
    "2297", "2298", "2299", "2300", "2301", "2302", "2303", "2304",
    "2305", "2306", "2307", "2308", "2309", "2310", "2311", "2312",
    "2313", "2314", "2315", "2316", "2317", "2318", "2319", "2320",
    "2321", "2322", "2323", "2324", "2325", "2326", "2327", "2328",
    "2329", "2330", "2331", "2332", "2333", "2334", "2335", "2336",
    "2337", "2338", "2339", "2340", "2341", "2342", "2343", "2344",
    "2345", "2346", "2347", "2348", "2349", "2350", "2351", "2352",
    "2353", "2354", "2355", "2356", "2357", "2358", "2359", "2360",
    "2361", "2362", "2363", "2364", "2365", "2366", "2367", "2368",
    "2369", "2370", "2371", "2372", "2373", "2374", "2375", "2376",
    "2377", "2378", "2379", "2380", "2381", "2382", "2383", "2384",
    "2385", "2386", "2387", "2388", "2389", "2390", "2391", "2392",
    "2393", "2394", "2395", "2396", "2397", "2398", "2399", "2400",
    "2401", "2402", "2403", "2404", "2405", "2406", "2407", "2408",
    "2409", "2410", "2411", "2412", "2413", "2414", "2415", "2416",
    "2417", "2418", "2419", "2420", "2421", "2422", "2423", "2424",
    "2425", "2426", "2427", "2428", "2429", "2430", "2431", "2432",
    "2433", "2434", "2435", "2436", "2437", "2438", "2439", "2440",
    "2441", "2442", "2443", "2444", "2445", "2446", "2447", "2448",
    "2449", "2450", "2451", "2452", "2453", "2454", "2455", "2456",
    "2457", "2458", "2459", "2460", "2461", "2462", "2463", "2464",
    "2465", "2466", "2467", "2468", "2469", "2470", "2471", "2472",
    "2473", "2474", "2475", "2476", "2477", "2478", "2479", "2480",
    "2481", "2482", "2483", "2484", "2485", "2486", "2487", "2488",
    "2489", "2490", "2491", "2492", "2493", "2494", "2495", "2496",
    "2497", "2498", "2499", "2500"
  ];

  // Eindeutige Schlüssel für diesen Raum (müssen in Tiled als Variablen existieren!)
  const STATE_KEY = "assignedCodesM2";              // Map: { playerId: { code, semester, assignedAt } }
  const SEMESTER_KEY = "currentSemesterM2";         // Aktuelles Semester (z.B. "WS2526")
  const PLAYER_STATE_KEY = "assignedCodeM2";        // Cache am Spieler
  const PLAYER_SEMESTER_KEY = "assignedSemesterM2"; // Semester des Cached Codes

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

    console.log(`📊 Pool-Auslastung Modul 2: ${used}/${total} (${(usage * 100).toFixed(1)}%)`);

    if (usage >= 1.0) {
      console.error(`🚨 KRITISCH: Code-Pool Modul 2 ist VOLL! Bitte Pool erweitern oder Semester-Reset durchführen.`);
      return "🚨 Alle Codes vergeben. Bitte wende dich an den Support – das System muss vom Admin zurückgesetzt werden.";
    }

    if (usage >= CRITICAL_THRESHOLD) {
      console.warn(`⚠️ KRITISCH: Pool Modul 2 zu ${(usage * 100).toFixed(1)}% gefüllt!`);
      return "⚠️ Hinweis: Die Code-Vergabe wird knapp. Bitte informiere bei Problemen den Support.";
    }

    if (usage >= WARN_THRESHOLD) {
      console.warn(`⚠️ WARNUNG: Pool Modul 2 zu ${(usage * 100).toFixed(1)}% gefüllt. Erweiterung sollte geplant werden.`);
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
    console.log("🚩 Completion Event Script (Modul 2) loaded");

    // ── WA.onInit als Promise speichern ──────────────────────────────
    let waReady = false;
    let waPlayerId = null;

    const initPromise = WA.onInit().then(() => {
      waPlayerId = WA.player.id;
      waReady = true;
      console.log("✅ WA.onInit abgeschlossen. playerId:", waPlayerId);
      console.log(`📅 Aktuelles Semester (Modul 2): ${getCurrentSemester()}`);
    });

    // ── checkState: beim Laden prüfen ob bereits gelöst ──────────────
    initPromise.then(async () => {
      try {
        const stateValue = WA.player.state[workbookName];
        console.log("🔍 checkState:", workbookName, "=", stateValue, "| playerId:", waPlayerId);

        if (stateValue === "solved") {
          const result = await getCodeForPlayer(waPlayerId);

          if (result.code) {
            WA.chat.sendChatMessage(returnMessage + result.code, messageNpc);
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
            if (result.warning) {
              WA.chat.sendChatMessage(result.warning, messageNpc);
            }
          } else {
            WA.chat.sendChatMessage(completionMessage, messageNpc);
            WA.chat.sendChatMessage("🔑 Dein Code: " + result.code, messageNpc);
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
