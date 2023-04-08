import { defineComponent as ne, ref as O, reactive as le, onMounted as ue, onUnmounted as de, computed as k, watch as z, openBlock as P, createElementBlock as M, createElementVNode as _, normalizeStyle as N, unref as r, createCommentVNode as j, renderSlot as A, Fragment as pe, toDisplayString as q, withModifiers as B, createTextVNode as _e, pushScopeId as me, popScopeId as ce } from "vue";
import { isVue2 as $ } from "vue-demi";
const ge = Math.max, ve = Math.min;
function ee(S, v, t) {
  let y, f, x, R, h, D, m = 0, C = !1, c = !1, T = !0;
  if (typeof S != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  v = Number(v) || 0, typeof t == "object" && (C = !!t.leading, c = "maxWait" in t, x = c ? ge(Number(t.maxWait) || 0, v) : x, T = "trailing" in t ? !!t.trailing : T);
  function L(a) {
    let o = y, u = f;
    return y = f = void 0, m = a, R = S.apply(u, o), R;
  }
  function V(a) {
    return m = a, h = setTimeout(n, v), C ? L(a) : R;
  }
  function X(a) {
    let o = a - D, u = a - m, b = v - o;
    return console.log("remainingWait"), c ? ve(b, x - u) : b;
  }
  function d(a) {
    let o = a - D, u = a - m;
    return D === void 0 || o >= v || o < 0 || c && u >= x;
  }
  function n() {
    const a = Date.now();
    if (d(a))
      return E(a);
    h = setTimeout(n, X(a));
  }
  function E(a) {
    return h = void 0, T && y ? L(a) : (y = f = void 0, R);
  }
  function F() {
    h !== void 0 && clearTimeout(h), m = 0, y = D = f = h = void 0;
  }
  function Y() {
    return h === void 0 ? R : E(Date.now());
  }
  function I() {
    let a = Date.now(), o = d(a);
    if (y = arguments, f = this, D = a, o) {
      if (h === void 0)
        return V(D);
      if (c)
        return h = setTimeout(n, v), L(D);
    }
    return h === void 0 && (h = setTimeout(n, v)), R;
  }
  return I.cancel = F, I.flush = Y, I;
}
const ie = (S) => (me("data-v-f6e84873"), S = S(), ce(), S), fe = ["innerHTML"], he = /* @__PURE__ */ _e("|"), Se = /* @__PURE__ */ ie(() => /* @__PURE__ */ _("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), ke = /* @__PURE__ */ ie(() => /* @__PURE__ */ _("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), ye = ne({
  name: "VueSimpleRangeSlider"
}), be = /* @__PURE__ */ ne({
  ...ye,
  props: {
    modelValue: null,
    value: null,
    exponential: { type: Boolean, default: !1 },
    barColor: { default: "#bebebe" },
    activeBarColor: { default: "#7e7e7e" },
    max: { default: 100 },
    min: { default: 0 },
    keepJustSignificantFigures: { type: Boolean, default: !0 },
    significantFigures: { default: 2 }
  },
  emits: ["input", "update:model-value"],
  setup(S, { emit: v }) {
    const t = S, y = (e, i) => (i === 2 && (e = Math.min(n.width, Math.max(f(b.value !== void 0 ? b.value : t.min), e))), i === 1 && (e = Math.min(u.value ? f(w.value !== void 0 ? w.value : t.max) : n.width, e), e = Math.max(0, e)), e), f = (e) => {
      if (t.exponential) {
        const i = t.max - t.min;
        return D((e - t.min) / i, i) * n.width;
      } else
        return (e - t.min) * I.value;
    }, x = (e) => {
      if (t.exponential) {
        const i = t.max - t.min;
        let s = Math.round(h(e / n.width, i) * i) + t.min;
        return t.keepJustSignificantFigures && (s = R(s)), s;
      } else
        return t.min + Math.round(e / I.value);
    }, R = (e) => Number(e.toPrecision(t.significantFigures)), h = (e, i) => {
      const s = Math.E + i;
      return (Math.pow(s, e) - 1) / (Math.pow(s, 1) - 1);
    }, D = (e, i) => {
      const s = Math.E;
      return Math.log(e * (i + s) + 1) / Math.log(s + i);
    }, m = O(), C = O(), c = O(), T = O(), L = O(), V = O(), X = O(), d = {}, n = le({
      input1Width: 0,
      input2Width: 0,
      dashInput: 80,
      anchor1PositionV: 0,
      anchor2PositionV: 0,
      isRtl: !1,
      width: 100,
      draggingAnchor: 0,
      dragStartX: 0,
      dragStartPosition: 0,
      isDragging: !1
    }), E = 15;
    ue(() => {
      var e;
      oe(X.value, "direction") === "rtl" && (n.isRtl = !0), d.ro3 = new ResizeObserver((i) => {
        n.width = i[0].contentRect.width - (u.value ? E : 0);
      }), V.value && (d.ro3.observe(V.value), n.width = ((e = V.value.getBoundingClientRect()) == null ? void 0 : e.width) - (u.value ? E : 0));
    }), de(() => {
      var e;
      (e = d == null ? void 0 : d.ro3) == null || e.disconnect();
    });
    const F = (e) => {
      w.value = x(e);
    }, Y = (e) => {
      b.value = x(e);
    }, I = k(() => n.width / (t.max - t.min)), a = k({
      get: () => n.anchor2PositionV,
      set: (e) => {
        e != n.anchor1PositionV && (e = y(e, 2), n.anchor2PositionV !== e && (n.anchor2PositionV = e), F(e));
      }
    }), o = k({
      get: () => n.anchor1PositionV,
      set: (e) => {
        e != n.anchor1PositionV && (e = y(e, 1), n.anchor1PositionV !== e && (n.anchor1PositionV = e), Y(e));
      }
    }), u = k(() => Array.isArray(l.value)), b = k({
      get: () => u.value && Array.isArray(l.value) ? l.value[0] : !u.value && !Array.isArray(l.value) ? l.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(l.value)) {
          if (e === l.value[0])
            return;
          l.value = [e || 0, l.value[1]];
        } else if (!u.value && !Array.isArray(l.value)) {
          if (e === l.value)
            return;
          l.value = e;
        }
      }
    }), w = k({
      get: () => u.value && Array.isArray(l.value) ? l.value[1] : !u.value && !Array.isArray(l.value) ? l.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(l.value)) {
          if (e === l.value[1])
            return;
          l.value = [l.value[0], e || 0];
        } else if (!u.value && !Array.isArray(l.value)) {
          if (e === l.value)
            return;
          l.value = e;
        }
      }
    }), J = { npm_package_devDependencies__vitejs_plugin_vue2: "^1.1.2", SHELL: "/bin/zsh", LSCOLORS: "Gxfxcxdxbxegedabagacad", SESSION_MANAGER: "local/mArchPC:@/tmp/.ICE-unix/1203,unix/mArchPC:/tmp/.ICE-unix/1203", COLORTERM: "truecolor", npm_package_scripts_test_vue2: "vue-demi-switch 2 vue2 && vitest", XDG_CONFIG_DIRS: "/home/mohamad/.config/kdedefaults:/etc/xdg", npm_package_devDependencies__types_node: "^18.0.6", LESS: "-R", npm_package_main: "./dist/index.umd.js", XDG_SESSION_PATH: "/org/freedesktop/DisplayManager/Session1", npm_package_scripts_build_vite: "vue-demi-switch 3 vue && vite build", npm_package_repository_url: "https://github.com/mohamadkhani/vue-simple-range-slider", TERM_PROGRAM_VERSION: "1.69.2", APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL: "true", npm_package_devDependencies_eslint_plugin_prettier: "^4.2.1", npm_package_devDependencies_eslint_plugin_vue: "^9.2.0", NODE: "/usr/bin/node", npm_config_ignore_scripts: "", npm_package_devDependencies__vitest_ui: "^0.18.1", npm_package_peerDependencies_vue: ">=3.2.0||>=2.7.0", DOTNET_ROOT: "/usr/share/dotnet", npm_config_email: "mohamadkhani14@gmail.com", npm_package_exports___css: "./dist/style.css", npm_package_private: "false", npm_config_argv: '{"remain":[],"cooked":["run","build"],"original":["build"]}', npm_package_exports___vue2_css: "./dist/vue2/index.css", npm_config_bin_links: "true", DESKTOP_SESSION: "plasma", npm_package_devDependencies_npm_run_all: "^4.1.5", GTK_RC_FILES: "/etc/gtk/gtkrc:/home/mohamad/.gtkrc:/home/mohamad/.config/gtkrc", NO_AT_BRIDGE: "1", XCURSOR_SIZE: "32", npm_package_exports___import: "./dist/index.es.js", EDITOR: "nano", GTK_MODULES: "canberra-gtk-module:appmenu-gtk-module", XDG_SEAT: "seat0", PWD: "/home/mohamad/Projects/vue-simple-range-slider", npm_config_save_prefix: "^", npm_package_devDependencies_vite: "^3.0.2", XDG_SESSION_DESKTOP: "KDE", LOGNAME: "mohamad", XDG_SESSION_TYPE: "x11", npm_package_readmeFilename: "README.md", npm_package_devDependencies__typescript_eslint_parser: "^5.30.7", SYSTEMD_EXEC_PID: "1423", npm_package_scripts_build: "run-s build:vue3 build:vue2", npm_package_devDependencies_ts_jest: "^28.0.7", npm_package_devDependencies__vue_compiler_sfc: "^3.2.37", _: "/home/mohamad/Projects/vue-simple-range-slider/node_modules/.bin/vite", XAUTHORITY: "/home/mohamad/.Xauthority", npm_package_devDependencies_prettier: "^2.7.1", VSCODE_GIT_ASKPASS_NODE: "/opt/vscodium-bin/codium", MOTD_SHOWN: "pam", GTK2_RC_FILES: "/etc/gtk-2.0/gtkrc:/home/mohamad/.gtkrc-2.0:/home/mohamad/.config/gtkrc-2.0", HOME: "/home/mohamad", npm_package_scripts_test_2: "vue-demi-switch 2 vue2 && jest", npm_package_scripts_test_3: "vue-demi-switch 3 && jest", npm_config_version_git_tag: "true", LANG: "en_US.UTF-8", npm_package_devDependencies_typescript: "^4.1.5", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.swp=00;90:*.tmp=00;90:*.dpkg-dist=00;90:*.dpkg-old=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:", XDG_CURRENT_DESKTOP: "KDE", npm_config_init_license: "MIT", npm_package_version: "1.0.0-beta.6", npm_package_devDependencies_vue2: "npm:vue@^2.7.7", npm_package_devDependencies__typescript_eslint_eslint_plugin: "^5.30.7", npm_config_version_commit_hooks: "true", npm_package_files_0: "dist/*", npm_package_files_1: "src/*", npm_package_files_2: "public/*", npm_package_files_3: "*.json", npm_package_repository_type: "git", npm_package_files_4: "*.js", npm_config_wrap_output: "", npm_package_files_5: "LICENSE", GIT_ASKPASS: "/opt/vscodium-bin/resources/app/extensions/git/dist/askpass.sh", XDG_SEAT_PATH: "/org/freedesktop/DisplayManager/Seat0", INVOCATION_ID: "216c6571da264cf481cb4b2006e0031b", MANAGERPID: "1134", npm_package_devDependencies_vue: "^3.2.37", npm_package_exports___vue2_import: "./dist/vue2/index.common.js", INIT_CWD: "/home/mohamad/Projects/vue-simple-range-slider", DOTNET_BUNDLE_EXTRACT_BASE_DIR: "/home/mohamad/.cache/dotnet_bundle_extract", CHROME_DESKTOP: "codium-url-handler.desktop", npm_package_exports___vue2_require: "./dist/vue2/index.umd.min.js", KDE_SESSION_UID: "1000", npm_lifecycle_script: "vue-demi-switch 3 vue && vite build", npm_package_description: "Change Your numeric value or numeric range value with dragging handles", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", npm_package_devDependencies__vitejs_plugin_vue: "^3.0.1", npm_config_version_tag_prefix: "v", YARN_WRAP_OUTPUT: "false", npm_package_devDependencies_vue_jest: "^5.0.0-0", XDG_SESSION_CLASS: "user", npm_package_devDependencies_vue_tsc: "^0.39.0", ANDROID_HOME: "/opt/android-sdk", npm_config_username: "mohamadkhani", TERM: "xterm-256color", npm_package_name: "vue-simple-range-slider", ZSH: "/home/mohamad/.oh-my-zsh", npm_package_devDependencies_jsdom: "^20.0.0", npm_config_prefix: "/home/mohamad/.yarn", USER: "mohamad", npm_package_devDependencies_vitest: "^0.18.1", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-a5b496017a.sock", KDE_SESSION_VERSION: "5", npm_package_devDependencies__vue_composition_api: "^1.7.0", npm_package_devDependencies__vue_test_utils: "^2.0.2", DISPLAY: ":0", npm_lifecycle_event: "build:vite", SHLVL: "2", npm_config_version_git_sign: "", npm_config_version_git_message: "v%s", PAGER: "less", npm_package_devDependencies_eslint: "^8.20.0", ANDROID_SDK_ROOT: "/opt/android-sdk", XDG_VTNR: "1", npm_package_scripts_build_types: "vue-tsc ./src/index.ts -d --emitDeclarationOnly --outDir ./dist", UBUNTU_MENUPROXY: "1", XDG_SESSION_ID: "3", npm_config_user_agent: "yarn/1.22.19 npm/? node/v16.16.0 linux x64", npm_package_scripts_lint: "vue-cli-service lint", npm_execpath: "/usr/lib/node_modules/yarn/bin/yarn.js", npm_package_devDependencies__vue_reactivity: "^3.2.37", npm_package_scripts_test: "vue-demi-switch 3 vue && vitest", XDG_RUNTIME_DIR: "/run/user/1000", npm_config_strict_ssl: "true", npm_package_keywords_5: "numeric-range", npm_package_keywords_4: "numeric-range-picker", npm_package_keywords_7: "range-input", npm_package_keywords_6: "input-element", npm_package_scripts_dev: "vue-demi-switch 3 vue && vite", npm_package_keywords_1: "range-slider", npm_package_keywords_0: "vue", npm_package_keywords_3: "range-picker", npm_package_keywords_2: "numeric-picker", VSCODE_GIT_ASKPASS_MAIN: "/opt/vscodium-bin/resources/app/extensions/git/dist/askpass-main.js", QT_AUTO_SCREEN_SCALE_FACTOR: "0", JOURNAL_STREAM: "8:26664", npm_package_scripts_dev_vue2: "vue-demi-switch 2 vue2 && vite -c ./src/vue2/vite.config.ts", XCURSOR_THEME: "material_cursors", GTK3_MODULES: "[]", KDE_FULL_SESSION: "true", GDK_BACKEND: "x11", npm_package_devDependencies__vue_eslint_config_typescript: "^11.0.0", PATH: "/tmp/yarn--1659709558891-0.34331445380848025:/home/mohamad/Projects/vue-simple-range-slider/node_modules/.bin:/home/mohamad/.config/yarn/link/node_modules/.bin:/usr/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/lib/node_modules/npm/bin/node-gyp-bin:/usr/bin/node_modules/npm/bin/node-gyp-bin:/tmp/yarn--1659709558627-0.9545114092721885:/home/mohamad/Projects/vue-simple-range-slider/node_modules/.bin:/home/mohamad/.config/yarn/link/node_modules/.bin:/usr/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/lib/node_modules/npm/bin/node-gyp-bin:/usr/bin/node_modules/npm/bin/node-gyp-bin:/tmp/yarn--1659709558366-0.8318286346480059:/home/mohamad/Projects/vue-simple-range-slider/node_modules/.bin:/home/mohamad/.config/yarn/link/node_modules/.bin:/usr/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/lib/node_modules/npm/bin/node-gyp-bin:/usr/bin/node_modules/npm/bin/node-gyp-bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/opt/android-sdk/emulator:/opt/android-sdk/platform-tools:/opt/android-sdk/tools:/opt/android-sdk/tools/bin:/home/mohamad/.dotnet/tools:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/home/mohamad/.yarn/bin:/opt/android-sdk/platform-tools:/opt/android-sdk/emulator:/home/mohamad/.local/bin", ORIGINAL_XDG_CURRENT_DESKTOP: "KDE", npm_package_devDependencies_sass: "^1.53.0", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", npm_package_license: "MIT", KDE_APPLICATIONS_AS_SCOPE: "1", MAIL: "/var/spool/mail/mohamad", npm_config_registry: "https://registry.yarnpkg.com", npm_config_ignore_optional: "", npm_package_scripts_build_vue2: "cd src/vue2 && yarn build", npm_package_scripts_build_vue3: "run-p build:vite build:types", npm_node_execpath: "/usr/bin/node", OLDPWD: "/home/mohamad/Projects/vue-simple-range-slider", npm_package_types: "dist", npm_package_exports___require: "./dist/index.umd.js", npm_package_dependencies_vue_demi: "^0.13.5", TERM_PROGRAM: "vscode", npm_config_init_version: "1.0.0", NODE_ENV: "production" }.ISVUE2, l = k({
      get: () => J || $ ? t.value : t.modelValue,
      set: (e) => {
        Array.isArray(e) && Array.isArray(t.modelValue) && e[0] === t.modelValue[0] && e[1] === t.modelValue[1] || !Array.isArray(e) && e === t.modelValue || v(J || $ ? "input" : "update:model-value", e);
      }
    });
    z(() => C.value, (e) => {
      d.ro1 && d.ro1.disconnect(), d.ro1 = new ResizeObserver((i) => {
        n.input1Width = i[0].target.getBoundingClientRect().width;
      }), e && d.ro1.observe(e);
    }, { immediate: !0 }), z(() => T.value, (e) => {
      d.ro2 && d.ro2.disconnect(), d.ro2 = new ResizeObserver((i) => {
        n.input2Width = i[0].target.getBoundingClientRect().width;
      }), e && d.ro2.observe(e);
    }, { immediate: !0 }), z(() => L.value, (e) => {
      var i;
      n.dashInput = ((i = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : i.width) || 30;
    }, {
      immediate: !0
    }), z(() => ({
      value: l.value,
      scale: I.value,
      exponential: t.exponential
    }), ({ value: e }) => {
      n.isDragging || (Array.isArray(e) ? (o.value = f(e[0]), a.value = f(e[1])) : e ? o.value = f(e) : o.value = 0);
    }, { immediate: !0 });
    const U = ee((e) => {
      setTimeout(() => {
        var i;
        b.value = Number.parseInt(((i = m.value) == null ? void 0 : i.innerText.replace(/,/g, "")) || "0");
      }, 100);
    }, 1e3), K = ee((e) => {
      setTimeout(() => {
        var i;
        w.value = Number.parseInt(((i = c.value) == null ? void 0 : i.innerText.replace(/,/g, "")) || "0");
      }, 100);
    }, 1e3), W = k(() => a.value - o.value < n.input1Width + n.input2Width - 15 && u.value);
    z(() => W.value, () => {
      if (m.value instanceof HTMLInputElement && document.activeElement === m.value) {
        const e = m.value.selectionStart;
        m.value instanceof HTMLInputElement && (m.value.focus(), m.value.setSelectionRange(e, e));
      }
      if (c.value instanceof HTMLInputElement && document.activeElement === c.value) {
        const e = c.value.selectionStart;
        c.value instanceof HTMLInputElement && (c.value.focus(), c.value.setSelectionRange(e, e));
      }
    });
    const te = k(() => ({
      transform: "translateX(" + (n.isRtl ? n.width - a.value : o.value) + "px)",
      width: a.value - o.value + 15 + "px",
      background: t.activeBarColor
    })), ae = k(() => ({
      transform: "translateX(" + (n.isRtl ? n.width - o.value + (u.value ? 7.5 : -7.5) : o.value - 7.5) + "px)"
    })), re = k(() => ({
      transform: "translateX(" + (n.isRtl ? n.width - n.anchor2PositionV - 7.5 : n.anchor2PositionV + 7.5) + "px)"
    })), se = k(() => {
      let e = ((n.isRtl ? n.width - a.value - E / 2 : a.value - E / 2) + (n.isRtl ? n.width - o.value - E / 2 : o.value - E / 2)) / 2 - (n.input1Width + n.input2Width + n.dashInput) / 2 + 1;
      return e = Math.max(e, -10), e = Math.min(e, n.width - (n.input1Width + n.input2Width + n.dashInput) + 10), {
        transform: "translateX(" + e + "px)",
        width: a.value - o.value + "px",
        direction: n.isRtl ? "rtl" : "ltr",
        minWidth: n.input1Width + n.input2Width + n.dashInput + 6 + "px"
      };
    }), Z = (e, i) => {
      n.isDragging = !0, n.draggingAnchor = e, n.dragStartX = i.x, e == 1 ? n.dragStartPosition = o.value : n.dragStartPosition = a.value;
      const s = window;
      s.$SRSMouseMove = (p) => {
        p.preventDefault(), p.stopPropagation(), n.isDragging && (e == 1 ? n.isRtl ? o.value = n.dragStartPosition + n.dragStartX - p.x : o.value = n.dragStartPosition - n.dragStartX + p.x : n.isRtl ? a.value = n.dragStartPosition + n.dragStartX - p.x : a.value = n.dragStartPosition - n.dragStartX + p.x);
      }, s.mouseUp = (p) => {
        n.isDragging = !1, document.removeEventListener("mouseup", s.mouseUp), document.removeEventListener("mousemove", s.$SRSMouseMove), p.preventDefault(), p.stopPropagation();
      }, document.addEventListener("mousemove", s.$SRSMouseMove), document.addEventListener("mouseup", s.mouseUp);
    }, Q = (e, i) => {
      if (n.changingByKey === e)
        return;
      n.changingByKey = e;
      let s = 40, p = 0;
      const G = () => {
        !n.isRtl && (i.code === "ArrowDown" || i.code === "ArrowLeft") || n.isRtl && (i.code === "ArrowUp" || i.code === "ArrowRight") ? (e == 1 && o.value--, e == 2 && a.value--) : (!n.isRtl && (i.code === "ArrowUp" || i.code === "ArrowRight") || n.isRtl && (i.code === "ArrowDown" || i.code === "ArrowLeft")) && (e == 1 && o.value++, e == 2 && a.value++);
      };
      G();
      const H = setInterval(() => {
        p++, !(p < s) && (s > 1 && s--, G());
      }, 5);
      i.target instanceof HTMLElement && i.target.addEventListener("keyup", () => {
        n.changingByKey = void 0, clearInterval(H);
      });
    }, oe = (e, i) => {
      let s;
      return e.currentStyle ? s = e.currentStyle[i] : window.getComputedStyle && (s = document.defaultView.getComputedStyle(e, null).getPropertyValue(i)), s;
    };
    return (e, i) => {
      var s, p, G, H;
      return P(), M("div", {
        class: "simple-range-slider",
        ref_key: "root",
        ref: X
      }, [
        _("div", {
          class: "simple-range-slider-bg-bar",
          style: N({ background: S.barColor }),
          ref_key: "bar",
          ref: V
        }, [
          r(u) ? (P(), M("div", {
            key: 0,
            class: "simple-range-slider-bar",
            style: N(r(te))
          }, null, 4)) : j("", !0),
          r(W) ? (P(), M("div", {
            key: 1,
            style: N([{ right: "unset" }, r(se)]),
            class: "simple-range-slider-popover simple-range-slider-merged-popover"
          }, [
            _("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input1Container",
              ref: C
            }, [
              A(e.$slots, "prefix", { value: r(b) }, void 0, !0),
              _("div", {
                ref_key: "input1",
                ref: m,
                class: "input1",
                style: { display: "inline-block" },
                contenteditable: "true",
                innerHTML: (s = r(b)) == null ? void 0 : s.toLocaleString("en-US"),
                onKeydown: i[0] || (i[0] = (...g) => r(U) && r(U)(...g))
              }, null, 40, fe),
              A(e.$slots, "suffix", { value: r(b) }, void 0, !0)
            ], 512),
            _("label", null, [
              _("div", {
                style: { display: "inline-block", padding: "0 3px" },
                ref_key: "input_",
                ref: L
              }, [
                e.$slots.splitter ? A(e.$slots, "splitter", { key: 0 }, void 0, !0) : (P(), M(pe, { key: 1 }, [
                  he
                ], 64))
              ], 512)
            ]),
            _("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input2Container",
              ref: T
            }, [
              A(e.$slots, "prefix", { value: r(w) }, void 0, !0),
              _("div", {
                ref_key: "input2",
                ref: c,
                class: "input2",
                style: { display: "inline-block" },
                contenteditable: "true",
                onKeydown: i[1] || (i[1] = (...g) => r(K) && r(K)(...g))
              }, q((p = r(w)) == null ? void 0 : p.toLocaleString("en-US")), 545),
              A(e.$slots, "suffix", { value: r(w) }, void 0, !0)
            ], 512)
          ], 4)) : j("", !0),
          _("div", {
            class: "simple-range-slider-anchor",
            style: N(r(ae))
          }, [
            _("div", {
              tabindex: "1",
              onMousedown: i[2] || (i[2] = B((g) => Z(1, g), ["stop"])),
              onKeydown: i[3] || (i[3] = B((g) => Q(1, g), ["stop"])),
              class: "simple-range-slider-handle"
            }, null, 32),
            r(W) ? j("", !0) : (P(), M("div", {
              key: 0,
              style: N({
                right: n.isRtl ? "0 !important" : "",
                left: n.isRtl ? "unset" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-left"
            }, [
              _("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input1Container",
                ref: C
              }, [
                A(e.$slots, "prefix", { value: r(U) }, void 0, !0),
                _("div", {
                  ref_key: "input1",
                  ref: m,
                  class: "input1",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: i[4] || (i[4] = (...g) => r(U) && r(U)(...g))
                }, q((G = r(b)) == null ? void 0 : G.toLocaleString("en-US")), 545),
                A(e.$slots, "suffix", { value: r(U) }, void 0, !0)
              ], 512)
            ], 4)),
            Se
          ], 4),
          r(u) ? (P(), M("div", {
            key: 2,
            class: "simple-range-slider-anchor",
            style: N(r(re))
          }, [
            _("div", {
              tabindex: "1",
              onMousedown: i[5] || (i[5] = B((g) => Z(2, g), ["stop"])),
              onKeydown: i[6] || (i[6] = B((g) => Q(2, g), ["stop"])),
              class: "simple-range-slider-handle"
            }, null, 32),
            r(W) ? j("", !0) : (P(), M("div", {
              key: 0,
              style: N({
                left: n.isRtl ? "-3px !important" : "",
                right: n.isRtl ? "unset !important" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-right"
            }, [
              _("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input2Container",
                ref: T
              }, [
                A(e.$slots, "prefix", { value: r(K) }, void 0, !0),
                _("div", {
                  ref_key: "input2",
                  ref: c,
                  class: "input2",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: i[7] || (i[7] = (...g) => r(K) && r(K)(...g))
                }, q((H = r(w)) == null ? void 0 : H.toLocaleString("en-US")), 545),
                A(e.$slots, "suffix", { value: r(K) }, void 0, !0)
              ], 512)
            ], 4)),
            ke
          ], 4)) : j("", !0)
        ], 4)
      ], 512);
    };
  }
});
const De = (S, v) => {
  const t = S.__vccOpts || S;
  for (const [y, f] of v)
    t[y] = f;
  return t;
}, xe = /* @__PURE__ */ De(be, [["__scopeId", "data-v-f6e84873"]]);
export {
  xe as default
};
