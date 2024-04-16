import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './App.css';


interface SmallDonut extends THREE.Mesh {
  velocity: THREE.Vector3;
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let frameId: number;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); 

    const gradientColorTop = new THREE.Color(0x06141b); 
    const gradientColorBottom = new THREE.Color(0xff0000); 
    renderer.domElement.style.background = `linear-gradient(to bottom, ${gradientColorTop.getHexString()}, ${gradientColorBottom.getHexString()})`; 

    const mainGeometry = new THREE.TorusGeometry(1.5, 0.8, 16, 100);

    const mainMaterial = new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 1,
      transparent: false,
      opacity: 0.5,
      side: THREE.DoubleSide 
    });

    const mainDonut = new THREE.Mesh(mainGeometry, mainMaterial);
    mainDonut.renderOrder = 2; 
    scene.add(mainDonut);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); 
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

 

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      mainDonut.rotation.x += 0.01;
      mainDonut.rotation.y += 0.01;

   
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
   
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default App;
