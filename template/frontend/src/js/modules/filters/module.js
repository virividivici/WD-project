angular.module('filters', []).filter('cardtype', function() {
  return function(input) {
  	var type ='000';
  	
	if (/^4[0-9]{6,}$/.test(input)) {
		type="001";
	}else {
		if(/^5[0-9]{5,}$/.test(input)){
	       	type="002";
	    }else{
	    	if(/^3[47][0-9]{5,}$/.test(input)){
		       	type="003";
		    }else{
		    	if(/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/.test(input)){
			       	type="005";
			    }else{
			    	if(/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(input)){
				       	type="004";	    	
				    }else{
				    	if(/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/.test(input)){
					       	type="007";	    	
					    }
				    }	
			    }
		    }
	    }
	}

	
	
    return type;
  };
});