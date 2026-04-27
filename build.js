/* Declare the customiser objects. */
var platform;
var shoeParts = {};
var gui;

var laceSelect = 1;


// Custom settings (TODO: expand as needed for more customisation options)
var shoeSettings = {
    bodySelect: 1,
    laceSelect: 1,
    soleSelect: 1,

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

// SHOE PLATFORM
function buildPlatform() {
    var geometry = new THREE.CylinderGeometry(18, 18, 1.2, 72);
    var material = createMaterial(0x4f5358, 0.5, 0.1);

    platform = new THREE.Mesh(geometry, material);
    platform.position.set(0,-5,3);
    platform.receiveShadow = true;
    scene.add(platform);
}

function buildShoe(body, laces, sole) {
    clearShoe();

    if (body == 1 && trainerBody) {
        scene.add(trainerBody);
    }

    if (laces == 1 && trainerLaces) {
        scene.add(trainerLaces);
    }

    if (sole == 1 && trainerSole) {
        scene.add(trainerSole);
    }
}

function clearShoe() {
    if (trainerBody) scene.remove(trainerBody);
    if (trainerLaces) scene.remove(trainerLaces);
    if (trainerSole) scene.remove(trainerSole);
}

function buildBody(bodyNum) {
    if (bodyNum == 1) {
        scene.add(trainerBody);
    }
}

function buildLaces(lacesNum) {
    if (lacesNum == 1) {
        scene.add(trainerLaces);
    }
}

function buildSole(soleNum) {
    if (soleNum == 1) {
        scene.add(trainerSole);
    }
}

// TODO
function buildLogo() {
    
}

// TODO (GUI Setup)
function buildGui() {
    gui = new dat.GUI();

    gui.add(shoeSettings, "bodySelect", {
        None: 0,
        Trainer: 1
    }).name("Body").onChange(updateShoe);

    gui.add(shoeSettings, "laceSelect", {
        None: 0,
        Trainer: 1
    }).name("Laces").onChange(updateShoe);

    gui.add(shoeSettings, "soleSelect", {
        None: 0,
        Trainer: 1
    }).name("Sole").onChange(updateShoe);
}

function updateShoe() {
    buildShoe(
        Number(shoeSettings.bodySelect),
        Number(shoeSettings.laceSelect),
        Number(shoeSettings.soleSelect)
    );
}

/* Define the add shapes function.
 *
 * TODO:
 * - add background props only if they support the shoe-customiser theme
 */
function addShapes() {
    buildPlatform();
    loadModels();
}
