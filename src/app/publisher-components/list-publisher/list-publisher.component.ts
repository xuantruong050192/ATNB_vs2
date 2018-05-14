import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../model/publisher';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublisherService } from '../../service/publisher.service';

@Component({
  selector: 'app-list-publisher',
  templateUrl: './list-publisher.component.html',
  styleUrls: ['./list-publisher.component.scss']
})
export class ListPublisherComponent implements OnInit {

  public editDataItem: Publisher;
  public isNew: boolean;
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private arrCategory: Publisher[];
  public totalRecord:number=0;
  public searchname:string ="0";

  public frmSearch: FormGroup = new FormGroup({
    
    'txtSearch': new FormControl('', Validators.required),
 
    
});



  constructor(private publisherService: PublisherService) {
 
   
  }
  

  ngOnInit() {
   
     this.loadData(this.searchname, 0,this.pageSize);
    
  }
  public onSubmit()
  {
    this.searchname = this.frmSearch.value["txtSearch"];
    console.log(this.searchname);
    this.loadData(this.searchname,  this.skip/this.pageSize,this.pageSize);
    
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
   
    
  
   
    this.loadData(this.searchname,  this.skip/this.pageSize,this.pageSize);
  }
  public loadData(seachname:string, skip:number, pagesize:number) {
    this.publisherService.getPublisher(seachname, skip,pagesize).subscribe(
      (data) => {
      
        this.arrCategory = data["data"] as Publisher[];
        this.totalRecord=data["total"] as number;
       
       
        this.gridView = {
          data: this.arrCategory,
          total: this.totalRecord
        }
      }
    )
  }
  public addHandler() {
    this.editDataItem = new Publisher();
    this.isNew = true;
  }
  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(entity: Publisher) {
  
    this.publisherService.SavePublisher(entity, this.isNew).subscribe(data=>{this.loadData( this.searchname,  this.skip,this.pageSize);});
    

    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {
  
    
    let  objPublisher : Publisher = dataItem as Publisher;
    this.publisherService.deletePublisher(objPublisher)
    .subscribe((data)=>{this.loadData(this.searchname,  this.skip,this.pageSize)});
    
    
  }
}
