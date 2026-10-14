import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sim } from "@/store/experience";

export function Atmosphere() {
  const count = sim.ui.isMobile ? 40 : 90;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.4) * 5,
        z: (Math.random() - 0.5) * 10,
        s: 0.006 + Math.random() * 0.012,
        v: 0.04 + Math.random() * 0.08,
      })),
    [count],
  );

  useFrame((state) => {
    const inst = mesh.current;
    if (!inst) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(t * p.v + i) * 0.15, p.z);
      dummy.scale.setScalar(p.s * (sim.ui.isMobile ? 0.8 : 1));
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
    inst.rotation.y = t * 0.01;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c4a574" transparent opacity={0.35} depthWrite={false} />
    </instancedMesh>
  );
}

export function Ground() {
  return (
    <group position={[0, -0.95, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.5, 64]} />
        <meshStandardMaterial color="#09090b" metalness={0.7} roughness={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.7, 1.705, 80]} />
        <meshBasicMaterial color="#c4a574" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}
