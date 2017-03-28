## 1. stateful vs stateless

```js
'use strict';
import React from 'react';
require('styles\my\namespaced\components\Name1.css');
let Name1Component = () => (
  <div className="name1-component">
    Please edit src\components\my\namespaced\components\/Name1Component.js to update this component!
  <\/div>
);
Name1Component.displayName = 'MyNamespacedComponentsName1Component';
// Uncomment properties you need
// Name1Component.propTypes = {};
// Name1Component.defaultProps = {};
export default Name1Component;
```


```js
import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './name.cssmodule.css';
class Name extends React.Component {
  render() {
    return (
      <div className="name-component" styleName="name-component">
        Please edit src\components\my\namespaced\components\Name.js to update this component!
      <\/div>
    );
  }
}
Name.displayName = 'MyNamespacedComponentsName';
Name.propTypes = {};
Name.defaultProps = {};
export default cssmodules(Name, styles);
```
