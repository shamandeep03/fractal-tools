First_call();
function generate(options, cb) {
  var e = options,
    i = C(e);
  if (!i) return !1;
  var r = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (r.width = r.clientWidth),
    (r.height = r.clientHeight),
    (a.width = i.width || r.clientWidth),
    (a.height = i.height || r.clientHeight);
  var n = r.getContext("2d"),
    t = a.getContext("2d");
  m(r), (t.fillStyle = i.background), t.fillRect(0, 0, a.width, a.height);
  var l = c(i),
    f = w(l, i);
  s(l, a, f, i);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  var o = bestImageFit(a.width, a.height, r.width, r.height);
  n.drawImage(a, o.offsetX, o.offsetY, o.width, o.height);
  function c(e) {
    return e.iterations == 1
      ? "FBF-FF-FF"
      : new LSystem({
          axiom: "FBF-FF-FF",
          productions: { F: "FF", B: "-FBF+FBF+FBF-" },
        }).iterate(e.iterations - 1);
  }
  function w(e, i) {
    return h({
      drawCurve: !1,
      rules: e,
      draw: i.draw,
      direction: i.direction,
      angle: i.angle,
    });
  }
  function s(e, i, r, a) {
    h({
      drawCurve: !0,
      canvas: i,
      rules: e,
      size: r,
      lineWidth: a.lineWidth,
      lineSegmentColor: a.lineSegmentColor,
      fillColor: a.fillColor,
      padding: a.padding,
      draw: a.draw,
      direction: a.direction,
      angle: a.angle,
    });
  }
  function h(e) {
    if (e.drawCurve) {
      var i = e.canvas.getContext("2d");
      (i.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (i.strokeStyle = "transparent")
          : (i.strokeStyle = e.lineSegmentColor),
        (i.lineCap = "round"),
        (i.lineJoin = "round");
      var r = {
          left: e.padding + e.lineWidth / 2,
          right: e.padding + e.lineWidth / 2,
          top: e.padding + e.lineWidth / 2,
          bottom: e.padding + e.lineWidth / 2,
        },
        a =
          (e.canvas.width - r.left - r.right) /
          (e.size.maxPosX - e.size.minPosX),
        n =
          (e.canvas.height - r.top - r.bottom) /
          (e.size.maxPosY - e.size.minPosY),
        t = { x: r.left - e.size.minPosX * a, y: r.top - e.size.minPosY * n };
    } else
      var l = 0,
        f = 0,
        o = 0,
        v = 0,
        a = 1,
        n = 1,
        t = { x: 0, y: 0 };
    if (e.direction == "right") var d = 270;
    if (e.direction == "left") var d = 90;
    if (e.direction == "up") var d = 180;
    if (e.direction == "down") var d = 0;
    e.drawCurve && (i.beginPath(), i.moveTo(t.x, t.y));
    for (var u = 0; u < e.rules.length; u++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[u]) != -1 &&
        (i.lineTo(
          t.x + a * Math.cos((d * Math.PI) / 180),
          t.y + n * Math.sin((d * Math.PI) / 180)
        ),
        (t.x = t.x + a * Math.cos((d * Math.PI) / 180)),
        (t.y = t.y + n * Math.sin((d * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[u]) != -1
          ? ((t.x = t.x + a * Math.cos((d * Math.PI) / 180)),
            (t.y = t.y + n * Math.sin((d * Math.PI) / 180)),
            t.x > l && (l = t.x),
            t.y > f && (f = t.y),
            t.x < o && (o = t.x),
            t.y < v && (v = t.y))
          : e.rules[u] == "-"
          ? (d += e.angle)
          : e.rules[u] == "+" && (d -= e.angle);
    if (
      (e.drawCurve && ((i.fillStyle = e.fillColor), i.fill(), i.stroke()),
      !e.drawCurve)
    )
      return { maxPosX: l, maxPosY: f, minPosX: o, minPosY: v };
  }
  function C(i) {
    var r = function (W, I) {
        showWarning(W, I, -1);
      },
      a = 13,
      n = i.iterations.trim();
    if (!/^-?\d+$/.test(n))
      return (
        r("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((n = parseInt(n)), n < 1))
      return (
        r("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (n > a)
      return (
        r(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(a)
        ),
        !1
      );
    var t = i.width.trim();
    if (!/^-?\d+$/.test(t))
      return r("Can't generate curve", "Width is not a number."), !1;
    if (((t = parseInt(t)), t <= 0))
      return r("Can't generate curve", "Width must be a positive number."), !1;
    var l = i.height.trim();
    if (!/^-?\d+$/.test(l))
      return r("Can't generate curve", "Height is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return r("Can't generate curve", "Height must be a positive number."), !1;
    var f = i["background-color"] || "#0533ff",
      o = i["line-segment-color"] || "transparent",
      v = i["fill-color"] || "transparent";
    if (!isThisColorIsValid(f))
      return r("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(o))
      return r("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(v))
      return r("Can't generate curve", "Fill color is not valid."), !1;
    var d = i["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(d))
      return r("Can't generate curve", "Line width is not a number."), !1;
    if (((d = parseInt(d)), d < 0))
      return r("Can't generate curve", "Line width should be 0 or more."), !1;
    var u = i.padding.trim();
    if (!/^-?\d+$/.test(u))
      return r("Can't generate curve", "Padding is not a number."), !1;
    if (((u = parseInt(u)), u < 0))
      return r("Can't generate curve", "Padding can't be negative."), !1;
    var F = i.direction,
      b = "F",
      y = 120;
    return {
      iterations: n,
      width: t,
      height: l,
      background: f,
      lineSegmentColor: o,
      fillColor: v,
      lineWidth: d,
      padding: u,
      draw: b,
      direction: F,
      angle: y,
    };
  }
  function m(e) {
    for (
      var i = e.getContext("2d"),
        r = e.width,
        a = e.height,
        n = 15,
        t = !0,
        l = 0;
      l <= r;
      l += n
    )
      for (var f = 0; f <= a; f += n)
        t ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
          (t = !t),
          i.fillRect(l, f, l + n, f + n);
  }
}
