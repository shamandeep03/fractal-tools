First_call();
function generate(options, cb) {
      var e = options,
        i = k(e);
      if (!i) return !1;
      var a = document.querySelector(".preview"),
        t = document.querySelector(".data");
      (a.width = a.clientWidth),
        (a.height = a.clientHeight),
        (t.width = i.width || a.clientWidth),
        (t.height = i.height || a.clientHeight);
      var l = a.getContext("2d"),
        o = t.getContext("2d");
      y(a), (o.fillStyle = i.background), o.fillRect(0, 0, t.width, t.height);
      var d = F(i),
        h = s(i),
        u = C(d, i);
      m(d, h, t, u, i);
      document.querySelector("#download-button").addEventListener("click", () => {
         var link = document.createElement("a");
         link.download = "filename.png";
         link.href = t.toDataURL();
         link.click();
       });
      var r = bestImageFit(t.width, t.height, a.width, a.height);
      l.drawImage(t, r.offsetX, r.offsetY, r.width, r.height);
    function F(e) {
      return e.iterations == 1
        ? "F[--F[--F]++F--F--F]F--F--F"
        : new LSystem({
            axiom: "F[--F[--F]++F--F--F]F--F--F",
            productions: { F: "F-F++F-F" },
          }).iterate(e.iterations - 1);
    }
    function s(e) {
      return e.iterations == 1
        ? "-F--F--F-"
        : new LSystem({
            axiom: "-F--F--F-",
            productions: { F: "F+F--F+F" },
          }).iterate(e.iterations - 1);
    }
    function C(e, i) {
      return w({
        drawCurve: !1,
        rules: e,
        draw: i.draw,
        direction: i.direction,
        angle: i.angle,
      });
    }
    function m(e, i, a, t, l) {
      w({
        drawCurve: !0,
        canvas: a,
        rules: e,
        rulesKoch: i,
        size: t,
        iterations: l.iterations,
        lineWidth: l.lineWidth,
        background: l.background,
        lineSegmentColor: l.lineSegmentColor,
        snowflakeFillColor: l.snowflakeFillColor,
        antisnowflakeFillColor: l.antisnowflakeFillColor,
        padding: l.padding,
        draw: l.draw,
        direction: l.direction,
        angle: l.angle,
      });
    }
    function w(e) {
      if (e.drawCurve) {
        var i = e.canvas.getContext("2d");
        i.lineCap = "round";
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
            (e.size.maxPosY - e.size.minPosY);
      } else
        var o = 0,
          d = 0,
          h = 0,
          u = 0,
          t = 1,
          l = 1,
          r = { x: 0, y: 0 };
      if (e.direction == "right") var n = 90;
      if (e.direction == "left") var n = 270;
      if (e.direction == "up") var n = 0;
      if (e.direction == "down") var n = 180;
      if (e.drawCurve) {
        if (e.direction == "up" || e.direction == "down")
          var r = { x: e.canvas.width / 2, y: a.top - e.size.minPosY * l };
        else var r = { x: a.left - e.size.minPosX * t, y: e.canvas.height / 2 };
        i.beginPath(),
          i.moveTo(r.x, r.y),
          (i.lineWidth = 1),
          (i.strokeStyle = e.antisnowflakeFillColor);
        for (var f = 0; f < e.rulesKoch.length; f++)
          e.draw.indexOf(e.rulesKoch[f]) != -1 &&
            (i.lineTo(
              r.x + t * Math.cos((n * Math.PI) / 180),
              r.y + l * Math.sin((n * Math.PI) / 180)
            ),
            (r.x = r.x + t * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * Math.sin((n * Math.PI) / 180))),
            e.rulesKoch[f] == "-"
              ? (n -= e.angle)
              : e.rulesKoch[f] == "+" && (n += e.angle);
        (i.fillStyle = e.snowflakeFillColor),
          i.fill(),
          i.stroke(),
          e.lineWidth == 0
            ? (i.strokeStyle = e.antisnowflakeFillColor)
            : (i.strokeStyle = e.lineSegmentColor),
          (r = {
            x: a.left - e.size.minPosX * t,
            y: a.top - e.size.minPosY * l,
          }),
          (i.lineWidth = e.lineWidth),
          i.beginPath(),
          i.moveTo(r.x, r.y);
      }
      for (var v = [], f = 0; f < e.rules.length; f++)
        if (
          (e.drawCurve &&
            e.draw.indexOf(e.rules[f]) != -1 &&
            (i.lineTo(
              r.x + t * Math.cos((n * Math.PI) / 180),
              r.y + l * Math.sin((n * Math.PI) / 180)
            ),
            (r.x = r.x + t * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * Math.sin((n * Math.PI) / 180))),
          !e.drawCurve &&
            e.draw.indexOf(e.rules[f]) != -1 &&
            ((r.x = r.x + t * Math.cos((n * Math.PI) / 180)),
            (r.y = r.y + l * Math.sin((n * Math.PI) / 180)),
            r.x > o && (o = r.x),
            r.y > d && (d = r.y),
            r.x < h && (h = r.x),
            r.y < u && (u = r.y)),
          e.rules[f] == "-")
        )
          n -= e.angle;
        else if (e.rules[f] == "+") n += e.angle;
        else if (e.rules[f] == "[") v.push([r.x, r.y, n]);
        else if (e.rules[f] == "]") {
          var g = v.pop();
          (r.x = g[0]),
            (r.y = g[1]),
            (n = g[2]),
            e.drawCurve && i.moveTo(r.x, r.y);
        }
      if (
        (e.drawCurve &&
          ((i.fillStyle = e.antisnowflakeFillColor), i.stroke(), i.fill()),
        !e.drawCurve)
      )
        return { maxPosX: o, maxPosY: d, minPosX: h, minPosY: u };
    }
    function k(i) {
      var a = function (I, W) {
          showWarning(I, W, -1);
        },
        t = 10,
        l = i.iterations.trim();
      if (!/^-?\d+$/.test(l))
        return (
          a("Can't generate curve", "Amount of iterations is not a number."), !1
        );
      if (((l = parseInt(l)), l < 1))
        return (
          a("Can't generate curve", "Amount of iterations is less than one."),
          !1
        );
      if (l > t)
        return (
          a(
            "Can't generate curve",
            "This tool can only process up to {0} iterations right now.".format(
              t
            )
          ),
          !1
        );
      var o = i.width.trim();
      if (!/^-?\d+$/.test(o))
        return a("Can't generate curve", "Width is not a number."), !1;
      if (((o = parseInt(o)), o <= 0))
        return (
          a("Can't generate curve", "Width must be a positive number."), !1
        );
      var d = i.height.trim();
      if (!/^-?\d+$/.test(d))
        return a("Can't generate curve", "Height is not a number."), !1;
      if (((d = parseInt(d)), d <= 0))
        return (
          a("Can't generate curve", "Height must be a positive number."), !1
        );
      var h = i["background-color"] || "#0486ff",
        u = i["line-segment-color"] || "transparent",
        r = i["snowflake-fill-color"] || "transparent",
        n = i["antisnowflake-fill-color"] || "transparent";
      if (!isThisColorIsValid(h))
        return a("Can't generate curve", "Background color is not valid."), !1;
      if (!isThisColorIsValid(u))
        return a("Can't generate curve", "Line color is not valid."), !1;
      if (!isThisColorIsValid(r))
        return (
          a("Can't generate curve", "Snowflake fill color color is not valid."),
          !1
        );
      if (!isThisColorIsValid(n))
        return (
          a(
            "Can't generate curve",
            "Antisnowflake fill color color is not valid."
          ),
          !1
        );
      var f = i["line-width"].trim() || 0;
      if (!/^-?\d+$/.test(f))
        return a("Can't generate curve", "Line width is not a number."), !1;
      if (((f = parseInt(f)), f < 0))
        return a("Can't generate curve", "Line width should be 1 or more."), !1;
      var v = i.padding.trim();
      if (!/^-?\d+$/.test(v))
        return a("Can't generate curve", "Padding is not a number."), !1;
      if (((v = parseInt(v)), v < 0))
        return a("Can't generate curve", "Padding can't be negative."), !1;
      var g = i.direction,
        b = "F",
        M = 60;
      return {
        iterations: l,
        width: o,
        height: d,
        background: h,
        lineSegmentColor: u,
        snowflakeFillColor: r,
        antisnowflakeFillColor: n,
        lineWidth: f,
        padding: v,
        draw: b,
        direction: g,
        angle: M,
      };
    }
    function y(e) {
      for (
        var i = e.getContext("2d"),
          a = e.width,
          t = e.height,
          l = 15,
          o = !0,
          d = 0;
        d <= a;
        d += l
      )
        for (var h = 0; h <= t; h += l)
          o ? (i.fillStyle = "#ffffff") : (i.fillStyle = "#efefef"),
            (o = !o),
            i.fillRect(d, h, d + l, h + l);
    }
}
