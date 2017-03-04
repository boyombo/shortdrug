import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  findForm: any;
  errorMsg: string;
  states: any;
  names: Array<string>;
  filteredStates: Array<string> = [];
  stockList: any;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.findForm = this.formBuilder.group({
      term: ['', Validators.required],
      state: ['']
    });

    
  }

  filterStates(val: string){
    return val ? this.names.filter((s) => new RegExp(val, 'gi').test(s)): this.names;
  }

  ngOnInit() {
    this.api.getStates().subscribe(data => {
      this.states = data;
      this.names = data.map(item => item.name);
      console.log('states ' + data);
      console.log('names ' + this.names);
      console.log(this.filterStates('La'));

      let control = this.findForm.controls.state;
      console.log(control);
      // this.filteredStates = control.valueChanges
      //   .startWith(null)
      //   .map(name => this.filterStates(name));
    });
  }

  findDrugs(){
    console.log('find drugs');
    let params = this.findForm.value;
    this.api.searchDrugs(params).subscribe(data => {
      this.stockList = data;
      console.log(data);
    }, error => {
      this.toastr.error(error, 'Bad News');
    });
  }

  textChanged(){
    console.log(this.findForm.value.state);
    let val = this.findForm.value.state;
    this.filteredStates = this.filterStates(val);
  }

}
