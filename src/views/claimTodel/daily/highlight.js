export class HighlightValueConverter{
    toView(value, searchTerm) {
      let name = value.name;
    console.log('value name',name)
       if(!searchTerm) return name;
       return name.replace(new RegExp(searchTerm, 'gi'), `<b>$&</b>`);
    }
}