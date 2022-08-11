import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

let renderer, scene, camera;
let cameraControl, statsUI;
let creeperObj;
let sphereLightMesh, pointLight;
let rotateAngle = 0;
let invert = 1;

const headMap = new THREE.TextureLoader().load('./assets/imgs/creeper_face.png');
const skinMap = new THREE.TextureLoader().load('./assets/imgs/creeper.png');
const skinMat = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  // metalness:0.8,
  transparent: false,
  opacity: 1,
  side: THREE.DoubleSide,
  map: skinMap
})

const headMats = [];
for (let i = 0; i < 6; i++) {
  let map;
  
  if (i === 4) {
    map = headMap;
  } else {
    map = skinMap;
  }

  headMats.push(new THREE.MeshStandardMaterial({ map: map }))
}

const bodyMats = [];
for (let i = 0; i < 6; i++) {

  bodyMats.push(new THREE.MeshPhongMaterial({ map: skinMap }))
}
class Creeper {
  constructor() {
    // 頭、身體、腳的幾何體大小
    const headGeo = new THREE.BoxGeometry(4, 4, 4);
    const bodyGeo = new THREE.BoxGeometry(4, 8, 2);
    const footGeo = new THREE.BoxGeometry(2, 3, 2);

    const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    this.head = new THREE.Mesh(headGeo, headMats);
    this.head.position.set(0, 6, 0);

    this.body = new THREE.Mesh(bodyGeo, skinMat);
    this.body.position.set(0, 0, 0);

    this.foot1 = new THREE.Mesh(footGeo, skinMat);
    this.foot1.position.set(-1, -5.5, 2);
    this.foot2 = this.foot1.clone();
    this.foot2.position.set(-1, -5.5, -2);
    this.foot3 = this.foot1.clone();
    this.foot3.position.set(1, -5.5, 2);
    this.foot4 = this.foot1.clone();
    this.foot4.position.set(1, -5.5, -2);

    this.feet = new THREE.Group();
    this.feet.add(this.foot1);
    this.feet.add(this.foot2);
    this.feet.add(this.foot3);
    this.feet.add(this.foot4);

    this.creeper = new THREE.Group();
    this.creeper.add(this.head);
    this.creeper.add(this.body);
    this.creeper.add(this.feet);
  }
}

function createCreeper() {
  const creeperObj = new Creeper();
  scene.add(creeperObj.creeper);
}

function initStats() {
  const stats = new Stats();
  stats.setMode(0);
  document.getElementById('stats').appendChild(stats.domElement);
  return stats;
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const canvas = document.querySelector('#cube');
  camera.position.set(30, 30, 30);
  camera.lookAt(scene.position);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setClearColor(0xeeeeee, 1.0);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.shadowMap.enable = true;
  cameraControl = new OrbitControls(camera, canvas);
  cameraControl.enableDamping = true;
  cameraControl.dampingFactor = 0.25;
  cameraControl.autoRotate = true;
  const planeGeometry = new THREE.PlaneGeometry(60, 60);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  })
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, -7, 0);

  let axes = new THREE.AxesHelper(20);
  scene.add(axes);
  scene.add(plane);

  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(10, 10, -10);
  scene.add(pointLight);
  let spotLight = new THREE.SpotLight(0x88aaee);
  spotLight.position.set(-10, 40, 30);
  scene.add(spotLight);
  statsUI = initStats();
  createCreeper();
}

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  cameraControl.update();
  statsUI.update();
  renderer.render(scene, camera);
}

init();
requestAnimationFrame(render);
