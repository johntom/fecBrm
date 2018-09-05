import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
export class Arprep {
  static inject = [Router, UtilService, ApplicationService];

  heading = 'Welcome to the Arprep page';
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
  performSearch() {
    if (this.search) {
     
     let qs = this.utilService.generateQueryString(this.search);
      //let path = `Searcharprep${this.utilService.counter++}${qs}`;
        let path = `Searcharprep${qs}`;
       console.log('this.search path', this.search,path)
      // let path = `InvSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/arprep/${path}`);

    }
  }
  // addDaily() {
  //   let rt2 = '#/daily/dataadd';

  //   this.router.navigate(rt2);//
  // }

}