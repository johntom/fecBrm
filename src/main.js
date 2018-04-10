import { PLATFORM } from 'aurelia-framework';
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('src/resources')
    .plugin('aurelia-dialog')
    .plugin('aurelia-kendoui-bridge')
    // .plugin(PLATFORM.moduleName('aurelia-portal-attribute'))
    .plugin('aurelia-bootstrap', config => {
      config.options.accordionCloseOthers = true;
      config.options.accordionGroupPanelClass = 'panel-default';
      config.options.btnLoadingText = 'Loading...';
      config.options.dropdownAutoClose = 'always';
      config.options.paginationBoundaryLinks = false;
      config.options.paginationDirectionLinks = true;
      config.options.paginationFirstText = 'First';
      config.options.paginationHideSinglePage = true;
      config.options.paginationLastText = 'Last';
      config.options.paginationNextText = '>';
      config.options.paginationPreviousText = '<';
      config.options.popoverPosition = 'top';
      config.options.popoverTrigger = 'mouseover';
      config.options.tabsetType = 'tabs';
      config.options.tabsetVertical = false;
      config.options.tooltipClass = 'tooltip';
      config.options.tooltipPosition = 'top';
      config.options.tooltipTrigger = 'mouseover';
    });

  aurelia.start().then(a => a.setRoot('src/views/shell/shell'));
}



