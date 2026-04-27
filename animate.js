// Global time variable for customiser animation.
var time = 0;

// TODO
function animateShoe() {
    if (trainerBody) {
        trainerBody.rotation.y += 0.006;
    }

    if (trainerLaces) {
        trainerLaces.rotation.y += 0.006;
    }

    if (trainerSole) {
        trainerSole.rotation.y += 0.006;
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
