import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  items: any;
  constructor(
    private api: ApiService,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.api.getSavedDrugs().subscribe(data => {
      console.log(data);
      this.items = data;
    });
  }

  removeItem(item){
    console.log(item);
    this.api.removeSavedDrug(item).subscribe(result => {
      this.toastr.success('Item deleted successfully');
      this.items = result;
    }, error => {
      this.toastr.error(error, 'No dice!');
    });
  }

}
