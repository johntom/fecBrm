import { Router } from 'aurelia-router';
import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
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
  currentnewItem;
  constructor(router, api, appService, dataService, eventAggregator, dialogService) {
    this.router = router;
    this.api = api;
    this.appService = appService;
    //  alert('in cons2')
    // this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    // // this.createEventListeners();
    this.appService.currentClaim = 0 // {}; DO NOT DO THIS
    this.inscoAdjusters = []
    this.inscoAddresses = []
    this.dialogService = dialogService
    //breaks form
    //    this.currentnewItem={}
    //         let newNoteWorkDate = moment().format('YYYY-MM-DD')
    // this.currentnewItem.EDITED =newNoteWorkDate
    // this.currentnewItem.RECEIVED =newNoteWorkDate

  }

  activate() {

  }

  showModal(fieldname) {
    // alert('fieldname'+fieldname)
    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      // if (!response.wasCancelled) {
      //   console.log('Delete')
      //   let notes = this.currentItem.notes
      //   notes.splice(index, 1)// start, deleteCount)
      // } else {
      //   console.log('cancel');
      // }
      console.log(response.output);
    });
  }

  selectChanged(insid) {

    let insco = this.appService.InsurancecompanyList
    let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === insid)
    let item = insco[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.inscoAdjusters = item.contacts
    this.inscoAddresses = item.addresses
    // adjusters[index] = item

  }

  selectChangedIA(adjusterid) {

    let insadjusters = this.inscoAdjusters
    let aid = insadjusters.findIndex(x => x.INSURANCE_CONTACT_ID === adjusterid)
    let item = insadjusters[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.currentnewItem.inscontact = item

  }
  selectChangedIAddr(insurancecompanyid) {

    let insaddresses = this.inscoAddresses
    let aid = insaddresses.findIndex(x => x.INSURANCE_COMPANY_ID === insurancecompanyid)
    let item = insaddresses[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.currentnewItem.insaddress = item

  }

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
  saveclaim() {
    console.log('this.adjuster.ADJUSTER_ID ', this.currentnewItem.ADJUSTER_ID);
    this.currentnewItem.STATUS = 1; // open 2 = closed 3=reopened
    let newNoteWorkDate = moment().format('YYYY-MM-DD');
    this.currentnewItem.EDITED = newNoteWorkDate;
    this.currentnewItem.RECEIVED = newNoteWorkDate;

    this.api.addclaim(this.currentnewItem).then((jsonRes) => {
      // First, grab the current tab
      let tab = this.appService.tabs.find(f => f.isSelected);
      // Next, we navigate to the newly created claim
      this.navigateToNewClaim();
      // Finally, we close out this tab
      this.closeTab(tab);
    });
  }

  navigateToNewClaim() {
    let rt2 = 'claim/data/' + this.currentnewItem.CLAIM_NO;
    this.router.navigate(rt2);
  }
  closeTab(tab) {
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }


}

