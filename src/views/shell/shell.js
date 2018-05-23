import 'jquery';
import 'bootstrap';
import 'kendo.all.min';
import { ApplicationService } from '../../services/application-service';
import { AuthorizeStep } from '../../services/authorize-step';


export class Shell {
  static inject = [ApplicationService];

  constructor(appService) {
    this.appService = appService;

  }

  configureRouter(config, router) {
    config.title = 'BRM Layout';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: '', redirect: 'home' },
      { route: 'home', name: 'home', moduleId: '../home/home', nav: true, title: 'Home' },
      { route: 'claim/:id', name: 'claim-search-results', moduleId: '../claim/search-results', title: 'Search Results' },
      { route: 'claim/data/:id', name: 'claim-data-form', moduleId: '../claim/data-form', title: 'Data Form' },
      { route: 'claim/dataadd', name: 'claim-data-add-form', moduleId: '../claim/data-add-form', title: 'Data Add Form' },
      { route: 'claim', name: 'claim', moduleId: '../claim/claim', nav: true, title: 'Claims' },

      { route: 'insurance/:id', name: 'insurance-search-results', moduleId: '../insurance/search-results', title: 'Search Results' },
      { route: 'insurance/data/:id', name: 'insurance-data-form', moduleId: '../insurance/data-form', title: 'Data Form' },
      { route: 'insurance', name: 'insurance', moduleId: '../insurance/insurance', nav: true, title: 'Insurance' },

      { route: 'insured/:id', name: 'insured-search-results', moduleId: '../insured/search-results', title: 'Search Results' },
      { route: 'insured/data/:id', name: 'insured-data-form', moduleId: '../insured/data-form', title: 'Data Form' },
      { route: 'insured', name: 'insured', moduleId: '../insured/insured', nav: true, title: 'Insured' },

      { route: 'claimant/:id', name: 'claimant-search-results', moduleId: '../claimant/search-results', title: 'Search Results' },
      { route: 'claimant/data/:id', name: 'claimant-data-form', moduleId: '../claimant/data-form', title: 'Data Form' },
      { route: 'claimant', name: 'claimant', moduleId: '../claimant/claimant', nav: true, title: 'Claimant' },


      //       { route: 'daily/:id', name: 'daily-search-results', moduleId: '../daily/search-results', title: 'Search Results' },
      //       { route: 'daily/data/:id', name: 'daily-data-form', moduleId: '../daily/data-form', title: 'Data Form' },
      //       { route: 'daily', name: 'daily', moduleId: '../daily/daily', nav: true, title: 'Daily' },
      //  { route: 'daily/dataadd', name: 'daily-data-add-form', moduleId: '../daily/data-add-form', title: 'Data Add Form' },

      { route: 'daily/dataadd', name: 'daily', moduleId: '../daily/data-add-form', nav: true, title: 'Daily' },

      { route: 'arprep/:id', name: 'arprep-search-results', moduleId: '../arprep/search-results', title: 'Search Results' },
      { route: 'arprep/data/:id', name: 'arprep-data-form', moduleId: '../arprep/data-form', title: 'Data Form' },
      { route: 'arprep', name: 'arprep', moduleId: '../arprep/arprep', nav: true, title: 'AR Prep' },


      { route: 'adjprep/:id', name: 'adjprep-search-results', moduleId: '../adjprep/search-results', title: 'Search Results' },
      { route: 'adjprep/data/:id', name: 'adjprep-data-form', moduleId: '../adjprep/data-form', title: 'Data Form' },
      { route: 'adjprep', name: 'adjprep', moduleId: '../adjprep/adjprep', nav: true, title: 'Adj Prep' },


      { route: 'adjuster/:id', name: 'adjuster-search-results', moduleId: '../adjuster/search-results', title: 'Search Results' },
      { route: 'adjuster/data/:id', name: 'adjuster-data-form', moduleId: '../adjuster/data-form', title: 'Data Form' },
      { route: 'adjuster', name: 'adjuster', moduleId: '../adjuster/adjuster', nav: true, title: 'Adjuster' },

      { route: 'invoice/:id', name: 'invoice-search-results', moduleId: '../invoice/search-results', title: 'Search Results' },
      { route: 'invoice/data/:id', name: 'invoice-data-form', moduleId: '../invoice/data-form', title: 'Data Form' },
      { route: 'invoice', name: 'invoice', moduleId: '../invoice/invoice', nav: true, title: 'Invoice' },



      { route: 'code/:id', name: 'code-search-results', moduleId: '../code/search-results', title: 'Search Results' },
      { route: 'code/data/:id', name: 'code-data-form', moduleId: '../claimant/data-form', title: 'Data Form' },
      { route: 'code', name: 'code', moduleId: '../code/code', nav: true, title: 'Code' },

      // { route: 'adjusterprep/:id', name: 'adjusterprep-search-results', moduleId: '../adjusterprep/search-results', title: 'Search Results' },
      // { route: 'adjusterprep/data/:id', name: 'adjusterprep-data-form', moduleId: '../adjusterprep/data-form', title: 'Data Form' },
      // { route: 'adjusterprep', name: 'adjusterprep', moduleId: '../adjusterprep/adjusterprep', nav: true, title: 'adjuster prep ' },


      // { route: 'contact', name: 'contact', moduleId: '../contact/contact', nav: true, title: 'Contact' },
      // { route: 'contact/:id', name: 'contact-search-results', moduleId: '../contact/search-results', title: 'Search Results' },
      // { route: 'contact/data/:id', name: 'contact-data-form', moduleId: '../contact/data-form', title: 'Data Form' },

      // { route: 'catalog', name: 'catalog', moduleId: '../catalog/catalog', nav: true, title: 'Catalog' },
      // { route: 'catalog/:id', name: 'catalog-search-results', moduleId: '../catalog/search-results', title: 'Search Results' },
      // { route: 'catalog/data/:id', name: 'catalog-data-form', moduleId: '../catalog/data-form', title: 'Data Form' },

    ]);

    this.router = router;
  }



  // selectTab(tab) {
  //   console.log('shell:selectTab - tab.href', tab.href);
  //   this.appService.tabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   return true;
  // }

   selectTab(tab) {
   if(this.appService.tabindex!==undefined && this.appService.tabindex <= this.appService.tabs.length-1) { 
   this.closeTab(tab,this.appService.tabindex)
   } else {
      this.appService.tabs.forEach(t => t.isSelected = false);
      tab.isSelected = true;
      return true;
   }

  }
  closeTab(tab, index) {
    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
    // let wasSelected = tab.isSelected;
    // tab.isSelected = false;
    // this.appService.tabs.splice(index, 1);
    // if (wasSelected && this.appService.tabs.length > 0) {
    //   let newIndex = (index > 0) ? index - 1 : 0;
    //   let newTab = this.appService.tabs[newIndex];
    //   newTab.isSelected = true;
    //   this.router.navigate(newTab.href);
    // }
  }

}
