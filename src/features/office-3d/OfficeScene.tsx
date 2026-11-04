import {Canvas} from '@react-three/fiber';
import {OrbitControls,Text,ContactShadows} from '@react-three/drei';
import {Suspense,useMemo} from 'react';
import * as THREE from 'three';
import type {Data,Room} from '../../types/domain';
import {urgency,urgencyColor} from '../../utils/urgency';
function RoomMesh({room,data,selected,onSelect}:{room:Room;data:Data;selected:string|null;onSelect:(id:string)=>void}){
 const xs=room.polygon.map(p=>p.x),ys=room.polygon.map(p=>p.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const x=(minX+maxX)/2-data.layout.width/2,z=(minY+maxY)/2-data.layout.height/2,w=maxX-minX,h=maxY-minY;
 const tone=room.departmentId?urgencyColor[urgency(data,room.departmentId).level]:room.color;
 const material=useMemo(()=>new THREE.MeshStandardMaterial({color:tone,roughness:.8,transparent:true,opacity:room.departmentId?selected && selected!==room.departmentId ? .65 : .82:1}),[tone,selected,room.departmentId]);
 return <group position={[x,0,z]} onClick={e=>{e.stopPropagation();if(room.departmentId)onSelect(room.departmentId)}}>
 <mesh position={[0,.08,0]} receiveShadow material={material}><boxGeometry args={[w,.16,h]}/></mesh>
 {[[0,-h/2,w,.12],[-w/2,0,.12,h],[w/2,0,.12,h],[0,h/2,w,.12]].map(([a,b,c,d],i)=><mesh key={i} position={[a,.55,b]} castShadow><boxGeometry args={[c,1,d]}/><meshStandardMaterial color="#d8e1e5" transparent opacity={i===3?.35:.72}/></mesh>)}
 <Text position={[0,.22,-h/2+.8]} rotation={[-Math.PI/2,0,0]} fontSize={.48} color="#203640" anchorX="center" maxWidth={w-1}>{room.name}</Text>
 {data.layout.objects.filter(o=>o.roomId===room.id).map(o=><group key={o.id} position={[o.x-data.layout.width/2,.2,o.y-data.layout.height/2]}><mesh castShadow><boxGeometry args={[1.1,.35,.7]}/><meshStandardMaterial color="#8faaa9"/></mesh><mesh position={[0,.23,0]} castShadow><boxGeometry args={[.7,.1,.5]}/><meshStandardMaterial color="#f7f9f7"/></mesh></group>)}
 </group>
}
export function OfficeScene({data,selected,onSelect}:{data:Data;selected:string|null;onSelect:(id:string)=>void}){return <Canvas shadows camera={{position:[24,28,30],fov:38}} gl={{antialias:true}}><color attach="background" args={['#edf2f3']}/><ambientLight intensity={1.65}/><directionalLight position={[10,20,12]} intensity={2.1} castShadow shadow-mapSize={[2048,2048]}/><Suspense fallback={null}><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.04,0]} receiveShadow><planeGeometry args={[80,80]}/><meshStandardMaterial color="#e9eeef"/></mesh>{data.layout.rooms.map(r=><RoomMesh key={r.id} room={r} data={data} selected={selected} onSelect={onSelect}/>)}<ContactShadows position={[0,0,0]} opacity={.3} scale={60} blur={2}/></Suspense><OrbitControls makeDefault enableDamping minPolarAngle={.3} maxPolarAngle={1.45} minDistance={15} maxDistance={70} target={[0,0,0]}/></Canvas>}
