# Datetime input UI element

This directive is designed to provide easy and intuitive input of moment.js datetime objects.

Desgined to be as simple as possible in order to afford intuitive interactions.

Converted into an angular directive for your convenience :)

## Demo
Click <a href="https://rawgit.com/g1eb/angular-datetime-inputs/master/" target="_blank">here</a> for a live demo.

### Date input
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-inputs/master/images/date.png" alt="Angular directive datetime input - date input" width="300px">](https://rawgit.com/g1eb/angular-datetime-inputs/master/)

### Time input
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-inputs/master/images/time.png" alt="Angular directive datetime input - time input" width="300px">](https://rawgit.com/g1eb/angular-datetime-inputs/master/)

### Datetime input
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-inputs/master/images/datetime.png" alt="Angular directive datetime input - datetime input" width="300px">](https://rawgit.com/g1eb/angular-datetime-inputs/master/)

## Install

1) Install 'angular-datetime-inputs' with bower

```
bower install angular-datetime-inputs
```

or with npm

```
npm install angular-datetime-inputs
```

2) Add 'g1b.datetime-inputs' module to your app config


```javascript
angular.module('myApp', [
  'g1b.datetime-inputs',
  ......
])
```

3) Use any of the directives in a view

For date input only:
```html
<date-input date="date" on-change="print(date)" placeholder="Select date"></date-input>
```

For time input only:
```html
<time-input time="time" on-change="print(time)" placeholder="Select time"></time-input>
```

For both date and time input:
```html
<datetime-input datetime="datetime" on-change="print(datetime)" placeholder="Select datetime"></datetime-input>
```

### Attributes

|Property        | Usage           | Default  | Required |
|:------------- |:-------------|:-----:|:-----:|
| date | moment.js datetime object or a datetime string | none | no |
| time | moment.js datetime object or a datetime string | none | no |
| datetime | moment.js datetime object or a datetime string | none | no |
| format | [moment.js compatible date/time format](https://momentjs.com/docs/#/displaying/format/) used for parsing initial datetime objects | none | no |
| date-format | [moment.js compatible date format](https://momentjs.com/docs/#/displaying/format/) used for display in date and datetime input directives | 'DD MMMM YYYY' | no |
| time-format | [moment.js compatible time format](https://momentjs.com/docs/#/displaying/format/) used for display in time and datetime input directives | 'HH : mm : ss' | no |
| min-date | moment.js datetime object min datetime | none | no |
| max-date | moment.js datetime object max datetime | none | no |
| hourStep | step size for hour input | 1 | no |
| minuteStep | step size for minute input | 1 | no |
| secondStep | step size for second input | 1 | no |
| placeholder | Placeholder is shown when input object is undefined | none | no |
| allowClear | Allow users to clear selected datetime value | false | no |
| clearText | Clear text shown in the button to clear date object | none | no |
| on-change | Handler function that is fired on change of datetime object | none | no |
| on-close | Handler function that is fired on close of the edit popover | none | no |
| css-class | custom css class name for datetime presentation | predefined | no |

## Dependencies

* [AngularJS](https://angularjs.org/)
* [moment.js](http://momentjs.com/)
* [angular-scroll-events](https://github.com/g1eb/angular-scroll-events)
