(function() {
          var can = document.getElementById("vas");
          var widths = document.documentElement.scrollWidth || document.body.scrollWidth;
          var heights = document.documentElement.scrollHeight || document.body.scrollHeight;
          can.width = widths;
          can.height = heights -100;
          var conm = 2000;
          var ctx = can.getContext("2d");
          ctx.fillStyle = "#fff";
          var Snowflake = function() {
              this.x = 0;
              this.y = 0;
              this.vy = 0;
              this.vx = 0;
              this.r = 0;
              this.reset();
          };
          Snowflake.prototype.reset = function() {
              this.x = Math.random() * widths;
              this.y = Math.random() * -heights;
              this.vy = 1 + Math.random() * 5;
              this.vx = 0.5 - Math.random();
              this.r = 1 + Math.random() * 4;
              this.o = 0.5 + Math.random() * 0.5;
          };
          var snowflakes = [],
              snowflake;
          for (i = 0; i < conm; i++) {
              snowflake = new Snowflake();
              snowflakes.push(snowflake);
          }
          setInterval(function() {
              ctx.clearRect(0, 0, widths, heights);
              for (i = 0; i < conm; i++) {
                  snowflake = snowflakes[i];
                  snowflake.y += snowflake.vy;
                  snowflake.x += snowflake.vx;
                  ctx.globalAlpha = snowflake.o;
                  ctx.beginPath();
                  ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2);
                  ctx.closePath();
                  ctx.fill();
                  if (snowflake.y > heights) {
                      snowflake.reset();
                  }
              }
          }, 15);
      }());