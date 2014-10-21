
define([], function () {
  'use strict';

  var baseClass = new EventEmitter();

  var store = $.extend({

    STORE_UPDATED: 'STORE_UPDATED',

    _store: null,

    get: function () {
      if(!this._store) { throw new Error ('missing values'); }
      this._store.toJSON();
    },

    set: function (json) {
      if(!json || !this._store) { throw new Error ('missing values'); }
      this._store.set(json);
    },

    clear: function () {
      if(!this._store) { throw new Error ('missing values'); }
      if(!this._store.clear) { this._store.clear(); return; }
      if(!this._store.reset) { this._store.reset(); return; }
      throw new Error ('unknow clear method');
    },

    addEventListener: function (callback) {
      this.addListener(this.STORE_UPDATED, callback);
    },

    removeEventListener: function (callback) {
      this.removeListener(this.STORE_UPDATED, callback);
    },

  }, baseClass);

  return store;
});
