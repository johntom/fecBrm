import { Router } from 'aurelia-router';

import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';


// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';


// ${currentItem.adjusters}[0].ADJUSTER_NAME

@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(router, api, appService, dataService, eventAggregator) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();
    this.inscoAdjusters = []
    this.inscoAddresses = []
    this.router = router;

    // this.genre= { id:7,name: 'Photography'};/
  }

  activate(params, routeConfig) {
    this.tabname = this.appService.currentSearch

    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {

      } else {
        console.log('this.recordId ', this.recordId);




        return this.api.findclaimOne(this.recordId).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let claim = jsonRes.data
          console.log('claiminv ', claim);

          this.appService.currentClaim = claim[0];

          this.appService.testrec = claim[0];
          this.appService.originalrec = JSON.parse(JSON.stringify(claim[0]));
          console.log('data-form:activate -  this.appService.currentClaim', this.appService.currentClaim);

          if (claim[0].adjusters !== undefined) {
            this.primary = claim[0].adjusters[0].ADJUSTER_NAME
          }
          let insco = this.appService.InsurancecompanyList
          let serviceinsco = this.appService.currentClaim.INSURANCE_COMPANY_ID // * 1
          let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
          let item = insco[aid];
          this.inscoAdjusters = item.contacts
          this.inscoAddresses = item.addresses


        });
        // }
      }
    }

    // see below

  }
  // findAdjusterListOption(value) {
  //   const result = this.appService.adjusterList.find(x => x.ADJUSTER_NAME === value);
  //   if (result) {
  //     return result.ADJUSTER_ID;
  //   }
  //   return null;
  // }
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
    // this.adjusters = this.appService.adjusterList
    // console.log('adjusters ', this.adjusters);

    // this.bookApi.getGenres().then(genres => {
    //   this.adjusters = genres;
    // });
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


  saveclaim() {
    // alert('save claim') //this.currentItem this.appService.originalrec 
    // console.log('this.adjuster.ADJUSTER_ID ',this.adjuster.ADJUSTER_ID )
    // this.appService.currentClaim.ADJUSTER_ID = this.adjuster.ADJUSTER_ID 
    // let tab2 = this.appService.tabs.find(f => f.isSelected);

    console.log(' call save ', JSON.stringify(this.appService.currentClaim) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    //return 
    if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

      this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);
        let tab = this.appService.tabs.find(f => f.isSelected);

        this.closeTab(tab);
        let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
        console.log('this.tabname ', this.tabname)
        this.router.navigate(rt2);

      });

    }
  }
  close() {
    let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim
    // Finally, we close out this tab
    this.closeTab(tab);
    let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
    console.log('this.tabname ', this.tabname)
    this.router.navigate(rt2);
  }
  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    // this.appService.currentItem = this.appService.currentClaim //this.currentItem
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    // this.appService.currentItem = this.appService.currentClaim //this.currentItem
    return true;
  }
  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }

}

