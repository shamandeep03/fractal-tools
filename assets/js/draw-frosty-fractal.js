First_call();
function generate(options, cb) {
     var e = options,
        r = b(e);
      if (!r) return !1;
      var a = document.querySelector(".preview"),
        i = document.querySelector(".data");
      (a.width = a.clientWidth),
        (a.height = a.clientHeight),
        (i.width = r.width || a.clientWidth),
        (i.height = r.height || a.clientHeight);
      var t = a.getContext("2d"),
        n = i.getContext("2d");
      R(a), (n.fillStyle = r.background), n.fillRect(0, 0, i.width, i.height);
      var u = w(r),
        v = C(u, r);
      y(u, i, v, r);
      document.querySelector("#download-button").addEventListener("click", () => {
          var link = document.createElement("a");
          link.download = "filename.png";
          link.href = i.toDataURL();
          link.click();
        });
      var d = bestImageFit(i.width, i.height, a.width, a.height);
      t.drawImage(i, d.offsetX, d.offsetY, d.width, d.height);
    function w(e) {
      for (var r = "", a = 0; a < e.polygon; a++) r += "F_";
      return e.iterations == 1
        ? r
        : new LSystem({
            axiom: r,
            productions: { F: e.transformRule },
          }).iterate(e.iterations - 1);
    }
    function C(e, r) {
      return m({
        drawCurve: !1,
        rules: e,
        draw: r.draw,
        angle: r.angle,
        polygon: r.polygon,
        direction: r.direction,
      });
    }
    function y(e, r, a, i) {
      m({
        drawCurve: !0,
        canvas: r,
        rules: e,
        size: a,
        lineWidth: i.lineWidth,
        lineSegmentColor: i.lineSegmentColor,
        padding: i.padding,
        draw: i.draw,
        iterations: i.iterations,
        angle: i.angle,
        polygon: i.polygon,
        direction: i.direction,
      });
    }
    function m(e) {
      if (e.drawCurve) {
        var r = e.canvas.getContext("2d");
        (r.lineWidth = e.lineWidth),
          (r.strokeStyle = e.lineSegmentColor),
          (r.lineCap = "round");
        var a = {
          left: e.padding + e.lineWidth / 2,
          right: e.padding + e.lineWidth / 2,
          top: e.padding + e.lineWidth / 2,
          bottom: e.padding + e.lineWidth / 2,
        };
        if (
          e.iterations == 1 &&
          e.polygon < 3 &&
          (e.direction == "up" || e.direction == "down")
        ) {
          (t =
            (e.canvas.width - a.left - a.right) /
            (e.size.maxPosX - e.size.minPosX)),
            (n = 0);
          var i = { x: a.left - e.size.minPosX * t, y: e.canvas.height / 2 };
        } else if (
          e.iterations == 1 &&
          e.polygon < 3 &&
          (e.direction == "right" || e.direction == "left")
        ) {
          (t = 0),
            (n =
              (e.canvas.height - a.top - a.bottom) /
              (e.size.maxPosY - e.size.minPosY));
          var i = { x: e.canvas.width / 2, y: a.top - e.size.minPosY * n };
        } else
          var t =
              (e.canvas.width - a.left - a.right) /
              (e.size.maxPosX - e.size.minPosX),
            n =
              (e.canvas.height - a.top - a.bottom) /
              (e.size.maxPosY - e.size.minPosY),
            i = {
              x: a.left - e.size.minPosX * t,
              y: a.top - e.size.minPosY * n,
            };
      } else
        var u = 0,
          v = 0,
          d = 0,
          h = 0,
          t = 1,
          n = 1,
          i = { x: 0, y: 0 };
      if (e.direction == "right") var l = 90;
      if (e.direction == "left") var l = 270;
      if (e.direction == "up") var l = 0;
      if (e.direction == "down") var l = 180;
      var g = 180 - (180 * (e.polygon - 2)) / e.polygon;
      e.drawCurve && (r.beginPath(), r.moveTo(i.x, i.y));
      for (var s = 0; s < e.rules.length; s++)
        e.drawCurve &&
          e.draw.indexOf(e.rules[s]) != -1 &&
          (r.lineTo(
            i.x + t * Math.cos((l * Math.PI) / 180),
            i.y + n * Math.sin((l * Math.PI) / 180)
          ),
          (i.x = i.x + t * Math.cos((l * Math.PI) / 180)),
          (i.y = i.y + n * Math.sin((l * Math.PI) / 180))),
          !e.drawCurve && e.draw.indexOf(e.rules[s]) != -1
            ? ((i.x = i.x + t * Math.cos((l * Math.PI) / 180)),
              (i.y = i.y + n * Math.sin((l * Math.PI) / 180)),
              i.x > u && (u = i.x),
              i.y > v && (v = i.y),
              i.x < d && (d = i.x),
              i.y < h && (h = i.y))
            : e.rules[s] == "-"
            ? (l += e.angle)
            : e.rules[s] == "+"
            ? (l -= e.angle)
            : e.rules[s] == "_"
            ? (l -= g)
            : e.rules[s] == "#"
            ? (l -= 45)
            : e.rules[s] == "~" && (l += 45);
      if ((e.drawCurve && r.stroke(), !e.drawCurve))
        return { maxPosX: u, maxPosY: v, minPosX: d, minPosY: h };
    }
    function b(r) {
      var a = function (k, I) {
          showWarning(k, I, -1);
        },
        i = 10,
        t = r.iterations.trim();
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
      var n = r.width.trim();
      if (!/^-?\d+$/.test(n))
        return a("Can't generate curve", "Width is not a number."), !1;
      if (((n = parseInt(n)), n <= 0))
        return (
          a("Can't generate curve", "Width must be a positive number."), !1
        );
      var u = r.height.trim();
      if (!/^-?\d+$/.test(u))
        return a("Can't generate curve", "Height is not a number."), !1;
      if (((u = parseInt(u)), u <= 0))
        return (
          a("Can't generate curve", "Height must be a positive number."), !1
        );
      var v = r["background-color"] || "black",
        d = r["line-segment-color"] || "white";
      if (!isThisColorIsValid(v))
        return a("Can't generate curve", "Background color is not valid."), !1;
      if (!isThisColorIsValid(d))
        return a("Can't generate curve", "Line color is not valid."), !1;
      var h = r["line-width"].trim();
      if (!/^-?\d+$/.test(h))
        return a("Can't generate curve", "Line width is not a number."), !1;
      if (((h = parseInt(h)), h < 1))
        return a("Can't generate curve", "Line width should be 1 or more."), !1;
      var l = r.padding.trim();
      if (!/^-?\d+$/.test(l))
        return a("Can't generate curve", "Padding is not a number."), !1;
      if (((l = parseInt(l)), l < 0))
        return a("Can't generate curve", "Padding can't be negative."), !1;
      var g = parseInt(r.polygon);
      if (!/^-?\d+$/.test(g))
        return (
          a("Can't generate curve", "Amount of sides is not a number."), !1
        );
      if (((g = parseInt(g)), g < 1))
        return (
          a("Can't generate curve", "Amount of sides is less than one."), !1
        );
      var s = r.direction,
        x = "F",
        z = 90,
        f = r["reverse-form"],
        F = r["inverse-form"];
      if (r["single-spike-form"]) {
        if (f && !F) var o = "FF-F++F-F";
        if (f && F) var o = "FF+F--F+F";
        if (!f && !F) var o = "F-F++F-FF";
        if (!f && F) var o = "F+F--F+FF";
      } else if (r["double-spike-form"]) {
        if (f && !F) var o = "F-F++F-F+F--F+F";
        if (f && F) var o = "F+F--F+F-F++F-F";
        if (!f && !F) var o = "F+F--F+F-F++F-F";
        if (!f && F) var o = "F-F++F-F+F--F+F";
      }
      if (r["long-single-spike-form"]) {
        if (f && !F) var o = "FF-FF++FF-F";
        if (f && F) var o = "FF+FF--FF+F";
        if (!f && !F) var o = "F-FF++FF-FF";
        if (!f && F) var o = "F+FF--FF+FF";
      }
      if (r["bent-single-spike-form"]) {
        if (f && !F) var o = "FF-F#F--F~F-F";
        if (f && F) var o = "FF+F~F++F#F+F";
        if (!f && !F) var o = "F-F~F++F#F-FF";
        if (!f && F) var o = "F+F#F--F~F+FF";
      }
      if (r["bent-double-spike-form"]) {
        if (f && !F) var o = "F-F~F--F#F-F+F~F++F#F+F";
        if (f && F) var o = "F+F#F--F~F+F-F#F++F~F-F";
        if (!f && !F) var o = "F+F#F--F~F+F-F#F++F~F-F";
        if (!f && F) var o = "F-F~F--F#F-F+F~F++F#F+F";
      }
      return {
        iterations: t,
        width: n,
        height: u,
        background: v,
        lineSegmentColor: d,
        lineWidth: h,
        padding: l,
        draw: x,
        polygon: g,
        transformRule: o,
        angle: z,
        direction: s,
      };
    }
    function R(e) {
      for (
        var r = e.getContext("2d"),
          a = e.width,
          i = e.height,
          t = 15,
          n = !0,
          u = 0;
        u <= a;
        u += t
      )
        for (var v = 0; v <= i; v += t)
          n ? (r.fillStyle = "#ffffff") : (r.fillStyle = "#efefef"),
            (n = !n),
            r.fillRect(u, v, u + t, v + t);
    }
}
