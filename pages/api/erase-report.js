import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { id } = req.body;
    initFirebase();
    const db = firebase.firestore();
    await db
      .collection("reports")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully erased!");
        res.json({
          isErased: true,
        });
      })
      .catch((error) => {
        console.error("Error erasing document: ", error);

        res.json({
          isErased: false,
          error: error.message,
        });
      });
  } else {
    res.json({
      isErased: false,
    });
  }
});
