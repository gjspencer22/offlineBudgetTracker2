const indexedDB = 
window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB
let db;

const request = indexedDB.open('offline_transactions', 1);

request.onupgradeneeded = function (event) {
    const db = event.target.result;
    
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    if(navigator.onLine) {
    
        uploadTransaction();
    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {

    const transaction = db.transaction(['new_transaction'], 'readwrite');

    const transactionObjectStore = transaction.objectStore('new_transaction');
    transactionObjectStore.add(record);
    
}
function uploadTransaction() {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    const getAll = transactionObjectStore.getAll();
    getAll.onsuccess = function() {
        
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", { 
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers:{
                    accept: "application/json, text/plain, */*",
                    "Content-Type":"application/json"
                }
            }).then(function(infoStore) {
                return infoStore.json();
            }).then(function(){
                const transaction = db.transaction(['new_transaction'], 'readwrite');
                const transactionObjectStore = transaction.objectStore('new_transaction');
                transactionObjectStore.clear()
            })
        }
    }
}

//db.js

const mongoose = require('mongoose')

const url = `mongodb+srv://gj22:<password>@cluster0.etxrj.mongodb.net/idb.js?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


window.addEventListener('online', uploadTransaction);