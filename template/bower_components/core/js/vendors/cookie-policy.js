$(window).load(function (){
    initCookiePolicyPopUp('dbit.cookiePolicy');
});
function initCookiePolicyPopUp(theCookiePolicy) {

   
    var cookiePolicyHtml = "<div id='cookie-policy-noticebar-content' class='cookie-policy'>
                                <div class='container'>
                                    <div class='row'>
                                        <div class='col-sm-11'>
                                            <p>Questo sito utilizza sia cookie tecnici che di profilazione, anche di terze parti, per inviarti pubblicità e servizi in linea con le tue preferenze. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie <a target='_blank' href='../informativa-sui-cookie'>clicca qui</a>.</p>
                                            <p>Chiudendo questo banner o cliccando su qualunque elemento della pagina acconsenti all'uso dei cookie.</p>
                                            
                                        </div>
                                        <div class='col-sm-1 pull-right'>
                                            <div class='cursor'><a class='close-cookie-policy'>OK</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>";
     
   
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
    
    document.cookie = name + "=" + value + expires + "; domain=dbimpresaextra.it;path=/";
 
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

// hides the cookie container if the user clicks anywhere outside the cookie message
$(document).click(function (e)
{
    var container = $("#cookie-policy-noticebar-content");

    if (!container.is(e.target)
        && container.has(e.target).length === 0)
    {
        container.hide();
    }
});