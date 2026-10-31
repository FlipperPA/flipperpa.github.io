---
title: "Removing Merged git Branches"
layout: post
date: 2020-01-17 16:30:00
tags: ["Python", "How-To", "Linux"]
description: "If you're like me, your git branches can get out of control over time. Here's some bash sorcery which will give a list of all branches that have been merged to origin/master."
---

This is my attempt to put together a bash routine to clean up my remote and local git branches.

It should:

- Return a list of branches merged to `origin/master`
- Remove any branches named develop, stage, or master from the list
- Ensure that the branches haven't been modified in the past four weeks
- Print the branch to the screen

For anyone feeling confident that this script works for them, I've also included commands to delete the branches locally and on the remote repository commented out.

Your mileage may vary... use with extreme care!

```bash
for k in $(
    git branch --remote --merged origin/master | fgrep origin | grep -v -E -- 'develop|stage|master' | sed /\*/d
); do 
  if (($(git log -1 --since='4 weeks ago' -s $k|wc -l)==0)); then
    # Use bash to replace 'origin/' with '' and assign to $branch
    branch=${k/origin\//}
    echo $branch
    # git push origin --delete $branch
    # git branch -d $branch
  fi
done
```
