import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';

@inject(ApiService)
export class DataForm {
  heading = 'DataForm HEADER...';  
  footer = 'DataForm FOOTER...';
  recordId = '';
  
  constructor(api) {
    this.api = api;
    this.inv = '';
  }

  activate(params, routeConfig) {
    if (params.id) {
      this.recordId = params.id; 
      this.heading = `DataForm for record ${this.recordId}`;
      
      console.log('this.recordId ', this.recordId);
      return this.api.findInventoryOne(this.recordId)
        .then((jsonRes) => {
          console.log('jsonRes ', jsonRes);          
          let inv = jsonRes.data;
          this.currentItem = inv[0];
          console.log('data-form:activate - currentItem', this.currentItem);
          this.inv = inv[0]
          // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
          return inv
        });
    }
  }

}