import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Carrieremails {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
  notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }




  activate(params, routeConfig) {

  }
  remove(item, index) {
    // alert('you are about to delete ' + item.Notes + ' ' + index)
    // this.mode = 0

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


  addNote() {
    //  if (this.newNote) {
    //   this.currentItem.notes.push(new Note(this.newNote));
    let notes = this.currentItem.notes
    //   // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    //   // var today = new Date() newNoteWorkDate = ''; newNoteWorkDate
    //newNoteNote= '';
    let newNoteWorkDate = moment().format('YYYY-MM-DD')
    //  var item = { WorkDate: this.newNoteWorkDate, Notes: this.newNote ,edit:true}
    var item = { WorkDate: newNoteWorkDate, Notes: '', edit: true }
    notes.unshift(item)
    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }
  //  save(note, index) {
  //     this.mode = 0
  //     console.log(' this.currentItem.notes', this.currentItem.notes)
  //     this.isDisableEdit = true
  //     document.getElementById('a' + index).disabled = true;
  //     document.getElementById('b' + index).disabled = true;
  //   }


  // cancel(item, index) {
  //   this.mode = 0
  //   // alert('you are about to cancel ' + item.Notes + ' ' + index)
  //   let notes = this.currentItem.notes//notes
  //   // notes.push({WorkDate:'2017-10-30',Notes:'test'})
  //   if (this.mode === 1) {

  //     notes.splice(index, 1)
  //     document.getElementById('a' + index).disabled = true;
  //     document.getElementById('b' + index).disabled = true;
  //   } else {

  //     this.currentItem.notes[index] = this.currentnote
  //     console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

  //   }
  //   this.mode = 0
  //   this.isDisableEdit = true


  // }
  // edit(item, index) {

  //   this.note.edit = !this.note.edit
  // }





}
