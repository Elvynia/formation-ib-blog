import { Routes } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { FormViewComponent } from './form-view/form-view.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

export const ROUTES: Routes = [
    {
        path: 'home',
        component: ListViewComponent
    }, {
        path: 'form',
        component: FormViewComponent
    }, {
        path: 'contact',
        component: ContactViewComponent
    }, {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    }, {
        path: '**',
        component: NotFoundViewComponent
    }
];