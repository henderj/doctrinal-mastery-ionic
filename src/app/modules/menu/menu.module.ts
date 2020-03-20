import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { AccountMenuComponent } from 'src/app/components/account-menu/account-menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GravatarModule, GravatarConfig, FALLBACK } from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
  fallback: FALLBACK.identicon
}

@NgModule({
  declarations: [MenuComponent, AccountMenuComponent],
  // entryComponents: [MenuComponent, AccountMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    GravatarModule.forRoot(gravatarConfig)
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
