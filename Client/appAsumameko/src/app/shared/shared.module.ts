import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MenuComponent } from './menu/menu.component';
import { NgIconsModule, provideNgIconsConfig  } from '@ng-icons/core';
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroChartPieSolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { octPerson } from '@ng-icons/octicons';
import { lucideCalendarRange, lucideBarChart2, lucideSettings, lucideLogOut } from '@ng-icons/lucide';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgIconsModule.withIcons({ heroChartPieSolid, octPerson, lucideCalendarRange,
      lucideBarChart2, lucideLogOut, lucideSettings, heroUserSolid, heroBell
     })
  ],
  providers:[
    provideNgIconsConfig({
      size: '5vh',
    }),
  ]
})
export class SharedModule { }
