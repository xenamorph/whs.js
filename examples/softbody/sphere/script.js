(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new WHS.App([new WHS.modules.ElementModule(), new WHS.modules.SceneModule(), new WHS.modules.CameraModule({
  position: new THREE.Vector3(0, 10, 50)
}), new WHS.modules.RenderingModule({
  bgColor: 0x162129,

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
}), new PHYSICS.WorldModule({
  ammo: 'http://localhost:8001/vendor/ammo.js',
  gravity: new THREE.Vector3(0, -10, 0),
  softbody: true
}), new WHS.OrbitControlsModule(), new WHS.modules.AutoresizeModule()]);

new WHS.Sphere({ // Softbody (blue).
  geometry: {
    radius: 4,
    widthSegments: 16,
    heightSegments: 16
  },

  modules: [new PHYSICS.SoftbodyModule({
    mass: 15,
    pressure: 1000
  })],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 4
  }
}).addTo(world).then(function (obj) {
  obj.native.frustumCulled = false;
});

new WHS.Sphere({ // Rigidbody (green).
  geometry: {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16
  },

  modules: [new PHYSICS.SphereModule({
    mass: 1
  })],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 30,
    x: -0.5,
    z: 0.5
  }
}).addTo(world);

UTILS.addBoxPlane(world, 2500);
UTILS.addBasicLights(world);

world.start();

},{"./globals":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAmbient = addAmbient;
exports.addBasicLights = addBasicLights;
exports.addPlane = addPlane;
exports.addBoxPlane = addBoxPlane;
var $world = exports.$world = {
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: "window",

  gravity: [0, -100, 0],

  camera: {
    position: [0, 10, 50]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
};

var $colors = exports.$colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2,
  softbody: 0x434B7F
};

function addAmbient(world, intensity) {
  new WHS.AmbientLight({
    light: {
      intensity: intensity
    }
  }).addTo(world);
}

function addBasicLights(world) {
  var intensity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 10, 10];
  var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

  addAmbient(world, 1 - intensity);

  return new WHS.PointLight({
    light: {
      intensity: intensity,
      distance: distance
    },

    shadowmap: {
      fov: 90
    },

    position: position
  }).addTo(world);
}

function addPlane(world) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  return new WHS.Plane({
    geometry: {
      width: size,
      height: size
    },

    modules: [new PHYSICS.PlaneModule({
      mass: 0
    })],

    material: new THREE.MeshPhongMaterial({ color: 0x447F8B }),

    rotation: {
      x: -Math.PI / 2
    }
  }).addTo(world);
}

function addBoxPlane(world) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  return new WHS.Box({
    geometry: {
      width: size,
      height: 1,
      depth: size
    },

    modules: [new PHYSICS.BoxModule({
      mass: 0
    })],

    material: new THREE.MeshPhongMaterial({ color: 0x447F8B })
  }).addTo(world);
}

},{}]},{},[1]);