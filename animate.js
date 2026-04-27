// Global time variable for customiser animation.
var time = 0;

// TODO
//If new parts added, updated this
function animateShoe() {
    const shoeParts = [
        trainerBody,
        trainerLaces,
        trainerSole,
        dressBody,
        dressLaces,
        dressSole
    ];

    for (let i = 0; i < shoeParts.length; i++) {
        if (shoeParts[i]) {
            shoeParts[i].rotation.y += 0.006;
        }
    }
}

// TODO
function animatePlatform() {
    if (!platform) return;
    platform.rotation.y += 0.003;
}

/* Main animation loop. */
function animate() {
    requestAnimationFrame(animate);

    time += 0.01;
    animateShoe();
    animatePlatform();

    controls.update();
    renderer.render(scene, camera);
}
