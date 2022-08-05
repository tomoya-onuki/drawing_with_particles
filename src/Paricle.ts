import $ = require('jquery')
declare var require: any

export class Particle {
    private vx: number
    private vy: number
    private x: number
    private y: number
    private preX: number
    private preY: number
    private size: number
    private easing: number = Math.random() * 0.3 + 0.1
    private R: number

    constructor(width: number, height: number) {
        this.R = width
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.preX = this.x
        this.preY = this.y
        //方向の初期化:中心に集まる
        this.size = Math.sqrt(Math.pow(width / 2 - this.x, 2) + Math.pow(height / 2 - this.y, 2))
        this.vx = (width / 2 - this.x) / this.size
        this.vy = (height / 2 - this.y) / this.size
    }

    public update(ctx: CanvasRenderingContext2D, w: number, h: number, speed: number) {
        this.x += this.vx * speed * this.easing;
        this.y += this.vy * speed * this.easing;

        // console.log('update')

        ctx.strokeStyle = '#FFF'
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.preX, this.preY)
        ctx.stroke()

        this.preX = this.x
        this.preY = this.y

        this.size = Math.sqrt(Math.pow(w / 2 - this.x, 2) + Math.pow(h / 2 - this.y, 2));
        if (this.size > this.R) {
            this.vx = (w / 2 - this.x) / this.size
            this.vy = (h / 2 - this.y) / this.size
        }
    }

    public mouseEvent(mouseX: number, mouseY: number) {
        this.size = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2))
        this.vx = (mouseX - this.x) / this.size
        this.vy = (mouseY - this.y) / this.size
    }
}