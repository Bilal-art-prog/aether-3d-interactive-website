import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sim } from "@/store/experience";

function makeHullGeometry(segments: number) {
  const profile: [number, number][] = [
    [0.0, 0.0],
    [0.07, 0.02],
    [0.2, 0.1],
    [0.36, 0.28],
    [0.5, 0.55],
    [0.62, 0.92],
    [0.7, 1.38],
    [0.74, 1.9],
    [0.72, 2.45],
    [0.62, 3.0],
    [0.46, 3.45],
    [0.28, 3.78],
    [0.12, 3.98],
    [0.0, 4.08],
  ];
  const pts = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(pts, segments);
  geo.rotateX(Math.PI / 2);
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

export function Vehicle() {
  const root = useRef<THREE.Group>(null);
  const float = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const inner = useRef<THREE.MeshStandardMaterial>(null);

  const mobile = sim.ui.isMobile;
  const segs = mobile ? 36 : 64;

  const hull = useMemo(() => makeHullGeometry(segs), [segs]);
  const innerHull = useMemo(() => makeHullGeometry(Math.max(24, segs - 12)), [segs]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const group = root.current;
    const body = float.current;
    if (!group || !body) return;

    const reduced = sim.ui.reducedMotion;
    const hover = reduced ? 0 : Math.sin(t * 0.85) * 0.07;
    const roll = reduced ? 0 : Math.sin(t * 0.55) * 0.018;
    body.position.y = THREE.MathUtils.damp(body.position.y, hover, 2.2, delta);
    body.rotation.z = THREE.MathUtils.damp(body.rotation.z, roll, 2.2, delta);

    if (ring.current && !reduced) {
      ring.current.rotation.z += delta * 0.18;
      ring.current.rotation.y += delta * 0.04;
    }

    const pulse = 0.55 + Math.sin(t * 2.1) * 0.25;
    if (glow.current) glow.current.emissiveIntensity = pulse;
    if (inner.current) inner.current.emissiveIntensity = 0.8 + Math.sin(t * 1.6) * 0.35;

    const target = getVehiclePose();
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, target.rx, 1.6, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, target.ry, 1.35, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, target.rz, 1.8, delta);
    const s = THREE.MathUtils.damp(group.scale.x, target.scale, 1.4, delta);
    group.scale.setScalar(s);
    group.position.y = THREE.MathUtils.damp(group.position.y, target.y, 1.5, delta);
    group.visible = target.opacity > 0.04;
  });

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#17171a"),
        metalness: 1,
        roughness: 0.22,
        clearcoat: mobile ? 0.2 : 0.85,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.15,
      }),
    [mobile],
  );

  const silverMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c5c1b8"),
        metalness: 1,
        roughness: 0.12,
        clearcoat: 0.6,
        envMapIntensity: 1.3,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c4a574"),
        metalness: 1,
        roughness: 0.16,
        envMapIntensity: 1.4,
      }),
    [],
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0c0d10"),
        metalness: 0.15,
        roughness: 0.05,
        transmission: mobile ? 0 : 0.42,
        thickness: 0.35,
        transparent: true,
        opacity: mobile ? 0.72 : 0.88,
        envMapIntensity: 1.6,
      }),
    [mobile],
  );

  return (
    <group ref={root} scale={1} rotation={[0.08, 0.55, 0]}>
      <group ref={float}>
        <mesh geometry={hull} material={bodyMat} scale={[1, 0.4, 1]} />
        <mesh geometry={innerHull} scale={[0.92, 0.12, 0.92]} position={[0, -0.06, 0.05]}>
          <meshPhysicalMaterial
            color="#0e0e10"
            metalness={1}
            roughness={0.28}
            envMapIntensity={0.8}
          />
        </mesh>

        <mesh position={[0, 0.22, 0.15]} scale={[0.62, 0.22, 0.72]} material={glassMat}>
          <sphereGeometry args={[0.78, mobile ? 24 : 40, mobile ? 16 : 28]} />
        </mesh>

        <mesh position={[0, 0.02, 1.78]} rotation={[Math.PI / 2, 0, 0]} material={goldMat}>
          <capsuleGeometry args={[0.035, 0.55, 4, 12]} />
        </mesh>

        <mesh position={[0, 0.01, 1.98]}>
          <boxGeometry args={[0.62, 0.03, 0.04]} />
          <meshStandardMaterial
            ref={glow}
            color="#f3efe6"
            emissive="#f0d8a8"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0, 0.02, -1.92]}>
          <cylinderGeometry args={[0.22, 0.28, 0.08, 24]} />
          <meshStandardMaterial
            ref={inner}
            color="#c4a574"
            emissive="#c4a574"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.02, -1.98]} material={silverMat}>
          <torusGeometry args={[0.3, 0.018, 10, 32]} />
        </mesh>

        <mesh position={[0.42, -0.02, 0.2]} rotation={[0, 0, 0.18]} material={silverMat}>
          <boxGeometry args={[0.72, 0.012, 0.08]} />
        </mesh>
        <mesh position={[-0.42, -0.02, 0.2]} rotation={[0, 0, -0.18]} material={silverMat}>
          <boxGeometry args={[0.72, 0.012, 0.08]} />
        </mesh>

        <mesh position={[0.55, -0.12, -0.55]} rotation={[0.2, 0.15, 0.4]} material={bodyMat}>
          <boxGeometry args={[0.55, 0.03, 0.22]} />
        </mesh>
        <mesh position={[-0.55, -0.12, -0.55]} rotation={[0.2, -0.15, -0.4]} material={bodyMat}>
          <boxGeometry args={[0.55, 0.03, 0.22]} />
        </mesh>

        <HoverPad position={[0.55, -0.28, 0.7]} />
        <HoverPad position={[-0.55, -0.28, 0.7]} />
        <HoverPad position={[0.48, -0.28, -0.85]} />
        <HoverPad position={[-0.48, -0.28, -0.85]} />
      </group>

      <group ref={ring} rotation={[Math.PI / 2.15, 0, 0]}>
        <mesh material={goldMat}>
          <torusGeometry args={[1.18, 0.01, 10, mobile ? 64 : 96]} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.18, 0.002, 8, 48]} />
          <meshBasicMaterial color="#d8c4a0" transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

function HoverPad({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 20]} />
        <meshPhysicalMaterial color="#1c1c1f" metalness={1} roughness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[0.09, 20]} />
        <meshStandardMaterial
          color="#c4a574"
          emissive="#c4a574"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function getVehiclePose() {
  const p = sim.progress;
  const pose = {
    rx: 0.08,
    ry: 0.55,
    rz: 0,
    scale: 1,
    y: 0,
    opacity: 1,
  };

  if (p.story > 0.02 && p.story < 0.98) {
    const s = p.story;
    pose.ry = 0.2 + s * Math.PI * 1.65;
    pose.rx = 0.05 + Math.sin(s * Math.PI) * 0.25;
    pose.scale = 1.05;
    pose.y = 0.05;
    return pose;
  }

  if (p.cta > 0.12) {
    pose.ry = -0.35;
    pose.rx = 0.18;
    pose.scale = 0.92;
    pose.y = 0.1;
    return pose;
  }

  if (p.visual > 0.2) {
    pose.opacity = 0.2;
    pose.scale = 0.7;
    pose.ry = 1.2;
    return pose;
  }

  if (p.showcase > 0.05) {
    const t = p.showcase;
    pose.ry = THREE.MathUtils.lerp(0.15, -0.45, t);
    pose.rx = 0.12;
    pose.scale = 1.08;
    pose.y = 0.04;
    return pose;
  }

  if (p.intro > 0.35) {
    pose.ry = 0.9;
    pose.scale = 0.85;
    pose.rx = 0.2;
    return pose;
  }

  pose.ry = 0.55 + p.hero * 0.35;
  pose.rx = 0.08;
  pose.scale = 1;
  return pose;
}
