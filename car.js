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
