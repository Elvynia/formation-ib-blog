import { Routes } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { FormViewComponent } from './form-view/form-view.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';
import { GuardService } from './guard.service';

export const ROUTES: Routes = [
    {
        path: 'home',
        component: ListViewComponent
    }, {
        path: 'dynamicform',
        component: FormViewComponent,
        outlet: 'rightview'
    }, {
        path: 'form',
        component: FormViewComponent,
        canActivate: [GuardService]
    }, {
        path: 'contact',
        component: ContactViewComponent,
        children: [{
            path: 'admin',
            component: ContactAdminComponent
        }, {
            path: 'author/:name',
            component: ContactAuthorComponent
        }],
        canActivate: [GuardService]
    }, {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    }, {
        path: 'admin',
        component: NotFoundViewComponent,
        data: {
            imgUrl: 'http://www.lolalilo.com/content%20not%20available%20-%20Recherche%20Google_fichiers/images_061.png'
        }
    }, {
        path: '**',
        component: NotFoundViewComponent,
        data: {
            imgUrl: 'https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png'
        }
    }
];