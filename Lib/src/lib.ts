
export interface Typeable {
  gmapT(k:number);
};

export function inc(k:number, a:Typeable) {
  a.gmapT(k);
  return a;
}