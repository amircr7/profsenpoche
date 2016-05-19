// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('YourApp', ['ionic','ngSanitize', 'ngCordova','ngIOS9UIWebViewPatch','mobsocial.products']);
// not necessary for a web based app // needed for cordova/ phonegap application
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
//app run getting device id
app.run(function ($rootScope, myPushNotification) {
	// app device ready
	document.addEventListener("deviceready", function(){
		if(!localStorage.device_token_syt || localStorage.device_token_syt == '-1'){ 
			myPushNotification.registerPush();
		}
	});
   $rootScope.get_device_token = function () {
      if(localStorage.device_token_syt) {
         return localStorage.device_token_syt;
      } else {
         return '-1';
      }
   }
   $rootScope.set_device_token = function (token) {
      localStorage.device_token_syt = token;
      return localStorage.device_token_syt;
   }
});
//myservice device registration id to localstorage
app.service('myService', ['$http', function($http) {
   this.registerID = function(regID, platform) {
   		//alert(regID);
		localStorage.device_token_syt = regID;
   }
}]);

// config to disable default ionic navbar back button text and setting a new icon
// logo in back button can be replaced from /templates/sidebar-menu.html file
app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
})
// intro controller // 
app.controller('IntroCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', function($scope, $state, $ionicSlideBoxDelegate) {
  // Called to navigate to the main app
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  // discard and move to homepage
  $scope.discardIntroPage = function(){
		$state.go('app.login');
  }
}])
/* main controller function */
app.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicHistory','$http', function($scope, $ionicSideMenuDelegate, $ionicHistory,$http) {
  	// Toggle left function for app sidebar
  	/*$scope.pagename = $route.current.$$route.name;*/
  	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  	$http.get('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_envoie_true_si_userconect')
        .success(function(userconnect,headers,config)
        {
                
                console.log($http);
                $scope.testuserconnect=userconnect;
                console.log($scope.testuserconnect);

                
        })
        .error(function(data,headers,config)
        {
            
            console.log('erreur denvoi de testconnect user !')
        });
  	
  	$scope.toggleLeft = function() {

  		/*$route.current.templateUrl=*/
  		/*$scope.$on('$ionicView.enter', function () {
            angular.forEach(document.querySelectorAll("ion-view"), function (element) {
                if (element['$attr-nav-view'] == 'entering' || element['$attr-nav-view'] == 'active') {
                    console.log('element is the active view');

                }
            });
        });*/
    	$ionicSideMenuDelegate.toggleLeft();
  	};

  	// go back to previous page
  	$scope.goBackOne = function(){
		$ionicHistory.goBack();
	}
	// sharing plugin
	$scope.shareMain = function(){
		var title = "Download Smove For Android";
		var url = "https://play.google.com/store/apps/details?id=com.myspecialgames.swipe";
		window.plugins.socialsharing.share(title, null, null, url)
	}
	$scope.shareArticle = function(title,url){
		window.plugins.socialsharing.share(title, null, null, url)
	}
	$scope.openLinkArticle = function(url){
		window.open(url, '_system');
	}
}])
// login page of app //
app.controller('LoginCtrl', ['$state','$scope','$http',  function($state, $scope, $http) {	
	// add your login logic here
	$scope.doLogin = function(){ 
     
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';



        data = {
        'login' :    $scope.userlogin,
        'password' : $scope.userpassword
        };

        if((typeof($scope.userlogin) != 'undefined')&&(typeof($scope.userpassword)!='undefined'))
                {
        console.log(data); 
        $http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_authentification', data)
        .success(function(data,headers,config)
        {
        $scope.PostDataResponse=data;
        console.log($http);
        console.log('Logged succesfully!');
        
        $state.go('app.message');
            
        })
        .error(function(data,headers,config)
        {
            
        console.log ('Invalid username or password!');
       /* $state.go('app.forgot');*/
        });
    
           

			}
			else
				console.log('undefined login ou mot de passe')
			     
			 }      
}])

		/*var data = 'login='+$scope.login+'&password='+$scope.password;
            
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
             $http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_authentification', data, config)
            .success(function (data, status, headers, config) {
            	console.log('success');
                $scope.PostDataResponse = data;
                if(data === 'F'){
                $scope.message = 'Invalid username or password!';
            } else  {
                $scope.message = 'Logged succesfully!';

                $state.go('app.features');

            }
           


	});*/
       
// Sign up page of app //
app.controller('SignUpCtrl', ['$state','$scope','$http', function($state, $scope,$http) {	
	// sign up logic here
	$scope.doRegister = function(){
         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';



        data = {
            'nom'    :    $scope.nom,
            'prenom' :    $scope.prenom,
            'email'  :    $scope.email,
            'numtel' :    $scope.numtel,
            'motdepasse': $scope.motdepasse,
            'classe' :    $scope.classe,
            'login' :     $scope.login

                  };
        console.log(data); 
        $http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_inscription', data)
        .success(function(data,headers,config)
        {
         console.log('succes denvoi de vos cordonées');
         $state.go('app.features');
        })
        .error(function(data,headers,config)
        {
            console.log('erreur'); 
        });
    


		
	}
}])
// Forgot password page of app //
app.controller('ForgotCtrl', ['$scope', function($scope) {	
	// forgot password
}])
// Forgot password page of app //
app.controller('GalleryCtrl', ['$scope', 'Photos', '$ionicModal', function($scope, Photos, $ionicModal) {
	
	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Photos.getPosts()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if($scope.times >= 4) {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
	// modal to show image full screen
   $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal = modal;
   });
   $scope.openModal = function () {
		$scope.showNav = true;
      $scope.modal.show();
   };

   $scope.closeModal = function () {
      $scope.modal.hide();
   };
	// show image in popup
   $scope.showImage = function (index) {
		$scope.imageIndex = index;
      $scope.imageSrc = $scope.items[index].image_full;
      $scope.openModal();
   }
	// image navigation // swiping and buttons will also work here
	$scope.imageNavigate = function(dir){
		if(dir == 'right'){
			$scope.imageIndex = $scope.imageIndex + 1;
		} else {
			$scope.imageIndex = $scope.imageIndex - 1;
		}
		//alert(dir);
		if($scope.items[$scope.imageIndex] === undefined){
			$scope.closeModal();
		} else {
			$scope.imageSrc = $scope.items[$scope.imageIndex].image_full;
		}
	}
	// cleaning modal
	$scope.$on('$stateChangeStart', function(){
	  $scope.modal.remove();
	});
}])
/*  Videos controller  */
app.controller('VideosCtrl', ['$scope', 'VideoData', '$sce', function($scope, VideoData, $sce) {	
	$scope.items = VideoData.items;
	// to work embed in angularjs pages
	$scope.videoEmbed = function(video){
		return $sce.trustAsResourceUrl(video);
	}
}])
/* Blog controller */
app.controller('BlogCtrl', ['$scope', 'Blog', function($scope, Blog) {	

	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Blog.getPosts()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if($scope.times >= 4) {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])
/*  Profile page template */

/* Blog controller */
app.controller('NewsCtrl', ['$scope', 'Blog', function($scope, Blog) {	
	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Blog.getPosts()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if($scope.times >= 4) {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])
/* Friends controller */
app.controller('FriendsCtrl', ['$scope', 'Friends', function($scope, Friends) {	
	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Friends.getFriends()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if($scope.times >= 4) {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])
/*   Articles controller  */
app.controller('PostCtrl', ['$scope', 'Comments', '$ionicModal', 'PostData', function($scope, Comments, $ionicModal, PostData) {	
	$scope.items = [];
	$scope.postDataMain = PostData;
	// load more content function
	$scope.getPosts = function(){
		Comments.getComments()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	$scope.getPosts();
	// comment modal
	$ionicModal.fromTemplateUrl('comment-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
	 	$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	 	$scope.modal.remove();
	});
}])
/*  Settings Controller */
app.controller('SettingsCtrl',['$scope', function($scope) {
}])
/*  Settings Controller */
app.controller('SocialProfileCtrl',['$scope','SocialData', function($scope,SocialData) {
	$scope.socials = SocialData.items;
}])
/* Features Controller */
app.controller('FeaturesCtrl', ['$scope', 'Features', function($scope, Features) {
	$scope.items = Features.items;
}])
/* About us Controller */
app.controller('AboutCtrl', ['$scope', function($scope) {
}])
/* Contact us form page */
app.controller('ContactCtrl', ['$scope', 'ConfigContact', function($scope, ConfigContact) {
	//setting heading here
	$scope.user = [];
	// contact form submit event
	$scope.submitForm = function(isValid) {
		if (isValid) {
			cordova.plugins.email.isAvailable(
				function (isAvailable) {
					window.plugin.email.open({
						to:      'contact@planeteprofs.com',
						subject: 'ProfsenPoche test mail',
						body:    '<h1>'+$scope.user.email+'</h1><br><h2>'+$scope.user.name+'</h2><br><p>'+$scope.user.details+'</p>',
						isHtml:  true
					});

				})
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				data = {
               'email' :$scope.userlogin,
               'name' : $scope.userpassword,
               'details' :$scope.user.details
                       };
                $http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_mailing', data)
			    .success(function(data,headers,config)
			    {
			    $scope.PostDataResponse=data;
			    console.log($http);
			    console.log('envoie mail');   
			    })
			    .error(function(data,headers,config)
			    {
			        
			    console.log ('erreur envoie mail');
			   
			    });        	

				
			
		}
	}
}])
// push controller
app.controller('PushCtrl', ['$scope', 'SendPush', function($scope, SendPush){
	$scope.device_token = $scope.get_device_token();
	$scope.sendNotification = function()
	{
		SendPush.android($scope.device_token)
		.success(function () {
              console.log('push notification');
		})
		.error(function (error) {
              console.log('erreur notification');
		});
	}
}]);
// show ad mob here in this page
app.controller('AdmobCtrl', ['$scope', 'ConfigAdmob', function($scope, ConfigAdmob){
	$scope.showInterstitial = function(){
		if(AdMob) AdMob.showInterstitial();
	}
	document.addEventListener("deviceready", function(){
		if(AdMob) {
			// show admob banner
			if(ConfigAdmob.banner) {
				AdMob.createBanner( {
					adId: ConfigAdmob.banner, 
					position: AdMob.AD_POSITION.BOTTOM_CENTER, 
					autoShow: true 
				} );
			}
			// preparing admob interstitial ad
			if(ConfigAdmob.interstitial) {
				AdMob.prepareInterstitial( {
					adId:ConfigAdmob.interstitial, 
					autoShow:false
				} );
			}
		}
		if(ConfigAdmob.interstitial) {
			$scope.showInterstitial();
		}
	});
}]);
// new items v2.0
// messages list
app.controller('MessagesCtrl', ['$scope', 'Messages', function($scope, Messages){
	
	$scope.items = [];
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Messages.getMesages()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.postsCompleted = true;
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}]);
// single message
app.controller('MessageCtrl', ['$scope', 'Messages', '$ionicScrollDelegate','$http', function($scope, Messages, $ionicScrollDelegate,$http){
	
	$scope.messages = [];
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Messages.getMessage()
		.success(function (posts) {
			$scope.messages = $scope.messages.concat(posts);
			
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicScrollDelegate.scrollBottom();
			$scope.postsCompleted = true;
		})
		.error(function (error) 
		{
			$scope.items = [];
		});

	}
     //il faut recevoir true from phpServer pour un newmessage pour executer le Setinterval
     //donc il faut appeler une fonction get qui s'execute chaque seconde pour demander silya un true qui vient
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    	check_new_message = function(){
	        	
	        $http.get('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_check_new_message')
	        .success(function(checkmsg,headers,config)
	        {    
		        $scope.checkmsg=checkmsg;
		        console.log($scope.checkmsg);  
		        if($scope.checkmsg.trim()=='true')
		        {
		        	console.log('Nouveau message recu');
			        $scope.getPosts();						    
				} else {
		            console.log('pas de message');
		        } 
		        check_new_message();
			}).error(function(checkmsg,headers,config)
	        {    
	            console.log('erreur check message ');
	            check_new_message();
	        });
		}
        angular.element(document).ready(function (){
	        check_new_message();
		});
    

         
	/*$timeout($scope.getPosts(), 1000);*/
	/*setTimeout( function()
    {
        
        console.log('setinterval');
		$scope.getPosts();
        $scope.$apply();
    }, 1000 );*/
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.messages = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.autoExpand = function(e) {
		var element = typeof e === 'object' ? e.target : document.getElementById(e);
		var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
		element.style.height =  scrollHeight + "px";
	};

	function expand() {
		$scope.autoExpand('TextArea');
	}
	/*$scope.updateEditor = function() {
		var element = document.getElementById("page_content");
		element.style.height = element.scrollHeight + "px";
	};*/

	$scope.addMesage = function(){
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.get('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_get_msg_senderANDchannel')
        .success(function(userid,headers,config)
        {

             $scope.msgdetails=userid;
             console.log($scope.msgdetails);
        })
        .error(function(userid,headers,config)
        {
            
            console.log('erreur !')
        });

  
        var newMessage = new function() {
			this.message = $scope.datamessage;
			/*this.fr=$scope.msgdetails;*/
			/*this.image	= '';*/
			this.from ='';
			/*this.fromElevesender=$scope.msgdetails;*/
		}
		data ={
			"datamessage" : $scope.datamessage,

		}
             /* var data=JSON.parse(datatable);*/
		$scope.messages = $scope.messages.concat(newMessage);
		$scope.datamessage = "";
		$ionicScrollDelegate.scrollBottom();
        
        $http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_savemessage',data)
        .success(function(data,headers)
        {
                $scope.PostDataResponse=data;
                console.log($http);
                console.log('envoi avec succes');
                 
               
        })
        .error(function(data,headers)
        {
        	console.log('erreur 404');
            
        });
		$scope.datamessage = "";
		/*$scope.messages = $scope.messages.concat(newMessage);
		$scope.datamessage = "";
		$ionicScrollDelegate.scrollBottom();*/
    }
}]);
// feed list data sample
app.controller('FeedsListCtrl', ['$scope', '$state', 'Feeds', function($scope, $state, Feeds ){
	$scope.feeds = Feeds.items;
	$scope.showNews = function(index){
		Feeds.selectedFeed = $scope.feeds[index];
		$state.go('app.feed');
	}
}]);
app.controller('ProfileCtrl', ['$scope','$http' ,function ($scope,$http) {
    //on va utliser http.get pour récupérer les hobbies de user et les afficher ici
     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    
        
        $http.get('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_post_profile')
        .success(function(data,headers,config)
        {
                
                console.log($http);
                $scope.users=data;
                console.log($scope.users);

                
        })
        .error(function(data,headers,config)
        {
            
            console.log('erreur !')
        });
    

	

           
    
}]);
// single feed posts
app.controller('FeedCtrl', ['$scope', '$state', 'Feeds', function($scope, $state, Feeds ){
	
	$scope.numPosts = 20;
	$scope.stories = [];
	$scope.feed = Feeds.selectedFeed;
	$scope.showNews = function(index){
		Feeds.selectedFeed = $scope.feeds[index];
	}
	$scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.selectedFeed.feed);
      feed.setNumEntries($scope.numPosts);
      var count = 1;
      feed.load(function(result) {
        if (!result.error) {
          $scope.feed = result.feed;
			 $scope.$apply();
        }
      });
    }
    $scope.loadFeed();
	 $scope.getImage = function(index) {
		var selectedItem = $scope.feed.entries[index];
		var content = selectedItem.content;
		var imgthumb = "";
		a = content.indexOf("<img"); 
		b = content.indexOf("src=\"",a); 
		c = content.indexOf("\"",b+5); 
		d = content.substr(b+5,c-b-5);
		if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")) {
			imgthumb = d;
		}
		if(imgthumb) {
			return imgthumb;
		} else {
			return 'img/photo.png';
		}
    }
	 $scope.showFullFeed = function(indexFeed){
	 	Feeds.selectedNews = $scope.feed.entries[indexFeed];
		$state.go('app.feedsingle');
	 }
}]);
/*app.controller('ProfileCtrl', ['$scope', '$state', 'profile', function($scope, $state, profile ){
	$scope.profile = profile.items;
	$scope.showNews = function(index){
		Profile.selectedprofile = $scope.profile[index];
		$state.go('app.profile');
	}
}]);*/
app.controller('FeedSingleCtrl', ['$scope', '$state', 'Feeds', '$sce', function($scope, $state, Feeds, $sce ){
	$scope.feedContent = Feeds.selectedNews;
	$scope.content = $sce.trustAsHtml($scope.feedContent.content);
	
}]);

 //camera controller

app.controller("CameraController",function ($scope, $cordovaCamera,$http) {
 
        $scope.takePhoto = function () {
        	
          	var options = {
	            quality: 75,
	            destinationType: Camera.DestinationType.DATA_URL,
	            sourceType: Camera.PictureSourceType.CAMERA,
	            allowEdit: true,
	            encodingType: Camera.EncodingType.JPEG,
	            targetHeight:177,
	            targetWidth:118,
	            popoverOptions: CameraPopoverOptions,
	            saveToPhotoAlbum: true
        	};
   
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                data = {'photoupload' : $scope.imgURI}
                
                $http.defaults.headers.post['Content-Type'] = "multipart/form-data";
				$http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_receive_photo',data)
				.success(function(data,headers)
		        {
		                /*$scope.PostDataResponse=data;*/
		                console.log($http);
		                console.log('envoi avec succes');
		                var newMessage = new function(data) {
							this.message = data;							
						}
						
						$scope.messages = $scope.messages.concat(newMessage(data));						
						$ionicScrollDelegate.scrollBottom();
		               
		        })
		        .error(function(data,headers)
		        {
		        	console.log('erreur 404');
		        	/*window.alert('affichage de photodata error');*/
		            
		        });
            });
                
                 
            }, function (err) {
               // An error occured. Show a message to the user
            };
				
        
				
                
        $scope.choosePhoto = function () {
        	
    	    var options = {
	            quality: 75,
	            destinationType: Camera.DestinationType.DATA_URL,
	            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	            allowEdit: true,
	            encodingType: Camera.EncodingType.JPEG,
	            
	            popoverOptions: CameraPopoverOptions,
	            saveToPhotoAlbum: false
	        };
	        /*document.addEventListener("deviceready",onDeviceReady,false);
	        /*navigator.camera.getPicture(onSuccess, onFail,options);*/

	            $cordovaCamera.getPicture(options).then(function (imageData) {
		        $scope.imgURI = "data:image/jpeg;base64," + imageData;
		        data ={'photoupload' : $scope.imgURI };
                //test onsucces fonction pour la photo peut etre ca marche !
               /* function onSuccess(imageData) {*/
                /*var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
                
                photodata={'photodata' :  image.src};*/

		        $http.defaults.headers.post['Content-Type'] = "multipart/form-data";
				$http.post('http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_receive_photo',data)
				.success(function(data,headers)
		        {
		                /*$scope.PostDataResponse=data;*/
		                console.log($http);
		                console.log('envoi avec succes');
		                var newMessage = new function(data) {
							this.message = data;							
						}
						
						$scope.messages = $scope.messages.concat(newMessage(data));						
						$ionicScrollDelegate.scrollBottom();
		               
		        })
		        .error(function(data,headers)
		        {
		        	console.log('erreur 404');
		        	/*window.alert('affichage de photodata error');*/
		            
		        });
            });
                
               
               
        }, function (err) {
            // An error occured. Show a message to the user
            console.log('impossible denvoyer la photo');
        };

		
});
/*app.controller("CameraController",function ($scope, $cordovaCamera,$http) {
 
                $scope.takePhoto = function () {
                	
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                                data ={
			               'photoupload' : $scope.imgURI
		}
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                	
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                                data ={
			           'photoupload' : $scope.imgURI



		}

                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
               
               
		
    

            });*/