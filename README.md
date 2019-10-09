# Follow menu

Plugin JavaScript - Affiche une barre suiveuse au survol d'un élément de menu.

## Features

* IE8+ compliant
* ARIA


## Installation

### 1. Join plugin

```html
<script src="follow-menu.js"></script>
```

```html
<div class="menu-wrap">
  <ul class="menu">
    <li><a href="#">Lorem ipsum</a></li>
    <li><a href="#">Lorem ipsum dolor sit amet</a></li>
    <li><a href="#" class="menu__item--is-active">Lorem, ipsum</a></li>
    <li><a href="#">Lorem ipsum dolor sit amet consectetur</a></li>
    <li><a href="#">L</a></li>
  </ul>
  <span class="menu__indicator"></span>
</div>
```


### 2. SCSS

```css
.menu {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  padding: 0;
  list-style: none;
  margin: 0 auto;
}

.menu li {
  margin-bottom: 2rem;
}

.menu a {
  display: block;
  padding: 1rem 2rem;
  color: #000;
  background: #f5f5f5;
  text-decoration: none;
}

.menu__item--is-active {
  font-weight: bold;
}

.menu-wrap {
  position: relative;
  padding: 2rem;
}

.menu__indicator {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 4px;
  background: #f00;
  transform-origin: 0 0;
}

.follow-menu--init .menu__indicator {
  transition: all 300ms ease-out;
}

```


### 3. JavaScript

```js
followMenu('.menu-wrap', {
  'item_tag': 'a',
  'active_class': 'menu__item--is-active'
});
```


```js
// Absolute positionning.
$('#trigger').togglePanel({
  panel: 'id',
  event: 'click',
  mode: 'custom',
  customShow: function($panel, $trigger) {

    $panel.position({
      of: $trigger,
      my: 'left top',
      at: 'left bottom'
    });

  },
  autoFocus: false,
  panelLabel: 'Recherche'
});
```



### 4. Options

Name                    | Type         | Description                                                 | Default or options
------------------------|--------------|-------------------------------------------------------------|-------------------
prefix                  | String       | Generated classes prefix                                    | 'follow-menu-'
indicator               | CSS Selector | Target the indicator element                                | '.menu__indicator'
item_tag                | Tag          | Tag of the menu items                                       | 'li'
active_class            | CSS Selector | Active class                                                | '.is-active'
