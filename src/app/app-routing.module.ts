import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'memorize',
    loadChildren: () => import('./pages/memorize/memorize.module').then( m => m.MemorizePageModule)
  },
  {
    path: 'finished',
    loadChildren: () => import('./pages/finished/finished.module').then( m => m.FinishedPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'quick-review',
    loadChildren: () => import('./pages/quick-review/quick-review.module').then( m => m.QuickReviewPageModule)
  },
  // {
  //   path: 'login-modal',
  //   loadChildren: () => import('./pages/login-modal/login-modal.module').then( m => m.LoginModalPageModule)
  // }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
