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
  items = [];
  origItems = [];

  //  console.log(' inv SearchResults ');
  message = 'Hello Insco 100!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((insco) => {
            console.log(' ins datasource ', insco.length);// inv[0]);
            options.success(insco);
          });
      },
        update: (options) => {
        let updatedItem = options.data;
       // updatedItem.offerdate=this.offerdate
        console.log('   updatedItem ', updatedItem)
        this.saveinsco(updatedItem)
          .then((insco) => {
            options.success(insco)
            this.datasource.read()
          })

        options.success(updatedItem)
      }
    },
    schema: {
      model: {
       // id: "id", // Must assign id for update to work
         id: "_id", // Must assign id for update to work
        
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
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let insco;
    
    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {
     
      return  Promise.all([
        this.dataService.loadSearchIns(this.queryParams)
      ]).then(values => {
        this.origItems = values[0];
       // this.appService.searchDataLoaded = true;
        insco = this.origItems;
       // console.log(' this.loadSearch', this.origItems)
        console.log('insco ', insco.length)
        return insco
        //bad   this.currentItem = this.items.find(f => f.id == params.id);
      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });

  

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
    let rt2 = '#/insurance/data/' + dataItem.INSURANCE_COMPANY_ID
    console.log('search-results:details', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

  addClaim() {
    let rt2 = '#/insurance/dataadd';
    this.router.navigate(rt2)
  }

}

