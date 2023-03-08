export default class Ctrls{
    speed:number = 300;
    score:number = 0;
    direction:string = 'ArrowRight';
    gameover:HTMLElement;
    constructor(){
        this.gameover = document.getElementById('gameover')!;
    }

    //显示游戏结束
    showGameOver(){
        this.gameover.classList.add('showgameover')
    }

    //重新开始
    reStartHandler(){
        console.log('重新开始')
        this.score = 0;
        this.direction = '';

    }

}