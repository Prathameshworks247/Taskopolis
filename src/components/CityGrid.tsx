"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CityGridProps {
  taskGrid?: number[][];
}

const CityGrid: React.FC<CityGridProps> = ({ taskGrid = [] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cityGroupRef = useRef<THREE.Group>(new THREE.Group());
  const gridSizeRef = useRef<number>(12);
  const wireframeRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background
    scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      (container?.clientWidth || 800) / (container?.clientHeight || 600),
      0.1,
      1000
    );
    camera.position.set(30, 40, 30);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      container?.clientWidth || 800, 
      container?.clientHeight || 600
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container?.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    scene.add(new THREE.AmbientLight(0xffffff, 0.8)); // Brighter ambient light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    scene.add(dirLight);
    
    // Add colorful accent lighting
    const colorLight1 = new THREE.PointLight(0xff6b6b, 0.3, 30);
    colorLight1.position.set(-20, 15, -20);
    scene.add(colorLight1);
    
    const colorLight2 = new THREE.PointLight(0x4ecdc4, 0.3, 30);
    colorLight2.position.set(20, 15, 20);
    scene.add(colorLight2);
    
    const colorLight3 = new THREE.PointLight(0xffe66d, 0.3, 30);
    colorLight3.position.set(-20, 15, 20);
    scene.add(colorLight3);

    // Build the city
    scene.add(cityGroupRef.current);
    createCity();
    initControls();
    animate();

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
      container?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // Rebuild city when taskGrid changes
    createCity();
  }, [taskGrid]);

  const createCity = () => {
    const group = cityGroupRef.current;
    while (group.children.length) group.remove(group.children[0]);

    const gridSize = gridSizeRef.current;
    const blockSize = 4;
    const roadWidth = 1;
    const plotHeight = 0.1;

    const roadMat = new THREE.MeshLambertMaterial({
      color: 0x2c3e50,
      wireframe: wireframeRef.current,
    });
    const stripeMat = new THREE.MeshLambertMaterial({ color: 0xf39c12 }); // Orange stripes
    const plotMat = new THREE.MeshLambertMaterial({
      color: 0x27ae60, // Bright green
      wireframe: wireframeRef.current,
    });

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * (blockSize + roadWidth);
        const z = (j - gridSize / 2) * (blockSize + roadWidth);

        // Create plot/ground
        const plot = new THREE.Mesh(
          new THREE.BoxGeometry(blockSize, plotHeight, blockSize),
          plotMat
        );
        plot.position.set(x, plotHeight / 2, z);
        plot.receiveShadow = true;
        group.add(plot);

        // Create building based on task count
        const taskCount = taskGrid?.[i]?.[j] || 0;
        if (taskCount > 0) {
          const height = 0.5 + taskCount;
          
          // Create vibrant, varied building colors
          const colorVariations = [
            { h: 0.0, s: 0.8, l: 0.6 },   // Red-orange
            { h: 0.15, s: 0.9, l: 0.5 },  // Yellow-green
            { h: 0.55, s: 0.8, l: 0.6 },  // Cyan
            { h: 0.75, s: 0.7, l: 0.7 },  // Purple
            { h: 0.9, s: 0.8, l: 0.65 },  // Pink
            { h: 0.33, s: 0.8, l: 0.5 },  // Green
            { h: 0.66, s: 0.9, l: 0.6 },  // Blue
            { h: 0.08, s: 0.9, l: 0.6 },  // Orange
          ];
          
          const colorIndex = (i + j + taskCount) % colorVariations.length;
          const baseColor = colorVariations[colorIndex];
          
          // Add some randomness to make it more interesting
          const hueShift = (Math.sin(i * 0.5) * Math.cos(j * 0.3)) * 0.1;
          const satBoost = 0.1 + (taskCount * 0.05);
          
          const color = new THREE.Color().setHSL(
            (baseColor.h + hueShift) % 1,
            Math.min(1, baseColor.s + satBoost),
            baseColor.l + (taskCount * 0.02)
          );
          
          const buildingMat = new THREE.MeshLambertMaterial({ 
            color,
            transparent: false
          });
          const building = new THREE.Mesh(
            new THREE.BoxGeometry(blockSize * 0.8, height, blockSize * 0.8),
            buildingMat
          );
          building.position.set(x, plotHeight + height / 2, z);
          building.castShadow = true;
          building.receiveShadow = true;
          group.add(building);
          
          // Add windows to the building
          createWindows(x, plotHeight, z, blockSize * 0.8, height, group);
        }

        // Create roads
        if (j < gridSize - 1) {
          const road = new THREE.Mesh(
            new THREE.BoxGeometry(blockSize, 0.05, roadWidth),
            roadMat
          );
          road.position.set(x, 0.025, z + blockSize / 2 + roadWidth / 2);
          road.receiveShadow = true;
          group.add(road);
          createStripes(x, z + blockSize / 2 + roadWidth / 2, true, blockSize, group, stripeMat);
        }

        if (i < gridSize - 1) {
          const road = new THREE.Mesh(
            new THREE.BoxGeometry(roadWidth, 0.05, blockSize),
            roadMat
          );
          road.position.set(x + blockSize / 2 + roadWidth / 2, 0.025, z);
          road.receiveShadow = true;
          group.add(road);
          createStripes(z, x + blockSize / 2 + roadWidth / 2, false, blockSize, group, stripeMat);
        }
      }
    }
  };

  const createWindows = (
    buildingX: number,
    plotHeight: number,
    buildingZ: number,
    buildingWidth: number,
    buildingHeight: number,
    group: THREE.Group
  ) => {
    const windowColors = [
      0x00d4ff, // Bright cyan
      0xff6b9d, // Pink
      0x95e1d3, // Mint
      0xffa726, // Orange
      0x7b68ee, // Medium slate blue
      0x40e0d0, // Turquoise
    ];
    
    const randomWindowColor = windowColors[Math.floor(Math.random() * windowColors.length)];
    
    const windowMat = new THREE.MeshLambertMaterial({ 
      color: randomWindowColor,
      transparent: true,
      opacity: 0.9,
      emissive: randomWindowColor,
      emissiveIntensity: 0.2
    });
    
    const windowFrameMat = new THREE.MeshLambertMaterial({ color: 0x34495e });
    
    const windowWidth = 0.3;
    const windowHeight = 0.4;
    const windowDepth = 0.02;
    const frameThickness = 0.05;
    const spacing = 0.6;
    
    // Calculate how many floors we can fit
    const floors = Math.max(1, Math.floor((buildingHeight - 0.3) / 0.8));
    const windowsPerRow = Math.max(1, Math.floor((buildingWidth - 0.4) / spacing));
    
    // Create windows on all four sides
    for (let side = 0; side < 4; side++) {
      for (let floor = 0; floor < floors; floor++) {
        for (let windowIndex = 0; windowIndex < windowsPerRow; windowIndex++) {
          const floorY = plotHeight + 0.4 + floor * 0.8;
          
          let windowX = buildingX;
          let windowZ = buildingZ;
          let rotationY = 0;
          
          // Position windows on different sides
          if (side === 0) { // Front face
            windowX = buildingX + (-buildingWidth/2 + 0.3 + windowIndex * spacing);
            windowZ = buildingZ + buildingWidth/2 + windowDepth/2;
          } else if (side === 1) { // Right face
            windowX = buildingX + buildingWidth/2 + windowDepth/2;
            windowZ = buildingZ + (-buildingWidth/2 + 0.3 + windowIndex * spacing);
            rotationY = Math.PI/2;
          } else if (side === 2) { // Back face
            windowX = buildingX + (buildingWidth/2 - 0.3 - windowIndex * spacing);
            windowZ = buildingZ - buildingWidth/2 - windowDepth/2;
            rotationY = Math.PI;
          } else { // Left face
            windowX = buildingX - buildingWidth/2 - windowDepth/2;
            windowZ = buildingZ + (buildingWidth/2 - 0.3 - windowIndex * spacing);
            rotationY = -Math.PI/2;
          }
          
          // Create window frame
          const frame = new THREE.Mesh(
            new THREE.BoxGeometry(
              windowWidth + frameThickness, 
              windowHeight + frameThickness, 
              windowDepth
            ),
            windowFrameMat
          );
          frame.position.set(windowX, floorY, windowZ);
          frame.rotation.y = rotationY;
          group.add(frame);
          
          // Create window glass
          const window = new THREE.Mesh(
            new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth * 0.8),
            windowMat
          );
          window.position.set(windowX, floorY, windowZ);
          window.rotation.y = rotationY;
          group.add(window);
          
          // Add vibrant window glow effect for some windows
          if (Math.random() > 0.4) { // More windows lit up
            const glowColors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0xff8a65, 0x81c784, 0x64b5f6];
            const glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
            
            const glowMat = new THREE.MeshLambertMaterial({ 
              color: glowColor,
              transparent: true,
              opacity: 0.6,
              emissive: glowColor,
              emissiveIntensity: 0.4
            });
            
            const glow = new THREE.Mesh(
              new THREE.BoxGeometry(windowWidth * 0.9, windowHeight * 0.9, windowDepth * 0.6),
              glowMat
            );
            glow.position.set(windowX, floorY, windowZ);
            glow.rotation.y = rotationY;
            group.add(glow);
          }
        }
      }
    }
  };

  const createStripes = (
    fixed: number,
    pos: number,
    horizontal: boolean,
    length: number,
    group: THREE.Group,
    mat: THREE.Material
  ) => {
    const count = 5;
    const stripeLength = length / count;
    for (let i = 0; i < count; i++) {
      const geo = new THREE.BoxGeometry(
        horizontal ? stripeLength * 0.6 : 0.15,
        0.06,
        horizontal ? 0.15 : stripeLength * 0.6
      );
      const stripe = new THREE.Mesh(geo, mat);
      const offset = -length / 2 + stripeLength / 2 + i * stripeLength;
      if (horizontal) {
        stripe.position.set(fixed + offset, 0.031, pos);
      } else {
        stripe.position.set(pos, 0.031, fixed + offset);
      }
      group.add(stripe);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
  };

  const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
    const container = containerRef.current;
    cameraRef.current.aspect = container.clientWidth / container.clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(container.clientWidth, container.clientHeight);
  };

  const initControls = () => {
    let isDragging = false;
    let isPanning = false;
    let prev = { x: 0, y: 0 };
    const cam = cameraRef.current!;
    const pos = { theta: 0, phi: Math.PI / 4, radius: 50 };

    const updateCam = () => {
      cam.position.x = pos.radius * Math.sin(pos.phi) * Math.cos(pos.theta);
      cam.position.y = pos.radius * Math.cos(pos.phi);
      cam.position.z = pos.radius * Math.sin(pos.phi) * Math.sin(pos.theta);
      cam.lookAt(0, 0, 0);
    };
    updateCam();

    const dom = rendererRef.current!.domElement;

    dom.addEventListener("mousedown", (e) => {
      if (e.button === 0) isDragging = true;
      else if (e.button === 2) isPanning = true;
      prev = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    });

    dom.addEventListener("mousemove", (e) => {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      
      if (isDragging) {
        pos.theta -= dx * 0.01;
        pos.phi = Math.max(0.1, Math.min(Math.PI - 0.1, pos.phi + dy * 0.01));
        updateCam();
      }
      
      if (isPanning) {
        const panSensitivity = 0.05;
        cam.position.x -= dx * panSensitivity;
        cam.position.z -= dy * panSensitivity;
      }
      
      prev = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener("mouseup", () => {
      isDragging = false;
      isPanning = false;
    });

    dom.addEventListener("wheel", (e) => {
      e.preventDefault();
      pos.radius = Math.max(15, Math.min(100, pos.radius + e.deltaY * 0.05));
      updateCam();
    });

    dom.addEventListener("contextmenu", (e) => e.preventDefault());
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%",
        cursor: "grab",
        userSelect: "none"
      }} 
    />
  );
};

export default CityGrid;