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
  message = 'Hello ADJUSTER PREP 100!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((adjusterprep) => {
            console.log(' arprep datasource ', adjusterprep[0], adjusterprep.length);// inv[0]);
            options.success(adjusterprep);
          });
      },

    },
    schema: {
      model: {
       id: "id" // Must assign id for update to work

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
 // alert(' activate ')
   

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
    let adjusterprep;

    let i = 0
    let recs = []
    let rec = {}
    var cno
    if (this.appService.searchDataLoaded) {
      console.log('using searchDataLoaded cache....')
      return Promise.resolve(true);
    } else {
  
      let adj = this.queryParams.split('=')[1]
    // only get here if they didnt select a adjuster
      return new Promise((resolve, reject) => {
        this.api.adjusterprep()
          .then((jsonRes) => {
            this.origItems = jsonRes.data //[0];
            console.log(' this.origItems ', this.origItems)
            adjusterprep = this.origItems
            resolve(adjusterprep);
            return adjusterprep
          });

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
    this.appService.currentAdjuster = dataItem;

    //let rt2 = '#/adjusterprep/data/' + dataItem.ADJUSTER_ID
    let rt2 = '#/adjprep/data/' + dataItem.ADJUSTER_ID
    
    this.router.navigate(rt2)
    // console.log('search-results:details', rt2)
  }
    detailspdf(e) {
        let grid = this.grid;
        let targetRow = $(e.target).closest("tr");
        grid.select(targetRow);
        let selectedRow = grid.select();
        let dataItem = grid.dataItem(selectedRow);
        //href="http://adjusters.markadjustment.com/docs/${currentItem.CLAIM_NO}/${doc.FILE_NAME}">				${FILE_NAME}
      // let rt2 = 'http://jif.bergenrisk.com:8081/api/v1/oneadjpdf/' + this.recordId + '/' + data + '.pdf'
     
        let rt2 = 'http://jif.bergenrisk.com:8081/api/v1/oneadjpdf/' +4 + '/' + dataItem.id + '.pdf'
        //  alert('rt2 '+rt2)
        window.open(rt2, '_blank');
    }


}

