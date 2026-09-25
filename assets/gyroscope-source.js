import * as THREE from './package/build/three.module.js';
import { RoomEnvironment } from './package/examples/jsm/environments/RoomEnvironment.js';

const host = document.querySelector('#stage');
const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(0x000000,0);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.3;
host.append(renderer.domElement);
renderer.domElement.setAttribute('aria-label','Starport: a titanium portal ring and four-point star rotate independently on tilted axes.');
renderer.domElement.setAttribute('role','img');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(37,1,.1,60);camera.position.set(0,0,10.5);
const pmrem=new THREE.PMREMGenerator(renderer);
const room=new RoomEnvironment();
const environment=pmrem.fromScene(room,.06);scene.environment=environment.texture;room.dispose();pmrem.dispose();
const silver=new THREE.MeshStandardMaterial({color:0xc1d4e5,metalness:.94,roughness:.23});
const edges=new THREE.MeshStandardMaterial({color:0x56748e,metalness:.9,roughness:.3});
const cyan=new THREE.MeshStandardMaterial({color:0x00b6e9,emissive:0x00a7ed,emissiveIntensity:2.2,metalness:.5,roughness:.22});
const dark=new THREE.MeshStandardMaterial({color:0x07111e,metalness:.64,roughness:.36});
scene.add(new THREE.HemisphereLight(0xc9eaff,0x071222,2.0));
for(const [color,intensity,x,y,z] of [[0xf0f7ff,70,-3,5,5],[0x45d9ff,40,3,-1,3],[0x248dff,28,-3,-3,1]]){
 const light=new THREE.PointLight(color,intensity,25,2);light.position.set(x,y,z);scene.add(light);
}
function extrude(shape,depth,bevel,materials){
 const geometry=new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelThickness:bevel,bevelSize:bevel,bevelSegments:4,curveSegments:48});
 geometry.translate(0,0,-depth/2);
 return new THREE.Mesh(geometry,materials);
}
function roundRect(w,h,r){
 const s=new THREE.Shape(),x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
const tile=extrude(roundRect(5.05,5.05,.75),.24,.08,[dark,edges]);tile.position.z=-2.3;scene.add(tile);
const tileRim=new THREE.LineSegments(new THREE.EdgesGeometry(tile.geometry,35),new THREE.LineBasicMaterial({color:0x618ca9,transparent:true,opacity:.28}));tile.add(tileRim);
const ring=new THREE.Group(),star=new THREE.Group();scene.add(ring,star);
function arc(r1,r2,start,end){
 const s=new THREE.Shape(),a=start*Math.PI/180,b=end*Math.PI/180;
 s.absarc(0,0,r2,a,b,false);s.lineTo(r1*Math.cos(b),r1*Math.sin(b));s.absarc(0,0,r1,b,a,true);s.closePath();return s;
}
for(const [a,b] of [[93,131],[139,267],[273,311],[319,447]]){
 ring.add(extrude(arc(1.72,2.08,a,b),.17,.035,[silver,edges]));
 const rim=extrude(arc(1.68,1.72,a+1,b-1),.12,.008,cyan);rim.position.z=.018;ring.add(rim);
 const back=extrude(arc(1.73,2.045,a+1,b-1),.012,.005,cyan);back.position.z=-.113;ring.add(back);
}
const shape=new THREE.Shape();shape.moveTo(0,1.53);
shape.bezierCurveTo(.13,.4,.24,.21,1.27,0);
shape.bezierCurveTo(.24,-.15,.14,-.35,0,-1.46);
shape.bezierCurveTo(-.14,-.35,-.24,-.15,-1.27,0);
shape.bezierCurveTo(-.24,.21,-.13,.4,0,1.53);
const starBody=extrude(shape,.12,.025,[silver,edges]);star.add(starBody);
const starUnderglow=extrude(shape,.06,.015,cyan);starUnderglow.scale.set(1.018,1.018,1);starUnderglow.position.z=-.065;star.add(starUnderglow);
// A shallow sculpted front gives the star's four arms moving metallic highlights.
const contour=shape.getPoints(48);
const points=[];
for(let i=0;i<contour.length-1;i++)points.push(0,0,.27,contour[i].x,contour[i].y,.086,contour[i+1].x,contour[i+1].y,.086);
const faceGeometry=new THREE.BufferGeometry();faceGeometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));faceGeometry.computeVertexNormals();
star.add(new THREE.Mesh(faceGeometry,new THREE.MeshStandardMaterial({color:0xe4f5fa,metalness:.91,roughness:.23,side:THREE.DoubleSide})));
const spark=new THREE.Mesh(new THREE.SphereGeometry(.034,20,12),cyan);spark.position.z=.277;star.add(spark);
const axisRing=new THREE.Vector3(.48,1,.22).normalize(),axisStar=new THREE.Vector3(1,-.48,.18).normalize();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let playing=!reduced.matches,phase=0,speed=1,last=performance.now();
const pause=document.querySelector('#pause'),range=document.querySelector('#speed'),label=document.querySelector('#speed-value');
function sync(){pause.textContent=playing?'Pause':'Play';pause.setAttribute('aria-pressed',String(!playing));}
pause.onclick=()=>{playing=!playing;sync();};
document.querySelector('#front').onclick=()=>{phase=0;playing=false;sync();draw();};
range.oninput=()=>{speed=Number(range.value);label.textContent=speed.toFixed(2)+'×';};
reduced.addEventListener('change',e=>{if(e.matches){playing=false;phase=0;sync();draw();}});
function pose(t){
 const p=t*Math.PI*2;
 ring.quaternion.setFromAxisAngle(axisRing,p);
 ring.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),.17*Math.sin(p)));
 star.quaternion.setFromAxisAngle(axisStar,-p);
 star.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),.23*Math.sin(p)));
}
function draw(){pose(phase);renderer.render(scene,camera);}
const resize=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();});resize.observe(host);
function tick(now){const dt=Math.min((now-last)/1000,.06);last=now;if(playing&&!document.hidden)phase=(phase+dt*speed/12)%1;draw();requestAnimationFrame(tick);}
sync();requestAnimationFrame(tick);
// Deterministic inspection/export hook; no wallet integration or network access.
window.starportPreview={setPhase(t){playing=false;phase=t;sync();draw();},getState(){return {phase,playing,speed,ring:ring.quaternion.toArray(),star:star.quaternion.toArray()};}};
