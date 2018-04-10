import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Addresses {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  addresses: Address[] = [];
  //newNoteWorkDate = '';
  //newNote= '';

  constructor(api, appService, dialogService) {

    this.dialogService = dialogService
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentInsco;
    this.isDisableEdit = true
  }

  activate(params, routeConfig) {

  }
  remove(item, index) {
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let addresses = this.currentItem.addresses
        addresses.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });



  }
  selectChanged(selectedadjuster, adjusterid) {
    // Find the selected adjuster object
    let adj = this.appService.adjusterActiveList.find(x => x.ADJUSTER_ID === adjusterid);
    // Update the current adjuster with the new values
    selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    selectedadjuster.ACCOUNT_REP_ID = adj.ADJUSTER_ID;



    // We don't need to change the TYPE as it is bound correctly from the UI
    selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }


  addAddress() {

    let addresses = this.currentItem.addresses
    let flag = false
    let item
    let newDate = moment().format('YYYY-MM-DD')
    if (addresses === undefined) {
      flag = true
      addresses = []
    }


    item = {
      ADDRESS: '', ADDRESS2: '', CITY: '', STATE: '', ZIP: '', PHONE: '', FAX: '',
      INSURANCE_TYPE: '', SERVICE_RATE: '', MILEAGE_RATE: '',
      CLERICAL_RATE: '', PHOTO_RATE: '', FILE_CREATE_CHARGE: '',
      DEFAULT_FEE: '', ACCOUNT_REP_ID: '', DIARY_DAYS: '', edit: true
    }
    addresses.unshift(item)
    if (flag) this.currentItem.addresses = addresses



  }



  cancel(item, index) {
    // this.mode = 0
    // // alert('you are about to cancel ' + item.Notes + ' ' + index)
    // let notes = this.currentItem.notes//notes
    // // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    // if (this.mode === 1) {

    //   notes.splice(index, 1)
    //   document.getElementById('a' + index).disabled = true;
    //   document.getElementById('b' + index).disabled = true;
    // } else {

    //   this.currentItem.notes[index] = this.currentnote
    //   console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

    // }
    // this.mode = 0
    // this.isDisableEdit = true


  }
  save(address, index) {
    // this.mode = 0
    // console.log(' this.currentItem.notes', this.currentItem.notes)
    // this.isDisableEdit = true
    // document.getElementById('a' + index).disabled = true;
    // document.getElementById('b' + index).disabled = true;
  }


}
