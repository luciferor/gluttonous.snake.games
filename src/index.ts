import './incs/inc.less';
import Scene from './commons/scene.class';
import Snake from './commons/snake.class';
import Ctrls from './commons/ctrols.class';

//初始化画布
const scene = new Scene();
//实例化一条蛇
const snake = new Snake(scene.scene);
//实例化控制台
const ctrl = new Ctrls();

const restart:HTMLElement = document.getElementById('restart')!;
restart.onclick = function(){
    ctrl.gameover.classList.remove('showgameover');
    ctrl.score = 0;
    ctrl.direction = 'ArrowRight';
    snake.isActive = true;
    snake.data = [[0,0]];
    snake.snakeMove();
};

document.onkeydown = keyDown;

function keyDown(event:KeyboardEvent){
    switch (event.key) {
        case 'ArrowUp':
            if(snake.direction=='ArrowDown') return;
            break;
        case 'ArrowDown':
            if(snake.direction=='ArrowUp') return;
            break;
        case 'ArrowLeft':
            if(snake.direction=='ArrowRight') return;
            break;
        case 'ArrowRight':
            if(snake.direction=='ArrowLeft') return;
            break;
        default:
            break;
    }
    snake.direction = event.key;
}