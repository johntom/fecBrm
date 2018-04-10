/**
 *  Name:  DataPager
 *  Desc:  This custom element provides the ability to page data.
 *  Usage:
 *         <data-pager items.bind="origItems"></data-pager>
 *         When you click to change a page, the pager will publish the 
 *         following event:
 *
 *         this.currentPage = index;
 *         let payload = {
 *           pageSize: parseInt(this.pageSize),
 *           currentPage: index
 *         };
 *         this.messageBus.publish('pager-page', payload); 
 *
 *         The index will come from the button that you click on on the pager.
 *
 *         In the constructor of ViewModel, add the following code: 
 *         this.messageBus.subscribe('pager-page', payload => {
 *           let startIndex = payload.currentPage * payload.pageSize;
 *           let amount = payload.pageSize;
 *           this.items = this.origItems.filter((item, index) => {
 *             return index >= startIndex && index < startIndex + amount;
 *           });
 *         });
 */
import {customElement, bindable, children} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('data-pager')
export class DataPager {
  static inject = [EventAggregator];

  @bindable pagedItems;
  @bindable items;
  @bindable pageSize = 5;
  @bindable pages;
  @bindable currentPage = 0;

  constructor(messageBus) {
    this.messageBus = messageBus;
    // The DataPager always tries to fire after a filter has been
    // applied.
    this.messageBus.subscribe('data-filter:filter', payload => {
      this.items = payload.filter;
      this.initPage();
    });
  }

  bind() {
  }

  attached() {
    this.initPage();
  }

  initPage() {
    this.pages = Math.ceil(this.items.length / parseInt(this.pageSize));
    this.currentPage = 0;
    let payload = {
      pageSize: parseInt(this.pageSize),
      currentPage: 0,
      items: this.items
    };
    setTimeout(() => {
      this.messageBus.publish('data-pager:page', payload);
    }, 45);
  }

  setCurrentPage(index) {
    this.currentPage = index;
    let payload = {
      pageSize: parseInt(this.pageSize),
      currentPage: index,
      items: this.items
    };
    this.messageBus.publish('data-pager:page', payload);    
  }
  previousPage() {
    if (this.currentPage === 0) return;
    this.currentPage--;
    this.setCurrentPage(this.currentPage);
  }
  nextPage() {
    if (this.currentPage === this.pages - 1) return;
    this.currentPage++;
    this.setCurrentPage(this.currentPage);
  }
}