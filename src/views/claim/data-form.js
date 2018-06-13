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
    // console.log('lodash',lodash)

  }
  // attached(){
  //   this.lossdesc = appService.currentClaim.DESCRIPTION
  // }
  activate(params, routeConfig) {
    //  // this.tabname = this.appService.currentSearch
    //   // this.tabindex = this.appService.currentSearch
    //  // this.appService.tabs.forEach(t => t.tabname = this.tabname);
    //   // let lasttabindex = this.appService.tabs.length-1
    //   // let newtabname = this.appService.tabs[lasttabindex].name
    //   // let aid = this.appService.tabs.findIndex(x => x.tab.name === newtabname)
    //   this.appService.tabindex = this.appService.tabs.length-1
    //   this.appService.currenttabname =  this.appService.tabs.findIndex(t => t.href = this.appService.justaddedtabname);
    //   if ( this.appService.currenttabname ===  0)  this.appService.currenttabname  = this.appService.justaddedtabname
    //   let aid = claim[0].adjusters.findIndex(x => x.TYPE === "Primary")

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
        // console.log('this.recordId ', this.recordId);
        // if ((this.appService.currentClaim !== undefined) && (this.appService.currentClaim.CLAIM_NO === this.recordId)) {
        //  alert('You have previously modified and unsaved data')
        // } else {
        return this.api.findclaimOne(this.recordId).then((jsonRes) => {
          // console.log('jsonRes ', jsonRes);
          let claim = jsonRes.data
          // this.appService.currentClaim = {}
          this.appService.currentClaim = claim[0];
          this.currentItem = claim[0]
          this.currentItem.xdesc = claim[0].DESCRIPTION

          // this.lossdesc = this.appService.currentClaim.DESCRIPTION
          //  this.appService.DESCRIPTION = this.appService.currentClaim.DESCRIPTION
          console.log('claim[0] ', this.currentItem.DESCRIPTION, claim[0]);
          // cant do this.appService.currentClaim = JSON.stringify( claim[0])
          //this.appService.originalrec =  claim[0]


          // this.appService.currentClaim.isDirty = () => {
          //   return JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)
          //  alert(this.appService.currentClaim.DESCRIPTION +' '+ this.appService.originalrec.DESCRIPTION)
          //   alert(this.appService.currentClaim===this.appService.originalrec)
          // return (this.appService.currentClaim) !== (this.appService.originalrec)
          // console.log('compare ',JSON.stringify(this.appService.currentClaim) !== this.appService.originalrec,JSON.stringify(this.appService.currentClaim) , this.appService.originalrec)
          // console.log('compare1 ', JSON.stringify(this.appService.currentClaim))
          // console.log('compare2 ', this.appService.originalrec)

          //    return (this.appService.currentClaim.DESCRIPTION) !== (this.appService.originalrec.DESCRIPTION)
          //   console.log('this.compare()', this.compare())
          ///  return !this.compare()

          // };
          // this.appService.currentClaim.reset = () => {
          //   this.appService.originalrec = this.appService.currentClaim;
          // }


          //  this.appService.currentItem.isDirty = () => {
          //               return JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)
          //             };
          //             this.appService.currentItem.reset = () => {
          //               this.appService.originalrec = this.appService.currentItem;
          //             }
          //             this.appService.currentView = this.appService.currentItem; // must set on every view

          //             this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))// inv[0]));


          this.appService.currentView = this.currentItem; // must set on every view
          this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));
          this.appService.testrec = claim[0];
          this.currentItem.isDirty = () => {
            //return JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)
            let tf = this.comparedata()
            alert(tf)
            let revtf
            tf === true ? revtf = false : revtf = true
            alert(revtf)
            return revtf
          };
          this.currentItem.reset = () => {
            this.appService.originalrec = this.currentItem;
          }
          //6-13          this.appService.currentView = this.currentItem; // must set on every view

          //6-13 this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));


          //6-13 this.appService.testrec = claim[0];

          // this.appService.originalrec = this.appService.testrec 
          //  this.appService.originalrec = lodash.cloneDeep(this.appService.currentClaim)// claim[0])
          //  var copy = {}; for (var item in obj) { obj.hasOwnProperty(item) && (copy[item] = obj[item]); }
          // var copy = {}; 
          // for (var item in  this.appService.testrec) { 
          //    this.appService.testrec.hasOwnProperty(item) && (copy[item] =  this.appService.testrec[item])
          //    }
          //  this.appService.originalrec = copy;
          //  this.appService.originalrec = JSON.parse(JSON.stringify(claim[0]));//.. must be deep other wise just a ref
          console.log('copy this.appService.originalrec ', this.appService.originalrec);
          // let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
          // Update the current adjuster with the new values
          // selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
          // // We don't need to change the TYPE as it is bound correctly from the UI
          // selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
          if (claim[0].adjusters !== undefined && claim[0].adjusters.length > 0) {
            // this.appService.currentClaim.primaryAdjuster = claim[0].adjusters[0].ADJUSTER_NAME
            let aid = claim[0].adjusters.findIndex(x => x.TYPE === "Primary")
            this.currentItem.primaryAdjuster = claim[0].adjusters[aid].ADJUSTER_NAME;
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
            icd = this.currentItem.inscontact.INSURANCE_CONTACT_ID
            bid = this.inscoAdjusters.findIndex(x => x.INSURANCE_CONTACT_ID === icd)
            this.inscontactMatcher = this.inscoAdjusters[bid]
            let a = this.inscoAdjusters
            let b = this.currentItem.inscontact
            this.inscontactMatcher = (a, b) => a.INSURANCE_CONTACT_ID === b.INSURANCE_CONTACT_ID;
            // productMatcher = (a, b) => a.id === b.id;
            //let oid = this.inscoAdjusters.findIndex(x => x.INSURED_ID === b.INSURANCE_CONTACT_ID)
            console.log('inscontactMatcher ', this.inscontactMatcher)
            //   this.selectedContact = this.appService.currentClaim.inscontact
          }

          if ((this.currentItem.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
            let insured = this.appService.insuredList
            oid = insured.findIndex(x => x.INSURED_ID === this.appService.currentClaim.INSURED_ID)
            console.log('oid ', oid)
            insuredobj = this.appService.insuredList[oid]//10]
            console.log('insuredobj ', insuredobj)
            if (insuredobj !== undefined) this.currentItem.LEGAL_NAME = insuredobj.LEGAL_NAME
          }
          // setup insured
          let oid
          let insuredobj
          let insured = this.appService.insuredList
          if ((this.currentItem.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
          } else {
            oid = insured.findIndex(x => x.INSURED_ID === this.currentItem.INSURED_ID)
            insuredobj = this.appService.insuredList[oid]//10]
            if (insuredobj !== undefined) this.currentItem.LEGAL_NAME = insuredobj.LEGAL_NAME
          }
          // end setup insured

        });
      }
      // } // state
    }


  }

  comparedata() {
    console.log('ADJUSTER', this.currentItem.ADJUSTER.ADJUSTER_NAME === this.appService.originalrec.ADJUSTER.ADJUSTER_NAME)
    console.log('ADJUSTER_NAME', this.currentItem.ADJUSTER_NAME === this.appService.originalrec.ADJUSTER_NAME)
    console.log('ADJUSTER_ID', this.currentItem.ADJUSTER_ID === this.appService.originalrec.ADJUSTER_ID)
    console.log('ASSIGNMENT_TYPE', this.currentItem.ASSIGNMENT_TYPE === this.appService.originalrec.ASSIGNMENT_TYPE)
    console.log('ASSIGNMENT_TYPE_DESC', this.currentItem.ASSIGNMENT_TYPE_DESC === this.appService.originalrec.ASSIGNMENT_TYPE_DESC)
    console.log('CARRIER_FILE_NO', this.currentItem.CARRIER_FILE_NO === this.appService.originalrec.CARRIER_FILE_NO)
    console.log('CLAIMANT_ID', this.currentItem.claimant.LAST_NAME === this.appService.originalrec.claimant.LAST_NAME)
    console.log('CLAIM_TYPE', this.currentItem.CLAIM_TYPE === this.appService.originalrec.CLAIM_TYPE)

    console.log('DATE_OF_LOSS', this.currentItem.DATE_OF_LOSS === this.appService.originalrec.DATE_OF_LOSS)
    console.log('LossDescription', this.currentItem.LossDescription === this.appService.originalrec.LossDescription)
    console.log('ASSIGNMENT_TYPE', this.currentItem.ASSIGNMENT_TYPE === this.appService.originalrec.ASSIGNMENT_TYPE)
    console.log('ASSIGNMENT_TYPE', this.currentItem.ASSIGNMENT_TYPE_DESC === this.appService.originalrec.ASSIGNMENT_TYPE_DESC)
    console.log('STATUS', this.currentItem.STATUS === this.appService.originalrec.STATUS)
    // console.log('claimant', this.currentItem.claimant === this.appService.originalrec.claimant)
    console.log('diaries', this.currentItem.diaries.length === this.appService.originalrec.diaries.length)
    console.log('docs',this.currentItem.docs.length, this.appService.originalrec.docs.length,this.currentItem.docs.length === this.appService.originalrec.docs.length)
    console.log('insured', this.currentItem.insured.LEGAL_NAME === this.appService.originalrec.insured.LEGAL_NAME)

    console.log('primaryAdjuster', this.currentItem.primaryAdjuster === this.appService.originalrec.primaryAdjuster)



    // console.log('2', this.currentItem.insco.INSURANCE_COMPANY_ID === this.appService.originalrec.insco.INSURANCE_COMPANY_ID)
    console.log('insco',this.currentItem.insco.NAME , this.appService.originalrec.insco.NAME, this.currentItem.insco.NAME === this.appService.originalrec.insco.NAME)
    //   console.log('3', this.currentItem.inscontact.NAME_LAST === this.appService.originalrec.inscontact.NAME_LAST)
    console.log('inscontact', this.currentItem.inscontact.NAME_LAST === this.appService.originalrec.inscontact.NAME_LAST)
    // console.log('4', this.currentItem.INSURED_ID === this.appService.originalrec.INSURED_ID)

    return (
      // this.currentItem.DESCRIPTION === this.appService.originalrec.DESCRIPTION
      // && this.currentItem.INSURED_ID === this.appService.originalrec.INSURED_ID
      // && this.currentItem.insco.INSURANCE_COMPANY_ID === this.appService.originalrec.insco.INSURANCE_COMPANY_ID
      // && this.currentItem.inscontact.NAME_LAST === this.appService.originalrec.inscontact.NAME_LAST


      // this.currentItem.ADJUSTER === this.appService.originalrec.ADJUSTER
      this.currentItem.ADJUSTER.ADJUSTER_NAME === this.appService.originalrec.ADJUSTER.ADJUSTER_NAME
      && this.currentItem.ADJUSTER_ID === this.appService.originalrec.ADJUSTER_ID
      // && this.currentItem.ADJUSTER_RATE === this.appService.originalrec.ADJUSTER_RATE
      && this.currentItem.ASSIGNMENT_TYPE === this.appService.originalrec.ASSIGNMENT_TYPE
      && this.currentItem.ASSIGNMENT_TYPE_DESC === this.appService.originalrec.ASSIGNMENT_TYPE_DESC
      // && this.currentItem.ASSIST_ID === this.appService.originalrec.ADJUSTER
      // && this.currentItem.ASSIST_RATE === this.appService.originalrec.ADJUSTER
      // && this.currentItem.ASSIST_RATE === this.appService.originalrec.ADJUSTER
      && this.currentItem.CARRIER_FILE_NO === this.appService.originalrec.CARRIER_FILE_NO
      && this.currentItem.claimant.LAST_NAME === this.appService.originalrec.claimant.LAST_NAME
      // && this.currentItem.CLAIM_ID === this.appService.originalrec.ADJUSTER
      // && this.currentItem.CLAIM_NO === this.appService.originalrec.ADJUSTER
      && this.currentItem.CLAIM_TYPE === this.appService.originalrec.CLAIM_TYPE
      // && this.currentItem.CLOSED_AMT === this.appService.originalrec.ADJUSTER
      // && this.currentItem.COMMENTS === this.appService.originalrec.ADJUSTER
      // && this.currentItem.DATE_INSTITUTED === this.appService.originalrec.ADJUSTER
      && this.currentItem.DATE_OF_LOSS === this.appService.originalrec.DATE_OF_LOSS
      // && this.currentItem.DEFAULT_FEE === this.appService.originalrec.ADJUSTER
      // && this.currentItem.DEFENSE_ATTY === this.appService.originalrec.ADJUSTER
      // DESCRIPTION
      && this.currentItem.LossDescription === this.appService.originalrec.LossDescription
      // && this.currentItem.FORMAL_INSTITUTED === this.appService.originalrec.ADJUSTER
      // && this.currentItem.INSURANCE_ADJUSTER_ID === this.appService.originalrec.INSURANCE_ADJUSTER_ID
      // && this.currentItem.INSURANCE_COMPANY_ID === this.appService.originalrec.INSURANCE_COMPANY_ID
      && this.currentItem.STATUS === this.appService.originalrec.STATUS
      && this.currentItem.adjusters.length === this.appService.originalrec.adjusters.length
      && this.currentItem.claimant === this.appService.originalrec.claimant
      && this.currentItem.diaries.length === this.appService.originalrec.diaries.length
      && this.currentItem.docs.length === this.appService.originalrec.docs.length
      && this.currentItem.insco.NAME === this.appService.originalrec.insco.NAME
      && this.currentItem.inscontact.NAME_LAST === this.appService.originalrec.inscontact.NAME_LAST
      && this.currentItem.insured.LEGAL_NAME === this.appService.originalrec.insured.LEGAL_NAME
      && this.currentItem.primaryAdjuster === this.appService.originalrec.primaryAdjuster

    )





    // EDITED
    // FORMAL_INSTITUTED
    // INV_STATUS
    // JURISDICTION_ID
    // LEGAL_NAME
    // LOCATION_ID
    // MARK_CLAIMOFFICE_ID
    // MULTI_CLAIMANTS
    // MULTI_NAMES
    // OPEN_AMT
    // PERIOD
    // PLAINTIFF_ATTY
    // POLICY_DEDUCTABLE
    // POLICY_EXPIRATION
    // POLICY_INCEPTION
    // POLICY_LIMITS
    // POLICY_NO
    // POLICY_NUMBER
    // RECEIVED
    // RECOVERY_AGAINST
    // RECOVERY_AVAIL
    // RECOVERY_COMMENTS
    // RECOVERY_DATE_FILED
    // RECOVERY_EST
    // RECOVERY_LIEN_FILED
    // RECOVERY_TYPE
    // REOPEN_FLAG
    // REPORTED
    // STATUS
    // TOTHRS

    // adjusters[]
    // claimant{}
    // diaries[]
    // docs[]
    // insco{}
    // inscontact{}
    // insured{}
    // isReviewed
    // primaryAdjuster




  }
  showModal(fieldname) {

    // alert('fieldname' + fieldname, this.appService.currentClaim.DESCRIPTION)
    console.log('fieldname' + fieldname, this.appService.currentClaim.DESCRIPTION)
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
    if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)) {

      if (this.recordId === 'create') {
        this.api.addclaim(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);

          this.closeTab(tab);
          // let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
          // console.log('this.tabname ', this.tabname)

          window.alert("Save successful!");
          this.skippromt = true
          if (option === 1) this.close()
        });
      } else {
        this.api.saveclaim(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);

          //  this.router.navigate(rt2);
          window.alert("Save successful!");
          this.skippromt = true
          if (option === 1) {

            let tab = this.appService.tabs.find(f => f.isSelected);
            // this.closeTab(tab);

            //// this.close()
            this.requestclose()

          } else {
            //    this.appService.originalrec = this.appService.currentClaim//JSON.parse(JSON.stringify(claim[0]));
            //  this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem));
            this.appService.originalrec = this.currentItem
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
    return new Promise((resolve, reject) => {
      if (this.currentItem &&
        this.currentItem.isDirty &&
        this.currentItem.isDirty()) {
        // Now, we need to query the user... result => makes it a closure
        this.appService.asyncHandleDirty().then(result => {
          if (!result.wasCancelled) {
            // need whenu have multi claims opened

            // this.appService.currentClaim = this.appService.originalrec

            resolve(true); // ok to leave
          } else {

            resolve(false); // cancel to stay

          }
        });
      } else {
        resolve(true);
      }
    });

    // // always boolean make isDirty
    // console.log('data-form:canDeactivate...');
    // if (this.appService.currentClaim && 
    //   this.appService.currentClaim.isDirty &&
    //   this.appService.currentClaim.isDirty()) {
    //   //if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {
    //   //this.appService.currentClaim.isRecordDirty = true
    //   return false;


    // } else {
    //   //this.appService.currentClaim.isRecordDirty = false
    //   return true
    // }

  }
  //    async tryCloseTab(item, tab, route) {
  requestclose() {
    const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    let cand = this.canDeactivate()
    let tab = this.appService.tabs.find(f => f.isSelected);
    let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
    this.appService.tryCloseTab(this.currentItem, tab, rt2);
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
