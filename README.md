# Raviteja Mulukuntla: Courses, Videos & Blog

The official website for the [Raviteja Mulukuntla YouTube channel](https://www.youtube.com/@ravitejamulukuntla9655).
It's plain HTML, CSS and JavaScript with no build step, so it runs directly on **GitHub Pages**.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Hero, courses & playlists, all 25 videos (filter + search), latest blog posts, about |
| `course.html?id=react` | Course player with the lesson list, prev/next and "mark as watched" progress |
| `blog.html` | All text tutorials with tag filter and full-text search |
| `post.html?slug=...` | A single article rendered from Markdown, with syntax highlighting and copy buttons |

## Folder structure

```
├── index.html, course.html, blog.html, post.html, 404.html
├── assets/
│   ├── css/style.css          # all styles (dark + light theme)
│   ├── js/common.js           # header, footer, helpers, video modal
│   ├── js/home.js | course.js | blog.js | post.js
│   └── img/avatar.jpg, favicon.png
├── data/                      # ← the content, and a JSON "API" for your mobile app
│   ├── channel.json           # name, bio, stats, social links
│   ├── courses.json           # courses/playlists and their videos
│   └── posts.json             # blog post list (metadata)
└── posts/
    └── <slug>.md              # blog post bodies in Markdown
```

## Run locally

The pages load JSON with `fetch`, so opening the file directly (`file://`) won't work. Start a tiny server instead:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a repository named **`<your-github-username>.github.io`** (for example `ravitejamulukuntla.github.io`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<username>/<username>.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After a minute your site is live at `https://<username>.github.io`.

> Any repo name works too (e.g. `rm-yt`), and the site will then live at `https://<username>.github.io/rm-yt/`. All links are relative, so nothing needs to change.

## Writing a new blog post

1. Create `posts/my-new-post.md` and write the article in Markdown (headings, code blocks, tables and quotes are all styled).
2. Add an entry at the top of `data/posts.json`:
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "summary": "One or two sentences shown on the card.",
     "date": "2026-10-05",
     "tags": ["C#", ".NET"],
     "video": "YOUTUBE_VIDEO_ID",
     "course": "csharp"
   }
   ```
   `video` and `course` are optional. `video` embeds that YouTube video at the top; `course` shows a "watch the full course" card at the bottom.
3. Commit and push. GitHub Pages redeploys automatically in about a minute:
   ```bash
   git add .
   git commit -m "New post: My New Post"
   git push
   ```

## Adding a new video

Open `data/courses.json`:

1. Add the video to the right course's `lessons` array (in watch order):
   `{ "id": "VIDEO_ID", "title": "Short title", "fullTitle": "Full YouTube title" }`
2. Add the same ID to the **start** of the `latest` array (newest first). This drives the "All videos" order and the "New" badge in the hero.
3. For a brand-new course, copy an existing course object and give it a new `id`, `playlistId` and `cover` (the video ID whose thumbnail is used for the card).

Update the subscriber count in `data/channel.json` whenever you like.

## Using the data in a mobile app

Everything the site shows comes from static JSON and Markdown, so your app can read the same URLs:

```
https://<username>.github.io/data/channel.json
https://<username>.github.io/data/courses.json
https://<username>.github.io/data/posts.json
https://<username>.github.io/posts/<slug>.md
```

Thumbnails: `https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg`, videos: `https://www.youtube.com/watch?v=<VIDEO_ID>`.
Publish once, and both the website and the app update together.
