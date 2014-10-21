
define(['EventEmitter'], function (EventEmitter) {
  'use strict';

  var Flux = {};

  var Store = Flux.Store = function (options) {

    var baseClass = new EventEmitter();

    _.extend(this, {

      STORE_UPDATED: 'STORE_UPDATED',

      _data: null,

      init: function () {
        if(!this._Model) { throw new Error ('missing model'); }
        this._data = new this._Model();
      },

      get: function () {
        if(!this._data) { throw new Error ('missing values'); }
        this._data.toJSON();
      },

      set: function (json) {
        if(!json || !this._data) { throw new Error ('missing values'); }
        this._data.set(json);
        this.emitEvent(this.STORE_UPDATED);
      },

      clear: function () {
        if(!this._data) { throw new Error ('missing values'); }
        if(!this._data.clear) { this._data.clear(); this.emitEvent(this.STORE_UPDATED); return; }
        if(!this._data.reset) { this._data.reset(); this.emitEvent(this.STORE_UPDATED); return; }
        throw new Error ('unknow clear method');
      },

      addEventListener: function (callback) {
        this.addListener(this.STORE_UPDATED, callback);
      },

      removeEventListener: function (callback) {
        this.removeListener(this.STORE_UPDATED, callback);
      },

    }, baseClass, options);
  };

  Store.extend = Backbone.Model.extend;

  return Flux;
});
