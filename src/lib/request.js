/**
 * Faz uma requisição medindo a latência no cliente.
 * Retorna { ok, status, ms, data, error } sem lançar exceção.
 */
export async function timedFetch(url, { timeout = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const start = performance.now();

  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    const ms = Math.round(performance.now() - start);
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    return { ok: response.ok, status: response.status, ms, data, error: null };
  } catch (error) {
    const ms = Math.round(performance.now() - start);
    const message = error.name === 'AbortError' ? 'Tempo de resposta excedido' : 'Falha de rede';
    return { ok: false, status: 0, ms, data: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}
