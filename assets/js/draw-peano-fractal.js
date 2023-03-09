First_call();
function generate(options, cb) {
  var r = options,
    i = I(r);
  if (!i) return !1;
  var l = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (l.width = l.clientWidth),
    (l.height = l.clientHeight),
    (a.width = i.width || l.clientWidth),
    (a.height = i.height || l.clientHeight);
  var d = l.getContext("2d"),
    e = a.getContext("2d");
  b(l), (e.fillStyle = i.background), e.fillRect(0, 0, a.width, a.height);
  var h = s(i),
    f = C(h, i);
  F(h, a, f, i);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  var u = bestImageFit(a.width, a.height, l.width, l.height);
  d.drawImage(a, u.offsetX, u.offsetY, u.width, u.height);
  function s(r) {
    return r.rhombusForm
      ? new LSystem({
          axiom: "F",
          productions: { F: "F+F-F-F-F+F+F+F-F" },
        }).iterate(r.iterations)
      : new LSystem({
          axiom: "A",
          productions: {
            A: "AFBFA+F+BFAFB-F-AFBFA",
            B: "BFAFB-F-AFBFA+F+BFAFB",
          },
        }).iterate(r.iterations);
  }
  function C(r, i) {
    return o({
      drawCurve: !1,
      rules: r,
      draw: i.draw,
      direction: i.direction,
      angle: i.angle,
      roundedCorners: roundedCorners,
    });
  }
  function F(r, i, l, a) {
    o({
      drawCurve: !0,
      canvas: i,
      rules: r,
      size: l,
      lineWidth: a.lineWidth,
      lineSegmentColor: a.lineSegmentColor,
      padding: a.padding,
      draw: a.draw,
      direction: a.direction,
      angle: a.angle,
      roundedCorners: a.roundedCorners,
      rhombusForm: a.rhombusForm,
      regularForm: a.regularForm,
    });
  }
  function o(r) {
    if (r.drawCurve) {
      var i = r.canvas.getContext("2d");
      (i.lineWidth = r.lineWidth),
        (i.strokeStyle = r.lineSegmentColor),
        (i.lineCap = "round");
      var l = {
          left: r.padding + r.lineWidth / 2,
          right: r.padding + r.lineWidth / 2,
          top: r.padding + r.lineWidth / 2,
          bottom: r.padding + r.lineWidth / 2,
        },
        a =
          (r.canvas.width - l.left - l.right) /
          (r.size.maxPosX - r.size.minPosX),
        d =
          (r.canvas.height - l.top - l.bottom) /
          (r.size.maxPosY - r.size.minPosY),
        e = { x: l.left - r.size.minPosX * a, y: l.top - r.size.minPosY * d };
    } else
      var h = 0,
        f = 0,
        u = 0,
        v = 0,
        a = 1,
        d = 1,
        e = { x: 0, y: 0 };
    if (r.direction == "right") var t = 0;
    if (r.direction == "left") var t = 180;
    if (r.direction == "up") var t = 270;
    if (r.direction == "down") var t = 90;
    r.drawCurve && (i.beginPath(), i.moveTo(e.x, e.y));
    for (var n = 0; n < r.rules.length; n++)
      r.drawCurve &&
        r.draw.indexOf(r.rules[n]) != -1 &&
        (r.roundedCorners
          ? ((n == 3 || n == r.rules.length - 2) && r.regularForm) ||
            ((n == 0 || n == r.rules.length - 1) && r.rhombusForm)
            ? (i.lineTo(
                e.x +
                  (a - (a * Math.sqrt(2)) / 4) * Math.cos((t * Math.PI) / 180),
                e.y +
                  (d - (d * Math.sqrt(2)) / 4) * Math.sin((t * Math.PI) / 180)
              ),
              (e.x =
                e.x +
                (a - (a * Math.sqrt(2)) / 4) * Math.cos((t * Math.PI) / 180)),
              (e.y =
                e.y +
                (d - (d * Math.sqrt(2)) / 4) * Math.sin((t * Math.PI) / 180)))
            : r.rules[n + 1] == "+" ||
              r.rules[n + 1] == "-" ||
              (r.rules[n + 1] == "A" &&
                (r.rules[n + 2] == "+" || r.rules[n + 2] == "-")) ||
              (r.rules[n + 1] == "B" &&
                (r.rules[n + 2] == "+" || r.rules[n + 2] == "-"))
            ? (i.lineTo(
                e.x +
                  (a - (a * Math.sqrt(2)) / 2) * Math.cos((t * Math.PI) / 180),
                e.y +
                  (d - (d * Math.sqrt(2)) / 2) * Math.sin((t * Math.PI) / 180)
              ),
              (e.x =
                e.x +
                (a - (a * Math.sqrt(2)) / 2) * Math.cos((t * Math.PI) / 180)),
              (e.y =
                e.y +
                (d - (d * Math.sqrt(2)) / 2) * Math.sin((t * Math.PI) / 180)))
            : (i.lineTo(
                e.x + a * Math.cos((t * Math.PI) / 180),
                e.y + d * Math.sin((t * Math.PI) / 180)
              ),
              (e.x = e.x + a * Math.cos((t * Math.PI) / 180)),
              (e.y = e.y + d * Math.sin((t * Math.PI) / 180)))
          : (i.lineTo(
              e.x + a * Math.cos((t * Math.PI) / 180),
              e.y + d * Math.sin((t * Math.PI) / 180)
            ),
            (e.x = e.x + a * Math.cos((t * Math.PI) / 180)),
            (e.y = e.y + d * Math.sin((t * Math.PI) / 180)))),
        !r.drawCurve && r.draw.indexOf(r.rules[n]) != -1
          ? ((e.x = e.x + a * Math.cos((t * Math.PI) / 180)),
            (e.y = e.y + d * Math.sin((t * Math.PI) / 180)),
            e.x > h && (h = e.x),
            e.y > f && (f = e.y),
            e.x < u && (u = e.x),
            e.y < v && (v = e.y))
          : r.rules[n] == "-"
          ? ((t += r.angle),
            r.roundedCorners &&
              (r.drawCurve &&
                (i.lineTo(
                  e.x + (a / 2) * Math.cos((t * Math.PI) / 180),
                  e.y + (d / 2) * Math.sin((t * Math.PI) / 180)
                ),
                (e.x = e.x + (a / 2) * Math.cos((t * Math.PI) / 180)),
                (e.y = e.y + (d / 2) * Math.sin((t * Math.PI) / 180))),
              (t += r.angle)))
          : r.rules[n] == "+" &&
            ((t -= r.angle),
            r.roundedCorners &&
              (r.drawCurve &&
                (i.lineTo(
                  e.x + (a / 2) * Math.cos((t * Math.PI) / 180),
                  e.y + (d / 2) * Math.sin((t * Math.PI) / 180)
                ),
                (e.x = e.x + (a / 2) * Math.cos((t * Math.PI) / 180)),
                (e.y = e.y + (d / 2) * Math.sin((t * Math.PI) / 180))),
              (t -= r.angle)));
    if ((r.drawCurve && i.stroke(), !r.drawCurve))
      return { maxPosX: h, maxPosY: f, minPosX: u, minPosY: v };
  }
  function I(i) {
    var l = function (m, g) {
        showWarning(m, g, -1);
      },
      a = 7,
      d = i.iterations.trim();
    if (!/^-?\d+$/.test(d))
      return (
        l("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((d = parseInt(d)), d < 1))
      return (
        l("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (d > a)
      return (
        l(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(a)
        ),
        !1
      );
    var e = i.width.trim();
    if (!/^-?\d+$/.test(e))
      return l("Can't generate curve", "Width is not a number."), !1;
    if (((e = parseInt(e)), e <= 0))
      return l("Can't generate curve", "Width must be a positive number."), !1;
    var h = i.height.trim();
    if (!/^-?\d+$/.test(h))
      return l("Can't generate curve", "Height is not a number."), !1;
    if (((h = parseInt(h)), h <= 0))
      return l("Can't generate curve", "Height must be a positive number."), !1;
    var f = i["background-color"] || "#013fa3",
      u = i["line-segment-color"] || "white";
    if (!isThisColorIsValid(f))
      return l("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(u))
      return l("Can't generate curve", "Line color is not valid."), !1;
    var v = i["line-width"].trim();
    if (!/^-?\d+$/.test(v))
      return l("Can't generate curve", "Line width is not a number."), !1;
    if (((v = parseInt(v)), v < 1))
      return l("Can't generate curve", "Line width should be 1 or more."), !1;
    var t = i.padding.trim();
    if (!/^-?\d+$/.test(t))
      return l("Can't generate curve", "Padding is not a number."), !1;
    if (((t = parseInt(t)), t < 0))
      return l("Can't generate curve", "Padding can't be negative."), !1;
    (rhombusForm = i["rhombus-form"]),
      (regularForm = i["regular-form"]),
      (roundedCorners = i["rounded-corners"]),
      (direction = i.direction);
    var n = "F";
    if (roundedCorners) var M = 45;
    else var M = 90;
    return {
      iterations: d,
      width: e,
      height: h,
      background: f,
      lineSegmentColor: u,
      lineWidth: v,
      padding: t,
      draw: n,
      direction: direction,
      angle: M,
      rhombusForm: rhombusForm,
      regularForm: regularForm,
      roundedCorners: roundedCorners,
    };
  }
  function b(r) {
    for (
      var i = r.getContext("2d"),
        l = r.width,
        a = r.height,
        d = 15,
        e = !0,
        h = 0;
      h <= l;
      h += d
    )
      for (var f = 0; f <= a; f += d)
        e ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
          (e = !e),
          i.fillRect(h, f, h + d, f + d);
  }
}
