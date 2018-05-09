import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';

// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';
// ${currentItem.adjusters}[0].ADJUSTER_NAME

@inject(ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';

  constructor(api, appService, dataService, eventAggregator) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();


    // this.genre= { id:7,name: 'Photography'};/
  }

  activate(params, routeConfig) {

    // if (params.id) {
    //   this.recordId = params.id;


    //   if (this.recordId === 'create') {

    //   } else {
    //     console.log('this.recordId ', this.recordId);




    //     return this.api.findclaimantOne(this.recordId).then((jsonRes) => {
    //         let claimant = jsonRes.data
    //       console.log('claimant ', claimant);
    //       this.appService.currentClamant = claimant[0];
    //       this.appService.testclaimantrec = claimant[0];
    //       this.appService.originalclaimantrec = JSON.parse(JSON.stringify(claimant[0]));
    //       console.log('data-form:activate -  this.appService.currentInsco', this.appService.currentClamant);



    //     });
    //     // }
    //   }
    // }

    // see below

  }

  attached() {

    //
    // let insco = this.appService.InsurancecompanyList
    // let serviceinsco = this.appService.currentClaim.INSURANCE_COMPANY_ID
    // let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco )
    // let item = insco[aid];
    // this.inscoAdjusters = item.contacts
    // this.inscoAddresses= item.addresses

    //
    if (this.appService.dataFormOneToOneTabs.length > 0) {
      let tab = this.appService.dataFormOneToOneTabs[0];

      this.selectOneToOneTab(tab);
    }
    if (this.appService.dataFormOneToManyTabs.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs[0];
      this.selectOneToManyTab(tab);
    }
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
  bind() {
   
  }

  createEventListeners() {
    this.adjusterSelectedListener = e => {
      if (e && e.detail) {
        this.adjuster = e.detail.value;
        console.log('this.adjuster  createEventListeners ', this.adjuster)
      }
    };
    //this.ratingChangedListener =  e => this.rating = e.rating;
  }



  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  savecode() {
    
    // console.log(' call save ', JSON.stringify(this.appService.currentClaim) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    // //return 
    // if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

    //   this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
    //     console.log('jsonRes ', jsonRes);

    //   });

    // }
  }
  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    this.appService.currentItem = this.currentItem
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    this.appService.currentItem = this.currentItem
    return true;
  }
}

