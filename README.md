# README

## To run

You can follow the directions on the React Native [site](https://facebook.github.io/react-native/docs/getting-started).

Again, unfortunately because there's no backend you can't login. Creating a quick backend to satisfy the loging shouldn't be too difficult however.

I used React Native to anticipate the use of the app on either Android or iOS. React Native was surprisingly easy to use and although there were a few pieces that needed to be coded independently (mostly to do with AppStorage and alert system), some of those could now be mitigated using libraries available now.

At the time I created this app, it didn't allow for background use (again, that has since been resolved with libraries, or at the very least made easy with Push Notifications), my solution to this was just to ask the driver to have the app open at all times. The app also uses Redux and AppNavigator to allow the creation of tabs. The intention was for the home tab to have the assignments that when clicked, would switch to the second tab which contained the map. I needed the drivers to actually get use of the app, so the next step would've been to allow for directions and easier manipulation of the map. Finally, the third tab contained the chat, and that was possible using PubNub.
