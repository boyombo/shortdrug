import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../api.service';
import {IMyOptions} from 'mydatepicker';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadForm: any;
  errorMsg: string;

  private MyDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy-mm-dd",
    // dateFormat: "dd-mmm-yyyy",
    // inline: true
  };

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(this.vcr);

    this.uploadForm = this.formBuilder.group({
      brand_name: ['', Validators.required],
      generic_name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      batch_number: [''],
      expiry_date: ['', Validators.required],
      quantity: ['', Validators.required],
      pack_size: ['', Validators.required],
      unit_cost: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save(){
    console.log(this.uploadForm.value);
    console.log(this.uploadForm.value.expiry_date.formatted);
    this.api.uploadDrug(this.uploadForm.value).subscribe(data => {
      console.log('success');
      this.toastr.success('Uploaded drug succesfully', 'Done').then(() => {
        this.uploadForm.reset();
      })
    }, error => {
      console.error(error);
      this.toastr.error(error, 'Bad News');
    })
  }

}
