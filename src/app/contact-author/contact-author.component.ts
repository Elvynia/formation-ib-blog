import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-author',
  templateUrl: './contact-author.component.html',
  styleUrls: ['./contact-author.component.css']
})
export class ContactAuthorComponent implements OnInit {
  author: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.author = params.name;
    });
  }

}
