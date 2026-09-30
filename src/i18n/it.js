// Italian texts of the website (Swiss Italian, «guillemets», "tu").
// The app itself is in German and English; these words match its glossary:
// Plan = piano (dei turni), Zeitfenster = fascia oraria, Fester Plan = turni fissi,
// Waschküche = lavanderia, Wohnung = appartamento, Bewohner:in = residente,
// Verwaltung = amministrazione.
export default {
  common: {
    language: 'Lingua', decrease: 'Meno', increase: 'Più', copy: 'Copia', copied: 'Copiato',
    soon: 'Presto', included: 'Incluso', notIncluded: 'Non incluso', learnMore: 'Scopri di più',
    free: 'Gratis', plus: 'Plus',
  },
  nav: {
    features: 'Funzioni', pricing: 'Prezzi', selfHost: 'Self-hosting', docs: 'Aiuto',
    login: 'Accedi', start: 'Configura lo stabile', menu: 'Menu', close: 'Chiudi', skip: 'Vai al contenuto',
    main: 'Navigazione principale', home: 'Waschplaner – pagina iniziale',
  },
  footer: {
    tagline: 'Il piano della lavanderia per gli stabili in cui più appartamenti condividono la lavanderia.',
    product: 'Prodotto', selfHost: 'Self-hosting', legal: 'Note legali',
    guide: 'Guida', config: 'Configurazione', source: 'Codice sorgente', contact: 'Contatto',
    privacy: 'Protezione dei dati', imprint: 'Impressum', copyright: '© {year} Waschplaner',
  },

  home: {
    title: 'Il piano della lavanderia per il tuo stabile',
    hero: {
      eyebrow: 'Per stabili con una lavanderia comune',
      title: 'Chi lava quando – finalmente chiaro.',
      text: 'Turni fissi come appuntamenti in agenda, distribuiti in modo equo e pronti in cinque minuti. Stampa il piano gratis per la lavanderia – oppure, con Plus, lascia che tutti i residenti prenotino online.',
      start: 'Configura lo stabile gratis', selfHost: 'Installalo tu',
      facts: ['Pronto in 5 minuti', 'Gratis da stampare', '{trial} giorni di Plus in regalo'],
    },
    demo: {
      house: 'Via Esempio 12', navPlan: 'Schedule', navMine: 'My laundry', range: '21–25 Sept', date: '{d}',
      title: 'Laundry room', week: 'Week 39', today: 'Today', now: 'Now', book: 'Book', free: 'Free',
      done: 'done', freeFrom: 'Free from {time}', bookRest: 'Book the rest', mine: 'Il tuo appartamento: {name}',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // the app's own words (English)
      flats: ['PT sinistra', 'PT destra', '1° sinistra', '1° destra', '2° piano'],
      hint: 'Ecco come tutti usano il piano con Plus (l’app è in inglese o in tedesco). Prova: tocca «Book» o una fascia oraria del tuo appartamento.',
      booked: 'Prenotato: {when}', freed: 'Liberato: {when}',
      label: 'Esempio di piano della lavanderia con cinque appartamenti',
    },
    steps: {
      eyebrow: 'Come funziona',
      title: 'Il tuo piano della lavanderia in tre passi',
      text: 'L’amministrazione configura lo stabile una sola volta. Poi il piano è appeso in lavanderia – oppure tutti lo usano online.',
      items: [
        { icon: 'wand', title: 'Configura lo stabile', text: 'In sei brevi passi una procedura guidata ti fa alcune domande su appartamenti, macchine e orari e propone turni fissi equi.' },
        { icon: 'print', title: 'Stampa', text: 'Due settimane per pagina A4, per ogni macchina o locale. Cambi qualcosa? Basta ristampare. Gratis fino a {printFree} settimane alla volta, con Plus un anno intero.' },
        { icon: 'users', title: 'Online per tutti', text: 'Con Plus i residenti scansionano il codice QR dell’avviso e prenotano, scambiano e disdicono da soli.' },
      ],
    },
    features: {
      eyebrow: 'Funzioni',
      title: 'Tutto ciò che serve a una lavanderia comune',
      text: 'Gratis per l’amministrazione, e con Plus per tutto lo stabile.',
      items: {
        plan: { title: 'Turni fissi come in agenda', text: 'Ogni martedì, ogni 2 settimane o il primo lunedì del mese – come appuntamenti ricorrenti. La procedura guidata distribuisce il tempo in modo equo.' },
        rooms: { title: 'La tua lavanderia, così com’è', text: 'Lavatrici, asciugatrici e locali di asciugatura: prenotati insieme come un’unica lavanderia, separatamente o in modo misto. Con orari propri per ogni giorno.' },
        print: { title: 'Da stampare e appendere', text: 'Due settimane per pagina A4, per macchina o locale. Gratis fino a {printFree} settimane alla volta, con Plus un anno intero. Dalla finestra di stampa puoi anche salvare il piano in PDF.' },
        book: { title: 'Prenota con un tocco', text: 'Ogni appartamento prenota da sé le fasce libere, quanto spesso lo consente il regolamento, e libera o sposta le proprie.' },
        finish: { title: 'Finito – libera il resto', text: 'Finito prima? Un tocco e il resto della fascia oraria è libero per tutti. Si può annullare finché nessuno lo prenota.' },
        takeover: { title: 'Regole eque per subentrare', text: 'Chi non si presenta può perdere la sua fascia dopo un tempo d’attesa. Il check-in la protegge. L’appartamento interessato viene avvisato.' },
        mail: { title: 'E-mail e abbonamento al calendario', text: 'Chi perde una fascia oraria lo viene a sapere via e-mail. E ogni appartamento vede le sue fasce nell’app del calendario.' },
        screen: { title: 'Vista pubblica del piano', text: 'Per uno schermo in lavanderia: il piano senza accesso, aggiornato ogni minuto.' },
      },
    },
    everyone: {
      eyebrow: 'Per tutto lo stabile',
      title: 'Abbastanza semplice per tutte le generazioni',
      text: 'Waschplaner è fatto per chi non vuole occuparsi di tecnologia.',
      items: [
        { icon: 'text-size', title: 'Testo grande se vuoi', text: 'Normale, grande o molto grande, per dispositivo. Pulsanti grandi e parole semplici invece del gergo.' },
        { icon: 'qr', title: 'Senza password', text: 'Scansiona il codice QR, inserisci il codice di accesso, fatto. La password serve solo a chi vuole accedere da altri dispositivi.' },
        { icon: 'shield', title: 'Solo i dati necessari', text: 'Gli appartamenti si chiamano «PT sinistra», non «Famiglia Rossi». Basta il nome; l’e-mail serve solo per accedere.' },
        { icon: 'globe', title: 'Deutsch e English', text: 'L’app è in tedesco e in inglese; ognuno sceglie la sua lingua. E chi non è online legge il piano su carta.' },
      ],
    },
    ways: {
      eyebrow: 'Gratis o Plus',
      title: 'Gratis su carta, online con Plus',
      text: 'Con Gratis stampi il piano. Con Plus tutti i residenti lo usano online – {trial} giorni in regalo, poi CHF {price} per appartamento all’anno. Oppure installi Waschplaner sul tuo server.',
      compare: 'Confronta tutte le funzioni',
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        { q: 'Qual è la differenza tra Gratis e Plus?', a: 'Con Gratis l’amministrazione crea il piano, modifica singoli giorni e lo stampa per la lavanderia, fino a {printFree} settimane alla volta. Con Plus tutti i residenti lo usano online: prenotare, liberare, subentrare – con e-mail e abbonamento al calendario. E puoi stampare un anno intero in una volta. [Confronta i prezzi](/pricing)' },
        { q: 'Bisogna installare un’app?', a: 'No. Waschplaner funziona nel browser, su telefono, tablet e computer. Se vuoi, aggiungilo al telefono con «Install as an app» o «Aggiungi alla schermata Home».' },
        { q: 'Tutti i residenti hanno bisogno di uno smartphone?', a: 'No. Con Plus basta un browser qualsiasi, e l’amministrazione può prenotare per ogni appartamento. Senza Plus il piano è comunque appeso su carta in lavanderia.' },
        { q: 'Cosa succede se qualcuno non usa la sua fascia oraria?', a: 'Lo decidete nel regolamento: gli altri possono subentrare dopo un tempo d’attesa (predefinito), in qualsiasi momento o mai. Chi ha fatto il check-in tiene sempre la sua fascia.' },
        { q: 'Posso installare Waschplaner sul mio server?', a: 'Sì. Il codice sorgente è pubblico. Con Docker, Waschplaner funziona sul tuo server con tutte le funzioni, e lì attivi Plus gratis. [Leggi la guida](/docs/self-hosting)' },
        { q: 'Waschplaner esiste in francese o in italiano?', a: 'Questo sito sì. L’app stessa è per ora in tedesco e in inglese.' },
        { q: 'Dove sono salvati i nostri dati?', a: 'Per Waschplaner ospitato da noi, sul nostro server; in self-hosting, sul tuo. Salviamo solo ciò che serve al piano e non trasmettiamo nulla. [Protezione dei dati](/privacy)' },
      ],
    },
    cta: {
      title: 'Pronti per un giorno di bucato senza stress?',
      text: 'Configura il piano della lavanderia in cinque minuti: gratis da stampare, con {trial} giorni di Plus in regalo.',
    },
  },

  pricing: {
    title: 'Prezzi',
    head: {
      eyebrow: 'Prezzi',
      title: 'Gratis su carta. Online per tutti con Plus.',
      text: 'Plus costa CHF {price} per appartamento all’anno, e i primi {trial} giorni sono in regalo. Nessun abbonamento, nessun costo per persona e nessun limite al numero di appartamenti o macchine.',
    },
    plans: {
      free: {
        name: 'Gratis', tag: 'Da stampare', price: 'CHF 0', unit: 'per sempre', cta: 'Configura lo stabile gratis',
        text: 'L’amministrazione crea il piano e lo stampa per la lavanderia.',
        points: ['Uno stabile, appartamenti e macchine a volontà', 'Configurazione in sei passi, con turni fissi equi', 'Modificare singoli giorni', 'Stampa: fino a {printFree} settimane alla volta, anche in PDF', 'I residenti non hanno bisogno di un account'],
      },
      plus: {
        name: 'Plus', tag: 'Online per tutti', price: 'CHF {price}', unit: 'per appartamento all’anno', cta: 'Prova {trial} giorni gratis',
        badge: '{trial} giorni in regalo',
        text: 'Tutti i residenti usano il piano online – e il server si occupa del resto.',
        points: ['Tutto ciò che offre Gratis', 'Stampare un anno intero in una volta', 'Invitare con codice QR e codici di accesso', 'Prenotare, liberare, subentrare, spostare, check-in', 'E-mail in caso di modifiche e abbonamento al calendario', 'Vista pubblica del piano per la lavanderia', 'Nessun abbonamento: nulla si rinnova da sé'],
      },
      self: {
        name: 'Self-hosting', tag: 'Il tuo server', price: 'CHF 0', unit: 'sul tuo server', cta: 'Leggi la guida',
        text: 'Tutte le funzioni, sul server che gestisci tu. Ti serve un server con Docker.',
        points: ['Tutte le funzioni di Plus', 'Attivare Plus senza pagamenti', 'Stabili a volontà', 'I vostri dati sul vostro server', 'Aggiornamenti e backup li fai tu'],
      },
    },
    principle: {
      eyebrow: 'Dov’è il confine',
      title: 'Gratis è il piano su carta. Con Plus tutti lo usano online.',
      text: 'Creare e stampare un piano richiede pochissima potenza di calcolo. Appena tutti prenotano online, il server lavora per ogni appartamento, giorno e notte. Per questo Plus si paga per appartamento – e costa solo quanto serve.',
      free: {
        title: 'Gratis: per l’amministrazione', tag: 'Gratis',
        items: ['Configurare lo stabile in sei passi', 'Distribuire i turni fissi in modo equo', 'Modificare singoli giorni', 'Stampare fino a {printFree} settimane alla volta', 'Tutto resta salvato'],
      },
      plus: {
        title: 'Plus: per tutto lo stabile', tag: 'Plus',
        items: [
          { icon: 'users', title: 'Ogni appartamento online', text: 'Accedere, prenotare, liberare: ogni appartamento usa il server, ogni giorno.' },
          { icon: 'mail', title: 'Inviare e-mail', text: 'Chi perde una fascia oraria riceve un’e-mail. Ogni invio ha un costo.' },
          { icon: 'calendar', title: 'Fornire gli abbonamenti al calendario', text: 'Le app di calendario interrogano il feed di ogni appartamento giorno e notte.' },
          { icon: 'screen', title: 'Tenere aggiornata la vista pubblica', text: 'Uno schermo in lavanderia ricarica il piano ogni minuto – 1440 volte al giorno.' },
          { icon: 'history', title: 'Conservare la cronologia', text: 'Chi ha prenotato o modificato cosa, e quando – conservato finché esiste lo stabile.' },
        ],
      },
    },
    journey: {
      eyebrow: 'Come funziona Plus',
      title: 'Provare, comprare, rinnovare – senza abbonamento',
      text: 'L’amministrazione compra Plus per un anno. Nulla si rinnova da sé, e nessuno ha sorprese.',
      steps: [
        { icon: 'gift', title: 'Prova {trial} giorni gratis', text: 'Una volta per stabile, senza dati di pagamento. La prova finisce da sé; {trialRemind} giorni prima arriva un promemoria.' },
        { icon: 'card', title: 'Compra per un anno', text: 'Sulla pagina di pagamento sicura di Stripe, con carta o TWINT. Se compri durante la prova, l’anno inizia solo quando finisce.' },
        { icon: 'bell', title: 'Rinnova in tempo', text: 'Ti avvisiamo via e-mail {remind} giorni prima della fine. Il rinnovo è possibile negli ultimi {renew} giorni e aggiunge un anno alla fine.' },
        { icon: 'eye', title: 'Non rinnovato?', text: 'I residenti possono ancora vedere il piano per {view} giorni. Poi lo stabile torna a Gratis: il piano resta salvato e si può stampare.' },
      ],
    },
    calc: {
      title: 'Quanto costa Plus per il tuo stabile?',
      label: 'Appartamenti nello stabile',
      perYear: 'all’anno per tutto lo stabile',
      perMonth: 'Cioè {amount} al mese.',
      note: 'Si paga per gli appartamenti attivi. L’amministrazione paga una volta all’anno; i residenti non pagano mai nulla.',
    },
    table: {
      title: 'Tutte le funzioni a confronto',
      feature: 'Funzione',
      groups: {
        plan: 'Pianificare e stampare', online: 'Online per tutti', server: 'Il server lavora per voi', ops: 'Pagamento e gestione',
      },
      rows: {
        house: 'Uno stabile con appartamenti e macchine a volontà',
        wizard: 'Configurazione in sei passi con turni fissi equi',
        edit: 'Modificare singoli giorni',
        print: 'Stampa (due settimane per pagina A4)',
        join: 'Invitare con codice QR e codici di accesso',
        booking: 'Prenotare, liberare, subentrare, spostare, check-in',
        rules: 'Regole per le prenotazioni extra e per subentrare',
        mine: 'Pagina personale, anche come app sul telefono',
        activity: 'Attività: chi ha modificato cosa, e quando',
        mail: 'E-mail quando le tue fasce orarie cambiano',
        ical: 'Abbonamento al calendario per ogni appartamento',
        screen: 'Vista pubblica del piano per la lavanderia',
        reminders: 'Promemoria prima della tua fascia oraria',
        stats: 'Statistiche ed esportazione in tabella',
        payment: 'Pagamento',
        hosting: 'Chi gestisce il server',
        updates: 'Aggiornamenti e backup',
        support: 'Aiuto',
      },
    },
    values: {
      manyHouses: 'Stabili a volontà', withSmtp: 'Con il tuo server di posta',
      printFree: '{printFree} settimane alla volta', printYear: 'Un anno intero',
      nothing: 'Niente', yearly: 'All’anno, con carta o TWINT', switch: 'Attivabile gratis',
      us: 'Noi', you: 'Tu, con Docker', auto: 'Automatici', yourself: 'Tu stesso',
      docs: 'Pagine di aiuto', email: 'Pagine di aiuto ed e-mail',
    },
    faq: {
      title: 'Domande su prezzo e pagamento',
      items: [
        { q: 'Chi paga Plus?', a: 'L’amministrazione, per tutto lo stabile. I residenti non pagano mai nulla e non inseriscono dati di pagamento.' },
        { q: 'Come si contano gli appartamenti?', a: 'Si paga per gli appartamenti attivi. Se durante l’anno se ne aggiunge uno, paghi, prima che inizi, la sua quota fino alla fine dell’anno (almeno CHF {min}). Nessun altro se ne accorge.' },
        { q: 'Plus si rinnova da sé?', a: 'No, Plus non è un abbonamento. Ti avvisiamo via e-mail {remind} giorni prima della fine. Se rinnovi negli ultimi {renew} giorni, il nuovo anno inizia solo quando finisce quello vecchio.' },
        { q: 'Cosa succede quando Plus finisce?', a: 'I residenti possono ancora vedere il piano per {view} giorni, ma senza poter prenotare. Poi il vostro stabile torna a Gratis: continui a modificare e stampare il piano, e tutto resta salvato. Puoi ricomprare Plus in qualsiasi momento.' },
        { q: 'Come paghiamo?', a: 'Sulla pagina di pagamento sicura di Stripe, con carta o TWINT. Non vediamo mai i dati della carta. Scegli Plus alla fine della configurazione o più tardi sotto «Manage → Plus».' },
        { q: 'La versione self-hosting ha delle limitazioni?', a: 'No. In self-hosting hai tutte le funzioni, e Plus è un interruttore che non costa nulla. In cambio ti occupi di server, aggiornamenti, backup e server di posta. [Leggi la guida](/docs/self-hosting)' },
      ],
    },
  },

  docs: {
    appLanguage: 'L’app è in tedesco e in inglese. I pulsanti sono citati con il loro nome inglese, p. es. «Book»; il [glossario](/docs/glossary) indica anche il tedesco.',
    title: 'Aiuto e documentazione',
    intro: 'Come configurare Waschplaner, usarlo ogni giorno e installarlo sul tuo server.',
    nav: 'Pagine di aiuto',
    prev: 'Indietro', next: 'Avanti',
    sections: { use: 'Usare Waschplaner', run: 'Self-hosting', more: 'Altro' },
    notFound: 'Questa pagina di aiuto non esiste.',
    edit: 'Qualcosa non è chiaro? Scrivici a [{email}](mailto:{email}).',
  },
  legal: { privacy: 'Protezione dei dati', imprint: 'Impressum' },
  notFound: {
    title: 'Questa pagina non esiste',
    text: 'Forse l’indirizzo è cambiato. Trovi tutto nella pagina iniziale.',
    home: 'Vai alla pagina iniziale', docs: 'Vai all’aiuto',
  },
}
