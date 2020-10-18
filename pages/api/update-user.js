import withSession from "../../lib/session";
import initFirebase from "../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    const { id, role, name, photo, company } = req.body;

    if (!id) throw Error("ID not provided! Make sure to add it!");
    initFirebase();

    const newData = {};
    if (name) newData.name = name;
    if (photo) newData.photo = photo;
    if (company) newData.company = company;
    if (role === "ADMIN" || role === "BOSS" || role === "USER")
      newData.role = role;
    const db = firebase.firestore();
    await db
      .collection("users")
      .doc(id)
      .update(newData)
      .then(() => {
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
