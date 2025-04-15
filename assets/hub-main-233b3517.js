import{b as h,g as d,q as o,l as m}from"./quests-1daa5e21.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor();try{await h(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.onInit().then(()=>{WA.player.state.currentQuest==="quest26"?WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen.","Zirze"):console.log("not quest26")});WA.onInit().then(async()=>{const t=await d();for(const e of t){let n;WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var s;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,c=(s=o.find(l=>l.questId===e.triggerQuest))==null?void 0:s.requireQuest;u===c&&(WA.player.state.currentQuest=e.triggerQuest)}}})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}const a=WA.player.state.currentQuest,r=o.find(e=>e.questId===a);r&&i(r.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const n=o.find(s=>s.questId===e);n&&i(n.questId)});function i(e){const n=o.find(s=>s.questId===e);n&&WA.ui.banner.openBanner({id:n.questId,text:n.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?(WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage(`Füge nun die **Wortschnipsel**✂️ in richtiger Reihenfolge zusammen und gib die **beiden Lösungssätze** hier im Chat ein. Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** nach **Carl Sagan** könnte durchaus hilfreich sein. 

Variante wenn alles richtig:

🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze")}),WA.chat.onChatMessage(async(t,a)=>{if(a.authorId===void 0){const r=t.toLowerCase();r.includes("wissenschaft")&&r.includes("wissenssammlung")&&r.includes("art")&&r.includes("denken")?(WA.chat.sendChatMessage("Success: Das ist korrekt, ich teleportiere dich zurück zu Prof. Mumblecore!","Zirze"),await new Promise(i=>setTimeout(i,2e3)),WA.player.state.currentQuest="quest27",m("notlog",177),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage(`## 🖥️ Reparatur des Computerterminals

Komme hierhin zurück, wenn du **Modul 2** und **Modul 3** gelöst hast. ✅ 

Um dieses **Computerterminal** zu reparieren, benötigst du die richtigen **Wortschnipsel**, die beim **Einbruch durch Lord Modrevolt** 💀 durcheinandergeraten sind.

Finde die Fragmente und setze sie korrekt zusammen, um das System wiederherzustellen! 🚀`,"Zirze")}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{WA.chat.close()})});WA.onInit().then(()=>{function t(){const a=WA.player.state.module2==="2",r=WA.player.state.module3==="2";if(a&&r){const i=[],e=[];for(let n=0;n<=47;n++)for(let s=0;s<=36;s++)i.push({x:n,y:s,tile:"green",layer:"green"}),e.push({x:n,y:s,tile:"red",layer:"red"});WA.room.setTiles([...i,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else a&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.onVariableChange("module2").subscribe(t),WA.player.state.onVariableChange("module3").subscribe(t),t()});
//# sourceMappingURL=hub-main-233b3517.js.map
