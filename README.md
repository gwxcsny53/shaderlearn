# Cocos Creator Shader 学习项目

这是一个专门用于学习 Cocos Creator 着色器（Shader）开发的项目。项目包含了多种常见的 2D 着色器效果实现，适合初学者学习和参考。

## 项目简介

本项目基于 Cocos Creator 3.8.7 开发，主要展示了各种 2D 着色器效果的实现方法，包括图像滤镜、溶解效果等。通过学习这些着色器代码，可以帮助开发者理解：

- Cocos Creator 着色器的基本语法和结构
- 常见图像处理算法的实现
- 着色器参数的配置和使用
- 材质系统的工作原理

## 项目结构

```
shader_learn/
├── assets/
│   ├── resources/
│   │   ├── shader/                 # 着色器相关文件
│   │   │   ├── chunks/            # 着色器代码片段
│   │   │   │   └── normal-vert.chunk
│   │   │   ├── effects/           # 着色器效果文件
│   │   │   │   ├── base.effect    # 基础着色器
│   │   │   │   ├── dissolve.effect # 溶解效果着色器
│   │   │   │   └── filter.effect  # 滤镜效果着色器
│   │   │   └── materials/         # 材质文件
│   │   │       ├── base.mtl
│   │   │       ├── dissolve.mtl
│   │   │       └── filter.mtl
│   │   ├── images/                # 图片资源
│   │   └── anim/                  # 动画资源
│   ├── scenes/
│   │   └── main.scene             # 主场景
│   └── scripts/                   # 脚本文件（暂无）
├── settings/                      # 项目设置
├── package.json                   # 项目配置
├── tsconfig.json                  # TypeScript 配置
└── README.md                      # 项目说明文档
```

## 着色器效果介绍

### 1. 滤镜效果 (filter.effect)

包含多种图像滤镜效果：

- **灰度化 (grayscale)**: 将彩色图像转换为灰度图像
- **反色 (invert)**: 颜色反转效果
- **像素化 (pixelSize)**: 像素风格化效果
- **边缘检测 (edgeDetection)**: 检测图像边缘
- **胶片颗粒 (filmgrain)**: 添加胶片颗粒质感
- **暗角效果 (vignette)**: 添加暗角边框效果

### 2. 溶解效果 (dissolve.effect)

实现了基于噪声贴图的溶解效果，支持：
- 可调节的溶解阈值
- 自定义溶解颜色
- 平滑的溶解过渡

### 3. 基础着色器 (base.effect)

提供基础的着色器模板和通用功能。

## 如何运行项目

### 环境要求

- Cocos Creator 3.8.7 或更高版本
- Node.js 20.10.0 或更高版本

### 运行步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/gwxcsny53/shaderlearn.git
   cd shaderlearn
   ```

2. **打开项目**
   - 启动 Cocos Creator
   - 选择"打开项目"
   - 选择项目根目录

3. **预览效果**
   - 在 Cocos Creator 中打开 `assets/scenes/main.scene`
   - 点击预览按钮运行项目
   - 在场景中查看各种着色器效果

4. **编辑着色器**
   - 在项目面板中找到 `assets/resources/shader/effects/` 目录
   - 双击 `.effect` 文件进行编辑
   - 修改后保存，效果会实时更新

## 学习建议

### 初学者

1. 从 `base.effect` 开始，了解着色器的基本结构
2. 学习 `filter.effect` 中的简单滤镜效果
3. 理解顶点着色器和片段着色器的区别
4. 掌握着色器参数的定义和使用

### 进阶学习

1. 研究 `dissolve.effect` 中的噪声采样技术
2. 学习如何创建自定义着色器效果
3. 了解性能优化技巧
4. 探索更复杂的图像处理算法

## 相关资源

- [Cocos Creator 官方文档](https://docs.cocos.com/creator/manual/zh/)
- [着色器编程指南](https://docs.cocos.com/creator/manual/zh/shader/)
- [GLSL 语法参考](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习项目！

## 许可证

本项目采用 MIT 许可证，详情请查看 LICENSE 文件。

---

**注意**: 这是一个学习项目，着色器代码仅供学习和参考使用。在实际项目中使用时，请根据具体需求进行优化和调整。