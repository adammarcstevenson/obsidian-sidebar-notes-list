# Private/Public Git Workflow Cheat Sheet

## Your Remote Setup
```sh
private https://github.com/adammarcstevenson/obsidian-sidebar-notes-list-private.git (full history)
public  https://github.com/adammarcstevenson/obsidian-sidebar-notes-list.git (clean commits)
```

## Repository Roles
- **Private repo**: Your detailed workspace with complete commit history (source of truth)
- **Public repo**: Polished, clean commits for public consumption
- **Workflow direction**: Private main → Local → Public main (when ready)

## Daily Development Workflow

### Starting New Work
```sh
# 1. Always start from private main (your source of truth)
git checkout main
git pull private main       # Get latest from private (full history)

# 2. Create feature branch
git checkout -b feature-your-feature-name
```

### Working on Features (Detailed Commits)
```sh
# Make small, frequent commits to track your progress
git add .
git commit -m "WIP: trying new approach for sidebar rendering"
git push private feature-your-feature-name

# Continue with more detailed commits
git commit -m "Debug: add console logs to track state"
git push private feature-your-feature-name

git commit -m "Fix: handle edge case when no notes exist"
git push private feature-your-feature-name
```

### Completing Feature Work (Keep Full History)
```sh
# Merge completed feature back to private main
git checkout main
git pull private main
git merge feature-your-feature-name
git push private main

# Clean up feature branch
git branch -d feature-your-feature-name
```

### Publishing Clean Updates to Public Repo

#### When Ready to Share Work Publicly
```sh
# 1. Start from updated private main
git checkout main
git pull private main

# 2. Create clean branch for public
git checkout -b clean-for-public

# 3. Squash recent commits into clean, logical commits
git rebase -i HEAD~5        # Adjust number for commits to squash

# 4. Push clean version to public
git push public clean-for-public:main

# 5. Clean up
git checkout main
git branch -d clean-for-public
```

#### Alternative: Cherry-pick Specific Clean Commits
```sh
# If you already have clean commits to share
git checkout main
git push public main        # Only when commits are already clean
```

## Maintenance Commands

### Sync Main Branch (Private is Source of Truth)
```sh
# Keep local main in sync with private main
git checkout main
git pull private main       # Get latest from private (full history)
```

### Emergency: Reset Local to Match Private
```sh
git fetch private
git reset --hard private/main
```

## Useful Aliases
Add these to your `.gitconfig`:

```sh
git config alias.push-private '!git push private $(git branch --show-current)'
git config alias.sync-main '!git checkout main && git pull private main'
git config alias.push-clean-to-public '!git push public main'
git config alias.prepare-public '!git checkout -b clean-for-public'
```

Then use:
- `git push-private` - Push current branch to private
- `git sync-main` - Sync main from private (source of truth)
- `git push-clean-to-public` - Push current clean commits to public
- `git prepare-public` - Create branch for preparing public release

## Branch Strategy

### ✅ DO
- Always work on feature branches, never directly on main
- Push work-in-progress frequently to private repo
- Use descriptive commit messages in private (WIP, Debug, Fix, etc.)
- Keep complete history in private repo - it's your detailed workspace
- Merge completed features back to private main
- Only push to public when you have clean, logical commits to share
- Treat private repo as the "source of truth" for your work

### ❌ DON'T
- Don't commit directly to main branch
- Don't push work-in-progress or messy commits to public repo
- Don't lose your detailed commit history from private
- Don't use `git push --force` unless you understand the consequences
- Don't sync public TO private (direction should be private → public)

## Troubleshooting

### "Divergent branches" error
```sh
# If you get this error with private repo:
git pull --rebase private main    # Rebase your changes on private
git pull --no-ff private main     # Create merge commit  
git reset --hard private/main     # Force match private (lose local changes)
```

### Lost work recovery
```sh
git reflog                        # See recent commits
git checkout <commit-hash>        # Recover lost commits
git branch recovery-branch        # Save recovered work
```

## Quick Reference

| Action | Command |
|--------|---------|
| Start new feature | `git sync-main && git checkout -b feature-name` |
| Save progress | `git add . && git commit -m "WIP: description" && git push-private` |
| Complete feature | `git checkout main && git merge feature-name && git push private main` |
| Prepare for public | `git prepare-public && git rebase -i HEAD~5` |
| Publish to public | `git push-clean-to-public` |
| Sync from private | `git sync-main` |