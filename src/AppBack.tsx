import './App.css'
import { Canvas } from '@react-three/fiber'
import ThreeElement from './ThreeElement';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { useEffect, useRef } from 'react';

function App() {

  // const color = useControls({
  //   value: 'white',
  // })

  // const grid = useControls({
  //   segment: {value:10, min:2, max:100, step:1},
  // })

  
  const containerRef = useRef<HTMLDivElement>(null)
  const audioSourceRef = useRef<HTMLAudioElement>(null);

  // const audioSource = audioSourceRef.current;
  const audioSource = new Audio('audio/file_example_OOG.ogg')
  useEffect(()=>{
    // const container = document.getElementById('container');
    // const audioSource = document.getElementById('audio');
    // console.log("container : ", container)
    // console.log("audioSource : ", audioSource)
    
    const container = containerRef.current;
    console.log("container : ", container)
    console.log("audioSource : ", audioSource)

    if(container && audioSource){
      const audioMotion = new AudioMotionAnalyzer(container, { 
        source: audioSource,
        height: window.innerHeight - 50,
        // you can set other options below - check the docs!
        barSpace: .6,
        ledBars: true,
        mode: 10,
        channelLayout: 'dual-combined',
        fillAlpha: .3,
        gradientLeft: 'steelblue',
        gradientRight: 'orangered',
        linearAmplitude: true,
        linearBoost: 1.2,
        lineWidth: 0,
        maxFreq: 16000,
        minFreq: 30,
        peakLine: true,
        showScaleX: false,
        showPeaks: true,
        weightingFilter: 'D',
        colorMode: 'gradient'
      });
    }
  },[])
  
  function clickFunc(){
    console.log("clickFunc")
    // const audioSource = audioSourceRef.current;

    console.log("clickFunc audioSource : ", audioSource)

    audioSource!.play();
  }

  return (
    <>
      <div ref={containerRef} id="container" style={{width:'100%',height:'100%'}} onClick={clickFunc}></div>
      <audio ref={audioSourceRef} id="audio" crossOrigin="anonymous" src="/audio/file_example_OOG.ogg" ></audio>
      {/* <Canvas
        camera={{
          fov:75,
          near: 1,
          far:100,
          position:[3,3,0]
        }}
      >
        <color attach="background" args={[color.value]} />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, grid.segment]}  />
        <ThreeElement />
      </Canvas> */}
    </>
  )
}

export default App
