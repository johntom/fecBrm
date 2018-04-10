/**
 *  Name:  DataFilter
 *  Desc:  This custom element provides the ability to page data.
 *  Usage:
 *         <data-filter items.bind="items" 
 *           filter-label="Filter by Name/Product:"
 *           filter-properties="firstName lastName product"
 *           filter-sub-items="orders">
 *         </data-filter>
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

@customElement('data-filter')
export class DataFilter {
  static inject = [EventAggregator];

  @bindable items;
  @bindable filterLabel = '';
  @bindable filter = '';
  @bindable filterProperties; // firstName lastName city state
  @bindable filterSubItems = 'orders';

  constructor(messageBus) {
    this.messageBus = messageBus;
    // The DataFilter always tries to fire after a sort has been
    // applied.
    this.messageBus.subscribe('data-sort:sort', payload => {
      this.origItems = payload.sort;
      this.origItems2 = JSON.parse(JSON.stringify(payload.sort));
      this.initFilter();
    });    
  }

  attached() {
    this.origItems = JSON.parse(JSON.stringify(this.items));
      this.origItems2 = JSON.parse(JSON.stringify(this.items));
  }

  initFilter() {
    setTimeout(() => {
      this.performFilter(this.filter);
    }, 45);
  }

  filterChanged(newValue, oldValue) {
    if (newValue === oldValue) return;
    this.performFilter(newValue);
  }
  clearFilter() {
    this.filter = '';
  }
  performFilter(filter) {
    let filteredItems = [];
    if (!filter) {
      filteredItems = this.origItems2;
    } else {
      let props = this.filterProperties.trim().split(' ');
      // console.log('data-filter:performFilter', filter, 'props: ', props, this.origItems);
      let func = item => {
        let found = false;
        let found2 = false;
        props.forEach(p => {
          if (item[p] && item[p].toLowerCase().includes(filter.toLowerCase())) {
          // if (item[p] && item[p].toLowerCase() == filter.toLowerCase()) {
            found = true;
          } else {
            if (!found && this.filterSubItems && item[this.filterSubItems]) {
              // Check to see if it is in the sub-array.
              item[this.filterSubItems] = item[this.filterSubItems].filter(subItem => {
                // Default as part of filter results.
                found2 = true;
                if (subItem[p]) {
                  // We have a property that matches, default to false.
                  found2 = false;
                  if (subItem[p].toLowerCase().includes(filter.toLowerCase())) {
                  // if (subItem[p].toLowerCase() == filter.toLowerCase()) {
                    // It has been found, we also want our main item to 
                    // be found so our sub-items will show up.
                    found = true;
                    found2 = true;
                  }
                }
                return found2;
              });
            }
          }
        });
        return found;
      };
      // this.items = this.origItems.filter(func);
      // console.log('items: ', this.items);
      this.origItems = JSON.parse(JSON.stringify(this.origItems2));
      filteredItems = this.origItems.filter(func);
    }
    let payload = {
      filter: filteredItems
    };
    this.messageBus.publish('data-filter:filter', payload);        
  }

}

