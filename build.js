/* Declare the customiser objects. */
var platform;
var shoeGroup;
var gui;
var autoRotateEnabled = true;
var autoRotateSpeed = 0.0035;
var dragRotationVelocity = 0;

// Custom settings (TODO: expand as needed for more customisation options)
var shoeSettings = {
    shoeColor: "#d84a3a",
    soleColor: "#f2f2ec",
    laceColor: "#202020",
    logoColor: "#2166f3",
    material : "leather",
};

// UTILS
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function createMaterial(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({
        color: color,
        roughness: roughness,
        metalness: metalness
    });
}

function recolorModelPart(root, color, roughness, metalness) {
    if (!root) return;

    root.traverse(function(child) {
        if (!child.isMesh || !child.material) {
            return;
        }

        child.material = child.material.clone();
        child.material.color.set(color);
        child.material.roughness = roughness;
        child.material.metalness = metalness;
    });
}

function applyShoeColors() {
    recolorModelPart(streewearBody, shoeSettings.shoeColor, 0.58, 0.08);
    recolorModelPart(streewearLaces, shoeSettings.laceColor, 0.92, 0.02);
    recolorModelPart(streetwearSole, shoeSettings.soleColor, 0.82, 0.03);
}

// SHOE PLATFORM
function buildPlatform() {
    var geometry = new THREE.CylinderGeometry(18, 18, 1.2, 72);
    var material = createMaterial(0x4f5358, 0.5, 0.1);

    platform = new THREE.Mesh(geometry, material);
    platform.position.set(0,-5,3);
    platform.receiveShadow = true;
    scene.add(platform);
}

// GUI Setup
function buildGui() {
    gui = new dat.GUI();

    var colourFolder = gui.addFolder("Colours");
    colourFolder.addColor(shoeSettings, "shoeColor").name("Body").onChange(applyShoeColors);
    colourFolder.addColor(shoeSettings, "laceColor").name("Laces").onChange(applyShoeColors);
    colourFolder.addColor(shoeSettings, "soleColor").name("Sole").onChange(applyShoeColors);
    colourFolder.open();

    var rotationFolder = gui.addFolder("Rotation");
    rotationFolder.add(window, "autoRotateEnabled").name("Auto Rotate");
    rotationFolder.add(window, "autoRotateSpeed", 0.0, 0.02).step(0.0005).name("Speed");
}

/* Define the add shapes function.
 *
 * TODO:
 * - add background props only if they support the shoe-customiser theme
 */
function addShapes() {
    buildPlatform();
    shoeGroup = new THREE.Group();
    shoeGroup.position.set(0, 3, 3);
    scene.add(shoeGroup);
    loadModels();
}
