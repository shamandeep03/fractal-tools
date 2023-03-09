First_call();
function generate(options, cb) {
      var s = options,
        e = V(s);
      if (!e) return !1;
      var i = document.querySelector(".preview"),
        d = document.querySelector(".data");
      (i.width = i.clientWidth),
        (i.height = i.clientHeight),
        (d.width = e.width || i.clientWidth),
        (d.height = e.height || i.clientHeight);
      var f = i.getContext("2d"),
        l = d.getContext("2d");
      if (
        ($(i),
        (l.fillStyle = e.background),
        l.fillRect(0, 0, d.width, d.height),
        (l.lineWidth = e.lineWidth),
        (l.strokeStyle = e.lineSegmentColor),
        e.direction == "horizontal")
      )
        var v = d.width - e.padding * 2 - e.lineWidth,
          g = d.height - e.padding * 2;
      if (e.direction == "vertical")
        var v = d.width - e.padding * 2,
          g = d.height - e.padding * 2 - e.lineWidth;
      for (var p = [0], C = 0; C < e.iterations; C++) p.unshift(p[0] * 2 + 1);
      var b = (((p[1] - 1) / 2) * v) / p[0] + v / (p[0] * 2),
        W = (((p[1] - 1) / 2) * g) / p[0] + g / (p[0] * 2);
      if (e.direction == "horizontal")
        var k = e.padding + e.lineWidth / 2 + b,
          H = e.padding + W;
      if (e.direction == "vertical")
        var k = e.padding + b,
          H = e.padding + e.lineWidth / 2 + W;
      S(k, H, v, g, 0, e, p);
      document.querySelector("#download-button").addEventListener("click", () => {
          var link = document.createElement("a");
          link.download = "filename.png";
          link.href = d.toDataURL();
          link.click();
        });
      var z = bestImageFit(d.width, d.height, i.width, i.height);
      f.drawImage(d, z.offsetX, z.offsetY, z.width, z.height);
      function S(t, o, n, w, a, u, r) {
        if (a != u.iterations) {
          var h = (Math.pow(2, u.iterations - a - 2) * n) / (r[a] * 2),
            c = (Math.pow(2, u.iterations - a - 2) * w) / (r[a] * 2);
          u.direction == "horizontal" && P(l, t, o, a, n, w, r[a]),
            u.direction == "vertical" && L(l, t, o, a, n, w, r[a]);
          var m = (w - w / r[a]) / 2,
            T = (n - n / r[a]) / 2;
          S(t - h, o - c, T, m, a + 1, u, r),
            S(t - h + T + n / r[a], o - c, T, m, a + 1, u, r),
            S(t - h, o - c + m + w / r[a], T, m, a + 1, u, r),
            S(t - h + T + n / r[a], o - c + m + w / r[a], T, m, a + 1, u, r);
        }
      }
      function P(t, o, n, w, a, u, r) {
        t.beginPath(), t.moveTo(o, n);
        var h = ((r - (r - 1) / 2) * u) / r,
          c = ((r - (r - 1) / 2) * a) / r;
        t.lineTo(o, n + h),
          t.moveTo(o, n + h / 2),
          t.lineTo(o + c, n + h / 2),
          t.moveTo(o + c, n),
          t.lineTo(o + c, n + h),
          t.stroke();
      }
      function L(t, o, n, w, a, u, r) {
        t.beginPath(), t.moveTo(o, n);
        var h = ((r - (r - 1) / 2) * u) / r,
          c = ((r - (r - 1) / 2) * a) / r;
        t.lineTo(o + c, n),
          t.moveTo(o + c / 2, n),
          t.lineTo(o + c / 2, n + h),
          t.moveTo(o, n + h),
          t.lineTo(o + c, n + h),
          t.stroke();
      }
    function V(e) {
      var i = function (k, H) {
          showWarning(k, H, -1);
        },
        d = 9,
        f = e.iterations.trim();
      if (!/^-?\d+$/.test(f))
        return (
          i("Can't generate curve", "Amount of iterations is not a number."), !1
        );
      if (((f = parseInt(f)), f < 1))
        return (
          i("Can't generate curve", "Amount of iterations is less than one."),
          !1
        );
      if (f > d)
        return (
          i(
            "Can't generate curve",
            "This tool can only process up to {0} iterations right now.".format(
              d
            )
          ),
          !1
        );
      var l = e.width.trim();
      if (!/^-?\d+$/.test(l))
        return i("Can't generate curve", "Width is not a number."), !1;
      if (((l = parseInt(l)), l <= 0))
        return (
          i("Can't generate curve", "Width must be a positive number."), !1
        );
      var v = e.height.trim();
      if (!/^-?\d+$/.test(v))
        return i("Can't generate curve", "Height is not a number."), !1;
      if (((v = parseInt(v)), v <= 0))
        return (
          i("Can't generate curve", "Height must be a positive number."), !1
        );
      var g = e["background-color"] || "#0646b5",
        p = e["line-segment-color"] || "white";
      if (!isThisColorIsValid(g))
        return i("Can't generate curve", "Background color is not valid."), !1;
      if (!isThisColorIsValid(p))
        return i("Can't generate curve", "Line color is not valid."), !1;
      var C = e["line-width"].trim();
      if (!/^-?\d+$/.test(C))
        return i("Can't generate curve", "Line width is not a number."), !1;
      if (((C = parseInt(C)), C < 1))
        return i("Can't generate curve", "Line width should be 1 or more."), !1;
      var b = e.padding.trim();
      if (!/^-?\d+$/.test(b))
        return i("Can't generate curve", "Padding is not a number."), !1;
      if (((b = parseInt(b)), b < 0))
        return i("Can't generate curve", "Padding can't be negative."), !1;
      var W = e.direction;
      return {
        iterations: f,
        width: l,
        height: v,
        background: g,
        lineSegmentColor: p,
        lineWidth: C,
        padding: b,
        direction: W,
      };
    }
    function $(s) {
      for (
        var e = s.getContext("2d"),
          i = s.width,
          d = s.height,
          f = 15,
          l = !0,
          v = 0;
        v <= i;
        v += f
      )
        for (var g = 0; g <= d; g += f)
          l ? (e.fillStyle = "#ffffff") : (e.fillStyle = "#efefef"),
            (l = !l),
            e.fillRect(v, g, v + f, g + f);
    }
}
