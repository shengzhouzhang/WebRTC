
define(['EventEmitter'], function (EventEmitter) {
  'use strict';

  var Flux = {};

  var Store = Flux.Store = function (options) {

    var baseClass = new EventEmitter();

    _.extend(this, options, {

      STORE_UPDATED: 'STORE_UPDATED',

      _store: null,

      get: function () {
        if(!this._store) { throw new Error ('missing values'); }
        this._store.toJSON();
      },

      set: function (json) {
        if(!json || !this._store) { throw new Error ('missing values'); }
        this._store.set(json);
        this.emitEvent(this.STORE_UPDATED);
      },

      clear: function () {
        if(!this._store) { throw new Error ('missing values'); }
        if(!this._store.clear) { this._store.clear(); this.emitEvent(this.STORE_UPDATED); return; }
        if(!this._store.reset) { this._store.reset(); this.emitEvent(this.STORE_UPDATED); return; }
        throw new Error ('unknow clear method');
      },

      addEventListener: function (callback) {
        this.addListener(this.STORE_UPDATED, callback);
      },

      removeEventListener: function (callback) {
        this.removeListener(this.STORE_UPDATED, callback);
      },

    }, baseClass);
  };

  Store.extend = Backbone.Model.extend;

  return Flux;
});
