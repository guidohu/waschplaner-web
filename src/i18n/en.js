// English texts of the website (British spelling). Words as in the app: see
// the app's frontend/GLOSSARY.md. Inline markup: **bold**, `code`, [label](url).
export default {
  common: {
    language: 'Language', decrease: 'Fewer', increase: 'More', copy: 'Copy', copied: 'Copied',
    soon: 'Soon', included: 'Included', notIncluded: 'Not included', learnMore: 'Learn more',
  },
  nav: {
    features: 'Features', pricing: 'Pricing', selfHost: 'Self-hosting', docs: 'Help',
    login: 'Log in', start: 'Set up your house', menu: 'Menu', close: 'Close', skip: 'Skip to content',
    main: 'Main navigation', home: 'Waschplaner – home',
  },
  footer: {
    tagline: 'The laundry schedule for houses where several flats share the laundry room.',
    product: 'Product', selfHost: 'Self-hosting', legal: 'Legal',
    guide: 'Guide', config: 'Configuration', source: 'Source code', contact: 'Contact',
    privacy: 'Privacy', imprint: 'Imprint', copyright: '© {year} Waschplaner',
  },

  home: {
    title: 'The laundry schedule for your house',
    hero: {
      eyebrow: 'For houses with a shared laundry room',
      title: 'Who does the laundry when – sorted.',
      text: 'Regular times like calendar events, free time slots booked with one tap, and whoever finishes early frees the rest. No more notes on the laundry room door.',
      start: 'Set up your house for free', selfHost: 'Self-host',
      facts: ['Set up in 5 minutes', 'No app store', 'No password for residents'],
    },
    demo: {
      house: '12 Park Road', navPlan: 'Schedule', navMine: 'My laundry', range: '21–25 Sept', date: '{d}',
      title: 'Laundry room', week: 'Week 39', today: 'Today', now: 'Now', book: 'Book', free: 'Free',
      done: 'done', freeFrom: 'Free from {time}', bookRest: 'Book the rest', mine: 'Your flat: {name}',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      flats: ['Ground left', 'Ground right', '1st left', '1st right', '2nd floor'],
      hint: 'Try it: tap “Book” or one of your flat’s time slots.',
      booked: 'Booked: {when}', freed: 'Freed up: {when}',
      label: 'Example of a laundry schedule with five flats',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps to your laundry schedule',
      text: 'The administrator sets up the house once. After that, everyone organises themselves.',
      items: [
        { icon: 'wand', title: 'Set up the house', text: 'A wizard asks about flats, machines and times in six short steps and suggests a fair regular schedule.' },
        { icon: 'print', title: 'Put up the poster', text: 'Print the poster with the QR code for the laundry room. Each flat gets a card with its 6-digit access code.' },
        { icon: 'users', title: 'Everyone books', text: 'Residents scan the code and they are in. They see their regular times, book free time slots and free up what they do not need.' },
      ],
    },
    features: {
      eyebrow: 'Features',
      title: 'Everything a shared laundry room needs',
      text: 'And nothing that just gets in the way.',
      items: [
        { icon: 'repeat', title: 'A regular schedule like a calendar', text: 'Every Tuesday, every 2 weeks or the first Monday of the month – like repeating events. The wizard shares the time out fairly.' },
        { icon: 'plus-circle', title: 'Book with one tap', text: 'Any flat can book free time slots as extras, as often as the house rules allow.' },
        { icon: 'check-circle', title: 'Done – free the rest', text: 'Finished early? One tap and the rest of the time slot is free for everyone. You can take it back until someone books it.' },
        { icon: 'bolt', title: 'Fair rules for taking over', text: 'If nobody shows up, the time slot can be taken over after a grace period. Checking in protects it. The flat concerned is notified.' },
        { icon: 'layers', title: 'Your laundry room, as it is', text: 'Washing machines, tumble dryers and drying rooms: booked together as a laundry room, separately or mixed. With their own times per day.' },
        { icon: 'user', title: 'My laundry', text: 'Each flat sees at a glance what comes next, its regular times and its notifications.' },
        { icon: 'phone', title: 'Like an app on your phone', text: 'Waschplaner runs in the browser and can be added to the home screen. The schedule even opens without internet.' },
        { icon: 'globe', title: 'Deutsch and English', text: 'Everyone picks their own language. The schedule stays the same for all.' },
      ],
    },
    everyone: {
      eyebrow: 'For everyone in the house',
      title: 'Simple enough for every generation',
      text: 'Waschplaner is made for people who would rather not think about technology.',
      items: [
        { icon: 'text-size', title: 'Large text if you like', text: 'Normal, Large or Extra large, per device. Big buttons and plain words instead of jargon.' },
        { icon: 'qr', title: 'No password', text: 'Scan the QR code, enter the access code, done. Only people who want to log in on other devices need a password.' },
        { icon: 'shield', title: 'Only the data the schedule needs', text: 'Flats are called “Ground left”, not “The Smiths”. First names are enough; e-mail is only for logging in.' },
        { icon: 'moon', title: 'Light and dark', text: 'Waschplaner follows your device’s setting and stays easy to read in both.' },
      ],
    },
    ways: {
      eyebrow: 'Hosted or self-hosted',
      title: 'Start for free, add more when you need it',
      text: 'The schedule itself is always free. What our server does for you on top costs 1 franc per flat per year. Or you run Waschplaner yourself.',
      compare: 'Compare all features',
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Do we need to install an app?', a: 'No. Waschplaner runs in the browser on phones, tablets and computers. If you like, add it to your home screen like an app.' },
        { q: 'Does every resident need a smartphone?', a: 'No. Any browser will do. And anyone who is not online at all can ask the administrator: they can book for any flat.' },
        { q: 'What happens if someone does not use their time slot?', a: 'You decide in the rules: others may take it over after a grace period (the default), at any time, or never. Whoever has checked in always keeps their time slot.' },
        { q: 'Can we have several washing machines and a drying room?', a: 'Yes. Book everything together as one laundry room, each machine separately, or mixed – for example washer and dryer together, the drying room separately.' },
        { q: 'Can I run Waschplaner myself?', a: 'Yes. The source code is public. With Docker, Waschplaner runs on your own server with one command and every feature. [Read the guide](/docs/self-hosting)' },
        { q: 'Where is our data stored?', a: 'For hosted Waschplaner on our server, for self-hosted on yours. We only store what the schedule needs and never pass anything on. [Privacy](/privacy)' },
      ],
    },
    cta: {
      title: 'Ready for a relaxed laundry day?',
      text: 'Set up your laundry schedule in five minutes. Free, no payment details needed.',
    },
  },

  pricing: {
    title: 'Pricing',
    head: {
      eyebrow: 'Pricing',
      title: 'The schedule is free. The extras cost 1 franc per flat per year.',
      text: 'No cost per person, no payment details to get started and no limit on flats or machines.',
    },
    plans: {
      free: {
        name: 'Free', price: 'CHF 0', unit: 'for ever', cta: 'Set up your house for free',
        text: 'Everything that happens in the house when someone opens the schedule.',
        points: ['One house, any number of flats and machines', 'Regular schedule, booking, taking over, checking in', 'Poster with QR code and access codes', 'In-app notifications', 'History of the last {weeks} weeks'],
      },
      plus: {
        name: 'Plus', price: 'CHF 1', unit: 'per flat per year', cta: 'Start with Plus', badge: 'Every feature',
        text: 'Plus everything our server does and keeps for you on its own.',
        points: ['Everything in Free', 'An e-mail when someone takes over your time slot', 'Calendar feed for every flat', 'Live screen for the laundry room', 'Full history and all activity', 'Soon: reminders and statistics'],
      },
      self: {
        name: 'Self-hosted', price: 'CHF 0', unit: 'on your server', cta: 'Read the guide',
        text: 'Every feature, run by you. You need a server with Docker.',
        points: ['Everything in Plus', 'Any number of houses', 'Your data on your server', 'E-mails through your own mail server', 'You do updates and backups yourself'],
      },
    },
    principle: {
      eyebrow: 'Where the line is',
      title: 'Free is what happens when someone taps. Plus is what the server does on its own.',
      text: 'Opening the schedule, booking or freeing up costs us almost nothing. Anything that runs around the clock or piles up over the years is different. That is exactly what Plus covers.',
      tap: {
        title: 'When someone taps', tag: 'Free',
        items: ['View the schedule and book', 'Free up, take over, check in', 'Done – free the rest', 'In-app notifications', 'Manage the house'],
      },
      server: {
        title: 'When nobody is looking', tag: 'Plus',
        items: [
          { icon: 'mail', title: 'Sending e-mails', text: 'Every e-mail costs delivery and upkeep of a trusted sender address.' },
          { icon: 'calendar', title: 'Serving calendar feeds', text: 'Calendar apps check each flat’s feed around the clock, even when nobody is looking.' },
          { icon: 'monitor', title: 'Keeping the live screen current', text: 'The screen in the laundry room reloads the schedule every minute – 1,440 times a day.' },
          { icon: 'history', title: 'Keeping the history', text: 'Every booking and every change needs storage, year after year.' },
          { icon: 'bell', title: 'Reminding (soon)', text: 'Reminders before your time slot need a service that keeps an eye on the clock.' },
        ],
      },
    },
    calc: {
      title: 'What does Plus cost for your house?',
      label: 'Flats in the house',
      perYear: 'per year for the whole house',
      perMonth: 'That is {amount} a month.',
      note: 'The administrator pays once a year. Residents never pay anything.',
    },
    table: {
      title: 'All features compared',
      feature: 'Feature',
      groups: {
        plan: 'Schedule and booking', server: 'The server works for you', history: 'History', ops: 'Running it',
      },
      rows: {
        house: 'One house with any number of flats and machines',
        wizard: 'Six-step setup, poster and access codes',
        booking: 'Regular schedule, book, free up, take over, check in',
        rules: 'Rules for extra bookings and taking over',
        inApp: 'In-app notifications',
        pwa: 'Add to your phone, schedule without internet',
        passwordMail: '“Forgot password” by e-mail',
        mail: 'E-mail when your time slots change',
        ical: 'Calendar feed for every flat',
        kiosk: 'Live screen for the laundry room',
        reminders: 'Reminder before your time slot',
        stats: 'Statistics and spreadsheet export',
        bookings: 'Past bookings',
        log: 'Administrator activity',
        hosting: 'Who runs the server',
        updates: 'Updates and backups',
        support: 'Help',
      },
    },
    values: {
      manyHouses: 'Any number of houses', withSmtp: 'With your own mail server',
      weeks: '{weeks} weeks', days: '{days} days', unlimited: 'Unlimited',
      us: 'We do', you: 'You, with Docker', auto: 'Automatic', yourself: 'Yourself',
      docs: 'Help pages', email: 'Help pages and e-mail',
    },
    faq: {
      title: 'Questions about price and payment',
      items: [
        { q: 'Who pays for Plus?', a: 'The administrator, for the whole house. Residents never pay anything and never enter payment details.' },
        { q: 'How are flats counted?', a: 'We count the active flats on the day of payment. If one is added during the year, you pay its share up to the end of the year. The app tells you the price first.' },
        { q: 'Can we add Plus later?', a: 'Yes, at any time under “Manage → Plus”. The schedule simply carries on and the Plus features are there straight away.' },
        { q: 'What happens if we do not renew Plus?', a: 'Your house carries on as Free and the schedule stays as it is. E-mails, calendar feeds and the live screen pause. Older history is kept for 90 days in case you change your mind.' },
        { q: 'Why is Plus so cheap?', a: 'The price covers what the extras really cost: sending e-mails, storage and computing time. Nothing more is needed.' },
        { q: 'Is the self-hosted version limited in any way?', a: 'No. Self-hosted, you get every feature at no cost. In return you look after the server, updates, backups and the mail server. [Read the guide](/docs/self-hosting)' },
      ],
    },
  },

  docs: {
    title: 'Help & documentation',
    intro: 'How to set up Waschplaner, use it day to day and run it yourself.',
    nav: 'Help pages',
    prev: 'Previous', next: 'Next',
    sections: { use: 'Using Waschplaner', run: 'Running it yourself', more: 'More' },
    notFound: 'This help page does not exist.',
    edit: 'Something unclear? Write to us at [{email}](mailto:{email}).',
  },
  legal: { privacy: 'Privacy', imprint: 'Imprint' },
  notFound: {
    title: 'This page does not exist',
    text: 'The address may have changed. You will find everything on the home page.',
    home: 'Go to the home page', docs: 'Go to help',
  },
}
