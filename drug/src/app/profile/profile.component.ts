import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pharmacy: {
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    latitude: number,
    longitude: number,
    state: string};

    stockList: any;
    showBusy: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private dialog: MdDialog
  ) {
      this.toastr.setRootViewContainerRef(this.vcr);
      this.pharmacy = this.api.getProfile();    
  }

  ngOnInit() {
    if (!this.api.getUser())
        this.router.navigateByUrl('/login');
    else {
      console.log('getting stock');
      this.api.getStock().subscribe(stock => {
        this.stockList = stock;
      }, error => {
        this.toastr.error('Could not get your stock list', 'My Bad!')
      })
    }
  }

  removeDrug(item){
    console.log(item);
    let dialogRef = this.dialog.open(MyDialogRef);
    dialogRef.componentInstance.name = item.generic_name;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.showBusy = true;
        // console.log('removing ' + item.generic_name);
        this.api.removeDrug(item).subscribe(stock => {
          this.stockList = stock;
          this.showBusy = false;
        }, error => {
          this.showBusy = false;
          this.toastr.error(error);
        })
      }
    });
  }

}

@Component({
  selector: 'my-dialog',
  template: `
  <div>
  <h3 md-dialog-title>Remove Drug?</h3>
  <md-dialog-content>Are you sure you want to remove {{name}} from your stock list?</md-dialog-content>
  <md-dialog-actions [fxLayout]="column" fxLayoutAlign="space-between end" fxFlex>
  <button fxFlexOrder="1" type="button" color="secondary" md-raised-button (click)="dialogRef.close(false)">Nope! Changed my mind</button>
  <button fxFlexOrder="2" type="button" color="warn" md-raised-button (click)="dialogRef.close(true)">Go ahead</button>
  </md-dialog-actions>
  </div>
  `
})
export class MyDialogRef {
  name: string;
  constructor(public dialogRef: MdDialogRef<MyDialogRef>){

  }
}