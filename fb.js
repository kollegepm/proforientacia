// Підключення до Firebase. Цей файл змінювати не потрібно — налаштування лежать у firebase-config.js.
window.FB = (function () {
  'use strict';
  var cfg = window.APP_CONFIG || {};
  var f = cfg.firebase || {};
  if (!window.firebase || !firebase.initializeApp) {
    return { ready: false, problem: 'Не завантажилась бібліотека Firebase. Перевірте інтернет і оновіть сторінку.' };
  }
  if (!f.apiKey || /ВСТАВТЕ/.test(f.apiKey) || !f.projectId) {
    return { ready: false, problem: 'Firebase ще не налаштовано: вставте свої дані у файл firebase-config.js (див. інструкцію).' };
  }
  firebase.initializeApp(f);
  var auth = firebase.auth();
  var db = firebase.firestore();
  var owners = (cfg.owners || []).map(function (e) { return String(e).trim().toLowerCase(); });
  return {
    ready: true,
    auth: auth,
    db: db,
    isOwner: function (u) { return !!(u && u.email && owners.indexOf(u.email.toLowerCase()) >= 0); },
    signIn: function () {
      var p = new firebase.auth.GoogleAuthProvider();
      p.setCustomParameters({ prompt: 'select_account' });
      return auth.signInWithPopup(p);
    },
    signOut: function () { return auth.signOut(); }
  };
})();
