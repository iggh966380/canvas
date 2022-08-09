import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

function main() {
  const canvas = document.querySelector('#cube');
  const renderer = new THREE.WebGLRenderer({ canvas });
  
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

  renderer.setSize(window.innerWidth, window.innerHeight);
  
  function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const wheel  = new THREE.Mesh(geometry, material);
    return wheel;
  }

  function createCar() {
    const car = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 15, 30),
      new THREE.MeshLambertMaterial({
        color: 0xbbddaa
      })
    ) 

    main.position.y = 12;
    car.add(main);

    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry(33, 12, 24),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );

    cabin.position.x = -6;
    cabin.position.y = 25.5;
    car.add(cabin);

    const tire = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10, 10, 5, 40, 40),
      new THREE.MeshLambertMaterial({ color: 0x88aa66 })
    );
    
    tire.position.x = 15;
    tire.position.y = 8;
    tire.position.z = 18;
    tire.rotateX(11.4);
    tire.rotateY(1.6);
    tire.rotateZ(2.7);
    car.add(tire);

    const backTire = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10, 10, 5, 40, 40),
      new THREE.MeshLambertMaterial({ color: 0x88aa66 })
    );

    backTire.position.x = -15;
    backTire.position.y = 8;
    backTire.position.z = 18;
    backTire.rotateX(11.4);
    backTire.rotateY(1.6);
    backTire.rotateZ(2.7);
    car.add(backTire);

    const leftBackTire = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10, 10, 5, 40, 40),
      new THREE.MeshLambertMaterial({ color: 0x88aa66 })
    );

    leftBackTire.position.x = -15;
    leftBackTire.position.y = 8;
    leftBackTire.position.z = -18;
    leftBackTire.rotateX(11.4);
    leftBackTire.rotateY(1.6);
    leftBackTire.rotateZ(2.7);
    car.add(leftBackTire);
      
    const leftFrontTire = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10, 10, 5, 40, 40),
      new THREE.MeshLambertMaterial({ color: 0x88aa66 })
    );

    leftFrontTire.position.x = 15;
    leftFrontTire.position.y = 8;
    leftFrontTire.position.z = -18;
    leftFrontTire.rotateX(11.4);
    leftFrontTire.rotateY(1.6);
    leftFrontTire.rotateZ(2.7);
    car.add(leftFrontTire);
    return car;
  }

  const car = createCar();
  scene.add(car);
  let requestAFrame
  function changeXPostion(time) {

    time *= 0.01;
    const speed = 1.1;
    let rot = time * speed;
    car.position.x = -150 + rot;
    car.rotation.y = 0.1 * rot;
    car.rotation.z = 0.1 * rot;    
    requestAFrame = requestAnimationFrame(changeXPostion);
    renderer.render(scene, camera);
  }
  requestAFrame = requestAnimationFrame(changeXPostion);

}

window.onload = main;

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// )

// const camera = new THREE.OrthographicCamera(
//   cameraWidth / -2,
//   cameraWidth / 2,
//   cameraHeight / 2,
//   cameraHeight / -2,
//   0,
//   1000
// )

// camera.position.set(200, 200, 200);
// camera.lookAt(0, 10, 0);

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(() => {
//   // car.rotation.Y -=0.007;
//   renderer.render(scene, camera);
// })

// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);

// const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
// dirLight.getWorldPosition.set(100, -300, 400);
// scene.add(dirLight);

// const scene = new THREE.Scene();
// // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// // const renderer = new THREE.WebGLRenderer();

// // renderer.setSize(window.innerWidth, window.innerHeight);
// // document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(200, 500, 300);
// scene.add(directionalLight);

// function createWheels() {
//   const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
//   const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
//   const wheel = new THREE.Mesh(geometry, material);
//   return wheel;
// }

// function createCar() {
//   const car = new THREE.Group();

//   const backWheel = createWheels();
//   backWheel.position.y = 6;
//   backWheel.position.x = -18;
//   car.add(backWheel);

//   const frontWheel = createWheels();
//   frontWheel.position.y = 6;
//   frontWheel.position.x = 18;
//   car.add(frontWheel);

//   const main = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(60, 15, 30),
//     new THREE.MeshLambertMaterial({ color: 0xa52523 })
//   )

//   main.position.y = 12;
//   car.add(main);
    
//   const carFrontTexture = getCarFrontTexture();

//   const carBackTexture = getCarFrontTexture();

//   const carRightSideTexture = getCarSideTexture();

//   const carLeftSideTexture = getCarSideTexture();
  
//   carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
//   carLeftSideTexture.rotation = Math.PI;
//   carLeftSideTexture.flipY = false;

//   const cabin = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(33, 12, 24),
//     [
//       new THREE.MeshLambertMaterial({ map: carFrontTexture }),
//       new THREE.MeshLambertMaterial({ map: carBackTexture }),
//       new THREE.MeshLambertMaterial({ color: 0xffffff }),
//       new THREE.MeshLambertMaterial({ color: 0xffffff }),
//       new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
//       new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
//     ]);

//   cabin.position.x = -6;
//   cabin.position.y = 25.5;
//   car.add(cabin);

//   return car;
// }

// function getCarFrontTexture() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 64;
//   canvas.height = 32;
//   const context = canvas.getContext('2d');

//   context.fillStyle = '#ffffff';
//   context.fillRect(0, 0, 128, 32);

//   context.fillStyle = '#666666';
//   context.fillRect(10, 8, 38, 24);
//   context.fillRect(58, 8, 60, 24);
  
//   return new THREE.CanvasTexture(canvas);
// }

// function getCarSideTexture() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 64;
//   canvas.height = 32;
//   const context = canvas.getContext('2d');

//   context.fillStyle = '#ffffff';
//   context.fillRect(0, 0, 128, 32);

//   context.fillStyle = '#666666';
//   context.fillRect(10, 8, 38, 24);
//   context.fillRect(58, 8, 60, 24);
  
//   return new THREE.CanvasTexture(canvas);
// }

// const car = createCar();
// scene.add(car);

// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);
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
