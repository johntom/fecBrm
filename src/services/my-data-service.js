import { ApiService } from '../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
@inject(ApiService)
export class MyDataService {
  constructor(api) {
    this.api = api;
  }
  personList = [
    {
      id: 0,
      firstName: "Rob",
      lastName: "Eisenberg",
      gender: "male",
      email: "rob@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Redmond",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Halo Wars",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 24.99
        }
      ]
    }
  ];
  genderList = [
    "male",
    "female"
  ];
  statusList = [
    { name: 'open', value: 1 },
    { name: 'closed', value: 2 },
    { name: 'reopened', value: 3 }

  ];
  stateList = [
    { name: 'Alabama', value: 'AL' },
    { name: 'Alaska', value: 'AK' },
    { name: 'America Samoa', value: 'america samoa' },
    { name: 'Arizona', value: 'AZ' },
    { name: 'Arkansas', value: 'AR' },
    { name: 'California', value: 'CA' },
    { name: 'Colorado', value: 'CO' },
    { name: 'Connecticut', value: 'CN' },
    { name: 'Delaware', value: 'DE' },
    { name: 'District of Columbia', value: 'DC' },
    { name: 'Federated States of Micronesia', value: 'federated states of micronesia' },
    { name: 'Florida', value: 'FL' },
    { name: 'Georgia', value: 'GA' },
    { name: 'Guam', value: 'guam' },
    { name: 'Hawaii', value: 'HI' },
    { name: 'Idaho', value: 'ID' },
    { name: 'Illinois', value: 'IL' },
    { name: 'Indiana', value: 'ID' },
    { name: 'Iowa', value: 'IA' },
    { name: 'Kansas', value: 'kansas' },
    { name: 'Kentucky', value: 'kentucky' },
    { name: 'Louisiana', value: 'louisiana' },
    { name: 'Maine', value: 'maine' },
    { name: 'Marshall Islands', value: 'marshall islands' },
    { name: 'Maryland', value: 'maryland' },
    { name: 'Massachusetts', value: 'massachusetts' },
    { name: 'Michigan', value: 'michigan' },
    { name: 'Minnesota', value: 'minnesota' },
    { name: 'Mississippi', value: 'mississippi' },
    { name: 'Missouri', value: 'missouri' },
    { name: 'Montana', value: 'montana' },
    { name: 'Nebraska', value: 'nebraska' },
    { name: 'Nevada', value: 'nevada' },
    { name: 'New Hampshire', value: 'new hampshire' },
    { name: 'New Jersey', value: 'NJ' },
    { name: 'New Mexico', value: 'new mexico' },
    { name: 'New York', value: 'NY' },
    { name: 'North Carolina', value: 'north carolina' },
    { name: 'North Dakota', value: 'north dakota' },
    { name: 'Northern Mariana Islands', value: 'northern mariana islands' },
    { name: 'Ohio', value: 'ohio' },
    { name: 'Oklahoma', value: 'oklahoma' },
    { name: 'Oregon', value: 'oregon' },
    { name: 'Palau', value: 'palau' },
    { name: 'Pennsylvania', value: 'Pennsylvania' },
    { name: 'Puerto Rico', value: 'puerto rico' },
    { name: 'Rhode Island', value: 'rhode island' },
    { name: 'South Carolina', value: 'south carolina' },
    { name: 'South Dakota', value: 'south dakota' },
    { name: 'Tennesee', value: 'tennesee' },
    { name: 'Texas', value: 'texas' },
    { name: 'Utah', value: 'utah' },
    { name: 'Vermont', value: 'VT' },
    { name: 'Virgin Islands', value: 'virgin islands' },
    { name: 'Virginia', value: 'VI' },
    { name: 'Washington', value: 'WA' },
    { name: 'West Virginia', value: 'west virginia' },
    { name: 'Wisconsin', value: 'WI' },
    { name: 'Wyoming', value: 'WY' },
    { name: 'Sweden', value: 'sweden' },
    { name: 'Poland', value: 'poland' },
    { name: 'Bangladesh', value: 'bangladesh' },
    { name: 'Bulgaria', value: 'bulgaria' },
    { name: 'Netherlands', value: 'netherlands' },
    { name: 'Amsterdam', value: 'amsterdam' },
    { name: 'Austria', value: 'austria' },
    { name: 'Wales', value: 'wales' },
    { name: 'Japan', value: 'japan' },
  ];
  getadjusterList() {

    this.api.findAdjusters()
      .then((jsonRes) => {
        var adjusterList = jsonRes// .data;
        // console.log('adjusterList', adjusterList)
        return adjusterList
      });
  }

  loadMasrep() {

    return new Promise((resolve, reject) => {
      this.api.findMasrep()
        .then((jsonRes) => {
          var MasrepList = jsonRes.data;
          console.log('MasrepList', MasrepList)
          resolve(MasrepList);
        });
    });
  }

  loadPayperiod() {
// this.api.findPayperiod() payperiod
    return new Promise((resolve, reject) => {
      this.api.findPayperiod() 
        .then((jsonRes) => {
          var PayperiodList  = jsonRes.data;
          console.log('PayperiodList', PayperiodList)
          resolve(PayperiodList);
        });
    });
  }



  loadPeople() {
    return new Promise((resolve, reject) => {
      resolve(this.personList);
    });
  }

  loadGenders() {
    return new Promise((resolve, reject) => {
      resolve(this.genderList);
    });
  }
  loadStatus() {
    return new Promise((resolve, reject) => {
      resolve(this.statusList);
    });
  }
  loadStates() {
    return new Promise((resolve, reject) => {
      resolve(this.stateList);
    });
  }
  loadAdjusters() {
    return new Promise((resolve, reject) => {
      this.api.findAdjusters()
        .then((jsonRes) => {
          var adjusterList = jsonRes.data;
          console.log('adjusterList', adjusterList)

          resolve(adjusterList);
        });

    });
  }
  loadClaimtype() {
    return new Promise((resolve, reject) => {
      this.api.findclaimType()
        .then((jsonRes) => {
          var claimTypeList = jsonRes;//.data;
          console.log('claimTypeList', claimTypeList)

          resolve(claimTypeList);
        });

    });
  }

  loadLocation() {
    return new Promise((resolve, reject) => {
      this.api.findLocation()
        .then((jsonRes) => {
          var locationList = jsonRes;//.data;
          console.log('mydataser', locationList)

          resolve(locationList);
        });

    });
  }


  loadInsurancecompany() {
    return new Promise((resolve, reject) => {
      this.api.findinsurancecompany()
        .then((jsonRes) => {
          var InsurancecompanyList = jsonRes.data;
          console.log('InsurancecompanyList', InsurancecompanyList)

          resolve(InsurancecompanyList);
        });

    });
  }
  loadArprep() {
    return new Promise((resolve, reject) => {
      this.api.arprep()
        .then((jsonRes) => {
          var ArprepList = jsonRes.data;
          console.log('arprepList', ArprepList)

          resolve(ArprepList);
        });

    });
  }

  loadAdjusterprep() {
    return new Promise((resolve, reject) => {
      this.api.adjusterprep()
        .then((jsonRes) => {
          var AdjusterprepList = jsonRes.data;
          console.log('AdjusterprepList', AdjusterprepList)

          resolve(AdjusterprepList);
        });

    });
  }

  loadSearchIns(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.findinsurancecompanyquery(queryParams)
        .then((jsonRes) => {
          var inssearch = jsonRes.data;
          console.log('inssearch', inssearch)
          resolve(inssearch);
        });

    });
  }


loadSearchInvoice(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.findinvoicequery(queryParams)
        .then((jsonRes) => {
          var inssearch = jsonRes.data;
          console.log('findinvoiceyquery', inssearch)
          resolve(inssearch);
        });

    });
  }


  loadInsured() {
    return new Promise((resolve, reject) => {
      this.api.findinsured()
        .then((jsonRes) => {
          var insuredList = jsonRes.data;
          console.log('insuredList', insuredList)
          resolve(insuredList);
        });
    });
  }
  loadMarep() {
    return new Promise((resolve, reject) => {
      this.api.marep()
        .then((jsonRes) => {
          var marep = jsonRes.data;

          console.log('loadMarep', jsonRes, marep)
          resolve(marep);
        });
    });
  }


  // loadSearch(queryParams) {
  //   return new Promise((resolve, reject) => {
  //     this.api.findclaim(queryParams)
  //       .then((jsonRes) => {
  //         var searchList = jsonRes.data
  //         resolve(searchList)
  //          this.origItems = claim
  //         this.appService.searchDataLoaded = true
  //         // console.log('jsonRes ', jsonRes);
  //         console.log('this.claim loadData 0 ', claim.length)//claim[0]);
  //         return claim
  //       });
  //   });

  // }
  // this is search for claims
  loadSearch(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.findclaim(queryParams)
        .then((jsonRes) => {
          var searchList = jsonRes.data
          resolve(searchList) //claimList
          //  this.origItems = claim
          // this.appService.searchDataLoaded = true
          console.log('jsonRes ', jsonRes);
          // console.log('this.claim loadData 0 ', claim.length)//claim[0]);
          // return claim
        });
    });

  }


  loadSearchInsured(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.findinsuredquery(queryParams)
        .then((jsonRes) => {
          var InsuredList = jsonRes.data;
          resolve(InsuredList);

        });
    });
  }

  loadSearchDaily(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.finddailyquery(queryParams)
        .then((jsonRes) => {
          var DailyList = jsonRes.data;
          resolve(DailyList);

        });
    });
  }
  loadCodes() {
    return new Promise((resolve, reject) => {
      this.api.findCodes()
        .then((jsonRes) => {
          var codesList = jsonRes.data;
          console.log('codesList', codesList)
          resolve(codesList)
        })
    })
  }



  loadSearchClaimant(queryParams) {
    return new Promise((resolve, reject) => {
      this.api.findclaimantquery(queryParams)
        .then((jsonRes) => {
          var ClaimantList = jsonRes.data
          resolve(ClaimantList)

        });
    });
  }


  loadService() {
    return new Promise((resolve, reject) => {
      this.api.findservice()
        .then((jsonRes) => {
          var serviceList = jsonRes.data;
          console.log('serviceList', serviceList)

          resolve(serviceList);
        });

    });
  }

  loadExpense() {
    return new Promise((resolve, reject) => {
      this.api.findexpense()
        .then((jsonRes) => {
          var expenseList = jsonRes.data;
          console.log('expenseList', expenseList)

          resolve(expenseList);
        });

    });
  }
  loadClaimlist() {
    return new Promise((resolve, reject) => {
      this.api.findclaimlist()
        .then((jsonRes) => {
          var claimList = jsonRes.data;
          console.log('claimList', claimList)

          resolve(claimList);
        });

    });
  }


  camelCaseToProperCase(input) {
    return input.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

}