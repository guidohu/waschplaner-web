// German texts of the website (Swiss spelling: "ss" instead of "ß", «guillemets»).
// Words as in the app: see its frontend/GLOSSARY.md. Short sentences, "du",
// "ihr/euer" for the whole house. Inline markup: **bold**, `code`, [label](url).
// {price}, {trial}, {view}, {renew}, {remind}, {trialRemind}, {min}, {app}, {repo}
// and {email} are filled in from site.js.
export default {
  common: {
    later: 'Kommt später', laterPlus: 'Später mit Plus',
    language: 'Sprache', decrease: 'Weniger', increase: 'Mehr', copy: 'Kopieren', copied: 'Kopiert',
    soon: 'Bald', included: 'Enthalten', notIncluded: 'Nicht enthalten', learnMore: 'Mehr erfahren',
    free: 'Gratis', plus: 'Plus',
  },
  nav: {
    features: 'Funktionen', pricing: 'Preise', selfHost: 'Selbst hosten', docs: 'Hilfe',
    login: 'Anmelden', start: 'Plan erstellen', menu: 'Menü', close: 'Schliessen', skip: 'Zum Inhalt springen',
    main: 'Hauptnavigation', home: 'Waschplaner – zur Startseite',
  },
  footer: {
    tagline: 'Der Waschplan für Häuser, in denen sich mehrere Wohnungen die Waschküche teilen.',
    product: 'Produkt', selfHost: 'Selbst hosten', legal: 'Rechtliches',
    guide: 'Anleitung', config: 'Konfiguration', source: 'Quellcode', contact: 'Kontakt',
    privacy: 'Datenschutz', imprint: 'Impressum', copyright: '© {year} Waschplaner',
  },

  home: {
    title: 'Der Waschplan für euer Haus',
    hero: {
      eyebrow: 'Für Mehrfamilienhäuser mit gemeinsamer Waschküche',
      title: 'Wer wann wäscht – klar geregelt.',
      text: 'Feste Zeiten wie Termine im Kalender, fair verteilt und in fünf Minuten erstellt. Druck den Plan für ein ganzes Jahr aus – gratis, ohne Konto, und deine Eingaben verlassen deinen Browser nicht.',
      start: 'Plan gratis erstellen', more: 'Funktionen ansehen',
      facts: [
        'In 5 Minuten erstellt',
        'Ohne Konto',
        'Bleibt in deinem Browser',
      ],
    },
    demo: {
      house: 'Musterweg 12', navPlan: 'Plan', navMine: 'Meine Wäsche', range: '21.–25. Sept.', date: '{d}.',
      title: 'Waschküche', week: 'KW 39', today: 'Heute', now: 'Jetzt', book: 'Buchen', free: 'Frei',
      done: 'fertig', freeFrom: 'Frei ab {time}', bookRest: 'Rest buchen', mine: 'Deine Wohnung: {name}',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
      flats: ['EG links', 'EG rechts', '1. OG links', '1. OG rechts', '2. OG'],
      hint: 'So wird die Online-Version aussehen, in der alle selbst buchen – sie kommt später. Probier es aus: Tippe auf «Buchen» oder auf ein Zeitfenster deiner Wohnung.',
      booked: 'Gebucht: {when}', freed: 'Freigegeben: {when}',
      label: 'Beispiel eines Waschplans mit fünf Wohnungen',
    },
    steps: {
      eyebrow: 'So funktioniert’s',
      title: 'In drei Schritten zum Waschplan',
      text: 'Du erstellst den Plan einmal im Browser und hängst ihn in die Waschküche. Später sollen ihn alle auch online nutzen können.',
      items: [
        { icon: 'wand', title: 'Plan erstellen', text: 'Ein Assistent fragt in fünf kurzen Schritten nach Wohnungen, Maschinen und Zeiten und schlägt einen fairen festen Plan vor. Alles bleibt in deinem Browser.' },
        { icon: 'print', title: 'Ausdrucken', text: 'Zwei Wochen pro A4-Seite, bis zu einem ganzen Jahr, für jede Maschine oder jeden Raum. Einzelne Tage änderst du direkt in der Vorschau.' },
        { icon: 'users', title: 'Online für alle', text: 'Mit Plus sollen die Bewohner:innen den QR-Code auf dem Aushang scannen und selbst buchen, tauschen und absagen.', later: true },
      ],
    },
    features: {
      eyebrow: 'Funktionen',
      title: 'Alles, was eine gemeinsame Waschküche braucht',
      text: 'Gratis im Browser – und später mit Plus online für alle im Haus.',
      items: {
        plan: { title: 'Fester Plan wie im Kalender', text: 'Jeden Dienstag, alle 2 Wochen oder am ersten Montag im Monat – wie wiederkehrende Termine. Der Assistent verteilt die Zeit fair und lässt so viel frei, wie ihr für spontanes Waschen wollt.' },
        rooms: { title: 'Eure Waschküche, wie sie ist', text: 'Waschmaschinen, Tumbler und Trockenräume: zusammen als Waschküche, einzeln oder gemischt gebucht. Mit eigenen Zeiten pro Tag.' },
        print: { title: 'Zum Aufhängen ausdrucken', text: 'Zwei Wochen pro A4-Seite, pro Maschine oder Raum, bis zu einem ganzen Jahr. Im Druckfenster speicherst du den Plan auch als PDF.' },
        book: { title: 'Buchen mit einem Tipp', text: 'Freie Zeitfenster bucht jede Wohnung selbst, so oft die Hausregeln es erlauben. Eigene gibt sie frei oder verschiebt sie.' },
        finish: { title: 'Fertig – Rest freigeben', text: 'Früher fertig? Ein Tipp, und der Rest des Zeitfensters ist für alle frei. Zurücknehmen geht, solange niemand bucht.' },
        takeover: { title: 'Faire Regeln fürs Übernehmen', text: 'Wer nicht erscheint, kann sein Zeitfenster nach einer Wartezeit verlieren. Einchecken schützt es. Die betroffene Wohnung wird benachrichtigt.' },
        mail: { title: 'E-Mail und Kalender-Abo', text: 'Wer sein Zeitfenster verliert, erfährt es per E-Mail. Und jede Wohnung sieht ihre Zeitfenster in der Kalender-App.' },
        screen: { title: 'Öffentliche Plan-Ansicht', text: 'Für einen Bildschirm in der Waschküche: der Plan ohne Anmeldung, jede Minute aktuell.' },
      },
    },
    everyone: {
      eyebrow: 'Für alle im Haus',
      title: 'Einfach genug für alle Generationen',
      text: 'Waschplaner ist für Menschen gemacht, die sich nicht mit Technik beschäftigen wollen.',
      items: [
        { icon: 'text-size', title: 'Grosse Schrift auf Wunsch', text: 'Normal, Gross oder Sehr gross, pro Gerät. Grosse Tasten und klare Wörter statt Fachbegriffen.' },
        { icon: 'lock', title: 'Ohne Konto', text: 'Kein Konto, keine E-Mail, kein Passwort. Du erstellst den Plan direkt im Browser, und deine Eingaben verlassen ihn nicht.' },
        { icon: 'shield', title: 'Nur die Daten, die der Plan braucht', text: 'Wohnungen heissen «EG links», nicht «Familie Muster». Was du eingibst, bleibt auf deinem Gerät.' },
        { icon: 'globe', title: 'Vier Sprachen', text: 'Deutsch, Français, Italiano und English – jede Person wählt ihre Sprache selbst. Und wer nicht online ist, liest den Plan auf Papier.' },
      ],
    },
    ways: {
      eyebrow: 'Heute und später',
      title: 'Heute gratis im Browser, später online für alle',
      text: 'Den Plan erstellst und druckst du schon heute gratis im Browser. Die Online-Version, in der alle selbst buchen, kommt später als Plus – für {price} Franken pro Wohnung und Jahr.',
      compare: 'Alle Funktionen vergleichen',
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        { q: 'Was kostet der Planer?', a: 'Nichts. Du erstellst den Plan im Browser und druckst ihn für bis zu ein Jahr aus – gratis und ohne Konto. Die Online-Version kommt später als Plus. [Preise ansehen](/pricing)' },
        { q: 'Wo bleiben meine Eingaben?', a: 'Nur in deinem Browser. Der Planer schickt nichts an einen Server – auch nicht an uns. Willst du den Plan auf einem anderen Gerät weiter bearbeiten, speicherst du ihn als Datei.' },
        { q: 'Kann ich den Plan später ändern?', a: 'Ja. Im selben Browser ist er beim nächsten Besuch noch da, sonst öffnest du die gespeicherte Datei. Einzelne Tage änderst du in der Vorschau; danach druckst du einfach neu.' },
        { q: 'Brauchen alle Bewohner:innen ein Smartphone?', a: 'Nein. Der Plan hängt auf Papier in der Waschküche. Mit Plus sollen ihn später alle auch online nutzen können – freiwillig.' },
        { q: 'Kann ich Waschplaner selbst betreiben?', a: 'Das kommt später, zusammen mit der Online-Version.' },
        { q: 'Gibt es Waschplaner auf Französisch oder Italienisch?', a: 'Ja. Die Website und der Planer gibt es auf Deutsch, Französisch, Italienisch und Englisch.' },
        { q: 'Wann kommt die Online-Version?', a: 'Wir arbeiten daran. Mit Plus sollen alle im Haus den Plan online nutzen, buchen und tauschen – für {price} Franken pro Wohnung und Jahr. Bis dahin ist der Planer im Browser gratis.' },
      ],
    },
    cta: {
      title: 'Bereit für einen entspannten Waschtag?',
      text: 'Erstelle euren Waschplan in fünf Minuten: gratis, ohne Konto und direkt in deinem Browser.',
    },
  },

  pricing: {
    title: 'Preise',
    head: {
      eyebrow: 'Preise',
      title: 'Heute gratis im Browser. Später online für alle mit Plus.',
      text: 'Den Plan erstellst und druckst du schon heute gratis und ohne Konto. Die Online-Version mit Plus und das Selbst-Hosten kommen später; die Preise unten gelten dann.',
    },
    plans: {
      free: {
        name: 'Gratis', tag: 'Im Browser', badge: 'Jetzt verfügbar', price: 'CHF 0', unit: 'ohne Konto', cta: 'Plan jetzt erstellen',
        text: 'Erstelle den Plan direkt im Browser und druck ihn aus. Deine Eingaben verlassen deinen Browser nicht.',
        points: [
          'Ohne Konto und ohne E-Mail',
          'Deine Eingaben bleiben im Browser',
          'Fester Plan mit fairem Vorschlag',
          'Einzelne Tage ändern',
          'Ein ganzes Jahr ausdrucken, auch als PDF',
          'Als Datei speichern und später weiter bearbeiten',
        ],
      },
      plus: {
        name: 'Plus', tag: 'Online für alle', price: 'CHF {price}', unit: 'pro Wohnung und Jahr', cta: '{trial} Tage gratis testen',
        badge: '{trial} Tage geschenkt',
        text: 'Alle Bewohner:innen nutzen den Plan online – und der Server erledigt den Rest.',
        points: ['Alles aus Gratis', 'Einladen mit QR-Code und Zugangscodes', 'Buchen, freigeben, übernehmen, verschieben, einchecken', 'E-Mail bei Änderungen und Kalender-Abo', 'Öffentliche Plan-Ansicht für die Waschküche', 'Kein Abo: verlängert sich nicht von selbst'],
      },
      self: {
        name: 'Selbst hosten', tag: 'Dein Server', price: 'CHF 0', unit: 'auf deinem Server', cta: 'Zur Anleitung',
        text: 'Alle Funktionen, betrieben von dir. Du brauchst einen Server mit Docker.',
        points: ['Alle Funktionen aus Plus', 'Plus ohne Zahlungen einschalten', 'Beliebig viele Häuser', 'Eure Daten auf eurem Server', 'Updates und Backups machst du selbst'],
      },
    },
    principle: {
      eyebrow: 'Wo die Grenze liegt',
      title: 'Gratis ist der Plan auf Papier. Mit Plus nutzen ihn alle online.',
      text: 'Einen Plan erstellen und ausdrucken braucht kaum Rechenzeit. Sobald alle online buchen, arbeitet der Server für jede Wohnung, rund um die Uhr. Darum kostet Plus pro Wohnung – und nur so viel, wie es braucht.',
      free: {
        title: 'Gratis: für die Verwaltung', tag: 'Gratis',
        items: [
          'Den Plan in fünf Schritten erstellen',
          'Feste Zeiten fair verteilen',
          'Einzelne Tage ändern',
          'Ein ganzes Jahr ausdrucken',
          'Alles bleibt in deinem Browser',
        ],
      },
      plus: {
        title: 'Plus: für alle im Haus', tag: 'Plus',
        items: [
          { icon: 'users', title: 'Jede Wohnung online', text: 'Anmelden, buchen, freigeben: Jede Wohnung nutzt den Server, jeden Tag.' },
          { icon: 'mail', title: 'E-Mails verschicken', text: 'Wer sein Zeitfenster verliert, bekommt eine E-Mail – und jeder Versand kostet.' },
          { icon: 'calendar', title: 'Kalender-Abos ausliefern', text: 'Kalender-Apps fragen den Feed jeder Wohnung rund um die Uhr ab.' },
          { icon: 'screen', title: 'Die öffentliche Ansicht aktuell halten', text: 'Ein Bildschirm in der Waschküche lädt den Plan jede Minute – 1440-mal am Tag.' },
          { icon: 'history', title: 'Aktivitäten aufbewahren', text: 'Wer wann was gebucht oder geändert hat, bleibt gespeichert, solange das Haus besteht.' },
        ],
      },
    },
    journey: {
      eyebrow: 'So wird Plus funktionieren',
      title: 'Testen, kaufen, verlängern – ohne Abo',
      text: 'Die Verwaltung kauft Plus für ein Jahr. Nichts verlängert sich von selbst, und niemand wird überrascht.',
      steps: [
        { icon: 'gift', title: '{trial} Tage gratis testen', text: 'Einmal pro Haus, ohne Zahlungsangaben. Der Test endet von selbst; {trialRemind} Tage vorher kommt eine Erinnerung.' },
        { icon: 'card', title: 'Für ein Jahr kaufen', text: 'Auf der sicheren Bezahlseite von Stripe, mit Karte oder TWINT. Kaufst du während des Tests, beginnt das Jahr erst, wenn er endet.' },
        { icon: 'bell', title: 'Rechtzeitig verlängern', text: '{remind} Tage vor dem Ende erinnern wir dich per E-Mail. Verlängern geht in den letzten {renew} Tagen und hängt ein Jahr hinten an.' },
        { icon: 'eye', title: 'Nicht verlängert?', text: 'Dann können die Bewohner:innen den Plan noch {view} Tage ansehen. Danach gilt wieder Gratis: Der Plan bleibt gespeichert und lässt sich ausdrucken.' },
      ],
    },
    calc: {
      title: 'Was kostet Plus für euer Haus?',
      label: 'Wohnungen im Haus',
      perYear: 'pro Jahr für das ganze Haus',
      perMonth: 'Das sind {amount} pro Monat.',
      note: 'Die Verwaltung bezahlt einmal im Jahr, für die aktiven Wohnungen. Bewohner:innen zahlen nie etwas.',
    },
    table: {
      title: 'Alle Funktionen im Vergleich',
      feature: 'Funktion',
      groups: {
        plan: 'Planen und drucken', online: 'Online für alle', server: 'Der Server arbeitet für euch', ops: 'Bezahlen und Betrieb',
      },
      rows: {
        house: 'Ein Haus mit beliebig vielen Wohnungen und Maschinen',
        wizard: 'Einrichtung mit fairem festem Plan',
        edit: 'Einzelne Tage ändern',
        print: 'Ausdrucken (zwei Wochen pro A4-Seite)',
        join: 'Einladen mit QR-Code und Zugangscodes',
        booking: 'Buchen, freigeben, übernehmen, verschieben, einchecken',
        rules: 'Regeln für zusätzliche Buchungen und fürs Übernehmen',
        mine: '«Meine Wäsche», als App auf dem Handy',
        activity: 'Aktivität: wer wann was geändert hat',
        mail: 'E-Mail bei Änderungen an deinen Zeitfenstern',
        ical: 'Kalender-Abo für jede Wohnung',
        screen: 'Öffentliche Plan-Ansicht für die Waschküche',
        reminders: 'Erinnerung vor deinem Zeitfenster',
        stats: 'Statistiken und Export als Tabelle',
        payment: 'Bezahlen',
        hosting: 'Wer betreibt den Server',
        updates: 'Updates und Backups',
        support: 'Hilfe',
      },
    },
    values: {
      manyHouses: 'Beliebig viele Häuser', withSmtp: 'Mit eigenem Mailserver',
      printFree: '{printFree} Wochen am Stück', printYear: 'Ein ganzes Jahr',
      nothing: 'Nichts', yearly: 'Pro Jahr, mit Karte oder TWINT', switch: 'Gratis einschaltbar',
      us: 'Wir', you: 'Du, mit Docker', auto: 'Automatisch', yourself: 'Selbst',
      docs: 'Hilfe-Seiten', email: 'Hilfe-Seiten und E-Mail',
    },
    faq: {
      title: 'Fragen zu Preis und Bezahlung',
      items: [
        { q: 'Wann kommt Plus?', a: 'Wir arbeiten daran. Bis dahin erstellst und druckst du den Plan gratis im Browser – ohne Konto. [Plan erstellen](/planner)' },
        { q: 'Wer bezahlt Plus?', a: 'Die Verwaltung, für das ganze Haus. Bewohner:innen zahlen nie etwas und geben nirgends Zahlungsangaben ein.' },
        { q: 'Wie werden die Wohnungen gezählt?', a: 'Bezahlt wird für die aktiven Wohnungen. Kommt während des Jahres eine dazu, bezahlst du ihren Anteil bis zum Ende des Jahres, bevor sie startet (mindestens CHF {min}). Alle anderen merken davon nichts.' },
        { q: 'Verlängert sich Plus von selbst?', a: 'Nein, Plus ist kein Abo. {remind} Tage vor dem Ende erinnern wir dich per E-Mail. Verlängerst du in den letzten {renew} Tagen, beginnt das neue Jahr erst, wenn das alte endet.' },
        { q: 'Was passiert, wenn Plus endet?', a: 'Die Bewohner:innen können den Plan noch {view} Tage ansehen, aber nichts mehr buchen. Danach hat euer Haus wieder Gratis: Du änderst und druckst den Plan weiter, und alles bleibt gespeichert. Plus kannst du jederzeit wieder kaufen.' },
        { q: 'Wie bezahlen wir?', a: 'Auf der sicheren Bezahlseite von Stripe, mit Karte oder TWINT. Wir sehen keine Kartendaten. Plus wählst du am Ende der Einrichtung oder später unter «Verwalten → Plus».' },
        { q: 'Hat die selbst betriebene Version Einschränkungen?', a: 'Nein. Selbst gehostet hast du alle Funktionen, und Plus ist ein Schalter, der nichts kostet. Du kümmerst dich dafür um Server, Updates, Backups und den Mailserver. [Zur Anleitung](/docs/self-hosting)' },
      ],
    },
  },

  docs: {
    later: 'Diese Seite beschreibt die Online-Version. Sie kommt später – heute erstellst du den Plan [im Browser](/planner).',
    appLanguage: 'Die App gibt es auf Deutsch und Englisch.',
    title: 'Hilfe & Dokumentation',
    intro: 'Wie ihr Waschplaner einrichtet, im Alltag nutzt und selbst betreibt.',
    nav: 'Seiten der Hilfe',
    prev: 'Zurück', next: 'Weiter',
    sections: { use: 'Waschplaner nutzen', run: 'Selbst betreiben', more: 'Mehr' },
    notFound: 'Diese Hilfe-Seite gibt es nicht.',
    edit: 'Etwas unklar? Schreib uns an [{email}](mailto:{email}).',
  },
  legal: { privacy: 'Datenschutz', imprint: 'Impressum' },
  notFound: {
    title: 'Diese Seite gibt es nicht',
    text: 'Vielleicht hat sich die Adresse geändert. Auf der Startseite findest du alles.',
    home: 'Zur Startseite', docs: 'Zur Hilfe',
  },
}
