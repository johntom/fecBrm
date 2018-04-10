import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

export class Claim {
  static inject = [Router, UtilService];

  heading = 'Welcome to the Claim page';
  counter = 1;
  search = {}

  //   title: 0,
  //   invcode: 0
  // };

  constructor(router, utilService) {
    this.router = router;
    this.utilService = utilService;
  }

  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      let path = `Search${this.utilService.counter++}${qs}`;
      // let path = `InvSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/claim/${path}`); // this is search-results
      
    }
  }
}