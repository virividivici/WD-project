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