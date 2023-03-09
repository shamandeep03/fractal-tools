First_call();
function generate(options, cb) {
  var e = options,
    r = C(e);
  if (!r) return !1;
  var i = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (i.width = i.clientWidth),
    (i.height = i.clientHeight),
    (a.width = r.width || i.clientWidth),
    (a.height = r.height || i.clientHeight);
  var n = i.getContext("2d"),
    t = a.getContext("2d");
  m(i), (t.fillStyle = r.background), t.fillRect(0, 0, a.width, a.height);
  var l = c(r),
    f = w(l, r);
  s(l, a, f, r);

  var u = bestImageFit(a.width, a.height, i.width, i.height);
  n.drawImage(a, u.offsetX, u.offsetY, u.width, u.height);
  function c(e) {
    return new LSystem({
      axiom: "A",
      productions: { A: "A-B--B+A++AA+B-", B: "+A-BB--B-A++A+B" },
    }).iterate(e.iterations);
  }
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  function w(e, r) {
    return g({
      drawCurve: !1,
      rules: e,
      draw: r.draw,
      direction: r.direction,
      angle: r.angle,
    });
  }
  function s(e, r, i, a) {
    g({
      drawCurve: !0,
      canvas: r,
      rules: e,
      size: i,
      lineWidth: a.lineWidth,
      lineSegmentColor: a.lineSegmentColor,
      padding: a.padding,
      draw: a.draw,
      direction: a.direction,
      angle: a.angle,
    });
  }
  function g(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      (r.lineWidth = e.lineWidth),
        (r.strokeStyle = e.lineSegmentColor),
        (r.lineCap = "round");
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
          (e.size.maxPosY - e.size.minPosY),
        t = { x: i.left - e.size.minPosX * a, y: i.top - e.size.minPosY * n };
    } else
      var l = 0,
        f = 0,
        u = 0,
        v = 0,
        a = 1,
        n = 1,
        t = { x: 0, y: 0 };
    if (e.direction == "right") var d = 0;
    if (e.direction == "left") var d = 180;
    if (e.direction == "up") var d = 270;
    if (e.direction == "down") var d = 90;
    e.drawCurve && (r.beginPath(), r.moveTo(t.x, t.y));
    for (var h = 0; h < e.rules.length; h++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[h]) != -1 &&
        (r.lineTo(
          t.x + a * Math.cos((d * Math.PI) / 180),
          t.y + n * Math.sin((d * Math.PI) / 180)
        ),
        (t.x = t.x + a * Math.cos((d * Math.PI) / 180)),
        (t.y = t.y + n * Math.sin((d * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[h]) != -1
          ? ((t.x = t.x + a * Math.cos((d * Math.PI) / 180)),
            (t.y = t.y + n * Math.sin((d * Math.PI) / 180)),
            t.x > l && (l = t.x),
            t.y > f && (f = t.y),
            t.x < u && (u = t.x),
            t.y < v && (v = t.y))
          : e.rules[h] == "-"
          ? (d += e.angle)
          : e.rules[h] == "+" && (d -= e.angle);
    if ((e.drawCurve && r.stroke(), !e.drawCurve))
      return { maxPosX: l, maxPosY: f, minPosX: u, minPosY: v };
  }
  function C(r) {
    var i = function (A, x) {
        showWarning(A, x, -1);
      },
      a = 7,
      n = r.iterations.trim();
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
    var t = r.width.trim();
    if (!/^-?\d+$/.test(t))
      return i("Can't generate curve", "Width is not a number."), !1;
    if (((t = parseInt(t)), t <= 0))
      return i("Can't generate curve", "Width must be a positive number."), !1;
    var l = r.height.trim();
    if (!/^-?\d+$/.test(l))
      return i("Can't generate curve", "Height is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return i("Can't generate curve", "Height must be a positive number."), !1;
    var f = r["background-color"] || "#013fa3",
      u = r["line-segment-color"] || "white";
    if (!isThisColorIsValid(f))
      return i("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(u))
      return i("Can't generate curve", "Line color is not valid."), !1;
    var v = r["line-width"].trim();
    if (!/^-?\d+$/.test(v))
      return i("Can't generate curve", "Line width is not a number."), !1;
    if (((v = parseInt(v)), v < 1))
      return i("Can't generate curve", "Line width should be 1 or more."), !1;
    var d = r.padding.trim();
    if (!/^-?\d+$/.test(d))
      return i("Can't generate curve", "Padding is not a number."), !1;
    if (((d = parseInt(d)), d < 0))
      return i("Can't generate curve", "Padding can't be negative."), !1;
    var h = r.direction,
      b = "AB",
      y = 60;
    return {
      iterations: n,
      width: t,
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
  function m(e) {
    for (
      var r = e.getContext("2d"),
        i = e.width,
        a = e.height,
        n = 15,
        t = !0,
        l = 0;
      l <= i;
      l += n
    )
      for (var f = 0; f <= a; f += n)
        t ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (t = !t),
          r.fillRect(l, f, l + n, f + n);
  }
}
