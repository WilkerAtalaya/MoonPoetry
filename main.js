import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(750, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setY(60);
camera.position.setZ(1);
camera.position.setX(0);

renderer.render( scene, camera);


const geometry = new THREE.TorusGeometry(11 , 1 ,45,100)
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 }); 
const torus = new THREE.Mesh(geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(105,5,1)

const ambientLight = new THREE.AmbientLight(0xFD9386)



scene.add(torus);
scene.add(pointLight,ambientLight );



const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry( 0.25, 32, 16 ); 
    const material = new THREE.MeshStandardMaterial ({ color: 0xf3e0a1 } ); 
    const star = new THREE.Mesh( geometry, material ); 

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
}

Array(300).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('../images/space4k.jpg')
scene.background = spaceTexture

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.0051;
    torus.rotation.y += 0.003;
    torus.rotation.z += 0.01;


    renderer.render( scene, camera)
}

animate()




// Moon
const moonTexture = new THREE.TextureLoader().load('../images/moon.jpg' );

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
})
);

scene.add(moon)

// Scroll Animation

function moveCamera() {
  moon.rotation.x += 0.03;
  moon.rotation.y += 0.03;
  moon.rotation.z += 0.03;
  
}
document.body.onscroll = moveCamera;
moveCamera();

