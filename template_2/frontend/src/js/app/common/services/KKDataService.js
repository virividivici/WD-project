angular.module('saas').factory('KKDataService', function($q) {

    // Service settings
    var kk = {};

    // Change the root depending on where KK is running
    kk.kkRoot = 'http://92.52.109.4:8780/konakart/';

    // Define the url and store id of a running KK engine
    kk.conf = new engineConfig(kk.kkRoot + 'konakartjson');
    kk.conf.storeId = "store2";
    kk.conf.protocol = 'jsonp';
    kk.eng = new kkEng(kk.conf);

    // Temporary customer id
    kk.custId = null;


    // Get products based on store id

    function getAllProducts(options) {

        // Return all products from Konakart store

        // Create promise
        var deferred = $q.defer();

        // set config vars
        var dataDesc = new DataDescriptor();
        dataDesc.limit = 100;
        dataDesc.fillDescription = true;

        var _options = {};
        var languageID = -1;

        var theData = [];

        // sessionId,dataDesc,languageId,callback,context,eng
        // Run request
        kkEng.getAllProductsWithOptions(null, dataDesc, languageID, _options, function (data, status) {

            // on callback trigger promise with JSON product data
            deferred.resolve(data);

        }, null, kk.eng);

        return deferred.promise;

    }


    function getProductsByManufacturer(options) {

        var deferred = $q.defer();

        var dataDesc = new DataDescriptor();
        dataDesc.limit = 100;
        dataDesc.fillDescription = true;

        var manufacturer = { id: 29, name: 'EE Core' };
            manufacturer = { id: 30, name: 'SaaS' };
        var languageID = -1;

        //sessionId,dataDesc,manufacturerId,languageId,options,callback,context,eng
        kkEng.getProductsPerManufacturerWithOptions(null, dataDesc, manufacturer.id, languageID, {}, function (data, status) {

            deferred.resolve(data);

        }, manufacturer, kk.eng);

        return deferred.promise;
    }


    function getBasketItems(options) {

        // Create promise
        var deferred = $q.defer();


        // check if customer ID has been included
        if (!options.custId) {

            // Get a temporary customer id Eng Call
            kkEng.getTempCustomerId(function(result, textStatus, jqXHR) {

                // set customer ID
                kk.custId = result;

                // DEBUGGING
                kk.custId = -62;

                // Get the basket items
                getItems();


            }, null, kk.eng);

        }
        else {

            kk.custId = options.custId;

            getItems();

        }


        function getItems() {

            // Make request to basket API
            kkEng.getBasketItemsPerCustomer(null, kk.custId, -1, function(result, textStatus, jqXHR) {

                // Return contents of basket
                deferred.resolve(result);


            }, null, kk.eng);

        }


        return deferred.promise;

    }


    function addBasketItem(options) {

        var options = options ? options : {};

        // Create promise
        var deferred = $q.defer();

        // check if customer ID has been included
        if (!options.custId) {

            // Get a temporary customer id Eng Call
            kkEng.getTempCustomerId(function(result, textStatus, jqXHR) {

                // set customer ID
                kk.custId = result;

                // DEBUGGING
                kk.custId = -62;

                addItems();

            }, null, kk.eng);

        }
        else {

            kk.custId = options.custId;

            // We already have a customer ID so continue
            addItems();

        }


        function addItems() {

            // Create a KonaKart basket item and send it to the engine
            var basket = new Basket();
            basket.quantity = 1;
            // basket.productId = prodId;

            // DEBUGGING
            basket.productId = 75; // Box Business product

            kkEng.addToBasket(null, kk.custId, basket, function(result, textStatus, jqXHR) {

                // Get basket items and return to promise
                deferred.resolve(result);


            }, null, kk.eng);
        }


        return deferred.promise;

    }

    return {
        getAllProducts: getAllProducts,
        getProductsByManufacturer: getProductsByManufacturer,
        getBasketItems: getBasketItems,
        addBasketItem: addBasketItem
    }

});

