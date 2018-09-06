import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
// import {AureliaToolbelt} from 'aurelia-toolbelt'; ,AureliaToolbelt,aureliaToolbelt this.aureliatoolbelt = aureliaToolbelt
// import 'bootstrap';
@inject(ApplicationService, MyDataService)


export class Home {
  heading = "Welcome to the Home page!";
  version = 100.56

  constructor(appService, dataService) {
    //    if (appService.claimLookupDataLoaded) {
    // console.log('using data cache....')
    //    }
    this.appService = appService;
    this.dataService = dataService;
  }

  attached() {
    // this.name = {
    //     name: 'New York',
    //     value: 'NY'
    //   }
    //     this.dow.value=  this.name



    if (this.appService.claimLookupDataLoaded) {
      console.log('using data cache from home....')
      return Promise.resolve(true);
    } else {
      return Promise.all([
        this.dataService.loadPeople(),
        this.dataService.loadGenders(),
        this.dataService.loadStates(),
        this.dataService.loadAdjusters(),
        this.dataService.loadClaimtype(),
        this.dataService.loadInsurancecompany(),
        this.dataService.loadInsured(),
        this.dataService.loadStatus(),
        this.dataService.loadService(),
        this.dataService.loadExpense(),
        this.dataService.loadClaimlist(),
        this.dataService.loadMasrep(),
        this.dataService.loadPayperiod(),
        this.dataService.loadCodes(),

        //findclaimlist
        // findservice findexpesnse findclaim
        // ,        this.dataService.loadClaimant()

      ]).then(values => {
        this.items = values[0];
        this.appService.genderList = values[1];
        this.appService.stateList = values[2];
        this.appService.adjusterList = values[3];
        this.appService.claimtypeList = values[4];
        this.appService.InsurancecompanyList = values[5];
        this.appService.insuredList = values[6];
        this.appService.statusList = values[7];
        this.appService.serviceList = values[8];
        this.appService.expenseList = values[9];
        this.appService.claimList = values[10];
        this.appService.MasrepList = values[11];
        this.appService.PayperiodList = values[12];
        this.appService.codesList = values[13];


        // let i, item, ct
        //   this.appService.LookupDataLoaded = true;
        //   let codesInventoryLocation = []//1,
        //   let codesInventoryType = []//2,
        //   let codesGenre = []//3, change to keyword
        //   let allothers = []
        //   let codesOwnership = []//4,
        //   let codesFormat = []//5


        // console.log(' this.genderList', this.appService.genderList)
        // console.log(' this.stateList', this.appService.stateList)
        // console.log(' this.adjusterList', this.appService.adjusterList)
        // console.log(' this.claimtypeList', this.appService.claimtypeList)
        // console.log(' this.InsurancecompanyList', this.appService.InsurancecompanyList)
        // console.log(' this.insuredList', this.appService.insuredList)
        // console.log(' this.statusList', this.appService.statusList)
        // console.log(' this.serviceList', this.appService.serviceList)
        // console.log(' this.expenseList', this.appService.expenseList)
        // console.log(' this.claimList', this.appService.claimList)
        // console.log(' this.appService.MasrepList values[11]', values[11], this.appService.MasrepList)

        //console.log(' this.appService.PayperiodList values[12]', values[12], this.appService.PayperiodList)
        let adjusterActiveList = this.appService.adjusterList.filter(rec => rec.ACTIVE === -1);


        this.appService.adjusterActiveList = adjusterActiveList
        console.log('  this.appService.adjusterList  / adjusterActiveList', this.appService.adjusterList, adjusterActiveList)

        let i
        // lets get sort_no as part of desc
        for (i = 0; i < this.appService.serviceList.length; i++) {
          this.appService.serviceList[i].DESCRIPTION = this.appService.serviceList[i].SORT_NO + ' ' + this.appService.serviceList[i].DESCRIPTION

        }

        for (i = 0; i < this.appService.expenseList.length; i++) {
          this.appService.expenseList[i].DESCRIPTION = this.appService.expenseList[i].SORT_NO + ' ' + this.appService.expenseList[i].DESCRIPTION
        }

        for (i = 0; i < this.appService.InsurancecompanyList.length; i++) {
          this.appService.InsurancecompanyList[i].FullName = this.appService.InsurancecompanyList[i].NAME + ' ' + this.appService.InsurancecompanyList[i].ADDRESS
            + ' ' + this.appService.InsurancecompanyList[i].CITY + ' ' + this.appService.InsurancecompanyList[i].STATE
        }




        //bad   this.currentItem = this.items.find(f => f.id == params.id);
      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });
    }
  }
  activate() {

  }
}