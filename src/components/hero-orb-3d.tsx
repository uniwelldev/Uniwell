'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixel;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float n = sin(p.x * 2.1 + uTime * 0.8) + sin(p.y * 2.7 - uTime * 0.6) + sin(p.z * 2.3 + uTime * 0.7);
    p += normalize(position) * n * 0.035;

    vec3 w = (modelMatrix * vec4(p, 1.0)).xyz;
    float d = distance(w.xy, uMouse);
    float push = smoothstep(1.1, 0.0, d);
    vec2 dir = normalize(w.xy - uMouse + 1e-4);
    w.xy += dir * push * 0.45;
    w.z += push * 0.35;

    vec4 view = viewMatrix * vec4(w, 1.0);
    gl_Position = projectionMatrix * view;
    gl_PointSize = uPixel * (1.9 + aSeed * 2.2 + push * 3.5) * (7.0 / -view.z);

    float t = clamp(p.y * 0.35 + 0.5, 0.0, 1.0);
    vec3 lime = vec3(0.78, 1.0, 0.18);
    vec3 pale = vec3(0.96, 1.0, 0.8);
    vec3 ember = vec3(0.94, 0.31, 0.12);
    vColor = mix(mix(ember, lime, smoothstep(0.0, 0.5, t)), pale, smoothstep(0.5, 1.0, t));
    vColor = mix(vColor, vec3(1.0), push * 0.7);
    vAlpha = (0.18 + 0.82 * smoothstep(-1.6, 1.6, w.z)) + push * 0.4;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function fibonacciSphere(count: number, radius: number) {
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pos[i * 3] = Math.cos(theta) * r * radius;
    pos[i * 3 + 1] = y * radius;
    pos[i * 3 + 2] = Math.sin(theta) * r * radius;
    seed[i] = Math.random();
  }
  return { pos, seed };
}

function DotSphere() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0, cx: -9999, cy: -9999 });

  const { geometry, material } = useMemo(() => {
    const { pos, seed } = fibonacciSphere(3600, 2);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(99, 99) },
        uPixel: { value: 1 },
      },
    });
    return { geometry: g, material: m };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.cx = e.clientX;
      pointer.current.cy = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ gl, camera, clock, size }, delta) => {
    const g = group.current;
    if (!g) return;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPixel.value = gl.getPixelRatio();
    const k = 1 - Math.pow(0.002, delta);
    g.rotation.y += delta * 0.12;
    g.rotation.x += (pointer.current.y * 0.25 - g.rotation.x) * k;

    // Pointer -> world plane at z=0 (camera looks down -z).
    const rect = gl.domElement.getBoundingClientRect();
    const cam = camera as THREE.PerspectiveCamera;
    const halfH = Math.tan((cam.fov * Math.PI) / 360) * cam.position.z;
    const halfW = halfH * (size.width / size.height);
    const nx = ((pointer.current.cx - rect.left) / rect.width) * 2 - 1;
    const ny = ((pointer.current.cy - rect.top) / rect.height) * 2 - 1;
    material.uniforms.uMouse.value.set(nx * halfW, -ny * halfH);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

export default function HeroOrb3D({ visible }: { visible: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
    >
      <DotSphere />
    </Canvas>
  );
}
