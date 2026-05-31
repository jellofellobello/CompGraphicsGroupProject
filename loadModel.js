const modelLoader = new THREE.GLTFLoader();

var bodySelect = 0;
var laceSelect = 0;
var soleSelect = 0;

var shoeModelBody = [];
var shoeModelLaces = [];
var shoeModelSole = [];

var dressLaceExtension = [];

var loadAllBody = [
    "Assets/Models/AthleticSneakers_Assets/Body1_AS_NoLace_High.glb",
    "Assets/Models/Dress_Assets/Body2_D.glb",
    "Assets/Models/ComfortSneakers_Assets/Body3_CS_Lace1.glb",
    "Assets/Models/Boot_Assets/Body4_Boot_LaceVer.glb",

    "Assets/Models/ComfortSneakers_Assets/Body3_CS_NoLace.glb",
    "Assets/Models/Boot_Assets/Body4_Boot_NoLace.glb",
    
];

var loadAllLaces = [
    //Load all Lace 1 assets
    "Assets/Models/Laces/RegularLace_Assets/Laces1_for_AS.glb",

    
    "Assets/Models/Laces/RegularLace_Assets/Laces1_for_Dress.glb",
    "Assets/Models/Laces/RegularLace_Assets/Laces1_for_CS.glb",
    
    "Assets/Models/Laces/RegularLace_Assets/Laces1_for_Boot.glb",

    //load all Lace 2 assets
    "Assets/Models/Laces/ThinLace_Assets/Laces2_for_AS.glb",
    "Assets/Models/Laces/ThinLace_Assets/Laces2_for_Dress.glb",
    "Assets/Models/Laces/ThinLace_Assets/Laces2_for_CS.glb",
    "Assets/Models/Laces/ThinLace_Assets/Laces2_for_Boot.glb"  
];

var loadAllSole = [
    "Assets/Models/AthleticSneakers_Assets/Sole1_AS.glb",
    "Assets/Models/Dress_Assets/Sole2_D.glb",
    "Assets/Models/ComfortSneakers_Assets/Sole3/Sole3_CS_Wide.glb",
    "Assets/Models/Boot_Assets/Sole4_Boot.glb",

    //Wide sole for Body type 3
    "Assets/Models/ComfortSneakers_Assets/Sole3/Sole3_CS_Slim.glb"
];

var loadDressExt = [
    "Assets/Models/Dress_Assets/Body2_D_LaceExtension_Lace1.glb",
    "Assets/Models/Dress_Assets/Body2_D_LaceExtension_Lace1.glb"
];

function loadModels() {
    var loadedCount = 0;

    var totalModels =
        loadAllBody.length +
        loadAllLaces.length +
        loadAllSole.length +
        loadDressExt.length;

    function checkAllLoaded() {
        loadedCount++;

        function addDressExtensionIfNeeded() {
            if (bodySelect === 1) {
                if (laceSelect === 0 && dressLaceExtension[0]) {
                    shoeGroup.add(dressLaceExtension[0]);
                }

                if (laceSelect === 1 && dressLaceExtension[1]) {
                    shoeGroup.add(dressLaceExtension[1]);
                }
            }
        }

        if (loadedCount === totalModels) {
            shoeGroup.add(shoeModelBody[getActualBodyIndex()]);
            shoeGroup.add(shoeModelLaces[getActualLaceIndex()]);
            shoeGroup.add(shoeModelSole[getActualSoleIndex()]);
            addDressExtensionIfNeeded();

            alignShoeToBase();
            applySettings();
        }
    }

    for (let i = 0; i < loadAllBody.length; i++) {
        modelLoader.load(loadAllBody[i], function (gltf) {
            shoeModelBody[i] = gltf.scene;
            setupModel(shoeModelBody[i]);

            checkAllLoaded();
        });
    }

    for (let i = 0; i < loadAllLaces.length; i++) {
        modelLoader.load(loadAllLaces[i], function (gltf) {
            shoeModelLaces[i] = gltf.scene;
            setupModel(shoeModelLaces[i]);
            checkAllLoaded();
        });
    }

    for (let i = 0; i < loadAllSole.length; i++) {
        modelLoader.load(loadAllSole[i], function (gltf) {
            shoeModelSole[i] = gltf.scene;
            setupModel(shoeModelSole[i]);
            checkAllLoaded();
        });
    }

    for (let i = 0; i < loadDressExt.length; i++) {
        modelLoader.load(loadDressExt[i], function (gltf) {
            dressLaceExtension[i] = gltf.scene;
            setupModel(dressLaceExtension[i]);
            checkAllLoaded();
        });
    }

    // Loading Angelo's shoe parts
    /*modelLoader.load("Assets/Models/AngeloShoe/AngeloBody.glb", function(gltf){
        streewearBody = gltf.scene;
        setupModel(streewearBody);
        checkAllLoaded();
    });


    modelLoader.load("Assets/Models/AngeloShoe/AngeloLaces.glb", function(gltf){
        streewearLaces = gltf.scene;
        setupModel(streewearLaces);
        checkAllLoaded();
    });


    modelLoader.load("Assets/Models/AngeloShoe/AngeloSole.glb", function(gltf){
        streetwearSole = gltf.scene;
        setupModel(streetwearSole);
        checkAllLoaded();
    });


    //Dress Shoe
    modelLoader.load("Assets/Models/AngeloDress/AngeloDressBody.glb", function(gltf){
        dressBody = gltf.scene;
        setupModel(dressBody);
        checkAllLoaded();
    });


    modelLoader.load("Assets/Models/AngeloDress/AngeloDressSole.glb", function(gltf){
        dressSole = gltf.scene;
        setupModel(dressSole);
        checkAllLoaded();
    });*/

}

function updateSize() {

    for (var i = 0; i < shoeModelBody.length; i++) {
        if (shoeModelBody[i]) {
            shoeModelBody[i].scale.set(3, 3, 3 * sizeValue);
        }
    }

    for (var i = 0; i < shoeModelLaces.length; i++) {
        if (shoeModelLaces[i]) {
            shoeModelLaces[i].scale.set(3, 3, 3 * sizeValue);
        }
    }

    for (var i = 0; i < shoeModelSole.length; i++) {
        if (shoeModelSole[i]) {
            shoeModelSole[i].scale.set(3, 3, 3 * sizeValue);
        }
    }

    for (var i = 0; i < dressLaceExtension.length; i++) {
        if (dressLaceExtension[i]) {
            dressLaceExtension[i].scale.set(3, 3, 3 * sizeValue);
        }
    }

    alignShoeToBase();
}

function getActualBodyIndex() {
    var realBodySelect = bodySelect;

    // if (bodySelect == 2) {
    //     realBodySelect = 4;
    // }
    // if (bodySelect == 3) {
    //     realBodySelect = 5;
    // }

    return realBodySelect;
}

function getActualSoleIndex() {
    if (bodySelect === 2 && soleSelect === 2) {
        return 4;
    }

    var realSoleSelect = soleSelect;

    return realSoleSelect;
}

function getActualLaceIndex() {
    var realLaceSelect = laceSelect;

    if (laceSelect == 0) {
        realLaceSelect = (1 * bodySelect);
    }

    if (laceSelect == 1) {
        realLaceSelect = ((1 * bodySelect) + 4);
    }

    return realLaceSelect;
}

function addDressExtensionIfNeeded() {
    if (bodySelect === 1 && laceSelect === 0 && dressLaceExtension[0]) {
        shoeGroup.add(dressLaceExtension[0]);
    }

    if (bodySelect === 1 && laceSelect === 1 && dressLaceExtension[1]) {
        shoeGroup.add(dressLaceExtension[1]);
    }
}

function updateShoeModel() {
    if (!shoeGroup) return;

    while (shoeGroup.children.length > 0) {
        shoeGroup.remove(shoeGroup.children[0]);
    }

    shoeGroup.add(shoeModelBody[getActualBodyIndex()]);
    shoeGroup.add(shoeModelLaces[getActualLaceIndex()]);
    shoeGroup.add(shoeModelSole[getActualSoleIndex()]);

    addDressExtensionIfNeeded();

    alignShoeToBase();
    applySettings();
}

function setupModel(model) {
    model.scale.set(3, 3, 3);
    model.position.set(0, 0, 0);
}