import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ListAction } from '../list/list.component';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  articles: Array<Article>;

  constructor(private service: ArticleService) {
    this.articles = new Array();
  }

  ngOnInit() {
  }

  listAction(action: ListAction) {
    if (action.type === 'DELETE') {
      this.service.delete(action.payload);
    } else { // Edition !
      // this.editArticle = JSON.parse(JSON.stringify(this.service.read(action.payload)));
    }
  }

}
