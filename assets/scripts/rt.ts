import { _decorator, Component, Node, sp, Sprite, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rt')
export class rt extends Component {
    @property(Node)
    bg: Node = null;

    @property(Node)
    borderLightNode: Node = null;

    @property(Node)
    dissolveSpine: Node = null;

    start() {
        this.tweBg();
        this.setBorderLight();
        this.setDissolveSpine();
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

    setDissolveSpine() {
        const spine = this.dissolveSpine.getComponent(sp.Skeleton);
        // let matCaches = spine['_materialCache'];
        // let property;
        // for (var x in matCaches) {
        //     let m = matCaches[x];
        //     property = m.getProperty('dissolveThreshold');
        // }
        // return;
        const material = spine.customMaterial;
        const property = material.getProperty('dissolveThreshold');
        console.log('🚀 ~ main ~ setDissolveSpine ~ property:', property);
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
                        // let matCaches = spine['_materialCache'];
                        // for (var x in matCaches) {
                        //     let m = matCaches[x];
                        //     m.setProperty('dissolveThreshold', target.dissolveThreshold);
                        // }
                        // material.setProperty('dissolveThreshold', target.dissolveThreshold);
                    },
                }
            )
            .start();
    }

    update(deltaTime: number) {}
}
