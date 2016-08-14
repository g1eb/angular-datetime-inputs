# Datetime input UI element

This directive is designed to provide easy and intuitive input of moment.js datetime objects.

Desgined to be as simple as possible to afford intuitive interactions.

Converted into an angular directive for your convenience :)

## Demo
Click <a href="https://rawgit.com/g1eb/angular-datetime-input/master/" target="_blank">here</a> for a live demo.

## Installation

1) Install 'angular-datetime-input' with bower

```
bower install angular-datetime-input
```

2) Add 'g1b.datetime-input' module to your app config


```javascript
angular.module('myApp', [
  'g1b.datetime-input',
  ......
])
```

3) Use 'datetime-input' directive in a view

```html
<datetime-input start="start" end="end" on-change="print(start, end)"></datetime-input>
```

### Attributes

|Property        | Usage           | Default  | Required |
|:------------- |:-------------|:-----:|:-----:|
| datetime | moment.js datetime object or a datetime string | none | yes |
| placeholder | Placeholder is shown when input object is undefined | none | no |
| on-change | Handler function that is fired on change of datetime object | none | no |

## Dependencies

* [AngularJS](https://angularjs.org/)
* [moment.js](http://momentjs.com/)
