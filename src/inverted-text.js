"use strict"

class InvertedText {

  constructor(options, callback, everyResize) {
    this.callback = callback;
    this.everyResize = everyResize;
    this.image_wrapper_id = options.image_wrapper_id || 'img-wrapper';
    this.invert = options.invert || 100;
    this.saturate = options.saturate || 100;
    this.contrast = options.contrast || 1000;
    this.grayscale = options.grayscale || 200;

    window.addEventListener("load", () => {
      this.bidibibodibibu(options, this.callback);
    }, false);

    window.addEventListener("resize", () => {
      this.bidibibodibibu(options, this.everyResize);
      this.everyResize();
    }, false);

  }

  bidibibodibibu(options, fn) {
    let wrapper = document.getElementById(this.image_wrapper_id);
    let textNodes = this.getAllTextNodes(wrapper);
    let img_src_url = wrapper.style.backgroundImage;

    img_src_url = img_src_url.substring(img_src_url.indexOf('"') + 1, img_src_url.length);
    img_src_url = img_src_url.substring(0, img_src_url.indexOf('"'));

    let wrapper_bg_data = this.wrapper.style.backgroundPosition;
    let wrapper_bg_x = parseInt(wrapper_bg_data.split(" ")[0]);
    let wrapper_bg_y = parseInt(wrapper_bg_data.split(" ")[1]);

    for (var i = 0; i < textNodes.length; i++) {
      let node = textNodes[i];
      node.style.color = 'transparent';
      node.style.position = 'absolute';
      node.style.backgroundImage = 'url(' + img_src_url + ')';
      node.style.webkitBackgroundClip = 'text';
      node.style.filter = 'invert('+this.invert+'%) grayscale('+this.grayscale+'%) contrast('+this.contrast+'%) saturate('+this.saturate+')';

      let node_bg_x = node.offsetLeft, node_bg_y = node.offsetTop;
      let img = new Image();
      img.src = img_src_url;

      if(wrapper_bg_data.length > 0) {
        node_bg_x -= wrapper_bg_x || 0;
        node_bg_y -= wrapper_bg_y || 0;
      }

      node.style.backgroundPosition = ((node_bg_x) * (-1)) + 'px ' + ((node_bg_y) * (-1)) + 'px';

    }
    fn();
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
