import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
export class Adjusterprep {
  static inject = [Router, UtilService, ApplicationService];

  heading = 'Welcome to the Adjusterprep page';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME

  //   title: 0,
  //   invcode: 0
  // };

  constructor(router, utilService, appService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvCode = null
    this.appService = appService;
    // this.search.claimno = '01-03188'

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
  }

  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }
  performSearch2() {
    if (this.search) {
      console.log('this.search', this.search)

      // SKIP SEARCH
      let qs = this.utilService.generateQueryString(this.search);


      let path = `AdjusterPrep${qs}`;
      let rt2
      if (this.search.adjuster === undefined) {
        rt2 = '#/adjusterprep/data/0'
      } else {
        rt2 = '#/adjusterprep/data/' + this.search
      }
      this.router.navigate(rt2)


    }
  }
  performSearch() {
    if (this.search) {
      console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);
      //let path = `Searcharprep${this.utilService.counter++}${qs}`;
      let path = `Searcharprep${qs}`;

      if (this.search.adjuster === undefined) {
        this.router.navigate(`#/adjusterprep/data/AdjusterAll`)
      } else {

        this.router.navigate(`#/adjusterprep/data/${path}`);
      }
    }
  }

}