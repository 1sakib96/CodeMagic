const allowedLanguages = new Set(["c", "c++", "java"]);
const maxCodeBytes = 50000;

export async function onRequestPost({ request, env }) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  const respond = (status, body) => new Response(JSON.stringify(body), { status, headers });

  // Prevent this endpoint from becoming a public compiler relay for other sites.
  const requestOrigin = request.headers.get("Origin");
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return respond(403, { error: "Requests must come from the CodeMagic website." });
  }

  if (!env.ONLINECOMPILER_API_KEY) {
    return respond(503, {
      error: "The secure compiler backend is not configured yet. Deploy this project on Cloudflare Pages and add the ONLINECOMPILER_API_KEY secret."
    });
  }

  let body;
  try { body = await request.json(); }
  catch { return respond(400, { error: "Request body must be valid JSON." }); }

  const language = String(body.language || "").toLowerCase();
  const filename = String(body.filename || "");
  const code = String(body.code || "");
  const stdin = String(body.stdin || "");
  const expectedNames = { c: "main.c", "c++": "main.cpp", java: "Main.java" };

  if (!allowedLanguages.has(language)) return respond(400, { error: "Unsupported language." });
  if (filename !== expectedNames[language]) return respond(400, { error: "Invalid source filename for selected language." });
  if (!code.trim()) return respond(400, { error: "Write some code before running it." });
  if (new TextEncoder().encode(code).length > maxCodeBytes) return respond(413, { error: "Code is too large. Keep the source under 50 KB." });
  if (stdin.length > 10000) return respond(413, { error: "Program input is too large. Keep it under 10 KB." });

  try {
    const upstream = await fetch("https://api.onlinecompiler.io/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": env.ONLINECOMPILER_API_KEY
      },
      body: JSON.stringify({
        language,
        version: "*",
        files: [{ name: filename, content: code }],
        stdin,
        args: [],
        run_timeout: 25000
      })
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return respond(upstream.status, {
        error: result.message || result.error || `Compiler provider returned HTTP ${upstream.status}.`
      });
    }
    return respond(200, result);
  } catch (error) {
    return respond(502, { error: "Could not reach the compiler provider. Check the provider status and try again." });
  }
}
