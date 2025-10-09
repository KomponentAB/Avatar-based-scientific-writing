import{b as y,g as p,q as d,c as W,p as A,l,m as i}from"./quests-9c48e787.js";WA.onInit().then(async()=>{try{await y(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await p();for(const e of t){let a,o=WA.player.name;console.log("Player name:",o),WA.room.area.onEnter(e.name).subscribe(()=>{a=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",o),e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,h=(c=d.find(m=>m.questId===e.triggerQuest))==null?void 0:c.requireQuest;u===h&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{a&&(a.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:a})=>{var c,u,h;const o=await W({x:t,y:e});if(!o){(c=i)==null||c.stop();return}if(!a&&!o){(u=i)==null||u.stop();return}else(h=i)==null||h.stop(),A(o)}),WA.onInit().then(async()=>{WA.player.state.Abschlussquiz2==="solved"&&WA.room.hideLayer("blockPortals")});const r=WA.player.state.currentQuest,s=d.find(t=>t.questId===r);s&&n(s.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=d.find(a=>a.questId===t);e&&n(e.questId)});function n(t){const e=d.find(a=>a.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM2Quests").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")}),WA.room.area.onLeave("fromMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")})});WA.player.onPlayerMove(async({x:r,y:s,moving:n})=>{var e,a,o;const t=await W({x:r,y:s});if(!t){(e=i)==null||e.stop();return}if(!n&&!t){(a=i)==null||a.stop();return}else(o=i)==null||o.stop(),A(t)});WA.onInit().then(async()=>{if(WA.player.state.module2==="1"){const r=[],s=[];for(let n=4;n<=15;n++)for(let t=71;t<=89;t++)r.push({x:n,y:t,tile:"green",layer:"green"}),s.push({x:n,y:t,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(s)}}),WA.onInit().then(async()=>{if(WA.player.state.module2==="2"){const r=[],s=[];for(let n=4;n<=15;n++)for(let t=47;t<=89;t++)r.push({x:n,y:t,tile:"green",layer:"green"}),s.push({x:n,y:t,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(s)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m2terminal1").subscribe(async r=>{if(WA.player.state.module2="1",r==="correct"){WA.chat.sendChatMessage(`##### 🔍 Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **ist / Wissenschaft / mehr**   

 

📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    

 `,"Zirze"),WA.player.state.currentQuest="quest12a";const s=[],n=[];for(let e=4;e<=15;e++)for(let a=71;a<=89;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),n.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),l("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m2terminal2").subscribe(async r=>{if(WA.player.state.module2="2",r==="correct"){WA.player.state.currentQuest="quest15";const s=[],n=[];for(let e=4;e<=15;e++)for(let a=47;a<=89;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),n.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / als / Wissenssammlung**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

  `,"Zirze"),l("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("module2").subscribe(r=>{if(r==="2"){const s=[],n=[];for(let t=4;t<=15;t++)for(let e=47;e<=89;e++)s.push({x:t,y:e,tile:"green",layer:"green"}),n.push({x:t,y:e,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),WA.player.state.currentQuest="quest16"}})});WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({next:r=>{r==="solved"&&(l("modul_2",10),console.log('Variable "PlanungSelbstmanagement" solved. Level up, +10XP'),WA.player.state.currentQuest="quest10",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({next:r=>{r==="solved"&&(l("modul_2",10),console.log('Variable "ThemenfindungGliederung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest11",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Lesen").subscribe({next:r=>{r==="solved"&&(l("modul_2",10),console.log('Variable "Lesen" solved. Level up, +10XP'),WA.player.state.currentQuest="quest14",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Literaturrecherche").subscribe({next:r=>{r==="solved"&&(l("modul_2",10),console.log('Variable "Literaturrecherche" solved. Level up, +10XP'),WA.player.state.currentQuest="quest13",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Abschlussquiz2").subscribe({next:r=>{r==="solved"&&(WA.room.hideLayer("blockPortals"),l("modul_2",10),console.log('Variable "finalQuizTwo" solved. Level up, +10XP'),WA.player.state.currentQuest="quest16",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});
//# sourceMappingURL=module2-main-0651d8e4.js.map
