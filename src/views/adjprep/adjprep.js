
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
export class Adjprep {
  static inject = [Router, UtilService, ApplicationService, ApiService];
  a
  heading = 'Welcome to the Adjusterprep page';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME
  constructor(router, utilService, appService, api) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvCode = null
    this.appService = appService;
    // this.search.claimno = '01-03188'
    this.api = api;
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
    return new Promise((resolve, reject) => {
      this.api.adjusterprep()
        .then((jsonRes) => {
          this.adjusterprep = jsonRes.data;
          //adjusterprep = this.origItems
          resolve(this.adjusterprep);
        });
    });
  }

  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }

  performSearch() {
    // if (this.search) {
    //   console.log('this.search', this.search)
    //   let qs = this.utilService.generateQueryString(this.search);


    //   //let path = `Searchadjusterprep${qs}`;
    //   // let path = `InvSearch${this.utilService.counter++}${qs}`;
    //   let adj = this.search.adjuster
    //   if (adj !== null) {
    //     let rt2 = '#/adjprep/data/' + adj
    //     // this.router.navigate(rt2)
    //     this.router.navigate(rt2);
    //   } else this.router.navigate(`#/adjprep/${path}`);




    if (this.search) {
      // console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);
      //let path = `Searcharprep${this.utilService.counter++}${qs}`;
      let path = `Searchadjprep${qs}`;

      // let path = `InvSearch${this.utilService.counter++}${qs}`;
      let adj = this.search.adjuster
      let pp = this.search.payperiod

      this.router.navigate(`#/adjprep/${path}`);

      this.appService.currentSearchadj = path // or adj
      this.appService.currentadjuster = adj // or adj
     
      this.appService.currentpayperiod = pp // or adj

    }

  }
  //     let counter = this.utilService.counter++
  //  let path = `Adj${qs}`;
  // let path = `InvSearch${this.utilService.counter++}${qs}`;
  //   this.router.navigate(`#/adjusterprep/data/${path}`);



  // //  let path = `Searchadjusterprep${qs}`;
  // let path = `Searchadj`
  // // let path = `InvSearch${this.utilService.counter++}${qs}`;
  // //  this.router.navigate(`#/adjusterprep/${path}`);
  // let rt2 = '#/adjusterprep/4'
  // this.router.navigate(rt2);


  // let counter = this.utilService.counter++
  // let path = `Search${counter}${qs}`;
  // this.router.navigate(`#/adjusterprep/${path}`);

  // this.appService.currentSearch=path //`Search${counter}`




  // performSearchArc1() {
  //   if (this.search) {
  //     console.log('this.search', this.search)
  //     let qs = this.utilService.generateQueryString(this.search);
  //     //let path = `Searcharprep${this.utilService.counter++}${qs}`;
  //     let path = `Searcharprep${qs}`;

  //     if (this.search.adjuster === undefined) {
  //       this.router.navigate(`#/adjusterprep/data/AdjusterAll`)
  //     } else {

  //       this.router.navigate(`#/adjusterprep/data/${path}`);
  //     }
  //   }
  // }

}