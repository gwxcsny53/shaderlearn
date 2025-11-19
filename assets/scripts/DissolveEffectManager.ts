import { _decorator, Component, Camera, RenderTexture, Sprite, Material, director, gfx, view, Texture2D } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('DissolveEffectManager')
export class DissolveEffectManager extends Component {
    @property({ type: Camera, tooltip: '用于渲染原始场景的主相机' })
    mainCamera: Camera | null = null;

    @property({ type: Sprite, tooltip: '用于执行后期处理的 Sprite' })
    postProcessSprite: Sprite | null = null;

    @property({ type: Texture2D, tooltip: '噪声纹理' })
    noiseTexture: Texture2D | null = null;

    // 我们将在这个纹理上进行第一次渲染（原始场景）
    private renderTextureA: RenderTexture | null = null;

    // 后期处理材质
    private postProcessMaterial: Material | null = null;

    // 溶解阈值，用于动画
    private dissolveThreshold = 0;
    private dissolveSpeed = 0.2; // 每秒溶解速度

    onLoad() {
        if (!this.mainCamera || !this.postProcessSprite || !this.noiseTexture) {
            console.error('请在编辑器中指定 MainCamera, PostProcessSprite 和 NoiseTexture!');
            return;
        }

        // 1. 初始化渲染纹理
        const size = view.getVisibleSize();
        this.renderTextureA = new RenderTexture();
        this.renderTextureA.initialize({
            width: size.width,
            height: size.height,
            // 根据需要选择合适的格式
            // format: gfx.Format.RGBA8,
        });

        // 2. 将主相机的渲染目标设置为我们的 RenderTexture
        this.mainCamera.targetTexture = this.renderTextureA;

        // 3. 获取后期处理材质并设置其输入纹理
        this.postProcessMaterial = this.postProcessSprite.getSharedMaterial(0);
        if (this.postProcessMaterial) {
            // 这就是解决反馈循环的关键：
            // 我们将主相机渲染出的 renderTextureA 作为输入，传递给后期处理着色器
            this.postProcessMaterial.setProperty('renderTexture', this.renderTextureA);
            this.postProcessMaterial.setProperty('dissolve', this.noiseTexture);
        }
    }

    update(deltaTime: number) {
        // 4. 制作一个简单的溶解动画
        this.dissolveThreshold += this.dissolveSpeed * deltaTime;
        if (this.dissolveThreshold > 1.2) {
            this.dissolveThreshold = 0; // 循环播放
        }

        // 动态更新着色器中的溶解阈值
        if (this.postProcessMaterial) {
            this.postProcessMaterial.setProperty('dissolveThreshold', this.dissolveThreshold);
        }
    }

    onDestroy() {
        // 5. 在组件销毁时释放资源，防止内存泄漏
        if (this.renderTextureA) {
            this.renderTextureA.destroy();
            this.renderTextureA = null;
        }
    }
}
