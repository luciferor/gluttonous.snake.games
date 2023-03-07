import './incs/inc.less';
import Scene from './commons/scene.class';
import Snake from './commons/snake.class';
import Ctrls from './commons/ctrols.class';

//初始化画布
const scene = new Scene();
//实例化一条蛇
const snake = new Snake(scene.scene);

document.onkeydown = keyDown;

function keyDown(event:KeyboardEvent){
    snake.direction = event.key;
}