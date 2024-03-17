const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");

toggle.addEventListener("click", ()=> {
    sidebar.classList.toggle("close");
});

// GOOGLE FIREBASE
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    Timestamp
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyChfaHzmawvqW8oZfcahaS9g9D6-RBLYi4",
    authDomain: "tutorial-59736.firebaseapp.com",
    projectId: "tutorial-59736",
    storageBucket: "tutorial-59736.appspot.com",
    messagingSenderId: "866152609073",
    appId: "1:866152609073:web:90b1e97134fbf575192c10"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'medical');

// queries
const q = query(colRef, orderBy('createdAt'));

// realtime collection data
// getDocs(colRef)
// .then((snapshot) => {

//     let books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id });
//     })
//     console.log(books);
// })
// .catch(err => {

//     console.log(err.message);
// });

onSnapshot(q, (snapshot) => {

    let medicals = [];
    snapshot.docs.forEach((doc) => {
        medicals.push({ ...doc.data(), id: doc.id });
    })
    console.log(medicals);
});

// adding documents
const addMedForm = document.querySelector('.add');
addMedForm.addEventListener('submit', (e) => {
    
    e.preventDefault();

    addDoc(colRef, {

        name: addMedForm.name.value,
        type: addMedForm.type.value,
        amount: addMedForm.amount.value,
        unit: addMedForm.unit.value,
        manu_date: new Date(addMedForm.manu_date.value).toISOString(),
        exp_date: new Date(addMedForm.exp_date.value).toISOString(),
        price: addMedForm.price.value,
        state: addMedForm.state.value,
        createdAt: serverTimestamp()
    })
    .then(() => {

        addMedForm.reset();
    });
});

// delete documents
// const deleteBookForm = document.querySelector('.delete');
// deleteBookForm.addEventListener('submit', (e) => {

//     e.preventDefault();

//     const docRef = doc(db, 'books', deleteBookForm.id.value);
//     deleteDoc(docRef)
//     .then(() => {

//         deleteBookForm.reset();
//     });
// });

// get a single document
// const docRef = doc(db, 'books')