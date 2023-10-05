import * as THREE from "three";

const canvas = document.querySelector('#renderer-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 90; // filed of view 视野范围
const aspect = 2;  // the canvas default // 画布的高宽比 默认情况下 画布是300x150像素，所以宽高比为300/150或者说2。
const height = 500;
const width = 500;
const near = 0.1; // the near clipping plane // 近裁剪面 近平面
const far = 6; // the far clipping plane // 远裁剪面 远平面
// 以上四个参数共同决定了视锥体(frustum)。
// 视椎体内部的物体将被绘制，视椎体外的东西将不会被绘制。
const camera = new THREE.PerspectiveCamera(fov, height / width, near, far);
renderer.setSize(width, height);
camera.position.z = 5;

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

function render(time) {
  // console.log('time', time);
  time *= 0.001;  // convert time to seconds

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