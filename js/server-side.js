import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'

// Add Firebase products that you want to use
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    //Update the below URL with the appropriate version if necessary.
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

import { getDatabase, ref, set, child, get, onValue, push, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCIoXayV9D8SaJ-tTYJb2mTi7w2k2QUMXg",
    authDomain: "dwijottam-dutta.firebaseapp.com",
    projectId: "dwijottam-dutta",
    storageBucket: "dwijottam-dutta.appspot.com",
    messagingSenderId: "646144727011",
    appId: "1:646144727011:web:6a1c13d0f1651805ecf2d6",
    measurementId: "G-P3EXQLGL6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInAnonymously(auth)
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + ": " + errorMessage)
    });


onAuthStateChanged(auth, (user) => {
    if (user) {
        // GET THE USER ALREADY CONTACTED OR NOT
        const uid = user.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `contacts/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById("fname").disabled = true;
                document.getElementById("lname").disabled = true;
                document.getElementById("pnumber").disabled = true;
                document.getElementById("email").disabled = true;
                document.getElementById("message_input").disabled = true;
                document.getElementById("SEND_BUTTON").remove();
                document.getElementById("contact_boolean").innerHTML = "Your contact and message is delivered to server";
            }
        }).catch((error) => {
            console.error(error);
        });
    }
});






// FEEDBACK BUTTON WHEN CLICKED ON
document.getElementById("FEEDBACK_BUTTON").addEventListener("click", function () {

    const feedback_user = document.getElementById("feedback_user");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const db = getDatabase();
            set(ref(db, 'feedback/' + uid), {
                FEEDBACK: feedback_user.value,
            });
            feedback_user.value = "";
            alert("THANKS FOR YOUR FEEDBACK");
        }
        else {
            alert("Something went wrong while establishing connection")
        }
    });

});

// SEND BUTTON WHEN CLICKED ON
document.getElementById("SEND_BUTTON").addEventListener("click", function () {

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const pnumber = document.getElementById("pnumber");
    const email = document.getElementById("email");
    const message_input = document.getElementById("message_input");



    if (fname.value != "" && lname.value != "" && message_input.value != "") {

        console.log("GG")
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.value.match(validRegex)) {

            var phoneno = /^\d{10}$/;
            if (pnumber.value.match(phoneno)) {

                if (fname.value.length < 25 && lname.value.length < 20) {

                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const uid = user.uid;
                            const db = getDatabase();
                            set(ref(db, 'contacts/' + uid), {
                                First_Name: fname.value,
                                Last_Name: lname.value,
                                Phone: pnumber.value,
                                Email: email.value,
                                Message: message_input.value
                            });
                            const dbRef = ref(getDatabase());
                            get(child(dbRef, `contacts/${uid}`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                    document.getElementById("fname").disabled = true;
                                    document.getElementById("lname").disabled = true;
                                    document.getElementById("pnumber").disabled = true;
                                    document.getElementById("email").disabled = true;
                                    document.getElementById("message_input").disabled = true;
                                    document.getElementById("SEND_BUTTON").remove();
                                    document.getElementById("contact_boolean").innerHTML = "Thanks for contacting us, your message is delivered to us !!";
                                }
                            }).catch((error) => {
                                console.error(error);
                            });

                        }
                        else {
                            alert("Something went wrong while establishing connection")
                        }
                    });

                } else {
                    alert("PLEASE DON'T SPAM IN NAME SECTION")
                }

            } else {
                alert("PLEASE INPUT CORRECT PHONE NUMBER")
            }
        }
        else {
            alert("PLEASE INPUT CORRECT EMAIL")
        }
    }
    else {
        alert("FILL THE FORM FIRST, THEN SUBMIT")
    }


});
