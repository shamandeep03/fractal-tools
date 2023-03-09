First_call();
function generate(options, cb) {
  var e = options,
    i = ne(e);
  if (!i) return !1;
  var r = document.querySelector(".preview"),
    a = document.querySelector(".data");
  (r.width = r.clientWidth),
    (r.height = r.clientHeight),
    (a.width = i.width || r.clientWidth),
    (a.height = i.height || r.clientHeight);
  var v = r.getContext("2d"),
    h = a.getContext("2d");
  ve(r);
  var g = P(i.direction, a);
  (h.fillStyle = q(h, g, i.background)), h.fillRect(0, 0, a.width, a.height);
  var w = ae(i);
  te(a, w, i);
  document.querySelector("#download-button").addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = a.toDataURL();
    link.click();
  });
  var u = bestImageFit(a.width, a.height, r.width, r.height);
  v.drawImage(a, u.offsetX, u.offsetY, u.width, u.height);
  function ae(e) {
    return L({
      drawCurve: !1,
      iterations: e.iterations,
      direction: e.direction,
      angle: e.angle,
      coniferousTree: e.coniferousTree,
      semiConiferousTree: e.semiConiferousTree,
      alternatingTree: e.alternatingTree,
      symmetrizeTree: e.symmetrizeTree,
      perLevelRandomTree: e.perLevelRandomTree,
      totalRandomTree: e.totalRandomTree,
      baseWidth: e.baseWidth,
      baseHeight: e.baseHeight,
      randomRecSize: e.randomRecSize,
      gradientType: e.gradientType,
    });
  }
  function te(e, i, r) {
    L({
      drawCurve: !0,
      canvas: e,
      size: i,
      lineWidth: r.lineWidth,
      lineSegmentColor: r.lineSegmentColor,
      fillColor: r.fillColor,
      padding: r.padding,
      direction: r.direction,
      angle: r.angle,
      iterations: r.iterations,
      coniferousTree: r.coniferousTree,
      semiConiferousTree: r.semiConiferousTree,
      alternatingTree: r.alternatingTree,
      symmetrizeTree: r.symmetrizeTree,
      perLevelRandomTree: r.perLevelRandomTree,
      totalRandomTree: r.totalRandomTree,
      baseWidth: r.baseWidth,
      baseHeight: r.baseHeight,
      randomRecSize: r.randomRecSize,
      gradientType: r.gradientType,
    });
  }
  function fe(e, i, r, a, v, h, g) {
    e.beginPath(), e.moveTo(i, r);
    for (var w = i, u = r, R = 0; R < 4; R++)
      if (
        (e.lineTo(
          i + a * Math.cos((h * Math.PI) / 180),
          r + v * Math.sin((h * Math.PI) / 180)
        ),
        (i = i + a * Math.cos((h * Math.PI) / 180)),
        (r = r + v * Math.sin((h * Math.PI) / 180)),
        (h -= 90),
        R == 0)
      )
        var B = [i, r];
    if (g.gradientType == "individual-segment-gradient")
      e.fillStyle = chromaScale[0];
    else if (g.gradientType == "gradient-from-trunk-to-twigs") {
      var k = [chromaScale[0], chromaScale[1]],
        S = { x0: w, y0: u, x1: B[0], y1: B[1] };
      e.fillStyle = q(e, S, k);
    }
    e.fill(), e.stroke();
  }
  function le(e, i, r, a) {
    if (e > i)
      if (r > a) var v = r / e;
      else var v = a / e;
    else if (r > a) var v = r / i;
    else var v = a / i;
    return v;
  }
  function L(e) {
    if (e.direction == "right") var i = 0;
    if (e.direction == "left") var i = 180;
    if (e.direction == "up") var i = 270;
    if (e.direction == "down") var i = 90;
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
      if (e.iterations == 1) {
        var v = e.canvas.width - a.left - a.right,
          h = e.canvas.height - a.top - a.bottom;
        if (e.direction == "up" || e.direction == "down")
          var b = e.baseWidth,
            T = e.baseHeight;
        if (e.direction == "left" || e.direction == "right")
          var b = e.baseHeight,
            T = e.baseWidth;
        var g = best_image_fit(b, T, v, h),
          w = le(b, T, v, h),
          u = best_image_fit(g.width * w, g.height * w, v, h),
          R = u.width,
          B = u.height;
        if (e.direction == "up")
          var k = e.canvas.width - a.left - u.offsetX,
            S = e.canvas.height - a.top - u.offsetY;
        if (e.direction == "right")
          var k = a.left + u.offsetX,
            S = e.canvas.height - a.top - u.offsetY;
        if (e.direction == "left")
          var k = e.canvas.width - a.left - u.offsetX,
            S = a.top + u.offsetY;
        if (e.direction == "down")
          var k = a.left + u.offsetX,
            S = a.top + u.offsetY;
      } else
        var R =
            (e.canvas.width - a.left - a.right) /
            (e.size.maxPosX - e.size.minPosX),
          B =
            (e.canvas.height - a.top - a.bottom) /
            (e.size.maxPosY - e.size.minPosY),
          k = a.left - e.size.minPosX * R,
          S = a.top - e.size.minPosY * B;
      if (e.gradientType == "gradient-in-tree-direction") {
        var K = P(e.direction, e.canvas);
        r.fillStyle = q(r, K, e.fillColor);
      } else {
        if (e.skipTrunk) {
          if (e.gradientType == "individual-segment-gradient")
            var G = e.iterations - 1;
          else if (e.gradientType == "gradient-from-trunk-to-twigs")
            var G = e.iterations;
          var Q = 0;
        } else {
          if (e.gradientType == "individual-segment-gradient")
            var G = e.iterations;
          else if (e.gradientType == "gradient-from-trunk-to-twigs")
            var G = e.iterations + 1;
          var Q = 1;
        }
        chromaScale = chroma.scale([e.fillColor[0], e.fillColor[1]]).colors(G);
      }
      if (e.iterations == 1) return fe(r, k, S, R, B, i, e);
    } else
      var I = 0,
        W = 0,
        M = 0,
        V = 0,
        R = 1,
        B = 1,
        k = 0,
        S = 0,
        U = [],
        E = [],
        Z = [];
    for (var T = e.baseHeight, b = e.baseWidth, O = 2; O <= T; O++)
      for (; T % O == 0 && b % O == 0; ) (T = T / O), (b = b / O);
    if (b > T)
      var j = b,
        N = T;
    else
      var j = T,
        N = b;
    var X = e.angle,
      _ = 0,
      $ = 0,
      Y = 0;
    if ((p([], e.iterations, Q), !e.drawCurve))
      return {
        maxPosX: I,
        maxPosY: W,
        minPosX: M,
        minPosY: V,
        levelRandomAngles: U,
        totalRandomAngles: E,
        baseSize: Z,
      };
    function p(d, t, l) {
      if (t != 0) {
        var y = [];
        if (d.length == 0) {
          if (e.drawCurve) var m = ee(r, k, S, R, B, i, e, l);
          else var m = re(r, k, S, R, B, i, e);
          y.push(m.leftPoint, m.rightPoint);
        } else {
          if (e.coniferousTree)
            if (_ < 1) {
              var n = !1;
              _++;
            } else {
              var n = !0;
              _--;
            }
          else if (e.semiConiferousTree)
            if (_ < 2) {
              var n = !1;
              _++;
            } else if (_ < 3) {
              var n = !0;
              _++;
            } else {
              var n = !0;
              _ = 0;
            }
          else if (e.perLevelRandomTree)
            if (e.drawCurve) f = e.size.levelRandomAngles[e.iterations - t - 1];
            else {
              if (
                ((f = Math.floor(Math.random() * 89) + 1),
                e.symmetrizeTree && t < e.iterations - 1)
              ) {
                var C = ((e.iterations - t) * (45 - f)) / (e.iterations - 1);
                f += C;
              }
              U.push(f);
            }
          else n = !1;
          for (var o = 0; o < d.length; o++) {
            var s = d[o][0],
              c = d[o][1],
              F = d[o][2],
              z = d[o][3],
              H = d[o][4];
            if (n) var f = 90 - e.angle;
            else if (e.perLevelRandomTree) f = f;
            else var f = e.angle;
            if (e.alternatingTree)
              if ($ < 2) {
                var f = e.angle;
                $++;
              } else {
                var f = 90 - e.angle;
                $ < 3 ? $++ : ($ = 0);
              }
            if (
              (e.totalRandomTree &&
                (e.drawCurve ||
                  ($ % 2 == 0
                    ? ((f = Math.floor(Math.random() * 89) + 1), E.push(f))
                    : (f = E[($ - 1) / 2])),
                e.drawCurve &&
                  ($ % 2 == 0
                    ? (f = e.size.totalRandomAngles[$ / 2])
                    : (f = e.size.totalRandomAngles[($ - 1) / 2])),
                $++),
              e.randomRecSize &&
                (e.drawCurve
                  ? (T = e.size.baseSize[Y])
                  : ((T = Math.floor(Math.random() * j) + 1), Z.push(T)),
                Y++),
              !e.perLevelRandomTree && e.symmetrizeTree && t < e.iterations - 1)
            ) {
              var C = ((e.iterations - t) * (45 - f)) / (e.iterations - 1);
              f += C;
            }
            if (o % 2 == 0)
              if (e.drawCurve)
                var m = ee(
                  r,
                  s,
                  c,
                  z * Math.cos((f * Math.PI) / 180),
                  H * Math.cos((f * Math.PI) / 180),
                  F - f,
                  e,
                  l
                );
              else
                var m = re(
                  r,
                  s,
                  c,
                  z * Math.cos((f * Math.PI) / 180),
                  H * Math.cos((f * Math.PI) / 180),
                  F - f,
                  e
                );
            else if (e.drawCurve)
              var m = de(
                r,
                s,
                c,
                z * Math.sin((f * Math.PI) / 180),
                H * Math.sin((f * Math.PI) / 180),
                F - f,
                e,
                l
              );
            else
              var m = he(
                r,
                s,
                c,
                z * Math.sin((f * Math.PI) / 180),
                H * Math.sin((f * Math.PI) / 180),
                F - f,
                e
              );
            y.push(m.leftPoint, m.rightPoint);
          }
        }
        p(y, t - 1, l + 1);
      }
    }
    function ee(d, t, l, y, m, n, C, o) {
      d.beginPath(), d.moveTo(t, l);
      for (var s = 0; s < 4; s++) {
        var c = t,
          F = l;
        if (s % 2 == 0) var z = T;
        else var z = b;
        for (var H = 0; H < z; H++)
          d.lineTo(
            t + y * Math.cos((n * Math.PI) / 180),
            l + m * Math.sin((n * Math.PI) / 180)
          ),
            (t = t + y * Math.cos((n * Math.PI) / 180)),
            (l = l + m * Math.sin((n * Math.PI) / 180));
        var f = [t, l, n, y, m];
        if (((n += 90), s == 0)) var D = f;
        if (s == 1) var J = f;
      }
      if (C.gradientType == "individual-segment-gradient")
        d.fillStyle = chromaScale[o - 1];
      else if (C.gradientType == "gradient-from-trunk-to-twigs") {
        var A = [chromaScale[o - 1], chromaScale[o]],
          x = { x0: c, y0: F, x1: J[0], y1: J[1] };
        d.fillStyle = q(d, x, A);
      }
      return d.fill(), d.stroke(), { leftPoint: D, rightPoint: J };
    }
    function de(d, t, l, y, m, n, C, o) {
      d.beginPath(), d.moveTo(t, l);
      for (var s = 0; s < 4; s++) {
        var c = t,
          F = l;
        if (s % 2 == 0) var z = T;
        else var z = b;
        for (var H = 0; H < z; H++)
          d.lineTo(
            t + y * Math.cos((n * Math.PI) / 180),
            l + m * Math.sin((n * Math.PI) / 180)
          ),
            (t = t + y * Math.cos((n * Math.PI) / 180)),
            (l = l + m * Math.sin((n * Math.PI) / 180));
        var f = [t, l, n + 90, y, m];
        if (((n -= 90), s == 1)) var D = f;
        if (s == 0) var J = f;
      }
      if (C.gradientType == "individual-segment-gradient")
        d.fillStyle = chromaScale[o - 1];
      else if (C.gradientType == "gradient-from-trunk-to-twigs") {
        var A = [chromaScale[o - 1], chromaScale[o]],
          x = { x0: c, y0: F, x1: D[0], y1: D[1] };
        d.fillStyle = q(d, x, A);
      }
      return d.fill(), d.stroke(), { leftPoint: D, rightPoint: J };
    }
    function re(d, t, l, y, m, n, C) {
      for (var o = 0; o < 4; o++) {
        if (o % 2 == 0) var s = T;
        else var s = b;
        for (var c = 0; c < s; c++)
          (t = t + y * Math.cos((n * Math.PI) / 180)),
            (l = l + m * Math.sin((n * Math.PI) / 180));
        t > I && (I = t), l > W && (W = l), t < M && (M = t), l < V && (V = l);
        var F = [t, l, n, y, m];
        if (((n += 90), o == 0)) var z = F;
        if (o == 1) var H = F;
      }
      return {
        maxPosX: I,
        maxPosY: W,
        minPosX: M,
        minPosY: V,
        leftPoint: z,
        rightPoint: H,
      };
    }
    function he(d, t, l, y, m, n) {
      for (var C = 0; C < 4; C++) {
        if (C % 2 == 0) var o = T;
        else var o = b;
        for (var s = 0; s < o; s++)
          (t = t + y * Math.cos((n * Math.PI) / 180)),
            (l = l + m * Math.sin((n * Math.PI) / 180));
        t > I && (I = t), l > W && (W = l), t < M && (M = t), l < V && (V = l);
        var c = [t, l, n + 90, y, m];
        if (((n -= 90), C == 1)) var F = c;
        if (C == 0) var z = c;
      }
      return {
        maxPosX: I,
        maxPosY: W,
        minPosX: M,
        minPosY: V,
        leftPoint: F,
        rightPoint: z,
      };
    }
  }
  function P(e, i) {
    if (e == "left")
      return { x0: i.width, y0: i.height / 2, x1: 0, y1: i.height / 2 };
    if (e == "right")
      return { x0: 0, y0: i.height / 2, x1: i.width, y1: i.height / 2 };
    if (e == "up")
      return { x0: i.width / 2, y0: i.height, x1: i.width / 2, y1: 0 };
    if (e == "down")
      return { x0: i.width / 2, y0: 0, x1: i.width / 2, y1: i.height };
  }
  function ne(i) {
    var r = function (X, _) {
        showWarning(X, _, -1);
      },
      a = 18,
      v = i.iterations.trim();
    if (!/^-?\d+$/.test(v))
      return (
        r("Can't generate curve", "Amount of iterations is not a number."), !1
      );
    if (((v = parseInt(v)), v < 1))
      return (
        r("Can't generate curve", "Amount of iterations is less than one."), !1
      );
    if (v > a)
      return (
        r(
          "Can't generate curve",
          "This tool can only process up to {0} iterations right now.".format(a)
        ),
        !1
      );
    var h = i.width.trim();
    if (!/^-?\d+$/.test(h))
      return r("Can't generate curve", "Width is not a number."), !1;
    if (((h = parseInt(h)), h <= 0))
      return r("Can't generate curve", "Width must be a positive number."), !1;
    var g = i.height.trim();
    if (!/^-?\d+$/.test(g))
      return r("Can't generate curve", "Height is not a number."), !1;
    if (((g = parseInt(g)), g <= 0))
      return r("Can't generate curve", "Height must be a positive number."), !1;
    var w = i["base-width"].trim();
    if (!/^-?\d+$/.test(w))
      return (
        r("Can't generate curve", "Base figure width is not a number."), !1
      );
    if (((w = parseInt(w)), w <= 0))
      return (
        r(
          "Can't generate curve",
          "Base figure width must be a positive number."
        ),
        !1
      );
    var u = i["base-height"].trim();
    if (!/^-?\d+$/.test(u))
      return (
        r("Can't generate curve", "Base figure height is not a number."), !1
      );
    if (((u = parseInt(u)), u <= 0))
      return (
        r(
          "Can't generate curve",
          "Base figure height must be a positive number."
        ),
        !1
      );
    var R = i["background-from-color"] || "black",
      B = i["background-to-color"] || "black",
      k = i["fill-from-color"] || "#FFFFFF00",
      S = i["fill-to-color"] || "#FFFFFF00",
      K = i["line-segment-color"] || "transparent";
    if (!isThisColorIsValid(R))
      return (
        r("Can't generate curve", "Background from color is not valid."), !1
      );
    if (!isThisColorIsValid(B))
      return r("Can't generate curve", "Background to color is not valid."), !1;
    if (!isThisColorIsValid(k))
      return r("Can't generate curve", "Fill from color is not valid."), !1;
    if (!isThisColorIsValid(S))
      return r("Can't generate curve", "Fill to color is not valid."), !1;
    if (!isThisColorIsValid(K))
      return r("Can't generate curve", "Line color is not valid."), !1;
    var G = [R, B],
      Q = [k, S],
      I = i["line-width"].trim() || 0;
    if (!/^-?\d+$/.test(I))
      return r("Can't generate curve", "Line width is not a number."), !1;
    if (((I = parseInt(I)), I < 0))
      return r("Can't generate curve", "Line width should be 1 or more."), !1;
    var W = i.padding.trim();
    if (!/^-?\d+$/.test(W))
      return r("Can't generate curve", "Padding is not a number."), !1;
    if (((W = parseInt(W)), W < 0))
      return r("Can't generate curve", "Padding can't be negative."), !1;
    var M = i.angle.trim() || 45;
    if (!/^[+-]?\d*\.?\d+$/.test(M))
      return r("Can't generate curve", "Angle is not a number."), !1;
    if (((M = parseFloat(M)), M <= 0 || M >= 90))
      return (
        r(
          "Can't generate curve",
          "Angle must be greater than 0 and less than 90."
        ),
        !1
      );
    var V = i.direction,
      U = i["coniferous-tree"],
      E = i["semi-coniferous-tree"],
      Z = i["alternating-tree"],
      T = i["symmetrize-tree"],
      b = i["per-level-random-tree"],
      O = i["total-random-tree"],
      j = i["randomize-rectangle-sizes"];
    if (i["gradient-in-tree-direction"]) var N = "gradient-in-tree-direction";
    else if (i["individual-segment-gradient"])
      var N = "individual-segment-gradient";
    else if (i["gradient-from-trunk-to-twigs"])
      var N = "gradient-from-trunk-to-twigs";
    return {
      iterations: v,
      width: h,
      height: g,
      background: G,
      lineSegmentColor: K,
      fillColor: Q,
      lineWidth: I,
      padding: W,
      angle: M,
      direction: V,
      coniferousTree: U,
      semiConiferousTree: E,
      alternatingTree: Z,
      symmetrizeTree: T,
      perLevelRandomTree: b,
      totalRandomTree: O,
      baseWidth: w,
      baseHeight: u,
      randomRecSize: j,
      gradientType: N,
    };
  }
  function q(e, i, r) {
    for (
      var a = e.createLinearGradient(i.x0, i.y0, i.x1, i.y1),
        v = 0,
        h = 1 / (r.length - 1),
        g = 0;
      g < r.length;
      g++
    )
      a.addColorStop(v, r[g]), (v += h);
    return a;
  }
  function ve(e) {
    for (
      var i = e.getContext("2d"),
        r = e.width,
        a = e.height,
        v = 15,
        h = !0,
        g = 0;
      g <= r;
      g += v
    )
      for (var w = 0; w <= a; w += v)
        h ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
          (h = !h),
          i.fillRect(g, w, g + v, w + v);
  }
}
