app.constant("Config", {
  "ApiUrl": "data/feed.json",
  "PhotoUrl": "data/photos.json",
  "CommentUrl": "data/comments.json",
  "FriendsUrl": "data/friends.json",
  "MessagesUrl": "data/messages.json",
  "ProfileUrl": "ttp://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_post_profile",
  "MessageUrl": "http://94.23.13.72/planeteprofs/wp-admin/admin-ajax.php?action=app_list_new_message",
  "ProductUrl": "data/products.json",
  "WordPress": "https://www.planeteprofs.com/",
})
// config contact
app.constant("ConfigContact", {
  "EmailId": "weblogtemplatesnet@gmail.com",
  "ContactSubject": "Contact"
})
// config admon
app.constant("ConfigAdmob", {
  "interstitial": "ca-app-pub-3940256099942544/1033173712",
  "banner": "ca-app-pub-3940256099942544/6300978111"
})
// push notification
app.constant("PushNoti", {
  "senderID": "senderID",
})
angular.module('starter', ['ionic', 'ngCordova'])
