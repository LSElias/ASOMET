// menu-data.ts
export interface NavItem {
  displayName: string;
  iconPath: string;
  route: string;
}

export const navItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconPath: '../../../assets/images/dashIcon.png',
    route: '/dashboard',
  },
  {
    displayName: 'Usuarios',
    iconPath: '../../../assets/images/userDashIcon.png',
    route: '/usuario',
  },
  {
    displayName: 'Eventos',
    iconPath: '../../../assets/images/calendarDashIcon.png',
    route: '/eventos',
  },
  {
    displayName: 'Reportes',
    iconPath: '../../../assets/images/reportDashIcon.png',
    route: '/reportes',
  },
  {
    displayName: 'Ajustes',
    iconPath: '../../../assets/images/settingsDashIcon.png',
    route: '/usuario/ajustes',
  },
  {
    displayName: 'Cerrar Sesión',
    iconPath: '../../../assets/images/signOutDashIcon.png',
    route: '/logout',
  },
];
