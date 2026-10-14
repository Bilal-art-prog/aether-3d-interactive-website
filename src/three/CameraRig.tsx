import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sim } from "@/store/experience";

const look = new THREE.Vector3();
const desired = new THREE.Vector3();
const desiredLook = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const initialized = useRef(false);

  useFrame((_, delta) => {
    const t = getCameraTarget();
    desired.set(t.x, t.y, t.z);
    desiredLook.set(t.lx, t.ly, t.lz);

    const mx = sim.ui.reducedMotion ? 0 : sim.mouse.x;
    const my = sim.ui.reducedMotion ? 0 : sim.mouse.y;
    desired.x += mx * t.parallax;
    desired.y += -my * t.parallax * 0.55;

    const k = initialized.current ? 1.35 : 100;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desired.x, k, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desired.y, k, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desired.z, k, delta);

    look.x = THREE.MathUtils.damp(look.x, desiredLook.x, k, delta);
    look.y = THREE.MathUtils.damp(look.y, desiredLook.y, k, delta);
    look.z = THREE.MathUtils.damp(look.z, desiredLook.z, k, delta);
    camera.lookAt(look);
    initialized.current = true;
  });

  return null;
}

function getCameraTarget() {
  const p = sim.progress;
  const base = { x: 2.85, y: 1.12, z: 4.7, lx: 0, ly: 0.05, lz: 0, parallax: 0.45 };

  if (p.story > 0.02 && p.story < 0.98) {
    return storyCamera(p.story);
  }

  if (p.cta > 0.15) {
    return { x: 0.2, y: 1.6, z: 6.2, lx: 0, ly: 0.1, lz: 0, parallax: 0.25 };
  }

  if (p.visual > 0.25) {
    return { x: 4.5, y: 2.4, z: 3.2, lx: 0, ly: 0, lz: 0, parallax: 0.1 };
  }

  if (p.showcase > 0.04) {
    const t = p.showcase;
    return {
      x: THREE.MathUtils.lerp(0.15, -2.4, t),
      y: THREE.MathUtils.lerp(1.35, 0.85, t),
      z: THREE.MathUtils.lerp(5.1, 4.2, t),
      lx: 0,
      ly: 0.05,
      lz: 0,
      parallax: 0.28,
    };
  }

  if (p.intro > 0.4) {
    return { x: 3.6, y: 1.8, z: 3.4, lx: 0, ly: 0.1, lz: 0, parallax: 0.2 };
  }

  return {
    ...base,
    x: 2.85 + p.hero * 0.4,
    y: 1.12 + p.hero * 0.2,
    z: 4.7 - p.hero * 0.6,
    parallax: 0.5,
  };
}

function storyCamera(s: number) {
  const dist =
    THREE.MathUtils.lerp(7.4, 4.2, smooth(s, 0, 0.28)) *
    THREE.MathUtils.lerp(1, 0.48, smooth(s, 0.48, 0.64)) *
    THREE.MathUtils.lerp(1, 1.35, smooth(s, 0.82, 1));
  const y =
    THREE.MathUtils.lerp(2.8, 0.7, smooth(s, 0, 0.4)) +
    THREE.MathUtils.lerp(0, 1.15, smooth(s, 0.68, 0.9));
  const angle = -0.4 + s * Math.PI * 1.55;
  return {
    x: Math.sin(angle) * dist,
    y,
    z: Math.cos(angle) * dist,
    lx: 0,
    ly: THREE.MathUtils.lerp(0.1, -0.05, smooth(s, 0.5, 0.65)),
    lz: 0,
    parallax: 0.08,
  };
}

function smooth(v: number, a: number, b: number) {
  return THREE.MathUtils.smoothstep(a, b, v);
}
