import { Component, OnInit } from '@angular/core';
import { Author } from '../../model/author';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss']
})
export class ListAuthorComponent implements OnInit {

  

  public editDataItem:Author
  public isNew: boolean;
  constructor() { }

  ngOnInit() {
  }
  public addHandler() {
    this.editDataItem = new Author()
    this.isNew = true;
  }

}
