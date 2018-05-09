import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

// @inject(ApiService, ApplicationService, MyDataService)
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  adjusteritems = [];
  origItems = [];

  //  console.log(' inv SearchResults ');
  message = 'Hello Adjusters !';
  datasource = new kendo.data.DataSource({

    transport: {
      read: (options) => {
        this.loadData()
          .then((adjusteritems) => {
            console.log(' Adjusters datasource ', adjusteritems[0], adjusteritems.length)
            options.success(adjusteritems);
          });
      },
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
      }
    },
    pageSize: 12,
  })

  constructor(router, api, utilService, appService, dataService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
  }

  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 
    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }

  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }

  loadData() {
    //console.log('this.loadData ')
    // let s2 = '1-1-2016';
    // let s3 = '10-21-2016';
  
    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {
      let adjusteritems = this.appService.adjusterList
      this.origItems = adjusteritems
      console.log("adjuster", adjusteritems)
      return Promise.resolve(adjusteritems);
      //  this.dataService.loadAdjusters(this.queryParams)
      //     return  Promise.all([
      //       this.dataService.loadAdjusters()
      //     ]).then(values => {
      //       this.origItems = values[0];
      //       let adjusteritems = this.origItems;
      //       console.log('adjusteritems ', adjusteritems.length)
      //       return adjusteritems
      //       //bad   this.currentItem = this.items.find(f => f.id == params.id);
      //     }).catch(error => {
      //       console.error("Error encountered while trying to get data.", error);
      //     });


    }
  }
  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

  }
  performRefresh() {
    console.log('performRefresh ')
    alert('You have selected performRefresh')
    this.appService.searchDataLoaded = false;
    this.datasource.read()  //this.loadData(); // or
    //  this.appService.searchDataLoaded = true;
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/adjuster/data/' + dataItem.ADJUSTER_ID
    console.log('search-results:details', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

  // addClaim() {
  //   // let rt2 = '#/claim/data/create';
  //   let rt2 = '#/claim/dataadd';

  //   this.router.navigate(rt2);// `#/inventory/${path}`);
  // }

}

