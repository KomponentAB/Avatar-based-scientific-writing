/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log(
  "⚠️main.ts loaded, however moduleX-main.ts should have been loaded",
);
WA.onInit().then(async () => {
    console.log('loading main.ts');
    try {
        // Initialize the Scripting API Extra
        await bootstrapExtra();
        console.log('Scripting API Extra ready');
    } catch (e) {
        console.error(e);
    }})
    


export {};

