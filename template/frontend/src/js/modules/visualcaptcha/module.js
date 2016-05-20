(function() {
    'use strict';
    angular.module('visualcaptcha', [])
        
        .service('visualCaptchaService', VisualCaptchaService);


        function VisualCaptchaService() {
                
    		this.captcha = {
                "21" : {
                    "en" : "Lock",
                    "fr" : "Cadenas"},
                "1" : {
                    "en" : "Cat",
                    "fr" : "Chat"},
                "2" : {
                    "en" : "Car",
                    "fr" : "Voiture"},
                "3" : {
                    "en" : "Van",
                    "fr" : "Camion"},
                "4" : {
                    "en" : "T-shirt",
                    "fr" : "T-shirt"},
                "5" : {
                    "en" : "Graph",
                    "fr" : "Graphique"},
                "6" : {
                    "en" : "Laptop",
                    "fr" : "PC portable"},
                "7" : {
                    "en" : "Clock",
                    "fr" : "Horloge"},
                "8" : {
                    "en" : "Sun glasses",
                    "fr" : "Lunettes de soleil"},
                "9" : {
                    "en" : "Balloons",
                    "fr" : "Ballons"},
                "10" : {
                    "en" : "Magnifier",
                    "fr" : "Loupe"},
                "11" : {
                    "en" : "Umbrella",
                    "fr" : "Parapluie"},
                "12" : {
                    "en" : "Paper clip",
                    "fr" : "Trombone"},
                "13" : {
                    "en" : "Folder",
                    "fr" : "Dossier"},
                "14" : {
                    "en" : "Globe",
                    "fr" : "Monde"},
                "15" : {
                    "en" : "Chair",
                    "fr" : "Chaise"},
                "16" : {
                    "en" : "Cloud",
                    "fr" : "Nuage"},
                "17" : {
                    "en" : "Musical note",
                    "fr" : "Note de musique"},
                "18" : {
                    "en" : "House",
                    "fr" : "Maison"},
                "19" : {
                    "en" : "Pencil",
                    "fr" : "Crayon"},
                "20" : {
                    "en" : "Plane",
                    "fr" : "Avion"}
            }

            this.captchOptionsList = {
            	"captchaOption_1" : {
	                "img": "20",
	                "name": "Plane"},
	            "captchaOption_2" : {
	                "img": "19",
	                "name" : "Plane"},
	            "captchaOption_3" : {
	                "img": "18",
	                "name" : "Plane"},
	            "captchaOption_4" : {
	                "img": "17",
	                "name" : "Plane"},
	            "captchaOption_5": {
	                "img": "16",
	                "name" : "Plane"}
			}
            this.captchaOption_1 = {
                img: "20",
                name: "Plane"};
            this.captchaOption_2 = {
                img: "19",
                name : "Plane"};
            this.captchaOption_3 = {
                img: "18",
                name : "Plane"};
            this.captchaOption_4 = {
                img: "17",
                name : "Plane"};
            this.captchaOption_5 = {
                img: "16",
                name : "Plane"};

            this.captchaOptions = randomCaptcha();

            function randomCaptcha() {
                var arr = []
                while(arr.length < 5){
                  var randomnumber=Math.ceil(Math.random()*21)
                  var found=false;
                  for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                  }
                  if(!found)arr[arr.length]=randomnumber;
                }
                
                return arr;
            };

            this.setCaptcha = function(locale) {
            
                 
                this.captchaOptions = randomCaptcha();

                console.log(this.captchaOptions);  
                var rand = this.captchaOptions[Math.floor(Math.random() * this.captchaOptions.length)];
                var i = 0;
                console.log(rand); 
                angular.forEach(this.captchaOptions, function(count){
                    console.log('count',count); 
                    i = i + 1;
                	console.log(this.captcha); 
                    this.captchOptionsList['captchaOption_'+ i ]["name"] =  this.captcha[count][locale] ;
                    console.log(this['captchaOption_'+ i ]["name"]); 
                    this['captchaOption_'+ i ].img =  count;
                   
                    if(count == rand){
                        this.captchaAnswer = this.captcha[count][locale];
                         
                    }
                });

                return true;
            };

            this.answerCaptcha = function(answer) {
            	console.log(answer);
                if( this.captchaAnswer == answer) {
                   return true;
                }else {
                    return false;
                }
              
            }  
        }  
})();
