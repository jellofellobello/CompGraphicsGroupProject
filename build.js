/* Declare the customiser objects. */
var platform;
var shoeParts = {};
var gui;

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

//buildShoe is the main function that is called. The parameters are numbers, and each shoe part of each type is a different number.
//Effectively, each selection should change the "e.g. body" value to a number; 1 equals the trainer body, 2 will equal a different body.
function buildShoe(body, laces, sole) {
    clearShoe();

    //Trainer
    if (body == 1 && trainerBody) {
        scene.add(trainerBody);
    }

    if (laces == 1 && trainerLaces) {
        scene.add(trainerLaces);
    }

    if (sole == 1 && trainerSole) {
        scene.add(trainerSole);
    }

    //Dress Shoe
    if (body == 2 && dressBody) {
        scene.add(dressBody);
    }

    if (laces == 2 && dressLaces) {
        scene.add(dressLaces);
    }

    if (sole == 2 && dressSole) {
        scene.add(dressSole);
    }

    //Streetwear
    if (body == 3 && streewearBody) {
        scene.add(streewearBody);
    }

    if (laces == 3 && streewearLaces) {
        scene.add(streewearLaces);
    }

    if (sole == 3 && streetwearSole) {
        scene.add(streetwearSole);
    }
}

function clearShoe() {
    if (trainerBody) scene.remove(trainerBody);
    if (trainerLaces) scene.remove(trainerLaces);
    if (trainerSole) scene.remove(trainerSole);

    if (dressBody) scene.remove(dressBody);
    if (dressLaces) scene.remove(dressLaces);
    if (dressSole) scene.remove(dressSole);

    if (streewearBody) scene.remove(streewearBody);
    if (streewearLaces) scene.remove(streewearLaces);
    if (streetwearSole) scene.remove(streetwearSole);
}

function buildBody(bodyNum) {
    if (bodyNum == 1) {
        scene.add(trainerBody);
    }

    if (bodyNum == 2) {
        scene.add(dressBody);
    }

    if (bodyNum == 3) {
        scene.add(streewearBody);
    }
}

function buildLaces(lacesNum) {
    if (lacesNum == 1) {
        scene.add(trainerLaces);
    }

    if (lacesNum == 2) {
        scene.add(dressLaces);
    }

    if (lacesNum == 3) {
        scene.add(streewearLaces);
    }
}

function buildSole(soleNum) {
    if (soleNum == 1) {
        scene.add(trainerSole);
    }

    if (soleNum == 2) {
        scene.add(dressSole);
    }

    if (soleNum == 3) {
        scene.add(streetwearSole);
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
        Trainer: 1,
        Dress: 2,
        Streetwear: 3
    }).name("Body").onChange(updateShoe);

    gui.add(shoeSettings, "laceSelect", {
        None: 0,
        Trainer: 1,
        Dress: 2,
        Streetwear: 3
    }).name("Laces").onChange(updateShoe);

    gui.add(shoeSettings, "soleSelect", {
        None: 0,
        Trainer: 1,
        Dress: 2,
        Streetwear: 3
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
