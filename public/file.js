var app = angular.module('feature', ['ngRoute']);

app.config(function($routeProvider, $httpProvider,$sceDelegateProvider){
	$routeProvider
	.when('/',{
		templateUrl:'/searchpage.htm'
	})
	.when('/search',{
		templateUrl:'/searchpage.htm'
	})
	.when('/feature',{
		templateUrl:'/feature.htm'
	});

	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
app.controller('searchbox',function($scope,$http){
	$scope.myVar = false;
	$scope.showDetail = false;
	$("html").css('height','100%');
	$scope.search = function(e,val){ 
		if(e.keyCode == '13' || e == '13'){
			var url = "http://www.omdbapi.com?t="+encodeURIComponent($scope.sinput);
			
			if($scope.isFull)
				url+="&plot=full";
			else
				url+="&plot=short";

            var response = getAPICall.getResult(url);
			if(response.data.Response!="False"){
				$("html").css('height','auto');
				$scope.myVar = false;
				$scope.showDetail = true;
				$scope.title=response.data.Title;
				$scope.rate=response.data.Rated;
				$scope.rel=response.data.Released;
				$scope.run=response.data.Runtime;
				$scope.gen=response.data.Genre;
				$scope.dic=response.data.Director;
				$scope.wri=response.data.Writer;
				$scope.act=response.data.Actors;
				$scope.lang=response.data.Language;
				$scope.imrat=response.data.imdbRating;
				$scope.imvot=response.data.imdbVotes;
				$scope.type=response.data.Type;
				$scope.lor=response.data.Ratings;
				$scope.year=response.data.Year;
				$scope.award=response.data.Awards;
				$scope.poster=(response.data.Poster!="N/A") ? response.data.Poster :"https://image.ibb.co/cZ3D5k/ni.jpg";
				$scope.plot=response.data.Plot;
			}
			else if(response.data.Response=="False"){
				$scope.myVar = true;
				$scope.showDetail = false;
			}
		}
	}
});

app.controller('Menu', function($scope){
	$("html").css('height','160%');
	$scope.home = true;
	$scope.feature = false;
	
	$scope.onclick = function(){
		
		if($scope.home){
			$scope.home = false;
			$scope.feature = true;
		}else{
			$scope.home = true;
			$scope.feature = false;
		}
	}
});
app.controller('mvController1',['$scope','getAPICall', function($scope , getAPICall){

    var resp = getAPICall.getResult('http://www.omdbapi.com?i=tt4849438');
    if(resp!=null) {
        $scope.myWelcome = resp.data;
        $scope.title = resp.data.Title;
        $scope.year = resp.data.Year;
        $scope.award = resp.data.Awards;
        $scope.poster = (resp.data.Poster != "N/A") ? resp.data.Poster : "https://image.ibb.co/cZ3D5k/ni.jpg";
        $scope.plot = resp.data.Plot;
    }
}]);
app.controller('mvController2', ['$scope','getAPICall',function($scope , getAPICall){

	var resp = getAPICall.getResult('http://www.omdbapi.com?i=tt4849438');
    if(resp!=null) {
        $scope.myWelcome = resp.data;
        $scope.title = resp.data.Title;
        $scope.year = resp.data.Year;
        $scope.award = resp.data.Awards;
        $scope.poster = (resp.data.Poster != "N/A") ? resp.data.Poster : "https://image.ibb.co/cZ3D5k/ni.jpg";
        $scope.plot = resp.data.Plot;
    }
	
}]);
app.factory('getAPICall',function($http){
    return {
    	getResult : function(url){
            $http.get(url)
                .success(function(response) {
                    return response;
                });
		}
	}
});