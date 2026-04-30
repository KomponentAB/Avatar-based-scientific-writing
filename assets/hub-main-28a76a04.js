import{b as m,c as g,p as A,g as W,q as o,l as f,m as l}from"./quests-0d95027e.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await m(),console.log("Scripting API Extra ready")}catch(r){console.error(r)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.player.onPlayerMove(async({x:r,y:a,moving:i})=>{var e,n,t;const s=await g({x:r,y:a});if(!s){(e=l)==null||e.stop();return}if(!i&&!s){(n=l)==null||n.stop();return}else(t=l)==null||t.stop(),A(s)});WA.onInit().then(async()=>{const r=await W();for(const e of r){let n,t=WA.player.name;console.log("Player name:",t),WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",t),e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,d=(c=o.find(h=>h.questId===e.triggerQuest))==null?void 0:c.requireQuest;u===d&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}const a=WA.player.state.currentQuest,i=o.find(e=>e.questId===a);i&&s(i.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const n=o.find(t=>t.questId===e);n&&s(n.questId)});function s(e){const n=o.find(t=>t.questId===e);n&&WA.ui.banner.openBanner({id:n.questId,text:n.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let r;r=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt die gesammelten Codeschnipsel in den Chat eingeben. Für den Fall, dass du sie dir doch nicht notiert hast, sind sie hier nochmal: **sie/ zu / denken / ist / Wissenschaft / eine / mehr / als / Wissenssammlung / ist /eine / Art**. Nutze diese, um den korrekten Satz zu bilden und gib ihn hier im Chat ein!","Zirze"),WA.chat.onChatMessage(async(a,i)=>{if(i.authorId===void 0){const s=a.toLowerCase();s.includes("wissenschaft")&&s.includes("wissenssammlung")&&s.includes("art")&&s.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(e=>setTimeout(e,4e3)),WA.player.state.currentQuest="quest27",f("notlog2",32),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{r&&r.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")})});WA.onInit().then(()=>{function r(){const a=WA.player.state.module2==="2",i=WA.player.state.module3==="2";if(a&&i){const s=[],e=[];for(let n=0;n<=47;n++)for(let t=0;t<=36;t++)s.push({x:n,y:t,tile:"green",layer:"green"}),e.push({x:n,y:t,tile:"red",layer:"red"});WA.room.setTiles([...s,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else a&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.module2==="2"&&WA.player.state.module3==="2"&&r()});
//# sourceMappingURL=hub-main-28a76a04.js.map
