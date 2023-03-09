First_call();
function generate(options, cb) {
  var e = options,
    t = m(e);
  if (!t) return !1;
  var i = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (i.width = i.clientWidth),
    (i.height = i.clientHeight),
    (a.width = t.width || i.clientWidth),
    (a.height = t.height || i.clientHeight);
  var n = i.getContext("2d"),
    r = a.getContext("2d");
  C(i), (r.fillStyle = t.background), r.fillRect(0, 0, a.width, a.height);
  var l = c(t),
    f = w(l, t);
  s(l, a, f, t);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  var u = bestImageFit(a.width, a.height, i.width, i.height);
  n.drawImage(a, u.offsetX, u.offsetY, u.width, u.height);
  function c(e) {
    return e.iterations == 1
      ? "FA"
      : new LSystem({
          axiom: "FA",
          productions: { A: "A+BF+", B: "-FA-B" },
        }).iterate(e.iterations - 1);
  }
  function w(e, t) {
    return o({
      drawCurve: !1,
      rules: e,
      draw: t.draw,
      direction: t.direction,
      angle: t.angle,
      iterations: t.iterations,
    });
  }
  function s(e, t, i, a) {
    o({
      drawCurve: !0,
      canvas: t,
      rules: e,
      size: i,
      lineWidth: a.lineWidth,
      lineSegmentColor: a.lineSegmentColor,
      padding: a.padding,
      draw: a.draw,
      direction: a.direction,
      angle: a.angle,
      iterations: a.iterations,
    });
  }
  function o(e) {
    if (e.drawCurve) {
      var t = e.canvas.getContext("2d");
      (t.lineWidth = e.lineWidth),
        (t.strokeStyle = e.lineSegmentColor),
        (t.lineCap = "round");
      var i = {
          left: e.padding + e.lineWidth / 2,
          right: e.padding + e.lineWidth / 2,
          top: e.padding + e.lineWidth / 2,
          bottom: e.padding + e.lineWidth / 2,
        },
        a =
          (e.canvas.width - i.left - i.right) /
          (e.size.maxPosX - e.size.minPosX),
        n =
          (e.canvas.height - i.top - i.bottom) /
          (e.size.maxPosY - e.size.minPosY);
      if (e.iterations == 1) {
        if (e.direction == "right" || e.direction == "left")
          var r = { x: i.left - e.size.minPosX * a, y: e.canvas.height / 2 };
        if (e.direction == "up" || e.direction == "down")
          var r = { x: e.canvas.width / 2, y: i.top - e.size.minPosY * n };
      } else
        var r = {
          x: i.left - e.size.minPosX * a,
          y: i.top - e.size.minPosY * n,
        };
    } else
      var l = 0,
        f = 0,
        u = 0,
        v = 0,
        a = 1,
        n = 1,
        r = { x: 0, y: 0 };
    if (!e.drawCurve && e.iterations == 1)
      return e.direction == "right" || e.direction == "down"
        ? { maxPosX: 1, maxPosY: 1, minPosX: 0, minPosY: 0 }
        : { maxPosX: -1, maxPosY: -1, minPosX: 0, minPosY: 0 };
    if (e.direction == "right") var d = 0;
    if (e.direction == "left") var d = 180;
    if (e.direction == "up") var d = 270;
    if (e.direction == "down") var d = 90;
    e.drawCurve && (t.beginPath(), t.moveTo(r.x, r.y));
    for (var h = 0; h < e.rules.length; h++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[h]) != -1 &&
        (t.lineTo(
          r.x + a * Math.cos((d * Math.PI) / 180),
          r.y + n * Math.sin((d * Math.PI) / 180)
        ),
        (r.x = r.x + a * Math.cos((d * Math.PI) / 180)),
        (r.y = r.y + n * Math.sin((d * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[h]) != -1
          ? ((r.x = r.x + a * Math.cos((d * Math.PI) / 180)),
            (r.y = r.y + n * Math.sin((d * Math.PI) / 180)),
            r.x > l && (l = r.x),
            r.y > f && (f = r.y),
            r.x < u && (u = r.x),
            r.y < v && (v = r.y))
          : e.rules[h] == "-"
          ? (d += e.angle)
          : e.rules[h] == "+" && (d -= e.angle);
    if ((e.drawCurve && t.stroke(), !e.drawCurve))
      return { maxPosX: l, maxPosY: f, minPosX: u, minPosY: v };
  }
  function m(t) {
    var i = function (x, W) {
        showWarning(x, W, -1);
      },
      a = 21,
      n = t.iterations.trim();
    if (!/^-?\d+$/.test(n))
      return (
        i("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((n = parseInt(n)), n < 1))
      return (
        i("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (n > a)
      return (
        i(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(a)
        ),
        !1
      );
    var r = t.width.trim();
    if (!/^-?\d+$/.test(r))
      return i("Can't generate curve", "Width is not a number."), !1;
    if (((r = parseInt(r)), r <= 0))
      return i("Can't generate curve", "Width must be a positive number."), !1;
    var l = t.height.trim();
    if (!/^-?\d+$/.test(l))
      return i("Can't generate curve", "Height is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return i("Can't generate curve", "Height must be a positive number."), !1;
    var f = t["background-color"] || "#013fa3",
      u = t["line-segment-color"] || "white";
    if (!isThisColorIsValid(f))
      return i("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(u))
      return i("Can't generate curve", "Line color is not valid."), !1;
    var v = t["line-width"].trim();
    if (!/^-?\d+$/.test(v))
      return i("Can't generate curve", "Line width is not a number."), !1;
    if (((v = parseInt(v)), v < 1))
      return i("Can't generate curve", "Line width should be 1 or more."), !1;
    var d = t.padding.trim();
    if (!/^-?\d+$/.test(d))
      return i("Can't generate curve", "Padding is not a number."), !1;
    if (((d = parseInt(d)), d < 0))
      return i("Can't generate curve", "Padding can't be negative."), !1;
    var h = t.direction,
      b = "F",
      y = 90;
    return {
      iterations: n,
      width: r,
      height: l,
      background: f,
      lineSegmentColor: u,
      lineWidth: v,
      padding: d,
      draw: b,
      direction: h,
      angle: y,
    };
  }
  function C(e) {
    for (
      var t = e.getContext("2d"),
        i = e.width,
        a = e.height,
        n = 15,
        r = !0,
        l = 0;
      l <= i;
      l += n
    )
      for (var f = 0; f <= a; f += n)
        r ? (t.fillStyle = "#ffffff") : (t.fillStyle = "#efefef"),
          (r = !r),
          t.fillRect(l, f, l + n, f + n);
  }
}
