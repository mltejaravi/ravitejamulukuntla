Git is the tool every developer uses every day, yet most of that daily work needs only a dozen commands. Here's the quick version of my Git session, plus a cheat sheet you can keep open.

## Step 1: Tell Git who you are

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## Step 2: Create an SSH key for GitHub

SSH keys let you push to GitHub without typing a password every time.

```bash
ssh-keygen -t ed25519 -C "you@example.com"
# press Enter to accept the default location (~/.ssh/id_ed25519)
```

Start the agent and add your key:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Copy the **public** key:

```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub
# Windows (Git Bash)
clip < ~/.ssh/id_ed25519.pub
```

On GitHub go to **Settings → SSH and GPG keys → New SSH key**, paste it and save. Then test the connection:

```bash
ssh -T git@github.com
# Hi username! You've successfully authenticated…
```

> Never share the file **without** `.pub`. That is your private key.

## Step 3: The everyday workflow

```bash
git clone git@github.com:username/my-project.git
cd my-project

git switch -c feature/login      # create and switch to a new branch
# …edit files…
git status                       # what changed?
git add .                        # stage everything
git commit -m "Add login page"   # save a snapshot
git push -u origin feature/login # publish the branch
```

## Cheat sheet

| Command | What it does |
|---|---|
| `git init` | Start a new repository in the current folder |
| `git clone <url>` | Copy a remote repository to your machine |
| `git status` | Show changed and staged files |
| `git add <file>` | Stage a file for the next commit |
| `git commit -m "msg"` | Save staged changes as a commit |
| `git log --oneline --graph` | Compact visual history |
| `git diff` | Show unstaged changes |
| `git branch` | List branches |
| `git switch <branch>` | Move to another branch |
| `git merge <branch>` | Merge a branch into the current one |
| `git pull` | Fetch and merge remote changes |
| `git push` | Upload your commits |
| `git stash` / `git stash pop` | Park changes temporarily and bring them back |
| `git restore <file>` | Discard changes in a file |

## Undo mistakes safely

```bash
git restore --staged file.txt   # unstage, keep your changes
git commit --amend              # fix the last commit message (before pushing)
git revert <commit>             # undo a pushed commit with a new commit
```

Watch the 15-minute video above to see every one of these commands in action.
