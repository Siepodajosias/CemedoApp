import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENUITEMS.MAIN.TEXT",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["All"],
    submenu: [],
  },

  // Admin Modules
  {
    path: "",
    title: "Tableau de bord",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/dashboard/main",
        title: "Principal",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/patient/dashboard",
        title: "MENUITEMS.DASHBOARD.LIST.PATIENT-DASHBOARD",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  // Common Modules admin
  {
    path: "/admin/departement",
    title: "Département",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "home_work",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "/admin/facture",
    title: "Facture",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "receipt_long",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "",
    title: "Programme",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "punch_clock",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/medecin/programme",
        title: "Tout les programmes",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/medecin/vacance",
        title: "Vacances",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
    ],
  },
  {
    path: "",
    title: "Rendez-vous",
    moduleName: "extra-pages",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
        {
          path: "/admin/medecin/Rdv",
          title: "liste des rendez-vous",
          moduleName: "extra-pages",
          iconType: "material-icons-two-tone",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          role: [],
          submenu: [],
        },
        {
          path: "/admin/calendrier",
          title: "Calendrier",
          moduleName: "extra-pages",
          iconType: "material-icons-two-tone",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          role: [],
          submenu: [],
        }
    ],

  },
  {
    path: "/admin/assurance/liste",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "assured_workload",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "/admin/comptable/liste",
    title: "Comptable",
    moduleName: "comptable",
    iconType: "material-icons-two-tone",
    icon: "credit_card",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: []
  },
  {
    path: "",
    title: "Médecins",
    moduleName: "doctor",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/medecin/liste",
        title: "Liste des médecins",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
        
      },
      {
        path: "/admin/medecin/forms",
        title: "Historique des traitements",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
      
    ],
  },
  {
    path: "",
    title: "Patients",
    moduleName: "patient",
    iconType: "material-icons-two-tone",
    icon: "sick",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/patient/liste",
        title: "Liste des patients",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/patient/p",
        title: "Paiements",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/patient/g",
        title: "Cas gérer",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/patient/d",
        title: "Documents",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
    ],
  },
  {
    path: "",
    title: "Ressources humaine",
    moduleName: "ressources",
    iconType: "material-icons-two-tone",
    icon: "vaccines",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/infirmerie/liste",
        title: "Infirmiers",
        moduleName: "infirmerie",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/admin/pharmacie/listePhar",
        title: "Pharmaciens",
        moduleName: "pharmacie",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/admin/reception/liste",
        title: "Receptions",
        moduleName: "reception",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/admin/logistique/materiel",
        title: "Logistiques",
        moduleName: "logistique",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/admin/informatique/informaticien",
        title: "Informaticiens",
        moduleName: "informatique",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      }
    ]
  },

  //Modules medécin
  {
    path: "/doctor/dashboard",
    title: "Tableau de bord",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  // Common Modules medécin
  {
    path: "/doctor/facture",
    title: "Facture",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "receipt_long",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],

  },
  {
    path: "",
    title: "Programme",
    moduleName: "programme",
    iconType: "material-icons-two-tone",
    icon: "punch_clock",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [
      {
        path: "doctor/programme",
        title: "Tout les programmes",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "doctor/vacance",
        title: "Vacances",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
    ],
  },
  {
    path: "",
    title: "Rendez-vous",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "event",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [
      {
        path: "/doctor/Rdv",
        title: "Liste des rendez-ous",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      },
      {
        path: "/doctor/RdvCalendrier",
        title: "calendrier des rendez-vous",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      }
    ],

  },
  {
    path: "/doctor/calendrier",
    title: "Calendrier",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "",
    title: "Patients",
    moduleName: "patient",
    iconType: "material-icons-two-tone",
    icon: "sick",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [
      {
        path: "/doctor/patient/liste",
        title: "Liste des patients",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/doctor/patient/liste",
        title: "paiements",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/doctor/patient/dossier",
        title: "Dossier médical",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/doctor/patient/ordonnance",
        title: "Ordonnance",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
    ],
  },
  {
    path: "/duuiuiid",
    title: "Chats",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "chat",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/duuiuiid",
    title: "Appels vidéos",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "videocam",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/duuiuiid",
    title: "Appels téléphoniques",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "call",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/duuiuiid",
    title: "Consultation à domicile",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/profile",
    title: "Paramètre",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "settings",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },

  //Modules Comptable
  {
    path: "",
    title: "Tableau de bord",
    moduleName: "comptable",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [

      {
        path: "/comptable/dashboard/main",
        title: "Principal",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/comptable/patient/dashboard",
        title: "Patient",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  // Common Modules comptable
  {
    path: "/comptable/medecin/liste",
    title: "Médecins",
    moduleName: "medecin",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
  },
  {
    path: "comptable/admin/facture",
    title: "Facture",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "receipt_long",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
  },
  {
    path: "",
    title: "finances",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "credit_card",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [
      {
        path: "",
        title: "Ajouter un paiement",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Paiements",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Paiements provisoires",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Recouvrement dù",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Procédures de paiement",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Categories de paiement",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Dépenses",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Ajouter des dépenses",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
      {
        path: "",
        title: "Categories de dépenses",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: []
      },
    ],
  },
  {
    path: "/comptable/pharmacie/listeMed",
    title: "Pharmacie",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "vaccines",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
  },
  {
    path: "/comptable/assurance/liste",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "assured_workload",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
  },
  {
    path: "",
    title: "Ressources humaine",
    moduleName: "ressources",
    iconType: "material-icons-two-tone",
    icon: "credit_card",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [
      {
        path: "/comptable/infirmerie/liste",
        title: "Infirmiers",
        moduleName: "infirmerie",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/comptable/pharmacie/listePhar",
        title: "Pharmaciens",
        moduleName: "pharmacie",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/comptable/reception/liste",
        title: "Receptions",
        moduleName: "reception",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/comptable/logistique/materiel",
        title: "Logistiques",
        moduleName: "logistique",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      },
      {
        path: "/comptable/informatique/informaticien",
        title: "Informaticiens",
        moduleName: "informatique",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: []
      }
    ],
  },

  //Modules Reception 
  {
    path: "/reception/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "space_dashboard",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["reception"],
    submenu: [],
  },
  // Common Modules reception
  {
    path: "",
    title: "Rendez-vous",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Reception"],
    submenu: [
      {
        path: "/reception/medecin/Rdv",
        title: "Liste des rendez-vous",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      },
      {
        path: "/reception/medecin/RdvCalendrier",
        title: "Calendrier des rendez-vous",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      }

    ],
  },
  {
    path: "",
    title: "Programme",
    moduleName: "programme",
    iconType: "material-icons-two-tone",
    icon: "punch_clock",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Reception"],
    submenu: [
      {
        path: "reception/medecin/programme",
        title: "Tout les programmes",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "reception/medecin/vacance",
        title: "Vacances",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }
    ],
  },
  {
    path: "/reception/medecin/liste",
    title: "Médecins",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Reception"],
    submenu: [],
  },
  {
    path: "/reception/patient/liste",
    title: "Patients",
    moduleName: "patient",
    iconType: "material-icons-two-tone",
    icon: "sick",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Reception"],
    submenu: [],
  },
  // Modules assurance
  {
    path: "/assurance/dashboard",
    title: "Tableau de bord",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Assurance"],
    submenu: [],
  },
// Common Modules assurance
{
  path: "/assurance/patient/liste3",
  title: "Patient",
  moduleName: "",
  iconType: "material-icons-two-tone",
  icon: "sick",
  class: "",
  groupTitle: false,
  badge: "",
  badgeClass: "",
  role: ["Assurance"],
  submenu: [],
},
  // Modules infirmerie
  {
    path: "/infirmerie/dashboard",
    title: "Tableau de bord",
    moduleName: "infirmerie",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [],
  },
  // Common Modules infirmerie
  {
    path: "/infirmerie/examen",
    title: "Examens",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "airline_seat_individual_suite",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [],
  },
  {
    path: "/infirmerie/calendrier",
    title: "Calendrier",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [],
  },

  // Modules pharmacie
  {
    path: "/pharmacie/dashboard",
    title: "Tableau de bord",
    moduleName: "pharmacie",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },
  // Common Modules pharmacie
  {
    path: "/pharmacie/listeVente",
    title: "Ventes",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "shopping_cart",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },{
    path: "/pharmacie/listeDepense",
    title: "Dépenses",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "shopping_bag",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },
  {
    path: "/pharmacie/listeCDD",
    title: "Catégorie de depense",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "redeem",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },{
    path: "/pharmacie/listeMed",
    title: "Medicaments",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "medication_liquid",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [
      {
        path: "/pharmacie/listeMed",
        title: "Liste des médicaments",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      },
      {
        path: "/pharmacie/listeCDM",
        title: "Catégorie de médicament",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Pharmacien"],
        submenu: [],
      },
    ],
  },
  {
    path: "/pharmacie/medecin/liste",
    title: "Ordonnaces",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },
  {
    path: "/pharmacie/livraison",
    title: "Livraison",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "electric_rickshaw",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [],
  },

  // Modules informatique
  {
    path: "/informatique/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "space_dashboard",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["informaticien"],
    submenu: [],
  },
  // Modules logistique
  {
    path: "/logistique/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "space_dashboard",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["logistique"],
    submenu: [],
  },
];
