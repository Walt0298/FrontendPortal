import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { name, link, type, description, company } = req.body;
    initFirebase();
    const db = firebase.firestore();
    await db
      .collection("reports")
      .add({
        name,
        company,
        description,
        type: type || 'sales',
        link,
        date: new Date().toLocaleString(),
      })
      .then(() => {
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
