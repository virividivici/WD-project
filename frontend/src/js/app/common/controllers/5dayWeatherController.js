angular.module('forecast')

    .controller('5dayWeatherCtrl', ['$scope', 'getService', function ($scope, getService) {
        
        $scope.weatherForcast = {};
        $scope.apikey= "apikey=d2713e5fdebd4d8cc3d3498bd386444d";
        $scope.apilink= "http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&cnt=6"; // &id=2643743&
        $scope.partialUrl = 'assets/partials/weather.html';

    
        $scope.lookUpWeatherForcast = function(locationId) {
            console.log(locationId);
            var resURI = $scope.apilink + '&' + $scope.apikey + '&id=' + locationId;
            
            console.log(getService.getData(resURI));
        
            getService.getData(resURI).then(function(response){
                lookUpWeatherForcastCallBack(response.data);
            });
        }
        var getNextDayes = function(num) {
            
            var days = [];
            for (var i = num - 1; i >= 0; i--) {
                var d = new Date();
                d.setDate(d.getDate() + i);
                days[i] = d;
            }

            return days;

        }

        $scope.nextDays = getNextDayes(6);


        var lookUpWeatherForcastCallBack = function( weather) {

            //$scope.partialUrl = 'assets/partials/weather.html';
            $scope.weatherForcast = weather;
        }  


        $scope.datas = [
            {"_id":2643743,name:"London","country":"GB","coord":{"lon":-0.12574,"lat":51.50853}},
            {"_id":6455259,name:"Paris","country":"FR","coord":{"lon":2.35236,"lat":48.856461}},
            {"_id":2993458,name:"Monaco","country":"MC","coord":{"lon":7.41667,"lat":43.73333}},
            {"_id":2960313,name:"Grand Duchy of Luxembourg","country":"LU","coord":{"lon":6.16667,"lat":49.75}},
            {"_id":3186886,name:"Zagreb","country":"HR","coord":{"lon":15.97798,"lat":45.814442}},
            {"_id":7778677,name:"Dublin City","country":"IE","coord":{"lon":-6.24922,"lat":53.355122}},
            {"_id":6458783,name:"Geneva","country":"CH","coord":{"lon":6.12737,"lat":46.208038}},
            {"_id":2761369,name:"Vienna","country":"AT","coord":{"lon":16.37208,"lat":48.208488}},
            {"_id":2267057,name:"Lisbon","country":"PT","coord":{"lon":-9.13333,"lat":38.716671}},
            {"_id":8133876,name:"Dimos Athens","country":"GR","coord":{"lon":23.73604,"lat":37.98888}},
            {"_id":756135,name:"Warsaw","country":"PL","coord":{"lon":21.01178,"lat":52.229771}},
            {"_id":3128832,name:"Barajas de Madrid","country":"ES","coord":{"lon":-3.57777,"lat":40.47366}},
            {"_id":745044,name:"Istanbul","country":"TR","coord":{"lon":28.949659,"lat":41.01384}},
            {"_id":2950159,name:"Berlin","country":"DE","coord":{"lon":13.41053,"lat":52.524368}},
            {"_id":2673722,name:"Stockholms Län","country":"SE","coord":{"lon":18,"lat":59.5}}, 
            {"_id":4219762,name:"Rome","country":"US","coord":{"lon":-85.164673,"lat":34.257038}},      
            {"_id":2800865,name:"Arrondissement Brussel","country":"BE","coord":{"lon":4.35,"lat":50.849998}},
            {"_id":2759794,name:"Amsterdam","country":"NL","coord":{"lon":4.88969,"lat":52.374031}}
        ];

        $scope.onSelect = function(selection) {
            console.log(selection["_id"]);
            $scope.lookUpWeatherForcast(selection["_id"]);
        };

    }]);