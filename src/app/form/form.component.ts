import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  article: Article;
  @Output() onCreate: EventEmitter<any>;

  constructor() {
    this.article = new Article();
    this.onCreate = new EventEmitter();
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    // console.log(form);
    this.onCreate.next({
      title: this.article.title,
      content: this.article.content
    });
    this.article = new Article();
  }

}
