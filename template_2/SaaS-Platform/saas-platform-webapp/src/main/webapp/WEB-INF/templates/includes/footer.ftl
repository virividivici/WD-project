
[#import "../libs/cobrand.ftl" as cb]


[#assign homeContent = cmsfn.contentByPath(path['home.path'])]
[#assign code = (coBrand.code)!]
[#assign
  cbcode = cb.cobrandCode()
  logo = cb.getCobrandFieldValue("logo")
  logo_link = cb.getCobrandFieldValue("logo_link")
  card_link = cb.getCobrandFieldValue("business_card_link")
]


<footer class="section">
    [@sec.authorize access="!isAuthenticated()"]
        <div class="footer-top-bar-banner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-6 no-left-padding">
                        <img src="${ctx.contextPath}/docroot/assets/img/mbn.svg" />

                        [#if coBrand??  && homeContent['footer_logo_'+code]??]
	                        [#if homeContent['logo_link_'+code]??]
					              <a href="${homeContent['logo_link_'+code]}">
					                <img class="corporate-logo cobrand-${cbcode}"
					                  [#if cmsfn.contentById(homeContent['footer_logo_'+code], 'dam')??]
					                    src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['footer_logo_'+code], 'dam'))}"
					                  [#else]
					                    src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo'], 'dam'))}"
					                  [/#if]
					                />
					              </a>
				            [#else]
				              <img class="corporate-logo cobrand-${cbcode}"
				                [#if cmsfn.contentById(homeContent['footer_logo_'+code], 'dam')??]
				                  src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['footer_logo_'+code], 'dam'))}"
				                [#else]
				                  src="${CDNURL}${cmsfn.link(cmsfn.contentById(homeContent['logo'], 'dam'))}"
				                [/#if]
				              />
				            [/#if]
            			[/#if]
                    </div>


                    [#if card_link?has_content]
                      <div class="col-xs-12 col-md-offset-2 col-md-4 no-left-padding">
                        <a href="${card_link}" class="business-card-link">
                          [@spring.message "mastercard.footer.top.findbusinesscard"/] <i class="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    [/#if]
                </div>
            </div>
        </div>
    [/@sec.authorize]

    <div class="primary">
        <div class="container">
            <div class="row">
                <div class="footerLinks col-xs-12 col-sm-4">
                    <ul>
                        <li>
                            <a href="${ctx.contextPath}${path['about.path']}">[@spring.message "mastercard.footer.bottom.about"/]</a>
                        </li>
                        <li>
                            <a href="[@c.url value=path['sitemap.path'] /]">[@spring.message "mastercard.footer.bottom.sitemap"/]</a>
                        </li>
                    </ul>
                </div>

                <div class="footerLinks col-xs-12 col-sm-4">
                    <ul>
                        <li>
                            <a href="[@c.url value=path['helpandsupport.path'] /]">[@spring.message "mastercard.footer.bottom.helpandsupport"/]</a>
                        </li>
                        <li>
                            [#if ctx.request.requestURL?index_of("pricelesscities") != -1]
                                <a href="https://www.priceless.com/en-ca/terms-of-use.html">
                                    [@spring.message "mastercard.footer.bottom.termsandprivacy"/]
                                </a>
                            [#else]
                                <a href="[@c.url value=path['terms.path'] /]">
                                    [@spring.message "mastercard.footer.bottom.termsandprivacy"/]
                                </a>
                            [/#if]
                        </li>
                    </ul>
                </div>

                <div class="footerLinks col-xs-12 col-sm-4">
                    <ul>
                        <li>
                            [@spring.message "mastercard.footer.bottom.findoutmore"/]
                        </li>

                        <ul class="footer-findout-more">
                            <li>
                                <a target="_blank" href="http://www.mastercard.us/consumer_index.html">[@spring.message "mastercard.footer.bottom.personal"/]</a>
                            </li>
                            <li>
                                <a target="_blank" href="http://www.mastercard.us/">[@spring.message "mastercard.footer.bottom.business"/]</a>
                            </li>
                            <li>
                                <a target="_blank" href="http://www.mastercard.us/merchants/index.html">[@spring.message "mastercard.footer.bottom.merchants"/]</a>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
            <!-- end of row -->

            <div class="row footer-note">
                <div class="col-md-12 col-sm-12 copyright-link no-left-padding">
                    [#assign aDateTime = .now]
                    [#assign thisYear = aDateTime?date]
                    [#assign arguments = ["${thisYear?string.yyyy}"]]

                    <p class="pull-left no-padding">&#169; [@spring.messageArgs "mastercard.footer.bottom.copyright" arguments /]</p>
                </div>
            </div>
            <!-- end of row div -->
        </div>
        <!-- container div -->
    </div>
    <!-- primary div -->
</footer>


<script type="text/javascript" src="${ctx.contextPath}/docroot/assets/js/main.min.js"></script>
[#if !(state.originalBrowserURI?matches("\\/[A-Za-z]{2}\\/offer*(.+)") || state.originalBrowserURI?matches("\\/[A-Za-z]{2}\\/about") || state.originalBrowserURI?matches("\\/[A-Za-z]{2}\\/find-a-business-mastercard-card")) ]
    <script type="text/javascript" src="${ctx.contextPath}/docroot/assets/js/olark.js"></script>
    <noscript><a href="https://www.olark.com/site/2929-833-10-9389/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript>
[/#if]

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

[#if coBrand?? && homeContent["gaConfigId_"+cbcode]?? && homeContent["gaConfigDomain_"+cbcode]??]
  ga('create', '${homeContent["gaConfigId_"+cbcode]}', '${homeContent["gaConfigDomain_"+cbcode]}');
[#else]
  ga('create', '${homeContent["gaConfigDefaultId"]}', '${homeContent["gaConfigDefaultDomain"]}');
[/#if]

  ga('send', 'pageview');

[#if ctx.request.requestURL?ends_with("/tools/purchase-summary/payment-confirmation")]
  [#assign revenue= quantity*kkProduct.product.price0 /]
  ga('require', 'ecommerce');

  ga('ecommerce:addTransaction', {
      'id': '${product.arouzRatePlanId?string}',         // Transaction ID. Required.
      'affiliation': 'MBOT',                             // Affiliation or store name.
      'revenue': '${revenue}',                           // Grand Total.
      'shipping': '',                                    // Shipping.
      'tax': ''                                          // Tax.
  });

  ga('ecommerce:addItem', {
      'id': '${product.arouzRatePlanId?string}',                       // Transaction ID. Required.
      'name': '${kkProduct.product.name}',                             // Product name. Required.
      'sku': '${kkProduct.product.id}',                                // SKU/code.
      'category': '[#if isBundle ]bundle[#else]single[/#if]',          // Category or variation.
      'price': '${kkProduct.product.price0}',                          // Unit price.
      'quantity': '${quantity}'                                        // Quantity.
  });

  ga('ecommerce:send');
[/#if]
</script>

<script type="text/javascript" src="${ctx.contextPath}/docroot/assets/js/ga.js"></script>
