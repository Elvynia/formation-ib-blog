import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ListAction } from '../list/list.component';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  articles: Array<Article>;

  constructor(private service: ArticleService,
    private router: Router) {
    this.articles = new Array();
  }

  ngOnInit() {
    this.service.readAll().subscribe(
      (list) => this.articles = list
    );
  }

  listAction(action: ListAction) {
    if (action.type === 'DELETE') {
      this.service.delete(action.payload);
    } else { // Edition !
      this.router.navigate(['form'], {
        queryParams: {
          articleId: action.payload
        }
      });
    }
  }

}
