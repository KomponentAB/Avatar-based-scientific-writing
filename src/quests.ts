import { levelUp } from "@workadventure/quests";

const quests = [
    // Notlog
    {
        questId: 'quest1',
        questDescription: 'Triff Prof. McDongle am Eingang von Notlog.',
        requireQuest: null,
    },
    {
        questId: 'quest2',
        questDescription: 'Sprich mit Prof. Mumblecore am nördlichen Ende der großen Halle.',
        requireQuest: 'quest1',
    },
    {
        questId: 'quest3',
        questDescription: 'Geh runter ins Labor und sprich mit Prof. Sake.',
        requireQuest: 'quest2',
    },
    {
        questId: 'quest4',
        questDescription: 'Sieh dir das Video im Labor an.',
        requireQuest: 'quest3',
    },
    {
        questId: 'quest5',
        questDescription: 'Finde den geheimen Eingang zum Kondensatorium und gib dort den Zahlencode ein.',
        requireQuest: 'quest4',
    },
    {
        questId: 'quest6',
        questDescription: 'Gehe durch das Portal ins Kondensatorium.',
        requireQuest: 'quest5',
    },
    {
        questId: 'quest7',
        questDescription: 'Sprich mit der zitierenden Zirze.',
        requireQuest: 'quest6',
    },
    {
        questId: 'quest8',
        questDescription: 'Geh durch das erste offene Portal und gelange zu deiner ersten Aufgabe. Sprich dort mit der zitierenden Zirze ',
        requireQuest: 'quest7',
    },
    {
        questId: 'quest9',
        questDescription: 'Bearbeite das Lernmaterial Planung und Selbstmanagement',
        requireQuest: 'quest8',
    },
    {
        questId: 'quest10',
        questDescription: 'Bearbeite das Lernmaterial Themenfindung & Gliederung ',
        requireQuest: 'quest9',
    },
    {
        questId: 'quest11',
        questDescription: 'Gebe die Zahlencodes in das Computerterminal ein!',
        requireQuest: 'quest10',
    },
    {
        questId: 'quest12a',
        questDescription: 'Geh in den nächsten Raum und sprich mit der zitierenden Zirze',
        requireQuest: 'quest11',
    },
    {
        questId: 'quest12',
        questDescription: 'Bearbeite das Lernmaterial zur Literaturrecherche',
        requireQuest: 'quest11',
    },
    {
        questId: 'quest13',
        questDescription: 'Bearbeite das Lernmaterial zum wissenschaftlichen Lesen',
        requireQuest: 'quest12',
    },
    {
        questId: 'quest14',
        questDescription: 'Gib die Zahlencodes in das Computerterminal ein!',
        requireQuest: 'quest13',
    },
    {
        questId: 'quest15',
        questDescription: 'Löse das abschließende Quiz!',
        requireQuest: 'quest14',
    },
    {
        questId: 'quest16',
        questDescription: 'Geh durch das Portal zurück zum Knotenpunkt des Kondensatoriums und bearbeite das nächste Lernmodul! ',
        requireQuest: 'quest15',
    },

    // Modul 3 - Raum 3.1
    
    {
        questId: 'quest17',
        questDescription: 'Bearbeite das Lernmaterial zu den Textarten',
        requireQuest: 'quest16',
    },
    {
        questId: 'quest18',
        questDescription: 'Bearbeite das Lernmaterial zu den allgemeinen Regeln',
        requireQuest: 'quest17',
    },
    {
        questId: 'quest19',
        questDescription: 'Bearbeite das Lernmaterial zu Sprache & Gendern',
        requireQuest: 'quest18',
    },
    {
        questId: 'quest20',
        questDescription: 'Gebe die Zahlencodes in das Computerterminal ein!',
        requireQuest: 'quest19',
    },

    // Modul 3 - Raum 3.2
    {
        questId: 'quest21',
        questDescription: 'Bearbeite das Lernmaterial zu Zitation im Text',
        requireQuest: 'quest20',
    },
    {
        questId: 'quest22',
        questDescription: 'Bearbeite das Lernmaterial zum Literaturverzeichnis',
        requireQuest: 'quest21',
    },
    {
        questId: 'quest23',
        questDescription: 'Bearbeite das Lernmaterial zur Literaturverwaltung mit Zotero',
        requireQuest: 'quest22',
    },
    {
        questId: 'quest24',
        questDescription: 'Gebe die Zahlencodes in das Computerterminal ein!',
        requireQuest: 'quest23',
    },

    // Abschluss Modul 3
    {
        questId: 'quest25',
        questDescription: 'Löse das abschließende Quiz!',
        requireQuest: 'quest24',
    },
    {
        questId: 'quest26',
        questDescription: 'Geh durch das Portal zurück zum Knotenpunkt des Kondensatoriums und gebe dort die gesammelten Wortschnipsel in der korrekten Reihenfolge ein!',
        requireQuest: 'quest25',
    },
    {
        questId: 'quest27',
        questDescription: 'Rückkehr in die Notlog. Sprich mit Prof. Mumblecore.',
        requireQuest: 'quest26',
    }
    {
        questId: 'quest28',
        questDescription: 'Bearbeite das Lernmaterial auf dem Podest.',
        requireQuest: 'quest27',
    }
];


export { quests, levelUp };