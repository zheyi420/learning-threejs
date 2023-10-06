import * as THREE from "three";

function main() {
  const canvas = document.querySelector('#renderer-canvas');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 90; // filed of view 视野范围
  const aspect = 2;  // the canvas default // 画布的宽高比 默认情况下 画布是300x150像素，所以宽高比为300/150或者说2。
  const height = 500;
  const width = 500;
  const near = 0.1; // the near clipping plane // 近裁剪面 近平面
  const far = 6; // the far clipping plane // 远裁剪面 远平面
  // 以上四个参数共同决定了视锥体(frustum)。
  // 视椎体内部的物体将被绘制，视椎体外的东西将不会被绘制。
  const camera = new THREE.PerspectiveCamera(fov, height / width, near, far);
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // renderer.setSize(width, height);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });  // 0x开头的是十六进制
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

  /**
   * 创建一个网格(Mesh)对象，它包含了：
   * 1. 几何体(Geometry)(物体的形状)
   * 2. 材质(Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
   * 3. 对象在场景中相对于他父对象的位置、朝向、和缩放。下面的代码中父对象即为场景对象。
   */
  const cubes = [
    makeInstance(geometry, 0xffffff, -2),
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0xaa8844, 2),
    makeInstance(geometry, 0x8844bb, -2, 2),
  ];


  // 添加光源
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);


  let requestID;

  /**
   * 检查渲染器的canvas尺寸是不是和canvas的显示尺寸不一样，如果不一样就设置它。
   * @param {THREE.WebGLRenderer} renderer 
   * @returns {boolean}
   */
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      // 一个canvas的内部尺寸，它的分辨率，通常被叫做绘图缓冲区(drawingbuffer)尺寸。
      // 在three.js中我们可以通过调用renderer.setSize来设置canvas的绘图缓冲区。
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    // console.log('time', time);
    time *= 0.001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      // 因为只有canvas的显示尺寸变化时宽高比才变化，
      // 所以我们只在 resizeRendererToDisplaySize 函数返回 true 时才设置摄像机的宽高比。
      console.log('canvas的显示尺寸发生变化');

      // 解决拉伸的问题
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      // const speed = 1 + ndx * .1;
      const speed = 1.1;
      const rot = time * speed;
      ndx === 0 && (cube.rotation.x = rot);
      ndx === 1 && (cube.rotation.y = rot);
      ndx === 2 && (cube.rotation.z = rot);
      ndx === 3 && (cube.rotation.x = rot) && (cube.rotation.y = rot);
    });

    renderer.render(scene, camera);

    requestID = requestAnimationFrame(render);
  }

  function makeInstance(geometry, color, x = 0, y = 0, z = 0) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
  }

  requestID = requestAnimationFrame(render);

  /* setTimeout(() => {
    cancelAnimationFrame(requestID);
  }, 10000); */
}

main();