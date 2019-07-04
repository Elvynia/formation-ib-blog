import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { Subject } from 'rxjs';
import { debounceTime, map, tap, filter } from 'rxjs/operators';

export type ListAction = {
  type: 'DELETE' | 'EDIT',
  payload: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() data: Array<Article>;
  @Output() onAction: EventEmitter<ListAction>;
  keywords: string;
  filteredData: Array<Article>;
  search: Subject<string>;

  constructor() {
    this.data = new Array();
    this.filteredData = new Array();
    this.search = new Subject();
    this.onAction = new EventEmitter();
  }

  ngOnInit(): void {
    this.search.pipe(
      // Délai sur la saisie utilisateur.
      debounceTime(300),
      // Empêcher une recherche avec mots clés vide.
      filter((keywords) => !!keywords),
      // Surveiller les données qui passent dans l'Observable.
      tap((keywords) => console.log(`Recherche lancée avec ${keywords} !`)),
      // Transforme les données qui passent dans l'Observable.
      map((keywords) => keywords.toLowerCase()),
      map((keywords) => this.data.filter(
        (article) => article.title.toLowerCase().indexOf(keywords) >= 0
          || article.content.toLowerCase().indexOf(keywords) >= 0))
    ).subscribe((results: Array<Article>) => this.filteredData = results);
  }


  doAction(type: ListAction['type'], id: number) {
    this.onAction.next({
      type: type,
      payload: id
    });
  }

  doSearch() {
    this.search.next(this.keywords);
  }

}
