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
  message = 'Hello Claim 100!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((claim) => {
            console.log(' inv datasource ', claim.length);// inv[0]);
            options.success(claim);
          });
      },
      // update: (options) => {
      //   let updatedItem = options.data;
      //   console.log('   updatedItem ', updatedItem)
      //   this.updateData(updatedItem)
      //     .then((scans) => {
      //       options.success(scans)
      //     })
      //   options.success()
      // }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        // fields: {
        //   // LegacyID: { type: "number" }, // scan template
        //   Artist: { type: "string" }, // barcode insured
        // }
      }
    },
    pageSize: 12,
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
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

    //let queryParams = this.utilService.parseQueryString();
    //let queryParams2 = this.utilService.generateQueryString(queryParams);
    // queryParams2.replace('%3D','=');
    //   queryParams2.split('%3D').join('=');
    // var find = '%3D';
    // var re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '=');
    // find = '%26';
    // re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '&');
    // this.queryParams = queryParams2
    // console.log('squeryParams2', this.queryParams);

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }
  addInventory() {
    alert('add')
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
    let claim;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {
      // return this.api.findclaim(this.queryParams)
      //   .then((jsonRes) => {
      //     claim = jsonRes.data;
      //     this.origItems = claim;
      //     this.appService.searchDataLoaded = true;
      //     // console.log('jsonRes ', jsonRes);
      //     console.log('this.claim loadData 0 ', claim.length)//claim[0]);
      //     return claim
      //   });
      return Promise.all([
        this.dataService.loadSearch(this.queryParams)
      ]).then(values => {
        this.origItems = values[0];
        // this.appService.searchDataLoaded = true;
        claim = this.origItems;
        // console.log(' this.loadSearch', this.origItems)
        console.log('claim ', claim.length)
        return claim
        //bad   this.currentItem = this.items.find(f => f.id == params.id);
      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });

      // claim = this.origItems;

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
    let tab = this.appService.tabs.find(f => f.isSelected) // find current search tab
    // this.appService.currentSearch=tab//path
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //  let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/onepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    let rt2 = '#/claim/data/' + dataItem.CLAIM_NO; //CLAIM_ID;
    console.log('search-results:details', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

  addClaim() {
    let rt2 = '#/claim/data/create';
    // let rt2 = '#/claim/dataadd';

    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

  //////////////
  // performSearch() {
  //   if (this.search) {
  //     let qs = this.utilService.generateQueryString(this.search);
  //     let path = `Search${this.utilService.counter++}${qs}`;
  //     this.router.navigate(`#/inventory/${path}`);
  //     // this.router.navigate(`#/inventory/${this.search}`);
  //     // this.router.navigate(`#/inventory/InvSearch`);
  //   }
  // }


  /////////

  // updateData(e) {

  //   return api.updatecase(e)
  //     .then((jsonRes) => {
  //       console.log('this.scans ', jsonRes)
  //       return jsonRes

  //     })
  // }
}

