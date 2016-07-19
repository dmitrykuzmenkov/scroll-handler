# scroll-handler
Smooth scroll handler

## Install
Use npm to install just run

```bash
npm install scroll-handler
```

## Usage
```javascript
var sh = require('scroll-handler');
sh({
  // Execute on start scrolling
  start: function(e, top) {
    console.log('Event', e, 'Scroll top', top);
  },
  // Execute on stop scrolling
  stop: ...
  // Execute periodicaly
  interval: ...
});
```
