// French texts of the website (Swiss French: « guillemets », "vous").
// The app itself is in German and English; these words match its glossary:
// Plan = planning, Zeitfenster = créneau, Fester Plan = planning fixe, Waschküche =
// buanderie, Wohnung = appartement, Bewohner:in = habitant·e, Verwaltung = administration.
export default {
  common: {
    language: 'Langue', decrease: 'Moins', increase: 'Plus', copy: 'Copier', copied: 'Copié',
    soon: 'Bientôt', included: 'Inclus', notIncluded: 'Non inclus', learnMore: 'En savoir plus',
    free: 'Gratuit', plus: 'Plus',
  },
  nav: {
    features: 'Fonctions', pricing: 'Prix', selfHost: 'Auto-hébergement', docs: 'Aide',
    login: 'Se connecter', start: 'Créer mon immeuble', menu: 'Menu', close: 'Fermer', skip: 'Aller au contenu',
    main: 'Navigation principale', home: 'Waschplaner – accueil',
  },
  footer: {
    tagline: 'Le planning de lessive pour les immeubles où plusieurs appartements partagent la buanderie.',
    product: 'Produit', selfHost: 'Auto-hébergement', legal: 'Informations légales',
    guide: 'Guide', config: 'Configuration', source: 'Code source', contact: 'Contact',
    privacy: 'Protection des données', imprint: 'Mentions légales', copyright: '© {year} Waschplaner',
  },

  home: {
    title: 'Le planning de lessive de votre immeuble',
    hero: {
      eyebrow: 'Pour les immeubles avec une buanderie commune',
      title: 'Qui lave quand – enfin clair.',
      text: 'Des horaires fixes comme des rendez-vous dans l’agenda, répartis équitablement et prêts en cinq minutes. Imprimez le planning gratuitement pour la buanderie – ou laissez tous les habitant·e·s réserver en ligne avec Plus.',
      start: 'Créer mon immeuble gratuitement', selfHost: 'Héberger soi-même',
      facts: ['Prêt en 5 minutes', 'Gratuit à imprimer', '{trial} jours de Plus offerts'],
    },
    demo: {
      house: 'Rue de l’Exemple 12', navPlan: 'Schedule', navMine: 'My laundry', range: '21–25 Sept', date: '{d}',
      title: 'Laundry room', week: 'Week 39', today: 'Today', now: 'Now', book: 'Book', free: 'Free',
      done: 'done', freeFrom: 'Free from {time}', bookRest: 'Book the rest', mine: 'Votre appartement : {name}',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // the app's own words (English)
      flats: ['Rez gauche', 'Rez droite', '1er gauche', '1er droite', '2e étage'],
      hint: 'Voici comment tout le monde utilise le planning avec Plus (l’application est en anglais ou en allemand). Essayez : touchez « Book » ou un créneau de votre appartement.',
      booked: 'Réservé : {when}', freed: 'Libéré : {when}',
      label: 'Exemple de planning de lessive avec cinq appartements',
    },
    steps: {
      eyebrow: 'Comment ça marche',
      title: 'Votre planning de lessive en trois étapes',
      text: 'L’administration configure l’immeuble une seule fois. Ensuite, le planning est affiché dans la buanderie – ou tout le monde l’utilise en ligne.',
      items: [
        { icon: 'wand', title: 'Configurer l’immeuble', text: 'En six courtes étapes, un assistant vous interroge sur les appartements, les machines et les horaires, puis propose un planning fixe équitable.' },
        { icon: 'print', title: 'Imprimer', text: 'Deux semaines par page A4, pour chaque machine ou local. Un changement ? Il suffit de réimprimer. Gratuit jusqu’à {printFree} semaines à la fois, une année entière avec Plus.' },
        { icon: 'users', title: 'En ligne pour tous', text: 'Avec Plus, les habitant·e·s scannent le code QR de l’affiche et réservent, échangent et annulent eux-mêmes.' },
      ],
    },
    features: {
      eyebrow: 'Fonctions',
      title: 'Tout ce dont une buanderie commune a besoin',
      text: 'Gratuit pour l’administration, et avec Plus pour tout l’immeuble.',
      items: {
        plan: { title: 'Un planning fixe comme un agenda', text: 'Chaque mardi, toutes les 2 semaines ou le premier lundi du mois – comme des rendez-vous qui se répètent. L’assistant répartit le temps équitablement.' },
        rooms: { title: 'Votre buanderie, telle qu’elle est', text: 'Lave-linge, sèche-linge et étendages : réservés ensemble comme une seule buanderie, séparément ou de façon mixte. Avec leurs propres horaires par jour.' },
        print: { title: 'À imprimer et à afficher', text: 'Deux semaines par page A4, par machine ou par local. Gratuit jusqu’à {printFree} semaines à la fois, une année entière avec Plus. Depuis la fenêtre d’impression, vous pouvez aussi enregistrer le planning en PDF.' },
        book: { title: 'Réserver en un geste', text: 'Chaque appartement réserve lui-même les créneaux libres, aussi souvent que le règlement le permet, et libère ou déplace les siens.' },
        finish: { title: 'Terminé – libérer le reste', text: 'Fini plus tôt ? Un geste, et le reste du créneau est libre pour tous. Annulable tant que personne ne l’a réservé.' },
        takeover: { title: 'Des règles équitables pour reprendre', text: 'Qui ne vient pas peut perdre son créneau après un délai d’attente. Le check-in le protège. L’appartement concerné est averti.' },
        mail: { title: 'E-mail et abonnement au calendrier', text: 'Qui perd un créneau l’apprend par e-mail. Et chaque appartement voit ses créneaux dans son application d’agenda.' },
        screen: { title: 'Vue publique du planning', text: 'Pour un écran dans la buanderie : le planning sans connexion, à jour chaque minute.' },
      },
    },
    everyone: {
      eyebrow: 'Pour tout l’immeuble',
      title: 'Assez simple pour toutes les générations',
      text: 'Waschplaner est fait pour les personnes qui n’ont pas envie de s’occuper de technique.',
      items: [
        { icon: 'text-size', title: 'Grands caractères sur demande', text: 'Normal, grand ou très grand, par appareil. De grands boutons et des mots simples plutôt que du jargon.' },
        { icon: 'qr', title: 'Sans mot de passe', text: 'Scanner le code QR, saisir le code d’accès, c’est tout. Seules les personnes qui veulent se connecter sur d’autres appareils ont besoin d’un mot de passe.' },
        { icon: 'shield', title: 'Seulement les données nécessaires', text: 'Les appartements s’appellent « Rez gauche », pas « Famille Dupont ». Le prénom suffit ; l’e-mail ne sert qu’à se connecter.' },
        { icon: 'globe', title: 'Deutsch et English', text: 'L’application existe en allemand et en anglais ; chacun choisit sa langue. Et qui n’est pas en ligne lit le planning sur papier.' },
      ],
    },
    ways: {
      eyebrow: 'Gratuit ou Plus',
      title: 'Gratuit sur papier, en ligne avec Plus',
      text: 'En version gratuite, vous imprimez le planning. Avec Plus, tous les habitant·e·s l’utilisent en ligne – {trial} jours offerts, puis CHF {price} par appartement et par an. Ou vous hébergez Waschplaner vous-même.',
      compare: 'Comparer toutes les fonctions',
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        { q: 'Quelle est la différence entre Gratuit et Plus ?', a: 'En version gratuite, l’administration crée le planning, modifie des jours isolés et l’imprime pour la buanderie, jusqu’à {printFree} semaines à la fois. Avec Plus, tous les habitant·e·s l’utilisent en ligne : réserver, libérer, reprendre – avec e-mails et abonnement au calendrier. Vous pouvez alors aussi imprimer une année entière en une fois. [Comparer les prix](/pricing)' },
        { q: 'Faut-il installer une application ?', a: 'Non. Waschplaner fonctionne dans le navigateur, sur téléphone, tablette et ordinateur. Si vous le souhaitez, ajoutez-le à votre téléphone avec « Install as an app » ou « Sur l’écran d’accueil ».' },
        { q: 'Tous les habitant·e·s ont-ils besoin d’un smartphone ?', a: 'Non. Avec Plus, n’importe quel navigateur suffit, et l’administration peut réserver pour chaque appartement. Sans Plus, le planning est de toute façon affiché sur papier dans la buanderie.' },
        { q: 'Que se passe-t-il si quelqu’un n’utilise pas son créneau ?', a: 'C’est vous qui décidez dans le règlement : les autres peuvent le reprendre après un délai d’attente (par défaut), à tout moment ou jamais. Qui a fait son check-in garde toujours son créneau.' },
        { q: 'Puis-je héberger Waschplaner moi-même ?', a: 'Oui. Le code source est public. Avec Docker, Waschplaner fonctionne sur votre propre serveur avec toutes les fonctions, et vous y activez Plus gratuitement. [Lire le guide](/docs/self-hosting)' },
        { q: 'Waschplaner existe-t-il en français ou en italien ?', a: 'Ce site, oui. L’application elle-même est pour l’instant en allemand et en anglais.' },
        { q: 'Où sont stockées nos données ?', a: 'Pour Waschplaner hébergé, sur notre serveur ; en auto-hébergement, sur le vôtre. Nous ne stockons que ce dont le planning a besoin et ne transmettons rien. [Protection des données](/privacy)' },
      ],
    },
    cta: {
      title: 'Prêts pour une journée de lessive détendue ?',
      text: 'Créez votre planning de lessive en cinq minutes : gratuit à imprimer, avec {trial} jours de Plus offerts.',
    },
  },

  pricing: {
    title: 'Prix',
    head: {
      eyebrow: 'Prix',
      title: 'Gratuit sur papier. En ligne pour tous avec Plus.',
      text: 'Plus coûte CHF {price} par appartement et par an, et les {trial} premiers jours sont offerts. Pas d’abonnement, pas de coût par personne et aucune limite quant au nombre d’appartements ou de machines.',
    },
    plans: {
      free: {
        name: 'Gratuit', tag: 'À imprimer', price: 'CHF 0', unit: 'pour toujours', cta: 'Créer mon immeuble gratuitement',
        text: 'L’administration crée le planning et l’imprime pour la buanderie.',
        points: ['Un immeuble, autant d’appartements et de machines que nécessaire', 'Configuration en six étapes, avec un planning fixe équitable', 'Modifier des jours isolés', 'Imprimer : jusqu’à {printFree} semaines à la fois, aussi en PDF', 'Les habitant·e·s n’ont pas besoin de compte'],
      },
      plus: {
        name: 'Plus', tag: 'En ligne pour tous', price: 'CHF {price}', unit: 'par appartement et par an', cta: 'Essayer {trial} jours gratuitement',
        badge: '{trial} jours offerts',
        text: 'Tous les habitant·e·s utilisent le planning en ligne – et le serveur s’occupe du reste.',
        points: ['Tout ce qu’offre Gratuit', 'Imprimer une année entière en une fois', 'Inviter avec un code QR et des codes d’accès', 'Réserver, libérer, reprendre, déplacer, check-in', 'E-mail en cas de changement et abonnement au calendrier', 'Vue publique du planning pour la buanderie', 'Sans abonnement : rien ne se renouvelle tout seul'],
      },
      self: {
        name: 'Auto-hébergé', tag: 'Votre serveur', price: 'CHF 0', unit: 'sur votre serveur', cta: 'Lire le guide',
        text: 'Toutes les fonctions, sur un serveur que vous gérez. Il vous faut un serveur avec Docker.',
        points: ['Toutes les fonctions de Plus', 'Activer Plus sans paiement', 'Autant d’immeubles que vous voulez', 'Vos données sur votre serveur', 'Mises à jour et sauvegardes par vos soins'],
      },
    },
    principle: {
      eyebrow: 'Où passe la limite',
      title: 'Gratuit, c’est le planning sur papier. Avec Plus, tout le monde l’utilise en ligne.',
      text: 'Créer et imprimer un planning ne demande presque aucune puissance de calcul. Dès que tout le monde réserve en ligne, le serveur travaille pour chaque appartement, jour et nuit. C’est pourquoi Plus se paie par appartement – et ne coûte que ce qu’il faut.',
      free: {
        title: 'Gratuit : pour l’administration', tag: 'Gratuit',
        items: ['Configurer l’immeuble en six étapes', 'Répartir équitablement les horaires fixes', 'Modifier des jours isolés', 'Imprimer jusqu’à {printFree} semaines à la fois', 'Tout reste enregistré'],
      },
      plus: {
        title: 'Plus : pour tout l’immeuble', tag: 'Plus',
        items: [
          { icon: 'users', title: 'Chaque appartement en ligne', text: 'Se connecter, réserver, libérer : chaque appartement utilise le serveur, tous les jours.' },
          { icon: 'mail', title: 'Envoyer des e-mails', text: 'Qui perd un créneau reçoit un e-mail. Chaque envoi a un coût.' },
          { icon: 'calendar', title: 'Fournir les abonnements au calendrier', text: 'Les applications d’agenda interrogent le flux de chaque appartement jour et nuit.' },
          { icon: 'screen', title: 'Tenir la vue publique à jour', text: 'Un écran dans la buanderie recharge le planning chaque minute – 1440 fois par jour.' },
          { icon: 'history', title: 'Conserver l’historique', text: 'Qui a réservé ou modifié quoi, et quand – conservé tant que l’immeuble existe.' },
        ],
      },
    },
    journey: {
      eyebrow: 'Comment fonctionne Plus',
      title: 'Essayer, acheter, prolonger – sans abonnement',
      text: 'L’administration achète Plus pour un an. Rien ne se renouvelle tout seul, et personne n’a de mauvaise surprise.',
      steps: [
        { icon: 'gift', title: 'Essayer {trial} jours gratuitement', text: 'Une fois par immeuble, sans données de paiement. L’essai se termine tout seul ; un rappel arrive {trialRemind} jours avant.' },
        { icon: 'card', title: 'Acheter pour un an', text: 'Sur la page de paiement sécurisée de Stripe, par carte ou TWINT. Si vous achetez pendant l’essai, l’année ne commence qu’à la fin de celui-ci.' },
        { icon: 'bell', title: 'Prolonger à temps', text: 'Nous vous le rappelons par e-mail {remind} jours avant la fin. La prolongation est possible durant les {renew} derniers jours et ajoute une année à la suite.' },
        { icon: 'eye', title: 'Pas prolongé ?', text: 'Les habitant·e·s peuvent encore consulter le planning pendant {view} jours. Ensuite, l’immeuble repasse en Gratuit : le planning reste enregistré et peut être imprimé.' },
      ],
    },
    calc: {
      title: 'Combien coûte Plus pour votre immeuble ?',
      label: 'Appartements dans l’immeuble',
      perYear: 'par an pour tout l’immeuble',
      perMonth: 'Soit {amount} par mois.',
      note: 'Vous payez pour les appartements actifs. L’administration paie une fois par an ; les habitant·e·s ne paient jamais rien.',
    },
    table: {
      title: 'Toutes les fonctions en un coup d’œil',
      feature: 'Fonction',
      groups: {
        plan: 'Planifier et imprimer', online: 'En ligne pour tous', server: 'Le serveur travaille pour vous', ops: 'Paiement et exploitation',
      },
      rows: {
        house: 'Un immeuble avec autant d’appartements et de machines que nécessaire',
        wizard: 'Configuration en six étapes avec un planning fixe équitable',
        edit: 'Modifier des jours isolés',
        print: 'Imprimer (deux semaines par page A4)',
        join: 'Inviter avec un code QR et des codes d’accès',
        booking: 'Réserver, libérer, reprendre, déplacer, check-in',
        rules: 'Règles pour les réservations supplémentaires et la reprise',
        mine: 'Page personnelle, aussi comme application sur le téléphone',
        activity: 'Activité : qui a modifié quoi, et quand',
        mail: 'E-mail quand vos créneaux changent',
        ical: 'Abonnement au calendrier pour chaque appartement',
        screen: 'Vue publique du planning pour la buanderie',
        reminders: 'Rappel avant votre créneau',
        stats: 'Statistiques et export en tableau',
        payment: 'Paiement',
        hosting: 'Qui gère le serveur',
        updates: 'Mises à jour et sauvegardes',
        support: 'Aide',
      },
    },
    values: {
      manyHouses: 'Nombre d’immeubles illimité', withSmtp: 'Avec votre serveur de messagerie',
      printFree: '{printFree} semaines à la fois', printYear: 'Une année entière',
      nothing: 'Rien', yearly: 'Par an, par carte ou TWINT', switch: 'Activable gratuitement',
      us: 'Nous', you: 'Vous, avec Docker', auto: 'Automatiques', yourself: 'Vous-même',
      docs: 'Pages d’aide', email: 'Pages d’aide et e-mail',
    },
    faq: {
      title: 'Questions sur le prix et le paiement',
      items: [
        { q: 'Qui paie Plus ?', a: 'L’administration, pour tout l’immeuble. Les habitant·e·s ne paient jamais rien et ne saisissent aucune donnée de paiement.' },
        { q: 'Comment les appartements sont-ils comptés ?', a: 'Vous payez pour les appartements actifs. Si un appartement s’ajoute en cours d’année, vous payez, avant qu’il ne démarre, sa part jusqu’à la fin de l’année (au moins CHF {min}). Personne d’autre ne remarque quoi que ce soit.' },
        { q: 'Plus se renouvelle-t-il tout seul ?', a: 'Non, Plus n’est pas un abonnement. Nous vous le rappelons par e-mail {remind} jours avant la fin. Si vous prolongez durant les {renew} derniers jours, la nouvelle année ne commence qu’à la fin de l’ancienne.' },
        { q: 'Que se passe-t-il quand Plus se termine ?', a: 'Les habitant·e·s peuvent encore consulter le planning pendant {view} jours, sans pouvoir réserver. Ensuite, votre immeuble repasse en Gratuit : vous continuez à modifier et imprimer le planning, et tout reste enregistré. Vous pouvez racheter Plus à tout moment.' },
        { q: 'Comment payons-nous ?', a: 'Sur la page de paiement sécurisée de Stripe, par carte ou TWINT. Nous ne voyons jamais les données de carte. Vous choisissez Plus à la fin de la configuration ou plus tard sous « Manage → Plus ».' },
        { q: 'La version auto-hébergée est-elle limitée ?', a: 'Non. En auto-hébergement, vous avez toutes les fonctions, et Plus est un interrupteur gratuit. En échange, vous vous occupez du serveur, des mises à jour, des sauvegardes et du serveur de messagerie. [Lire le guide](/docs/self-hosting)' },
      ],
    },
  },

  docs: {
    appLanguage: 'L’application est en allemand et en anglais. Les boutons sont cités avec leur nom anglais, p. ex. «\u00a0Book\u00a0»\u00a0; le [glossaire](/docs/glossary) donne aussi l’allemand.',
    title: 'Aide et documentation',
    intro: 'Comment configurer Waschplaner, l’utiliser au quotidien et l’héberger vous-même.',
    nav: 'Pages d’aide',
    prev: 'Précédent', next: 'Suivant',
    sections: { use: 'Utiliser Waschplaner', run: 'Héberger soi-même', more: 'Plus d’infos' },
    notFound: 'Cette page d’aide n’existe pas.',
    edit: 'Quelque chose n’est pas clair ? Écrivez-nous à [{email}](mailto:{email}).',
  },
  legal: { privacy: 'Protection des données', imprint: 'Mentions légales' },
  notFound: {
    title: 'Cette page n’existe pas',
    text: 'L’adresse a peut-être changé. Vous trouverez tout sur la page d’accueil.',
    home: 'Aller à l’accueil', docs: 'Aller à l’aide',
  },
}
