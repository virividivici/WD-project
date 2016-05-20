[#assign c=JspTaglibs["http://java.sun.com/jsp/jstl/core"]]
[#assign sec=JspTaglibs["http://www.springframework.org/security/tags"]]


[#import "../libs/utils.ftl" as util]


[#assign locale='en']

[#if localizedLinks??]
  [#list localizedLinks?keys as lang]
    [#if aggregationState.locale?starts_with(localizedLinks[lang]?last)]
      [#assign locale=localizedLinks[lang][1]]
    [/#if]
  [/#list]
[/#if]


<script type="text/javascript">
  var locale = '${locale}';

  var navInit = {
    connect: false,
    aboutus: false,
    payment: false,

    tools: false,
    subTools: {
        shopTools: false,
        toolsActual: false,
        help: false,
        login:false,
        myTools: false,
        myAccount : false
    },

    offer : false,
    subOffer : {
      offers: false,
      pricelessCities: false
    }
  };
</script>


[#assign homeContent = cmsfn.contentByPath(path['home.path'])]
[#assign code = (coBrand.code)!]


[#--
  Function to get a value that could be set on a co-brand, on the
  MBN 'co-brand' or in the saas-app-path.properties file...
--]
[#function f prefix pathCode="" fallback=""]
  [#if pathCode?has_content]
    [#local fallback = (util.p(pathCode))!fallback!]
  [/#if]

  [#if prefix == "" || !(homeContent??)]
    [#return fallback]
  [/#if]

  [#local prefix = prefix + "_"]

  [#return util.firstValid(homeContent, fallback, prefix + code, prefix + "MBN")]
[/#function]


[#-- From MBN-1059 --]
[#assign hidePoweredByBCSG = ctx.request.requestURL?split("/")?last?matches("accept-payment|insights-and-resources|elavon|payment-controls|usb-connect") && (homeContent["hide_bcsg_toolbar_text_${code}"])!false]


[#-- Work out what links will show in the top bar, and where they go... --]

[#assign toolsLink = util.p("marketplacehome")]

[#if (coBrand.offers)!true]
  [#assign offersLink = util.p("offers.easysavings")]
[/#if]

[#if (MOIParameters.acceptPaymentsEnabled)!(coBrand.acceptPayments)!true]
  [#assign paymentLink = f("acceptPaymentLink", "acceptpayment")]
[/#if]

[#if (coBrand.controlPayment)!false]
  [#assign controlsLink = f("controlPaymentLink", "paymentcontrol")]
[/#if]

[#assign insightLink = f("insightsResourcesLink", "mastercardbiz")]

[#assign aboutLink = util.p("about")]


[#-- Try and find if we have a custom 'brand colour' set. --]
[#assign hasBrandColour = (homeContent["brandColor_${code}"])?has_content || (homeContent.brandColor)?has_content]

[#if hasBrandColour]
  [#assign brandColour = (homeContent["brandColor_${code}"])!(homeContent.brandColor)]

  [#assign brandColour = "rgb(${brandColour})"]

  <style type="text/css">
    .tools-menu .tools-menu-row,
    .tools-menu .tools-menu-rollover a {
      background-color: ${brandColour};
    }

    .btn.brand-colour {
      background-color: ${brandColour} !important;
    }

    .btn.brand-colour:hover {
      opacity: 0.9;
    }

    .my-tools-wrapper .productWrapper .product-col .btn.brand-colour,
    .gateway.btn.brand-colour,
    .btn.btn-primary.brand-colour {
      color: white !important;
    }
  </style>
[/#if]

[#if homeContent["brandSecondColor_" + code]?has_content] 
 	<style type="text/css">
 		.orange-background {
 			background-color: rgb(${homeContent["brandSecondColor_" + code]!}) !important;
 		}
 		.orange-border a {
 			background-color: rgb(${homeContent["brandSecondColor_" + code]!}) !important;
 			color: white !important;
       		line-height:20px !important;
 		}
 		.orange-border a.active {
 			background-color: #f7f7f7 !important;
 			color: #333 !important;
 		}
 		.orange-border a:hover {
 			background-color: #f7f7f7 !important;
 			color: #333 !important;
 			line-height:20px !important;
 		}
 		#offers-orange-bar-nav .container {
			height:65px; 		
 		}
 	</style>
[/#if] 

<header class="section" ng-controller="navigationCtrl" data-cobrand-code="${code}" data-brand-colour="${brandColour!'#333'}">

  [#-- Desktop main menu - top row with logo, co-brand logo, links to Tools, Offers etc --]
  <div class="secondary hidden-xs hidden-sm">
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding">
          <a href="${ctx.contextPath}/">
            <img class="con-1 logo" src="${ctx.contextPath}/docroot/assets/img/mbn.svg" [#if coBrand?? && homeContent["logo_"+code]??] style="border-right: 1px solid #e6e6e6;"[/#if]>
          </a>
        </div>

        [#if coBrand?? && homeContent['logo_'+code]??]
          <div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 no-padding">
            [#if homeContent['logo_link_'+code]??]
              <a href="${homeContent['logo_link_'+code]}">
                <img class="cobrand-logo img-responsive cobrandHeader-${code}"
                  [#if cmsfn.contentById(homeContent['logo_'+code], 'dam')??]
                    src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo_'+code], 'dam'))}"
                  [#else]
                    src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo'], 'dam'))}"
                  [/#if]
                />
              </a>
            [#else]
              <img class="cobrand-logo img-responsive cobrandHeader-${code}"
                [#if cmsfn.contentById(homeContent['logo_'+code], 'dam')??]
                  src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo_'+code], 'dam'))}"
                [#else]
                  src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo'], 'dam'))}"
                [/#if]
              />
            [/#if]
          </div>
        [/#if]

        <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8 hidden-xs no-left-padding">
          <nav role="navigation">
            <ul class="main-nav list-inline account-links">
              <li>
                <a id="tracking-shop-tools" href="[@c.url value=toolsLink /]">
                  [@spring.message "mastercard.site.navigation.top.level.tools" /]
                </a>
              </li>

              [#if offersLink?has_content]
                <li class="orange-chevron">
                  <a id="tracking-offers-link" href="${offersLink}">
                    [@spring.message "mastercard.site.navigation.top.level.offers" /]
                  </a>
                </li>
              [/#if]

              [#if paymentLink?has_content]
                <li>
                  <a id="tracking-accept-payment-link" href="${paymentLink}">
                    [@spring.message "mastercard.site.navigation.top.level.accept_payments" /]
                  </a>
                </li>
              [/#if]

              [#if controlsLink?has_content]
                <li>
                  <a id="tracking-accept-payment-link" href="[@c.url value=controlsLink /]">
                    [@spring.message "mastercard.site.navigation.top.level.controls" /]
                  </a>
                </li>
              [/#if]

              [#if insightLink?has_content && aggregationState.locale == 'en']
                <li>
                  <a href="${insightLink}">
                    [@spring.message "mastercard.site.navigation.top.level.connect" /]
                  </a>
                </li>
              [/#if]

              <li>
                <a id="tracking-help-support" href="[@c.url value='/tools/help-and-support' /]">
                  [@spring.message "mastercard.site.navigation.top.level.tools.help" /]
                </a>
              </li>

              <li>
                <a ng-class="{true:'navigation-item' }[nav.aboutus]" href="${ctx.contextPath}${path['about.path']}">
                  [@spring.message "mastercard.site.navigation.top.level.about_us" /]
                </a>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>


  [#-- Tools menu - top row with login button on right, bottom row with links to Bundles, Manage Finances etc. --]
  <div class="tools-menu scroll-wrapper"
      ng-controller="categoryMenuScroll"
      ng-show="nav.tools"
      ng-class="{ 'menu-fixed': headerPositionClassChange }">

    <div class="tools-menu-row tools-menu-header-row grey-border-bottom">
      <div class="container">
        <div class="row">

          <div class="tools-logo col-md-5 col-sm-6 col-xs-8">
            [#if !hidePoweredByBCSG]
              <a href="/">
                <h1>TOOLS <span>POWERED <span>BY BCSG</span></span></h1>
              </a>
            [/#if]
          </div>

          <div class="logged-in col-lg-5 col-md-5 hidden-sm hidden-xs">
            [@sec.authorize access="isAuthenticated()"]
              <div class="col-sm-3">
                [#if loggedInUser??]
                  <p>&nbsp;</p>
                [/#if]
              </div>

              <div class="col-sm-3">
                <a class="tools-nav-links {{nav.subTools.shopTools ? 'active' : ''}} tracking-shop-tools"
                   href="[@c.url value=path['marketplacehome.path'] /]">
                  [@spring.message "mastercard.site.navigation.second.level.tools.market_place"/]
                </a>
              </div>

              <div class="col-sm-3">
                <a class="tools-nav-links {{nav.subTools.myTools?'active':''}}"
                   href="[@c.url value=path['homeloggedin.path'] /]">
                  [@spring.message "mastercard.site.navigation.second.level.tools.my_tools"/]
                </a>
              </div>

              <div class="col-sm-3">
                <a class="tools-nav-links {{nav.subTools.myAccount?'active':''}}"
                   ng-mouseenter="dropdownon = true" ng-mouseleave="dropdownon = false">
                  [@spring.message "mastercard.site.navigation.second.level.tools.my_account"/]
                </a>
              </div>

              <div class="tools-menu-rollover" ng-show="dropdownon" ng-mouseenter="dropdownon = true" ng-mouseleave="dropdownon = false">
                <div class="row clearfix">
                  <div class="col-xs-12 col-sm-12">
                    [@sec.authorize access="hasRole('ROLE_USER')"]
                      <li>
                        <a href="[@c.url value="${path['myprofile.path']}" /]">
                          [@spring.message "menu_link_profile_myprofile"/]
                        </a>
                      </li>
                    [/@sec.authorize]

                    [@sec.authorize access="hasRole('ROLE_MASTER')"]
                      <li>
                        <a href="[@c.url value="${path['billinginfo.path']}" /]">
                          [@spring.message "menu_link_manage_billing_info"/]
                        </a>
                      </li>
                    [/@sec.authorize]

                    [@sec.authorize access="hasRole('ROLE_MANAGER')"]
                      <li>
                        <a href="[@c.url value="${path['invitepeople.path']}?ref=menu" /]">
                          [@spring.message "menu_link_manage_invite_people"/]
                        </a>
                      </li>

                      <li>
                        <a href="[@c.url value="${path['managepeople.path']}" /]">
                          [@spring.message "menu_link_manage_manage_employees"/]
                        </a>
                      </li>

                      <li>
                        <a href="[@c.url value="${path['managetools.path']}" /]">
                          [@spring.message "menu_link_manage_manage_apps"/]
                        </a>
                      </li>
                    [/@sec.authorize]

                    [@sec.authorize access="hasAnyRole('ROLE_MANAGER', 'ROLE_MANAGER_PURCHASE_AUTHORITY')"]
                      <li>
                        <a href="[@c.url value="${path['viewlicences.path']}" /]">
                          [@spring.message "menu_link_manage_view_licences"/]
                        </a>
                      </li>
                    [/@sec.authorize]
                  </div>
                </div>
              </div>
            [/@sec.authorize]
          </div>

          <div class="login-block col-md-2 hidden-sm hidden-xs">
            [@sec.authorize access="!isAuthenticated()"]
              <a class="login {{nav.subTools.login ? 'active' : ''}} tracking-login" href="[@c.url value=path['login.path'] /]">
                [@spring.message "primaryHeader.login" /]
              </a>
            [/@sec.authorize]

            [@sec.authorize access="isAuthenticated()"]
              <a class="login" href="[@c.url value='/logout' /]">
                [@spring.message "primaryHeader.logout" /]
              </a>
            [/@sec.authorize]
          </div>

          <div class="menu-link hidden-lg hidden-md col-sm-6 col-xs-4 pull-right no-right-padding">
            <a type="button"
               ng-click="menuon=!menuon; menusubon=!menusubon; menusuper=!menusuper; checkMobileMenuStatus();">
              <i class="fa fa-fw">&#xf0c9;</i>
            </a>
          </div>
        </div>

      </div>
    </div>

    <div class="tools-menu-row tools-menu-category-row" ng-show="nav.subTools.toolsActual">
      <div class="container">

        <div class="row list-inline" du-spy-context>
          [#if categoriesKeys??]
            [#list categoriesKeys as key]
              <div class="list-inline-button col-xs-3" id="target_nav">
                <a href="#${key?lower_case}" du-smooth-scroll du-scrollspy offset="100">
                  ${(categories[key].label)!}
                </a>
              </div>
            [/#list]
          [/#if]
        </div>

      </div>
    </div>

  </div>


  <!-- Easy savings menu-->
  <div id="offers-orange-bar-nav"
      class="orange-background logged-in hidden-xs hidden-sm"
      style="{{nav.offer?'display:block;':'display:none;'}}"
      ng-if="nav.offer"
      ng-show="nav.offer">

    <div class="container" style="background:none;">
      <div class="row" >
        <ul class="account-links list-inline">
          <li class="orange-border">
            <a class="{{nav.subOffer.offers?'active':''}} orange-background-links"
                href="[@c.url value=path['offers.easysavings.path'] /]">
              [@spring.message "mastercard.site.navigation.second.level.offers.easy_savings"/]
            </a>
          </li>

          <li class="orange-border">
            <a class="{{nav.subOffer.pricelessCities?'active':''}} orange-background-links"
                href="[@c.url value=path['offers.pricelesscities.path'] /]">
              [@spring.message "mastercard.site.navigation.second.level.offers.priceless_cities"/]
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>


  [#-- Navigation toolbar for mobile on non-tools pages e.g. home --]
  <div class="mobileNavWrapper hidden-md hidden-lg" ng-show="!nav.subTools.shopTools">
    <div class="mobileNav hidden-md hidden-lg secondary navbar-default " ng-show="!nav.subTools.shopTools">
      <div class="container">
        <div class="row">
          <a href="${ctx.contextPath}${path['home.path']}">
            <img class="con-1 logo" src="${ctx.contextPath}/docroot/assets/img/logo/mbn.svg">
          </a>

          [#if coBrand?? && homeContent["logo_"+code]??]
              [#if homeContent["logo_link_"+code]??]
                <a href="${homeContent["logo_link_"+code]}">
                  <img class="cobrand-logo"
                    [#if homeContent["logo_"+code]??]
                      [#if cmsfn.contentById(homeContent["logo_"+code], "dam")?? ]]
                        src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent["logo_"+code], "dam"))}"
                      [#else]
                        src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent["logo"], "dam"))}"
                      [/#if]
                    [/#if]
                    />
                </a>

              [#else]
                <img class="cobrand-logo"
                  [#if homeContent["logo_"+code]??]
                    [#if cmsfn.contentById(homeContent["logo_"+code], "dam")?? ]]
                      src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent["logo_"+code], "dam"))}"
                    [#else]
                      src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent["logo"], "dam"))}"
                    [/#if]
                  [/#if]
                />
              [/#if]
          [/#if]

          <div class="pull-right">
            <a class="menu-link" type="button" ng-click="menuon=!menuon; menusubon=0;">
              <i class="fa fa-fw">&#xf0c9;</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>


  [#-- Mobile tools menu
  <div class="scroll-height-helper hidden-md hidden-lg" ng-show="nav.subTools.shopTools">
    <div class="mobileNav tools-menu secondary" ng-controller="categoryMenuScroll">

      <div class="tools-menu-row tools-menu-logo-row">
        <div class="container">

          <div class="row">
            <div class="pull-left">
              <div class="tools-logo">
                <a href="/">
                  <h1>TOOLS <span>powered <span>by BCSG</span></span></h1>
                </a>
              </div>
            </div>

            <div class="pull-right">
              <a class="menu-link" type="button"
                  ng-click="menuon=!menuon; menusubon=!menusubon; menusuper=!menusuper; checkMobileMenuStatus();">
                <i class="fa fa-fw">&#xf0c9;</i>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div class="tools-menu-row tools-menu-category-row visible-sm visible-xs hidden-lg hidden-md">
        <div class="h-scroll-wrapper container">
        [#-- <div class="category-menu category-bar" ng-class="{'menu-scroll':headerPositionClassChange}"> --
          <div class="row list-inline">
            [#if categoriesKeys??]
              [#list categoriesKeys as key]
                <div id="target_nav" class="col-xs-3">
                  <a ng-class="{'category-menu-active': selectedElement === '${key}'}"
                      ng-click="scrollTo('#${key}',${key_index})"
                      href="javascript:void(0);">
                    ${categories[key]["label"]!""}
                  </a>
                </div>
              [/#list]
            [/#if]
          </div>

        </div>
      </div>

    </div>
  </div>--]

  <!-- Mobile scrolling menu -->
  <div ng-click="menuon=!menuon; menusubon=0;" ng-class="{mobileoverlay:menuon==1}"></div>

  <div class="mobileNavMenu hidden-sm hidden-md hidden-lg visible-xs"
      ng-class="{pullmenu:menuon==1, mobileNavMenuOtherPages: [#if isTools?? && isTools]false[#else]true[/#if]}">

    <div class="links-header col-xs-12 col-sm-12 no-padding">
      <ul class="list-unstyled" id="profileList">
        <li ng-click="clickMobNavigation('tools', mob.tools)">
          <a href="" class="navigation-item" ng-click="menusubon = !menusubon">
            [@spring.message "mastercard.site.navigation.top.level.tools" /]
          </a>

          <ul class="list-unstyled mobile-sub" ng-class="{pullmenu:menusubon==1}" ng-show="mob.tools">
            <li class="back-to-tools" ng-click="menusubon=0; menuon=1;">
              <a>&lt;</a>
              <p>BUSINESS NETWORK</p>
            </li>

            <li class="clearfix">
              [@sec.authorize access="!isAuthenticated()"]
                <a href="[@c.url value=path['login.path'] /]" class="tracking-login">
                  [@spring.message "primaryHeader.login" /]
                </a>
              [/@sec.authorize]

              [@sec.authorize access="isAuthenticated()"]
                <a href="[@c.url value='/logout' /]">
                  [@spring.message "primaryHeader.logout" /]
                </a>
              [/@sec.authorize]
            </li>

            <li>
              <a href="[@c.url value=toolsLink /]" class="tracking-shop-tools">
                [@spring.message "mastercard.site.navigation.second.level.tools.market_place" /]
              </a>
            </li>

            [@sec.authorize access="!isAuthenticated()"]
              <li class="disabled">
                <a>[@spring.message "mastercard.site.navigation.second.level.tools.my_tools" /]</a>
              </li>
              <li class="disabled">
                <a>[@spring.message "mastercard.site.navigation.second.level.tools.my_account" /]</a>
              </li>
            [/@sec.authorize]

            [@sec.authorize access="isAuthenticated()"]
              <li>
                <a href="[@c.url value=path['homeloggedin.path'] /]">
                  [@spring.message "mastercard.site.navigation.second.level.tools.my_tools" /]
                </a>
              </li>

              <li ng-click="accountmenu = !accountmenu">
                <a>
                  [@spring.message "mastercard.site.navigation.second.level.tools.my_account" /]
                  <span ng-show="!accountmenu" class="account-opener pull-right">+</span>
                  <span ng-show="accountmenu" class="account-opener pull-right">-</span>
                </a>
              </li>

              <div class="account-menu-mobile" ng-show="accountmenu">
                [@sec.authorize access="hasRole('ROLE_USER')"]
                  <li>
                    <a href="[@c.url value=path['myprofile.path'] /]">
                      [@spring.message "menu_link_profile_myprofile" /]
                    </a>
                  </li>
                [/@sec.authorize]

                [@sec.authorize access="hasRole('ROLE_MASTER')"]
                  <li>
                    <a href="[@c.url value=path['billinginfo.path'] /]">
                      [@spring.message "menu_link_manage_billing_info" /]
                    </a>
                  </li>
                [/@sec.authorize]

                [@sec.authorize access="hasRole('ROLE_MANAGER')"]
                  <li>
                    <a href="[@c.url value="${path['invitepeople.path']}?ref=menu" /]">
                      [@spring.message "menu_link_manage_invite_people" /]
                    </a>
                  </li>
                [/@sec.authorize]

                [@sec.authorize access="hasAnyRole('ROLE_MANAGER', 'ROLE_MANAGER_PURCHASE_AUTHORITY')"]
                  <li>
                    <a href="[@c.url value=path['viewlicences.path'] /]">
                      [@spring.message "menu_link_manage_view_licences" /]
                    </a>
                  </li>
                [/@sec.authorize]
              </div>
            [/@sec.authorize]
          </ul>
        </li>

        [#if (coBrand.offers)!true]
          <li ng-click="offersmenu = !offersmenu">
            <a>
              [@spring.message "mastercard.site.navigation.top.level.offers" /]
              <span ng-show="!offersmenu" class="account-opener pull-right">+</span>
              <span ng-show="offersmenu" class="account-opener pull-right">-</span>
            </a>
          </li>

          <li ng-show="offersmenu">
            <a href="[@c.url value=offersLink /]" class="tracking-offers-link">
              [@spring.message "mastercard.site.navigation.second.level.offers.easy_savings" /]
            </a>
          </li>

          <li ng-show="offersmenu">
            <a href="[@c.url value=util.p('offers.pricelesscities') /]" class="tracking-offers-link">
              [@spring.message "mastercard.site.navigation.second.level.offers.priceless_cities" /]
            </a>
          </li>
        [/#if]

        [#if paymentLink?has_content]
          <li>
            <a href="[@c.url value=paymentLink /]" class="tracking-accept-payment-link">
              [@spring.message "mastercard.site.navigation.top.level.accept_payments" /]
            </a>
          </li>
        [/#if]

        [#if insightLink?has_content]
          <li ng-click="clickMobNavigation('connect', mob.connect)">
            <a href="[@c.url value=insightLink /]">
              [@spring.message "mastercard.site.navigation.top.level.connect" /]
            </a>
          </li>
        [/#if]

        <li>
          <a href="[@c.url value='/tools/help-and-support' /]" class="tracking-help-support">
            [@spring.message "mastercard.site.navigation.second.level.tools.help" /]
          </a>
        </li>

        <li ng-click="clickMobNavigation('aboutus', mob.aboutus)">
          <a href="${ctx.contextPath}${aboutLink}">
            [@spring.message "mastercard.site.navigation.top.level.about_us" /]
          </a>
        </li>
      </ul>
    </div>
  </div>

</header>
