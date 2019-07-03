import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  editing: boolean;
  articles: Array<Article>;

  constructor(private service: ArticleService) {
    this.editing = false;
  }

  swapView() {
    this.editing = !this.editing;
  }

  ngOnInit() {
    this.articles = this.service.articles;
  }

  addArticle(article: any) {
    this.service.create(article.title, article.content);
  }
}
