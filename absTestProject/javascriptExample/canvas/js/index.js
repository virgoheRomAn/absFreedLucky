{
    class Arm {
        constructor(img, a, x, y, len, w) {
            this.x = x;
            this.y = y;
            this.len = len;
            this.segments = [];
            this.root = true;
            this.rotation = a - Math.PI;
            let parent = this;
            let root = true;
            for (let i = 0; i < len; ++i) {
                parent = new Arm.Segment(parent, a, i, img, root, kAngLimit, w);
                this.segments.push(parent);
                root = false;
                w = w / (1 + 4 / len);
            }
        }
        ik() {
            for (let s of this.segments) {
                s.ik();
            }
        }
    }
    Arm.Segment = class Segment {
        constructor(parent, a, i, img, root, limit, w) {
            this.parent = parent;
            this.i = i;
            this.img = img;
            this.root = root;
            this.limit = limit;
            this.x = this.parent.x;
            this.y = this.parent.y;
            this.rotation = a;
            this.cos = 0;
            this.sin = 0;
            this.w = w;
        }
        ik() {
            let a =
                Math.atan2(
                    (pointer.y - canvas.dy) / zoom - this.y,
                    (pointer.x - canvas.dx) / zoom - this.x
                ) - this.rotation;
            for (; a > Math.PI; a -= 2 * Math.PI);
            for (; a < -Math.PI; a += 2 * Math.PI);
            this.rotation += a * kSpeed * this.i / kLen;
            a = this.parent.rotation - this.rotation;
            for (; a > Math.PI; a -= 2 * Math.PI);
            for (; a < -Math.PI; a += 2 * Math.PI);
            if (a > this.limit) {
                this.rotation = this.parent.rotation - this.limit;
            } else if (a < -this.limit) {
                this.rotation = this.parent.rotation + this.limit;
            }
            this.cos = Math.cos(this.rotation);
            this.sin = Math.sin(this.rotation);
            if (!this.root) {
                this.x = this.parent.x + this.parent.cos * this.parent.w * kDensity;
                this.y = this.parent.y + this.parent.sin * this.parent.w * kDensity;
            }
        }
        draw() {
            ctx.drawImage(
                this.img,
                this.x - this.w,
                this.y - this.w,
                this.w * 2,
                this.w * 2
            );
        }
    };
    // set canvas
    const canvas = {
        init() {
            this.elem = document.querySelector("canvas");
            this.tv = document.createElement('canvas');
            this.resize();
            window.addEventListener("resize", () => canvas.resize(), false);
            return this.elem.getContext("2d");
        },
        resize() {
            this.width = this.elem.width = this.elem.offsetWidth;
            this.height = this.elem.height = this.elem.offsetHeight;
            this.tv.width = this.width;
            this.tv.height = this.height;
            const ict = this.tv.getContext('2d');
            for (let i = 0; i < this.height + 5; i += 5) {
                ict.fillStyle = 'rgba(42,60,58,0.3)';
                ict.fillRect(0, i, this.width, 2);
            }
        }
    };
    // set pointer
    const pointer = {
        init(canvas) {
            this.x = canvas.width * 0.5;
            this.y = canvas.height * 0.5;
            this.isDown = false;
            ["mousedown", "touchstart"].forEach((event, touch) => {
                document.addEventListener(event, e => (this.isDown = true), false);
            });
            ["mouseup", "touchend"].forEach((event, touch) => {
                document.addEventListener(event, e => (this.isDown = false), false);
            });
            ["mousemove", "touchmove"].forEach((event, touch) => {
                document.addEventListener(
                    event,
                    e => {
                        if (touch) {
                            e.preventDefault();
                            this.x = e.targetTouches[0].clientX;
                            this.y = e.targetTouches[0].clientY;
                        } else {
                            this.x = e.clientX;
                            this.y = e.clientY;
                        }
                    },
                    false
                );
            });
        }
    };
    // init pen
    const kDensity = 0.5;
    const kSpeed = 0.1;
    const kLen = 100;
    const kSize = 100;
    const kAngLimit = Math.PI / 10;
    const img = new Image();
    let zoom = 3.0;
    img.src = document.getElementById("coludaba").src;
    const ctx = canvas.init();
    pointer.init(canvas);
    const arms = [];
    for (let a = Math.PI / 2; a < Math.PI * 2; a += Math.PI / 1.5) {
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;
        arms.push(
            new Arm(
                img,
                a,
                cx + Math.cos(a) * cx * 0.75,
                cy + Math.sin(a) * cy * 0.75,
                kLen,
                kSize
            )
        );
    }
    // main loop
    const run = () => {
        requestAnimationFrame(run);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // zoom
        zoom *= pointer.isDown ? 1.02 : 0.98;
        if (zoom < 1.0) zoom = 1.0;
        else if (zoom > 3.0) zoom = 3.0;
        canvas.dx = canvas.width * 0.5 - canvas.width * 0.5 * zoom;
        canvas.dy = canvas.height * 0.5 - canvas.height * 0.5 * zoom;
        ctx.save();
        ctx.translate(canvas.dx, canvas.dy);
        ctx.scale(zoom, zoom);
        // Release the Kraken!
        for (let arm of arms) arm.ik();
        for (let i = 0; i < kLen; i++) {
            for (let arm of arms) {
                arm.segments[i].draw();
            }
        }
        ctx.restore();
        // cursor
        ctx.globalCompositeOperation = "overlay";
        ctx.beginPath();
        ctx.strokeStyle = "rgba(42,60,58, 1)";
        ctx.fillStyle = "rgba(60,42,18, 0.5)";
        ctx.arc(pointer.x, pointer.y, 4 * kSize * zoom * 0.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = "lighter";
        ctx.moveTo(pointer.x, 0);
        ctx.lineTo(pointer.x, canvas.height);
        ctx.moveTo(0, pointer.y);
        ctx.lineTo(canvas.width, pointer.y);
        ctx.stroke();
        ctx.drawImage(canvas.tv, 0, 0);
        ctx.globalCompositeOperation = "source-over";
    };
    run();
}