define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'ztwidget',
    // this property is set by the framework when widget is loaded.
    // name: 'ztwidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('ztwidget::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ztwidget::startup');
    // },

    // onOpen: function(){
    //   console.log('ztwidget::onOpen');
    // },

    // onClose: function(){
    //   console.log('ztwidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('ztwidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('ztwidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('ztwidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('ztwidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('ztwidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('ztwidget::resize');
    // }

    //methods to communication between widgets:

  });

});
