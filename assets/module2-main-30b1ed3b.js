import{b as g,g as f,q as h,c as A,p as y,l as u,m as d}from"./quests-0d95027e.js";WA.onInit().then(async()=>{try{await g(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await f();for(const e of t){let n,l=WA.player.name;console.log("Player name:",l),WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",l),e.npcName),e.triggerQuest){const o=WA.player.state.currentQuest,i=(c=h.find(W=>W.questId===e.triggerQuest))==null?void 0:c.requireQuest;o===i&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:n})=>{var c,o,i;const l=await A({x:t,y:e});if(!l){(c=d)==null||c.stop();return}if(!n&&!l){(o=d)==null||o.stop();return}else(i=d)==null||i.stop(),y(l)}),WA.onInit().then(async()=>{WA.player.state.Abschlussquiz2==="solved"&&WA.room.hideLayer("blockPortals")});const s=WA.player.state.currentQuest,r=h.find(t=>t.questId===s);r&&a(r.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=h.find(n=>n.questId===t);e&&a(e.questId)});function a(t){const e=h.find(n=>n.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM2Quests").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")}),WA.room.area.onLeave("fromMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")})});WA.player.onPlayerMove(async({x:s,y:r,moving:a})=>{var e,n,l;const t=await A({x:s,y:r});if(!t){(e=d)==null||e.stop();return}if(!a&&!t){(n=d)==null||n.stop();return}else(l=d)==null||l.stop(),y(t)});WA.onInit().then(async()=>{if(WA.player.state.m2terminal1==="correct"){const s=[],r=[];for(let a=4;a<=15;a++)for(let t=71;t<=89;t++)s.push({x:a,y:t,tile:"green",layer:"green"}),r.push({x:a,y:t,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r)}}),WA.onInit().then(async()=>{if(WA.player.state.m2terminal2==="correct"){const s=[],r=[];for(let a=4;a<=15;a++)for(let t=47;t<=70;t++)s.push({x:a,y:t,tile:"green",layer:"green"}),r.push({x:a,y:t,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m2terminal1").subscribe(async s=>{if(WA.player.state.module2="1",s==="correct"){WA.chat.sendChatMessage(`##### 🔍 Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **ist / Wissenschaft / mehr**   

 

📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    

 `,"Zirze"),WA.player.state.currentQuest="quest12a";const r=[],a=[];for(let e=4;e<=15;e++)for(let n=71;n<=89;n++)r.push({x:e,y:n,tile:"green",layer:"green"}),a.push({x:e,y:n,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(a),u("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m2terminal2").subscribe(async s=>{if(WA.player.state.module2="2",s==="correct"){WA.player.state.currentQuest="quest15";const r=[],a=[];for(let e=4;e<=15;e++)for(let n=47;n<=70;n++)r.push({x:e,y:n,tile:"green",layer:"green"}),a.push({x:e,y:n,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(a),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / als / Wissenssammlung**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

  `,"Zirze"),u("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}})});WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({next:s=>{s==="solved"&&(u("modul_2",10),console.log('Variable "PlanungSelbstmanagement" solved. Level up, +10XP'),WA.player.state.currentQuest="quest10",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({next:s=>{s==="solved"&&(u("modul_2",10),console.log('Variable "ThemenfindungGliederung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest11",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Lesen").subscribe({next:s=>{s==="solved"&&(u("modul_2",10),console.log('Variable "Lesen" solved. Level up, +10XP'),WA.player.state.currentQuest="quest14",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Literaturrecherche").subscribe({next:s=>{s==="solved"&&(u("modul_2",10),console.log('Variable "Literaturrecherche" solved. Level up, +10XP'),WA.player.state.currentQuest="quest13",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Abschlussquiz2").subscribe({next:s=>{s==="solved"&&(WA.room.hideLayer("blockPortals"),u("modul_2",10),console.log('Variable "finalQuizTwo" solved. Level up, +10XP'),WA.player.state.currentQuest="quest16",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});async function m(s){const r="https://apps.taskmagic.com/api/v1/webhooks/NpckzQWggzNKWa3Wqxmiq",{uuid:a,name:t}=WA.player;if(!a||!t){console.error("Invalid player data");return}const e=WA.room.id,n=Date.now(),l={id:a,name:t,roomId:e,firstPing:s,timestamp:n},c=(o,i,W=5e3)=>Promise.race([fetch(o,i),new Promise((b,p)=>setTimeout(()=>p(new Error("Request timed out")),W))]);try{const o=await c(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const i=await o.json();console.log("Success:",i)}catch(o){console.error("Error:",o)}}WA.onInit().then(()=>{if(WA.player.tags.includes("bot"))return;let s=!0;m(s),s=!1,setInterval(()=>{m(s)},3e5)});
//# sourceMappingURL=module2-main-30b1ed3b.js.map
