# Description

This is prompt course for advanced JavaScript topics.

Please use https://notebooklm.google.com/

## Generate a single prompt file

```shell
    npm install -g yamlinc

    yamlinc javascript.yml

    snap install yq

    yq -o=json . javascript.inc.yml > course.json
```

Single command

```shell
    yamlinc javascript.yml & yq -o=json . javascript.inc.yml > course.json
```
