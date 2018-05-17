import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Promptyn } from '../../../services/promptyn';
import { Prompt } from '../prompt';

@inject(ApiService, ApplicationService, DialogService)
export class Docs {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  status = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentClaim//testrec;
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  modalDocs() {

    this.dialogService.open({ viewModel: Prompt, model: 'docs', lock: false }).whenClosed(response => {
      // if (!response.wasCancelled) {
      //   console.log('Delete')
      //   let notes = this.currentItem.notes
      //   notes.splice(index, 1)// start, deleteCount)
      // } else {
      //   console.log('cancel');
      // }

      console.log(response.output);
    });
  
}
promiseDialog(obj) {
  return new Promise((resolve, reject) => {
    this.dialogService.open({ viewModel: Promptyn, model: 'Press OK to Overwrite or Cancel ' + obj.name + '?', lock: false }).whenClosed(response => {
      let out = { name: obj.name, val: obj.val, ext: obj.ext, resp: response.wasCancelled }
      // send object back with answer
      resolve(out)
    });
  });
}
checkData(images, formData) {
  let promises = []
  return new Promise((resolve, reject) => {
    let i = 0;
    let docs = this.currentItem.docs
    if (docs === undefined) docs = []
    let imagelen = images.length
    for (i = 0; i < images.length; i++) {
      let ext = images[i].name.split('.').pop();
      let fname = images[i].name
      let mid = -100// not needed
      let ival = i
      mid = docs.findIndex(x => x.FILE_NAME === fname)
      if (mid > -1) {
        // if we find file in array pass all values so we can evaluate later
        let obj = { name: fname, val: ival, ext: ext }
        var promise = this.promiseDialog(obj)
        promises.push(promise);
      } else {
        var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
        docs.unshift(item)
        formData.append('file', images[ival]);
      }
    }
    return Promise.all(promises).then(values => {
      for (i = 0; i < values.length; i++) {
        //console.log(' this.response values[i] ',i,values[i].name,values[i].val,values[i].resp)
        if (!values[i].resp) {
          //true=wasCancelled
          var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext, OVERWRITE: 'Y' }
          // dont add to data docs.unshift(item)
          formData.append('file', images[values[i].val]);
        }
      }
      resolve(formData)
    })
  })
}

addDocs(images) {
  //images is file
  //check for dups 2/21/2018
  //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  let docs = this.currentItem.docs
  let formData = new FormData()
  let newDate = moment().format('YYYY-MM-DD')
  let flag = false
  let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
    let newform = values;
    console.log('after checkdata1 ', this.status, newform);
    // this.api.upload(formData, this.currentItem.CLAIM_NO)
    this.api.upload(newform, this.currentItem.CLAIM_NO)
      .then((jsonRes) => {
        this.upmess = jsonRes.message

        $("#file").val("");
      })
  })

  // this is not a good way to get value this.items = Promise.resolve(this.checkData(images));
  //  console.log('after checkdata1 just a promise cant pick off value ',  this.status,this.items);

  //  return Promise.all([  this.checkData(images)]).then(values => {
  //     this.items = values[0];
  //      console.log('after checkdata1 ',  this.status,this.items);
  //   }).catch(error => {
  //     console.error("Error encountered while trying to get data.", error);
  //   });

}

}

  // save(note, index) {
  //   // send images to upload
  //   var form = new FormData()
  //   form.append("file", images[0]); //MUST BE LAST only 1 image allowed
  //   console.log('formData', form, bin)
  //   this.api.upload(form)
  //     .then((jsonRes) => {
  //       this.upmess = jsonRes.message
  //       $("#file").val("");
  //     })
  // }

  // addDocsOLD(images) {
  //   //images is file
  //   //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  //   let docs = this.currentItem.docs
  //   let formData = new FormData()
  //   let newDate = moment().format('YYYY-MM-DD')
  //   let flag = false
  //   if (docs === undefined) {
  //     flag = true
  //     docs = []
  //   }
  //   for (let i = 0; i < images.length; i++) {
  //     let ext = images[i].name.split('.').pop();
  //     var item = { FILE_NAME: images[i].name, FILE_EXT: '.' + ext } //'.pdf' }
  //     docs.unshift(item)
  //     formData.append('file', images[i]);
  //   }
  //   if (flag) this.currentItem.docs = docs
  //   // send images to upload
  //   this.api.upload(formData, this.currentItem.CLAIM_NO)
  //     .then((jsonRes) => {
  //       this.upmess = jsonRes.message
  //       $("#file").val("");
  //     })
  // }

  // async getData(images) {
  //   for (let i = 0; i < images.length; i++) {
  //     alert('fn exits ' + i)
  //     // let ext = images[i].name.split('.').pop();
  //     // let fname = images[i].name
  //     // let mid = 0
  //     // mid = docs.findIndex(x => x.FILE_NAME === fname)
  //     // if (mid > -1) {
  //     //   // alert('fn exits ' + fn)
  //     //   await this.dialogService.open({ viewModel: Prompt, model: 'Overwrite or Cancel?', lock: false }).whenClosed(response => {
  //     //     console.log(response.output);
  //     //     if (!response.wasCancelled) {
  //     //       console.log('Overwrite image and leave data alone but upload it')
  //     //       // let contacts = this.currentItem.contacts
  //     //       // contacts.splice(index, 1)// start, deleteCount)
  //     //       var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'Y' } //'.pdf' }
  //     //       // dont add to data docs.unshift(item)
  //     //       formData.append('file', images[i]);
  //     //     } else {

  //     //     }
  //     //   });
  //     // }
  //   }
  // }
  // checkDataArchive(images) {
  //   return new Promise((resolve, reject) => {
  //     let i = 0;
  //     for (i = 0; i < images.length; i++) {
  //     }
  //     if (i === images.length) {
  //       this.status = true
  //       resolve(i)
  //     }
  //   });
  //   //  let data = 
  //   // await getData(images);
  //   // Before the following return is run, the await will halt
  //   // execution before the function continues
  //   //return { version: 1, data: data };
  //   // console.log('let 1');
  // }
  //async not working
  // addDocsoldxx(images) {
  //   //images is file
  //   //check for dups 2/21/2018
  //   //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  //   let docs = this.currentItem.docs
  //   let formData = new FormData()
  //   let newDate = moment().format('YYYY-MM-DD')

  //   let flag = false
  //   // if (docs === undefined) {
  //   //   flag = true
  //   //   docs = []
  //   // }

  //   //  let mid = 0
  //   //           mid = inscompanies.findIndex(x => x._id === oid)
  //   this.currentItem.docs = docs
  //   // if (docs === undefined) {
  //   //   flag = true
  //   //   docs = []
  //   //   this.checkData(images)
  //   //   for (let i = 0; i < images.length; i++) {

  //   //     let ext = images[i].name.split('.').pop();
  //   //     let fn = images[i].name
  //   //     let mid = 0
  //   //     var item = { FILE_NAME: fn, FILE_EXT: '.' + ext, OVERWRITE: 'Y' } //'.pdf' }
  //   //     docs.unshift(item)
  //   //     formData.append('file', images[i]);
  //   //   }
  //   //   this.currentItem.docs = docs
  //   //   this.api.upload(formData, this.currentItem.CLAIM_NO)
  //   //     .then((jsonRes) => {
  //   //       this.upmess = jsonRes.message

  //   //       $("#file").val("");
  //   //     })
  //   // } else {
  //   this.checkData(images)
  //   // for (let i = 0; i < images.length; i++) {

  //   //   let ext = images[i].name.split('.').pop();
  //   //   let fname = images[i].name
  //   //   let mid = 0
  //   //   mid = docs.findIndex(x => x.FILE_NAME === fname)
  //   //   if (mid > -1) {
  //   //     // alert('fn exits ' + fn)
  //   //     this.dialogService.open({ viewModel: Prompt, model: 'Overwrite or Cancel?', lock: false }).whenClosed(response => {
  //   //       console.log(response.output);
  //   //       if (!response.wasCancelled) {
  //   //         console.log('Overwrite image and leave data alone but upload it')
  //   //         // let contacts = this.currentItem.contacts
  //   //         // contacts.splice(index, 1)// start, deleteCount)
  //   //         var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'Y' } //'.pdf' }
  //   //         // dont add to data docs.unshift(item)
  //   //         formData.append('file', images[i]);
  //   //       } else {
  //   //         console.log('cancel');
  //   //       }
  //   //     });
  //   //     // var item = { FILE_NAME: fn, FILE_EXT: '.' + ext } //'.pdf' }
  //   //     // docs.unshift(item)
  //   //     // formData.append('file', images[i]); 
  //   //   } else {
  //   //     var item = { FILE_NAME: fn, FILE_EXT: '.' + ext, OVERWRITE: 'N' } //'.pdf' }
  //   //     docs.unshift(item)
  //   //     formData.append('file', images[i]);
  //   //   }
  //   // }
  //   console.log('at upload')
  //   this.api.upload(formData, this.currentItem.CLAIM_NO)
  //     .then((jsonRes) => {
  //       this.upmess = jsonRes.message

  //       $("#file").val("");
  //     })
  //   //  }
  //   // console.log('formData', formData)
  //   // console.log(this.currentItem)
  //   // this.api.upload(formData, this.currentItem.CLAIM_NO)
  //   //   .then((jsonRes) => {
  //   //     this.upmess = jsonRes.message
  //   //     $("#file").val("");
  //   //   })
  // }
  // remove(item) {
  //   //  this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
  //   //     if (!response.wasCancelled) {
  //   //       console.log('Delete')
  //   //       let contacts = this.currentItem.contacts
  //   //       contacts.splice(index, 1)// start, deleteCount)
  //   //     } else {
  //   //       console.log('cancel');
  //   //     }
  //   //     console.log(response.output);
  //   //   });
  // }
  // addDocs1(images) {
  //   //images is file
  //   //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  //   let docs = this.currentItem.docs
  //   let newDate = moment().format('YYYY-MM-DD')
  //   let ext = images[0].name.split('.').pop();
  //   var item = { FILE_NAME: images[0].name, FILE_EXT: ext } //'.pdf' }
  //   docs.unshift(item)
  //   // send file
  //   var form = new FormData()
  //   form.append("file", images[0]); //MUST BE LAST only 1 image allowed
  //   console.log('formData', form)
  //   this.api.upload(form)
  //     .then((jsonRes) => {
  //       this.upmess = jsonRes.message
  //       $("#file").val("");
  //     })
  // }
  // checkDatabc(images, formData) {
  //   return new Promise((resolve, reject) => {
  //     let i = 0;
  //     let docs = this.currentItem.docs
  //     if (docs === undefined) docs = []
  //     let imagelen = images.length
  //     for (i = 0; i < images.length; i++) {
  //       let ext = images[i].name.split('.').pop();
  //       let fname = images[i].name
  //       let mid = -5
  //       let ival = i
  //       mid = docs.findIndex(x => x.FILE_NAME === fname)
  //       alert('mid ' + mid)
  //       // if (mid > -1) {
  //       //let response = this.promiseDialog(fname)

  //       //  if (this.appService.claimLookupDataLoaded) {
  //       //       console.log('using data cache from home....')
  //       //       return Promise.resolve(true);
  //       //     } else {
  //       return Promise.all([
  //         this.promiseDialog(fname)
  //       ]).then(values => {
  //         let response = values[0];
  //         console.log(' this.response', response)
  //         if (!response.wasCancelled) {
  //           alert('not cancelled')
  //           // //console.log('Overwrite image and leave data alone but upload it')
  //           // // let contacts = this.currentItem.contacts
  //           // // contacts.splice(index, 1)// start, deleteCount)
  //           // var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'Y' } //'.pdf' }
  //           // // dont add to data docs.unshift(item)
  //           // formData.append('file', images[ival]);

  //           // if (ival === imagelen) {
  //           //   alert('1. docs are uploaded. Save form data ' + images[ival])
  //           //   this.status = true
  //           //   //  this.currentItem.docs = docs
  //           //   resolve(formData)
  //           // }
  //         } else {
  //           alert('cancelled')
  //           // if (ival === imagelen) {
  //           //   alert('doc upload cancelled')

  //           //   this.status = true
  //           //   this.currentItem.docs = docs
  //           //   resolve(formData)
  //           // }
  //         }
  //         //bad   this.currentItem = this.items.find(f => f.id == params.id);

  //       })
  //       // } else {
  //       //   // mid === -1
  //       if (mid === -1) {
  //         alert('mid b ' + mid)
  //         var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' } //'.pdf' }
  //         docs.unshift(item)
  //         formData.append('file', images[i]);
  //         if (ival === imagelen - 1) {
  //           alert('2. docs are uploaded. Save form data')
  //           this.status = true
  //           this.currentItem.docs = docs
  //           resolve(formData)
  //         }
  //       }
  //       // alert('finished ' + i + ' ' + imagelen)

  //     }
  //     alert('end  ival ' + ival)
  //     //  if (i === images.length) {
  //     //     this.status = true
  //     //     this.currentItem.docs = docs
  //     //     resolve(formData)
  //     //   }
  //   })
  // }

