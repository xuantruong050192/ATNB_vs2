import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../model/publisher';

@Component({
  selector: 'app-list-publisher',
  templateUrl: './list-publisher.component.html',
  styleUrls: ['./list-publisher.component.scss']
})
export class ListPublisherComponent implements OnInit {

  public editDataItem:Publisher
  public isNew: boolean;
  constructor() { }

  ngOnInit() {
  }
  public addHandler() {
    this.editDataItem = new Publisher()
    this.isNew = true;
  }

}
