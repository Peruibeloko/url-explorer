import { Ref, toValue } from 'vue';

export function useUrl(input: Ref) {
  const normalizedInput = toValue(input);

  const out = {
    protocol: '--',
    domain: '--',
    path: [] as string[],
    query: [] as string[][],
    fragment: '--',
    user: '--',
    password: '--',
    port: '--'
  };

  if (!URL.canParse(normalizedInput)) return out;

  const url = new URL(normalizedInput);

  out.protocol = url.protocol.slice(0, url.protocol.length - 1);
  out.domain = url.hostname || '--';
  out.path = url.pathname.slice(1).split('/');
  out.query = [];
  for (const [k, v] of url.searchParams) {
    out.query.push([k, v]);
  }

  out.fragment = url.hash || '--';
  out.user = url.username || '--';
  out.password = url.password || '--';
  out.port = url.port || '--';

  return out;
}
