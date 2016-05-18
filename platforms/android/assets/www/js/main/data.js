
app.factory('SocialData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Facebook',
            icon: 'ion-social-facebook',
				url: 'http://www.facebook.com/weblogtemplates'
        },
        { 
            title: 'Twitter',
            icon: 'ion-social-twitter',
				url: 'http://twitter.com/weblogtemplates'
        },
        { 
            title: 'Pinterest',
            icon: 'ion-social-pinterest',
				url: 'http://twitter.com/weblogtemplates'
        },
        { 
            title: 'Linkedin',
            icon: 'ion-social-linkedin',
				url: 'http://twitter.com/weblogtemplates'
        },
        { 
            title: 'Github',
            icon: 'ion-social-github',
				url: 'http://twitter.com/weblogtemplates'
        },
        { 
            title: 'Google +',
            icon: 'ion-social-googleplus',
				url: 'http://twitter.com/weblogtemplates'
        }
    ]; 
    
    return data;
})
//retourner user 

// Home Data: Home page configuration
app.factory('VideoData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Pieber - Soutien scolaire',
            video: 'https://www.youtube.com/watch?v=YfUXKFQ9RY4',
        },
        { 
           title: 'Léa et PlaneteProfs',
            video: 'https://www.youtube.com/watch?v=2QKs5K8YkLo',
       }
    ]; 
    
    return data;
})
// Home Data: Home page configuration
app.factory('PostData', function(){
	var postMain = "";
		postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>";
   	postMain += "<ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ul>";
		postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>";
		postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";
	
   return postMain;
})
// feeds
app.factory('Blog', ['$http', 'Config', function($http, Config) {
	var data = {};
	data.getPosts = function () {
		return $http(
			{
				method: 'GET', url:Config.ApiUrl
			}
		);
	}
  	return data;
}]);
// posts from a demo url
app.factory('Photos',['$http', 'Config', function($http, Config) {
	var data = {};
	data.getPosts = function () {
		return $http(
			{
				method: 'GET', url:Config.PhotoUrl
			}
		);
	}
  	return data;
}]);
// comments factory -- fetching comments from an api -- just sample api
//
app.factory('Comments',['$http', 'Config', function($http, Config) {
	var data = {};
	data.getComments = function () {
		return $http(
			{
				method: 'GET', url:Config.CommentUrl
			}
		);
	}
  	return data;
}]);
// friends factory
app.factory('Friends',['$http', 'Config', function($http, Config) {
	var data = {};
	data.getFriends = function () {
		return $http(
			{
				method: 'GET', url:Config.FriendsUrl
			}
		);
	}
  	return data;
}]);
app.factory('Features', function(){
    var data = {};
    
    data.items = [
       /* { 
            title: 'Profil',
            icon: 'ion-person',
            url: '#/app/profile'
        },*/
		  /*{ 
            title: 'Friends',
            icon: 'ion-ios-people',
            url: '#/app/friends'
        },*/
		  /*{ 
            title: 'WordPress Blog',
            icon: 'ion-social-wordpress',
            url: '#/wordpress/blog'
        },
        /*{ 
            title: 'Products',
            icon: 'ion-bag',
            url: '#/app/products'
        },*/
		  { 
            title: 'ProfenPoche',
            icon: 'ion-chatboxes',
            url: '#/app/messages'
        },
		 /* { 
            title: 'LiveProf',
            icon: 'ion-chatbox',
            url: '#/app/message'
        },*/
        { 
            title: 'Galerie',
            icon: 'ion-images',
            url: '#/app/gallery'
        },
        { 
            title: 'Videos',
            icon: 'ion-ios-videocam',
            url: '#/app/videos'
        },
        /*{ 
            title: 'Blog',
            icon: 'ion-ios-calendar',
            url: '#/app/blog'
        },*/
		 /* { 
            title: 'Article',
            icon: 'ion-ios-paper',
            url: '#/app/post'
        },*/
        { 
            title: 'Contact',
            icon: 'ion-email',
            url: '#/app/contact'
        }
		  ,
       /* { 
            title: 'News',
            icon: 'ion-ios-paper',
            url: '#/app/news'
        },*/
		  /*{ 
            title: 'Feeds',
            icon: 'ion-social-rss',
            url: '#/app/feedslist'
        },*/
       /* { 
            title: 'Paramétres',
            icon: 'ion-ios-gear',
            url: '#/app/settings'
        },*/
        { 
            title: 'A propos',
            icon: 'ion-ios-people',
            url: '#/app/about'
        },
		  /*{ 
            title: 'Admob',
            icon: 'ion-cash',
            url: '#/app/admob'
        },*/
       /* { 
            title: 'Push Notification',
            icon: 'ion-paper-airplane',
            url: '#/app/push'
        },*/
        /*{ 
            title: 'Intro Template',
            icon: 'ion-ios-help',
            url: '#/app/intro'
        },*/
		 { 
            title: 'Social',
            icon: 'ion-heart',
            url: '#/app/socialprofile'
        },
		  /*{ 
            title: 'Login',
            icon: 'ion-ios-locked',
            url: '#/app/login'
        },*/
		  /*{ 
            title: 'Sinscrire',
            icon: 'ion-lock-combination',
            url: '#/app/signup'
        }*/
    ]; 
    
    return data;
})
app.factory('myPushNotification', ['$http', 'PushNoti', function ($http, PushNoti) {
  return {
		registerPush: function(fn) { //alert('2');
			var myPushNotification = window.plugins.pushNotification,
			successHandler = function(result) {
				 //alert('result = ' + result);
			},
			errorHandler = function(error) {
				 //alert('error = ' + error);
			};
			if (device.platform == 'android' || device.platform == 'Android') { //alert('asdasd');
				// myPushNotification.unregister(successHandler, errorHandler);
				myPushNotification.register(successHandler, errorHandler, {
					 'senderID': PushNoti.senderID, // **ENTER YOUR SENDER ID HERE**
					 'ecb': 'onNotificationGCM'
				});
		  }
		}
  };
}]);
// push notification push to server
app.factory('SendPush',['$http', 'Config', function($http, Config) {
	var SendPush = {};
	SendPush.android = function(token) {
        //il faut mettre url valide pour le push
		return  $http({method: "post", url: 'http://www.skyafar.com/tools/push/push.php',
			data: {
				token: token,
			}
		});
	}
  	return SendPush;
}]);
// friends factory
app.factory('Messages',['$http', 'Config', function($http, Config) {
	var data = {};
	data.getMesages = function () {
		return $http(
			{
				method: 'GET', url:Config.MessagesUrl
			}
		);
	}
	data.getMessage = function () {
		return $http(
			{
				method: 'GET', url:Config.MessageUrl
			}
		);
	}
  	return data;
}]);
app.factory('Profile',['$http', 'Config', function($http, Config) {
    var data = {};
    data.getProfile = function () {
        return $http(
            {
                method: 'GET', url:Config.ProfileUrl
            }
        );
    }
    data.getProfile = function () {
        return $http(
            {
                method: 'GET', url:Config.ProfileUrl
            }
        );
    }
    return data;
}]);
// blog feeds
app.factory('Feeds', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Huffingtonpost',
            feed: 'http://www.huffingtonpost.com/feeds/index.xml',
        },
        { 
            title: 'CNN.com News',
            feed: 'http://rss.cnn.com/rss/cnn_topstories.rss',
        },
        { 
            title: 'New York Times Home Page',
            feed: 'http://feeds.nytimes.com/nyt/rss/HomePage',
        },
        { 
            title: 'Washington Post: Today\'s Highlights',
            feed: 'http://www.washingtonpost.com/rss/',
        }
    ]; 
    
    return data;
})