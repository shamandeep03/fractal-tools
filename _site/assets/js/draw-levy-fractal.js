First_call();
function generate(options, cb) {
  var e = options,
    i = y(e);
  if (!i) return !1;
  var r = document.querySelector(".preview"),
    t = document.querySelector(".data");
  (r.width = r.clientWidth),
    (r.height = r.clientHeight),
    (t.width = i.width || r.clientWidth),
    (t.height = i.height || r.clientHeight);
  var d = r.getContext("2d"),
    a = t.getContext("2d");
  C(r), (a.fillStyle = i.background), a.fillRect(0, 0, t.width, t.height);
  var l = c(i),
    f = m(l, i);
  w(l, t, f, i);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = t.toDataURL();
    link.click();
  });
  var v = bestImageFit(t.width, t.height, r.width, r.height);
  d.drawImage(t, v.offsetX, v.offsetY, v.width, v.height);
  function c(e) {
    return e.type == "tapestry-outside"
      ? e.iterations == 1
        ? "F#F#F#F"
        : new LSystem({
            axiom: "F#F#F#F",
            productions: { F: "-F#F-" },
          }).iterate(e.iterations - 1)
      : e.type == "tapestry-inside"
      ? e.iterations == 1
        ? "F#F#F#F"
        : new LSystem({
            axiom: "F#F#F#F",
            productions: { F: "+F_F+" },
          }).iterate(e.iterations - 1)
      : e.type == "diamonds"
      ? e.iterations == 1
        ? "F"
        : new LSystem({ axiom: "F", productions: { F: "#F_F_F#" } }).iterate(
            e.iterations - 1
          )
      : e.iterations == 1
      ? "F"
      : new LSystem({ axiom: "F", productions: { F: "+F_F+" } }).iterate(
          e.iterations - 1
        );
  }
  function m(e, i) {
    return g({
      drawCurve: !1,
      rules: e,
      draw: i.draw,
      direction: i.direction,
      angle: i.angle,
      iterations: i.iterations,
      type: i.type,
    });
  }
  function w(e, i, r, t) {
    g({
      drawCurve: !0,
      canvas: i,
      rules: e,
      size: r,
      lineWidth: t.lineWidth,
      lineSegmentColor: t.lineSegmentColor,
      padding: t.padding,
      draw: t.draw,
      direction: t.direction,
      angle: t.angle,
      iterations: t.iterations,
      type: t.type,
    });
  }
  function g(e) {
    if (e.drawCurve) {
      var i = e.canvas.getContext("2d");
      (i.lineWidth = e.lineWidth),
        (i.strokeStyle = e.lineSegmentColor),
        (i.lineCap = "round");
      var r = {
          left: e.padding + e.lineWidth / 2,
          right: e.padding + e.lineWidth / 2,
          top: e.padding + e.lineWidth / 2,
          bottom: e.padding + e.lineWidth / 2,
        },
        t =
          (e.canvas.width - r.left - r.right) /
          (e.size.maxPosX - e.size.minPosX),
        d =
          (e.canvas.height - r.top - r.bottom) /
          (e.size.maxPosY - e.size.minPosY);
      if (e.iterations == 1 && (e.type == "dragon" || e.type == "diamonds")) {
        if (e.direction == "up" || e.direction == "down")
          var a = { x: r.left - e.size.minPosX * t, y: e.canvas.height / 2 };
        if (e.direction == "left" || e.direction == "right")
          var a = { x: e.canvas.width / 2, y: r.top - e.size.minPosY * d };
      } else
        var a = {
          x: r.left - e.size.minPosX * t,
          y: r.top - e.size.minPosY * d,
        };
    } else
      var l = 0,
        f = 0,
        v = 0,
        h = 0,
        t = 1,
        d = 1,
        a = { x: 0, y: 0 };
    if (
      !e.drawCurve &&
      e.iterations == 1 &&
      (e.type == "dragon" || e.type == "diamonds")
    )
      return e.direction == "right" || e.direction == "up"
        ? { maxPosX: -1, maxPosY: -1, minPosX: 0, minPosY: 0 }
        : { maxPosX: 1, maxPosY: 1, minPosX: 0, minPosY: 0 };
    if (e.direction == "right") var n = 270;
    if (e.direction == "left") var n = 90;
    if (e.direction == "up") var n = 180;
    if (e.direction == "down") var n = 0;
    e.drawCurve && (i.beginPath(), i.moveTo(a.x, a.y));
    for (var u = 0; u < e.rules.length; u++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[u]) != -1 &&
        (i.lineTo(
          a.x + t * Math.cos((n * Math.PI) / 180),
          a.y + d * Math.sin((n * Math.PI) / 180)
        ),
        (a.x = a.x + t * Math.cos((n * Math.PI) / 180)),
        (a.y = a.y + d * Math.sin((n * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[u]) != -1
          ? ((a.x = a.x + t * Math.cos((n * Math.PI) / 180)),
            (a.y = a.y + d * Math.sin((n * Math.PI) / 180)),
            a.x > l && (l = a.x),
            a.y > f && (f = a.y),
            a.x < v && (v = a.x),
            a.y < h && (h = a.y))
          : e.rules[u] == "-"
          ? (n += e.angle)
          : e.rules[u] == "_"
          ? (n += 2 * e.angle)
          : e.rules[u] == "+"
          ? (n -= e.angle)
          : e.rules[u] == "#" && (n -= 2 * e.angle);
    if ((e.drawCurve && i.stroke(), !e.drawCurve))
      return { maxPosX: l, maxPosY: f, minPosX: v, minPosY: h };
  }
  function y(i) {
    var r = function (b, W) {
      showWarning(b, W, -1);
    };
    if (i["levy-dragon"]) var t = "dragon";
    else if (i["levy-tapestry-outside"]) var t = "tapestry-outside";
    else if (i["levy-tapestry-inside"]) var t = "tapestry-inside";
    else if (i["levy-diamonds"]) var t = "diamonds";
    if (t == "dragon") var d = 22;
    else if (t == "tapestry-outside" || t == "tapestry-inside") var d = 20;
    else if (t == "diamonds") var d = 14;
    var a = i.iterations.trim();
    if (!/^-?\d+$/.test(a))
      return (
        r("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((a = parseInt(a)), a < 1))
      return (
        r("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (a > d)
      return (
        r(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(d)
        ),
        !1
      );
    var l = i.width.trim();
    if (!/^-?\d+$/.test(l))
      return r("Can't generate curve", "Width is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return r("Can't generate curve", "Width must be a positive number."), !1;
    var f = i.height.trim();
    if (!/^-?\d+$/.test(f))
      return r("Can't generate curve", "Height is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return r("Can't generate curve", "Height must be a positive number."), !1;
    var v = i["background-color"] || "#013fa3",
      h = i["line-segment-color"] || "white";
    if (!isThisColorIsValid(v))
      return r("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(h))
      return r("Can't generate curve", "Line color is not valid."), !1;
    var n = i["line-width"].trim();
    if (!/^-?\d+$/.test(n))
      return r("Can't generate curve", "Line width is not a number."), !1;
    if (((n = parseInt(n)), n < 1))
      return r("Can't generate curve", "Line width should be 1 or more."), !1;
    var u = i.padding.trim();
    if (!/^-?\d+$/.test(u))
      return r("Can't generate curve", "Padding is not a number."), !1;
    if (((u = parseInt(u)), u < 0))
      return r("Can't generate curve", "Padding can't be negative."), !1;
    var F = i.direction,
      x = "F";
    if (t == "diamonds") var s = 30;
    else var s = 45;
    return {
      iterations: a,
      width: l,
      height: f,
      background: v,
      lineSegmentColor: h,
      lineWidth: n,
      padding: u,
      draw: x,
      direction: F,
      angle: s,
      type: t,
    };
  }
  function C(e) {
    for (
      var i = e.getContext("2d"),
        r = e.width,
        t = e.height,
        d = 15,
        a = !0,
        l = 0;
      l <= r;
      l += d
    )
      for (var f = 0; f <= t; f += d)
        a ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
          (a = !a),
          i.fillRect(l, f, l + d, f + d);
  }
}
