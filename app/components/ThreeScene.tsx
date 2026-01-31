"use client";

import * as THREE from "three";
import { useEffect, useRef, useState, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mixer: THREE.AnimationMixer | null;
    model: THREE.Object3D | null;
    animationId: number | null;
  } | null>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!sceneRef.current?.model) return;

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    sceneRef.current.model.rotation.y = mouseX * Math.PI * 0.2;
    sceneRef.current.model.rotation.x = mouseY * Math.PI * 0.07;
  }, []);

  const handleResize = useCallback(() => {
    if (!sceneRef.current || !canvasRef.current) return;

    const { renderer, camera } = sceneRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -15, 20);
    scene.add(camera);

    const light1 = new THREE.PointLight(0xff0000, 150);
    light1.position.set(0, 10, 0);

    const light2 = new THREE.PointLight(0x0000ff, 200);
    light2.position.set(0, -10, 0);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;
    orbit.minPolarAngle = Math.PI / 2;
    orbit.maxPolarAngle = (3 * Math.PI) / 5;
    orbit.minAzimuthAngle = -Math.PI / 4;
    orbit.maxAzimuthAngle = Math.PI / 4;
    orbit.update();

    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;
    let model: THREE.Object3D | null = null;
    let animationId: number | null = null;

    sceneRef.current = {
      renderer,
      scene,
      camera,
      mixer: null,
      model: null,
      animationId: null,
    };

    loader.load(
      "/spidey.glb",
      (gltf) => {
        if (!sceneRef.current) return;
        
        model = gltf.scene;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer?.clipAction(clip).play());
        
        sceneRef.current.model = model;
        sceneRef.current.mixer = mixer;
        setIsLoading(false);
      },
      (progress) => {
        // Progress callback for loading indicator
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`Loading: ${percent.toFixed(2)}%`);
        }
      },
      (error) => {
        console.error("Error loading model:", error);
        setError("Failed to load 3D model");
        setIsLoading(false);
      }
    );

    const clock = new THREE.Clock();
    const animate = () => {
      if (sceneRef.current?.mixer) {
        sceneRef.current.mixer.update(clock.getDelta());
      }
      if (sceneRef.current) {
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
        if (sceneRef.current) {
          sceneRef.current.animationId = animationId;
        }
      }
    };
    animate();

    window.addEventListener("resize", handleResize, { passive: true });

    const addLights = () => {
      scene.add(light2);
      setTimeout(() => {
        scene.add(light1);
      }, 1000);
    };

    const timeoutId = setTimeout(() => {
      addLights();
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
      
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      
      if (sceneRef.current) {
        renderer.dispose();
        if (model) {
          scene.remove(model);
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
      }
      
      sceneRef.current = null;
    };
  }, [handleMouseMove, handleResize]);

  return (
    <div className="w-full h-full relative" aria-label="3D scene">
      {isLoading && (
        <div 
          className="absolute inset-0 z-20 bg-black flex justify-center items-center"
          role="status"
          aria-live="polite"
        >
          <span className="text-white">Loading 3D model...</span>
        </div>
      )}
      {error && (
        <div 
          className="absolute inset-0 z-20 bg-black/90 flex justify-center items-center"
          role="alert"
        >
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block overflow-hidden" 
        aria-label="Interactive 3D visualization"
      />
    </div>
  );
}
