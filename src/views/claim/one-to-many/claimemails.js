import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../../../services/prompt';
@inject(ApiService, ApplicationService,DialogService)
export class Claimemails {
  heading = 'DataForm HEADER...';  
  footer = 'DataForm FOOTER...';
  recordId = '';
  
  constructor(api, appService ,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
      this.currentItem = this.appService.testrec;
       this.dialogService = dialogService
  }

  activate(params, routeConfig,dialogService) {
    // if (params.id) {
    //   this.recordId = params.id; 
    //   this.heading = `DataForm for record ${this.recordId}`;
      
    //   console.log('this.recordId ', this.recordId);
    //   return this.api.findInventoryOne(this.recordId)
    //     .then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);          
    //       let inv = jsonRes.data;
    //       this.currentItem = inv[0];
    //       console.log('data-form:activate - currentItem', this.currentItem);
    //       this.inv = inv[0]
    //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
    //       return inv
    //     });
    // }
  }  
//     remove(item, index) {


//  this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
//         if (!response.wasCancelled) {
//           console.log('Delete')
//           let contacts = this.currentItem.contacts
//           contacts.splice(index, 1)// start, deleteCount)
//         } else {
//           console.log('cancel');
//         }
//         console.log(response.output);
//       });
//   }


}
