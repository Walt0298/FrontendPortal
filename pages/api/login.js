import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const { email } = await req.body;
  const { password } = await req.body;

  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    initFirebase();
    const db = firebase.firestore();

    let role = "";
    await db
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          role = doc.data().role
        });
      })
      .catch(function (error) {
        console.error("Error getting documents: ", error);
      });
    const user = {
      isLoggedIn: true,
      displayName: credentials.user.displayName,
      photoURL: credentials.user.photoURL,
      id: credentials.user.uid,
      email: credentials.user.email,
      role
    };

    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    // const errorCode = error.code;
    // const errorMessage = error.message;
    res.status(500).json(error.message);
  }
});
