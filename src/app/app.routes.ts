import { Routes } from '@angular/router';
import { PageCatalogItemComponent } from './data/page/page-catalog-item/page-catalog-item.component';
import { PageCartComponent } from './data/page/page-cart/page-cart.component';
import { PageItemFromCatalogComponent } from './data/page/page-item-from-catalog/page-item-from-catalog.component';
import { LoginComponent } from './data/components/login/login.component';
import { RegisterComponent } from './data/components/register/register.component';

export const routes: Routes = [

    {
        path: '',
        component: PageCatalogItemComponent,
        title: 'Каталог'
    },
    {
        path: 'сart',
        component: PageCartComponent,
        title: "Корзина товаров"

    },
    {
        path: 'ItemFromCatalog/:dpProductId',
        component: PageItemFromCatalogComponent,
        title: "Товар из каталога"
    },
    {
        path: 'login',
        component: LoginComponent,
        title: "Авторизация"
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: "Регистрация"
    },
];
