# @giovannapilon/mylib

A small example Node.js module that creates simple SVGs using a key string. It is intended as an illustrative example for learning how to create an NPM module with ESM imports and export a default object.

## Usage

Install (when published):
```
npm install @giovannapilon/mylib
```

Use:
```js
import lib from '@giovannapilon/mylib';

console.log(lib.getSVG('ana123'));
```

Local test:
```
cd mylib
node ./teste.js ana123
```

Local development (link the module so it can be used in another local project):
```
# inside mylib
npm link

# inside consumer project folder
npm link @giovannapilon/mylib
```

You can also create a tarball and try to install it in a local test project:
```
# inside mylib
npm pack
# then in consumer project
npm install ../path/to/@giovannapilon-mylib-1.0.0.tgz
```

## Publish
1. Log in to NPM: `npm login`
2. Check if the package name is available: `npm view @giovannapilon/mylib`
3. Publish: `npm publish --access public`
4. If publishing a new version, update `version` in `package.json`.

## Notes & Good Practices
- The package is scoped under `@giovannapilon`.
- `type: "module"` enables ESM imports/exports.
- Ensure your git repo is initialized and in sync with GitHub before publishing.
- Add `repository` and `bugs` fields to `package.json` so users can see where to file issues.
- Consider a `prepublishOnly` script to run tests/builds automatically before publishing.
