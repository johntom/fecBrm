import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Adjusternotes {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
    done = false;
  edit = false;
 // todos: Todo[] = [];
 notes: Note[] = [];
  newNoteWorkDate = '';
  newNote= '';
 
  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    //console.log( ' this.currentItem ',this.currentItem.notes)
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
    alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
 
    let notes = this.currentItem.notes
    notes.splice(index, 1)// start, deleteCount)
    
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

  addNote() {
   //  if (this.newNote) {
    //   this.currentItem.notes.push(new Note(this.newNote));
     let notes = this.currentItem.notes
  //   // notes.push({WorkDate:'2017-10-30',Notes:'test'})
  //   // var today = new Date() newNoteWorkDate = ''; newNoteWorkDate
  //newNoteNote= '';
     var item = { WorkDate: this.newNoteWorkDate, Notes: this.newNote }
     notes.unshift(item)
   
     this.newNoteWorkDate = '';
     this.newNoteNote = '';
    
    
    // }



  }
  edit(item, index) {
    //  alert('you are about to edit ' + item.Notes + ' ' + index)
    this.mode = 2// 'add';
    this.editrec = index
    let notes = this.currentItem.notes//notes
    this.isDisableEdit = false
    this.currentnote = JSON.parse(JSON.stringify(this.currentItem.notes[index]));
    // this.currentnote =this.currentItem.notes[index]// item //.Notes;//[index];
    console.log('this.currentnote ', this.currentnote)
    document.getElementById('a' + index).disabled = false
    document.getElementById('b' + index).disabled = false

  }

  // edit2(item, index){
  //    this.mode = 2// 'add';
  //     this.editrec= index;
  //     let notes = this.currentItem.notes
  //     this.isDisableEdit=false
  //  // console.log((index === this.editrec &&  this.mode >0  ))
  //   return !(index === this.editrec &&  this.mode >0  )

  // }

  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let notes = this.currentItem.notes//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {
      // addmode
      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {
      //  notes[index]=this.currentnote
      this.currentItem.notes[index] = this.currentnote
      console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])
      //     document.getElementById('a' + index).disabled = true;
      // document.getElementById('b' + index).disabled = true;
    }
    this.mode = 0
    this.isDisableEdit = true


  }
  save(note, index) {
    this.mode = 0
    // alert('you are about to save ' + note.Notes + ' ' + index)
    // let notes = this.currentItem.notes
    console.log(' this.currentItem.notes', this.currentItem.notes)
    this.isDisableEdit = true
    document.getElementById('a' + index).disabled = true;
    document.getElementById('b' + index).disabled = true;
  }




}
