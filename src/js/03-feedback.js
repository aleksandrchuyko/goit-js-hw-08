import throttle from "lodash.throttle";

const formRef = document.querySelector('.feedback-form');
const SAVED_DATA_KEY = "feedback-form-state";
let formData = {};

function restoreDataFromStorage() {
    if (localStorage.getItem(SAVED_DATA_KEY)) {
        formData = JSON.parse(localStorage.getItem(SAVED_DATA_KEY))
        Object.keys(formData).forEach((key) => {
            let elem = formRef.querySelector(`[name=${key}]`);
            elem.value = formData[key];
        });
    }
}

function writeInStorage(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(formData));
}

function resetForm(e) {
    formData = {};
    localStorage.removeItem(SAVED_DATA_KEY);
    e.currentTarget.reset();
}

function sendFormData(e) {
    e.preventDefault();
    console.log(formData);
    resetForm(e);
}

formRef.addEventListener('input', throttle(writeInStorage, 500));

formRef.addEventListener('submit', sendFormData);

restoreDataFromStorage();
