First_call();
function generate(options, cb) {
  var e = options,
    r = y(e);
  if (!r) return !1;
  var i = document.querySelector(".preview"),
    t = document.querySelector(".data");
  (i.width = i.clientWidth),
    (i.height = i.clientHeight),
    (t.width = r.width || i.clientWidth),
    (t.height = r.height || i.clientHeight);
  var n = i.getContext("2d"),
    a = t.getContext("2d");
  x(i), (a.fillStyle = r.background), a.fillRect(0, 0, t.width, t.height);
  var d = C(r),
    o = m(d, r);
  b(d, t, o, r);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = t.toDataURL();
    link.click();
  });
  var g = bestImageFit(t.width, t.height, i.width, i.height);
  n.drawImage(t, g.offsetX, g.offsetY, g.width, g.height);
  function C(e) {
    return new LSystem({
      axiom: "FX+FX+",
      productions: { X: "X+YF", Y: "FX-Y" },
    }).iterate(e.iterations);
  }
  function m(e, r) {
    return s({
      drawCurve: !1,
      rules: e,
      draw: r.draw,
      angle: r.angle,
      direction: r.direction,
    });
  }
  function b(e, r, i, t) {
    s({
      drawCurve: !0,
      canvas: r,
      rules: e,
      size: i,
      lineWidth: t.lineWidth,
      dragonColor1: t.dragonColor1,
      dragonColor2: t.dragonColor2,
      padding: t.padding,
      draw: t.draw,
      angle: t.angle,
      direction: t.direction,
    });
  }
  function s(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      (r.lineCap = "round"), (r.lineWidth = e.lineWidth);
      var i = {
          left: e.padding + e.lineWidth / 2,
          right: e.padding + e.lineWidth / 2,
          top: e.padding + e.lineWidth / 2,
          bottom: e.padding + e.lineWidth / 2,
        },
        t =
          (e.canvas.width - i.left - i.right) /
          (e.size.maxPosX - e.size.minPosX),
        n =
          (e.canvas.height - i.top - i.bottom) /
          (e.size.maxPosY - e.size.minPosY),
        a = { x: i.left - e.size.minPosX * t, y: i.top - e.size.minPosY * n };
    } else
      var d = 0,
        o = 0,
        g = 0,
        u = 0,
        t = 1,
        n = 1,
        a = { x: 0, y: 0 };
    if (e.direction == "right") var l = 0;
    if (e.direction == "left") var l = 180;
    if (e.direction == "up") var l = 270;
    if (e.direction == "down") var l = 90;
    if (!e.drawCurve) {
      for (var f = 0; f < e.rules.length; f++)
        e.draw.indexOf(e.rules[f]) != -1
          ? ((a.x = a.x + t * Math.cos((l * Math.PI) / 180)),
            (a.y = a.y + n * Math.sin((l * Math.PI) / 180)),
            a.x > d && (d = a.x),
            a.y > o && (o = a.y),
            a.x < g && (g = a.x),
            a.y < u && (u = a.y))
          : e.rules[f] == "-"
          ? (l -= e.angle)
          : e.rules[f] == "+" && (l += e.angle);
      return { maxPosX: d, maxPosY: o, minPosX: g, minPosY: u };
    }
    var v = e.rules.length / 2,
      h = 0;
    if (((r.strokeStyle = e.dragonColor1), e.drawCurve))
      for (var c = 0; c < 2; c++) {
        r.beginPath(), r.moveTo(a.x, a.y);
        for (var f = h; f < v; f++)
          e.draw.indexOf(e.rules[f]) != -1
            ? (r.lineTo(
                a.x + t * Math.cos((l * Math.PI) / 180),
                a.y + n * Math.sin((l * Math.PI) / 180)
              ),
              (a.x = a.x + t * Math.cos((l * Math.PI) / 180)),
              (a.y = a.y + n * Math.sin((l * Math.PI) / 180)))
            : e.rules[f] == "-"
            ? (l -= e.angle)
            : e.rules[f] == "+" && (l += e.angle);
        r.stroke(),
          (v = e.rules.length),
          (h = e.rules.length / 2),
          (r.strokeStyle = e.dragonColor2);
      }
  }
  function y(r) {
    var i = function (W, I) {
        showWarning(W, I, -1);
      },
      t = 19,
      n = r.iterations.trim();
    if (!/^-?\d+$/.test(n))
      return (
        i("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((n = parseInt(n)), n < 1))
      return (
        i("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (n > t)
      return (
        i(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(t)
        ),
        !1
      );
    var a = r.width.trim();
    if (!/^-?\d+$/.test(a))
      return i("Can't generate curve", "Width is not a number."), !1;
    if (((a = parseInt(a)), a <= 0))
      return i("Can't generate curve", "Width must be a positive number."), !1;
    var d = r.height.trim();
    if (!/^-?\d+$/.test(d))
      return i("Can't generate curve", "Height is not a number."), !1;
    if (((d = parseInt(d)), d <= 0))
      return i("Can't generate curve", "Height must be a positive number."), !1;
    var o = r["background-color"] || "black",
      g = r["dragon-1-color"] || "#64e018",
      u = r["dragon-2-color"] || "yellow";
    if (!isThisColorIsValid(o))
      return i("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(g))
      return i("Can't generate curve", "Dragon 1 color is not valid."), !1;
    if (!isThisColorIsValid(u))
      return i("Can't generate curve", "Dragon 2 color is not valid."), !1;
    var l = r["line-width"].trim();
    if (!/^-?\d+$/.test(l))
      return i("Can't generate curve", "Line width is not a number."), !1;
    if (((l = parseInt(l)), l < 1))
      return i("Can't generate curve", "Line width should be 1 or more."), !1;
    var f = r.padding.trim();
    if (!/^-?\d+$/.test(f))
      return i("Can't generate curve", "Padding is not a number."), !1;
    if (((f = parseInt(f)), f < 0))
      return i("Can't generate curve", "Padding can't be negative."), !1;
    var v = r.direction,
      h = "F",
      c = 90;
    return {
      iterations: n,
      width: a,
      height: d,
      background: o,
      dragonColor1: g,
      dragonColor2: u,
      lineWidth: l,
      padding: f,
      direction: v,
      draw: h,
      angle: c,
    };
  }
  function x(e) {
    for (
      var r = e.getContext("2d"),
        i = e.width,
        t = e.height,
        n = 15,
        a = !0,
        d = 0;
      d <= i;
      d += n
    )
      for (var o = 0; o <= t; o += n)
        a ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (a = !a),
          r.fillRect(d, o, d + n, o + n);
  }
}
