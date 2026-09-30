// Tiny syntax highlighter: highlight(code, ext) -> HTML string
const KW = {
 c:"if else for while do switch case break continue return typedef struct enum sizeof static const #",
 cpp:"if else for while do switch case break continue return class struct public private using namespace new delete const static auto template true false",
 py:"if elif else for while def return import from as class in not and or is None True False pass break continue try except with lambda",
 js:"if else for while do switch case break continue return function const let var new class import export true false null undefined async await of in"
};
const TY = {
 c:"int float double char void long short unsigned signed FILE",
 cpp:"int float double char void long bool string vector cout cin endl",
 py:"int str float list dict set tuple range print input len",
 js:"console Math Array Object String Number document window"
};
const E = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sp = (c, t) => `<span class="${c}">${t}</span>`;

function hlCode(code, ext) {
  const kw = new Set(KW[ext].split(" ")), ty = new Set(TY[ext].split(" "));
  const cm = ext === "py" ? "#[^\\n]*" : ext === "js" ? "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/" : "#[^\\n]*|\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  const re = new RegExp(`(${cm})|("(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`[^\`]*\`)|(\\b\\d+\\.?\\d*\\b)|(\\b[A-Za-z_]\\w*\\b)`, "g");
  let out = "", last = 0, m;
  while ((m = re.exec(code))) {
    out += E(code.slice(last, m.index)); last = re.lastIndex;
    const t = m[0];
    if (m[1]) out += sp(t[0] === "#" && ext !== "py" ? "pp" : "cm", E(t));
    else if (m[2]) out += sp("st", E(t));
    else if (m[3]) out += sp("nu", t);
    else if (kw.has(t)) out += sp("kw", t);
    else if (ty.has(t) || /^[A-Z]/.test(t)) out += sp("ty", t);
    else if (code[last] === "(") out += sp("fn", t);
    else out += t;
  }
  return out + E(code.slice(last));
}
function hlCss(css) {
  return E(css).replace(/\/\*[\s\S]*?\*\//g, m => sp("cm", m))
    .replace(/([^{}\n;]+)(\{)/g, (m, s, b) => sp("sel", s) + b)
    .replace(/\{([^}]*)\}/g, (m, body) => "{" + body.replace(/([\w-]+)(\s*:)([^;]*)/g, (x, p, c, v) => sp("prop", p) + c + v.replace(/(#[0-9a-fA-F]{3,8}\b|\b\d+\.?\d*(px|em|rem|%)?)/g, n => sp("nu", n))) + "}");
}
function hlHtml(code) {
  return code.split(/(<style[\s\S]*?<\/style>)/i).map(seg => {
    const tags = s => E(s).replace(/&lt;!--[\s\S]*?--&gt;/g, m => sp("cm", m))
      .replace(/(&lt;\/?)([A-Za-z][\w-]*)((?:[^&]|&(?!gt;))*?)(\/?&gt;)/g, (m, o, n, a, c) =>
        o + sp("tag", n) + a.replace(/([\w-]+)(=)("[^"]*"|'[^']*')/g, (x, k, e, v) => sp("attr", k) + sp("eq", e) + sp("st", v)) + c);
    const s = seg.match(/^(<style[^>]*>)([\s\S]*?)(<\/style>)$/i);
    return s ? tags(s[1]) + hlCss(s[2]) + tags(s[3]) : tags(seg);
  }).join("");
}
function highlight(code, ext) { return ext === "html" ? hlHtml(code) : hlCode(code, ext); }
