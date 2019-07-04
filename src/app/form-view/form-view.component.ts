import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  editArticle: Article;

  constructor(private service: ArticleService) {
    this.editArticle = new Article();
  }

  ngOnInit() {
  }

  addArticle(article: any) {
    this.service.create(article.title, article.content);
  }

  updateArticle(article: Article) {
    this.service.update(article);
  }

}
