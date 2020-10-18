import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    initFirebase();
    const db = firebase.firestore();
    await db
      .collection("users")
      .get() // TODO: Filter by company
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        res.json({
          usersGot: true,
          users,
        });
      })
      .catch((error) => {
        console.error("Error reading document: ", error);

        res.json({
          usersGot: false,
          error: error.message,
        });
      });
  } else {
    res.json({
      usersGot: false,
    });
  }
});
