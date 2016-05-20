[#import "/org/springframework/web/servlet/view/freemarker/spring.ftl" as spring /]
[#assign htmlEscape=true in spring /]
[#assign blossom=JspTaglibs["blossom-taglib"] /]

[#macro layoutBare]
<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" class="no-js lt-ie9 lt-ie8" xmlns:ng="http://angularjs.org" id="ng-app"> <![endif]-->
<!--[if IE 8]>         <html lang="en" class="no-js tenant-ee lt-ie9" xmlns:ng="http://angularjs.org" id="ng-app"> <![endif]-->
<!--[if IE 9]>         <html lang="en" class="no-js tenant-ee lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en" class="no-js tenant-ee" xmlns:ng="http://angularjs.org" id="ng-app"> <!--<![endif]-->
  <head>
    [@cms.init /]
    <!--[if IE 8]>
        <script type="text/javascript">
          document.createElement('form-select');
          document.createElement('form-field');
          document.createElement('accordion');
          document.createElement('ng-transclude');
          document.createElement('ng-include');
          document.createElement('ng-pluralize');
          document.createElement('ng-view');
         

          // Optionally these for CSS
          document.createElement('ng:include');
          document.createElement('ng:pluralize');
          document.createElement('ng:view');
        </script>
      <![endif]-->
      <!--[if IE 8]><meta http-equiv="X-UA-Compatible" content="IE=8" /><![endif]-->
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="google-site-verification" content="1TaucMQTKjtB303SPoVjshz9PURLURfyoLdJc746Dtk" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="bn" content="[@spring.message 'build_number'/]"/>
	<meta name="bid" content="[@spring.message 'build_id'/]"/>
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:image" content="" />
    <meta name="format-detection" content="telephone=no">
    <title>${content.title!"[Enter Page Title]"}</title>
    <link rel="shortcut icon" type="image/x-icon" href="${ctx.contextPath}/docroot/assets/img/favicon.ico">
    <script src="${ctx.contextPath}/docroot/assets/js/modernizr-2.6.2.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Lusitana" rel="stylesheet" type="text/css"/>
    <link href="${ctx.contextPath}/docroot/assets/css/style.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx.contextPath}/docroot/assets/css/modules/cleanslate.css" rel="stylesheet" type="text/css"/>    
    <!--[if lt IE 9]>
          <script src="${ctx.contextPath}/docroot/assets/js/respond.min.js"></script>
    <![endif]-->


    <script>
        var SaaS = {};
        SaaS.location = "${ctx.contextPath}";
    </script>

    
    
  </head>
  <body>
    <!--[if lt IE 10 ]>    

    <div class="message notify show" style="margin:0;padding:0;">
      <h2 class="messageHeader" style="margin:0;padding:14px;">[@spring.message "general.ie.warning.message" /]</h2>
    </div>

    <![endif]-->
   
        [#nested /]
    

    <div ng-init="showOverlay=false;" class="overlay" id="myModal" aria-hidden="false" style="z-index: 10050; background-color:#161212;opacity:0.5;" ng-show="showOverlay">
      <div id='floatingBarsG' style="top:200px;left:50%;">
        <div class='blockG' id='rotateG_01'></div>
        <div class='blockG' id='rotateG_02'></div>
        <div class='blockG' id='rotateG_03'></div>
        <div class='blockG' id='rotateG_04'></div>
        <div class='blockG' id='rotateG_05'></div>
        <div class='blockG' id='rotateG_06'></div>
        <div class='blockG' id='rotateG_07'></div>
        <div class='blockG' id='rotateG_08'></div>
    </div>
    </div>
  </body>
</html>
[/#macro]

[#macro layout]
    [@layoutBare]
        [#include "../includes/header.ftl" /]
        <div id="content-wrapper">
            [#nested /]
        </div>
        [#include "../includes/footer.ftl" /]
    [/@layoutBare]
[/#macro]
