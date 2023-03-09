First_call();
function generate(options, cb) {
  var h = options,
    e = T(h);
  if (!e) return !1;
  var d = document.querySelector(".preview"),
    l = document.querySelector(".data");
  (d.width = d.clientWidth),
    (d.height = d.clientHeight),
    (l.width = e.width || d.clientWidth),
    (l.height = e.height || d.clientHeight);
  var c = d.getContext("2d"),
    f = l.getContext("2d");
  if (
    (k(d),
    (f.fillStyle = e.background),
    f.fillRect(0, 0, l.width, l.height),
    (f.strokeStyle = e.lineSegmentColor),
    e.squeezeMode && !e.barcodeMode
      ? ((f.lineWidth = 1), (f.strokeStyle = e.fillColor), (e.lineWidth = 1))
      : ((f.lineWidth = e.lineWidth),
        e.lineWidth == 0
          ? (f.strokeStyle = e.background)
          : (f.strokeStyle = e.lineSegmentColor)),
    e.barcodeMode)
  ) {
    if (e.direction == "up" || e.direction == "down")
      var t = l.height - 2 * e.padding - e.lineWidth,
        v = l.width - e.padding * 2 - e.lineWidth;
    else if (e.direction == "left" || e.direction == "right")
      var t = l.width - 2 * e.padding - e.lineWidth,
        m = l.height - e.padding * 2 - e.lineWidth;
  } else if (e.direction == "up" || e.direction == "down") {
    if (e.squeezeMode)
      var t = (l.height - 2 * e.padding - e.lineWidth) / e.iterations;
    else
      var t = (l.height - 2 * e.padding - e.lineWidth) / (e.iterations * 2 - 1);
    var v = l.width - e.padding * 2 - e.lineWidth;
  } else if (e.direction == "left" || e.direction == "right") {
    if (e.squeezeMode)
      var t = (l.width - 2 * e.padding - e.lineWidth) / e.iterations;
    else
      var t = (l.width - 2 * e.padding - e.lineWidth) / (e.iterations * 2 - 1);
    var m = l.height - e.padding * 2 - e.lineWidth;
  }
  if (e.direction == "down")
    var C = e.padding + e.lineWidth / 2,
      u = e.padding + e.lineWidth / 2;
  else if (e.direction == "up")
    var C = e.padding + e.lineWidth / 2,
      u = l.height - e.padding - e.lineWidth / 2 - t;
  else if (e.direction == "left")
    var C = l.width - e.padding - e.lineWidth / 2 - t,
      u = e.padding + e.lineWidth / 2;
  else if (e.direction == "right")
    var C = e.padding + e.lineWidth / 2,
      u = e.padding + e.lineWidth / 2;
  e.direction == "up" || e.direction == "down"
    ? g(C, u, v, 0, e)
    : (e.direction == "left" || e.direction == "right") && g(C, u, m, 0, e);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = l.toDataURL();
    link.click();
  });
  var s = bestImageFit(l.width, l.height, d.width, d.height);
  c.drawImage(l, s.offsetX, s.offsetY, s.width, s.height);
  function g(i, a, r, o, n) {
    o != n.iterations &&
      (n.barcodeMode
        ? (n.direction == "up" || n.direction == "down") &&
          o == n.iterations - 1
          ? b(f, i, u, r)
          : (n.direction == "left" || n.direction == "right") &&
            o == n.iterations - 1 &&
            W(f, C, a, r)
        : n.direction == "up" || n.direction == "down"
        ? b(f, i, a, r)
        : (n.direction == "left" || n.direction == "right") && W(f, i, a, r),
      n.squeezeMode && !n.barcodeMode
        ? n.direction == "up"
          ? (g(i, a - t, r / 3, o + 1, n),
            g(i + (2 * r) / 3, a - t, r / 3, o + 1, n))
          : n.direction == "down"
          ? (g(i, a + t, r / 3, o + 1, n),
            g(i + (2 * r) / 3, a + t, r / 3, o + 1, n))
          : n.direction == "left"
          ? (g(i - t, a, r / 3, o + 1, n),
            g(i - t, a + (2 * r) / 3, r / 3, o + 1, n))
          : n.direction == "right" &&
            (g(i + t, a, r / 3, o + 1, n),
            g(i + t, a + (2 * r) / 3, r / 3, o + 1, n))
        : n.direction == "up"
        ? (g(i, a - t * 2, r / 3, o + 1, n),
          g(i + (2 * r) / 3, a - t * 2, r / 3, o + 1, n))
        : n.direction == "down"
        ? (g(i, a + t * 2, r / 3, o + 1, n),
          g(i + (2 * r) / 3, a + t * 2, r / 3, o + 1, n))
        : n.direction == "left"
        ? (g(i - t * 2, a, r / 3, o + 1, n),
          g(i - t * 2, a + (2 * r) / 3, r / 3, o + 1, n))
        : n.direction == "right" &&
          (g(i + t * 2, a, r / 3, o + 1, n),
          g(i + t * 2, a + (2 * r) / 3, r / 3, o + 1, n)));
  }
  function b(i, a, r, o) {
    i.beginPath(),
      i.moveTo(a, r),
      i.lineTo(a + o, r),
      i.lineTo(a + o, r + t),
      i.lineTo(a, r + t),
      i.lineTo(a, r),
      i.lineTo(a + o, r),
      (i.fillStyle = e.fillColor),
      i.stroke(),
      i.fill();
  }
  function W(i, a, r, o) {
    i.beginPath(),
      i.moveTo(a, r),
      i.lineTo(a, r + o),
      i.lineTo(a + t, r + o),
      i.lineTo(a + t, r),
      i.lineTo(a, r),
      i.lineTo(a, r + o),
      (i.fillStyle = e.fillColor),
      i.stroke(),
      i.fill();
  }
  function T(e) {
    var d = function (i, a) {
        showWarning(i, a, -1);
      },
      l = parseInt(e.iterations || 0 || ""),
      c = 16;
    if (!/^-?\d+$/.test(l))
      return (
        d("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((l = parseInt(l)), l < 1))
      return (
        d("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (l > c)
      return (
        d(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(c)
        ),
        !1
      );
    var f = e.width.trim();
    if (!/^-?\d+$/.test(f))
      return d("Can't generate curve", "Width is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return d("Can't generate curve", "Width must be a positive number."), !1;
    var t = e.height.trim();
    if (!/^-?\d+$/.test(t))
      return d("Can't generate curve", "Height is not a number."), !1;
    if (((t = parseInt(t)), t <= 0))
      return d("Can't generate curve", "Height must be a positive number."), !1;
    var v = e["background-color"] || "#32016b",
      m = e["line-segment-color"] || "transparent",
      C = e["fill-color"] || "transparent";
    if (!isThisColorIsValid(v))
      return d("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(m))
      return d("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(C))
      return d("Can't generate curve", "Fill color is not valid."), !1;
    var u = e["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(u))
      return d("Can't generate curve", "Line width is not a number."), !1;
    if (((u = parseInt(u)), u < 0))
      return d("Can't generate curve", "Line width should be 0 or more."), !1;
    var s = e.padding.trim();
    if (!/^-?\d+$/.test(s))
      return d("Can't generate curve", "Padding is not a number."), !1;
    if (((s = parseInt(s)), s < 0))
      return d("Can't generate curve", "Padding can't be negative."), !1;
    var g = e.direction,
      b = e["squeeze-mode"],
      W = e["barcode-mode"];
    return {
      iterations: l,
      width: f,
      height: t,
      background: v,
      lineSegmentColor: m,
      fillColor: C,
      lineWidth: u,
      padding: s,
      direction: g,
      squeezeMode: b,
      barcodeMode: W,
    };
  }
  function k(h) {
    for (
      var e = h.getContext("2d"),
        d = h.width,
        l = h.height,
        c = 15,
        f = !0,
        t = 0;
      t <= d;
      t += c
    )
      for (var v = 0; v <= l; v += c)
        f ? (e.fillStyle = "#ffffff") : (e.fillStyle = "#efefef"),
          (f = !f),
          e.fillRect(t, v, t + c, v + c);
  }
}
