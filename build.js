/* Declare the customiser objects. */
var platform;
var shoeModel;
var shoeParts = {};
var gui;

var laceSelect = 1;

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

// SHOE PLATFORM
function buildPlatform() {
    var geometry = new THREE.CylinderGeometry(18, 18, 1.2, 72);
    var material = createMaterial(0x4f5358, 0.5, 0.1);

    platform = new THREE.Mesh(geometry, material);
    platform.position.set(0,-5,3);
    platform.receiveShadow = true;
    scene.add(platform);
}

// TODO
function buildShoe(lace) {

    shoeModel = new THREE.Group();
    
    const geometry = new THREE.BoxGeometry(10,10,10);
    var material = createMaterial(0xff0000, 1, 0.4);

    shoeBody = new THREE.Mesh(geometry, material);
    shoeBody.receiveShadow = true;

    shoeModel.add(shoeBody);
    shoeModel.position.set(0,3,3);
    scene.add(shoeModel);

    buildLaces(lace);

}

// TODO
function buildLaces(lacesNum) {
    
    if (lacesNum == 0) {
        const geometry = new THREE.BoxGeometry(10,10,10);
        var material = createMaterial(0x00ff00, 1, 0.4);
        shoeLace1 = new THREE.Mesh(geometry, material);
        shoeLace1.position.set(0, 3, 5.2);
        shoeLace1.receiveShadow = true;

        shoeModel.add(shoeLace1);
    }

    if (lacesNum == 1) {
        const geometry = new THREE.BoxGeometry(10,10,10);
        var material = createMaterial(0x0000ff, 1, 0.4);
        shoeLace2 = new THREE.Mesh(geometry, material);
        shoeLace2.position.set(0, 3, 5.2);
        shoeLace2.receiveShadow = true;

        shoeModel.add(shoeLace2);
    }
}


// TODO
function buildLogo() {
    
}

// TODO (GUI Setup)
function buildGui() {
    gui = new dat.GUI();
}

/* Define the add shapes function.
 *
 * TODO:
 * - add background props only if they support the shoe-customiser theme
 */
function addShapes() {
    buildPlatform();
    buildShoe(laceSelect);
}
