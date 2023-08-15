import { useEffect, useRef } from "react";
import {
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  SphereGeometry,
  AmbientLight,
  ACESFilmicToneMapping,
} from "three";

class Cube extends Mesh {
  constructor() {
    super();
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();
    material.color.set("purple");

    this.geometry = geometry;
    this.material = material;
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }

  dispose() {
    this.geometry.dispose();
  }
}

class Sphere extends Mesh {
  constructor() {
    super();
    const geometry = new SphereGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();

    this.geometry = geometry;
    this.material = material;
  }

  update() {}
}

const ThreeComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75, //fov
      window.innerWidth / window.innerHeight, //aspect
      0.1, //near
      1000 //far
    );

    camera.position.z = 5;

    const ambientLight = new AmbientLight("white", 0.5);
    const pointLight = new AmbientLight("black", 0.5);
    scene.add(ambientLight);
    scene.add(pointLight);

    // Create the 3D element
    const cube = new Cube();
    const sphere = new Sphere();

    scene.add(cube);

    // Create the renderer
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the container
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);

      cube.update();
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeComponent;

// 20:49
