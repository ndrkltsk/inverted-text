"use strict"

class InvertedText {

  constructor(options) {
    console.log(options);
    this.image_wrapper_id = options.image_wrapper_id || 'img-wrapper';
    this.invert = options.invert || 100;
    this.saturate = options.saturate || 100;
    this.contrast = options.contrast || 1000;
    this.grayscale = options.grayscale || 200;


    window.addEventListener("load", () => {
      this.bidibibodibibu(options);
    }, false);

    window.addEventListener("resize", () => {
      this.bidibibodibibu(options);
    }, false);


  }

  bidibibodibibu(options) {
    let wrapper = document.getElementById(this.image_wrapper_id);
    let textNodes = this.getAllTextNodes(wrapper);
    let img_src_url = wrapper.style.backgroundImage;

    img_src_url = img_src_url.substring(img_src_url.indexOf('"') + 1, img_src_url.length);
    img_src_url = img_src_url.substring(0, img_src_url.indexOf('"'));

    let wrapper_bg_data = wrapper.style.backgroundPosition;
    let wrapper_bg_x = parseInt(wrapper_bg_data.split(" ")[0]);
    let wrapper_bg_y = parseInt(wrapper_bg_data.split(" ")[1]);


    for (var i = 0; i < textNodes.length; i++) {
      let node = textNodes[i];

      node.style.color = 'transparent';
      node.style.backgroundImage = 'url(' + img_src_url + ')';
      node.style.webkitBackgroundClip = 'text';
      node.style.filter = 'invert('+this.invert+'%) grayscale('+this.grayscale+'%) contrast('+this.contrast+'%) saturate('+this.saturate+')';

      let img = new Image();
      img.src = img_src_url;

      let test = img.width/wrapper.offsetWidth;


      let node_bg_x = node.offsetLeft, node_bg_y = node.offsetTop;

      console.log(node_bg_x, node_bg_y, wrapper_bg_x, wrapper_bg_y);

      if(wrapper_bg_data.length > 0) {
        node_bg_x -= wrapper_bg_x || 0;
        node_bg_y -= wrapper_bg_y || 0;
      }

      console.log(node_bg_x, node_bg_y, wrapper_bg_x, wrapper_bg_y);







      node.style.backgroundPosition = ((node_bg_x) * (-1)) + 'px ' + ((node_bg_y) * (-1)) + 'px';

    }

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
