// Declare the system variables.
var scene;
var camera;
var renderer;
var controls;

// Interaction state for rotating the shoe directly.
var isDraggingShoe = false;
var previousMouse = { x: 0, y: 0 };

//Define Setup function
function setScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfaf5ef);

    var ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    camera.position.set(34, 22, 48);
    camera.lookAt(0, 4, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 18;
    controls.maxDistance = 90;
    controls.target.set(0, 4, 0);

    addLights();
    addPointerEvents();
}

// Add lighting
function addLights() {
    var ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    var keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(25, 34, 20);
    keyLight.castShadow = true;
    scene.add(keyLight);

    var fillLight = new THREE.DirectionalLight(0xfff0dd, 0.35);
    fillLight.position.set(-24, 18, -16);
    scene.add(fillLight);
}

// Add interaction for the shoe
function addPointerEvents() {
    renderer.domElement.addEventListener("mousedown", function(event) {
        if (event.button !== 0) return;
        isDraggingShoe = true;
        previousMouse.x = event.clientX;
        previousMouse.y = event.clientY;
        controls.enabled = false;
    });

    window.addEventListener("mouseup", function() {
        isDraggingShoe = false;
        controls.enabled = true;
    });

    window.addEventListener("mousemove", function(event) {
        if (!isDraggingShoe || !shoeGroup) return;

        var deltaX = event.clientX - previousMouse.x;
        var deltaY = event.clientY - previousMouse.y;

        shoeGroup.rotation.y += deltaX * 0.01;
        shoeGroup.rotation.x += deltaY * 0.006;
        shoeGroup.rotation.x = clamp(shoeGroup.rotation.x, -0.35, 0.35);

        previousMouse.x = event.clientX;
        previousMouse.y = event.clientY;
    });
}

// Define the resize screen function.
var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};