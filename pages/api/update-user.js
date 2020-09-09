import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { id, role, name, photo } = req.body;

    if (!id) throw Error("ID not provided! Make sure to add it!");
    initFirebase();

    const newData = {};
    if (name) newData.name = name;
    if (photo) newData.photo = photo;
    if (role === "ADMIN" || role === "BOSS" || role === "USER")
      newData.role = role;
    console.log(id, newData);
    const db = firebase.firestore();
    await db
      .collection("users")
      .doc(id)
      .update(newData)
      .then(() => {
        console.log("Document successfully updated!");
        res.json({
          isLoggedIn: true,
          userUpdated: true,
        });
      })
      .catch((error) => {
        console.error("Error reading document: ", error);

        res.json({
          isLoggedIn: true,
          userUpdated: false,
          error: error.message,
        });
      });
  } else {
    res.json({
      isLoggedIn: false,
      userUpdated: false,
    });
  }
});