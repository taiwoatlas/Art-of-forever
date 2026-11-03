"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Fixed WebGL stage: envelope (flap + ribbon + seal) then two rings, driven by scroll progress.
export default function Stage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cv = document.getElementById("stage") as HTMLCanvasElement;
    const r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2));
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50); cam.position.z = 7;
    sc.add(new THREE.AmbientLight(0xfff4e0, 1), Object.assign(new THREE.DirectionalLight(0xffffff, 2), { position: new THREE.Vector3(3, 4, 5) }));
    const paper = new THREE.MeshStandardMaterial({ color: 0xfffefa, roughness: 0.9 });
    const foil = new THREE.MeshStandardMaterial({ color: 0xd6bc91, metalness: 1, roughness: 0.25 });
    const env = new THREE.Group(); sc.add(env);
    env.add(new THREE.Mesh(new THREE.BoxGeometry(4, 2.6, 0.08), paper));
    const flapG = new THREE.Group(); flapG.position.y = 1.3;
    const tri = new THREE.Shape(); tri.moveTo(-2, 0); tri.lineTo(2, 0); tri.lineTo(0, -1.5);
    const flap = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.03, bevelEnabled: false }), paper); flapG.add(flap); env.add(flapG);
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 40), foil); seal.rotation.x = Math.PI / 2; seal.position.set(0, -0.2, 0.1); env.add(seal);
    const rib = new THREE.Mesh(new THREE.TorusKnotGeometry(0.35, 0.05, 120, 8, 2, 3), foil); rib.position.set(0, -0.2, 0.15); env.add(rib);
    const ringG = new THREE.TorusGeometry(0.8, 0.12, 32, 96), a = new THREE.Mesh(ringG, foil), b = new THREE.Mesh(ringG, foil); a.visible = b.visible = false; sc.add(a, b);
    const size = () => { r.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); cam.position.z = innerWidth < 700 ? 10 : 7; }; size(); addEventListener("resize", size);
    const P = { p: 0 }; // 0..1 of the whole page
    ScrollTrigger.create({ start: 0, end: "max", scrub: 1, onUpdate: s => { P.p = s.progress; } });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const p = P.p, open = Math.min(1, Math.max(0, (p - 0.02) / 0.1)), t = performance.now() / 1000;
      rib.scale.setScalar(Math.max(0.001, 1 - open * 2)); rib.rotation.z = open * 3; rib.position.x = open * 3;
      flapG.rotation.x = -Math.min(1, Math.max(0, (p - 0.08) / 0.08)) * Math.PI * 0.9;
      env.rotation.y = Math.sin(open * 2) * 0.3; env.visible = p < 0.35; cam.position.z = (innerWidth < 700 ? 10 : 7) - open * 2;
      const rp = Math.min(1, Math.max(0, (p - 0.3) / 0.15)), rings = p > 0.3 && p < 0.55 || p > 0.93;
      a.visible = b.visible = rings; const g = p > 0.93 ? 1 : rp; a.position.x = -3 * (1 - g) - 0.4; b.position.x = 3 * (1 - g) + 0.4;
      b.rotation.y = Math.PI / 2; a.rotation.y = reduce ? 0 : t * 0.4; if (!reduce) b.rotation.x = t * 0.4;
      r.render(sc, cam); id = requestAnimationFrame(tick);
    }; let id = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", size); ScrollTrigger.getAll().forEach(s => s.kill()); sc.traverse(o => { (o as THREE.Mesh).geometry?.dispose(); }); [paper, foil].forEach(m => m.dispose()); r.dispose(); };
  }, []);
  return <canvas id="stage" aria-hidden="true" />;
}
