import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Component({
  selector: 'app-list-category-book',
  templateUrl: './list-category-book.component.html',
  styleUrls: ['./list-category-book.component.scss']
})
export class ListCategoryBookComponent implements OnInit {
  public editDataItem: Category;
  public isNew: boolean;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private arrCategory: Category[];
  public totalRecord:number=0;



  constructor(private categoryService: CategoryService) {
 
   
  }
  

  ngOnInit() {
     this.loadData(0,this.pageSize);
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
   
    
  
   
    this.loadData(this.skip/this.pageSize,this.pageSize);
  }
  public loadData(skip:number, pagesize:number) {
    this.categoryService.getCategory(skip,pagesize).subscribe(
      (data) => {
      
        this.arrCategory = data["data"] as Category[];
        this.totalRecord=data["total"] as number;
       
        // console.log(this.totalRecord);
        this.gridView = {
          data: this.arrCategory,
          total: this.totalRecord
        }
      }
    )







  }
  public addHandler() {
    this.editDataItem = new Category();
    this.isNew = true;
  }
  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(category: Category) {
  
    this.categoryService.SaveCategory(category, this.isNew).subscribe(data=>{this.loadData(this.skip,this.pageSize);});
    

    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {
  
    
    let  objCategory : Category = dataItem as Category;
    this.categoryService.deleteCategory(objCategory)
    .subscribe((data)=>{this.loadData(this.skip,this.pageSize)});
    
    
  }

}
