import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

const Canvas2D = () => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const dots = useRef<THREE.Mesh[]>([]);
  const mount = useRef<HTMLDivElement | null>(null);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const dotGeometry = new THREE.CircleGeometry(0.1, 16);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  useEffect(()=>{
      if (mount.current) {
        mount.current.appendChild(renderer.domElement);
      
        // createDot(0,3.5);
        // createDot(0,0);
        // createDot(0,-0.0039);
        camera.position.z = 1;



        // const onMouseDown = (event: MouseEvent) => {
        //   setIsDrawing(true);
        //   // console.log(event);
        //   const asd : MouseEvent= event;
        //   asd;
  
        //   console.log({innerW : window.innerWidth, innerH : window.innerHeight, clientx : event.clientX, clientY : event.clientY});
        //   // createDot(event.clientX, -(event.clientY / window.innerHeight) * 2 + 1);
        // };
    
        // const onMouseMove = (event: MouseEvent) => {
        //   if (isDrawing) {
        //     console.log(event);
        //     // createDot(event.clientX / window.innerWidth * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
        //   }
        // };
    
        const onMouseUp = () => {
          setIsDrawing(false);
        };

        const onMouseDown = (event: MouseEvent) => {
          setIsDrawing(true);
        
          const mouse = new THREE.Vector2();
          const raycaster = new THREE.Raycaster();
          
          // Convert mouse coordinates to normalized device coordinates (NDC)
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
          // Set the ray's origin and direction based on the camera and mouse position
          raycaster.setFromCamera(mouse, camera);
        
          // Calculate the intersection between the ray and the scene's objects
          const intersects = raycaster.intersectObjects(dots.current);
        
          if (intersects.length === 0) {
            // If there are no intersections, create a new dot at the mouse position
            console.log(mouse.x, mouse.y)
            createDot(mouse.x, mouse.y);
          }
        };
        
        const onMouseMove = (event: MouseEvent) => {
          if (isDrawing) {
            const mouse = new THREE.Vector2();
            const raycaster = new THREE.Raycaster();
        
            // Convert mouse coordinates to normalized device coordinates (NDC)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
            // Set the ray's origin and direction based on the camera and mouse position
            raycaster.setFromCamera(mouse, camera);
        
            // Calculate the intersection between the ray and the scene's objects
            const intersects = raycaster.intersectObjects(dots.current);
        
            if (intersects.length === 0) {
              // If there are no intersections, create a new dot at the mouse position
              createDot(mouse.x, mouse.y);
            }
          }
        };
    
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    
        return () => {
          document.removeEventListener('mousedown', onMouseDown);
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };
      }

  },[]);

  useEffect(() => {

    animate();

  }, [isDrawing]);

  const createDot = (x: number, y: number) => {
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.x = x;
    dot.position.y = y;
    scene.add(dot);
    dots.current.push(dot);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  return <div ref={mount} />;
}

export default Canvas2D