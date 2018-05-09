import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { DialogService } from 'aurelia-dialog';
// import { lodash } from 'lodash'
import { Prompt } from '../claim/prompt';

export class Adjuster {
  static inject = [Router, UtilService, ApplicationService, ApiService, DialogService];

  heading = 'Welcome to the Adjusterprep page';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME
  constructor(router, utilService, appService, api, dialogService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvCode = null
    this.appService = appService;
    // this.search.claimno = '01-03188'
    this.api = api;
    this.dialogService = dialogService
    alert(this.appService.adjusterList.length)
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

  showModal(fieldname) {
    // alert('fieldname'+fieldname)
    // this.currentItem={}
    this.appService.currentSearchadj = {}
    this.appService.currentSearchadj.ADJUSTER_ID = undefined
    this.appService.currentSearchadj.ADJUSTER_NAME = undefined

    // this.currentItem.ADJUSTER_NAME=undefined
    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      console.log(response.output)
      console.log(this.appService.currentSearchadj)
      // this.ADJUSTER_ID = this.appService.currentSearchadj.ADJUSTER_ID + ' ' + this.appService.currentSearchadj.ADJUSTER_NAME
      this.search.adjuster = this.appService.currentSearchadj.ADJUSTER_ID
    });
  }
  activate() {
    console.log('name-tag activate before attached ');
   // let aid = this.appService.adjusterList.findIndex(x => x.ADJUSTER_ID === 4)


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
     // let adj = this.search.adjuster.ADJUSTER_ID
//  this.appService.currentSearchadj.ADJUSTER_ID = ADJUSTER_ID
//       this.appService.currentSearchadj.ADJUSTER_NAME = ADJUSTER_NAME
 let adj =`${this.ADJUSTER_NAME.ADJUSTER_ID}`
      //let path = `Searchadjuster${this.utilService.counter++}${qs}`;
      let path = `Searchadjuster${qs}`;
      //     let path = `Searcharprep${qs}`;
      // this.router.navigate(`#/adjuster/${path}`);

      if (adj !== null) {
        let rt2 = '#/adjuster/data/' + adj
        this.router.navigate(rt2)

      } else this.router.navigate(`#/adjuster/${path}`);
    }
  }


}