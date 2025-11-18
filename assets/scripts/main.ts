import { _decorator, Component, Node, Sprite, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property(Node)
    bg: Node = null;

    @property(Node)
    rtnode: Node = null;

    @property(Node)
    borderLightNode: Node = null;

    @property(Node)
    dissolveTexture: Node = null;

    @property(Node)
    dissolveSpine: Node = null;

    start() {
        this.setRTOffset();
        this.tweBg();
        this.setBorderLight();
        this.setDissolveTexture();
    }

    private tweBg() {
        tween(this.bg)
            .repeatForever(
                tween(this.bg)
                    .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) })
                    .to(0.5, { scale: Vec3.ONE })
            )
            .start();
    }

    setBorderLight() {
        const material = this.borderLightNode.getComponent(Sprite).material;
        const textureWid = this.borderLightNode.getComponent(UITransform).width;
        const textureHeight = this.borderLightNode.getComponent(UITransform).height;
        material.setProperty('textureAspect', new Vec2(textureWid / textureHeight, 1.0));
    }

    setRTOffset() {
        const size = this.rtnode.getComponent(UITransform).contentSize;
        const halfX = size.width / 2;
        const halfY = size.height / 2;

        const material = this.rtnode.getComponent(Sprite).material;
        const worldPos = this.rtnode.getWorldPosition();

        material.setProperty('offsetX', worldPos.x - halfX);
        material.setProperty('offsetY', 720 - worldPos.y - halfY);
    }

    setDissolveTexture() {
        const material = this.dissolveTexture.getComponent(Sprite).material;
        const property = material.getProperty('dissolveThreshold');
        let d = {
            dissolveThreshold: property,
        };
        let target = 0;
        if (property == 0.0) {
            target = 1.0;
        }
        tween(d)
            .to(
                1.0,
                { dissolveThreshold: target },
                {
                    onUpdate: (target: { dissolveThreshold: number }, ratio: number) => {
                        material.setProperty('dissolveThreshold', target.dissolveThreshold);
                    },
                }
            )
            .start();
    }

    setDissolveSpine() {
        const material = this.dissolveSpine.getComponent(Sprite).material;
        const property = material.getProperty('dissolveThreshold');
        let d = {
            dissolveThreshold: property,
        };
        let target = 0;
        if (property == 0.0) {
            target = 1.0;
        }
        tween(d)
            .to(
                1.0,
                { dissolveThreshold: target },
                {
                    onUpdate: (target: { dissolveThreshold: number }, ratio: number) => {
                        material.setProperty('dissolveThreshold', target.dissolveThreshold);
                    },
                }
            )
            .start();
    }

    update(deltaTime: number) {}
}
