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
  message = 'Hello Invoice 100!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((ar) => {
            console.log(' inv datasource ar', ar.length);// inv[0]);
            options.success(ar);
          });
      },




    },
    schema: {
      model: {
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
    let ar;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {

      return Promise.all([
        this.dataService.loadSearchInvoice(this.queryParams)
      ]).then(values => {
        this.origItems = values[0];
        ar = this.origItems;
        console.log('insured ', ar.length)
        return ar
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
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/invoice/data/' + dataItem.id
    console.log('search-results:details', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

 detailsInv(e) {
    let tab = this.appService.tabs.find(f => f.isSelected) // find current search tab
    // this.appService.currentSearch=tab//path
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/claim/data/' + dataItem.claim.CLAIM_NO; //CLAIM_ID;
    console.log('rt2', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }
  detailsdata(e, type) {
     let grid = this.grid;
    let targetRow = $(e.target).closest("tr")
    grid.select(targetRow)
    let selectedRow = grid.select()
    let dataItem = grid.dataItem(selectedRow)
    let rt2 = '#/invoice/data/' + dataItem.id
    console.log('search-results:details', rt2)
    this.router.navigate(rt2)
  }
  detailspdf(e, type) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //href="http://adjusters.markadjustment.com/docs/${currentItem.CLAIM_NO}/${doc.FILE_NAME}">				${FILE_NAME}
    let rt2

    // href="http://jif.bergenrisk.com:8081/api/v1/downloadpayments?filename=${doc}">

    let pdft = (type === 0) ? 'onepdf' : 'downloadar'
    if (dataItem.status === 0) {
      rt2 = `https://jif.bergenrisk.com:8081/api/v1/${pdft}/` + dataItem.claim.CLAIM_NO + '/' + dataItem.id + 'temp.pdf'
    } else rt2 = `https://jif.bergenrisk.com:8081/api/v1/${pdft}/` + dataItem.claim.CLAIM_NO + '/' + dataItem.id + '.pdf'

    window.open(rt2, '_blank');
  }


}

