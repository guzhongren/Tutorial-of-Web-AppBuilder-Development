define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'test-widget',
    // this property is set by the framework when widget is loaded.
    // name: 'testWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('testWidget::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('testWidget::startup');
    // },

    // onOpen: function(){
    //   console.log('testWidget::onOpen');
    // },

    // onClose: function(){
    //   console.log('testWidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('testWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('testWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('testWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('testWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('testWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('testWidget::resize');
    // }

    //methods to communication between widgets:

  });

});
