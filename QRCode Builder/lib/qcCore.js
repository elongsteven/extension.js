/* QRCore Builder v1.0.0 | By Elong | 2021.6.9 */

/**
 * 方法：union(qr, imgTag, qrWH, imgWH)
 * 参数：
 *    qr:二维码
 *    imgTag:图片的标签
 *    qrWH:二维码的宽高
 */
function union(qrBase, imgBase, WH, C) {

  console.log('qrBase',qrBase);
  console.log('imgBase',imgBase);
  console.log('WH',WH);
  console.log('C',C);

  var img2 = new Image();
  img2.src = imgBase;

  // 第二画布
  var canvas2 = document.getElementById("canvas2");
  var ctx = canvas2.getContext("2d");

  function roundRect(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.clip()
      // x：矩形左上角的横坐标（非圆角矩形时左上角横坐标）。
      // y：矩形左上角的纵坐标（非圆角矩形时左上角纵坐标）。
      // w：矩形的宽度。
      // h：矩形的高度。
      // r：圆角所处圆的半径尺寸。理解上面自定义方法的关键在于对它所用到方法的理解。
  }
  roundRect(0, 0, WH / C, WH / C, WH / C / 5);
  ctx.drawImage(img2, 0, 0, WH / C, WH / C);

  var newImg0 = new Image();
  newImg0.src = canvas2.toDataURL("image/png");

  var img1 = new Image();
  img1.src = qrBase;

  // 合成画布（主画布）
  var canvas1 = document.getElementById("canvas1");
  var context1 = canvas1.getContext("2d");

  context1.drawImage(img1, 0, 0, WH, WH);
  context1.drawImage(newImg0, WH / C, WH / C, WH / C, WH / C);
  // - (WH / 3 / 2)

  var newImg = new Image();
  newImg.src = canvas1.toDataURL("image/png");
  $("#imgBlock").attr("src", newImg.src);
  // console.log(newImg.src);
}