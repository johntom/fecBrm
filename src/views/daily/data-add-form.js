import { Router } from 'aurelia-router';
import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//import { ApiService } from '../../../utils/servicesApi';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../services/prompt';
import { EventAggregator } from 'aurelia-event-aggregator';
// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';

@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator, DialogService)
export class DataAddForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';
  flag = 0;
  currentnewItem;

  constructor(router, api, appService, dataService, eventAggregator, dialogService) {
    this.dialogService = dialogService

    this.router = router;
    this.api = api;
    this.appService = appService;
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.appService.currentDaily = {} // {}; DO NOT DO THIS
    this.appService.currentDaily.dailies = []
    this.currentItem = {}
    this.currentItem.dailies = []

    this.currentAdjuster = { id: 0 }
    this.currentClaim = { id: 0 }
    this.currentDate = moment().format('YYYY-MM-DD')
    this.openCount = 0

    //this.currentItem.ADJUSTER
  }
  selectChanged(daily, SERVICE) {
    // this passes data
    // alert (daily+' '+ SERVICE)
    // let insco = this.appService.InsurancecompanyList
    // let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === daily)
    // let item = insco[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.inscoAdjusters = item.contacts
    // this.inscoAddresses= item.addresses

  }
  remove(item, index) {
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let addresses = this.currentItem.addresses
        addresses.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  addDaily() {
    // ['CLAIM_NO','WORK_DATE',  'SERVICE_ID','WORK_TIME','MILEAGE','EXPENSE_TYPE_ID','EXPENSE','WORK_DESCRIPTION','ADJUSTER_NOTES','ADJUSTER_ID']">
    let dailies = this.currentItem.dailies
    let flag = false
    let item
    let newDate = moment().format('YYYY-MM-DD')
    if (dailies === undefined) {
      flag = true
      dailies = []
    }



    item = {
      CLAIM: this.currentClaim, WORK_DATE: this.currentDate, SERVICE: {}, WORK_TIME: '', MILEAGE: '', EXPENSE: {}, EXPENSEAMT: '',
      WORK_DESCRIPTION: '', ADJUSTER_NOTES: '', ADJUSTER: this.currentAdjuster, edit: true
    }
    dailies.unshift(item)
    if (flag) this.currentItem.dailies = dailies
    //this.lineCount += 1
    this.openCount += 1

  }
  activate() {



  }

  // selectChanged(insid) {

  //   let insco = this.appService.InsurancecompanyList
  //   let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === insid)
  //   let item = insco[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
  //   this.inscoAdjusters = item.contacts
  //   this.inscoAddresses = item.addresses
  //   // adjusters[index] = item

  // }

  attached() {
  }
  bind() {
  }
  createEventListeners() {
  }

  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }

  // canDeactivate() {
  //    return confirm('Are you sure you want to leave this page?');
  // }
  saveitem(item) {
    item.edit = !item.edit
    console.log('saveDaily ', item);
    this.currentAdjuster = item.ADJUSTER
    this.currentClaim = item.CLAIM
    //this.flag = 1

    this.openCount -= 1

  }
  close() {

    if (this.openCount > 0) {
      alert('still have items opened')
    } else {
      let tab = this.appService.tabs.find(f => f.isSelected);
      // Next, we navigate to the newly created claim

      // Finally, we close out this tab
      this.closeTab(tab);
      let rt2 = '#/'
      this.router.navigate(rt2);
    }
  }
  saveDaily() {
    // alert('this.currentItem.dailies === {}'+this.flag.dailies+' '+this.currentItem.dailies===undefined+this.currentItem.dailies.length===0)
    // if (this.flag === 0) {
    //   alert('No line items are saved')
    // } else {
    let dailies = this.currentItem.dailies

    if ((this.openCount === 0) && (dailies.length === 0)) {
      alert('nothing to save')
    } else {
      if (this.openCount > 0) {
        alert('still have items opened')
      } else {
        this.dialogService.open({ viewModel: Prompt, model: 'Save or Cancel?', lock: false }).whenClosed(response => {
          if (!response.wasCancelled) {
            console.log('Save')
            this.api.getbatchno().then((jsonResna) => {
              let batchno = jsonResna[0].nextavail
              this.api.addDaily(dailies, batchno).then((jsonRes) => {
                // First, grab the current tabvb  this.currentItem.dailies
                //  this.navigateToNewClaim();
                // Finally, we close out this tab
                let tab = this.appService.tabs.find(f => f.isSelected);
                this.closeTab(tab);
              });
            });

          } else {
            console.log('cancel');
          }
          console.log(response.output);
        });
      }
    }
    //this.currentAdjuster = this.currentItem.ADJUSTER
    // this.currentnewItem.STATUS = 1;
    // let newNoteWorkDate = moment().format('YYYY-MM-DD');
    // this.currentnewItem.EDITED = newNoteWorkDate;
    // this.currentnewItem.RECEIVED = newNoteWorkDate;

  }
  navigateToNewClaim() {
    let rt2 = 'daily/data/' + this.currentnewItem.CLAIM_NO;
    this.router.navigate(rt2);
  }
  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }


}

