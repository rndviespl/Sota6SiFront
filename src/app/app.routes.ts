import { Routes } from '@angular/router';
import { PageCatalogItemComponent } from './data/page/page-catalog-item/page-catalog-item.component';
import { PageCartComponent } from './data/page/page-cart/page-cart.component';
import { PageItemFromCatalogComponent } from './data/page/page-item-from-catalog/page-item-from-catalog.component';
import { LoginComponent } from './data/components/login/login.component';
import { RegisterComponent } from './data/components/register/register.component';
import { UserPageComponent } from './data/page/user-page/user-page.component';
import { UserPageProjComponent } from './data/page/user-page-proj/user-page-proj.component';
import { LoginProjComponent } from './data/components/login-proj/login-proj.component';
import { RegisterProjComponent } from './data/components/register-proj/register-proj.component';
import { AboutComponent } from './data/page/about/about.component';

export const routes: Routes = [

    {
        path: '',
        component: PageCatalogItemComponent,
        title: 'Каталог'
    },
    {
        path: 'cart',
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
    {
        path: 'user-page',
        component: UserPageComponent,
        title: "страница тестового пользователя"
    },
    {
        path: 'userProj',
        component: UserPageProjComponent,
        title: "страница пользователя"
    },
    {
        path: 'login-proj',
        component: LoginProjComponent,
        title: "Авторизация для проекта"
    },
    {
        path: 'register-proj',
        component: RegisterProjComponent,
        title: "Регистрация для проекта"
    },
    { 
        path: 'about', 
        component: AboutComponent, 
        title: "О приложении" 
    },
];
