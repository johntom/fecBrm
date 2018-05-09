
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Invoices {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.isDisableEdit = true
    this.currentItem = this.appService.currentClaim

  }
  activate(params, routeConfig) {
    //    let adjusterid = this.appService.currentpaymentAdjuster.ADJUSTER_ID
    //  return new Promise((resolve, reject) => {

    //  this.api.walkinvoices(  this.currentItem.CLAIM_NO)
    //     .then((jsonRes) => {
    //       this.files = jsonRes.data;
    //       console.log('this.files',this.files)
    //      await (this.files);
    //     });
    return new Promise((resolve, reject) => {
// change to ar  "claim" : { "CLAIM_NO" : "01-03188", 
      // this.api.walkinvoices(this.currentItem.CLAIM_NO)
      //   .then((jsonRes) => {
      //     this.files = jsonRes.data;
      //     //adjusterprep = this.origItems
      //     console.log('this.files', this.files)
      //     resolve(this.files);
      //   });
  this.api.findAR(this.currentItem.CLAIM_NO)
        .then((jsonRes) => {
          this.files = jsonRes.data;
          //adjusterprep = this.origItems
          console.log('this.files', this.files)
          resolve(this.files);
        });



    });


  }





  save(address, index) {
    // this.mode = 0
    // console.log(' this.currentItem.notes', this.currentItem.notes)
    // this.isDisableEdit = true
    // document.getElementById('a' + index).disabled = true;
    // document.getElementById('b' + index).disabled = true;
  }


}
