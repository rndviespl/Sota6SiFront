import { Routes } from '@angular/router';
import { PageCatalogItemComponent } from './data/page/page-catalog-item/page-catalog-item.component';
import { PageCartComponent } from './data/page/page-cart/page-cart.component';
import { PageItemFromCatalogComponent } from './data/page/page-item-from-catalog/page-item-from-catalog.component';

export const routes: Routes = [

    {
        path: '',
        component: PageCatalogItemComponent,
        title: 'Каталог'
    },
    {
        path: 'Cart',
        component:PageCartComponent,
        title:"Корзина товаров"

    },
    {
        path:'ItemFromCatalog/:dpProductId',
        component:PageItemFromCatalogComponent,
        title:"Товар из каталога"
    },
];
