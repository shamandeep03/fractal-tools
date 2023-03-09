First_call();
function generate(options, cb) {
  var e = options,
    r = X(e);
  if (!r) return !1;
  var i = document.querySelector(".preview"),
    t = document.querySelector(".data");
  (i.width = i.clientWidth),
    (i.height = i.clientHeight),
    (t.width = r.width || i.clientWidth),
    (t.height = r.height || i.clientHeight);
  var a = i.getContext("2d"),
    n = t.getContext("2d");
  A(i);
  var f = z(r.direction, t);
  (n.fillStyle = s(n, f, r.background)), n.fillRect(0, 0, t.width, t.height);
  var d = I(r),
    g = $(d, r);
  R(d, t, g, r);
  var c = bestImageFit(t.width, t.height, i.width, i.height);
  a.drawImage(t, c.offsetX, c.offsetY, c.width, c.height);
  document.querySelector("#download-button").addEventListener("click", () => {
     var link = document.createElement("a");
     link.download = "filename.png";
     link.href = t.toDataURL();
     link.click();
   });
  function I(e) {
    return e.iterations == 1
      ? "FX"
      : new LSystem({
          axiom: "FX",
          productions: { X: "<[-FX]>+(FX)" },
        }).iterate(e.iterations - 1);
  }
  function $(e, r) {
    return W({
      drawCurve: !1,
      rules: e,
      draw: r.draw,
      direction: r.direction,
      lengthFactor: r.lengthFactor,
      widthFactor: r.widthFactor,
      angle: r.angle,
      skipTrunk: r.skipTrunk,
    });
  }
  function R(e, r, i, t) {
    W({
      drawCurve: !0,
      canvas: r,
      rules: e,
      size: i,
      lineWidth: t.lineWidth,
      lineColor: t.lineColor,
      padding: t.padding,
      draw: t.draw,
      direction: t.direction,
      lengthFactor: t.lengthFactor,
      widthFactor: t.widthFactor,
      angle: t.angle,
      skipTrunk: t.skipTrunk,
      gradientType: t.gradientType,
      iterations: t.iterations,
    });
  }
  function W(e) {
    if (e.drawCurve) {
      var r = e.canvas.getContext("2d");
      r.lineWidth = e.lineWidth;
      var i = {
        left: e.padding + e.lineWidth / 2,
        right: e.padding + e.lineWidth / 2,
        top: e.padding + e.lineWidth / 2,
        bottom: e.padding + e.lineWidth / 2,
      };
      if (
        (e.iterations == 1 || (e.angle.left == 0 && e.angle.right == 0)) &&
        (e.direction == "right" || e.direction == "left")
      ) {
        (a =
          (e.canvas.width - i.left - i.right) /
          (e.size.maxPosX - e.size.minPosX)),
          (n = 0);
        var t = { x: i.left - e.size.minPosX * a, y: e.canvas.height / 2 };
      } else if (
        (e.iterations == 1 || (e.angle.left == 0 && e.angle.right == 0)) &&
        (e.direction == "up" || e.direction == "down")
      ) {
        (a = 0),
          (n =
            (e.canvas.height - i.top - i.bottom) /
            (e.size.maxPosY - e.size.minPosY));
        var t = { x: e.canvas.width / 2, y: i.top - e.size.minPosY * n };
      } else
        var a =
            (e.canvas.width - i.left - i.right) /
            (e.size.maxPosX - e.size.minPosX),
          n =
            (e.canvas.height - i.top - i.bottom) /
            (e.size.maxPosY - e.size.minPosY),
          t = {
            x: i.left - e.size.minPosX * a,
            y: i.top - e.size.minPosY * n,
          };
      if (e.gradientType == "gradient-in-tree-direction") {
        var f = z(e.direction, e.canvas);
        r.strokeStyle = s(r, f, e.lineColor);
      } else {
        if (e.skipTrunk) {
          if (e.gradientType == "individual-segment-gradient")
            var d = e.iterations - 1;
          else if (e.gradientType == "gradient-from-trunk-to-twigs")
            var d = e.iterations;
          var g = 0;
        } else {
          if (e.gradientType == "individual-segment-gradient")
            var d = e.iterations;
          else if (e.gradientType == "gradient-from-trunk-to-twigs")
            var d = e.iterations + 1;
          var g = 1;
        }
        chromaScale = chroma.scale([e.lineColor[0], e.lineColor[1]]).colors(d);
      }
    } else
      var c = 0,
        w = 0,
        m = 0,
        F = 0,
        a = 1,
        n = 1,
        t = { x: 0, y: 0 };
    if (e.direction == "right") var u = 0;
    if (e.direction == "left") var u = 180;
    if (e.direction == "up") var u = 270;
    if (e.direction == "down") var u = 90;
    var o = [];
    e.skipTrunk && (e.rules = e.rules.slice(1));
    for (var l = 0; l < e.rules.length; l++) {
      e.drawCurve && (r.beginPath(), r.moveTo(t.x, t.y));
      var v = t.x + a * Math.cos((u * Math.PI) / 180),
        h = t.y + n * Math.sin((u * Math.PI) / 180),
        C = t.x,
        T = t.y;
      if (
        (e.drawCurve &&
          e.draw.indexOf(e.rules[l]) != -1 &&
          (r.lineTo(v, h), (t.x = v), (t.y = h)),
        !e.drawCurve && e.draw.indexOf(e.rules[l]) != -1)
      )
        (t.x = v),
          (t.y = h),
          t.x > c && (c = t.x),
          t.y > w && (w = t.y),
          t.x < m && (m = t.x),
          t.y < F && (F = t.y);
      else if (e.rules[l] == "-") u += e.angle.right;
      else if (e.rules[l] == "+") u -= e.angle.left;
      else if (e.rules[l] == "[") o.push([t.x, t.y, u]);
      else if (e.rules[l] == "]") {
        var y = o.pop();
        (t.x = y[0]), (t.y = y[1]), (u = y[2]);
      } else
        e.rules[l] == "<"
          ? ((a *= e.lengthFactor.right),
            (n *= e.lengthFactor.right),
            e.drawCurve && (r.lineWidth *= e.widthFactor.right),
            g++)
          : e.rules[l] == ">"
          ? ((a /= e.lengthFactor.right),
            (n /= e.lengthFactor.right),
            e.drawCurve && (r.lineWidth /= e.widthFactor.right),
            g--)
          : e.rules[l] == "("
          ? ((a *= e.lengthFactor.left),
            (n *= e.lengthFactor.left),
            e.drawCurve && (r.lineWidth *= e.widthFactor.left),
            g++)
          : e.rules[l] == ")" &&
            ((a /= e.lengthFactor.left),
            (n /= e.lengthFactor.left),
            e.drawCurve && (r.lineWidth /= e.widthFactor.left),
            g--);
      if (e.drawCurve && e.draw.indexOf(e.rules[l]) != -1) {
        if (e.gradientType == "individual-segment-gradient")
          r.strokeStyle = chromaScale[g - 1];
        else if (e.gradientType == "gradient-from-trunk-to-twigs") {
          var b = [chromaScale[g - 1], chromaScale[g]],
            x = { x0: C, y0: T, x1: v, y1: h };
          r.strokeStyle = s(r, x, b);
        }
        r.stroke();
      }
    }
    if (!e.drawCurve) return { maxPosX: c, maxPosY: w, minPosX: m, minPosY: F };
  }
  function z(e, r) {
    if (e == "left")
      return { x0: r.width, y0: r.height / 2, x1: 0, y1: r.height / 2 };
    if (e == "right")
      return { x0: 0, y0: r.height / 2, x1: r.width, y1: r.height / 2 };
    if (e == "up")
      return { x0: r.width / 2, y0: r.height, x1: r.width / 2, y1: 0 };
    if (e == "down")
      return { x0: r.width / 2, y0: 0, x1: r.width / 2, y1: r.height };
  }
  function X(r) {
    var i = function (x, H) {
        showWarning(x, H, -1);
      },
      t = 18,
      a = r.iterations.trim();
    if (!/^-?\d+$/.test(a))
      return (
        i("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((a = parseInt(a)), a < 1))
      return (
        i("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (a > t)
      return (
        i(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(t)
        ),
        !1
      );
    var n = r.width.trim();
    if (!/^-?\d+$/.test(n))
      return i("Can't generate curve", "Width is not a number."), !1;
    if (((n = parseInt(n)), n <= 0))
      return i("Can't generate curve", "Width must be a positive number."), !1;
    var f = r.height.trim();
    if (!/^-?\d+$/.test(f))
      return i("Can't generate curve", "Height is not a number."), !1;
    if (((f = parseInt(f)), f <= 0))
      return i("Can't generate curve", "Height must be a positive number."), !1;
    var d = r["background-from-color"] || "black",
      g = r["background-to-color"] || "black",
      c = r["line-from-color"] || "#FFFFFF00",
      w = r["line-to-color"] || "#FFFFFF00";
    if (!isThisColorIsValid(d))
      return (
        i("Can't generate curve", "Background from color is not valid."), !1
      );
    if (!isThisColorIsValid(g))
      return i("Can't generate curve", "Background to color is not valid."), !1;
    if (!isThisColorIsValid(c))
      return i("Can't generate curve", "Line from color is not valid."), !1;
    if (!isThisColorIsValid(w))
      return i("Can't generate curve", "Line to color is not valid."), !1;
    var m = [d, g],
      F = [c, w],
      u = r["line-width"].trim();
    if (!/^-?\d+$/.test(u))
      return i("Can't generate curve", "Line width is not a number."), !1;
    if (((u = parseInt(u)), u < 1))
      return i("Can't generate curve", "Line width should be 1 or more."), !1;
    var o = r.padding.trim();
    if (!/^-?\d+$/.test(o))
      return i("Can't generate curve", "Padding is not a number."), !1;
    if (((o = parseInt(o)), o < 0))
      return i("Can't generate curve", "Padding can't be negative."), !1;
    var l = new Object();
    if (
      ((l.left = k(r["left-length-factor"], "Left", "length")), l.left.failure)
    )
      return i("Can't generate curve", l.left.error), !1;
    if (
      ((l.right = k(r["right-length-factor"], "Right", "length")),
      l.right.failure)
    )
      return i("Can't generate curve", l.right.error), !1;
    var v = new Object();
    if (((v.left = k(r["left-width-factor"], "Left", "width")), v.left.failure))
      return i("Can't generate curve", v.left.error), !1;
    if (
      ((v.right = k(r["right-width-factor"], "Right", "width")),
      v.right.failure)
    )
      return i("Can't generate curve", v.right.error), !1;
    var h = new Object();
    if (((h.left = r["left-angle"].trim()), !/^[+-]?\d*\.?\d+$/.test(h.left)))
      return i("Can't generate curve", "Left angle is not a number."), !1;
    if (
      ((h.left = parseFloat(h.left)),
      (h.right = r["right-angle"].trim()),
      !/^[+-]?\d*\.?\d+$/.test(h.right))
    )
      return i("Can't generate curve", "Right angle is not a number."), !1;
    h.right = parseFloat(h.right);
    var C = r.direction,
      T = "F",
      y = r["skip-trunk"];
    if (r["gradient-in-tree-direction"]) var b = "gradient-in-tree-direction";
    else if (r["individual-segment-gradient"])
      var b = "individual-segment-gradient";
    else if (r["gradient-from-trunk-to-twigs"])
      var b = "gradient-from-trunk-to-twigs";
    return {
      iterations: a,
      width: n,
      height: f,
      background: m,
      lineColor: F,
      lineWidth: u,
      padding: o,
      draw: T,
      direction: C,
      lengthFactor: l,
      widthFactor: v,
      angle: h,
      skipTrunk: y,
      gradientType: b,
    };
  }
  function k(e, r, i) {
    return (
      e.trim(),
      /^[+-]?\d*\.?\d+$/.test(e)
        ? ((e = parseFloat(e)),
          e <= 0
            ? {
                failure: !0,
                error:
                  "{0} branch {1} factor must be a positive number.".format(
                    r,
                    i
                  ),
              }
            : e > 1
            ? {
                failure: !0,
                error:
                  "{0} branch {1} factor must be less than or equal to one.".format(
                    r,
                    i
                  ),
              }
            : e)
        : {
            failure: !0,
            error: "{0} branch {1} factor is not a number.".format(r, i),
          }
    );
  }
  function s(e, r, i) {
    for (
      var t = e.createLinearGradient(r.x0, r.y0, r.x1, r.y1),
        a = 0,
        n = 1 / (i.length - 1),
        f = 0;
      f < i.length;
      f++
    )
      t.addColorStop(a, i[f]), (a += n);
    return t;
  }
  function A(e) {
    for (
      var r = e.getContext("2d"),
        i = e.width,
        t = e.height,
        a = 15,
        n = !0,
        f = 0;
      f <= i;
      f += a
    )
      for (var d = 0; d <= t; d += a)
        n ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
          (n = !n),
          r.fillRect(f, d, f + a, d + a);
  }
}
