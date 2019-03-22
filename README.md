# gameplan-gameplan

A gameplan template to create [gameplan](https://github.com/ksmithut/create-gameplan)
templates.

# Usage

```
yarn create gameplan https://github.com/ksmithut/gameplan-gameplan <foldername> --prompt
```

```
npm init gameplan https://github.com/ksmithut/gameplan-gameplan <foldername> --prompt
```

Then change your gameplan to your liking, commit your changes, publish to
a centralized git repo store (such as github or gitlab). You can now run your
gameplan from the command line!

```
yarn create gameplan https://github.com/<your-user>/<your-repo> <foldername>
```

# Options

```
yarn create gameplan https://github.com/ksmithut/gameplan-gameplan <foldername> --- [options]
```

These options go after the bash flag terminator, which is `--` for `npm init`
and `---` for `yarn create`

- `--name <name>` The name of the gameplan you want to create
- `--description <description>` The description of the gameplan you want to create
