import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

export class Contact{
  static inject = [Router, UtilService];

  heading = 'Welcome to the Contact page';
  counter = 1;
  search = {}

 
  constructor(router, utilService) {
    this.router = router;
    this.utilService = utilService;
  }

  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      let path = `ConSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/contact/${path}`);
      // this.router.navigate(`#/inventory/${this.search}`);
      // this.router.navigate(`#/inventory/InvSearch`);
    }
  }
}