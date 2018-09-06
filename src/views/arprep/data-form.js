
import { Router } from 'aurelia-router';
import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(router, api, appService, dataService, eventAggregator) {
    this.router = router;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();
    this.dailies = []
  }

  activate(params, routeConfig) {
    if (params.id) {
      this.recordId = params.id
      if (this.recordId === 'create') {

      } else {
        console.log('this.recordId ', this.recordId)
        return this.api.arprepone(this.recordId).then((jsonRes) => {
          console.log('jsonRes ', jsonRes.data)
          this.dailies = jsonRes.data
          console.log('dailies ', this.dailies)
        });
      }
    }
    // see below
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
    let rt2 = '#/arprep/Searcharprep?'
    this.router.navigate(rt2);
  }

  saveCreate() {
    // this is final
    let status = 1
    let claimno = this.appService.currentDaily.CLAIM_NO
    //  this.api.saveDailyforar(this.dailies, status).then((jsonRes) => {
    this.api.saveDaily(this.dailies, status).then((jsonRes) => {

      console.log('jsonRes ', jsonRes);

      this.api.createAR(this.dailies, this.appService.currentDaily, status).then((jsonRes) => {
        this.dailies=[]
        console.log('jsonRes ', jsonRes);
      });
    });
    // let rt2a = 'https://jif.bergenrisk.com:8081/api/v1/onepdf/' + claimno + '/' + jsonRes.data + '.pdf'
    let rt2a = 'https://masbackend.brmflow.com/api/v1/onepdf/' + claimno + '/' + jsonRes.data + '.pdf'

    console.log('rt2a ' + rt2a + ' jsonRes ' + jsonRes)
    // alert('rt2 ' + rt2)
    window.open(rt2a, '_blank');

// sep comment next 4
    // let tab = this.appService.tabs.find(f => f.isSelected);
    // this.closeTab(tab);
    // let rt2 = '#/arprep/Searchadjusterprep?'
    // this.router.navigate(rt2);
  }

  //let template = req.param('template')

  //  let filepath = 'E:/Docs/Images/pdf'
  saveCreateTemp() {
    // this is temp
    let status = 0
    this.api.saveDaily(this.dailies, status).then((jsonRes) => {
      console.log('jsonRes ', jsonRes);

      let claimno = this.appService.currentDaily.CLAIM_NO
      this.api.createAR(this.dailies, this.appService.currentDaily, status).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);
        ////  let rt2 = 'http://jif.bergenrisk.com:8081/api/v1/onepdf/' + claimno + '/' + jsonRes.data + '.pdf'
        //let rt2 = 'https://jif.bergenrisk.com:8081/api/v1/onepdf/' + claimno + '/' + jsonRes.data + 'temp.pdf'
        let rt2 = 'https://masbackend.brmflow.com/api/v1/onepdf/' + claimno + '/' + jsonRes.data + 'temp.pdf'
        console.log('rt2 ' + rt2 + ' jsonRes ' + jsonRes)
        // alert('rt2 ' + rt2)
        window.open(rt2, '_blank');
      });
    });

  }

  // saveCreatePDF() {
  //   // this is a final BUT DOES NOT GET CALLED
  //   this.api.saveDaily(this.dailies).then((jsonRes) => {
  //     console.log('jsonRes ', jsonRes);
  //     let status = 0
  //     this.api.createAR(this.dailies, this.appService.currentDaily, status).then((jsonRes) => {
  //       console.log('jsonRes ', jsonRes);
  //     });
  //   });
  //   // keep up to view pdf
  //   // let tab = this.appService.tabs.find(f => f.isSelected);
  //   // this.closeTab(tab);
  //   // let rt2 = '#/arprep/Searcharprep?'
  //   // this.router.navigate(rt2);
  // }
  save() {
    this.api.saveDaily(this.dailies).then((jsonRes) => {
      console.log('jsonRes ', jsonRes);

    });
    // let tab = this.appService.tabs.find(f => f.isSelected);
    // this.closeTab(tab);
    // let rt2 = '#/arprep/Searcharprep?'
    // this.router.navigate(rt2);

  }
  toggleAll() {
    //alert(`Welcome, ${this.fullName}!`);  
    let i
    let dl = this.dailies.length

    for (i = 0; i < dl; i++) {
      //if (this.dailies[i].$isSelected)  this.dailies[i].$isSelected = false // approved for billing
      this.dailies[i].$isSelected ? this.dailies[i].$isSelected = false : this.dailies[i].$isSelected = true
    }
    return true // nneded to show if checked or not
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


//attached() {


    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];

    //   this.selectOneToOneTab(tab);
    // }
    // if (this.appService.dataFormOneToManyTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToManyTabs[0];
    //   this.selectOneToManyTab(tab);
    // }
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
