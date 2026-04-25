// Prototype file.
// index.html now loads setup.js, build.js, animate.js, and run.js instead.
//
// TODO:
// - keep this only as reference while developing the structured version
// - delete it later if the final submission should contain only active files

var scene;
var camera;
var renderer;
var controls;

//for shoe model interaction
var isDragging = false;
var shoeModel;

function setScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFAF5EF);

  var ratio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 10000);

  camera.position.set(35, 25, 45);
  camera.lookAt(0, 0, 0);

  //renderer and canvas
  renderer = new THREE.WebGLRenderer({ 
    antialias: true 
    });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  //shoe controls
  renderer.domElement.addEventListener("mousedown", function(event) {
  if (event.button === 0) {
    isDragging = true;
        }
    });

renderer.domElement.addEventListener("mouseup", function(event) {
  if (event.button === 0) {
    isDragging = false;
        }
    });

renderer.domElement.addEventListener("mousemove", function(event) {
  if (!isDragging) return;

  shoeModel.rotation.y += event.movementX * 0.01;
  shoeModel.rotation.x += event.movementY * 0.01;

  renderer.render(scene, camera);
    });

  //window resize support
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//The Shoe will float above this platform; imagine like the platform in the Fortnite customisation screen.
function createShoePlatform() {
    const geometry = new THREE.CylinderGeometry(20,20,0.5,50,1,false);
    const material = new THREE.MeshBasicMaterial({
        color: 0x595959,
        side: THREE.FrontSide
    });

    const shoePlatform = new THREE.Mesh(geometry, material);
    shoePlatform.position.set(0,-5,3);

    scene.add(shoePlatform);
}

function createShoe(/*Maybe theses variables can be SoleType, LaceType, ColourChoice, etc*/) {
    //for now the shoe is just a box
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.FrontSide
    })

    shoeModel = new THREE.Mesh(geometry, material);
    shoeModel.position.set(0,3,3);

    scene.add(shoeModel);
}

function animate() {
    renderer.render(scene, camera);
}

setScene();
createShoePlatform();
createShoe();
animate();
