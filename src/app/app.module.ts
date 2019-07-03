import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ArticleService } from './article.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // RouterModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
