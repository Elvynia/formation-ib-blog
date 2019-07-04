import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  editArticle: Article;

  constructor(private service: ArticleService,
    private route: ActivatedRoute,
    private router: Router) {
    this.editArticle = new Article();
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      filter((paramMap) => paramMap.has('articleId')),
      map((paramMap) => paramMap.get('articleId')),
      map((id: string) => parseInt(id)),
      tap((id) => console.log('Paramètre de route articleId=', id)),
      switchMap((id: number) => this.service.read(id).pipe(
        tap((article) => console.log('Article récupéré du backend : ', article))
      ))
    ).subscribe((article) => this.editArticle = article);
  }

  addArticle(article: any) {
    this.service.create(article.title, article.content);
    this.backToHome();
  }
  
  updateArticle(article: Article) {
    this.service.update(article);
    this.backToHome();
  }
  
  private backToHome() {
    this.router.navigate(['home']);
  }

}
