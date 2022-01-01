# evn.ly

A nodejs module for loading `.env` file into `process.env`.

### Usage

#### Typical usage

```javascript
require("env.ly").load();
```

For this, the `.env` file needs to be in the current working directory and any preset variable in `process.env` will not be overwritten.

#### Force Overwriting, Debugging and Specifying .env directory path

To force overwriting of preset variables:

```javascript
require("env.ly").load({force: true});
```

To log out information for debug purposes

```javascript
require("env.ly").load({debug: true});
```

To specify directory path of your `.env` file *(defaults to current working directory of your project)*.

```javascript
require("env.ly").load({pathToEnv: '/tmp/files/'});
```

#### Complete Options

```javascript
require("env.ly").load({pathToEnv: '/tmp/files/', force: true, debug: true});
```

### Your .env file

Your `.env` file should have variables in the format `key=value` separated by new line. There should not be quotes around your value (unless you intend it to be so).

> NOTE: do NOT include comment in your .env file.
> 
> Do NOT include quotes in your value (unless you intend it to be so).

```javascript
FOO=This is foo! //resolves to FOO:"This is foo!"
BAR=This is the legendary bar that is = to pi //resolves to BAR:"This is the legendary bar that is = to pi"
FOO = This is foo! //resolves to FOO:"This is foo!"
BAR="This is the legendary bar that is = to pi" //resolves to BAR:'"This is the legendary bar that is = to pi"'
FOO= //resolves to FOO:""
```

```javascript
//These will not resolve
FOO //fails to resolve
"BOO"="This boy" //fails to resolve
```