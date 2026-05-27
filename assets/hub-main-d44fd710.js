import{b as A,c as p,p as f,g as W,q as d,l as y,m as h}from"./quests-0d95027e.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await A(),console.log("Scripting API Extra ready")}catch(r){console.error(r)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.player.onPlayerMove(async({x:r,y:i,moving:o})=>{var e,n,t;const s=await p({x:r,y:i});if(!s){(e=h)==null||e.stop();return}if(!o&&!s){(n=h)==null||n.stop();return}else(t=h)==null||t.stop(),f(s)});WA.onInit().then(async()=>{const r=await W();for(const e of r){let n,t=WA.player.name;console.log("Player name:",t),WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",t),e.npcName),e.triggerQuest){const a=WA.player.state.currentQuest,u=(c=d.find(l=>l.questId===e.triggerQuest))==null?void 0:c.requireQuest;a===u&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}const i=WA.player.state.currentQuest,o=d.find(e=>e.questId===i);o&&s(o.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const n=d.find(t=>t.questId===e);n&&s(n.questId)});function s(e){const n=d.find(t=>t.questId===e);n&&WA.ui.banner.openBanner({id:n.questId,text:n.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let r;r=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt die gesammelten Codeschnipsel in den Chat eingeben. Für den Fall, dass du sie dir doch nicht notiert hast, sind sie hier nochmal: **sie/ zu / denken / ist / Wissenschaft / eine / mehr / als / Wissenssammlung / ist /eine / Art**. Nutze diese, um den korrekten Satz zu bilden und gib ihn hier im Chat ein!","Zirze"),WA.chat.onChatMessage(async(i,o)=>{if(o.authorId===void 0){const s=i.toLowerCase();s.includes("wissenschaft")&&s.includes("wissenssammlung")&&s.includes("art")&&s.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(e=>setTimeout(e,4e3)),WA.player.state.currentQuest="quest27",y("notlog2",32),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{r&&r.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")})});WA.onInit().then(()=>{function r(){const i=WA.player.state.module2==="2",o=WA.player.state.module3==="2";if(i&&o){const s=[],e=[];for(let n=0;n<=47;n++)for(let t=0;t<=36;t++)s.push({x:n,y:t,tile:"green",layer:"green"}),e.push({x:n,y:t,tile:"red",layer:"red"});WA.room.setTiles([...s,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else i&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.module2==="2"&&WA.player.state.module3==="2"&&r()});async function m(r){const i="https://apps.taskmagic.com/api/v1/webhooks/ddaKiV34TAmiARpMzKmDv",{uuid:o,name:s}=WA.player;if(!o||!s){console.error("Invalid player data");return}const e=WA.room.id,n=Date.now(),t={id:o,name:s,roomId:e,firstPing:r,timestamp:n},c=(a,u,l=5e3)=>Promise.race([fetch(a,u),new Promise((b,g)=>setTimeout(()=>g(new Error("Request timed out")),l))]);try{const a=await c(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const u=await a.json();console.log("Success:",u)}catch(a){console.error("Error:",a)}}WA.onInit().then(()=>{if(WA.player.tags.includes("bot"))return;let r=!0;m(r),r=!1,setInterval(()=>{m(r)},3e5)});WA.onInit().then(()=>{console.log("Setting up area exit tracking....");const r="https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg",i=["testArea","zirze_1"],o=1e4,s=WA.player.uuid||"1234",e={},n=(t,c,a=5e3)=>Promise.race([fetch(t,c),new Promise((u,l)=>setTimeout(()=>l(new Error("Request timed out")),a))]);i.forEach(t=>{console.log(`Setting up exit tracking for area: ${t}`),WA.room.area.onLeave(t).subscribe(()=>{const c=Date.now(),a=e[t]||0;if(c-a<o){console.log(`Cooldown active for area: ${t}`);return}e[t]=c,console.log(`Player ${s} left area: ${t}, sending webhook...`);const u={id:s,h5pid:t,timestamp:c,eventType:"page_closed"};n(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}).then(l=>{if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);console.log("Area exit event logged:",u)}).catch(l=>{console.error("Error logging area exit:",l)})})})});
//# sourceMappingURL=hub-main-d44fd710.js.map
