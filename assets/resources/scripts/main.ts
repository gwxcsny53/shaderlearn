import { _decorator, Component, Node, Sprite, tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property(Node)
    bg: Node = null;

    @property(Node)
    rtnode: Node = null;

    start() {
        this.setRTOffset();
        this.tweBg();
    }

    private tweBg() {
        tween(this.bg)
            .repeatForever(
                tween(this.bg)
                    .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) })
                    .to(0.5, { scale: Vec3.ONE })
            ).start()
    }

    setRTOffset() {
        const size = this.rtnode.getComponent(UITransform).contentSize;
        const halfX = size.width / 2;
        const halfY = size.height / 2;

        const material = this.rtnode.getComponent(Sprite).material;
        const worldPos = this.rtnode.getWorldPosition();

        material.setProperty("offsetX", worldPos.x - halfX);
        material.setProperty("offsetY", 720 - worldPos.y - halfY);
    }

    update(deltaTime: number) {

    }
}


