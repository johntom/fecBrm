
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Adjusterpayments {

  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;


  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.isDisableEdit = true
  }

  activate(params, routeConfig) {
    // let adjusterid = this.appService.currentpaymentAdjuster.ADJUSTER_ID
    let adjusterid = this.appService.currentClaim.ADJUSTER_ID
    return new Promise((resolve, reject) => {
      this.api.walkpayments(adjusterid)
        .then((jsonRes) => {
          this.files = jsonRes.data;
          let docs = []
          // let ct = 0
          for (const item of this.files) {

            // e:\Docs\Images\Adjreports\4\2018-01-1.pdf
            var res = item.split("\\", 6);
          //  this.files[ct].period = res[5]
            docs.push({file:item,period:res[5]})
           // ct++
          }
          this.files=docs
          //adjusterprep = this.origItems
          console.log('this.files', this.files)
          resolve(this.files);
        });
    });
  }



}
