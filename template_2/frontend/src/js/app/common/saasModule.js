// Global site module

angular.module('saas', [
  'ui.bootstrap',
  'accordionModule',
  'ui.bootstrap.modal',
  'videoModule',
  'headerNavModule',
  'drawerBoxModule',
  'teleSearchModule',
  'manageUsersModule',
  'inviteUsersModule',
  'productGridModule',
  'tabAccordionModule',
  'provisioningModule',
  'paymentModule',
  'voucherApp',
  'manageProductsModule',
  'viewLicencesModule',
  'voucherCodesModule',
  'manageLeadsModule',
  'welcomeModule',
  'platformModule'
])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://eebusinessapps-cdn.global.ssl.fastly.net/**',
      'https://stage-cloudsaasportal.global.ssl.fastly.net/**'
    ]);
  }]);
