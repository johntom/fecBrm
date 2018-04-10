import {Aurelia} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import {ApplicationService} from './application-service';
// import {SessionService} from './session-service';

export class AuthorizeStep {
  // static inject = [Aurelia, Router, ApplicationService, SessionService];
  static inject = [Aurelia, Router, ApplicationService];

  // constructor(aurelia, router, appService, sessionService) {
  constructor(aurelia, router, appService) {
    this.aurelia = aurelia;
    this.router = router;
    this.appService = appService;
    // this.sessionService = sessionService;
  }

  run(navigationInstruction, next) {
    // if (this.sessionService.isAuthenticated()) {
      localStorage.setItem('href', window.location.href);
      let hash = window.location.hash;
      let keyHash = window.location.hash;
      if (keyHash.indexOf('?') > 0) {
        keyHash = keyHash.substring(keyHash.indexOf('?'));
      }
      let found = this.appService.tabs.find(f => f.key === keyHash);
      if (!found) {
        let name = window.location.hash
          .split('/')
          .pop();
        if (name.indexOf('?') > 0) {
          name = name.substring(0, name.indexOf('?'));
        }
        let tab = {
          key: keyHash,
          name: name || 'home',
          href: hash || '#/home'
        };
        this.appService.tabs.push(tab);
        this.appService.tabs.forEach(t => t.isSelected = false);
        tab.isSelected = true;
      } else {
        this.appService.tabs.forEach(t => t.isSelected = false);
        found.isSelected = true;
      }
      return next();
    // } else {
    //   next.cancel();
    //   window.location.href = window.location.origin;
    //   return;        
    // }
  }

}
