import{b as A,c as f,p,g as W,q as u,l as b,m as h}from"./quests-0d95027e.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await A(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.player.onPlayerMove(async({x:t,y:i,moving:a})=>{var e,n,r;const s=await f({x:t,y:i});if(!s){(e=h)==null||e.stop();return}if(!a&&!s){(n=h)==null||n.stop();return}else(r=h)==null||r.stop(),p(s)});WA.onInit().then(async()=>{const t=await W();for(const e of t){let n,r=WA.player.name;console.log("Player name:",r),WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var l;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",r),e.npcName),e.triggerQuest){const o=WA.player.state.currentQuest,c=(l=u.find(d=>d.questId===e.triggerQuest))==null?void 0:l.requireQuest;o===c&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}const i=WA.player.state.currentQuest,a=u.find(e=>e.questId===i);a&&s(a.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const n=u.find(r=>r.questId===e);n&&s(n.questId)});function s(e){const n=u.find(r=>r.questId===e);n&&WA.ui.banner.openBanner({id:n.questId,text:n.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let t;t=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt die gesammelten Codeschnipsel in den Chat eingeben. Für den Fall, dass du sie dir doch nicht notiert hast, sind sie hier nochmal: **sie/ zu / denken / ist / Wissenschaft / eine / mehr / als / Wissenssammlung / ist /eine / Art**. Nutze diese, um den korrekten Satz zu bilden und gib ihn hier im Chat ein!","Zirze"),WA.chat.onChatMessage(async(i,a)=>{if(a.authorId===void 0){const s=i.toLowerCase();s.includes("wissenschaft")&&s.includes("wissenssammlung")&&s.includes("art")&&s.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(e=>setTimeout(e,4e3)),WA.player.state.currentQuest="quest27",b("notlog2",32),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{t&&t.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")})});WA.onInit().then(()=>{function t(){const i=WA.player.state.module2==="2",a=WA.player.state.module3==="2";if(i&&a){const s=[],e=[];for(let n=0;n<=47;n++)for(let r=0;r<=36;r++)s.push({x:n,y:r,tile:"green",layer:"green"}),e.push({x:n,y:r,tile:"red",layer:"red"});WA.room.setTiles([...s,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else i&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.module2==="2"&&WA.player.state.module3==="2"&&t()});async function m(t){const i="https://apps.taskmagic.com/api/v1/webhooks/q1sewUpYqqQ6aR3vdc4Dn",{uuid:a,name:s}=WA.player;if(!a||!s){console.error("Invalid player data");return}const e=WA.room.id,n=Date.now(),r={id:a,name:s,roomId:e,firstPing:t,timestamp:n},l=(o,c,d=5e3)=>Promise.race([fetch(o,c),new Promise((y,g)=>setTimeout(()=>g(new Error("Request timed out")),d))]);try{const o=await l(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const c=await o.json();console.log("Success:",c)}catch(o){console.error("Error:",o)}}WA.onInit().then(()=>{if(WA.player.tags.includes("bot"))return;let t=!0;m(t),t=!1,setInterval(()=>{m(t)},3e5)});
//# sourceMappingURL=hub-main-45c79b73.js.map
