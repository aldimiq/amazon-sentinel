'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BioCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = 180;
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // --- Bio-Sphere Geometry ---
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    const material = new THREE.MeshPhongMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      emissive: 0x059669,
      emissiveIntensity: 0.5
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner glowing core
    const coreGeom = new THREE.SphereGeometry(0.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    // Lights
    const light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 2.5;

    // --- Animation ---
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.002;
      
      // Pulse core
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      core.scale.set(scale, scale, scale);
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="cursor-pointer filter drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
      <div className="mt-[-20px] text-center">
        <span className="text-[10px] font-bold text-emerald-600 tracking-[0.3em] uppercase animate-pulse">
          Bio-Core Synchronized
        </span>
      </div>
    </div>
  );
}
