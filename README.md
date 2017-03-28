# className for css/less relevant to path you supplied to `yo`

```less
.<%= style.className %> {
  border: 1px dashed #f00;
}
```

# className for components relevant to path you supplied to `yo`

```js
import React from 'react';
class <%= component.className %> extends <%= component.classBase %> {
  render() {
    return (
      <div className="<%= style.className %>">
        Please edit <%= component.path %><%= component.fileName %> to update this component!
      <\/div>
    );
  }
}
<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};
export default <%= component.className %>;
```

we use ejs template engine to render this template file!

# component.webpackPath 

```js
import <%= component.className %> from '<%= component.webpackPath %>';
```

This is path used for `webpack` to bundle react files.

```js
   webpackPath: path.normalize(`components/${componentPartPath}/${componentBaseName}.js`)
```

# dev模式会指定我们的html文件