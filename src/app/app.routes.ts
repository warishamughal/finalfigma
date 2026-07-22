import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'boarding',
    pathMatch: 'full',
  },
  {
    path: 'boarding',
    loadComponent: () => import('./boarding/boarding.page').then( m => m.BoardingPage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./signin/signin.page').then( m => m.SigninPage)
  },
  {
    path: 'location',
    loadComponent: () => import('./location/location.page').then( m => m.LocationPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'homescr',
    loadComponent: () => import('./homescr/homescr.page').then( m => m.HomescrPage)
  },
  {
    path: 'productdetail',
    loadComponent: () => import('./productdetail/productdetail.page').then( m => m.ProductdetailPage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'beverages',
    loadComponent: () => import('./beverages/beverages.page').then( m => m.BeveragesPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'fav',
    loadComponent: () => import('./fav/fav.page').then( m => m.FavPage)
  },
  {
    path: 'my-cart',
    loadComponent: () => import('./my-cart/my-cart.page').then( m => m.MyCartPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then( m => m.AccountPage)
  },
  {
    path: 'extra',
    loadComponent: () => import('./extra/extra.page').then( m => m.ExtraPage)
  },
  {
    path: 'filters',
    loadComponent: () => import('./filters/filters.page').then( m => m.FiltersPage)
  },
  {
    path: 'order-placed',
    loadComponent: () => import('./order-placed/order-placed.page').then( m => m.OrderPlacedPage)
  },
  {
    path: 'detail',
    loadComponent: () => import('./detail/detail.page').then( m => m.DetailPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'orderplace',
    loadComponent: () => import('./orderplace/orderplace.page').then( m => m.OrderplacePage)
  },
  {
    path: 'camera-test',
    loadComponent: () => import('./camera-test/camera-test.page').then( m => m.CameraTestPage)
  },
  {
    path: 'gitarr',
    loadComponent: () => import('./gitarr/gitarr.page').then( m => m.GitarrPage)
  },
];
