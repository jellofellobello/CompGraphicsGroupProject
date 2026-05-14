/* Declare the customiser objects. */
var rotatingBase;
var shoeGroup;
var autoRotateEnabled = true;
var autoRotateSpeed = 0.0035;
var dragRotationVelocity = 0;

// Custom settings (TODO: expand as needed for more customisation options)
var shoeSettings = {
    shoeColor: "#d84a3a",
    soleColor: "#f2f2ec",
    laceColor: "#202020",
    material: "leather"
};

// UTILS
function clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
}

function createMaterial(color, roughness, metalness){
    return new THREE.MeshStandardMaterial({
        color: color,
        roughness: roughness,
        metalness: metalness
    });
}

function recolorModelPart(root, color, roughness, metalness){
    if (!root) return;

    root.traverse(function(child){
        if (!child.isMesh || !child.material){
            return;
        }

        child.material = child.material.clone();
        child.material.color.set(color);
        child.material.roughness = roughness;
        child.material.metalness = metalness;
    });
}

function getMaterialPreset(){
    if (shoeSettings.material === "matte"){
        return {
            body: {roughness: 0.92, metalness: 0.01},
            laces: {roughness: 0.98, metalness: 0.0},
            sole: {roughness: 0.9, metalness: 0.0}
        };
    }

    if (shoeSettings.material === "gloss"){
        return {
            body: {roughness: 0.24, metalness: 0.16},
            laces: {roughness: 0.62, metalness: 0.02},
            sole: {roughness: 0.34, metalness: 0.08}
        };
    }

    if (shoeSettings.material === "rubber"){
        return {
            body: {roughness: 0.72, metalness: 0.03},
            laces: {roughness: 0.94, metalness: 0.0},
            sole: {roughness: 0.97, metalness: 0.0}
        };
    }

    return {
        body: {roughness: 0.58, metalness: 0.08},
        laces: {roughness: 0.92, metalness: 0.02} ,
        sole: {roughness: 0.82, metalness: 0.03}
    };
}

function applySettings(){
    var preset = getMaterialPreset();

    recolorModelPart(streewearBody, shoeSettings.shoeColor, preset.body.roughness, preset.body.metalness);
    recolorModelPart(streewearLaces, shoeSettings.laceColor, preset.laces.roughness, preset.laces.metalness);
    recolorModelPart(streetwearSole, shoeSettings.soleColor, preset.sole.roughness, preset.sole.metalness);
}

function alignShoeToBase(){
    if (!shoeGroup || shoeGroup.children.length === 0) return;

    shoeGroup.updateMatrixWorld(true);

    var bounds = new THREE.Box3().setFromObject(shoeGroup);
    var center = new THREE.Vector3();
    bounds.getCenter(center);

    var baseTopY = -3.275;
    var offsetX = center.x - shoeGroup.position.x;
    var offsetZ = center.z - shoeGroup.position.z;
    var offsetY = bounds.min.y - baseTopY;

    for (var i = 0; i < shoeGroup.children.length; i++){
        shoeGroup.children[i].position.x -= offsetX;
        shoeGroup.children[i].position.z -= offsetZ;
        shoeGroup.children[i].position.y -= offsetY;
    }

    shoeGroup.position.set(0, 0, 3);
    shoeGroup.updateMatrixWorld(true);
}

function buildRotatingBase(){
    var baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x66727f,
        roughness: 0.66,
        metalness: 0.14
    });
    var trimMaterial = new THREE.MeshStandardMaterial({
        color: 0x232a31,
        roughness: 0.38,
        metalness: 0.22
    });

    rotatingBase = new THREE.Group();
    rotatingBase.position.set(0, 0, 3);

    var plinth = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 22, 2.4, 64),
        baseMaterial
    );
    plinth.position.set(0, -5.2, 0);
    rotatingBase.add(plinth);

    var topDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(16.5, 16.5, 0.55, 64),
        trimMaterial
    );
    topDisc.position.set(0, -3.55, 0);
    rotatingBase.add(topDisc);

    scene.add(rotatingBase);
}

function buildGui(){
    var shoeColorInput = document.getElementById("shoeColorInput");
    var laceColorInput = document.getElementById("laceColorInput");
    var soleColorInput = document.getElementById("soleColorInput");
    var autoRotateToggle = document.getElementById("autoRotateToggle");
    var rotateSpeedInput = document.getElementById("rotateSpeedInput");
    var materialSelect = document.getElementById("materialSelect");

    shoeColorInput.value = shoeSettings.shoeColor;
    laceColorInput.value = shoeSettings.laceColor;
    soleColorInput.value = shoeSettings.soleColor;
    autoRotateToggle.checked = autoRotateEnabled;
    rotateSpeedInput.value = autoRotateSpeed;
    materialSelect.value = shoeSettings.material;

    shoeColorInput.addEventListener("input", function(event){
        shoeSettings.shoeColor = event.target.value;
        applySettings();
    });

    laceColorInput.addEventListener("input", function(event){
        shoeSettings.laceColor = event.target.value;
        applySettings();
    });

    soleColorInput.addEventListener("input", function(event){
        shoeSettings.soleColor = event.target.value;
        applySettings();
    });

    autoRotateToggle.addEventListener("change", function(event){
        autoRotateEnabled = event.target.checked;
    });

    rotateSpeedInput.addEventListener("input", function(event){
        autoRotateSpeed = Number(event.target.value);
    });

    materialSelect.addEventListener("change", function(event){
        shoeSettings.material = event.target.value;
        applySettings();
    });
}

// MAIN
function addShapes(){
    buildRotatingBase();
    shoeGroup = new THREE.Group();
    shoeGroup.position.set(0, 0, 3);
    scene.add(shoeGroup);
    loadModels();
}
