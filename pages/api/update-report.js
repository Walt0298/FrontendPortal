import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { id, name, link, type, description } = req.body;
    const newData = {};
    if (name) newData.name = name;
    if (link) newData.link = link;
    if (type) newData.type = type;
    if (description) newData.description = description;
    initFirebase();
    const db = firebase.firestore();
    await db
      .collection("reports")
      .doc(id)
      .update(newData)
      .then(() => {
        res.json({
          isLoggedIn: true,
          reportUpdated: true,
        });
      })
      .catch((error) => {
        console.error("Error reading document: ", error);

        res.json({
          isLoggedIn: true,
          reportUpdated: false,
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
