import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import px from './img/px.png';
import py from './img/py.png';
import pz from './img/pz.png';
import nx from './img/nx.png';
import ny from './img/ny.png';
import nz from './img/nz.png';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);

camera.position.setZ(20);

const canvas = document.querySelector('canvas');

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

const loader = new THREE.CubeTextureLoader();
const images = [px, nx, py, ny, pz, nz];
const texture = loader.load(images);
scene.background = texture;

const geometry = new THREE.TorusGeometry(3, 1, 10, 100);
const material = new THREE.MeshBasicMaterial({
  color: 'tomato',
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function tick() {
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  controls.update();
}

tick();
