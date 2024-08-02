// menu-data.ts
export interface NavItem {
  displayName: string;
  iconPath: string;
  validation: string;
  route: string;
}

export const navItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconPath: '../../../assets/images/dashIcon.png',
    validation: "isAutenticated",
    route: '/dashboard',
  },
  {
    displayName: 'Usuarios',
    iconPath: '../../../assets/images/userDashIcon.png',
    validation: "isAutenticated",
    route: '/usuario',
  },
  {
    displayName: 'Eventos',
    iconPath: '../../../assets/images/calendarDashIcon.png',
    validation: "isAutenticated",
    route: '/eventos',
  },
  {
    displayName: 'Reportes',
    iconPath: '../../../assets/images/reportDashIcon.png',
    validation: "this.user?.rol===3",
    route: '/reportes',
  },
  {
    displayName: 'Ajustes',
    iconPath: '../../../assets/images/settingsDashIcon.png',
    validation: "isAutenticated",
    route: '/ajustes',
  },
  {
    displayName: 'Cerrar Sesión',
    iconPath: '../../../assets/images/signOutDashIcon.png',
    validation: "isAutenticated",
    route: '/logout',
  },
];
