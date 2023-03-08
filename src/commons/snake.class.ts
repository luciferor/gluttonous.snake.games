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
                this.drawLine(ctx,'rgba(255,255,255,0.1)',i*this.grid,j*this.grid);
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
        const ctx = this.scene.getContext('2d')!;
        this.data.forEach((e,i) => {
            if(i===0){
                this.drawLine(ctx,'#00CC00',e[0],e[1]);
            }else{
                this.drawLine(ctx,'#99FF00',e[0],e[1]);
            }
        });
        this.drawLine(ctx,'#FF3366',f.x,f.y);
        this.snakeMove();
    }

    //移动
    async snakeMove(){
        if(!this.isActive) return;
        const h:number[][] = JSON.parse(JSON.stringify(this.data));
        //是否咬到自己了
        for(let i:number=1;i<this.data.length;i++){
            console.log(i,this.data.length)
            console.log(this.data[i][0],h[0][0],this.data[i][1],h[0][1])
            //判断是否咬到自己了
            if(this.data[i][0]===h[0][0]&&this.data[i][1]===h[0][1]){
                console.log('咬到自己了');
                this.isActive = false;
                c.showGameOver();
                return;
            }
        }
        
        switch (this.direction) {
            case 'ArrowUp':
                if(this.data[0][1]>0){
                    this.data[0] = [h[0][0],h[0][1]-this.grid];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    c.showGameOver();
                    return;
                }
                break;
            case 'ArrowDown':
                if(this.data[0][1]<this.sh-this.grid){
                    this.data[0] = [h[0][0],h[0][1]+this.grid];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    c.showGameOver();
                    return;
                }
                break;
            case 'ArrowLeft':
                if(this.data[0][0]>0){
                    this.data[0] = [h[0][0]-this.grid,h[0][1]];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    c.showGameOver();
                    return;
                }
                break;
            case 'ArrowRight':
                if(this.data[0][0]<this.sw-this.grid){
                    this.data[0] = [h[0][0]+this.grid,h[0][1]];
                }else{
                    console.log('死了')
                    this.isActive = false;
                    c.showGameOver();                              
                    return;
                }
                break;
            default:
                break;
        }
        
        //设置蛇头当前位置
        for(let i=1;i<=this.data.length-1;i++){
            this.data[i] = h[i-1];
        }

        const ctx = this.scene.getContext('2d')!;
        ctx.clearRect( 0, 0, this.scene.width, this.scene.height );
        this.drawSceneLine();
        
        //绘制食物
        this.drawLine(ctx,this.randomColor(),f.x,f.y);

        this.data.forEach((e,i) => {
            if(i===0){
                this.drawLine(ctx,'#00CC00',e[0],e[1]);
            }else{
                this.drawLine(ctx,'#99FF00',e[0],e[1])
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
            //重新生成位置了
            f.randomPosi();
            //判断是否与蛇身重合
            this.foodsIsInSnake();
        }
        this.timerHandle();
    }

    //循环
    async timerHandle(){
        let timer = null;
        timer = await setTimeout(() => {
            this.snakeMove();
        }, c.speed);
    }

    //画圆
    drawLine(ctx:any,color:string,x:number,y:number){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x+10,y+10,10,0*Math.PI,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }

    //判断食物的坐标是否与蛇身重合
    foodsIsInSnake(){
        for(let i:number=0;i<this.data.length;i++){
            if(f.x === this.data[0][0]&&f.y === this.data[0][1]){
                //重合了要重新生成坐标
                f.randomPosi();
            }
        }
    }
}