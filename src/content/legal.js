// Privacy policy and imprint, in the same blocks as the help pages.
// The operator's details come from OPERATOR and LEGAL in site.js. Anything not
// filled in yet shows as [label]; the release check fails while one remains.
import { LEGAL, OPERATOR } from '../site'

const missing = (label) => `[${label}]`
const value = (v, label) => (v === '' || v == null ? missing(label) : String(v))
const name = (label) => value(OPERATOR.name, label)
const address = (label, separator) => (OPERATOR.address.length ? OPERATOR.address.join(separator) : missing(label))

export default {
  de: {
    privacy: {
      title: 'Datenschutz',
      summary: 'Welche Daten Waschplaner speichert, wozu und wie lange.',
      blocks: [
        { p: 'Waschplaner speichert nur, was der Plan braucht. Diese Erklärung gilt für diese Website und für den gehosteten Waschplaner unter [{app}]({app}). Für selbst betriebene Server ist die jeweilige Verwaltung verantwortlich.' },
        { h2: 'Verantwortlich' },
        { p: `${name('Name des Betreibers')}, ${address('Adresse, PLZ Ort', ', ')}, Schweiz. E-Mail: [{email}](mailto:{email}).` },
        { h2: 'Diese Website' },
        { p: `Die Website setzt keine Cookies, verwendet kein Tracking und lädt keine Schriften oder Skripte von anderen Anbietern. Deine Sprachwahl wird nur in deinem Browser gespeichert. Der Webserver protokolliert zur Sicherheit IP-Adresse, Zeitpunkt und aufgerufene Seite und löscht diese Protokolle nach ${LEGAL.logDays} Tagen.` },
        { h2: 'Der Planer im Browser' },
        { p: 'Der Planer läuft ganz in deinem Browser. Was du eingibst (Haus, Wohnungen, Zeiten, Plan), speichert er nur in deinem Browser, damit es beim nächsten Besuch noch da ist. Nichts davon wird an uns oder an einen anderen Server geschickt. Du löschst es mit «Neu beginnen» oder indem du die Websitedaten in deinem Browser löschst.' },
        { h2: 'Der gehostete Waschplaner' },
        { p: 'Die Online-Version ist noch nicht verfügbar. Sobald sie startet, gilt Folgendes:' },
        {
          table: {
            head: ['Daten', 'Wozu'],
            rows: [
              ['Name des Hauses, Bezeichnungen der Wohnungen', 'Damit der Plan zeigt, wem welches Zeitfenster gehört.'],
              ['Vorname', 'Damit die Verwaltung sieht, wer zu welcher Wohnung gehört.'],
              ['E-Mail und Passwort (das Passwort verschlüsselt)', 'Nur für die Verwaltung und für alle, die sich auf weiteren Geräten anmelden wollen. Bewohner:innen brauchen keine E-Mail.'],
              ['Buchungen, Notizen und Aktivitäten', 'Damit der Plan funktioniert und die Verwaltung nachvollziehen kann, was sich geändert hat.'],
              ['Zahlungen für Plus', 'Datum, Betrag und Zeitraum, damit Plus für die bezahlte Zeit gilt. Karten- und TWINT-Angaben gehen direkt an Stripe; wir sehen sie nicht.'],
              ['Sitzungs-Cookie', 'Damit du angemeldet bleibst. Es ist technisch nötig und dient keinem anderen Zweck.'],
            ],
          },
        },
        { h2: 'Wie lange' },
        { p: `Wir bewahren die Daten eines Hauses auf, solange es besteht, auch wenn es von Plus zu Gratis wechselt. Wenn die Verwaltung das Haus löscht, löschen wir alle seine Daten innert ${LEGAL.deleteDays} Tagen, auch aus den Sicherungen. Zahlungsbelege bewahren wir so lange auf, wie es das Gesetz verlangt.` },
        { h2: 'Weitergabe' },
        { p: `Wir verkaufen keine Daten und geben sie nicht zu Werbezwecken weiter. Wir arbeiten mit diesen Dienstleistern: ${value(LEGAL.hosting, 'Hosting-Anbieter, Serverstandort')} für den Betrieb, ${value(LEGAL.mailProvider, 'E-Mail-Anbieter')} für den Versand von E-Mails und Stripe (${value(LEGAL.stripe, 'Vertragspartner')}) für Zahlungen.` },
        { h2: 'Deine Rechte' },
        { p: 'Du kannst Auskunft über deine Daten verlangen, sie berichtigen oder löschen lassen. Schreib uns an [{email}](mailto:{email}). Es gelten das Schweizer Datenschutzgesetz (DSG) und, wo anwendbar, die DSGVO.' },
        { p: `Stand: ${value(LEGAL.updated, 'Datum')}` },
      ],
    },
    imprint: {
      title: 'Impressum',
      summary: 'Wer hinter Waschplaner steht.',
      blocks: [
        { h2: 'Betreiber' },
        { p: `${name('Name des Betreibers')}\n${address('Adresse, PLZ Ort', '\n')}\nSchweiz` },
        { h2: 'Kontakt' },
        { p: 'E-Mail: [{email}](mailto:{email})' },
        { h2: 'Handelsregister' },
        { p: `${OPERATOR.uid ? `UID: ${OPERATOR.uid}` : 'Nicht eingetragen'}` },
        { h2: 'Haftung' },
        { p: 'Wir prüfen die Inhalte dieser Website sorgfältig, übernehmen aber keine Gewähr für ihre Richtigkeit und Vollständigkeit. Für die Inhalte verlinkter Seiten sind deren Betreiber verantwortlich.' },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy',
      summary: 'What data Waschplaner stores, why, and for how long.',
      blocks: [
        { p: 'Waschplaner only stores what the schedule needs. This policy covers this website and hosted Waschplaner at [{app}]({app}). For self-hosted servers, their administrator is responsible.' },
        { h2: 'Controller' },
        { p: `${name('Operator name')}, ${address('Address, postcode and town', ', ')}, Switzerland. E-mail: [{email}](mailto:{email}).` },
        { h2: 'This website' },
        { p: `The website sets no cookies, uses no tracking and loads no fonts or scripts from other providers. Your language choice is stored only in your browser. For security, the web server logs the IP address, time and page requested, and deletes these logs after ${LEGAL.logDays} days.` },
        { h2: 'The planner in your browser' },
        { p: 'The planner runs entirely in your browser. What you enter (house, flats, times, schedule) is stored only in your browser, so it is still there next time. None of it is sent to us or to any other server. You delete it with “Start over” or by clearing this site’s data in your browser.' },
        { h2: 'Hosted Waschplaner' },
        { p: 'The online version is not available yet. Once it starts, the following applies:' },
        {
          table: {
            head: ['Data', 'Why'],
            rows: [
              ['House name, flat labels', 'So the schedule shows who has which time slot.'],
              ['First name', 'So the administrator can see who belongs to which flat.'],
              ['E-mail and password (the password encrypted)', 'Only for the administrator and anyone who wants to log in on other devices. Residents do not need an e-mail address.'],
              ['Bookings, notes and activity', 'So the schedule works and the administrator can see what changed.'],
              ['Payments for Plus', 'Date, amount and period, so Plus applies for the time paid. Card and TWINT details go straight to Stripe; we never see them.'],
              ['Session cookie', 'So you stay logged in. It is technically necessary and serves no other purpose.'],
            ],
          },
        },
        { h2: 'How long' },
        { p: `We keep a house’s data for as long as the house exists, even when it moves from Plus to Free. When the administrator deletes the house, we delete all its data within ${LEGAL.deleteDays} days, including from backups. We keep payment records for as long as the law requires.` },
        { h2: 'Sharing' },
        { p: `We do not sell data or share it for advertising. We work with these providers: ${value(LEGAL.hosting, 'hosting provider, server location')} to run the service, ${value(LEGAL.mailProvider, 'e-mail provider')} to send e-mails and Stripe (${value(LEGAL.stripe, 'contracting entity')}) for payments.` },
        { h2: 'Your rights' },
        { p: 'You can ask what data we hold about you, and have it corrected or deleted. Write to [{email}](mailto:{email}). The Swiss Federal Act on Data Protection (FADP) and, where applicable, the GDPR apply.' },
        { p: `Last updated: ${value(LEGAL.updated, 'date')}` },
      ],
    },
    imprint: {
      title: 'Imprint',
      summary: 'Who is behind Waschplaner.',
      blocks: [
        { h2: 'Operator' },
        { p: `${name('Operator name')}\n${address('Address, postcode and town', '\n')}\nSwitzerland` },
        { h2: 'Contact' },
        { p: 'E-mail: [{email}](mailto:{email})' },
        { h2: 'Commercial register' },
        { p: `${OPERATOR.uid ? `UID: ${OPERATOR.uid}` : 'Not registered'}` },
        { h2: 'Liability' },
        { p: 'We check the content of this website carefully but cannot guarantee that it is correct and complete. The operators of linked pages are responsible for their content.' },
      ],
    },
  },
  fr: {
    privacy: {
      title: 'Protection des données',
      summary: 'Quelles données Waschplaner enregistre, pourquoi et pour combien de temps.',
      blocks: [
        { p: 'Waschplaner n’enregistre que ce dont le planning a besoin. Cette déclaration s’applique à ce site et à Waschplaner hébergé sous [{app}]({app}). Pour les serveurs auto-hébergés, c’est leur administration qui est responsable.' },
        { h2: 'Responsable' },
        { p: `${name('Nom de l’exploitant')}, ${address('Adresse, NPA localité', ', ')}, Suisse. E-mail : [{email}](mailto:{email}).` },
        { h2: 'Ce site' },
        { p: `Le site ne dépose aucun cookie, n’utilise aucun suivi et ne charge ni polices ni scripts d’autres fournisseurs. Votre choix de langue n’est enregistré que dans votre navigateur. Pour des raisons de sécurité, le serveur web consigne l’adresse IP, l’heure et la page consultée, et supprime ces journaux après ${LEGAL.logDays} jours.` },
        { h2: 'Le planificateur dans le navigateur' },
        { p: 'Le planificateur fonctionne entièrement dans votre navigateur. Ce que vous saisissez (immeuble, appartements, horaires, planning) n’est enregistré que dans votre navigateur, pour être encore là à votre prochaine visite. Rien de tout cela n’est envoyé à nous ni à un autre serveur. Vous l’effacez avec « Recommencer » ou en supprimant les données de ce site dans votre navigateur.' },
        { h2: 'Waschplaner hébergé' },
        { p: 'La version en ligne n’est pas encore disponible. Dès son lancement, ce qui suit s’applique :' },
        {
          table: {
            head: ['Données', 'Pourquoi'],
            rows: [
              ['Nom de l’immeuble, noms des appartements', 'Pour que le planning montre à qui appartient chaque créneau.'],
              ['Prénom', 'Pour que l’administration voie qui appartient à quel appartement.'],
              ['E-mail et mot de passe (chiffré)', 'Seulement pour l’administration et pour qui veut se connecter sur d’autres appareils. Les habitant·e·s n’ont pas besoin d’e-mail.'],
              ['Réservations, notes et activité', 'Pour que le planning fonctionne et que l’administration puisse voir ce qui a changé.'],
              ['Paiements pour Plus', 'Date, montant et période, pour que Plus s’applique pendant la durée payée. Les données de carte et TWINT vont directement à Stripe ; nous ne les voyons pas.'],
              ['Cookie de session', 'Pour que vous restiez connecté·e. Il est techniquement nécessaire et ne sert à rien d’autre.'],
            ],
          },
        },
        { h2: 'Durée de conservation' },
        { p: `Nous conservons les données d’un immeuble tant qu’il existe, même s’il passe de Plus à Gratuit. Quand l’administration supprime l’immeuble, nous supprimons toutes ses données dans les ${LEGAL.deleteDays} jours, y compris des sauvegardes. Nous conservons les justificatifs de paiement aussi longtemps que la loi l’exige.` },
        { h2: 'Transmission' },
        { p: `Nous ne vendons pas de données et ne les transmettons pas à des fins publicitaires. Nous travaillons avec ces prestataires : ${value(LEGAL.hosting, 'hébergeur, lieu du serveur')} pour l’exploitation, ${value(LEGAL.mailProvider, 'fournisseur de messagerie')} pour l’envoi des e-mails et Stripe (${value(LEGAL.stripe, 'partenaire contractuel')}) pour les paiements.` },
        { h2: 'Vos droits' },
        { p: 'Vous pouvez demander quelles données nous détenons sur vous, et les faire corriger ou supprimer. Écrivez-nous à [{email}](mailto:{email}). La loi suisse sur la protection des données (LPD) et, le cas échéant, le RGPD s’appliquent.' },
        { p: `État : ${value(LEGAL.updated, 'date')}` },
      ],
    },
    imprint: {
      title: 'Mentions légales',
      summary: 'Qui se cache derrière Waschplaner.',
      blocks: [
        { h2: 'Exploitant' },
        { p: `${name('Nom de l’exploitant')}\n${address('Adresse, NPA localité', '\n')}\nSuisse` },
        { h2: 'Contact' },
        { p: 'E-mail : [{email}](mailto:{email})' },
        { h2: 'Registre du commerce' },
        { p: `${OPERATOR.uid ? `IDE : ${OPERATOR.uid}` : 'Non inscrit'}` },
        { h2: 'Responsabilité' },
        { p: 'Nous vérifions soigneusement le contenu de ce site, mais ne pouvons garantir qu’il soit exact et complet. Les exploitants des pages liées sont responsables de leur contenu.' },
      ],
    },
  },
  it: {
    privacy: {
      title: 'Protezione dei dati',
      summary: 'Quali dati salva Waschplaner, perché e per quanto tempo.',
      blocks: [
        { p: 'Waschplaner salva solo ciò che serve al piano. Questa informativa vale per questo sito e per Waschplaner ospitato su [{app}]({app}). Per i server in self-hosting è responsabile la rispettiva amministrazione.' },
        { h2: 'Titolare' },
        { p: `${name('Nome del gestore')}, ${address('Indirizzo, NAP località', ', ')}, Svizzera. E-mail: [{email}](mailto:{email}).` },
        { h2: 'Questo sito' },
        { p: `Il sito non imposta cookie, non usa tracciamento e non carica font o script di altri fornitori. La tua scelta della lingua è salvata solo nel tuo browser. Per sicurezza, il server web registra indirizzo IP, ora e pagina richiesta, e cancella questi log dopo ${LEGAL.logDays} giorni.` },
        { h2: 'Il pianificatore nel browser' },
        { p: 'Il pianificatore funziona interamente nel tuo browser. Ciò che inserisci (palazzo, appartamenti, orari, piano) viene salvato solo nel tuo browser, così lo ritrovi alla prossima visita. Niente di tutto ciò viene inviato a noi o a un altro server. Lo cancelli con «Ricomincia» o cancellando i dati di questo sito nel tuo browser.' },
        { h2: 'Waschplaner ospitato' },
        { p: 'La versione online non è ancora disponibile. Quando partirà, vale quanto segue:' },
        {
          table: {
            head: ['Dati', 'Perché'],
            rows: [
              ['Nome dello stabile, nomi degli appartamenti', 'Perché il piano mostri a chi appartiene ogni fascia oraria.'],
              ['Nome', 'Perché l’amministrazione veda chi appartiene a quale appartamento.'],
              ['E-mail e password (cifrata)', 'Solo per l’amministrazione e per chi vuole accedere da altri dispositivi. I residenti non hanno bisogno di un’e-mail.'],
              ['Prenotazioni, note e attività', 'Perché il piano funzioni e l’amministrazione possa vedere cosa è cambiato.'],
              ['Pagamenti per Plus', 'Data, importo e periodo, perché Plus valga per il tempo pagato. I dati della carta e di TWINT vanno direttamente a Stripe; noi non li vediamo.'],
              ['Cookie di sessione', 'Perché tu resti connesso. È tecnicamente necessario e non serve ad altro.'],
            ],
          },
        },
        { h2: 'Per quanto tempo' },
        { p: `Conserviamo i dati di uno stabile finché esiste, anche se passa da Plus a Gratis. Quando l’amministrazione cancella lo stabile, cancelliamo tutti i suoi dati entro ${LEGAL.deleteDays} giorni, anche dai backup. Conserviamo i giustificativi di pagamento per il tempo richiesto dalla legge.` },
        { h2: 'Trasmissione' },
        { p: `Non vendiamo dati e non li trasmettiamo a scopi pubblicitari. Lavoriamo con questi fornitori: ${value(LEGAL.hosting, 'hosting, ubicazione del server')} per la gestione, ${value(LEGAL.mailProvider, 'fornitore di posta')} per l’invio delle e-mail e Stripe (${value(LEGAL.stripe, 'controparte contrattuale')}) per i pagamenti.` },
        { h2: 'I tuoi diritti' },
        { p: 'Puoi chiedere quali dati abbiamo su di te, e farli correggere o cancellare. Scrivici a [{email}](mailto:{email}). Si applicano la legge svizzera sulla protezione dei dati (LPD) e, dove applicabile, il GDPR.' },
        { p: `Stato: ${value(LEGAL.updated, 'data')}` },
      ],
    },
    imprint: {
      title: 'Impressum',
      summary: 'Chi c’è dietro Waschplaner.',
      blocks: [
        { h2: 'Gestore' },
        { p: `${name('Nome del gestore')}\n${address('Indirizzo, NAP località', '\n')}\nSvizzera` },
        { h2: 'Contatto' },
        { p: 'E-mail: [{email}](mailto:{email})' },
        { h2: 'Registro di commercio' },
        { p: `${OPERATOR.uid ? `IDI: ${OPERATOR.uid}` : 'Non iscritto'}` },
        { h2: 'Responsabilità' },
        { p: 'Verifichiamo con cura i contenuti di questo sito, ma non possiamo garantirne l’esattezza e la completezza. I gestori delle pagine collegate sono responsabili dei loro contenuti.' },
      ],
    },
  },
}
