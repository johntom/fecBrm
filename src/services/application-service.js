export class ApplicationService {
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
  currentSearchadj={}
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
  MasrepList  = [] 
}