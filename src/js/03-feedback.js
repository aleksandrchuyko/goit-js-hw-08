import throttle from "lodash.throttle";

import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    if (formData.email && formData.message) {
        console.log("For data:", formData);
        resetForm(e);
    } else {
        //alert("Заповнені не всі поля...");
        Notiflix.Notify.warning('Заповнені не всі поля...');
    }
}

formRef.addEventListener('input', throttle(writeInStorage, 500));

formRef.addEventListener('submit', sendFormData);

restoreDataFromStorage();
