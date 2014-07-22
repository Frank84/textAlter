textAlter
==========

**textAlter** is a simple javascript script to alter the character of a block of text with random characters.

### Usage ###

Include [textalter.jquery.min.js] on your webpage.

```html
<script src="js/textalter.jquery.min.js"></script>
```

Use the method textAlter on a text selector.

```html
<p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea a quo placeat necessitatibus, aliquid sint molestiae?</p>
<script>
	(function() {
		$('input').click(function() { $('.text').textAlter(); });
	})();
</script>
```
