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
      .collection("reports")
      .get()
      .then((querySnapshot) => {
        let reports = [];
        querySnapshot.forEach((doc) => {
          reports.push({
            id: doc.id,
            name: doc.data().name,
            link:
              doc.data().link ||
              `https://robohash.org/${user.email}?set=set4&size=100x100`,
            date: doc.data().date,
          });
        });
        res.json({
          isLoggedIn: true,
          reportGot: true,
          reports,
        });
      })
      .catch((error) => {
        console.error("Error reading document: ", error);

        res.json({
          isLoggedIn: true,
          reportGot: false,
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
