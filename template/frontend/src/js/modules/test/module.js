angular.module('filters', []).filter('cardtypepopover', function() {
  return function(input) {
  	var popoverImage ='';
  	
	if (/^4[0-9]{6,}$/.test(input)) {
		popoverImage ="visa-security-code";
	}else {
		if(/^5[0-9]{5,}$/.test(input)){
	       	popoverImage ="";
	    }else{
	    	if(/^3[47][0-9]{5,}$/.test(input)){
		       	popoverImage ="amex-security-code";
		    }else{
		    	if(/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/.test(input)){
			       	popoverImage ="";
			    }else{
			    	if(/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(input)){
				       	popoverImage ="";   	
				    }else{
				    	if(/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/.test(input)){
					       	popoverImage ="";   	
					    }
				    }	
			    }
		    }
	    }
	}

	
	
    return popoverImage;
  };
});