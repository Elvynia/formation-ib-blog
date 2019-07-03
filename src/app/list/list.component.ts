import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() data: Array<Article>;

  constructor() {
    this.data = new Array();
  }

  ngOnInit() {
  }

}
