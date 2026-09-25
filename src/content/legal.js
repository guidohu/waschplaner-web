// Privacy policy and imprint, in the same blocks as the help pages.
// [Square brackets] mark details the operator must fill in before going live.
export default {
  de: {
    privacy: {
      title: 'Datenschutz',
      summary: 'Welche Daten Waschplaner speichert, wozu, und wie lange.',
      blocks: [
        { p: 'Waschplaner speichert nur, was der Plan braucht. Diese Erklärung gilt für diese Website und für den gehosteten Waschplaner unter [{app}]({app}). Für selbst betriebene Server ist die jeweilige Verwaltung verantwortlich.' },
        { h2: 'Verantwortlich' },
        { p: '[Name des Betreibers], [Adresse], [PLZ Ort], Schweiz. E-Mail: [{email}](mailto:{email}).' },
        { h2: 'Diese Website' },
        { p: 'Die Website setzt keine Cookies, verwendet kein Tracking und lädt keine Schriften oder Skripte von anderen Anbietern. Deine Sprachwahl wird nur in deinem Browser gespeichert. Der Webserver protokolliert zur Sicherheit IP-Adresse, Zeitpunkt und aufgerufene Seite und löscht diese Protokolle nach [14] Tagen.' },
        { h2: 'Der gehostete Waschplaner' },
        {
          table: {
            head: ['Daten', 'Wozu'],
            rows: [
              ['Name des Hauses, Bezeichnungen der Wohnungen', 'Damit der Plan zeigt, wem welches Zeitfenster gehört.'],
              ['Vorname', 'Damit die Verwaltung sieht, wer zu welcher Wohnung gehört.'],
              ['E-Mail und Passwort (verschlüsselt)', 'Nur für die Verwaltung und für alle, die sich auf weiteren Geräten anmelden wollen. Bewohner:innen brauchen keine E-Mail.'],
              ['Buchungen, Notizen und Aktivitäten', 'Damit der Plan funktioniert und die Verwaltung nachvollziehen kann, was sich geändert hat.'],
              ['Sitzungs-Cookie', 'Damit du angemeldet bleibst. Es ist technisch nötig und dient keinem anderen Zweck.'],
            ],
          },
        },
        { h2: 'Wie lange' },
        { p: 'Mit Gratis bewahren wir vergangene Buchungen 4 Wochen und Aktivitäten 30 Tage auf, mit Plus bis zur Löschung des Hauses. Wenn die Verwaltung das Haus löscht, löschen wir alle Daten des Hauses innert [30] Tagen, auch aus den Sicherungen.' },
        { h2: 'Weitergabe' },
        { p: 'Wir verkaufen keine Daten und geben sie nicht zu Werbezwecken weiter. Wir arbeiten mit diesen Dienstleistern: [Hosting-Anbieter, Serverstandort] für den Betrieb und [E-Mail-Anbieter] für den Versand von E-Mails.' },
        { h2: 'Deine Rechte' },
        { p: 'Du kannst Auskunft über deine Daten verlangen, sie berichtigen oder löschen lassen. Schreib uns an [{email}](mailto:{email}). Es gilt das Schweizer Datenschutzgesetz (DSG) und, wo anwendbar, die DSGVO.' },
        { p: 'Stand: [Datum]' },
      ],
    },
    imprint: {
      title: 'Impressum',
      summary: 'Wer hinter Waschplaner steht.',
      blocks: [
        { h2: 'Betreiber' },
        { p: '[Name des Betreibers]\n[Adresse]\n[PLZ Ort], Schweiz' },
        { h2: 'Kontakt' },
        { p: 'E-Mail: [{email}](mailto:{email})' },
        { h2: 'Handelsregister' },
        { p: '[Firmennummer (UID) oder «nicht eingetragen»]' },
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
        { p: '[Operator name], [Address], [Postcode Town], Switzerland. E-mail: [{email}](mailto:{email}).' },
        { h2: 'This website' },
        { p: 'The website sets no cookies, uses no tracking and loads no fonts or scripts from other providers. Your language choice is stored only in your browser. For security, the web server logs the IP address, time and page requested, and deletes these logs after [14] days.' },
        { h2: 'Hosted Waschplaner' },
        {
          table: {
            head: ['Data', 'Why'],
            rows: [
              ['House name, flat labels', 'So the schedule shows who has which time slot.'],
              ['First name', 'So the administrator can see who belongs to which flat.'],
              ['E-mail and password (encrypted)', 'Only for the administrator and anyone who wants to log in on other devices. Residents do not need an e-mail address.'],
              ['Bookings, notes and activity', 'So the schedule works and the administrator can see what changed.'],
              ['Session cookie', 'So you stay logged in. It is technically necessary and serves no other purpose.'],
            ],
          },
        },
        { h2: 'How long' },
        { p: 'With Free we keep past bookings for 4 weeks and activity for 30 days; with Plus until the house is deleted. When the administrator deletes the house, we delete all its data within [30] days, including from backups.' },
        { h2: 'Sharing' },
        { p: 'We do not sell data or share it for advertising. We work with these providers: [hosting provider, server location] to run the service and [e-mail provider] to send e-mails.' },
        { h2: 'Your rights' },
        { p: 'You can ask what data we hold about you, and have it corrected or deleted. Write to [{email}](mailto:{email}). The Swiss Federal Act on Data Protection (FADP) applies and, where applicable, the GDPR.' },
        { p: 'Last updated: [date]' },
      ],
    },
    imprint: {
      title: 'Imprint',
      summary: 'Who is behind Waschplaner.',
      blocks: [
        { h2: 'Operator' },
        { p: '[Operator name]\n[Address]\n[Postcode Town], Switzerland' },
        { h2: 'Contact' },
        { p: 'E-mail: [{email}](mailto:{email})' },
        { h2: 'Commercial register' },
        { p: '[Company number (UID) or “not registered”]' },
        { h2: 'Liability' },
        { p: 'We check the content of this website carefully but cannot guarantee that it is correct and complete. The operators of linked pages are responsible for their content.' },
      ],
    },
  },
}
