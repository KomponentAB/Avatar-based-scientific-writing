import{b as g,g as f,q as A,c as p,p as W,l as d,m as h}from"./quests-0d95027e.js";WA.onInit().then(async()=>{try{await g(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await f();for(const e of t){let n,a=WA.player.name;console.log("Player name:",a),WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var i;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",a),e.npcName),e.triggerQuest){const l=WA.player.state.currentQuest,c=(i=A.find(u=>u.questId===e.triggerQuest))==null?void 0:i.requireQuest;l===c&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:n})=>{var i,l,c;const a=await p({x:t,y:e});if(!a){(i=h)==null||i.stop();return}if(!n&&!a){(l=h)==null||l.stop();return}else(c=h)==null||c.stop(),W(a)}),WA.onInit().then(async()=>{WA.player.state.Abschlussquiz2==="solved"&&WA.room.hideLayer("blockPortals")});const s=WA.player.state.currentQuest,r=A.find(t=>t.questId===s);r&&o(r.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=A.find(n=>n.questId===t);e&&o(e.questId)});function o(t){const e=A.find(n=>n.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM2Quests").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")}),WA.room.area.onLeave("fromMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")})});WA.player.onPlayerMove(async({x:s,y:r,moving:o})=>{var e,n,a;const t=await p({x:s,y:r});if(!t){(e=h)==null||e.stop();return}if(!o&&!t){(n=h)==null||n.stop();return}else(a=h)==null||a.stop(),W(t)});WA.onInit().then(async()=>{if(WA.player.state.m2terminal1==="correct"){const s=[],r=[];for(let o=4;o<=15;o++)for(let t=71;t<=89;t++)s.push({x:o,y:t,tile:"green",layer:"green"}),r.push({x:o,y:t,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r)}}),WA.onInit().then(async()=>{if(WA.player.state.m2terminal2==="correct"){const s=[],r=[];for(let o=4;o<=15;o++)for(let t=47;t<=70;t++)s.push({x:o,y:t,tile:"green",layer:"green"}),r.push({x:o,y:t,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m2terminal1").subscribe(async s=>{if(WA.player.state.module2="1",s==="correct"){WA.chat.sendChatMessage(`##### 🔍 Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **ist / Wissenschaft / mehr**   

 

📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    

 `,"Zirze"),WA.player.state.currentQuest="quest12a";const r=[],o=[];for(let e=4;e<=15;e++)for(let n=71;n<=89;n++)r.push({x:e,y:n,tile:"green",layer:"green"}),o.push({x:e,y:n,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(o),d("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m2terminal2").subscribe(async s=>{if(WA.player.state.module2="2",s==="correct"){WA.player.state.currentQuest="quest15";const r=[],o=[];for(let e=4;e<=15;e++)for(let n=47;n<=70;n++)r.push({x:e,y:n,tile:"green",layer:"green"}),o.push({x:e,y:n,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(o),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / als / Wissenssammlung**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

  `,"Zirze"),d("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}})});WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({next:s=>{s==="solved"&&(d("modul_2",10),console.log('Variable "PlanungSelbstmanagement" solved. Level up, +10XP'),WA.player.state.currentQuest="quest10",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({next:s=>{s==="solved"&&(d("modul_2",10),console.log('Variable "ThemenfindungGliederung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest11",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Lesen").subscribe({next:s=>{s==="solved"&&(d("modul_2",10),console.log('Variable "Lesen" solved. Level up, +10XP'),WA.player.state.currentQuest="quest14",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Literaturrecherche").subscribe({next:s=>{s==="solved"&&(d("modul_2",10),console.log('Variable "Literaturrecherche" solved. Level up, +10XP'),WA.player.state.currentQuest="quest13",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});WA.player.state.onVariableChange("Abschlussquiz2").subscribe({next:s=>{s==="solved"&&(WA.room.hideLayer("blockPortals"),d("modul_2",10),console.log('Variable "finalQuizTwo" solved. Level up, +10XP'),WA.player.state.currentQuest="quest16",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(r){console.error("Error closing chat:",r)}},6e4))}});async function m(s){const r="https://apps.taskmagic.com/api/v1/webhooks/wZHU96JTlfwsEYwbKD1cd",{uuid:o,name:t}=WA.player;if(!o||!t){console.error("Invalid player data");return}const e=WA.room.id,n=Date.now(),a={id:o,name:t,roomId:e,firstPing:s,timestamp:n},i=(l,c,u=5e3)=>Promise.race([fetch(l,c),new Promise((b,y)=>setTimeout(()=>y(new Error("Request timed out")),u))]);try{const l=await i(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const c=await l.json();console.log("Success:",c)}catch(l){console.error("Error:",l)}}WA.onInit().then(()=>{if(WA.player.tags.includes("bot"))return;let s=!0;m(s),s=!1,setInterval(()=>{m(s)},3e5)});WA.onInit().then(()=>{console.log("Setting up area exit tracking....");const s="https://apps.taskmagic.com/api/v1/webhooks/8yUsd0Tbmg8XaZ8KOk4eg",r=["testArea","zirze_1"],o=1e4,t=WA.player.uuid||"1234",e={},n=(a,i,l=5e3)=>Promise.race([fetch(a,i),new Promise((c,u)=>setTimeout(()=>u(new Error("Request timed out")),l))]);r.forEach(a=>{console.log(`Setting up exit tracking for area: ${a}`),WA.room.area.onLeave(a).subscribe(()=>{const i=Date.now(),l=e[a]||0;if(i-l<o){console.log(`Cooldown active for area: ${a}`);return}e[a]=i,console.log(`Player ${t} left area: ${a}, sending webhook...`);const c={id:t,h5pid:a,timestamp:i,eventType:"page_closed"};n(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}).then(u=>{if(!u.ok)throw new Error(`HTTP error! status: ${u.status}`);console.log("Area exit event logged:",c)}).catch(u=>{console.error("Error logging area exit:",u)})})})});
//# sourceMappingURL=module2-main-7cb89d36.js.map
