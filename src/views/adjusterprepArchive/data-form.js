
import { Router } from 'aurelia-router';
import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';

import { UtilService } from '../../services/util-service';

@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(router, api, utilService, appService, dataService, eventAggregator) {
    this.router = router;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();
    this.dailies = []
    this.utilService = utilService
  }

  activate(params, routeConfig) {
    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log(this.queryParams)
    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {

      } else {
        let adj = this.queryParams.split('=')[1]
        return this.api.adjusterprepone(adj).then((jsonRes) => {
          this.dailies = jsonRes.data
          console.log('dailies ', this.dailies);
        });
        // if (this.recordId === "AdjusterAll") {
        //   //this.recordId='AdjusterAll'
        //   console.log('this.recordId ', this.recordId);
        //   return this.api.adjusterprep().then((jsonRes) => {
        //     this.dailies = jsonRes.data
        //     console.log('dailies ', this.dailies);
        //   });
        // } else {
        //  let adj = this.queryParams.split('=')[1]
        //   return this.api.adjusterprepone(adj).then((jsonRes) => {
        //     this.dailies = jsonRes.data
        //     console.log('dailies ', this.dailies);
        //   });

        // }
      }

      // see below

    }
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

  close() {


    let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim
    // Finally, we close out this tab
    this.closeTab(tab);
    let rt2 = '#/arprep/' //Searcharprep?'
    this.router.navigate(rt2);

  }

  save() {
    // alert(' call save ' + this.dailies)
    // console.log(' call save ', JSON.stringify(this.appService.currentDaily) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    // //return 
    // if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

    this.api.saveDaily(this.dailies).then((jsonRes) => {
      console.log('jsonRes ', jsonRes);

    });
    let tab = this.appService.tabs.find(f => f.isSelected);
    this.closeTab(tab);
    let rt2 = '#/ajusterprep/'
    this.router.navigate(rt2);

  }


  closeTab(tab) {
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
  // selectOneToOneTab(tab) {
  //   this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToOneTab = tab;
  //   this.appService.currentItem = this.currentItem
  //   return true;
  // }
  // selectOneToManyTab(tab) {
  //   this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToManyTab = tab;
  //   this.appService.currentItem = this.currentItem
  //   return true;
  // }
}

// attached() {


  //   // if (this.appService.dataFormOneToOneTabs.length > 0) {
  //   //   let tab = this.appService.dataFormOneToOneTabs[0];

  //   //   this.selectOneToOneTab(tab);
  //   // }
  //   // if (this.appService.dataFormOneToManyTabs.length > 0) {
  //   //   let tab = this.appService.dataFormOneToManyTabs[0];
  //   //   this.selectOneToManyTab(tab);
  //   // }
  // }
  // selectChangedIA(adjusterid) {

  //   let insadjusters = this.inscoAdjusters
  //   let aid = insadjusters.findIndex(x => x.INSURANCE_CONTACT_ID === adjusterid)
  //   let item = insadjusters[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
  //   this.currentnewItem.inscontact = item

  // }
  // selectChangedIAddr(insurancecompanyid) {

  //   let insaddresses = this.inscoAddresses
  //   let aid = insaddresses.findIndex(x => x.INSURANCE_COMPANY_ID === insurancecompanyid)
  //   let item = insaddresses[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
  //   this.currentnewItem.insaddress = item

  // }
  // bind() {
  //   // this.adjusters = this.appService.adjusterList
  //   // console.log('adjusters ', this.adjusters);

  //   // this.bookApi.getGenres().then(genres => {
  //   //   this.adjusters = genres;
  //   // });
  // }

/* 
       select DAILY_DETAIL_ID, DAILY_ID, WORK_DATE, WORK_DESCRIPTION, 
	     SERVICE_ID, MILEAGE, EXPENSE, EXPENSE_TYPE_ID, WORK_TIME,
              AR_ID, AR_DATE, CLAIM_ID, CLAIM_NO, WEEKOF, ADJUSTER_ID,
			  STATUS, ENTRY_TYPE, WORK_TIME_BILLED, WORK_TIME_PAID,
              BATCH_NO, ADJUSTER_NOTES, WORK_TIME_CARRIER, EXPENSE_APPROVED, 
			  TRAVEL_APPROVED, ADMIN_NOTES, ADJUSTER_PAID_DATE,
              ADJUSTER_CREATED_DATE, EXPENSE_BILLEDAPPROVED, WORKTIME_BILLEDAPPROVED, 
			  ADJUSTER_PAID, TRAVEL_BILLEDAPPROVED,
              ADJ_STATUS, INV_STATUS, PERIOD
       from DAILY_DETAIL    where DAILY_DETAIL_ID> 700000*/
