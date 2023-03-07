export default class Scene {
    root:HTMLElement;
    width:number = Math.floor(window.innerWidth/20)*20;
    height:number = Math.floor(window.innerHeight/20)*20;
    backgroundColor:string = 'transparents';
    scene:HTMLCanvasElement;
    //构造函数
    constructor(){
        this.root = document.getElementById('scene')!;//加感叹号就是说明一定有这个dom元素
        this.scene  = document.createElement('canvas');
        this.root.appendChild(this.scene);
        this.scene.style.background = this.backgroundColor;
        this.initScene();
        window.addEventListener('resize',this.initScene.bind(this))
    }

    //窗口改变事件
    initScene(){
        this.scene.style.width = Math.floor(window.innerWidth/20)*20-20+'px';
        this.scene.style.height = Math.floor(window.innerHeight/20)*20-20+'px';
        this.scene.width = Math.floor(window.innerWidth/20)*20-20;
        this.scene.height = Math.floor(window.innerHeight/20)*20-20;
        this.width = Math.floor(window.innerWidth/20)*20-20;
        this.height = Math.floor(window.innerHeight/20)*20-20;
    }
}