First_call();
function generate(options, cb) {
  var e = options,
    r = $(e);
  if (!r) return !1;
  var i = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (i.width = i.clientWidth),
    (i.height = i.clientHeight),
    (a.width = r.width || i.clientWidth),
    (a.height = r.height || i.clientHeight);
  var l = i.getContext("2d"),
    o = a.getContext("2d");
  H(i), (o.fillStyle = r.background), o.fillRect(0, 0, a.width, a.height);
  var v = z(r);
  T(a, v, r);

  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  var f = bestImageFit(a.width, a.height, i.width, i.height);
  l.drawImage(a, f.offsetX, f.offsetY, f.width, f.height);
  function z(e) {
    return I({
      drawCurve: !1,
      iterations: e.iterations,
      direction: e.direction,
    });
  }
  function T(e, r, i) {
    I({
      drawCurve: !0,
      canvas: e,
      size: r,
      lineWidth: i.lineWidth,
      lineSegmentColor: i.lineSegmentColor,
      fillColor: i.fillColor,
      padding: i.padding,
      direction: i.direction,
      iterations: i.iterations,
    });
  }
  function I(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      (r.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (r.strokeStyle = e.fillColor)
          : (r.strokeStyle = e.lineSegmentColor),
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
        l =
          (e.canvas.height - i.top - i.bottom) /
          (e.size.maxPosY - e.size.minPosY),
        o = i.left - e.size.minPosX * a,
        v = i.top - e.size.minPosY * l;
    } else
      var f = 0,
        s = 0,
        S = 0,
        c = 0,
        a = 1,
        l = 1,
        o = 0,
        v = 0;
    if (e.direction == "south-east") var u = 0;
    if (e.direction == "north-west") var u = 180;
    if (e.direction == "north-east") var u = 270;
    if (e.direction == "south-west") var u = 90;
    if (e.direction == "south") var u = 45;
    if (e.direction == "west") var u = 135;
    if (e.direction == "north") var u = 225;
    if (e.direction == "east") var u = 315;
    if ((k(o, v, a, l, u, 0), !e.drawCurve))
      return { maxPosX: f, maxPosY: s, minPosX: S, minPosY: c };
    function k(g, n, t, C, m, d) {
      if (d != e.iterations) {
        if (e.drawCurve) var h = W(r, g, n, t, C, m);
        else var h = y(r, g, n, t, C, m);
        k(
          h.ruleStack1[0],
          h.ruleStack1[1],
          t / 2,
          C / 2,
          h.ruleStack1[2] + 90,
          d + 1
        ),
          k(
            h.ruleStack2[0],
            h.ruleStack2[1],
            t / 2,
            C / 2,
            h.ruleStack2[2] - 90,
            d + 1
          );
      }
    }
    function W(g, n, t, C, m, d) {
      g.beginPath(), g.moveTo(n, t);
      for (var h, b, w = 0; w < 4; w++)
        g.lineTo(
          n + C * Math.cos((d * Math.PI) / 180),
          t + m * Math.sin((d * Math.PI) / 180)
        ),
          (n = n + C * Math.cos((d * Math.PI) / 180)),
          (t = t + m * Math.sin((d * Math.PI) / 180)),
          (d += 90),
          w == 2 && (h = [n, t, d]),
          w == 0 && (b = [n, t, d]);
      return (
        (g.fillStyle = e.fillColor),
        g.fill(),
        g.stroke(),
        { ruleStack1: h, ruleStack2: b }
      );
    }
    function y(g, n, t, C, m, d) {
      for (var h, b, w = 0; w < 4; w++)
        (n = n + C * Math.cos((d * Math.PI) / 180)),
          (t = t + m * Math.sin((d * Math.PI) / 180)),
          (d += 90),
          n > f && (f = n),
          t > s && (s = t),
          n < S && (S = n),
          t < c && (c = t),
          w == 2 && (h = [n, t, d]),
          w == 0 && (b = [n, t, d]);
      return {
        maxPosX: f,
        maxPosY: s,
        minPosX: S,
        minPosY: c,
        ruleStack1: h,
        ruleStack2: b,
      };
    }
  }
  function $(r) {
    var i = function (W, y) {
        showWarning(W, y, -1);
      },
      a = 18,
      l = r.iterations.trim();
    if (!/^-?\d+$/.test(l))
      return (
        i("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((l = parseInt(l)), l < 1))
      return (
        i("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (l > a)
      return (
        i(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(a)
        ),
        !1
      );
    var o = r.width.trim();
    if (!/^-?\d+$/.test(o))
      return i("Can't generate curve", "Width is not a number."), !1;
    if (((o = parseInt(o)), o <= 0))
      return i("Can't generate curve", "Width must be a positive number."), !1;
    var v = r.height.trim();
    if (!/^-?\d+$/.test(v))
      return i("Can't generate curve", "Height is not a number."), !1;
    if (((v = parseInt(v)), v <= 0))
      return i("Can't generate curve", "Height must be a positive number."), !1;
    var f = r["background-color"] || "#02a105",
      s = r["line-segment-color"] || "black",
      S = r["fill-color"] || "transparent";
    if (!isThisColorIsValid(f))
      return i("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(s))
      return i("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(S))
      return i("Can't generate curve", "Fill color is not valid."), !1;
    var c = r["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(c))
      return i("Can't generate curve", "Line width is not a number."), !1;
    if (((c = parseInt(c)), c < 0))
      return i("Can't generate curve", "Line width should be 1 or more."), !1;
    var u = r.padding.trim();
    if (!/^-?\d+$/.test(u))
      return i("Can't generate curve", "Padding is not a number."), !1;
    if (((u = parseInt(u)), u < 0))
      return i("Can't generate curve", "Padding can't be negative."), !1;
    var k = r.direction;
    return {
      iterations: l,
      width: o,
      height: v,
      background: f,
      lineSegmentColor: s,
      fillColor: S,
      lineWidth: c,
      padding: u,
      direction: k,
    };
  }
  function H(e) {
    for (
      var r = e.getContext("2d"),
        i = e.width,
        a = e.height,
        l = 15,
        o = !0,
        v = 0;
      v <= i;
      v += l
    )
      for (var f = 0; f <= a; f += l)
        o ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (o = !o),
          r.fillRect(v, f, v + l, f + l);
  }
}
