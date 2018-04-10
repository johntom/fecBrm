export class FilterValueConverter{
  toView(array, searchTerm) {
    console.log('array',array)
    if(!searchTerm || searchTerm.length == 0) return array;
    
    return array.filter((item) => {
	  return searchTerm && searchTerm.length > 0 ? this.itemMaches(searchTerm,item): true;	
    });
  }

  itemMaches(searchTerm, value){
    value=value.name;
      console.log('value',value)
     let itemValue = value;
     
     if(!itemValue) return false;
     
     return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
  }
}

