import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Author } from '../../model/author';
import { Publisher } from '../../model/publisher';

@Component({
  selector: 'edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styles: [
    'input[type=text] { width: 100%; }',
    'textarea[kendoTextArea]{width: 100%;}'
  ],
})
export class EditPublisherComponent  {

  public active = false;
  public editForm: FormGroup = new FormGroup({
      'ProductID': new FormControl(),
      'ProductName': new FormControl('', Validators.required),
      'UnitPrice': new FormControl(0),
      'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(false)
  });

  @Input() public isNew = false;

  @Input() public set model(publisher: Publisher) {
      this.editForm.reset(publisher);

      this.active =publisher !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Author> = new EventEmitter();

  public onSave(e): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
      this.active = false;
  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }

  constructor() { }

  


}
