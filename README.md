# Xiaoyu Lab

个人作品站第一版：项目展示、教程入口、合作方式、兴趣展示和多主题切换。

## Preview

直接打开 `index.html` 即可预览。

如果想用本地服务器预览：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173
```

## Data

- 项目区会在浏览器里调用 GitHub API：`https://api.github.com/users/liuxiaoyusky/repos`
- API 不可用时会使用 `script.js` 里的 fallback 项目数据。
- 教程、合作方式和兴趣展示目前是静态内容，可以继续接 MDX、YouTube、Bilibili 或 Notion。

## Assets

优化后的网页素材在 `media/`。原始素材保留在 `assests/`。
