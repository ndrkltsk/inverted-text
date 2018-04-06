"use strict"

class InvertedText {

  constructor(options, callback, everyResize) {
    this.options = options;
    this.callback = callback;
    this.everyResize = everyResize;

    if(options != undefined) {
      this.image_wrapper_id = options.image_wrapper_id || 'img-wrapper';
      this.invert = options.invert || 100;
      this.saturate = options.saturate || 100;
      this.contrast = options.contrast || 1000;
      this.grayscale = options.grayscale || 200;
    }

    window.addEventListener("load", () => {
      this.bidibibodibibu(options, this.callback);
    }, false);

    window.addEventListener("resize", () => {
      this.bidibibodibibu(options, this.everyResize);
      this.everyResize();
    }, false);

    return this;

  }

  bidibibodibibu(options, fn) {
    console.log("render");
    this.wrapper = document.getElementById(this.image_wrapper_id);
    this.textNodes = this.getAllTextNodes(this.wrapper);

    let img_src_url = this.wrapper.style.backgroundImage;

    img_src_url = img_src_url.substring(img_src_url.indexOf('"') + 1, img_src_url.length);
    img_src_url = img_src_url.substring(0, img_src_url.indexOf('"'));

    this.wrapper_bg_data = this.wrapper.style.backgroundPosition;
    this.wrapper_bg_x = parseInt(this.wrapper_bg_data.split(" ")[0]);
    this.wrapper_bg_y = parseInt(this.wrapper_bg_data.split(" ")[1]);

    for (var i = 0; i < this.textNodes.length; i++) {
      let node = this.textNodes[i];
      node.style.color = 'transparent';
      node.style.position = 'absolute';
      node.style.backgroundImage = 'url(' + img_src_url + ')';
      node.style.webkitBackgroundClip = 'text';
      node.style.filter = 'invert('+this.invert+'%) grayscale('+this.grayscale+'%) contrast('+this.contrast+'%) saturate('+this.saturate+')';

      let img = new Image();
      img.src = img_src_url;

      let node_bg_x = node.offsetLeft, node_bg_y = node.offsetTop;

      if(this.wrapper_bg_data.length > 0) {
        node_bg_x -= this.wrapper_bg_x || 0;
        node_bg_y -= this.wrapper_bg_y || 0;
      }

      node.style.backgroundPosition = ((node_bg_x) * (-1)) + 'px ' + ((node_bg_y) * (-1)) + 'px';

    }

    if(fn != undefined || fn != null)
      fn(this);
  }

  update(eachCallback, callback) {

    for (var i = 0; i < this.textNodes.length; i++) {
      let node = this.textNodes[i];
      let node_bg_x = node.offsetLeft, node_bg_y = node.offsetTop;
      if(this.wrapper_bg_data.length > 0) {
        node_bg_x -= this.wrapper_bg_x || 0;
        node_bg_y -= this.wrapper_bg_y || 0;
      }
      node.style.backgroundPosition = ((node_bg_x) * (-1)) + 'px ' + ((node_bg_y) * (-1)) + 'px';

      if(eachCallback != undefined || eachCallback != null)
        eachCallback();
    }

    if(callback != undefined || callback != null)
      callback();

  }

  getAllTextNodes(node){
    var A= [];
    if(node){
        node= node.firstChild;
        while(node!= null){
            if(node.nodeType != 3) {
              A = A.concat(this.getAllTextNodes(node));
              A[A.length]=node;
            }
            node= node.nextSibling;
        }
    }
    return A;
  }

}

module.exports = InvertedText;
