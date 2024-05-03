
import * as THREE from 'three';
import { useThree, useFrame} from '@react-three/fiber'
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { useEffect, useRef, useState } from 'react';

const xWidth = 600;
const startPosX = xWidth*0.5*0.2;
let posX = startPosX
let posY = 30;
export default function ThreeElement(){
    useFrame((state, delta) => {
        // console.log('amOp : ',amOp)
        // console.log('delta : ',delta)
        posX = amOp.posX - (delta*20);
        if(amOp.posX < -50){
            posY -= 10;
            posX = startPosX;
        }
        setAmOp({
            posX: posX,
            posY: posY
        })
    })

    const [bars, setBars] = useState<any>([]);  
    const [amOp, setAmOp] = useState<any>({posX:startPosX}); 

    useEffect(()=>{
        const audioSource = document.getElementById('audio');
        if(audioSource){
            const audioMotion = new AudioMotionAnalyzer(null,
                {
                source: audioSource,
                mode: 2,
                useCanvas: false, // don't use the canvas
                onCanvasDraw: instance => {
                    const b = instance.getBars();
                    setBars(b);
                }
                } 
            );
        }
    },[])
    
    return(
        <>
            <directionalLight position={[5,5,5]} />
            <group
                position={[0, amOp.posY, amOp.posX]}
            >
                {
                    bars.map((bar:any, idx:number)=>{
                        return(
                        <mesh
                            key={"bar_"+idx}
                            position={[0, 0, -bar.posX*0.01]}
                            scale={[0.1, bar.value[0]*10 ,0.1]}
                        >
                            <boxGeometry />
                            <meshBasicMaterial 
                                transparent
                                opacity={0.5}
                            />
                        </mesh>
                        )
                    })
                }
            </group>
        </>
    )
}