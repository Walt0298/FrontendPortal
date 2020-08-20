import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";

export default withSession(async (req, res) => {
  const { email } = await req.body;
  const { password } = await req.body;
  const { name } = await req.body;
  const { photo } = await req.body;

  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = {
        isLoggedIn: true,
        id: credentials.user.uid,
        email: credentials.user.email,
        token: credentials.user.getIdToken,
      };

    const thisUser = firebase.auth().currentUser;
    thisUser.updateProfile({
      role: 'USER',
      displayName: name,
      photoURL: photo || `https://robohash.org/${email}?set=set4&size=100x100`
    }).then(function() {
      console.log('user Updated')
      user.name = name;
      user.photoURL = photo || `https://robohash.org/${email}?set=set4&size=100x100`
    }).catch(function(error) {
      console.error(error)
      throw Error(error.message)
    });

    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).json(error);
  }
});
