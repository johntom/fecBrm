

import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Adjustermotes {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
  notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService ,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
  //  this.currentItem = this.appService.testrec;
    this.currentItem = this.appService.currentClaim
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
    // if (params.id) {
    //   this.recordId = params.id; 
    //   this.heading = `DataForm for record ${this.recordId}`;

    //   console.log('this.recordId ', this.recordId);
    //   return this.api.findInventoryOne(this.recordId)
    //     .then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);          
    //       let inv = jsonRes.data;
    //       this.currentItem = inv[0];
    //       console.log('data-form:activate - currentItem', this.currentItem);
    //       this.inv = inv[0]
    //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
    //       return inv
    //     });
    // }
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

    let notes = this.currentItem.notes
    let flag = false
    let item
    let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (notes === undefined) {
      flag = true
      notes = []
    }
    item = { WorkDate: newNoteWorkDate, Notes: '', edit: true }
    notes.unshift(item)
    if (flag) this.currentItem.notes = notes

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }



  //  save(note, index) {
  //    // not used
  //     this.mode = 0
  //     console.log(' this.currentItem.notes', this.currentItem.notes)
  //     this.isDisableEdit = true
  //     document.getElementById('a' + index).disabled = true;
  //     document.getElementById('b' + index).disabled = true;
  //   }


  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let notes = this.currentItem.notes//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {

      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {

      this.currentItem.notes[index] = this.currentnote
      console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

    }
    this.mode = 0
    this.isDisableEdit = true


  }
  // edit(item, index) {

  //   this.note.edit = !this.note.edit
  // }





}
 // add() {
  //   this.mode = 0//1// 'add';
  //   this.editrec = 0;
  //   let notes = this.currentItem.notes
  //   // notes.push({WorkDate:'2017-10-30',Notes:'test'})
  //   // var today = new Date()
  //   var item = { WorkDate: '', Notes: '' }
  //   notes.unshift(item)
  //   // var table = document.getElementById("myTable");
  //   // table.refresh();
  //   // //  window.location.reload()
  //   // document.getElementById('a' + 0).disabled = false;
  //   // document.getElementById('b' + 0).disabled = false;
  //   // this.edit(item,0) 

  // }


  // edit2(item, index){
  //    this.mode = 2// 'add';
  //     this.editrec= index;
  //     let notes = this.currentItem.notes
  //     this.isDisableEdit=false
  //  // console.log((index === this.editrec &&  this.mode >0  ))
  //   return !(index === this.editrec &&  this.mode >0  )

  // }