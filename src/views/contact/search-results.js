import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';

@inject(Router, ApiService, UtilService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  //  console.log(' inv SearchResults ');
  message = 'Hello Inventory 101- a!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((inv) => {
            console.log(' inv datasource ', inv[0]);
            options.success(inv);
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
        fields: {

          // LegacyID: { type: "number" }, // scan template
          Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          InventoryCode: { type: "string" },
          Title: { type: "string" },
          MediumSupport: { type: "string" },
          CurrentLocation: { type: "string" },
          Bin: { type: "string" }, // barcode insured
          Owner: { type: "string" },
          InvYear: { type: "string" },
          UnframedHeight: { type: "string" },


        }
      }
    },
    pageSize: 12,

    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })



  constructor(router, api, utilService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
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
    let inv;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    return this.api.findInventory(this.queryParams)//searchrec)
      .then((jsonRes) => {
        inv = jsonRes.data;
        // console.log('jsonRes ', jsonRes);
        console.log('this.inv loadData 0 ', inv[0]);
        return inv
      });
  }
  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //  let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/onepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    // #/inventory/data/#=InventoryCode#
    //let rt2 = '#/inventory/data/#=' + dataItem.InventoryCode + '#'
    let rt2 = '#/inventory/data/' + dataItem.InventoryCode;

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


          // OwnershipStatus: { type: "string" },
          // RetailPriceAlpha: { type: "string" },
          // RetailPrice: { type: "string" },
          // RetailPriceDate: { type: "date" },
          // DateAdded: { type: "date" },
          // PurchasedDate: { type: "string" },
          // PurchasedFrom: { type: "string" },
          // PurchasedPrice: { type: "string" },
          // PurchasedForPrice: { type: "string" },
          // Sold: { type: "string" },
          // // Not Sold": { type: "string" },,
          // SoldToID: { type: "string" },
          // // Sold Date : { type: "date" },
          // SoldFor:  { type: "string" },
          // SoldPrice:  { type: "string" },
          // //Min SellingPrice : "",
          // NetToOwner: { type: "string" },
          // ConsignedStartDate:  { type: "string" },
          // ConsignedEndDate:  { type: "date" },
          // MRGLocation: { type: "string" },
          // SoldDesc:  { type: "string" },

          // link: { type: "string" },workername  workeraddr workercity
          //  "First Name": { type: "string" },
          // workeraddr: { type: "string" },
          // workercity: { type: "string" },
          // filename: { type: "string" },
          // contents: { type: "string" },
          // createdAt: { type: "date" },
          //  billedamt: { type: "number" },
          //    payamt: { type: "number" },      
          // // assignto:{ type: "string" },
          // assignto: { defaultValue: { staffid: 1, username: 'jrt' } }
          // // contents: { type: "memo" } billedamt payamt