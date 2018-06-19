import { inject, bindable, Container, ViewEngine, bindingMode} from 'aurelia-framework';
import { DOM } from 'aurelia-pal';

@inject(Element, Container,  ViewEngine)

export class TypeaheadCustomAttribute{
    
    @bindable items;
    @bindable searchTerm;
    @bindable show = false;
    constructor(element, container, viewEngine) {
      this.element = element;
      this.container = container;
      this.viewEngine = viewEngine;
      this.keyPressListener = e => { 
        this.searchTerm = this.element.value;
        this.show = true;
      };
    }
    
    attached(){
        this.wrapper = this.wrapWithDiv(this.element);
        this.element.addEventListener('keyup', this.keyPressListener);
        this.createTypeahead();
        
    }
    
    createTypeahead() {
      
      this.viewEngine.loadViewFactory('typeahead-template.html').then(factory => {
        
        let childContainer = this.container.createChild();
        let view = factory.create(childContainer);
        let autoCompleteMenu = DOM.createElement('div');
        autoCompleteMenu.classList.add('auto-complete-menu');
        
        this.autoCompleteMenu = autoCompleteMenu;
      
        view.bind(this);
  
        view.appendNodesTo(this.autoCompleteMenu);
        this.wrapper.appendChild(autoCompleteMenu, this.element);
      });
      
  }
  
 itemSelected(item){
    this.searchTerm = item;
    this.show = false;
    let changeEvent = new CustomEvent('change', {detail: {value: item}});
    this.element.dispatchEvent(changeEvent);
 }
  
  wrapWithDiv(){
        var wrapper = DOM.createElement('div');
        wrapper.classList.add('auto-complete-wrapper');

        let sibling = this.element.nextElementSibling;

        if(sibling){
            this.element.parentElement.insertBefore(wrapper, sibling);
        }
        else{
            this.element.parentElement.appendChild(wrapper);
        }

        wrapper.appendChild(this.element);

        return wrapper;
  }
  
  removeAutocomplete() {
    const body = DOM.querySelectorAll('body')[0];
    body.removeChild(this.wrapper);

  }
  
  detached(){
        this.element.removeEventListener('focus', this.focusListener);
        this.element.removeEventListener('blur', this.blurListener);
        this.element.removeEventListener('keyup', this.keyPressListener);
        this.removeAutocomplete();
  }

}