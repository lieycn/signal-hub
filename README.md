# Signal Hub

<div align="center">

**一个轻量级消息聚合中心，统一管理来自多个平台的通知和消息**

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go)](https://golang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-4682B4?style=flat&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYuNCAyNTYuNCI+PHBhdGggZmlsbD0iIzQ2ODJCNCIgZD0iTTIyOC4zIDEzLjcgMTM4IDEzMy40IDQ3LjcgMTMuN2MtMTAuNyAwLTIwLjggNC4yLTI4LjMgMTEuNy03LjQgNy40LTExLjYgMTcuNS0xMS42IDI4LjN2MTUxLjJjMCAxMC43IDQuMiAyMC44IDExLjcgMjguMyA3LjQgNy40IDE3LjUgMTEuNiAyOC4zIDExLjZoOTAuNmMxMC43IDAgMjAuOC00LjIgMjguMy0xMS42IDcuNC03LjQgMTEuNi0xNy41IDExLjYtMjguM1Y1MC4yYzAtMTAuNy00LjItMjAuOC0xMS43LTI4LjMtNy40LTcuNC0xNy41LTExLjYtMjguMy0xMS42aC05MC42eiIvPjxwYXRoIGZpbGw9IiMzRjVBNkUiIGQ9Ik0xMzggMTMzLjRsOTAuNi05MC42YzcuNC03LjQgNy40LTE5LjUgMC0yNi45LTcuNC03LjQtMTkuNS03LjQtMjYuOSAwTDEzOC45IDEwNi41IDQ3LjcgMTYuM2MtNy40LTcuNC0xOS41LTcuNC0yNi45IDAtNy40IDcuNC03LjQgMTkuNSAwIDI2LjlsOTAuNiA5MC42YzcuNCA3LjQgMTkuNSA3LjQgMjYuOSAwbDkwLjYtOTAuNnoiLz48L3N2Zz4=)](https://solidjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [开发指南](#-开发指南) • [部署](#-部署)

</div>

---

## ✨ 功能特性

### 📊 多平台集成
- **V2EX** - 获取社区通知和消息
- **2Libra** - 支持平台消息同步
- **智能合约监控** - 实时跟踪链上交互

### 🎯 核心功能
- **统一消息管理** - 一个界面查看所有平台消息
- **实时同步** - 自动拉取最新消息和通知
- **消息历史** - 完整的消息记录和归档
- **账户管理** - 支持多个账户配置和切换

### 🚀 技术栈
- **后端**: Go + Echo + GORM + SQLite
- **前端**: SolidJS + Vite + TailwindCSS
- **架构**: RESTful API + SPA

---

## 📦 快速开始

下载 [release](https://github.com/lieycn/signal-hub/releases) 二进制，执行 `./signal-hub-darwin-arm64 serve` 一键启动，然后访问 `http://localhost:8080`

### 前置要求

- Go 1.21 或更高版本
- Node.js 18 或更高版本
- pnpm（推荐）或 npm

### 1. 克隆项目

```bash
git clone https://github.com/lieycn/signal-hub.git
cd signal-hub
```

### 2. 启动后端

```bash
cd server

# 复制环境配置文件
cp .env.example .env

# 安装依赖
go mod download

# 初始化数据库
go run . install

# 启动服务
go run . serve
```

服务将在 http://localhost:8080 启动

### 3. 启动前端

```bash
cd frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

前端将在 http://localhost:5173 启动

### 4. 访问应用

打开浏览器访问 http://localhost:5173 即可使用 Signal Hub

---

## 🔧 配置说明

### 环境变量

在 `server/.env` 文件中配置以下变量：

```env
# 应用配置
APP_NAME=signal-hub
APP_URL=http://localhost:9876
APP_ENV=development
APP_DEBUG=true
APP_PORT=8080

# 数据库配置（SQLite 自动创建）
DB_DATABASE=signal-hub

# JWT 配置
JWT_SECRET=your-secret-key
JWT_TTL=24

# Redis 配置（可选）
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# R2 存储配置（可选）
R2_ENDPOINT=https://your-endpoint.r2.cloudflarestorage.com
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY=your-access-key
R2_SECRET_KEY=your-secret-key
R2_BUCKET=your-bucket-name

# Shopify 配置（可选）
SHOPIFY_API_KEY=your-api-key
SHOPIFY_API_SECRET=your-api-secret
```

---

## 👨‍💻 开发指南

### 项目结构

```
signal-hub/
├── frontend/              # 前端项目（SolidJS）
│   ├── src/
│   │   ├── api/          # API 调用
│   │   ├── components/   # 可复用组件
│   │   ├── views/        # 页面视图
│   │   ├── router/       # 路由配置
│   │   └── store/        # 状态管理
│   └── package.json
├── server/                # 后端项目（Go）
│   ├── cmd/              # 命令行入口
│   ├── internal/
│   │   ├── api/         # API 定义
│   │   ├── handlers/    # 请求处理
│   │   ├── services/     # 业务逻辑
│   │   ├── repositories/ # 数据访问
│   │   └── model/       # 数据模型
│   └── main.go
└── README.md
```

### 可用命令

#### 后端命令

```bash
cd server

# 初始化数据库迁移
go run . install

# 启动开发服务器
go run . serve

# 生成 JWT Token
go run . jwt
```

#### 前端命令

```bash
cd frontend

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 开发工作流

1. **修改后端代码**
   - 编辑 `server/internal/` 下的相关文件
   - 重启 `go run . serve` 查看效果

2. **修改前端代码**
   - 编辑 `frontend/src/` 下的相关文件
   - Vite 会自动热更新

3. **添加新的集成服务**
   - 在 `server/internal/services/` 创建新服务文件
   - 实现服务接口和同步逻辑
   - 在 handlers 中暴露 API

---

## 📦 构建 & 部署

### 使用发布脚本

项目提供了自动化发布脚本，支持一键构建和部署：

```bash
# 构建指定版本
./release.sh v1.0.0

# 构建并创建 GitHub Release
./release.sh v1.0.0 yes
```

发布脚本会自动：
- 构建前端生产版本
- 编译多平台后端二进制文件（linux/amd64, linux/arm64, darwin/amd64, darwin/arm64, windows/amd64）
- 生成 SHA256 校验和
- 推送到 GitHub
- 创建 Release（可选）

### 手动构建

#### 构建前端

```bash
cd frontend
pnpm install
pnpm build
```

构建产物在 `frontend/dist/` 目录

#### 构建后端

```bash
cd server
go build -o signal-hub .
```

### Docker 部署

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o signal-hub .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/signal-hub .
COPY --from=builder /app/frontend/dist ./public
EXPOSE 8080
CMD ["./signal-hub", "serve"]
```

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request 或创建 Issue。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---
- 项目地址: [https://github.com/lieycn/signal-hub](https://github.com/lieycn/signal-hub)
---

<div align="center">

**如果这个项目对你有帮助，请考虑给它一个 ⭐️**

Made with ❤️ by liey

</div>
