/*
    This demo application demonstrates how to use the KonaKart JQuery JSON library.
    It contains a number of API calls to the KK engine. The flow is as follows:
     1) A temporary customer id (negative number) is fetched from the KK engine.
        This id is used to identify the customer even though he hasn't logged in.
     2) The category tree is fetched from the KK engine and 4 hardware categories
        are used to create 4 tab folders.
     3) Each tab folder is populated with products which again are retrieved from
        the KK engine.
     4) Any product may be added to the cart by dragging it onto the cart tile.
        When this occurs, the code calls the KK engine to add a product to the cart.
     5) Once the product has been added to the cart, an API call is made to retrieve
        all of the cart items for the temporary customer which are then displayed
        in the cart tile.
     6) If a product is removed from the cart, the KK engine is notified through an
        API call and a new updated list of cart items is retrieved from the KK engine
        and displayed.
     7) When the checkout button is clicked, the temporary customer id is saved by the engine
        in an SSO token and a UUID is returned to identify the token.
     8) The current window location is changed in order to redirect the customer to the
        standard KK store-front demo application. The UUID is passed to the struts action
        so that code within the store-front app can look up the SSO token containing the
        temporary customer id. Using this id, the store front app can display the cart items
        and start the checkout process.
 */

// Change the root depending on where KK is running
var kkRoot = 'http://92.52.109.4:8780/konakart/';
//var kkRoot = 'http://www.konakart.com/konakart/';

// Define the protocol: json or jsonp
var jsonProtocol = 'jsonp';
//var jsonProtocol = 'jsonp';

// Define the url and store id of a running KK engine
var conf = new engineConfig(kkRoot + 'konakartjson');
conf.storeId = "store1";
conf.protocol = jsonProtocol;
var eng = new kkEng(conf);

// Use the image base to display images from the KK store-front app
var imgBase = kkRoot + "images/";

// Temporary customer id
var custId = null;

// Global animation speed setting
var speed = 700;

// Cart Empty text
var cartEmptyTxt = "Your Cart is Empty";

$(function() {

    // When json and IE we change the AJAX transport to support CORS
    if (jsonProtocol == 'json') {
        ieCORSSupport();
    }

    // Add a label to the cart
    $('#cartItems').find('ul').append('<li>' + cartEmptyTxt + '</li>');

    /*
     Get a temporary customer id Callback. A KK customer that isn't logged in,
     is identified by a temporary id which is always negative. We get this unique
     id from the engine and use it when adding items to the cart.
     */
    var getTempCustomerIdCallback = function(result, textStatus, jqXHR) {
        custId = decodeJson(result);
    }

    // Get a temporary customer id Eng Call
    kkEng.getTempCustomerId(getTempCustomerIdCallback, null, eng);

    // Create the checkout button
    var checkoutBtn = $('.checkout').button();

    // Get basket Callback. Called after a product is added or removed from the cart.
    // The cart items are received from the engine and displayed.
    var getBasketItemsPerCustomerCallback = function(result, textStatus,
            jqXHR) {
        var basketArray = decodeJson(result);

        // Calculate the total and update the cart tile
        var cartList = $('#cartItems').find('ul');

        if (cartList.find('li').first().text() == cartEmptyTxt) {
            // Remove the Cart is Empty Text
            cartList.find('li').first().remove();
            // Show the total
            $('#cartTotal').fadeIn();
            //Show the checkout button
            checkoutBtn.delay(speed).fadeIn(speed);
        }

        // Cart is empty
        if (basketArray.length == 0) {

            // Hide the total
            $('#cartTotal').slideUp(speed);

            //Hide the checkout button
            checkoutBtn.slideUp(speed, function() {
                cartList.find('li').remove();
                cartList.append('<li>' + cartEmptyTxt + '</li>').hide()
                        .slideDown(speed);
                $('#cartTotal').find('ul')
                        .replaceWith("<ul><li></li></ul>");

            });
            return;
        }

        // Remove current items
        cartList.find('li').remove();

        // Add new items received from KK engine
        var total = 0;
        for ( var i = 0; i < basketArray.length; i++) {
            var basket = basketArray[i];
            cartList.append('<li>'
                    + '<a class="remove" id="'+basket.id+'">&times;</a>'
                    + basket.quantity + ' x ' + basket.product.name
                    + '</li>');
            total += basket.finalPriceExTax;
        }

        // Fade in the new total
        $('#cartTotal').find('ul').fadeOut(
                speed,
                function() {
                    $(this).replaceWith(
                            '<ul><li>Total: ' + formatCurrency(total)
                                    + '</li></ul>');
                    $('#cartTotal').find('ul').hide().fadeIn(speed);
                });

    }

    // Remove from basket Callback
    var removeFromBasketCallback = function(result, textStatus, jqXHR) {
        // Get the basket items from the engine
        kkEng.getBasketItemsPerCustomer(null, custId, -1,
                getBasketItemsPerCustomerCallback, null, eng);
    }

    // Add to basket Callback
    var addToBasketCallback = function(result, textStatus, jqXHR) {
        // Get the basket items from the engine
        kkEng.getBasketItemsPerCustomer(null, custId, -1,
                getBasketItemsPerCustomerCallback, null, eng);
    }

    // Drop a product into the cart
    $('#cart').droppable(
            {
                accept : '.products li',
                tolerance : 'pointer',
                hoverClass : 'cartHover',
                drop : function(event, ui) {
                    var item = ui.draggable;
                    var prodId = $(item).find('.info').find('.prodId')
                            .text();

                    // Create a KonaKart basket item and send it to the engine
                    var basket = new Basket();
                    basket.quantity = 1;
                    basket.productId = prodId;
                    kkEng.addToBasket(null, custId, basket,
                            addToBasketCallback, null, eng);

                }
            });

    // Fill folders with products
    var getProductsPerCategoryCallback = function(result, textStatus, jqXHR) {
        // "this" maps to the Category object passed as the context
        var products = decodeJson(result);
        for ( var i = 0; i < products.productArray.length; i++) {
            var prod = products.productArray[i];
            var prodDesc = '<li><img src="'+imgBase+prod.image+'">';
            prodDesc += '<p class="info"><em>' + prod.name + '</em>';
            prodDesc += '<span class="prodId" style="display: none">'
                    + prod.id + '</span>';
            prodDesc += '<span class="price">'
                    + formatCurrency((prod.specialPriceExTax == null) ? prod.priceExTax
                            : prod.specialPriceExTax) + '</span>';
            prodDesc += '<p>';
            if (prod.description.length > 150) {
                prodDesc += prod.description.substring(0, 149) + "...";
            } else {
                prodDesc += prod.description;
            }
            prodDesc += '</p>';
            prodDesc += '</em></p>';
            prodDesc += '</li>';

            $('#cat-' + this.id + ' ul').append(prodDesc);
        }
        $('#cat-' + this.id).find('ul').find('li').draggable({
            opacity : 0.5,
            revert : true,
            revertDuration : 500,
        });
    };

    // Create folders
    $('#store').tabs();

    // Fill folder titles with category information. We only use 4 hardware categories from the
    // KK demo store-front application
    var dataDesc = new DataDescriptor();
    dataDesc.limit = 100;
    dataDesc.fillDescription = true;
    var getCategoryTreeCallback = function(result, textStatus, jqXHR) {
        var categories = decodeJson(result);
        for ( var i = 0; i < categories.length; i++) {

            if (categories[i].name == "Computer Peripherals") {
                var folders = $('#store').find('ul');
                for ( var j = 0; j < categories[i].children.length; j++) {
                    var childCat = categories[i].children[j];
                    if (childCat.name == 'Graphics Cards'
                            || childCat.name == 'Printers'
                            || childCat.name == 'Keyboards'
                            || childCat.name == 'Mice') {

                        $('#store').tabs("add", '#cat-' + childCat.id,
                                childCat.name);

                        // Hide data in all tabs after the first one
                        if (j > 1) {
                            $('#store').find('#cat-' + childCat.id)
                                    .addClass('ui-tabs-hide');
                        }
                        // Create a list to put the products
                        $('#store').find('#cat-' + childCat.id).append(
                                '<ul class="products"></ul>');

                        // Get products for the category passing the category in the context
                        kkEng.getProductsPerCategory(null, dataDesc,
                                childCat.id, false, -1,
                                getProductsPerCategoryCallback, childCat,
                                eng);
                    }
                }
            }
        }
    };

    // Get the category tree from the KK engine
    kkEng.getCategoryTree(-1, true, getCategoryTreeCallback, null, eng);

    // Basket remove link clicked
    $('.remove').live(
            'click',
            function(event) {
                $('#' + event.target.id).parent().slideUp(
                        speed,
                        function() {
                            var basket = new Basket();
                            basket.id = event.target.id;
                            kkEng.removeFromBasket(null, custId, basket,
                                    removeFromBasketCallback, null, eng);

                        });
            });

    // saveSSOTokenCallback
    var saveSSOTokenCallback = function(result, textStatus, jqXHR) {
        var secretKey = decodeJson(result);
        /*
         Go to the KK store-front application passing it a key from which it can
         retrieve the SSO token containing the temporary customer id and so retrieve the basket items.
         Look at the source of InitFromTokenSubmitAction to see what the KK store front app does.
         */
        window.location = kkRoot + "InitFromToken.action?key=" + secretKey;
    }

    // Click the checkout button
    $(checkoutBtn).click(
            function() {
                $('#dialog-confirm').dialog(
                        {
                            resizable : false,
                            height : 140,
                            modal : true,
                            buttons : [
                                    {
                                        text : "No, keep shopping!",
                                        click : function() {
                                            $(this).dialog('close');
                                        }
                                    },
                                    {
                                        text : "Yes, check me out",
                                        click : function() {
                                            $(this).dialog('close');
                                            // Save a token containing the temporary customer id
                                            var ssoToken = new SSOToken();
                                            ssoToken.customerId = custId;
                                            kkEng.saveSSOToken(ssoToken,
                                                    saveSSOTokenCallback,
                                                    null, eng);
                                        }
                                    } ]
                        });
                return false;
            });

    /*
     * For IE8, IE9 we use XDomainRequest instead of XMLHttpRequest. Needed for
     * CORS.
     */
    function ieCORSSupport() {
        if (!jQuery.support.cors && window.XDomainRequest) {
            $.ajaxTransport('json', function(options, originalOptions, jqXHR) {
                var xdr;

                return {
                    send : function(_, completeCallback) {
                        xdr = new XDomainRequest();
                        xdr.onload = function() {
                            var responses = {
                                text : xdr.responseText
                            };

                            completeCallback(200, 'success', responses);
                            // we will assume that the status code is 200,
                            // XDomainRequest rejects all other successful status
                            // codes
                            // see bug
                            // https://connect.microsoft.com/IE/feedback/ViewFeedback.aspx?FeedbackID=334804
                        };
                        xdr.onerror = xdr.ontimeout = function() {
                            var responses = {
                                text : xdr.responseText
                            };
                            completeCallback(400, 'failed', responses);
                        }

                        xdr.open(options.type, options.url);
                        xdr.send(options.data);
                    },
                    abort : function() {
                        if (xdr) {
                            xdr.abort();
                        }
                    }
                };
            });
        }
    }

});

// Format the currency
function formatCurrency(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) {
        i = 0.00;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.00';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = minus + s;
    return '$' + s;
}