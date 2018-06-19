
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { bindable } from 'aurelia-framework';

export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService];
  @bindable searchdoc
  newrec = false
  constructor(controller, appService, dataService) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
    //  this.inv = '';
    this.currentItem = this.appService.currentItem // currentClaim// testrec;
    this.showdocs = this.currentItem.docs
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;

  }
 searchdocChanged(value) {
   //console.log('v ',value)
    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
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
    // if (fieldname === 'SoldTo') {



    // }
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
      // let insaddresses = this.appService.inscoAddresses
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
        this.NAME = insurcoobj
        this.dinsco.value = this.NAME
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
  save(modal) {
    //  this.LEGAL_NAME = insuredobj
    //       this.dinsured.value = this.LEGAL_NAME
    // let orgid = `${this.LEGAL_NAME._id}`
    if (this.fieldname === 'LossDescription') {

    }
    if (this.fieldname === 'insco') {
      let orgid = `${this.NAME.INSURANCE_COMPANY_ID}`
      let NAME = `${this.NAME.NAME}`
      let id = `${this.NAME._id}`

      this.currentItem.INSURANCE_COMPANY_ID = orgid // keep for legacy until converted
      // this.currentItem.LEGAL_NAME = LEGAL_NAME
      if (this.currentItem.insco === undefined) this.currentItem.insco = {}
      this.currentItem.insco.NAME = NAME
      this.currentItem.insco.INSURANCE_COMPANY_ID = orgid
      this.currentItem.insco.id = id
    }

    if (this.fieldname === 'INSURED_ID') {
      let orgid = `${this.LEGAL_NAME.INSURED_ID}`
      let LEGAL_NAME = `${this.LEGAL_NAME.LEGAL_NAME}`
      let id = `${this.LEGAL_NAME.id}`
      this.currentItem.INSURED_ID = orgid // keep for legacy until converted
      // this.currentItem.LEGAL_NAME = LEGAL_NAME
      if (this.currentItem.insured === undefined) this.currentItem.insured = {}
      this.currentItem.insured.LEGAL_NAME = LEGAL_NAME
      this.currentItem.insured.INSURED_ID = orgid
      this.currentItem.insured.id = id
      alert('aa '+this.currentItem.insured)
      this.appService.currentItem.insured=this.currentItem.insured
    }

    if (this.fieldname === 'ADJUSTER_ID') {
      let ADJUSTER_ID = `${this.ADJUSTER_NAME.ADJUSTER_ID}`// _id}`
      let ADJUSTER_NAME = `${this.ADJUSTER_NAME.ADJUSTER_NAME}`
      this.appService.currentSearchadj.ADJUSTER_ID = ADJUSTER_ID
      this.appService.currentSearchadj.ADJUSTER_NAME = ADJUSTER_NAME
    }

    this.controller.cancel(modal) //this.controller.cancel()
    //this.dialogController.cancel(model);
  }

}


// this.appService.insuredList 
    //   "insured" : {
    //       "LEGAL_NAME" : "Progressive Management of NY Corp, et al"
    //   }, 
    // if (this.fieldname === 'insured') {
    //   let ins = this.appService.insuredList
    //   if ((this.currentItem.insured === undefined) || (this.appService.insuredList === null)) {
    //   } else {
    //     let mid = ins.findIndex(x => x._id === this.currentItem.insured)
    //     let orgobj = this.appService.insuredList[mid]

    //     this.OrgName = orgobj
    //     this.dorg.value = this.OrgName
    //   }
    // }
    //     "insured" : {
    //     "LEGAL_NAME" : "Progressive Management of NY Corp, et al"
    // }, 