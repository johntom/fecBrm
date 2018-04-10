import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../../../services/prompt';
import moment from 'moment';
@inject(ApiService, ApplicationService,DialogService)
export class Adjuster {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;


   contacts: Contact[] = [];
  
  constructor(api, appService,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentInsco;
      this.isDisableEdit = true
      this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }

  remove(item, index) {

    // alert('you are about to delete ' + item.INSURANCE_CONTACT_ID+ ' ' + index)
    // this.mode = 0
    // let contacts = this.currentItem.contacts
    // contacts.splice(index, 1)// start, deleteCount)
 this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
        if (!response.wasCancelled) {
          console.log('Delete')
          let contacts = this.currentItem.contacts
          contacts.splice(index, 1)// start, deleteCount)
        } else {
          console.log('cancel');
        }
        console.log(response.output);
      });
  }


  addContact() {
    
    let contacts = this.currentItem.contacts
    let flag = false
    let item 
    let newDate = moment().format('YYYY-MM-DD')
    if (contacts === undefined) {
      flag = true 
      contacts=[]
    }
    item = { INSURANCE_CONTACT_ID:'', NAME_LAST:'', NAME_FIRST:'', PREFIX:'', PHONE_WORK:'', FAX:'', CELLULAR:'', EMAIL: '', edit: true }
    contacts.unshift(item)
     if (flag ) this.currentItem.contacts = contacts



  }
  



}
