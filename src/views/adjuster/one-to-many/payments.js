import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Payments {

  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  //addresses: Address[] = [];

  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    // this.currentItem = this.appService.currentaduster// Insco;
    this.isDisableEdit = true
  }
// showModal(fieldname) {
//      this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    
     
//       console.log(response.output);
//     });
//   }
  activate(params, routeConfig) {
    // this.currentItem.docs = [{ FILE_NAME: 'jrt' }]
    // currentItem.docs
    let adjusterid = this.appService.currentpaymentAdjuster.ADJUSTER_ID
    return new Promise((resolve, reject) => {

      this.api.walkpayments(adjusterid)
        .then((jsonRes) => {
          this.files = jsonRes.data;
          //adjusterprep = this.origItems
          console.log('this.files',this.files)
          resolve(this.files);
        });
    });

      // this.api.walkpayments(adjusterid)
      //   .then((jsonRes) => {
      //     this.files = jsonRes.data;
      //     //adjusterprep = this.origItems
      //     console.log('this.files',this.files)
      //     resolve(this.files);
      //   });
  
  }





  save(address, index) {
    // this.mode = 0
    // console.log(' this.currentItem.notes', this.currentItem.notes)
    // this.isDisableEdit = true
    // document.getElementById('a' + index).disabled = true;
    // document.getElementById('b' + index).disabled = true;
  }


}
