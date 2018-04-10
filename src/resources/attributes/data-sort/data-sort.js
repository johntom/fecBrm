/**
 *
 *  Usage: <thead class="table-header-blue" 
 *    data-sort="items.two-way: currentItem.orders; cols: ['product','datePurchased', 'quantity', 'unitPrice']">
 *    ... 
 *  </thead>
 *  In the ViewModel, you need to subscribe to the following:
 *    this.messageBus.subscribe('data-sort:sort', payload => {
 *      this.currentItem.orders = payload.sort;
 *    });
 *
 */
import {customAttribute, bindable, children} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import {EventAggregator} from 'aurelia-event-aggregator';

@customAttribute('data-sort')
export class DataSort {
  static inject = [DOM.Element, EventAggregator];

  @bindable items = [];
  @bindable cols;
  @bindable index = -1;
  parsedCols;

  constructor(element, messageBus) {
    this.element = element;
    this.messageBus = messageBus;
  }
  
  attached() {
    if (this.items) {
      this.origItems = this.items.slice(0);
    }
    // console.log('data-sort:attached', this.cols, this.items);
    this.parsedCols = JSON.parse(this.cols.replace(/\'/g, "\""));
    // console.log('data-sort:attached', typeof(this.parsedCols));
    let headers = this.element.querySelectorAll('.header');
    Array.from(headers).forEach((el, i) => {
      el.setAttribute('data-index', i);
      let col = this.parsedCols[i];
      if (col) {
        let iTag = `<i class="sort-column fa"></i>`;
        this.appendElementFromString(iTag, el);
        el.addEventListener('click', this.handleClick.bind(this));
      }
    });
  }

  handleClick(e) {
    // console.log('data-sort:handleClick', e);
    let index = parseInt(e.target.getAttribute('data-index') || -1);
    if (index > -1) {
      let col = this.parsedCols[index];
      let colSplit = col.split('|');
      this.sort(e, ...colSplit);
    }
  }

  createChildFromString(template) {
    var child = document.createElement('div');
    child.innerHTML = template.trim();
    child = child.firstChild;
    return child;
  }
  
  appendElementFromString(src, target) {
    let nodeCopy = this.createChildFromString(src, target);
    let copy = target.appendChild(nodeCopy); 
    return copy;     
  }

  sort(e, prop1 = '', prop2 = '') {
    console.log('data-sort:sort prop1 - ', prop1, ' prop2 - ', prop2);
    let direction = 'fa-sort-asc';
    let icon = e.target.querySelector('.sort-column');
    if (icon.classList.contains('fa-sort-asc')) {
      direction = 'fa-sort-desc'
    } else if (icon.classList.contains('fa-sort-desc')) {
      direction = '';
    } else {
      direction = 'fa-sort-asc';
    }
    let cols = document.querySelectorAll('.sort-column');
    cols.forEach(c => {
      c.classList.remove('fa-sort-asc');
      c.classList.remove('fa-sort-desc');
    });
    if (direction) {
      icon.classList.add(direction);
    }
    let sortItems = this.sortHelper(this.origItems, prop1, prop2, direction, this.origItems);
    let payload = {
      index: this.index,
      sort: sortItems
    };
    // This is necessary as we fire multiple events at the top
    // level but for nested arrays, we only want to fire the 
    // sort event without any side-effects.
    if (this.index > -1) {
      this.messageBus.publish('data-sort:sort-only', payload);
    } else {
      this.messageBus.publish('data-sort:sort', payload);
    }
  }
  sortHelper(array, prop1, prop2, direction, originalData) {
    if (!array) return;
		if (!prop1 || !direction) return originalData;
    let cmp = (a,b) => {
      if (isNaN(a) || isNaN(b)) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      } else {
        return a - b;
      }
    };
    let result = array
      .slice(0)
      .sort((a,b) => {
        if (prop1 && prop2) {
          return cmp(a[prop1], b[prop1]) || cmp(a[prop2], b[prop2]);
        } else {
          return cmp(a[prop1], b[prop1]);
        }
      });
    if (direction === 'fa-sort-desc') return result.reverse();
    return result;
  }
    
}