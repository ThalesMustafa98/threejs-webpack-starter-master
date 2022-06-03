import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gsap from 'gsap'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI({ width: 500 });
//Consts/////////////////////////////////////////////////////////////////////////////
var g;
var planet_radius;
var sat_point;
var planet_point;
var sat_mass;
var planet_mass;
var sat_hieght;
var acceleration;
var orbital_time;
var overal_hieght = sat_hieght + planet_radius;
var gravity_force = (g * sat_mass * planet_mass) / (overal_hieght);
var overal_mass = sat_mass + planet_mass;
var w = theta / orbital_time;//Orbital speed
var theta = (Math.pow(orbital_time) * gravity_force) / overal_mass;
var sigma_f = sat_mass * acceleration;
var velocity = Math.sqrt((acceleration) * planet_radius);
var axis_X = overal_hieght * Math.cos(theta);
var axis_Y = overal_hieght * Math.sin(theta);


var _properties = {
    velocity: 0,
    orbital_time:0,
    g: 0.006673,
    planet_radius: 0,
    sat_mass: 0,
    planet_mass: 0,
    sat_hieght: 60,
    acceleration: 0,
    overal_mass: 0,
    theta: 0,
    gravity_force:0,
    sigma_f: 0,
    w: 0,//Orbital speed
    acceleration: 0,
    velocity:0,
    axis_X: 0,
    sat_point:{x:5,y:0,Z:10},
    planet_point:{x:0,y:0,Z:5},
    axis_Y: 0
};

/////////////////////////////////////////////////////////////////////////////

//Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader();
const galaxyTexture = textureLoader.load('./text/galaxy.png');
const earthTexture = textureLoader.load('./text/1.jpg');
const moonTexture = textureLoader.load('./text/2.jpg');
const p1Texture = textureLoader.load('./text/pt1.jfif');
const p2Texture = textureLoader.load('./text/pt2.jfif');
const p3Texture = textureLoader.load('./text/pt3.jfif');
const p4Texture = textureLoader.load('./text/pt4.jfif');

//Galaxy
const galaxyGeometry = new THREE.SphereGeometry(1000, 50, 50);
const galaxyMaterial = new THREE.MeshBasicMaterial({
    map: galaxyTexture,
    side: THREE.DoubleSide,
    shininess: 0
});
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

//Earth
const earthGeometry = new THREE.SphereGeometry(10, 50, 50);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(-2, 0, 0);
scene.add(earth);

//Moon 
const moonGeometry = new THREE.SphereGeometry(3.5, 50, 50);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(35, 0, 0);
scene.add(moon);



//Satallite
const stMoonGeometry = new THREE.SphereGeometry(1, 50, 50);
const stMoonMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const sat = new THREE.Mesh(stMoonGeometry, stMoonMaterial);
sat.position.set(15, 0, 0);
scene.add(sat);

//Debug UI
//gui.add(_properties,'sat_mass').min(-50).max(50).step(0.01).name('Satallite´s Mass (Kg)');
gui.add(_properties, 'planet_mass').min(-10000).max(10000).step(10).name('Planet´s Mass (Kg)');
gui.add(_properties, 'planet_radius').min(-10000).max(10000).step(10).name('Planet´s Radius (Km)');
gui.add(_properties, 'orbital_time').min(-10000).max(10000).step(10).name('orbital_time');
gui.add(_properties, 'gravity_force').min(-10000).max(10000).step(10).name('gravity_force');
gui.add(_properties, 'sat_mass').min(-10000).max(10000).step(10).name('sat_mass');
gui.add(_properties, 'sat_hieght').min(-10000).max(10000).step(10).name('sat_hieght');
gui.add(_properties, 'theta').min(-10000).max(10000).step(10).name('theta');
gui.add(sat.position.x, 'sat_point').min(-10000).max(10000).step(10).name('sat_point');
gui.add(_properties.planet_point.x, 'planet_point').min(-10000).max(10000).step(10).name('planet_point');


//Planet 1
const p1Geometry = new THREE.SphereGeometry(0.3, 50, 50);
const p1Material = new THREE.MeshBasicMaterial({ map: p1Texture });
const p1 = new THREE.Mesh(p1Geometry, p1Material);
p1.position.set(40, 0, 0);
scene.add(p1);

//Planet 2

const p2Geometry = new THREE.SphereGeometry(0.3, 50, 50);
const p2Material = new THREE.MeshBasicMaterial({ map: p2Texture });
const p2 = new THREE.Mesh(p2Geometry, p2Material);
p2.position.set(40, 10, 0);
scene.add(p2);

//Planet 3

const p3Geometry = new THREE.SphereGeometry(0.3, 50, 50);
const p3Material = new THREE.MeshBasicMaterial({ map: p3Texture });
const p3 = new THREE.Mesh(p3Geometry, p3Material);
p3.position.set(40, 15, 0);
scene.add(p3);

//Planet 4

const p4Geometry = new THREE.SphereGeometry(0.3, 50, 50);
const p4Material = new THREE.MeshBasicMaterial({ map: p4Texture });
const p4 = new THREE.Mesh(p4Geometry, p4Material);
p4.position.set(40, 5, 0);
scene.add(p4);



// Screen sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//

//Event listener
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1500);
camera.position.set(0, 25, 40);
camera.lookAt(earth.position);
scene.add(camera);



//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Consts
// const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
// const earthVec = new THREE.Vector3(0, 0, 0);
// var r = 40.2718;//distance from the earth
// var theta = 0;
// var dTheta = 2 * Math.PI / 1000;




//Draw
const animate = () => {

    earth.rotation.y += .0009;


    //Moon orbit        
    //theta += dTheta;
    //moon.position.x = r * Math.cos(velocity);
    //moon.position.z = r * Math.sin(theta);



    //Satllite
    sat.position.x = 15 * Math.cos(planet_point.x);
    sat.position.z = 15 * Math.sin(planet_point.y);
    

    //camera.lookAt(earthVec);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();