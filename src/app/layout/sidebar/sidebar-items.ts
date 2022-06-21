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
    title: "MENUITEMS.DASHBOARD.TEXT",
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
        title: "MENUITEMS.DASHBOARD.LIST.DASHBOARD1",
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
        path: "/admin/dashboard/dashboard2",
        title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
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
    path: "/extra-pages/blank",
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
    path: "/extra-pages/blank",
    title: "Rendez-vous",
    moduleName: "extra-pages",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "",
    title: "Comptable",
    moduleName: "comptable",
    iconType: "material-icons-two-tone",
    icon: "credit_card",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/comptable/liste",
        title: "Lister",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }, {
        path: "/admin/comptable/forms",
        title: "Ajouter",
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
    ],
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
        path: "/admin/medecin/rapport",
        title: "Rapport",
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
        path: "/admin/medecin/liste",
        title: "Lister",
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
        title: "Ajouter",
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
        path: "/admin/medecin/recherche",
        title: "Rechercher",
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
        path: "/admin/patient/dossier",
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
        path: "/admin/patient/liste",
        title: "Lister",
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
        path: "/admin/patient/recherche",
        title: "Rechercher",
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
    ],
  },
  {
    path: "/extra-pages/blank",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "",
    title: "Infirmerie",
    moduleName: "infirmerie",
    iconType: "material-icons-two-tone",
    icon: "vaccines",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/infirmerie/forms",
        title: "Ajouter",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }, {
        path: "/admin/infirmerie/liste",
        title: "Infirmiers",
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
    ],
  },
  {
    path: "",
    title: "Pharmacie",
    moduleName: "pharmacie",
    iconType: "material-icons-two-tone",
    icon: "local_pharmacy",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/pharmacie/listeMed",
        title: "Médicaments",
        moduleName: " ",
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
        path: "/admin/pharmacie/listePhar",
        title: "Pharmaciens",
        moduleName: "",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      }, {
        path: "/admin/pharmacie/formsPhar",
        title: "Ajouter",
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
    ],
  },
  {
    path: "",
    title: "Reception",
    moduleName: "reception",
    iconType: "material-icons-two-tone",
    icon: "content_paste_go",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/reception/liste",
        title: "Ajouter",
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
    ],
  },
  {
    path: "",
    title: "Logistique",
    moduleName: "logistique",
    iconType: "material-icons-two-tone",
    icon: "electric_rickshaw",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/logistique/",
        title: "Ajouter",
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
    ],
  },
  {
    path: "",
    title: "Informatique",
    moduleName: "informatique",
    iconType: "material-icons-two-tone",
    icon: "devices",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/informatique",
        title: "Ajouter",
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
    ],
  },

  //Modules medécin
  {
    path: "/doctor/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
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
    path: "/doctor/dashboard",
    title: "Rendez-vous",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "event",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/rapport",
    title: "Rapport",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "edit_calendar",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/examen",
    title: "Examens",
    moduleName: "doctor",
    iconType: "material-icons-two-tone",
    icon: "airline_seat_individual_suite",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/liste",
    title: "Médecins",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "route",
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
      },
      {
        path: "/doctor/patient/liste",
        title: "Lister",
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
        path: "/doctor/patient/recherche",
        title: "Rechercher",
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
    ],
  },
  {
    path: "/extra-pages/blank",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "assured_workload",
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
  //Modules Comptable
  {
    path: "",
    title: "MENUITEMS.DASHBOARD.TEXT",
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
        title: "MENUITEMS.DASHBOARD.LIST.DASHBOARD1",
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
        path: "/comptable/dashboard/dashboard2",
        title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
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
  // Common Modules comptable
  {
    path: "/comptable/Rdz",
    title: "Rendez-vous",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
  },
  {
    path: "/comptable/medecin/liste",
    title: "Médecins",
    moduleName: "",
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
    path: "/extra-pages/blank",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Comptable"],
    submenu: [],
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
    path: "/reception/Rdv",
    title: "Rendez-vous",
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
    path: "/reception/medecin/liste",
    title: "Médecins",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
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

  // Modules assurance
  {
    path: "/assurance/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "space_dashboard",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["assurance"],
    submenu: [],
  },

  // Modules infirmerie
  {
    path: "/infirmerie/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
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
    path: "/infirmerie/Rdv",
    title: "Rendez-vous",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [],
  },
  {
    path: "",
    title: "Médecins",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [
      {
        path: "/infirmerie/doctor/liste",
        title: "Lister",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "calendar_month",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu: [],
      },
      {
        path: "/infirmerie/doctor/rapport",
        title: "Rapport",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "calendar_month",
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
    title: "Patients",
    moduleName: "patient",
    iconType: "material-icons-two-tone",
    icon: "route",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [
      {
        path: "/infirmerie/patient/dossier",
        title: "Dossier medical",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "route",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu:[]
      },
      {
        path: "/infirmerie/patient/liste",
        title: "Lister",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "route",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu:[]
      },
      {
        path: "/infirmerie/patient/recherche",
        title: "Rechercher",
        moduleName: "",
        iconType: "material-icons-two-tone",
        icon: "route",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [],
        submenu:[]
      },

    ],
  },
  {
    path: "/extra-pages/blank",
    title: "Assurance",
    moduleName: "assurance",
    iconType: "material-icons-two-tone",
    icon: "calendar_month",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Infirmier"],
    submenu: [],
  },
  {
    path: "/infirmerie/examen",
    title: "Examens",
    moduleName: "",
    iconType: "material-icons-two-tone",
    icon: "route",
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
    icon: "route",
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
    title: "MENUITEMS.DASHBOARD.TEXT",
    moduleName: "pharmacie",
    iconType: "material-icons-two-tone",
    icon: "tv",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Pharmacien"],
    submenu: [
      {
        path: "/pharmacie/dashboard/main",
        title: "MENUITEMS.DASHBOARD.LIST.DASHBOARD1",
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
    // Common Modules pharmacie
    {
      path: "",
      title: "Medicaments",
      moduleName: "",
      iconType: "material-icons-two-tone",
      icon: "route",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      role: ["Pharmacien"],
      submenu: [
        {
          path: "/pharmacie/listeMed",
          title: "lister",
          moduleName: "extra-pages",
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
          path: "/pharmacie/formsMed",
          title: "Ajouter",
          moduleName: "extra-pages",
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
          path: "/pharmacie/recherche",
          title: "Rechercher",
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
      ],
    },
    {
      path: "/pharmacie/medecin/liste",
      title: "Médecins",
      moduleName: "",
      iconType: "material-icons-two-tone",
      icon: "calendar_month",
      class: "",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      role: ["Pharmacien"],
      submenu: [],
    },
    {
      path: "/pharmacie/patient/liste",
      title: "Patients",
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
      path: "/extra-pages/blank",
      title: "Assurance",
      moduleName: "assurance",
      iconType: "material-icons-two-tone",
      icon: "calendar_month",
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
