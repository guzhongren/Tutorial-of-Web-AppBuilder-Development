define(['dojo/_base/declare', "dijit/form/NumberTextBox", "dijit/form/Button", "dojo/on", "dojo/_base/lang", "dojo/dom", "dojo/dom-style", "dojo/dom-class", "dojo/dom-attr",
  'jimu/BaseWidget', 'jimu/LayerInfos/LayerInfos',
  'esri/tasks/GeometryService', 'esri/tasks/BufferParameters', 'esri/symbols/SimpleFillSymbol', "esri/symbols/SimpleLineSymbol", "esri/Color", 'esri/layers/GraphicsLayer', 'esri/graphic'
],
  function (declare, NumberTextBox, Button, on, lang, dom, domStyle, domClass,domAttr,
    BaseWidget, LayerInfos, GeometryService, BufferParameters, SimpleFillSymbol, SimpleLineSymbol, Color, GraphicsLayer, graphic) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // DemoWidget code goes here

      //please note that this property is be set by the framework when widget is loaded.
      //templateString: template,

      baseClass: 'jimu-widget-BufferRenderer',

      bufferDistance: null,// number
      geometries: [],
      geometryService: null,
      _busyIndicate: null,// gp工作状态
      _bufferSymbol: null,
      _graphicsLayer: null,

      postCreate: function () {
        this.inherited(arguments);
        console.log('postCreate', "bufferRenderer");

        this._initComponets();
      },

      startup: function () {
        this.inherited(arguments);
        // this.mapIdNode.innerHTML = 'map id:' + this.map.id;
        console.log('startup', "bufferRenderer");

      },

      onOpen: function () {
        console.log('onOpen');

        this.bufferDistance = null;
        this.geometries = [];
        this._getLayerInfos().then((layerInfosObject) => {
          lang.hitch(this, this._getAllGeometry(layerInfosObject, this.doBuffer));
        });
      },

      onClose: function () {
        console.log('onClose', "bufferRenderer");
        this.bufferDistance = null;
        this.geometries = null;
        this.geometryService = null;
        domStyle.set(this.divBusyIndicator, { "display": "none" });
      },

      onMinimize: function () {
        console.log('onMinimize');
      },

      onMaximize: function () {
        console.log('onMaximize');
      },

      onSignIn: function (credential) {
        /* jshint unused:false*/
        console.log('onSignIn');
      },

      onSignOut: function () {
        console.log('onSignOut');
      },

      // showVertexCount: function (count) {
      //   // this.vertexCount.innerHTML = 'The vertex count is: ' + count;
      // },
      /**
       * 将缓冲结果展示在前端
       */
      _renderBufferResult: function (bufferGeometries) {
        bufferGeometries && bufferGeometries.length > 0 && bufferGeometries.map((geometry) => {
          let tempGraphic = new graphic(geometry, this._bufferSymbol);
          this._graphicsLayer.add(tempGraphic);
          tempGraphic = null;
        });
      },

      doBuffer: function () {
        if (this.bufferDistance && this.bufferDistance > 0) {
          domStyle.set(this.divBusyIndicator, { "display": "" });
          let params = new BufferParameters();
          params.geometries = this.geometries;
          params.distances = [this.bufferDistance];
          params.unit = GeometryService.UNIT_KILOMETER;
          params.outSpatialReference = this.map.spatialReference;

          this.geometryService.buffer(params, (result) => {
            this._renderBufferResult(result);
            this.gpInfo.innerHTML = this.nls.gpSuccess;
            // domStyle.set(this.divBusyIndicator, { "display": "none" });
          }, (err) => {
            console.error(err);
            this.gpInfo.innerHTML = this.nls.gpError;
          });
        } else {

        }

      },

      /**
       * 获取所有的geometry信息
       */
      _getAllGeometry: function (layerInfosObject, callback) {
        let _self = this;
        layerInfosObject.getLayerInfoArray().forEach(function (layerInfo) {
          layerInfo.layerObject.graphics.map((graphic) => {
            _self.geometries.push(graphic.geometry);
          })
        });
        // //执行gp按钮
        on(this.btnDoBufferId, "click", (evt) => {
          this.doBuffer();
        })
      },
      /**
       * 获取图层信息
       */
      _getLayerInfos: function () {
        return new Promise((resolve, reject) => {
          // 获取图层信息
          LayerInfos.getInstance(this.map, this.map.itemInfo).then((layerInfosObject) => {
            if (layerInfosObject) {
              layerInfosObject.getLayerInfoArray().forEach(function (layerInfo) {
                console.log(layerInfo.title, layerInfo.id);
              });
              resolve(layerInfosObject);
            } else {
              reject({
                err: "图层信息查询出错！"
              });
            }
          });
        });
      },
      /**
       * 初始化组件
       */
      _initComponets() {
        // 缓冲区距离
        let btnBufferDistance = new NumberTextBox({
          name: "bufferDistance",
          value: null,
          placeHolder: "请输入数值！"
        }, this.inputBufferDistance);
        on(btnBufferDistance, "change", (val) => {
          this.bufferDistance = btnBufferDistance.get("value")
        });
        //增加gp工作状态
        domStyle.set(this.divBusyIndicator, { "display": "none" });
        domClass.add(this.busyIndicatorImage, "busyIndicater");
        // geometyr
        this.geometryService = new GeometryService(this.appConfig.geometryService);
        this._bufferSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
            new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25])
        );
        this._graphicsLayer = new GraphicsLayer({
          id: "bufferGraphicsLayer"
        });
        this.map.addLayer(this._graphicsLayer);
      }
    })
  });