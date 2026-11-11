export type SnippetLang = 'java' | 'sql' | 'bash';

export interface Snippet {
  file: string;
  lang: SnippetLang;
  code: string;
}

// Fragmentos didácticos que adornan el fondo de las secciones. No se traducen.
export const SNIPPETS = {
  controller: {
    file: 'PagoController.java',
    lang: 'java',
    code: String.raw`@RestController
@RequestMapping("/api/pagos")
class PagoController {

  private final PagoService svc;

  @PostMapping
  ResponseEntity<Pago> crear(
      @Valid @RequestBody PagoReq req) {
    return ok(svc.procesar(req));
  }
}`,
  },
  sql: {
    file: 'pagos_pendientes.sql',
    lang: 'sql',
    code: String.raw`-- Pagos de la última semana
SELECT p.id, p.monto, e.nombre
  FROM pagos p
  JOIN estados e ON e.id = p.estado_id
 WHERE p.fecha >= TRUNC(SYSDATE) - 7
 ORDER BY p.fecha DESC
 FETCH FIRST 20 ROWS ONLY;`,
  },
  keycloak: {
    file: 'token.sh',
    lang: 'bash',
    code: String.raw`# Token con client credentials
curl -X POST \
  "$KC/realms/demo/protocol/openid-connect/token" \
  -d grant_type=client_credentials \
  -d client_id=pagos-api \
  -d client_secret=$SECRET

# { "access_token": "eyJhbGciOi..." }`,
  },
} satisfies Record<string, Snippet>;
