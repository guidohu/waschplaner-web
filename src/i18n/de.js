// German texts of the website (Swiss spelling: "ss" instead of "ß", «guillemets»).
// Words as in the app: see the app's frontend/GLOSSARY.md. Short sentences, "du",
// "ihr/euer" for the whole house. Inline markup: **bold**, `code`, [label](url).
export default {
  common: {
    language: 'Sprache', decrease: 'Weniger', increase: 'Mehr', copy: 'Kopieren', copied: 'Kopiert',
    soon: 'Bald', included: 'Enthalten', notIncluded: 'Nicht enthalten', learnMore: 'Mehr erfahren',
  },
  nav: {
    features: 'Funktionen', pricing: 'Preise', selfHost: 'Selbst hosten', docs: 'Hilfe',
    login: 'Anmelden', start: 'Haus einrichten', menu: 'Menü', close: 'Schliessen', skip: 'Zum Inhalt springen',
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
      text: 'Feste Zeiten wie Termine im Kalender, freie Zeitfenster mit einem Tipp buchen, und wer früher fertig ist, gibt den Rest frei. Ohne Zettel an der Waschküchentür.',
      start: 'Haus gratis einrichten', selfHost: 'Selbst hosten',
      facts: ['In 5 Minuten eingerichtet', 'Ohne App-Store', 'Kein Passwort für Bewohner:innen'],
    },
    demo: {
      house: 'Musterweg 12', navPlan: 'Plan', navMine: 'Meine Wäsche', range: '21.–25. Sept.', date: '{d}.',
      title: 'Waschküche', week: 'KW 39', today: 'Heute', now: 'Jetzt', book: 'Buchen', free: 'Frei',
      done: 'fertig', freeFrom: 'Frei ab {time}', bookRest: 'Rest buchen', mine: 'Deine Wohnung: {name}',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
      flats: ['EG links', 'EG rechts', '1. OG links', '1. OG rechts', '2. OG'],
      hint: 'Probier es aus: Tippe auf «Buchen» oder auf ein Zeitfenster deiner Wohnung.',
      booked: 'Gebucht: {when}', freed: 'Freigegeben: {when}',
      label: 'Beispiel eines Waschplans mit fünf Wohnungen',
    },
    steps: {
      eyebrow: 'So funktioniert’s',
      title: 'In drei Schritten zum Waschplan',
      text: 'Die Verwaltung richtet das Haus einmal ein. Danach organisieren sich alle selbst.',
      items: [
        { icon: 'wand', title: 'Haus einrichten', text: 'Ein Assistent fragt in sechs kurzen Schritten nach Wohnungen, Maschinen und Zeiten und schlägt einen fairen festen Plan vor.' },
        { icon: 'print', title: 'Aushang aufhängen', text: 'Drucke den Aushang mit dem QR-Code für die Waschküche. Jede Wohnung bekommt eine Karte mit ihrem 6-stelligen Zugangscode.' },
        { icon: 'users', title: 'Alle buchen selbst', text: 'Bewohner:innen scannen den Code und sind drin. Sie sehen ihre festen Zeiten, buchen freie Zeitfenster und geben frei, was sie nicht brauchen.' },
      ],
    },
    features: {
      eyebrow: 'Funktionen',
      title: 'Alles, was eine gemeinsame Waschküche braucht',
      text: 'Und nichts, was nur im Weg steht.',
      items: [
        { icon: 'repeat', title: 'Fester Plan wie im Kalender', text: 'Jeden Dienstag, alle 2 Wochen oder am ersten Montag im Monat – wie wiederkehrende Termine. Der Assistent verteilt die Zeit fair.' },
        { icon: 'plus-circle', title: 'Buchen mit einem Tipp', text: 'Freie Zeitfenster kann jede Wohnung zusätzlich buchen, so oft die Hausregeln es erlauben.' },
        { icon: 'check-circle', title: 'Fertig – Rest freigeben', text: 'Früher fertig? Ein Tipp, und der Rest des Zeitfensters ist für alle frei. Zurücknehmen geht, solange niemand bucht.' },
        { icon: 'bolt', title: 'Faire Regeln fürs Übernehmen', text: 'Wer nicht erscheint, kann sein Zeitfenster nach einer Wartezeit verlieren. Einchecken schützt es. Die betroffene Wohnung wird benachrichtigt.' },
        { icon: 'layers', title: 'Eure Waschküche, wie sie ist', text: 'Waschmaschinen, Tumbler und Trockenräume: zusammen als Waschküche, einzeln oder gemischt gebucht. Mit eigenen Zeiten pro Tag.' },
        { icon: 'user', title: 'Meine Wäsche', text: 'Jede Wohnung sieht auf einen Blick, was als Nächstes kommt, ihre festen Zeiten und ihre Benachrichtigungen.' },
        { icon: 'phone', title: 'Auf dem Handy wie eine App', text: 'Waschplaner läuft im Browser und lässt sich auf den Home-Bildschirm legen. Der Plan öffnet sich auch ohne Internet.' },
        { icon: 'globe', title: 'Deutsch und English', text: 'Jede Person wählt ihre Sprache selbst. Der Plan bleibt für alle derselbe.' },
      ],
    },
    everyone: {
      eyebrow: 'Für alle im Haus',
      title: 'Einfach genug für alle Generationen',
      text: 'Waschplaner ist für Menschen gemacht, die sich nicht mit Technik beschäftigen wollen.',
      items: [
        { icon: 'text-size', title: 'Grosse Schrift auf Wunsch', text: 'Normal, Gross oder Sehr gross, pro Gerät. Grosse Tasten und klare Wörter statt Fachbegriffen.' },
        { icon: 'qr', title: 'Ohne Passwort', text: 'QR-Code scannen, Zugangscode eingeben, fertig. Ein Passwort braucht nur, wer sich auf weiteren Geräten anmelden will.' },
        { icon: 'shield', title: 'Nur die Daten, die der Plan braucht', text: 'Wohnungen heissen «EG links», nicht «Familie Muster». Vornamen reichen, die E-Mail dient nur zum Anmelden.' },
        { icon: 'moon', title: 'Hell und dunkel', text: 'Waschplaner folgt der Einstellung des Geräts und bleibt in beiden Farben gut lesbar.' },
      ],
    },
    ways: {
      eyebrow: 'Gehostet oder selbst betrieben',
      title: 'Gratis starten, bei Bedarf erweitern',
      text: 'Der Plan selbst ist immer gratis. Was unser Server zusätzlich für euch erledigt, kostet 1 Franken pro Wohnung und Jahr. Oder ihr betreibt Waschplaner selbst.',
      compare: 'Alle Funktionen vergleichen',
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        { q: 'Muss man eine App installieren?', a: 'Nein. Waschplaner läuft im Browser, auf Handy, Tablet und Computer. Wer möchte, legt ihn mit «Zum Home-Bildschirm» wie eine App aufs Handy.' },
        { q: 'Brauchen alle Bewohner:innen ein Smartphone?', a: 'Nein. Jeder Browser genügt. Und wer gar nicht online ist, kann die Verwaltung bitten: Sie kann für jede Wohnung buchen.' },
        { q: 'Was passiert, wenn jemand sein Zeitfenster nicht nutzt?', a: 'Das legt ihr in den Regeln fest: Andere dürfen es nach einer Wartezeit übernehmen (Standard), jederzeit oder nie. Wer eingecheckt hat, behält sein Zeitfenster immer.' },
        { q: 'Können wir mehrere Waschmaschinen und einen Trockenraum haben?', a: 'Ja. Ihr bucht alles zusammen als eine Waschküche, jede Maschine einzeln oder gemischt, z. B. Waschmaschine und Tumbler zusammen, den Trockenraum einzeln.' },
        { q: 'Kann ich Waschplaner selbst betreiben?', a: 'Ja. Der Quellcode ist öffentlich. Mit Docker läuft Waschplaner mit einem Befehl auf deinem eigenen Server, mit allen Funktionen. [Zur Anleitung](/docs/self-hosting)' },
        { q: 'Wo liegen unsere Daten?', a: 'Beim gehosteten Waschplaner auf unserem Server, beim selbst betriebenen auf eurem. Wir speichern nur, was der Plan braucht, und geben nichts weiter. [Datenschutz](/privacy)' },
      ],
    },
    cta: {
      title: 'Bereit für einen entspannten Waschtag?',
      text: 'Richte euren Waschplan in fünf Minuten ein. Gratis und ohne Zahlungsangaben.',
    },
  },

  pricing: {
    title: 'Preise',
    head: {
      eyebrow: 'Preise',
      title: 'Der Plan ist gratis. Die Extras kosten 1 Franken pro Wohnung und Jahr.',
      text: 'Keine Kosten pro Person, keine Zahlungsangaben zum Start und keine Grenze bei Wohnungen oder Maschinen.',
    },
    plans: {
      free: {
        name: 'Gratis', price: '0 CHF', unit: 'für immer', cta: 'Haus gratis einrichten',
        text: 'Alles, was im Haus passiert, wenn jemand den Plan öffnet.',
        points: ['Ein Haus, beliebig viele Wohnungen und Maschinen', 'Fester Plan, Buchen, Übernehmen, Einchecken', 'Aushang mit QR-Code und Zugangscodes', 'Benachrichtigungen in der App', 'Verlauf der letzten {weeks} Wochen'],
      },
      plus: {
        name: 'Plus', price: '1 CHF', unit: 'pro Wohnung und Jahr', cta: 'Mit Plus starten', badge: 'Alle Funktionen',
        text: 'Dazu alles, was unser Server von selbst für euch erledigt und aufbewahrt.',
        points: ['Alles aus Gratis', 'E-Mail, wenn jemand dein Zeitfenster übernimmt', 'Kalender-Abo für jede Wohnung', 'Live-Bildschirm für die Waschküche', 'Ganzer Verlauf und alle Aktivitäten', 'Bald: Erinnerungen und Statistiken'],
      },
      self: {
        name: 'Selbst hosten', price: '0 CHF', unit: 'auf deinem Server', cta: 'Zur Anleitung',
        text: 'Alle Funktionen, betrieben von dir. Du brauchst einen Server mit Docker.',
        points: ['Alle Funktionen aus Plus', 'Beliebig viele Häuser', 'Eure Daten auf eurem Server', 'E-Mails über deinen eigenen Mailserver', 'Updates und Backups machst du selbst'],
      },
    },
    principle: {
      eyebrow: 'Wo die Grenze liegt',
      title: 'Gratis ist, was passiert, wenn jemand tippt. Plus ist, was der Server von selbst tut.',
      text: 'Den Plan öffnen, buchen oder freigeben kostet uns fast nichts. Anders ist es mit allem, was rund um die Uhr läuft oder sich über die Jahre ansammelt. Genau das deckt Plus.',
      tap: {
        title: 'Wenn jemand tippt', tag: 'Gratis',
        items: ['Plan ansehen und buchen', 'Freigeben, übernehmen, einchecken', 'Fertig – Rest freigeben', 'Benachrichtigungen in der App', 'Das Haus verwalten'],
      },
      server: {
        title: 'Wenn niemand hinschaut', tag: 'Plus',
        items: [
          { icon: 'mail', title: 'E-Mails verschicken', text: 'Jede E-Mail kostet Versand und die Pflege einer vertrauenswürdigen Absenderadresse.' },
          { icon: 'calendar', title: 'Kalender-Abos ausliefern', text: 'Kalender-Apps fragen den Feed jeder Wohnung rund um die Uhr ab, auch wenn niemand hinschaut.' },
          { icon: 'monitor', title: 'Den Live-Bildschirm aktuell halten', text: 'Der Bildschirm in der Waschküche lädt den Plan jede Minute neu – 1440-mal am Tag.' },
          { icon: 'history', title: 'Den Verlauf aufbewahren', text: 'Jede Buchung und jede Änderung braucht Speicher, Jahr für Jahr.' },
          { icon: 'bell', title: 'Erinnern (bald)', text: 'Erinnerungen vor deinem Zeitfenster brauchen einen Dienst, der ständig auf die Uhr schaut.' },
        ],
      },
    },
    calc: {
      title: 'Was kostet Plus für euer Haus?',
      label: 'Wohnungen im Haus',
      perYear: 'pro Jahr für das ganze Haus',
      perMonth: 'Das sind {amount} pro Monat.',
      note: 'Bezahlt wird von der Verwaltung, einmal im Jahr. Bewohner:innen zahlen nie etwas.',
    },
    table: {
      title: 'Alle Funktionen im Vergleich',
      feature: 'Funktion',
      groups: {
        plan: 'Plan und Buchen', server: 'Der Server arbeitet für euch', history: 'Verlauf', ops: 'Betrieb',
      },
      rows: {
        house: 'Ein Haus mit beliebig vielen Wohnungen und Maschinen',
        wizard: 'Einrichtung in sechs Schritten, Aushang und Zugangscodes',
        booking: 'Fester Plan, Buchen, Freigeben, Übernehmen, Einchecken',
        rules: 'Regeln für zusätzliche Buchungen und fürs Übernehmen',
        inApp: 'Benachrichtigungen in der App',
        pwa: 'Aufs Handy legen, Plan auch ohne Internet',
        passwordMail: '«Passwort vergessen» per E-Mail',
        mail: 'E-Mail bei Änderungen an deinen Zeitfenstern',
        ical: 'Kalender-Abo für jede Wohnung',
        kiosk: 'Live-Bildschirm für die Waschküche',
        reminders: 'Erinnerung vor deinem Zeitfenster',
        stats: 'Statistiken und Export als Tabelle',
        bookings: 'Vergangene Buchungen',
        log: 'Aktivitäten der Verwaltung',
        hosting: 'Wer betreibt den Server',
        updates: 'Updates und Backups',
        support: 'Hilfe',
      },
    },
    values: {
      manyHouses: 'Beliebig viele Häuser', withSmtp: 'Mit eigenem Mailserver',
      weeks: '{weeks} Wochen', days: '{days} Tage', unlimited: 'Unbegrenzt',
      us: 'Wir', you: 'Du, mit Docker', auto: 'Automatisch', yourself: 'Selbst',
      docs: 'Hilfe-Seiten', email: 'Hilfe-Seiten und E-Mail',
    },
    faq: {
      title: 'Fragen zu Preis und Bezahlung',
      items: [
        { q: 'Wer bezahlt Plus?', a: 'Die Verwaltung, für das ganze Haus. Bewohner:innen zahlen nie etwas und geben nirgends Zahlungsangaben ein.' },
        { q: 'Wie werden die Wohnungen gezählt?', a: 'Es zählen die aktiven Wohnungen am Tag der Zahlung. Kommt während des Jahres eine dazu, bezahlt ihr für sie den Anteil bis zum Ende des Jahres. Die App sagt vorher, was es kostet.' },
        { q: 'Können wir Plus später dazunehmen?', a: 'Ja, jederzeit unter «Verwalten → Plus». Der Plan läuft einfach weiter, die Plus-Funktionen sind sofort da.' },
        { q: 'Was passiert, wenn wir Plus nicht verlängern?', a: 'Euer Haus läuft als Gratis weiter, der Plan bleibt, wie er ist. E-Mails, Kalender-Abos und Live-Bildschirm pausieren. Der ältere Verlauf bleibt 90 Tage erhalten, falls ihr es euch anders überlegt.' },
        { q: 'Warum ist Plus so günstig?', a: 'Der Preis deckt, was die Extras wirklich kosten: E-Mail-Versand, Speicher und Rechenzeit. Mehr braucht es nicht.' },
        { q: 'Hat die selbst betriebene Version Einschränkungen?', a: 'Nein. Selbst gehostet hast du alle Funktionen ohne Kosten. Du kümmerst dich dafür um Server, Updates, Backups und den Mailserver. [Zur Anleitung](/docs/self-hosting)' },
      ],
    },
  },

  docs: {
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
