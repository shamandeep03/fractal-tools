First_call();
function generate(options, cb) {
  var e = options,
    i = b(e);
  if (!i) return !1;
  var a = document.querySelector(".preview"),
    t = document.querySelector(".data");
  (a.width = a.clientWidth),
    (a.height = a.clientHeight),
    (t.width = i.width || a.clientWidth),
    (t.height = i.height || a.clientHeight);
  var l = a.getContext("2d"),
    r = t.getContext("2d");
  I(a), (r.fillStyle = i.background), r.fillRect(0, 0, t.width, t.height);
  var f = M(i),
    d = C(f, i);
  y(f, t, d, i);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = t.toDataURL();
    link.click();
  });
  var h = bestImageFit(t.width, t.height, a.width, a.height);
  l.drawImage(t, h.offsetX, h.offsetY, h.width, h.height);
  function M(e) {
    return e.form == "form-1"
      ? e.iterations == 1
        ? "F+F+F+F+F+F"
        : new LSystem({
            axiom: "F+F+F+F+F+F",
            productions: { F: "[F]+[F]+[F]+[F]+[F]+[F]+F" },
          }).iterate(e.iterations - 1)
      : e.form == "form-2"
      ? e.iterations == 1
        ? "F+F+F+F+F+F"
        : new LSystem({
            axiom: "F+F+F+F+F+F+A+A+A--F",
            productions: { F: "[F]+[F]+[F]+[F]+[F]+[F]+F" },
          }).iterate(e.iterations - 1)
      : e.iterations == 1
      ? "F+F+F+F+F+F"
      : new LSystem({
          axiom: "F+F+F+F+F+F",
          productions: { F: "F+F+F--F--F+F+F" },
        }).iterate(e.iterations - 1);
  }
  function C(e, i) {
    if (i.form != "form-3") var a = "F+F+F+F+F+F";
    else var a = e;
    return s({
      drawCurve: !1,
      rules: a,
      draw: i.draw,
      angle: i.angle,
      direction: i.direction,
    });
  }
  function y(e, i, a, t) {
    s({
      drawCurve: !0,
      canvas: i,
      rules: e,
      size: a,
      lineWidth: t.lineWidth,
      lineSegmentColor: t.lineSegmentColor,
      fillColor: t.fillColor,
      padding: t.padding,
      draw: t.draw,
      angle: t.angle,
      background: t.background,
      iterations: t.iterations,
      direction: t.direction,
      form: t.form,
    });
  }
  function s(e) {
    if (e.drawCurve) {
      var i = e.canvas.getContext("2d");
      (i.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (i.strokeStyle = e.background)
          : (i.strokeStyle = e.lineSegmentColor),
        (i.lineCap = "round");
      for (
        var a = {
            left: e.padding + e.lineWidth / 2,
            right: e.padding + e.lineWidth / 2,
            top: e.padding + e.lineWidth / 2,
            bottom: e.padding + e.lineWidth / 2,
          },
          t =
            (e.canvas.width - a.left - a.right) /
            (e.size.maxPosX - e.size.minPosX),
          l =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY),
          r = {
            x: a.left - e.size.minPosX * t,
            y: a.top - e.size.minPosY * l,
          },
          f = 0,
          d = 1;
        d <= Math.floor(6 / 4);
        d++
      )
        f += Math.cos((2 * Math.PI * d) / 6);
      var h = 1 / (2 * (1 + f));
    } else
      var w = 0,
        u = 0,
        F = 0,
        c = 0,
        t = 1,
        l = 1,
        r = { x: 0, y: 0 };
    if (e.direction == "right") var n = 0;
    if (e.direction == "left") var n = 180;
    if (e.direction == "up") var n = 270;
    if (e.direction == "down") var n = 90;
    e.drawCurve && (i.beginPath(), i.moveTo(r.x, r.y));
    for (var g = 0, o = 0; o < e.rules.length; o++) {
      if (e.drawCurve && e.draw.indexOf(e.rules[o]) != -1) {
        if (e.form == "form-3")
          i.lineTo(
            r.x + t * Math.cos((n * Math.PI) / 180),
            r.y + l * Math.sin((n * Math.PI) / 180)
          ),
            (r.x = r.x + t * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * Math.sin((n * Math.PI) / 180));
        else if (
          (e.rules[o] == "A" &&
            (i.moveTo(
              r.x + t * h * Math.cos((n * Math.PI) / 180),
              r.y + l * h * Math.sin((n * Math.PI) / 180)
            ),
            (r.x = r.x + t * h * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * h * Math.sin((n * Math.PI) / 180))),
          e.rules[o] == "F")
        ) {
          var v = 1;
          g > 0 && (v = v * Math.pow(h, g)),
            g == e.iterations - 1
              ? i.lineTo(
                  r.x + t * v * Math.cos((n * Math.PI) / 180),
                  r.y + l * v * Math.sin((n * Math.PI) / 180)
                )
              : i.moveTo(
                  r.x + t * v * Math.cos((n * Math.PI) / 180),
                  r.y + l * v * Math.sin((n * Math.PI) / 180)
                ),
            (r.x = r.x + t * v * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * v * Math.sin((n * Math.PI) / 180));
        }
      }
      !e.drawCurve && e.draw.indexOf(e.rules[o]) != -1
        ? ((r.x = r.x + t * Math.cos((n * Math.PI) / 180)),
          (r.y = r.y + l * Math.sin((n * Math.PI) / 180)),
          r.x > w && (w = r.x),
          r.y > u && (u = r.y),
          r.x < F && (F = r.x),
          r.y < c && (c = r.y))
        : e.rules[o] == "-"
        ? (n -= e.angle)
        : e.rules[o] == "+"
        ? (n += e.angle)
        : e.rules[o] == "["
        ? (g += 1)
        : e.rules[o] == "]" && (g -= 1);
    }
    if (
      (e.drawCurve && ((i.fillStyle = e.fillColor), i.fill(), i.stroke()),
      !e.drawCurve)
    )
      return { maxPosX: w, maxPosY: u, minPosX: F, minPosY: c };
  }
  function b(i) {
    var a = function (v, W) {
        showWarning(v, W, -1);
      },
      t = 7,
      l = i.iterations.trim();
    if (!/^-?\d+$/.test(l))
      return (
        a("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((l = parseInt(l)), l < 1))
      return (
        a("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (l > t)
      return (
        a(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(t)
        ),
        !1
      );
    var r = i.width.trim();
    if (!/^-?\d+$/.test(r))
      return a("Can't generate curve", "Width is not a number."), !1;
    if (((r = parseInt(r)), r <= 0))
      return a("Can't generate curve", "Width must be a positive number."), !1;
    var f = i.height.trim();
    if (!/^-?\d+$/.test(f))
      return a("Can't generate curve", "Height is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return a("Can't generate curve", "Height must be a positive number."), !1;
    var d = i["background-color"] || "#0533ff",
      h = i["line-segment-color"] || "transparent",
      w = i["fill-color"] || "transparent";
    if (!isThisColorIsValid(d))
      return a("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(h))
      return a("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(w))
      return a("Can't generate curve", "Fill color is not valid."), !1;
    var u = i["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(u))
      return a("Can't generate curve", "Line width is not a number."), !1;
    if (((u = parseInt(u)), u < 0))
      return a("Can't generate curve", "Line width should be 1 or more."), !1;
    var F = i.padding.trim();
    if (!/^-?\d+$/.test(F))
      return a("Can't generate curve", "Padding is not a number."), !1;
    if (((F = parseInt(F)), F < 0))
      return a("Can't generate curve", "Padding can't be negative."), !1;
    var c = "FA",
      n = i.direction;
    if (i["form-1"]) var g = "form-1";
    else if (i["form-2"]) var g = "form-2";
    else var g = "form-3";
    var o = 60;
    return {
      iterations: l,
      width: r,
      height: f,
      background: d,
      lineSegmentColor: h,
      fillColor: w,
      lineWidth: u,
      padding: F,
      draw: c,
      angle: o,
      direction: n,
      form: g,
    };
  }
  function I(e) {
    for (
      var i = e.getContext("2d"),
        a = e.width,
        t = e.height,
        l = 15,
        r = !0,
        f = 0;
      f <= a;
      f += l
    )
      for (var d = 0; d <= t; d += l)
        r ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
          (r = !r),
          i.fillRect(f, d, f + l, d + l);
  }
}
