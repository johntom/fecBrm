export function configure(aurelia) {
  aurelia.use.standardConfiguration().plugin('aurelia-validation');
  aurelia.start().then(() => aurelia.setRoot());
  
}