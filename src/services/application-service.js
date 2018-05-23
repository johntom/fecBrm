import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-dependency-injection';

@inject(Router, DialogService)
export class ApplicationService {
  constructor(router, dialogService) {

    this.dialogService = dialogService

    this.router = router

  }

  currentView;
  tabs = [];


  dataFormOneToOneTabs = [

    {
      name: "extend",
      viewModel: "./one-to-one/extend",
      isSelected: false
    },
    {
      name: "Pdfupload",
      viewModel: "./one-to-one/pdfupload",
      isSelected: false
    }
  ];
  dataFormOneToManyTabs = [
    {
      name: "Adjusters",
      viewModel: "./one-to-many/adjusters",
      isSelected: false
    }, {
      name: "Adjuster Notes",
      viewModel: "./one-to-many/adjusternotes",
      isSelected: false
    },
    {
      name: "Diary",
      viewModel: "./one-to-many/diary",
      isSelected: false
    },
    {
      name: "Docs",
      viewModel: "./one-to-many/docs",
      isSelected: false
    },
    {
      name: "Invoices",
      viewModel: "./one-to-many/invoices",
      isSelected: false
    },
    // {
    //   name: "Adjuster Payments",
    //   viewModel: "./one-to-many/adjusterpayments",
    //   isSelected: false
    // },
    {
      name: "Carrieremails",
      viewModel: "./one-to-many/carrieremails",
      isSelected: false
    },
    {
      name: "Claimemails",
      viewModel: "./one-to-many/claimemails",
      isSelected: false
    }
  ];

  dataFormOneToManyTabs2 = [
    // {
    //   name: "Addresses",
    //   viewModel: "./one-to-many/addresses",
    //   isSelected: false
    // }, 
    {
      name: "Contacts",
      viewModel: "./one-to-many/adjuster",
      isSelected: false
    }]

  dataFormOneToManyTabs3 = [
    {
      name: "Payments",
      viewModel: "./one-to-many/payments",
      isSelected: true
    }
    // , {
    //   name: "Contacts",
    //   viewModel: "./one-to-many/adjuster",
    //   isSelected: false
    // }
  ]


  currentRecord = 0;//null;
  testrec = 0;
  originalrec = 0;
  claimLookupDataLoaded = false;
  searchDataLoaded = false;

  curentClaim;
  curentDaily;
  currentAdjuster;
  currentSearchadj = {}
  currentpayperiod
  currentpaymentAdjuster;

  testinscorec = 0;
  currentInsco;
  originalinscorec = 0;

  testinsuredrec = 0;
  currentInsured;
  originalinsuredrec = 0;

  testclaimantrec = 0;
  currentClaimant;
  originalclaimant = 0;


  genderList = [];
  stateList = [];
  adjusterList = [];
  adjusterActiveList = [];
  claimtypeList = [];
  dailyList = [];

  InsurancecompanyList = [];
  InsurancecompanycontactList = [];

  insuredList = [];
  statusList = [];
  searchList = [];

  serviceList = [];
  expenseList = [];
  claimList = []
  arprepList = []
  adjusterprepList = []
  arpreponeList = []
  currentSearch // needed to close claim s
  MasrepList = []

  // async asyncHandleDirty() {
  //   const model = { 'question': 'Do you really want to discard your changes?' }
  //   const options = { viewModel: Prompt, model: model, lock: false };
  //   const closeResult = await this.dialogService.open(options).then(result => result.closeResult);
  //   return closeResult;
  // }
  asyncHandleDirty() {
    const model = 'Do you really want to discard your changes?';
    const options = { viewModel: Prompt, model: model, lock: false };
    // return this.dialogService.open(options);
    return this.dialogService.open(options).whenClosed(response => response);
  }
  navigate(route) {
    this.router.navigate(route);
  }
  tryCloseTab(item, tab, route) {
    // console.log('this.currentView ', this.currentView)
    // console.log('this.currentView.isDirty ', this.currentView.isDirty)
    // console.log('this.currentView.isDirty()', this.currentView.isDirty())
    if (this.currentView && this.currentView.isDirty && this.currentView.isDirty()) {
      this.asyncHandleDirty().then(result => {
        if (!result.wasCancelled) {
          this.closeTab(tab, item);
          if (route) {
            this.navigate(route);
          }
        }
      });
    } else {
      this.closeTab(tab, item);
      if (route) {
        this.navigate(route);
      }
    }
  }

  tryCloseTabonSelect(item) {
    // console.log('this.currentView ', this.currentView)
    // console.log('this.currentView.isDirty ', this.currentView.isDirty)
    // console.log('this.currentView.isDirty()', this.currentView.isDirty())
    if (this.currentView && this.currentView.isDirty && this.currentView.isDirty()) {
      this.asyncHandleDirty().then(result => {
        if (!result.wasCancelled) {
          return false
        } 
      })
    } else {
          return true
        }
  }
    // async tryCloseTab(item, tab, route) {
    //   if (item.isRecordDirty) {
    //     const result = await this.asyncHandleDirty();
    //     if (result) {
    //       this.closeTab(tab);
    //       if (route) {
    //         this.navigate(route);
    //       }
    //     }
    //   } else {
    //     this.closeTab(tab);
    //     if (route) {
    //       this.navigate(route);
    //     }
    //   }
    // }
    closeTab(tab, item) {
      //  console.log('1 2', tab, item)
      if (item && item.reset) {
        item.reset();
      }
      //this.currentClaim.isRecordDirty = false;
      //this.originalrec = this.currentClaim;

      let index = this.tabs.indexOf(tab);
      tab.isSelected = false;
      this.tabs.splice(index, 1);
    }
  }