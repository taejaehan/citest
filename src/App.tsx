import './App.css'
import { Canvas } from '@react-three/fiber'
import ThreeElement from './ThreeElement';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
function App() {

  const audioSourceRef = useRef<HTMLAudioElement>(null);
  function clickFunc(){
    const audioSource = audioSourceRef.current;
    console.log("clickFunc audioSource : ", audioSource)
    audioSource!.play();
  }

  return (
    <>
      <audio ref={audioSourceRef} id="audio" crossOrigin="anonymous" src="/audio/file_example_OOG.ogg" ></audio>
      <Canvas
        gl={{ 
          preserveDrawingBuffer: true,
          autoClearColor: false
        }}
        onClick={clickFunc}
        camera={{
          fov:75,
          near: 1,
          far:100,
          position:[50,0,0]
        }}
      >
        <color attach="background" />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, 10]}  />
        <ThreeElement />

      </Canvas>
    </>
  )
}

export default App
