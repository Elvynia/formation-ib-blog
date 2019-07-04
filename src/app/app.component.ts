import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ListAction } from './list/list.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: ArticleService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.service.initialize();
  }

  login() {
    if (!this.authService.check()) {
      let username = prompt('Veuillez saisir un login :', undefined);
      if (username) {
        this.authService.register(username);
      }
    } else {
      this.authService.disconnect();
      this.router.navigate(['home']);
    }
  }

}
