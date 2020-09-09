import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const { email } = await req.body;
  const { password } = await req.body;
  const { name } = await req.body;
  const { photo } = await req.body;
  const { role } = await req.body;

  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = {
      isLoggedIn: true,
      id: credentials.user.uid,
      email: credentials.user.email,
    };

    const thisUser = firebase.auth().currentUser;
    thisUser
      .updateProfile({
        displayName: name || email,
        photoURL:
          photo || `https://robohash.org/${email}?set=set4&size=100x100`,
      })
      .then(function () {
        console.log("user Updated", user);
      })
      .catch(function (error) {
        console.error(error);
        throw Error(error.message);
      });

    const db = firebase.firestore();
    await db
      .collection("users")
      .add({
        name: name,
        photo: photo || `https://robohash.org/${email}?set=set4&size=100x100`,
        role: role || "USER",
        email: email,
        date: new Date().toLocaleString(),
      })
      .then(() => {
        console.log("Document successfully written!");
        res.json({
          isSignUp: true,
          userCreated: true,
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        res.json({
          isLoggedIn: true,
          reportCreated: false,
          error: error.message,
        });
      });

    req.session.set("user", user);
    await req.session.save();
    res.json({
      isSignUp: true,
      userCreated: true,
      user,
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).json({ errorCode, errorMessage });
  }
});
