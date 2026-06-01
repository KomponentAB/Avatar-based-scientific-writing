import{b as y,g as p,p as g,t as f,q as d,c as h,a as A,l,s as b,d as v,e as T,f as Q,m as i}from"./botTracking-1976d2ad.js";WA.onInit().then(async()=>{try{await y(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await p();for(const e of t){let r,o=WA.player.name;console.log("Player name:",o),WA.room.area.onEnter(e.name).subscribe(()=>{g(e.npcName),r=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(f(e.name),WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",o),e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,W=(c=d.find(m=>m.questId===e.triggerQuest))==null?void 0:c.requireQuest;u===W&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{r&&(r.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:r})=>{var c,u,W;const o=await h({x:t,y:e});if(!o){(c=i)==null||c.stop();return}if(!r&&!o){(u=i)==null||u.stop();return}else(W=i)==null||W.stop(),A(o)}),WA.onInit().then(async()=>{WA.player.state.Abschlussquiz2==="solved"&&WA.room.hideLayer("blockPortals")});const n=WA.player.state.currentQuest,s=d.find(t=>t.questId===n);s&&a(s.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=d.find(r=>r.questId===t);e&&a(e.questId)});function a(t){const e=d.find(r=>r.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM2Quests").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")}),WA.room.area.onLeave("fromMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")})});WA.player.onPlayerMove(async({x:n,y:s,moving:a})=>{var e,r,o;const t=await h({x:n,y:s});if(!t){(e=i)==null||e.stop();return}if(!a&&!t){(r=i)==null||r.stop();return}else(o=i)==null||o.stop(),A(t)});WA.onInit().then(async()=>{if(WA.player.state.m2terminal1==="correct"){const n=[],s=[];for(let a=4;a<=15;a++)for(let t=71;t<=89;t++)n.push({x:a,y:t,tile:"green",layer:"green"}),s.push({x:a,y:t,tile:null,layer:"red"});WA.room.setTiles(n),WA.room.setTiles(s)}}),WA.onInit().then(async()=>{if(WA.player.state.m2terminal2==="correct"){const n=[],s=[];for(let a=4;a<=15;a++)for(let t=47;t<=70;t++)n.push({x:a,y:t,tile:"green",layer:"green"}),s.push({x:a,y:t,tile:null,layer:"red"});WA.room.setTiles(n),WA.room.setTiles(s)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m2terminal1").subscribe(async n=>{if(WA.player.state.module2="1",n==="correct"){WA.chat.sendChatMessage(`##### 🔍 Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **ist / Wissenschaft / mehr**   

 

📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    

 `,"Zirze"),WA.player.state.currentQuest="quest12a";const s=[],a=[];for(let e=4;e<=15;e++)for(let r=71;r<=89;r++)s.push({x:e,y:r,tile:"green",layer:"green"}),a.push({x:e,y:r,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(a),l("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m2terminal2").subscribe(async n=>{if(WA.player.state.module2="2",n==="correct"){WA.player.state.currentQuest="quest15";const s=[],a=[];for(let e=4;e<=15;e++)for(let r=47;r<=70;r++)s.push({x:e,y:r,tile:"green",layer:"green"}),a.push({x:e,y:r,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(a),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / als / Wissenssammlung**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

  `,"Zirze"),l("modul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}})});WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({next:n=>{n==="solved"&&(l("modul_2",10),console.log('Variable "PlanungSelbstmanagement" solved. Level up, +10XP'),WA.player.state.currentQuest="quest10",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({next:n=>{n==="solved"&&(l("modul_2",10),console.log('Variable "ThemenfindungGliederung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest11",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Lesen").subscribe({next:n=>{n==="solved"&&(l("modul_2",10),console.log('Variable "Lesen" solved. Level up, +10XP'),WA.player.state.currentQuest="quest14",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Literaturrecherche").subscribe({next:n=>{n==="solved"&&(l("modul_2",10),console.log('Variable "Literaturrecherche" solved. Level up, +10XP'),WA.player.state.currentQuest="quest13",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Abschlussquiz2").subscribe({next:n=>{n==="solved"&&(WA.room.hideLayer("blockPortals"),l("modul_2",10),console.log('Variable "finalQuizTwo" solved. Level up, +10XP'),WA.player.state.currentQuest="quest16",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.onInit().then(async()=>{if(WA.player.name.toLowerCase()==="bot"||WA.player.tags.includes("bot")){WA.player.setOutlineColor(147,51,234),await b();return}await v(),T(),Q()});
//# sourceMappingURL=src-m2Main-de47e8af.js.map
