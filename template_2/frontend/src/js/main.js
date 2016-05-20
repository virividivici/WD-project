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
