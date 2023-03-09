First_call();
function generate(options, cb) {
  var e = options,
    r = C(e);
  if (!r) return !1;
  var a = document.querySelector(".preview"),
    i = document.querySelector(".data");
  (a.width = a.clientWidth),
    (a.height = a.clientHeight),
    (i.width = r.width || a.clientWidth),
    (i.height = r.height || a.clientHeight);
  var n = a.getContext("2d"),
    l = i.getContext("2d");
  m(a), (l.fillStyle = r.background), l.fillRect(0, 0, i.width, i.height);
  var f = g(r),
    d = s(f, r);
  y(f, i, d, r);

  var v = bestImageFit(i.width, i.height, a.width, a.height);
  n.drawImage(i, v.offsetX, v.offsetY, v.width, v.height);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = i.toDataURL();
    link.click();
  });
  function g(e) {
    if (e.type == "koch-snowflake")
      return e.iterations == 1
        ? "F_F_F"
        : new LSystem({
            axiom: "F_F_F",
            productions: { F: "F+F_F+F" },
          }).iterate(e.iterations - 1);
    if (e.type == "koch-antisnowflake")
      return e.iterations == 1
        ? "F_F_F"
        : new LSystem({
            axiom: "F_F_F",
            productions: { F: "F-F++F-F" },
          }).iterate(e.iterations - 1);
    if (e.type == "koch-line")
      return e.iterations == 1
        ? "F"
        : new LSystem({ axiom: "F", productions: { F: "F+F_F+F" } }).iterate(
            e.iterations - 1
          );
  }
  function s(e, r) {
    return c({
      drawCurve: !1,
      rules: e,
      draw: r.draw,
      direction: r.direction,
      angle: r.angle,
      iterations: r.iterations,
      type: r.type,
    });
  }
  function y(e, r, a, i) {
    c({
      drawCurve: !0,
      canvas: r,
      rules: e,
      size: a,
      lineWidth: i.lineWidth,
      lineSegmentColor: i.lineSegmentColor,
      fillColor: i.fillColor,
      padding: i.padding,
      draw: i.draw,
      direction: i.direction,
      angle: i.angle,
      iterations: i.iterations,
      type: i.type,
    });
  }
  function c(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      (r.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (r.strokeStyle = "transparent")
          : (r.strokeStyle = e.lineSegmentColor),
        (r.lineCap = "round");
      var a = {
        left: e.padding + e.lineWidth,
        right: e.padding + e.lineWidth,
        top: e.padding + e.lineWidth,
        bottom: e.padding + e.lineWidth,
      };
      if (
        e.iterations == 1 &&
        e.type == "koch-line" &&
        (e.direction == "up" || e.direction == "down")
      ) {
        (n =
          (e.canvas.width - a.left - a.right) /
          (e.size.maxPosX - e.size.minPosX)),
          (l = 0);
        var i = { x: a.left - e.size.minPosX * n, y: e.canvas.height / 2 };
      } else if (
        e.iterations == 1 &&
        e.type == "koch-line" &&
        (e.direction == "right" || e.direction == "left")
      ) {
        (n = 0),
          (l =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY));
        var i = { x: e.canvas.width / 2, y: a.top - e.size.minPosY * l };
      } else
        var n =
            (e.canvas.width - a.left - a.right) /
            (e.size.maxPosX - e.size.minPosX),
          l =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY),
          i = {
            x: a.left - e.size.minPosX * n,
            y: a.top - e.size.minPosY * l,
          };
    } else
      var f = 0,
        d = 0,
        v = 0,
        o = 0,
        n = 1,
        l = 1,
        i = { x: 0, y: 0 };
    if (e.type == "koch-antisnowflake") {
      if (e.direction == "right") var t = 270;
      if (e.direction == "left") var t = 90;
      if (e.direction == "up") var t = 180;
      if (e.direction == "down") var t = 0;
    } else {
      if (e.direction == "right") var t = 90;
      if (e.direction == "left") var t = 270;
      if (e.direction == "up") var t = 0;
      if (e.direction == "down") var t = 180;
    }
    e.drawCurve && (r.beginPath(), r.moveTo(i.x, i.y));
    for (var h = 0; h < e.rules.length; h++)
      e.drawCurve &&
        e.draw.indexOf(e.rules[h]) != -1 &&
        (r.lineTo(
          i.x + n * Math.cos((t * Math.PI) / 180),
          i.y + l * Math.sin((t * Math.PI) / 180)
        ),
        (i.x = i.x + n * Math.cos((t * Math.PI) / 180)),
        (i.y = i.y + l * Math.sin((t * Math.PI) / 180))),
        !e.drawCurve && e.draw.indexOf(e.rules[h]) != -1
          ? ((i.x = i.x + n * Math.cos((t * Math.PI) / 180)),
            (i.y = i.y + l * Math.sin((t * Math.PI) / 180)),
            i.x > f && (f = i.x),
            i.y > d && (d = i.y),
            i.x < v && (v = i.x),
            i.y < o && (o = i.y))
          : e.rules[h] == "-"
          ? (t += e.angle)
          : e.rules[h] == "+"
          ? (t -= e.angle)
          : e.rules[h] == "_" && (t += 2 * e.angle);
    if (
      (e.drawCurve &&
        (e.type != "koch-line" &&
          ((t += 2 * e.angle),
          r.lineTo(
            i.x + n * Math.cos((t * Math.PI) / 180),
            i.y + l * Math.sin((t * Math.PI) / 180)
          ),
          (r.fillStyle = e.fillColor),
          r.fill()),
        r.stroke()),
      !e.drawCurve)
    )
      return { maxPosX: f, maxPosY: d, minPosX: v, minPosY: o };
  }
  function C(r) {
    var a = function (z, M) {
        showWarning(z, M, -1);
      },
      i = 11,
      n = r.iterations.trim();
    if (!/^-?\d+$/.test(n))
      return (
        a("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((n = parseInt(n)), n < 1))
      return (
        a("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (n > i)
      return (
        a(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(i)
        ),
        !1
      );
    var l = r.width.trim();
    if (!/^-?\d+$/.test(l))
      return a("Can't generate curve", "Width is not a number."), !1;
    if (((l = parseInt(l)), l <= 0))
      return a("Can't generate curve", "Width must be a positive number."), !1;
    var f = r.height.trim();
    if (!/^-?\d+$/.test(f))
      return a("Can't generate curve", "Height is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return a("Can't generate curve", "Height must be a positive number."), !1;
    var d = r["background-color"] || "#0533ff",
      v = r["line-segment-color"] || "transparent",
      o = r["fill-color"] || "transparent";
    if (!isThisColorIsValid(d))
      return a("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(v))
      return a("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(o))
      return a("Can't generate curve", "Fill color is not valid."), !1;
    var t = r["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(t))
      return a("Can't generate curve", "Line width is not a number."), !1;
    if (((t = parseInt(t)), t < 0))
      return a("Can't generate curve", "Line width should be 0 or more."), !1;
    var h = r.padding.trim();
    if (!/^-?\d+$/.test(h))
      return a("Can't generate curve", "Padding is not a number."), !1;
    if (((h = parseInt(h)), h < 0))
      return a("Can't generate curve", "Padding can't be negative."), !1;
    var F = r.direction,
      k = "F",
      b = 60;
    if (r["koch-snowflake"]) var u = "koch-snowflake";
    else if (r["koch-antisnowflake"]) var u = "koch-antisnowflake";
    else if (r["koch-line"]) var u = "koch-line";
    return {
      iterations: n,
      width: l,
      height: f,
      background: d,
      lineSegmentColor: v,
      fillColor: o,
      lineWidth: t,
      padding: h,
      draw: k,
      direction: F,
      angle: b,
      type: u,
    };
  }
  function m(e) {
    for (
      var r = e.getContext("2d"),
        a = e.width,
        i = e.height,
        n = 15,
        l = !0,
        f = 0;
      f <= a;
      f += n
    )
      for (var d = 0; d <= i; d += n)
        l ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (l = !l),
          r.fillRect(f, d, f + n, d + n);
  }
}
