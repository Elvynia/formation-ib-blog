import { Injectable } from '@angular/core';
import { Article } from './article';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as ENV } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private cache: BehaviorSubject<Array<Article>>;
  // private idCount: number;
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    // this.idCount = 10;
    this.cache = new BehaviorSubject([]);
    this.apiUrl = ENV.apiUrl + '/article';
    // this.articles = [
    //   new Article(0, 'Article n°1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet urna dui, eget aliquet metus interdum sit amet. Maecenas et bibendum erat, eget condimentum ipsum. Praesent viverra finibus nulla, non maximus elit ultrices in. Integer tellus nisl, finibus commodo tellus id, semper facilisis nulla. Praesent eget felis at sapien bibendum bibendum. Nulla convallis lacus nunc. Sed nec mollis orci. Ut malesuada libero ut enim rutrum faucibus. Phasellus consectetur consequat orci posuere finibus. Mauris lobortis ut sem vitae tincidunt. Fusce ultricies mauris nec vulputate volutpat. Curabitur dapibus ipsum leo, et volutpat sapien commodo vitae. Praesent nunc mauris, eleifend a molestie ut, ornare sed risus.'),
    //   new Article(1, 'Article n°2', 'Nunc dictum, nisl nec varius placerat, nisi turpis mattis orci, at finibus arcu ipsum vitae lacus. Maecenas vulputate, eros vel suscipit imperdiet, urna ligula fermentum purus, non semper enim dui congue leo. Nunc sed bibendum mi, ut tincidunt nulla. Vestibulum lobortis quam feugiat, dignissim sapien id, tristique urna. In porttitor ipsum tortor. Etiam feugiat erat nulla, eget tincidunt urna tempor sodales. Nulla sollicitudin sed mi blandit tincidunt. In mattis pretium mi a rutrum.'),
    //   new Article(2, 'Article n°3', 'Donec eget ligula convallis, accumsan magna ac, aliquet leo. Pellentesque lectus lacus, bibendum quis tristique in, fermentum convallis mi. Aenean convallis metus metus, viverra maximus nisi dictum ac. In nec orci eget lacus maximus aliquam. Vestibulum posuere risus at ante posuere, in ultricies tortor gravida. Quisque sit amet lectus ac tortor vehicula tempus. Pellentesque in lorem elementum metus finibus fringilla. Quisque at porta dui. Vivamus dapibus ex at dolor pellentesque, et pharetra felis posuere. Mauris ante nisi, accumsan eu porttitor id, euismod dapibus tellus. Pellentesque ipsum enim, dignissim non mi ac, placerat egestas purus. Suspendisse mauris nunc, pulvinar in dignissim eget, accumsan eu risus. Donec id luctus ligula. In aliquam ultricies vehicula. Vivamus et ultricies augue. Maecenas sed finibus urna.'),
    //   new Article(3, 'Article n°4', 'Vivamus dictum dui sit amet lectus scelerisque, nec gravida risus molestie. Aenean pharetra nisl eget leo accumsan, varius molestie magna dapibus. Donec sit amet egestas ante. Aenean aliquet, nulla sit amet varius rhoncus, libero elit pharetra dui, in laoreet nisi sem non nibh. Morbi sagittis justo non quam porttitor molestie. Aenean tincidunt velit at ligula porttitor posuere. In rutrum, augue a rutrum viverra, risus quam scelerisque quam, id auctor ex felis ut quam. Suspendisse eu felis quis felis egestas bibendum eget in velit. Nulla gravida lacus nisl, a fringilla nulla elementum vel. Nullam auctor nec mi a pretium. Integer aliquam enim in quam tristique condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sapien felis, venenatis sit amet accumsan non, vulputate sit amet ipsum. Sed vulputate euismod arcu, et blandit lectus bibendum sit amet. Ut augue est, ultrices id bibendum sit amet, gravida et urna.'),
    //   new Article(4, 'Article n°5', 'Phasellus mi est, auctor sit amet interdum non, euismod eu libero. Curabitur tincidunt efficitur nisi nec aliquet. Integer pellentesque lacus sed arcu aliquet, vestibulum lacinia velit viverra. Mauris porttitor pharetra neque, sed semper neque lobortis ut. Phasellus eleifend placerat enim, ut iaculis mi mattis eu. Donec finibus faucibus posuere. Suspendisse potenti. Fusce non odio id ante fermentum pretium et sit amet velit. Nulla nec porta enim. Mauris pharetra justo sit amet nisi ultricies consectetur. Vestibulum cursus mattis bibendum. Mauris congue quam ligula, vitae laoreet neque vestibulum eu.')
    // ];
  }

  public initialize(): Observable<Array<any>> {
    this.httpClient.get<Array<any>>(this.apiUrl).pipe(
      map((list) => list.map((element) => new Article(element.id, element.title, element.description)))
    ).subscribe(
      (list) => this.cache.next(list),
      (error) => console.error(error)
    );
    return this.cache.asObservable();
  }

  public create(title: string, content: string): Observable<Array<any>> {
    const article = {
      title,
      description: content
    };
    this.httpClient.post(this.apiUrl, article).subscribe(
      (backArticle: any) => {
        let newList = this.cache.value.slice();
        newList.push(new Article(backArticle.id, backArticle.title, backArticle.description));
        this.cache.next(newList);
      }
    );
    return this.cache.asObservable();
  }

  public read(id: number): Observable<Article> {
    return this.httpClient.get(this.apiUrl + '/' + id).pipe(
      map((article: any) => new Article(article.id, article.title, article.description))
    );
  }

  public readAll(): Observable<Array<Article>> {
    return this.cache.asObservable();
  }

  public update(article: Article): Observable<Array<any>> {
    this.httpClient.put(this.apiUrl, {
      id: article.id,
      title: article.title,
      description: article.content
    }).subscribe(
      (backArticle: any) => {
        let updatedArticle = new Article(backArticle.id, backArticle.title, backArticle.description);
        let newList = this.cache.value.slice();
        let index = newList.findIndex((a) => a.id === article.id);
        if (index >= 0) {
          newList.splice(index, 1, updatedArticle);
          this.cache.next(newList);
        }
      }
    )
    return this.cache;
  }

  public delete(id: number): Observable<Array<any>> {
    this.httpClient.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        let newList = this.cache.value.slice();
        let index = newList.findIndex((article) => article.id === id);
        if (index >= 0) {
          newList.splice(index, 1);
          this.cache.next(newList);
        }
      }
    )
    return this.cache.asObservable();
  }
}
