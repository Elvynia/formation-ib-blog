import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ListAction } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  editing: boolean;
  articles: Array<Article>;
  editArticle: Article;

  constructor(private service: ArticleService) {
    this.editing = false;
    this.editArticle = new Article();
  }

  swapView() {
    this.editing = !this.editing;
    if (!this.editing) {
      this.editArticle = new Article();
    }
  }

  ngOnInit() {
    this.service.initialize().subscribe(
      (list: Array<any>) => this.articles = list
    );
  }

  addArticle(article: any) {
    this.service.create(article.title, article.content);
    // .subscribe(
    //   (list: Array<any>) => this.articles = list
    // );
    this.swapView();
  }

  updateArticle(article: Article) {
    this.service.update(article);
    this.swapView();
  }

  listAction(action: ListAction) {
    if (action.type === 'DELETE') {
      this.service.delete(action.payload);
    } else { // Edition !
      this.editArticle = JSON.parse(JSON.stringify(this.service.read(action.payload)));
      this.swapView();
    }
  }
}
