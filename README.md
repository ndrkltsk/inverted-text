
# inverted-text
Set custom inverted background texture to text on images

### Examples
![](https://media.giphy.com/media/BppJCuTwSSJ6RR9XtK/giphy.gif)
![](https://media.giphy.com/media/25QTZ9dH8vXwJvRM8g/giphy.gif)

## Install
```
npm i inverted-text
```

## Configuration
Use the HTML code below to display a image.  Set the appropriate dimensions to the div.
```html
<div id="img-wrapper" style="background-image: url('image.jpg'); width: 100%; height: 400px">
      <p>Text</p>
      ...
</div>
```
then use the following javascript code  to do your magic:
```javascript
let InvertedText = require('inverted-text');
new InvertedText();
```
It automatically search for a `div` with `id="img-wrapper`. Use the options to set a different id.
The invert texture effect is applied to all the HTML text nodes tags inside the image wrapper div, so nothing is done if the text is not inside a tag.

*eg*
```javascript
new InvertedText({
  image_wrapper_id: "wrp", greyscale: 200, contrast: 1000, saturate: 100, invert: 100},
  (invt) => {
  let text = document.getElementById('text');

  setTimeout( () => {
    text.style.right = '800px';

    let updateInterval = setInterval(() => {
      invt.update(null, () => console.log("updated"));
    }, 10);

    setTimeout( () => {
      clearInterval(updateInterval);
      invt.update(null, () => console.log("updated"));
    }, 1000);
  }, 1000);

 },
 (invt) => console.log("resize", invt)
);
```
<br>

 The `position` property of every text node is setted to `absolute`, while the `position` property of the wrapper div is setted to `relative`. The text nodes can be positioned inside the wrapper by `top`, `left`, `bottom`, `right` properties

<br>



## Details
#### Create a new Object
```javascript
new InvertedText(options, [onLoaded], [everyResize]);
```
**options** is a obj with the following parameters:
 - **image_wrapper_id** *String* - id of the image wrapper div.
 - **greyscale** *Number* - value of CSS filter  property greyscale
 - **contrast** *Number* - value of CSS filter  property contrast
 - **saturate** *Number*  - value of CSS filter  property saturate
 - **invert** *Number* - value of CSS filter  property invert

```javascript
{
  image_wrapper_id: "wrp",
  greyscale: 200,
  contrast: 1000,
  saturate: 100,
  invert: 100
}
```
**onLoaded** *function* - called when the rendering process is finished
**everyResize** *function* - called when the screen is resized

<br><br>
#### Update a rendered text

```javascript
function update([eachCallback], [callback])
```
<br><br>
#### Check for options and render the text. It is called by the constructor

```javascript
function bidibibodibibu(options, [callback])
```
<br><br>
#### Get all text nodes in the node
```javascript
function getAllTextNodes(node)
```
