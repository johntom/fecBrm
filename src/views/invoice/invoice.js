import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { Prompt } from '../claim/prompt';
import { DialogService } from 'aurelia-dialog';
import { lodash } from 'lodash'
import { inject } from 'aurelia-dependency-injection';
@inject(Router, UtilService, ApplicationService, ApiService, DialogService)
export class Invoice {
 // static inject = [Router, UtilService, ApplicationService, ApiService,DialogService];

  heading = 'Welcome to the Adjusterprep page';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME
  constructor(router, utilService, appService, api,dialogService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvoice = null
    this.appService = appService;
    // this.search.claimno = '01-03188'
    this.api = api;
        this.dialogService = dialogService
  }
  //  findOption = value => this.appService.adjusterList.find(x => x.ADJUSTER_NAME === value);
  created() {
    console.log('name-tag created');
  }

  bind() {
    console.log('name-tag bind');
  }

  attached() {
    console.log('name-tag attached');
  }
  activate() {
    console.log('name-tag activate before attached ');
    // only get adjusters that have open dailies
    // return new Promise((resolve, reject) => {
    //   this.api.adjusterprep()
    //     .then((jsonRes) => {
    //       this.adjusterprep = jsonRes.data;

    //       resolve(this.adjusterprep);
    //     });
    // });
  }

  showModal(fieldname) {
    // alert('fieldname'+fieldname)
    this.appService.currentClaim=0
    // this.appService.INSURANCE_COMPANY_ID =
     this.currentItem={}
     this.currentItem.INSURANCE_COMPANY_ID =  0 
      this.currentItem.currentClaim =  0 
    
      // this.currentItem.LEGAL_NAME = LEGAL_NAME
   //   if (this.currentItem.insco === undefined) this.currentItem.insco = {}
      // this.currentItem.insco.NAME = NAME
      // this.currentItem.insco.INSURANCE_COMPANY_ID = orgid
      // this.currentItem.insco.id = id
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
  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }
  performSearch() {
    if (this.search) {
      console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);
      let counter = this.utilService.counter++
      let path = `Searchinv${counter}${qs}`;
      this.router.navigate(`#/invoice/${path}`);

      this.appService.currentSearch = path //`Search${counter}`

    }
  }
  // performSearch() {
  //   if (this.search) {
  //     console.log('this.search', this.search)
  //     let qs = this.utilService.generateQueryString(this.search);
  //    // let adj = this.search.adjuster
  //     if (adj !== null) {
  //       let rt2 = '#/invoice/data/' + adj
  //       // this.router.navigate(rt2)
  //       this.router.navigate(rt2);
  //     } else this.router.navigate(`#/invoice/${path}`);
  //   }
  // }



}