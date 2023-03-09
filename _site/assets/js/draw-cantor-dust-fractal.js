First_call();
function generate(options, cb) {
  var u = options,
    e = T(u);
  if (!e) return !1;
  var t = document.querySelector(".preview"),
    o = document.querySelector(".data");
  (t.width = t.clientWidth),
    (t.height = t.clientHeight),
    (o.width = e.width || t.clientWidth),
    (o.height = e.height || t.clientHeight);
  var f = t.getContext("2d"),
    r = o.getContext("2d");
  q(t),
    (r.fillStyle = e.background),
    r.fillRect(0, 0, o.width, o.height),
    (r.lineWidth = e.lineWidth),
    e.lineWidth == 0
      ? (r.strokeStyle = "transparent")
      : (r.strokeStyle = e.lineSegmentColor),
    (r.lineCap = "round"),
    (r.fillStyle = e.fillColor);
  var d = o.width - e.padding * 2 - e.lineWidth,
    p = o.height - e.padding * 2 - e.lineWidth,
    b = e.padding + e.lineWidth / 2,
    w = e.padding + e.lineWidth / 2,
    S = e.ratio,
    v = [];
  if ((c(b, w, d, p, 0, S, e, !1), e.type == ["connected-dust"]))
    for (var g = v.length - 1; g > 0; g--)
      W(r, v[g][0], v[g][1], v[g][2], v[g][3]);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = o.toDataURL();
    link.click();
  });
  var m = bestImageFit(o.width, o.height, t.width, t.height);
  f.drawImage(o, m.offsetX, m.offsetY, m.width, m.height);
  function c(i, s, a, l, h, n, C, y) {
    h != C.iterations &&
      (y ? (r.fillStyle = C.centralSquareColor) : (r.fillStyle = C.fillColor),
      C.type == "connected-dust" && y && v.push([i, s, a, l]),
      h == C.iterations - 1 && W(r, i, s, a, l),
      c(i, s, a / n, l / n, h + 1, n, C, !1),
      c(i + a - a / n, s, a / n, l / n, h + 1, n, C, !1),
      c(i, s + l - l / n, a / n, l / n, h + 1, n, C, !1),
      c(i + a - a / n, s + l - l / n, a / n, l / n, h + 1, n, C, !1),
      C.type != ["dust"] &&
        c(
          i + a / n,
          s + l / n,
          a - (2 * a) / n,
          l - (2 * l) / n,
          h + 1,
          n,
          C,
          !0
        ));
  }
  function W(i, s, a, l, h) {
    i.beginPath(),
      i.moveTo(s, a),
      i.lineTo(s + l, a),
      i.lineTo(s + l, a + h),
      i.lineTo(s, a + h),
      i.lineTo(s, a),
      i.lineTo(s + l, a),
      i.fill(),
      i.stroke();
  }
  function T(e) {
    var t = function (W, i) {
        showWarning(W, i, -1);
      },
      o = 11,
      f = e.iterations.trim();
    if (!/^-?\d+$/.test(f))
      return (
        t("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((f = parseInt(f)), f < 1))
      return (
        t("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (f > o)
      return (
        t(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(o)
        ),
        !1
      );
    var r = e.width.trim();
    if (!/^-?\d+$/.test(r))
      return t("Can't generate curve", "Width is not a number."), !1;
    if (((r = parseInt(r)), r <= 0))
      return t("Can't generate curve", "Width must be a positive number."), !1;
    var d = e.height.trim();
    if (!/^-?\d+$/.test(d))
      return t("Can't generate curve", "Height is not a number."), !1;
    if (((d = parseInt(d)), d <= 0))
      return t("Can't generate curve", "Height must be a positive number."), !1;
    var p = e["background-color"] || "#32016b",
      b = e["line-segment-color"] || "transparent",
      w = e["fill-color"] || "transparent",
      S = e["central-square-color"] || p;
    if (!isThisColorIsValid(p))
      return t("Can't generate curve", "Background color is not valid."), !1;
    if (!isThisColorIsValid(b))
      return t("Can't generate curve", "Line color is not valid."), !1;
    if (!isThisColorIsValid(w))
      return t("Can't generate curve", "Fill color is not valid."), !1;
    if (!isThisColorIsValid(S))
      return (
        t("Can't generate curve", "Central square fill color is not valid."), !1
      );
    var v = e["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(v))
      return t("Can't generate curve", "Line width is not a number."), !1;
    if (((v = parseInt(v)), v < 0))
      return t("Can't generate curve", "Line width should be 1 or more."), !1;
    var g = e.padding.trim();
    if (!/^-?\d+$/.test(g))
      return t("Can't generate curve", "Padding is not a number."), !1;
    if (((g = parseInt(g)), g < 0))
      return t("Can't generate curve", "Padding can't be negative."), !1;
    if (e.dust) var m = "dust";
    else if (e["connected-dust"]) var m = "connected-dust";
    else if (e["dusty-dust"]) var m = "dusty-dust";
    var c = e.ratio.trim();
    return /^[+-]?\d*\.?\d+$/.test(c)
      ? ((c = parseFloat(c)),
        c <= 2
          ? (showWarning(
              "Can't generate curve",
              "Ratio should be greater than two."
            ),
            !1)
          : {
              iterations: f,
              width: r,
              height: d,
              background: p,
              lineSegmentColor: b,
              fillColor: w,
              lineWidth: v,
              padding: g,
              ratio: c,
              type: m,
              centralSquareColor: S,
            })
      : (showWarning("Can't generate curve", "Ratio is not a number."), !1);
  }
  function q(u) {
    for (
      var e = u.getContext("2d"),
        t = u.width,
        o = u.height,
        f = 15,
        r = !0,
        d = 0;
      d <= t;
      d += f
    )
      for (var p = 0; p <= o; p += f)
        r ? (e.fillStyle = "#ffffff") : (e.fillStyle = "#efefef"),
          (r = !r),
          e.fillRect(d, p, d + f, p + f);
  }
}
