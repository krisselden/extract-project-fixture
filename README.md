# extract-project-fixture

Extracts the node_modules and workspaces structure from a project into a tgz file.

## Usage

This will build a tgz file from the node_modules workspaces with only the package.json and directories with symlinks as it is on disk.

```sh
extract-project-fixture path/to/my-project out
```

You can list the contents with

```
tar -tz <out/my-project.tgz
```
