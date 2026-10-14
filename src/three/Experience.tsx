import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Vehicle } from "@/three/Vehicle";
import { Atmosphere, Ground } from "@/three/Atmosphere";
import { CameraRig } from "@/three/CameraRig";
import { sim } from "@/store/experience";

function Scene() {
  const mobile = sim.ui.isMobile;
  return (
    <>
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 7, 18]} />
      <ambientLight intensity={0.22} color="#b7b4ae" />
      <directionalLight
        position={[4.5, 5.2, 3.2]}
        intensity={1.35}
        color="#f0e6d2"
      />
      <directionalLight position={[-4, 1.5, -2]} intensity={0.45} color="#8aa0b8" />
      <spotLight
        position={[0, 4.5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.55}
        color="#c4a574"
      />
      <pointLight position={[0, -0.4, 0]} intensity={0.8} color="#c4a574" distance={4.5} />
      {!mobile && <Environment preset="city" environmentIntensity={0.42} />}
      <CameraRig />
      <Vehicle />
      <Ground />
      <Atmosphere />
      {!mobile && (
        <ContactShadows
          position={[0, -0.94, 0]}
          opacity={0.45}
          scale={12}
          blur={2.4}
          far={3}
        />
      )}
    </>
  );
}

export function Experience() {
  const mobile = sim.ui.isMobile;
  const gl = useMemo(
    () => ({
      antialias: !mobile,
      alpha: false,
      powerPreference: "high-performance" as const,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.08,
    }),
    [mobile],
  );

  if (!sim.ui.webgl) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        gl={gl}
        dpr={mobile ? [1, 1] : [1, 1.5]}
        camera={{ fov: 34, near: 0.1, far: 50, position: [2.85, 1.12, 4.7] }}
        shadows={false}
        onCreated={({ gl: renderer }) => {
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.08;
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
