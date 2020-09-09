import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { name, link, type } = req.body;
    initFirebase();
    const db = firebase.firestore();
    await db
      .collection("reports")
      .add({
        name,
        type: type || 'sales',
        link:
          link || `https://robohash.org/${user.email}?set=set4&size=100x100`,
        date: new Date().toLocaleString(),
      })
      .then(() => {
        console.log("Document successfully written!");
        res.json({
          isLoggedIn: true,
          reportCreated: true,
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
  } else {
    res.json({
      isLoggedIn: false,
      reportCreated: false,
    });
  }
});
