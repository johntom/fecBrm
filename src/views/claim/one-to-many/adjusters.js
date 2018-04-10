import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';

@inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
export class Adjusters {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
  // notes: Note[] = [];
  adjusters: Adjuster[] = []
  newNoteWorkDate = '';
  newNote = '';
  typeList = [
    "Primary",
    "Assistant"
  ];

  constructor(taskQueue, signaler, api, appService, dialogService) {
    this.taskQueue = taskQueue;
    this.signaler = signaler;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentClaim//testrec;
    this.mode = 0;
    this.editrec = '';

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
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0

    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let adjusters = this.currentItem.adjusters
        adjusters.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  addAdjuster() {
    let flag = 0;
    let item;
    if (this.currentItem.adjusters === undefined) {
      flag = 1;
      this.currentItem.adjusters = [];
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Primary', edit: true };
    } else {
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Assistant', edit: true };
    }
    this.currentItem.adjusters = [item, ...this.currentItem.adjusters];
    // this.taskQueue.queueTask(() => {
    //   this.currentItem.adjusters = [item, ...this.currentItem.adjusters];
    //   this.signaler.signal('adjuster-signal');
    // });


  }
  //  save(adjuster, index) {
  //     this.mode = 0
  //     console.log(' this.currentItem.adjusters', this.currentItem.adjusters)
  //     this.isDisableEdit = true
  //     // I dont think i use this
  //    // document.getElementById('a' + index).disabled = true;
  //    // document.getElementById('b' + index).disabled = true;
  //   }

  selectChanged(selectedadjuster, adjusterid) {
    // Find the selected adjuster object // 
    let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
    // Update the current adjuster with the new values
    selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    // We don't need to change the TYPE as it is bound correctly from the UI
    selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }

  cancel(item, index) {
    // this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // if (this.mode === 1) {

    //   adjusters.splice(index, 1)
    //   // document.getElementById('a' + index).disabled = true;
    //   // document.getElementById('b' + index).disabled = true;
    // } else {
    //   this.currentItem.adjusters[index] = this.aduster
    //   console.log(' this.currentItem.notes', adjusters, this.currentItem.adjusters[index])
    // }
    // this.mode = 0
    // this.isDisableEdit = true

  }
  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
}
