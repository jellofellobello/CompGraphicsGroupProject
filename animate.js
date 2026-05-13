// Global time variable for customiser animation.
var time = 0;

// TODO
//If new parts added, updated this
function animateShoe() {
    if (!shoeGroup) return;

    if (!isDraggingShoe) {
        if (autoRotateEnabled) {
            shoeGroup.rotation.y += autoRotateSpeed;
        }

        shoeGroup.rotation.y += dragRotationVelocity;
        dragRotationVelocity *= 0.92;

        if (Math.abs(dragRotationVelocity) < 0.00005) {
            dragRotationVelocity = 0;
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
