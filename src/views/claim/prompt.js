
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//
import { DialogService } from 'aurelia-dialog';
// import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';



export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];

fruits = ['Apple', 'Orange', 'Grapes', 'Pineaple', 'Peach', 'Bananas'];
monthsOfTheYear = [
    {name: 'January', short: 'Jan', number: 1},
    {name: 'February', short: 'Feb', number: 2},
    {name: 'March', short: 'Mar', number: 3},
    {name: 'April', short: 'Apr', number: 4},
    {name: 'May', short: 'May', number: 5},
    {name: 'June', short: 'Jun', number: 6},
    {name: 'July', short: 'Jul', number: 7},
    {name: 'August', short: 'Aug', number: 8},
    {name: 'September', short: 'Sep', number: 9},
    {name: 'October', short: 'Oct', number: 10},
    {name: 'November', short: 'Nov', number: 11},
    {name: 'December', short: 'Dec', number: 12}
  ];
  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
    //  this.inv = '';
    this.currentItem = this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
  }


  getStates(filter, limit) {
    let filterlc = filter.toLowerCase()
    let states
    let Promise = this.dataService.loadStates()
      .then(response => {
        states = response
        console.log('states', states)
        return states //response // .json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

    return Promise
  }

  // activate(question) {
  //    this.question = question;
  //} person
  activate(fieldname) {
    this.fieldname = fieldname;

  }
 
testfruit(){
  alert(this.fruit+' this.fn' +this.FullName)
}
   monthSelected(item) {
    if (item) {
      console.log('Month Selected: ' + item.short);
    } else {
      console.log('Month cleared');
    }
  }
  attached() {
       // set typahead value for state MUST BE IN ATTACHED
    // this.name = {
    //   name: 'New York',
    //   value: 'NY'
    // }
    // this.dow.value = this.name

    this.doc = `type any characters to select ${this.fieldname}`

    if (this.fieldname === 'docs') {
      this.currentItem = this.appService.currentItem//currentClaim

    }

    if (this.fieldname === 'insco') {
      // this.currentnewItem.insaddress = item
       let insaddresses = this.appService.inscoAddresses
      if (this.currentItem.insco !== undefined) {
        let inscompanies = this.appService.InsurancecompanyList
        let oid = this.currentItem.insco.id
        let iid = this.currentItem.insco.INSURANCE_COMPANY_ID
        let mid = 0
        //   "INSURANCE_COMPANY_ID" : NumberInt(87), 
        // "NAME"
        // if (this.currentItem.insco.INSURED_ID !== undefined) {
        if (this.currentItem.insco !== undefined) {
          // mid = inscompanies.findIndex(x => x.INSURANCE_COMPANY_ID === this.currentItem.insco.INSURANCE_COMPANY_ID * 1)
          mid = inscompanies.findIndex(x => x._id === oid)
          //   mid = inscompanies.findIndex(x => x.INSURANCE_COMPANY_ID === iid * 1)

        } else {
          if (this.currentItem.INSURANCE_COMPANY_ID !== undefined) {
            mid = inscompanies.findIndex(x => x.INSURANCE_COMPANY_ID === this.currentItem.INSURANCE_COMPANY_ID * 1)

          }
        }
        if (mid === -1) mid = 0
        let insurcoobj = inscompanies[mid];
        // this.NAME = insurcoobj
        // this.dinsco.value = this.NAME
        this.FullName = insurcoobj
        this.dinsco.value = this.FullName
      }
    }
    if (this.fieldname === 'INSURED_ID') {
      // if (this.currentItem.insured.INSURED_ID !== undefined) {
      if (this.currentItem.insured !== undefined) {
        let oid = this.currentItem.insured.id
        let inslist = this.appService.insuredList
        //currentItem
        // if ((this.currentItem.INSURED_ID === undefined) || (this.appService.insuredList === null)) {
        let mid
        if ((this.currentItem.insured.INSURED_ID === undefined) || (inslist === null)) {
          mid = inslist.findIndex(x => x.INSURED_ID === this.currentItem.INSURED_ID * 1)//45)

        } else {
          // let mid = ins.findIndex(x => x._id === this.currentItem.INSURED_ID)
          console.log('in ', oid)
          mid = inslist.findIndex(x => x.id === oid)// id = objectidx.INSURED_ID ===INSURED_ID*1)//45)

        }
        let insuredobj = inslist[mid]
        this.LEGAL_NAME = insuredobj
        this.dinsured.value = this.LEGAL_NAME
      }
    }


    if (this.fieldname === 'ADJUSTER_ID') {
      let meds = this.appService.adjusterList
      if ((this.appService.currentSearchadj === undefined) || (this.appService.currentSearchadj === null)) {
      } else {
        // let mid = meds.findIndex(x => x._id === this.currentSearchadj)
        // let orgobj = this.appService.orgsList[mid]

        // this.OrgName = orgobj
        // this.dadjuster_id.value = this.OrgName
      }
 }
  }
  //  alert(`${this.addlist} Exists in list already!`)
  addit() {
  

  }
  save() {
  
    if (this.fieldname === 'OwnerID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.OwnerID = orgid
      this.currentItem.ownername = orgname
    }
    if (this.fieldname === 'SoldToID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.SoldToID = orgid
      this.currentItem.soldtoname = orgname
    }


    if (this.fieldname === 'ConsignedFromID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignedFromID = orgid
      this.currentItem.consignedfromname = orgname
    }

    if (this.fieldname === 'ConsignmentShippingID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignmentShippingID = orgid
      this.currentItem.consignmentshippingname = orgname
    }

    if (this.fieldname === 'InsuredBy') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.InsuredBy = orgid
      this.currentItem.insuredbyname = orgname
    }

    if (this.fieldname === 'ConservedBy') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConservedBy = orgid
      this.currentItem.conservedbyname = orgname
    }


    if (this.fieldname === 'ConsignedTo') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignedTo = orgid
      this.currentItem.consignedtoname = orgname
    }

    if (this.fieldname === 'PurchasedFrom') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PurchasedFrom = orgid
      this.currentItem.purchasedfromname = orgname
    }
  
   if (this.fieldname === 'LoanTo') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.LoanTo = orgid
      this.currentItem.loantoname = orgname
    }
   if (this.fieldname === 'PhotographerID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PhotographerID = orgid
      this.currentItem.photographername = orgname
    }




    if (this.fieldname === 'Treatment') {
      this.currentItem.Treatment
    }
    if (this.fieldname === 'SavedList') {
      let name = `${this.name.name}`
      console.log(' dsaved.value', name)//, this.dsaved.value)
      // this.dsaved.value = this.name//this.addlist
      this.appService.currentsavedlist = name// dsaved.value
    }
    this.controller.cancel()
  }

}