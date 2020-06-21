import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcomepage',
    pathMatch: 'full'
  },
  {
    path: 'viewproduct',
    loadChildren: () => import('./viewproduct/viewproduct.module').then( m => m.ViewproductPageModule)
  },
  {
    path: 'product-modal',
    loadChildren: () => import('./product-modal/product-modal.module').then( m => m.ProductModalPageModule)
  },
  {
    path: 'cater',
    loadChildren: () => import('./cater/cater.module').then( m => m.CaterPageModule)
  },
  {
    path: 'cater-modal',
    loadChildren: () => import('./cater-modal/cater-modal.module').then( m => m.CaterModalPageModule)
  },
  {
    path: 'cate-modal-out',
    loadChildren: () => import('./cate-modal-out/cate-modal-out.module').then( m => m.CateModalOutPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'welcomepage',
    loadChildren: () => import('./welcomepage/welcomepage.module').then( m => m.WelcomepagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
