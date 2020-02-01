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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'memorize',
    loadChildren: () => import('./memorize/memorize.module').then( m => m.MemorizePageModule)
  },
  {
    path: 'finished',
    loadChildren: () => import('./finished/finished.module').then( m => m.FinishedPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },  {
    path: 'quick-review',
    loadChildren: () => import('./quick-review/quick-review.module').then( m => m.QuickReviewPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
