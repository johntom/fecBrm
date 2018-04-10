
import { inject, singleton } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client'
// sample-layout-mrg
@inject(HttpClient)
export class ApiService {
  constructor(http) {
    this.http = http;
    this.upmess = ''
    //this.baseweb = 'http://localhost:8080/api/';
    this.baseweb = 'http://jif.bergenrisk.com:8081/api/';
  }
  getUserJwt(username, pass) {
    var token = {};
    token.username = username;
    token.password = pass;
    var url = this.baseweb + 'v1/auth/local';
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    }).then((res) => res.json());

  }
  arprep() {
    var url = this.baseweb + 'v1/arprep/'
    console.log('url arprep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  /*
   //const squares = arr.map(x => x * x);
 
   // Traditional function expression:
   // const squares = arr.map(function (x) { return x * x });
  fetch(url).then(response => 
       response.json().then(data => ({
           data: data,
           status: response.status
       })
   ).then(res => {
       console.log(res.status, res.data.title)
   }); 
   
    }).then(function (res) {
            let a = res.json()
            console.log('arprep res.json() a', a,a.data)
            return a}
           )
   */
  arprepDocument() {
    var url = this.baseweb + 'v1/arprep/'
    console.log('url arprep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then(res => res.json().then(data => {
      console.log('arprep res.json() a=', data)
      let i
      for (i = 0; i < data.data.length; i++) {
        text += data.data[i].CLAIM_NO + "<br>";
        console.log('text', text)
      }
      return data
    }));
  }

  //  { method: ['get'], path: '/api/v1/arprepone/:id', handler: 'DailyController.arprepone' },
  arprepone(claimno) {
    var url = this.baseweb + 'v1/arprepone/' + claimno
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  adjusterprep() {
    var url = this.baseweb + 'v1/adjusterprep/'
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then(res => res.json());
    // }).then((res) => res.json());
  }

  //  { method: ['get'], path: '/api/v1/arprepone/:id', handler: 'DailyController.arprepone' },
  adjusterprepone(adjuster) {
    // var url = this.baseweb + 'v1/adjusterprepone/' + adjuster
    var url = this.baseweb + 'v1/adjusterprep/' + adjuster
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }




  getbatchno() {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/batch/'
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveDaily(rec, status) {
    let url = this.baseweb + `v1/daily/update`
    let i
    for (i = 0; i < rec.length; i++) {
      if (rec[i].$isSelected === true) {
        rec[i].INV_STATUS = 0 // approved for billing
      }
    }
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
  saveDailyforar(rec, status) {
    let url = this.baseweb + `v1/daily/updatepdf`
    console.log('saveDaily url ', url)
    let i
    for (i = 0; i < rec.length; i++) {
      if (rec[i].$isSelected === true) {
        rec[i].INV_STATUS = 1 // approved for billing
      }
    }

    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json())
  }


  // saveDailyCreateAR(rec) {
  //   let url = this.baseweb + `v1/daily/savecreatear`
  //   console.log('saveDaily url ', url)
  //   return this.http.fetch(url, {
  //     method: 'put',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //       // , 'Authorization': 'JWT ' + token
  //     },
  //     body: JSON.stringify(rec)
  //   }).then((res) => res.json());
  // }
  createAR(dailies, claim, status) {
    // saveDailyforar is run first
    let url = this.baseweb + `v1/ar/create`
    console.log('createAR url status ', status, url)

    let detail = []
    let i
    for (i = 0; i < dailies.length; i++) {
       if (dailies[i].$isSelected === true) {
      let rec = {}
      rec.CLAIM_NO = dailies[i].CLAIM_NO
      rec.BILL_TIME = dailies[i].WORKTIME_BILLEDAPPROVED * 1
      rec.EXPENSE_BILLED = dailies[i].EXPENSE_BILLEDAPPROVED * 1
      rec.MILEAGE_BILLED = dailies[i].TRAVEL_APPROVED * 1 //TRAVEL_BILLEDAPPROVED //TRAVEL_APPROVED/
      rec.SERVICE = dailies[i].SERVICE.DESCRIPTION
      rec.EXPENSE = dailies[i].EXPENSE.DESCRIPTION
      rec.WORK_DATE = dailies[i].WORK_DATE
      rec.WORK_DESCRIPTION = dailies[i].WORK_DESCRIPTION
      rec.ADJUSTER_NOTES = dailies[i].ADJUSTER_NOTES
      rec.ADJUSTER = dailies[i].ADJUSTER.ADJUSTER_NAME
      rec.INV_STATUS = status;
      rec.AR_ID = 0;

      detail.push(rec)
       }
    }
    let newmodel = { Head: 'test', status: status, claim, details: detail }

    // let newmodel = { Head: 'test', claim: {claim}, dailies: dailies }
    //  let newmodel = { Head: 'test', claim, dailies: dailies }
    //  let newmodel = { Head: 'test', dailies: dailies }
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());
  }

  // createArPdf(dailies, claim,status) {
  //     // saveDailyforar is run first
  //     let url = this.baseweb + `v1/jsreportAR`
  //     console.log('createAR url ', url)

  //     // let newmodel = { Head: 'test', claim: {claim}, dailies: dailies }
  //     //  let newmodel = { Head: 'test', claim, dailies: dailies }
  //     //  let newmodel = { Head: 'test', dailies: dailies }
  //     return this.http.fetch(url, {
  //       method: 'post',
  //       mode: 'cors',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(newmodel)
  //     }).then((res) => res.json());
  //   }





  // saveDailyAdjuster(dailies, claim, adjuster) {
  // saveDailyAdjuster(dailies, adjuster) {
   // this.api.saveDailyAdjuster(this.dailies, this.appService.currentadjuster,this.appService.currentpayperiod).then((jsonRes) => {
    
    saveDailyAdjuster(dailies,status,adjno,currentpayperiod) {
        console.log('params  ', status,adjno,currentpayperiod)
    let url = this.baseweb + `v1/adjusterpayment/create`
    console.log('createAR url ', url)
    // console.log('adjuster ', adjuster)
    let rec = {}
    let detail = []
    let i
    for (i = 0; i < dailies.length; i++) {
      // WORK_TIME_PAID EXPENSE_APPROVED EXPENSE_BILLEDAPPROVED TRAVEL_APPROVED EXPENSE_BILLEDAPPROVED 
     if (dailies[i].$isSelected === true) {
      rec.CLAIM_NO = dailies[i].CLAIM_NO
      rec.WORK_TIME_PAID = dailies[i].WORK_TIME_PAID
      rec.EXPENSE_APPROVED = dailies[i].EXPENSE_APPROVED
      rec.TRAVEL_APPROVED = dailies[i].TRAVEL_APPROVED
      rec.WORK_DATE = dailies[i].WORK_DATE
      rec.WORK_DESCRIPTION = dailies[i].WORK_DESCRIPTION
      rec.ADJUSTER_NOTES = dailies[i].ADJUSTER_NOTES
      rec.ADJUSTER = dailies[i].ADJUSTER.ADJUSTER_NAME
      rec.SERVICE = dailies[i].SERVICE.DESCRIPTION
      rec.EXPENSE = dailies[i].EXPENSE.DESCRIPTION
      rec.Claim = dailies[i].CLAIM
      rec.Aduster = dailies[i].ADJUSTER
      
      rec.ADJ_STATUS = status;
      rec.AR_ID = 0;
     // rec.Payperiod=currentpayperiod
      // rec[i].STATUS = 0;
      detail.push(rec)
     }
    }
    // let newmodel = { Head: 'test2', claim:claim, details: detail, adjuster: adjuster }
    let newmodel = { status: status, adjno:adjno,payperiod:currentpayperiod,details: detail }
    console.log('===============newmodel= ', newmodel)
    
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());
  }

  addDaily(rec, batchno) {
    // var token = {};
    // token.username = username;
    // token.password = pass;
    //  rec[i].batchno = bno
    // rec[i].SERVICE = rec[i].SERVICE
    // rec[i].EXPENSE = rec[i].EXPENSE
    // rec[i].WORK_TIME = rec[i].WORK_TIME * 1;
    // rec[i].EXPENSE_AMT = rec[i].EXPENSE_AMT * 1;
    // rec[i].MILEAGE = rec[i].MILEAGE * 1;
    // rec[i].WORK_TIME_BILLED = rec[i].WORK_TIME;
    // rec[i].WORK_TIME_PAID = rec[i].WORK_TIME;
    // rec[i].WORKTIME_BILLEDAPPROVED = rec[i].WORK_TIME;
    // rec[i].WORK_TIME_CARRIER = rec[i].WORK_TIME;
    // rec[i].EXPENSE_APPROVED = rec[i].EXPENSE_AMT;
    // rec[i].EXPENSE_BILLEDAPPROVED = rec[i].EXPENSE_AMT;
    // rec[i].TRAVEL_APPROVED = rec[i].MILEAGE;
    // rec[i].TRAVEL_BILLEDAPPROVED = rec[i].MILEAGE;
    // rec[i].ADJUSTER_PAID = 0;
    // rec[i].ADJ_STATUS = 0;
    // rec[i].INV_STATUS = 0;
    // rec[i].STATUS = 0;
    // rec[i].AR_ID = 0;
    // rec[i].STATUS = 0;
    let newrec// = {}
    let newarray = []
    let i = 0
    //let bno = batchno
    for (i = 0; i < rec.length; i++) {
      newrec = {}
      newrec.batchno = batchno;
      newrec.SERVICE = rec[i].SERVICE;
      newrec.EXPENSE = rec[i].EXPENSE;
      newrec.WORK_TIME = rec[i].WORK_TIME * 1;
      newrec.EXPENSE_AMT = rec[i].EXPENSE_AMT * 1;
      newrec.MILEAGE = rec[i].MILEAGE * 1;
      newrec.WORK_TIME_BILLED = rec[i].WORK_TIME;
      newrec.WORK_TIME_PAID = rec[i].WORK_TIME;
      newrec.WORKTIME_BILLEDAPPROVED = rec[i].WORK_TIME;
      newrec.WORK_TIME_CARRIER = rec[i].WORK_TIME;
      newrec.EXPENSE_APPROVED = rec[i].EXPENSE_AMT;
      newrec.EXPENSE_BILLEDAPPROVED = rec[i].EXPENSE_AMT;
      newrec.TRAVEL_APPROVED = rec[i].MILEAGE;
      newrec.TRAVEL_BILLEDAPPROVED = rec[i].MILEAGE;
      newrec.ADJUSTER_PAID = 0;
      newrec.ADJ_STATUS = 0;
      newrec.INV_STATUS = 0;
      newrec.STATUS = 0;
      newrec.AR_ID = 0;
      newrec.STATUS = 0;
      newarray.push(newrec)
    }

    var url = this.baseweb + 'v1/daily/create';
    //  console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newarray)

    }).then((res) => res.json());

  }
  addDailyEmbeded(rec) {
    // sames as above but writes to one embeded record not in use
    let dailies = []
    let i = 0
    for (i = 0; i < rec.length; i++) {
      rec[i].WORK_TIME = rec[i].WORK_TIME * 1;
      rec[i].EXPENSE_AMT = rec[i].EXPENSE_AMT * 1;
      rec[i].MILEAGE = rec[i].MILEAGE * 1;
      rec[i].WORK_TIME_BILLED = rec[i].WORK_TIME;
      rec[i].WORK_TIME_PAID = rec[i].WORK_TIME;
      rec[i].WORKTIME_BILLEDAPPROVED = rec[i].WORK_TIME;
      rec[i].WORK_TIME_CARRIER = rec[i].WORK_TIME;
      rec[i].EXPENSE_APPROVED = rec[i].EXPENSE_AMT;
      rec[i].EXPENSE_BILLEDAPPROVED = rec[i].EXPENSE_AMT;
      rec[i].TRAVEL_APPROVED = rec[i].MILEAGE;
      rec[i].TRAVEL_BILLEDAPPROVED = rec[i].MILEAGE;
      rec[i].ADJUSTER_PAID = 0;
      rec[i].ADJ_STATUS = 0;
      rec[i].INV_STATUS = 0;
      rec[i].STATUS = 0;
      rec[i].AR_ID = 0;
      rec[i].STATUS = 0;
      dailies.push(rec[i])
    }
    let newmodel = { Head: 'test', dailies: dailies }
    var url = this.baseweb + 'v1/daily/create';
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(rec)
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());

  }
  //findclaim() {
  //   // http://localhost:8080/api/v1/claim
  //   var url = this.baseweb + 'v1/claimcontent';
  //   return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  // }
  findclaim(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/claimcontent/' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  findclaimOne(claimid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claim/${claimid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }

  //this.api.updateSavedlists(appService.currentsavedlist,this.selectedids).then((jsonRes) => {
  //    { method: ['get'], path: '/api/v1/savedlists/:id', handler: 'SavedlistsController.findone' },
  // { method: ['get'], path: '/api/v1/savedlists', handler: 'SavedlistsController.findall' },
  // { method: ['put'], path: '/api/v1/savedlists/update', handler: 'SavedlistsController.update' },
  // { method: ['post'], path: '/api/v1/savedlists/create', handler: 'SavedlistsController.create' },


  updateSavedlists(recid, rec) {
    let url = this.baseweb + `v1/savedlists/update/${recid}`
    console.log('url ', url)

    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  saveclaim(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/claim/update`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
  addclaim(rec) {
    //alert('in saveclaim')
    console.log('addclaim rec', rec)
    let url = this.baseweb + `v1/claim/create`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
  // insco
  findinscoOne(inscoid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insurancecompany/${inscoid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveinsco(rec) {
    let url = this.baseweb + `v1/insurancecompany/update`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  addinsco(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/insurancecompany/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }



  // claimant
  findclaimantOne(claimantid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claimant/${claimantid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveclaimant(rec) {
    let url = this.baseweb + `v1/claimant/update`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  addclaimant(rec) {
    let url = this.baseweb + `v1/claimant/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  // insured
  findinsuredOne(id) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insured/${id}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveinsured(rec) {
    let url = this.baseweb + `v1/insured/update`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  addinsured(rec) {
    let url = this.baseweb + `v1/insured/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  // http://jif.bergenrisk.com:8081/api/v1/adjuster
  findAdjusters() {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/adjuster`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  findMasrep() {
    // search has fullu formed query string  http://jif.bergenrisk.com:8081/api/v1/masrep/
    var url = this.baseweb + `v1/masrep`
    console.log('url findMasrep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
    findPayperiod() {
    // search has fullu formed query string  http://jif.bergenrisk.com:8081/api/v1/masrep/
    var url = this.baseweb + `v1/payperiod`
    console.log('url payperiod ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
//  findmarep() {
//     var url = this.baseweb + `v1/marep`
//     console.log('url ', url)
//     return this.http.fetch(url, {
//       method: 'get',
//       mode: 'cors'
//     }).then((res) => res.json());
//   }
  // new
  findinsurancecompany() {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insurancecompany`
    console.log('url insurancecompany ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findinsurancecompanyquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insurancecompanyquery/` + search
    console.log('url insurancecompany ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findinsuredquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insuredquery/` + search
    console.log('url insuredquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  finddailyquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/dailyquery/` + search
    console.log('url dailyquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }




  findclaimantquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claimantquery/` + search
    console.log('url claimantquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }


  // { method: ['get'], path: '/api/v1/insuredquery', handler: 'InsuredController.search' },
  //   { method: ['get'], path: '/api/v1/claimantquery', handler: 'ClaimantController.search' },


  // http://jif.bergenrisk.com:8081/api/v1/insurancecompany


  // http://jif.bergenrisk.com:8081/api/v1/claimtype
  findclaimType() {
    var url = this.baseweb + `v1/claimtype`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findinsured() {
    var url = this.baseweb + `v1/insured`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  // new
  //  findclaimant() {
  //     var url = this.baseweb + `v1/claimant`
  //     console.log('url ', url)
  //     return this.http.fetch(url, {
  //       method: 'get',
  //       mode: 'cors'
  //     }).then((res) => res.json());
  //   }


 


  uploadxxx(formData, id) {

    var url = this.baseweb + `v1/upload/${id}`
    console.log('url ', url, formData);
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'enctype': "multipart/form-data"
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json());
  }


  upload(formData, id) {
    var url = this.baseweb + `v1/upload/${id}`
    console.log('url ', url, formData);
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'enctype': "multipart/form-data"
      },
      body: formData
    }).then((res) => res.json());
  }

  upload_(formData) {
    // let bin =10007
    // let dir = 'fdny'
    // var url = this.baseweb + 'v1/upload/'+bin+'/'+dir;
    // let basewebdemo = 'http://cm.brookbridgeinc.com:8880/api/'
    // var url = this.baseweb + 'v1/upload';
    // var url = basewebdemo + 'upload';
    // var url = basewebdemo + 'v1/uploadviolations/'+bin+'/'+dir;
    // let basewebdemo = 'http://localhost:8880/api/'
    //var url = this.baseweb + 'v1/uploadviolations/' + bin + '/' + dir;
    //   var url = this.baseweb + 'v1/uploaddocs' ///' + bin + '/' + dir;
    var url = this.baseweb + 'v1/upload'
    // console.log('url ', url)
    // for (var [key, value] of formData.entries()) {
    //   console.log('form ', key, value);
    // }
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'enctype': "multipart/form-data"
      },
      body: formData
    }).then((res) => res.json());
  }



  findusers() {
    var url = this.baseweb + 'v1/findusers';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }

  findclaimlist() {
    var url = this.baseweb + 'v1/findclaim' // findclaim
    console.log('findclaimlist ', url)
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  findexpense() {
    var url = this.baseweb + 'v1/findexpense';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  findservice() {
    var url = this.baseweb + 'v1/findservice';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }



  // getUsers() {
  //     var url = baseCms + 'http://jif.bergenrisk.com:8080/api/';
  //     return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  // }

  findinveall() {
    var url = this.baseweb + 'v1/case/findall'
    return this.http.fetch(url).then((res) => res.json())
  }
  findcase(roles, auth) {
    let url = this.baseweb + `v1/case/find/${auth.user.id}`
    return this.http.fetch(url).then((res) => res.json())
  }

  findcontents(content, completed) {
    console.log(' content  ', content, completed)
    let url = this.baseweb + `v1/case/findcontents/${content}/${completed}`
    return this.http.fetch(url).then((res) => res.json())
  }


  updatecase(row, user) {
    let newrow = {}
    newrow._id = row._id
    newrow.assignto = row.assignto
    newrow.billedamt = row.billedamt
    newrow.completed = row.completed
    newrow.payamt = row.payamt
    newrow.savedamt = row.savedamt
    newrow.template = row.template
    newrow.type = row.type
    newrow.memo = row.memo
    newrow.filename = row.filename
    newrow.createdAt = row.createdAt
    newrow.assignfrom = user.userid // matched staffid unless we use init
    let url = this.baseweb + `v1/case/update`
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(newrow)
    }).then((res) => res.json());

  }
  deletecase(row, token) {
    console.log('this.e ', row.id)
    let pid = row.id
    let url = this.baseweb + `v1/case/deletecase`///${pid}`
    // return this.http.fetch(url).then((res) => res.json())
    return this.http.fetch(url, {
      method: 'delete',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(row)
    }).then((res) => res.json());

  }
  updateUser2(user, token) { //token, customer) {

    let url = this.baseweb + `v1/staff/update`
    let umodel = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      templates: user.templates
    }
    console.log('user', umodel)
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(umodel)
    }).then((res) => res.json())

  }


  updateUser(user) {
    let umodel = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      templates: user.templates,
      password: user.password
    }
    console.log('user ', umodel)
    //   let url = this.baseweb + `v1/staff/updateuser`
    let url = this.baseweb + `v1/case/updateuser`
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(user)
    }).then((res) => res.json());

  }



  walkdir() {
    let url = this.baseweb + 'v1/walkdir/getFiles'
    console.log('walkdir', url)
    return this.http.fetch(url).then((res) => res.json())
  }

  walkdirQF() {
    let url = baseweb + 'v1/walkdir/getFilesQF'
    return this.http.fetch(url).then((res) => res.json())
  }


  getLiability(s1, s2, s3) {
    //  var url = `http://localhost:8080/api/v1/wc/test/${s1}/${s2}/${s3}`;
    var url = this.baseweb + `v1/wc/test/${s1}/${s2}/${s3}`;
    return this.http.fetch(url).then((res) => res.json())
  }


}


  // findInventory(search) {
  //   // search has fullu formed query string
  //   var url = this.baseweb + 'v1/inventorycontent' + search
  //   console.log('url ', url)
  //   return this.http.fetch(url, {
  //     method: 'get',
  //     mode: 'cors'
  //   }).then((res) => res.json());
  //   //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  // }

  // findInventoryOne(inventorycode) {
  //   // search has fullu formed query string
  //   var url = this.baseweb + `v1/inventory/${inventorycode}`
  //   console.log('url ', url)
  //   return this.http.fetch(url, {
  //     method: 'get',
  //     mode: 'cors'
  //   }).then((res) => res.json());
  //   //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  // }
  // findInventoryorig(search) {
  //   var url = this.baseweb + 'v1/inventory';
  //   return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  // }
