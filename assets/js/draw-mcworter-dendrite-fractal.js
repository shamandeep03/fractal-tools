First_call();
function generate(options, cb) {
  var e = options,
    r = z(e);
  if (!r) return !1;
  var a = document.querySelector(".preview"),
    i = document.querySelector(".data");
  (a.width = a.clientWidth),
    (a.height = a.clientHeight),
    (i.width = r.width || a.clientWidth),
    (i.height = r.height || a.clientHeight);
  var t = a.getContext("2d"),
    n = i.getContext("2d");
  W(a), (n.fillStyle = r.background), n.fillRect(0, 0, i.width, i.height);
  var l = b(r),
    d = y(l, r);
  x(l, i, d, r);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = i.toDataURL()
    link.click();
});
  var u = bestImageFit(i.width, i.height, a.width, a.height);
  t.drawImage(i, u.offsetX, u.offsetY, u.width, u.height);
  function b(e) {
    return e.iterations == 1
      ? e.axiom
      : new LSystem({
          axiom: e.axiom,
          productions: { F: e.transformRule },
        }).iterate(e.iterations - 1);
  }
  function y(e, r) {
    return m({
      drawCurve: !1,
      rules: e,
      draw: r.draw,
      angle: r.angle,
      direction: r.direction,
    });
  }
  function x(e, r, a, i) {
    m({
      drawCurve: !0,
      canvas: r,
      rules: e,
      size: a,
      lineWidth: i.lineWidth,
      lineSegmentColor: i.lineSegmentColor,
      fillColor: i.fillColor,
      padding: i.padding,
      draw: i.draw,
      iterations: i.iterations,
      angle: i.angle,
      direction: i.direction,
      fillFractal: i.fillFractal,
      dendrite: i.dendrite,
    });
  }
  function m(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      (r.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (r.strokeStyle = "transparent")
          : (r.strokeStyle = e.lineSegmentColor),
        (r.lineCap = "round");
      var a = {
        left: e.padding + e.lineWidth / 2,
        right: e.padding + e.lineWidth / 2,
        top: e.padding + e.lineWidth / 2,
        bottom: e.padding + e.lineWidth / 2,
      };
      if (
        e.iterations == 1 &&
        e.dendrite &&
        (e.direction == "up" || e.direction == "down")
      ) {
        (t =
          (e.canvas.width - a.left - a.right) /
          (e.size.maxPosX - e.size.minPosX)),
          (n = 0);
        var i = { x: a.left - e.size.minPosX * t, y: e.canvas.height / 2 };
      } else if (
        e.iterations == 1 &&
        e.dendrite &&
        (e.direction == "right" || e.direction == "left")
      ) {
        (t = 0),
          (n =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY));
        var i = { x: e.canvas.width / 2, y: a.top - e.size.minPosY * n };
      } else
        var t =
            (e.canvas.width - a.left - a.right) /
            (e.size.maxPosX - e.size.minPosX),
          n =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY),
          i = {
            x: a.left - e.size.minPosX * t,
            y: a.top - e.size.minPosY * n,
          };
    } else
      var l = 0,
        d = 0,
        u = 0,
        h = 0,
        t = 1,
        n = 1,
        i = { x: 0, y: 0 };
    if (e.direction == "right") var f = 90;
    if (e.direction == "left") var f = 270;
    if (e.direction == "up") var f = 0;
    if (e.direction == "down") var f = 180;
    e.drawCurve && (r.beginPath(), r.moveTo(i.x, i.y));
    for (var v = 0; v < e.rules.length; v++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[v]) != -1 &&
        (r.lineTo(
          i.x + t * Math.cos((f * Math.PI) / 180),
          i.y + n * Math.sin((f * Math.PI) / 180)
        ),
        (i.x = i.x + t * Math.cos((f * Math.PI) / 180)),
        (i.y = i.y + n * Math.sin((f * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[v]) != -1
          ? ((i.x = i.x + t * Math.cos((f * Math.PI) / 180)),
            (i.y = i.y + n * Math.sin((f * Math.PI) / 180)),
            i.x > l && (l = i.x),
            i.y > d && (d = i.y),
            i.x < u && (u = i.x),
            i.y < h && (h = i.y))
          : e.rules[v] == "-"
          ? (f += e.angle)
          : e.rules[v] == "+" && (f -= e.angle);
    if (
      (e.drawCurve &&
        ((r.fillStyle = e.fillColor), e.fillFractal && r.fill(), r.stroke()),
      !e.drawCurve)
    )
      return { maxPosX: l, maxPosY: d, minPosX: u, minPosY: h };
  }
  function z(r) {
    var a = function (k, R) {
        showWarning(k, R, -1);
      },
      i = 8,
      t = r.iterations.trim();
    if (!/^-?\d+$/.test(t))
      return (
        a("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((t = parseInt(t)), t < 1))
      return (
        a("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (t > i)
      return (
        a(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(i)
        ),
        !1
      );
    var n = r.width.trim();
    if (!/^-?\d+$/.test(n))
      return a("Can't generate curve", "Width is not a number."), !1;
    if (((n = parseInt(n)), n <= 0))
      return a("Can't generate curve", "Width must be a positive number."), !1;
    var l = r.height.trim();
    if (!/^-?\d+$/.test(l))
      return a("Can't generate curve", "Height is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return a("Can't generate curve", "Height must be a positive number."), !1;
    var d = r["background-color"] || "black",
      u = r["line-segment-color"] || "transparent",
      h = r["fill-color"] || "transparent";
    if (!isThisColorIsValid(d))
      return a("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(u))
      return a("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(h))
      return a("Can't generate curve", "Fill color is not valid."), !1;
    var f = r["line-width"].trim();
    if (!/^-?\d+$/.test(f))
      return a("Can't generate curve", "Line width is not a number."), !1;
    if (((f = parseInt(f)), f < 1))
      return a("Can't generate curve", "Line width should be 1 or more."), !1;
    var v = r.padding.trim();
    if (!/^-?\d+$/.test(v))
      return a("Can't generate curve", "Padding is not a number."), !1;
    if (((v = parseInt(v)), v < 0))
      return a("Can't generate curve", "Padding can't be negative."), !1;
    var I = r.direction,
      M = "F";
    if (r.pentadendrite)
      var w = 5,
        o = 72,
        c = "F-F-F-F-F",
        F = "F-F-F++F+F-F",
        g = !0;
    else if (r.hexadendrite)
      var w = 6,
        o = 60,
        c = "F-F-F-F-F-F",
        F = "F-F-F++F+F-F",
        g = !0;
    else if (r.octadendrite)
      var w = 8,
        o = 45,
        c = "F-F-F-F-F-F-F-F",
        F = "F-F-F++F+F-F",
        g = !0;
    else if (r.dendrite)
      var o = 72,
        c = "F",
        F = "F-F-F++F+F-F",
        g = !1;
    if (r["starfish-mode"] && !r.dendrite) {
      c = c.replace(/-/g, "+");
      var g = !0;
    }
    if (r["open-mode"] && !r.dendrite) {
      var s = r.gap.trim();
      if (!/^-?\d+$/.test(s))
        return a("Can't generate curve", "The gap value is not valid."), !1;
      if (((s = parseInt(s)), s < 0))
        return (
          a("Can't generate curve", "The gap value cannot be negative."), !1
        );
      o = (360 - s) / w;
      var g = !1;
    }
    return (
      r.rotation == "counterclockwise" && (o = -o),
      {
        iterations: t,
        width: n,
        height: l,
        background: d,
        lineSegmentColor: u,
        lineWidth: f,
        padding: v,
        draw: M,
        transformRule: F,
        angle: o,
        direction: I,
        fillColor: h,
        axiom: c,
        fillFractal: g,
        dendrite: r.dendrite,
      }
    );
  }
  function W(e) {
    for (
      var r = e.getContext("2d"),
        a = e.width,
        i = e.height,
        t = 15,
        n = !0,
        l = 0;
      l <= a;
      l += t
    )
      for (var d = 0; d <= i; d += t)
        n ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (n = !n),
          r.fillRect(l, d, l + t, d + t);
  }
}
