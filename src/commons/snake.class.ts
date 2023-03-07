import Ctrls from "./ctrols.class";
import Foods from "./foods.class";
const f = new Foods(Math.floor(window.innerWidth/20)*20-20,Math.floor(window.innerHeight/20)*20-20);
f.randomPosi();//初始化一个位置
const c = new Ctrls();
export default class Snake{
    scene:HTMLCanvasElement;
    data:number[][] = [[0,0]];
    grid:number = 20;//格子的边长
    gap:number = 5;//空隙间距
    direction:string = '';
    sw:number = Math.floor(window.innerWidth/20)*20-20;
    sh:number = Math.floor(window.innerHeight/20)*20-20;
    isActive:boolean = true;
    constructor(canvas:HTMLCanvasElement) {
        this.scene = canvas;
        // this.drawSceneLine();
        this.drawSnake();
        window.addEventListener('resize',this.initScene.bind(this))
    }

    //窗口改变初始化屏幕
    initScene(){
        this.sw = Math.floor(window.innerWidth/20)*20-20;
        this.sh = Math.floor(window.innerHeight/20)*20-20;
    }

    //画布线条
    drawSceneLine(){
        const ctx = this.scene.getContext('2d')!;
        for(let i:number=0;i<Math.floor(this.sw/this.grid);i++){
            for(let j:number=0;j<Math.floor(this.sh/this.grid);j++){
                // ctx.fillStyle = this.randomColor();
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.beginPath();
                ctx.arc(i*this.grid+10,j*this.grid+10,10,0*Math.PI,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
                // ctx.fillRect(i*this.grid,j*this.grid,this.grid,this.grid);
            }
        }
    }

    randomColor():string {
        const arr:string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']; // 下标 [0-15]
        let str:string = '#';
        //生成0-15随机下标
        for (let i:number = 1; i <= 6; i++) {
            let index:number = Math.floor(Math.random() * 16);
            str += arr[index];
        };
        return str;
    };

    drawSnake(){
        let _o = this;
        console.log(this.sw,this.sh)
        const ctx = this.scene.getContext('2d')!;
        this.data.forEach((e,i) => {
            if(i===0){
                ctx.fillStyle = '#00CC00';
                ctx.beginPath();
                ctx.arc(e[0]+10,e[1]+10,10,0*Math.PI,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
                // ctx.fillRect(e[0],e[1],this.grid,this.grid);
            }else{
                ctx.fillStyle = '#99FF00';
                ctx.beginPath();
                ctx.arc(e[0]+10,e[1]+10,10,0*Math.PI,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
                // ctx.fillRect(e[0],e[1],this.grid,this.grid);
            }
        });
        ctx.fillStyle = '#FF3366';
        ctx.beginPath();
        ctx.arc(f.x+10,f.y+10,10,0*Math.PI,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        // ctx.fillRect(f.x,f.y,this.grid,this.grid);
        this.snakeMove();
    }

    //移动
    async snakeMove(){
        if(!this.isActive) return;
        const h:number[][] = JSON.parse(JSON.stringify(this.data));
        switch (this.direction) {
            case 'ArrowUp':
                if(this.data[0][1]>0){
                    this.data[0] = [h[0][0],h[0][1]-this.grid];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    return;
                }
                break;
            case 'ArrowDown':
                if(this.data[0][1]<this.sh-this.grid){
                    this.data[0] = [h[0][0],h[0][1]+this.grid];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    return;
                }
                break;
            case 'ArrowLeft':
                if(this.data[0][0]>0){
                    this.data[0] = [h[0][0]-this.grid,h[0][1]];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    return;
                }
                break;
            case 'ArrowRight':
                if(this.data[0][0]<this.sw-this.grid){
                    this.data[0] = [h[0][0]+this.grid,h[0][1]];
                }else{
                    console.log('死了')
                    this.isActive = false;                              
                    return;
                }
                break;
            default:
                break;
        }
        
        for(let i=1;i<=this.data.length-1;i++){
            this.data[i] = h[i-1];
        }
        const ctx = this.scene.getContext('2d')!;
        ctx.clearRect( 0, 0, this.scene.width, this.scene.height );
        this.drawSceneLine();
        //绘制食物
        ctx.fillStyle = '#FF3366';
        ctx.beginPath();
        ctx.arc(f.x+10,f.y+10,10,0*Math.PI,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        // ctx.fillRect(f.x,f.y,this.grid,this.grid);
        this.data.forEach((e,i) => {
            if(i===0){
                ctx.fillStyle = '#00CC00';
                ctx.beginPath();
                ctx.arc(e[0]+10,e[1]+10,10,0*Math.PI,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
                // ctx.fillRect(e[0],e[1],this.grid,this.grid);
            }else{
                ctx.fillStyle = '#99FF00';
                ctx.beginPath();
                ctx.arc(e[0]+10,e[1]+10,10,0*Math.PI,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
                // ctx.fillRect(e[0],e[1],this.grid,this.grid);
            }
        });
        if(f.x===this.data[0][0]&&f.y===this.data[0][1]){
            switch (this.direction) {
                case 'ArrowUp':
                    this.data.push([this.data[0][0],this.data[0][1]+20]);//蛇身长长了。
                    break;
                case 'ArrowDown':
                    this.data.push([this.data[0][0],this.data[0][1]-20]);//蛇身长长了。
                    break;
                case 'ArrowLeft':
                    this.data.push([this.data[0][0]+20,this.data[0][1]]);//蛇身长长了。
                    break;
                case 'ArrowRight':
                    this.data.push([this.data[0][0]-20,this.data[0][1]]);//蛇身长长了。
                    break;
                default:
                    break;
            }
            c.score+=10;
            f.randomPosi();//重新生成位置了
        }
        this.timerHandle();
    }

    //循环
    async timerHandle(){
        let timer = null;
        timer = setTimeout(() => {
            this.snakeMove();
        }, c.speed);
    }
}