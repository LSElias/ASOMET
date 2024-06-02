import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MenuComponent } from './menu/menu.component';
import { NgIconsModule, provideNgIconsConfig  } from '@ng-icons/core';
import { heroChartPieSolid } from '@ng-icons/heroicons/solid';
import { octPerson } from '@ng-icons/octicons';
import { lucideCalendarRange, lucideBarChart2, lucideSettings, lucideLogOut } from '@ng-icons/lucide';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgIconsModule.withIcons({ heroChartPieSolid, octPerson, lucideCalendarRange,
      lucideBarChart2, lucideLogOut, lucideSettings
     })
  ],
  providers:[
    provideNgIconsConfig({
      size: '2em',
    }),
  ]
})
export class SharedModule { }
