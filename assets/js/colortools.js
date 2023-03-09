function clrToRGBA(r) {
     var t = document.createElement("canvas");
     (t.width = 1), (t.height = 1);
     var a = t.getContext("2d");
     a.rect(0, 0, 1, 1), (a.fillStyle = r), a.fill();
     var e = a.getImageData(0, 0, 1, 1).data;
     return {
       r: e[0],
       g: e[1],
       b: e[2],
       a: e[3],
       toString: function () {
         return (
           "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
         );
       },
       toArray: function () {
         return [this.r, this.g, this.b, this.a];
       },
       toInteger: function () {
         var i = this.r & 255,
           n = this.g & 255,
           h = this.b & 255,
           o = this.a & 255;
         return (i << 24) + (n << 16) + (h << 8) + o;
       },
     };
   }
   function clrToRGB(r) {
     var t = document.createElement("canvas");
     (t.width = 1), (t.height = 1);
     var a = t.getContext("2d");
     a.rect(0, 0, 1, 1), (a.fillStyle = r), a.fill();
     var e = a.getImageData(0, 0, 1, 1).data;
     return {
       r: e[0],
       g: e[1],
       b: e[2],
       toString: function () {
         return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
       },
       toArray: function () {
         return [this.r, this.g, this.b];
       },
       toInteger: function () {
         function i(v) {
           var u = v.toString(16);
           return u.length == 1 && (u = "0" + u), u;
         }
         function n(v) {
           return parseInt(v, 16);
         }
         var h = this.r & 255,
           o = this.g & 255,
           s = this.b & 255;
         return n("0x" + i(h) + i(o) + i(s));
       },
     };
   }
   function isThisColorIsValid(r) {
     if (!r) return !1;
     var t = document.createElement("div");
     return (t.style.color = r), t.style.color !== "";
   }
   function rgbaDiff(r, t) {
     return r.a == 0 && t.a == 0
       ? 0
       : r.a == 0 || t.a == 0
       ? 1e3
       : deleteEelement(RGBATwoLabColor(r), RGBATwoLabColor(t));
   }
   function RGBATwoLabColor(r) {
     var t = r.r / r.a,
       a = r.g / r.a,
       e = r.b / r.a,
       i,
       n,
       h;
     return (
       (t = t > 0.04045 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92),
       (a = a > 0.04045 ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92),
       (e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92),
       (i = (t * 0.4124 + a * 0.3576 + e * 0.1805) / 0.95047),
       (n = (t * 0.2126 + a * 0.7152 + e * 0.0722) / 1),
       (h = (t * 0.0193 + a * 0.1192 + e * 0.9505) / 1.08883),
       (i = i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
       (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116),
       (h = h > 0.008856 ? Math.pow(h, 1 / 3) : 7.787 * h + 16 / 116),
       [116 * n - 16, 500 * (i - n), 200 * (n - h)]
     );
   }
   function deleteEelement(r, t) {
     var a = r[0] - t[0],
       e = r[1] - t[1],
       i = r[2] - t[2],
       n = Math.sqrt(r[1] * r[1] + r[2] * r[2]),
       h = Math.sqrt(t[1] * t[1] + t[2] * t[2]),
       o = n - h,
       s = e * e + i * i - o * o;
     s = s < 0 ? 0 : Math.sqrt(s);
     var v = 1 + 0.045 * n,
       u = 1 + 0.015 * n,
       c = a / 1,
       f = o / v,
       g = s / u,
       d = c * c + f * f + g * g;
     return d < 0 ? 0 : Math.sqrt(d);
   }