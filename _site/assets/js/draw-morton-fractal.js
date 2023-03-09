First_call();
function generate(options, cb) {
  var a = options,
    e = b(a);
  if (!e) return !1;
  var l = document.querySelector(".preview"),
    d = document.querySelector(".data");
  (l.width = l.clientWidth),
    (l.height = l.clientHeight),
    (d.width = e.width || l.clientWidth),
    (d.height = e.height || l.clientHeight);
  var r = l.getContext("2d"),
    i = d.getContext("2d");
  q(l), (i.fillStyle = e.background), i.fillRect(0, 0, d.width, d.height);
  var f = g(e),
    v = I(e.iterations),
    w = W(f, v, e);
  z(f, v, d, w, e);
  var n = bestImageFit(d.width, d.height, l.width, l.height);
  r.drawImage(d, n.offsetX, n.offsetY, n.width, n.height);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = d.toDataURL();
    link.click();
  });
  function g(a) {
    var e = "F---F+++F",
      l = "---F+++",
      d = "+F-";
    if (a.iterations == 1) return e;
    for (var r = 2; r <= a.iterations; r++) {
      for (var i = e, f = 1; f <= 3; f++)
        f == 2 ? (i += l) : (i += d), (i += e);
      if (r == a.iterations) return i;
      e = i;
    }
  }
  function I(a) {
    var e = [3, 3, 3, 7, 3, 3, 3];
    for (k = 4; k <= a; k++)
      e.push(Math.max.apply(null, e)),
        (e = e.concat(e.slice(0, e.length - 1))),
        e.push(Math.max.apply(null, e) * 2 + 1),
        (e = e.concat(e.slice(0, e.length - 1)));
    return e;
  }
  function W(a, e, l) {
    return M({
      drawCurve: !1,
      rules: a,
      sequence: e,
      draw: l.draw,
      direction: l.direction,
      angle: l.angle,
    });
  }
  function z(a, e, l, d, r) {
    M({
      drawCurve: !0,
      canvas: l,
      rules: a,
      sequence: e,
      size: d,
      lineWidth: r.lineWidth,
      lineSegmentColor: r.lineSegmentColor,
      padding: r.padding,
      draw: r.draw,
      direction: r.direction,
      angle: r.angle,
    });
  }
  function M(a) {
    if (a.drawCurve) {
      var e = a.canvas.getContext("2d");
      (e.lineWidth = a.lineWidth),
        (e.strokeStyle = a.lineSegmentColor),
        (e.lineCap = "round");
      var l = {
          left: a.padding + a.lineWidth / 2,
          right: a.padding + a.lineWidth / 2,
          top: a.padding + a.lineWidth / 2,
          bottom: a.padding + a.lineWidth / 2,
        },
        d =
          (a.canvas.width - l.left - l.right) /
          (a.size.maxPosX - a.size.minPosX),
        r =
          (a.canvas.height - l.top - l.bottom) /
          (a.size.maxPosY - a.size.minPosY),
        i = { x: l.left - a.size.minPosX * d, y: l.top - a.size.minPosY * r };
    } else
      var f = 0,
        v = 0,
        w = 0,
        n = 0,
        d = 1,
        r = 1,
        i = { x: 0, y: 0 };
    if (a.direction == "horizontal") var t = 0;
    if (a.direction == "vertical") var t = 90;
    var o = 0,
      x = 0;
    a.drawCurve && (e.beginPath(), e.moveTo(i.x, i.y));
    for (var u = 0; u < a.rules.length; u++) {
      if (t == -45 || t == 135)
        var C = Math.sin((45 * Math.PI) / 180),
          y = Math.cos((45 * Math.PI) / 180);
      else if (t == 225 || t == 45)
        var C = Math.sin((45 * Math.PI) / 180),
          y = Math.cos((45 * Math.PI) / 180);
      else
        var C = 1,
          y = 1;
      var h = a.sequence[x];
      a.drawCurve &&
        a.draw.indexOf(a.rules[u]) != -1 &&
        (o == 4
          ? (t == -45
              ? (e.lineTo(i.x + d, i.y - r * h),
                (i.x = i.x + d),
                (i.y = i.y - r * h))
              : t == 135
              ? (e.lineTo(i.x - d * h, i.y + r),
                (i.x = i.x - d * h),
                (i.y = i.y + r))
              : t == 225
              ? (e.lineTo(i.x - d, i.y - r * h),
                (i.x = i.x - d),
                (i.y = i.y - r * h))
              : t == 45 &&
                (e.lineTo(i.x + d * h, i.y + r),
                (i.x = i.x + d * h),
                (i.y = i.y + r)),
            x++,
            (o = 0))
          : (e.lineTo(
              i.x + (d * Math.cos((t * Math.PI) / 180)) / y,
              i.y + (r * Math.sin((t * Math.PI) / 180)) / C
            ),
            (i.x = i.x + (d * Math.cos((t * Math.PI) / 180)) / y),
            (i.y = i.y + (r * Math.sin((t * Math.PI) / 180)) / C))),
        !a.drawCurve &&
          a.draw.indexOf(a.rules[u]) != -1 &&
          (o == 4
            ? (t == -45
                ? ((i.x = i.x + d), (i.y = i.y - r * h))
                : t == 135
                ? ((i.x = i.x - d * h), (i.y = i.y + r))
                : t == 225
                ? ((i.x = i.x - d), (i.y = i.y - r * h))
                : t == 45 && ((i.x = i.x + d * h), (i.y = i.y + r)),
              x++,
              (o = 0))
            : ((i.x = i.x + (d * Math.cos((t * Math.PI) / 180)) / y),
              (i.y = i.y + (r * Math.sin((t * Math.PI) / 180)) / C)),
          i.x > f && (f = i.x),
          i.y > v && (v = i.y),
          i.x < w && (w = i.x),
          i.y < n && (n = i.y)),
        a.draw.indexOf(a.rules[u]) != -1 && (t == 0 || t == 90)
          ? o++
          : a.rules[u] == "-"
          ? (t += a.angle)
          : a.rules[u] == "+" && (t -= a.angle);
    }
    if ((a.drawCurve && e.stroke(), !a.drawCurve))
      return { maxPosX: f, maxPosY: v, minPosX: w, minPosY: n };
  }
  function b(e) {
    var l = function (C, y) {
        showWarning(C, y, -1);
      },
      d = 10,
      r = e.iterations.trim();
    if (!/^-?\d+$/.test(r))
      return (
        l("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((r = parseInt(r)), r < 1))
      return (
        l("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (r > d)
      return (
        l(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(d)
        ),
        !1
      );
    var i = e.width.trim();
    if (!/^-?\d+$/.test(i))
      return l("Can't generate curve", "Width is not a number."), !1;
    if (((i = parseInt(i)), i <= 0))
      return l("Can't generate curve", "Width must be a positive number."), !1;
    var f = e.height.trim();
    if (!/^-?\d+$/.test(f))
      return l("Can't generate curve", "Height is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return l("Can't generate curve", "Height must be a positive number."), !1;
    var v = e["background-color"] || "#013fa3",
      w = e["line-segment-color"] || "white";
    if (!isThisColorIsValid(v))
      return l("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(w))
      return l("Can't generate curve", "Line color is not valid."), !1;
    var n = e["line-width"].trim();
    if (!/^-?\d+$/.test(n))
      return l("Can't generate curve", "Line width is not a number."), !1;
    if (((n = parseInt(n)), n < 1))
      return l("Can't generate curve", "Line width should be 1 or more."), !1;
    var t = e.padding.trim();
    if (!/^-?\d+$/.test(t))
      return l("Can't generate curve", "Padding is not a number."), !1;
    if (((t = parseInt(t)), t < 0))
      return l("Can't generate curve", "Padding can't be negative."), !1;
    var o = e.direction,
      x = "F",
      u = 45;
    return {
      iterations: r,
      width: i,
      height: f,
      background: v,
      lineSegmentColor: w,
      lineWidth: n,
      padding: t,
      draw: x,
      direction: o,
      angle: u,
    };
  }
  function q(a) {
    for (
      var e = a.getContext("2d"),
        l = a.width,
        d = a.height,
        r = 15,
        i = !0,
        f = 0;
      f <= l;
      f += r
    )
      for (var v = 0; v <= d; v += r)
        i ? (e.fillStyle = "#ffffff") : (e.fillStyle = "#efefef"),
          (i = !i),
          e.fillRect(f, v, f + r, v + r);
  }
}
