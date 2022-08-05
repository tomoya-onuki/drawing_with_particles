import $ = require('jquery');
import { Particle } from './Paricle';
declare var require: any;

const domParser: DOMParser = new DOMParser();
const parseHTMLcode = (code: string): string => {
    return String(domParser.parseFromString(code, 'text/html').body.innerText)
}

$(function () {
    console.log('start')
    new main().init()
})

export class main {
    private NUM: number = 1000
    private particleList: Particle[] = []
    private frameRate: number = 30
    private cvs: HTMLCanvasElement

    private width: number
    private height: number

    private speed: number = 50

    constructor() {
        this.cvs = <HTMLCanvasElement>$('#main')[0]
        this.width = Number($(document).width()) * devicePixelRatio
        this.height = Number($(document).height()) * devicePixelRatio
    }

    public init() {
        this.cvs.width = this.width
        this.cvs.height = this.height
        this.cvs.style.width = String(this.width / devicePixelRatio) + 'px'
        this.cvs.style.height = String(this.height / devicePixelRatio) + 'px'

        const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.cvs.getContext('2d')

        for (let i = 0; i < this.NUM; i++) {
            this.particleList.push(new Particle(this.width, this.height))
        }
        this.render(ctx)


        const me: main = this
        let mousedown: boolean = false
        $('#main')
            .on('mousedown', function () {
                mousedown = true
            })
            .on('mousemove', function (e) {
                if (mousedown) {
                    let rect = e.target.getBoundingClientRect()
                    let mouseX: number = (e.clientX - rect.left) * devicePixelRatio
                    let mouseY: number = (e.clientY - rect.top) * devicePixelRatio
                    me.particleList.forEach(p => {
                        p.mouseEvent(mouseX, mouseY)
                    })
                }
            })
            .on('mouseup', function (e) {
                mousedown = false
                let rect = e.target.getBoundingClientRect()
                let mouseX: number = (e.clientX - rect.left) * devicePixelRatio
                let mouseY: number = (e.clientY - rect.top) * devicePixelRatio
                me.particleList.forEach(p => {
                    p.mouseEvent(mouseX, mouseY)
                })
            })

        $('#show-btn').on('input', function () {
            if ($(this).prop('checked')) {
                $('#show-btn-label').text(parseHTMLcode('&#9650;'))
                $('#control').fadeIn()
            } else {
                $('#show-btn-label').text(parseHTMLcode('&#9660;'))
                $('#control').fadeOut()
            }
        })
        $('#particle-speed-range').on('input', function () {
            const val: number = Number($(this).val())
            $(this).prev().text(`Speed: ${val}`)
            me.speed = val
        })
        $('#particle-num-range').on('input', function () {
            const val: number = Number($(this).val())
            $(this).prev().text(`Num of Particles: ${val}`)
            for (let i = 0; i < Math.abs(me.NUM - val); i++) {
                if (me.NUM < val) {
                    me.particleList.push(new Particle(me.width, me.height))
                } else if (me.NUM > val) {
                    me.particleList.pop()
                }
            }

            me.NUM = val
        })

        $(window).on('resize', function () {
            // me.resize();
        })
    }

    private render(ctx: CanvasRenderingContext2D) {
        const me: main = this
        setInterval(function () {
            me.draw(ctx)
        }, 1000 / this.frameRate)
    }

    private draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, this.width, this.height)
        ctx.strokeRect(0, 0, this.width, this.height)

        this.particleList.forEach(p => {
            p.update(ctx, this.width, this.height, this.speed)
        })
    }

    private resize() {
        this.width = Number($(document).width()) * devicePixelRatio
        this.height = Number($(document).height()) * devicePixelRatio
        this.cvs.width = this.width
        this.cvs.height = this.height
        this.cvs.style.width = String(this.width / devicePixelRatio) + 'px'
        this.cvs.style.height = String(this.height / devicePixelRatio) + 'px'

        // this.draw()
    }
}