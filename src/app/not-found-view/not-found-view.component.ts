import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-not-found-view',
  templateUrl: './not-found-view.component.html',
  styleUrls: ['./not-found-view.component.css']
})
export class NotFoundViewComponent implements OnInit {
  imgUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(
      map((data) => data.imgUrl)
    ).subscribe((imgUrl) => this.imgUrl = imgUrl);
  }

}
