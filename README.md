# 強化学習のモデル
Q-Learning

# 環境構築
## project導入
npm init

## typescript導入
npm install --save-dev typescript

## typescriptのコンパイラ設定
./node_modules/.bin/tsc --init

## tsconfig.jsonを置き換え
```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "resolveJsonModule": true,
        "outDir": "./dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    },
    "include": [
        "./ts/**/*.ts"
    ]
}
```

## webpackの導入
npm install --save-dev webpack webpack-cli ts-loader

## typescript linq導入
npm install --save-dev linq-es5