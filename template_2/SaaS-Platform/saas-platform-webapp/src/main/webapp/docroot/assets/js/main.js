/*!
(c) 2011 DS Data Systems UK Ltd, All rights reserved.

DS Data Systems and KonaKart and their respective logos, are
trademarks of DS Data Systems UK Ltd. All rights reserved.

The information in this document is free software;you can redistribute
it and/or modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.
*/

/*
 * Called by the Callback to convert the JSON returned by KonaKart to an object
 */
function decodeJson(jsonResult) {
    if (jsonResult == null) {
        return "";
    }
    var ret = jsonResult.r;
    if (ret == null) {
        var result = JSON.parse(jsonResult);
        if (result != null && result.e != null) {
            alert("Exception:\t" + result.e + "\nMessage:\t" + result.m);
            return "";
        }
    }
    return ret;
}

/*
 * Used to configure the local KonaKart engine object
 */
function engineConfig(url) {
    this.url = url;
    this.storeId = null;
    this.protocol = 'json';
}

/*
 * Used to create an instance of the local KonaKart engine passed to all API
 * calls
 */
function kkEng(config) {
    this.url = config.url;
    this.storeId = config.storeId;
    this.protocol = config.protocol;
}

/*
 * Used to post the JSON request to the server side KonaKart engine. Actually we
 * do a GET because we use JSONP in order to get around all of the problems
 * associated with cross domain communications.
 */
function callEng(parms, callback, context, eng) {
  var jsonp = eng.protocol === 'jsonp';

  $.ajax({
    type : jsonp ? 'GET' : 'POST',
    dataType : jsonp ? 'jsonp' : 'json',
    timeout : '20000',
    scriptCharset: "utf-8" ,
    contentType: "application/json; charset=utf-8",
    url : eng.url,
    data : parms,
    context : context,
    success : callback,
    error : function(jqXHR, textStatus, errorThrown) {
      var errorMsg = "JSONP API call to KonaKart engine wasn't successful. Verify that the KonaKart engine is available at the URL:\n"
              + eng.url
              + ", and that JSON is enabled for the engine.";
      if (textStatus) {
          errorMsg += "\nStatus:\t" + textStatus;
      }
      if (errorThrown) {
          errorMsg += "\nError:\t" + errorThrown;
      }
      alert(errorMsg);
    }
  });
}

/*
 * Called by the generated JavaScript API calls to create a request for the
 * server side KonaKart engine in JSON format
 */
function createJsonParmString(funcName, parmArray, eng) {
  var data = params || {};
  data.f = name;
  if (config && config.storeId) {
    data.s = config.storeId;
  }
  return JSON.stringify(data);
}


/*
 * API Calls
 */

kkEng.getLanguages=function(search,callback,context,eng){
    var parmArray = [], index = 0;
    if (search != null) {
        parmArray[index++] = "search";
        parmArray[index++] = JSON.stringify(search);
    }
    var jsonParms = createJsonParmString("getLanguages",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};

kkEng.getAllLanguages=function(callback,context,eng){
    var jsonParms = createJsonParmString("getAllLanguages",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDefaultLanguage=function(callback,context,eng){
    var jsonParms = createJsonParmString("getDefaultLanguage",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getLanguagePerCode=function(code,callback,context,eng){
    var parmArray = [], index = 0;
    if (code != null) {
        parmArray[index++] = "code";
        parmArray[index++] = code;
    }
    var jsonParms = createJsonParmString("getLanguagePerCode",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getLanguagePerId=function(languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getLanguagePerId",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCategoryTree=function(languageId,getNumProducts,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    parmArray[index++] = "getNumProducts";
    parmArray[index++] = getNumProducts;
    var jsonParms = createJsonParmString("getCategoryTree",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerCategory=function(sessionId,dataDesc,categoryId,searchInSubCats,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "searchInSubCats";
    parmArray[index++] = searchInSubCats;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProductsPerCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerCategoryWithOptions=function(sessionId,dataDesc,categoryId,searchInSubCats,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "searchInSubCats";
    parmArray[index++] = searchInSubCats;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductsPerCategoryWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerCategoryPerManufacturer=function(sessionId,dataDesc,categoryId,manufacturerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProductsPerCategoryPerManufacturer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerCategoryPerManufacturerWithOptions=function(sessionId,dataDesc,categoryId,manufacturerId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductsPerCategoryPerManufacturerWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerManufacturer=function(sessionId,dataDesc,manufacturerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProductsPerManufacturer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsPerManufacturerWithOptions=function(sessionId,dataDesc,manufacturerId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductsPerManufacturerWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProduct=function(sessionId,productId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductWithOptions=function(sessionId,productId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCategoriesPerManufacturer=function(manufacturerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getCategoriesPerManufacturer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCategoriesPerProduct=function(productId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getCategoriesPerProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getManufacturersPerCategory=function(categoryId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    var jsonParms = createJsonParmString("getManufacturersPerCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getManufacturers=function(dataDesc,search,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (search != null) {
        parmArray[index++] = "search";
        parmArray[index++] = JSON.stringify(search);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getManufacturers",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllManufacturers=function(callback,context,eng){
    var jsonParms = createJsonParmString("getAllManufacturers",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getManufacturerPerProduct=function(productId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getManufacturerPerProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getManufacturer=function(manufacturerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getManufacturer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCategory=function(categoryId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSpecialsPerCategory=function(sessionId,dataDesc,categoryId,searchInSubCats,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "searchInSubCats";
    parmArray[index++] = searchInSubCats;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getSpecialsPerCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllSpecials=function(sessionId,dataDesc,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getAllSpecials",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllProducts=function(sessionId,dataDesc,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getAllProducts",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllProductsWithOptions=function(sessionId,dataDesc,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getAllProductsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getReviewsPerProduct=function(dataDesc,productId,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("getReviewsPerProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getReview=function(reviewId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "reviewId";
    parmArray[index++] = reviewId;
    var jsonParms = createJsonParmString("getReview",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllReviews=function(dataDesc,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    var jsonParms = createJsonParmString("getAllReviews",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getReviews=function(dataDesc,search,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (search != null) {
        parmArray[index++] = "search";
        parmArray[index++] = JSON.stringify(search);
    }
    var jsonParms = createJsonParmString("getReviews",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForProducts=function(sessionId,dataDesc,prodSearch,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (prodSearch != null) {
        parmArray[index++] = "prodSearch";
        parmArray[index++] = JSON.stringify(prodSearch);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("searchForProducts",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForProductsWithOptions=function(sessionId,dataDesc,prodSearch,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (prodSearch != null) {
        parmArray[index++] = "prodSearch";
        parmArray[index++] = JSON.stringify(prodSearch);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("searchForProductsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.registerCustomer=function(custReg,callback,context,eng){
    var parmArray = [], index = 0;
    if (custReg != null) {
        parmArray[index++] = "custReg";
        parmArray[index++] = JSON.stringify(custReg);
    }
    var jsonParms = createJsonParmString("registerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.forceRegisterCustomer=function(custReg,callback,context,eng){
    var parmArray = [], index = 0;
    if (custReg != null) {
        parmArray[index++] = "custReg";
        parmArray[index++] = JSON.stringify(custReg);
    }
    var jsonParms = createJsonParmString("forceRegisterCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllCountries=function(callback,context,eng){
    var jsonParms = createJsonParmString("getAllCountries",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.login=function(emailAddr,password,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    if (password != null) {
        parmArray[index++] = "password";
        parmArray[index++] = password;
    }
    var jsonParms = createJsonParmString("login",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.logout=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("logout",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAddressesPerCustomer=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getAddressesPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAddressesPerManufacturer=function(manufacturerId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    var jsonParms = createJsonParmString("getAddressesPerManufacturer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAddressesPerProduct=function(productId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("getAddressesPerProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAddressesPerStore=function(addressStoreId,callback,context,eng){
    var parmArray = [], index = 0;
    if (addressStoreId != null) {
        parmArray[index++] = "addressStoreId";
        parmArray[index++] = addressStoreId;
    }
    var jsonParms = createJsonParmString("getAddressesPerStore",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDefaultAddressPerCustomer=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getDefaultAddressPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.setDefaultAddressPerCustomer=function(sessionId,addressId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "addressId";
    parmArray[index++] = addressId;
    var jsonParms = createJsonParmString("setDefaultAddressPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addAddressToCustomer=function(sessionId,addr,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (addr != null) {
        parmArray[index++] = "addr";
        parmArray[index++] = JSON.stringify(addr);
    }
    var jsonParms = createJsonParmString("addAddressToCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteAddressFromCustomer=function(sessionId,addressId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "addressId";
    parmArray[index++] = addressId;
    var jsonParms = createJsonParmString("deleteAddressFromCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editCustomerAddress=function(sessionId,addr,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (addr != null) {
        parmArray[index++] = "addr";
        parmArray[index++] = JSON.stringify(addr);
    }
    var jsonParms = createJsonParmString("editCustomerAddress",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomer=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editCustomer=function(sessionId,cust,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (cust != null) {
        parmArray[index++] = "cust";
        parmArray[index++] = JSON.stringify(cust);
    }
    var jsonParms = createJsonParmString("editCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getKonakartTimeStamp=function(callback,context,eng){
    var jsonParms = createJsonParmString("getKonakartTimeStamp",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.writeReview=function(sessionId,review,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (review != null) {
        parmArray[index++] = "review";
        parmArray[index++] = JSON.stringify(review);
    }
    var jsonParms = createJsonParmString("writeReview",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.checkSession=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("checkSession",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToBasket=function(sessionId,customerId,item,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (item != null) {
        parmArray[index++] = "item";
        parmArray[index++] = JSON.stringify(item);
    }
    var jsonParms = createJsonParmString("addToBasket",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToBasketWithOptions=function(sessionId,customerId,item,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (item != null) {
        parmArray[index++] = "item";
        parmArray[index++] = JSON.stringify(item);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("addToBasketWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.mergeBaskets=function(sessionId,customerFromId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerFromId";
    parmArray[index++] = customerFromId;
    var jsonParms = createJsonParmString("mergeBaskets",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.mergeBasketsWithOptions=function(sessionId,customerFromId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerFromId";
    parmArray[index++] = customerFromId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("mergeBasketsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateBasket=function(sessionId,customerId,item,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (item != null) {
        parmArray[index++] = "item";
        parmArray[index++] = JSON.stringify(item);
    }
    var jsonParms = createJsonParmString("updateBasket",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateBasketWithOptions=function(sessionId,customerId,item,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (item != null) {
        parmArray[index++] = "item";
        parmArray[index++] = JSON.stringify(item);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("updateBasketWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.removeFromBasket=function(sessionId,customerId,item,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (item != null) {
        parmArray[index++] = "item";
        parmArray[index++] = JSON.stringify(item);
    }
    var jsonParms = createJsonParmString("removeFromBasket",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.removeBasketItemsPerCustomer=function(sessionId,customerId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    var jsonParms = createJsonParmString("removeBasketItemsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBasketItemsPerCustomer=function(sessionId,customerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getBasketItemsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBasketItemsPerCustomerWithOptions=function(sessionId,customerId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBasketItemsPerCustomerWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDefaultCurrency=function(callback,context,eng){
    var jsonParms = createJsonParmString("getDefaultCurrency",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllCurrencies=function(callback,context,eng){
    var jsonParms = createJsonParmString("getAllCurrencies",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurations=function(callback,context,eng){
    var jsonParms = createJsonParmString("getConfigurations",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfiguration=function(key,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    var jsonParms = createJsonParmString("getConfiguration",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValue=function(key,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    var jsonParms = createJsonParmString("getConfigurationValue",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValueAsInt=function(key,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    var jsonParms = createJsonParmString("getConfigurationValueAsInt",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValueAsIntWithDefault=function(key,def,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    parmArray[index++] = "def";
    parmArray[index++] = def;
    var jsonParms = createJsonParmString("getConfigurationValueAsIntWithDefault",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValueAsBigDecimal=function(key,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    var jsonParms = createJsonParmString("getConfigurationValueAsBigDecimal",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValueAsBigDecimalWithDefault=function(key,def,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    if (def != null) {
        parmArray[index++] = "def";
        parmArray[index++] = def;
    }
    var jsonParms = createJsonParmString("getConfigurationValueAsBigDecimalWithDefault",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigurationValueAsBool=function(key,def,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    if (def != null) {
        parmArray[index++] = "def";
        parmArray[index++] = def;
    }
    var jsonParms = createJsonParmString("getConfigurationValueAsBool",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editConfiguration=function(key,value,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    if (value != null) {
        parmArray[index++] = "value";
        parmArray[index++] = value;
    }
    var jsonParms = createJsonParmString("editConfiguration",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.changePassword=function(sessionId,currentPassword,newPassword,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (currentPassword != null) {
        parmArray[index++] = "currentPassword";
        parmArray[index++] = currentPassword;
    }
    if (newPassword != null) {
        parmArray[index++] = "newPassword";
        parmArray[index++] = newPassword;
    }
    var jsonParms = createJsonParmString("changePassword",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductNotificationsPerCustomer=function(sessionId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProductNotificationsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductNotificationsPerCustomerWithOptions=function(sessionId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductNotificationsPerCustomerWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addProductNotificationToCustomer=function(sessionId,productId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("addProductNotificationToCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteProductNotificationFromCustomer=function(sessionId,productId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("deleteProductNotificationFromCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateProductViewedCount=function(productId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("updateProductViewedCount",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBestSellers=function(dataDesc,categoryId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getBestSellers",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBestSellersWithOptions=function(dataDesc,categoryId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBestSellersWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrdersPerCustomer=function(dataDesc,sessionId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getOrdersPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForOrdersPerCustomer=function(sessionId,dataDesc,orderSearch,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (orderSearch != null) {
        parmArray[index++] = "orderSearch";
        parmArray[index++] = JSON.stringify(orderSearch);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("searchForOrdersPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrder=function(sessionId,orderId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCurrency=function(currencyCode,callback,context,eng){
    var parmArray = [], index = 0;
    if (currencyCode != null) {
        parmArray[index++] = "currencyCode";
        parmArray[index++] = currencyCode;
    }
    var jsonParms = createJsonParmString("getCurrency",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.createOrder=function(sessionId,basketItemArray,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (basketItemArray != null) {
        parmArray[index++] = "basketItemArray";
        parmArray[index++] = JSON.stringify(basketItemArray);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("createOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.createOrderWithOptions=function(sessionId,basketItemArray,options,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (basketItemArray != null) {
        parmArray[index++] = "basketItemArray";
        parmArray[index++] = JSON.stringify(basketItemArray);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("createOrderWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrderHistory=function(dataDesc,sessionId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getOrderHistory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrderHistoryWithOptions=function(dataDesc,sessionId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getOrderHistoryWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAlsoPurchased=function(sessionId,dataDesc,productId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getAlsoPurchased",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAlsoPurchasedWithOptions=function(sessionId,dataDesc,productId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getAlsoPurchasedWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getRelatedProducts=function(sessionId,dataDesc,productId,relationType,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "relationType";
    parmArray[index++] = relationType;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getRelatedProducts",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getRelatedProductsWithOptions=function(sessionId,dataDesc,productId,relationType,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "relationType";
    parmArray[index++] = relationType;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getRelatedProductsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCountryPerName=function(countryName,callback,context,eng){
    var parmArray = [], index = 0;
    if (countryName != null) {
        parmArray[index++] = "countryName";
        parmArray[index++] = countryName;
    }
    var jsonParms = createJsonParmString("getCountryPerName",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCountry=function(countryId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "countryId";
    parmArray[index++] = countryId;
    var jsonParms = createJsonParmString("getCountry",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getShippingQuotes=function(order,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getShippingQuotes",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getShippingQuote=function(order,moduleName,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    if (moduleName != null) {
        parmArray[index++] = "moduleName";
        parmArray[index++] = moduleName;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getShippingQuote",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.changeDeliveryAddress=function(sessionId,order,deliveryAddress,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    if (deliveryAddress != null) {
        parmArray[index++] = "deliveryAddress";
        parmArray[index++] = JSON.stringify(deliveryAddress);
    }
    var jsonParms = createJsonParmString("changeDeliveryAddress",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTaxRate=function(countryId,zoneId,taxClassId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "countryId";
    parmArray[index++] = countryId;
    parmArray[index++] = "zoneId";
    parmArray[index++] = zoneId;
    parmArray[index++] = "taxClassId";
    parmArray[index++] = taxClassId;
    var jsonParms = createJsonParmString("getTaxRate",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTax=function(cost,countryId,zoneId,taxClassId,callback,context,eng){
    var parmArray = [], index = 0;
    if (cost != null) {
        parmArray[index++] = "cost";
        parmArray[index++] = cost;
    }
    parmArray[index++] = "countryId";
    parmArray[index++] = countryId;
    parmArray[index++] = "zoneId";
    parmArray[index++] = zoneId;
    parmArray[index++] = "taxClassId";
    parmArray[index++] = taxClassId;
    var jsonParms = createJsonParmString("getTax",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addTax=function(cost,countryId,zoneId,taxClassId,callback,context,eng){
    var parmArray = [], index = 0;
    if (cost != null) {
        parmArray[index++] = "cost";
        parmArray[index++] = cost;
    }
    parmArray[index++] = "countryId";
    parmArray[index++] = countryId;
    parmArray[index++] = "zoneId";
    parmArray[index++] = zoneId;
    parmArray[index++] = "taxClassId";
    parmArray[index++] = taxClassId;
    var jsonParms = createJsonParmString("addTax",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrderTotals=function(order,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getOrderTotals",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPaymentGateways=function(order,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getPaymentGateways",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPaymentGateway=function(order,moduleName,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    if (moduleName != null) {
        parmArray[index++] = "moduleName";
        parmArray[index++] = moduleName;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getPaymentGateway",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPaymentDetails=function(sessionId,moduleCode,orderId,hostAndPort,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (moduleCode != null) {
        parmArray[index++] = "moduleCode";
        parmArray[index++] = moduleCode;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    if (hostAndPort != null) {
        parmArray[index++] = "hostAndPort";
        parmArray[index++] = hostAndPort;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getPaymentDetails",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPaymentDetailsPerOrder=function(sessionId,moduleCode,order,hostAndPort,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (moduleCode != null) {
        parmArray[index++] = "moduleCode";
        parmArray[index++] = moduleCode;
    }
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    if (hostAndPort != null) {
        parmArray[index++] = "hostAndPort";
        parmArray[index++] = hostAndPort;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getPaymentDetailsPerOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.saveOrder=function(sessionId,order,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("saveOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getStatusText=function(statusId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "statusId";
    parmArray[index++] = statusId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getStatusText",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateOrder=function(sessionId,orderId,status,customerNotified,comments,updateOrder,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    parmArray[index++] = "status";
    parmArray[index++] = status;
    parmArray[index++] = "customerNotified";
    parmArray[index++] = customerNotified;
    if (comments != null) {
        parmArray[index++] = "comments";
        parmArray[index++] = comments;
    }
    if (updateOrder != null) {
        parmArray[index++] = "updateOrder";
        parmArray[index++] = JSON.stringify(updateOrder);
    }
    var jsonParms = createJsonParmString("updateOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.changeOrderStatus=function(sessionId,orderId,status,customerNotified,comments,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    parmArray[index++] = "status";
    parmArray[index++] = status;
    parmArray[index++] = "customerNotified";
    parmArray[index++] = customerNotified;
    if (comments != null) {
        parmArray[index++] = "comments";
        parmArray[index++] = comments;
    }
    var jsonParms = createJsonParmString("changeOrderStatus",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateInventory=function(sessionId,orderId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    var jsonParms = createJsonParmString("updateInventory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateInventoryWithOptions=function(sessionId,orderId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("updateInventoryWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendNewPassword=function(emailAddr,subject,countryCode,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    if (subject != null) {
        parmArray[index++] = "subject";
        parmArray[index++] = subject;
    }
    if (countryCode != null) {
        parmArray[index++] = "countryCode";
        parmArray[index++] = countryCode;
    }
    var jsonParms = createJsonParmString("sendNewPassword",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendNewPassword1=function(emailAddr,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("sendNewPassword1",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendWelcomeEmail=function(customerId,mailSubject,countryCode,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (mailSubject != null) {
        parmArray[index++] = "mailSubject";
        parmArray[index++] = mailSubject;
    }
    if (countryCode != null) {
        parmArray[index++] = "countryCode";
        parmArray[index++] = countryCode;
    }
    var jsonParms = createJsonParmString("sendWelcomeEmail",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendWelcomeEmail1=function(customerId,options,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("sendWelcomeEmail1",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendOrderConfirmationEmail=function(sessionId,orderId,mailSubject,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    if (mailSubject != null) {
        parmArray[index++] = "mailSubject";
        parmArray[index++] = mailSubject;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("sendOrderConfirmationEmail",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendOrderConfirmationEmail1=function(sessionId,orderId,langIdForOrder,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    parmArray[index++] = "langIdForOrder";
    parmArray[index++] = langIdForOrder;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("sendOrderConfirmationEmail1",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSecretKeyForOrderId=function(orderId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    var jsonParms = createJsonParmString("getSecretKeyForOrderId",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrderIdFromSecretKey=function(secretKey,callback,context,eng){
    var parmArray = [], index = 0;
    if (secretKey != null) {
        parmArray[index++] = "secretKey";
        parmArray[index++] = secretKey;
    }
    var jsonParms = createJsonParmString("getOrderIdFromSecretKey",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteOrderIdForSecretKey=function(secretKey,callback,context,eng){
    var parmArray = [], index = 0;
    if (secretKey != null) {
        parmArray[index++] = "secretKey";
        parmArray[index++] = secretKey;
    }
    var jsonParms = createJsonParmString("deleteOrderIdForSecretKey",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.saveIpnHistory=function(sessionId,ipnHistory,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (ipnHistory != null) {
        parmArray[index++] = "ipnHistory";
        parmArray[index++] = JSON.stringify(ipnHistory);
    }
    var jsonParms = createJsonParmString("saveIpnHistory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateManufacturerViewedCount=function(manufacturerId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "manufacturerId";
    parmArray[index++] = manufacturerId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("updateManufacturerViewedCount",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getZonesPerCountry=function(countryId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "countryId";
    parmArray[index++] = countryId;
    var jsonParms = createJsonParmString("getZonesPerCountry",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForZones=function(search,callback,context,eng){
    var parmArray = [], index = 0;
    if (search != null) {
        parmArray[index++] = "search";
        parmArray[index++] = JSON.stringify(search);
    }
    var jsonParms = createJsonParmString("searchForZones",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateCachedConfigurations=function(callback,context,eng){
    var jsonParms = createJsonParmString("updateCachedConfigurations",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.doesCustomerExistForEmail=function(emailAddr,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    var jsonParms = createJsonParmString("doesCustomerExistForEmail",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.isEmailValid=function(emailAddr,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    var jsonParms = createJsonParmString("isEmailValid",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateBasketWithStockInfo=function(basketItems,callback,context,eng){
    var parmArray = [], index = 0;
    if (basketItems != null) {
        parmArray[index++] = "basketItems";
        parmArray[index++] = JSON.stringify(basketItems);
    }
    var jsonParms = createJsonParmString("updateBasketWithStockInfo",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateBasketWithStockInfoWithOptions=function(basketItems,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (basketItems != null) {
        parmArray[index++] = "basketItems";
        parmArray[index++] = JSON.stringify(basketItems);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("updateBasketWithStockInfoWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductQuantity=function(encodedProductId,callback,context,eng){
    var parmArray = [], index = 0;
    if (encodedProductId != null) {
        parmArray[index++] = "encodedProductId";
        parmArray[index++] = encodedProductId;
    }
    var jsonParms = createJsonParmString("getProductQuantity",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductQuantityWithOptions=function(encodedProductId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (encodedProductId != null) {
        parmArray[index++] = "encodedProductId";
        parmArray[index++] = encodedProductId;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductQuantityWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.createAndSaveOrder=function(emailAddr,password,custReg,basketItemArray,shippingModule,paymentModule,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (emailAddr != null) {
        parmArray[index++] = "emailAddr";
        parmArray[index++] = emailAddr;
    }
    if (password != null) {
        parmArray[index++] = "password";
        parmArray[index++] = password;
    }
    if (custReg != null) {
        parmArray[index++] = "custReg";
        parmArray[index++] = JSON.stringify(custReg);
    }
    if (basketItemArray != null) {
        parmArray[index++] = "basketItemArray";
        parmArray[index++] = JSON.stringify(basketItemArray);
    }
    if (shippingModule != null) {
        parmArray[index++] = "shippingModule";
        parmArray[index++] = shippingModule;
    }
    if (paymentModule != null) {
        parmArray[index++] = "paymentModule";
        parmArray[index++] = paymentModule;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("createAndSaveOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSku=function(orderProd,callback,context,eng){
    var parmArray = [], index = 0;
    if (orderProd != null) {
        parmArray[index++] = "orderProd";
        parmArray[index++] = JSON.stringify(orderProd);
    }
    var jsonParms = createJsonParmString("getSku",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.setEndpoint=function(wsEndpoint,callback,context,eng){
    var parmArray = [], index = 0;
    if (wsEndpoint != null) {
        parmArray[index++] = "wsEndpoint";
        parmArray[index++] = wsEndpoint;
    }
    var jsonParms = createJsonParmString("setEndpoint",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertDigitalDownload=function(sessionId,productId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("insertDigitalDownload",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDigitalDownloads=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getDigitalDownloads",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateDigitalDownloadCount=function(sessionId,productId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    var jsonParms = createJsonParmString("updateDigitalDownloadCount",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateDigitalDownloadCountById=function(sessionId,digitalDownloadId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "digitalDownloadId";
    parmArray[index++] = digitalDownloadId;
    var jsonParms = createJsonParmString("updateDigitalDownloadCountById",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTempCustomerId=function(callback,context,eng){
    var jsonParms = createJsonParmString("getTempCustomerId",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllCustomerGroups=function(languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getAllCustomerGroups",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerGroup=function(customerGroupId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerGroupId";
    parmArray[index++] = customerGroupId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getCustomerGroup",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendTemplateEmailToCustomer=function(customerId,templateName,message,countryCode,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (templateName != null) {
        parmArray[index++] = "templateName";
        parmArray[index++] = templateName;
    }
    if (message != null) {
        parmArray[index++] = "message";
        parmArray[index++] = message;
    }
    if (countryCode != null) {
        parmArray[index++] = "countryCode";
        parmArray[index++] = countryCode;
    }
    var jsonParms = createJsonParmString("sendTemplateEmailToCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.sendTemplateEmailToCustomer1=function(customerId,message,options,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (message != null) {
        parmArray[index++] = "message";
        parmArray[index++] = message;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("sendTemplateEmailToCustomer1",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.loginByAdmin=function(adminSession,customerId,callback,context,eng){
    var parmArray = [], index = 0;
    if (adminSession != null) {
        parmArray[index++] = "adminSession";
        parmArray[index++] = adminSession;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    var jsonParms = createJsonParmString("loginByAdmin",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.custom=function(input1,input2,callback,context,eng){
    var parmArray = [], index = 0;
    if (input1 != null) {
        parmArray[index++] = "input1";
        parmArray[index++] = input1;
    }
    if (input2 != null) {
        parmArray[index++] = "input2";
        parmArray[index++] = input2;
    }
    var jsonParms = createJsonParmString("custom",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.customSecure=function(sessionId,input1,input2,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (input1 != null) {
        parmArray[index++] = "input1";
        parmArray[index++] = input1;
    }
    if (input2 != null) {
        parmArray[index++] = "input2";
        parmArray[index++] = input2;
    }
    var jsonParms = createJsonParmString("customSecure",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTagGroupsPerCategory=function(categoryId,getProdCount,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "getProdCount";
    parmArray[index++] = getProdCount;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getTagGroupsPerCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTagGroupsPerCategoryWithOptions=function(categoryId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getTagGroupsPerCategoryWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTagsPerCategory=function(categoryId,getProdCount,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "categoryId";
    parmArray[index++] = categoryId;
    parmArray[index++] = "getProdCount";
    parmArray[index++] = getProdCount;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getTagsPerCategory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTagGroup=function(tagGroupId,getProdCount,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "tagGroupId";
    parmArray[index++] = tagGroupId;
    parmArray[index++] = "getProdCount";
    parmArray[index++] = getProdCount;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getTagGroup",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getTag=function(tagId,getProdCount,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "tagId";
    parmArray[index++] = tagId;
    parmArray[index++] = "getProdCount";
    parmArray[index++] = getProdCount;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getTag",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDefaultCustomer=function(callback,context,eng){
    var jsonParms = createJsonParmString("getDefaultCustomer",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getEngConf=function(callback,context,eng){
    var jsonParms = createJsonParmString("getEngConf",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getStoreIds=function(callback,context,eng){
    var jsonParms = createJsonParmString("getStoreIds",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.setCreditCardDetailsOnOrder=function(sessionId,orderId,card,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    if (card != null) {
        parmArray[index++] = "card";
        parmArray[index++] = JSON.stringify(card);
    }
    var jsonParms = createJsonParmString("setCreditCardDetailsOnOrder",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToWishList=function(sessionId,wishListItem,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishListItem != null) {
        parmArray[index++] = "wishListItem";
        parmArray[index++] = JSON.stringify(wishListItem);
    }
    var jsonParms = createJsonParmString("addToWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToWishListWithOptions=function(sessionId,wishListItem,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishListItem != null) {
        parmArray[index++] = "wishListItem";
        parmArray[index++] = JSON.stringify(wishListItem);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("addToWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.createWishList=function(sessionId,wishList,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishList != null) {
        parmArray[index++] = "wishList";
        parmArray[index++] = JSON.stringify(wishList);
    }
    var jsonParms = createJsonParmString("createWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.createWishListWithOptions=function(sessionId,wishList,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishList != null) {
        parmArray[index++] = "wishList";
        parmArray[index++] = JSON.stringify(wishList);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("createWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editWishList=function(sessionId,wishList,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishList != null) {
        parmArray[index++] = "wishList";
        parmArray[index++] = JSON.stringify(wishList);
    }
    var jsonParms = createJsonParmString("editWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editWishListWithOptions=function(sessionId,wishList,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (wishList != null) {
        parmArray[index++] = "wishList";
        parmArray[index++] = JSON.stringify(wishList);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("editWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteWishList=function(sessionId,wishListId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    var jsonParms = createJsonParmString("deleteWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteWishListWithOptions=function(sessionId,wishListId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("deleteWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishListWithItems=function(sessionId,wishListId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getWishListWithItems",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishListWithItemsWithOptions=function(sessionId,wishListId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getWishListWithItemsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishList=function(sessionId,wishListId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    var jsonParms = createJsonParmString("getWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishListWithOptions=function(sessionId,wishListId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishListItemsWithOptions=function(sessionId,dataDesc,wishListId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getWishListItemsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getWishListItems=function(sessionId,dataDesc,wishListId,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "wishListId";
    parmArray[index++] = wishListId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getWishListItems",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.removeFromWishList=function(sessionId,wishListItemId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListItemId";
    parmArray[index++] = wishListItemId;
    var jsonParms = createJsonParmString("removeFromWishList",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.removeFromWishListWithOptions=function(sessionId,wishListItemId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "wishListItemId";
    parmArray[index++] = wishListItemId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("removeFromWishListWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.mergeWishListsWithOptions=function(sessionId,customerFromId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerFromId";
    parmArray[index++] = customerFromId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("mergeWishListsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForWishLists=function(sessionId,dataDesc,customerSearch,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (customerSearch != null) {
        parmArray[index++] = "customerSearch";
        parmArray[index++] = JSON.stringify(customerSearch);
    }
    var jsonParms = createJsonParmString("searchForWishLists",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getStore=function(callback,context,eng){
    var jsonParms = createJsonParmString("getStore",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addCustomDataToSession=function(sessionId,data,position,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (data != null) {
        parmArray[index++] = "data";
        parmArray[index++] = data;
    }
    parmArray[index++] = "position";
    parmArray[index++] = position;
    var jsonParms = createJsonParmString("addCustomDataToSession",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomDataFromSession=function(sessionId,position,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "position";
    parmArray[index++] = position;
    var jsonParms = createJsonParmString("getCustomDataFromSession",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.setCookie=function(cookie,callback,context,eng){
    var parmArray = [], index = 0;
    if (cookie != null) {
        parmArray[index++] = "cookie";
        parmArray[index++] = JSON.stringify(cookie);
    }
    var jsonParms = createJsonParmString("setCookie",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCookie=function(customerUuid,attrId,callback,context,eng){
    var parmArray = [], index = 0;
    if (customerUuid != null) {
        parmArray[index++] = "customerUuid";
        parmArray[index++] = customerUuid;
    }
    if (attrId != null) {
        parmArray[index++] = "attrId";
        parmArray[index++] = attrId;
    }
    var jsonParms = createJsonParmString("getCookie",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllCookies=function(customerUuid,callback,context,eng){
    var parmArray = [], index = 0;
    if (customerUuid != null) {
        parmArray[index++] = "customerUuid";
        parmArray[index++] = customerUuid;
    }
    var jsonParms = createJsonParmString("getAllCookies",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteCookie=function(customerUuid,attrId,callback,context,eng){
    var parmArray = [], index = 0;
    if (customerUuid != null) {
        parmArray[index++] = "customerUuid";
        parmArray[index++] = customerUuid;
    }
    if (attrId != null) {
        parmArray[index++] = "attrId";
        parmArray[index++] = attrId;
    }
    var jsonParms = createJsonParmString("deleteCookie",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getGeoZonesPerZone=function(zone,callback,context,eng){
    var parmArray = [], index = 0;
    if (zone != null) {
        parmArray[index++] = "zone";
        parmArray[index++] = JSON.stringify(zone);
    }
    var jsonParms = createJsonParmString("getGeoZonesPerZone",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertCustomerTag=function(sessionId,tag,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (tag != null) {
        parmArray[index++] = "tag";
        parmArray[index++] = JSON.stringify(tag);
    }
    var jsonParms = createJsonParmString("insertCustomerTag",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertCustomerTagForGuest=function(customerId,tag,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (tag != null) {
        parmArray[index++] = "tag";
        parmArray[index++] = JSON.stringify(tag);
    }
    var jsonParms = createJsonParmString("insertCustomerTagForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToCustomerTag=function(sessionId,tagName,tagValue,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    parmArray[index++] = "tagValue";
    parmArray[index++] = tagValue;
    var jsonParms = createJsonParmString("addToCustomerTag",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addToCustomerTagForGuest=function(customerId,tagName,tagValue,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    parmArray[index++] = "tagValue";
    parmArray[index++] = tagValue;
    var jsonParms = createJsonParmString("addToCustomerTagForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTag=function(sessionId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("getCustomerTag",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTagForGuest=function(customerId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("getCustomerTagForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTagValue=function(sessionId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("getCustomerTagValue",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTagValueForGuest=function(customerId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("getCustomerTagValueForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteCustomerTag=function(sessionId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("deleteCustomerTag",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteCustomerTagForGuest=function(customerId,tagName,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (tagName != null) {
        parmArray[index++] = "tagName";
        parmArray[index++] = tagName;
    }
    var jsonParms = createJsonParmString("deleteCustomerTagForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTags=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getCustomerTags",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getCustomerTagsForGuest=function(customerId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    var jsonParms = createJsonParmString("getCustomerTagsForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.evaluateExpression=function(sessionId,expressionId,expressionName,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "expressionId";
    parmArray[index++] = expressionId;
    if (expressionName != null) {
        parmArray[index++] = "expressionName";
        parmArray[index++] = expressionName;
    }
    var jsonParms = createJsonParmString("evaluateExpression",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.evaluateExpressionForGuest=function(customerId,expressionId,expressionName,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    parmArray[index++] = "expressionId";
    parmArray[index++] = expressionId;
    if (expressionName != null) {
        parmArray[index++] = "expressionName";
        parmArray[index++] = expressionName;
    }
    var jsonParms = createJsonParmString("evaluateExpressionForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getExpression=function(sessionId,expressionId,expressionName,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "expressionId";
    parmArray[index++] = expressionId;
    if (expressionName != null) {
        parmArray[index++] = "expressionName";
        parmArray[index++] = expressionName;
    }
    var jsonParms = createJsonParmString("getExpression",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getExpressionForGuest=function(customerId,expressionId,expressionName,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    parmArray[index++] = "expressionId";
    parmArray[index++] = expressionId;
    if (expressionName != null) {
        parmArray[index++] = "expressionName";
        parmArray[index++] = expressionName;
    }
    var jsonParms = createJsonParmString("getExpressionForGuest",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.pointsAvailable=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("pointsAvailable",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addPoints=function(sessionId,points,code,description,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "points";
    parmArray[index++] = points;
    if (code != null) {
        parmArray[index++] = "code";
        parmArray[index++] = code;
    }
    if (description != null) {
        parmArray[index++] = "description";
        parmArray[index++] = description;
    }
    var jsonParms = createJsonParmString("addPoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deletePoints=function(sessionId,points,code,description,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "points";
    parmArray[index++] = points;
    if (code != null) {
        parmArray[index++] = "code";
        parmArray[index++] = code;
    }
    if (description != null) {
        parmArray[index++] = "description";
        parmArray[index++] = description;
    }
    var jsonParms = createJsonParmString("deletePoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.reservePoints=function(sessionId,points,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "points";
    parmArray[index++] = points;
    var jsonParms = createJsonParmString("reservePoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteReservedPoints=function(sessionId,reservationId,code,description,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "reservationId";
    parmArray[index++] = reservationId;
    if (code != null) {
        parmArray[index++] = "code";
        parmArray[index++] = code;
    }
    if (description != null) {
        parmArray[index++] = "description";
        parmArray[index++] = description;
    }
    var jsonParms = createJsonParmString("deleteReservedPoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.freeReservedPoints=function(sessionId,reservationId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "reservationId";
    parmArray[index++] = reservationId;
    var jsonParms = createJsonParmString("freeReservedPoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.setRewardPointReservationId=function(sessionId,orderId,reservationId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    parmArray[index++] = "reservationId";
    parmArray[index++] = reservationId;
    var jsonParms = createJsonParmString("setRewardPointReservationId",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getRewardPoints=function(sessionId,dataDesc,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    var jsonParms = createJsonParmString("getRewardPoints",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertSubscription=function(sessionId,subscription,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (subscription != null) {
        parmArray[index++] = "subscription";
        parmArray[index++] = JSON.stringify(subscription);
    }
    var jsonParms = createJsonParmString("insertSubscription",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.updateSubscription=function(sessionId,subscription,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (subscription != null) {
        parmArray[index++] = "subscription";
        parmArray[index++] = JSON.stringify(subscription);
    }
    var jsonParms = createJsonParmString("updateSubscription",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPaymentSchedule=function(id,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "id";
    parmArray[index++] = id;
    var jsonParms = createJsonParmString("getPaymentSchedule",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSubscriptionsPerCustomer=function(sessionId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    var jsonParms = createJsonParmString("getSubscriptionsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.searchForSubscriptionsPerCustomer=function(sessionId,dataDesc,subscriptionSearch,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (subscriptionSearch != null) {
        parmArray[index++] = "subscriptionSearch";
        parmArray[index++] = JSON.stringify(subscriptionSearch);
    }
    var jsonParms = createJsonParmString("searchForSubscriptionsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductPerSkuWithOptions=function(sessionId,sku,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (sku != null) {
        parmArray[index++] = "sku";
        parmArray[index++] = sku;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductPerSkuWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductPerSku=function(sessionId,sku,languageId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (sku != null) {
        parmArray[index++] = "sku";
        parmArray[index++] = sku;
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getProductPerSku",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getIpnHistory=function(sessionId,orderId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    var jsonParms = createJsonParmString("getIpnHistory",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPdf=function(sessionId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getPdf",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getDigitalDownloadById=function(sessionId,digitalDownloadId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "digitalDownloadId";
    parmArray[index++] = digitalDownloadId;
    var jsonParms = createJsonParmString("getDigitalDownloadById",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.editDigitalDownload=function(sessionId,digitalDownload,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (digitalDownload != null) {
        parmArray[index++] = "digitalDownload";
        parmArray[index++] = JSON.stringify(digitalDownload);
    }
    var jsonParms = createJsonParmString("editDigitalDownload",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getMsgValue=function(key,type,locale,callback,context,eng){
    var parmArray = [], index = 0;
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    parmArray[index++] = "type";
    parmArray[index++] = type;
    if (locale != null) {
        parmArray[index++] = "locale";
        parmArray[index++] = locale;
    }
    var jsonParms = createJsonParmString("getMsgValue",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getMessages=function(type,locale,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "type";
    parmArray[index++] = type;
    if (locale != null) {
        parmArray[index++] = "locale";
        parmArray[index++] = locale;
    }
    var jsonParms = createJsonParmString("getMessages",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.postMessageToQueue=function(sessionId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("postMessageToQueue",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.readMessageFromQueue=function(sessionId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("readMessageFromQueue",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertCustomerEvent=function(event,callback,context,eng){
    var parmArray = [], index = 0;
    if (event != null) {
        parmArray[index++] = "event";
        parmArray[index++] = JSON.stringify(event);
    }
    var jsonParms = createJsonParmString("insertCustomerEvent",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSuggestedSearchItems=function(sessionId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getSuggestedSearchItems",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductsFromIdsWithOptions=function(sessionId,dataDesc,prodIdArray,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (prodIdArray != null) {
        parmArray[index++] = "prodIdArray";
        parmArray[index++] = JSON.stringify(prodIdArray);
    }
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductsFromIdsWithOptions",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBookingsPerProduct=function(dataDesc,productId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBookingsPerProduct",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBookingsPerCustomer=function(sessionId,dataDesc,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBookingsPerCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.insertBooking=function(sessionId,booking,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (booking != null) {
        parmArray[index++] = "booking";
        parmArray[index++] = JSON.stringify(booking);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("insertBooking",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBookableProductConflict=function(sessionId,bookableProd,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (bookableProd != null) {
        parmArray[index++] = "bookableProd";
        parmArray[index++] = JSON.stringify(bookableProd);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBookableProductConflict",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getOrderStatus=function(sessionId,orderId,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "orderId";
    parmArray[index++] = orderId;
    var jsonParms = createJsonParmString("getOrderStatus",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllOrderStatuses=function(languageId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    var jsonParms = createJsonParmString("getAllOrderStatuses",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.saveSSOToken=function(token,callback,context,eng){
    var parmArray = [], index = 0;
    if (token != null) {
        parmArray[index++] = "token";
        parmArray[index++] = JSON.stringify(token);
    }
    var jsonParms = createJsonParmString("saveSSOToken",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getSSOToken=function(secretKey,deleteToken,callback,context,eng){
    var parmArray = [], index = 0;
    if (secretKey != null) {
        parmArray[index++] = "secretKey";
        parmArray[index++] = secretKey;
    }
    parmArray[index++] = "deleteToken";
    parmArray[index++] = deleteToken;
    var jsonParms = createJsonParmString("getSSOToken",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.enableCustomer=function(secretKey,callback,context,eng){
    var parmArray = [], index = 0;
    if (secretKey != null) {
        parmArray[index++] = "secretKey";
        parmArray[index++] = secretKey;
    }
    var jsonParms = createJsonParmString("enableCustomer",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.checkCoupon=function(couponCode,callback,context,eng){
    var parmArray = [], index = 0;
    if (couponCode != null) {
        parmArray[index++] = "couponCode";
        parmArray[index++] = couponCode;
    }
    var jsonParms = createJsonParmString("checkCoupon",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAllPromotions=function(callback,context,eng){
    var jsonParms = createJsonParmString("getAllPromotions",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPromotionsPerProducts=function(sessionId,customerId,products,promotions,couponCodes,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    parmArray[index++] = "customerId";
    parmArray[index++] = customerId;
    if (products != null) {
        parmArray[index++] = "products";
        parmArray[index++] = JSON.stringify(products);
    }
    if (promotions != null) {
        parmArray[index++] = "promotions";
        parmArray[index++] = JSON.stringify(promotions);
    }
    if (couponCodes != null) {
        parmArray[index++] = "couponCodes";
        parmArray[index++] = JSON.stringify(couponCodes);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getPromotionsPerProducts",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getConfigData=function(sessionId,key,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (key != null) {
        parmArray[index++] = "key";
        parmArray[index++] = key;
    }
    var jsonParms = createJsonParmString("getConfigData",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getKonaKartVersion=function(callback,context,eng){
    var jsonParms = createJsonParmString("getKonaKartVersion",null,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getPunchOutMessage=function(sessionId,order,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (order != null) {
        parmArray[index++] = "order";
        parmArray[index++] = JSON.stringify(order);
    }
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getPunchOutMessage",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.addCustomerNotifications=function(options,callback,context,eng){
    var parmArray = [], index = 0;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("addCustomerNotifications",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.deleteCustomerNotifications=function(options,callback,context,eng){
    var parmArray = [], index = 0;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("deleteCustomerNotifications",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getAddressFormatTemplate=function(templateId,callback,context,eng){
    var parmArray = [], index = 0;
    parmArray[index++] = "templateId";
    parmArray[index++] = templateId;
    var jsonParms = createJsonParmString("getAddressFormatTemplate",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBundlesThatProductBelongsTo=function(sessionId,dataDesc,productId,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    parmArray[index++] = "productId";
    parmArray[index++] = productId;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBundlesThatProductBelongsTo",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getBundlesThatProductsBelongTo=function(sessionId,dataDesc,productIds,exactMatch,languageId,options,callback,context,eng){
    var parmArray = [], index = 0;
    if (sessionId != null) {
        parmArray[index++] = "sessionId";
        parmArray[index++] = sessionId;
    }
    if (dataDesc != null) {
        parmArray[index++] = "dataDesc";
        parmArray[index++] = JSON.stringify(dataDesc);
    }
    if (productIds != null) {
        parmArray[index++] = "productIds";
        parmArray[index++] = JSON.stringify(productIds);
    }
    parmArray[index++] = "exactMatch";
    parmArray[index++] = exactMatch;
    parmArray[index++] = "languageId";
    parmArray[index++] = languageId;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getBundlesThatProductsBelongTo",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};
kkEng.getProductImages=function(options,callback,context,eng){
    var parmArray = [], index = 0;
    if (options != null) {
        parmArray[index++] = "options";
        parmArray[index++] = JSON.stringify(options);
    }
    var jsonParms = createJsonParmString("getProductImages",parmArray,eng);
    callEng(jsonParms, callback, context, eng);
};

/*
 * API Objects
 */

function OrderUpdate() {}
function ManufacturerSearch() {}
function CreateOrderOptions() {}
function Promotion() {}
function Order() {}
function Basket() {}
function WishListItem() {}
function DigitalDownload() {}
function BookableProductOptions() {}
function CreditCard() {}
function CustomerEvent() {}
function AddToWishListOptions() {}
function FetchProductOptions() {}
function ZoneSearch() {}
function OrderSearch() {}
function ProductSearch() {}
function NotificationOptions() {}
function SubscriptionSearch() {}
function FetchTagGroupOptions() {}
function KKCookie() {}
function Zone() {}
function CustomerRegistration() {}
function OrderProduct() {}
function PromotionOptions() {}
function Customer() {}
function PdfOptions() {}
function ReviewSearch() {}
function ProductImagesOptions() {}
function MqOptions() {}
function Product() {}
function EmailOptions() {}
function PunchOutOptions() {}
function SSOToken() {}
function Review() {}
function Booking() {}
function LanguageSearch() {}
function Subscription() {}
function IpnHistory() {}
function CustomerTag() {}
function CustomerSearch() {}
function Address() {}
function AddToBasketOptions() {}
function WishList() {}
function DataDescriptor() {}
function SuggestedSearchOptions() {}

function BankAccountValidation_Interactive_Validate_v2_00(Key, AccountNumber, SortCode) {

   
    return $.getJSON("https://services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json3.ws?callback=?",
    {
        Key: Key,
        AccountNumber: AccountNumber,
        SortCode: SortCode
    }).done(function (data) {
        return data;
        // Test for an error
        if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
           
            // Show the error message
            alert(data.Items[0].Description);
          
        }
        else {
            // Check if there were any items found
            if (data.Items.length == 0){
          
                alert("Sorry, there were no results");
                
            }
            else {

                var test = data.Items[0].IsDirectDebitCapable;
              
                // PUT YOUR CODE HERE
                //FYI: The output is a JS object (e.g. data.Items[0].IsCorrect), the keys being:
                //IsCorrect
                //IsDirectDebitCapable
                //StatusInformation
                //CorrectedSortCode
                //CorrectedAccountNumber
                //IBAN
                //Bank
                //BankBIC
                //Branch
                //BranchBIC
                //ContactAddressLine1
                //ContactAddressLine2
                //ContactPostTown
                //ContactPostcode
                //ContactPhone
                //ContactFax
                //FasterPaymentsSupported
                //CHAPSSupported
            }
        }
    });

   
}
    
/*!
// This is a collection of JavaScript code to allow easy integration of 
// postcode / address finder functionality into any website
//
// Provided by www.CraftyClicks.co.uk
//
// Version - 4.9.1 (23/03/2011)
//
// Feel free to copy/use/modify this code any way you see fit. Please keep this
// comment header in place when you do.
//
// To integrate UK postcode / address lookup on your website, please visit www.craftyclicks.co.uk for
// details of how to sign up for an account.
//
**********************************************************************************/
var _cp_instances = [], 
	_cp_instance_idx = 0,
	_cp_pl = ['FLAT', 'SHOP', 'UNIT', 'BLOCK', 'STALL', 'SUITE', 'APARTMENT', 'MAISONETTE', 'HOUSE NUMBER'];
function CraftyPostcodeCreate() {
	_cp_instance_idx++;
	_cp_instances[_cp_instance_idx] = new CraftyPostcodeClass();
	_cp_instances[_cp_instance_idx].obj_idx = _cp_instance_idx;
	return _cp_instances[_cp_instance_idx];
}

// strip prefix
function _cp_sp(a) {
	var pi = '', ii;
	for (ii=0; ii<_cp_pl.length; ii++) {
		pi = _cp_pl[ii];
		if (pi == a.substr(0,pi.length).toUpperCase()) {
			return (a.substr(pi.length)); // return rest of input string after known prefix
		}
	}
	return ('');
}

// extract house number
function _cp_eh(ha) {
	var hn = '';
	while  (hn = ha.shift()) {
		if (!isNaN(parseInt(hn))) {
			return (parseInt(hn));
		}
	}
	return '';
}

// handle hey press on result box
function _cp_kp(e) {
	var cc;
	if (!e) e = window.event;
	if(e.keyCode) {cc = e.keyCode;}
	else if(e.which) {cc = e.which;}
	if(cc == 13){
		this.onclick();
	}
}

function CraftyPostcodeClass () {
	this.config = { 
		lookup_url		: 'pcls1.craftyclicks.co.uk/js/', // url to use for lookup
		access_token	: '', // specify access token here to use the direct JS method,  lookup_url must be set to 'http://pcls1.craftyclicks.co.uk/lookup_js.php'
		basic_address	: 0, // 0 - Rapid/Flexi Address, 1 - Basic Address
		traditional_county	: 0, // 0 - postal county, 1 - traditional county name
		busy_img_url	: '',	//crafty_postcode_busy.gif- full url of the gif to show when waiting for result
		hide_result		: 0,		// 1 - results box disappears once a result is clicked, 0 - it stays up
		org_uppercase	: 1,		// 0 - leading uppercase, 1- all in uppercase
		town_uppercase	: 1,		// 0 - leading uppercase, 1- all in uppercase
		county_uppercase: 0,		// 0 - leading uppercase, 1- all in uppercase
		addr_uppercase	: 0,		// 0 - leading uppercase, 1- all in uppercase
		delimiter		: ', ',
		msg1			: 'Please wait while we find the address',
		err_msg1		: 'This postcode could not be found, please try again or enter your address manually',
		err_msg2		: 'This postcode is not valid, please try again or enter your address manually',
		err_msg3		: 'Unable to connect to address lookup server, please enter your address manually.',
		err_msg4		: 'An unexpected error occured, please enter your address manually.',
		res_autoselect	: 1, // the first result will be auto-selected by default
		res_select_on_change : 1, // 1 - if the user scrolls through the results they will be selected, 0 - user must explicitly click to select 
		debug_mode		: 0,
		lookup_timeout	: 10000, // time in ms
		form			: '',	// if left blank in/out elements will be shearched by id, if provided elemts will be searched by name
		elements		: '',   // element ids or form fields
		max_width		: '',  // width of the results box in px
		max_lines		: 1,		// height of the rsults box in text lines
		first_res_line	: '---- please select your address ----', // adds a dummy 1st line 
		result_elem_id	: '',
		on_result_ready : null,
		on_result_selected : null,
		on_error : null,
		pre_populate_common_address_parts : 0, // 1 - every time the drop-down is shown all common parts of the address get placed on the form
		elem_company    : 'crafty_out_company',
		elem_house_num  : '', // if this is blank the house name/number is placed on street lines
		elem_street1    : 'crafty_out_street1',
		elem_street2    : 'crafty_out_street2',
		elem_street3    : 'crafty_out_street3',
		elem_town       : 'crafty_out_town',
		elem_county     : 'crafty_out_county',
		elem_postcode   : 'crafty_in_out_postcode',
		elem_udprn		: 'crafty_out_udprn',
		single_res_autoselect : 0, // 1 - if only one result is found, we select it right away rather than show a one line drop down!
		single_res_notice	: '---- address found, see below ----', // if single_res_autoselect = 1, show this message if drop down in not shown
		// extra fields for search by house name/number & flexi search
		elem_search_house : 'crafty_in_search_house',
		elem_search_street : 'crafty_in_search_street',
		elem_search_town : 'crafty_in_search_town',
		max_results		: 25, // maximum search results to display
		err_msg5		: 'The house name/number could not be found, please try again.',
		err_msg6		: 'No results found, please modify your search and try again.',
		err_msg7		: 'Too many results, please modify your search and try again.',
		err_msg9		: 'Please provide more data and try again.',
		// trial limit error msg
		err_msg8		: 'Trial account limit reached, please use AA11AA, AA11AB, AA11AD or AA11AE.'
	};

	this.xmlhttp = null;
	this.res_arr = null;
	this.disp_arr = null;
	this.res_arr_idx = 0;
	this.dummy_1st_line = 0;
	this.cc = 0;
	this.flexi_search = 0;
	this.lookup_timeout = null;
	this.obj_name = '';
	this.house_search = 0;

	this.set = function(field, val){
		this.config[field] = val;
	}

	this.res_clicked = function(idx) {
		this.cc++;
		if (this.res_selected(idx)) {
			if(0 != this.config.hide_result && ( (2 >=this.config.max_lines && 1 < this.cc) || (2 < this.config.max_lines) ) ) {
				this.update_res(null);
				this.cc = 0;
			}
		}
	}
	
	this.res_selected = function(index) {
		if (1 == this.dummy_1st_line) {
			if (0 == index) {
				return 0; // don't select the dummy first line if present
			} else {
				index--;
			}
		}
		// translate index
		index = this.disp_arr[index]['index'];
		this.populate_form_fields(this.res_arr[index]);

		if (this.config.on_result_selected) {
			this.config.on_result_selected(index);
		}
		return 1;
	}
	
	this.populate_form_fields = function(selected_line) {
		var elem = [];
		var dc = this.config.delimiter;
		
		for (var i=0; i<8; i++) {
			elem[i] = this.get_elem(i);
		}	

		elem[11] = this.get_elem(11); // udprn
		if (elem[11]) {
			elem[11].value = selected_line['udprn'];
		}
		
		if (elem[0]) { // company
			if (elem[0] == elem[1] && '' != selected_line['org']) { 
				// put company name on line1 of address
				elem[1].value = selected_line['org'];
				// shift up remaining lines
				elem[1] = elem[2]; elem[2] = elem[3]; elem[3] = null;
			} else {
				elem[0].value = selected_line['org'];
			}
		}
		
		var house_name = selected_line['housename2'];
		if ('' != house_name && '' != selected_line['housename1']) {
			house_name += dc;
		}
		house_name += selected_line['housename1'];
		var house_num  = selected_line['housenumber'];
		if (elem[7]) { // display the house name/number in a separate field
			elem[7].value = house_name;
			if ('' != house_name && '' != house_num) {
				elem[7].value += dc;
			}
			elem[7].value += house_num;
			house_name = '';
			house_num = '';
		}

		var str1 = selected_line['street1'];
		var str2 = selected_line['street2'];
		// add the house num (if any) to the street
		if ('' != house_num) {
			if ('' != str2) {
				str2 = house_num + ' ' + str2;
			} else if ('' != str1) {
				str1 = house_num + ' ' + str1;
			} else {
				str1 = house_num;
			}
		}

		var combined_street =  str2 + (str2==''?'':(str1==''?'':dc)) + str1;
		var locality_dep = selected_line['locality_dep'] ;
		var locality = selected_line['locality'] ;
		if ('' != combined_street && parseInt(combined_street) == combined_street) {
			if ('' != locality_dep) {
				locality_dep = parseInt(combined_street) + ' ' + locality_dep;
			} else {
				locality = parseInt(combined_street) + ' ' + locality;
			}
			combined_street = ''; str1 = '';
		}
		var combined_loc = locality_dep + (locality_dep=='' || locality=='' ? '':dc) + locality;
		var combined_str_loc = combined_street + (combined_street=='' || combined_loc=='' ? '':dc) + combined_loc;

		if (elem[1] && elem[2] && elem[3]) {
			if ('' != selected_line['pobox'] || '' != house_name) {
				if ('' != selected_line['pobox']) { elem[1].value = selected_line['pobox']; } else { elem[1].value = house_name; }
				if ('' == combined_loc) {
					if ('' == str2) {
						elem[2].value = str1;
						elem[3].value = '';
					} else {
						elem[2].value = str2;
						elem[3].value = str1;
					}
				} else if ('' == combined_street) {
					if ('' == locality_dep) {
						elem[2].value = locality;
						elem[3].value = '';
					} else {
						elem[2].value = locality_dep;
						elem[3].value = locality;
					}
				} else {
					elem[2].value = combined_street;
					elem[3].value = combined_loc;
				}
			} else if ('' == combined_street) { 
				if ('' == locality_dep) {
					elem[1].value = locality;
					elem[2].value = '';
					elem[3].value = '';
				} else {
					elem[1].value = locality_dep;
					elem[2].value = locality;
					elem[3].value = '';
				}
			} else if ('' == combined_loc) { 
				if ('' == str2) {
					elem[1].value = str1;
					elem[2].value = '';
					elem[3].value = '';
				} else {
					elem[1].value = str2;
					elem[2].value = str1;
					elem[3].value = '';
				}
			} else { 
				if ('' == str2) {
					elem[1].value = str1;
					if ('' == locality_dep) {
						elem[2].value = locality;
						elem[3].value = '';
					} else {
						elem[2].value = locality_dep;
						elem[3].value = locality;
					}
				} else {
					if ('' == locality_dep) {
						elem[1].value = str2;
						elem[2].value = str1;
						elem[3].value = locality;
					} else {
						if (combined_street.length < combined_loc.length) {
							elem[1].value = combined_street;
							elem[2].value = locality_dep;
							elem[3].value = locality;
						} else {
							elem[1].value = str2;
							elem[2].value = str1;
							elem[3].value = combined_loc;
						}
					}
				}
			} 
		} else if (elem[1] && elem[2])	{
			if ('' != selected_line['pobox']) {
				elem[1].value = selected_line['pobox'];
				elem[2].value = combined_str_loc; // might be blank
			} else if ('' != house_name && '' != combined_street && '' != combined_loc) { // got it all baby! spread it evenly
				if ((house_name.length + combined_street.length) < (combined_street.length + combined_loc.length)) {
					elem[1].value = house_name + (house_name==''?'':dc) + combined_street;
					elem[2].value = combined_loc;
				} else {
					elem[1].value = house_name;
					elem[2].value = combined_street + (combined_street==''?'':dc) + combined_loc;
				}
			} else if ('' != house_name && '' != combined_street) { // got house, street but no loc
				elem[1].value = house_name;
				elem[2].value = combined_street;
			} else if ('' == house_name && '' != combined_street) { // got street, no house, maybe loc
				if ('' == combined_loc) {
					if ('' != str2) {
						elem[1].value = str2;
						elem[2].value = str1;
					} else {
						elem[1].value = combined_street;
						elem[2].value = '';
					}
				} else {
					elem[1].value = combined_street;
					elem[2].value = combined_loc;
				}
			} else if ('' == combined_street && '' != house_name) { // got house, no street, maybe loc
				elem[1].value = house_name;
				elem[2].value = combined_loc;
			} else { // got no house, no street but maybe loc
				elem[1].value = combined_loc;
				elem[2].value = '';
			} 
		} else { // only got one line!
			var single_elem;
			if (elem[1]) { single_elem = elem[1]; } else if (elem[2]) { single_elem = elem[2]; } else { single_elem = elem[3]; }
			if ('' != selected_line['pobox']) {
				single_elem.value = selected_line['pobox'] + dc + combined_loc;
			} else {
				single_elem.value = house_name + (house_name=='' || combined_str_loc=='' ? '':dc) + combined_str_loc;
			}
		}
		
		if (elem[4]) {
			elem[4].value = selected_line['town'];
		}
		
		if (elem[5]) {
			elem[5].value = selected_line['county'];
		}

		if (elem[6]) {
			elem[6].value = selected_line['postcode'];
		}
		
		return 1;
	}

	this.show_busy = function() {

		var bi = document.createElement('img');
		var na = document.createAttribute('src');
		na.value = this.config.busy_img_url;
		bi.setAttributeNode(na);
		na = document.createAttribute('title');
		na.value = this.config.msg1;
		bi.setAttributeNode(na);
		this.update_res(bi);
	}

	this.disp_err = function(error_code, dbg_msg) {
		var err_node = null;	
		var err_decoded_str = '';
		if ('' != error_code) {	
			switch (error_code) {
				case '0001':
					err_decoded_str = this.config.err_msg1;
					break;
				case '0002':
					err_decoded_str = this.config.err_msg2;
					break;
				case '9001':
					err_decoded_str = this.config.err_msg3;
					break;
				case '0003':
					err_decoded_str = this.config.err_msg9;
					break;
				case '0004':
					err_decoded_str = this.config.err_msg6;
					break;
				case '0005':
					err_decoded_str = this.config.err_msg7;
					break;
				case '7001':
					err_decoded_str = this.config.err_msg8;
					break;
				default:
					err_decoded_str = '('+error_code+') '+this.config.err_msg4;
					break;
			}
			if (this.config.debug_mode) {
				var err_info = '';
				switch (error_code) {
					case '8000': err_info = ' :: No Access Token '; break; 
					case '8001': err_info = ' :: Invalid Token Format '; break; 
					case '8002': err_info = ' :: Invalid Token '; break; 
					case '8003': err_info = ' :: Out of Credits '; break; 
					case '8004': err_info = ' :: Restricted by rules '; break; 
					case '8005': err_info = ' :: Token suspended '; break; 
				}
				err_decoded_str += err_info+' :: DBG :: '+dbg_msg;
			}
			err_node = document.createTextNode(err_decoded_str);
		}	
		this.update_res (err_node);
		if (this.config.on_error) {
			this.config.on_error(err_decoded_str);
		}
	}

	this.disp_err_msg = function(error_msg) {
		var err_node = null;
		if ('' != error_msg) {	
			err_node = document.createTextNode(error_msg);
		}	
		this.update_res (err_node);
		if (this.config.on_error) {
			this.config.on_error(error_msg);
		}
	}

	this.display_res_line = function(dispstr, index) {
		// see if an options box exists already
		var postcodeResult = document.getElementById("crafty_postcode_lookup_result_option"+this.obj_idx);
		var newOption = document.createElement('option');
		newOption.appendChild(document.createTextNode(dispstr));

		if (null != postcodeResult) {	// just add a new line to existing select box
			postcodeResult.appendChild(newOption);
		} else {	// create a new select drop down list
			var newSelection = document.createElement('select');
			newSelection.id = 'crafty_postcode_lookup_result_option'+this.obj_idx;
			newSelection.onclick=Function("_cp_instances["+this.obj_idx+"].res_clicked(this.selectedIndex);");
			newSelection.onkeypress=_cp_kp;

			if (0 != this.config.res_select_on_change) {newSelection.onchange=Function("_cp_instances["+this.obj_idx+"].res_selected(this.selectedIndex);");}
			if (this.config.max_width && '' != this.config.max_width) {
				newSelection.style.width=this.config.max_width;
			}
			var num_res_lines = this.res_arr_idx;
			if (1 == this.dummy_1st_line) {
				num_res_lines++;
			}
			if ((navigator.appName=="Microsoft Internet Explorer") && (parseFloat(navigator.appVersion)<=4)) {
				newSelection.size=0;
			} else {
				if (num_res_lines >= this.config.max_lines) {
					newSelection.size=this.config.max_lines;
				} else 	{
					newSelection.size=num_res_lines;
				}
			}
			newSelection.appendChild(newOption);
			this.update_res(newSelection);
		}
	}

	this.update_res = function(new_element) {
		if (this.lookup_timeout) {
			clearTimeout (this.lookup_timeout);
		}
		
		try	{
			if (document.getElementById) {
				var the_parent = document.getElementById(this.config.result_elem_id);
				// clear out any existing contents
				if (the_parent.hasChildNodes())	{
					while (the_parent.firstChild) {
						the_parent.removeChild(the_parent.firstChild);
					}
				}
			
				// insert new contents
				if (null != new_element) {
					the_parent.appendChild(new_element);
				}		
			}
		}
		catch(er) {};
	}

	this.str_trim = function(s) {
		var l=0; 
		var r=s.length -1;
		while(l < s.length && s[l] == ' ') { l++; }
		while(r > l && s[r] == ' ') { r-=1;	}
		return s.substring(l, r+1);
	}

	this.cp_uc = function(text) {
		if ("PC" == text || "UK" == text || "EU" == text) {return (text);}
		var alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var out_text = '';
		var do_uc = 1;
		var all_uc = 0;
		for (var i=0; i<text.length; i++){
			if (-1 != alpha.indexOf(text.charAt(i))) {
				if (do_uc || all_uc) {
					out_text = out_text + text.charAt(i);
					do_uc = 0;
				} else {
					out_text = out_text + text.charAt(i).toLowerCase();
				}
			} else {
				out_text = out_text + text.charAt(i);
				if (i+2 >= text.length && "'" == text.charAt(i)) { // only one more char left, don't capitalise
					do_uc = 0; 
				} else if ("(" == text.charAt(i)) {
					close_idx = text.indexOf(")",i+1);
					if (i+3 < close_idx) { // more than 2 chars
						all_uc = 0; do_uc = 1;
					} else { // no closing bracket or 2 or les chars in brackets, leave uppercase
						all_uc = 1; 
					}				
				} else if (")" == text.charAt(i)) {
					all_uc = 0; do_uc = 1;
				} else if ("-" == text.charAt(i)) {
					close_idx = text.indexOf("-",i+1);
					if ((-1 != close_idx && i+3 >= close_idx) || i+3 >= text.length) { // less than 2 chars
						all_uc = 0; do_uc = 0;
					} else { // 2 or more chars 
						all_uc = 0; do_uc = 1;
					}		
				} else if (i+2 < text.length && "0" <= text.charAt(i) && "9" >= text.charAt(i)) {
					do_uc = 0;
				} else {
					do_uc = 1;
				}
			}
		}
		return (out_text);
	}

	this.leading_caps = function(txt, dont_do_it) {
		if (0 != dont_do_it || 2 > txt.length) { return (txt) }
		var out_text = '';
		var words = txt.split(" ");
		for (var i=0; i<words.length; i++) {	// each word in turn
			var word = this.str_trim(words[i]);
			if ('' != word)	{
				if ('' != out_text)	{
					out_text = out_text + ' ';
				}
				out_text = out_text + this.cp_uc(word);
			}
		}
		return (out_text);
	}

	this.new_res_line = function() {
		var al = [];
		al['org'] = ''; al['housename1'] = ''; al['housename2'] = ''; al['pobox'] = '';
		al['housenumber'] = ''; al['street1'] = ''; al['street2'] = '';
		al['locality_dep'] = ''; al['locality'] = ''; al['town'] = '';
		al['county'] = ''; al['postcode'] = ''; al['udprn'] = '';
		return (al);
	}

	this.res_arr_compare = function(a,b) {
		// sort by street name first, then by number
		if (a['match_quality'] > b['match_quality']) {
			return (1);
		} 
		if (a['match_quality'] < b['match_quality']) {
			return (-1);
		} 
		if (a['street1'] > b['street1']) {
			return (1);
		} 
		if (a['street1'] < b['street1']) {
			return (-1);
		}
		
		if (a['street2'] > b['street2']) {
			return (1);
		}
		if (a['street2'] < b['street2']) {
			return (-1);
		}
		
		// compare house numbers
		var numA;
		if ('' == a['housenumber']) {
			numA = _cp_eh(Array(a['housename1'], a['housename2']));
		} else {
			numA = parseInt(a['housenumber']);
		}
		var numB;
		if ('' == b['housenumber']) {
			numB = _cp_eh(Array(b['housename1'], b['housename2']));
		} else {
			numB = parseInt(b['housenumber']);
		}
		// premises with street numbers go to the top of the list
		if ('' == numA && '' != numB) {
			return (1);
		} else if ('' != numA && '' == numB) {
			return (-1);
		} else {
			if (numA > numB) {
				return (1);
			}
			if (numA < numB) {
				return (-1);
			}
		}
		
		// strip off known prefixes
		var hseA = _cp_sp(a['housename1']);
		if (!isNaN(parseInt(hseA))) {
			hseA = parseInt(hseA);
		}
		var hseB = _cp_sp(b['housename1']);
		if (!isNaN(parseInt(hseB))) {
			hseB = parseInt(hseB);
		}
		if (hseA > hseB) {
			return (1);
		}
		if (hseA < hseB) {
			return (-1);
		}

		var hseA = _cp_sp(a['housename2']);
		if (!isNaN(parseInt(hseA))) {
			hseA = parseInt(hseA);
		}
		var hseB = _cp_sp(b['housename2']);
		if (!isNaN(parseInt(hseB))) {
			hseB = parseInt(hseB);
		}
		if (hseA > hseB) {
			return (1);
		}
		if (hseA < hseB) {
			return (-1);
		}
		
		hseA = a['housename2']+a['housename1'];
		hseB = b['housename2']+b['housename1'];
		if (hseA > hseB) {
			return (1);
		}
		if (hseA < hseB) {
			return (-1);
		}

		if (a['org'] > b['org']) {
			return (1);
		}
		if (a['org'] < b['org']) {
			return (-1);
		}

		return (1);
	}
	
	this.disp_res_arr = function() {
		// sort the results
		this.res_arr = this.res_arr.sort(this.res_arr_compare);
		// select top result in required
		if (0 != this.config.res_autoselect) {
			this.populate_form_fields(this.res_arr[0]);
		}				
		// create a display array
		var dc = this.config.delimiter;
		this.disp_arr = [];
		for (var i=0;i<this.res_arr_idx;i++) {
			var arrayline = this.res_arr[i];
			var dispstr = arrayline['org'] + (arrayline['org'] !='' ? dc : '') + 
						  arrayline['housename2'] + (arrayline['housename2'] != '' ? dc : '') + 
						  arrayline['housename1'] + (arrayline['housename1'] != '' ? dc : '') + 
						  arrayline['pobox'] + (arrayline['pobox'] != '' ? dc : '') + 
						  arrayline['housenumber'] + (arrayline['housenumber'] != '' ? ' ' : '') +
						  arrayline['street2'] + (arrayline['street2'] != '' ? dc : '') +
						  arrayline['street1'] + (arrayline['street1'] != '' ? dc : '') +
						  arrayline['locality_dep'] + (arrayline['locality_dep'] != '' ? dc : '') +
						  arrayline['locality'] + (arrayline['locality'] != '' ? dc : '') +
						  arrayline['town'];
			if (this.flexi_search) {
				dispstr += dc + arrayline['postcode'];
			}
						  
			var displine = [];
			displine['index'] = i;
			displine['str'] = dispstr;
			this.disp_arr[i] = displine;
		}
		// display it
		this.dummy_1st_line = 0;
		if ('' != this.config.first_res_line) {
			this.dummy_1st_line = 1;
			this.display_res_line(this.config.first_res_line, -1);
		}
		for (var i=0;i<this.res_arr_idx;i++) {
			this.display_res_line(this.disp_arr[i]['str'], i);
		}
		if (this.config.pre_populate_common_address_parts) {
			// build an array containing the common parts of all the addresses
			var common_result = this.new_res_line();
			common_result['org'] = this.res_arr[0]['org'];
			common_result['housename1'] = this.res_arr[0]['housename1']; 
			common_result['housename2'] = this.res_arr[0]['housename2']; 
			common_result['pobox'] = this.res_arr[0]['pobox'];
			common_result['housenumber'] = this.res_arr[0]['housenumber']; 
			common_result['street1'] = this.res_arr[0]['street1']; 
			common_result['street2'] = this.res_arr[0]['street2'];
			common_result['locality_dep'] = this.res_arr[0]['locality_dep'];
			common_result['locality'] = this.res_arr[0]['locality'];
			common_result['town'] = this.res_arr[0]['town'];
			common_result['county'] = this.res_arr[0]['county'];
			common_result['postcode'] = this.res_arr[0]['postcode'];
			common_result['udprn'] = this.res_arr[0]['udprn'];
			for (var i=1;i<this.res_arr_idx;i++) {
				if (this.res_arr[i]['org'] != common_result['org']) {
					common_result['org'] = '';
				}
				if (this.res_arr[i]['housename2'] != common_result['housename2']) {
					common_result['housename2'] = '';
				}
				if (this.res_arr[i]['housename1'] != common_result['housename1']) {
					common_result['housename1'] = '';
				}
				if (this.res_arr[i]['pobox'] != common_result['pobox']) {
					common_result['pobox'] = '';
				}
				if (this.res_arr[i]['housenumber'] != common_result['housenumber']) {
					common_result['housenumber'] = '';
				}
				if (this.res_arr[i]['street1'] != common_result['street1']) {
					common_result['street1'] = '';
				}
				if (this.res_arr[i]['street2'] != common_result['street2']) {
					common_result['street2'] = '';
				}
				if (this.res_arr[i]['locality_dep'] != common_result['locality_dep']) {
					common_result['locality_dep'] = '';
				}
				if (this.res_arr[i]['locality'] != common_result['locality']) {
					common_result['locality'] = '';
				}
				if (this.res_arr[i]['town'] != common_result['town']) {
					common_result['town'] = '';
				}
				if (this.res_arr[i]['county'] != common_result['county']) {
					common_result['county'] = '';
				}
				if (this.res_arr[i]['postcode'] != common_result['postcode']) {
					common_result['postcode'] = '';
				}
				if (this.res_arr[i]['udprn'] != common_result['udprn']) {
					common_result['udprn'] = '';
				}
			}

			this.populate_form_fields(common_result);
		}
	}

	this.get_elem = function(idx) {
		var el_name = '';
		var el = null;
		if ('' != this.config.elements) {
			// old comma separated list method
			var en = this.config.elements.split(",");
			el_name = en[idx];
		} else {
			// new way, translated to old way.. to keep legacy code happy
			switch (idx) {
				case 0:
					el_name = this.config.elem_company;
					break;
				case 1:
					el_name = this.config.elem_street1;
					break;
				case 2:
					el_name = this.config.elem_street2;
					break;
				case 3:
					el_name = this.config.elem_street3;
					break;
				case 4:
					el_name = this.config.elem_town;
					break;
				case 5:
					el_name = this.config.elem_county;
					break;
				case 6:
				default:
					el_name = this.config.elem_postcode;
					break;
				case 7: // new separate house name or number field
					el_name = this.config.elem_house_num;
					break;
				case 8: // new input for house and flexi address search
					el_name = this.config.elem_search_house;
					break;
				case 9: // new input for flexi address search
					el_name = this.config.elem_search_street;
					break;
				case 10: // new input for flexi address search
					el_name = this.config.elem_search_town;
					break;
				case 11: 
					el_name = this.config.elem_udprn;
					break;
			}
		}
		if ('' != el_name) {
			if ('' != this.config.form) {
				el = document.forms[this.config.form].elements[el_name];
			} else if (document.getElementById) {
				el = document.getElementById(el_name);
			}
		}
		return (el);
	}

	this.doHouseSearch = function() {
		var he = this.get_elem(8);
		if (he && 0 < he.value.length) {
			this.house_search = 1;
		}
		this.doLookup();
	}

	this.doLookup = function() {
		this.xmlhttp=null;

		var pe = this.get_elem(6);
		var pc = null;

		if (pe) { 
			this.show_busy(); // show busy img - this will clear any errors/previous results
			this.lookup_timeout = setTimeout ( "_cp_instances["+this.obj_idx+"].lookup_timeout_err()", this.config.lookup_timeout );
			pc = this.validate_pc(pe.value);
		}
		
		if (null != pc) {
			this.direct_xml_fetch(0, pc);
		} else {
			this.disp_err('0002', 'invalid postcode format');
		}
	}

	this.flexiSearch = function() {
		this.xmlhttp=null;

		var in_str = '';
		if (this.get_elem(8) && '' != this.get_elem(8).value) {
			in_str+='&search_house='+this.get_elem(8).value;
		}
		if (this.get_elem(9) && '' != this.get_elem(9).value) {
			in_str+='&search_street='+this.get_elem(9).value;
		}
		if (this.get_elem(10) && '' != this.get_elem(10).value) {
			in_str+='&search_town='+this.get_elem(10).value;
		}

		if ('' != in_str) { 
			this.show_busy(); // show busy img - this will clear any errors/previous results
			this.lookup_timeout = setTimeout ( "_cp_instances["+this.obj_idx+"].lookup_timeout_err()", this.config.lookup_timeout );
			this.direct_xml_fetch(1, in_str);
		} else {
			this.disp_err('0003', 'search string too short');
		}
	}

	this.validate_pc = function (dirty_pc) {
		// first strip out anything not alphanumenric
		var pc = '';
		do {
			pc = dirty_pc;
			dirty_pc = dirty_pc.replace(/[^A-Za-z0-9]/, "");
		} while (pc != dirty_pc);
		pc = dirty_pc.toUpperCase();
		// check if we have the right length with what is left
		if (7 >= pc.length && 5 <= pc.length) {
			// get the in code 
			var inc = pc.substring(pc.length-3,pc.length);
			// get the out code
			var outc = pc.substring(0, pc.length-3);
			// now validate both in and out codes
			if (true == /[CIKMOV]/.test(inc)) {
				return null;
			}
			// inCode must be NAA
			if ( '0' <= inc.charAt(0) && '9' >= inc.charAt(0) &&
				 'A' <= inc.charAt(1) && 'Z' >= inc.charAt(1) &&
				 'A' <= inc.charAt(2) && 'Z' >= inc.charAt(2) ) {
				// outcode must be one of AN, ANN, AAN, ANA, AANN, AANA
				switch (outc.length) { 
					case 2: // AN
						if ('A' <= outc.charAt(0) && 'Z' >= outc.charAt(0) &&
							'0' <= outc.charAt(1) && '9' >= outc.charAt(1) ) { return (pc); }
						break;
					case 3: // ANN, AAN, ANA
						if ('A' <= outc.charAt(0) && 'Z' >= outc.charAt(0)) {
							if ('0' <= outc.charAt(1) && '9' >= outc.charAt(1) &&
								'0' <= outc.charAt(2) && '9' >= outc.charAt(2) ) { return (pc); }
							else if ('A' <= outc.charAt(1) && 'Z' >= outc.charAt(1) &&
									 '0' <= outc.charAt(2) && '9' >= outc.charAt(2) ) { return (pc); }
							else if ('0' <= outc.charAt(1) && '9' >= outc.charAt(1) &&
									 'A' <= outc.charAt(2) && 'Z' >= outc.charAt(2) ) { return (pc); }
						}
						break;
					case 4: // AANN, AANA
						if ('A' <= outc.charAt(0) && 'Z' >= outc.charAt(0) &&
							'A' <= outc.charAt(1) && 'Z' >= outc.charAt(1) &&
							'0' <= outc.charAt(2) && '9' >= outc.charAt(2)) {
							if ('0' <= outc.charAt(3) && '9' >= outc.charAt(3) ) { return (pc); }
							else if ('A' <= outc.charAt(3) && 'Z' >= outc.charAt(3) ) { return (pc); }
						}
						break;
					default:
						break;
				}
			}
		}
		return null;
	}


	this.direct_xml_fetch = function(type, search_str) {
		try	{
			var the_parent = document.getElementById(this.config.result_elem_id);
			var url = '';
			if ("https:" == document.location.protocol) {
				url = 'https://';
			} else {
				url = 'http://';
			}
			
			if (0 == type) { // postcode search
				url += this.config.lookup_url;
				if (this.config.basic_address) {
					url += 'basicaddress';
				} else {
					url += 'rapidaddress';
				}
				url += '?postcode='+search_str+'&callback=_cp_instances['+this.obj_idx+'].handle_js_response&callback_id=0';
			} else { // flexi address search
				if (this.config.basic_address) {
					this.disp_err('1207', 'BasicAddress can\'t be used for Flexi Search!');
					return;
				} else {
					url += this.config.lookup_url+'flexiaddress?callback=_cp_instances['+this.obj_idx+'].handle_js_response&callback_id=1';
					url += '&max_results='+this.config.max_results;
					url += search_str;
				}

			}
			if ('' != this.config.access_token) {
				url += '&key='+this.config.access_token;
			}
			var cs = document.createElement("script");
			cs.src = encodeURI(url);
			cs.type = "text/javascript";
			the_parent.appendChild(cs);
		}
		catch(er){
			this.disp_err('1206', er);
		};
	}

	this.handle_js_response = function (callback_id, status, data) {
		if (!status) { // an error
			var ef = data['error_code'];
			var em = data['error_msg'];
			this.disp_err(ef, em);
		} else { // got data
			this.res_arr = [];
			this.res_arr_idx = 0;

			if (0 == callback_id) {
				// single postcode
				this.flexi_search = 0;
				if (this.house_search) {
					data = this.filter_data_by_house_name(data);
					if (null == data) {
						// no luck
						this.disp_err_msg(this.config.err_msg5);
						return;
					}
				}
				this.add_to_res_array(data);
			} else {
				// flexi result, could be a few postcodes
				this.flexi_search = 1;
				this.res_arr['total_postcode_count'] = data['total_postcode_count'];
				this.res_arr['total_thoroughfare_count'] = data['total_thoroughfare_count'];
				this.res_arr['total_delivery_point_count'] = data['total_delivery_point_count'];
				for (var res_idx=1; res_idx<=data['total_postcode_count']; res_idx++) {
					this.add_to_res_array(data[res_idx]);
				}
			}

			if (this.res_arr_idx) {
				var res_autoselected = false;
				if (1 == this.res_arr_idx && this.config.single_res_autoselect) {
					// only one result no need to show a drop down, just use the result
					var msg_node = null;
					if ('' != this.config.single_res_notice) {
						msg_node = document.createTextNode(this.config.single_res_notice);
					}
					this.update_res (msg_node);
					this.populate_form_fields(this.res_arr[0]);
					res_autoselected = true;
				} else {
					// sort & display results
					this.disp_res_arr();
					try {
						document.getElementById("crafty_postcode_lookup_result_option"+this.obj_idx).focus();
					} catch (error) {}
				}
				if (0 == callback_id && '' != data['postcode']) {
					var pe = this.get_elem(6);
					pe.value = data['postcode'];
				}
				if (this.config.on_result_ready) {
					this.config.on_result_ready();
				}
				if (res_autoselected && this.config.on_result_selected) {
					this.config.on_result_selected(0);
				}
			} else {
				this.disp_err( '1205', 'no result to display' );
			}
		}
	}

	this.add_to_res_array = function (data) {
		// loop over all streets
		for (var str_idx=1; str_idx<=data['thoroughfare_count']; str_idx++) {
			var str1 = data[str_idx]['thoroughfare_name'];
			if ('' != data[str_idx]['thoroughfare_descriptor']) {
				str1 += ' '+data[str_idx]['thoroughfare_descriptor'];
			}
			str1 = this.leading_caps(str1, this.config.addr_uppercase);
			var str2 = data[str_idx]['dependent_thoroughfare_name'];
			if ('' != data[str_idx]['dependent_thoroughfare_descriptor']) {
				str2 += ' '+data[str_idx]['dependent_thoroughfare_descriptor'];
			}
			str2 = this.leading_caps(str2, this.config.addr_uppercase);
			if ('delivery_point_count' in data[str_idx]  && 0 < data[str_idx]['delivery_point_count']) {
				// loop over all premises on this street
				for (var p_idx=1; p_idx<=data[str_idx]['delivery_point_count']; p_idx++) {
					var al = this.new_res_line();
					al['street1'] = str1;
					al['street2'] = str2;
					var prem = data[str_idx][p_idx];
					if( 'match_quality' in prem ) {
						// indication of how good this premises matched the search string
						al['match_quality'] = prem['match_quality']; 
					} else {
						al['match_quality'] = 1; 
					}
					al['housenumber'] = prem['building_number'];
					al['housename2'] = this.leading_caps(prem['sub_building_name'], this.config.addr_uppercase);
					al['housename1'] = this.leading_caps(prem['building_name'], this.config.addr_uppercase);
					al['org'] = prem['department_name'];
					if ('' != al['org'] && '' != prem['organisation_name']) {
						al['org'] += this.config.delimiter;
					}
					al['org'] = this.leading_caps(al['org']+prem['organisation_name'], this.config.org_uppercase);
					al['pobox'] = this.leading_caps(prem['po_box_number'], this.config.addr_uppercase);
					al['postcode'] = data['postcode'];
					al['town'] = this.leading_caps(data['town'], this.config.town_uppercase);
					al['locality'] = this.leading_caps(data['dependent_locality'], this.config.addr_uppercase);;
					al['locality_dep'] = this.leading_caps(data['double_dependent_locality'], this.config.addr_uppercase);
					if (this.config.traditional_county) {
						al['county'] = this.leading_caps(data['traditional_county'], this.config.county_uppercase);
					} else {
						al['county'] = this.leading_caps(data['postal_county'], this.config.county_uppercase);
					}
					al['udprn'] = prem['udprn'];  
					this.res_arr[this.res_arr_idx] = al;
					this.res_arr_idx++;
				}
			} else {
				// street level data only
				var al = this.new_res_line();
				al['street1'] = str1;
				al['street2'] = str2;
				al['postcode'] = data['postcode'];
				al['town'] = this.leading_caps(data['town'], this.config.town_uppercase);
				al['locality'] = this.leading_caps(data['dependent_locality'], this.config.addr_uppercase);;
				al['locality_dep'] = this.leading_caps(data['double_dependent_locality'], this.config.addr_uppercase);
				if (this.config.traditional_county) {
					al['county'] = this.leading_caps(data['traditional_county'], this.config.county_uppercase);
				} else {
					al['county'] = this.leading_caps(data['postal_county'], this.config.county_uppercase);
				}
				al['match_quality'] = 2; 
				this.res_arr[this.res_arr_idx] = al;
				this.res_arr_idx++;
			}
		}
	}

	this.filter_data_by_house_name = function(data) {
		var he = this.get_elem(8);
		if (!he || !he.value.length) {
			return data;
		}
		var input = he.value.toUpperCase();
		var search_number = -1;
		if (parseInt(input) == input) {	
			// a pure number is what we are looking for
			search_number = parseInt(input);		
		}
		var search_string = ' '+input; // add a leading space to make sure we match of start of a word only
		var data_out = [];
		var str_idx_out = 1;
		var p_idx_out = 0;
		// loop over all streets
		for (var str_idx=1; str_idx<=data['thoroughfare_count']; str_idx++) {
			// loop over all premises on this street
			data_out[str_idx_out] = [];
			p_idx_out = 0;
			for (var p_idx=1; p_idx<=data[str_idx]['delivery_point_count']; p_idx++) {
				var prem = data[str_idx][p_idx];
				var search_target = ' '+prem['sub_building_name']+' '+prem['building_name']+' ';
				if (-1 != search_target.indexOf(search_string) || search_number == parseInt(prem['building_number'])) {
					// got a match!
					p_idx_out++;
					data_out[str_idx_out][p_idx_out] = [];
					data_out[str_idx_out][p_idx_out]['building_number']   = prem['building_number'];
					data_out[str_idx_out][p_idx_out]['sub_building_name'] = prem['sub_building_name'];
					data_out[str_idx_out][p_idx_out]['building_name'] 	  = prem['building_name'];
					data_out[str_idx_out][p_idx_out]['department_name']   = prem['department_name'];
					data_out[str_idx_out][p_idx_out]['organisation_name'] = prem['organisation_name'];
					data_out[str_idx_out][p_idx_out]['po_box_number']     = prem['po_box_number'];
					data_out[str_idx_out][p_idx_out]['udprn']     		  = prem['udprn'];
				}
			}
			// any hits on this thoroughfare?
			if (p_idx_out) {
				data_out[str_idx_out]['delivery_point_count'] = p_idx_out;
				// copy the rest of the data
				data_out[str_idx_out]['thoroughfare_name']					= data[str_idx]['thoroughfare_name'];
				data_out[str_idx_out]['thoroughfare_descriptor']			= data[str_idx]['thoroughfare_descriptor'];
				data_out[str_idx_out]['dependent_thoroughfare_name']		= data[str_idx]['dependent_thoroughfare_name'];
				data_out[str_idx_out]['dependent_thoroughfare_descriptor']	= data[str_idx]['dependent_thoroughfare_descriptor'];
				str_idx_out++;
			}
		}
		// any hits at all?
		if (1 < str_idx_out) {
			data_out['thoroughfare_count'] = str_idx_out-1;
			// copy all common data now
			data_out['town'] 					  = data['town'];
			data_out['dependent_locality'] 		  = data['dependent_locality'];
			data_out['double_dependent_locality'] = data['double_dependent_locality'];
			data_out['traditional_county'] 		  = data['traditional_county'];
			data_out['postal_county'] 			  = data['postal_county'];
			data_out['postcode']				  = data['postcode'];
			return data_out;
		}
		return null;
	}	
	
	this.lookup_timeout_err = function() {
		this.disp_err('9001', 'Internal Timeout after '+this.config.lookup_timeout+'ms')
	}
}

$(window).load(function (){
    initCookiePolicyPopUp('ee.introBannerShown');
});
function initCookiePolicyPopUp(theCookiePolicy) {

   
    var cookiePolicyHtml = "<div id='cookie-policy-noticebar-content' class='cookie-policy-noticebar-content'><div class='container'><p>"
            + "By browsing the EE site you're agreeing to the use of cookies. "
            + "<a target='_blank' href='http://ee.co.uk/cookies' title='Read our privacy policy'>"
            + " Learn more</a>&nbsp;&nbsp;<a class='close-cookie-policy'><span aria-hidden='true' class='icon-CrossCircle'></span></a></p></div></div>";
     
   
    if (getCookiePolicy(theCookiePolicy) != null) {
       
        setCookiePolicy(theCookiePolicy, 'true', '365');

    } else {
        
        $('header').prepend(cookiePolicyHtml);       
        setCookiePolicy(theCookiePolicy, 'true', '365');
    }
  
    $('a.close-cookie-policy').click(function() {
        $('div#cookie-policy-noticebar-content').remove();   
        //deleteCookiePolicy(theCookiePolicy);   
        return false;
    });
   
}

function setCookiePolicy(name, value, days) {  
   
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } 
    
    document.cookie = name + "=" + value + expires + "; domain=ee.co.uk;path=/";
 
}

function getCookiePolicy(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for ( var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookiePolicy(name) {
    setCookie(name, "", -1);
}
// save a reference to the core implementation
var indexOfValue = _.indexOf;

// using .mixin allows both wrapped and unwrapped calls:
// _(array).indexOf(...) and _.indexOf(array, ...)
_.mixin({

    // return the index of the first array element passing a test
    indexOf: function(array, test) {
        // delegate to standard indexOf if the test isn't a function
        if (!_.isFunction(test)) return indexOfValue(array, test);
        // otherwise, look for the index
        for (var x = 0; x < array.length; x++) {
            if (test(array[x])) return x;
        }
        // not found, return fail value
        return -1;
    }

});
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


angular.module('saas')

    .factory('getService', function($http) {

        function getData(ajaxURL) {

            return $http({
                    url: ajaxURL,
                    method: "GET",
                })
                .then(function(response) {
                        var returnData = {
                            data: response.data
                        }
                        // success
                        return returnData;
                    },
                    function(response) { // optional
                        // failed
                        return response;
                    }
                );
        }

        return {
            getData: getData
        }

    });
angular.module('saas')

    .factory('postService', function($http) {

        // Factory to allow posting data to the server and capturing the response

        function postData(ajaxURL, postData, options) {

            var opts = angular.extend({
                token: '',
                header: ''
            }, options);
              // console.log('token',options.token,'header' ,options.header);
            var headers = {};
            headers[opts.header] = opts.token;
            var postData = postData;

            return $http({
                    url: ajaxURL,
                    method: "POST",
                    data: postData,
                    headers: headers
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {

                        var returnData = {
                            postData: response.config.data,
                            data: response.data
                        }

                        // success
                        return returnData;
                    },
                    function(response) { // optional
                        // failed

                        return response;
                    }
                );
        }

        return {
            postData: postData
        }

    });
angular.module('saas').factory('provisioningService', function($http) {

    function getProvisioningData(ajaxURL) {

        return $http.get(ajaxURL).then(function(result) {

            return result.data;

        });

    }

    function postProvisioningData(ajaxURL, postData, options) {

        var opts = angular.extend({
            token: '',
            header: ''
        }, options);

        var headers = {};
        headers[opts.header] = opts.token;

        return $http({
                url: ajaxURL,
                method: "POST",
                data: postData,
                headers: headers
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                    //debugger;

                    // success
                    return response.data;
                },
                function(response) { // optional
                    // failed

                    return response;
                }
            );
    }

    return {
        getProvisioningData: getProvisioningData,
        postProvisioningData: postProvisioningData
    }

});
angular.module('saas').factory('teleSearchService', function($http) {

    function searchCustomers() {

        return $http.get('/rest/user/getUser').then(function(result) {
            return result.data;
        });

    }


    function getUserDetails(postData, options) {

        var opts = angular.extend({
            token: '',
            header: ''
        }, options);

        var headers = {};
        headers[opts.header] = opts.token;

        debugger;

        return $http({
                url: '/rest/user/getUser',
                method: "POST",
                data: postData,
                headers: headers
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                    debugger;

                    // success
                    return response.data;
                },
                function(response) { // optional
                    // failed

                    return response;
                }
            );
    }


    return {
        getUserDetails: getUserDetails
    }

});
angular.module('saas')

    .controller('assignLicenceCtrl', ['$scope', function ($scope) {
        
        $scope.checkList = [];
        $scope.checkListTrue = false;

         // fix for ie8 
        if(!Array.prototype.indexOf) {

            Array.prototype.indexOf = function(val) {
                return jQuery.inArray(val, this);
            };
        }
        // fix fo ie8 end

        // fix for ie8 
         if(!Array.prototype.indexOf) {

            Array.prototype.indexOf = function(val) {
                return jQuery.inArray(val, this);
            };
        }
        // fix fo ie8 end

        $scope.updateCheckList = function(item){

            if($scope.checkList.indexOf(item) == -1){
                $scope.checkList.push(item);
            }else{
                $scope.checkList.splice($scope.checkList.indexOf(item), 1);
            }
            
            
            if($scope.checkList.length !== 0){
                $scope.checkListTrue = true;
            }else {

                $scope.checkListTrue = false;
            }
        }

    }]);
angular.module('saas')

.controller('companyEditStatusCtrl', ['$scope', 'postService', function ($scope, postService) {
	
	$scope.userStatuses = userStatuses;
	$scope.accountStatuses = accountStatuses;	
	$scope.editStatus = wrapperJson;
	$scope.savedChanges = null;
	$scope.saveChangesButton = false;
	$scope.discardChanges = function() {
		$scope.editStatus = angular.copy($scope.editStatusBackUp);
		initialiseStatuses();
	}
	
	function initialiseStatuses() {
		for (var i=0; i<$scope.userStatuses.length; i++) {
			for (var j=0; j<$scope.editStatus.users.length; j++) {
				if ($scope.userStatuses[i].name == $scope.editStatus.users[j].status.name) {
					$scope.editStatus.users[j].status = $scope.userStatuses[i];
				}
			}
		}
	}
	
	initialiseStatuses();

	$scope.editStatusBackUp = angular.copy($scope.editStatus);
	
	$scope.getTotal = function() {
		var total = 0;
		for (var i=0; i<$scope.products.length; i++) {
			if ($scope.products[i].checked == true) {
				total += $scope.products[i].price;
			}
		}
		return total;
	}
	
	$scope.updateCompanyStatus = function(ajaxUrl, opt1, opt2) {
		
		$scope.saveChangesButton = true;
		var postData = $scope.editStatus;
	       
		var options = {};
		
		options.token = opt1;
		options.header = opt2;
		
		postService.postData(ajaxUrl, postData, options).then(function (response) {
		       
			$scope.saveChangesButton = false;
			
		       if(response.data.success == true){
			    $scope.savedChanges = true;
		       } else{
			    $scope.savedChanges = false;
		       }
		       
		       $scope.editStatus = response.data;
		       initialiseStatuses();
		       $scope.editStatusBackUp = angular.copy($scope.editStatus);
		});
	}
}]);

angular.module('saas')

.controller('companyProductsCtrl', ['$scope', 'postService', function ($scope, postService) {
	
	$scope.products = productsJson;
	$scope.productsBackUp = angular.copy(productsJson);
	$scope.cancelImmediate = false;
	$scope.savedChanges = null;
	$scope.saveChangesButton = false;
	$scope.discardChanges = function() {
		$scope.products = angular.copy($scope.productsBackUp);
	}
	
	$scope.getTotal = function() {
		var total = 0;
		for (var i=0; i<$scope.products.length; i++) {
			if ($scope.products[i].checked == true) {
				total += $scope.products[i].price;
			}
		}
		return total;
	}
	
	$scope.updateCompanyProducts = function(ajaxUrl, opt1, opt2) {
		$scope.saveChangesButton = true;
		var postData = $scope.products;
	       
		var options = {};
		
		options.token = opt1;
		options.header = opt2;
		ajaxUrl = ajaxUrl + "/" + $scope.cancelImmediate;
		postService.postData(ajaxUrl, postData, options).then(function (response) {
		       $scope.saveChangesButton = false;
		       if(response.data.success == true){
			    $scope.savedChanges = true;
		       } else{
			    $scope.savedChanges = false;
		       }
		       
		       $scope.products = response.data.companyProducts;
		       $scope.productsBackUp = angular.copy(response.data.companyProducts);
		});
	}
}]);
angular.module('saas')

    .controller('formCtrl', ['$scope', 'postService', 'getService', '$http', function ($scope, postService, getService, $http ) {
        $scope.emailSent = false;
        $scope.buttonDisabled = false;

        /*employeesDataUrl = '/rest/eesales/autocomplete/00';
        $scope.employeeData = getService.getData(employeesDataUrl).then(function (response) {
          if (response.data) {
            return response.data;
          }
          else {
              //console.log("error get employees data: "+response);
          }
        });*/

        // Angular filter doesnt't work with the promises so the piace of code above doesnt work beacuse the get service in src/js/app/common/services/getService.js uses the promises with 'then'
        // To try a solution to move this code in the 'getServices.js' 
        $scope.employeeData = null;
        $http.get('/rest/eesales/autocomplete/00').success(function(data) {
            $scope.employeeData = data;
        });

        $scope.sendMoreInfoEmail = function(formData,ajaxUrl , opt1 , opt2 ) {
            
            $scope.buttonDisabled = true;
            $('#floatingBarsG').show();
            //$scope.formDisplay = true;
           
            var options = {};

            // Options can include _csrf.token & headerName
            options.token = opt1;
            options.header = opt2;
          
            postService.postData(ajaxUrl, formData, options).then(function (response) {
               


                if (response.data.success) {

                   $scope.emailSent = true;
                   $scope.emailSentError = false;
                   $scope.emailSentErrorSpin = true;

                }
                else {
                    // Check for error
                    
                  
                   $scope.emailSentError = true;
                   $scope.emailSentErrorSpin = true;
                   $scope.buttonDisabled = false;

                }

            });
            


        }

    }]);

//     // Set form status when submit occurs
//     $scope.errorOnSubmit = false;


//     $scope.addToModel = function(item) {

//         debugger;

//         console.log('addToModel', item);
//     }


//     this.returnAddToModel = function (item) {

//         $scope.addToModel(item);

//     }



//     $scope.onSubmit = function () {

//         // TODO if error then update errorOnSubmit var & show global messages

//         // if ($scope.myForm.$valid) {
//         //     $scope.errorOnSubmit = false;
//         // }
//         // else {
//         //     event.preventDefault();

//         //     $scope.errorOnSubmit = true;

//         //     $scope.setErrorMessageText();
//         // }

//     }

//     $scope.setErrorMessageText = function () {

//         // Build error message text
//         var _label = '';
//         var outputHTML = "<h2 class='messageHeader'>To continue, please correct the following:</h2>";

//         _.each($scope.myForm.$error, function (errorType) {

//             _.each(errorType, function (error) {

//                 // Get label text
//                 _label = $(myForm).find("[name='"+error.$name+"']").parent().find('label').text();
//                 _label = _label.replace(' *', '');

//                 outputHTML += '<p class="messageText">' +
//                                 '<span aria-hidden="true" class="icon-Warningation"></span>' +
//                                 _label + ' was not recognised. Please try again.' +
//                             '</p>';

//             });

//         });


//         $(myForm).find('.message').html(outputHTML);
//     }

// }]);
angular.module( 'saas' )

.controller( 'marketPlaceCtrl', [ '$scope', function( $scope ) {

  var fullScreenFunc = HTMLVideoElement.prototype.requestFullscreen ||
    HTMLVideoElement.prototype.mozRequestFullScreen ||
    HTMLVideoElement.prototype.webkitRequestFullScreen ||
    HTMLVideoElement.prototype.msRequestFullScreen;


  $scope.expandIntro = false;
  $scope.currentItem = null;
  $scope.currentVideo = null;


  $scope.slideProductRow = function( id ) {
    var $items = $( '#' + id ).find( '.item' ),
      $first = $items.first(),
      $last = $items.last();

    $first.insertAfter( $last );
  }


  $scope.setCurrentItem = function( item ) {
    $scope.currentItem = item;
    return true;
  }


  // IE 8! Add Flash fallback to video elements...
  if ( navigator.appVersion.indexOf( "MSIE 8." ) !== -1 ) {
    $scope.stopVideo = function( id ) {
      $( '#swfVideoObj' ).remove();

      $scope.currentVideo = null;
      return false;
    }

    $scope.setCurrentVideo = function( video ) {
      $scope.stopVideo();

      var videoSrc = document.getElementById( video + '-swf' ),
        movie = $( videoSrc ).val();

      $( videoSrc )
        .after(
          '<object id="swfVideoObj" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="281">' +
          '<param name="movie" value="' + movie + '" />' +
          '<param name="quality" value="high" />' +
          '<param name="controller" value="true" />' +
          '<param name="autoplay" value="false" />' +
          '<embed src="' + movie +
          '" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="281" ></embed></object>'
        );

      $scope.currentVideo = video;
      return true;
    }
  }

  // Not IE 8!
  else {
    $scope.stopVideo = function( id ) {
      $( id ? '#' + id : 'body' ).find( 'video' ).each( function( elem ) {
        try {
          console.log(this);
          this.pause();
          this.currentTime = 0;
        }
        catch ( ex ) {
          console.info( ex )
        }
      } )

      $scope.currentVideo = null;
      return false;
    }


    $scope.setCurrentVideo = function( id ) {
      $scope.stopAllVideos();

      var videoElement = document.getElementById( id );
      videoElement.play();

      if ( typeof fullScreenFunc === 'function' && navigator.userAgent.match(
          /(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i ) ) {
        fullScreenFunc.call( videoElement )
      }

      $scope.currentVideo = id;
      return true;
    }
  }


  $scope.stopAllVideos = function() {
    $scope.stopVideo();
  }

} ] );

angular.module('saas')

    .controller('marketPlaceIntroCtrl', ['$scope', function ($scope) {
        $scope.currentIntroVideo = null;

        /**
         * Opens the modal dialog, and once it has appeared, start the video playing
         */
        $scope.showModal = function(modalId) {
          $('#' + modalId)
            .on('shown.bs.modal', function(event) {
              var $vid = $(this).find('video');

              $vid[0].play();
            })
            .modal()
        };

        $scope.setCurrentIntroVideo = function(video) {
            $scope.currentIntroVideo = video;

            if (navigator.appVersion.indexOf("MSIE 8.") !== -1) {
                var identefier = video + '-swf';
                var videoSrc = document.getElementById(identefier);
                var movie = $(videoSrc).val();
                var videoObject = '<object id="swfVideoObj" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="281">'
                  + '<param name="movie" value="'+ movie +'" />'
                  + '<param name="quality" value="high" />'
                  + '<param name="controller" value="true" />'
                  + '<param name="autoplay" value="false" />'
                  + '<embed src="'+ movie
                  + '" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="281" ></embed></object>';

                $(videoSrc).after(videoObject);
            }
            else {
                $("video").each(function() {
                  this[0].pause();
                });

                var videoElement = document.getElementById(video);
                var source = $(videoElement).find('source');
                var mp4Video = source[0];
                mp4Video.src = $(mp4Video).attr('id');
                var ogvVideo = source[1];
                ogvVideo.src = $(ogvVideo).attr('id');
                videoElement.load();

                if( navigator.userAgent.match(/Android/i)
                  || navigator.userAgent.match(/webOS/i)
                  || navigator.userAgent.match(/iPhone/i)
                  || navigator.userAgent.match(/iPad/i)
                  || navigator.userAgent.match(/iPod/i)
                  || navigator.userAgent.match(/BlackBerry/i)
                  || navigator.userAgent.match(/Windows Phone/i)
                 ){
                    if (videoElement.requestFullscreen) {
                      videoElement.requestFullscreen();
                    } else if (videoElement.mozRequestFullScreen) {
                      videoElement.mozRequestFullScreen();
                    } else if (videoElement.webkitRequestFullscreen) {

                      videoElement.webkitRequestFullscreen();
                    }
                }

            }


            return true;
        }

        $scope.stopVideo = function (el) {

             $scope.currentIntroVideo = null;
            if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {
                $('#swfVideoObj').remove();
                return true;

             }else {
                var parentElement = document.getElementById(el);
                var videoElement = parentElement.getElementsByTagName('video')[0];

                videoElement.pause();
                return true;
            }
        }



}]);

angular.module('saas')

    .controller('moonfruitCtrl', ['$scope', '$http', function ($scope, $http) {

       $scope.restUrl = null;
       $scope.redirectUrl = null;

      // $scope.currentOS = $scope.licenseObj.os;

       $scope.submitMoonfruit = function() {
       	$('#floatingBarsG').show();
        $http.get( $scope.restUrl)

	        .success(function(data) {
	           
	     
	        	$('#floatingBarsG').hide();
	            if (data) {
	            	// if not successful, bind errors to error variables
	             
	                window.location = $scope.redirectUrl + "?domain=" + data;

	            } else {
	            	// if successful, bind success message to message
	            	//console.log('ERROR');
	            }
	        });
       }

       $scope.setRestUrl = function (restUrl) {
      
       		$scope.restUrl = restUrl;
       }
       
    }]); 
angular.module('saas')

    .controller('mozyLicenseKeyCtrl', ['$scope', function ($scope) {

       $scope.licenseObj = obj;

       $scope.currentOS = $scope.licenseObj.os;

       $scope.setCurrentOS = function(currentOS) {

        alert(currentOS);
       }
       
    }]); 
angular.module('saas')

    .controller('office365LaunchCtrl', ['$scope', '$http' , '$sce', '$timeout', function ($scope, $http, $sce, $timeout) {

       $scope.officeOrders = obj.orders;
       $scope.iFrameUrl="";
       $scope.loading= true;


       $scope.getOfficeIframe = function( ajaxUrl, orderRef, orderLineRef){

       	$scope.iFrameUrl = "";
       	$scope.loading= true;
       	var restAPI = ajaxUrl + orderRef + '/' + orderLineRef;

       	//console.log(restAPI);

		$http.get( restAPI )
	        .success(function(response) {

	            //console.log(response);

	            if (response.result == 'success') {
	            	// if not successful, bind errors to error variables
	                //console.log('success');
	                $scope.iFrameUrl = $sce.trustAsResourceUrl(response.atts.iFrameURL +'KEY');
	               
	                $timeout(function(){$scope.loading = false;}, 1000);
	                

	            } else {
	            	//console.log('error')
	            }
	        });

       }

    }]);
angular.module('saas')

  .controller('saasVideoCtrl', ['$scope', function($scope) {
    $scope.displayVideo = false;

    /**
     * Opens the modal dialog, and once it has appeared, start the video playing
     */
    $scope.showModal = function(modalId) {
      $('#' + modalId)
        .on('shown.bs.modal', function(event) {
          var $vid = $(this).find('video');

          $vid[0].play();
        })
        .modal()
    };

    $scope.stopVideo = function(elementId, event) {
      var videoElement = document.getElementById(elementId);
      videoElement.pause();
      return true;
    };

    $scope.playVideo = function(elementId, event) {
      $("video").each(function () {
        if(navigator.appVersion.indexOf("MSIE 8.") === -1){
          this.pause();
        }
      });

      // Detect if IE 8
      if (navigator.appVersion.indexOf("MSIE 8.") !== -1) {
        $scope.displayVideo = true;
      }
      else {
        var videoElement = document.getElementById(elementId),
          source = $(videoElement).find('source'),
          mp4Video = source[0],
          ogvVideo = source[1];

        mp4Video.src = $(mp4Video).attr('id');
        ogvVideo.src = $(ogvVideo).attr('id');

        $scope.displayVideo = true;
        videoElement.load();

        if (navigator.userAgent.match(/(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i)) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          }
          else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
          }
          else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
          }
        }

        videoElement.play();
      }
    };

  }
]);

angular.module('saas')
	.controller('sendMoreInforCtrl', ['$scope', 'postService', 'getService', '$http', function($scope, postService, getService, $http) {
		
		/*employeesDataUrl = '/rest/eesales/autocomplete/00';
		$scope.employeeData = getService.getData(employeesDataUrl).then(function (response) {
			if (response.data) {
               return response.data;
	        }
            else {
            	//console.log("error get employees data: "+response);
            }
		});*/

		// Angular filter doesnt't work with the promises so the piace of code above doesnt work beacuse the get service in src/js/app/common/services/getService.js uses the promises with 'then'
		// To try a solution to move this code in the 'getServices.js' 
		$scope.employeeData = null;
        $http.get('/rest/eesales/autocomplete/00').success(function(data) {
            $scope.employeeData = data;
            //$scope.artistOrder = 'name';
            //alert($scope.employeeData);
        });


		 	$scope.emailSent = false;
	        $scope.buttonDisabled = false;
			$scope.errorList1 = null;
	        $scope.sendMoreInfoEmail = function(formData,ajaxUrl , opt1 , opt2 ) {
	            $scope.buttonDisabled = true;
	            $('#floatingBarsG').show();
	            //$scope.formDisplay = true;
	           
	            var options = {};

	            // Options can include _csrf.token & headerName
	            options.token = opt1;
	            options.header = opt2;
	            postService.postData(ajaxUrl, formData, options).then(function (response) {
	               
	            	if (response.data.success) {

	                   $scope.emailSent = true;
	                   $scope.emailSentError = false;
	                   $scope.emailSentErrorSpin = true;

	                }
	                else {
	                    // Check for error
	                    
	                  
	                   $scope.emailSentError = true;
	                   $scope.emailSentErrorSpin = true;
	                   $scope.buttonDisabled = false;
					   $scope.errorList1=response.data.errorMessage;

	                }

	            });
	           }		
	}]);
/*

    Handle email field for profile page only

*/

angular.module('saas')

    .directive('emailField', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-field-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldDesc:      '@', 
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldPattern:   '@',              
                fieldMin:       '@',
                fieldDisabled:  '@',
                match:          '@',
                activator:      '@',
                inputFields:    '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;
                    this.inputFields = value;
                    

                }


            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('input');
              
                // Check for field matches
                if (attrs.match) {

                    //add these two line for password match and required field

                    // $input.attr('required', 'required');
                     $label.html($label.html() + ' *');


                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                     

                } 

                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                 if (attrs.fieldMax) {

                    //add max-length
                    $input.attr('max', attrs.fieldMax);
                }

                if (attrs.fieldMin) {

                    //add max-length
                    $input.attr('min', attrs.fieldMin);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
                }

                
              

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

        	    });

	        }
	    }
	    }

    });

/*

    Handle Form field matching

    e.g. confirm password, re-enter email etc

*/

angular.module('saas')

    .directive('fieldActivator', function () {

        return {
            require: 'ngModel',
            priority: 0,
            link: function (scope, elem, attrs, ctrl) {

                // Find source field by name attribute
                var sourceField = '[name="'+attrs.fieldActivator+'"]';

                elem.on('blur', function (e) {
                    scope.$apply(function () {

                        if (!$(e.currentTarget).hasClass('ng-pristine')){
                            $(sourceField).parents('div.row').removeClass('ng-hide');
                            $(sourceField).focus();
                        }
                        
                    });
                });
            }

        }

    });

/*

    Handle Form field matching

    e.g. confirm password, re-enter email etc

*/

angular.module('saas')

    .directive('fieldMatch', function () {

        return {
            require: 'ngModel',
            priority: 0,
            link: function (scope, elem, attrs, ctrl) {

                // Find source field by name attribute
                var sourceField = '[name="'+attrs.fieldMatch+'"]';

                elem.on('blur', function () {
                    scope.$apply(function () {

                        // Is field valid - does it match source field?
                        var validity = elem.val() === $(sourceField).val();

                        // Add error var for displaying error
                        scope.hasError = !validity;

                        // Set field validity
                        ctrl.$setValidity('fieldMatch', validity);
                    });
                });
            }

        }

    });

/*

    Handle Form field loading

*/

angular.module('saas')

    .directive('formFieldAutocomplete', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-field-autocomplete-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldDesc:      '@', 
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldPattern:   '@', 
                fieldExpiry:    '@',            
                fieldMin:       '@',
                fieldDisabled:  '@',
                match:          '@',
                activator:      '@',
                inputFields:    '=',
                inputRange:     '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;
                    this.inputFields = value;                    

                }

                $scope.$watch('inputRange', function() {
                    if ( typeof $scope.inputRange === 'object' && $scope.inputRange != null ) {
                        //$scope.arrEmployeeId = [];

                        /*for (i = 0; i <= $scope.inputRange.length - 1; i++){
                            //$scope.arrEmployeeId.push( $scope.inputRange[i].employeeId );
                            $scope.arrEmployeeId.push( "{'employeeId:'" + $scope.inputRange[i].employeeId +"','employeeName':'" + $scope.inputRange[i].employeeName +"'}"); 
                        }*/

                        $scope.arrEmployeeId = $scope.inputRange;

                    }
                });

                $scope.onSelect = function ($item, $model, $label) {
                    $scope.hasError = false;
                };
                

            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('input');
              
                // Check for field matches
                if (attrs.match) {

                    //add these two line for password match and required field

                     $input.attr('required', 'required');
                     $label.html($label.html() + ' *');


                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                     

                } 

                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                 if (attrs.fieldMax) {

                    //add max-length
                    $input.attr('max', attrs.fieldMax);
                }

                if (attrs.fieldMin) {

                    //add max-length
                    $input.attr('min', attrs.fieldMin);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldExpiry) {

                    var currentDate = new Date();
                    var currentMonth = currentDate.getMonth() + 2;
                    var currentYear = currentDate.getFullYear();
                    var regex = currentMonth.toString() + '-' + currentYear;
                    if(currentMonth < 10 ) {
                        regex = '0' + currentMonth + '-' + currentYear;
                    }
                
                    $input.attr('ng-pattern', '/^(' + regex + ')|(((0[1-9])|(1[0-2]))\-((2015)|(2020)|(2021)|(2022)|(2023)|(20[1-2][5-9])))$/');
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
                }

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur keyup', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

        	        });

	        }
	    }
	    }

    });

/*

    Handle Form field loading

*/

angular.module('saas')

    .directive('formField', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-field-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldDesc:      '@', 
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                formValidateType: '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldPattern:   '@', 
                fieldExpiry:    '@',            
                fieldMin:       '@',
                fieldDisabled:  '@',
                match:          '@',
                activator:      '@',
                inputFields:    '=',
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;
                    this.inputFields = value;
                };

                //$element.bind("keydown keypress", function (event) {

                //if(event.which === 13) {
                //event.preventDefault();

                $scope.inputKeyPress = function(event){
                    if(event.which === 13){
                        event.preventDefault();
                        $scope.$emit('submitFormFromInputKeypressEvent', 'yes');
                    }
                }

            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('input');
              
                // Check for field matches
                if (attrs.match) {

                    //add these two line for password match and required field

                     $input.attr('required', 'required');
                     $label.html($label.html() + ' *');


                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                     

                } 

                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                 if (attrs.fieldMax) {

                    //add max-length
                    $input.attr('max', attrs.fieldMax);
                }

                if (attrs.fieldMin) {

                    //add max-length
                    $input.attr('min', attrs.fieldMin);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldExpiry) {

                    var currentDate = new Date();
                    var currentMonth = currentDate.getMonth() + 2;
                    var currentYear = currentDate.getFullYear();
                    var regex = currentMonth.toString() + '-' + currentYear;
                    if(currentMonth < 10 ) {
                        regex = '0' + currentMonth + '-' + currentYear;
                    }
                
                    $input.attr('ng-pattern', '/^(' + regex + ')|(((0[1-9])|(1[0-2]))\-((2015)|(2020)|(2021)|(2022)|(2023)|(20[1-2][5-9])))$/');
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
                }

                
              

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

                });

            }
        }
        }

    });

/* 

    Handle Form field loading

*/

angular.module('saas')

    .directive('formFieldInline', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-field-inline-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldMin:       '@',
                fieldPattern:   '@', 
                inputFields:    '=',
                fieldLabel:     '@'
            },
            controller: function($scope) {

                $scope.init = function (value) {

                    this.$parent.inputFields = value;

                }

            }, 

            compile: function(tElement, attrs) {

                var $input = $(tElement.children()).find('input');
                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }


                return function (scope, element, attrs, formController) {
                     var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

                });

                }


            },

            link: function (scope, element, attrs, formController) {

                var $input = $(element.children()).find('input');

 

                $(element).on('change blur', '.form-control', function (e) {

                     //debugger;

                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                        $(element).addClass('error');

                    }
                    else {
                        $(element).removeClass('error');
                    }

                });



            }
        }

    }); 


    // Only validate email after blur out of field... less annoying
    // From http://www.ng-newsletter.com/posts/validations.html and http://plnkr.co/edit/g3uuGT?p=preview
    // .directive('tqValidateAfter', [function() {
    //     var validate_class = "tq-validate";
    //     return {
    //     restrict: 'A',
    //     require: 'ngModel',
    //     link: function(scope, element, attrs, ctrl) {
    //       ctrl.validate = false;

    //       element.bind('focus', function(evt) {
    //         if(ctrl.validate && ctrl.$invalid) // if we focus and the field was invalid, keep the validation
    //         {
    //           element.addClass(validate_class);
    //           scope.$apply(function() {ctrl.validate = true;});
    //         }
    //         else
    //         {
    //           element.removeClass(validate_class);
    //           scope.$apply(function() {ctrl.validate = false;});
    //         }

    //       }).bind('blur', function(evt) {
    //         element.addClass(validate_class);
    //         scope.$apply(function() {ctrl.validate = true;});
    //       });
    //     }
    //     }
    // }]);
/*

    Handle Form field loading

*/
 
angular.module('saas')

    .directive('formPassword', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-password-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldPattern:   '@',              
                fieldMin:       '@',
                fieldDisabled:  '@',
                match:          '@',
                activator:      '@',
                inputFields:    '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;
                    this.inputFields = value;
                    

                }


            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('input');
              
                // Check for field matches
                if (attrs.match) {

                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                     

                } 

                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                 if (attrs.fieldMax) {

                    //add max-length
                    $input.attr('max', attrs.fieldMax);
                }

                if (attrs.fieldMin) {

                    //add max-length
                    $input.attr('min', attrs.fieldMin);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
                }

                
              

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

        	    });

	        }
	    }
	    }

    });

/*

    Handle Form Select loading

*/


angular.module('saas')

    // Use custom <form-select> tags
    .directive('formSelect', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^form',

            templateUrl: SaaS.location+'/docroot/assets/partials/form-select-tpl.html',

            scope: {
                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                inputFields:    '='
            },


            controller: function ($scope, $timeout) {
              var _scope = $scope;

              $scope.init = function (value) {
                if (!value) {
                  this.selectedItem = 'Please select';
                }
                else {
                  this.inputFields = value;
                  // Return capitalized version (HACKY - should have access to this.items and get key/value)
                  // currently waiting for angular to make the select box items and then select the correct text
                  // Bad, bad, bad...

                  var self = this;
                  var _value = value;

                  $timeout(function () {
                    self.selectedItem = $('option[value="'+_value+'"').text();
                  }, 100);
                }
              }

              // function _log(t, d) {
              //   console.info('%c%s%c: %o', 'font-weight:bold;color:fuchsia', t, 'font-weight:normal;color:black', d)
              // }

              // $scope.onUpdate = function(data) {
              //   _log('onUpdate', { data: data, inputFields: _scope.inputFields, selectedItem: _scope.selectedItem })
              // }

              $scope.$watch('inputFields', function(value, oldVal) {
                // When value changes update selectedItem variable (display name)
                // Fired in provisioning flow when updating user details
                // _log('$watch - inputFields', { value, oldVal, _scope })

                // Update the selected item in <span>
                _scope.selectedItem = 'Please select';

                if (value && value !== oldVal) {
                  _scope.items.forEach(function(item) {
                    if (item.value === value) {
                      _scope.selectedItem = item.label
                    }
                  })
                }

                // Required to make sure regular forms work with this crappy directive.
                $('[name="' + $scope.fieldName + '"]').val()
              });
            },


            link: function(scope, element, attrs, formController) {
                var items = [];

                var el = $('.' + $(element).attr('id'));

                // Set model items to select options
                _.each(el, function (option) {
                  items.push({
                    value: option.value,
                    label: $(option).attr("data")
                  })
                });

                // Remove initial items
                el.remove();

                // Set items to data
                scope.items = items;

                // Bind to change & blur events and check for class
                $(element).on('change blur', '.form-control', function (e) {
                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {
                        $(element).addClass('error');
                        $(element).find('.col-sm-6.error').removeClass('hidden');
                        $(element).find('span.input-lg').addClass('error');
                    }
                    else if($(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).attr('required') == 'required'){
                        // Error for required pristine field
                        $(element).addClass('error');
                        $(element).find('.col-sm-6.error').removeClass('hidden');
                        $(element).find('span.input-lg').addClass('error');
                    }
                    else {
                        $(element).removeClass('error');
                        $(element).find('.col-sm-6.error').addClass('hidden');
                        $(element).find('span.input-lg').removeClass('error');
                    }
                });

                $(element).on('focus', '.form-control', function (e) {
                    $(element).find('span.input-lg').addClass('focused');
                });

                $(element).on('blur', '.form-control', function (e) {
                    $(element).find('span.input-lg').removeClass('focused');
                });

            }
        }

    });

/*

    Handle Form Select loading

*/

angular.module('saas')

    .directive('formSelectInline', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-select-inline-tpl.html',
            replace: true,
            transclude: true,
            require: '^form',
            scope: {
                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                inputFields:    '=',
                optionsFromJson:'=',
                inlineAjaxUrl:  '@',
                inlineAjaxFn:   '&',
                inlineSubmit:   '@',
                inputDisabled:  '='
            },
            controller: function ($scope, $element, $timeout) {

                $scope.init = function (value) {


                    if (!value) {
                        this.selectedItem = 'Please select';
                    }
                    else {
                        this.inputFields = value;
                        // Return capitalized version (HACKY - should have access to this.items and get key/value)
                        // currently waiting for angular to make the select box items and then select the correct text
                        // Bad, bad, bad...

                        var self = this;
                        var _value = value;

                        $timeout(function () {

                            // The selector is to stop causing issues with repeated output on page:
                            self.selectedItem = $('option[value="'+_value+'"]:first').text();

                        }, 100);

                    }

                }


                

                // Update the selected item in <span>
                $scope.onUpdate = function (options) {

                    this.selectedItem = this.items[options.selectedItem];
                    
                    if($scope.inlineSubmit){
                        $element.closest("form").submit();
                    }
                }



                var _scope = $scope;

                $scope.$watch('inputFields', function (value, oldVal) {

                    // When value changes update selectedItem variable (display name)
                    // Fired in provisioning flow when updating user details

                    if (!value) {
                        _scope.selectedItem = 'Please select';
                    }
                    else {
                        _scope.selectedItem = _scope.items[value];
                    }

                });

                // Watch for changes to options for select
                $scope.$watch('optionsFromJson', function (value, oldVal) {
                    // Re make options if a change
                    var items = {}

                   if (typeof _scope.optionsFromJson !== 'undefined') {
                        
                        _.each(value, function (option) {
                            //console.log('here is option: ', value);
                            items[option.id] = option.value;
                            //console.log(option.id, option.value);
                        });

                        _scope.items = items;

                    }
                });

            },
            link: function (scope, element, attrs, formController) {
                 
                
                var items = {};
                var className = $(element).attr('id');
            
                var el = $('.'+className);
                
                // Set model items to select options
                // Checks to see if options from json attribute is used
                if (typeof scope.optionsFromJson !== 'undefined') {
                   

                    // Must be in the format of [{id: 1, value: ''}, ...]
                    // Loops through and adds to options
                    _.each(scope.optionsFromJson, function (option) {
                        
                        items[option.id] = option.value;
                        //console.log(option.id, option.value);
                    });

                }else{
                    // Grabs current options and adds into angular options before clearing later
                    _.each(el, function (option) {
                         
                        items[option.value] = $(option).attr("data");
                        
                    });

                }

                // Remove initial items
                el.remove();

                // Set items to data
                scope.items = items;

                // HACKY:
                // Bind to change & blur events and check for class
                // var $frmElem = $(element).find('.form-control');

                // Custom way to set error state styles to selct
                $(element).on('change blur', '.form-control', function (e) {

                    // debugger;

                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                        $(element).addClass('error');
                        $(element).find('.col-sm-5.error').removeClass('hidden');
                        // scope.isError = true;

                    }
                    else {
                        $(element).removeClass('error');
                        $(element).find('.col-sm-5.error').addClass('hidden');
                        // scope.isError = false;

                    }

                });
                // Custom way of setting focus styles on select
                $(element).on('focus', '.form-control', function (e) {
                    $(element).find('span.input-lg').addClass('focused');
                });
                // Custom way of unsetting focus styles on select
                $(element).on('blur', '.form-control', function (e) {
                    $(element).find('span.input-lg').removeClass('focused');
                });

            }
        }

    });
/*

    Handle Form Textarea loading

*/

angular.module('saas')

    .directive('formTextarea', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/textarea-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                match:          '@',
                inputFields:    '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;

                }

            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('textarea');

                // Check for field matches
                if (attrs.match) {

                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                }

                if (attrs.fieldMaxLength) {

                    //add max-length
                     $(tElement.children()).find('textarea').attr('maxlength', attrs.fieldMaxLength); 
                }

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });
                        }

                    });
                };
            }

        }

    });

/*

    Password validation
*/

angular.module('saas')

    .directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function($scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                $scope.pwdValidLength = (viewValue && viewValue.length >= 7 ? 'valid' : undefined);
                $scope.pwdHasLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
                $scope.pwdHasLowLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
                $scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if($scope.pwdValidLength && $scope.pwdHasLowLetter && $scope.pwdHasLetter && $scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
});
// Accordion module
/*
 * Modified version of
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/
*/
// taken from bootstrap accordion and seperated as it has been adapted to our use and to be used with template partials

angular.module('accordionModule', ['ui.bootstrap.collapse']);
angular.module('accordionModule')

.constant('accordionConfig', {
  closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };
  
  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  };

}]);

angular.module('accordionModule')

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'EA',
    controller:'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: SaaS.location+'/docroot/assets/partials/accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', function($parse) {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl: SaaS.location+'/docroot/assets/partials/accordion-group.html',
    scope:{ 
      heading:'@',
      initiallyOpen: '=?'

    },        // Create an isolated scope and interpolate the heading attribute onto this scope
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {

      var getIsOpen, setIsOpen;

      accordionCtrl.addGroup(scope);

      if(scope.initiallyOpen) {
        
          scope.isOpen = true;
      }

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
      });

      //scope.isOpen = false;

      /*if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;
        scope.$parent.$watch(getIsOpen, function(value) {
          scope.isOpen = !!value;
        });
      }*/

      /*scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
        if ( setIsOpen ) {
          setIsOpen(scope.$parent, value);
        }
      });*/

    }
  };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    compile: function(element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      };
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          //element.html('');
          element.append(heading);
        }
      });
    }
  };
});
/*

    Handle individual select boxes
    ie. NOT in a form

*/

angular.module('saas')

    // .controller('saasSelectCtrl', function ($scope) {


    // })

    .directive('saasSelect', function() {
        return {
            restrict: 'A',
            templateUrl: SaaS.location+'/docroot/assets/partials/select-tpl.html',
            transclude: true,
            replace: true,
            scope: true,
            link: function ($scope, elem, attrs) {

                debugger;

                var items = [];

                // Set model items to select options
                _.each(elem.find('select').find('option'), function (option) {

                    items.push({
                        id: option.value,
                        name: option.text
                    });

                });

                // Remove initial items
                elem.find('select').find('option').remove();

                // Set items to data
                $scope.items = items;

            },
            controller: function ($scope) {
                // Set inital item list
                $scope.items = [];

                // Set default text
                $scope.selectedItem = { id: 0, name: 'Please Select'};
            }
        }
    });
// Product Grid module

angular.module('videoModule', []);

var ModalInstanceCtrl = function ($scope, $modalInstance, confirmMessage) {
//var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
	// EB-1704 - display message according to the confirmMessage instead of hardcoded one.
	// and display default when confirmMessage variable is undefined or empty
   if (typeof confirmMessage === 'undefined' || confirmMessage === '') 
   {
	   confirmMessage = 'Are you sure you want to proceed with this action?';
   }
   $scope.confirmMessage = confirmMessage;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
angular.module('videoModule')

.directive('videoLink', function(){
    return{
        restrict: 'EA',
        transclude: true,
        templateUrl: SaaS.location+'/docroot/assets/partials/video-link.html',
        //controller:'videoController',
        controller: function($scope, $modal, $log) {
          //$scope.items = ['item1', 'item2', 'item3'];
          $scope.open = function () {

            var modalInstance = $modal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
            });

            // modalInstance.result.then(function (selectedItem) {
            //   $scope.selected = selectedItem;
            // }, function () {
            //   $log.info('Modal dismissed at: ' + new Date());
            // });
          };
        },
        replace: true
    }
});
// Header module

angular.module('headerNavModule', []);
angular.module( 'headerNavModule' ).directive( 'saasHeaderNav', function() {

    return {
        restrict: 'A',
        link: function( $scope, el, attr ) {


            var $links = $( el ).children();
            var $rollovers = $( el ).find( '.rollover' );

            // Link rollovers
            $links.bind( 'mouseover', function( e ) {

                $( e.currentTarget ).children().filter( 'div' ).show();

            } );

            // Leave the list
            el.find( 'li' ).bind( 'mouseout', function( e ) {

                $rollovers.hide();

            } );

        }
    }
} );

// Telesales Search module

angular.module('teleSearchModule', []);
angular.module('teleSearchModule')

    .controller('teleSearchCtrl', ['$scope', 'teleSearchService', function ($scope, teleSearchService) {

        // Define list of results
        $scope.results = [];

        // Define current visible result
        $scope.currentResults = {};


        // Handle form submit by enter key
        $scope.onEnterSubmit = function (e) {

            if (event.keyCode === 13) {

                var options = $scope.getOptions(e);
                $scope.searchCustomers(options);

            }
        }


        // Click event
        $scope.searchCustomers = function () {

            var options = $scope.getOptions(event);
            $scope.getUserDetails(options)

        }

        // Build ajax options
        $scope.getOptions = function (event) {

            var options = {};

            var $input = $(event.currentTarget).parent().find('input');

            // Options can include _csrf.token & headerName
            options.token = $input.attr('data-token');
            options.header = $input.attr('data-header');

            return options;
        }


        $scope.getUserDetails = function(options) {

            // TODO: show spinner

            if ($scope.keywords && $scope.keywords !== ' ') {

                var postData = {
                    "email": $scope.keywords
                };

                teleSearchService.getUserDetails(postData, options).then(function (data) {

                    // TODO: remove spinner

                    debugger;

                    // DEBUGGING
                    // $scope.getRandomData(data);

                    if (!data.results) {

                        // Clear input
                        $scope.keywords = '';

                        // Nothing found so just stop
                        return false;
                    }

                    // Process AJAX results
                    var result = {
                        id: $scope.index,
                        keywords: $scope.keywords,
                        data: data.results
                    }

                    // add to results list
                    $scope.results.push(result);

                    // Save current pane
                    $scope.currentResults = result;

                    // Clear input
                    $scope.keywords = '';

                    // update ID index
                    $scope.index++;

                });
            }

        }

        $scope.getRandomData = function(realData) {

            var randomData = [
                {
                    "id": 10,
                    "name": "random 1",
                    "accountNo": "32185",
                    "company": "Random company 1",
                    "billingInfo": "Annual"
                },
                {
                    "id": 20,
                    "name": "random 2",
                    "accountNo": "32185",
                    "company": "Random company 2",
                    "billingInfo": "Annual"
                },
                {
                    "id": 30,
                    "name": "random 3",
                    "accountNo": "32185",
                    "company": "Random company 3",
                    "billingInfo": "Annual"
                },
                {
                    "id": 40,
                    "name": "random 4",
                    "accountNo": "32185",
                    "company": "Random company 4",
                    "billingInfo": "Annual"
                },
                {
                    "id": 50,
                    "name": "random 5",
                    "accountNo": "32185",
                    "company": "Random company 5",
                    "billingInfo": "Annual"
                }
            ]

            // return random item
            var items = _.sample(randomData, _.random(1, randomData.length));

            _.each(items, function (item) {
                realData.results.push(item);
            });

        }


        $scope.showTab = function (id) {

            // Find result with same ID as clicked element

            var data = _.filter($scope.results, function (result) {

                return result.id === id;

            });

            // update currentResults with the data for this ID
            $scope.currentResults = data[0];

        }


        $scope.removeTab = function (id) {

            // get results list without clicked item in it
            var data = _.reject($scope.results, function (result) {

                return result.id === id;

            });

            $scope.results = data;


            // if user has closed current tab
            if ($scope.currentResults.id === id) {

                var index = $(event.currentTarget).parent().index();

                if (index > 0) {
                    // items still available
                    $scope.currentResults = $scope.results[index-1];
                }
                else {
                    // last item
                    $scope.currentResults = {};
                }

            }

        }


        $scope.clearSearches = function () {

            // Reset form and remove searches
            $scope.results = [];
            $scope.currentResults = {};
        }

}]);
// Mange users module

var manageUsersModule = angular.module('manageUsersModule', []);
angular.module('manageUsersModule')

    .controller('manageUsersCtrl', ['$scope', 'postService', '$modal', function ($scope, postService, $modal) {

        // Define list of results
        $scope.results = json;

        // Define current visible result
        $scope.currentResults = $scope.results;
        // Init current tab to null
        $scope.currentTab = "";
        // Init tabArray to empty object
        $scope.currentTabArray = [];
        // Init error header to empty
        $scope.ajaxErrorHeader = "";

        $scope.processTab = function(array){
            //check if tab being clicked for a second time (to turn off)
            if($scope.currentTabArray[0] === array[0]){
                //reset
                $scope.currentTabArray = [];
            }else{
                //set to clicked tab array
                $scope.currentTabArray = array;
            }
        }

        //var dataUrls = $($event.currentTarget).parents('form').attr('data-ajax-urls');

        $scope.changeUserGroup = function (userId, value, url, userGroupId){
            if( value == 189){
                $('select#role-'+ userId).hide();
                var modalInstance = $modal.open({
                  templateUrl: SaaS.location+'/docroot/assets/partials/confirm-unassign-modal.html',
                  controller: ModalInstanceCtrl,
                   resolve: {
                     confirmMessage: function () {
                       return "WARNING: You're about to allow this person to subscribe to apps and software, as well as cancel subscriptions. When they subscribe to things, they'll use the payment method you set up on this account. Would you like to go ahead?";
                     }
                   }
                });
                modalInstance.result.then(function (selectedItem) {

                   $scope.prepareAjaxCall(userId, value, url);
              
                }, function () {
                                        
                    window.location.href = window.location.href + '?openUserAccordion='+ userId;
                    return false;

                });
            }else{
                
                $scope.prepareAjaxCall(userId, value, url);
                
            }
           
        }

        $scope.prepareAjaxCall = function(userId, value, url){
            //Set ajax URL from options sent through
            var ajaxURL = url + userId + '/' + value;
            // Create data object so that postData in return object is ready to use in callbacks
            var data = {};
            data.userId = userId;
            data.value = value;
            data.origin = "Change Group";
            
            // Make the Ajax call
            $scope.makeAjaxCall(ajaxURL, data);

        }

        $scope.changeUserStatus = function (userId, value, url){
            
            var ajaxURL = url + userId + '/' + value;
            // Create data object so that postData in return object is ready to use in callbacks
            var data = {};
            data.userId = userId;
            data.value = value;
            data.origin = "Change Status";
            
            // Make the Ajax call
            $scope.makeAjaxCall(ajaxURL, data);

        }

        $scope.unsubscribeProduct = function (userId, value, url){
            
            var ajaxURL = url + userId + '/' + value;
            // Create data object so that postData in return object is ready to use in callbacks
            var data = {};
            data.userId = userId;
            data.value = value;
            data.origin = "Unsubscribe Product";

            // Set a function to run on a custom callback
            var callback = $scope.unsubscribeProductCallback;

            // Make the Ajax call
            $scope.makeAjaxCall(ajaxURL, data, callback);

        }

        $scope.removeUser = function (event, userId) {

            // Handle 'remove User' button
            $scope.open(event, userId);
            

        }


         $scope.open = function (event, userId) {
           

            var modalInstance = $modal.open({
              templateUrl: SaaS.location+'/docroot/assets/partials/confirm-unassign-modal.html',
              controller: ModalInstanceCtrl,
               resolve: {
                 confirmMessage: function () {
                   return "WARNING: If you choose to remove this person, any data they've put into apps they're assigned to will be lost. Their entire profile will be deleted from your Business Apps account. Are you sure you want to go ahead and do this?";
                 }
               }
            });

            modalInstance.result.then(function (selectedItem) {
                
                var data = {};
                data.userId = userId;
                data.origin = "Remove User";

                // // save local copy
                // var _scope = $scope;

                var ajaxURL = $(event.currentTarget).attr('data-path');

                var callback = $scope.removeUserCallback;

                $scope.makeAjaxCall(ajaxURL, data, callback);



            }, function () {
                
                return false;

            });
        }

        $scope.unsubscribeProductCallback = function(response){

            // Hunt to find the original product clicked
            angular.forEach($scope.results.users, function(userObject, key){
                
                // Loop all users until response user is found
                if(userObject.id == response.postData.userId){
                    
                    // Once found loop all products
                    angular.forEach(userObject.products, function(product, key){

                        // Once found remove from scope
                        if(product.productId == response.postData.value){
                            userObject.products.splice( $.inArray(product,userObject.products) ,1 );
                        }
                    });

                }

            });
            
        }

        $scope.removeUserCallback = function(response){
            // success so remove user

            // Find the user in results, based on id
            var newUsers = _.reject($scope.results.users, function(el) {
                return el.id === response.postData.userId;
            });

            // remove user
            $scope.results.users = newUsers;

            $scope.currentTab = "";
            $scope.currentTabArray = [];

            // Remove from current users
            newUsers = _.reject($scope.currentResults.users, function(el) {
                return el.id === response.postData.userId;
            });

            // remove the user
            $scope.currentResults.users = newUsers;
        }

        $scope.makeAjaxCall = function(ajaxURL, data, callbackFn){

            var options = {};

            // Options can include _csrf.token & headerName
            options.token = $scope.serverToken;
            options.header = $scope.serverHeader;

            postService.postData(ajaxURL, data, options).then(function (response) {

                if (response.data.success) {
                    
                    // Reset error
                    $scope.ajaxErrorHeader = '';

                    // Check to see if there is a custom callback
                    if(callbackFn){
                        // Run custom callback
                        callbackFn(response);
                    }

                }
                else {
                    // If there is an error set model vars to show in UI (if applicable)
                    $scope.ajaxErrorHeader = data.origin;
                    $scope.ajaxErrorMessage = response.data.error;
                }

            });

        }

    }])

    .filter('userFilter', function() {
        //custom filter
      return function(users, searchText, currentTabArray) {
        //set up the regex to search against search term loosely
        var searchRegx = new RegExp(searchText, "i");
        //check if any search terms or tabs are selected
        if (searchText == undefined && currentTabArray == []) {
            //If not return whole user list
            return users;
        }
        //if search criteria, set up empty return object
        var result = [];
        //loop throug all users
        for(i = 0; i < users.length; i++) {
            //group first and last name
            var fullName = users[i].firstName + " " + users[i].lastName;
            //first check search term against email and name
            if (fullName.search(searchRegx) != -1 ||
                users[i].email.search(searchText) != -1) {
                //check if there is a tab selected
                if(currentTabArray.length){
                    //if so grab first letter of last name
                    var firstLetter = users[i].lastName.substring(0,1).toLowerCase();
                    //check if current last name first letter matches current array of allowed letters
                    if(currentTabArray.indexOf(firstLetter) > -1){
                        //if yes push into shown array
                        result.push(users[i]);
                    }
                }else{
                    //no tab selected add this to shown list
                    result.push(users[i]);
                }

            }
        }
        //return user list to be shown
        return result;
      }
    });
// Invite users module

angular.module('inviteUsersModule', []);
angular.module('inviteUsersModule')
.controller('inviteUsersCtrl', ['$scope', function ($scope) {

    $scope.newUserList = {
        'users': json
    };
    
    $scope.addUser = function(array){

        var newUser =
        {
            'firstname': '',
            'lastname': '',
            'email': '',
            'role': ''
        };

        $scope.newUserList.users.push(newUser);
    }

    $scope.removeUser = function(id){
        var user_to_remove = $scope.newUserList[id];
        $scope.newUserList.users.splice(id, 1);
    }

    $scope.submitNewUserList = function(){
        //console.log('your list sir',$scope.newUserList)
    }

    $scope.TooltipDemoCtrl = function ($scope) {
      $scope.dynamicTooltip = 'about role';
    };



}]);
// Tab Accordion module

angular.module('tabAccordionModule', []);
angular.module('tabAccordionModule').directive('tabAccordion', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var tabs = $scope.tabs = [];

        $scope.select = function(tab) {
          angular.forEach(tabs, function(tab) {
            tab.isOpen = false;
          });
          tab.isOpen = true;
        }

        this.returnSelect = function(tab) {
            $scope.select(tab);
        }

        this.addTab = function(tab) {
          if (tabs.length == 0) $scope.select(tab);
          tabs.push(tab);
        }
      },
      templateUrl: SaaS.location+'/docroot/assets/partials/tab-accordion-wrapper.html',
      replace: true
    };
  })

  .directive('tab', function() {
    return {
      require: '^tabAccordion',
      restrict: 'E',
      transclude: true,
      scope: {
            title: '@'
       },
      link: function(scope, element, attrs, tabsAccordionCtrl) {

        //scope.isOpen = false;
        tabsAccordionCtrl.addTab(scope);

        scope.$watch('isOpen', function(value) {
          if ( value ) {
            tabsAccordionCtrl.returnSelect(scope);
          }
        });
      },
      templateUrl: SaaS.location+'/docroot/assets/partials/tab-accordion-tab.html',
      replace: true
    };
});

// Product Grid module

angular.module('productGridModule', []);

angular.module('productGridModule').controller('productGridCtrl', ['$scope', 'KKDataService', function ($scope, KKDataService) {

    KKDataService.getAllProducts().then(function (data) {

        $scope.products = data.r.productArray;

    });

    // DEBUGGING
    var options = {
        storeId: 'store2',
        custId: -62
    };

    KKDataService.addBasketItem(options).then(function (data) {

        // Add a test item to the basket...

        //console.log('addBasketItem', data);


        KKDataService.getBasketItems(options).then(function (data) {

            // ...then do a request to get the basket items back

            //console.log('getBasketItems', data);

        });

    })

}]);

angular.module('productGridModule').directive('saasProductGrid', function() {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: SaaS.location+'/docroot/assets/partials/product-grid-tpl.html',
        link: function ($scope, el, attr) {

            // Do click events

            // and UI interactions
            $scope.increment = function(item){
			    item.clickCount += 1;
			}
        }
    }
});

// drawer info box module

angular.module('drawerBoxModule', [])

    .filter('grouped', function() {
      
      return function(input, itemsPerRow) {
           
          
          if (itemsPerRow === undefined) {
        
            itemsPerRow = 1;
          }
      
        var out = [];
      
        for (var i = 0; i < input.length; i++) {
        
          var rowElementIndex = i % itemsPerRow;
          var indexRow = (i - rowElementIndex) / itemsPerRow;
          var row;
          
          if (rowElementIndex === 0) {
            
              row = [];
              out[indexRow] = row;
          
          } else {
              
              row = out[indexRow];
          }
        
          row[rowElementIndex] = input[i];
        }
        
      return out;
    };
  }); 
angular.module('drawerBoxModule')
.config(['$sceProvider',
  function ( $sceProvider ) {
     $sceProvider.enabled(false);
    }]);

angular.module('drawerBoxModule').directive('swfTemplate', function(){
    return {
        link: function($scope, element, attrs) {
            
            if($scope.item.ui.boxVideoSwf){
                element.html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="281"><param name="loop" value="false"><param name="movie" value="' + $scope.item.ui.boxVideoSwf + '"><embed pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="281" loop="false" src="' + $scope.item.ui.boxVideoSwf + '"></embed></object>');
            }else{
                element.html(''); 
            }
        }
    };
})

angular.module('drawerBoxModule').controller('drawerBoxCtrl', ['$scope','$sce','postService', function ($scope, $sce, postService) {

     // $scope.theUrl = "https://stage-cloudsaasportal.global.ssl.fastly.net/dam/marketplace/Sageone_payroll/SageOnePayrollProdMarketingVideo1920x1080_20sec.mp4";

      this.objects = products;

      $scope.snippet ="<ul><li> one </li><li> two </li><li> three </li></ul>";
      $scope.items = [];
      while (this.objects.length) {
          $scope.items.push(this.objects.splice(0, 3))

      }

      $scope.drawerContentURL = 'partials/item.html';
      $scope.currentItem = null;
      //$scope.rowIndex = 0;
     // $scope.displayIndex = null;
     $scope.display0= true;

      $scope.display1= false;

      $scope.setCurrentItem = function (item) { 
        $scope.currentItem = item;
      };

      $scope.closeDrawerBox = function() { 
        $scope.currentItem = null;
       // $scope.displayIndex = null;
      };

      $scope.renderToHtml = function(htmlString) {
        return $sce.trustAsHtml(htmlString);
      };

      $scope.trustThisSource = function(theUrl) {
        
        return $sce.trustAsResourceUrl(theUrl);
      };

      $scope.displayCurrentItem = function (item) { 
        
        $scope['display'+item] = !$scope['display'+item];
        if(item == '0'){
          $scope.display1= false;
        }
        if(item == '1'){
          $scope.display0= false;
        }
      };

    //$scope.displayVideo = false;

   

    $scope.playVideo = function(elementId, event){

        var videoElement = document.getElementById('vid-'+elementId);  

        $("video").each(function () {
          if(navigator.appVersion.indexOf("MSIE 8.") ==   -1){
              this.pause(); 
          }
       });
        $(event.target).hide();
        $(videoElement).show();

        if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {
                
            //$scope.displayVideo = true; 
        }

        else {
       
            var videoElement = document.getElementById('vid-'+elementId);  
            $(event.target).hide();
            $(videoElement).show();
            var source = $(videoElement).find('source');
            

            var mp4Video = source[0];
            mp4Video.src = $(mp4Video).attr('id'); 
            var ogvVideo = source[1];
            ogvVideo.src = $(ogvVideo).attr('id'); 

            videoElement.load();
            if( navigator.userAgent.match(/Android/i)
              || navigator.userAgent.match(/webOS/i)
              || navigator.userAgent.match(/iPhone/i)
              || navigator.userAgent.match(/iPad/i)
              || navigator.userAgent.match(/iPod/i)
              || navigator.userAgent.match(/BlackBerry/i)
              || navigator.userAgent.match(/Windows Phone/i)
             ){
                      if (videoElement.requestFullscreen) { 
                            videoElement.requestFullscreen();
                          } else if (videoElement.mozRequestFullScreen) {
                            videoElement.mozRequestFullScreen();
                          } else if (videoElement.webkitRequestFullscreen) {                          
                            videoElement.webkitRequestFullscreen();
                          }
              }

            videoElement.play();

        }
        
    }


/* Remove Product from users home page */

    $scope.removeProduct = function(event, index, productID) {

        var data = {};

        data.productID = productID;

        //alert(productID);

        var ajaxURL = $(event.currentTarget).attr('data-path');
        var callback = $scope.removeLeadsFromList;
        $scope.makeAjaxCall(index, ajaxURL, data, callback);

        //console.log(data);
        //console.log(ajaxURL);
    }

    $scope.makeAjaxCall = function(index, ajaxURL, data, callbackFn){

        var options = {};

        // Options can include _csrf.token & headerName
        options.token = $scope.serverToken;
        options.header = $scope.serverHeader;
        postService.postData(ajaxURL, data, options).then(function (response) {
        $scope.removeProductsFromList(data);  

       });

    }

        $scope.removeProductsFromList = function(data){

            var myid = data.productID;
            $scope['expiredProduct' + myid] = true;
       

        }


}]);

// ------------------------------------------------------------------------
// Angular controller for product table

function voucherAppController($scope, $http) {

  // create a blank object to hold our form information
  // $scope will allow this to pass between controller and view
  $scope.message = null;
  $scope.doubleClick = false;

  $scope.couponNumber = null;
  $scope.couponApplied = false;

  $scope.items = prods;
  $scope.prodId = $scope.items.product.id;
  $scope.prodQuantity = 1;
  $scope.price = null;


  $scope.disableDoubleClick = function(event) {
    if ($scope.doubleClick) {
      event.preventDefault();
    }
    else {
      $scope.doubleClick = true;
    }
  };


  // process the form
  $scope.processForm = function(ajaxUrl) {
    var params = $scope.prodId + '/' + $scope.couponNumber + '/' + $scope.prodQuantity;

    $http.get(ajaxUrl + params)
      .success(function(data) {
        if (!data.success) {
          // if not successful, bind errors to error variables
          $scope.message = data.errorMessage;
        }
        else {
          // if successful, bind success message to message
          $scope.message = "Your voucher has been applied.";
          $scope.price = data.price;
          $scope.couponApplied = true;
        }
      });
  };


  $scope.updateProdId = function(prodId, price, fixreadonly) {
    $scope['prodQuantity' + $scope.prodId] = 0;

    if (fixreadonly) {
      $('.productspage-qty-input').attr('readonly', 'readonly')
      $('#prod' + prodId + 'Quantity').removeAttr('readonly')
    }

    $scope.prodId = prodId;
    $scope.kkProductId = prodId;
    $scope.price = price;
    $scope['prodQuantity' + prodId] = 1;
    $scope.prodQuantity = 1;
  };


  $scope.updateQuantity = function(prodId) {
    if ($scope.prodId == prodId) {
      $scope.prodQuantity = document.getElementById("prod" + prodId + "Quantity").value;
    }
  }
}


// ------------------------------------------------------------------------
// Define angular module

angular.module('voucherApp', [])
  .controller('voucherAppController', voucherAppController);


// Provisioning module

angular.module('provisioningModule', []);
angular.module('provisioningModule')

    .controller('provisioningCtrl', ['$scope', 'provisioningService', '$element', '$timeout', function ($scope, provisioningService, $element, $timeout) {

        // Set initial state to empty - match to first form

        $scope.ajaxUrlProvisioning = "";

        /*$scope.$watch('radioSwitch', function() {
            if ( $scope.radioSwitch == "yes") {
                ajaxUrlProvisioning = "rest/selfServeProvisioning/validateMember";
               
                

            }else {
                ajaxUrlProvisioning = "rest/selfServeProvisioning/validateNonMember";
               
            };
        });*/

        $scope.isLoading = false;
        $scope.guesses = 0;
        $scope.BasicInfo = false;
        $scope.doubleClick = false;
        $scope.agentRefNo = '';
        $scope.quantity1 = '';

        $scope.updateAgentRefNo = function(agenRefNumber) {
            
            $scope.agentRefNo = agenRefNumber;
        };

        $scope.disableDoubleClick = function(event) {
            if ( $scope.doubleClick == true) {
                event.preventDefault();
            }else{
                $scope.doubleClick = true;
            }
        };

        $scope.$on('submitFormFromInputKeypressEvent', function(event, data) { 
            if ( data == "yes") {
                event.preventDefault();
                if ( $scope.radioSwitch == "yes" ) {

                    if ( $scope.form1.$valid == true) {
                        $timeout(function() {
                            angular.element('#provisioningValidateMember').triggerHandler('click');
                        }, 0);    
                    };

                }else if ( $scope.radioSwitch == false ) {
                    if ( $scope.form2.$valid == true) {
                        $timeout(function() {
                            angular.element('#provisioningNonValidateMember').triggerHandler('click');
                        }, 0);    
                    };

                };
            }; 
        }); 

    // disabled next button if clicked twice
        $scope.disableNextButton =  function(){
            
            $scope.BasicInfo = false;

            return true;

        }


	if(typeof initialDefinedState != "undefined"){
		$scope.state = initialDefinedState;
	}else{
		 $scope.state = '';   
	}
	


      $scope.money = 0;
	    //debugger;

        $scope.inlineSubmit = function (targetState) {


            // Show target state inline (without ajax or refresh)

            event.preventDefault();

            $scope.state = targetState;

        }


        $scope.ajaxSubmit = function (event, ajaxURL) {


            event.preventDefault();

            $scope.isLoading = true;

            // Format provisioning data:
            //debugger;

            // Set product to string before passing back to server
            // $scope.productJson = $scope.product.stringify();

            // Wrap data in 'user' object
            var data = {
                'user': $scope.user,
        		'product': $scope.product,
        		'kkProduct': $scope.kkProduct,
        		'productJson': $scope.productJson,
    			'accountJson': $scope.accountJson,
    			'billingPostcode':$scope.billingPostcode,
    			'emailToPurchase':$scope.emailToPurchase,
    			'sendEmailToMaster':$scope.sendEmailToMaster,
    			'continueWithExistingAccount':$scope.continueWithExistingAccount,
    			'memorableQuestionId':$scope.memorableQuestionId,
    			'emailMaster':$scope.emailMaster,
    			'editPaymentDetails':$scope.editPaymentDetails,
    			'account':$scope.account,
    			'eeCRMFound':$scope.eeCRMFound,
    			'eeBrand':$scope.eeBrand,
    			'eeSegment':$scope.eeSegment,
    			'failedAttempts':$scope.failedAttempts,
    			'error':$scope.error,
    			'setUpNewCompany':$scope.setUpNewCompany,
    			'setUpNewMaster':$scope.setUpNewMaster,
    			'state':$scope.state
                };


            // Prepare data for submit:
            // Remove any email confirmation - only required for FE validation
            delete data.user['confirmEmail'];
            // Remove secret question check - only required for FE validation
            delete data.user['memorableAnswerCheck'];


            var options = {};

            var $input = $(event.currentTarget).parents('form').find('input[type="hidden"]');

            // Options can include _csrf.token & headerName
            options.token = $input.val();
            options.header = $input.attr('data_header');

            //provisioningService.postProvisioningData(ajaxURL, $scope.data).then(function (data) {
            provisioningService.postProvisioningData(ajaxURL, data, options).then(function (data) {

                //debugger;

                // On success:

                $scope.isLoading = false;

                // Put returned data into scope
                $scope.title = data.title;
                $scope.user = data.user;
        		$scope.error = data.error;
        		$scope.productJson = data.productJson;
        		$scope.accountJson = data.accountJson;
        		$scope.billingPostcode = data.billingPostcode;
        		$scope.emailToPurchase = data.emailToPurchase;
        		$scope.sendEmailToMaster = data.sendEmailToMaster;
        		$scope.continueWithExistingAccount = data.continueWithExistingAccount;
        		$scope.memorableQuestionId = data.memorableQuestionId;
        		$scope.emailMaster = data.emailMaster;
        		$scope.editPaymentDetails = data.editPaymentDetails;
        		$scope.account = data.account;    
        		$scope.eeCRMFound = data.eeCRMFound;
        		$scope.eeBrand = data.eeBrand;
        		$scope.eeSegment = data.eeSegment;
        		$scope.failedAttempts = data.failedAttempts;
        		$scope.error = data.error;
        		$scope.setUpNewCompany = data.setUpNewCompany;
        		$scope.setUpNewMaster = data.setUpNewMaster;
        		$scope.state = data.state;

                // Process product JSON into object
                $scope.product = $scope.getDataFromJSON(data.productJson);

                // Move to next page/form
                $scope.inlineSubmit(data.state); 

            });

        return false;

        }


        $scope.getDataFromJSON = function(dataStr) {

            // Parse JSON string into actual JSON
            var data = JSON && JSON.parse(dataStr) || $.parseJSON(dataStr);

            return data;
        }


        $scope.checkMemorableAnswer = function (path) {

            $scope.guesses += 1;

            if ($scope.user.memorableAnswerCheck === $scope.user.memorableAnswer) {
                $('form[name=captureAdditionalInfo]').submit();
            }

        }


        // Custom validation

        $scope.paymentModulusValid = function () {

            //debugger;

            // Confirm that all DD details are correct before modulus check
            // return (paymentDetails.user.holderName.$valid && all other fields);
            return (paymentDetails.user.holderName.$valid);

        }

        $scope.doModulusCheck = function () {

            // Do modulus check
            // TODO:

            // if successful
            $scope.modulusCheck = true;

        }


        $scope.setupDirectDebit = function () {

            // TODO: do check & set up

            $scope.inlineSubmit('ddSuccess');

        }


        $scope.validateCCDetails = function () {

            // TODO: Validate form fields

        }


        $scope.makeCCPayment = function () {

            // TODO: Make Credit card payment through service and deal with response

        }

    }]);

// Payment Form module

angular.module('paymentModule', ['ngSanitize']);
angular.module('paymentModule')

    .controller('paymentCtrl', ['$scope', '$sce', '$compile', function ($scope, $sce, $compile) {

        // Get initial data into scope
        $scope.formData = json || {};
        $scope.modulusCheck = false;
        $scope.modulusCheckNO = false; 
        $scope.validateResult = true;
        $scope.doubleClick = false;
        // Fix issue setting form action to URL with different domain

        $scope.disableDoubleClick = function(event) {
            if ( $scope.doubleClick == true) {
                event.preventDefault();
            }else{
                $scope.doubleClick = true;
            }
        };

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.findAddressFromPostcode = function (event, customConfig, method) {
            
            var formNames={};
            //console.log(method);
            if(method == 'credit'){
                if(customConfig){
                    customConfig.address1 ? formNames.address1 = customConfig.address1 : formNames.address1 = "bill_to_address_line1";
                    customConfig.town ? formNames.town = customConfig.town : formNames.town = "bill_to_address_city";
                    customConfig.postcode ? formNames.postcode = customConfig.postcode : formNames.postcode = "bill_to_address_postal_code";


                }else{
                    formNames.address1 = "bill_to_address_line1";                    
                    formNames.town = "bill_to_address_city";
                    formNames.postcode = "bill_to_address_postal_code";
                }

            }else{
                if(customConfig){
                    customConfig.address1 ? formNames.address1 = customConfig.address1 : formNames.address1 = "accAddress1";
                    customConfig.address2 ? formNames.address2 = customConfig.address2 : formNames.address2 = "accAddress2";
                    customConfig.town ? formNames.town = customConfig.town : formNames.town = "accTown";
                    customConfig.postcode ? formNames.postcode = customConfig.postcode : formNames.postcode = "accPostCode";
                }else{
                    formNames.address1 = "accAddress1";
                    formNames.address2 = "accAddress2";
                    formNames.town = "accTown";
                    formNames.postcode = "accPostCode";
                }

            }


            // Use service to find postcode
            var _scope = $scope;
            var $form = $(event.currentTarget).parents('form');
            var cp_obj = CraftyPostcodeCreate();

            cp_obj.set("access_token", "5db81-bbb52-7bebe-010f9"); // TFC's temp access token
            // cp_obj.set("access_token", "xxxxx-xxxxx-xxxxx-xxxxx"); // access token

            // Free postcodes for testing
            // AA11AA, AA11AB, AA11AD and AA11AE

            cp_obj.set("result_elem_id", $form.attr('name')+"-postcode");
            cp_obj.set("first_res_line", 'Please Select');
            cp_obj.set("res_autoselect", 0);

            cp_obj.set("form", $form.attr('name'));
            // cp_obj.set("elem_company"  , "companyname");
            cp_obj.set("elem_street1"  , formNames.address1);
              if(method == 'debit'){
            cp_obj.set("elem_street2"  , formNames.address2);
    }
            // cp_obj.set("elem_street3"  , "address3");
            cp_obj.set("elem_town"     , formNames.town);
            // cp_obj.set("elem_county"   , "county");
            cp_obj.set("elem_postcode" , formNames.postcode);
            // callback on success
            cp_obj.set("on_result_ready", function () {
                $scope.postCodeCheckError = '';
                $scope.selectedPostCode = 'Please Select';
                $scope.postCodeFind = $form.attr('name')+"-postcode";
                // Remove select on click
                var $selectOuter = $('#'+$form.attr('name')+"-postcode");
                // $select.find('select').addClass('form-control input-lg');
                var $select = $selectOuter.find('select');
                $select.addClass('form-control input-lg');
                $select.attr("ng-model","selectedPostCode");
                $select.attr("ng-change","updateSelectedPostcode()");
                // $select.attr('sass-select', 'sass-select');

                // var ngSelect = angular.element($select.find('select'));

                //debugger;

                var newNgSelect = $compile($selectOuter.parent())($scope);

                // $select.after(newNgSelect);

                $scope.$apply();

            });

            // callback on selection
            cp_obj.set("on_result_selected", function () {
                $scope.postCodeCheckError = '';
                $scope.postCodeCheck = $form.attr('name')+"-postcode";

                // OLD FIELD LOOP... DO NOT DELETE UNTIL TELESALES FLOW FULLY COMPLETE AND WORKING

                    // Loop through fields and add them to the scope (if not already in there)
                    // this adds the result of the lookup to the scope
                    // _.each($form.find('.address input'), function (field) {
                    //     
                    //     // push the content
                    //     if (!$scope[$(field).attr('name')]) {
                    //         $scope[$(field).attr('name')] = $(field).val();
                    //     }
                    //
                    // });

                _.each(formNames, function (value, key) {

                    //var field = $form.find("input[name="+value+"]");
                    

                    //Due to auto generated fields being added into the scope in an array with unknown length, 
                    //we have to loop through this array to assign scope values correctly to allow for angularJS 
                    //validation to work correctly.
              
                    if(customConfig){
                        
                        var currentFieldName = $('input[name=' + value + ']').attr('name');
                    
                        var currentValue = $('input[name=' + value + ']').val();
                    
                     
                        var generatedFields = $scope.formData.fields;
                   
                        _.each(generatedFields, function (field) {
                          
                            if(field.name == currentFieldName){
                                field.value = currentValue;
                                
                            }

                        });
                    }

                    if (!$scope[$(this[value]).attr('name')]) {
                     
                        $scope[value] = $("input[name='" + value+ "']").val();
                       
                    }
                    if(method == 'debit'){
                        //$('input#dd-proceed').attr('disabled',true);
                    }



                });

                // Update the scope
                $scope.$apply();

                // Do cleanup:
                // remove select wrapper contents
                //$('#'+$form.attr('name')+"-postcode").html('');

                // show 'find postcode' button again

            });


            // On error just show the other fields
            cp_obj.set("on_error", function () {
                
                $scope.postCodeCheckError = $form.attr('name')+"-postcode";

                // Check if field empty or not. Error happens only if empty
                if($('input[name='+formNames.postcode+']').val() !== ''){
                    $scope.$apply();
                }

            });

            cp_obj.doLookup();

        }

        $scope.updateSelectedPostcode = function () {
            //debugger;

            var $select = $(event.currentTarget);
            if ($scope.selectedPostCode != $select.val()) {
                $scope.selectedPostCode = $select.val();
                $scope.$apply();
            }

        }


        $scope.doModulusCheck = function (AccountNumber, SortCode) {

            if(AccountNumber == "10000000" && SortCode == "201111") {

                    $('.modulusCheckNo').hide();
                    $('.modulusCheck').show();
                    $scope.modulusCheck = true;
                    $scope.modulusCheckNO = true;
                    $scope.validateResult= true;


            }
            else {


                    var validBankAccount = BankAccountValidation_Interactive_Validate_v2_00('JE28-DY24-YN89-WJ82', AccountNumber, SortCode);
                    validBankAccount.then(function(data){
                        if(data.Items[0].IsCorrect){
                                                       
                            $('.modulusCheckNo').hide();
                            $('.modulusCheck').show();
                            $scope.modulusCheck = true;
                            $scope.modulusCheckNO = true; 
                            $scope.validateResult= true;
                            
                        }else{
                           
                           $('.modulusCheckNo').show();
                           $('.modulusCheck').hide(); 
                           $scope.modulusCheck = false;
                           $scope.modulusCheckNO = false; 
                           $scope.validateResult= true;
                           $('input#dd-proceed-telesales').attr('disabled',true);
                        
                        }
                    });
                }

        }



    }]);

// Header module

var manageProductsModule = angular.module('manageProductsModule', []);
//var manageUsersModule = angular.module('manageUsersModule', []);
angular.module('manageProductsModule')

.controller('manageProductCtrl', ['$scope', 'postService', '$modal', function($scope, postService, $modal) {

  $scope.userId = "";
  $scope.productId = "";


  $scope.initValue = function(id, identifier, value) {
    if ($scope[id]) {
      $scope[id][identifier] = value;
    }
    else {
      var obj = {};
      obj[identifier] = value;

      $scope[id] = obj;
    }
  }


  $scope.deleteSubscription = function(productId, url) {
    var ajaxURL = url + '/' + productId;

    var data = {};
    data.productId = productId;
    data.origin = "Remove Subscription";

    var callback = $scope.deleteSubscriptionCallback;

    $scope.makeAjaxCall(ajaxURL, data, callback);
  }


  $scope.deleteSubscriptionCallback = function(response) {
    var currentProductId = response.postData.productId;

    $scope['cancelledComplete' + currentProductId] = true;
  }


  $scope.unassignUserCallback = function unassignUserCallback(response) {
    $scope['totals' + response.postData.modelId].assigned -= 1;
    $scope['totals' + response.postData.modelId].available += 1;
  }


  //unassign licences for manage products

  $scope.unassignUser = function(userId, modelId, url, parentId, reassign) {
    $scope.userId = userId;
    $scope.productId = modelId;

    $scope.open(userId, modelId, url, parentId, reassign);
  }


  $scope.open = function(userId, modelId, url, parentId, reassign) {
    var checkIdentifier = 'input#checkbox' + modelId + userId;
    var checkBoxElement = $(checkIdentifier);

    var modalInstance = $modal.open({
      templateUrl: SaaS.location + '/docroot/assets/partials/confirm-unassign-modal.html',
      controller: ModalInstanceCtrl,
      resolve: {
        confirmMessage: function() {
          return "WARNING: If you choose to remove a licence, the person it's assigned to will lose any data they have stored in the app. Are you sure you want to go ahead?";
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      var ajaxURL = url + userId + '/' + modelId;

      var data = {};
      data.userId = userId;
      data.value = modelId;
      data.origin = "Unassign User";
      data.modelId = modelId;
      data.reassignable = reassign;
      data.parentId = parentId;

      var callback = $scope.unassignUserCallback;

      $scope.makeAjaxCall(ajaxURL, data, callback);
    }, function() {

      $scope['checkbox' + $scope.productId + $scope.userId] = true;
      checkBoxElement.trigger('click');

      return false;
    });
  }


  $scope.makeAjaxCall = function(ajaxURL, data, callbackFn) {
    // console.log('making call', $scope);
    var options = {};

    // Options can include _csrf.token & headerName
    options.token = $scope.serverToken;
    options.header = $scope.serverHeader;

    postService.postData(ajaxURL, data, options).then(function(response) {

      if (response.data.success) {
        // alert(response.data.success);
        $scope.ajaxErrorHeader = '';
        if (callbackFn) {
          callbackFn(response);
        }
      }
      else {
        $scope.ajaxErrorHeader = data.origin;
        $scope.ajaxErrorMessage = response.data.error;

        //console.log('Error: ', response.data.error);
      }
    });
  }

}]);

// Header module

var viewLicencesModule = angular.module('viewLicencesModule', []);
//var manageUsersModule = angular.module('manageUsersModule', []);
angular.module('viewLicencesModule')

.controller('viewLicencesCtrl', ['$scope', 'postService', '$modal', function($scope, postService, $modal) {

  $scope.testscope = 'hello';


  $scope.initValue = function(id, identifier, value) {
    if ($scope[id]) {
      $scope[id][identifier] = value;
    }
    else {
      var obj = {};
      obj[identifier] = value;

      $scope[id] = obj;
    }
  }


  $scope.lockSubscription = function(productId, url) {
    var ajaxURL = url + productId;

    var data = {};
    data.productId = productId;
    data.origin = "Lock subscription";

    var callback = $scope.lockSubscriptionCallback;

    $scope.makeAjaxCall(ajaxURL, data, callback);
  }


  $scope.unlockSubscription = function(productId, url) {
    var ajaxURL = url + productId;

    var data = {};
    data.productId = productId;
    data.origin = "Unlock subscription";

    var callback = $scope.unlockSubscriptionCallback;

    $scope.makeAjaxCall(ajaxURL, data, callback);
  }


  $scope.unassignUser = function(userId, modelId, url, parentId, reassign) {
    $scope.open(userId, modelId, url, parentId, reassign);
  }


  $scope.open = function(userId, modelId, url, parentId, reassign) {
    var checkIdentifier = 'input#checkbox' + modelId + userId;
    var checkBoxElement = $(checkIdentifier);

    var modalInstance = $modal.open({
      templateUrl: SaaS.location + '/docroot/assets/partials/confirm-unassign-modal.html',
      controller: ModalInstanceCtrl,
      resolve: {
        confirmMessage: function() {
          return "WARNING: If you choose to remove a licence, the person it's assigned to will lose any data they have stored in the app. Are you sure you want to go ahead?";
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      var ajaxURL = url + userId + '/' + modelId;

      var data = {};
      data.userId = userId;
      data.value = modelId;
      data.origin = "Unassign User";
      data.modelId = modelId;
      data.reassignable = reassign;
      data.parentId = parentId;

      var callback = $scope.unassignUserCallback;

      $scope.makeAjaxCall(ajaxURL, data, callback);
    }, function() {
      checkBoxElement.trigger('click');

      return false;
    });
  }


  $scope.lockSubscriptionCallback = function(response, target) {
    var productId = response.postData.productId;

    $scope['locked' + productId] = {
      isLocked: true
    };
  }


  $scope.unlockSubscriptionCallback = function(response, target) {
    var productId = response.postData.productId;

    $scope['locked' + productId] = {
      isLocked: false
    };
  }


  $scope.unassignUserCallback = function(response) {
    var modelId = response.postData.modelId,
      isReassignable = response.postData.reassignable,
      parentId = response.postData.parentId;

    if (!isReassignable) {
      return false;
    }

    var currentAvailable = $scope['totals' + modelId].available,
      totalAvailable = $scope['total' + parentId].totalAvailable;

    currentAvailable++;
    totalAvailable++;

    $scope['totals' + modelId] = {
      available: currentAvailable
    };

    $scope['total' + parentId] = {
      totalAvailable: totalAvailable
    };
  }


  $scope.makeAjaxCall = function(ajaxURL, data, callbackFn) {
    var options = {};

    // Options can include _csrf.token & headerName
    options.token = $scope.serverToken;
    options.header = $scope.serverHeader;

    postService.postData(ajaxURL, data, options).then(function(response) {
      if (response.data.success) {
        $scope.ajaxErrorHeader = '';

        if (callbackFn) {
          callbackFn(response);
        }
      }
      else {
        $scope.ajaxErrorHeader = data.origin;
        $scope.ajaxErrorMessage = response.data.error;
      }
    });
  }

}]);

// Voucher Codes module

var voucherCodesModule = angular.module('voucherCodesModule', []);
angular.module('voucherCodesModule')

    .controller('voucherCodesCtrl', ['$scope', 'postService', '$http', function ($scope, postService, $http) {

        $scope.getVoucherData = function (ajaxURL) {

            $http.get(ajaxURL).
                success(function(data) {
                    //data = [{ id: 1, value: 'here is one'}, { id: 2, value: 'here is two'}];
                    $scope.voucherResults = data;
                    //console.log('the data: ', data);
            });

        }
       
        $scope.setCouponList = function(url){
             $scope.getVoucherData(url);
        }

        $scope.sendVoucher = function (value, url){

            var ajaxURL = url + value;

            var data = {};
            data.value = value;
            data.origin = "Send voucher";
            
            $scope.makeAjaxCall(ajaxURL, data);
        }

        $scope.makeAjaxCall = function(ajaxURL, data, callbackFn){

            var options = {};

            // Options can include _csrf.token & headerName
            options.token = $scope.serverToken;
            options.header = $scope.serverHeader;

            postService.postData(ajaxURL, data, options).then(function (response) {

                if (response.data.success) {
                    
                    $scope.ajaxErrorHeader = '';
                    if(callbackFn){
                        callbackFn(response);
                    }

                }
                else {
                    $scope.ajaxErrorHeader = data.origin;
                    $scope.ajaxErrorMessage = response.data.error;
                }

            });

        }

    }]);
/* welcome page module */

angular.module('welcomeModule', []);



	

	
angular.module('welcomeModule')

	.controller('welcomeCtrl', ['$scope', 'postService', function ($scope, postService) {

		$scope.closeWelcomeMessage = function(event) {

	        var data = {};

	        //data.userID = userID;

	        //alert(productID); 

	        var ajaxURL = $(event.currentTarget).attr('data-path');

	        var callback = $scope.removeWelcome;
	        $scope.makeAjaxCall(ajaxURL, callback);

	        
	    }

	    $scope.makeAjaxCall = function(ajaxURL, callback){

	        var options = {};

	        // Options can include _csrf.token & headerName
	        options.token = $scope.serverToken;
	        options.header = $scope.serverHeader;
	        postService.postData(ajaxURL,'', options).then(function (response) {
	       
	        	$scope.removeWelcome();  

	       });

	    }

	    $scope.removeWelcome = function(){

	        //var myid = data.productID;
	        $scope['showWelcome'] = false;
	        //$scope['class'] = "animate-if";
	       

	    }



	}]);


/* */		
// Lead referral module

angular.module('manageLeadsModule', []);

angular.module('manageLeadsModule')

	.controller('manageLeadsCtrl', ['$scope', 'postService', function ($scope, postService) {

	    $scope.leadResults = leadjson;
	    $scope.ajaxErrorHeader = "";       

	   // console.log($scope);
	    $scope.removeLead = function (event, index, coreProductStatusId, staffNo) {

            // Handle 'remove User' button
            var data = {};
            data.coreProductStatusId = coreProductStatusId;
            data.staffNo = staffNo;
            data.origin = "Remove Lead";



            // // save local copy
            // var _scope = $scope;

          

            var ajaxURL = $(event.currentTarget).attr('data-path');

            var callback = $scope.removeLeadsFromList;

            $scope.makeAjaxCall(index, ajaxURL, data, callback);

           

        }

        $scope.makeAjaxCall = function(index, ajaxURL, data, callbackFn){

            var options = {};

            // Options can include _csrf.token & headerName
            options.token = $scope.serverToken;
            options.header = $scope.serverHeader;

            //console.log(options);
            postService.postData(ajaxURL, data, options).then(function (response) {

            //console.log(response.data);
            if (response.data = "true") {
                    


                    //alert("test");
                    // $scope.ajaxErrorHeader = '';
                    // if(callbackFn){
                    //     callbackFn(response);
                    // }

                }

            $scope.removeLeadsFromList(index);	

            });

        }

        $scope.removeLeadsFromList = function(index){
	        //lead_to_remove = $scope.leadResults[coreProductStatusId];
	        $scope.leadResults.splice(index, 1);
	        //console.log(index);

   		}


	}]);



angular.module('platformModule', []);


(function(angular) {
  'use strict';

  angular.module('platformModule')

    .service('platformService', ['$window', '$log', function($window, $log) {

      var platform = $window.navigator.platform,
        ua = $window.navigator.userAgent;

      var m = $window.location.search.match(/platform=(\w+)/);

      if (m) {
        platform = m[1];
      }

      $log.log('platform="%s", ua="%s"', platform, ua);

      var browser, version, mobile = false, os, osversion, bit;

      if (/MSIE/.test(ua)) {
        browser = 'Internet Explorer';

        if (/IEMobile/.test(ua)) {
          mobile = true;
        }

        version = /MSIE \d+[.]\d+/.exec(ua)[0].split(' ')[1];
      }
      else if (/Chrome/.test(ua)) {
        if (/CrOS/.test(ua)) {
          platform = 'CrOS';
        }

        browser = 'Chrome';
        version = /Chrome\/[\d\.]+/.exec(ua)[0].split('/')[1];
      }
      else if (/Opera/.test(ua)) {
        browser = 'Opera';

        if (/mini/.test(ua) || /Mobile/.test(ua)) {
          mobile = true;
        }
      }
      else if (/Android/.test(ua)) {
        browser = 'Android Webkit Browser';
        os = {
          id: 'android',
          name: /Android\s[\.\d]+/.exec(ua)[0],
          mobile: true
        };
      }
      else if (/Firefox/.test(ua)) {
        browser = 'Firefox';

        if (/Fennec/.test(ua)) {
          mobile = true;
        }

        version = /Firefox\/[\.\d]+/.exec(ua)[0].split('/')[1];
      }
      else if (/Safari/.test(ua)) {
        browser = 'Safari';

        if ((/iPhone/.test(ua)) || (/iPad/.test(ua)) || (/iPod/.test(ua))) {
          os = {
            id: 'ios',
            name: 'iOS',
            mobile: true
          };
        }
      }

      if (!version) {
        version = /Version\/[\.\d]+/.exec(ua);

        if (version) {
          version = version[0].split('/')[1];
        }
        else {
          version = /Opera\/[\.\d]+/.exec(ua)[0].split('/')[1];
        }
      }

      if (platform === 'MacIntel' || platform === 'MacPPC') {
        os = {
          id: 'osx',
          name: 'Mac OS X'
        };

        os.version = /10[\.\_\d]+/.exec(ua)[0];
        if (/[\_]/.test(os.version)) {
          os.version = os.version.split('_').join('.');
        }
      }
      else if (platform === 'CrOS') {
        os = {
          id: 'chrome',
          name: 'ChromeOS'
        };
      }
      else if (platform === 'Win32' || platform == 'Win64') {
        os = {
          id: 'windows',
          name: 'Windows'
        };
      }
      else if (!os && /Android/.test(ua)) {
        os = {
          id: 'android',
          name: 'Android',
          mobile: true
        };
      }
      else if (!os && /Linux/.test(platform)) {
        os = {
          id: 'linux',
          name: 'Linux'
        };
      }
      else if (!os && /Windows/.test(ua)) {
        os = {
          id: 'windows',
          name: 'Windows'
        };
      }

      var res = {
        browser : {
          name: browser,
          version : version
        },
        os : angular.extend({
          mobile: false,
          version: osversion
        }, os)
      };

      $log.log(res);

      return res;

    }]);

})(angular);


(function(angular) {
  'use strict';

  angular.module('platformModule')

    .value('platformTabNames', {
      windows:    'Windows',
      osx:        'MAC OS',
      android:    'ANDROID',
      ios:        'iOS'
    })

    .directive('platformTabs', function() {
      return {
        restrict: 'EA',
        replace: true,
        transclude: true,

        scope: {
          ngModel: '=?'
        },

        templateUrl: SaaS.location + '/docroot/assets/partials/platform-tabs.html',

        controller: function($scope, $element, platformService) {
          var panes = $scope.panes = [];

          $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
              pane.selected = false;
            });
            pane.selected = true;
            console.dir(pane);
            $scope.ngModel = pane.platform;
          };

          this.addPane = function(pane) {
            console.log('add pane: platform=%s, name="%s"', pane.platform, pane.name);
            if (panes.length === 0 || pane.platform === platformService.os.id) {
              $scope.select(pane);
            }
            panes.push(pane);
          };
        }
      };
    })

    .directive('platformTab', ['platformTabNames', function(platformTabNames) {
      return {
        restrict: 'EA',
        require: '^platformTabs',
        replace: true,
        transclude: true,

        scope: {
          platform: '@'
        },

        template: '<div id="{{id}}" class="platform-tab" ng-show="selected" ng-transclude></div>',

        link: function(scope, element, attrs, platformTabsController) {
          if (platformTabNames[scope.platform]) {
            scope.name = platformTabNames[scope.platform];

            platformTabsController.addPane(scope);
          }
        }
      };
    }]);

})(angular);

'use strict';


$(document).ready(function() {

    //var pathname = window.location.pathname; // Returns path only

    //if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {
      //  if(navigator.appVersion.indexOf("Win")!=-1 && navigator.appVersion.indexOf("5.")!=-1){
         //   if(pathname.indexOf("welcome")){
         //       window.location.href = 'welcome0';
          //  }
       // }

    //}

    angular.bootstrap(document, ['saas']);


    /* reset password company search */
    $('.resetPassword').on('click', function() {
        var id = $(this).data('userid'),
            newurl = $(this).data('uri');

        $.ajax({
            url: newurl,
            type: "GET",
            dataType: "json",
            success: function(data) {
                $('.success').html('<h2 style="text-transform: none"> New Password:  ' + data.password + '</h2>');
            }

        });

    });


    if (navigator.userAgent.match(/Android|iPhone|iPod|BlackBerry|Windows Phone/i)) {
      $('#myAccount').on('click', function() {
        $('#menu-rollover').toggle();
        return false;
      });
    }


    /////disabled NEXT button
    $('form#captureBasicInfo').submit(function(event) {
      $('.capture-details-page-nextbutton').attr('disabled',true);
    });

    /////////////////////// Google Tracking start \\\\\\\\\\\\\\\\\\\\\\\\\\\

    /* +++++++++++ Login page +++++++++++++++++++++ */

    $('#tracking-login').click(function() {
        ga('send', 'event', 'button', 'login button', 'login button');
        return true;
    });


    $('#forgotten-password').on('click', function() {
        ga('send', 'event', 'link', 'forgotten password', 'forgotten password');
        return true;
    });


    $('#tracking-register').on('click', function() {
        ga('send', 'event', 'link', 'register', 'register');
        return true;
    });


    $('#tracking-set-up-one').on('click', function() {
        ga('send', 'event', 'link', 'set one up', 'set one up');
        return true;
    });


    /* +++++++++++ Forgotten Password Page +++++++++++++++++++++ */

    $('#reset-password').click(function() {
        ga('send', 'event', 'button', 'Reset password', 'Reset password');
        return true;
    });

    $('.cancel-password-reset').click(function() {
        ga('send', 'event', 'link', 'Cancel Reset password', 'Cancel Reset password');
        return true;
    });

    $('.reset-password-help').click(function() {
        ga('send', 'event', 'link', 'Reset password Help', 'Reset password Help');
        return true;
    });


    /* +++++++++++ My Apps & Software page (product specific) +++++++++++++++++++++ */

    $('.tracking_launch').on('click', function() {
        var name = $(this).data("name");
        ga('send', 'event', 'link', name, name);
        return true;
    });

    $('.tracking_upgrade').on('click', function() {
        var name = $(this).data("name");
        ga('send', 'event', 'link', name, name);
        return true;
    });

    $('.tracking_quick_tips').on('click', function() {
        var name = $(this).data("name");
        ga('send', 'event', 'link', name, name);
        return true;
    });


    $('#tracking_home_video').on('click', function() {
        var name = $(this).data("name");
        ga('send', 'event', 'link', name, name);
        return true;
    });


    $('.tracking_product_video').on('click', function() {
        var name = $(this).data("name");
        ga('send', 'event', 'link', name, 'intro video');
        return true;
    });


    /* +++++++++++ My Profile page +++++++++++++++++++++ */

    $('#marketingEmail').on('click', function() {
        ga('send', 'event', 'link', 'Marketing Email', 'opt in email');
        return true;
    });

    $('#marketingPhone').on('click', function() {
        ga('send', 'event', 'link', 'Marketing Phone', 'opt in phone');
        return true;
    });


    /* +++++++++++ Personal Details page +++++++++++++++++++++ */

    $('#personal-details-page-nextbutton').on('click', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Personal Details page');
        return true;
    });

    $('#personal-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Personal Details page');
        return true;
    });


    /* +++++++++++ Capture Details page +++++++++++++++++++++ */

    $('.capture-details-page-nextbutton').on('click', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Capture Details page');
        return true;
    });

    $('.capture-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });


    /* +++++++++++ Purchase Summary Page +++++++++++++++++++++ */

    $('.capture-details-page-nextbutton').on('click', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Capture Details page');
        return true;
    });

    $('.capture-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });




    /* +++++++++++ Purchase Summary Page (updated) +++++++++++++++++++++ */

    $('.ee-agent').on('click',function(){
        ga('send', 'event', 'link', 'EE Agent', 'user clicks EE Agent? In order to enter their EE – agent reference if available');
        return true;
    });

    $('.proceed-button').on('click',function(){
        ga('send', 'event', 'link', 'Proceed', 'user clicks Proceed button');
        return true;
    });


    $('#payOptions1').on('click', function() {
        if ($(this).is(':checked')) {
        ga('send', 'event', 'link', 'Pay by credit/debit card', 'Pay by credit/debit card');
        return true;
       }
    });

    $('#payOptions2').on('click', function() {
        if ($(this).is(':checked')) {
        ga('send', 'event', 'link', 'Pay by Direct Debit', 'Pay by Direct Debit');
        return true;
       }
    });


    $('#find-address-cc').on('click',function(){
        ga('send', 'event', 'link', name, 'Apply voucher button clicked on purchase summary');
        return true;
    });

    $('.apply-voucher-purchase-summary').on('click',function(){
        var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'Apply voucher button clicked on purchase summary');
        return true;
    });


    $('.change-button-purchase-summary').on('click', function() {
        ga('send', 'event', 'link', 'Confirm and Pay', 'Confirm and Pay button');
        return true;
    });

    $('confirm-and-pay').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });

    $('#capture-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });


    /* +++++++++++ Payment Confirmation page +++++++++++++++++++++ */

    $('.print-button').on('click',function(){
        ga('send', 'event', 'link', 'Print Button', 'Print button');
        return true;
    });

    $('.cancel-button').on('click',function(){
        ga('send', 'event', 'link', 'Cancel ', 'Cancel');
        return true;
    });

    $('.proceed-button').on('click',function(){
        ga('send', 'event', 'link', 'Procceed ', 'Procceed');
        return true;
    });




    /* +++++++++++ Manage my products +++++++++++++++++++++ */

    $(document).on('click','.cancelSubscription', function() {
        var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'cancel subscription');
        return true;
    });

    $(document).on('click','.yesCancelSubscription', function() {
        var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'yes permenantly cancel subscription');
        return true;
    });

    $(document).on('click','.noCancelSubscription', function() {
        var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'no, keep subscription');
        return true;
    });


    /* +++++++++++ Billing info +++++++++++++++++++++ */

    $('#editDetails').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'Billing info page edit detils button clicked');
        return true;
    });

    $('.pay-by-direct-debit-billinginfo').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'Billing info page');
        return true;
    });

    $('.find-address-billing-info').on('click', function() {
        ga('send', 'event', 'link', 'Find Address', 'for Credit Card in Billing info page');
        return true;
    });

    $('.find-address-billing-info-DD').on('click', function() {
        ga('send', 'event', 'link', 'find Address', 'for Direct Debit in Billing info page');
        return true;
    });


   /* +++++++++++ track direct debit option +++++++++++++++++++++ */

    $('#payOptions2').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });

    $('#findAddress').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });


    /* +++++++++++ Marketplace page +++++++++++++++++++++ */

    $('.tracking-marketplace-product-logo').on('click', function() {
        var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'user clicks on the logo');
        return true;
    });

    $('.tracking-more-info').on('click', function() {
        var name = $(this).data("trackingname");
        ga('send', 'event', 'link', name, 'more info');
        return true;
    });

    $('.tracking-marketplace-product-video').on('click', function() {
        var name = $(this).data("videoname");
        ga('send', 'event', 'link', name, 'play video');
        return true;
    });

    $('.buy_now').on('click',function(){
    	var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'buy now button clicked from marketplace');
        return true;
    });

    $('.findout-more').on('click',function(){
    	var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'find out more link clicked from marketplace');
        return true;
    });


    /* +++++++++++ Products page track INTRO BENEFITS etc. +++++++++++++++++++++ */


    $(document).on('click','.tracking-products-details',function(){
    	//alert('test');
    	var name = $(this).data("tabnameheading");
    	//var productNmae = $('#product-page-heading').text();
        //ga('send', 'event', 'link', name, 'find out more link clicked from marketplace');
        //alert(productName + '-' + name + ' Tab clicked');


        //return true;
    });


    $('.apply-voucher').on('click',function(){
    	var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'voucher apply button clicked');
        return true;
    });


    $('.singleproduct-continue').on('click',function(){
    	var name = $(this).data("productname");
        ga('send', 'event', 'link', name, 'user clicks Continue for ' + name);
        return true;
    });


    /* +++++++++++ Mozy launch downloads +++++++++++++++++++++ */

    $('#mozydownloadwindows').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });

    $('#mozydownloadmac').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });

    $('#mozydownloadandroid').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });

    $('#mozydownloadios').on('click', function() {
        ga('send', 'event', 'link', 'edit details', 'edit details');
        return true;
    });


    /* +++++++++++ Capture Details page Telesales+++++++++++++++++++++ */

    $(document).on('click','#telesales_capture-details-page-nextbutton', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Telesales capture details page');
        return true;
    });

    $(document).on('click','#telesales_capture-details-page-cancelbutton', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Telesales capture details page');
        return true;
    });

    /* +++++++++++ Capture Details page 2 Telesales+++++++++++++++++++++ */

    $(document).on('click','#telesales_capture-details2-page-nextbutton', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Telesales capture details2 page');
        return true;
    });

    $(document).on('click','#telesales_capture-details2-page-cancelbutton', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Telesales capture details2 page');
        return true;
    });

    /* +++++++++++ Telesales Purchase Summary Page +++++++++++++++++++++ */

    $('#capture-details-page-nextbutton').on('click', function() {
        ga('send', 'event', 'link', 'Next Button', 'User clicks next on Capture Details page');
        return true;
    });

    $('#capture-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });

    $('#capture-details-page-cancelbutton').on('click', function() {
        ga('send', 'event', 'link', 'Cancel Button', 'User clicks cancel on Capture Details page');
        return true;
    });


    /* +++++++++++ Telesales Payment Page +++++++++++++++++++++ */

    $(document).on('click','#telesales-validate-button', function() {
        ga('send', 'event', 'link', 'Validate Button', 'User clicks Find address button');
        return true;
    });


    $(document).on('click','#telesales-find-address', function() {
        ga('send', 'event', 'link', 'Find Address', 'Find Address');
        return true;
    });

    $(document).on('click','#telesales-enter-manually-address', function() {
        ga('send', 'event', 'link', 'Enter manually button', 'User clicks Enter manually button');
        return true;
    });

    $(document).on('click','#dd-proceed-telesales', function() {
        ga('send', 'event', 'link', 'Proceed Button', 'user clicks Proceed');
        return true;
    });

    $(document).on('click','#dd-proceed', function() {
        ga('send', 'event', 'link', 'Proceed Button', 'user clicks Proceed');
        return true;
    });

    $(document).on('click','#telesales-payemnt-page-cancel', function() {
        ga('send', 'event', 'link', 'Cancel button', 'User clicks Cancel button on Telesales payment page');
        return true;
    });

    /* +++++++++++ Telesales Purchase Summary Page (updated) +++++++++++++++++++++ */

    $(document).on('click','.change-button-purchase-summary', function() {
        ga('send', 'event', 'link', 'Change', 'User clicks Change button on Telesales Purchase Summary Page');
        return true;
    });

    $(document).on('click','.confirm-and-pay', function() {
        ga('send', 'event', 'link', 'Confirm and Pay', 'User clicks Confirm and Pay on Telesales Purchase Summary Page');
        return true;
    });



    /* +++++++++++ Telesales Purchase Confirmation +++++++++++++++++++++ */

    $(document).on('click','.go-to-buy-try-apps', function() {
        ga('send', 'event', 'link', 'Go to buy & try apps', 'User clicks Go to buy & try apps button on Telesales Purchase Confirmation');
        return true;
    });

    $(document).on('click','.enter-payment-details', function() {
        ga('send', 'event', 'link', 'Enter Payment Details', 'User clicks Enter Payment Details');
        return true;
    });

    $(document).on('click','#assignToUser', function() {
        ga('send', 'event', 'link', 'Assign licence to yourself', 'User click on the Assign licence to yourself checkbox');
        return true;
    });


    //Google Tracking ends///




});

//# sourceMappingURL=main.js.map