First_call();
function generate(options, cb) {
      var e = options,
        r = x(e);
      var i = document.querySelector(".preview"),
        t = document.querySelector(".data");
      (i.width = i.clientWidth),
        (i.height = i.clientHeight),
        (t.width = r.width || i.clientWidth),
        (t.height = r.height || i.clientHeight);
      var n = i.getContext("2d"),
        a = t.getContext("2d");
      z(i), (a.fillStyle = r.background), a.fillRect(0, 0, t.width, t.height);
      var l = b(r),
        d = I(l, r),
        c = M(r);
      W(c, t, d, r);
      var u = bestImageFit(t.width, t.height, i.width, i.height);
      n.drawImage(t, u.offsetX, u.offsetY, u.width, u.height);
    function C(e, r) {
      if (r == 0) return "";
      if (r == 1) return e;
      for (var i = "", t = 0; t < r; t++) i = i + e;
      return i;
    }
    function b(e) {
      return C("F+", e.polygon);
    }
    function M(e) {
      var r = C("F+", e.polygon),
        i = C("[F]+", e.polygon);
      return (
        (i += "F"),
        e.iterations == 1
          ? r
          : new LSystem({ axiom: r, productions: { F: i } }).iterate(
              e.iterations - 1
            )
      );
    }
    function I(e, r) {
      return y({
        drawCurve: !1,
        rules: e,
        draw: r.draw,
        angle: r.angle,
        direction: r.direction,
      });
    }
    function W(e, r, i, t) {
      y({
        drawCurve: !0,
        canvas: r,
        rules: e,
        size: i,
        lineWidth: t.lineWidth,
        lineSegmentColor: t.lineSegmentColor,
        fillColor: t.fillColor,
        padding: t.padding,
        draw: t.draw,
        angle: t.angle,
        background: t.background,
        iterations: t.iterations,
        polygon: t.polygon,
        direction: t.direction,
      });
    }
    function y(e) {
      if (e.drawCurve) {
        var r = e.canvas.getContext("2d");
        (r.lineWidth = e.lineWidth),
          e.lineWidth == 0
            ? (r.strokeStyle = "transparent")
            : (r.strokeStyle = e.lineSegmentColor),
          (r.lineCap = "round");
        for (
          var i = {
              left: e.padding + e.lineWidth / 2,
              right: e.padding + e.lineWidth / 2,
              top: e.padding + e.lineWidth / 2,
              bottom: e.padding + e.lineWidth / 2,
            },
            t =
              (e.canvas.width - i.left - i.right) /
              (e.size.maxPosX - e.size.minPosX),
            n =
              (e.canvas.height - i.top - i.bottom) /
              (e.size.maxPosY - e.size.minPosY),
            a = {
              x: i.left - e.size.minPosX * t,
              y: i.top - e.size.minPosY * n,
            },
            l = 0,
            d = 1;
          d <= Math.floor(e.polygon / 4);
          d++
        )
          l += Math.cos((2 * Math.PI * d) / e.polygon);
        var c = 1 / (2 * (1 + l));
      } else
        var u = 0,
          h = 0,
          s = 0,
          w = 0,
          t = 1,
          n = 1,
          a = { x: 0, y: 0 };
      if (e.direction == "right") var f = 270;
      if (e.direction == "left") var f = 90;
      if (e.direction == "up") var f = 180;
      if (e.direction == "down") var f = 0;
      e.drawCurve && (r.beginPath(), r.moveTo(a.x, a.y));
      for (var o = 0, v = 0; v < e.rules.length; v++) {
        if (e.drawCurve && e.draw.indexOf(e.rules[v]) != -1) {
          var g = 1;
          o > 0 && (g = g * Math.pow(c, o)),
            o == e.iterations - 1
              ? r.lineTo(
                  a.x + t * g * Math.cos((f * Math.PI) / 180),
                  a.y + n * g * Math.sin((f * Math.PI) / 180)
                )
              : r.moveTo(
                  a.x + t * g * Math.cos((f * Math.PI) / 180),
                  a.y + n * g * Math.sin((f * Math.PI) / 180)
                ),
            (a.x = a.x + t * g * Math.cos((f * Math.PI) / 180)),
            (a.y = a.y + n * g * Math.sin((f * Math.PI) / 180));
        }
        !e.drawCurve && e.draw.indexOf(e.rules[v]) != -1
          ? ((a.x = a.x + t * Math.cos((f * Math.PI) / 180)),
            (a.y = a.y + n * Math.sin((f * Math.PI) / 180)),
            a.x > u && (u = a.x),
            a.y > h && (h = a.y),
            a.x < s && (s = a.x),
            a.y < w && (w = a.y))
          : e.rules[v] == "-"
          ? (f -= e.angle)
          : e.rules[v] == "+"
          ? (f += e.angle)
          : e.rules[v] == "["
          ? (o += 1)
          : e.rules[v] == "]" && (o -= 1);
      }
      if (
        (e.drawCurve && ((r.fillStyle = e.fillColor), r.stroke(), r.fill()),
        !e.drawCurve)
      )
        return { maxPosX: u, maxPosY: h, minPosX: s, minPosY: w };
    }
    function x(r) {
      var i = function (g, k) {
          showWarning(g, k, -1);
        },
        t = 8,
        n = r.iterations.trim();
      if (!/^-?\d+$/.test(n))
        return (
          i("Can't generate curve", "Amount of iterations is not a number."), !1
        );
      if (((n = parseInt(n)), n < 1))
        return (
          i("Can't generate curve", "Amount of iterations is less than one."),
          !1
        );
      if (n > t)
        return (
          i(
            "Can't generate curve",
            "This tool can only process up to {0} iterations right now.".format(
              t
            )
          ),
          !1
        );
      var a = r.width.trim();
      if (!/^-?\d+$/.test(a))
        return i("Can't generate curve", "Width is not a number."), !1;
      if (((a = parseInt(a)), a <= 0))
        return (
          i("Can't generate curve", "Width must be a positive number."), !1
        );
      var l = r.height.trim();
      if (!/^-?\d+$/.test(l))
        return i("Can't generate curve", "Height is not a number."), !1;
      if (((l = parseInt(l)), l <= 0))
        return (
          i("Can't generate curve", "Height must be a positive number."), !1
        );
      var d = r["background-color"] || "#054aeb",
        c = r["line-segment-color"] || "transparent",
        u = r["fill-color"] || "transparent";
      if (!isThisColorIsValid(d))
        return i("Can't generate curve", "Background color is not valid."), !1;
      if (!isThisColorIsValid(c))
        return i("Can't generate curve", "Line color is not valid."), !1;
      if (!isThisColorIsValid(u))
        return i("Can't generate curve", "Fill color is not valid."), !1;
      var h = r["line-width"].trim() || 0;
      if (!/^-?\d+$/.test(h))
        return i("Can't generate curve", "Line width is not a number."), !1;
      if (((h = parseInt(h)), h < 0))
        return i("Can't generate curve", "Line width should be 1 or more."), !1;
      var s = r.padding.trim();
      if (!/^-?\d+$/.test(s))
        return i("Can't generate curve", "Padding is not a number."), !1;
      if (((s = parseInt(s)), s < 0))
        return i("Can't generate curve", "Padding can't be negative."), !1;
      var w = "FA",
        f = r.direction,
        o = r.polygon.trim();
      if (!/^-?\d+$/.test(o))
        return (
          i("Can't generate curve", "Amount of sides is not a number."), !1
        );
      if (((o = parseInt(o)), o < 5))
        return (
          i("Can't generate curve", "Number of sides should be 5 or more."), !1
        );
      var v = 180 - (180 * (o - 2)) / o;
      return {
        iterations: n,
        width: a,
        height: l,
        background: d,
        lineSegmentColor: c,
        fillColor: u,
        lineWidth: h,
        padding: s,
        draw: w,
        angle: v,
        polygon: o,
        direction: f,
      };
    }
    function z(e) {
      for (
        var r = e.getContext("2d"),
          i = e.width,
          t = e.height,
          n = 15,
          a = !0,
          l = 0;
        l <= i;
        l += n
      )
        for (var d = 0; d <= t; d += n)
          a ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
            (a = !a),
            r.fillRect(l, d, l + n, d + n);
    }
}
