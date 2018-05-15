import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Category } from '../../model/category';
import { Author } from '../../model/author';
import { Publisher } from '../../model/publisher';
import { CategoryService } from '../../service/category.service';
import { AuthorService } from '../../service/author.service';
import { PublisherService } from '../../service/publisher.service';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit  {
    public categoryDefault:{CategoryID:number,CategoryName:string}
    public authorDefault:{AuthorID:number,AuthorName:string}
    public publisherDefault:{PublisherID:number,PublisherName:string}
    public statusDefault:{StatusID:number,StatusName:string}
    public arrCategory: Category[] = [];
    public arrAuthor: Author[] = [];
    public arrPublisher: Publisher[] = [];
    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    uploadRemoveUrl = 'removeUrl';

    public myRestrictions: FileRestrictions = {
        allowedExtensions: ['jpg', 'jpeg', 'png']
    };

    public userName: string;
    public userImages: Array<FileInfo>;
  
    constructor(private _categoryService:CategoryService, private authorService:AuthorService,
                private publisherService:PublisherService) 
    {
        
        
    }
    ngOnInit()
    {
        this.loadCategory();
        this.loadAuthor();
        this.loadPublisher();

    }
    public loadPublisher()
    {
        this.publisherService.getAllPublisher().subscribe(
            (data) => {
      
              this.arrPublisher = data["data"] as Publisher[];
            }
          )
       
       
    }
    public loadAuthor()
    {
        this.authorService.getAllAuthor().subscribe(
            (data) => {
      
              this.arrAuthor = data["data"] as Author[];
            }
          )
       
       
    }
    public loadCategory()
    {
        this._categoryService.getAllCategory().  subscribe(
            (data) => {
      
              this.arrCategory = data["data"] as Category[];
            }
          )
       
       
    }



    //   public active = false;
    //   public editForm: FormGroup = new FormGroup({
    //       'ProductID': new FormControl(),
    //       'ProductName': new FormControl('', Validators.required),
    //       'UnitPrice': new FormControl(0),
    //       'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
    //       'Discontinued': new FormControl(false)
    //   });

    //   @Input() public isNew = false;

    //   @Input() public set model(product: Product) {
    //       this.editForm.reset(product);

    //       this.active = product !== undefined;
    //   }

    //   @Output() cancel: EventEmitter<any> = new EventEmitter();
    //   @Output() save: EventEmitter<Product> = new EventEmitter();

    //   public onSave(e): void {
    //       e.preventDefault();
    //       this.save.emit(this.editForm.value);
    //       this.active = false;
    //   }

    //   public onCancel(e): void {
    //       e.preventDefault();
    //       this.closeForm();
    //   }

    //   private closeForm(): void {
    //       this.active = false;
    //       this.cancel.emit();
    //   }


}
