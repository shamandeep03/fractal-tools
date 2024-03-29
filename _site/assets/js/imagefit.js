function bestImageFit(r, f, o, n) {
     if (r >= o) {
       var u = r / o,
         s = f / n;
       return u > s
         ? {
             width: o,
             height: f / u,
             offsetX: 0,
             offsetY: (n - f / u) / 2,
             scale: u,
           }
         : {
             width: r / s,
             height: f / s,
             offsetX: (o - r / s) / 2,
             offsetY: (n - f / s) / 2,
             scale: s,
           };
     } else if (f > n) {
       var X = f / n;
       return {
         width: r / X,
         height: f / X,
         offsetX: (o - r / X) / 2,
         offsetY: 0,
         scale: X,
       };
     } else
       return {
         width: r,
         height: f,
         offsetX: (o - r) / 2,
         offsetY: (n - f) / 2,
         scale: 1,
       };
   }