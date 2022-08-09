import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

function main() {
  const canvas = document.querySelector('#cube');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const fov = 75;  // 與視角之間的距離
  const aspect = window.innerWidth / window.innerHeight; // camera水平與垂直長度的比值，通常為canvas寬高比
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // const left = -2;
  // const right = 2;
  // const top =  2;
  // const bottom = -2;
  // const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  // camera.position.z = 2;
  camera.position.set(0, 0, 20);
  // camera.lookAt(scene.position);

  {
    const color = 0xFFFFFF;
    const intensity = 6;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  // {
  //   const color = 0xFFFFFF;
  //   const intensity = 0.6;
  //   const ambientLight = new THREE.AmbientLight(color, intensity);
  //   ambientLight.position.set(-1, 2, 4);
  //   scene.add(ambientLight);
  // }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  // const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = [
    makeInstance(geometry, 0x44aa88, 0, 13),
    makeInstance(geometry, 0x8844aa, -2, 10),
    makeInstance(geometry, 0xaa8844, 2, 15),
  ]
  
  scene.add(cube);
  
  function rotate(time) {
    time *= 0.001;

    cube.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })
  
    renderer.render(scene, camera);
  
    requestAnimationFrame(rotate);
  }
  requestAnimationFrame(rotate);
}

function makeInstance(geometry, color, x, z) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  cube.position.x = x;
  cube.position.z = z;

  return cube;
}


window.onload = main;
