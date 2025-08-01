var Incremancer;
(() => {
    "use strict";
    var e = {};
    //hahahah
    function t(e, t) {
        return Math.sqrt(e * e + t * t)
    }

    function s(e, t, s, i) {
        return Math.sqrt((e - s) * (e - s) + (t - i) * (t - i))
    }

    function i(e, t, s, i) {
        const a = Math.abs(e - s),
            r = Math.abs(t - i);
        return .4 * (a + r) + .56 * Math.max(a, r)
    }

    function a(e, t) {
        return e[Math.floor(t * e.length)]
    }

    function r(e) {
        return o(e, 2)
    }

    function n(e) {
        return o(e, e > 1e3 ? 2 : 0)
    }

    function o(e, t) {
        return e || (e = 0), e >= 1e15 ? e.toExponential(t).replace("+", "") : e >= 1e12 ? (e / 1e12).toFixed(t) + "T" : e >= 1e9 ? (e / 1e9).toFixed(t) + "B" : e >= 1e6 ? (e / 1e6).toFixed(t) + "M" : e >= 1e3 ? (e / 1e3).toFixed(t) + "K" : e.toFixed(t)
    }

    function h(e, t, s, i) {
        return 1 == t ? Math.floor(i / e) : Math.floor(Math.log(i * (t - 1) / (e * Math.pow(t, s)) + 1) / Math.log(t))
    }

    function l(e, t, s, i) {
        return 1 == t ? e * i : e * (Math.pow(t, s) * (Math.pow(t, i) - 1) / (t - 1))
    }

    function d(e, t) {
        const s = document.getElementById("champ-hold").getBoundingClientRect();
        let i = e.clientX - s.x;
        const a = e.clientY - s.y;
        i > s.width / 2 && (i -= t.getElementsByClassName("tooltip")[0].getBoundingClientRect().width), t.getElementsByClassName("tooltip")[0].style.top = a + 20 + "px", t.getElementsByClassName("tooltip")[0].style.left = i + 20 + "px"
    }
    let c, u, p, g, m, b, f, y, x;
    (e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    })(e);
    let v, S, M, k, w, T, C, D = {
        x: 800,
        y: 600,
        defaultScale: 1
    },
        P = {
            x: 600,
            y: 600
        };

    function z(e) {
        this.data = e.data, this.dragging = !0, this.dragOffset = this.data.getLocalPosition(this), this.dragOffset.x *= this.scale.x, this.dragOffset.y *= this.scale.y, this.dragStartX = this.x, this.dragStartY = this.y, B = 0
    }

    function I() {
        this.dragging = !1, this.data = null, B = 0
    }
    let B = 0,
        R = 0;

    function H(e) {
        if (T.zombieCursor) {
            T.zombieCursor.position = e.data.getLocalPosition(this.parent);
            const t = e.data.getLocalPosition(x);
            T.mouseOutOfBounds = t.x < 0 || t.y < 0 || t.x > x.width || t.y > x.height
        }
        if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) ! function (e) {
            const t = Math.abs(e.data.originalEvent.touches[0].clientX - e.data.originalEvent.touches[1].clientX);
            B ? R + 50 < Date.now() && Math.abs(t - B) > 10 && (A(t > B ? 1 : -1, null), R = Date.now(), B = t) : B = t
        }(e);
        else if (this.dragging) {
            const e = this.data.getLocalPosition(this.parent);
            this.x = e.x - this.dragOffset.x, this.y = e.y - this.dragOffset.y, F(this), s(this.dragStartX, this.dragStartY, this.x, this.y) > 5 && (this.hasMoved = !0)
        }
    }

    function F(e) {
        const t = P.x * e.scale.x,
            s = P.y * e.scale.y;
        e.x > .5 * D.x && (e.x = .5 * D.x), e.x + t < .5 * D.x && (e.x = .5 * D.x - t), e.y > .5 * D.y && (e.y = .5 * D.y), e.y + s < .5 * D.y && (e.y = .5 * D.y - s)
    }

    function E(e) {
        this.hasMoved || v.currentState != v.states.playingLevel || (Y.shift ? T.spawnAllZombies(e.data.getLocalPosition(this).x, e.data.getLocalPosition(this).y) : T.spawnZombie(e.data.getLocalPosition(this).x, e.data.getLocalPosition(this).y)), this.hasMoved = !1
    }

    function A(e, t) {
        if (R + 50 > Date.now()) return;
        R = Date.now();
        const s = c;
        t || (t = {
            x: .5 * D.x,
            y: .5 * D.y
        });
        const i = P.x * s.scale.x,
            a = P.y * s.scale.y;
        t.x > s.x + i && (t.x = s.x + i), t.x < s.x && (t.x = s.x), t.y < s.y && (t.y = s.y), t.y > s.y + a && (t.y = s.y + a);
        const r = (t.x - s.x) / s.scale.x,
            n = (t.y - s.y) / s.scale.y;
        e > 0 ? s.scale.x < 10 && (s.scale.x = s.scale.y = 1.1 * s.scale.x, T.zombieCursor && T.zombieCursor.scale && (T.zombieCursor.scale.x = T.zombieCursor.scale.y = 1.1 * T.zombieCursor.scale.x)) : Math.max(i, a) > .8 * Math.min(D.y, D.x) && (s.scale.x = s.scale.y = .9 * s.scale.x, T.zombieCursor && T.zombieCursor.scale && (T.zombieCursor.scale.x = T.zombieCursor.scale.y = .9 * T.zombieCursor.scale.x)), s.x = t.x - r * s.scale.x, s.y = t.y - n * s.scale.y, F(s)
    }

    function L(e) {
        e.preventDefault();
        const t = {
            x: e.clientX * (D.x / document.body.clientWidth),
            y: e.clientY * (D.y / document.body.clientHeight)
        };
        e.deltaY < 0 || e.deltaX < 0 ? A(1, t) : A(-1, t)
    }

    function Z(e = !1) {
        e && (c.scale.x = D.defaultScale, c.scale.y = D.defaultScale, T.zombieCursor && (T.zombieCursor.scale.x = T.zombieCursor.scale.y = T.zombieCursorScale * D.defaultScale)), c.x = (D.x - P.x * c.scale.x) / 2, c.y = (D.y - P.y * c.scale.y) / 2
    }
    const G = {
        x: 0,
        y: 0,
        width: 1e3,
        height: 1e3,
        hideParticle(e, t) {
            return e < this.x || t < this.y || e > this.x + this.width || t > this.y + this.height
        },
        update() {
            this.x = -c.x / c.scale.x, this.y = -c.y / c.scale.y, this.width = D.x / c.scale.x, this.height = D.y / c.scale.y
        }
    },
        X = new PIXI.Matrix;

    function U(e, t) {
        ! function (e) {
            const t = Y;
            let s = !1;
            const i = c;
            t.w && (i.y += t.scrollSpeed * e, s = !0), t.a && (i.x += t.scrollSpeed * e, s = !0), t.s && (i.y -= t.scrollSpeed * e, s = !0), t.d && (i.x -= t.scrollSpeed * e, s = !0), s && F(i)
        }(e), G.update(), e *= v.gameSpeed, M.update(e), C.update(e), T.update(e), k.update(e), w.update(e), S.update(e),
            function (e, t) {
                if (C.vipEscaping && void 0 !== C.vip ? y.alpha += e : (y.alpha -= e, y.alpha < 0 && (y.alpha = 0)), y.alpha > 0) {
                    y.alpha > 1 && (y.alpha = 1), y.visible = !0, y.x = 5, y.y = D.y - 305;
                    const e = c.scale.x,
                        s = c.scale.y,
                        i = c.x,
                        a = c.y;
                    c.position.set(0, 0), C.vip && (X.tx = -2 * C.vip.x + 150, X.ty = -2 * C.vip.y + 150), c.scale.set(2, 2), t.renderer.render(c, f, void 0, X), c.scale.set(e, s), c.position.set(i, a)
                } else y.visible = !1
            }(e, t)
    }

    function N() {
        const e = Math.min(500 + 50 * v.level, 1500),
            t = Math.random() * e / 3;
        P = {
            x: e + t,
            y: e - t
        }, x && (x.width = P.x, x.height = P.y), c.hitArea = new PIXI.Rectangle(0, 0, P.x, P.y)
    }

    function O() {
        const e = document.body.clientWidth,
            t = document.body.clientHeight;
        D = {
            x: e,
            y: t,
            defaultScale: Math.max(e, t) / 1e3
        }, Y.scrollSpeed = Math.max(e, t) / 4
    }
    new Map, window.onload = function () {
        v = ne.getInstance(), S = new Qe, M = new Oe, k = new Ue, w = new Xe, T = new Ae, C = new Se, v.loadData(), v.onReady(), O(),
            function () {
                PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
                const e = new PIXI.Application({
                    width: D.x,
                    height: D.y,
                    backgroundColor: 1066256,
                    resolution: v.persistentData.resolution || 1,
                    antialias: !1,
                    resizeTo: window
                });
                document.body.appendChild(e.view), PIXI.utils.isWebGLSupported() || console.error("Warning: WebGL support not detected. Game performance may be slower."),
                    function (e) {
                        c = new PIXI.Container, u = new PIXI.Container, p = new PIXI.Container, g = new PIXI.Container, g.sortableChildren = !0, b = new PIXI.Container, m = new PIXI.Container, f = PIXI.RenderTexture.create({
                            width: 300,
                            height: 300
                        }), y = new PIXI.Sprite(f), y.visible = !1, y.alpha = 0, m.addChild(y), c.addChild(u), c.addChild(p), c.addChild(g), c.addChild(b), e.stage.addChild(c), e.stage.addChild(m), c.interactive = !0, c.interactiveChildren = !1, c.on("pointerdown", z), c.on("pointerup", I), c.on("pointerupoutside", I), c.on("pointermove", H), c.on("click", E), c.on("tap", E), document.getElementsByTagName("canvas")[0].onwheel = L, document.getElementsByTagName("canvas")[0].oncontextmenu = function (e) {
                            e.preventDefault()
                        }
                    }(e), e.loader.add("sprites/ground.json").add("sprites/megagraveyard.png").add("sprites/graveyard.json").add("sprites/buildings.json").add("sprites/humans.json").add("sprites/cop.json").add("sprites/dogs.json").add("sprites/army.json").add("sprites/doctor.json").add("sprites/zombie.json").add("sprites/golem.json").add("sprites/bonecollector.json").add("sprites/harpy.json").add("sprites/objects2.json").add("sprites/fenceposts.json").add("sprites/trees2.json").add("sprites/fortress.json").add("sprites/tank.json").add("sprites/skeleton.json").load((function () {
                        v.app = e, N(), x = new PIXI.TilingSprite(PIXI.Texture.from("grass.png")), x.texture.baseTexture.mipmap = PIXI.MIPMAP_MODES.OFF, x.width = P.x, x.height = P.y, u.addChild(x), v.setupLevel(), setTimeout((function () {
                            Z(!0)
                        })), e.ticker.add((t => {
                            U(e.ticker.deltaMS / 1e3, e), v.frameRate = e.ticker.FPS
                        }))
                    }))
            }(), window.self !== window.top && ("" != document.referrer && -1 == document.referrer.indexOf("kongregate.com") && -1 == document.referrer.indexOf("konggames.com") && -1 == document.referrer.indexOf("gti.nz") ? window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : -1 === document.referrer.indexOf("kongregate.com") && -1 === document.referrer.indexOf("konggames.com") || kongregateAPI.loadAPI((function () {
                window.kongregate = kongregateAPI.getAPI(), v.kongregate = !0, v.loginInUsingPlayFab()
            }))), document.addEventListener("visibilitychange", (function () {
                "hidden" == document.visibilityState ? v.hidden = !0 : v.hidden = !1
            }), !1)
    }, window.onresize = function () {
        O()
    };
    const Y = {
        scrollSpeed: 200,
        w: !1,
        a: !1,
        s: !1,
        d: !1,
        shift: !1,
        canType: !1
    };
    window.onblur = function () {
        Y.w = Y.a = Y.s = Y.d = !1, Y.shift = !1
    }, window.onkeydown = function (e) {
        if (Y.canType) return !0;
        switch (e.keyCode) {
            case 16:
            case 17:
                Y.shift = !0;
                break;
            case 87:
            case 38:
                Y.w = !0;
                break;
            case 65:
            case 37:
                Y.a = !0;
                break;
            case 83:
            case 40:
                Y.s = !0;
                break;
            case 68:
            case 39:
                Y.d = !0;
                break;
            default:
                return !0
        }
        return !1
    }, window.onkeyup = function (e) {
        if (Y.canType) return !0;
        switch (e.keyCode) {
            case 16:
            case 17:
                Y.shift = !1;
                break;
            case 87:
            case 38:
                Y.w = !1;
                break;
            case 65:
            case 37:
                Y.a = !1;
                break;
            case 83:
            case 40:
                Y.s = !1;
                break;
            case 68:
            case 39:
                Y.d = !1;
                break;
            default:
                return !0
        }
        return !1
    };
    class W {
        constructor(e, t, s, i, a, r, n, o, h) {
            this.id = e, this.name = t, this.tooltip = s, this.itemText = i, this.cooldown = a, this.duration = r, this.energyCost = n, this.start = o, this.end = h, this.timer = 0, this.onCooldown = !1, this.active = !1, this.cooldownLeft = 0
        }
    }
    class q {
        constructor() {
            if (this.cooldownReduction = 0, this.timeExtension = 0, this.costReduction = 0, this.skeleton = new Xe, this.zombies = new Ae, this.humans = new Se, this.spellMap = new Map, this.spells = [new W(1, "Time Warp", "Speed up the flow of time for 30 seconds", "", 90, 30, 0,
                (function () {
                    ne.getInstance().gameSpeed = 2
                }), (function () {
                    ne.getInstance().gameSpeed = 1
                })), new W(2, "Energy Charge", "5x Energy rate for 20 seconds, cost 50 energy", "", 160, 20, 50, (function () {
                    ne.getInstance().energySpellMultiplier = 5
                }), (function () {
                    ne.getInstance().energySpellMultiplier = 1
                })), new W(3, "Detonate", "Turns your zombies into fast moving living bombs, cost 69 energy... nice", "", 80, 8, 69, (function () {
                    (new q).zombies.detonate = !0
                }), (function () {
                    (new q).zombies.detonate = !1
                })), new W(4, "Earth Freeze", "Freeze all humans in place preventing them from moving for 15 seconds, cost 75 energy", "", 50, 15, 75, (function () {
                    (new q).humans.frozen = !0
                }), (function () {
                    (new q).humans.frozen = !1
                })), new W(5, "Gigazombies", "For 5 seconds any zombies spawned will be giants with 10x health and attack damage, cost 100 energy", "", 260, 5, 100, (function () {
                    (new q).zombies.super = !0
                }), (function () {
                    (new q).zombies.super = !1
                })), new W(6, "Incinerate", "Burns humans near the skeleton champion", "Has a chance to cast Incinerate when attacking, burning all humans within a large radius of the Skeleton", 1, 10, 10, (function () {
                    (new q).skeleton.incinerate(), this.timer = 1
                }), (function () { })), new W(7, "Pandemic", "Causes plague to spread", "Has a chance to cast Pandemic when attacking, causing infected humans to spread the plague to each other for 20 seconds", 10, 20, 10, (function () {
                    (new q).humans.pandemic = !0
                }), (function () {
                    (new q).humans.pandemic = !1
                })), new W(8, "Part Storm", "Doubles parts", "Has a chance to cast Part Storm when attacking, doubling the parts production of your factory machines for 15 seconds", 10, 15, 10, (function () {
                    (new se).storm = !0
                }), (function () {
                    (new se).storm = !1
                }))], q.instance) return q.instance;
            q.instance = this, this.spells.forEach((e => this.spellMap.set(e.id, e)))
        }
        lockAllSpells() {
            for (let e = 0; e < this.spells.length; e++) this.spells[e].unlocked = !1
        }
        unlockSpell(e) {
            this.spellMap.get(e).unlocked = !0
        }
        getSpell(e) {
            return this.spellMap.get(e)
        }
        getUnlockedSpells() {
            return this.spells.filter((e => e.unlocked))
        }
        castSpell(e) {
            const t = ne.getInstance();
            e.onCooldown || e.active || !e.unlocked || e.energyCost - this.costReduction > t.energy || (t.energy -= e.energyCost - this.costReduction, e.onCooldown = !0, e.cooldownLeft = e.cooldown * this.cooldownReduction, e.active = !0, e.timer = e.duration + this.timeExtension, e.start(), t.sendMessage(e.name))
        }
        castSpellNoMana(e) {
            const t = this.spellMap.get(e);
            t && !t.active && (t.active = !0, t.timer = t.duration + this.timeExtension, t.start(), ne.getInstance().sendMessage(t.name))
        }
        updateSpells(e) {
            for (let t = 0; t < this.spells.length; t++) {
                const s = this.spells[t];
                s.onCooldown && !s.active && (s.cooldownLeft -= e, s.cooldownLeft <= 0 && (s.onCooldown = !1)), s.active && (s.timer -= e, s.timer <= 0 && (s.active = !1, s.end()))
            }
        }
    }
    class V extends PIXI.TilingSprite {
        constructor(e) {
            super(e), this.collisionX = 0, this.collisionY = 0, this.collisionWidth = 0, this.collisionHeight = 0
        }
    }
    class j {
        constructor(e, t, s, i, a) {
            this.id = 0, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.entrance = null, this.id = e, this.x = t, this.y = s, this.width = i, this.height = a
        }
    }
    class $ {
        constructor() {
            this.attack = 0, this.scan = 0, this.smoke = 0, this.burnTick = 0, this.ability = 0, this.dogStun = 0, this.target = 0
        }
    }
    class K {
        constructor() {
            this.burning = !1, this.infected = !1, this.dead = !1, this.golem = !1
        }
    }
    class Q extends PIXI.AnimatedSprite {
        constructor(e) {
            super(e), this.xSpeed = 0, this.ySpeed = 0, this.health = 0, this.maxHealth = 0, this.zombie = !1, this.targetVector = {
                x: 0,
                y: 0
            }, this.burnDamage = 0, this.hasIcon = !1, this.flags = new K, this.timer = new $
        }
        reset() {
            this.xSpeed = 0, this.ySpeed = 0, this.alpha = 1, this.visible = !0, this.burnDamage = 0, this.currentPoi = null, this.flags.dead = !1, this.flags.burning = !1, this.flags.infected = !1
        }
    }
    class J extends PIXI.Sprite {
        constructor(e) {
            super(e), this.xSpeed = 0, this.ySpeed = 0
        }
    }
    class _ {
        constructor() {
            this.sprites = [], this.discardedSprites = []
        }
        setup(e, t) {
            this.container = e, this.texture = t
        }
        discardSprite(e) {
            e.visible = !1, this.discardedSprites.push(e)
        }
        getSprite() {
            if (this.discardedSprites.length > 0) {
                const e = this.discardedSprites.pop();
                return e.visible = !0, e
            }
            const e = this.create(this.texture);
            return this.container.addChild(e), this.sprites.push(e), e
        }
    }
    class ee {
        constructor() {
            if (this.gameModel = ne.getInstance(), this.humans = new Se, this.discardedWalls = [], this.discardedContainers = [], this.discardedFloorSprites = [], this.buildings = [], this.buildingsByPopularity = [], this.buildingMap = [], this.roadSprite = null, this.roadTexture = null, this.entranceWidth = 16, this.entranceDepth = 16, this.cornerDistance = 16, this.minBuildings = 3, this.wallWidth = 4, this.graveyardCollision = null, this.graveYardLocation = {
                x: 0,
                y: 0
            }, this.graveYardPosition = null, this.wallCollisionBuffer = 3, this.fastDistance = i, this.pathFindStepSize = 5, this.dx = 0, this.dy = 0, this.stepsToTake = 10, this.hasHit = !1, this.vector = null, this.corner = null, this.hitbuilding = !1, this.insideBuilding = !1, this.treeSprites = [], this.treeTextures = [], this.armyTextures = [], ee.instance) return ee.instance;
            ee.instance = this
        }
        getRandomBuilding() {
            return a(this.buildingsByPopularity, Math.random())
        }
        roomNoOverlap(e, t) {
            return e.x > t.x + t.width + 50 || e.x + e.width + 50 < t.x || e.y > t.y + t.height + 50 || e.y + e.height + 50 < t.y || void 0
        }
        isValidPosition(e) {
            if (!this.roomNoOverlap(e, this.graveYardPosition)) return !1;
            for (let t = 0; t < this.buildings.length; t++)
                if (!this.roomNoOverlap(e, this.buildings[t])) return !1;
            return !(this.gameModel.level % 5 == 0 && !this.gameModel.isBossStage(this.gameModel.level) && e.y < this.roadSprite.y + this.roadSprite.height && e.y + e.height > this.roadSprite.y)
        }
        getWall(e) {
            if (this.discardedWalls.length > 0) {
                const t = this.discardedWalls.pop();
                return t.texture = e, t
            }
            return new V(e)
        }
        makeHorizontalWall(e, t, s, i, a, r) {
            if (s) {
                const s = this.getWall(t);
                s.x = i, s.y = a, s.width = r / 2 - this.entranceWidth, s.height = 4, e.push(s);
                const n = this.getWall(t);
                n.x = i + r / 2 + this.entranceWidth, n.y = a, n.width = r / 2 - this.entranceWidth, n.height = 4, e.push(n)
            } else {
                const s = this.getWall(t);
                s.x = i, s.y = a, s.width = r, s.height = 4, e.push(s)
            }
        }
        makeVerticalWall(e, t, s, i, a, r) {
            if (s) {
                const s = this.getWall(t);
                s.x = i, s.y = a, s.width = 4, s.height = r / 2 - this.entranceWidth, e.push(s);
                const n = this.getWall(t);
                n.x = i, n.y = a + r / 2 + this.entranceWidth, n.width = 4, n.height = r / 2 - this.entranceWidth, e.push(n)
            } else {
                const s = this.getWall(t);
                s.x = i, s.y = a, s.width = 4, s.height = r, e.push(s)
            }
        }
        getContainer() {
            return this.discardedContainers.length > 0 ? this.discardedContainers.pop() : new PIXI.Container
        }
        getFloorSprite() {
            return this.discardedFloorSprites.length > 0 ? this.discardedFloorSprites.pop() : new PIXI.TilingSprite(PIXI.Texture.WHITE)
        }
        addBuilding(e) {
            var t, s;
            e.container = this.getContainer(), e.container.cacheAsBitmap = !1, e.floorSprite = this.getFloorSprite(), e.floorSprite.tint = (t = 10 + Math.round(50 * Math.random()), s = 10 + Math.round(50 * Math.random()), 10 + Math.round(50 * Math.random()) | s << 8 | t << 16), e.floorSprite.alpha = .2, e.container.x = e.x, e.container.y = e.y, e.floorSprite.width = e.width, e.floorSprite.height = e.height, e.container.addChild(e.floorSprite);
            const r = [{
                x: e.x + e.width / 2,
                y: e.y,
                north: !0,
                inside: {
                    x: e.x + e.width / 2,
                    y: e.y + this.entranceDepth,
                    entrance: !0
                },
                outside: {
                    x: e.x + e.width / 2,
                    y: e.y - this.entranceDepth,
                    entrance: !0
                }
            }, {
                x: e.x + e.width / 2,
                y: e.y + e.height,
                south: !0,
                inside: {
                    x: e.x + e.width / 2,
                    y: e.y + e.height - this.entranceDepth,
                    entrance: !0
                },
                outside: {
                    x: e.x + e.width / 2,
                    y: e.y + e.height + this.entranceDepth,
                    entrance: !0
                }
            }, {
                x: e.x,
                y: e.y + e.height / 2,
                west: !0,
                inside: {
                    x: e.x + this.entranceDepth,
                    y: e.y + e.height / 2,
                    entrance: !0
                },
                outside: {
                    x: e.x - this.entranceDepth,
                    y: e.y + e.height / 2,
                    entrance: !0
                }
            }, {
                x: e.x + e.width,
                y: e.y + e.height / 2,
                east: !0,
                inside: {
                    x: e.x + e.width - this.entranceDepth,
                    y: e.y + e.height / 2,
                    entrance: !0
                },
                outside: {
                    x: e.x + e.width + this.entranceDepth,
                    y: e.y + e.height / 2,
                    entrance: !0
                }
            }];
            let n;
            const o = {
                x: P.x / 2,
                y: P.y / 2
            };
            let h = 2e3;
            for (let e = 0; e < r.length; e++) {
                const t = i(r[e].x, r[e].y, o.x, o.y);
                t < h && (h = t, n = r[e])
            }
            e.entrance = n, this.gameModel.level % 5 == 0 && (e.y < P.y / 2 ? e.entrance = r.filter((e => e.south))[0] : e.entrance = r.filter((e => e.north))[0]), e.walls = [];
            const l = a(this.buildingTextures, Math.random());
            this.makeHorizontalWall(e.walls, l, e.entrance.north, -4, -4, e.width + 8), this.makeHorizontalWall(e.walls, l, e.entrance.south, -4, e.height, e.width + 8), this.makeVerticalWall(e.walls, l, e.entrance.west, -4, -4, e.height + 8), this.makeVerticalWall(e.walls, l, e.entrance.east, e.width, -4, e.height + 8);
            for (let t = 0; t < e.walls.length; t++) e.container.addChild(e.walls[t]);
            e.container.cacheAsBitmap = !0, u.addChild(e.container);
            for (let t = 0; t < e.walls.length; t++) e.walls[t].collisionX = e.x + e.walls[t].x, e.walls[t].collisionY = e.y + e.walls[t].y, e.walls[t].collisionWidth = e.walls[t].width, e.walls[t].collisionHeight = e.walls[t].height
        }
        addCorners(e) {
            e.corners = [], e.corners.push({
                x: e.x - this.cornerDistance,
                y: e.y - this.cornerDistance
            }), e.corners.push({
                x: e.x + e.width + this.cornerDistance,
                y: e.y - this.cornerDistance
            }), e.corners.push({
                x: e.x - this.cornerDistance,
                y: e.y + e.height + this.cornerDistance
            }), e.corners.push({
                x: e.x + e.width + this.cornerDistance,
                y: e.y + e.height + this.cornerDistance
            })
        }
        setGraveyardPosition() {
            this.gameModel.level % 5 != 0 || this.gameModel.isBossStage(this.gameModel.level) ? this.graveYardPosition = {
                x: P.x / 2 - 50,
                y: P.y / 2 - 50,
                width: 100,
                height: 100
            } : this.graveYardPosition = {
                x: Math.random() * P.x * .8 - 50 + .1 * P.x,
                y: (Math.random() > .5 ? .25 * P.y : .75 * P.y) - 50,
                width: 100,
                height: 100
            }, this.graveYardLocation = {
                x: this.graveYardPosition.x + 50,
                y: this.graveYardPosition.y + 50
            }
        }
        populatePois() {
            if (this.setGraveyardPosition(), !this.buildingTextures) {
                this.buildingTextures = [];
                for (let e = 0; e < 2; e++) this.buildingTextures.push(PIXI.Texture.from("floor" + (e + 1) + ".png"));
                for (let e = 0; e < 2; e++) this.buildingTextures.push(PIXI.Texture.from("wall" + (e + 1) + ".png"));
                this.roadSprite = new PIXI.TilingSprite(PIXI.Texture.from("road.png")), this.roadSprite.texture.baseTexture.mipmap = PIXI.MIPMAP_MODES.OFF, this.roadSprite.width = P.x, this.roadSprite.tileScale.set(3, 3), this.roadSprite.height = 96, u.addChild(this.roadSprite), this.roadSprite.visible = !1, this.roadSprite.anchor.set(0, 0)
            }
            if (this.buildings.length > 0)
                for (let e = 0; e < this.buildings.length; e++) u.removeChild(this.buildings[e].container), this.buildings[e].walls.forEach((t => {
                    this.discardedWalls.push(t), this.buildings[e].container.removeChild(t)
                })), this.buildings[e].container.removeChild(this.buildings[e].floorSprite), this.discardedFloorSprites.push(this.buildings[e].floorSprite), this.discardedContainers.push(this.buildings[e].container);
            let e = 1;
            this.buildingsByPopularity = [], this.buildings = [];
            let t = this.minBuildings,
                s = this.humans.getMaxHumans();
            const i = Math.max(Math.min(50, Math.round(s / 3)), 10);
            for (this.roadSprite.visible = !1, this.gameModel.isBossStage(this.gameModel.level) ? (s = 0, t = 0) : this.gameModel.level % 5 == 0 && (this.roadSprite.visible = !0, this.roadSprite.width = P.x, this.roadSprite.x = 0, this.roadSprite.y = P.y / 2 - 48); s > 0 || t > 0;) {
                t--;
                const a = Math.round(5 + Math.random() * (i - 5)),
                    r = Math.sqrt(500 * a);
                s -= a;
                let n, o = !1,
                    h = 1e3;
                const l = 10;
                for (; !o && h > 0;) h--, n = this.gameModel.level % 5 == 0 ? Math.random() > .7 ? {
                    x: l + Math.random() * (P.x - (2 * l + r)),
                    y: l + Math.random() * (P.y - (2 * l + r)),
                    width: r,
                    height: r
                } : {
                    x: l + Math.random() * (P.x - (2 * l + r)),
                    y: Math.random() > .5 ? P.y / 2 + this.roadSprite.height / 2 + 8 : P.y / 2 - this.roadSprite.height / 2 - 8 - r,
                    width: r,
                    height: r
                } : {
                    x: l + Math.random() * (P.x - (2 * l + r)),
                    y: l + Math.random() * (P.y - (2 * l + r)),
                    width: r,
                    height: r
                }, o = this.isValidPosition(n);
                if (o) {
                    const t = new j(e++, n.x, n.y, r, r);
                    this.addBuilding(t);
                    const s = Math.max(Math.round(r / 10), 1);
                    for (let e = 0; e < s; e++) this.buildingsByPopularity.push(t);
                    this.buildings.push(t), this.addCorners(t)
                }
            }
            this.populateBuildingMap(), this.populateTrees()
        }
        populateBuildingMap() {
            if (this.buildingMap = [], this.mapCols = Math.ceil(P.x / 10), this.mapRows = Math.ceil(P.y / 10), 0 != this.buildings.length)
                for (let e = 0; e < this.mapRows; e++) {
                    const t = 10 * e;
                    for (let i = 0; i < this.mapCols; i++) {
                        const a = 10 * i;
                        let r, n = 1e4;
                        for (let e = 0; e < this.buildings.length; e++) {
                            const i = this.buildings[e],
                                o = s(a, t, i.x + i.width / 2, i.y + i.height / 2) - i.width / 2;
                            o < n && (n = o, r = i)
                        }
                        this.buildingMap[e * this.mapCols + i] = r
                    }
                }
        }
        getBuildingFromMap(e, t) {
            return this.buildingMap[Math.round(t / 10) * this.mapCols + Math.round(e / 10)]
        }
        randomPositionInBuilding(e) {
            if (!e) {
                const e = Math.random() > .5 ? -1 : 1,
                    t = Math.random() > .5 ? -1 : 1,
                    s = P.x / 4,
                    i = P.y / 4;
                return Math.random() > .5 ? {
                    x: Math.random() * P.x,
                    y: P.y / 2 + t * i + Math.random() * t * i
                } : {
                    x: P.x / 2 + e * s + Math.random() * e * s,
                    y: Math.random() * P.y
                }
            }
            return {
                x: e.x + 5 + Math.random() * (e.width - 10),
                y: e.y + 5 + Math.random() * (e.height - 10)
            }
        }
        isInsidePoi(e, t, s, i = 0) {
            return e > s.x - i && e < s.x + s.width + i && t > s.y - i && t < s.y + s.height + i
        }
        checkWall(e, t, s, i) {
            t.y > e.collisionY && t.y < e.collisionY + e.collisionHeight && (t.x < e.collisionX - this.wallCollisionBuffer && s.x > e.collisionX - this.wallCollisionBuffer && (i.x = !0, i.validX = e.collisionX - this.wallCollisionBuffer - 1), t.x > e.collisionX + e.collisionWidth + this.wallCollisionBuffer && s.x < e.collisionX + e.collisionWidth + this.wallCollisionBuffer && (i.x = !0, i.validX = e.collisionX + e.collisionWidth + this.wallCollisionBuffer + 1)), t.x > e.collisionX && t.x < e.collisionX + e.collisionWidth && (t.y < e.collisionY - this.wallCollisionBuffer && s.y > e.collisionY - this.wallCollisionBuffer && (i.y = !0, i.validY = e.collisionY - this.wallCollisionBuffer - 1), t.y > e.collisionY + e.collisionHeight + this.wallCollisionBuffer && s.y < e.collisionY + e.collisionHeight + this.wallCollisionBuffer && (i.y = !0, i.validY = e.collisionY + e.collisionHeight + this.wallCollisionBuffer + 1))
        }
        checkGraveyard(e, t) {
            const s = new te;
            return this.graveyardCollision && this.checkWall(this.graveyardCollision, e, t, s), s.x || s.y ? s : null
        }
        checkCollisions(e, t) {
            const s = this.findBuilding(e);
            if (!s) return this.checkGraveyard(e, t);
            const i = new te;
            for (let a = 0; a < s.walls.length; a++) this.checkWall(s.walls[a], e, t, i);
            return i
        }
        pathStepCalc(e, t) {
            const s = t.x - e.x,
                i = t.y - e.y,
                a = Math.abs(s),
                r = Math.abs(i);
            if (0 == Math.max(a, r)) return;
            let n = 1 / Math.max(a, r);
            return n *= 1.29289 - (a + r) * n * .29289, {
                x: s * n * this.pathFindStepSize,
                y: i * n * this.pathFindStepSize
            }
        }
        findBuilding(e) {
            return this.getBuildingFromMap(e.x, e.y)
        }
        normalizeVector(e) {
            if (0 == e.x && 0 == e.y) return e;
            const t = Math.sqrt(e.x * e.x + e.y * e.y);
            return e.x /= t, e.y /= t, e
        }
        modifyVectorForCollision(e, t, s) {
            if (!t && !this.graveyardCollision) return this.normalizeVector(e);
            const i = new te,
                a = {
                    x: s.x + (e.x > 0 ? 1 : -1),
                    y: s.y + (e.y > 0 ? 1 : -1)
                };
            if (t)
                for (let e = 0; e < t.walls.length; e++) this.checkWall(t.walls[e], s, a, i);
            return this.graveyardCollision && this.checkWall(this.graveyardCollision, s, a, i), i.x && (e.x = 0), i.y && (e.y = 0), this.normalizeVector(e)
        }
        willVectorHitBuilding(e, t, s, i) {
            if (this.dx = t.x - e.x, this.dy = t.y - e.y, this.dx < 0 && e.x < s.x - 4) return !1;
            if (this.dx > 0 && e.x > s.x + s.width + 4) return !1;
            if (this.dy < 0 && e.y < s.y - 4) return !1;
            if (this.dy > 0 && e.y > s.y + s.width + 4) return !1;
            for (this.step = this.pathStepCalc(e, t), this.stepsToTake = Math.min(i / this.pathFindStepSize - this.pathFindStepSize, 30), this.hasHit = !1, this.testPosition = {
                x: e.x,
                y: e.y
            }; !this.hasHit && this.stepsToTake > 0;) this.stepsToTake--, this.testPosition.x += this.step.x, this.testPosition.y += this.step.y, this.isInsidePoi(this.testPosition.x, this.testPosition.y, s, 4) && (this.hasHit = !0);
            return this.hasHit
        }
        findNearestCorner(e, t) {
            let s = null,
                i = 1e4;
            for (let a = 0; a < t.length; a++) {
                const r = this.fastDistance(e.x, e.y, t[a].x, t[a].y);
                r < i && (i = r, s = t[a])
            }
            return s
        }
        findAdjacentCorners(e, t) {
            const s = [];
            for (let i = 0; i < t.corners.length; i++) t.corners[i].x != e.x && t.corners[i].y != e.y || s.push(t.corners[i]);
            return s
        }
        navigateAroundBuilding(e, t, s, i) {
            return this.vector = {
                x: t.x - e.x,
                y: t.y - e.y,
                distance: i
            }, s ? (this.hitbuilding = this.willVectorHitBuilding(e, t, s, i), this.hitbuilding ? (this.corner = this.findNearestCorner(t, s.corners), this.hitbuilding = this.willVectorHitBuilding(e, this.corner, s, i), this.hitbuilding ? (this.corner = this.findNearestCorner(e, this.findAdjacentCorners(this.corner, s)), this.vector.x = this.corner.x - e.x, this.vector.y = this.corner.y - e.y, this.modifyVectorForCollision(this.vector, s, e)) : (this.vector.x = this.corner.x - e.x, this.vector.y = this.corner.y - e.y, this.modifyVectorForCollision(this.vector, s, e))) : this.modifyVectorForCollision(this.vector, s, e)) : this.normalizeVector(this.vector)
        }
        howDoIGetToMyTarget(e, t) {
            if (this.distanceToTarget = this.fastDistance(e.x, e.y, t.x, t.y), this.closeBuilding = this.findBuilding(e), this.insideBuilding = !1, this.closeBuilding && (this.insideBuilding = this.isInsidePoi(e.x, e.y, this.closeBuilding, 0), this.insideBuilding)) return this.isInsidePoi(t.x, t.y, this.closeBuilding, 0) ? this.modifyVectorForCollision({
                x: t.x - e.x,
                y: t.y - e.y
            }, this.closeBuilding, e) : this.modifyVectorForCollision({
                x: this.closeBuilding.entrance.outside.x - e.x,
                y: this.closeBuilding.entrance.outside.y - e.y
            }, this.closeBuilding, e);
            const s = this.findBuilding(t);
            return s && (this.insideBuilding = this.isInsidePoi(t.x, t.y, s, 0), this.insideBuilding) ? this.fastDistance(e.x, e.y, s.entrance.outside.x, s.entrance.outside.y) < 30 ? this.modifyVectorForCollision({
                x: s.entrance.inside.x - e.x,
                y: s.entrance.inside.y - e.y
            }, this.closeBuilding, e) : this.navigateAroundBuilding(e, s.entrance.outside, this.closeBuilding, this.distanceToTarget) : this.distanceToTarget < 20 ? this.modifyVectorForCollision({
                x: t.x - e.x,
                y: t.y - e.y
            }, this.closeBuilding, e) : this.navigateAroundBuilding(e, t, this.closeBuilding, this.distanceToTarget)
        }
        isValidTreePosition(e) {
            if (!this.isValidPosition(e)) return !1;
            for (let t = 0; t < this.treeSprites.length; t++)
                if (this.fastDistance(e.x, e.y, this.treeSprites[t].x, this.treeSprites[t].y) < 25) return !1;
            return !0
        }
        populateTrees() {
            if (this.treeSprites.length > 0)
                for (let e = 0; e < this.treeSprites.length; e++) this.treeSprites[e].visible = !1;
            if (0 == this.treeTextures.length) {
                for (let e = 0; e < 6; e++) this.treeTextures.push(PIXI.Texture.from("tree" + e + ".png"));
                this.armyTextures.push(PIXI.Texture.from("hedgehog.png")), this.armyTextures.push(PIXI.Texture.from("sandbags.png"))
            }
            let e = Math.round(P.x / 50);
            this.gameModel.isBossStage(this.gameModel.level) && (e = Math.round(1.5 * e));
            let t = 0;
            for (; e > 0;) {
                let s, i = !1,
                    r = 1e3;
                const n = 8,
                    o = 2;
                for (; !i && r > 0;) r--, s = {
                    x: n + Math.random() * (P.x - 2 * n),
                    y: n + Math.random() * (P.y - 2 * n),
                    width: o,
                    height: o
                }, i = this.isValidTreePosition(s);
                if (i) {
                    let e = .4 + .6 * Math.random();
                    this.gameModel.constructions.graveyard && (e = Math.min((this.fastDistance(s.x, s.y, this.graveYardLocation.x, this.graveYardLocation.y) - 90) / 400, 1));
                    let i, r = this.treeTextures[this.treeTextures.length - 1 - Math.round((this.treeTextures.length - 1) * e)];
                    this.gameModel.isBossStage(this.gameModel.level) && Math.random() > .7 && (r = a(this.armyTextures, Math.random())), this.treeSprites.length > t ? (i = this.treeSprites[t], i.texture = r, i.visible = !0) : (i = new PIXI.Sprite(r), this.treeSprites.push(i), g.addChild(i)), t++, i.anchor.set(.5, 1), i.x = s.x, i.y = s.y, i.zIndex = i.y, i.scale.x = i.scale.y = 2, i.scale.x = Math.random() > .5 ? i.scale.x : -1 * i.scale.x
                }
                e--
            }
        }
    }
    class te {
        constructor() {
            this.x = !1, this.y = !1, this.validX = 0, this.validY = 0
        }
    }
    class se {
        constructor() {
            if (this.storm = !1, this.gameModel = ne.getInstance(), this.costs = {
                blood: "blood",
                parts: "parts"
            }, this.generatorsApplied = [], this.generators = [new ie(1, "Simple Machine", this.costs.blood, 1e6, 1.08, 1, 2, "A simple device that produces 1 part every 2 seconds"), new ie(2, "Part Duplicator", this.costs.parts, 100, 1.09, 4, 3, "A more advanced device that produces 4 parts every 3 seconds"), new ie(3, "Stamp Press", this.costs.parts, 1e3, 1.1, 16, 5, "An industrial press that produces 16 parts every 5 seconds"), new ie(4, "Conveyor", this.costs.parts, 1e4, 1.11, 64, 8, "A fantastic new invention that produces 64 parts every 8 seconds"), new ie(5, "Splitter Combiner", this.costs.parts, 1e5, 1.12, 192, 10, "A wondrous machine that produces 192 parts every 10 seconds"), new ie(6, "Batch Converter", this.costs.parts, 5e5, 1.13, 512, 12, "An astounding contraption that produces 512 parts every 12 seconds")], se.instance) return se.instance;
            se.instance = this
        }
        factoryStats() {
            let e = 0,
                t = 0;
            for (let s = 0; s < this.generatorsApplied.length; s++) e += this.generatorsApplied[s].rank, t += this.generatorsApplied[s].total / this.generatorsApplied[s].time;
            return {
                machines: e,
                partsPerSec: (this.storm ? 2 : 1) * t * this.gameModel.partsPCMod
            }
        }
        update(e) {
            for (let t = 0; t < this.generatorsApplied.length; t++) this.generatorsApplied[t].timeLeft -= e, this.generatorsApplied[t].timeLeft <= 0 && (this.generatorsApplied[t].timeLeft = this.generatorsApplied[t].time, this.gameModel.persistentData.parts += this.generatorsApplied[t].total * this.gameModel.partsPCMod * (this.storm ? 2 : 1))
        }
        updateLongTime(e) {
            let t = 0;
            for (let s = 0; s < this.generatorsApplied.length; s++) t += this.generatorsApplied[s].total * (e / this.generatorsApplied[s].time);
            return t * this.gameModel.partsPCMod
        }
        currentRank(e) {
            for (let t = 0; t < this.gameModel.persistentData.generators.length; t++) {
                const s = this.gameModel.persistentData.generators[t];
                if (e.id == s.id) return s.rank
            }
            return 0
        }
        purchasePrice(e) {
            return Math.round(e.basePrice * Math.pow(e.multi, this.currentRank(e)))
        }
        upgradeMaxAffordable(e) {
            const t = this.currentRank(e);
            let s = 0;
            switch (e.costType) {
                case this.costs.blood:
                    s = h(e.basePrice, e.multi, t, this.gameModel.persistentData.blood);
                    break;
                case this.costs.parts:
                    s = h(e.basePrice, e.multi, t, this.gameModel.persistentData.parts)
            }
            return 0 != e.cap ? Math.min(s, e.cap - t) : s
        }
        upgradeMaxPrice(e, t) {
            return l(e.basePrice, e.multi, this.currentRank(e), t)
        }
        canAffordGenerator(e) {
            switch (e.costType) {
                case this.costs.blood:
                    return this.gameModel.persistentData.blood >= this.purchasePrice(e);
                case this.costs.parts:
                    return this.gameModel.persistentData.parts >= this.purchasePrice(e)
            }
            return !1
        }
        purchaseMaxGenerators(e) {
            const t = this.upgradeMaxAffordable(e);
            for (let s = 0; s < t; s++) this.purchaseGenerator(e, !1);
            this.gameModel.saveData()
        }
        purchaseGenerator(e, t = !0) {
            if (this.canAffordGenerator(e)) {
                switch (e.costType) {
                    case this.costs.blood:
                        this.gameModel.persistentData.blood -= this.purchasePrice(e);
                        break;
                    case this.costs.parts:
                        this.gameModel.persistentData.parts -= this.purchasePrice(e)
                }
                let s;
                for (let t = 0; t < this.gameModel.persistentData.generators.length; t++) e.id == this.gameModel.persistentData.generators[t].id && (s = this.gameModel.persistentData.generators[t], s.rank++);
                s || this.gameModel.persistentData.generators.push({
                    id: e.id,
                    rank: 1
                }), t && this.gameModel.saveData(), this.applyGenerators()
            }
        }
        applyGenerator(e, t) {
            let s = !1;
            for (let i = 0; i < this.generatorsApplied.length; i++) this.generatorsApplied[i].id == e.id && (s = !0, this.generatorsApplied[i].rank = t, this.generatorsApplied[i].total = this.generatorsApplied[i].produces * this.generatorsApplied[i].rank);
            s || this.generatorsApplied.push({
                id: e.id,
                produces: e.produces,
                total: e.produces * t,
                rank: t,
                time: e.time,
                timeLeft: e.time
            })
        }
        applyGenerators() {
            for (let e = 0; e < this.generators.length; e++) {
                const t = this.currentRank(this.generators[e]);
                t > 0 && this.applyGenerator(this.generators[e], t)
            }
        }
    }
    class ie {
        constructor(e, t, s, i, a, r, n, o) {
            this.id = e, this.name = t, this.costType = s, this.basePrice = i, this.multi = a, this.produces = r, this.time = n, this.description = o, this.cap = 0
        }
    }
    class ae {
        constructor() {
            if (this.gameModel = ne.getInstance(), this.spawnedSavedCreatures = !1, this.types = {
                earthGolem: 1,
                airGolem: 2,
                fireGolem: 3,
                waterGolem: 4
            }, this.creatures = [new re(1, this.types.earthGolem, "Earth Golem", 3e3, 75, 30, 800, "A golem born from rocks and mud, able to take a lot of punishment and taunt enemies to attack it"), new re(2, this.types.airGolem, "Air Golem", 1200, 110, 45, 900, "A fast moving golem able to cover large distances and chase targets down"), new re(3, this.types.fireGolem, "Fire Golem", 1200, 130, 32, 1e3, "A fireball spewing golem that ignites everything it touches"), new re(4, this.types.waterGolem, "Water Golem", 1500, 90, 30, 1100, "A calming golem that restores health to nearby units")], this.creatureScaling = 1.75, this.creatureCostScaling = 1.9, this.creatureCostReduction = 1, ae.instance) return ae.instance;
            ae.instance = this
        }
        update(e) {
            const t = (new Ue).creatureCount;
            for (let s = 0; s < this.creatures.length; s++) this.creatures[s].building ? (this.creatures[s].timeLeft -= e, this.creatures[s].timeLeft < 0 && (this.spawnCreature(this.creatures[s]), this.creatures[s].building = !1)) : void 0 !== t[this.creatures[s].type] && t[this.creatures[s].type] < this.creatures[s].autobuild && this.startBuilding(this.creatures[s]), this.gameModel.persistentData.creatureLevels[this.creatures[s].id] && (this.creatures[s].level = this.gameModel.persistentData.creatureLevels[this.creatures[s].id])
        }
        refundParts(e, t) {
            this.gameModel.persistentData.parts += e.price * t
        }
        purchasePrice(e) {
            return e.baseCost * Math.pow(this.creatureCostScaling, e.level - 1) * this.creatureCostReduction
        }
        levelPrice(e) {
            return e.baseCost * Math.pow(this.creatureCostScaling, e.level) * 5 * this.creatureCostReduction
        }
        levelCreature(e) {
            this.levelPrice(e) < this.gameModel.persistentData.parts && (this.gameModel.persistentData.parts -= this.levelPrice(e), e.level++, this.gameModel.persistentData.creatureLevels[e.id] = e.level)
        }
        canAffordCreature(e) {
            return this.purchasePrice(e) < this.gameModel.persistentData.parts
        }
        creaturesBuildingCount() {
            let e = 0;
            for (let t = 0; t < this.creatures.length; t++) this.creatures[t].building && e++;
            return e
        }
        startBuilding(e) {
            e.building || this.canAffordCreature(e) && (this.creaturesBuildingCount() + this.gameModel.creatureCount >= this.gameModel.creatureLimit || (e.building = !0, e.timeLeft = e.time, this.gameModel.persistentData.parts -= this.purchasePrice(e)))
        }
        creatureAutoBuildNumber(e, t) {
            e.autobuild + t >= 0 && (e.autobuild += t, this.gameModel.persistentData.creatureAutobuild[e.id] = e.autobuild)
        }
        updateAutoBuild() {
            for (let e = 0; e < this.creatures.length; e++) this.creatures[e].autobuild = this.gameModel.persistentData.creatureAutobuild[this.creatures[e].id] || 0
        }
        resetLevels() {
            for (let e = 0; e < this.creatures.length; e++) this.creatures[e].level = 1
        }
        spawnCreature(e) {
            const t = new Ue,
                s = e.baseHealth * Math.pow(this.creatureScaling, e.level - 1) * this.gameModel.golemHealthPCMod,
                i = e.baseDamage * Math.pow(this.creatureScaling, e.level - 1) * this.gameModel.golemDamagePCMod;
            t.spawnCreature(s, i, e.speed, e.type, e.level, this.purchasePrice(e))
        }
        spawnSavedCreatures() {
            if (!this.spawnedSavedCreatures) {
                let e = 0;
                for (let t = 0; t < this.gameModel.persistentData.savedCreatures.length; t++)
                    if (e++, e <= this.gameModel.creatureLimit) {
                        const e = this.gameModel.persistentData.savedCreatures[t],
                            s = this.creatures.filter((t => t.type == e.t))[0];
                        s.level = e.l, this.spawnCreature(s)
                    } this.spawnedSavedCreatures = !0
            }
        }
        creatureStats(e) {
            return {
                thisLevel: {
                    level: e.level,
                    health: e.baseHealth * Math.pow(this.creatureScaling, e.level - 1) * this.gameModel.golemHealthPCMod,
                    damage: e.baseDamage * Math.pow(this.creatureScaling, e.level - 1) * this.gameModel.golemDamagePCMod,
                    cost: e.baseCost * Math.pow(this.creatureCostScaling, e.level - 1)
                },
                nextLevel: {
                    level: e.level + 1,
                    health: e.baseHealth * Math.pow(this.creatureScaling, e.level) * this.gameModel.golemHealthPCMod,
                    damage: e.baseDamage * Math.pow(this.creatureScaling, e.level) * this.gameModel.golemDamagePCMod,
                    cost: e.baseCost * Math.pow(this.creatureCostScaling, e.level)
                }
            }
        }
    }
    class re {
        constructor(e, t, s, i, a, r, n, o) {
            this.id = e, this.type = t, this.name = s, this.baseHealth = i, this.baseDamage = a, this.speed = r, this.baseCost = n, this.description = o, this.time = 3, this.building = !1, this.timeLeft = 10, this.autobuild = 0, this.level = 1
        }
    }
    class ne {
        constructor() {
            this.storageName = "ZombieData",
                this.kongregate = null,
                this.playFabId = null,
                this.titleId = "772D8",
                this.hidden = !1,
                this.autoShatter = !1,
                this.energy = 0,
                this.energyMax = 10,
                this.energyRate = 1,
                this.brainsRate = 0,
                this.bonesRate = 0,
                this.endLevelBones = 0,
                this.energySpellMultiplier = 1,
                this.prestigePointsEarned = 0,
                this.zombieCost = 10,
                this.bonesPCMod = 1,
                this.partsPCMod = 1,
                this.bloodMax = 1e3,
                this.bloodPCMod = 1,
                this.bloodStorePCMod = 1,
                this.brainsMax = 50,
                this.brainsPCMod = 1,
                this.brainsStorePCMod = 1,
                this.zombieHealth = 100,
                this.zombieHealthPCMod = 1,
                this.HshellHealthPCMod = 1,
                this.CyroVatPCMod = 1,
                this.PlagueVatPCMod = 1,
                this.CloningRep1PCMod = 1,
                this.BloodSynPCMod = 1,
                this.SynBonePCMod = 1,
                this.SmolPartsPCMod = 1,
                this.AvionicsPCMod = 1,
                this.ShockPCMod = 1,
                this.EnergyCostMod = 0,
                this.zombieDamage = 10,
                this.zombieDamagePCMod = 1,
                this.HstrengthDmgPCMod = 1,
                this.zombieSpeed = 10,
                this.zombieCages = 0,
                this.zombiesInCages = 0,
                this.golemDamagePCMod = 1,
                this.golemHealthPCMod = 1,
                this.plagueDamageMod = 0,
                this.plagueticks = 2,
                this.graveyardHealthMod = 1,
                this.burningSpeedMod = 1,
                this.startingResources = 0,
                this.blastHealing = 0,
                this.plagueDmgReduction = 0,
                this.brainRecoverChance = 0,
                this.riseFromTheDeadChance = 0,
                this.infectedBiteChance = 0,
                this.infectedBlastChance = 0,
                this.spitDistance = 0,
                this.spikeDelay = 5,
                this.startTimer = 0,
                this.fenceRadius = 50,
                this.constructions = {},
                this.construction = 0,
                this.boneCollectorCapacity = 10,
                this.frameRate = 0,
                this.humanCount = 50,
                this.zombieCount = 0,
                this.creatureCount = 0,
                this.creatureLimit = 1,
                this.harpySpeed = 75,
                this.tankBuster = !1,
                this.harpyBombs = 1,
                this.stats = null,
                this.runicSyphon = {
                    percentage: 0,
                    blood: 0,
                    bones: 0,
                    brains: 0
                }, this.gigazombies = !1, this.endLevelTimer = (3), this.endLevelDelay = (3), this.messageQueue = [], this.offlineMessage = "", this.runeEffects = {
                    attackSpeed: 1,
                    critChance: 0,
                    critDamage: 0,
                    damageReduction: 1,
                    healthRegen: 0,
                    damageReflection: 0
                }, this.encodedContent = "", this.savefilename = "", this.autoUpgrades = !1, this.autoconstruction = !1, this.autoconstructionUnlocked = !1, this.levelResourcesAdded = !1, this.bulletproofChance = 0, this.gameSpeed = 1, this.level = 1, this.currentState = "startGame", this.states = {
                    playingLevel: "playingLevel",
                    levelCompleted: "levelCompleted",
                    startGame: "startGame",
                    prestiged: "prestiged",
                    failed: "failed"
                }, this.baseStats = {
                    energyRate: 1,
                    brainsRate: 0,
                    bonesRate: 0,
                    energyMax: 10,
                    bloodMax: 1e3,
                    brainsMax: 50,
                    zombieCost: 10,
                    zombieHealth: 100,
                    zombieDamage: 10,
                    zombieSpeed: 10,
                    level: 1,
                    graveyard: 0,
                    construction: 0,
                    boneCollectorCapacity: 10
                }, this.zoom = A, this.centerGameContainer = Z, this.lastSave = 0, this.lastPlayFabSave = Date.now() - 15e3, this.persistentData = {
                    saveCreated: Date.now(),
                    dateOfSave: Date.now(),
                    autoStart: !1,
                    autoStartWait: !0,
                    autoSellGear: !1,
                    autoSellGearLegendary: !1,
                    levelUnlocked: 1,
                    allTimeHighestLevel: 0,
                    blood: 0,
                    brains: 0,
                    bones: 0,
                    parts: 0,
                    bonesTotal: 0,
                    upgrades: [],
                    constructions: [],
                    prestigePointsEarned: 0,
                    prestigePointsToSpend: 0,
                    boneCollectors: 0,
                    graveyardZombies: 1,
                    harpies: 0,
                    resolution: 1,
                    zoomButtons: !1,
                    particles: !0,
                    generators: [],
                    currentConstruction: null,
                    creatureLevels: [],
                    creatures: [],
                    creatureAutobuild: [],
                    savedCreatures: [],
                    levelsCompleted: [],
                    showfps: !1,
                    runeshatter: 0,
                    runes: {
                        life: {
                            blood: 0,
                            brains: 0,
                            bones: 0
                        },
                        death: {
                            blood: 0,
                            brains: 0,
                            bones: 0
                        }
                    },
                    trophies: [],
                    vipEscaped: [],
                    autoRelease: !1,
                    skeleton: null,
                    skeletonTalents: []
                }
        }
        static getInstance() {
            return ne.instance || (ne.instance = new ne, ne.instance.particles = new Qe, ne.instance.trophies = new de, ne.instance.bones = new tt, ne.instance.creatureFactory = new ae, ne.instance.creatures = new Ue, ne.instance.boneCollectors = new Ve, ne.instance.graveyard = new Oe, ne.instance.spells = new q, ne.instance.partFactory = new se, ne.instance.skeleton = new Xe, ne.instance.upgrades = new oe, ne.instance.zombies = new Ae, ne.instance.humans = new Se, ne.instance.police = new ke, ne.instance.army = new Te), ne.instance
        }
        resetToBaseStats() {
            this.energyRate = this.baseStats.energyRate,
                this.brainsRate = this.baseStats.brainsRate,
                this.bonesRate = this.baseStats.bonesRate,
                this.energyMax = this.baseStats.energyMax,
                this.bloodMax = this.baseStats.bloodMax,
                this.brainsMax = this.baseStats.brainsMax,
                this.zombieHealth = this.baseStats.zombieHealth,
                this.zombieDamage = this.baseStats.zombieDamage,
                this.zombieSpeed = this.baseStats.zombieSpeed,
                this.zombieCost = this.baseStats.zombieCost,
                this.zombieCages = 0,
                this.brainRecoverChance = 0,
                this.riseFromTheDeadChance = 0,
                this.infectedBiteChance = 0,
                this.infectedBlastChance = 0,
                this.construction = this.baseStats.construction,
                this.constructions = {},
                this.boneCollectorCapacity = this.baseStats.boneCollectorCapacity,
                this.bonesPCMod = 1,
                this.partsPCMod = 1,
                this.bloodPCMod = 1,
                this.bloodStorePCMod = 1,
                this.brainsPCMod = 1,
                this.brainsStorePCMod = 1,
                this.zombieHealthPCMod = 1,
                this.zombieDamagePCMod = 1,
                this.HshellHealthPCMod = 1,
                this.HstrengthDmgPCMod = 1,
                this.CyroVatPCMod = 1,
                this.PlagueVatPCMod = 1,
                this.CloningRep1PCMod = 1,
                this.BloodSynPCMod = 1,
                this.SynBonePCMod = 1,
                this.SmolPartsPCMod = 1,
                this.AvionicsPCMod = 1,
                this.ShockPCMod = 1,
                this.EnergyCostMod = 0,
                this.golemHealthPCMod = 1,
                this.golemDamagePCMod = 1,
                this.prest_multPCMod = 1,
                this.plagueDamageMod = 0,
                this.plagueticks = 2,
                this.burningSpeedMod = 1,
                this.startingResources = 0,
                this.fenceRadius = 50,
                this.SkeleMoveMod = 0,
                this.spitDistance = 0,
                this.spikeDelay = 5,
                this.blastHealing = 0,
                this.plagueDmgReduction = 1,
                this.creatureLimit = 1,
                this.runicSyphon.percentage = 0,
                this.autoconstructionUnlocked = !1,
                this.autoUpgrades = !1,
                this.graveyardHealthMod = 1,
                this.bulletproofChance = 0,
                this.gigazombies = !1,
                this.harpySpeed = 75,
                this.tankBuster = !1,
                this.harpyBombs = 1
        }
        addEnergy(e) {
            this.energy += e, this.energy > this.energyMax && (this.energy = this.energyMax)
        }
        addBlood(e) {
            isNaN(this.persistentData.blood) && (this.persistentData.blood = 0), isNaN(e) || (this.persistentData.blood += e * this.bloodPCMod, this.persistentData.blood > this.bloodMax && (this.persistentData.blood = this.bloodMax, this.constructions.runesmith && this.runicSyphon.percentage > 0 && (this.runicSyphon.blood += e * this.bloodPCMod)), this.runicSyphon.percentage > 0 && (this.runicSyphon.blood += e * this.bloodPCMod * this.runicSyphon.percentage))
        }
        addBrains(e) {
            isNaN(this.persistentData.brains) && (this.persistentData.brains = 0), isNaN(e) || (this.persistentData.brains += e * this.brainsPCMod, this.persistentData.brains > this.brainsMax && (this.persistentData.brains = this.brainsMax, this.constructions.runesmith && this.runicSyphon.percentage > 0 && (this.runicSyphon.brains += e * this.brainsPCMod)), this.runicSyphon.percentage > 0 && (this.runicSyphon.brains += e * this.brainsPCMod * this.runicSyphon.percentage))
        }
        addBones(e) {
            isNaN(this.persistentData.bones) && (this.persistentData.bones = 0), isNaN(e) || (this.persistentData.bones += e * this.bonesPCMod, this.persistentData.bonesTotal += e * this.bonesPCMod, this.runicSyphon.percentage > 0 && (this.runicSyphon.bones += e * this.bonesPCMod * this.runicSyphon.percentage))
        }
        getHumanCount() {
            return this.humanCount
        }
        getEnergyRate() {
            return this.energySpellMultiplier * this.energyRate - (this.persistentData.boneCollectors + this.persistentData.harpies)
        }
        update(e, t) {
            if (this.currentState != this.states.levelCompleted) {
                this.startTimer = 2
            }
            if (this.persistentData.autoStartWait == !1 && this.currentState != this.states.levelCompleted) {
                this.startTimer = 0
            }
            this.spells.updateSpells(e), e *= this.gameSpeed, this.hidden && U(e, this.app), this.partFactory.update(e), this.autoRemoveCollectorsHarpies(), this.addEnergy(this.getEnergyRate() * e), this.currentState == this.states.playingLevel && (this.addBones(this.bonesRate * e), this.addBrains(this.brainsRate * e), this.upgrades.updateRunicSyphon(this.runicSyphon), this.lastSave + 3e4 < t && (this.saveData(), this.lastSave = t), this.lastPlayFabSave + 12e5 < t && this.saveToPlayFab(), this.getHumanCount() <= 0 && (this.endLevelTimer < 0 ? (this.isBossStage(this.level) && this.trophies.doesLevelHaveTrophy(this.level) && this.trophies.trophyAquired(this.level), this.prestigePointsEarned = this.prestigePointsForLevel(this.level), this.currentState = this.states.levelCompleted, this.levelResourcesAdded = !1, this.calculateEndLevelBones(), this.calculateEndLevelZombieCages(), this.persistentData.levelsCompleted.includes(this.level) || (this.addPrestigePoints(this.prestigePointsForLevel(this.level)), this.persistentData.levelsCompleted.push(this.level)), this.persistentData.levelUnlocked = this.level + 1, (!this.persistentData.allTimeHighestLevel || this.level > this.persistentData.allTimeHighestLevel) && (this.persistentData.allTimeHighestLevel = this.level, window.kongregate && window.kongregate.stats.submit("level", this.persistentData.allTimeHighestLevel))) : this.endLevelTimer -= e), this.upgrades.updateConstruction(e), this.upgrades.updateAutoUpgrades(), this.creatureFactory.update(e)), this.currentState == this.states.levelCompleted && (this.startTimer -= e); this.startTimer < 0 && this.persistentData.autoStart && this.startLevel(this.level); this.currentState == this.states.levelCompleted && (this.startTimer < 0 && this.nextLevel()), this.currentState == this.states.failed && (this.startTimer -= e, this.startTimer < 0 && this.persistentData.autoStart && this.startLevel(this.level)), this.currentState == this.states.failed && (this.startTimer -= e, this.startTimer < 0 && this.startLevel(this.level - 1)), this.updateStats()
        }
        calculateEndLevelBones() {
            this.endLevelBones = 0, this.persistentData.boneCollectors > 0 && this.bones.uncollected && (this.endLevelBones = this.bones.uncollected.map((e => e.value)).reduce(((e, t) => e + t), 0), this.addBones(this.endLevelBones))
        }
        calculateEndLevelZombieCages() {
            this.zombieCages > 0 && (this.zombiesInCages += this.zombieCount, this.zombiesInCages > this.zombieCages && (this.zombiesInCages = this.zombieCages))
        }
        autoRemoveCollectorsHarpies() {
            if (this.getEnergyRate() < 0) {
                const e = this.getEnergyRate();
                this.persistentData.harpies > 0 && (this.persistentData.harpies -= Math.ceil(Math.abs(e)), this.persistentData.harpies < 0 && (this.persistentData.harpies = 0)), this.getEnergyRate() < 0 && this.persistentData.boneCollectors > 0 && this.persistentData.boneCollectors--
            }
        }
        releaseCagedZombies() {
            if (this.currentState == this.states.playingLevel) {
                for (let e = 0; e < this.zombiesInCages; e++) this.zombies.createZombie(this.graveyard.sprite.x, this.graveyard.sprite.y);
                this.zombiesInCages = 0
            }
        }
        sacrificeCagedZombies() {
            this.addBlood(this.cagedZombieSacrificeValue().blood), this.addBrains(this.cagedZombieSacrificeValue().brains), this.addBones(this.cagedZombieSacrificeValue().bones), this.zombiesInCages = 0
        }
        cagedZombieSacrificeValue() {
            return {
                blood: this.zombiesInCages * this.zombieHealth * .5,
                brains: this.zombiesInCages,
                bones: 3 * this.zombiesInCages
            }
        }
        startLevel(e) {
            this.level = e, this.startGame()
        }
        startGame() {
            this.currentState = this.states.playingLevel, this.setupLevel(), this.updatePlayingLevel(), this.persistentData.autoRelease && this.releaseCagedZombies()
        }
        nextLevel() {
            this.level++, this.currentState = this.states.playingLevel, this.setupLevel(), this.updatePlayingLevel(), this.persistentData.autoRelease && this.releaseCagedZombies()
        }
        setupLevel() {
            this.endLevelTimer = this.endLevelDelay, N(), this.particles.initialize(), this.humans.populate(), this.zombies.populate(), this.graveyard.initialize(), setTimeout(Z, 10), this.upgrades.applyUpgrades(), this.upgrades.updateRuneEffects(), this.partFactory.applyGenerators(), this.creatures.populate(), this.skeleton.populate(), this.addStartLevelResources(), this.populateStats()
        }
        populateStats() {
            this.stats = {
                skeleton: {
                    show: this.skeleton.persistent.skeletons > 0,
                    health: 10 * this.zombieHealth,
                    damage: 10 * this.zombieDamage,
                    speed: this.skeleton.moveSpeed
                },
                zombie: {
                    health: this.zombieHealth,
                    damage: this.zombieDamage,
                    speed: this.zombieSpeed
                },
                human: {
                    health: this.humans.getMaxHealth(this.level),
                    damage: this.humans.attackDamage,
                    speed: this.humans.maxRunSpeed
                },
                police: {
                    show: this.police.getMaxPolice() > 0,
                    health: this.police.getMaxHealth(),
                    damage: this.police.attackDamage,
                    speed: this.police.maxRunSpeed
                },
                army: {
                    show: this.army.getMaxArmy() > 0,
                    health: this.army.getMaxHealth(),
                    damage: this.army.attackDamage,
                    speed: this.army.maxRunSpeed
                }
            }
        }
        updateStats() {
            this.stats && (this.stats.zombie.health = this.zombieHealth, this.stats.zombie.damage = this.zombieDamage, this.stats.zombie.speed = this.zombieSpeed, this.stats.zombie.count = this.zombieCount, this.stats.skeleton.health = 10 * this.zombieHealth, this.stats.skeleton.damage = 10 * this.zombieDamage, this.stats.skeleton.speed = this.skeleton.moveSpeed)
        }
        vipEscaped() {
            this.persistentData.vipEscaped || (this.persistentData.vipEscaped = []), this.persistentData.vipEscaped.push(this.level), this.saveData()
        }
        updatePlayingLevel() {
            this.saveData()
        }
        addStartLevelResources() {
            this.energy = this.energyMax, this.levelResourcesAdded || (this.persistentData.blood += 500 * this.startingResources, this.persistentData.blood > this.bloodMax && (this.persistentData.blood = this.bloodMax), this.persistentData.brains += 50 * this.startingResources, this.persistentData.brains > this.brainsMax && (this.persistentData.brains = this.brainsMax), this.persistentData.bones += 200 * this.startingResources, this.persistentData.bonesTotal += 200 * this.startingResources, this.levelResourcesAdded = !0)
        }
        onReady() {
            this.upgrades.upgradeIdCheck()
        }
        addPrestigePoints(e) {
            void 0 === this.persistentData.prestigePointsEarned && (this.persistentData.prestigePointsEarned = 0, this.persistentData.prestigePointsToSpend = 0), this.persistentData.prestigePointsEarned += e
        }
        prestige() {
            if (this.persistentData.prestigePointsEarned > 0) {
                this.persistentData.levelUnlocked = 1, this.persistentData.autoUpgrades = [], this.persistentData.blood = 0, this.persistentData.brains = 0, this.persistentData.bones = 0, this.persistentData.parts = 0, this.persistentData.generators = [], this.persistentData.bonesTotal = 0, this.persistentData.upgrades = this.persistentData.upgrades.filter((e => e.costType == this.upgrades.costs.prestigePoints)), this.persistentData.constructions = [], this.persistentData.boneCollectors = 0, this.persistentData.currentConstruction = !1, this.persistentData.harpies = 0, this.persistentData.graveyardZombies = 1, this.persistentData.prestigePointsToSpend += this.persistentData.prestigePointsEarned, this.persistentData.prestigePointsEarned = 0, this.persistentData.runes = { life: { blood: 0, brains: 0, bones: 0 }, death: { blood: 0, brains: 0, bones: 0 } }, this.persistentData.vipEscaped = [], this.persistentData.creatureLevels = [], this.persistentData.creatureAutobuild = [], this.persistentData.levelsCompleted = [], this.persistentData.runeshatter = 0, this.zombiesInCages = 0, this.autoconstruction = !1, this.levelResourcesAdded = !1, this.gigazombies = !1, this.runeEffects = {
                    attackSpeed: 1,
                    critChance: 0,
                    critDamage: 0,
                    damageReduction: 1,
                    healthRegen: 0,
                    damageReflection: 0
                }, this.boneCollectors.update(.1), this.partFactory.generatorsApplied = [], this.creatureFactory.updateAutoBuild(), this.creatureFactory.resetLevels(), this.level = 1, this.currentState = this.states.prestiged, this.skeleton.persistent.talentReset = !0, this.setupLevel(), this.saveData();

            }
        }
        //o
        saveData() {
            this.persistentData.dateOfSave = Date.now();
            try {
                localStorage.setItem(this.storageName, JSON.stringify(this.persistentData)), localStorage.setItem(this.skeleton.storageName, JSON.stringify(this.skeleton.persistent)), localStorage.setItem(this.skeleton.talentsStorageName, JSON.stringify(this.skeleton.talents))
            } catch (e) {
                console.log(e)
            }
        }
        loadData() {
            try {
                null !== localStorage.getItem(this.storageName) && (this.persistentData = JSON.parse(localStorage.getItem(this.storageName)), this.level = this.persistentData.levelUnlocked, null !== localStorage.getItem(this.skeleton.storageName) ? (this.skeleton.persistent = JSON.parse(localStorage.getItem(this.skeleton.storageName)), !('gearSetEquipped' in this.skeleton.persistent) && (this.skeleton.persistent.gearSetEquipped = -1), !('gearSets' in this.skeleton.persistent) && (this.skeleton.persistent.gearSets = [])) : this.skeleton.persistent = {
                    xpRate: 0,
                    skeletons: 0,
                    level: 1,
                    xp: 0,
                    items: [],
                    gearSetEquipped: -1,
                    gearSets: [],
                    currItemId: 0,
                    talentReset: !1
                }, null !== localStorage.getItem(this.skeleton.talentsStorageName) ? this.skeleton.talents = JSON.parse(localStorage.getItem(this.skeleton.talentsStorageName)) : this.skeleton.talents = [], this.updatePersistentData(), this.calcOfflineProgress());
            } catch (e) {
                console.log(e)
            }
        }
        calcOfflineProgress() {
            if (this.upgrades.applyUpgrades(), this.upgrades.updateRuneEffects(), this.partFactory.applyGenerators(), this.constructions.partFactory) {
                const e = (Date.now() - this.persistentData.dateOfSave) / 1e3,
                    t = this.partFactory.updateLongTime(e);
                t > 0 && (this.offlineMessage = "Your factory has generated " + n(t) + " parts while you were away", this.persistentData.parts += t)
            }
        }
        resetData() {
            try {
                localStorage.removeItem(this.storageName), localStorage.removeItem(this.skeleton.storageName), localStorage.removeItem(this.skeleton.talentsStorageName), this.saveToPlayFab(!0)
            } catch (e) {
                console.log(e)
            }
        }
        updatePersistentData() {
            this.persistentData.constructions || (this.persistentData.constructions = []), this.persistentData.generators || (this.persistentData.generators = []), this.persistentData.parts || (this.persistentData.parts = 0), this.persistentData.creatureLevels || (this.persistentData.creatureLevels = []), this.persistentData.creatureAutobuild || (this.persistentData.creatureAutobuild = []), this.persistentData.savedCreatures || (this.persistentData.savedCreatures = []), this.persistentData.levelsCompleted || (this.persistentData.levelsCompleted = []), this.persistentData.saveCreated || (this.persistentData.saveCreated = Date.now()), void 0 === this.persistentData.particles && (this.persistentData.particles = !0), this.persistentData.runeshatter || (this.persistentData.runeshatter = 0), this.creatureFactory.updateAutoBuild()
        }
        sendMessage(e) {
            this.messageQueue.includes(e) || this.messageQueue.push(e)
        }
        setResolution(e) {
            this.app && (this.app.renderer.resolution = e, this.app.renderer.rootRenderTarget && (this.app.renderer.rootRenderTarget.resolution = e), this.app.renderer.plugins.interaction.resolution = e, this.app.renderer.resize(document.body.clientWidth, document.body.clientHeight))
        }
        downloadSaveGame() {
            this.persistentData.skeleton = this.skeleton.persistent, this.persistentData.skeletonTalents = this.skeleton.talents, this.blob = new Blob([LZString.compressToEncodedURIComponent(JSON.stringify(this.persistentData))], {
                type: "octet/stream"
            }), delete this.persistentData.skeleton, this.encodedContent = window.URL.createObjectURL(this.blob);
            const e = (new Date).toISOString().replace(/:|T|Z|\./g, "");
            this.savefilename = "incremancer-" + e + ".sav"
        }
        importFile() {
            const e = document.getElementById("import-file").files;
            if (e && 1 == e.length) {
                const t = e[0],
                    s = new FileReader,
                    i = ne.getInstance();
                s.onload = function (e) {
                    const t = JSON.parse(LZString.decompressFromEncodedURIComponent(e.target.result));
                    t.dateOfSave ? (t.skeleton && (i.skeleton.persistent = t.skeleton, delete t.skeleton, !('gearSetEquipped' in i.skeleton.persistent) && (i.skeleton.persistent.gearSetEquipped = -1), !('gearSets' in i.skeleton.persistent) && (i.skeleton.persistent.gearSets = [])), t.skeletonTalents ? (i.skeleton.talents = t.skeletonTalents, delete t.skeletonTalents) : i.skeleton.talents = [], i.persistentData = t, i.updatePersistentData(), i.saveToPlayFab(), i.level = i.persistentData.levelUnlocked, i.creatureFactory.spawnedSavedCreatures = !1, i.setupLevel()) : alert("Error loading save game")
                }, s.readAsText(t)
            }
        }
        toggleFullscreen() {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
            else {
                const e = document.body;
                e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.msRequestFullscreen && e.msRequestFullscreen()
            }
        }
        prestigePointsForLevel(e) {
            return this.persistentData.levelsCompleted.includes(e) ? 0 : e
        }
        bossCompleted(e) {
            const t = 50 * Math.floor((e - 1) / 50);
            return t < 50 || this.persistentData.levelsCompleted.includes(t)
        }
        levelLocked(e) {
            return e > this.persistentData.allTimeHighestLevel + 1 || !this.bossCompleted(e)
        }
        isBossStage(e) {
            return e > 0 && e % 50 == 0
        }
        levelInfo(e) {
            return {
                level: e,
                bossStage: this.isBossStage(e),
                completed: this.persistentData.levelsCompleted.includes(e),
                locked: this.levelLocked(e),
                trophy: this.trophies.doesLevelHaveTrophy(e)
            }
        }
        loginInUsingPlayFab() {
            if (window.kongregate) try {
                PlayFab.settings.titleId = this.titleId;
                const e = {
                    TitleId: PlayFab.settings.titleId,
                    AuthTicket: window.kongregate.services.getGameAuthToken(),
                    KongregateId: window.kongregate.services.getUserId(),
                    CreateAccount: !0
                },
                    t = this;
                PlayFabClientSDK.LoginWithKongregate(e, (function (e) {
                    e && e.data && e.data.PlayFabId && (t.playFabId = e.data.PlayFabId, t.loadFromPlayFab())
                }), (function (e) {
                    console.log(e)
                }))
            } catch (e) {
                console.error(e)
            }
        }
        saveToPlayFab(e = !1) {
            if (this.lastPlayFabSave = Date.now(), this.playFabId) {
                const t = this.persistentData.trophies;
                delete this.persistentData.trophies;
                const s = {
                    TitleId: this.titleId,
                    PlayFabId: this.playFabId,
                    Data: {
                        save: !e && LZString.compressToEncodedURIComponent(JSON.stringify(this.persistentData)),
                        trophies: !e && LZString.compressToEncodedURIComponent(JSON.stringify(t)),
                        skeleton: !e && LZString.compressToEncodedURIComponent(JSON.stringify(this.skeleton.persistent)),
                        talents: !e && LZString.compressToEncodedURIComponent(JSON.stringify(this.skeleton.talents))
                    }
                };
                this.persistentData.trophies = t;
                try {
                    const t = this;
                    PlayFab.ClientApi.UpdateUserData(s, (function (s) {
                        e ? (t.resetToBaseStats(), t.setupLevel(), window.location.reload()) : t.messageQueue.push("Game Saved to Cloud")
                    }), (function (e) {
                        console.log(e)
                    }))
                } catch (e) {
                    console.log(e)
                }
            } else e && (this.resetToBaseStats(), this.setupLevel(), window.location.reload())
        }
        loadFromPlayFab(e = !1) {
            if (this.playFabId) {
                const t = {
                    TitleId: this.titleId,
                    PlayFabId: this.playFabId,
                    Keys: ["save", "trophies", "skeleton", "talents"]
                };
                try {
                    const s = this;
                    PlayFab.ClientApi.GetUserData(t, (function (t) {
                        if (t.data.Data.save) {
                            const i = JSON.parse(LZString.decompressFromEncodedURIComponent(t.data.Data.save.Value));
                            (e || i.saveCreated < s.persistentData.saveCreated || i.saveCreated == s.persistentData.saveCreated && i.dateOfSave > s.persistentData.dateOfSave) && (s.persistentData = i, t.data.Data.trophies && (s.persistentData.trophies = JSON.parse(LZString.decompressFromEncodedURIComponent(t.data.Data.trophies.Value))), t.data.Data.skeleton && (s.skeleton.persistent = JSON.parse(LZString.decompressFromEncodedURIComponent(t.data.Data.skeleton.Value))), t.data.Data.talents ? s.skeleton.talents = JSON.parse(LZString.decompressFromEncodedURIComponent(t.data.Data.talents.Value)) : s.skeleton.talents = [], s.level = s.persistentData.levelUnlocked, s.updatePersistentData(), s.calcOfflineProgress(), s.setupLevel(), s.messageQueue.push("Game Loaded from Cloud"))
                        }
                    }), (function (e) {
                        console.log(e)
                    }))
                } catch (e) {
                    console.log(e)
                }
            }
        }
        allowPlayFabAction() {
            return this.lastPlayFabSave + 15e3 < Date.now()
        }
    }
    class oe {
        constructor() {
            if (this.gameModel = ne.getInstance(), this.spells = new q, this.skeleton = new Xe, this.partFactory = new se, this.types = {
                energyRate: "energyRate",
                energyCap: "energyCap",
                damage: "damage",
                health: "health",
                speed: "speed",
                brainsRate: "brainsRate",
                bonesRate: "bonesRate",
                bloodCap: "bloodCap",
                brainsCap: "brainsCap",
                brainRecoverChance: "brainRecoverChance",
                riseFromTheDeadChance: "riseFromTheDeadChance",
                boneCollectorCapacity: "boneCollectorCapacity",
                construction: "construction",
                infectedBite: "infectedBite",
                infectedBlast: "infectedBlast",
                plagueDamage: "plagueDamage",
                plagueTicks: "plagueTicks",
                burningSpeedPC: "burningSpeedPC",
                unlockSpell: "unlockSpell",
                spitDistance: "spitDistance",
                blastHealing: "blastHealing",
                plagueArmor: "plagueArmor",
                monsterLimit: "monsterLimit",
                runicSyphon: "runicSyphon",
                gigazombies: "gigazombies",
                bulletproof: "bulletproof",
                harpySpeed: "harpySpeed",
                tankBuster: "tankBuster",
                harpyBombs: "harpyBombs",
                spikeDelay: "spikeDelay",
                bloodGainPC: "bloodGainPC",
                bloodStoragePC: "bloodStoragePC",
                brainsGainPC: "brainsGainPC",
                brainsStoragePC: "brainsStoragePC",
                bonesGainPC: "bonesGainPC",
                partsGainPC: "partsGainPC",
                zombieDmgPC: "zombieDmgPC",
                zombieHealthPC: "zombieHealthPC",
                HstrengthDmgPC: "HstrengthDmgPC",
                HshellHealthPC: "HshellHealthPC",
                CyroVatPC: "CyroVatPC",
                PlagueVatPC: "PlagueVatPC",
                CloningRep1PC: "CloningRep1PC",
                BloodSynPC: "BloodSynPC",
                SynBonePC: "SynBonePC",
                SmolPartsPC: "SmolPartsPC",
                AvionicsPC: "AvionicsPC",
                SkeleMove: "SkeleMove",
                ShockPC: "ShockPC",
                EnergyCost: "EnergyCost",
                golemHealthPC: "golemHealthPC",
                golemDamagePC: "golemDamagePC",
                prest_multPC: "prest_multPC",
                startingPC: "startingPC",
                energyCost: "energyCost",
                autoconstruction: "autoconstruction",
                autoshop: "autoshop",
                graveyardHealth: "graveyardHealth",
                talentPoint: "talentPoint"
            }, this.costs = {
                energy: "energy",
                blood: "blood",
                brains: "brains",
                bones: "bones",
                prestigePoints: "prestigePoints",
                parts: "parts"
            }, this.constructionStates = {
                building: "building",
                paused: "paused",
                autoPaused: "autoPaused"
            }, this.constructionTickTimer = 1, this.angularModel = null, this.runeCalculations = [{
                rune: "death",
                effect: "attackSpeed",
                cost: "blood",
                logBase: 1.1,
                adjustment: -70,
                subtract: !1,
                cap: 0
            }, {
                rune: "death",
                effect: "critChance",
                cost: "brains",
                logBase: 1.3,
                adjustment: -20,
                cap: .8
            }, {
                rune: "death",
                effect: "critDamage",
                cost: "bones",
                logBase: 1.05,
                adjustment: -100,
                cap: 0
            }, {
                rune: "life",
                effect: "damageReduction",
                cost: "blood",
                logBase: 1.5,
                adjustment: -15,
                subtract: !0,
                cap: .8
            }, {
                rune: "life",
                effect: "healthRegen",
                cost: "brains",
                logBase: 2.9,
                adjustment: -5.5,
                cap: .5
            }, {
                rune: "life",
                effect: "damageReflection",
                cost: "bones",
                logBase: 1.24,
                adjustment: -30,
                cap: 1
            }], this.constructionTypes = {
                graveyard: "graveyard",
                crypt: "crypt",
                fort: "fort",
                fortress: "fortress",
                citadel: "citadel",
                fence: "fence",
                fenceSize: "fenceSize",
                plagueWorkshop: "plagueWorkshop",
                plagueLaboratory: "plagueLaboratory",
                plagueSpikes: "plagueSpikes",
                spellTower: "spellTower",
                runesmith: "runesmith",
                aviary: "aviary",
                zombieCage: "zombieCage",
                partFactory: "partFactory",
                monsterFactory: "monsterFactory",
                pit: "pit",
                harpy: "harpy",
                HybridLab: "HybridLab",
                AdvHybridLab: "AdvHybridLab",
                MiniAssembLine: "MiniAssembLine",
                TechThinkTank: "TechThinkTank"
            }, this.constructionUpgrades = [new he(201, "Cursed Graveyard", this.constructionTypes.graveyard, {
                blood: 1800
            }, 30, 1, 1, 1, null, "Construct a Cursed Graveyard in the town that will automatically spawn zombies when your energy is at its maximum!", "Graveyard menu now available!"),
            new he(205, "Crypt", this.constructionTypes.crypt, {
                blood: 21e3,
                bones: 2220
            }, 60, 1, 1, 1, 201, "Construct a Crypt in your graveyard. This will give you a nice dark and quiet place to think. The additional space will also allow you to store 50% more blood and brains!", null),
            new he(206, "Bone Fort", this.constructionTypes.fort, {
                blood: 6e4,
                bones: 6e3,
                energy: 60
            }, 60, 1, 1, 1, 205, "Turn your crypt into a fort. The additional space will also allow you to store 60% more blood and brains.", "New upgrades are available in the shop!"),
            new he(207, "Bone Fortress", this.constructionTypes.fortress, {
                blood: 1e5,
                bones: 9e3,
                energy: 90
            }, 60, 1, 1, 1, 206, "Turn your fort into a fortress. The additional space will also allow you to store 70% more blood and brains.", null),
            new he(211, "Bone Citadel", this.constructionTypes.citadel, {
                blood: 2e5,
                bones: 12e3,
                energy: 120
            }, 60, 1, 1, 1, 207, "Turn your fortress into a towering citadel that looms over the town. The additional space will also allow you to store 80% more blood and brains.", "New upgrades are available in the shop!"),
            new he(202, "Perimeter Fence", this.constructionTypes.fence, {
                bones: 880,
                energy: 22
            }, 44, 1, 1, 1, 201, "Build a protective fence around the graveyard that will reduce damage taken by zombies inside by 50%.", null),
            new he(203, "Bigger Fence", this.constructionTypes.fenceSize, {
                bones: 880,
                energy: 22
            }, 44, 1, 10, 5, 202, "Enlarge the fence so a greater area is protected.", null),
            new he(204, "Plague Workshop", this.constructionTypes.plagueWorkshop, {
                blood: 10200,
                brains: 600
            }, 60, 1, 1, 1, 205, "Build a laboratory to study the effects of plague. This will unlock new upgrades in the shop.", "Plague upgrades now available!"),
            new he(208, "Plague Spikes", this.constructionTypes.plagueSpikes, {
                brains: 3e3,
                bones: 1e3
            }, 30, 1, 1, 1, 204, "Booby trap the area around your graveyard with cruel spikes that infect trespassing humans with the plague.", null),
            new he(209, "Spell Tower", this.constructionTypes.spellTower, {
                brains: 3e3,
                blood: 3e4
            }, 30, 1, 1, 1, 206, "Dedicate one tower of your fort to the study of spellcraft. Perhaps you can learn some new spells?", "Spells now available in the shop!"),
            new he(210, "Runesmith", this.constructionTypes.runesmith, {
                bones: 3e3,
                blood: 12e4,
                brains: 1e3
            }, 30, 1, 1, 1, 207, "Build a runesmith's workshop in order to fortify your zombies with powerful runes.", null),
            new he(212, "Accursed Aviary", this.constructionTypes.aviary, {
                bones: 6e3,
                blood: 22e4,
                brains: 2e3
            }, 60, 1, 1, 1, 211, "Construct an aviary on top of your citadel so you can release wicked harpies to bomb the townspeople.", "Harpies available for hire in the graveyard menu"),
            new he(213, "Zombie Cage", this.constructionTypes.zombieCage, {
                bones: 600,
                blood: 900
            }, 30, 1, 5, 1, 201, "Build a cage to contain surplus zombies once a town is defeated.", null),
            new he(214, "Second Zombie Cage", this.constructionTypes.zombieCage, {
                bones: 1200,
                blood: 1800
            }, 30, 1, 10, 1, 205, "Build an additional cage to contain surplus zombies once a town is defeated.", null),
            new he(215, "Third Zombie Cage", this.constructionTypes.zombieCage, {
                bones: 1800,
                blood: 2700
            }, 30, 1, 10, 1, 206, "Build an additional cage to contain surplus zombies once a town is defeated.", null),
            new he(216, "Fourth Zombie Cage", this.constructionTypes.zombieCage, {
                bones: 2400,
                blood: 3600
            }, 30, 1, 10, 1, 207, "Build an additional cage to contain surplus zombies once a town is defeated.", null),
            new he(217, "Fifth Zombie Cage", this.constructionTypes.zombieCage, {
                bones: 3e3,
                blood: 4500
            }, 30, 1, 15, 1, 211, "Build an additional cage to contain surplus zombies once a town is defeated.", null),
            new he(218, "Plague Laboratory", this.constructionTypes.plagueLaboratory, {
                brains: 25e3,
                blood: 1e6
            }, 50, 1, 1, 1, 211, "Expand the plague workshop into a well equipped laboratory in order to unlock additional plague upgrades.", null),
            new he(219, "Part Factory", this.constructionTypes.partFactory, {
                brains: 35e3,
                blood: 15e6
            }, 50, 1, 1, 1, 218, "Build a factory to create parts that can be used to construct more powerful beings for your army.", "Factory menu now available!"),
            new he(220, "Creature Factory", this.constructionTypes.monsterFactory, {
                brains: 45e3,
                blood: 4e7
            }, 50, 1, 1, 1, 219, "Build a factory to turn creature parts into living entities of destruction", "Creatures now available in factory menu!"),
            new he(221, "Bottomless Pit", this.constructionTypes.pit, {
                bones: 75e3,
                parts: 5e6
            }, 50, 1, 1, 10, 219, "A bottomless pit with walls made from creature parts. Drastically increases your capacity to store blood and brains.", null),
            new he(222, "Harpy Outfitter", this.constructionTypes.harpy, {
                bones: 75e3,
                brains: 75e3,
                blood: 8e7
            }, 50, 1, 1, 1, 220, "Build an outfitter to upgrade the abilities of your harpies.", "Harpy upgrades now available in the shop!"),
            new he(301, "Hybrid Laboratory", this.constructionTypes.HybridLab, {
                bones: 75e6,
                parts: 9e12
            }, 240, 1, 1, 1, 222, "Build a new laboratory to unlock the potential of Zombie-Golem Hybrids.  Deep storage tanks for Blood and Brains are needed for research, doubling storage", "New upgrades are available in the shop!"),
            new he(302, "Advanced Hybrid Laboratory", this.constructionTypes.AdvHybridLab, {
                bones: 75e8,
                parts: 7e13
            }, 240, 1, 1, 1, 301, "Build an advanced laboratory to further unlock the secrets of Zombie-Golem Hybridization. Even deeper storage tanks for Blood and Brains are needed for research. Doubles storage", "New upgrades are available in the shop!"),
            new he(303, "Miniturized Assembly Lines", this.constructionTypes.MiniAssembLine, {
                bones: 75e10,
                parts: 4e16
            }, 240, 1, 1, 1, 302, "Build a new way to create everything faster!  How deep can these storage tanks go? Doubles storage.", "New upgrades are available in the shop!"),
            new he(304, "Technical Think Tank", this.constructionTypes.TechThinkTank, {
                bones: 75e12,
                parts: 1e18
            }, 240, 1, 1, 1, 303, "Using all these stored brains allows us to harness their raw computational power for even more innovations!  Storage tanks resting on bedrock is as far as we can go, doubling storage", "New upgrades are available in the shop!")
            ],

                this.upgrades = [new le(1, "Bloodthirst", this.types.damage, this.costs.blood, 50, 1.2, 1, 40, "Your zombies thirst for blood and do +1 damage for each rank of Bloodthirst.", null, null),
                new le(9, "Sharpened Teeth", this.types.damage, this.costs.blood, 3e3, 1.23, 3, 50, "Your zombies bites do +3 damage with each rank of Sharpened Teeth.", null, 206),
                new le(11, "Razor Claws", this.types.damage, this.costs.blood, 28e3, 1.25, 5, 0, "Your zombies attacks do +5 damage with each rank of Razor Claws.", null, 211),
                new le(16, "Killer Instinct", this.types.damage, this.costs.blood, 1e6, 1.27, 8, 0, "Your zombies attacks do +8 damage with each rank of Killer Instinct.", null, 220),
                new le(2, "Like Leather", this.types.health, this.costs.blood, 100, 1.2, 10, 40, "Your zombies gain tougher skin and +10 health with each rank.", null, null),
                new le(10, "Thick Skull", this.types.health, this.costs.blood, 5e3, 1.23, 25, 50, "Your zombies gain +25 health with each rank.", null, 206),
                new le(12, "Battle Hardened", this.types.health, this.costs.blood, 32e3, 1.25, 40, 0, "Your zombies gain +40 health with each rank of Battle Hardened.", null, 211),
                new le(17, "Tough as Nails", this.types.health, this.costs.blood, 1e6, 1.27, 100, 0, "Your zombies gain +100 health with each rank of Tough as Nails.", null, 220),
                new le(3, "Cold Storage", this.types.brainsCap, this.costs.blood, 150, 1.2, 50, 20, "Turns out you can use all of your spare blood to store brains and keep them fresh. Each rank increases your maximum brain capacity by 50.", null, null),
                new le(4, "Recycling is Cool", this.types.brainRecoverChance, this.costs.blood, 1e3, 1.2, .1, 10, "Why are we wasting so many good brains on this project? Each rank increases your chance to get a brain back from a dead zombie by 10%", null, null),
                new le(5, "Your Soul is Mine!", this.types.riseFromTheDeadChance, this.costs.blood, 1500, 1.4, .1, 10, "Using your most powerful blood magic you command the bodies of the dead to rise as your servants! Each rank grants 10% chance that dead humans will turn into zombies.", null, null),
                new le(6, "Infected Bite", this.types.infectedBite, this.costs.blood, 3500, 1.4, .1, 10, "Your zombies are now infected with plague and could infect their victims too. Each rank adds 10% chance to inflict damage over time when a zombie attacks a target.", null, 204),
                new le(7, "Detonate", this.types.unlockSpell, this.costs.blood, 25e3, 1, 3, 1, "Learn the Detonate spell which can explode all of your zombies into a cloud of plague. Not exactly sure how useful that will be.", "New spell learned, Detonate!", 209),
                new le(8, "Gigazombies?", this.types.unlockSpell, this.costs.blood, 5e4, 1, 5, 1, "Learn the Gigazombies spell which will turn some of your zombies into hulking monstrosities with increased health and damage.", "New spell learned, Gigazombies!", 209),
                new le(13, "Blazing Speed", this.types.burningSpeedPC, this.costs.blood, 3e4, 1.25, .05, 10, "The humans are using torches to set your zombies on fire. Perhaps we can turn the tables on them? Each rank increases the movement and attack speed of burning zombies by 5%", null, 207),
                new le(14, "Spit it Out", this.types.spitDistance, this.costs.blood, 5e5, 1.8, 5, 15, "The first rank gives your zombies the ability to spit plague at enemies beyond normal attack range. Spit attacks do 50% zombie damage and infect the victim with plague. Subsequent ranks will increase the range of spit attacks.", null, 218),
                new le(15, "Runic Syphon", this.types.runicSyphon, this.costs.blood, 34e3, 1.9, .01, 10, "Infuse your runes for free! Each rank gives your Runesmith the ability to infuse 1% of your resource income, without consuming it. Additionally when blood and brains reach their storage limit, any additional resources will be infused automatically.", null, 210),
                new le(19, "Faster Harpies", this.types.harpySpeed, this.costs.blood, 1e8, 1.07, 2, 20, "These harpies are way too slow! We have to make them faster. Each rank increases harpy speed by 2", null, 222),
                new le(20, "Energy Rush", this.types.energyRate, this.costs.brains, 20, 1.8, .5, 20, "Melting brains down in your cauldron to make smoothies can be beneficial for your health. It also increases your energy rate by 0.5 per second for each rank.", null, null),
                new le(21, "Master Summoner", this.types.energyCap, this.costs.brains, 10, 1.5, 5, 20, "All the brains you harvested have proved fruitful in your experiments. Each rank raises your maximum energy by 5.", null, null),
                new le(22, "Primal Reflexes", this.types.speed, this.costs.brains, 5, 1.6, 1, 20, "The zombies retain more of their human agility increasing run speed by 1 for each rank.", null, null),
                new le(23, "Blood Harvest", this.types.bloodStoragePC, this.costs.brains, 50, 1.12, .1, 0, "All this brain power has enabled you to devise some superior blood storage methods. Each rank increases your maximum blood by 10%.", null, null),
                new le(24, "Unholy Construction", this.types.construction, this.costs.brains, 25, 1, 1, 1, "Learn the art of Unholy Construction in order to build structures that will solidify your foothold on the town.", "Construction menu now available!", null),
                new le(25, "Infected Corpse", this.types.infectedBlast, this.costs.brains, 500, 1.4, .1, 10, "Fill your zombies with so much plague they are ready to explode! Each rank adds 10% chance for a zombie to explode into a cloud of plague upon death.", null, 204),
                new le(26, "Energy Charge", this.types.unlockSpell, this.costs.brains, 2e3, 1, 2, 1, "Learn the Energy Charge spell which can drastically increase your energy rate for a short time.", "New spell learned, Energy Charge!", 209),
                new le(27, "What Doesn't Kill You", this.types.blastHealing, this.costs.brains, 1e4, 1.3, .1, 20, "Plague explosions from zombies and harpies will also heal nearby zombies for 10% of the explosion damage with each rank.", null, 218),
                new le(28, "One is Never Enough", this.types.monsterLimit, this.costs.brains, 2e4, 1.2, 1, 15, "We're definitely going to need more than one golem to finish the job. Each rank increases your creature limit by 1", null, 220),
                new le(29, "Tank Buster", this.types.tankBuster, this.costs.brains, 4e5, 1.2, 1, 1, "Teach your harpies some new tricks. Once bought this upgrade will make your harpies drop fire bombs on tanks during boss stages.", null, 222),
                new le(30, "Improved Spikes", this.types.spikeDelay, this.costs.brains, 800, 1.2, 1, 4, "Each rank reduces the delay between plague spike activation by 20%", null, 208),
                new le(40, "Bone Throne", this.types.energyCap, this.costs.bones, 50, 1.55, 10, 15, "Sitting atop your throne of bones you can finally think clearly. Each rank increases maximum energy by 10.", null, null),
                new le(41, "Crown of Bones", this.types.energyRate, this.costs.bones, 200, 1.5, .2, 25, "Not just dapper, these spikes help channel your energy. Each rank increases energy rate by 0.2 per second.", null, null),
                new le(42, "Bonebarrows", this.types.boneCollectorCapacity, this.costs.bones, 300, 1.2, 5, 20, "Your bone collectors are struggling to carry all these bones. Maybe it's time we gave them an upgrade? Each rank increases their carrying capacity by 5.", null, null),
                new le(43, "Bone Reinforced Tanks", this.types.bloodCap, this.costs.bones, 500, 1.07, 2e3, 0, "Finally! Now that we have a solid construction material we can get to work building better storage for our other resources. Each rank increases blood storage by 2000.", null, null),
                new le(44, "Brain Cage", this.types.brainsCap, this.costs.bones, 650, 1.07, 500, 0, "There's nothing I love more than a mind enslaved. Now we can put these brains where they belong. In cages! Each rank increases brain storage by 500.", null, null),
                new le(45, "Earth Freeze", this.types.unlockSpell, this.costs.bones, 5e3, 1, 4, 1, "Learn the Earth Freeze spell which can freeze all humans in place for a short time.", "New spell learned, Earth Freeze!", 209),
                new le(46, "Plague Armor", this.types.plagueArmor, this.costs.bones, 15e3, 1.6, .02, 10, "The best defense is a good offense? True in the case of Plague Armor which reduces the damage done by infected humans by 2% per rank.", null, 218),
                new le(47, "Bulletproof", this.types.bulletproof, this.costs.bones, 6e4, 1.6, .05, 15, "Craft your earth golems from much harder stone. Each rank gives them 5% chance to reflect bullets back to their source.", null, 220),
                new le(48, "Bombs Away", this.types.harpyBombs, this.costs.bones, 5e5, 1.6, 1, 3, "Upgrade your harpies so they can carry more than just one bomb at a time.", null, 222),
                new le(60, "Extra Limbs", this.types.golemDamagePC, this.costs.parts, 900, 1.3, .02, 0, "Your golems gain +2% damage with each rank of Extra Limbs.", null, 220),
                new le(61, "Big Boned", this.types.golemHealthPC, this.costs.parts, 1e3, 1.31, .02, 0, "Your golems gain +2% health with each rank of Big Boned.", null, 220),
                new le(62, "Hybrid Strength", this.types.HstrengthDmgPC, this.costs.parts, 1e3, 1.3, .01, 0, "Animating Golem parts fused with zombie flesh creates a terrifyingly strong Hybrid. Your zombies gain +1% damage with each rank of Hybrid Strength.", null, 301),
                new le(63, "Hybrid Shell", this.types.HshellHealthPC, this.costs.parts, 1e3, 1.31, .01, 0, "Golem armor shell provides extra protection for your fleshy zombies. Your zombies gain +1% health with each rank of Hybrid Shell.", null, 301),
                new le(64, "Advanced Cyrogenic Vats", this.types.CyroVatPC, this.costs.parts, 1e3, 1.4, .1, 0, "Cooling these Brains further makes them last much longer. Your brain storage increases +10% with each rank of Advanced Cyrogenic Vats.", null, 302),
                new le(65, "Golem Part Plague Vats", this.types.PlagueVatPC, this.costs.brains, 1e3, 1.35, .01, 0, "Using specialized Golem Parts allows for advancements in plague research. Plague Damage increases +1% with each rank of Golem Part Plague Vats.", null, 302),
                new le(66, "Cloning Replicator", this.types.CloningRep1PC, this.costs.parts, 1e12, 1.26, .05, 0, "Mass produced Cloning Replicators allows for much greater use out of each Brain obtained. Brain Income increases +5% with each rank of Cloning Replicator.", null, 303),
                new le(67, "Blood Synthezizer", this.types.BloodSynPC, this.costs.parts, 2e12, 1.25, .05, 0, "Artificial Blood can augment what we already get allowing for more of everything. Blood Income increases +5% with each rank of Blood Synthesizer.", null, 303),
                new le(68, "Synthetic Bone Fabricator", this.types.SynBonePC, this.costs.parts, 3e12, 1.24, .05, 0, "Synthetic Bones made from Golem Parts?  Genius! Bone Income increases +5% with each rank of Synthetic Bone Fabricator.", null, 303),
                new le(69, "Insectoid Parts Assemblers", this.types.SmolPartsPC, this.costs.parts, 4e12, 1.23, .05, 0, "Insect sized and shaped assemblers are far more efficient at maufacturing Golem parts. Parts Income increases +5% with each rank of Insectoid Parts Assemblers.", null, 303),
                new le(70, "Golem Avionic", this.types.AvionicsPC, this.costs.parts, 2e17, 1.20, 2, 50, "Building on the success of hybrid zombies, small golem parts can enhance Harpy-Golem Hybrids. Harpy Speed +2 with each rank of Golem Avionics.", null, 304),
                new le(71, "Electro-Shock Collars", this.types.ShockPC, this.costs.parts, 3e14, 1.20, .0025, 0, "Using shock collars tuned to the Hybrid Zombie's nervous system causes them to attack at blinding speeds! Attack Speed +0.25% with each rank of Electro-Shock Collars.", null, 304),
                new le(72, "Power Regulators", this.types.EnergyCost, this.costs.parts, 1e18, 1.20, 1, 30, "Golem parts assembled around the graveyard can help regulate and attune necrotic power. Reduces zombie summoning cost by 1 with each rank of Power Regulators.", null, 304),
                new le(73, "Sephirin's Reputation", this.types.prest_multPC, this.costs.blood, 1e20, 1.25, .03, 0, "Astounding levels of blood sacrificed can enhance your reputation with dark entities in the Void. +3% Zombie Heatlh and Damage per rank", null, 304),
                new le(74, "Strider's Mathemagics", this.types.SkeleMove, this.costs.parts, 1e18, 6, 1, 10, "Using Archane Mathemagics you imbue your Skeleton Champion with golem based ligaments. +1 Movement Speed per rank.(In testing)", null, 304)],
                this.prestigeUpgrades = [new le(108, "A Small Investment", this.types.startingPC, this.costs.prestigePoints, 10, 1.25, 1, 0, "Each rank gives you an additional 500 blood, 50 brains, and 200 bones when starting a new level.", null, null),
                new le(109, "Time Warp", this.types.unlockSpell, this.costs.prestigePoints, 50, 1, 1, 1, "Unlock the Time Warp spell in order to speed up the flow of time.", null, null),
                new le(110, "Master of Death", this.types.energyCost, this.costs.prestigePoints, 1e3, 1, 1, 5, "Each rank reduces the energy cost of summoning a zombie by 1", null, null),
                new le(101, "Blood Storage", this.types.bloodStoragePC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% blood storage for each rank.", null, null),
                new le(102, "Blood Rate", this.types.bloodGainPC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% blood income rate for each rank.", null, null),
                new le(103, "Brain Storage", this.types.brainsStoragePC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% brain storage for each rank.", null, null),
                new le(104, "Brain Rate", this.types.brainsGainPC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% brain income rate for each rank.", null, null),
                new le(105, "Bone Rate", this.types.bonesGainPC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% bones income rate for each rank.", null, null),
                new le(111, "Parts Rate", this.types.partsGainPC, this.costs.prestigePoints, 10, 1.25, .2, 0, "Additional 20% creature parts income rate for each rank.", null, null),
                new le(112, "Auto Construction", this.types.autoconstruction, this.costs.prestigePoints, 250, 1, 1, 1, "Unlock the ability to automatically start construction of the cheapest available building option.", null, null),
                new le(114, "Auto Shop", this.types.autoshop, this.costs.prestigePoints, 250, 1, 1, 1, "Unlock the ability to automatically purchase items from the shop.", null, null),
                new le(113, "Graveyard Health", this.types.graveyardHealth, this.costs.prestigePoints, 10, 1.25, .1, 0, "Additional 10% graveyard health during boss levels with each rank.", null, null),
                new le(115, "Talent Point", this.types.talentPoint, this.costs.prestigePoints, 100, 1.175, 1, 0, "Additional skeleton talent point", null, null)], oe.instance) return oe.instance;

            oe.instance = this
        }
        hasRequirement(e) {
            return !e.requires || 0 != this.gameModel.persistentData.constructions.filter((t => t.id == e.requires)).length
        }
        getUpgrades(e) {
            switch (e) {
                case this.costs.blood:
                case this.costs.brains:
                case this.costs.bones:
                case this.costs.parts:
                    return this.upgrades.filter((t => t.costType == e && (0 == t.cap || this.currentRank(t) < t.cap) && this.hasRequirement(t)));
                case "completed":
                    return this.upgrades.filter((e => e.cap > 0 && this.currentRank(e) >= e.cap))
            }
        }
        applyUpgrades() {
            this.gameModel.resetToBaseStats(), this.spells.lockAllSpells();
            for (let e = 0; e < this.gameModel.persistentData.upgrades.length; e++) {
                let t = this.upgrades.filter((t => t.id == this.gameModel.persistentData.upgrades[e].id))[0];
                t || (t = this.prestigeUpgrades.filter((t => t.id == this.gameModel.persistentData.upgrades[e].id))[0]), t && this.applyUpgrade(t, this.gameModel.persistentData.upgrades[e].rank)
            }
            for (let e = 0; e < this.gameModel.persistentData.constructions.length; e++) this.applyConstructionUpgrade(this.gameModel.persistentData.constructions[e]);
            const e = (new de).getAquiredTrophyList();
            for (let t = 0; t < e.length; t++) this.applyUpgrade(e[t], e[t].rank);
            this.skeleton.applyUpgrades(),
                this.gameModel.bloodMax *= this.gameModel.bloodStorePCMod,
                this.gameModel.brainsMax *= this.gameModel.brainsStorePCMod,
                this.gameModel.zombieDamage *= this.gameModel.zombieDamagePCMod,
                this.gameModel.zombieHealth *= this.gameModel.zombieHealthPCMod,
                this.gameModel.persistentData.runeshatter && (this.gameModel.zombieDamage *= this.shatterEffect(), this.gameModel.zombieHealth *= this.shatterEffect(), this.gameModel.zombieCost += this.gameModel.persistentData.runeshatter)
        }
        applyUpgrade(e, t) {
            switch (e.type) {
                case this.types.energyRate:
                    return void (this.gameModel.energyRate += e.effect * t);
                case this.types.brainsRate:
                    return void (this.gameModel.brainsRate += e.effect * t);
                case this.types.bonesRate:
                    return void (this.gameModel.bonesRate += e.effect * t);
                case this.types.energyCap:
                    return void (this.gameModel.energyMax += e.effect * t);
                case this.types.bloodCap:
                    return void (this.gameModel.bloodMax += e.effect * t);
                case this.types.brainsCap:
                    return void (this.gameModel.brainsMax += e.effect * t);
                case this.types.damage:
                    return void (this.gameModel.zombieDamage += e.effect * t);
                case this.types.speed:
                    return void (this.gameModel.zombieSpeed += e.effect * t);
                case this.types.health:
                    return void (this.gameModel.zombieHealth += e.effect * t);
                case this.types.brainRecoverChance:
                    return void (this.gameModel.brainRecoverChance += e.effect * t);
                case this.types.riseFromTheDeadChance:
                    return void (this.gameModel.riseFromTheDeadChance += e.effect * t);
                case this.types.infectedBite:
                    return void (this.gameModel.infectedBiteChance += e.effect * t);
                case this.types.infectedBlast:
                    return void (this.gameModel.infectedBlastChance += e.effect * t);
                case this.types.plagueDamage:
                    return void (this.gameModel.plagueDamageMod += e.effect);
                case this.types.plagueTicks:
                    return void (this.gameModel.plagueticks += e.effect);
                case this.types.burningSpeedPC:
                    return void (this.gameModel.burningSpeedMod += e.effect * t);
                case this.types.construction:
                    return void (this.gameModel.construction = 1);
                case this.types.boneCollectorCapacity:
                    return void (this.gameModel.boneCollectorCapacity += e.effect * t);
                case this.types.unlockSpell:
                    return void this.spells.unlockSpell(e.effect);
                case this.types.spitDistance:
                    return void (this.gameModel.spitDistance = 30 + e.effect * t);
                case this.types.blastHealing:
                    return void (this.gameModel.blastHealing += e.effect * t);
                case this.types.plagueArmor:
                    return void (this.gameModel.plagueDmgReduction -= e.effect * t);
                case this.types.monsterLimit:
                    return void (this.gameModel.creatureLimit += e.effect * t);
                case this.types.runicSyphon:
                    return void (this.gameModel.runicSyphon.percentage += e.effect * t);
                case this.types.bulletproof:
                    return void (this.gameModel.bulletproofChance += e.effect * t);
                case this.types.harpySpeed:
                    return void (this.gameModel.harpySpeed += e.effect * t);
                case this.types.SkeleMove:
                    return void (this.gameModel.SkeleMoveMod += e.effect * t),
                        (this.skeleton.moveSpeed += e.effect * t);
                case this.types.tankBuster:
                    return void (this.gameModel.tankBuster = !0);
                case this.types.harpyBombs:
                    return void (this.gameModel.harpyBombs += e.effect * t);
                case this.types.spikeDelay:
                    return void (this.gameModel.spikeDelay -= e.effect * t);
                case this.types.bonesGainPC:
                    return void (this.gameModel.bonesPCMod *= e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.partsGainPC:
                    return void (this.gameModel.partsPCMod *= e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.bloodGainPC:
                    return void (this.gameModel.bloodPCMod *= e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.bloodStoragePC:
                    return void (this.gameModel.bloodStorePCMod *= e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.brainsGainPC:
                    return void (this.gameModel.brainsPCMod *= t > e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.brainsStoragePC:
                    return void (this.gameModel.brainsStorePCMod *= e.costType == this.costs.prestigePoints ? this.calculateWithPrestigeRankBonus(e, t) : Math.pow(1 + e.effect, t));
                case this.types.zombieDmgPC:
                    return void (this.gameModel.zombieDamagePCMod *= Math.pow(1 + e.effect, t));
                case this.types.zombieHealthPC:
                    return void (this.gameModel.zombieHealthPCMod *= Math.pow(1 + e.effect, t));
                case this.types.HstrengthDmgPC:
                    return void (this.gameModel.zombieDamagePCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.HstrengthDmgPCMod *= Math.pow(1 + e.effect, t));
                case this.types.HshellHealthPC:
                    return void (this.gameModel.zombieHealthPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.HshellHealthPCMod *= Math.pow(1 + e.effect, t));
                case this.types.CyroVatPC:
                    return void (this.gameModel.brainsMax *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.CyroVatPCMod *= Math.pow(1 + e.effect, t));
                case this.types.PlagueVatPC:
                    return void (this.gameModel.PlagueVatPCMod *= Math.pow(1 + e.effect, t));
                case this.types.CloningRep1PC:
                    return void (this.gameModel.brainsPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.CloningRep1PCMod *= Math.pow(1 + e.effect, t));
                case this.types.BloodSynPC:
                    return void (this.gameModel.bloodPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.BloodSynPCMod *= Math.pow(1 + e.effect, t));
                case this.types.SynBonePC:
                    return void (this.gameModel.bonesPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.SynBonePCMod *= Math.pow(1 + e.effect, t));
                case this.types.SmolPartsPC:
                    return void (this.gameModel.partsPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.SmolPartsPCMod *= Math.pow(1 + e.effect, t));
                case this.types.AvionicsPC:
                    return void (this.gameModel.harpySpeed += e.effect * t),
                        (this.gameModel.AvionicsPCMod += e.effect * t);

                case this.types.ShockPC:
                    return void (this.attackSpeed *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.ShockPCMod *= Math.pow(1 + e.effect, t));
                case this.types.EnergyCost:
                    return void (this.gameModel.zombieCost -= e.effect * t),
                        (this.gameModel.EnergyCostMod -= e.effect * t);
                case this.types.prest_multPC:
                    return void (this.gameModel.zombieDamagePCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.zombieHealthPCMod *= Math.pow(1 + e.effect, t)),
                        (this.gameModel.prest_multPCMod *= Math.pow(1 + e.effect, t));
                case this.types.golemDamagePC:
                    return void (this.gameModel.golemDamagePCMod *= Math.pow(1 + e.effect, t));
                case this.types.golemHealthPC:
                    return void (this.gameModel.golemHealthPCMod *= Math.pow(1 + e.effect, t));
                case this.types.startingPC:
                    return void (this.gameModel.startingResources += e.effect * t);
                case this.types.energyCost:
                    return void (this.gameModel.zombieCost -= e.effect * t);
                case this.types.autoconstruction:
                    return void (this.gameModel.autoconstructionUnlocked = !0);
                case this.types.autoshop:
                    return void (this.gameModel.autoUpgrades = !0);
                case this.types.graveyardHealth:
                    return void (this.gameModel.graveyardHealthMod *= Math.pow(1 + e.effect, t));
                case this.types.talentPoint:
                    return void (this.skeleton.talentPoints = t)
            }
        }
        calculateWithPrestigeRankBonus(e, t) {
            if (t <= 60) {
                return Math.pow(1 + e.effect, t);
            }

            let multiplier = Math.pow(1 + e.effect, 60);

            for (let i = 1; i <= t - 60; i++) {
                multiplier *= 1 + e.effect * Math.pow(1 + 0.05, i);
            }

            return multiplier;
        }
        applyConstructionUpgrade(e) {
            switch (e.type) {
                case this.constructionTypes.graveyard:
                    return void (this.gameModel.constructions.graveyard = 1);
                case this.constructionTypes.crypt:
                    return this.gameModel.constructions.crypt = 1, this.gameModel.brainsStorePCMod *= 1.5, void (this.gameModel.bloodStorePCMod *= 1.5);
                case this.constructionTypes.fort:
                    return this.gameModel.constructions.fort = 1, this.gameModel.brainsStorePCMod *= 1.6, void (this.gameModel.bloodStorePCMod *= 1.6);
                case this.constructionTypes.fortress:
                    return this.gameModel.constructions.fortress = 1, this.gameModel.brainsStorePCMod *= 1.7, void (this.gameModel.bloodStorePCMod *= 1.7);
                case this.constructionTypes.citadel:
                    return this.gameModel.constructions.citadel = 1, this.gameModel.brainsStorePCMod *= 1.8, void (this.gameModel.bloodStorePCMod *= 1.8);
                case this.constructionTypes.plagueSpikes:
                    return void (this.gameModel.constructions.plagueSpikes = 1);
                case this.constructionTypes.fence:
                    return void (this.gameModel.constructions.fence = 1);
                case this.constructionTypes.fenceSize:
                    return void (this.gameModel.fenceRadius += e.effect * e.rank);
                case this.constructionTypes.pit:
                    return this.gameModel.bloodMax += 1e6 * e.rank, void (this.gameModel.brainsMax += 1e5 * e.rank);
                case this.constructionTypes.runesmith:
                    return this.gameModel.constructions.runesmith = 1, void (this.gameModel.persistentData.runes || (this.gameModel.persistentData.runes = {
                        life: {
                            blood: 0,
                            brains: 0,
                            bones: 0
                        },
                        death: {
                            blood: 0,
                            brains: 0,
                            bones: 0
                        }
                    }));
                case this.constructionTypes.aviary:
                    return void (this.gameModel.constructions.aviary = 1);
                case this.constructionTypes.zombieCage:
                    return void (this.gameModel.zombieCages += e.effect * e.rank);
                case this.constructionTypes.partFactory:
                    return this.gameModel.constructions.partFactory = !0, void (this.gameModel.constructions.factory = !0);
                case this.constructionTypes.monsterFactory:
                    return this.gameModel.constructions.monsterFactory = !0, void (this.gameModel.constructions.factory = !0);
                case this.constructionTypes.HybridLab:
                    return this.gameModel.constructions.HybridLab = 1, this.gameModel.brainsStorePCMod *= 2, void (this.gameModel.bloodStorePCMod *= 2);
                case this.constructionTypes.AdvHybridLab:
                    return this.gameModel.constructions.AdvHybridLab = 1, this.gameModel.brainsStorePCMod *= 2, void (this.gameModel.bloodStorePCMod *= 2);
                case this.constructionTypes.MiniAssembLine:
                    return this.gameModel.constructions.MiniAssembLine = 1, this.gameModel.brainsStorePCMod *= 2, void (this.gameModel.bloodStorePCMod *= 2);
                case this.constructionTypes.AdvHybridLab:
                    return this.gameModel.constructions.TechThinkTank = 1, this.gameModel.brainsStorePCMod *= 2, void (this.gameModel.bloodStorePCMod *= 2);
            }
        }
        displayStatValue(e) {
            switch (e.type) {
                case this.types.energyRate:
                    return "Energy rate: " + r(this.gameModel.energyRate) + " per second";
                case this.types.energyCap:
                    return "Maximum energy: " + n(this.gameModel.energyMax);
                case this.types.bloodCap:
                    return "Maximum blood: " + n(this.gameModel.bloodMax);
                case this.types.brainsCap:
                    return "Maximum brains: " + n(this.gameModel.brainsMax);
                case this.types.damage:
                    return "Zombie damage: " + n(this.gameModel.zombieDamage);
                case this.types.speed:
                    return "Zombie speed: " + n(this.gameModel.zombieSpeed);
                case this.types.health:
                    return "Zombie maximum health: " + n(this.gameModel.zombieHealth);
                case this.types.brainRecoverChance:
                    return Math.round(100 * this.gameModel.brainRecoverChance) + "% chance to recover brain";
                case this.types.riseFromTheDeadChance:
                    return Math.round(100 * this.gameModel.riseFromTheDeadChance) + "% chance for human corpses to turn into zombies";
                case this.types.infectedBite:
                    return Math.round(100 * this.gameModel.infectedBiteChance) + "% chance for zombies to infect their targets";
                case this.types.infectedBlast:
                    return Math.round(100 * this.gameModel.infectedBlastChance) + "% chance for zombies to explode on death";
                case this.types.bulletproof:
                    return Math.round(100 * this.gameModel.bulletproofChance) + "% chance for earth golems to reflect bullets";
                case this.types.construction:
                    return this.gameModel.construction > 0 ? "You have unlocked Unholy Construction" : "You have yet to unlock Unholy Construction";
                case this.types.boneCollectorCapacity:
                    return "Bone collector capacity: " + n(this.gameModel.boneCollectorCapacity);
                case this.types.bonesGainPC:
                    return "Bones: " + n(Math.round(100 * this.gameModel.bonesPCMod)) + "%";
                case this.types.partsGainPC:
                    return "Parts: " + n(Math.round(100 * this.gameModel.partsPCMod)) + "%";
                case this.types.bloodGainPC:
                    return "Blood: " + n(Math.round(100 * this.gameModel.bloodPCMod)) + "%";
                case this.types.bloodStoragePC:
                    return "Blood Storage: " + n(100 * this.gameModel.bloodStorePCMod) + "%";
                case this.types.brainsGainPC:
                    return "Brains: " + n(Math.round(100 * this.gameModel.brainsPCMod)) + "%";
                case this.types.brainsStoragePC:
                    return "Brains Storage: " + n(100 * this.gameModel.brainsStorePCMod) + "%";
                case this.types.zombieDmgPC:
                    return "Zombie Damage: " + Math.round(100 * this.gameModel.zombieDamagePCMod - 100) + "%";
                case this.types.zombieHealthPC:
                    return "Zombie Health: " + Math.round(100 * this.gameModel.zombieHealthPCMod - 100) + "%";
                case this.types.HstrengthDmgPC:
                    return "Zombie Damage: " + Math.round(100 * this.gameModel.HstrengthDmgPCMod - 100) + "%";
                case this.types.HshellHealthPC:
                    return "Zombie Health: " + Math.round(100 * this.gameModel.HshellHealthPCMod - 100) + "%";
                case this.types.CyroVatPC:
                    return "Brains Storage: " + Math.round(100 * this.gameModel.CyroVatPCMod - 100) + "%";
                case this.types.PlagueVatPC:
                    return "Plague Damage: " + Math.round(100 * this.gameModel.PlagueVatPCMod - 100) + "%";
                case this.types.CloningRep1PC:
                    return "Additional Brain Income: " + Math.round(100 * this.gameModel.CloningRep1PCMod - 100) + "%";
                case this.types.BloodSynPC:
                    return "Additional Blood Income: " + Math.round(100 * this.gameModel.BloodSynPCMod - 100) + "%";
                case this.types.SynBonePC:
                    return "Additional Bone Income: " + Math.round(100 * this.gameModel.SynBonePCMod - 100) + "%";
                case this.types.SmolPartsPC:
                    return "Additional Parts Income: " + Math.round(100 * this.gameModel.SmolPartsPCMod - 100) + "%";
                case this.types.EnergyCost:
                    return "Zombie Cost: " + this.gameModel.zombieCost + " energy";
                case this.types.AvionicsPC:
                    return "Harpy speed: " + n(this.gameModel.harpySpeed);
                case this.types.SkeleMove:
                    return "Skeleton speed: " + n(this.gameModel.SkeleMoveMod);
                case this.types.ShockPC:
                    return "Attack Speed multiplier: " + Math.round(100 * this.gameModel.ShockPCMod - 100) + "%";
                case this.types.prest_multPC:
                    return "Zombie Health and Damage: " + Math.round(100 * this.gameModel.prest_multPCMod) + "%";
                case this.types.golemDamagePC:
                    return "Golem Damage: " + Math.round(100 * this.gameModel.golemDamagePCMod) + "%";
                case this.types.golemHealthPC:
                    return "Golem Health: " + Math.round(100 * this.gameModel.golemHealthPCMod) + "%";
                case this.types.startingPC:
                    return Math.round(500 * this.gameModel.startingResources) + " blood, " + Math.round(50 * this.gameModel.startingResources) + " brains, " + Math.round(200 * this.gameModel.startingResources) + " bones";
                case this.types.unlockSpell:
                    return this.currentRank(e) > 0 ? "You have learned this spell" : "You have yet to learn this spell";
                case this.types.energyCost:
                    return "Zombie Cost: " + this.gameModel.zombieCost + " energy";
                case this.types.burningSpeedPC:
                    return "Burning zombie speed: " + Math.round(100 * this.gameModel.burningSpeedMod) + "%";
                case this.types.blastHealing:
                    return "Plague heal: " + Math.round(100 * this.gameModel.blastHealing) + "%";
                case this.types.spitDistance:
                    return "Zombie spit distance: " + this.gameModel.spitDistance;
                case this.types.plagueArmor:
                    return "Infected damage reduction: " + Math.round(100 - 100 * this.gameModel.plagueDmgReduction) + "%";
                case this.types.monsterLimit:
                    return "Creature limit: " + this.gameModel.creatureLimit;
                case this.types.runicSyphon:
                    return "Syphon amount: " + Math.round(100 * this.gameModel.runicSyphon.percentage) + "%";
                case this.types.autoconstruction:
                    return this.currentRank(e) > 0 ? "You have unlocked automatic construction" : "You have yet to unlock automatic construction";
                case this.types.autoshop:
                    return this.currentRank(e) > 0 ? "You have unlocked automatic shop purchases" : "You have yet to unlock automatic shop purchases";
                case this.types.graveyardHealth:
                    return "Graveyard health: " + Math.round(100 * this.gameModel.graveyardHealthMod) + "%";
                case this.types.harpySpeed:
                    return "Harpy speed: " + n(this.gameModel.harpySpeed);
                case this.types.harpyBombs:
                    return "Harpy bombs: " + n(this.gameModel.harpyBombs);
                case this.types.tankBuster:
                    return this.currentRank(e) > 0 ? "You have unlocked tank buster" : "You have yet to unlock tank buster";
                case this.types.spikeDelay:
                    return "Current spike delay: " + (5 - this.currentRank(e)) + " seconds"
            }
        }
        currentRank(e) {
            for (let t = 0; t < this.gameModel.persistentData.upgrades.length; t++) {
                const s = this.gameModel.persistentData.upgrades[t];
                if (e.id == s.id) return s.rank
            }
            return 0
        }
        currentRankConstruction(e) {
            if (this.gameModel.persistentData.constructions)
                for (let t = 0; t < this.gameModel.persistentData.constructions.length; t++) {
                    const s = this.gameModel.persistentData.constructions[t];
                    if (e.id == s.id) return s.rank
                }
            return 0
        }
        upgradePrice(e) {
            return Math.round(e.basePrice * Math.pow(e.multiplier, this.currentRank(e)))
        }
        upgradeMaxAffordable(e) {
            const t = this.currentRank(e);
            let s = 0;
            switch (e.costType) {
                case this.costs.blood:
                    s = h(e.basePrice, e.multiplier, t, this.gameModel.persistentData.blood);
                    break;
                case this.costs.brains:
                    s = h(e.basePrice, e.multiplier, t, this.gameModel.persistentData.brains);
                    break;
                case this.costs.bones:
                    s = h(e.basePrice, e.multiplier, t, this.gameModel.persistentData.bones);
                    break;
                case this.costs.parts:
                    s = h(e.basePrice, e.multiplier, t, this.gameModel.persistentData.parts);
                    break;
                case this.costs.prestigePoints:
                    s = h(e.basePrice, e.multiplier, t, this.gameModel.persistentData.prestigePointsToSpend)
            }
            return 0 != e.cap ? Math.min(s, e.cap - t) : s
        }
        upgradeMaxPrice(e, t) {
            return l(e.basePrice, e.multiplier, this.currentRank(e), t)
        }
        canAffordUpgrade(e) {
            if (e.cap > 0 && this.currentRank(e) >= e.cap) {
                return e.auto = !1, !1;
            }
            switch (e.costType) {
                case this.costs.energy:
                    return this.gameModel.energy >= this.upgradePrice(e);
                case this.costs.blood:
                    return this.gameModel.persistentData.blood >= this.upgradePrice(e);
                case this.costs.brains:
                    return this.gameModel.persistentData.brains >= this.upgradePrice(e);
                case this.costs.bones:
                    return this.gameModel.persistentData.bones >= this.upgradePrice(e);
                case this.costs.parts:
                    return this.gameModel.persistentData.parts >= this.upgradePrice(e);
                case this.costs.prestigePoints:
                    return this.gameModel.persistentData.prestigePointsToSpend >= this.upgradePrice(e)
            }
            return !1
        }
        constructionLeadsTo(e) {
            let t = this.constructionUpgrades.filter((t => t.requires == e.id)).map((e => e.name)).join(", ");
            return t += this.upgrades.filter((t => t.requires == e.id)).map((e => e.name)).join(", "), t
        }
        purchaseMaxUpgrades(e) {
            const t = this.upgradeMaxAffordable(e);
            for (let s = 0; s < t; s++) this.purchaseUpgrade(e, !1);
            this.gameModel.saveData()
        }
        purchaseUpgrade(e, t = !0) {
            if (this.canAffordUpgrade(e)) {
                let s, i = !1;
                switch (e.costType) {
                    case this.costs.energy:
                        this.gameModel.energy -= this.upgradePrice(e);
                        break;
                    case this.costs.blood:
                        this.gameModel.persistentData.blood -= this.upgradePrice(e);
                        break;
                    case this.costs.brains:
                        this.gameModel.persistentData.brains -= this.upgradePrice(e);
                        break;
                    case this.costs.bones:
                        this.gameModel.persistentData.bones -= this.upgradePrice(e);
                        break;
                    case this.costs.prestigePoints:
                        i = !0, this.gameModel.persistentData.prestigePointsToSpend -= this.upgradePrice(e);
                        break;
                    case this.costs.parts:
                        this.gameModel.persistentData.parts -= this.upgradePrice(e)
                }
                for (let t = 0; t < this.gameModel.persistentData.upgrades.length; t++)
                    if (e.id == this.gameModel.persistentData.upgrades[t].id) {
                        s = !0, this.gameModel.persistentData.upgrades[t] = {
                            id: e.id,
                            rank: this.gameModel.persistentData.upgrades[t].rank + 1
                        }, i && (this.gameModel.persistentData.upgrades[t].costType = this.costs.prestigePoints);
                        break
                    } if (!s) {
                        const t = {
                            id: e.id,
                            rank: 1,
                            costType: null
                        };
                        i && (t.costType = this.costs.prestigePoints), this.gameModel.persistentData.upgrades.push(t)
                    }
                t && this.gameModel.saveData(), this.applyUpgrades(), e.purchaseMessage && this.gameModel.sendMessage(e.purchaseMessage)
            }
        }
        removeUpgrade(e) {
            for (let t = 0; t < this.gameModel.persistentData.upgrades.length; t++)
                if (e.id == this.gameModel.persistentData.upgrades[t].id) {
                    this.gameModel.persistentData.upgrades[t] = {
                        id: e.id,
                        rank: 0
                    };
                    break
                } this.applyUpgrades()
        }
        consumeResources(e) {
            let t = !0;
            return this.gameModel.persistentData.currentConstruction.shortfall = {}, e.energy && e.energy > this.gameModel.energy && (t = !1, this.gameModel.persistentData.currentConstruction.shortfall.energy = !0), e.blood && e.blood > this.gameModel.persistentData.blood && (t = !1, this.gameModel.persistentData.currentConstruction.shortfall.blood = !0), e.brains && e.brains > this.gameModel.persistentData.brains && (t = !1, this.gameModel.persistentData.currentConstruction.shortfall.brains = !0), e.bones && e.bones > this.gameModel.persistentData.bones && (t = !1, this.gameModel.persistentData.currentConstruction.shortfall.bones = !0), e.parts && e.parts > this.gameModel.persistentData.parts && (t = !1, this.gameModel.persistentData.currentConstruction.shortfall.parts = !0), !!t && (this.gameModel.persistentData.currentConstruction.shortfall = !1, e.energy && (this.gameModel.energy -= e.energy), e.blood && (this.gameModel.persistentData.blood -= e.blood), e.brains && (this.gameModel.persistentData.brains -= e.brains), e.bones && (this.gameModel.persistentData.bones -= e.bones), e.parts && (this.gameModel.persistentData.parts -= e.parts), !0)
        }
        completeConstruction() {
            const e = this.constructionUpgrades.filter((e => e.id == this.gameModel.persistentData.currentConstruction.id))[0];
            let t;
            for (let s = 0; s < this.gameModel.persistentData.constructions.length; s++) e.id == this.gameModel.persistentData.constructions[s].id && (t = this.gameModel.persistentData.constructions[s], t.effect = e.effect, t.rank++);
            t || this.gameModel.persistentData.constructions.push({
                id: e.id,
                name: e.name,
                rank: 1,
                type: e.type,
                effect: e.effect
            }), this.gameModel.persistentData.currentConstruction = !1, this.gameModel.saveData(), this.applyUpgrades(), this.angularModel.updateConstructionUpgrades(), this.gameModel.sendMessage("Construction of " + e.name + " complete!"), e.completeMessage && this.gameModel.sendMessage(e.completeMessage)
        }
        updateAutoUpgrades() {
            if (this.gameModel.autoUpgrades) {
                for (let e = 0; e < this.upgrades.length; e++) this.upgrades[e].auto && this.purchaseUpgrade(this.upgrades[e], !1);
                if (this.gameModel.constructions.factory)
                    for (let e = 0; e < this.partFactory.generators.length; e++) this.partFactory.generators[e].auto && this.partFactory.purchaseGenerator(this.partFactory.generators[e], !1)
            }
            this.gameModel.autoShatter && this.doShatter()
        }
        updateConstruction(e) {
            if ((this.gameModel.persistentData.currentConstruction || this.gameModel.autoconstruction) && this.gameModel.persistentData.currentConstruction.state != this.constructionStates.paused)
                if (this.gameModel.persistentData.currentConstruction) this.constructionTickTimer -= e, this.constructionTickTimer < 0 && (this.constructionTickTimer = 1, this.consumeResources(this.gameModel.persistentData.currentConstruction.costPerTick) ? (this.gameModel.persistentData.currentConstruction.state = this.constructionStates.building, this.gameModel.persistentData.currentConstruction.timeRemaining -= 1, this.gameModel.persistentData.currentConstruction.timeRemaining <= 0 && this.completeConstruction()) : this.gameModel.persistentData.currentConstruction.state = this.constructionStates.autoPaused);
                else if (this.gameModel.autoconstruction) {
                    const e = this.getAvailableConstructions();
                    if (!e || 0 == e.length) return void (this.gameModel.autoconstruction = !1);
                    let t = null,
                        s = 0;
                    for (let i = 0; i < e.length; i++) {
                        const a = (e[i].costs.energy || 0) + (e[i].costs.blood || 0) + (e[i].costs.brains || 0) + (e[i].costs.bones || 0) + 100 * (e[i].costs.parts || 0);
                        (a < s || !t) && (s = a, t = e[i])
                    }
                    t && setTimeout((() => this.startConstruction(t)))
                }
        }
        startConstruction(e) {
            if (this.gameModel.persistentData.currentConstruction) return;
            const t = this.gameModel.persistentData.blood >= (e.costs.blood || 0) && this.gameModel.persistentData.brains >= (e.costs.brains || 0) && this.gameModel.persistentData.bones >= (e.costs.bones || 0) && this.gameModel.persistentData.parts >= (e.costs.parts || 0) && this.gameModel.energy >= (e.costs.energy || 0),
                s = {
                    energy: 0,
                    blood: 0,
                    brains: 0,
                    bones: 0,
                    parts: 0
                };
            e.costs.energy && (s.energy = e.costs.energy / (t ? 5 : e.time)), e.costs.blood && (s.blood = e.costs.blood / (t ? 5 : e.time)), e.costs.brains && (s.brains = e.costs.brains / (t ? 5 : e.time)), e.costs.bones && (s.bones = e.costs.bones / (t ? 5 : e.time)), e.costs.parts && (s.parts = e.costs.parts / (t ? 5 : e.time)), this.gameModel.persistentData.currentConstruction = {
                state: this.constructionStates.building,
                name: e.name,
                id: e.id,
                timeRemaining: t ? 5 : e.time,
                time: t ? 5 : e.time,
                costPerTick: s
            }
        }
        playPauseConstruction() {
            this.gameModel.persistentData.currentConstruction && (this.gameModel.persistentData.currentConstruction.state == this.constructionStates.paused ? this.gameModel.persistentData.currentConstruction.state = this.constructionStates.building : this.gameModel.persistentData.currentConstruction.state = this.constructionStates.paused)
        }
        cancelConstruction() {
            this.gameModel.persistentData.currentConstruction = !1
        }
        constructionAvailable(e) {
            return !(this.gameModel.persistentData.currentConstruction && this.gameModel.persistentData.currentConstruction.id == e.id || this.currentRankConstruction(e) >= e.cap || e.requires && 0 == this.gameModel.persistentData.constructions.filter((t => t.id == e.requires)).length)
        }
        constructionComplete(e) {
            return this.currentRankConstruction(e) >= e.cap
        }
        getAvailableConstructions() {
            return this.constructionUpgrades.filter((e => this.constructionAvailable(e)))
        }
        getCompletedConstructions() {
            return this.constructionUpgrades.filter((e => this.constructionComplete(e)))
        }
        upgradeIdCheck() {
            const e = [];
            this.upgrades.forEach((function (t) {
                e[t.id] && console.error("ID " + t.id + " already used"), e[t.id] = !0
            })), this.prestigeUpgrades.forEach((function (t) {
                e[t.id] && console.error("ID " + t.id + " already used"), e[t.id] = !0
            })), this.constructionUpgrades.forEach((function (t) {
                e[t.id] && console.error("ID " + t.id + " already used"), e[t.id] = !0
            }))
        }
        updateRunicSyphon(e) {
            e.percentage > 0 && (this.gameModel.persistentData.runes.life.blood += e.blood / 2, this.gameModel.persistentData.runes.death.blood += e.blood / 2, this.gameModel.persistentData.runes.life.brains += e.brains / 2, this.gameModel.persistentData.runes.death.brains += e.brains / 2, this.gameModel.persistentData.runes.life.bones += e.bones / 2, this.gameModel.persistentData.runes.death.bones += e.bones / 2, e.blood = 0, e.brains = 0, e.bones = 0, this.updateRuneEffects())
        }
        shatterPercent(e) {
            const t = 1e8 * Math.pow(1.5, this.gameModel.persistentData.runeshatter);
            return Math.floor(100 * Math.min(1, e.blood / t))
        }
        shatterBloodCost(e) {
            return Math.max(0, 1e8 * Math.pow(1.5, this.gameModel.persistentData.runeshatter) - e.blood)
        }
        shatterEffect() {
            return Math.pow(1.1, this.gameModel.persistentData.runeshatter)
        }
        canShatter() {
            return !!this.gameModel.persistentData.runes && this.shatterPercent(this.gameModel.persistentData.runes.life) + this.shatterPercent(this.gameModel.persistentData.runes.death) == 200
        }
        doShatter() {
            this.canShatter() && (this.gameModel.persistentData.runeshatter++, this.gameModel.persistentData.runes.life.blood = 0, this.gameModel.persistentData.runes.death.blood = 0, this.gameModel.persistentData.runes.life.brains = 0, this.gameModel.persistentData.runes.death.brains = 0, this.gameModel.persistentData.runes.life.bones = 0, this.gameModel.persistentData.runes.death.bones = 0, this.updateRuneEffects(), this.applyUpgrades())
        }
        infuseRune(e, t, s) {
            const i = "life" == e ? this.gameModel.persistentData.runes.life : this.gameModel.persistentData.runes.death;
            switch (t) {
                case "blood":
                    this.gameModel.persistentData.blood >= s && (i.blood += s, this.gameModel.persistentData.blood -= s);
                    break;
                case "brains":
                    this.gameModel.persistentData.brains >= s && (i.brains += s, this.gameModel.persistentData.brains -= s);
                    break;
                case "bones":
                    this.gameModel.persistentData.bones >= s && (i.bones += s, this.gameModel.persistentData.bones -= s)
            }
            this.updateRuneEffects()
        }
        updateRuneEffects() {
            if (!this.gameModel.persistentData.runes) return;
            const e = {
                attackSpeed: 1,
                critChance: 0,
                critDamage: 1,
                damageReduction: 1,
                healthRegen: 0,
                damageReflection: 0
            };
            for (let t = 0; t < this.runeCalculations.length; t++) {
                const s = this.runeCalculations[t],
                    i = this.gameModel.persistentData.runes[s.rune][s.cost];
                if (i > 0) {
                    let t = (Math.log(i) / Math.log(s.logBase) + s.adjustment) / 100;
                    t > 0 && (s.cap && t > s.cap && (t = s.cap), s.subtract ? e[s.effect] -= t : e[s.effect] += t)
                }
            }
            this.gameModel.runeEffects = e
        }
    }
    class he {
        constructor(e, t, s, i, a, r, n, o, h, l, d) {
            this.id = e, this.name = t, this.type = s, this.costs = i, this.time = a, this.multiplier = r, this.effect = n, this.cap = o, this.requires = h, this.description = l, this.completeMessage = d
        }
    }
    class le {
        constructor(e, t, s, i, a, r, n, o, h, l, d) {
            this.id = e, this.name = t, this.type = s, this.costType = i, this.basePrice = a, this.multiplier = r, this.effect = n, this.cap = o, this.description = h, this.rank = 1, this.purchaseMessage = l, this.requires = d
        }
    }
    class de {
        constructor() {
            if (this.gameModel = ne.getInstance(), this.upgrades = new oe, this.trophyStats = [{
                type: this.upgrades.types.health,
                value: 50,
                percentage: !1
            }, {
                type: this.upgrades.types.damage,
                value: 7,
                percentage: !1
            }, {
                type: this.upgrades.types.energyCap,
                value: 10,
                percentage: !1
            }, {
                type: this.upgrades.types.energyRate,
                value: .5,
                percentage: !1
            }, {
                type: this.upgrades.types.plagueTicks,
                value: 1,
                percentage: !1,
                static: !0
            }, {
                type: this.upgrades.types.plagueDamage,
                value: 50,
                percentage: !1
            }, {
                type: this.upgrades.types.bloodCap,
                value: 5e3,
                percentage: !1
            }, {
                type: this.upgrades.types.brainsRate,
                value: 2,
                percentage: !1
            }, {
                type: this.upgrades.types.zombieHealthPC,
                value: .02,
                percentage: !0
            }, {
                type: this.upgrades.types.bonesRate,
                value: 2,
                percentage: !1
            }, {
                type: this.upgrades.types.zombieDmgPC,
                value: .02,
                percentage: !0
            }], de.instance) return de.instance;
            de.instance = this
        }
        isPercentage(e) {
            for (let t = 0; t < this.trophyStats.length; t++)
                if (this.trophyStats[t].type == e) return 1 == this.trophyStats[t].percentage
        }
        doesLevelHaveTrophy(e) {
            return !(this.gameModel.persistentData.vipEscaped && this.gameModel.persistentData.vipEscaped.includes(e) || this.gameModel.persistentData.trophies && this.gameModel.persistentData.trophies.includes(e) || e % 5 != 0)
        }
        createTrophy(e, t, s) {
            const i = Math.round(e / 5) - 1,
                a = Math.floor(i / this.trophyStats.length),
                r = this.trophyStats[i - a * this.trophyStats.length];
            return {
                level: e,
                type: r.type,
                effect: r.static ? r.value : r.value * (a + 1),
                rank: 1,
                owned: t,
                escaped: s
            }
        }
        trophyAquired(e) {
            this.gameModel.persistentData.trophies || (this.gameModel.persistentData.trophies = []), this.gameModel.persistentData.trophies.includes(e) ? this.gameModel.sendMessage("The VIP has been killed!") : (this.gameModel.persistentData.trophies.push(e), this.gameModel.persistentData.trophies.sort(), this.gameModel.saveData(), this.upgrades.applyUpgrades(), window.kongregate && window.kongregate.stats.submit("trophies", this.gameModel.persistentData.trophies.length), this.gameModel.sendMessage("The VIP has been killed! - New Trophy Aquired"))
        }
        getTrophyList() {
            this.gameModel.persistentData.trophies || (this.gameModel.persistentData.trophies = []), this.gameModel.persistentData.vipEscaped || (this.gameModel.persistentData.vipEscaped = []);
            const e = [];
            let t = this.gameModel.persistentData.allTimeHighestLevel + 5;
            for (let e = 0; e < this.gameModel.persistentData.trophies.length; e++) this.gameModel.persistentData.trophies[e] > t && (t = this.gameModel.persistentData.trophies[e]);
            for (let s = 5; s <= t; s += 5) e.push(this.createTrophy(s, this.gameModel.persistentData.trophies.includes(s), this.gameModel.persistentData.vipEscaped.includes(s)));
            return e
        }
        getTrophyTotals() {
            const e = this.getTrophyList().filter((e => e.owned)),
                t = [];
            for (let s = 0; s < e.length; s++) 0 == t.filter((t => t.type == e[s].type)).length ? t.push(e[s]) : this.isPercentage(e[s].type) ? t.filter((t => t.type == e[s].type))[0].effect = (t.filter((t => t.type == e[s].type))[0].effect + 1) * (1 + e[s].effect) - 1 : t.filter((t => t.type == e[s].type))[0].effect += e[s].effect;
            return t
        }
        getAquiredTrophyList() {
            this.gameModel.persistentData.trophies || (this.gameModel.persistentData.trophies = []);
            const e = [];
            for (let t = 0; t < this.gameModel.persistentData.trophies.length; t++) e.push(this.createTrophy(this.gameModel.persistentData.trophies[t], !0, !1));
            return e
        }
    }
    var ce, ue, pe, ge, me, be;
    ! function (e) {
        e[e.standing = 0] = "standing", e[e.walking = 1] = "walking", e[e.attacking = 2] = "attacking", e[e.fleeing = 3] = "fleeing", e[e.escaping = 4] = "escaping"
    }(ce || (ce = {}));
    class fe extends PIXI.Text {
        constructor() {
            super(...arguments), this.human = null, this.yOffset = 0
        }
    }
    class ye extends $ {
        constructor() {
            super(...arguments), this.flee = 0, this.standing = 0, this.target = 0, this.plagueTick = 0, this.healTick = 0
        }
    }
    class xe extends K {
        constructor() {
            super(...arguments), this.dog = !1, this.doctor = !1, this.tank = !1, this.vip = !1, this.torchBearer = !1
        }
    }
    class ve extends Q {
        constructor() {
            super(...arguments), this.maxSpeed = 0, this.flags = new xe, this.target = null, this.speedMod = 0, this.human = !0, this.plagueTicks = 0, this.plagueDamage = 0, this.visionDistance = 0, this.timer = new ye
        }
    }
    class Se {
        constructor() {
            if (this.maxWalkSpeed = 15, this.maxRunSpeed = 35, this.minSecondsTostand = 1, this.maxSecondsToStand = 60, this.chanceToStayInCurrentBuilding = .95, this.textures = [], this.doctorTextures = [], this.humans = [], this.discardedHumans = [], this.aliveHumans = [], this.graveyardAttackers = [], this.humansPerLevel = 50, this.maxHumans = 1e3, this.scaling = 2, this.visionDistance = 60, this.vipEscaping = !1, this.fleeChancePerZombie = .1, this.fleeTime = 10, this.scanTime = 3, this.attackDistance = 20, this.moveTargetDistance = 3, this.attackSpeed = 2, this.attackDamage = 5, this.fadeSpeed = .1, this.plagueTickTimer = 5, this.healTickTimer = 5, this.burnTickTimer = 5, this.smokeTimer = .3, this.fastDistance = i, this.frozen = !1, this.pandemic = !1, this.graveYardPosition = null, this.drawTargets = !1, Se.instance) return Se.instance;
            Se.instance = this
        }
        randomSecondsToStand() {
            return this.minSecondsTostand + Math.random() * (this.maxSecondsToStand - this.minSecondsTostand)
        }
        damageHuman(e, t) {
            this.gameModel.addBlood(Math.round(t / 3)), e.health -= t, e.timer.scan = 0, e.flags.tank ? this.fragments.newPart(e.x, e.y - 18, 8086798) : (this.blood.newSplatter(e.x, e.y), e.speedMod = Math.max(Math.min(1, e.health / e.maxHealth), .25)), e.health <= 0 && !e.flags.dead && (this.bones.newBones(e.x, e.y), e.flags.dead = !0, this.gameModel.addBrains(1), this.skeleton.addXp(this.gameModel.level), this.skeleton.testForLoot(), e.flags.tank ? (this.blasts.newDroneBlast(e.x, e.y - 5), this.fragments.newFragmentExplosion(e.x, e.y - 5, 8086798), e.visible = !1) : e.textures = e.deadTexture, e.flags.vip && (this.vipText.visible = !1, this.trophies.trophyAquired(this.gameModel.level), setTimeout((() => {
                this.vipEscaping = !1
            }), 2e3))), this.army.assaultStarted || Math.random() > .9 && this.gameModel.isBossStage(this.gameModel.level) && (this.army.assaultStarted = !0, this.gameModel.sendMessage("The assault has begun!"))
        }
        updateBurns(e, t) {
            e.timer.burnTick -= t, e.timer.smoke -= t, e.timer.smoke < 0 && (this.smoke.newFireSmoke(e.x, e.y - 14), e.timer.smoke = this.smokeTimer), e.timer.burnTick < 0 && (this.damageHuman(e, e.burnDamage), e.timer.burnTick = this.burnTickTimer, this.exclamations.newFire(e))
        }
        assignRandomTarget(e) {
            (Math.random() > this.chanceToStayInCurrentBuilding || e.timer.flee > 0) && (e.currentPoi = this.map.getRandomBuilding()), e.target = this.map.randomPositionInBuilding(e.currentPoi), e.maxSpeed = e.timer.flee > 0 ? this.maxRunSpeed : this.maxWalkSpeed, e.xSpeed = 0, e.ySpeed = 0
        }
        getMaxNpcs() {
            return Math.min(this.humansPerLevel * this.gameModel.level, this.maxHumans)
        }
        getMaxHumans() {
            return this.gameModel.isBossStage(this.gameModel.level) ? 0 : this.getMaxNpcs() - (this.police.police.length + this.army.armymen.length)
        }
        getMaxDoctors() {
            return this.gameModel.level < 18 ? 0 : Math.min(Math.round(.7 * this.gameModel.level), 75)
        }
        getTorchChance() {
            return this.gameModel.level < 10 ? 0 : .02 * Math.min(this.gameModel.level - 10, 40)
        }
        getMaxHealth(e) {
            return e < 7 ? 10 * (e + 4) :
                e < 12 ? 20 * (e - 1) :
                    e < 16 ? 25 * (e - 3) :
                        e < 29 ? 50 * (e - 9) :
                            e < 49 ? 100 * (e - 19) :
                                e < 64 ? 300 * (e - 39) :
                                    e < 85 ? 500 * (e - 49) :
                                        e < 499 ? 17800 * Math.pow(1.015, e - 84) :
                                            e < 999 ? 85e5 * Math.pow(1.03, e - 499) :
                                                e < 1499 ? 498e16 * Math.pow(1.021, e - 1499) :
                                                    e > 2299 ? 845e23 * Math.pow(1.025, e - 2299) :
                                                        22e12 * Math.pow(1.025, e - 999)
        }
        getAttackDamage() {
            1 != this.gameModel.level ? 2 != this.gameModel.level ? 3 != this.gameModel.level ? this.attackDamage = Math.round(this.getMaxHealth(this.gameModel.level) / 10) : this.attackDamage = 5 : this.attackDamage = 4 : this.attackDamage = 2
        }
        setupVipText(e) {
            this.vipText || (this.vipText = new fe("VIP", {
                fontFamily: "sans-serif",
                fontSize: 64,
                fill: "#FC0",
                stroke: "#000",
                strokeThickness: 5,
                align: "center"
            }), this.vipText.anchor.set(.5, 1), this.vipText.scale.x = .25, this.vipText.scale.y = .25, b.addChild(this.vipText)), this.vipText.visible = !0, this.vipText.human = e, this.vipText.yOffset = -20, this.vipText.x = e.x, this.vipText.y = e.y + this.vipText.yOffset
        }
        populate() {
            if (this.map = new ee, this.zombies = new Ae, this.gameModel = ne.getInstance(), this.blood = new _e, this.smoke = new ot, this.bones = new tt, this.skeleton = new Xe, this.blasts = new nt, this.fragments = new lt, this.trophies = new de, this.exclamations = new it, this.bullets = new rt, this.police = new ke, this.army = new Te, this.tanks = new De, this.map.populatePois(), 0 == this.textures.length)
                for (let e = 0; e < 6; e++) {
                    const t = [];
                    for (let s = 0; s < 3; s++) t.push(PIXI.Texture.from("human" + (e + 1) + "_" + (s + 1) + ".png"));
                    this.textures.push({
                        animated: t,
                        dead: [PIXI.Texture.from("human" + (e + 1) + "_dead.png")]
                    })
                }
            if (0 == this.doctorTextures.length) {
                for (let e = 0; e < 3; e++) this.doctorTextures.push(PIXI.Texture.from("doctor" + (e + 1) + ".png"));
                this.doctorDeadTexture = [PIXI.Texture.from("doctor4.png")]
            }
            if (this.humans.length > 0) {
                for (let e = 0; e < this.humans.length; e++) g.removeChild(this.humans[e]), this.humans[e].stop();
                this.discardedHumans = this.humans.slice(), this.humans.length = 0, this.aliveHumans.length = 0
            }
            this.police.populate(), this.army.populate(), this.tanks.populate(), this.getAttackDamage();
            const e = this.getMaxHumans();
            let t = this.getMaxDoctors();
            const s = this.getMaxHealth(this.gameModel.level);
            let i = this.trophies.doesLevelHaveTrophy(this.gameModel.level);
            this.vip = void 0, i ? this.escapeTarget = {
                x: P.x / 2,
                y: P.y + 50
            } : this.vipText && (this.vipText.visible = !1);
            for (let a = 0; a < e; a++) {
                let e;
                if (t > 0) this.discardedHumans.length > 0 ? (e = this.discardedHumans.pop(), e.textures = this.doctorTextures) : e = new ve(this.doctorTextures), e.deadTexture = this.doctorDeadTexture, e.flags.doctor = !0, e.flags.torchBearer = !1, e.timer.healTick = Math.random() * this.healTickTimer, t--;
                else {
                    const t = Math.random() < this.getTorchChance(),
                        s = Math.floor(3 * Math.random()) + (t ? 3 : 0);
                    this.discardedHumans.length > 0 ? (e = this.discardedHumans.pop(), e.textures = this.textures[s].animated) : e = new ve(this.textures[s].animated), e.flags.torchBearer = t, e.deadTexture = this.textures[s].dead, e.flags.doctor = !1
                }
                e.reset(), e.flags.vip = !1, e.flags.dead = !1, e.flags.burning = !1, e.flags.infected = !1, e.burnDamage = 0, e.plagueDamage = 0, e.plagueTicks = 0, e.animationSpeed = .15, e.anchor.set(35 / 80, 1), e.currentPoi = this.map.getRandomBuilding(), e.position.copyFrom(this.map.randomPositionInBuilding(e.currentPoi)), e.zIndex = e.position.y, e.xSpeed = 0, e.ySpeed = 0, e.timer.plagueTick = Math.random() * this.plagueTickTimer, e.target = !1, e.speedMod = 1, e.zombieTarget = null, e.lastKnownBuilding = null, e.visionDistance = this.visionDistance, e.visible = !0, e.alpha = 1, e.maxHealth = e.health = s, i && !e.flags.doctor && (e.flags.vip = !0, this.vip = e, i = !1, e.maxHealth = e.health = 2 * s, this.setupVipText(e)), e.timer.scan = Math.random() * this.scanTime, e.timer.flee = 0, this.changeState(e, ce.standing), e.timer.standing = Math.random() * this.randomSecondsToStand(), e.timer.attack = this.attackSpeed, e.scale.set(Math.random() > .5 ? this.scaling : -1 * this.scaling, this.scaling), this.humans.push(e), g.addChild(e)
            }
        }
        updateHumanSpeed(e, t) {
            if (this.frozen) return void e.gotoAndStop(0);
            if (e.playing || e.play(), e.timer.dogStun && e.timer.dogStun > 0) return void (e.timer.dogStun -= t);
            0 == e.timer.target && e.targetVector || (e.timer.target = 0), e.timer.target -= t, e.timer.target <= 0 && (e.targetVector = this.map.howDoIGetToMyTarget(e, e.target), e.timer.target = .2);
            const s = e.speedMod * e.maxSpeed;
            e.xSpeed = e.targetVector.x * s, e.ySpeed = e.targetVector.y * s, (isNaN(e.xSpeed) || isNaN(e.ySpeed)) && (e.xSpeed = 0, e.ySpeed = 0), e.position.x += e.xSpeed * t, e.position.y += e.ySpeed * t, e.zIndex = e.position.y, Math.abs(e.xSpeed) > 1 && !e.flags.tank && (e.scale.x = e.xSpeed > 0 ? this.scaling : -this.scaling)
        }
        update(e) {
            if (this.gameModel.currentState != this.gameModel.states.playingLevel) return;
            const t = [],
                s = this.zombies.aliveZombies;
            this.graveyardAttackers.length = 0;
            for (let i = 0; i < this.humans.length; i++) this.updateHuman(this.humans[i], e, s), this.humans[i].flags.dead || t.push(this.humans[i]);
            this.aliveHumans = t, this.gameModel.stats.human.count = this.aliveHumans.length, this.police.update(e, s), this.army.update(e, s), this.tanks.update(e, s), this.vipText && this.vipText.visible && (this.vipText.x = this.vipText.human.x, this.vipText.y = this.vipText.human.y + this.vipText.yOffset), this.gameModel.humanCount = this.aliveHumans.length
        }
        updateDeadHumanFading(e, t) {
            if (e.visible) {
                if (e.alpha > .5 && e.alpha - this.fadeSpeed * t <= .5 && !e.flags.tank && Math.random() < this.gameModel.riseFromTheDeadChance) return this.zombies.createZombie(e.x, e.y, e.flags.dog), e.visible = !1, void g.removeChild(e);
                e.alpha -= this.fadeSpeed * t, e.alpha < 0 && (e.visible = !1, g.removeChild(e))
            }
        }
        changeState(e, t) {
            switch (t) {
                case ce.standing:
                    e.gotoAndStop(0), e.maxSpeed = this.maxWalkSpeed, e.timer.standing = this.randomSecondsToStand();
                    break;
                case ce.walking:
                    e.play(), e.maxSpeed = this.maxWalkSpeed;
                    break;
                case ce.fleeing:
                    e.play(), e.timer.flee = this.fleeTime, e.maxSpeed = this.maxRunSpeed, this.assignRandomTarget(e), this.exclamations.newExclamation(e);
                    break;
                case ce.escaping:
                    e.play(), e.maxSpeed = this.maxRunSpeed, e.target = this.escapeTarget, this.exclamations.newExclamation(e), this.gameModel.sendMessage("The VIP is escaping!"), this.vipEscaping = !0;
                    break;
                case ce.attacking:
                    e.play(), e.maxSpeed = this.maxRunSpeed
            }
            e.state = t
        }
        inflictBurn(e, t) {
            e.flags.torchBearer && (t.flags.burning ? t.burnDamage += this.attackDamage : (this.exclamations.newFire(t), t.burnDamage = this.attackDamage), t.flags.burning = !0)
        }
        burnHuman(e, t) {
            e && (e.flags.burning ? e.burnDamage += t : (e.timer.burnTick = this.burnTickTimer, e.timer.smoke = this.smokeTimer, this.exclamations.newFire(e), e.burnDamage = t), e.flags.burning = !0)
        }
        updatePlague(e, t) {
            e.timer.plagueTick -= t, e.timer.plagueTick < 0 && (this.damageHuman(e, e.plagueDamage), e.timer.plagueTick = this.plagueTickTimer * (1 / this.gameModel.runeEffects.attackSpeed), this.exclamations.newPoison(e), e.plagueTicks--, this.pandemic && this.pandemicBullet(e), e.plagueTicks <= 0 && (e.flags.infected = !1, e.plagueDamage = 0))
        }
        pandemicBullet(e) {
            for (let t = 0; t < this.aliveHumans.length; t++) Math.abs(this.aliveHumans[t].x - e.x) < 30 && Math.abs(this.aliveHumans[t].y - e.y) < 30 && Math.random() < .3 && this.bullets.newBullet(e, this.aliveHumans[t], this.gameModel.zombieDamage / 2, !0)
        }
        healHuman(e) {
            e.health < e.maxHealth && (e.flags.infected && e.plagueTicks > 0 && e.plagueTicks--, e.health += 2 * this.attackDamage, e.health > e.maxHealth && (e.health = e.maxHealth, e.speedMod = Math.max(Math.min(1, e.health / e.maxHealth), .25)), this.exclamations.newHealing(e))
        }
        doHeal(e, t) {
            if (e.timer.healTick -= t, e.timer.healTick < 0) {
                const t = 100;
                e.timer.healTick = this.healTickTimer;
                for (let s = 0; s < this.aliveHumans.length; s++) Math.abs(this.aliveHumans[s].x - e.x) < t && Math.abs(this.aliveHumans[s].y - e.y) < t && this.fastDistance(e.x, e.y, this.aliveHumans[s].x, this.aliveHumans[s].y) < t && this.healHuman(this.aliveHumans[s])
            }
        }
        updateHuman(e, t, s) {
            if (e.flags.dead) return this.updateDeadHumanFading(e, t);
            if (e.timer.attack -= t, e.timer.scan -= t, e.timer.flee -= t, e.flags.infected && this.updatePlague(e, t), e.flags.doctor && this.doHeal(e, t), e.flags.burning && this.updateBurns(e, t), (!e.zombieTarget || e.zombieTarget.flags.dead) && e.timer.scan < 0) {
                const t = this.scanForZombies(e, s);
                t > 0 && (e.flags.vip ? e.state !== ce.escaping && this.changeState(e, ce.escaping) : Math.random() < t * this.fleeChancePerZombie ? this.changeState(e, ce.fleeing) : (e.target = e.zombieTarget, this.changeState(e, ce.attacking)))
            }
            switch (e.state) {
                case ce.standing:
                    e.timer.standing -= t, e.timer.standing < 0 && (this.assignRandomTarget(e), this.changeState(e, ce.walking));
                    break;
                case ce.walking:
                case ce.fleeing:
                    this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.target = void 0, e.zombieTarget = void 0, this.changeState(e, ce.standing)) : this.updateHumanSpeed(e, t);
                    break;
                case ce.escaping:
                    this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (this.smoke.newDroneCloud(e.x, e.y), e.flags.dead = !0, e.zombieTarget = void 0, e.visible = !1, this.vipText.visible = !1, this.gameModel.sendMessage("The VIP has escaped!"), this.gameModel.vipEscaped(), setTimeout((() => {
                        this.vipEscaping = !1
                    }), 2e3)) : this.updateHumanSpeed(e, t);
                    break;
                case ce.attacking:
                    e.scale.x = e.target.x > e.x ? this.scaling : -this.scaling, e.zombieTarget && !e.zombieTarget.flags.dead ? this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y) < this.attackDistance ? e.timer.attack < 0 && (this.zombies.damageZombie(e.zombieTarget, this.attackDamage, e), this.inflictBurn(e, e.zombieTarget), e.timer.attack = this.attackSpeed) : this.updateHumanSpeed(e, t) : this.changeState(e, ce.standing)
            }
        }
        scanForZombies(e, t) {
            e.timer.scan = this.scanTime;
            let s = 0;
            for (let i = 0; i < t.length; i++)
                if (!t[i].flags.dead && Math.abs(t[i].x - e.x) < e.visionDistance && Math.abs(t[i].y - e.y) < e.visionDistance && (e.zombieTarget = t[i], s++, s > 9)) return s;
            return s
        }
    }
    class Me extends ve {
        constructor() {
            super(...arguments), this.radioTime = 0, this.followTimer = 0
        }
    } ! function (e) {
        e[e.shooting = 0] = "shooting", e[e.attacking = 1] = "attacking", e[e.walking = 2] = "walking", e[e.running = 3] = "running", e[e.standing = 4] = "standing", e[e.following = 5] = "following", e[e.hunting = 6] = "hunting"
    }(ue || (ue = {}));
    class ke {
        constructor() {
            if (this.maxWalkSpeed = 15, this.maxRunSpeed = 40, this.police = [], this.discardedPolice = [], this.walkTexture = [], this.deadTexture = [], this.dogTexture = [], this.deadDogTexture = [], this.policeDogLevel = 20, this.policePerLevel = 1, this.attackSpeed = 2, this.attackDamage = 16, this.attackDistance = 20, this.moveTargetDistance = 5, this.shootDistance = 110, this.visionDistance = 150, this.scaling = 2, this.dogScaling = 1.3, this.radioTime = 30, ke.instance) return ke.instance;
            ke.instance = this
        }
        isExtraPolice() {
            return (this.gameModel.level + 10) % 20 == 0
        }
        getMaxPolice() {
            const e = Math.min(Math.round(this.policePerLevel * this.gameModel.level), 100);
            return this.gameModel.level < 3 ? 0 : this.isExtraPolice() ? Math.max(2 * e, 150) : e
        }
        getMaxHealth() {
            return Math.round(1.1 * this.humans.getMaxHealth(this.gameModel.level))
        }
        getAttackDamage() {
            this.attackDamage = Math.round(this.getMaxHealth() / 10)
        }
        populate() {
            if (this.map = new ee, this.gameModel = ne.getInstance(), this.humans = new Se, this.exclamations = new it, this.zombies = new Ae, this.bullets = new rt, 0 == this.walkTexture.length) {
                for (let e = 0; e < 3; e++) this.walkTexture.push(PIXI.Texture.from("cop" + (e + 1) + ".png"));
                this.deadTexture = [PIXI.Texture.from("cop4.png")];
                for (let e = 0; e < 2; e++) this.dogTexture.push(PIXI.Texture.from("dog" + (e + 1) + ".png"));
                this.deadDogTexture = [PIXI.Texture.from("dogdead.png")]
            }
            if (this.police.length > 0) {
                for (let e = 0; e < this.police.length; e++) g.removeChild(this.police[e]);
                this.discardedPolice = this.police.slice(), this.police = []
            }
            const e = this.getMaxPolice(),
                t = this.getMaxHealth(),
                s = .6 * t;
            this.getAttackDamage();
            for (let i = 0; i < e; i++) {
                let e;
                this.discardedPolice.length > 0 ? (e = this.discardedPolice.pop(), e.alpha = 1, e.textures = this.walkTexture) : e = new Me(this.walkTexture), e.reset(), e.flags.dog = !1, e.flags.dead = !1, e.flags.infected = !1, e.flags.burning = !1, e.burnDamage = 0, e.plagueDamage = 0, e.plagueTicks = 0, e.deadTexture = this.deadTexture, e.animationSpeed = .2, e.anchor.set(35 / 80, 1), e.currentPoi = this.map.getRandomBuilding(), e.position.copyFrom(this.map.randomPositionInBuilding(e.currentPoi)), e.zIndex = e.position.y, e.xSpeed = 0, e.ySpeed = 0, e.radioTime = 5, e.speedMod = 1, e.lastKnownBuilding = void 0, e.timer.plagueTick = Math.random() * this.humans.plagueTickTimer, e.maxSpeed = this.maxWalkSpeed, e.visionDistance = this.visionDistance, e.visible = !0, e.maxHealth = e.health = t, e.timer.scan = Math.random() * this.humans.scanTime, e.timer.standing = Math.random() * this.humans.randomSecondsToStand(), e.target = !1, e.zombieTarget = void 0, e.policeState = ue.standing, e.timer.attack = this.attackSpeed, e.scale.set(Math.random() > .5 ? this.scaling : -1 * this.scaling, this.scaling), this.police.push(e), g.addChild(e), this.gameModel.level >= this.policeDogLevel && Math.random() > .5 && this.createPoliceDog(e, s)
            }
            this.isExtraPolice() && this.gameModel.sendMessage("Warning: High Police Activity!")
        }
        createPoliceDog(e, t) {
            let s;
            this.discardedPolice.length > 0 ? (s = this.discardedPolice.pop(), s.alpha = 1, s.textures = this.dogTexture) : s = new Me(this.dogTexture), s.reset(), s.owner = e, s.flags.dog = !0, s.flags.dead = !1, s.flags.infected = !1, s.flags.burning = !1, s.burnDamage = 0, s.plagueDamage = 0, s.plagueTicks = 0, s.deadTexture = this.deadDogTexture, s.animationSpeed = .15, s.anchor.set(.5, 1), s.position.set(e.position.x + 3, e.position.y), s.zIndex = s.position.y, s.xSpeed = 0, s.ySpeed = 0, s.speedMod = 1, s.lastKnownBuilding = null, s.timer.plagueTick = Math.random() * this.humans.plagueTickTimer, s.maxSpeed = this.maxRunSpeed, s.visionDistance = this.visionDistance, s.visible = !0, s.maxHealth = s.health = t, s.timer.scan = Math.random() * this.humans.scanTime, s.target = e, s.zombieTarget = null, s.policeState = ue.following, s.followTimer = 0, s.timer.attack = this.attackSpeed, s.scale.set(Math.random() > .5 ? this.dogScaling : -1 * this.dogScaling, this.dogScaling), this.police.push(s), g.addChild(s)
        }
        update(e, t) {
            let s = 0;
            for (let i = 0; i < this.police.length; i++) this.police[i].flags.dog ? this.updatePoliceDog(this.police[i], e, t) : this.updatePolice(this.police[i], e, t), this.police[i].flags.dead || (this.humans.aliveHumans.push(this.police[i]), s++);
            this.gameModel.stats.police.count = s
        }
        decideStateOnZombieDistance(e) {
            if (e.zombieTarget && !e.zombieTarget.flags.dead) {
                e.target = e.zombieTarget;
                const t = i(e.position.x, e.position.y, e.zombieTarget.x, e.zombieTarget.y);
                if (t > this.shootDistance) return void this.changeState(e, ue.running);
                if (t < this.attackDistance) return void this.changeState(e, ue.attacking);
                this.changeState(e, ue.shooting)
            }
        }
        changeState(e, t) {
            switch (t) {
                case ue.standing:
                    e.gotoAndStop(0);
                    break;
                case ue.walking:
                    e.play(), e.maxSpeed = this.maxWalkSpeed;
                    break;
                case ue.running:
                    e.play(), e.maxSpeed = this.maxRunSpeed;
                    break;
                case ue.shooting:
                    e.gotoAndStop(0);
                    break;
                case ue.attacking:
                    e.play()
            }
            e.policeState = t
        }
        radioForBackup(e) {
            let t = null,
                s = 2e3;
            for (let a = 0; a < this.police.length; a++)
                if (!this.police[a].flags.dead && !this.police[a].flags.dog && (!this.police[a].zombieTarget || this.police[a].zombieTarget.flags.dead)) {
                    const r = i(e.x, e.y, this.police[a].x, this.police[a].y);
                    r < s && (t = this.police[a], s = r)
                } t && (t.zombieTarget = e.zombieTarget, this.exclamations.newRadio(e), this.exclamations.newRadio(t), e.radioTime = this.radioTime, t.radioTime = this.radioTime)
        }
        updatePolice(e, t, s) {
            if (e.flags.dead) return this.humans.updateDeadHumanFading(e, t);
            switch (e.timer.attack -= t, e.timer.scan -= t, e.radioTime -= t, e.flags.infected && this.humans.updatePlague(e, t), e.flags.burning && this.humans.updateBurns(e, t), (!e.zombieTarget || e.zombieTarget.flags.dead) && e.timer.scan < 0 && (this.humans.scanForZombies(e, s), e.zombieTarget && !e.zombieTarget.flags.dead && e.radioTime < 0 && this.radioForBackup(e)), this.decideStateOnZombieDistance(e), e.policeState) {
                case ue.standing:
                    e.timer.standing -= t, e.timer.standing < 0 && (this.humans.assignRandomTarget(e), this.changeState(e, ue.walking));
                    break;
                case ue.walking:
                    i(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.target = !1, e.zombieTarget = null, e.timer.standing = this.humans.randomSecondsToStand(), this.changeState(e, ue.standing)) : this.humans.updateHumanSpeed(e, t);
                    break;
                case ue.running:
                    e.zombieTarget && !e.zombieTarget.flags.dead ? e.target && this.humans.updateHumanSpeed(e, t) : this.changeState(e, ue.standing);
                    break;
                case ue.attacking:
                    e.zombieTarget && !e.zombieTarget.flags.dead ? (e.scale.x = e.zombieTarget.x > e.x ? this.scaling : -this.scaling, e.timer.attack < 0 && (this.zombies.damageZombie(e.zombieTarget, this.attackDamage, e), e.timer.attack = this.attackSpeed)) : this.changeState(e, ue.standing);
                    break;
                case ue.shooting:
                    e.zombieTarget && !e.zombieTarget.flags.dead ? (e.scale.x = e.zombieTarget.x > e.x ? this.scaling : -this.scaling, e.timer.attack < 0 && (this.bullets.newBullet(e, e.zombieTarget, this.attackDamage), e.timer.attack = this.attackSpeed)) : this.changeState(e, ue.standing)
            }
        }
        updateDogSpeed(e, t) {
            this.humans.updateHumanSpeed(e, t), Math.abs(e.xSpeed) > 1 && (e.scale.x = e.xSpeed > 0 ? this.dogScaling : -this.dogScaling)
        }
        updatePoliceDog(e, t, s) {
            if (e.flags.dead) return this.humans.updateDeadHumanFading(e, t);
            switch (e.timer.attack -= t, e.timer.scan -= t, e.flags.infected && this.humans.updatePlague(e, t), e.flags.burning && this.humans.updateBurns(e, t), e.policeState) {
                case ue.following:
                    if (e.owner.flags.dead) {
                        e.policeState = ue.hunting, e.play();
                        break
                    }
                    if (e.owner.zombieTarget && !e.owner.zombieTarget.flags.dead) {
                        e.policeState = ue.attacking, e.play(), e.target = e.owner.zombieTarget;
                        break
                    }
                    e.target = e.owner, i(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.followTimer = 3 * Math.random(), e.gotoAndStop(0)) : (e.followTimer -= t, e.followTimer < 0 && (e.play(), this.updateDogSpeed(e, t)));
                    break;
                case ue.attacking:
                    e.zombieTarget && !e.zombieTarget.flags.dead ? i(e.position.x, e.position.y, e.zombieTarget.x, e.zombieTarget.y) < this.moveTargetDistance ? (e.scale.x = e.target.x > e.x ? this.dogScaling : -this.dogScaling, e.timer.attack < 0 && (this.zombies.damageZombie(e.zombieTarget, this.attackDamage, e), e.target.dogStun = 1, e.timer.attack = this.attackSpeed)) : (e.target = e.zombieTarget, this.updateDogSpeed(e, t)) : e.policeState = ue.following;
                    break;
                case ue.hunting:
                    (!e.zombieTarget || e.zombieTarget.flags.dead) && e.timer.scan < 0 && (this.humans.scanForZombies(e, s), e.zombieTarget && (e.policeState = ue.attacking)), i(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.target = {
                        x: Math.random() * P.x,
                        y: Math.random() * P.y
                    }, e.maxSpeed = this.maxRunSpeed) : this.updateDogSpeed(e, t)
            }
        }
    }
    class we extends ve {
        constructor() {
            super(...arguments), this.minigun = !1, this.rocketlauncher = !1, this.attackingGraveyard = !1, this.shotsLeft = 0, this.shotTimer = 0
        }
    } ! function (e) {
        e[e.shooting = 0] = "shooting", e[e.attacking = 1] = "attacking", e[e.walking = 2] = "walking", e[e.running = 3] = "running", e[e.standing = 4] = "standing"
    }(pe || (pe = {}));
    class Te {
        constructor() {
            if (this.maxWalkSpeed = 20, this.maxRunSpeed = 50, this.armymen = [], this.discardedArmymen = [], this.textures = [], this.aliveZombies = [], this.armyPerLevel = .9, this.attackSpeed = 2, this.attackDamage = 20, this.attackDistance = 25, this.moveTargetDistance = 5, this.shootDistance = 130, this.visionDistance = 200, this.scaling = 2, this.shotsPerBurst = 3, this.droneStrikeTimer = 0, this.droneStrikeTime = 35, this.assaultStarted = !1, this.droneStrike = null, this.droneActive = !1, this.droneBlastRadius = 35, Te.instance) return Te.instance;
            Te.instance = this
        }
        isExtraArmy() {
            return this.gameModel.level % 20 == 0
        }
        getMaxArmy() {
            const e = Math.min(Math.round(this.armyPerLevel * this.gameModel.level), 100);
            return this.gameModel.level < 11 ? 0 : this.isExtraArmy() ? Math.max(2 * e, 150) : this.gameModel.isBossStage(this.gameModel.level) ? Math.max(e, 75) : e
        }
        getMaxHealth() {
            return Math.round(1.2 * this.humans.getMaxHealth(this.gameModel.level))
        }
        getAttackDamage() {
            this.attackDamage = Math.round(this.getMaxHealth() / 10)
        }
        populate() {
            if (this.map = new ee, this.zombies = new Ae, this.humans = new Se, this.gameModel = ne.getInstance(), this.graveyard = new Oe, this.bullets = new rt, this.assaultStarted = !1, this.blasts = new nt, this.exclamations = new it, 0 == this.textures.length)
                for (let e = 0; e < 3; e++) {
                    const t = [];
                    for (let s = 0; s < 3; s++) t.push(PIXI.Texture.from("army" + (e + 1) + "_" + (s + 1) + ".png"));
                    this.textures.push({
                        animated: t,
                        dead: [PIXI.Texture.from("army" + (e + 1) + "_dead.png")]
                    })
                }
            if (this.droneStrike && this.droneStrike.laser && (b.removeChild(this.droneStrike.text), b.removeChild(this.droneStrike.laser)), this.armymen.length > 0) {
                for (let e = 0; e < this.armymen.length; e++) g.removeChild(this.armymen[e]);
                this.discardedArmymen = this.armymen.slice(), this.armymen = []
            }
            const e = this.getMaxArmy(),
                t = this.getMaxHealth();
            this.getAttackDamage(), this.droneStrike = !1, this.droneStrikeTimer = Math.random() * this.droneStrikeTime, this.droneActive = this.gameModel.level >= 25;
            for (let s = 0; s < e; s++) {
                let e, s = 0;
                this.gameModel.level > 35 && Math.random() < .3 && (s = 1), (this.gameModel.level > 45 && Math.random() < .3 || this.gameModel.isBossStage(this.gameModel.level) && Math.random() < .5) && (s = 2), this.discardedArmymen.length > 0 ? (e = this.discardedArmymen.pop(), e.alpha = 1, e.textures = this.textures[s].animated) : e = new we(this.textures[s].animated), e.reset(), e.flags.dead = !1, e.flags.infected = !1, e.flags.burning = !1, e.burnDamage = 0, e.plagueDamage = 0, e.minigun = 1 == s, e.rocketlauncher = 2 == s, e.deadTexture = this.textures[s].dead, e.animationSpeed = .2, e.anchor.set(35 / 80, 1), e.currentPoi = this.map.getRandomBuilding(), e.position.copyFrom(this.map.randomPositionInBuilding(e.currentPoi)), e.zIndex = e.position.y, e.xSpeed = 0, e.ySpeed = 0, e.speedMod = 1, e.lastKnownBuilding = null, e.maxSpeed = this.maxWalkSpeed, e.visionDistance = this.visionDistance, e.visible = !0, e.maxHealth = e.health = t, e.timer.attack = this.attackSpeed, e.timer.plagueTick = Math.random() * this.humans.plagueTickTimer, e.timer.scan = Math.random() * this.humans.scanTime, e.timer.standing = Math.random() * this.humans.randomSecondsToStand(), e.target = !1, e.zombieTarget = null, e.graveYardTarget = null, e.armyState = pe.standing, e.attackingGraveyard = !1, e.scale.set(Math.random() > .5 ? this.scaling : -1 * this.scaling, this.scaling), this.armymen.push(e), g.addChild(e)
            }
            this.isExtraArmy() && this.gameModel.sendMessage("Warning: High Military Activity!")
        }
        update(e, t) {
            let s = 0;
            this.aliveZombies = t, this.droneActive && (this.droneStrikeTimer -= e);
            for (let i = 0; i < this.armymen.length; i++) this.updateArmy(this.armymen[i], e, t), this.armymen[i].flags.dead || (this.humans.aliveHumans.push(this.armymen[i]), this.armymen[i].attackingGraveyard && this.humans.graveyardAttackers.push(this.armymen[i]), s++);
            this.gameModel.stats.army.count = s, this.updateDroneStrike(e, t)
        }
        decideStateOnZombieDistance(e) {
            var t;
            if (e.graveYardTarget || e.zombieTarget && !e.zombieTarget.flags.dead) {
                e.target = null !== (t = e.graveYardTarget) && void 0 !== t ? t : e.zombieTarget;
                const s = i(e.position.x, e.position.y, e.target.x, e.target.y);
                if (s > this.shootDistance && !e.rocketlauncher) return void this.changeState(e, pe.running);
                if (s > 1.2 * this.shootDistance && e.rocketlauncher) return void this.changeState(e, pe.running);
                if (s < this.attackDistance && !e.graveYardTarget) return void this.changeState(e, pe.attacking);
                this.changeState(e, pe.shooting)
            }
        }
        changeState(e, t) {
            switch (t) {
                case pe.standing:
                    e.gotoAndStop(0);
                    break;
                case pe.walking:
                    e.play(), e.maxSpeed = this.maxWalkSpeed;
                    break;
                case pe.running:
                    e.play(), e.maxSpeed = this.maxRunSpeed;
                    break;
                case pe.shooting:
                    e.gotoAndStop(0);
                    break;
                case pe.attacking:
                    e.play()
            }
            e.armyState = t
        }
        updateArmy(e, t, s) {
            var a, r;
            if (e.flags.dead) return this.humans.updateDeadHumanFading(e, t);
            switch (e.timer.attack -= t, e.timer.scan -= t, e.flags.infected && this.humans.updatePlague(e, t), e.flags.burning && this.humans.updateBurns(e, t), !e.graveYardTarget && (!e.zombieTarget || e.zombieTarget.flags.dead) && e.timer.scan < 0 && (this.humans.scanForZombies(e, s) > 3 && this.droneActive && this.droneStrikeTimer < 0 && this.callDroneStrike(e, s), this.assaultStarted && e.rocketlauncher && Math.random() > .98 && (e.graveYardTarget = this.graveyard.target, e.attackingGraveyard = !0)), this.decideStateOnZombieDistance(e), e.armyState) {
                case pe.standing:
                    e.timer.standing -= t, e.timer.standing < 0 && (this.humans.assignRandomTarget(e), this.changeState(e, pe.walking));
                    break;
                case pe.walking:
                    i(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.target = null, e.zombieTarget = null, e.timer.standing = this.humans.randomSecondsToStand(), this.changeState(e, pe.standing)) : this.humans.updateHumanSpeed(e, t);
                    break;
                case pe.running:
                    e.graveYardTarget || e.zombieTarget && !e.zombieTarget.flags.dead ? (e.target = null !== (a = e.graveYardTarget) && void 0 !== a ? a : e.zombieTarget, this.humans.updateHumanSpeed(e, t)) : this.changeState(e, pe.standing);
                    break;
                case pe.attacking:
                    e.zombieTarget && !e.zombieTarget.flags.dead ? (e.scale.x = e.zombieTarget.x > e.x ? this.scaling : -this.scaling, e.timer.attack < 0 && (this.zombies.damageZombie(e.zombieTarget, this.attackDamage, e), e.timer.attack = this.attackSpeed)) : this.changeState(e, pe.standing);
                    break;
                case pe.shooting:
                    e.graveYardTarget || e.zombieTarget && !e.zombieTarget.flags.dead ? (e.target = null !== (r = e.graveYardTarget) && void 0 !== r ? r : e.zombieTarget, e.scale.x = e.target.x > e.x ? this.scaling : -this.scaling, e.timer.attack < 0 && (e.shotsLeft = this.shotsPerBurst, e.minigun && (e.shotsLeft = 3 * this.shotsPerBurst), e.rocketlauncher && (e.shotsLeft = 1), e.timer.attack = e.rocketlauncher ? 1.5 * this.attackSpeed : this.attackSpeed, e.shotTimer = 0), e.shotsLeft > 0 && (e.shotTimer -= t, e.shotTimer < 0 && (e.shotTimer = .15, e.minigun && (e.shotTimer = .08), this.bullets.newBullet(e, e.target, e.rocketlauncher ? 1.2 * this.attackDamage : e.minigun ? this.attackDamage / 2 : this.attackDamage, !1, e.rocketlauncher), e.shotsLeft--))) : this.changeState(e, pe.standing)
            }
        }
        callDroneStrike(e, t) {
            let s = 0;
            for (let i = 0; i < t.length; i++) t[i].x > e.zombieTarget.x - this.droneBlastRadius && t[i].x < e.zombieTarget.x + this.droneBlastRadius && t[i].y > e.zombieTarget.y - this.droneBlastRadius && t[i].y < e.zombieTarget.y + this.droneBlastRadius && s++;
            let i = 0;
            const a = this.humans.aliveHumans;
            for (let t = 0; t < a.length; t++) a[t].x > e.zombieTarget.x - this.droneBlastRadius && a[t].x < e.zombieTarget.x + this.droneBlastRadius && a[t].y > e.zombieTarget.y - this.droneBlastRadius && a[t].y < e.zombieTarget.y + this.droneBlastRadius && i++;
            s > 1 && 0 == i && (this.exclamations.newRadio(e), this.droneStrikeTimer = this.droneStrikeTime, this.droneStrike = {
                caller: e,
                target: e.zombieTarget,
                timer: 3,
                bombsLeft: 3
            })
        }
        droneBomb(e) {
            this.droneExplosion(this.droneStrike.target.x + 32 * (Math.random() - 1), this.droneStrike.target.y + 32 * (Math.random() - 1), e, 3 * this.attackDamage), this.droneStrike.timer = .3, this.droneStrike.bombsLeft--
        }
        droneExplosion(e, t, s, i) {
            s || (s = this.aliveZombies), this.blasts.newDroneBlast(e, t);
            for (let a = 0; a < s.length; a++) s[a].x > e - this.droneBlastRadius && s[a].x < e + this.droneBlastRadius && s[a].y > t - this.droneBlastRadius && s[a].y < t + this.droneBlastRadius && this.zombies.damageZombie(s[a], i, null)
        }
        updateDroneStrike(e, t) {
            if (this.droneStrike) {
                if (this.droneStrike.timer -= e, this.droneStrike.startedBombing || (this.droneStrike.text || (this.droneStrike.text = new PIXI.Text("3", {
                    fontFamily: "sans-serif",
                    fontSize: 40,
                    fill: "#F00",
                    stroke: "#000",
                    strokeThickness: 0,
                    align: "center"
                }), this.droneStrike.text.anchor = {
                    x: .5,
                    y: 1
                }, this.droneStrike.text.scale.x = .5, this.droneStrike.text.scale.y = .5, b.addChild(this.droneStrike.text), this.droneStrike.laser = new PIXI.Graphics, b.addChild(this.droneStrike.laser)), this.droneStrike.text.text = Math.ceil(this.droneStrike.timer), this.droneStrike.text.x = this.droneStrike.target.x, this.droneStrike.text.y = this.droneStrike.target.y - 30, this.droneStrike.laser.clear(), this.droneStrike.laser.lineStyle(1, 16711680), this.droneStrike.laser.moveTo(this.droneStrike.caller.x, this.droneStrike.caller.y - 10), this.droneStrike.laser.lineTo(this.droneStrike.target.x, this.droneStrike.target.y - 10)), (this.droneStrike.caller.dead || this.droneStrike.target.dead) && !this.droneStrike.startedBombing) return b.removeChild(this.droneStrike.text), b.removeChild(this.droneStrike.laser), this.droneStrike = !1, void (this.droneStrikeTimer = 0);
                this.droneStrike.timer < 0 && (this.droneStrike.startedBombing || (b.removeChild(this.droneStrike.text), b.removeChild(this.droneStrike.laser), this.droneStrike.startedBombing = !0), this.droneBomb(t), this.droneStrike.bombsLeft <= 0 && (this.droneStrike = !1))
            }
        }
    }
    class Ce extends ve {
        constructor() {
            super(...arguments), this.attackingGraveyard = !1
        }
    } ! function (e) {
        e[e.shooting = 0] = "shooting", e[e.attacking = 1] = "attacking", e[e.patrolling = 2] = "patrolling"
    }(ge || (ge = {})),
        function (e) {
            e[e.horizontal = 0] = "horizontal", e[e.vertical = 1] = "vertical"
        }(me || (me = {}));
    class De {
        constructor() {
            if (this.speed = 20, this.tanks = [], this.aliveTanks = [], this.attackDamage = 0, this.attackSpeed = 3, this.scaling = 3, this.moveTargetDistance = 20, this.shootDistance = 300, this.aliveZombies = null, De.instance) return De.instance;
            De.instance = this
        }
        getMaxTanks() {
            return this.gameModel.isBossStage(this.gameModel.level) ? Math.min(Math.round(this.gameModel.level / 30), 20) : 0
        }
        getMaxHealth() {
            return Math.round(10 * this.humans.getMaxHealth(this.gameModel.level))
        }
        getAttackDamage() {
            this.attackDamage = Math.round(this.getMaxHealth() / 10)
        }
        populate() {
            if (this.map = new ee, this.gameModel = ne.getInstance(), this.zombies = new Ae, this.humans = new Se, this.army = new Te, this.graveyard = new Oe, this.bullets = new rt, !this.textures) {
                this.textures = {
                    vertical: [],
                    horizontal: [],
                    turret: null
                };
                for (let e = 0; e < 2; e++) this.textures.horizontal.push(PIXI.Texture.from("tank" + e + ".png"));
                for (let e = 2; e < 4; e++) this.textures.vertical.push(PIXI.Texture.from("tank" + e + ".png"));
                this.textures.turret = PIXI.Texture.from("tank4.png")
            }
            if (this.tanks.length > 0) {
                for (let e = 0; e < this.tanks.length; e++) g.removeChild(this.tanks[e]);
                this.tanks = [], this.aliveTanks = []
            }
            const e = this.getMaxTanks(),
                t = this.getMaxHealth();
            this.getAttackDamage();
            for (let s = 0; s < e; s++) {
                const e = new Ce(this.textures.horizontal);
                e.flags.tank = !0, e.turretSprite = new PIXI.Sprite(this.textures.turret), e.addChild(e.turretSprite), e.animationSpeed = .2, e.anchor.set(.5, 1), e.turretSprite.anchor.set(7.5 / 16, 7.5 / 16), e.x = 0, e.y = 0, e.play(), e.turretSprite.x = 0, e.turretSprite.y = -7, e.currentDirection = me.horizontal, e.currentPoi = this.map.getRandomBuilding(), e.position.copyFrom(this.map.randomPositionInBuilding(e.currentPoi)), e.zIndex = e.position.y, e.xSpeed = 0, e.ySpeed = 0, e.speedMod = 1, e.flags.dead = !1, e.flags.infected = !1, e.flags.burning = !1, e.burnDamage = 0, e.lastKnownBuilding = null, e.plagueDamage = 0, e.timer.plagueTick = Math.random() * this.humans.plagueTickTimer, e.maxSpeed = this.speed, e.visionDistance = 250, e.visible = !0, e.maxHealth = e.health = t, e.timer.scan = Math.random() * this.humans.scanTime, e.target = !1, e.zombieTarget = null, e.graveYardTarget = null, e.attackingGraveyard = !1, e.tankState = ge.patrolling, e.timer.attack = this.attackSpeed, e.scale.set(this.scaling, this.scaling), this.tanks.push(e), g.addChild(e)
            }
        }
        update(e, t) {
            this.aliveZombies = t, this.aliveTanks = [];
            for (let s = 0; s < this.tanks.length; s++) this.updateTank(this.tanks[s], e, t), this.tanks[s].flags.dead || (this.humans.aliveHumans.push(this.tanks[s]), this.aliveTanks.push(this.tanks[s]), this.tanks[s].attackingGraveyard && this.humans.graveyardAttackers.push(this.tanks[s]))
        }
        updateTank(e, t, s) {
            if (e.flags.dead) return this.humans.updateDeadHumanFading(e, t);
            switch (e.timer.attack -= t, e.timer.scan -= t, e.flags.burning && this.humans.updateBurns(e, t), !e.attackingGraveyard && (!e.zombieTarget || e.zombieTarget.flags.dead) && e.timer.scan < 0 && (this.humans.scanForZombies(e, s), this.army.assaultStarted && Math.random() > .9 && (e.graveYardTarget = this.graveyard.target, e.attackingGraveyard = !0)), this.decideStateOnZombieDistance(e), e.tankState) {
                case ge.patrolling:
                    e.target || (e.target = this.map.randomPositionInBuilding(null)), i(e.position.x, e.position.y, e.target.x, e.target.y) < this.moveTargetDistance ? (e.target = !1, e.zombieTarget = null) : this.humans.updateHumanSpeed(e, t);
                    break;
                case ge.attacking:
                    e.attackingGraveyard ? (e.target = e.graveYardTarget, this.humans.updateHumanSpeed(e, t)) : e.zombieTarget && !e.zombieTarget.flags.dead ? this.humans.updateHumanSpeed(e, t) : this.changeState(e, ge.patrolling);
                    break;
                case ge.shooting:
                    e.graveYardTarget || e.zombieTarget && !e.zombieTarget.flags.dead ? e.timer.attack < 0 && (e.timer.attack = this.attackSpeed, this.bullets.newBullet(e, e.graveYardTarget || e.zombieTarget, this.attackDamage, !1, !0)) : this.changeState(e, ge.patrolling)
            }
            this.updateTankSprites(e, t)
        }
        updateTankSprites(e, t) {
            var s;
            if (Math.abs(e.xSpeed) > Math.abs(e.ySpeed) ? e.currentDirection != me.horizontal && (e.currentDirection = me.horizontal, e.textures = this.textures.horizontal, e.play(), e.turretSprite.y = -7) : e.currentDirection != me.vertical && (e.currentDirection = me.vertical, e.textures = this.textures.vertical, e.play(), e.turretSprite.y = -8), e.graveYardTarget || e.zombieTarget) {
                e.target = null !== (s = e.graveYardTarget) && void 0 !== s ? s : e.zombieTarget;
                const i = Math.atan2(e.target.x - e.x, e.y - e.target.y) + Math.PI / 2;
                e.turretSprite.rotation > i ? e.turretSprite.rotation -= 3 * t : e.turretSprite.rotation += 3 * t
            }
        }
        decideStateOnZombieDistance(e) {
            var t;
            if (e.graveYardTarget || e.zombieTarget && !e.zombieTarget.flags.dead) {
                if (e.target = null !== (t = e.graveYardTarget) && void 0 !== t ? t : e.zombieTarget, i(e.position.x, e.position.y, e.target.x, e.target.y) > this.shootDistance) return void this.changeState(e, ge.attacking);
                this.changeState(e, ge.shooting)
            }
        }
        changeState(e, t) {
            switch (t) {
                case ge.patrolling:
                case ge.attacking:
                    e.play();
                    break;
                case ge.shooting:
                    e.gotoAndStop(0)
            }
            e.tankState = t
        }
    }
    class Pe extends Q {
        constructor() {
            super(...arguments), this.currentDirection = 0, this.bulletReflect = 0, this.zombieId = 0, this.lastKnownBuilding = null, this.maxSpeed = 0, this.graveyard = !1, this.regenTimer = 0, this.bloodbornTimer = 0, this.level = 0, this.creatureType = 0, this.scaling = 0, this.attackDamage = 0, this.speedMultiplier = 1, this.price = 0, this.immuneToBurns = !1, this.zombie = !0, this.textureSet = {
                set: !1,
                down: [],
                up: [],
                left: [],
                right: [],
                dead: []
            }
        }
    } ! function (e) {
        e[e.lookingForTarget = 0] = "lookingForTarget", e[e.movingToTarget = 1] = "movingToTarget", e[e.attackingTarget = 2] = "attackingTarget"
    }(be || (be = {}));
    class ze extends PIXI.Text {
        constructor() {
            super(...arguments), this.speed = 30, this.fadeTime = .5
        }
        updateCritText(e) {
            this.visible && (this.y -= this.speed * e, this.fadeTime -= e, this.fadeTime < 0 && (this.alpha -= 2 * e, this.alpha < 0 && (this.visible = !1, Re.push(this))))
        }
        reset() {
            this.fadeTime = .5, this.alpha = 1, this.visible = !0
        }
    }
    const Ie = new PIXI.TextStyle({
        fill: "#ef0",
        fontSize: 64
    }),
        Be = [],
        Re = [];

    function He(e, t, s) {
        if (ne.getInstance().persistentData.particles)
            if (Re.length > 0) {
                const i = Re.pop();
                i.reset(), i.text = r(s), i.position.set(e, t)
            } else {
                const i = new ze(r(s), Ie);
                b.addChild(i), i.position.set(e, t), i.anchor.set(.5, 1), i.scale.set(.2, .2), Be.push(i)
            }
    }
    class Fe extends K {
        constructor() {
            super(...arguments), this.dog = !1, this.super = !1
        }
    }
    class Ee extends Pe {
        constructor() {
            super(...arguments), this.flags = new Fe, this.mod = 1, this.scaleMod = 1, this.textureId = 0, this.turnTimer = 0
        }
    }
    class Ae {
        constructor() {
            if (this.zombies = [], this.discardedZombies = [], this.aliveZombies = [], this.aliveHumans = [], this.zombiePartition = [], this.scaling = 2, this.moveTargetDistance = 15, this.attackDistance = 15, this.attackSpeed = 3, this.targetDistance = 100, this.fadeSpeed = .1, this.refundChance = 0, this.currId = 1, this.scanTime = 3, this.textures = [], this.dogTexture = [], this.deadDogTexture = [], this.maxSpeed = 10, this.zombieCursor = null, this.zombieCursorText = null, this.zombieCursorScale = 3, this.mouseOutOfBounds = !1, this.burnTickTimer = 5, this.bloodpact = 1, this.bloodborn = 0, this.gigamutagen = 0, this.gigamutationTimer = 10, this.smokeTimer = .3, this.fastDistance = i, this.magnitude = t, this.detonate = !1, this.super = !1, this.reactionTime = 0, this.graveyardAttackers = [], this.spaceNeeded = 3, Ae.instance) return Ae.instance;
            Ae.instance = this
        }
        populate() {
            if (this.map = new ee, this.model = ne.getInstance(), this.humans = new Se, this.graveyard = new Oe, this.creatureFactory = new ae, this.smoke = new ot, this.blood = new _e, this.bones = new tt, this.exclamations = new it, this.blasts = new nt, this.bullets = new rt, this.model.zombieCount = 0, 0 == this.textures.length) {
                for (let e = 0; e < 3; e++) {
                    const t = [];
                    for (let s = 0; s < 3; s++) t.push(PIXI.Texture.from("zombie" + (e + 1) + "_" + (s + 1) + ".png"));
                    this.textures.push({
                        animated: t,
                        dead: [PIXI.Texture.from("zombie" + (e + 1) + "_dead.png")]
                    })
                }
                for (let e = 0; e < 2; e++) this.dogTexture.push(PIXI.Texture.from("zombiedog" + (e + 1) + ".png"));
                this.deadDogTexture = [PIXI.Texture.from("zombiedogdead.png")]
            }
            if (this.zombies.length > 0) {
                for (let e = 0; e < this.zombies.length; e++) g.removeChild(this.zombies[e]), this.zombies[e].stop();
                this.discardedZombies = this.zombies.slice(), this.zombies.length = 0, this.aliveZombies.length = 0
            }
            if (!this.zombieCursor) {
                this.zombieCursor = new PIXI.Container;
                const e = new PIXI.Sprite(PIXI.Texture.from("zombie1_1.png"));
                e.alpha = .6, e.scale.x = e.scale.y = 1, e.anchor.set(35 / 80, 1), this.zombieCursorText = new PIXI.Text("1", {
                    fontFamily: "sans-serif",
                    fontSize: 40,
                    fill: "#FFF",
                    stroke: "#000",
                    strokeThickness: 0,
                    align: "center"
                }), this.zombieCursorText.anchor = {
                    x: .5,
                    y: 1
                }, this.zombieCursorText.scale.x = this.zombieCursorText.scale.y = .1, this.zombieCursorText.y = -9, this.zombieCursorText.visible = !1, this.zombieCursorText.alpha = .7, this.zombieCursor.addChild(e), this.zombieCursor.addChild(this.zombieCursorText), m.addChild(this.zombieCursor)
            }
        }
        createZombie(e, t, s = !1) {
            const i = Math.floor(Math.random() * this.textures.length);
            let a;
            this.discardedZombies.length > 0 ? (a = this.discardedZombies.pop(), a.textures = s ? this.dogTexture : this.textures[i].animated) : a = new Ee(s ? this.dogTexture : this.textures[i].animated), a.zombie = !0, a.mod = 1, a.scaleMod = 1, this.super && (a.mod = 10, a.scaleMod = 1.5), a.flags = new Fe, a.flags.dog = s, a.flags.super = this.super, a.deadTexture = a.flags.dog ? this.deadDogTexture : this.textures[i].dead, a.textureId = i, a.burnDamage = 0, a.lastKnownBuilding = !1, a.alpha = 1, a.animationSpeed = .15, a.anchor.set(35 / 80, 1), a.bloodbornTimer = this.bloodborn, a.position.set(e, t), a.target = null, a.zIndex = a.position.y, a.visible = !0, a.maxHealth = a.health = this.model.zombieHealth * a.mod, a.regenTimer = 5, a.state = be.lookingForTarget;
            const r = s ? .7 : 1;
            a.scaling = a.scaleMod * this.scaling * r, a.scale.set(Math.random() > .5 ? a.scaling : -1 * a.scaling, a.scaling), a.timer.attack = 0, a.xSpeed = 0, a.ySpeed = 0, a.speedMultiplier = 1, a.timer.scan = 0, a.timer.burnTick = this.burnTickTimer, a.timer.smoke = this.smokeTimer, a.play(), a.zombieId = this.currId++, this.zombies.push(a), g.addChild(a), this.smoke.newZombieSpawnCloud(e, t - 2)
        }
        spawnZombie(e, t) {
            this.model.energy < this.model.zombieCost || (this.model.energy -= this.model.zombieCost, this.createZombie(e, t, !1))
        }
        spawnAllZombies(e, t) {
            const s = Math.min(Math.floor(this.model.energy / this.model.zombieCost), 100);
            for (let i = 0; i < s; i++) this.spawnZombie(e + 4 * (Math.random() - 1), t + 4 * (Math.random() - 1))
        }
        damageZombie(e, t, s) {
            if (e.graveyard) this.graveyard.damageGraveyard(t);
            else {
                if (e.boneshield) return e.boneshield--, void this.bones.newPart(e.x, e.y, 1);
                this.graveyard.isWithinFence(e) && (t *= .5, this.exclamations.newShield(e)), e.bloodbornTimer > 0 && (t *= .5, this.exclamations.newShield(e)), s && s.flags.infected && (t *= this.model.plagueDmgReduction), e.health -= t * this.model.runeEffects.damageReduction, this.setSpeedMultiplier(e), this.blood.newSplatter(e.x, e.y), e.health <= 0 && !e.flags.dead && (this.bones.newBones(e.x, e.y), e.flags.dead = !0, e.flags.golem && this.refundChance > 0 && (this.model.sendMessage("Golem Refunded!"), this.creatureFactory.refundParts(e, this.refundChance)), Math.random() < this.model.infectedBlastChance && this.causePlagueExplosion(e, .2 * e.maxHealth, !0, !1), e.textures = e.deadTexture, e.gotoAndStop(0), Math.random() < this.model.brainRecoverChance && this.model.addBrains(1)), s && this.model.runeEffects.damageReflection > 0 && this.humans.damageHuman(s, t * this.model.runeEffects.damageReflection)
            }
        }
        causePlagueExplosion(e, t, s = !0, i = !1) {
            const a = i ? 75 : 50;
            this.blood.newPlagueSplatter(e.x, e.y), i ? this.blasts.newDetonateBlast(e.x, e.y - 4) : this.blasts.newZombieBlast(e.x, e.y - 4), s && (e.visible = !1, g.removeChild(e));
            for (let s = 0; s < this.aliveHumans.length; s++) Math.abs(this.aliveHumans[s].x - e.x) < a && Math.abs(this.aliveHumans[s].y - e.y) < a && this.fastDistance(e.x, e.y, this.aliveHumans[s].x, this.aliveHumans[s].y) < a && (this.inflictPlague(this.aliveHumans[s]), this.humans.damageHuman(this.aliveHumans[s], t));
            if (this.model.blastHealing > 0) {
                const s = t * this.model.blastHealing;
                for (let t = 0; t < this.aliveZombies.length; t++) Math.abs(this.aliveZombies[t].x - e.x) < a && Math.abs(this.aliveZombies[t].y - e.y) < a && this.fastDistance(e.x, e.y, this.aliveZombies[t].x, this.aliveZombies[t].y) < a && this.healZombie(this.aliveZombies[t], s)
            }
        }
        partitionInsert(e, t) {
            const s = Math.round(t.x / 10),
                i = Math.round(t.y / 10);
            e[s] || (e[s] = []), e[s][i] || (e[s][i] = []), e[s][i].push(t)
        }
        partitionGetNeighbours(e) {
            const t = [],
                s = Math.round(e.x / 10),
                i = Math.round(e.y / 10);
            for (let e = s - 1; e <= s + 1; e++)
                if (this.zombiePartition[e])
                    for (let s = i - 1; s <= i + 1; s++) this.zombiePartition[e][s] && t.push(...this.zombiePartition[e][s]);
            return t
        }
        update(e) {
            this.maxSpeed = this.model.zombieSpeed, this.detonate && (this.maxSpeed *= 1.5), this.reactionTime = Math.max(.2, this.aliveZombies.length / 2e3);
            const t = [],
                s = [];
            this.aliveHumans = this.humans.aliveHumans, this.graveyardAttackers = this.humans.graveyardAttackers, this.gigamutagen > 0 && (this.gigamutationTimer -= e);
            for (let i = 0; i < this.zombies.length; i++) this.zombies[i].visible && (this.updateZombie(this.zombies[i], e), this.zombies[i].flags.dead || (t.push(this.zombies[i]), this.partitionInsert(s, this.zombies[i])));
            if (this.model.zombieCount = t.length, this.aliveZombies = t, this.zombiePartition = s, this.model.energy >= this.model.zombieCost && this.model.currentState == this.model.states.playingLevel)
                if (this.zombieCursor.visible = !this.mouseOutOfBounds, Y.shift && !this.mouseOutOfBounds) {
                    this.zombieCursorText.visible = !0;
                    const e = Math.min(Math.floor(this.model.energy / this.model.zombieCost), 100);
                    this.zombieCursorText.text != e && (this.zombieCursorText.text = e)
                } else this.zombieCursorText.visible = !1;
            else this.zombieCursor.visible = !1
        }
        detonateZombie(e) {
            (e.state == be.attackingTarget || 0 == this.aliveHumans.length && Math.random() < .05) && (this.bones.newBones(e.x, e.y), e.flags.dead = !0, this.causePlagueExplosion(e, e.maxHealth, !0, !0), Math.random() < this.model.brainRecoverChance && this.model.addBrains(1))
        }
        updateZombie(e, t) {
            var s;
            if (e.flags.dead) {
                if (!e.visible) return;
                return e.alpha -= this.fadeSpeed * t, void (e.alpha < 0 && (e.visible = !1, g.removeChild(e)))
            }
            switch (1 == e.mod && this.gigamutationTimer < 0 && (e.mod = 10, e.scaling *= 1.5, e.scale.set(e.scaling, e.scaling), e.maxHealth *= 10, e.health *= 10, this.gigamutationTimer = this.gigamutagen, this.smoke.newZombieSpawnCloud(e.x, e.y - 2)), e.bloodbornTimer -= t, e.timer.attack -= t, e.timer.scan -= t, this.model.runeEffects.healthRegen > 0 && this.updateZombieRegen(e, t), this.detonate && this.detonateZombie(e), e.flags.burning && this.updateBurns(e, t), (!e.target || e.target.flags.dead) && e.timer.scan < 0 && (e.state = be.lookingForTarget), e.state) {
                case be.lookingForTarget:
                    this.searchClosestTarget(null !== (s = e.target) && void 0 !== s ? s : e), e.target && !e.target.flags.dead || this.assignRandomTarget(e), e.target && (e.state = be.movingToTarget);
                    break;
                case be.movingToTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    if (s < this.attackDistance) {
                        e.state = be.attackingTarget;
                        break
                    }
                    e.timer.attack < 0 && s < this.model.spitDistance && (this.bullets.newBullet(e, e.target, this.model.zombieDamage / 2, !0), e.timer.attack = this.attackSpeed * (1 / (this.model.runeEffects.attackSpeed * this.model.ShockPCMod))), s > 3 * this.attackDistance && e.timer.scan < 0 && this.searchClosestTarget(e), this.updateZombieSpeed(e, t);
                    break
                }
                case be.attackingTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    s < this.attackDistance ? (e.scale.x = e.target.x > e.x ? e.scaling : -e.scaling, e.timer.attack < 0 && (this.humans.damageHuman(e.target, this.calculateDamage(e)), e.flags.dog && (e.target.timer.dogStun = 1), Math.random() < this.model.infectedBiteChance && this.inflictPlague(e.target), e.timer.attack = this.attackSpeed * (1 / (this.model.runeEffects.attackSpeed * this.model.ShockPCMod)), e.flags.burning && (e.timer.attack *= 1 / this.model.burningSpeedMod)), s > this.attackDistance / 2 && this.updateZombieSpeed(e, t)) : e.state = be.movingToTarget;
                    break
                }
            }
        }
        setSpeedMultiplier(e) {
            e.flags.burning ? e.speedMultiplier = this.model.burningSpeedMod : e.speedMultiplier = Math.max(Math.min(1, e.health / e.maxHealth), .4)
        }
        updateZombieRegen(e, t) {
            e.regenTimer -= t, e.regenTimer < 0 && (e.regenTimer = 5, e.health < e.maxHealth && (e.health += e.maxHealth * this.model.runeEffects.healthRegen, e.health > e.maxHealth && (e.health = e.maxHealth), this.setSpeedMultiplier(e)))
        }
        healZombie(e, t) {
            e.health < e.maxHealth && (e.health += t, this.exclamations.newHealing(e), e.health > e.maxHealth && (e.health = e.maxHealth), this.setSpeedMultiplier(e))
        }
        calculateDamage(e) {
            let t = this.model.zombieDamage * e.mod;
            return this.model.runeEffects.critChance > 0 && Math.random() < this.model.runeEffects.critChance && (t *= this.model.runeEffects.critDamage, He(e.x, e.y - 20, t)), this.bloodpact > 0 && this.model.addBlood(t * this.bloodpact), t
        }
        inflictPlague(e) {
            e.flags.infected ? (e.plagueDamage += this.model.zombieDamage * this.model.PlagueVatPCMod / 2 + this.model.plagueDamageMod, e.plagueTicks = this.model.plagueticks) : (this.exclamations.newPoison(e), e.plagueDamage = this.model.zombieDamage * this.model.PlagueVatPCMod / 2 + this.model.plagueDamageMod, e.plagueTicks = this.model.plagueticks), e.flags.infected = !0
        }
        updateBurns(e, t) {
            e.timer.burnTick -= t, e.timer.smoke -= t, e.timer.smoke < 0 && (this.smoke.newFireSmoke(e.x, e.y - 14), e.timer.smoke = this.smokeTimer), e.timer.burnTick < 0 && (this.damageZombie(e, e.burnDamage, null), e.timer.burnTick = this.burnTickTimer, this.exclamations.newFire(e))
        }
        searchClosestTarget(e) {
            if (e.timer.scan > 0) return;
            e.timer.scan = this.scanTime * Math.random();
            let t = 300;
            if (this.model.isBossStage(this.model.level) && Math.random() > .3)
                for (let s = 0; s < this.graveyardAttackers.length; s++)
                    if (Math.abs(this.graveyardAttackers[s].x - e.x) < t && Math.abs(this.graveyardAttackers[s].y - e.y) < t) {
                        const i = this.fastDistance(e.x, e.y, this.graveyardAttackers[s].x, this.graveyardAttackers[s].y);
                        i < t && (e.target = this.graveyardAttackers[s], t = i)
                    } if (300 == t) {
                        t = 1e4;
                        for (let s = 0; s < this.aliveHumans.length; s++)
                            if (Math.abs(this.aliveHumans[s].x - e.x) < t && Math.abs(this.aliveHumans[s].y - e.y) < t) {
                                const i = this.fastDistance(e.x, e.y, this.aliveHumans[s].x, this.aliveHumans[s].y);
                                i < t && (e.target = this.aliveHumans[s], t = i)
                            }
                    }
        }
        assignRandomTarget(e) {
            if (0 == this.aliveHumans.length) return;
            const t = this.map.findBuilding(e);
            if (t && this.map.isInsidePoi(e.x, e.y, t, 0))
                for (let s = 0; s < this.aliveHumans.length; s++)
                    if (this.map.isInsidePoi(this.aliveHumans[s].x, this.aliveHumans[s].y, t, 0)) return void (e.target = this.aliveHumans[s]);
            e.target = a(this.aliveHumans, Math.random())
        }
        dotProduct(e, t) {
            return e * e + t * t
        }
        updateZombieSpeed(e, t) {
            if (e.timer.dogStun && e.timer.dogStun > 0) return void (e.timer.dogStun -= t);
            if (e.timer.target && e.targetVector || (e.timer.target = 0), e.timer.target -= t, e.timer.target <= 0 && (e.targetVector = this.map.howDoIGetToMyTarget(e, e.target), e.timer.target = this.reactionTime), this.model.gameSpeed > 1 || e.flags.dog) {
                const t = e.flags.dog ? 1.5 : 1,
                    s = Math.max(this.maxSpeed * e.speedMultiplier * t, 8);
                e.xSpeed = e.targetVector.x * s, e.ySpeed = e.targetVector.y * s
            } else {
                const s = 5 * this.maxSpeed * t;
                e.xSpeed += e.targetVector.x * s, e.ySpeed += e.targetVector.y * s;
                const i = this.dotProduct(e.xSpeed, e.ySpeed),
                    a = Math.pow(Math.max(this.maxSpeed * e.speedMultiplier, 8), 2);
                i > a && (e.xSpeed *= a / i, e.ySpeed *= a / i)
            }
            let s = {
                x: e.position.x + e.xSpeed * t,
                y: e.position.y + e.ySpeed * t
            };
            if (e.turnTimer -= t, e.turnTimer < 0 && (e.turnTimer = .5, !this.isSpaceToMove(e, s.x, s.y))) {
                if (Math.random() > .5) {
                    const t = {
                        x: -e.ySpeed / 2 + e.xSpeed / 2,
                        y: e.xSpeed / 2 + e.ySpeed / 2
                    };
                    e.xSpeed = t.x, e.ySpeed = t.y
                } else {
                    const t = {
                        x: e.ySpeed / 2 + e.xSpeed / 2,
                        y: -e.xSpeed / 2 + e.ySpeed / 2
                    };
                    e.xSpeed = t.x, e.ySpeed = t.y
                }
                s = {
                    x: e.position.x + e.xSpeed * t,
                    y: e.position.y + e.ySpeed * t
                }
            }
            const i = this.map.checkCollisions(e.position, s);
            i && (i.x && (e.xSpeed = 0), i.y && (e.ySpeed = 0), s = {
                x: e.position.x + e.xSpeed * t,
                y: e.position.y + e.ySpeed * t
            }, i.x && (s.x = i.validX), i.y && (s.y = i.validY)), e.position.set(s.x, s.y), e.zIndex = e.position.y, e.scale.x = e.xSpeed > 0 ? e.scaling : -e.scaling
        }
        isSpaceToMove(e, t, s) {
            const i = this.partitionGetNeighbours(e);
            for (let a = 0; a < i.length; a++)
                if (i[a].health >= e.health && i[a].zombieId != e.zombieId && Math.abs(i[a].x - t) < this.spaceNeeded && Math.abs(i[a].y - s) < this.spaceNeeded && Math.abs(i[a].x - t) < this.spaceNeeded) return this.fastDistance(t, s, i[a].x, i[a].y) > this.fastDistance(e.x, e.y, i[a].x, i[a].y);
            return !0
        }
    }
    class Le extends Pe {
        constructor() {
            super(...arguments), this.boneshieldTimer = 3, this.boneshield = 0, this.boneshieldContainer = new Ge
        }
    }
    class Ze extends PIXI.Sprite {
        constructor() {
            super(...arguments), this.speed = {
                x: 0,
                y: 0
            }, this.flying = !1
        }
    }
    class Ge extends PIXI.Container {
        constructor() {
            super(...arguments), this.spacing = 2 * Math.PI / 10, this.bones = []
        }
        getTexture() {
            if (this.texture) return this.texture;
            const e = document.createElement("canvas");
            e.width = 4, e.height = 1;
            const t = e.getContext("2d");
            return t.fillStyle = "#dddddd", t.fillRect(0, 0, 4, 1), this.texture = PIXI.Texture.from(e), this.texture
        }
        getBone() {
            const e = new Ze(this.getTexture());
            return e.anchor.set(.5, 20), this.addChild(e), this.bones.push(e), e
        }
        update(e) {
            e > this.bones.length && (this.getBone().rotation = this.spacing * this.bones.length);
            for (let t = 0; t < this.bones.length; t++) this.bones[t].visible = t < e
        }
    }
    class Xe {
        constructor() {
            if (this.skeletons = [], this.aliveSkeletons = [], this.discardedSprites = [], this.aliveHumans = [], this.scaling = 1, this.moveTargetDistance = 15, this.attackDistance = 25, this.attackSpeed = 3, this.targetDistance = 100, this.fadeSpeed = .1, this.currId = 1, this.scanTime = 3, this.spawnTimer = 0, this.respawnTime = 10, this.moveSpeed = 40, this.lastKillingBlow = 0, this.randomSpells = [], this.lootChance = .001, this.spellTimer = 3, this.textures = {
                set: !1,
                up: [],
                down: [],
                left: [],
                right: [],
                dead: []
            }, this.directions = {
                down: 1,
                up: 2,
                right: 3,
                left: 4,
                dead: 5
            }, this.burnTickTimer = 5, this.smokeTimer = .3, this.fastDistance = i, this.magnitude = t, this.damageZombie = null, this.searchClosestTarget = null, this.updateBurns = null, this.updateZombieRegen = null, this.causePlagueExplosion = null, this.inflictPlague = null, this.healZombie = null, this.setSpeedMultiplier = null, this.storageName = "incremancerskele", this.talentsStorageName = "incremancertalents", this.persistent = {
                xpRate: 0,
                skeletons: 0,
                level: 1,
                xp: 0,
                items: [],
                gearSetEquipped: -1,
                gearSets: [],
                currItemId: 0,
                talentReset: !1
            }, this.talents = [], this.talentPoints = 0, this.killingBlowParts = 0, this.lootChanceMod = 1, this.increaseChance = 0, this.darkorb = 0, this.darkorbTimer = 0, this.boneshield = 0, this.aliveZombies = [], this.graveyardAttackers = [], this.lootPositions = {
                helmet: {
                    id: 1,
                    name: "Helmet"
                },
                chest: {
                    id: 2,
                    name: "Chest"
                },
                legs: {
                    id: 3,
                    name: "Legs"
                },
                gloves: {
                    id: 4,
                    name: "Gloves"
                },
                boots: {
                    id: 5,
                    name: "Boots"
                },
                sword: {
                    id: 6,
                    name: "Sword"
                },
                shield: {
                    id: 7,
                    name: "Shield"
                }
            }, this.rarity = {
                common: 1,
                rare: 2,
                epic: 3,
                legendary: 4,
                ancient: 5,
                divine: 6
            }, this.prefixes = {
                commonQuality: ["Wooden", "Sturdy", "Rigid", "Iron", "Rusty", "Flimsy", "Battered", "Damaged", "Used", "Stained", "Training"],
                rareQuality: ["Steel", "Shiny", "Polished", "Forged", "Plated", "Bronze", "Reinforced", "Veteran's", "Reliable"],
                epicQuality: ["Antique", "Ancient", "Famous", "Bejeweled", "Notorious", "Historic", "Mythical", "Extraordinary"],
                legendaryQuality: ["Monstrous", "Diabolical", "Withering", "Terrible", "Demoniacal"],
                ancientQuality: ["Grim", "Miserable", "Luxurious"],
                divineQuality: ["Divine"]
            }, this.stats = {
                respawnTime: {
                    id: 1,
                    scaling: 1
                },
                speed: {
                    id: 2,
                    scaling: 1
                },
                zombieHealth: {
                    id: 3,
                    scaling: 24
                },
                zombieDamage: {
                    id: 4,
                    scaling: 3
                },
                zombieSpeed: {
                    id: 5,
                    scaling: 1
                },
                harpySpeed: {
                    id: 6,
                    scaling: 1

                }
            }, Xe.instance) return Xe.instance;
            Xe.instance = this
        }
        getUsedPoints() {
            return this.talents.reduce(((e, t) => e + t), 0)
        }
        getAvailablePoints() {
            return this.talentPoints - this.getUsedPoints()
        }
        xpForNextLevel() {
            return 1e3 * Math.pow(this.persistent.level, 2)
        }
        addXp(e) {
            if (this.isAlive() && (this.persistent.xp += e * this.persistent.xpRate, this.persistent.xp > this.xpForNextLevel())) {
                this.persistent.xp -= this.xpForNextLevel(), this.persistent.level++, this.upgrades.applyUpgrades(), this.model.sendMessage("Skeleton Champion reached level " + this.persistent.level + "!");
                const e = document.getElementById("skeleton");
                e && (e.classList.toggle("levelup"), setTimeout((function () {
                    e.classList.toggle("levelup")
                }), 3e3))
            }
        }
        isAlive() {
            for (let e = 0; e < this.skeletons.length; e++)
                if (!this.skeletons[e].flags.dead) return !0;
            return !1
        }
        applyUpgrades() {
            if (this.persistent.skeletons > 0) {
                this.applyItemUpgrades();
                const scalingFactor = Math.pow(1.0001, this.persistent.level);
                const e = 1 + this.persistent.level / 100;
                this.model.bloodPCMod *= e,
                    this.model.brainsPCMod *= e,
                    this.model.bonesPCMod *= e,
                    this.model.partsPCMod *= e,
                    this.model.zombieDamagePCMod *= e,
                    this.model.zombieHealthPCMod *= e,
                    this.model.PlagueVatPCMod *= scalingFactor,
                    this.model.plagueDamageMod *= scalingFactor
            }
        }
        acceptOffer() {
            this.model.persistentData.trophies = [], this.persistent.skeletons < 1 ? (this.persistent.skeletons = 1, this.persistent.xpRate = 1, this.model.sendMessage("Skeleton Champion joins the fight!")) : this.persistent.xpRate *= 2, this.upgrades.applyUpgrades(), this.model.saveData()
        }
        populate() {
            if (this.model = ne.getInstance(), this.map = new ee, this.graveyard = new Oe, this.exclamations = new it, this.bullets = new rt, this.spells = new q, this.smoke = new ot, this.upgrades = new oe, this.humans = new Se, this.zombies = new Ae, this.prestigePoints = new Je, this.partFactory = new se, this.bones = new tt, this.blasts = new nt, this.blood = new _e, this.damageZombie = this.zombies.damageZombie, this.searchClosestTarget = this.zombies.searchClosestTarget, this.updateBurns = this.zombies.updateBurns, this.updateZombieRegen = this.zombies.updateZombieRegen, this.causePlagueExplosion = this.zombies.causePlagueExplosion, this.inflictPlague = this.zombies.inflictPlague, this.healZombie = this.zombies.healZombie, this.setSpeedMultiplier = this.zombies.setSpeedMultiplier, !this.textures.set) {
                this.textures.down = [], this.textures.up = [], this.textures.right = [], this.textures.dead = [];
                for (let e = 0; e < 3; e++) this.textures.down.push(PIXI.Texture.from("skeleton" + e + ".png"));
                for (let e = 3; e < 6; e++) this.textures.up.push(PIXI.Texture.from("skeleton" + e + ".png"));
                for (let e = 6; e < 9; e++) this.textures.right.push(PIXI.Texture.from("skeleton" + e + ".png"));
                this.textures.dead.push(PIXI.Texture.from("skeleton9.png")), this.textures.set = !0
            }
            const e = [];
            for (let t = 0; t < this.skeletons.length; t++) this.skeletons[t].flags.dead ? (this.discardedSprites.push(this.skeletons[t]), g.removeChild(this.skeletons[t])) : (e.push(this.skeletons[t]), this.skeletons[t].x = this.graveyard.sprite.x, this.skeletons[t].zIndex = this.skeletons[t].y = this.graveyard.sprite.y + (this.graveyard.level > 2 ? 8 : 0), this.skeletons[t].target = null, this.skeletons[t].state = be.lookingForTarget, this.skeletons[t].timer.scan = 0);
            this.skeletons = e, this.aliveSkeletons = [], this.lootChance = .001, this.model.level < this.persistent.level && (this.lootChance *= .5), this.model.level > 2 * this.persistent.level && (this.lootChance *= 1.5)
        }
        spawnCreature() {
            let e;
            this.discardedSprites.length > 0 ? (e = this.discardedSprites.pop(), e.textures = this.textures.down) : (e = new Le(this.textures.down), e.addChild(e.boneshieldContainer), e.boneshieldContainer.position.set(0, -16)), e.tint = 15658734, e.immuneToBurns = !1, e.bulletReflect = 0, e.zombie = !0, e.textureSet = this.textures, e.deadTexture = this.textures.dead, e.currentDirection = this.directions.down, e.flags = new K, e.burnDamage = 0, e.lastKnownBuilding = !1, e.alpha = 1, e.animationSpeed = .15, e.anchor.set(8.5 / 16, 1), e.position.set(this.graveyard.sprite.x, this.graveyard.sprite.y + (this.graveyard.level > 2 ? 8 : 0)), e.target = null, e.zIndex = e.position.y, e.visible = !0, e.maxHealth = e.health = 10 * this.model.zombieHealth, e.attackDamage = 10 * this.model.zombieDamage, e.regenTimer = 5, e.state = be.lookingForTarget, e.scaling = this.scaling, e.scale.set(e.scaling, e.scaling), e.timer.ability = 4 * Math.random(), e.timer.attack = 0, e.timer.scan = 0, e.timer.burnTick = this.burnTickTimer, e.timer.smoke = this.smokeTimer, e.xSpeed = 0, e.ySpeed = 0, e.speedMultiplier = 1, e.maxSpeed = this.moveSpeed, e.play(), e.zombieId = this.currId++, this.skeletons.push(e), g.addChild(e), this.smoke.newZombieSpawnCloud(e.x, e.y - 2)
        }
        skeletonTimer() {
            return this.aliveSkeletons.length < this.persistent.skeletons ? this.spawnTimer : 0
        }
        update(e) {
            this.aliveHumans = this.humans.aliveHumans, this.graveyardAttackers = this.humans.graveyardAttackers, this.aliveZombies = this.zombies.aliveZombies, this.aliveSkeletons = [], this.spellTimer -= e;
            for (let t = 0; t < this.skeletons.length; t++) this.skeletons[t].visible && (this.updateCreature(this.skeletons[t], e), this.skeletons[t].flags.dead || (this.aliveZombies.push(this.skeletons[t]), this.aliveSkeletons.push(this.skeletons[t])));
            this.aliveSkeletons.length < this.persistent.skeletons && (this.spawnTimer -= e, this.spawnTimer < 0 && (this.spawnCreature(), this.spawnTimer = this.respawnTime)), this.lastKillingBlow -= e; if (this.model.persistentData.autoSellGear == !0 && this.aliveSkeletons.length > 0) { this.destroyAllItems() }; if (this.model.persistentData.autoSellGearLegendary == !0 && this.aliveSkeletons.length > 0) { this.destroyAllItemsLegendary() };
        }
        updateCreature(e, t) {
            if (e.flags.dead) {
                if (!e.visible) return;
                return e.alpha -= this.fadeSpeed * t, void (e.alpha < 0 && (e.visible = !1, g.removeChild(e)))
            }
            switch (this.boneshield > 0 && e.boneshield < this.boneshield && (e.boneshieldTimer -= t, e.boneshieldTimer < 0 && (e.boneshieldTimer = 10 / this.boneshield, e.boneshield++)), this.boneshield ? (e.boneshieldContainer.visible = !0, e.boneshieldContainer.update(e.boneshield), e.boneshieldContainer.rotation += t) : e.boneshieldContainer.visible = !1, this.darkorb > 0 && (this.darkorbTimer -= t, this.darkorbTimer < 0 && e.target && !e.target.flags.dead && (this.darkorbTimer = this.darkorb, this.bullets.newBullet(e, e.target, this.calculateDamage(e), !1, !1, !1, !0))), e.timer.attack -= t, e.timer.scan -= t, e.timer.ability -= t, this.model.runeEffects.healthRegen > 0 && this.updateZombieRegen(e, t), e.flags.burning && !e.immuneToBurns && this.updateBurns(e, t), e.timer.ability < 0 && (e.timer.ability = 4), e.target && !e.target.flags.dead || (e.state = be.lookingForTarget, e.timer.target = 0, e.timer.scan = 0), e.state) {
                case be.lookingForTarget:
                    this.searchClosestTarget(e), e.target && (e.state = be.movingToTarget);
                    break;
                case be.movingToTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    if (s < this.attackDistance) {
                        e.state = be.attackingTarget;
                        break
                    }
                    s > 3 * this.attackDistance && e.timer.scan < 0 && this.searchClosestTarget(e), this.updateCreatureSpeed(e, t);
                    break
                }
                case be.attackingTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    if (s < this.attackDistance) {
                        if (e.timer.attack < 0 && !e.target.flags.dead && (this.humans.damageHuman(e.target, this.calculateDamage(e)), e.target.flags.dead && this.killingBlow(e.target), e.timer.attack = this.attackSpeed * (1 / (this.model.runeEffects.attackSpeed * this.model.ShockPCMod)), e.flags.burning && (e.timer.attack *= 1 / this.model.burningSpeedMod), this.randomSpells.length > 0))
                            for (let e = 0; e < this.randomSpells.length; e++) this.spellTimer < 0 && Math.random() < .07 + this.increaseChance && (this.spells.castSpellNoMana(this.randomSpells[e]), this.spellTimer = 3);
                        s > this.attackDistance / 2 && this.updateCreatureSpeed(e, t)
                    } else e.state = be.movingToTarget;
                    break
                }
            }
        }
        killingBlow(e) {
            this.killingBlowParts && (this.model.persistentData.parts += this.killingBlowParts * this.partFactory.factoryStats().partsPerSec), this.lastKillingBlow <= 0 && (this.model.addPrestigePoints(Math.round(this.persistent.level * Math.pow(1.00025, this.persistent.level))), this.lastKillingBlow = 20, this.prestigePoints.newPart(e.x, e.y))
        }
        orbHit(e) {
            if (e.flags.dead && this.killingBlow(e), this.randomSpells.length > 0)
                for (let e = 0; e < this.randomSpells.length; e++) this.spellTimer < 0 && Math.random() < .04 && (this.spells.castSpellNoMana(this.randomSpells[e]), this.spellTimer = 3)
        }
        incinerate() {
            let e;
            for (let t = 0; t < this.skeletons.length; t++) this.skeletons[t].visible && (e = this.skeletons[t]);
            if (e)
                for (let t = 0; t < this.aliveHumans.length; t++) Math.abs(this.aliveHumans[t].x - e.x) < 200 && Math.abs(this.aliveHumans[t].y - e.y) < 200 && this.humans.burnHuman(this.aliveHumans[t], e.attackDamage)
        }
        getCreatureDirection(e) {
            return Math.abs(e.xSpeed) > Math.abs(e.ySpeed) ? e.xSpeed < 0 ? this.directions.left : this.directions.right : e.ySpeed < 0 ? this.directions.up : this.directions.down
        }
        changeTextureDirection(e) {
            const t = this.getCreatureDirection(e);
            if (t !== e.currentDirection) {
                switch (t) {
                    case this.directions.up:
                        e.textures = e.textureSet.up, e.scale.x = e.scaling;
                        break;
                    case this.directions.down:
                        e.textures = e.textureSet.down, e.scale.x = e.scaling;
                        break;
                    case this.directions.right:
                        e.textures = e.textureSet.right, e.scale.x = e.scaling;
                        break;
                    case this.directions.left:
                        e.textures = e.textureSet.right, e.scale.x = -e.scaling
                }
                e.currentDirection = t, e.play()
            }
        }
        updateCreatureSpeed(e, t) {
            if (e.timer.dogStun > 0) return void (e.timer.dogStun -= t);
            e.timer.target && e.targetVector || (e.timer.target = 0), e.timer.target -= t, e.timer.target <= 0 && (e.targetVector = this.map.howDoIGetToMyTarget(e, e.target), e.timer.target = .2);
            const s = 4 * this.fastDistance(e.x, e.y, e.target.x, e.target.y),
                i = Math.min(e.speedMultiplier * e.maxSpeed, s);
            e.xSpeed = e.targetVector.x * i, e.ySpeed = e.targetVector.y * i, e.position.x += e.xSpeed * t, e.position.y += e.ySpeed * t, e.zIndex = e.position.y, this.changeTextureDirection(e)
        }
        calculateDamage(e) {
            let t = e.attackDamage;
            return this.model.runeEffects.critChance > 0 && Math.random() < this.model.runeEffects.critChance && (t *= this.model.runeEffects.critDamage, He(e.x, e.y - 10, t)), t
        }
        applyItemUpgrades() {
            this.model = ne.getInstance(), this.moveSpeed = (40 + this.model.SkeleMoveMod), this.respawnTime = 10, this.randomSpells = [], this.persistent.items.filter((e => e.q)).forEach((e => {
                e.e.forEach((t => {
                    switch (t) {
                        case this.stats.respawnTime.id:
                            this.respawnTime--;
                            break;
                        case this.stats.speed.id:
                            this.moveSpeed++;
                            break;
                        case this.stats.zombieHealth.id:
                            this.model.zombieHealth += e.l * this.stats.zombieHealth.scaling;
                            break;
                        case this.stats.zombieDamage.id:
                            this.model.zombieDamage += e.l * this.stats.zombieDamage.scaling;
                            break;
                        case this.stats.zombieSpeed.id:
                            this.model.zombieSpeed++
                            break;
                        case this.stats.harpySpeed.id:
                            this.model.harpySpeed += 10
                    }
                })), e.se && e.se.forEach((e => {
                    this.randomSpells.push(e)
                }))
            }))
        }
        getLootName(e) {
            let t = "";
            switch (e.r) {
                case this.rarity.common:
                    t = this.prefixes.commonQuality[e.p];
                    break;
                case this.rarity.rare:
                    t = this.prefixes.rareQuality[e.p];
                    break;
                case this.rarity.epic:
                    t = this.prefixes.epicQuality[e.p];
                    break;
                case this.rarity.legendary:
                    t = this.prefixes.legendaryQuality[e.p]
                    break;
                case this.rarity.ancient:
                    t = this.prefixes.ancientQuality[e.p]
                    break;
                case this.rarity.divine:
                    t = this.prefixes.divineQuality[e.p]
            }
            let s = "";
            switch (e.s) {
                case this.lootPositions.helmet.id:
                    s = this.lootPositions.helmet.name;
                    break;
                case this.lootPositions.chest.id:
                    s = this.lootPositions.chest.name;
                    break;
                case this.lootPositions.legs.id:
                    s = this.lootPositions.legs.name;
                    break;
                case this.lootPositions.gloves.id:
                    s = this.lootPositions.gloves.name;
                    break;
                case this.lootPositions.boots.id:
                    s = this.lootPositions.boots.name;
                    break;
                case this.lootPositions.sword.id:
                    s = this.lootPositions.sword.name;
                    break;
                case this.lootPositions.shield.id:
                    s = this.lootPositions.shield.name
            }
            return t + " " + s
        }
        getLootClass(e) {
            switch (e.r) {
                case this.rarity.common:
                    return "common";
                case this.rarity.rare:
                    return "rare";
                case this.rarity.epic:
                    return "epic";
                case this.rarity.legendary:
                    return "legendary";
                case this.rarity.ancient:
                    return "ancient";
                case this.rarity.divine:
                    return "divine"
            }
        }
        getLootStats(e) {
            const t = [];
            if (e.e)
                for (let s = 0; s < e.e.length; s++) switch (e.e[s]) {
                    case this.stats.respawnTime.id:
                        t.push("-1 second respawn time");
                        break;
                    case this.stats.speed.id:
                        t.push("+1 movement speed");
                        break;
                    case this.stats.zombieHealth.id:
                        t.push("+" + n(this.stats.zombieHealth.scaling * e.l) + " zombie health");
                        break;
                    case this.stats.zombieDamage.id:
                        t.push("+" + n(this.stats.zombieDamage.scaling * e.l) + " zombie damage");
                        break;
                    case this.stats.zombieSpeed.id:
                        t.push("+1 zombie speed")
                        break;
                    case this.stats.harpySpeed.id:
                        t.push("+10 harpy speed")
                }
            return t
        }
        getSpecialEffects(e) {
            const t = [];
            if (e.se)
                for (let s = 0; s < e.se.length; s++) {
                    const i = this.spells.spells.filter((t => t.id == e.se[s]))[0];
                    t.push(i.itemText || "Has a chance to cast " + i.name + " when attacking, this does not cost energy or trigger a cooldown")
                }
            return t
        }
        getSpecialEffectsName(e) {
            const t = [];
            if (e.se)
                for (let s = 0; s < e.se.length; s++) {
                    const i = this.spells.spells.filter((t => t.id == e.se[s]))[0];
                    t.push(i.name.replace(" ", '-'))
                }
            return t
        }
        getSpecialEffectsList() {
            const t = [];
                for (let s = 0; s < this.spells.spells.length; s++) {
                    t.push(this.spells.spells[s])
                }
            return t
        }
        getRarityList() {
            return [this.rarity.common, this.rarity.rare, this.rarity.epic, this.rarity.legendary, this.rarity.ancient, this.rarity.divine]
        }
        getTypeList() {
            return [this.lootPositions.helmet.id, this.lootPositions.chest.id, this.lootPositions.gloves.id, this.lootPositions.legs.id, this.lootPositions.boots.id, this.lootPositions.sword.id, this.lootPositions.shield.id]
        }
        testForLoot() {
            if (this.persistent.skeletons > 0 && Math.random() < this.lootChance) {
                const e = this.generateLoot(this.persistent.level);
                this.model.sendMessage(this.getLootName(e) + " collected!"), this.persistent.items.push(e)
            }
        }
        generateLoot(e) {
            const t = Math.round(6 * Math.random()) + 1;
            let s = this.rarity.common;
            const i = [];
            if (Math.random() < .2 * this.lootChanceMod && (s = this.rarity.rare, Math.random() < .2 * this.lootChanceMod && (s = this.rarity.epic, Math.random() < .1 * this.lootChanceMod && (s = this.rarity.legendary, Math.random() < .1 * this.lootChanceMod && (s = this.rarity.ancient, Math.random() < .1 * this.lootChanceMod))))) {
                s = this.rarity.divine;
                const e = a(this.spells.spells, Math.random());
                i.push(e.id)
            }
            if (s == this.rarity.legendary) {
                const e = a(this.spells.spells, Math.random());
                i.push(e.id)
            }
            if (s == this.rarity.ancient) {
                const e = a(this.spells.spells, Math.random());
                i.push(e.id)
            }
            let r = 0;
            switch (s) {
                case this.rarity.common:
                    r = Math.floor(Math.random() * this.prefixes.commonQuality.length);
                    break;
                case this.rarity.rare:
                    r = Math.floor(Math.random() * this.prefixes.rareQuality.length);
                    break;
                case this.rarity.epic:
                    r = Math.floor(Math.random() * this.prefixes.epicQuality.length);
                    break;
                case this.rarity.legendary:
                    r = Math.floor(Math.random() * this.prefixes.legendaryQuality.length);
                    break;
                case this.rarity.ancient:
                    r = Math.floor(Math.random() * this.prefixes.ancientQuality.length)
                    break;
                case this.rarity.divine:
                    r = Math.floor(Math.random() * this.prefixes.divineQuality.length)
            }
            const n = [Math.random() > .5 ? this.stats.zombieHealth.id : this.stats.zombieDamage.id];
            for (let e = 0; e < s - 1; e++) {
                let e = Math.ceil(6 * Math.random());
                for (; n.includes(e);) e = Math.ceil(6 * Math.random());
                n.push(e)
            }
            return {
                id: this.persistent.currItemId++,
                l: e,
                s: t,
                r: s,
                p: r,
                e: n,
                se: i,
                q: !1
            }
        }
        destroyItem(e) {
            this.addXp(e.l * e.r * 10);
            for (let t = 0; t < this.persistent.items.length; t++) this.persistent.items[t].id === e.id && this.persistent.items.splice(t, 1)
        }
        destroyAllItems() {
            this.addXp(this.xpForItems() - this.xpForAncient() - this.xpForDivine()), this.persistent.items = this.persistent.items.filter((e => e.q || (e.r == this.rarity.legendary || e.r == this.rarity.ancient || e.r == this.rarity.divine)))
        }
        destroyAllItemsLegendary() {
            this.addXp(this.xpForLegendary()), this.persistent.items = this.persistent.items.filter((e => e.q || (e.r == this.rarity.common || e.r == this.rarity.rare || e.r == this.rarity.epic || e.r == this.rarity.ancient || e.r == this.rarity.divine)))
        }
        xpForItems() {
            let e = 0;
            return this.persistent.items.filter(e => !e.q && e.r != this.rarity.legendary).forEach((function (t) {
                e += t.l * t.r * 10
            })), e
        }

        xpForLegendary() {
            let e = 0;
            return this.persistent.items.filter(e => !e.q && e.r == this.rarity.legendary).forEach((function (t) {
                e += t.l * t.r * 10
            })), e
        }

        xpForAncient() {
            let e = 0;
            return this.persistent.items.filter(e => !e.q && e.r == this.rarity.ancient).forEach((function (t) {
                e += t.l * t.r * 10
            })), e
        }
        xpForDivine() {
            let e = 0;
            return this.persistent.items.filter(e => !e.q && e.r == this.rarity.divine).forEach((function (t) {
                e += t.l * t.r * 10
            })), e
        }

        xpTotal() {
            return (this.xpForItems() - this.xpForAncient - this.xpForDivine)
        }
    }
    class Ue {
        constructor() {
            if (this.creatureFactory = new ae, this.zombies = new Ae, this.creatures = [], this.creatureCount = [], this.aliveCreatures = [], this.aliveZombies = [], this.graveyardAttackers = [], this.discardedSprites = [], this.aliveHumans = [], this.scaling = 1.6, this.moveTargetDistance = 15, this.attackDistance = 20, this.attackSpeed = 3, this.targetDistance = 100, this.fadeSpeed = .1, this.currId = 1, this.scanTime = 3, this.refundChance = 0, this.creatureTypes = this.creatureFactory.types, this.golemTextures = {
                set: !1,
                down: [],
                up: [],
                left: [],
                right: [],
                dead: []
            }, this.directions = {
                down: 1,
                up: 2,
                right: 3,
                left: 4,
                dead: 5
            }, this.burnTickTimer = 5, this.smokeTimer = .3, this.fastDistance = i, this.magnitude = t, this.damageZombie = this.zombies.damageZombie, this.searchClosestTarget = this.zombies.searchClosestTarget, this.updateBurns = this.zombies.updateBurns, this.updateZombieRegen = this.zombies.updateZombieRegen, this.causePlagueExplosion = this.zombies.causePlagueExplosion, this.inflictPlague = this.zombies.inflictPlague, this.healZombie = this.zombies.healZombie, this.setSpeedMultiplier = this.zombies.setSpeedMultiplier, Ue.instance) return Ue.instance;
            Ue.instance = this
        }
        populate() {
            if (this.map = new ee, this.model = ne.getInstance(), this.graveyard = new Oe, this.smoke = new ot, this.bullets = new rt, this.humans = new Se, this.exclamations = new it, this.blood = new _e, this.bones = new tt, this.blasts = new nt, !this.golemTextures.set) {
                this.golemTextures.down = [], this.golemTextures.up = [], this.golemTextures.right = [], this.golemTextures.dead = [];
                for (let e = 0; e < 3; e++) this.golemTextures.down.push(PIXI.Texture.from("golem" + e + ".png"));
                for (let e = 3; e < 6; e++) this.golemTextures.up.push(PIXI.Texture.from("golem" + e + ".png"));
                for (let e = 6; e < 9; e++) this.golemTextures.right.push(PIXI.Texture.from("golem" + e + ".png"));
                this.golemTextures.dead.push(PIXI.Texture.from("golem9.png")), this.golemTextures.set = !0
            }
            const e = [];
            for (let t = 0; t < this.creatures.length; t++) this.model.constructions.monsterFactory ? this.creatures[t].flags.dead ? (this.discardedSprites.push(this.creatures[t]), g.removeChild(this.creatures[t])) : (e.push(this.creatures[t]), this.creatures[t].x = this.graveyard.sprite.x, this.creatures[t].zIndex = this.creatures[t].y = this.graveyard.sprite.y + (this.graveyard.level > 2 ? 8 : 0), this.creatures[t].target = null, this.creatures[t].state = be.lookingForTarget) : (this.discardedSprites.push(this.creatures[t]), g.removeChild(this.creatures[t]));
            this.creatures = e, this.aliveCreatures = [], this.creatureFactory.spawnSavedCreatures()
        }
        spawnCreature(e, t, s, i, a, r) {
            if (this.model.creatureCount >= this.model.creatureLimit) return;
            let n;
            switch (this.discardedSprites.length > 0 ? (n = this.discardedSprites.pop(), n.textures = this.golemTextures.down) : n = new Pe(this.golemTextures.down), i) {
                case this.creatureTypes.earthGolem:
                    n.tint = 11042610, n.bulletReflect = this.model.bulletproofChance;
                    break;
                case this.creatureTypes.airGolem:
                    n.tint = 10266040;
                    break;
                case this.creatureTypes.fireGolem:
                    n.tint = 14370586, n.immuneToBurns = !0;
                    break;
                case this.creatureTypes.waterGolem:
                    n.tint = 5080808, n.immuneToBurns = !0
            }
            n.flags = new K, n.flags.golem = !0, n.burnDamage = 0, n.level = a, n.textureSet = this.golemTextures, n.deadTexture = this.golemTextures.dead, n.currentDirection = this.directions.down, n.creatureType = i, n.price = r, n.lastKnownBuilding = !1, n.alpha = 1, n.animationSpeed = .15, n.anchor.set(8.5 / 16, 1), n.position.set(this.graveyard.sprite.x, this.graveyard.sprite.y + (this.graveyard.level > 2 ? 8 : 0)), n.target = null, n.zIndex = n.position.y, n.visible = !0, n.maxHealth = n.health = e, n.attackDamage = t, n.regenTimer = 5, n.state = be.lookingForTarget, n.scaling = this.scaling, n.scale.set(n.scaling, n.scaling), n.xSpeed = 0, n.ySpeed = 0, n.speedMultiplier = 1, n.maxSpeed = s, n.timer.ability = 4 * Math.random(), n.timer.attack = 0, n.timer.scan = 0, n.timer.burnTick = this.burnTickTimer, n.timer.smoke = this.smokeTimer, n.play(), n.zombieId = this.currId++, this.creatures.push(n), g.addChild(n), this.smoke.newZombieSpawnCloud(n.x, n.y - 2), this.model.creatureCount++
        }
        update(e) {
            let t = 0;
            this.aliveHumans = this.humans.aliveHumans, this.graveyardAttackers = this.humans.graveyardAttackers, this.aliveZombies = this.zombies.aliveZombies, this.creatureCount = [];
            for (let e = 0; e < this.creatureFactory.creatures.length; e++) this.creatureCount[this.creatureFactory.creatures[e].type] = 0;
            this.model.persistentData.savedCreatures = [];
            for (let t = 0; t < this.creatures.length; t++) this.creatures[t].visible && this.updateCreature(this.creatures[t], e);
            for (let e = 0; e < this.creatures.length; e++) this.creatures[e].visible && (this.creatures[e].flags.dead || (this.aliveZombies.push(this.creatures[e]), t++, this.creatureCount[this.creatures[e].creatureType]++, this.model.persistentData.savedCreatures.push({
                t: this.creatures[e].creatureType,
                l: this.creatures[e].level
            })));
            this.model.creatureCount = t
        }
        updateCreature(e, t) {
            if (e.flags.dead) {
                if (!e.visible) return;
                return e.alpha -= this.fadeSpeed * t, void (e.alpha < 0 && (e.visible = !1, g.removeChild(e)))
            }
            if (e.timer.attack -= t, e.timer.scan -= t, e.timer.ability -= t, this.model.runeEffects.healthRegen > 0 && this.updateZombieRegen(e, t), e.flags.burning && !e.immuneToBurns && this.updateBurns(e, t), e.timer.ability < 0) switch (e.timer.ability = 4, e.creatureType) {
                case this.creatureTypes.earthGolem:
                    this.golemTaunt(e);
                    break;
                case this.creatureTypes.waterGolem:
                    this.golemHeal(e);
                    break;
                case this.creatureTypes.fireGolem:
                    this.golemFireball(e)
            }
            switch ((!e.target || e.target.flags.dead) && e.timer.scan < 0 && (e.state = be.lookingForTarget), e.state) {
                case be.lookingForTarget:
                    this.searchClosestTarget(e), e.target && (e.state = be.movingToTarget);
                    break;
                case be.movingToTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    if (s < this.attackDistance) {
                        e.state = be.attackingTarget;
                        break
                    }
                    s > 3 * this.attackDistance && e.timer.scan < 0 && this.searchClosestTarget(e), this.updateCreatureSpeed(e, t);
                    break
                }
                case be.attackingTarget: {
                    const s = this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y);
                    s < this.attackDistance ? (e.scale.x = e.target.x > e.x ? e.scaling : -e.scaling, e.timer.attack < 0 && (this.humans.damageHuman(e.target, this.calculateDamage(e)), e.creatureType == this.creatureTypes.fireGolem && this.humans.burnHuman(e.target, e.attackDamage / 2), e.timer.attack = this.attackSpeed * (1 / (this.model.runeEffects.attackSpeed * this.model.ShockPCMod)), e.flags.burning && (e.timer.attack *= 1 / this.model.burningSpeedMod)), s > this.attackDistance / 2 && this.updateCreatureSpeed(e, t)) : e.state = be.movingToTarget;
                    break
                }
            }
        }
        getCreatureDirection(e) {
            return Math.abs(e.xSpeed) > Math.abs(e.ySpeed) ? e.xSpeed < 0 ? this.directions.left : this.directions.right : e.ySpeed < 0 ? this.directions.up : this.directions.down
        }
        changeTextureDirection(e) {
            const t = this.getCreatureDirection(e);
            if (t !== e.currentDirection) {
                switch (t) {
                    case this.directions.up:
                        e.textures = e.textureSet.up, e.scale.x = e.scaling;
                        break;
                    case this.directions.down:
                        e.textures = e.textureSet.down, e.scale.x = e.scaling;
                        break;
                    case this.directions.right:
                        e.textures = e.textureSet.right, e.scale.x = e.scaling;
                        break;
                    case this.directions.left:
                        e.textures = e.textureSet.right, e.scale.x = -e.scaling
                }
                e.currentDirection = t, e.play()
            }
        }
        updateCreatureSpeed(e, t) {
            if (e.timer.dogStun && e.timer.dogStun > 0) return void (e.timer.dogStun -= t);
            e.timer.target && e.targetVector || (e.timer.target = 0), e.timer.target -= t, e.timer.target <= 0 && (e.targetVector = this.map.howDoIGetToMyTarget(e, e.target), e.timer.target = .2);
            const s = e.speedMultiplier * e.maxSpeed;
            e.xSpeed = e.targetVector.x * s, e.ySpeed = e.targetVector.y * s, e.position.x += e.xSpeed * t, e.position.y += e.ySpeed * t, e.zIndex = e.position.y, this.changeTextureDirection(e)
        }
        calculateDamage(e) {
            let t = e.attackDamage;
            return this.model.runeEffects.critChance > 0 && Math.random() < this.model.runeEffects.critChance && (t *= this.model.runeEffects.critDamage, He(e.x, e.y - 10, t)), t
        }
        golemTaunt(e) {
            for (let t = 0; t < this.aliveHumans.length; t++) Math.abs(this.aliveHumans[t].x - e.x) < this.targetDistance && Math.abs(this.aliveHumans[t].y - e.y) < this.targetDistance && (this.aliveHumans[t].vip || (this.aliveHumans[t].zombieTarget = e, this.aliveHumans[t].target = e))
        }
        golemHeal(e) {
            const t = e.attackDamage;
            for (let s = 0; s < this.aliveZombies.length; s++) Math.abs(this.aliveZombies[s].x - e.x) < this.targetDistance && Math.abs(this.aliveZombies[s].y - e.y) < this.targetDistance && this.healZombie(this.aliveZombies[s], t);
            for (let s = 0; s < this.creatures.length; s++) !this.creatures[s].flags.dead && this.creatures[s].visible && Math.abs(this.creatures[s].x - e.x) < this.targetDistance && Math.abs(this.creatures[s].y - e.y) < this.targetDistance && this.healZombie(this.creatures[s], t)
        }
        golemFireball(e) {
            let t = 5;
            for (let s = 0; s < this.aliveHumans.length; s++) t > 0 && Math.abs(this.aliveHumans[s].x - e.x) < this.targetDistance && Math.abs(this.aliveHumans[s].y - e.y) < this.targetDistance && (t--, this.bullets.newBullet(e, this.aliveHumans[s], e.attackDamage / 2, !1, !1, !0))
        }
    }
    class Ne extends PIXI.Sprite {
        constructor() {
            super(...arguments), this.graveyard = !0
        }
    }
    class Oe {
        constructor() {
            if (this.spikeSprites = [], this.level = 1, this.spikeTimer = 5, this.fenceRadius = 50, this.fastDistance = i, this.graveyardHealth = 0, this.graveyardMaxHealth = 0, this.target = {
                graveyard: !0,
                x: 0,
                y: 0
            }, this.healthBar = null, this.fence = null, this.fencePosts = [], Oe.instance) return Oe.instance;
            Oe.instance = this
        }
        initialize() {
            this.boneCollectors = new Ve, this.zmMap = new ee, this.zombies = new Ae, this.bones = new tt, this.gameModel = ne.getInstance(), this.smoke = new ot, this.harpies = new Ke, this.blood = new _e, this.humans = new Se, void 0 === this.gameModel.persistentData.graveyardZombies && (this.gameModel.persistentData.graveyardZombies = 1), this.drawGraveyard(), this.drawFence(), this.drawHealthBar(), this.bones.initialize(), this.boneCollectors.populate(), this.harpies.populate()
        }
        damageGraveyard(e) {
            this.gameModel.isBossStage(this.gameModel.level) && (this.graveyardHealth -= e, this.graveyardHealth < 0 && (this.gameModel.currentState = this.gameModel.states.failed, this.gameModel.startTimer = 3))
        }
        drawHealthBar() {
            this.gameModel.isBossStage(this.gameModel.level) ? (this.gameModel.sendMessage("Defend the Graveyard!"), this.graveyardHealth = this.graveyardMaxHealth = 100 * this.gameModel.zombieHealth * this.gameModel.graveyardHealthMod, this.healthBar || (this.healthBar = {
                container: new PIXI.Container,
                background: new PIXI.Graphics,
                foreground: new PIXI.Graphics,
                percentage: 100
            }, this.healthBar.container.addChild(this.healthBar.background), this.healthBar.container.addChild(this.healthBar.foreground), b.addChild(this.healthBar.container)), this.target.x = P.x / 2, this.target.y = P.y / 2, this.healthBar.container.visible = !0, this.healthBar.container.x = this.target.x - 50, this.healthBar.container.y = this.target.y - 100, this.healthBar.background.clear(), this.healthBar.background.lineStyle(12, 3355443), this.healthBar.background.moveTo(-2, 0), this.healthBar.background.lineTo(102, 0), this.healthBar.foreground.clear(), this.healthBar.foreground.lineStyle(8, 16601682), this.healthBar.foreground.moveTo(0, 0), this.healthBar.foreground.lineTo(100, 0)) : this.healthBar && (this.healthBar.background.clear(), this.healthBar.foreground.clear(), this.healthBar.container.visible = !1)
        }
        updateHealthBar() {
            const e = Math.max(Math.round(this.graveyardHealth / this.graveyardMaxHealth * 100), 0);
            e != this.healthBar.percentage && (this.healthBar.foreground.clear(), e > 0 && (this.healthBar.foreground.lineStyle(8, 16601682), this.healthBar.foreground.moveTo(0, 0), this.healthBar.foreground.lineTo(e, 0)), this.healthBar.percentage = e)
        }
        drawGraveyard() {
            this.spikeTexture || (this.spikeTexture = PIXI.Texture.from("spikes.png")), this.sprite && u.removeChild(this.sprite), this.fortSprite && (g.removeChild(this.fortSprite), this.fortSprite = null), this.level = 1;
            let e = "graveyard1.png",
                t = "";
            this.gameModel.constructions.crypt && (this.level = 2, e = "graveyard2.png"), this.gameModel.constructions.fort && (this.level = 3, e = "sprites/megagraveyard.png", t = "fort1.png"), this.gameModel.constructions.fortress && (this.level = 4, e = "sprites/megagraveyard.png", t = "fort2.png"), this.gameModel.constructions.citadel && (this.level = 5, e = "sprites/megagraveyard.png", t = "fort3.png"), this.sprite ? this.sprite.texture = PIXI.Texture.from(e) : this.sprite = new Ne(PIXI.Texture.from(e));
            const s = this.zmMap.graveYardLocation;
            this.sprite.width = 32, this.sprite.height = 32, this.sprite.anchor.set(.5, .5), this.sprite.scale.set(2, 2), this.sprite.visible = !1, u.addChild(this.sprite), this.sprite.x = s.x, this.sprite.y = s.y, this.zmMap.graveyardCollision = !1, t && (this.fortSprite ? this.fortSprite.texture = PIXI.Texture.from(t) : this.fortSprite = new PIXI.Sprite(PIXI.Texture.from(t)), this.fortSprite.anchor.set(.5, 1), this.fortSprite.scale.set(2, 2), this.fortSprite.x = s.x, this.fortSprite.zIndex = this.fortSprite.y = s.y + 2, this.fortSprite.visible = !1, g.addChild(this.fortSprite))
        }
        drawFence() {
            if (this.fence || (this.fence = new PIXI.Container, u.addChild(this.fence)), this.fenceRadius = this.gameModel.fenceRadius, !this.fenceTextures) {
                this.fenceTextures = [];
                for (let e = 0; e < 4; e++) this.fenceTextures.push(PIXI.Texture.from("fencepost" + (e + 1) + ".png"))
            }
            this.fencePosts.forEach((e => e.visible = !1)), this.fence.cacheAsBitmap = !1;
            const e = Math.round(.4 * this.fenceRadius),
                t = 2 * Math.PI / e;
            for (let r = 0; r < e; r++) {
                let e;
                this.fencePosts[r] ? (e = this.fencePosts[r], e.visible = !0) : (e = new PIXI.Sprite(a(this.fenceTextures, Math.random())), this.fencePosts.push(e), this.fence.addChild(e)), e.anchor.set(.5, 1), e.scale.x = Math.random() > .5 ? 1 : -1;
                const n = 10 * Math.random() - 5,
                    o = (0, s = this.fenceRadius + n, i = t * r, {
                        x: 0 * Math.cos(i) - s * Math.sin(i),
                        y: 0 * Math.sin(i) + s * Math.cos(i)
                    });
                e.position.set(o.x, o.y)
            }
            var s, i;
            this.fence.cacheAsBitmap = !0;
            const r = this.zmMap.graveYardLocation;
            this.fence.x = r.x, this.fence.y = r.y
        }
        update(e) {
            if (this.boneCollectors.addAndRemoveBoneCollectors(), this.harpies.addAndRemoveHarpies(), this.gameModel.isBossStage(this.gameModel.level) && this.updateHealthBar(), !this.gameModel.constructions.graveyard || this.gameModel.currentState != this.gameModel.states.playingLevel) return this.sprite.visible = !1, void (this.fence.visible = !1);
            if ((this.level < 2 && this.gameModel.constructions.crypt || this.level < 3 && this.gameModel.constructions.fort || this.level < 4 && this.gameModel.constructions.fortress || this.level < 5 && this.gameModel.constructions.citadel) && this.drawGraveyard(), this.sprite.visible = !0, this.fortSprite && (this.fortSprite.visible = !0), 5 == this.level && Math.random() > .9 && (Math.random() > .5 ? this.smoke.newFireSmoke(this.sprite.x - 20, this.sprite.y - 113) : this.smoke.newFireSmoke(this.sprite.x + 20, this.sprite.y - 113)), this.gameModel.energy >= this.gameModel.energyMax && !this.gameModel.hidden)
                for (let e = 0; e < this.gameModel.persistentData.graveyardZombies; e++) this.zombies.spawnZombie(this.sprite.x, this.sprite.y + (this.level > 2 ? 8 : 0));
            this.bones.update(e), this.boneCollectors.update(e), this.harpies.update(e), this.gameModel.constructions.fence && this.gameModel.currentState == this.gameModel.states.playingLevel ? (this.fenceRadius !== this.gameModel.fenceRadius && this.drawFence(), this.fence.visible = !0) : this.fence.visible = !1, this.updatePlagueSpikes(e), this.updateSpikeSprites(e)
        }
        updatePlagueSpikes(e) {
            if (this.gameModel.constructions.plagueSpikes && (this.spikeTimer -= e, this.spikeTimer < 0)) {
                this.spikeTimer = this.gameModel.spikeDelay;
                const e = this.humans.aliveHumans;
                for (let t = 0; t < e.length; t++) Math.abs(e[t].x - this.sprite.x) < this.fenceRadius && Math.abs(e[t].y - this.sprite.y) < this.fenceRadius && this.fastDistance(this.sprite.x, this.sprite.y, e[t].x, e[t].y) < this.fenceRadius && (this.zombies.inflictPlague(e[t]), this.humans.damageHuman(e[t], this.gameModel.zombieDamage), this.blood.newPlagueSplatter(e[t].x, e[t].y), this.addSpikeSprite(e[t]))
            }
        }
        addSpikeSprite(e) {
            let t = null;
            for (let e = 0; e < this.spikeSprites.length; e++)
                if (!this.spikeSprites[e].visible) {
                    t = this.spikeSprites[e];
                    break
                } t || (t = new PIXI.Sprite(this.spikeTexture), this.spikeSprites.push(t), g.addChild(t), t.anchor.set(.5, 1)), t.visible = !0, t.alpha = 1, t.x = e.x, t.y = e.y + 2, t.zIndex = t.y, t.scale.y = 2, t.scale.x = Math.random() > .5 ? 1.5 : -1.5
        }
        updateSpikeSprites(e) {
            for (let t = 0; t < this.spikeSprites.length; t++) this.spikeSprites[t].visible && (this.spikeSprites[t].alpha -= .4 * e, this.spikeSprites[t].alpha <= 0 && (this.spikeSprites[t].visible = !1))
        }
        isWithinFence(e) {
            return !(!this.gameModel.constructions.fence || this.gameModel.currentState != this.gameModel.states.playingLevel) && e.x > this.fence.x - this.fenceRadius && e.x < this.fence.x + this.fenceRadius && e.y > this.fence.y - this.fenceRadius && e.y < this.fence.y + this.fenceRadius && this.fastDistance(e.x, e.y, this.fence.x, this.fence.y) <= this.fenceRadius
        }
    }
    class Ye extends PIXI.AnimatedSprite {
        constructor(e) {
            super(e), this.xSpeed = 0, this.ySpeed = 0, this.bones = 0, this.speedFactor = 0, this.boneList = [], this.target = null, this.animationSpeed = .2
        }
    }
    var We, qe;
    ! function (e) {
        e[e.collecting = 0] = "collecting", e[e.returning = 1] = "returning", e[e.waiting = 2] = "waiting"
    }(We || (We = {}));
    class Ve {
        constructor() {
            if (this.sprites = [], this.maxSpeed = 125, this.scaling = 2, this.collectDistance = 10, this.fastDistance = i, Ve.instance) return Ve.instance;
            Ve.instance = this
        }
        populate() {
            if (this.graveyard = new Oe, this.gameModel = ne.getInstance(), this.bones = new tt, !this.texture) {
                this.texture = [];
                for (let e = 0; e < 2; e++) this.texture.push(PIXI.Texture.from("bonecollector" + (e + 1) + ".png"))
            }
            for (let e = 0; e < this.sprites.length; e++) this.sprites[e].boneList = [], this.sprites[e].target = !1, this.sprites[e].position.set(this.graveyard.sprite.x, this.graveyard.sprite.y), this.sprites[e].state = We.collecting
        }
        addAndRemoveBoneCollectors() {
            if (this.sprites.length > this.gameModel.persistentData.boneCollectors) {
                const e = this.sprites.pop();
                if (e.boneList)
                    for (let t = 0; t < e.boneList.length; t++) e.boneList[t].collector = !1, e.target && e.target.collector && (e.target.collector = !1);
                this.gameModel.addBones(e.bones), g.removeChild(e)
            }
            if (this.sprites.length < this.gameModel.persistentData.boneCollectors) {
                const e = new Ye(this.texture);
                e.animationSpeed = .2, e.anchor.set(.5, 1), e.position.set(this.graveyard.sprite.x, this.graveyard.sprite.y), e.zIndex = e.position.y, e.visible = !0, e.scale.set(Math.random() > .5 ? this.scaling : -1 * this.scaling, this.scaling), e.xSpeed = 0, e.ySpeed = 0, e.bones = 0, e.speedFactor = 0, e.state = We.collecting, e.play(), e.boneList = [], this.sprites.push(e), g.addChild(e)
            }
        }
        update(e) {
            for (let t = 0; t < this.sprites.length; t++) this.updateBoneCollector(this.sprites[t], e)
        }
        findNearestBone(e) {
            if (e.boneList || (e.boneList = []), 0 == e.boneList.length) {
                let t = e.x,
                    s = e.y;
                for (let i = 0; i < 3; i++) {
                    let i = null,
                        a = 2e3;
                    for (let e = 0; e < this.bones.uncollected.length; e++)
                        if (this.bones.uncollected[e].value > 0 && !this.bones.uncollected[e].collector) {
                            const r = this.fastDistance(t, s, this.bones.uncollected[e].x, this.bones.uncollected[e].y);
                            r < a && (a = r, i = this.bones.uncollected[e])
                        } if (!i) break;
                    e.boneList.push(i), i.collector = !0, t = i.x, s = i.y
                }
            }
            e.boneList.length > 0 ? e.target = e.boneList.shift() : e.target = !1
        }
        updateBoneCollector(e, t) {
            switch (!e.target || e.target.graveyard && e.state == We.collecting || this.updateSpeed(e, t), e.state) {
                case We.collecting:
                    if (e.target && e.target.value && e.target.visible || this.findNearestBone(e), e.target && e.target.value > 0 && this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y) < this.collectDistance && (e.bones += e.target.value, e.target.value = 0, e.speedFactor = 0), e.bones >= this.gameModel.boneCollectorCapacity || !e.target) return e.state = We.returning, void (e.target = this.graveyard.sprite);
                    break;
                case We.returning:
                    e.target || (e.target = this.graveyard.sprite), this.fastDistance(e.position.x, e.position.y, e.target.x, e.target.y) < this.collectDistance && (e.target = !1, this.gameModel.addBones(e.bones), e.bones = 0, e.state = We.collecting, e.speedFactor = 0)
            }
        }
        updateSpeed(e, t) {
            e.speedFactor = Math.min(1, e.speedFactor += 3 * t);
            const s = e.target.x - e.x,
                i = e.target.y - e.y,
                a = Math.abs(s),
                r = Math.abs(i);
            if (0 == Math.max(a, r)) return;
            let n = 1 / Math.max(a, r);
            n *= 1.29289 - (a + r) * n * .29289, e.xSpeed = s * n * this.maxSpeed * e.speedFactor, e.ySpeed = i * n * this.maxSpeed * e.speedFactor, e.position.x += e.xSpeed * t, e.position.y += e.ySpeed * t, e.zIndex = e.position.y
        }
    } ! function (e) {
        e[e.bombing = 0] = "bombing", e[e.returning = 1] = "returning"
    }(qe || (qe = {}));
    class je extends PIXI.AnimatedSprite {
        constructor(e) {
            super(e), this.target = null, this.xSpeed = 0, this.ySpeed = 0, this.bombs = 0, this.speedFactor = 0, this.animationSpeed = .2, this.anchor.set(.5, 1), this.visible = !0
        }
    }
    class $e extends PIXI.Sprite {
        constructor(e) {
            super(e), this.dropped = !1, this.floor = 0, this.rotSpeed = 0, this.xSpeed = 0, this.ySpeed = 0, this.fire = !1, this.anchor.set(.5, .5)
        }
    }
    class Ke {
        constructor() {
            if (this.sprites = [], this.discardedSprites = [], this.bombSprites = [], this.discardedBombSprites = [], this.bombHeight = 100, this.scaling = 2.5, this.fastDistance = i, Ke.instance) return Ke.instance;
            Ke.instance = this
        }
        populate() {
            if (this.model = ne.getInstance(), this.graveyard = new Oe, this.zombies = new Ae, this.humans = new Se, this.tanks = new De, !this.textures) {
                this.textures = [];
                for (let e = 0; e < 2; e++) this.textures.push(PIXI.Texture.from("harpy" + (e + 1) + ".png"));
                this.bombTexture = PIXI.Texture.from("harpybomb.png")
            }
            void 0 === this.model.persistentData.harpies && (this.model.persistentData.harpies = 0);
            for (let e = 0; e < this.bombSprites.length; e++) this.bombSprites[e].visible && (this.bombSprites[e].visible = !1, this.discardedBombSprites.push(this.bombSprites[e]));
            for (let e = 0; e < this.sprites.length; e++) this.sprites[e].bomb = null, this.sprites[e].target = !1, this.sprites[e].position.set(this.graveyard.sprite.x, this.graveyard.sprite.y - this.bombHeight), this.sprites[e].state = qe.returning
        }
        addAndRemoveHarpies() {
            if (this.sprites.length > this.model.persistentData.harpies) {
                const e = this.sprites.pop();
                e.target = !1, e.bomb && (e.bomb.dropped = !0, e.bomb.floor = e.bomb.y + this.bombHeight), b.removeChild(e), this.discardedSprites.push(e)
            }
            if (this.sprites.length < this.model.persistentData.harpies) {
                const e = this.discardedSprites.length > 0 ? this.discardedSprites.pop() : new je(this.textures);
                e.position.set(this.graveyard.sprite.x, this.graveyard.sprite.y - this.bombHeight), e.zIndex = e.position.y, e.scale.set(Math.random() > .5 ? this.scaling : -1 * this.scaling, this.scaling), e.state = qe.returning, e.play(), this.sprites.push(e), b.addChild(e)
            }
        }
        update(e) {
            for (let t = 0; t < this.sprites.length; t++) this.updateHarpy(this.sprites[t], e);
            for (let t = 0; t < this.bombSprites.length; t++) this.bombSprites[t].visible && this.updateBomb(this.bombSprites[t], e)
        }
        updateBomb(e, t) {
            e.dropped ? (e.rotation += t * e.rotSpeed, e.ySpeed += 50 * t, e.scale.x = e.scale.y -= .2 * t, e.y += e.ySpeed * t, e.y >= e.floor - 2 && (e.visible = !1, this.discardedBombSprites.push(e), e.fire && this.humans.burnHuman(e.target, .1 * this.model.zombieHealth), this.zombies.causePlagueExplosion(e, .2 * this.model.zombieHealth, !1, !1))) : (e.x = e.harpy.x, e.y = e.harpy.y)
        }
        updateHarpy(e, t) {
            switch (e.state) {
                case qe.bombing:
                    if (!e.target || e.target.graveyard || e.target.dead)
                        if (this.model.tankBuster && this.model.isBossStage(this.model.level) && this.tanks.aliveTanks.length > 0) e.target = a(this.tanks.aliveTanks, Math.random()), e.bomb.fire = !0;
                        else {
                            for (let t = 0; t < 8 && (e.target = a(this.humans.aliveHumans, Math.random()), e.target && !(this.fastDistance(e.x, e.y, e.target.x, e.target.y - this.bombHeight) < 500)); t++);
                            e.bomb.fire = !1
                        } if (!e.target) return void (e.state = qe.returning);
                    this.fastDistance(e.x, e.y, e.target.x, e.target.y - this.bombHeight) < 10 ? (e.bombs--, e.bomb.dropped = !0, e.bomb.floor = e.target.y, e.bomb.target = e.target, e.bomb = null, e.speedFactor = 0, e.target = !1, e.bombs <= 0 ? e.state = qe.returning : this.getBomb(e)) : this.updateHarpySpeed(e, t);
                    break;
                case qe.returning:
                    e.target || (e.target = this.graveyard.sprite), this.fastDistance(e.x, e.y, e.target.x, e.target.y - this.bombHeight) < 10 ? (e.bombs = this.model.harpyBombs, e.bomb || this.getBomb(e), e.state = qe.bombing, e.speedFactor = 0) : this.updateHarpySpeed(e, t)
            }
        }
        getBomb(e) {
            let t;
            this.discardedBombSprites.length > 0 ? t = this.discardedBombSprites.pop() : (t = new $e(this.bombTexture), this.bombSprites.push(t), b.addChild(t)), t.scale.x = t.scale.y = 2, t.rotation = 0, t.rotSpeed = Math.random() > .5 ? 4 : -4, t.ySpeed = 0, t.visible = !0, t.dropped = !1, t.harpy = e, e.bomb = t
        }
        updateHarpySpeed(e, t) {
            e.speedFactor = Math.min(1, e.speedFactor += 2 * t);
            const s = e.target.x - e.x,
                i = e.target.y - this.bombHeight - e.y,
                a = Math.abs(s),
                r = Math.abs(i);
            if (0 == Math.max(a, r)) return;
            let n = 1 / Math.max(a, r);
            n *= 1.29289 - (a + r) * n * .29289, e.xSpeed = s * n * this.model.harpySpeed * e.speedFactor, e.ySpeed = i * n * this.model.harpySpeed * e.speedFactor, e.position.x += e.xSpeed * t, e.position.y += e.ySpeed * t, e.scale.x = e.xSpeed > 0 ? this.scaling : -1 * this.scaling
        }
    }
    class Qe {
        constructor() {
            if (this.blood = new _e, this.smoke = new ot, this.prestigePoints = new Je, this.bullets = new rt, this.exclamations = new it, this.blasts = new nt, this.fragments = new lt, Qe.instance) return Qe.instance;
            Qe.instance = this
        }
        initialize() {
            this.blood.initialize(), this.bullets.initialize(), this.exclamations.initialize(), this.blasts.initialize(), this.smoke.initialize(), this.fragments.initialize(), this.prestigePoints.initialize()
        }
        update(e) {
            this.blood.update(e), this.bullets.update(e), this.exclamations.update(e), this.blasts.update(e), this.smoke.update(e), this.fragments.update(e), this.prestigePoints.update(e),
                function (e) {
                    for (let t = 0; t < Be.length; t++) Be[t].updateCritText(e)
                }(e)
        }
    }
    class Je extends _ {
        constructor() {
            if (super(), this.zmMap = new ee, this.speed = 20, Je.instance) return Je.instance;
            Je.instance = this, this.create = e => new J(e)
        }
        initialize() {
            this.gameModel = ne.getInstance(), this.container || (this.setup(new PIXI.Container, PIXI.Texture.from("pp.png")), b.addChild(this.container)), this.targetElement = document.getElementById("prestige-button"), this.animElement = document.getElementById("prestige-bg")
        }
        update(e) {
            if (!this.gameModel.persistentData.particles) return void (this.container.visible = !1);
            this.container.visible = !0;
            let t = {
                x: 0,
                y: 0
            };
            if (null != this.targetElement) {
                const e = this.targetElement.getBoundingClientRect();
                t = {
                    x: e.x + e.width / 2,
                    y: e.y + e.height / 2
                }, t.x -= c.x, t.y -= c.y, t.x = t.x / c.scale.x, t.y = t.y / c.scale.y
            }
            for (let s = 0; s < this.sprites.length; s++) this.sprites[s].visible && this.updatePart(this.sprites[s], e, t)
        }
        updatePart(e, t, s) {
            const a = this.zmMap.normalizeVector({
                x: s.x - e.x,
                y: s.y - e.y
            }),
                r = 300 * a.x - e.xSpeed,
                n = 300 * a.y - e.ySpeed;
            if (e.xSpeed += r * t, e.ySpeed += n * t, e.x += e.xSpeed * t, e.y += e.ySpeed * t, i(e.x, e.y, s.x, s.y) < 30 && (e.visible = !1, e.x = 100, e.y = 100, this.animElement)) {
                const e = this.animElement;
                e.classList.toggle("levelup"), setTimeout((function () {
                    e.classList.toggle("levelup")
                }), 3e3)
            }
        }
        newPart(e, t) {
            if (!this.container.visible) return;
            const s = this.getSprite();
            s.x = e, s.y = t - 10, s.visible = !0, s.scale.set(2, 2), s.xSpeed = 0, s.ySpeed = -100
        }
    }
    class _e {
        constructor() {
            if (this.maxParts = 500, this.partCounter = 0, this.partsPerSplatter = 6, this.ecoPartsPerSplatter = 3, this.container = null, this.sprites = [], this.gravity = 100, this.spraySpeed = 20, this.fadeSpeed = .7, this.visibleParts = 0, this.viewableArea = null, _e.instance) return _e.instance;
            _e.instance = this
        }
        getTexture(e) {
            const t = document.createElement("canvas");
            t.width = 1, t.height = 1;
            const s = t.getContext("2d");
            return s.fillStyle = e, s.fillRect(0, 0, 1, 1), PIXI.Texture.from(t)
        }
        initialize() {
            if (this.gameModel = ne.getInstance(), this.viewableArea = G, this.container || (this.container = new PIXI.Container, p.addChild(this.container), this.texture = this.getTexture("#ff0000"), this.plagueTexture = this.getTexture("#00ff00")), this.sprites.length < this.maxParts)
                for (let e = 0; e < this.maxParts; e++) {
                    const e = new ht(this.texture);
                    this.sprites.push(e), e.visible = !1, Math.random() > .5 && e.scale.set(2, 2), this.container.addChild(e)
                }
        }
        update(e) {
            if (this.gameModel.persistentData.particles) {
                this.container.visible = !0, this.visibleParts = 0;
                for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && (this.updatePart(this.sprites[t], e), this.visibleParts++)
            } else this.container.visible = !1
        }
        updatePart(e, t) {
            e.hitFloor ? (e.alpha -= this.fadeSpeed * t, e.alpha <= 0 && (e.visible = !1)) : (e.ySpeed += this.gravity * t, e.x += e.xSpeed * t, e.y += e.ySpeed * t, e.y >= e.floor && (e.hitFloor = !0))
        }
        newPart(e, t, s) {
            if (this.viewableArea.hideParticle(e, t)) return;
            const i = this.sprites[this.partCounter++];
            this.partCounter >= this.maxParts && (this.partCounter = 0), i.texture = s ? this.plagueTexture : this.texture, i.x = e, i.y = t - (8 + 10 * Math.random()), i.floor = t, i.hitFloor = !1, i.visible = !0, i.alpha = 1, i.scale.set(1, 1), Math.random() > .5 && i.scale.set(2, 2);
            const a = Math.random() * (s ? 1.5 * this.spraySpeed : this.spraySpeed);
            i.xSpeed = Math.random() > .5 ? -1 * a : a, i.ySpeed = -1 * (s ? 1.5 * this.spraySpeed : this.spraySpeed)
        }
        newSplatter(e, t) {
            if (this.container.visible)
                if (this.visibleParts < .9 * this.maxParts)
                    for (let s = 0; s < this.partsPerSplatter; s++) this.newPart(e, t, !1);
                else
                    for (let s = 0; s < this.ecoPartsPerSplatter; s++) this.newPart(e, t, !1)
        }
        newPlagueSplatter(e, t) {
            if (this.container.visible)
                for (let s = 0; s < this.partsPerSplatter; s++) this.newPart(e, t, !0)
        }
    }
    class et extends J {
        constructor() {
            super(...arguments), this.fadeTime = 0, this.floor = 0, this.rotSpeed = 0, this.value = 1, this.collector = null, this.hitFloor = !1
        }
    }
    class tt {
        constructor() {
            if (this.partsLimit = 100, this.partsPerSplatter = 3, this.container = null, this.sprites = [], this.discardedSprites = [], this.uncollected = [], this.gravity = 100, this.spraySpeed = 20, this.fadeTime = 40, this.fadeSpeed = .2, this.fadeBones = !1, this.texture = null, this.gameModel = null, tt.instance) return tt.instance;
            tt.instance = this
        }
        getTexture() {
            const e = document.createElement("canvas");
            e.width = 4, e.height = 1;
            const t = e.getContext("2d");
            return t.fillStyle = "#dddddd", t.fillRect(0, 0, 4, 1), PIXI.Texture.from(e)
        }
        initialize() {
            this.gameModel = ne.getInstance(), this.container || (this.container = new PIXI.Container, p.addChild(this.container), this.texture = this.getTexture());
            for (let e = 0; e < this.sprites.length; e++) this.sprites[e].value = 0, this.sprites[e].visible = !1, this.container.removeChild(this.sprites[e]);
            this.discardedSprites = this.sprites.slice()
        }
        update(e) {
            const t = [];
            for (let s = 0; s < this.sprites.length; s++) this.sprites[s].visible && (this.updatePart(this.sprites[s], e), t.push(this.sprites[s]));
            this.uncollected = t, this.fadeBones = t.length > 200
        }
        updatePart(e, t) {
            if (e.value <= 0) return e.visible = !1, this.discardedSprites.push(e), void this.container.removeChild(e);
            e.hitFloor ? (this.fadeBones && (e.fadeTime -= t), e.fadeTime < 0 && !e.collector && (e.alpha -= this.fadeSpeed * t, e.alpha <= 0 && (e.visible = !1, this.discardedSprites.push(e), this.container.removeChild(e)))) : (e.ySpeed += this.gravity * t, e.rotation += e.rotSpeed * t, e.x += e.xSpeed * t, e.y += e.ySpeed * t, e.y >= e.floor && (e.hitFloor = !0))
        }
        newPart(e, t, s) {
            let i = null;
            this.discardedSprites.length > 0 ? i = this.discardedSprites.pop() : (i = new et(this.texture), this.sprites.push(i)), this.container.addChild(i), i.x = e, i.y = t - (8 + 10 * Math.random()), i.fadeTime = Math.random() * this.fadeTime, i.rotation = 5 * Math.random(), i.rotSpeed = 4 * Math.random() - 2, i.floor = t, i.hitFloor = !1, i.collector = !1, i.visible = !0, i.value = s, i.alpha = 1, i.scale.set(1, 1), Math.random() > .5 && i.scale.set(1.5, 1.5);
            const a = Math.random() * this.spraySpeed;
            i.xSpeed = Math.random() > .5 ? -1 * a : a, i.ySpeed = -1 * this.spraySpeed
        }
        newBones(e, t) {
            if (this.gameModel.constructions.graveyard)
                if (this.sprites.length - this.discardedSprites.length > this.partsLimit) this.newPart(e, t, 3);
                else
                    for (let s = 0; s < this.partsPerSplatter; s++) this.newPart(e, t, 1)
        }
    }
    class st extends PIXI.Sprite {
        constructor() {
            super(...arguments), this.time = 0, this.target = null
        }
    }
    class it {
        constructor() {
            if (this.sprites = [], this.discardedSprites = [], this.maxSprites = 10, this.height = 20, this.fadeSpeed = 4, it.instance) return it.instance;
            it.instance = this
        }
        initialize() {
            this.container || (this.container = new PIXI.Container, b.addChild(this.container), this.healTexture = PIXI.Texture.from("healing.png"), this.exclamationTexture = PIXI.Texture.from("exclamation.png"), this.radioTexture = PIXI.Texture.from("radio.png"), this.fireTexture = PIXI.Texture.from("fire.png"), this.shieldTexture = PIXI.Texture.from("shield.png"), this.poisonTexture = PIXI.Texture.from("poison.png"));
            for (let e = 0; e < this.sprites.length; e++) this.container.removeChild(this.sprites[e]);
            if (this.sprites.length < this.maxSprites)
                for (let e = 0; e < this.maxSprites; e++) {
                    const e = new st(this.exclamationTexture);
                    e.anchor.set(.5, 1), this.sprites.push(e), e.visible = !1
                }
            this.discardedSprites = this.sprites.slice()
        }
        newIcon(e, t, s) {
            if (e.hasIcon) return;
            let i;
            this.discardedSprites.length > 0 ? i = this.discardedSprites.pop() : (i = new st(this.exclamationTexture), i.anchor.set(.5, 1), this.sprites.push(i)), this.container.addChild(i), i.texture = t, i.target = e, i.target.hasIcon = !0, i.x = e.x, i.y = e.y - this.height, i.visible = !0, i.time = s, i.alpha = 1, i.scale.set(1.5, 1.5)
        }
        newHealing(e) {
            this.newIcon(e, this.healTexture, 1)
        }
        newExclamation(e) {
            this.newIcon(e, this.exclamationTexture, 2)
        }
        newRadio(e) {
            this.newIcon(e, this.radioTexture, 3)
        }
        newFire(e) {
            this.newIcon(e, this.fireTexture, 1)
        }
        newShield(e) {
            this.newIcon(e, this.shieldTexture, 1)
        }
        newPoison(e) {
            this.newIcon(e, this.poisonTexture, 1)
        }
        update(e) {
            for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && this.updateSprite(this.sprites[t], e)
        }
        updateSprite(e, t) {
            e.x = e.target.x, e.y = e.target.y - this.height, e.time -= t, e.time < 0 && (e.alpha -= t * this.fadeSpeed, e.alpha < 0 && (e.visible = !1, e.target.hasIcon = !1, this.discardedSprites.push(e)))
        }
    }
    class at extends J {
        constructor() {
            super(...arguments), this.plague = !1, this.rocket = !1, this.fireball = !1, this.darkorb = !1, this.target = null, this.source = null, this.hitbox = 0, this.damage = 0
        }
    }
    class rt {
        constructor() {
            if (this.zombies = new Ae, this.humans = new Se, this.graveyard = new Oe, this.army = new Te, this.maxParts = 20, this.speed = 150, this.hitbox = 12, this.sprites = [], this.discardedSprites = [], this.fadeSpeed = .2, rt.instance) return rt.instance;
            rt.instance = this
        }
        getTexture() {
            const e = document.createElement("canvas");
            e.width = 1, e.height = 1;
            const t = e.getContext("2d");
            return t.fillStyle = "#ffffff", t.fillRect(0, 0, 1, 1), PIXI.Texture.from(e)
        }
        getFireballTexture() {
            const e = document.createElement("canvas");
            e.width = 8, e.height = 8;
            const t = e.getContext("2d"),
                s = t.createRadialGradient(4, 4, 0, 4, 4, 4);
            return s.addColorStop(0, "rgba(255,255,0,1)"), s.addColorStop(.8, "rgba(255,0,0,0.2)"), s.addColorStop(1, "rgba(255,0,0,0)"), t.fillStyle = s, t.fillRect(0, 0, 8, 8), PIXI.Texture.from(e)
        }
        getDarkOrbTexture() {
            const e = document.createElement("canvas");
            e.width = 8, e.height = 8;
            const t = e.getContext("2d"),
                s = t.createRadialGradient(4, 4, 0, 4, 4, 4);
            return s.addColorStop(0, "rgba(0,0,0,1)"), s.addColorStop(.8, "rgba(0,0,128,0.5)"), s.addColorStop(1, "rgba(0,0,255,0)"), t.fillStyle = s, t.fillRect(0, 0, 8, 8), PIXI.Texture.from(e)
        }
        initialize() {
            this.texture || (this.texture = this.getTexture(), this.fireballTexture = this.getFireballTexture(), this.darkOrbTexture = this.getDarkOrbTexture());
            for (let e = 0; e < this.sprites.length; e++) g.removeChild(this.sprites[e]);
            if (this.sprites.length < this.maxParts)
                for (let e = 0; e < this.maxParts; e++) {
                    const e = new at(this.texture);
                    e.scale.x = e.scale.y = 2, e.visible = !1, this.sprites.push(e)
                }
            this.discardedSprites = this.sprites.slice()
        }
        update(e) {
            for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && this.updatePart(this.sprites[t], e)
        }
        updatePart(e, t) {
            i(e.x, e.y + 8, e.target.x, e.target.y) < e.hitbox ? (e.plague ? (this.zombies.inflictPlague(e.target), this.humans.damageHuman(e.target, e.damage)) : e.fireball ? (this.humans.burnHuman(e.target, e.damage), this.humans.damageHuman(e.target, e.damage)) : e.darkorb ? e.target.flags.dead || (this.humans.damageHuman(e.target, e.damage), e.target.timer.dogStun = 5, (new Xe).orbHit(e.target)) : !e.rocket && e.target.bulletReflect && Math.random() < e.target.bulletReflect ? this.newBullet(e.target, e.source, e.damage, !1, !1, !1) : e.rocket ? (e.target.graveyard && this.graveyard.damageGraveyard(e.damage), this.army.droneExplosion(e.target.x, e.target.y, null, e.damage)) : (e.target.zombie && this.zombies.damageZombie(e.target, e.damage, e.source), e.target.human && this.humans.damageHuman(e.target, e.damage)), e.visible = !1, this.discardedSprites.push(e), g.removeChild(e)) : (e.x += e.xSpeed * t, e.y += e.ySpeed * t, e.zIndex = e.y), e.darkorb ? e.alpha -= this.fadeSpeed * t * .4 : e.alpha -= this.fadeSpeed * t, e.alpha < 0 && (e.visible = !1, this.discardedSprites.push(e), g.removeChild(e))
        }
        newBullet(e, t, s, i = !1, a = !1, r = !1, n = !1) {
            let o;
            this.discardedSprites.length > 0 ? o = this.discardedSprites.pop() : (o = new at(this.texture), o.scale.x = o.scale.y = 2, this.sprites.push(o)), g.addChild(o), o.texture = n ? this.darkOrbTexture : r ? this.fireballTexture : this.texture, o.source = e, o.x = e.x, o.y = e.y - 8, i && (o.y = e.y - 12), o.target = t, o.damage = s, o.visible = !0, o.alpha = 1, o.hitbox = a ? 1.5 * this.hitbox : this.hitbox, o.plague = i, o.rocket = a, o.fireball = r, o.darkorb = n, o.tint = i ? 65280 : a ? 16772096 : 16777215, o.scale.x = o.scale.y = a ? 2.5 : 2, r && (o.scale.x = o.scale.y = 1.5);
            const h = t.x - o.x,
                l = t.y - 8 - o.y,
                d = Math.abs(h),
                c = Math.abs(l);
            let u = 1 / Math.max(d, c);
            u *= 1.29289 - (d + c) * u * .29289, o.xSpeed = h * u * this.speed, o.ySpeed = l * u * this.speed, o.rotation = Math.atan2(o.ySpeed, o.xSpeed)
        }
    }
    class nt extends _ {
        constructor() {
            if (super(), this.viewableArea = null, nt.instance) return nt.instance;
            nt.instance = this, this.create = e => new J(e)
        }
        getTexture() {
            const e = document.createElement("canvas");
            e.width = 32, e.height = 32;
            const t = e.getContext("2d"),
                s = t.createRadialGradient(16, 16, 0, 16, 16, 16);
            return s.addColorStop(0, "rgba(255,255,255,1)"), s.addColorStop(.8, "rgba(255,255,128,0.2)"), s.addColorStop(1, "rgba(255,180,0,0)"), t.fillStyle = s, t.fillRect(0, 0, 32, 32), PIXI.Texture.from(e)
        }
        initialize() {
            this.viewableArea = G, this.texture || (this.texture = this.getTexture(), this.container = new PIXI.Container, b.addChild(this.container), this.setup(this.container, this.texture))
        }
        update(e) {
            for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && this.updatePart(this.sprites[t], e)
        }
        updatePart(e, t) {
            e.visible && (e.scale.y -= 10 * t, e.scale.x = e.scale.y, e.scale.x <= 0 && this.discardSprite(e))
        }
        newBlast(e, t) {
            if (this.viewableArea.hideParticle(e, t)) return;
            const s = this.getSprite();
            s.anchor.set(.5, .5), s.tint = 16777215, s.scale.x = s.scale.y = 2, s.x = e, s.y = t, (new ot).newCloud(e, t)
        }
        newZombieBlast(e, t) {
            if (this.viewableArea.hideParticle(e, t)) return;
            const s = this.getSprite();
            s.anchor.set(.5, .5), s.tint = 11206570, s.scale.x = s.scale.y = 2, s.x = e, s.y = t, (new ot).newCloud(e, t)
        }
        newDetonateBlast(e, t) {
            if (this.viewableArea.hideParticle(e, t)) return;
            const s = this.getSprite();
            s.anchor.set(.5, .5), s.tint = 6750054, s.scale.x = s.scale.y = 2.5, s.x = e, s.y = t, (new ot).newCloud(e, t)
        }
        newDroneBlast(e, t) {
            const s = this.getSprite();
            s.anchor.set(.5, .5), s.scale.x = s.scale.y = 2, s.tint = 16777215, s.x = e, s.y = t, (new ot).newDroneCloud(e, t)
        }
    }
    class ot extends _ {
        constructor() {
            if (super(), this.tint = 16777215, this.viewableArea = null, this.allowTint = !1, this.gameModel = null, this.sizeVariance = .2, ot.instance) return ot.instance;
            ot.instance = this, this.create = e => new J(e)
        }
        getTexture() {
            const e = document.createElement("canvas");
            e.width = 12, e.height = 12;
            const t = e.getContext("2d");
            t.shadowBlur = 5, t.shadowColor = "white";
            const s = t.createRadialGradient(6, 6, 0, 6, 6, 4);
            return s.addColorStop(0, "rgba(255,255,255,0.05)"), s.addColorStop(.5, "rgba(255,255,255,0.1)"), s.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = s, t.fillRect(0, 0, 12, 12), PIXI.Texture.from(e)
        }
        initialize() {
            this.gameModel = ne.getInstance(), this.viewableArea = G, this.allowTint = this.gameModel.app && this.gameModel.app.renderer && 1 == this.gameModel.app.renderer.type, this.texture || (this.setup(new PIXI.Container, this.getTexture()), b.addChild(this.container))
        }
        update(e) {
            if (this.gameModel.persistentData.particles) {
                this.container.visible = !0;
                for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && this.updatePart(this.sprites[t], e)
            } else this.container.visible = !1
        }
        updatePart(e, t) {
            e.scale.y -= 1.5 * t, e.scale.x = e.scale.y, e.y += e.ySpeed * t, e.scale.x <= 0 && this.discardSprite(e)
        }
        newSmoke(e, t, s = 0) {
            if (this.viewableArea.hideParticle(e, t)) return;
            const i = this.getSprite();
            this.allowTint && (i.tint = this.tint), i.ySpeed = -30, i.anchor.set(.5, .5), i.scale.x = i.scale.y = 1.6 - this.sizeVariance + Math.random() * this.sizeVariance * 2, i.visible = !0, i.x = e - s + Math.random() * s * 2, i.y = t - s + Math.random() * s * 2
        }
        newFireSmoke(e, t) {
            this.container.visible && (this.tint = 16777215, this.newSmoke(e, t, 3))
        }
        newCloud(e, t) {
            if (this.container.visible) {
                this.tint = 65280;
                for (let s = 0; s < 10; s++) this.newSmoke(e, t, 16)
            }
        }
        newDroneCloud(e, t) {
            if (this.container.visible) {
                this.tint = 16777215;
                for (let s = 0; s < 10; s++) this.newSmoke(e, t, 24)
            }
        }
        newZombieSpawnCloud(e, t) {
            if (this.container.visible) {
                this.tint = 65280;
                for (let s = 0; s < 5; s++) this.newSmoke(e, t, 6)
            }
        }
    }
    class ht extends J {
        constructor() {
            super(...arguments), this.hitFloor = !1
        }
    }
    class lt extends _ {
        constructor() {
            if (super(), this.partsPerSplatter = 15, this.gravity = 100, this.spraySpeed = 50, this.fadeSpeed = .7, this.viewableArea = G, lt.instance) return lt.instance;
            lt.instance = this, this.create = e => new ht(e)
        }
        getTexture() {
            const e = document.createElement("canvas");
            e.width = 5, e.height = 1;
            const t = e.getContext("2d");
            return t.fillStyle = "#FFFFFF", t.fillRect(0, 0, 5, 1), PIXI.Texture.from(e)
        }
        initialize() {
            this.gameModel = ne.getInstance(), this.viewableArea = G, this.container || (this.container = new PIXI.Container, p.addChild(this.container), this.texture = this.getTexture(), this.setup(this.container, this.texture))
        }
        update(e) {
            if (this.gameModel.persistentData.particles) {
                this.container.visible = !0;
                for (let t = 0; t < this.sprites.length; t++) this.sprites[t].visible && this.updatePart(this.sprites[t], e)
            } else this.container.visible = !1
        }
        updatePart(e, t) {
            e.hitFloor ? (e.alpha -= this.fadeSpeed * t, e.alpha <= 0 && this.discardSprite(e)) : (e.ySpeed += this.gravity * t, e.x += e.xSpeed * t, e.y += e.ySpeed * t, e.y >= e.floor && (e.hitFloor = !0), e.rotation += e.rotSpeed * t)
        }
        newPart(e, t, s) {
            if (!this.container.visible) return;
            if (this.viewableArea.hideParticle(e, t)) return;
            const i = this.getSprite();
            i.tint = s, i.x = e, i.y = t - (8 + 10 * Math.random()), i.floor = t, i.hitFloor = !1, i.rotation = 5 * Math.random(), i.rotSpeed = 4 * Math.random() - 2, i.alpha = 1, i.scale.set(2, 2);
            const a = Math.random() * this.spraySpeed;
            i.xSpeed = Math.random() > .5 ? -1 * a : a, i.ySpeed = -1 * (10 + Math.random() * this.spraySpeed)
        }
        newFragmentExplosion(e, t, s) {
            if (this.container.visible)
                for (let i = 0; i < this.partsPerSplatter; i++) this.newPart(e, t, s)
        }
    }
    const dt = new Xe,
        ct = new Ae,
        ut = new Ue,
        pt = new ae,
        gt = new q,
        mt = "Golem Mastery",
        bt = "Zombie Mastery",
        ft = "Skeleton Mastery",
        yt = "Spell Mastery";
    class xt {
        constructor(e, t, s, i, a, r) {
            this.id = 0, this.maxPoints = 0, this.active = function () {
                return dt.talents[this.id] && dt.talents[this.id] > 0
            }, this.full = function () {
                return dt.talents[this.id] && 10 == dt.talents[this.id]
            }, this.reset = function () {
                dt.talents[this.id] = 0
            }, this.max = function () {
                dt.talents[this.id] = this.maxPoints, dt.getAvailablePoints() < 0 && (dt.talents[this.id] += dt.getAvailablePoints())
            }, this.set = function (e) {
                dt.talents[this.id] || (dt.talents[this.id] = 0), (e < 0 || e > 0 && dt.getAvailablePoints() > 0) && (dt.talents[this.id] += e, dt.talents[this.id] < 0 && (dt.talents[this.id] = 0), dt.talents[this.id] > this.maxPoints && (dt.talents[this.id] = this.maxPoints))
            }, this.id = e, this.name = t, this.description = r, this.group = s, this.maxPoints = i, this.apply = a
        }
    }
    class vt {
        constructor(e, t) {
            this.talents = [], this.name = e, this.class = t
        }
    }
    const St = [new xt(1, "Efficiency", mt, 12, (function () {
        pt.creatureCostReduction = 1;
        const e = dt.talents[this.id];
        e && e > 0 && (pt.creatureCostReduction -= .075 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Golem upgrade and summoning cost reduced by ${7.5 * e}%` : "Reduces golem upgrade and summoning cost by 7.5%"
    })), new xt(2, "Thrifty", mt, 12, (function () {
        dt.killingBlowParts = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (dt.killingBlowParts = 10 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Skeleton killing blows reward ${10 * e}x of your current parts per second` : "Skeleton killing blows reward 10x of your current parts per second"
    })), new xt(3, "Fatal Bargain", mt, 12, (function () {
        ut.refundChance = 0, ct.refundChance = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (ut.refundChance = .08 * e, ct.refundChance = .08 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? 8 * e + "% parts refund on golem death" : "Grants 8% parts refund on golem death"
    })), new xt(4, "Recovery", yt, 12, (function () {
        gt.cooldownReduction = 1;
        const e = dt.talents[this.id];
        e && e > 0 && (gt.cooldownReduction = 1 - .05 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Spell cooldown time reduced by ${5 * e}%` : "Reduces spell cooldown time by 5%"
    })), new xt(5, "Endurance", yt, 12, (function () {
        gt.timeExtension = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (gt.timeExtension = e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Spell duration increased by ${e} seconds` : "Increases spell duration by 1 second"
    })), new xt(6, "Opportunist", yt, 12, (function () {
        gt.costReduction = 0;
        dt.increaseChance = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (dt.increaseChance = 0.02 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Gear spell activation chance increased by ${2 * e}%` : "Increases spell activation chance by 2%"
    })), new xt(7, "Shiny", ft, 12, (function () {
        dt.lootChanceMod = 1;
        const e = dt.talents[this.id];
        e && e > 0 && (dt.lootChanceMod = 1 + .1 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Rare loot chance increased by ${10 * e}%` : "Increases the chance for rare loot by 10%"
    })), new xt(8, "Dark Orb", ft, 10, (function () {
        dt.darkorb = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (dt.darkorb = 12 - e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Dark orb released every ${12 - e} seconds` : "Releases a dark orb of energy every 11 seconds"
    })), new xt(9, "Bone Shield", ft, 12, (function () {
        dt.boneshield = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (dt.boneshield = e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Gains a shield of ${e} bones every 10 seconds` : "Gain a shield of 1 bone to protect the skeleton every 10 seconds"
    })), new xt(10, "Gigamutagen", bt, 12, (function () {
        ct.gigamutagen = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (ct.gigamutagen = 14 - e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `Gigazombie mutation every ${14 - e} seconds` : "Mutates a random zombie into a gigazombie every 13 seconds"
    })), new xt(11, "Blood Pact", bt, 12, (function () {
        ct.bloodpact = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (ct.bloodpact = .05 * e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? 5 * e + "% of zombie damage converted to blood" : "Converts an additional 5% of zombie damage to blood"
    })), new xt(12, "Blood Born", bt, 12, (function () {
        ct.bloodborn = 0;
        const e = dt.talents[this.id];
        e && e > 0 && (ct.bloodborn = e)
    }), (function () {
        const e = dt.talents[this.id];
        return e && e > 0 ? `${e} seconds of additional 50% damage reduction` : "Grants 1 second of additional 50% damage reduction to newly spawned zombies"
    }))],
        Mt = [];

    function kt() {
        St.forEach((e => {
            const t = dt.talents[e.id];
            t && t < 0 && (dt.talents[e.id] = 0)
        })), dt.talentPoints < dt.getUsedPoints() && wt(), St.forEach((e => e.apply()))
    }

    function wt() {
        dt.persistent.talentReset && (St.forEach((e => e.reset())), dt.persistent.talentReset = !1)
    }
    St.forEach((e => {
        if (0 == Mt.filter((t => t.name == e.group)).length) {
            let t = "blood";
            e.group == mt && (t = "parts"), e.group == ft && (t = "bones"), e.group == yt && (t = "energy"), e.group == bt && (t = "brains"), Mt.push(new vt(e.group, t))
        }
        Mt.filter((t => t.name == e.group))[0].talents.push(e), dt.talents[e.id] || (dt.talents[e.id] = 0)
    })), angular.module("zombieApp", []).filter("decimal", (function () {
        return r
    })).filter("whole", (function () {
        return n
    })).config(["$compileProvider", function (e) {
        e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript|data|blob):/), e.debugInfoEnabled(!1)
    }]).controller("ZombieController", ["$scope", "$interval", "$document", function (e, t, s) {
        const i = new Xe,
            a = new q,
            r = new se,
            o = new ae,
            h = new oe,
            l = new de,
            c = this;

        function u() {
            const e = (new Date).getTime();
            ! function (e, t) {
                c.model.update(e, t), c.updateMessages(e), c.sidePanels.factory && (c.factoryStats = r.factoryStats())
            }(Math.min(1e3, Math.max(e - c.lastUpdate, 0)) / 1e3, e), c.lastUpdate = e
        }
        c.model = ne.getInstance(), c.skeleton = function () {
            return i.persistent
        }, c.spells = a, c.keysPressed = Y, c.files = [], c.messageTimer = 4, c.message = !1, c.lastUpdate = 0, c.sidePanels = {}, c.upgrades = [], c.currentShopFilter = "blood", c.currentConstructionFilter = "available", c.graveyardTab = "minions", c.trophyTab = "all", c.factoryTab = "parts", c.factoryStats = {}, c.moveTooltip = d, c.confirmMessage = "", c.confirmCancel = function () {
            c.confirmCallback = !1
        }, c.closeSidePanels = function () {
            c.currentShopFilter = "blood", c.currentConstructionFilter = "available", c.graveyardTab = "minions", c.factoryTab = "parts", c.sidePanels.options = !1, c.sidePanels.graveyard = !1, c.sidePanels.runesmith = !1, c.sidePanels.prestige = !1, c.sidePanels.construction = !1, c.sidePanels.shop = !1, c.sidePanels.open = !1, c.sidePanels.factory = !1, c.levelSelect.shown = !1
        }, c.openSidePanel = function (e) {
            switch (c.closeSidePanels(), e) {
                case "shop":
                    c.filterShop(c.currentShopFilter), c.sidePanels.shop = !0;
                    break;
                case "construction":
                    c.filterConstruction(c.currentConstructionFilter), c.sidePanels.construction = !0;
                    break;
                case "graveyard":
                    c.sidePanels.graveyard = !0, c.graveyardTab = "minions", c.trophyTab = "all";
                    break;
                case "runesmith":
                    c.sidePanels.runesmith = !0;
                    break;
                case "factory":
                    c.sidePanels.factory = !0, c.upgrades = r.generators, c.factoryStats = r.factoryStats(), c.factory.updateDelays();
                    break;
                case "prestige":
                    c.upgrades = h.prestigeUpgrades.filter((e => 0 == e.cap || c.currentRank(e) < e.cap)), c.upgrades.push(...h.prestigeUpgrades.filter((e => 0 !== e.cap && c.currentRank(e) >= e.cap))), c.upgrades = c.upgrades.filter((e => 115 !== e.id)), c.sidePanels.prestige = !0;
                    break;
                case "options":
                    c.sidePanels.options = !0, c.model.downloadSaveGame()
            }
            c.sidePanels.open = !0
        }, c.graveyardTabSelect = function (e) {
            c.graveyardTab = e, "trophies" == e && (c.trophies = l.getTrophyList(), c.trophyTab = "all")
        }, c.trophyTabSelect = function (e) {
            switch (c.trophyTab = e, e) {
                case "all":
                    c.trophies = l.getTrophyList();
                    break;
                case "collected":
                    c.trophies = l.getTrophyList().filter((e => e.owned));
                    break;
                case "uncollected":
                    c.trophies = l.getTrophyList().filter((e => !e.owned));
                    break;
                case "totals":
                    c.trophies = l.getTrophyTotals()
            }
        }, c.filterShop = function (e) {
            c.currentShopFilter = e, c.upgrades = h.getUpgrades(e)
        }, c.filterConstruction = function (e) {
            switch (c.currentConstructionFilter = e, e) {
                case "available":
                    c.upgrades = h.getAvailableConstructions();
                    break;
                case "completed":
                    c.upgrades = h.getCompletedConstructions()
            }
        }, c.resetGame = function () {
            c.confirmMessage = "Are you sure you want to reset everything? If you have a cloud save it will also be deleted. Make sure you export your save game first.", c.confirmCallback = function () {
                c.model.resetData(), c.confirmCallback = !1
            }
        }, c.addBoneCollector = function () {
            c.model.getEnergyRate() >= 1 && c.model.persistentData.boneCollectors++
        }, c.subtractBoneCollector = function () {
            c.model.persistentData.boneCollectors > 0 && c.model.persistentData.boneCollectors--
        }, c.maxBoneCollectors = function () {
            return Math.floor(c.model.getEnergyRate() + c.model.persistentData.boneCollectors)
        }, c.setBoneCollectors = function (e) {
            e >= 0 && c.model.getEnergyRate() >= e - c.model.persistentData.boneCollectors && (c.model.persistentData.boneCollectors = e)
        }, c.setHarpies = function (e) {
            (e >= 0 && e < c.model.persistentData.harpies || c.model.getEnergyRate() >= 1 && e > 0) && (c.model.persistentData.harpies = e)
        }, c.maxHarpies = function () {
            return Math.floor(c.model.getEnergyRate() + c.model.persistentData.harpies)
        }, c.setGraveyardZombies = function (e) {
            e <= c.maxGraveyardZombies() && e >= 0 && (c.model.persistentData.graveyardZombies = e)
        }, c.maxGraveyardZombies = function () {
            return Math.floor(c.model.energyMax / c.model.zombieCost)
        }, c.upgradePrice = function (e) {
            return c.sidePanels.factory && "prestigePoints" != e.costType ? r.purchasePrice(e) : h.upgradePrice(e)
        }, c.factory = {
            delays: [],
            changeFactoryTab(e) {
                c.factoryTab = e, "parts" == e ? (c.upgrades = r.generators, this.updateDelays()) : c.upgrades = o.creatures
            },
            buyGenerator(e) {
                c.keysPressed.shift ? r.purchaseMaxGenerators(e) : r.purchaseGenerator(e), c.factoryStats = r.factoryStats()
            },
            generatorPrice: e => r.purchasePrice(e),
            creaturePrice: e => o.purchasePrice(e),
            creatureLevelPrice: e => o.levelPrice(e),
            creaturePercent(e) {
                return Math.min(Math.round(c.model.persistentData.parts / this.creaturePrice(e) * 100), 100)
            },
            creatureLevelPercent(e) {
                return Math.min(Math.round(c.model.persistentData.parts / this.creatureLevelPrice(e) * 100), 100)
            },
            buyCreature: e => o.startBuilding(e),
            creatureTooExpensive: e => !o.canAffordCreature(e),
            creatureButtonText(e) {
                return e.building ? "Building..." : this.creatureTooExpensive(e) ? n(this.creaturePrice(e) - c.model.persistentData.parts) + " parts required" : "Build (" + n(this.creaturePrice(e)) + " parts)"
            },
            creatureLevelButtonText(e) {
                return this.canLevelCreature(e) ? "Upgrade Level " + (e.level + 1) + " (" + n(this.creatureLevelPrice(e)) + " parts)" : n(this.creatureLevelPrice(e) - c.model.persistentData.parts) + " parts required"
            },
            canBuildCreature(e) {
                return !this.creatureTooExpensive(e) && !e.building && o.creaturesBuildingCount() + c.model.creatureCount < c.model.creatureLimit
            },
            canLevelCreature(e) {
                return this.creatureLevelPrice(e) < c.model.persistentData.parts
            },
            levelCreature(e) {
                o.levelCreature(e)
            },
            autoBuild(e, t) {
                e.autobuild + t >= 0 && e.autobuild + t <= c.model.creatureLimit && o.creatureAutoBuildNumber(e, t)
            },
            creatureStats: e => o.creatureStats(e),
            updateDelays() {
                this.delays = [];
                for (let e = 0; e < r.generatorsApplied.length; e++) this.delays[r.generatorsApplied[e].id] = (-1 * (r.generatorsApplied[e].time - r.generatorsApplied[e].timeLeft)).toFixed(2)
            }
        }, c.levelSelect = {
            shown: !1,
            levelsPerPage: 50,
            levels: [],
            levelRanges: [],
            start: 1,
            showButton: () => c.model.persistentData.allTimeHighestLevel > 1,
            show() {
                this.shown ? this.shown = !1 : (c.closeSidePanels(), this.shown = !0, this.level = c.model.levelInfo(c.model.level), this.start = Math.floor((this.level.level - 1) / this.levelsPerPage) * this.levelsPerPage + 1, this.populate())
            },
            populate() {
                this.levels = [], this.levelRanges = [], this.start > this.levelsPerPage && this.levelRanges.push(this.start - this.levelsPerPage), this.levelRanges.push(this.start), this.start + this.levelsPerPage <= c.model.persistentData.allTimeHighestLevel + 1 && this.levelRanges.push(this.start + this.levelsPerPage);
                for (let e = this.start; e < this.start + this.levelsPerPage; e++) this.levels.push(c.model.levelInfo(e))
            },
            selectRange(e) {
                this.start = e, this.populate()
            },
            select(e) {
                this.level = e
            },
            startLevel() {
                c.model.startLevel(this.level.level), this.shown = !1
            }
        }, c.addToHomeScreen = function () {
            c.model.deferredPrompt
        }, c.constructionPercent = function () {
            if (c.model.persistentData.currentConstruction) {
                const e = c.model.persistentData.currentConstruction.time - c.model.persistentData.currentConstruction.timeRemaining;
                return Math.round(e / c.model.persistentData.currentConstruction.time * 100)
            }
            return 0
        }, c.updateConstructionUpgrades = function () {
            1 == c.sidePanels.construction && (c.upgrades = h.getAvailableConstructions())
        }, c.startConstruction = function (e) {
            h.startConstruction(e), c.upgrades = h.getAvailableConstructions()
        }, c.playPauseConstruction = function () {
            h.playPauseConstruction()
        }, c.cancelConstruction = function () {
            c.confirmMessage = "Are you sure you want to cancel construction? Used materials will not be refunded", c.confirmCallback = function () {
                h.cancelConstruction(), c.upgrades = h.getAvailableConstructions(), c.confirmCallback = !1
            }
        }, c.upgradeSubtitle = function (e) {
            switch (e.type) {
                case h.types.energyRate:
                    return "+" + e.effect + " energy per second";
                case h.types.energyCap:
                    return "+" + e.effect + " max energy";
                case h.types.bloodCap:
                    return "+" + n(e.effect) + " max blood";
                case h.types.bloodStoragePC:
                    return "+" + Math.round(100 * e.effect) + "% max blood";
                case h.types.bloodGainPC:
                    return "+" + Math.round(100 * e.effect) + "% blood income";
                case h.types.brainsGainPC:
                    return "+" + Math.round(100 * e.effect) + "% brains income";
                case h.types.bonesGainPC:
                    return "+" + Math.round(100 * e.effect) + "% bones income";
                case h.types.partsGainPC:
                    return "+" + Math.round(100 * e.effect) + "% parts income";
                case h.types.brainsStoragePC:
                    return "+" + Math.round(100 * e.effect) + "% max brains";
                case h.types.energyCost:
                    return "-" + e.effect + " zombie energy cost";
                case h.types.brainsCap:
                    return "+" + e.effect + " max brains";
                case h.types.damage:
                    return "+" + e.effect + " zombie damage";
                case h.types.speed:
                    return "+" + e.effect + " zombie speed";
                case h.types.health:
                    return "+" + e.effect + " zombie health";
                case h.types.brainRecoverChance:
                    return "+" + Math.round(100 * e.effect) + "% chance to recover brain";
                case h.types.riseFromTheDeadChance:
                    return "+" + Math.round(100 * e.effect) + "% chance for corpse to become zombie";
                case h.types.infectedBite:
                    return "+" + Math.round(100 * e.effect) + "% chance for zombies to infect their targets";
                case h.types.infectedBlast:
                    return "+" + Math.round(100 * e.effect) + "% chance for zombies to explode on death";
                case h.types.boneCollectorCapacity:
                    return "+" + e.effect + " bone collector capacity";
                case h.types.zombieDmgPC:
                    return "+" + n(Math.round(100 * e.effect)) + "% zombie damage";
                case h.types.zombieHealthPC:
                    return "+" + n(Math.round(100 * e.effect)) + "% zombie health";
                case h.types.bonesRate:
                    return "+" + e.effect + " bones per second";
                case h.types.brainsRate:
                    return "+" + e.effect + " brains per second";
                case h.types.plagueDamage:
                    return "+" + n(e.effect) + " plague damage";
                case h.types.plagueTicks:
                    return "+" + n(e.effect) + " plague ticks";
                case h.types.spitDistance:
                    return "+" + e.effect + " spit distance";
                case h.types.blastHealing:
                    return "+" + Math.round(100 * e.effect) + "% plague healing";
                case h.types.plagueArmor:
                    return "+" + Math.round(100 * e.effect) + "% damage reduction";
                case h.types.monsterLimit:
                    return "+" + e.effect + " creature limit";
                case h.types.runicSyphon:
                    return "+" + Math.round(100 * e.effect) + "% runic syphon";
                case h.types.gigazombies:
                    return "Unlock more gigazombies";
                case h.types.bulletproof:
                    return "+" + Math.round(100 * e.effect) + "% earth golem bullet reflect";
                case h.types.harpySpeed:
                    return "+" + e.effect + " harpy speed";
                case h.types.harpyBombs:
                    return "+" + e.effect + " harpy bombs";
                case h.types.tankBuster:
                    return "Anti tank harpies";
                case h.types.spikeDelay:
                    return "-20% spike delay"
            }
            return ""
        }, c.currentRank = function (e) {
            return c.sidePanels.factory ? r.currentRank(e) : h.currentRank(e)
        }, c.currentRankConstruction = function (e) {
            return h.currentRankConstruction(e)
        }, c.upgradeTooExpensive = function (e) {
            return c.sidePanels.factory ? !r.canAffordGenerator(e) : !h.canAffordUpgrade(e) || 0 != e.cap && h.currentRank(e) >= e.cap
        }, c.requiredForUpgrade = function (e) {
            const t = c.upgradePrice(e);
            switch (e.costType) {
                case h.costs.energy:
                    return n(t - c.model.energy) + " energy required";
                case h.costs.blood:
                case r.costs.blood:
                    return n(t - c.model.persistentData.blood) + " blood required";
                case h.costs.brains:
                    return n(t - c.model.persistentData.brains) + " brains required";
                case h.costs.bones:
                    return n(t - c.model.persistentData.bones) + " bones required";
                case h.costs.prestigePoints:
                    return n(t - c.model.persistentData.prestigePointsToSpend) + " prestige points required";
                case r.costs.parts:
                    return n(t - c.model.persistentData.parts) + " parts required"
            }
        }, c.purchaseText = function (e) {
            if (c.keysPressed.shift) {
                if (c.sidePanels.factory) {
                    const t = r.upgradeMaxAffordable(e);
                    return "Purchase " + t + " (" + n(r.upgradeMaxPrice(e, t)) + " " + c.costTranslate(e.costType) + ")"
                } {
                    const t = h.upgradeMaxAffordable(e);
                    return "Purchase " + t + " (" + n(h.upgradeMaxPrice(e, t)) + " " + c.costTranslate(e.costType) + ")"
                }
            }
            return "Purchase (" + n(c.upgradePrice(e)) + " " + c.costTranslate(e.costType) + ")"
        }, c.costTranslate = function (e) {
            return e == h.costs.prestigePoints ? "points" : e
        }, c.buyUpgrade = function (e) {
            c.keysPressed.shift ? h.purchaseMaxUpgrades(e) : h.purchaseUpgrade(e)
        }, c.destroyUpgrade = function (e) {
            h.removeUpgrade(e)
        }, c.upgradeStatInfo = function (e) {
            return h.displayStatValue(e)
        }, c.startGame = function () {
            c.model.startGame()
        }, c.nextLevel = function () {
            c.model.nextLevel()
        }, c.toggleAutoStart = function () {
            c.model.persistentData.autoStart ? c.model.persistentData.autoStart = !1 : c.model.persistentData.autoStart = !0
        }, c.toggleAutoStartWait = function () {
            c.model.persistentData.autoStartWait ? c.model.persistentData.autoStartWait = !1 : c.model.persistentData.autoStartWait = !0
        }, c.toggleAutoSellGear = function () {
            c.model.persistentData.autoSellGear ? c.model.persistentData.autoSellGear = !1 : c.model.persistentData.autoSellGear = !0
        }, c.toggleAutoSellGearLegendary = function () {
            c.model.persistentData.autoSellGearLegendary ? c.model.persistentData.autoSellGearLegendary = !1 : c.model.persistentData.autoSellGearLegendary = !0
        }, c.toggleResolution = function (e) {
            c.model.persistentData.resolution = e, c.model.setResolution(c.model.persistentData.resolution)
        }, c.getResolution = function () {
            return c.model.persistentData.resolution || 1
        }, c.toggleZoomButtons = function () {
            c.model.persistentData.zoomButtons = !c.model.persistentData.zoomButtons
        }, c.zoom = function (e) {
            c.model.zoom(e)
        }, c.resetZoom = function () {
            c.model.centerGameContainer(!0)
        }, c.toggleShowFps = function () {
            c.model.persistentData.showfps = !c.model.persistentData.showfps
        }, c.toggleParticles = function () {
            c.model.persistentData.particles = !c.model.persistentData.particles
        }, c.isShowPrestige = function () {
            return void 0 !== c.model.persistentData.prestigePointsEarned && c.model.persistentData.allTimeHighestLevel > 5
        }, c.doPrestige = function () {
            c.confirmMessage = "Are you sure you want to prestige now?", c.confirmCallback = function () {
                c.model.prestige(), c.confirmCallback = !1
            }
        }, c.constructionLeadsTo = function (e) {
            return h.constructionLeadsTo(e)
        }, c.howToPlay = ["This started as Chalice's Mod, expanded by CirusDane (called Danemancer), for incremancer - We hope you enjoy the qol changes!", "Energy refills over time. You need 10 energy to spawn a zombie by clicking on the ground.", "Hold shift or control to spawn multiple zombies with a single click.", "Whenever one of your zombies attacks a human you will collect some blood.", "Killing a human or turning them into a zombie will earn you 1 brain.", "You can spend these currencies in the shop to purchase upgrades for your zombie horde.", "Hold shift to buy the maximum affordable number of upgrades.", "The world can be dragged with the mouse to explore it. Or by using the WASD or arrow keys.", "You can zoom in and out using your mouse wheel. Pinch to zoom on mobile."], c.updateMessages = function (e) {
            c.message ? (c.messageTimer -= e, c.model.messageQueue.length > 0 && (c.messageTimer -= e), c.messageTimer < 0 && (c.message = !1, c.messageTimer = 4)) : c.model.messageQueue.length > 0 && (c.message = c.model.messageQueue.shift(), c.messageTimer = 4)
        }, c.infusionAmount = 1e3, c.infusionMax = !1, c.infuseRune = function (e, t) {
            if (c.infusionMax) switch (t) {
                case "blood":
                    h.infuseRune(e, t, c.model.persistentData.blood);
                    break;
                case "brains":
                    h.infuseRune(e, t, c.model.persistentData.brains);
                    break;
                case "bones":
                    h.infuseRune(e, t, c.model.persistentData.bones)
            } else h.infuseRune(e, t, c.infusionAmount)
        }, c.shatterPercent = function (e) {
            return h.shatterPercent(e)
        }, c.shatterBloodCost = function (e) {
            return h.shatterBloodCost(e)
        }, c.shatterSatiate = function (e, t) {
            h.infuseRune(e, "blood", this.shatterBloodCost(t))
        }, c.canShatter = function () {
            return h.canShatter()
        }, c.doShatter = function () {
            h.doShatter()
        }, c.shatterEffect = function () {
            return 100 * h.shatterEffect()
        }, c.infuseButtonText = function () {
            return c.infusionMax ? "Max" : n(c.infusionAmount)
        }, c.energyPercent = function () {
            return Math.min(Math.round(c.model.energy / c.model.energyMax * 100), 100)
        }, c.bloodPercent = function () {
            return Math.min(Math.round(c.model.persistentData.blood / c.model.bloodMax * 100), 100)
        }, c.brainsPercent = function () {
            return Math.min(Math.round(c.model.persistentData.brains / c.model.brainsMax * 100), 100)
        }, c.costAboveCap = function (e, t) {
            switch (e.costType) {
                case "blood":
                    if (t > c.model.bloodMax) return "Blood capacity too low";
                    break;
                case "brains":
                    if (t > c.model.brainsMax) return "Brains capacity too low"
            }
            return !1
        }, c.upgradeButtonText = function (e) {
            if (0 != e.cap && c.currentRank(e) >= e.cap) return "Sold Out";
            const t = c.upgradePrice(e);
            if (c.upgradeTooExpensive(e)) {
                return c.costAboveCap(e, t) || c.requiredForUpgrade(e)
            }
            return c.purchaseText(e, t)
        }, c.upgradePercent = function (e) {
            switch (e.costType) {
                case "blood":
                    return Math.round(100 * Math.min(1, c.model.persistentData.blood / c.upgradePrice(e)));
                case "brains":
                    return Math.round(100 * Math.min(1, c.model.persistentData.brains / c.upgradePrice(e)));
                case "bones":
                    return Math.round(100 * Math.min(1, c.model.persistentData.bones / c.upgradePrice(e)));
                case "parts":
                    return Math.round(100 * Math.min(1, c.model.persistentData.parts / c.upgradePrice(e)));
                case "prestigePoints":
                    return Math.round(100 * Math.min(1, c.model.persistentData.prestigePointsToSpend / c.upgradePrice(e)))
            }
        }, c.skeletonTimer = function () {
            return i.skeletonTimer()
        }, c.skeletonMenu = {
            isShown: !1,
            isNewGearSetShown: !1,
            showFilters: !1,
            tab: "inventory",
            newGearSetName: "New Set",
            maxGearSet: 5,
            itemsFilters: {se:[], r:[], t:[]},
            changeTab(e) {
                this.tab = e
            },
            equipped: [],
            show() {
                this.tab = "inventory", this.upgrade = h.prestigeUpgrades.filter((e => 115 == e.id))[0], this.upgrades = Mt, this.isShown = !this.isShown, this.isShown && this.updateEquippedItems()
            },
            showNewGearSet() {
                this.newGearSetName = "New Set", this.isNewGearSetShown = !this.isNewGearSetShown, Y.canType = this.isNewGearSetShown
            },
            selectGearSet(index) {
                i.persistent.gearSetEquipped = index;

                if (i.persistent.gearSetEquipped == -1) return;

                i.persistent.gearSets[i.persistent.gearSetEquipped].slots.forEach(((t) => {
                    i.persistent.items.filter((e => e.s == t.s && (e.q = t.id == e.id)))
                })), h.applyUpgrades(), this.updateEquippedItems();
            },
            canCreateGearSets() { return i.persistent.gearSets.length < this.maxGearSet; },
            canDeleteGearSets: () => i.persistent.gearSets.length > 0 && i.persistent.gearSetEquipped != -1,
            gearSets: () => i.persistent.gearSets,
            gearSetEquipped: () => i.persistent.gearSetEquipped,
            createGearSet() {
                if (this.newGearSetName == null) return;
                let name = this.newGearSetName.replace(/[^\w^\S]*$/gi, '');
                if (name.length == 0) return;
                let newGearSet = { name: name, slots: [] };
                const e = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.helmet.id));
                e.length > 0 ? newGearSet.slots.push({ s: e[0].s, id: e[0].id }) : newGearSet.slots.push([{
                    s: i.lootPositions.helmet.id,
                    id: -1
                }]);
                const s = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.sword.id));
                s.length > 0 ? newGearSet.slots.push({ s: s[0].s, id: s[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.sword.id,
                    id: -2
                });
                const a = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.chest.id));
                a.length > 0 ? newGearSet.slots.push({ s: a[0].s, id: a[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.chest.id,
                    id: -3
                });
                const r = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.shield.id));
                r.length > 0 ? newGearSet.slots.push({ s: r[0].s, id: r[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.shield.id,
                    id: -4
                });
                const o = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.gloves.id));
                o.length > 0 ? newGearSet.slots.push({ s: o[0].s, id: o[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.gloves.id,
                    id: -5
                });
                const h = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.legs.id));
                h.length > 0 ? newGearSet.slots.push({ s: h[0].s, id: h[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.legs.id,
                    id: -6
                });
                const l = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.boots.id));
                l.length > 0 ? newGearSet.slots.push({ s: l[0].s, id: l[0].id }) : newGearSet.slots.push({
                    s: i.lootPositions.boots.id,
                    id: -7
                });
                i.persistent.gearSets.push(newGearSet), this.selectGearSet(i.persistent.gearSets.length - 1), this.showNewGearSet();
            },
            deleteGearSet() {
                i.persistent.gearSets.splice(i.persistent.gearSetEquipped, 1);
                i.persistent.gearSets.length > 0 ? this.selectGearSet(0) : this.selectGearSet(-1);
            },
            filterItemsBySpecialEffect(i) {
                this.itemsFilters.se.includes(i) ? this.itemsFilters.se.splice(this.itemsFilters.se.indexOf(i), 1) : this.itemsFilters.se.push(i);
            },
            filterItemsByRarity(i) {
                this.itemsFilters.r.includes(i) ? this.itemsFilters.r.splice(this.itemsFilters.r.indexOf(i), 1) : this.itemsFilters.r.push(i);
            },
            filterItemsByType(i) {
                this.itemsFilters.t.includes(i) ? this.itemsFilters.t.splice(this.itemsFilters.t.indexOf(i), 1) : this.itemsFilters.t.push(i);
            },
            isFiltered(i) {
                return (this.itemsFilters.se.length > 0 ? i.se.length > 0 ? this.itemsFilters.se.includes(i.se[0]) : false : true) && (this.itemsFilters.r.length > 0 ? this.itemsFilters.r.includes(i.r) : true) && (this.itemsFilters.t.length > 0 ? this.itemsFilters.t.includes(i.s) : true);
            },
            resetFilter() {this.itemsFilters.se = [], this.itemsFilters.r = [], this.itemsFilters.t = []},
            acceptOffer() {
                i.acceptOffer(), this.isShown = !1
            },
            anotherOffer: () => i.persistent.skeletons > 0 && c.model.persistentData.trophies.length >= (i.persistent.xpRate < 4 ? 20 * i.persistent.xpRate :
                i.persistent.xpRate < 8 ? 70 :
                    i.persistent.xpRate < 16 ? 110 :
                        i.persistent.xpRate < 32 ? 160 :
                            i.persistent.xpRate < 64 ? 220 :
                                i.persistent.xpRate < 128 ? 290 :
                                    i.persistent.xpRate < 256 ? 370 :
                                        i.persistent.xpRate < 512 ? 460 :
                                            i.persistent.xpRate < 1024 ? 560 :
                                                i.persistent.xpRate < 2048 ? 670 :
                                                    i.persistent.xpRate < 4096 ? 790 :
                                                        720 + ((Math.log2(i.persistent.xpRate) - 7) * (Math.log2(i.persistent.xpRate) - 7)) * 10),
            trophies: () => i.persistent.skeletons > 0 ? ` - ${c.model.persistentData.trophies.length} / ${i.persistent.xpRate < 4 ? 20 * i.persistent.xpRate :
                i.persistent.xpRate < 8 ? 70 :
                    i.persistent.xpRate < 16 ? 110 :
                        i.persistent.xpRate < 32 ? 160 :
                            i.persistent.xpRate < 64 ? 220 :
                                i.persistent.xpRate < 128 ? 290 :
                                    i.persistent.xpRate < 256 ? 370 :
                                        i.persistent.xpRate < 512 ? 460 :
                                            i.persistent.xpRate < 1024 ? 560 :
                                                i.persistent.xpRate < 2048 ? 670 :
                                                    i.persistent.xpRate < 4096 ? 790 :
                                                        720 + ((Math.log2(i.persistent.xpRate) - 7) * (Math.log2(i.persistent.xpRate) - 7)) * 10} Trophies` : "",
            talentPoints: () => i.talentPoints,
            talentsAssigned: () => i.getUsedPoints(),
            talentValue: e => i.talents[e.id] + " / " + e.maxPoints,
            talentSet(e, t) {
                e.set(t), kt()
            },
            talentReset(e) {
                e.reset(), kt()
            },
            canReset: () => i.persistent.talentReset,
            talentsReset() {
                wt(), kt()
            },
            talentMax(e) {
                e.max(), kt()
            },
            xpPercent: () => Math.round(100 * Math.min(1, c.skeleton().xp / i.xpForNextLevel())),
            xpForNextLevel: () => i.xpForNextLevel(),
            xpRate: () => 100 * i.persistent.xpRate,
            prestigePointsPerKill: () => (1.00025 ** c.skeleton().level) * c.skeleton().level,
            isAlive: () => i.isAlive(),
            timer: () => Math.ceil(i.skeletonTimer()),
            updateEquippedItems() {
                this.equipped = [];
                const e = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.helmet.id));
                e.length > 0 ? this.equipped.push([e[0]]) : this.equipped.push([{
                    name: "Helmet Slot",
                    s: i.lootPositions.helmet.id,
                    id: -1
                }]);
                const t = [],
                    s = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.sword.id));
                s.length > 0 ? t.push(s[0]) : t.push({
                    name: "Sword Slot",
                    s: i.lootPositions.sword.id,
                    id: -2
                });
                const a = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.chest.id));
                a.length > 0 ? t.push(a[0]) : t.push({
                    name: "Chest Slot",
                    s: i.lootPositions.chest.id,
                    id: -3
                });
                const r = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.shield.id));
                r.length > 0 ? t.push(r[0]) : t.push({
                    name: "Shield Slot",
                    s: i.lootPositions.shield.id,
                    id: -4
                }), this.equipped.push(t);
                const n = [],
                    o = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.gloves.id));
                o.length > 0 ? n.push(o[0]) : n.push({
                    name: "Gloves Slot",
                    s: i.lootPositions.gloves.id,
                    id: -5
                });
                const h = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.legs.id));
                h.length > 0 ? n.push(h[0]) : n.push({
                    name: "Legs Slot",
                    s: i.lootPositions.legs.id,
                    id: -6
                });
                const l = i.persistent.items.filter((e => e.q && e.s == i.lootPositions.boots.id));
                l.length > 0 ? n.push(l[0]) : n.push({
                    name: "Boots Slot",
                    s: i.lootPositions.boots.id,
                    id: -7
                }), this.equipped.push(n), this.equipped.push([{
                    name: "Destroy Items",
                    s: -1,
                    id: -8
                }])
            },
            inventoryItems: () => i.persistent.items.filter((e => !e.q)).sort(((e, t) => t.r * t.l - e.r * e.l)),
            itemName: e => e.name || i.getLootName(e),
            itemSubName(e) {
                if (!e.name) switch (e.r) {
                    case i.rarity.common:
                        return "Common level " + e.l + " " + this.itemType(e);
                    case i.rarity.rare:
                        return "Rare level " + e.l + " " + this.itemType(e);
                    case i.rarity.epic:
                        return "Epic level " + e.l + " " + this.itemType(e);
                    case i.rarity.legendary:
                        return "Legendary level " + e.l + " " + this.itemType(e);
                    case i.rarity.ancient:
                        return "Ancient level " + e.l + " " + this.itemType(e);
                    case i.rarity.divine:
                        return "Divine level " + e.l + " " + this.itemType(e)
                }
                if (-1 == e.s) return "Click this to destroy all non-equipped items (legendary items will not be automatically destroyed). Or drag items here to destroy them."
            },
            itemStats: e => i.getLootStats(e),
            itemEffects: e => i.getSpecialEffects(e),
            itemEffectsNamesClass: e => i.getSpecialEffectsName(e).join(" ").toLowerCase(),
            itemEffectsList: () => i.getSpecialEffectsList(),
            itemEffectsListClass: (e) => e.replace(" ", '-').toLowerCase(),
            itemRarityList: () => i.getRarityList(),
            itemRarityClass: e => i.getLootClass({r: e}),
            itemTypeList: () => i.getTypeList(),
            itemTypeClass(e) { return this.itemType({s: e}); },
            itemRarityName(r) {
                switch (r) {
                    case i.rarity.common:
                        return "Common";
                    case i.rarity.rare:
                        return "Rare";
                    case i.rarity.epic:
                        return "Epic";
                    case i.rarity.legendary:
                        return "Legendary";
                    case i.rarity.ancient:
                        return "Ancient";
                    case i.rarity.divine:
                        return "Divine"
                }
            },
            itemType(e) {
                switch (e.s) {
                    case -1:
                        return "trash";
                    case i.lootPositions.helmet.id:
                        return "helmet";
                    case i.lootPositions.chest.id:
                        return "chest";
                    case i.lootPositions.gloves.id:
                        return "gloves";
                    case i.lootPositions.legs.id:
                        return "legs";
                    case i.lootPositions.boots.id:
                        return "boots";
                    case i.lootPositions.sword.id:
                        return "sword";
                    case i.lootPositions.shield.id:
                        return "shield"
                }
            },
            itemClass: e => e.name ? "empty" : i.getLootClass(e),
            itemById(e) {
                let t = null;
                return i.persistent.items.forEach((function (s) {
                    s.id == e && (t = s)
                })), t
            },
            itemDropped(e, t) {
                let s = null;
                i.persistent.items.forEach((function (t) {
                    t.id == e && (s = t)
                })), -1 == t ? i.destroyItem(s) : (s.s == t && (i.persistent.items.forEach((function (e) {
                    e.s == t && (e.q = !1)
                })), s.q = !0, h.applyUpgrades()), this.updateEquippedItems());
                i.persistent.gearSetEquipped != -1 && -1 != t && i.persistent.gearSets[i.persistent.gearSetEquipped].slots.forEach((function (t) {
                    t.s == s.s && (t.id = s.id)
                }));
            },
            equipItem(e) {
                if(this.isShown && Y.shift) {
                    this.itemDropped(e.id, -1);
                    return;
                }
                i.persistent.items.forEach((function (t) {
                    t.s == e.s && (t.q = !1)
                })), e.q = !0, h.applyUpgrades(), this.updateEquippedItems();
                i.persistent.gearSetEquipped != -1 && i.persistent.gearSets[i.persistent.gearSetEquipped].slots.forEach((function (t) {
                    t.s == e.s && (t.id = e.id)
                }));
            },
            trashAll() {
                c.confirmMessage = "Are you sure you want to destroy all non-equipped items? You will earn " + n(i.xpTotal()) + " xp", c.confirmCallback = function () {
                    c.confirmCallback = !1, i.destroyAllItems()
                }
            },
        }, s.ready((function () {
            e.updatePromise = t(u, 200), h.angularModel = c, kt()
        }))
    }]).directive("levelSelect", (function () {
        return {
            templateUrl: "./templates/levelselect.html"
        }
    })).directive("levelStats", (function () {
        return {
            templateUrl: "./templates/levelstats.html"
        }
    })).directive("graveyardMenu", (function () {
        return {
            templateUrl: "./templates/graveyardmenu.html"
        }
    })).directive("runesmithMenu", (function () {
        return {
            templateUrl: "./templates/runesmithmenu.html"
        }
    })).directive("optionsMenu", (function () {
        return {
            templateUrl: "./templates/optionsmenu.html"
        }
    })).directive("shopMenu", (function () {
        return {
            templateUrl: "./templates/shopmenu.html"
        }
    })).directive("constructionMenu", (function () {
        return {
            templateUrl: "./templates/constructionmenu.html"
        }
    })).directive("prestigeMenu", (function () {
        return {
            templateUrl: "./templates/prestigemenu.html"
        }
    })).directive("championsHoldMenu", (function () {
        return {
            templateUrl: "./templates/championshold.html"
        }
    })).directive("factoryMenu", (function () {
        return {
            templateUrl: "./templates/factorymenu.html"
        }
    })).directive("customOnChange", (function () {
        return {
            restrict: "A",
            link: function (e, t, s) {
                const i = e.$eval(s.customOnChange);
                t.on("change", i), t.on("$destroy", (function () {
                    t.off()
                }))
            }
        }
    })).directive("draggableItem", ["$rootScope", function (e) {
        return {
            restrict: "A",
            link: function (t, s, i, a) {
                const r = t.item.id;
                "true" == i.draggableItem && (angular.element(s).attr("draggable", "true"), s.bind("dragstart", (function (t) {
                    document.getElementById("champ-hold").classList.toggle("no-tooltip"), t.dataTransfer.setData("text", r);
                    const i = s[0].getBoundingClientRect();
                    t.dataTransfer.setDragImage(s[0], i.width / 2, i.height / 2), e.$emit("item-drag-start", r), setTimeout((function () {
                        angular.element(s)[0].style.opacity = "0.3"
                    }))
                })), s.bind("dragend", (function (t) {
                    document.getElementById("champ-hold").classList.toggle("no-tooltip"), angular.element(s)[0].style.opacity = "", e.$emit("item-drag-end", r)
                })))
            }
        }
    }]).directive('shiftDeleteItem', ['$rootScope', function(e) {
        return {
            restrict: "A",
            link: function (t, s, i, a) {
                s.bind('mouseenter', (function () {
                    Y.shift && s.addClass('shift-trash');
                })),s.bind('mouseleave', (function () {
                    s.removeClass('shift-trash');
                }));
            }
        }
    }]).directive("droppableTarget", ["$rootScope", function (e) {
        return {
            restrict: "A",
            link: function (t, s, i, a) {
                const r = t.item.s;
                s.bind("dragover", (function (e) {
                    return e.preventDefault && e.preventDefault(), e.dataTransfer.dropEffect = "move", !1
                })), s.bind("dragenter", (function (e) {
                    e.target && e.target.classList && e.target.classList.contains("icon") && angular.element(e.target.parentElement).addClass("over")
                })), s.bind("dragleave", (function (e) {
                    e.target && e.target.classList && e.target.classList.contains("icon") && angular.element(e.target.parentElement).removeClass("over")
                })), s.bind("drop", (function (e) {
                    e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.target.classList.contains("icon") && angular.element(e.target.parentElement).removeClass("over");
                    const s = e.dataTransfer.getData("text"),
                        i = t.zm.skeletonMenu.itemById(s);
                    if (i) {
                        const e = t.zm.skeletonMenu.itemType(i);
                        document.getElementsByClassName("equipped")[0].classList.remove(e)
                    }
                    t.zm.skeletonMenu.itemDropped(s, r)
                })), e.$on("item-drag-start", (function (e, s) {
                    const i = t.zm.skeletonMenu.itemById(s);
                    if (i) {
                        const e = t.zm.skeletonMenu.itemType(i);
                        document.getElementsByClassName("equipped")[0].classList.add(e)
                    }
                })), e.$on("item-drag-end", (function (e, s) {
                    const i = t.zm.skeletonMenu.itemById(s);
                    if (i) {
                        const e = t.zm.skeletonMenu.itemType(i);
                        document.getElementsByClassName("equipped")[0].classList.remove(e)
                    }
                }))
            }
        }
    }]), Incremancer = e
})();
//# sourceMappingURL=bundle.js.map
