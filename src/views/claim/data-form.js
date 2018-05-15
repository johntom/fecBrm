import { Router } from 'aurelia-router';

import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Prompt } from './prompt';
import { DialogService } from 'aurelia-dialog';
import { lodash } from 'lodash'
@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator, DialogService)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(router, api, appService, dataService, eventAggregator, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();
    this.inscoAdjusters = []
    this.inscoAddresses = []
    this.router = router;
    this.dialogService = dialogService
    //  this.lodash = lodash;
    // this.genre= { id:7,name: 'Photography'};/
  }

  activate(params, routeConfig) {
    this.tabname = this.appService.currentSearch

    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {
        this.appService.currentClaim = {}
        this.appService.testrec = {}
        this.appService.originalrec = {}
        this.appService.currentClaim.insured = {}
        this.appService.currentClaim.claimant = {}
        this.appService.currentClaim.insco = {}
        this.appService.currentClaim.insaddress = {}
        this.appService.currentClaim.inscontact = {}
        this.appService.currentClaim.diaries = []
        this.appService.currentClaim.notes = []
        this.appService.currentClaim.adjusters = []


        // filter adjusterlist with ACTIVE = -1

        //this.currentItem.insured.INSURED_ID
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
          // let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
          // Update the current adjuster with the new values
          // selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
          // // We don't need to change the TYPE as it is bound correctly from the UI
          // selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
          if (claim[0].adjusters !== undefined && claim[0].adjusters.length > 0) {
            // this.appService.currentClaim.primaryAdjuster = claim[0].adjusters[0].ADJUSTER_NAME
            let aid = claim[0].adjusters.findIndex(x => x.TYPE === "Primary")
            this.appService.currentClaim.primaryAdjuster = claim[0].adjusters[aid].ADJUSTER_NAME;
          }
          let insco = this.appService.InsurancecompanyList
          let serviceinsco = this.appService.currentClaim.INSURANCE_COMPANY_ID * 1
          if (serviceinsco !== undefined) {
            let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
            let item = insco[aid];
            this.inscoAdjusters = item.contacts
          //  this.inscoAddresses = item.addresses
          //let aid =  this.inscoAdjusters.findIndex(x => x.inscontact === serviceinsco)
         
          }
          

          if ((this.appService.currentClaim.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
            //    oid = insured.findIndex(x => x._id === this.appService.currentClaim.INSURED_ID)
            // chnage INSURED_ID to _id
              let insured = this.appService.insuredList
            oid = insured.findIndex(x => x.INSURED_ID === this.appService.currentClaim.INSURED_ID)
            console.log('oid ',oid)
            insuredobj = this.appService.insuredList[oid]//10]
             console.log('insuredobj ',insuredobj)
            if (insuredobj !== undefined) this.appService.currentClaim.LEGAL_NAME = insuredobj.LEGAL_NAME
          }
          // setup insured
          let oid
          let insuredobj
          let insured = this.appService.insuredList
          if ((this.appService.currentClaim.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
            //    oid = insured.findIndex(x => x._id === this.appService.currentClaim.INSURED_ID)
            // chnage INSURED_ID to _id
            oid = insured.findIndex(x => x.INSURED_ID === this.appService.currentClaim.INSURED_ID)
            insuredobj = this.appService.insuredList[oid]//10]
            if (insuredobj !== undefined) this.appService.currentClaim.LEGAL_NAME = insuredobj.LEGAL_NAME
          }



          // end setup insured

        });

      }
    }


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
      if (fieldname === 'insco') {
        let serviceinsco = this.appService.currentClaim.INSURANCE_COMPANY_ID * 1 // or insco.IN...
        let insco = this.appService.InsurancecompanyList
        if (serviceinsco !== undefined) {
          let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
          let item = insco[aid];
          this.inscoAdjusters = item.contacts
          this.inscoAddresses = item.addresses
        }
      }
      console.log(response.output);
    });
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
 this.currentItem.inscontact = item
  this.appService.currentClaim.inscontact = item
  }
  // selectChangedIAddr(insurancecompanyid) {

  //   let insaddresses = this.inscoAddresses
  //   let aid = insaddresses.findIndex(x => x.INSURANCE_COMPANY_ID === insurancecompanyid)
  //   let item = insaddresses[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
  //   this.currentnewItem.insaddress = item

  // }
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

  canDeactivate() {
    return confirm('Are you sure you want to leave this page?');
  }
  saveclaim() {
    // alert('save claim') //this.currentItem this.appService.originalrec 
    // console.log('this.adjuster.ADJUSTER_ID ',this.adjuster.ADJUSTER_ID )
    // this.appService.currentClaim.ADJUSTER_ID = this.adjuster.ADJUSTER_ID 
    // let tab2 = this.appService.tabs.find(f => f.isSelected);
    //  lodash.count = lodash.sumBy(this.appService.currentClaim.adjusters, lodash.flow(pred, Boolean));
    // Whether its implemented that way or not. It's pretty clear what would be expected from:
    //  lodash.count = lodash.sumBy(collection, _.flow(pred, Boolean));
    //  let primaryct = lodash.count(this.appService.currentClaim.adjusters, x => x > 1)  // I read this is, "how many of myNumbers are > 5

    let pcount = 0
    this.appService.currentClaim.adjusters.forEach(function (item, index) {
      console.log(item);
      if (item.TYPE === "Primary") {
        pcount++
      }
    });
    if (pcount > 1) {

      return confirm('There can only be one primary adjuster');
    }
    console.log('primaryct call save ', pcount, JSON.stringify(this.appService.currentClaim) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    //return 
    if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {
      if (this.recordId === 'create') {
        this.api.addclaim(this.appService.currentClaim).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);
          // this.recordId =  jsonRes.id
          // this.mess = 'Record has been added'
          this.closeTab(tab);
          let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
          console.log('this.tabname ', this.tabname)
          this.router.navigate(rt2);
        });
      } else {
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

