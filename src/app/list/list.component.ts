import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';

export type ListAction = {
  type: 'DELETE' | 'EDIT',
  payload: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() data: Array<Article>;
  @Output() onAction: EventEmitter<ListAction>;

  constructor() {
    this.data = new Array();
    this.onAction = new EventEmitter();
  }

  doAction(type: ListAction['type'], id: number) {
    this.onAction.next({
      type: type,
      payload: id
    });
  }

}
