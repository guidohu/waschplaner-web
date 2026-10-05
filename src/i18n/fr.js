// French texts of the website (Swiss French: « guillemets », "vous").
// The app itself is in German and English; these words match its glossary:
// Plan = planning, Zeitfenster = créneau, Fester Plan = planning fixe, Waschküche =
// buanderie, Wohnung = appartement, Bewohner:in = habitant·e, Verwaltung = administration.
export default {
  common: {
    later: 'Bientôt disponible', laterPlus: 'Plus tard avec Plus',
    language: 'Langue', decrease: 'Moins', increase: 'Plus', copy: 'Copier', copied: 'Copié',
    soon: 'Bientôt', included: 'Inclus', notIncluded: 'Non inclus', learnMore: 'En savoir plus',
    free: 'Gratuit', plus: 'Plus',
  },
  nav: {
    features: 'Fonctions', pricing: 'Prix', selfHost: 'Auto-hébergement', docs: 'Aide',
    login: 'Se connecter', start: 'Créer un planning', menu: 'Menu', close: 'Fermer', skip: 'Aller au contenu',
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
      text: 'Des horaires fixes comme des rendez-vous dans l’agenda, répartis équitablement et créés en cinq minutes. Imprimez le planning pour une année entière – gratuitement, sans compte, et vos saisies ne quittent jamais votre navigateur.',
      start: 'Créer un planning gratuitement', more: 'Voir les fonctions',
      facts: [
        'Créé en 5 minutes',
        'Sans compte',
        'Reste dans votre navigateur',
      ],
    },
    demo: {
      house: 'Rue de l’Exemple 12', navPlan: 'Planning', navMine: 'Ma lessive', range: '21–25 sept.', date: '{d}',
      title: 'Buanderie', week: 'Semaine 39', today: 'Aujourd’hui', now: 'Maintenant', book: 'Réserver', free: 'Libre',
      done: 'terminé', freeFrom: 'Libre dès {time}', bookRest: 'Réserver le reste', mine: 'Votre appartement : {name}',
      days: [
        'lu',
        'ma',
        'me',
        'je',
        've',
      ],
      flats: ['Rez gauche', 'Rez droite', '1er gauche', '1er droite', '2e étage'],
      hint: 'Voici à quoi ressemblera la version en ligne, où chacun réserve lui-même – elle arrive plus tard. Essayez : touchez « Réserver » ou un créneau de votre appartement.',
      booked: 'Réservé : {when}', freed: 'Libéré : {when}',
      label: 'Exemple de planning de lessive avec cinq appartements',
    },
    steps: {
      eyebrow: 'Comment ça marche',
      title: 'Votre planning de lessive en trois étapes',
      text: 'Vous créez le planning une fois dans votre navigateur et l’affichez dans la buanderie. Plus tard, tout le monde pourra aussi l’utiliser en ligne.',
      items: [
        { icon: 'wand', title: 'Créer le planning', text: 'En cinq courtes étapes, un assistant vous interroge sur les appartements, les machines et les horaires, puis propose un planning fixe équitable. Tout reste dans votre navigateur.' },
        { icon: 'print', title: 'Imprimer', text: 'Deux semaines par page A4, jusqu’à une année entière, pour chaque machine ou local. Vous modifiez des jours isolés directement dans l’aperçu.' },
        { icon: 'users', title: 'En ligne pour tous', text: 'Avec Plus, les habitant·e·s scanneront le code QR de l’affiche et réserveront, échangeront et annuleront eux-mêmes.', later: true },
      ],
    },
    features: {
      eyebrow: 'Fonctions',
      title: 'Tout ce dont une buanderie commune a besoin',
      text: 'Gratuit dans votre navigateur – et plus tard, avec Plus, en ligne pour tout l’immeuble.',
      items: {
        plan: { title: 'Un planning fixe comme un agenda', text: 'Chaque mardi, toutes les 2 semaines ou le premier lundi du mois – comme des rendez-vous qui se répètent. L’assistant répartit le temps équitablement et laisse libre autant de temps que vous le souhaitez pour les lessives spontanées.' },
        rooms: { title: 'Votre buanderie, telle qu’elle est', text: 'Lave-linge, sèche-linge et étendages : réservés ensemble comme une seule buanderie, séparément ou de façon mixte. Avec leurs propres horaires par jour.' },
        print: { title: 'À imprimer et à afficher', text: 'Deux semaines par page A4, par machine ou par local, jusqu’à une année entière. Depuis la fenêtre d’impression, vous pouvez aussi enregistrer le planning en PDF.' },
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
        { icon: 'lock', title: 'Sans compte', text: 'Pas de compte, pas d’e-mail, pas de mot de passe. Vous créez le planning directement dans votre navigateur, et vos saisies ne le quittent pas.' },
        { icon: 'shield', title: 'Seulement les données nécessaires', text: 'Les appartements s’appellent « Rez gauche », pas « Famille Dupont ». Ce que vous saisissez reste sur votre appareil.' },
        { icon: 'globe', title: 'Quatre langues', text: 'Deutsch, Français, Italiano et English – chacun choisit sa langue. Et qui n’est pas en ligne lit le planning sur papier.' },
      ],
    },
    ways: {
      eyebrow: 'Aujourd’hui et plus tard',
      title: 'Gratuit dans le navigateur aujourd’hui, en ligne pour tous plus tard',
      text: 'Vous créez et imprimez le planning gratuitement dans votre navigateur dès aujourd’hui. La version en ligne, où chacun réserve lui-même, arrivera plus tard avec Plus – pour CHF {price} par appartement et par an.',
      compare: 'Comparer toutes les fonctions',
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        { q: 'Combien coûte le planificateur ?', a: 'Rien. Vous créez le planning dans votre navigateur et l’imprimez pour une année au maximum – gratuitement et sans compte. La version en ligne arrivera plus tard avec Plus. [Voir les prix](/pricing)' },
        { q: 'Où vont mes saisies ?', a: 'Uniquement dans votre navigateur. Le planificateur n’envoie rien à un serveur – pas non plus à nous. Pour continuer sur un autre appareil, enregistrez le planning comme fichier.' },
        { q: 'Puis-je modifier le planning plus tard ?', a: 'Oui. Dans le même navigateur, il est toujours là à votre prochaine visite ; sinon, ouvrez le fichier enregistré. Vous modifiez des jours isolés dans l’aperçu, puis vous réimprimez simplement.' },
        { q: 'Tous les habitant·e·s ont-ils besoin d’un smartphone ?', a: 'Non. Le planning est affiché sur papier dans la buanderie. Avec Plus, tout le monde pourra plus tard l’utiliser aussi en ligne – si on le souhaite.' },
        { q: 'Puis-je héberger Waschplaner moi-même ?', a: 'Cela viendra plus tard, avec la version en ligne.' },
        { q: 'Waschplaner existe-t-il en français ou en italien ?', a: 'Oui. Le site et le planificateur existent en allemand, en français, en italien et en anglais.' },
        { q: 'Quand arrive la version en ligne ?', a: 'Nous y travaillons. Avec Plus, tout l’immeuble utilisera le planning en ligne, réservera et échangera – pour CHF {price} par appartement et par an. D’ici là, le planificateur dans le navigateur est gratuit.' },
      ],
    },
    cta: {
      title: 'Prêts pour une journée de lessive détendue ?',
      text: 'Créez votre planning de lessive en cinq minutes : gratuitement, sans compte et directement dans votre navigateur.',
    },
  },

  pricing: {
    title: 'Prix',
    head: {
      eyebrow: 'Prix',
      title: 'Gratuit dans le navigateur aujourd’hui. En ligne pour tous avec Plus plus tard.',
      text: 'Vous créez et imprimez le planning gratuitement et sans compte dès aujourd’hui. La version en ligne avec Plus et l’auto-hébergement arriveront plus tard ; les prix ci-dessous s’appliqueront alors.',
    },
    plans: {
      free: {
        name: 'Gratuit', tag: 'Dans le navigateur', badge: 'Disponible maintenant', price: 'CHF 0', unit: 'sans compte', cta: 'Créer un planning maintenant',
        text: 'Créez le planning directement dans votre navigateur et imprimez-le. Vos saisies ne quittent jamais votre navigateur.',
        points: [
          'Sans compte et sans e-mail',
          'Vos saisies restent dans le navigateur',
          'Planning fixe avec une proposition équitable',
          'Modifier des jours isolés',
          'Imprimer une année entière, aussi en PDF',
          'Enregistrer comme fichier et continuer plus tard',
        ],
      },
      plus: {
        name: 'Plus', tag: 'En ligne pour tous', price: 'CHF {price}', unit: 'par appartement et par an', cta: 'Essayer {trial} jours gratuitement',
        badge: '{trial} jours offerts',
        text: 'Tous les habitant·e·s utilisent le planning en ligne – et le serveur s’occupe du reste.',
        points: ['Tout ce qu’offre Gratuit', 'Inviter avec un code QR et des codes d’accès', 'Réserver, libérer, reprendre, déplacer, check-in', 'E-mail en cas de changement et abonnement au calendrier', 'Vue publique du planning pour la buanderie', 'Sans abonnement : rien ne se renouvelle tout seul'],
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
        items: [
          'Créer le planning en cinq étapes',
          'Répartir équitablement les horaires fixes',
          'Modifier des jours isolés',
          'Imprimer une année entière',
          'Tout reste dans votre navigateur',
        ],
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
      eyebrow: 'Comment fonctionnera Plus',
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
        wizard: 'Configuration avec un planning fixe équitable',
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
        { q: 'Quand arrive Plus ?', a: 'Nous y travaillons. D’ici là, vous créez et imprimez le planning gratuitement dans votre navigateur – sans compte. [Créer un planning](/planner)' },
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
    later: 'Cette page décrit la version en ligne. Elle arrivera plus tard – aujourd’hui, vous créez le planning [dans votre navigateur](/planner).',
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
