First_call();
function generate(options, cb) {
      var e = options,
        n = L(e);
      if (!n) return !1;
      var a = document.querySelector(".preview"),
        i = document.querySelector(".data");
      (a.width = a.clientWidth),
        (a.height = a.clientHeight),
        (i.width = n.width || a.clientWidth),
        (i.height = n.height || a.clientHeight);
      var t = a.getContext("2d"),
        r = i.getContext("2d");
      T(a), (r.fillStyle = n.background), r.fillRect(0, 0, i.width, i.height);
      var l = R(n);
      q(i, l, n);
      document.querySelector("#download-button").addEventListener("click", () => {
        var link = document.createElement("a");
        link.download = "filename.png";
        link.href = i.toDataURL();
        link.click();
      });
      var v = bestImageFit(i.width, i.height, a.width, a.height);
      t.drawImage(i, v.offsetX, v.offsetY, v.width, v.height);
    function R(e) {
      return w({
        drawCurve: !1,
        draw: e.draw,
        iterations: e.iterations,
        currentAngle: e.currentAngle,
        type: e.type,
        scaleFactor: e.scaleFactor,
        maxPosX: 0,
        maxPosY: 0,
        minPosX: 0,
        minPosY: 0,
        segmentLengthX: 1,
        segmentLengthY: 1,
        currentPosX: 0,
        currentPosY: 0,
      });
    }
    function q(e, n, a) {
      var i = e.getContext("2d");
      if (
        ((i.lineWidth = a.lineWidth),
        a.lineWidth == 0
          ? (i.strokeStyle = "transparent")
          : (i.strokeStyle = a.lineSegmentColor),
        (i.lineCap = "round"),
        (i.fillStyle = a.fillColor),
        a.type == "regular-t-square" && a.scaleFactor != 2)
      ) {
        i.lineWidth *= 2;
        var t = {
          left: a.padding + a.lineWidth,
          right: a.padding + a.lineWidth,
          top: a.padding + a.lineWidth,
          bottom: a.padding + a.lineWidth,
        };
      } else
        var t = {
          left: a.padding + a.lineWidth / 2,
          right: a.padding + a.lineWidth / 2,
          top: a.padding + a.lineWidth / 2,
          bottom: a.padding + a.lineWidth / 2,
        };
      var r = (e.width - t.left - t.right) / (n.maxPosX - n.minPosX),
        l = (e.height - t.top - t.bottom) / (n.maxPosY - n.minPosY),
        v = t.left - n.minPosX * r,
        f = t.top - n.minPosY * l;
      w({
        drawCurve: !0,
        draw: a.draw,
        canvasCtx: i,
        padding: a.padding,
        currentAngle: a.currentAngle,
        iterations: a.iterations,
        type: a.type,
        scaleFactor: a.scaleFactor,
        segmentLengthX: r,
        segmentLengthY: l,
        currentPosX: v,
        currentPosY: f,
      });
    }
    function w(e) {
      if (e.type == "regular-t-square")
        if (e.scaleFactor == 2) {
          var n = S(e.iterations);
          return W(e, n);
        } else {
          if ((e.drawCurve && e.canvasCtx.beginPath(), !e.drawCurve))
            return c([], e.iterations, e);
          e.drawCurve &&
            (c([], e.iterations, e), e.canvasCtx.stroke(), e.canvasCtx.fill());
        }
      else if (e.type == "vertex-t-square") {
        var a = [];
        if (!e.drawCurve) return g([], e.iterations, e, a);
        if (e.drawCurve) {
          g([], e.iterations, e, a);
          for (var i = a.length - 1; i >= 0; i--) {
            e.canvasCtx.beginPath();
            for (var t = 0, r = 0; r < a[i].length; r++)
              t < 4
                ? e.canvasCtx.lineTo(a[i][r][0], a[i][r][1])
                : (e.canvasCtx.lineTo(a[i][r - 4][0], a[i][r - 4][1]),
                  e.canvasCtx.moveTo(a[i][r][0], a[i][r][1]),
                  (t = 0)),
                t++;
            e.canvasCtx.lineTo(a[i][r - 4][0], a[i][r - 4][1]),
              e.canvasCtx.fill(),
              e.canvasCtx.stroke();
          }
        }
      } else if (e.type == "diamond-t-square") {
        if (
          ((e.currentAngle = e.currentAngle + 45),
          e.drawCurve && e.canvasCtx.beginPath(),
          !e.drawCurve)
        )
          return C([], e.iterations, e);
        e.drawCurve &&
          (C([], e.iterations, e), e.canvasCtx.fill(), e.canvasCtx.stroke());
      }
    }
    function S(e) {
      var n = "F-FF-FF-FF-F",
        a = "F+A+FF+A+FF+A+FF+A+FF",
        i = 14,
        t = 5;
      if (e == 1) return n;
      for (var r = 1; r < e; r++) {
        r == 1
          ? (n = n.slice(0, n.length - 3))
          : ((n = n.slice(0, n.length - i)), (i = i * 3 + t), (t = t * 2 - 2));
        var l = a.replace(/A/g, n);
        (a = a.replace(/F/g, "FF")), (n = l);
      }
      return l;
    }
    function W(e, n) {
      e.drawCurve &&
        (e.canvasCtx.beginPath(),
        e.canvasCtx.moveTo(e.currentPosX, e.currentPosY));
      for (var a = 0; a < n.length; a++)
        e.drawCurve &&
          e.draw.indexOf(n[a]) != -1 &&
          (e.canvasCtx.lineTo(
            e.currentPosX +
              e.segmentLengthX * Math.cos((e.currentAngle * Math.PI) / 180),
            e.currentPosY +
              e.segmentLengthY * Math.sin((e.currentAngle * Math.PI) / 180)
          ),
          (e.currentPosX =
            e.currentPosX +
            e.segmentLengthX * Math.cos((e.currentAngle * Math.PI) / 180)),
          (e.currentPosY =
            e.currentPosY +
            e.segmentLengthY * Math.sin((e.currentAngle * Math.PI) / 180))),
          !e.drawCurve && e.draw.indexOf(n[a]) != -1
            ? ((e.currentPosX =
                e.currentPosX +
                e.segmentLengthX * Math.cos((e.currentAngle * Math.PI) / 180)),
              (e.currentPosY =
                e.currentPosY +
                e.segmentLengthY * Math.sin((e.currentAngle * Math.PI) / 180)),
              e.currentPosX > e.maxPosX && (e.maxPosX = e.currentPosX),
              e.currentPosY > e.maxPosY && (e.maxPosY = e.currentPosY),
              e.currentPosX < e.minPosX && (e.minPosX = e.currentPosX),
              e.currentPosY < e.minPosY && (e.minPosY = e.currentPosY))
            : n[a] == "-"
            ? (e.currentAngle -= 90)
            : n[a] == "+" && (e.currentAngle += 90);
      if (
        (e.drawCurve &&
          ((e.canvasCtx.fillStyle = e.fillColor),
          e.canvasCtx.fill(),
          e.canvasCtx.stroke()),
        !e.drawCurve)
      )
        return {
          maxPosX: e.maxPosX,
          maxPosY: e.maxPosY,
          minPosX: e.minPosX,
          minPosY: e.minPosY,
        };
    }
    function c(e, n, a) {
      if (n != 0) {
        var i = [];
        if (e.length == 0) {
          if (a.drawCurve)
            var t = F(
              a.canvasCtx,
              a.currentPosX,
              a.currentPosY,
              a.segmentLengthX,
              a.segmentLengthY,
              a.currentAngle,
              a
            );
          else
            var t = o(
              a.currentPosX,
              a.currentPosY,
              a.segmentLengthX,
              a.segmentLengthY,
              a.currentAngle,
              a
            );
          i.push(t.topRight, t.bottomRight, t.bottomLeft, t.topLeft);
        } else
          for (var r = 0; r < e.length; r++) {
            var l = e[r][0],
              v = e[r][1],
              f = e[r][2],
              d = e[r][3] / a.scaleFactor,
              h = e[r][4] / a.scaleFactor;
            if (a.drawCurve) var t = F(a.canvasCtx, l, v, d, h, f, a);
            else var t = o(l, v, d, h, f, a);
            i.push(t.topRight, t.bottomRight, t.bottomLeft, t.topLeft);
          }
        if ((c(i, n - 1, a), !a.drawCurve))
          return {
            maxPosX: a.maxPosX,
            maxPosY: a.maxPosY,
            minPosX: a.minPosX,
            minPosY: a.minPosY,
          };
      }
    }
    function o(e, n, a, i, t, r) {
      for (var l = 0; l < 4; l++) {
        (e = e + a * Math.cos((t * Math.PI) / 180)),
          (n = n + i * Math.sin((t * Math.PI) / 180)),
          (t += 90),
          e > r.maxPosX && (r.maxPosX = e),
          n > r.maxPosY && (r.maxPosY = n),
          e < r.minPosX && (r.minPosX = e),
          n < r.minPosY && (r.minPosY = n);
        var v = [
          e + a / (2 * r.scaleFactor),
          n - i / (2 * r.scaleFactor),
          90,
          a,
          i,
        ];
        if (l == 0) var f = v;
        if (l == 1) var d = v;
        if (l == 2) var h = v;
        if (l == 3) var m = v;
      }
      return { topRight: f, bottomRight: d, bottomLeft: h, topLeft: m };
    }
    function F(e, n, a, i, t, r, l) {
      e.moveTo(n, a);
      for (var v = 0; v < 4; v++) {
        e.lineTo(
          n + i * Math.cos((r * Math.PI) / 180),
          a + t * Math.sin((r * Math.PI) / 180)
        ),
          (n = n + i * Math.cos((r * Math.PI) / 180)),
          (a = a + t * Math.sin((r * Math.PI) / 180)),
          (r += 90);
        var f = [
          n + i / (2 * l.scaleFactor),
          a - t / (2 * l.scaleFactor),
          90,
          i,
          t,
        ];
        if (v == 0) var d = f;
        if (v == 1) var h = f;
        if (v == 2) var m = f;
        if (v == 3) var P = f;
      }
      return { topRight: d, bottomRight: h, bottomLeft: m, topLeft: P };
    }
    function g(e, n, a, i) {
      if (n != 0) {
        var t = [];
        if (e.length == 0) {
          var r = b(
            a.currentPosX,
            a.currentPosY,
            a.segmentLengthX,
            a.segmentLengthY,
            a.currentAngle,
            a
          );
          t.push(r.topRight, r.bottomRight, r.bottomLeft, r.topLeft);
        } else
          for (var l = 0; l < e.length; l++)
            if (!((l + 1) % 4 == 0 && !(l + 1 == 4 && l == e.length - 1))) {
              var v = e[l][0],
                f = e[l][1],
                d = e[l][2],
                h = e[l][3] / a.scaleFactor,
                m = e[l][4] / a.scaleFactor,
                r = b(v, f, h, m, d - 180, a);
              t.push(r.topRight, r.bottomRight, r.bottomLeft, r.topLeft);
            }
        if ((i.push(t), g(t, n - 1, a, i), !a.drawCurve))
          return {
            maxPosX: a.maxPosX,
            maxPosY: a.maxPosY,
            minPosX: a.minPosX,
            minPosY: a.minPosY,
          };
      }
    }
    function b(e, n, a, i, t, r) {
      for (var l = 0; l < 4; l++) {
        (e = e + a * Math.cos((t * Math.PI) / 180)),
          (n = n + i * Math.sin((t * Math.PI) / 180)),
          (t += 90),
          r.drawCurve ||
            (e > r.maxPosX && (r.maxPosX = e),
            n > r.maxPosY && (r.maxPosY = n),
            e < r.minPosX && (r.minPosX = e),
            n < r.minPosY && (r.minPosY = n));
        var v = [e, n, t, a, i];
        if (l == 0) var f = v;
        if (l == 1) var d = v;
        if (l == 2) var h = v;
        if (l == 3) var m = v;
      }
      return { topRight: f, bottomRight: d, bottomLeft: h, topLeft: m };
    }
    function C(e, n, a) {
      if (n != 0) {
        var i = [];
        if (e.length == 0) {
          if (a.drawCurve)
            var t = X(
              a.canvasCtx,
              a.currentPosX,
              a.currentPosY,
              a.segmentLengthX,
              a.segmentLengthY,
              a.currentAngle,
              a
            );
          else
            var t = M(
              a.currentPosX,
              a.currentPosY,
              a.segmentLengthX,
              a.segmentLengthY,
              a.currentAngle,
              a
            );
          i.push(t.right, t.left);
        } else
          for (var r = 0; r < e.length; r++) {
            var l = e[r][0],
              v = e[r][1],
              f = e[r][2],
              d = e[r][3] / a.scaleFactor,
              h = e[r][4] / a.scaleFactor;
            if (a.drawCurve) var t = X(a.canvasCtx, l, v, d, h, f - 180, a);
            else var t = M(l, v, d, h, f - 180, a);
            i.push(t.right, t.left);
          }
        if ((C(i, n - 1, a), !a.drawCurve))
          return {
            maxPosX: a.maxPosX,
            maxPosY: a.maxPosY,
            minPosX: a.minPosX,
            minPosY: a.minPosY,
          };
      }
    }
    function M(e, n, a, i, t, r) {
      for (var l = 0; l < 4; l++) {
        (e = e + a * Math.cos((t * Math.PI) / 180)),
          (n = n + i * Math.sin((t * Math.PI) / 180)),
          (t += 90),
          e > r.maxPosX && (r.maxPosX = e),
          n > r.maxPosY && (r.maxPosY = n),
          e < r.minPosX && (r.minPosX = e),
          n < r.minPosY && (r.minPosY = n);
        var v = [e, n, t, a, i];
        if (l == 0) var f = v;
        if (l == 2) var d = v;
      }
      return { right: f, left: d };
    }
    function X(e, n, a, i, t, r, l) {
      e.moveTo(n, a);
      for (var v = 0; v < 4; v++) {
        e.lineTo(
          n + i * Math.cos((r * Math.PI) / 180),
          a + t * Math.sin((r * Math.PI) / 180)
        ),
          (n = n + i * Math.cos((r * Math.PI) / 180)),
          (a = a + t * Math.sin((r * Math.PI) / 180)),
          (r += 90);
        var f = [n, a, r, i, t];
        if (v == 0) var d = f;
        if (v == 2) var h = f;
      }
      return { right: d, left: h };
    }
    function L(n) {
      var a = function ($, V) {
          showWarning($, V, -1);
        },
        i = 13,
        t = n.iterations.trim();
      if (!/^-?\d+$/.test(t))
        return (
          a("Can't generate curve", "Amount of iterations is not a number."), !1
        );
      if (((t = parseInt(t)), t < 1))
        return (
          a("Can't generate curve", "Amount of iterations is less than one."),
          !1
        );
      if (t > i)
        return (
          a(
            "Can't generate curve",
            "This tool can only process up to {0} iterations right now.".format(
              i
            )
          ),
          !1
        );
      var r = n.width.trim();
      if (!/^-?\d+$/.test(r))
        return a("Can't generate curve", "Width is not a number."), !1;
      if (((r = parseInt(r)), r <= 0))
        return (
          a("Can't generate curve", "Width must be a positive number."), !1
        );
      var l = n.height.trim();
      if (!/^-?\d+$/.test(l))
        return a("Can't generate curve", "Height is not a number."), !1;
      if (((l = parseInt(l)), l <= 0))
        return (
          a("Can't generate curve", "Height must be a positive number."), !1
        );
      var v = n["background-color"] || "#e0ff57",
        f = n["line-segment-color"] || "transparent",
        d = n["fill-color"] || v;
      if (!isThisColorIsValid(v))
        return a("Can't generate curve", "Background color is not valid."), !1;
      if (!isThisColorIsValid(f))
        return a("Can't generate curve", "Line color is not valid."), !1;
      if (!isThisColorIsValid(d))
        return a("Can't generate curve", "Fill color is not valid."), !1;
      var h = n["line-width"].trim() || 0;
      if (!/^-?\d+$/.test(h))
        return a("Can't generate curve", "Line width is not a number."), !1;
      if (((h = parseInt(h)), h < 0))
        return a("Can't generate curve", "Line width should be 1 or more."), !1;
      var m = n.padding.trim();
      if (!/^-?\d+$/.test(m))
        return a("Can't generate curve", "Padding is not a number."), !1;
      if (((m = parseInt(m)), m < 0))
        return a("Can't generate curve", "Padding can't be negative."), !1;
      var P = "F";
      if (n.direction == "horizontal") var Y = 0;
      else if (n.direction == "vertical") var Y = 90;
      if (n["regular-t-square"]) var x = "regular-t-square";
      else if (n["vertex-t-square"]) var x = "vertex-t-square";
      else if (n["diamond-t-square"]) var x = "diamond-t-square";
      var u = n["scale-factor"].trim() || 2;
      if (!/^[+-]?\d*\.?\d+$/.test(u))
        return (
          a("Can't generate curve", "Scale factor contains non digits."), !1
        );
      var A = "1.6180339887498948",
        I = A.slice(0, u.length);
      return (
        (u = parseFloat(u)),
        u <= 1
          ? (a(
              "Can't generate curve",
              "Scale factor must be greater than or equal to the golden ratio value (\u03C6 = 1.618\u2026)."
            ),
            !1)
          : u < I
          ? (a(
              "Can't generate curve",
              "Scale factor must be greater than or equal to the golden ratio value (\u03C6 = {0}\u2026).".format(
                I
              )
            ),
            !1)
          : {
              draw: P,
              iterations: t,
              width: r,
              height: l,
              background: v,
              lineSegmentColor: f,
              fillColor: d,
              lineWidth: h,
              padding: m,
              currentAngle: Y,
              type: x,
              scaleFactor: u,
            }
      );
    }
    function T(e) {
      for (
        var n = e.getContext("2d"),
          a = e.width,
          i = e.height,
          t = 15,
          r = !0,
          l = 0;
        l <= a;
        l += t
      )
        for (var v = 0; v <= i; v += t)
          r ? (n.fillStyle = "#ffffff") : (n.fillStyle = "#efefef"),
            (r = !r),
            n.fillRect(l, v, l + t, v + t);
    }
}
