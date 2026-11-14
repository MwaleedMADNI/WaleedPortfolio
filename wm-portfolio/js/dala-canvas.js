/* ==========================================================================
   DALA 3D PARTICLE CONSTELLATION & NEURAL BRAIN CANVAS
   Signature visual: Multi-colored triangular particle cloud in organic neural shape
   Colors: Electric Iris (#8052ff), Saffron Spark (#ffb829), Deep Verdant (#15846e), Cyan, Magenta
   ========================================================================== */

(function () {
  'use strict';

  const container = document.getElementById('dala-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0018);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 520;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('dala-canvas'),
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Chromatic Palette Tokens (Dala Signature)
  const palette = [
    new THREE.Color('#8052ff'), // Electric Iris (dominant)
    new THREE.Color('#966eff'), // Soft Iris
    new THREE.Color('#ffb829'), // Saffron Spark
    new THREE.Color('#ffd27a'), // Warm amber
    new THREE.Color('#15846e'), // Deep Verdant
    new THREE.Color('#00e5ff'), // Electric Cyan
    new THREE.Color('#f43f5e'), // Neon Magenta
    new THREE.Color('#ffffff')  // Bone White sparkle
  ];

  // 1. Organic Dual-Hemisphere Brain Constellation
  const brainParticlesCount = 1800;
  const brainGeometry = new THREE.BufferGeometry();
  const brainPositions = new Float32Array(brainParticlesCount * 3);
  const brainColors = new Float32Array(brainParticlesCount * 3);
  const brainOriginalPos = [];

  for (let i = 0; i < brainParticlesCount; i++) {
    // Generate organic 3D ellipsoidal dual-lobe brain shape
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    const rBase = 160 + (Math.random() - 0.5) * 40;
    // Brain shape deformation: two hemispheres split across X=0
    const hemisphere = Math.random() > 0.5 ? 1 : -1;
    const xOffset = hemisphere * (28 + Math.random() * 18);
    
    // Scale axes: X (width), Y (height), Z (depth)
    let x = (rBase * 0.72 * Math.sin(phi) * Math.cos(theta)) + xOffset;
    let y = (rBase * 0.65 * Math.sin(phi) * Math.sin(theta)) + (Math.sin(theta * 2) * 15);
    let z = (rBase * 0.95 * Math.cos(phi)) - 10;

    // Organic neural ridges (lobes & cerebellum indentation)
    const ridge = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 16;
    x += ridge * 0.4;
    y += ridge * 0.6;
    z += ridge * 0.5;

    brainPositions[i * 3] = x;
    brainPositions[i * 3 + 1] = y;
    brainPositions[i * 3 + 2] = z;

    brainOriginalPos.push({ x, y, z, seed: Math.random() * 10 });

    // Pick chromatic palette color (heavily weighted towards Iris & Saffron)
    const colorWeight = Math.random();
    let col;
    if (colorWeight < 0.45) {
      col = palette[0]; // Electric Iris
    } else if (colorWeight < 0.65) {
      col = palette[2]; // Saffron Spark
    } else if (colorWeight < 0.80) {
      col = palette[4]; // Deep Verdant
    } else if (colorWeight < 0.90) {
      col = palette[5]; // Cyan
    } else {
      col = palette[6]; // Magenta
    }

    brainColors[i * 3] = col.r;
    brainColors[i * 3 + 1] = col.g;
    brainColors[i * 3 + 2] = col.b;
  }

  brainGeometry.setAttribute('position', new THREE.BufferAttribute(brainPositions, 3));
  brainGeometry.setAttribute('color', new THREE.BufferAttribute(brainColors, 3));

  // Particle texture: clean sharp triangular / circular glow
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  // Draw equilateral triangle glyph (Dala style)
  ctx.beginPath();
  ctx.moveTo(32, 8);
  ctx.lineTo(56, 54);
  ctx.lineTo(8, 54);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  const particleTexture = new THREE.CanvasTexture(canvas);

  const brainMaterial = new THREE.PointsMaterial({
    size: 9.5,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const brainPoints = new THREE.Points(brainGeometry, brainMaterial);
  scene.add(brainPoints);

  // 2. Dynamic Synaptic Connections (Lines between nearby particles)
  const maxLineConnections = 240;
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxLineConnections * 6);
  const lineColors = new Float32Array(maxLineConnections * 6);

  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const synapseLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(synapseLines);

  // 3. Ambient Drifting Background Field (Dala "Constellation on Black Velvet")
  const ambientCount = 600;
  const ambientGeometry = new THREE.BufferGeometry();
  const ambientPositions = new Float32Array(ambientCount * 3);
  const ambientColors = new Float32Array(ambientCount * 3);

  for (let i = 0; i < ambientCount; i++) {
    ambientPositions[i * 3] = (Math.random() - 0.5) * 1600;
    ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
    ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 800;

    const col = palette[Math.floor(Math.random() * palette.length)];
    ambientColors[i * 3] = col.r;
    ambientColors[i * 3 + 1] = col.g;
    ambientColors[i * 3 + 2] = col.b;
  }

  ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
  ambientGeometry.setAttribute('color', new THREE.BufferAttribute(ambientColors, 3));

  const ambientMaterial = new THREE.PointsMaterial({
    size: 5.5,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);
  scene.add(ambientPoints);

  // Mouse Parallax & Scroll Integration
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let scrollY = 0;

  window.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0012;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0012;
  });

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY || window.pageYOffset;
  });

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth cursor interpolation
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Brain Constellation Organic Pulsing & Rotation
    brainPoints.rotation.y = elapsedTime * 0.08 + targetX * 1.5;
    brainPoints.rotation.x = Math.sin(elapsedTime * 0.05) * 0.12 + targetY * 1.2;
    synapseLines.rotation.y = brainPoints.rotation.y;
    synapseLines.rotation.x = brainPoints.rotation.x;

    // Position shifts with page scroll (drifting right/left organically)
    const scrollFactor = scrollY * 0.0006;
    brainPoints.position.y = -scrollY * 0.18 + Math.sin(elapsedTime * 0.4) * 8;
    brainPoints.position.x = 110 + Math.cos(elapsedTime * 0.3) * 6; // Sit nicely in the right hero column
    synapseLines.position.copy(brainPoints.position);

    // Dynamic wave oscillation on individual particles
    const positions = brainGeometry.attributes.position.array;
    for (let i = 0; i < brainParticlesCount; i++) {
      const orig = brainOriginalPos[i];
      const wave = Math.sin(elapsedTime * 1.6 + orig.seed) * 3.5;
      positions[i * 3] = orig.x + wave * 0.4;
      positions[i * 3 + 1] = orig.y + wave * 0.5;
      positions[i * 3 + 2] = orig.z + wave * 0.3;
    }
    brainGeometry.attributes.position.needsUpdate = true;

    // Update dynamic synaptic lines between a subset of close particles
    let lineIndex = 0;
    const lPos = lineGeometry.attributes.position.array;
    const lCol = lineGeometry.attributes.color.array;

    for (let i = 0; i < 280 && lineIndex < maxLineConnections; i += 3) {
      const p1Index = Math.floor((i * 6.3) % brainParticlesCount);
      const p2Index = Math.floor((i * 11.7) % brainParticlesCount);

      const dx = positions[p1Index * 3] - positions[p2Index * 3];
      const dy = positions[p1Index * 3 + 1] - positions[p2Index * 3 + 1];
      const dz = positions[p1Index * 3 + 2] - positions[p2Index * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 75) {
        lPos[lineIndex * 6] = positions[p1Index * 3];
        lPos[lineIndex * 6 + 1] = positions[p1Index * 3 + 1];
        lPos[lineIndex * 6 + 2] = positions[p1Index * 3 + 2];

        lPos[lineIndex * 6 + 3] = positions[p2Index * 3];
        lPos[lineIndex * 6 + 4] = positions[p2Index * 3 + 1];
        lPos[lineIndex * 6 + 5] = positions[p2Index * 3 + 2];

        // Line color
        lCol[lineIndex * 6] = 0.5;
        lCol[lineIndex * 6 + 1] = 0.32;
        lCol[lineIndex * 6 + 2] = 1.0;

        lCol[lineIndex * 6 + 3] = 1.0;
        lCol[lineIndex * 6 + 4] = 0.72;
        lCol[lineIndex * 6 + 5] = 0.16;

        lineIndex++;
      }
    }
    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Ambient particles gentle drift
    ambientPoints.rotation.y = elapsedTime * 0.015;
    ambientPoints.rotation.x = elapsedTime * 0.008;

    renderer.render(scene, camera);
  }

  animate();
})();
