import { Router } from 'aurelia-router';

import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Prompt } from './prompt';
import { Promptyn } from './promptyn';
import { DialogService } from 'aurelia-dialog';
import { lodash } from 'lodash'
@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator, DialogService)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';
  products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' },
  ];

  productMatcher = (a, b) => a.id === b.id;

  selectedProduct = { id: 1, name: 'CPU' };

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
    this.inscontactMatcher = {}
    this.skippromt = false
    this.navaway = false

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

          this.appService.currentView = this.appService.currentClaim; // must set on every view
          this.appService.testrec = claim[0];



          //xxx// this.appService.originalrec = this.appService.currentClaim  //JSON.parse(JSON.stringify(claim[0]));
          // // this.appService.currentView.isDirty = false
          // this.appService.currentClaim.isDirty = () => {
          //   return JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)
          // };
          // this.appService.currentClaim.reset = () => {
          //   this.appService.originalrec = this.appService.currentClaim;
          // }



          this.appService.currentView.isDirty = () => {
            return JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)
          };
          this.appService.currentView.reset = () => {
            // alert('in reset ')
            this.appService.originalrec = this.appService.currentClaim;
          }


          // this.appService.currentView = this.appService.currentClaim; // must set on every view
          // this.appService.testrec = claim[0];
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
            let icd
            let bid
            // this.appService.currentClaim.inscoAdjusters = item.contacts

            this.inscoAdjusters = item.contacts
            icd = this.appService.currentClaim.inscontact.INSURANCE_CONTACT_ID
            bid = this.inscoAdjusters.findIndex(x => x.INSURANCE_CONTACT_ID === icd)

            this.inscontactMatcher = this.inscoAdjusters[bid]

            let a = this.inscoAdjusters
            let b = this.appService.currentClaim.inscontact
            this.inscontactMatcher = (a, b) => a.INSURANCE_CONTACT_ID === b.INSURANCE_CONTACT_ID;
            // productMatcher = (a, b) => a.id === b.id;
            //let oid = this.inscoAdjusters.findIndex(x => x.INSURED_ID === b.INSURANCE_CONTACT_ID)
            console.log('inscontactMatcher ', this.inscontactMatcher)
            //   this.selectedContact = this.appService.currentClaim.inscontact
          }

          if ((this.appService.currentClaim.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
            let insured = this.appService.insuredList
            oid = insured.findIndex(x => x.INSURED_ID === this.appService.currentClaim.INSURED_ID)
            console.log('oid ', oid)
            insuredobj = this.appService.insuredList[oid]//10]
            console.log('insuredobj ', insuredobj)
            if (insuredobj !== undefined) this.appService.currentClaim.LEGAL_NAME = insuredobj.LEGAL_NAME
          }
          // setup insured
          let oid
          let insuredobj
          let insured = this.appService.insuredList
          if ((this.appService.currentClaim.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
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

  attached() {
    // @HostListener('window:beforeunload', ['$event'])
    // handleClose($event) {
    //     $event.returnValue = false;

    // }


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

    // let insadjusters = this.inscoAdjusters
    // let aid = insadjusters.findIndex(x => x.INSURANCE_CONTACT_ID === adjusterid)
    // let item = insadjusters[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // //  this.currentnewItem.inscontact = item
    // //this.currentItem.inscontact = item
    // this.appService.currentClaim.inscontact = item
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

  }

  detached() {
    // alert('det')
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  saveclaim(option) {

    console.log(' call save ', JSON.stringify(this.appService.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    //return 

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
    if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

      if (this.recordId === 'create') {
        this.api.addclaim(this.appService.currentClaim).then((jsonRes) => {
          // console.log('jsonRes ', jsonRes);
          // let tab = this.appService.tabs.find(f => f.isSelected);

          // this.closeTab(tab);
          // // let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
          // // console.log('this.tabname ', this.tabname)

          window.alert("Save successful!");
          // this.skippromt = true
          if (option === 1) this.requestclose()  //this.close()
        });
      } else {
        this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);

          //  this.router.navigate(rt2);
          window.alert("Save successful!");
          this.skippromt = true
          if (option === 1) {

            // let tab = this.appService.tabs.find(f => f.isSelected);
            this.requestclose() //tab   this.close()


          } else {
            this.appService.originalrec = this.appService.currentClaim//JSON.parse(JSON.stringify(claim[0]));
          }
        });
      }

    }
  }



  // if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec) 
  //&& this.skippromt === false) {


  // canDeactivate() {
  //   // if(!this.isPristine()) {
  //   //     var result = confirm('Do you really want to discard your changes?');
  //   //     return result;
  //   // }
  //   if (JSON.stringify(this.appService.currentClaim) !==
  //     JSON.stringify(this.appService.originalrec)) {
  //     var result = confirm('canDeactivate:Do you really want to discard your changes?');
  //     if (result) {
  //       let tab = this.appService.tabs.find(f => f.isSelected);
  //       // Next, we navigate to the newly created claim
  //       // Finally, we close out this tab

  //       this.closeTab(tab);
  //       let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //       console.log('this.tabname ', this.tabname)
  //       this.router.navigate(rt2);
  //     }
  //     return result;
  //   } else {
  //     let tab = this.appService.tabs.find(f => f.isSelected);
  //     this.closeTab(tab);
  //     let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //     console.log('this.tabname ', this.tabname)
  //     this.router.navigate(rt2);
  //   }
  // }
  canDeactivate() {
    // always boolean make isDirty
    if (this.appService.currentClaim && this.appService.currentClaim.isDirty()) {
      //if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {
      //this.appService.currentClaim.isRecordDirty = true
      return false;


    } else {
      //this.appService.currentClaim.isRecordDirty = false
      return true
    }

  }
  //    async tryCloseTab(item, tab, route) {
  requestclose() {
    const resetFunc = () => { this.appService.originalrec = this.appService.currentClaim; };
    let cand = this.canDeactivate()
    let tab = this.appService.tabs.find(f => f.isSelected);
    let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
    this.appService.tryCloseTab(this.appService.currentClaim, tab, rt2);
    // if (cand) {
    //   this.appService.tryCloseTab(this.appService.currentClaim, tab, rt2, resetFunc);
    //   //  this.close()
    // } else {
    //   this.appService.tryCloseTab(this.appService.currentClaim, tab, rt2, resetFunc);
    // }
  }


  // close(){

  //  let tab = this.appService.tabs.find(f => f.isSelected);
  //     // // Next, we navigate to the newly created claim
  //     // // Finally, we close out this tab
  //     this.closeTab(tab);
  //     let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //     //console.log('this.tabname ', this.tabname)
  //     this.router.navigate(rt2);
  // }

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
  // closeTab(tab) {
  //   // alert('in close tab')
  //   if (JSON.stringify(this.appService.currentClaim) !==
  //     JSON.stringify(this.appService.originalrec)) {
  //     var result = confirm('closeTab:Do you really want to discard your changes?');
  //     if (result) {

  //       let index = this.appService.tabs.indexOf(tab);
  //       tab.isSelected = false;
  //       this.appService.tabs.splice(index, 1);

  //     } else {
  //       // this.saveclaim(1)
  //       this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
  //         console.log('jsonRes ', jsonRes);
  //       })
  //     }
  //   }
  //}






  //canDeactivate() {
  // return confirm('Are you sure you want to leave this page?');
  // if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.testrec) && this.skippromt === false) {
  //  if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec) && this.skippromt === false) {


  //   return confirm('You have unsaved changes to this record which will be lost. Are you sure you want to leave this page?');
  //   let tab = this.appService.tabs.find(f => f.isSelected);
  //   // Next, we navigate to the newly created claim
  //   // Finally, we close out this tab
  //   this.closeTab(tab);
  //   let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //   console.log('this.tabname ', this.tabname)
  //    this.router.navigate(rt2);

  //   if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec) && this.skippromt === false) {

  //     if (confirm("Unsaved data, are you sure you want to navigate away?")) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   else {
  //     return true;
  //   }

  // }
