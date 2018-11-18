# frontsideman-2018Q3

Implement show-hide functionality with write and delete cookie parameter

Implement move to next and previous tips functionality with a list with dots UI

As a param to init notifications - a title of bar and messages in the Array of Array like this:

`[['one', 'two', 'three'], ['four', 'five']]`

## Init example

1. Add script at the end of the html page.
2. Add styles below the js file.
3. Initialize notification in `<script>` tag.

### Params to init

    const title = 'Title of the tips';

    const messages = [['one', 'two', 'three'], ['four', 'five']];

    createNotificationBar(title, messages);

## Keyboard manipulation

  `Escape` button toggle show and hide view

  `Alt + left / right` arrows - move tips to next or previous one
