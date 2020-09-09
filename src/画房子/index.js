
/**
 * 画家 负责绘制
 *
 * @class Drawer
 */
class Drawer {
  target
  context
  sprites = []
  constructor(target, width = 400, height = 400) {
    this.target = target
    if (target.getContext) {
      this.context = target.getContext('2d')
      target.width = width
      target.height = height
    }
  }
  draw = (Sprite) => {
    const sprite = new Sprite(this)
    this.sprites.push(sprite)
    this.context.moveTo(0, 0)
    sprite.draw()
    this.context.closePath()
    return sprite
  }
}

/**
 * 精灵 提供基础功能
 *
 * @class Sprite
 */
class Sprite {
  static idFlag = 0
  createTime = new Date()
  id = Sprite.idFlag++
  drawer
  constructor(drawer) {
    this.drawer = drawer
  }
}

/**
 * 墙
 *
 * @class Wall
 * @extends {Sprite}
 */
class Wall extends Sprite {
  draw() {
    const { context } = this.drawer
    context.strokeRect(75, 140, 150, 110)
  }
}

/**
 * 门
 *
 * @class Door
 * @extends {Sprite}
 */
class Door extends Sprite {
  draw() {
    const { context } = this.drawer
    context.fillRect(130, 190, 40, 60)
  }
}

/**
 * 房顶
 *
 * @class Roof
 * @extends {Sprite}
 */
class Roof extends Sprite {
  draw() {
    const { context } = this.drawer
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.stroke();
  }
}

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const drawer = new Drawer(canvas)
  drawer.draw(Wall)
  drawer.draw(Door)
  drawer.draw(Roof)
})