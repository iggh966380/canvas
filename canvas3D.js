import * as THREE from './node_modules/three/src/Three.js';
// const THREE = require('three');

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2,
  cameraWidth / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000
)

camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

function createWheels() {
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// animate();
// const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 40);

// function init() {
//   renderer.shadowMap.enabled = true;
//   const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
//   const ambientLight = new THREE.AmbientLight(0xdc8874, .5);
//   const light = new THREE.DirectionalLight(new THREE.Color('rgba(200, 200, 200)'));

//   light.position.set(20, 10, 10);
//   scene.add(light);
//   scene.add(hemisphereLight);
//   scene.add(ambientLight);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
// }
// init();

// function Tree () {
// 	this.body = new THREE.Object3D();
// 	this.body.castShadow = true;
// 	this.body.receiveShadow = true;
// 	this.body.name = 'tree';

// 	var geometry = new THREE.ConeGeometry( 10, 20, 17 );
// 	var material = new THREE.MeshPhongMaterial({color: 0x0d7753, shading: THREE.FlatShading });
// 	var cone = new THREE.Mesh( geometry, material );

// 	cone.receiveShadow = true;
// 	cone.receiveShadow = true;
// 	var cone2 = cone.clone();
// 	var cone3 = cone.clone();
// 	cone.name = 'tree';
// 	cone.position.set(0, 20, 0);
// 	cone2.scale.set(1.2, 1.2, 1.2);
// 	cone2.position.set(0, 10, 0);

// 	cone3.scale.set(1.5, 1.5, 1.5);
// 	cone3.position.set(0, 0, 0);

// 	this.body.add(cone);
// 	this.body.add(cone2);
// 	this.body.add(cone3);
	
// 	return this;
// }
