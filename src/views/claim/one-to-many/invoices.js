import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Invoices {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  // notes: Note[] = [];
  //newNoteWorkDate = '';
  //newNote= '';
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  remove(item, index) {
    this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.notes
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  addDiary() {
    // let diaries = this.currentItem.diaries

    // let newDate = moment().format('YYYY-MM-DD')

    // var item = { ENTERED: newDate, REMIND: '', CANCELED: '', Notes: '', edit: true }

    //  diaries.unshift(item)


    let diaries = this.currentItem.diaries
    let flag = false
    let item
    let newDate = moment().format('YYYY-MM-DD')
    if (diaries === undefined) {
      flag = true
      diaries = []
    }
    item = { ENTERED: newDate, REMIND: '', CANCELED: '', Notes: '', edit: true }
    diaries.unshift(item)
    if (flag) this.currentItem.diaries = diaries



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
  save(note, index) {
    // this.mode = 0
    // console.log(' this.currentItem.notes', this.currentItem.notes)
    // this.isDisableEdit = true
    // document.getElementById('a' + index).disabled = true;
    // document.getElementById('b' + index).disabled = true;
  }


}
