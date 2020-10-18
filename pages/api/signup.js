import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const { email, password, name, photo, role, company } = await req.body;

  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = {
      isLoggedIn: true,
      id: credentials.user.uid,
      email: credentials.user.email,
      company
    };

    const thisUser = firebase.auth().currentUser;
    thisUser
      .updateProfile({
        displayName: name || email,
        photoURL:
          photo || `https://robohash.org/${email}?set=set4&size=100x100`,
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
        email,
        company,
        date: new Date().toLocaleString(),
      })
      .then(() => {
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
