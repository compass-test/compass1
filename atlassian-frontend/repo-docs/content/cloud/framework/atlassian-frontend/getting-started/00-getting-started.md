---
date: '2021-09-27'
---

# Welcome to Atlassian-Frontend!

{{% tip %}}
If you prefer a video getting-started guide, please watch our latest [Atlassian Frontend Build Session](https://hello.atlassian.net/wiki/spaces/AFP/pages/908936674/Atlassian+Frontend+Build+Session) recording.
{{% /tip %}}

## Access

### Repository access

All Atlassian employees will have read access by default,
developers will also have write access by default. If you are not a developer but still require write access. Or if for some other reason you don't have write access, please follow the instructions on this page: [Get repo access](https://hello.atlassian.net/wiki/spaces/AF/pages/632236138/Get+Repo+Access)

### Landkid access

To request Landkid access follow these steps:

1. Perform auth dance on http://go/af-landkid
2. On Slack join the #atlassian-frontend channel
3. Ask access in there and please mention your team and what packages you'll be working on.

## Dev Environment

_Everything you need to know to get up and running with Atlassian Frontend_

- [git](https://git-scm.com/) version 2 or above for version control management.
- [git-lfs](https://git-lfs.github.com/) version 2.10 or above for version control management of large files.
- [node](https://nodejs.org/) version should be as listed in .nvmrc (we recommend using [nvm](https://github.com/creationix/nvm)). Run `nvm use` in the root directory to install the correct version of node.
- [yarn](https://yarnpkg.com/) version 1 or above.
- [bolt](https://github.com/boltpkg/bolt) version 0.20 or above.

To clone the repository, open up your terminal and run the following:

```sh
git clone git@bitbucket.org:atlassian/atlassian-frontend.git
cd atlassian-frontend
```

Then you'll need both [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/) installed.

If you're on a Mac and have [Homebrew](https://brew.sh/) you can run:

```sh
brew install node yarn
```

> **Note:** You must be on Node >=8.4 and Yarn >=1.0

Then you can install [Bolt](https://github.com/boltpkg/bolt):

```sh
yarn global add bolt
```

Now that you have everything you need, you can bootstrap the Atlassian-Frontend repo:

```sh
cd atlassian-frontend
bolt install
```

This will take a minute or two the first time, but every subsequent run should
only take about a second.

There are two potential issues you could run into:

- No access to packages.atlassian.com; Install [atlas cli](https://developer.atlassian.com/platform/atlas-cli/users/install/) + [packages plugin](https://hello.atlassian.net/wiki/spaces/RELENG/pages/677899738/HOWTO+-+Set+up+your+local+dev+environment+to+work+with+packages.atlassian.com) then run `atlas packages secrets`

- `gyp: No Xcode or CLT version detected!`; You'll need to [reinstall xcode-select](https://hello.atlassian.net/wiki/spaces/~gtan/pages/738242517/Cannot+yarn+install+jira-frontend+-+gyp+No+Xcode+or+CLT+version+detected)

Since this is a git-lfs repo, install [git-lfs](https://www.atlassian.com/git/tutorials/git-lfs#installing-git-lfs).

You're now ready to start developing in Atlassian-Frontend!

### Linux / Mac / Windows

The main `bolt` / `bolt install` commands work on all platforms. However, custom commands may not work in a Windows environment (i.e. `bolt start`). For now, if you're running Windows, you'll have to do the following:

1. Run `bolt` / `bolt install` from `cmd.exe`. It doesn't work in WSL.
2. Run any custom commands from WSL. We haven't made our custom scripts cross-platform yet.

### Linux

It's possible that puppet-bolt is also installed. If it is then there will be a collision on the `$PATH` since both use `bolt` . It's recommended that you let puppet-bolt take priority (to avoid breaking things that depend on puppet-bolt) and alias "boltpkg/bolt" in your shell configuration file instead. e.g for bash or zsh add `alias node-bolt="$(yarn global bin)/bolt"` on a new line to your `~/.bashrc` or `~/.zshrc` file respectively. You may need to also add this alias if you haven't added packages that are globally installed with yarn to `$PATH`.

### IDE Setup

#### IntelliJ IDEA and WebStorm Performance Issues

After running `bolt install` you will most likely experiencing issues with IDE indexing taking forever. VSCode does not have this problem. If you do not want to change the IDE you use, do the following:

1. Close IntelliJ
1. run in terminal
   ```
   {find . -type d -name 'node_modules' | grep 'node_modules$' | grep -v 'node_modules/' | while read line ; do echo "<excludeFolder url=\"file://\$MODULE_DIR$/$line\" />"; done;} | pbcopy
   ```
   This will find paths to each node_modules/ folder in the project, create <excludeFolder> tags for each of them and copy resulting text to clipboard
1. Open `.idea/atlaskit-mk-2.iml` (or `.idea/atlassian-frontend.iml`) in your favorite text editor.
1. Pres Ctrl + V to paste text from clipboard after existing `<excludeFolder>` tags. Or paste inside `<content>` if you do not have `<excludeFolder>` tags. Save the file.
1. Open IntelliJ. You should be fine

Unfortunately, you will have to repeat this process if you pulled repository and new packages were introduced.

The root of this problem is in cyclical symbolic links between packages in node_modules, which exist because atlassian-frontend is a mono repository.
IntelliJ and WebStorm don't handle it properly. There are tickets raised in YouTrack to handle this situation.

#### VSCode Performance Issues

VSCode has a similar but not identical issue regarding following symlinks during searching, which can impact cause CPU spikes. If you're experiencing performance issues with VSCode try turning off this setting:

```
"search.followSymlinks": false
```

### Synchrony

_This step is not mandatory. If you don't have access for these steps, you can use our mock version to simulate a collab session._

##### How run Atlaskit website with Synchrony Collab Editing

Now you should install the required package globally. Keep in mind this is a private package and your should required access to download that. Since you have the proper access, install the package globally by running the command:

```
yarn global add @atlassian/prosemirror-synchrony-plugin
```

After that, link the package in website folder located in Atlaskit repository.

```
# access your global package and create the link using yarn
cd "\$(yarn global dir)/node_modules/@atlassian/prosemirror-synchrony-plugin" && yarn link
# now move back to your atlaskit repository, access the folder `website`
# and link the folder with the required package
cd <your-atlaskit-folder>/packages/editor/synchrony-test-helpers && yarn link "@atlassian/prosemirror-synchrony-plugin"
```

Then, go back to the root folder of Atlaskit repository, rerun the website again passing 'SYNCHRONY_URL={URL}' environment variable as a prefix for your command.

```
cd <your-atlaskit-folder> # access your atlaskit repository locally
SYNCHRONY_URL={URL} bolt <your-command> # run your command locally
```

##### How to setup a local synchrony server

Check out the [How to guide](https://product-fabric.atlassian.net/wiki/spaces/E/pages/993887832/HOWTO+Getting+up+a+local+Synchrony+Server)

#### Analytics

Related reading:

- <https://atlaskit.atlassian.com/packages/core/analytics-next/docs/concepts>
- <https://atlaskit.atlassian.com/packages/core/analytics>

_This step is not mandatory. If you don't have access for these steps, you can add the analytics integration in our components and check output in your dev tools console._

##### How run Atlaskit website with Analytics platform

Many of our components support analytics out of the box. These components create analytics events and hand them to you. This puts you in control of firing, listening and recording these events in which ever way you like.

For a better developer experience via the "Atlassian - Analytics Dev Panel" Chrome extension you can enable full analytics integration.
After installing the extension and restarting Chrome, run the website passing the `ENABLE_ANALYTICS_GASV3=true` environment variable or the `--enable=analytics` flag.

```sh
ENABLE_ANALYTICS_GASV3=true bolt start buttton
bolt start editor-core --enable=analytics
```

## Release Process

The repository has two releases models:

- **Continuous:** In a continuous release model a new version is released every time a change to a package is landed. Teams following this model target their PRs at `master` and a new version will be published automatically when the PR is merged. By default most teams follow this model.
- **Scheduled:** Some teams (primarily Editor, Media and Design System) follow a scheduled release process. They only release new versions of their packages once every three weeks. This makes it easier to keep products up to date. They target their PRs at `develop`. Every two weeks a `release-candidate` branch is created from `develop` which is stabilised and tested for a week before being merged into `master` at the end of each cycle. More info on the process can be found [here][scheduled-releases] and the schedule can be found [here][schedule].

[scheduled-releases]: https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/986055983
[schedule]: https://product-fabric.atlassian.net/secure/Roadmap.jspa?projectKey=FABDODGEM&rapidView=386

## FAQ

We will use this page to answer any frequently asked questions or common pitfalls / mistakes when developing.

If you find an issue that isnt addressed in this page, feel free to add it!

Related reading:

- [versioning](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/#4--versioning)
- [releasing-packages](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/#releasing-packages-1)

##### Why can't I create a branch to create a pull request? Should I fork this repository?

Please don't fork this repository for pull requests. Instead, follow [get access to the repo](https://hello.atlassian.net/wiki/spaces/AF/pages/632236138/Get+Repo+Access) page.

##### How do I release a change once it's merged?

See the related reading above^ ([releasing-packages](ttps://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/#releasing-packages-1)) (hopefully before you've merged...).
