export default class Ctrls{
    speed:number = 300;
    score:number = 0;
    direction:string = 'ArrowRight';
    gameover:HTMLElement;
    audio:HTMLAudioElement = new Audio(require('../Medias/y1480.mp3').default);
    constructor(){
        this.gameover = document.getElementById('gameover')!;
    }

    //显示游戏结束
    showGameOver(){
        this.gameover.classList.add('showgameover');
        this.audio.play();
    }

    //重新开始
    reStartHandler(){
        this.score = 0;
        this.direction = '';

    }

}